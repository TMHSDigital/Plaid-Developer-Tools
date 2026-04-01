import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_refreshTransactions",
    "Force a transaction refresh for an item",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_refreshTransactions", "v0.5.0");
    },
  );
}
