import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z
    .array(z.string())
    .optional()
    .describe("Subset of account IDs to filter"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getRecurring",
    "Get recurring transactions for an item",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();

        const accountIds =
          args.account_ids ??
          (
            await client.accountsGet({
              access_token: args.access_token,
            })
          ).data.accounts.map((a) => a.account_id);

        const response = await client.transactionsRecurringGet({
          access_token: args.access_token,
          account_ids: accountIds,
        });

        return textResponse(
          JSON.stringify(
            {
              inflow_streams: response.data.inflow_streams,
              outflow_streams: response.data.outflow_streams,
              updated_datetime: response.data.updated_datetime,
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
