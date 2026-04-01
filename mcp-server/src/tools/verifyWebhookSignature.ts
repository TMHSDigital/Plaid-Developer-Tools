import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  body: z.string().describe("Raw webhook request body as received"),
  plaid_verification: z
    .string()
    .describe("JWT from the Plaid-Verification (plaid-verification) header"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_verifyWebhookSignature",
    "Verify a webhook payload signature given body and headers",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_verifyWebhookSignature", "v0.6.0");
    },
  );
}
