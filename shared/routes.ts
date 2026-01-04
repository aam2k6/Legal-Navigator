import { z } from "zod";
import { insertInquirySchema } from "./schema";

export const api = {
  analyze: {
    method: "POST" as const,
    path: "/api/analyze",
    input: z.object({ useCase: z.string() }),
    responses: {
      200: z.object({ result: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
};
