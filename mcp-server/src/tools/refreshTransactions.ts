import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_refreshTransactions",
    "Force a transaction refresh for an item",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.transactionsRefresh({
          access_token: args.access_token,
        });

        return textResponse(
          JSON.stringify(
            {
              refreshed: true,
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
