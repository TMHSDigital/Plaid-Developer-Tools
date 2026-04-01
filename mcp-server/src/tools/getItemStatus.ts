import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getItemStatus",
    "Get item health, last successful and failed update timestamps",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getItemStatus", "v0.5.0");
    },
  );
}
