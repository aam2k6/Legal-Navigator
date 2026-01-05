import "dotenv/config";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

console.log("DEBUG CHECK: API Key status:", process.env.GEMINI_API_KEY ? "Active" : "MISSING");

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.analyze.path, async (req, res) => {
    try {
      const { useCase } = api.analyze.input.parse(req.body);
      console.log("Analyzing:", useCase); 
      const apiKey = process.env.GEMINI_API_KEY;

      // 1. AUTO-DISCOVER AVAILABLE MODELS
      console.log("🔍 Auto-detecting available AI models...");
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listResponse = await fetch(listUrl);
      
      if (!listResponse.ok) {
        throw new Error(`Failed to list models. Google says: ${listResponse.status} ${listResponse.statusText}`);
      }

      const listData = await listResponse.json();
      const models = listData.models || [];
      
      // Find a model that supports "generateContent" and is "Gemini"
      const validModel = models.find((m: any) => 
        m.name.includes("gemini") && 
        m.supportedGenerationMethods?.includes("generateContent")
      );

      if (!validModel) {
        throw new Error("❌ No 'Gemini' models enabled.");
      }

      const modelName = validModel.name.replace("models/", "");
      console.log(`✅ FOUND WORKING MODEL: ${modelName}`);

      // 2. THE IMPROVED PROMPT (No more "N/A")
      const promptText = `
        You are a generic legal assistant. Analyze the following use case: "${useCase}"
        
        Task: Identify 3 distinct applicable laws, regulations, or compliance steps. 
        (If the user mentions a specific country, use that country's laws. If not, use general international best practices).
        
        CRITICAL: Return the answer as a STRICT JSON Array. Do not use Markdown.
        
        Expected JSON Structure:
        [
          {
            "act": "Name of Law/Act",
            "section": "Specific Section/Rule (e.g. 'Section 12' or 'Rule 45'). Do NOT use 'N/A'. Find the specific clause.",
            "summary": "Short Title",
            "detail": "One sentence explanation",
            "action": "Actionable step for the user"
          }
        ]
      `;

      const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      
      const response = await fetch(generateUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Google Generation Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

      // Clean and Parse
      const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanJson);

      res.json({ scenarios: parsedData });

    } catch (error: any) {
      console.error("CRITICAL FAILURE:", error.message);
      res.status(500).json({ message: error.message });
    }
  });

  return httpServer;
}