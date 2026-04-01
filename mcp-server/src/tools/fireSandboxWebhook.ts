import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
  webhook_code: z.string().describe("Webhook code to fire, e.g. DEFAULT_UPDATE"),
  webhook_type: z
    .string()
    .optional()
    .default("TRANSACTIONS")
    .describe("Webhook type category"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_fireSandboxWebhook",
    "Fire a specific webhook type for a sandbox item",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_fireSandboxWebhook", "v0.3.0");
    },
  );
}
