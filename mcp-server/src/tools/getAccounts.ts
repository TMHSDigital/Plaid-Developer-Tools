import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getAccounts",
    "Get accounts for a Plaid access token",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getAccounts", "v0.4.0");
    },
  );
}
