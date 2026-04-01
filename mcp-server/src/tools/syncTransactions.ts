import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  cursor: z.string().optional().default("").describe("Pagination cursor from a prior sync"),
  count: z.number().int().optional().default(500).describe("Max transactions to return per request"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_syncTransactions",
    "Run /transactions/sync with cursor management",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_syncTransactions", "v0.4.0");
    },
  );
}
