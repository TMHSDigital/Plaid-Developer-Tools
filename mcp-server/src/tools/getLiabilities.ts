import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z.array(z.string()).optional().describe("Subset of liability account IDs"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getLiabilities",
    "Get liability accounts including credit cards, student loans, and mortgages",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getLiabilities", "v0.6.0");
    },
  );
}
