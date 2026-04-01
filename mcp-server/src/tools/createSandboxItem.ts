import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  institution_id: z
    .string()
    .optional()
    .default("ins_109508")
    .describe("Sandbox institution ID"),
  products: z
    .array(z.string())
    .optional()
    .default(["transactions"])
    .describe("Plaid products for the sandbox item"),
  webhook: z.string().optional().describe("Webhook URL for item events"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_createSandboxItem",
    "Create a sandbox item without Link UI for instant test bank connection",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_createSandboxItem", "v0.3.0");
    },
  );
}
