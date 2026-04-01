import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getItemStatus",
    "Get item health, last successful and failed update timestamps",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.itemGet({
          access_token: args.access_token,
        });

        const item = response.data.item;

        return textResponse(
          JSON.stringify(
            {
              item: {
                item_id: item.item_id,
                institution_id: item.institution_id,
                webhook: item.webhook,
                available_products: item.available_products,
                billed_products: item.billed_products,
                products: item.products,
                error: item.error,
                consent_expiration_time: item.consent_expiration_time,
                update_type: item.update_type,
              },
              status: response.data.status,
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
