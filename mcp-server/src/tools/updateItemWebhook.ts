import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  webhook: z.string().describe("New webhook URL for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_updateItemWebhook",
    "Update the webhook URL for an item",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_updateItemWebhook", "v0.6.0");
    },
  );
}
