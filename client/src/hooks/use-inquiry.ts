import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

type AnalyzeInput = z.infer<typeof api.analyze.input>;
type AnalyzeResponse = z.infer<typeof api.analyze.responses[200]>;

export function useAnalyzeCase() {
  return useMutation({
    mutationFn: async (data: AnalyzeInput) => {
      const res = await fetch(api.analyze.path, {
        method: api.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Try to parse error message if available
        try {
          const errorData = await res.json();
          throw new Error(errorData.message || "Analysis failed");
        } catch (e) {
          throw new Error("Failed to analyze case");
        }
      }

      return api.analyze.responses[200].parse(await res.json());
    },
  });
}
