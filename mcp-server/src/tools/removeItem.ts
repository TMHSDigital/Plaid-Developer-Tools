import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item to remove"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_removeItem",
    "Remove and disconnect a Plaid item",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_removeItem", "v0.5.0");
    },
  );
}
