import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  products: z
    .array(z.string())
    .describe('Plaid products to enable, e.g. ["transactions"]'),
  country_codes: z
    .array(z.string())
    .optional()
    .default(["US"])
    .describe("ISO 3166-1 alpha-2 country codes"),
  language: z.string().optional().default("en").describe("BCP-47 language tag"),
  webhook: z.string().optional().describe("Webhook URL for item events"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_createLinkToken",
    "Create a Plaid Link token for sandbox testing",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_createLinkToken", "v0.3.0");
    },
  );
}
