import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

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
      try {
        const client = getPlaidClient();
        const response = await client.itemWebhookUpdate({
          access_token: args.access_token,
          webhook: args.webhook,
        });

        return textResponse(
          JSON.stringify(
            {
              item: {
                item_id: response.data.item.item_id,
                webhook: response.data.item.webhook,
              },
              request_id: response.data.request_id,
            },
            null,
            2,
          ),
        );
      } catch (error) {
        return errorResponse(error);
      }
    },
  );
}
