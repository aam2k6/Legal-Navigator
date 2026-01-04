import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import OpenAI from "openai";

// OpenAI client setup - relies on environment variables from Replit integration
const openai = new OpenAI({ 
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.analyze.path, async (req, res) => {
    try {
      const { useCase } = api.analyze.input.parse(req.body);

      const prompt = `
        You are a legal expert AI. Analyze the following use case and identify applicable laws, regulations, and necessary steps for compliance.
        Focus on providing a clear, step-by-step guide.
        
        Use Case: "${useCase}"
        
        Format your response in Markdown with clear headings and bullet points.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "system", content: "You are a helpful legal assistant." }, { role: "user", content: prompt }],
      });

      const result = response.choices[0].message.content || "Unable to generate analysis.";

      // Store in DB
      await storage.createInquiry({ useCase, result });

      res.json({ result });
    } catch (error) {
      console.error("Analysis failed:", error);
      res.status(500).json({ message: "Failed to analyze use case" });
    }
  });

  return httpServer;
}
