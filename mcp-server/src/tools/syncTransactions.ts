import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  cursor: z
    .string()
    .optional()
    .default("")
    .describe("Pagination cursor from a prior sync"),
  count: z
    .number()
    .int()
    .optional()
    .default(500)
    .describe("Max transactions to return per request"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_syncTransactions",
    "Run /transactions/sync with cursor management",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.transactionsSync({
          access_token: args.access_token,
          cursor: args.cursor,
          count: args.count,
        });

        return textResponse(
          JSON.stringify(
            {
              added: response.data.added,
              modified: response.data.modified,
              removed: response.data.removed,
              next_cursor: response.data.next_cursor,
              has_more: response.data.has_more,
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
