import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_simulateTransactions",
    "Fire sandbox transaction webhook to generate test transactions",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_simulateTransactions", "v0.5.0");
    },
  );
}
