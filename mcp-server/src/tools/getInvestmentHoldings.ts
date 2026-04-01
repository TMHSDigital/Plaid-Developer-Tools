import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z.array(z.string()).optional().describe("Subset of investment account IDs"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getInvestmentHoldings",
    "Get investment holdings and securities",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getInvestmentHoldings", "v0.4.0");
    },
  );
}
