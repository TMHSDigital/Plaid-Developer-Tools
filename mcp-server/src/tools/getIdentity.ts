import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getIdentity",
    "Get account holder identity information",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getIdentity", "v0.4.0");
    },
  );
}
