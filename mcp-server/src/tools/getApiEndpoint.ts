import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  endpoint: z
    .string()
    .describe('Plaid API path, e.g. "/transactions/sync"'),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getApiEndpoint",
    "Look up any Plaid API endpoint - parameters, auth, and response shape",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getApiEndpoint", "v0.2.0");
    },
  );
}
