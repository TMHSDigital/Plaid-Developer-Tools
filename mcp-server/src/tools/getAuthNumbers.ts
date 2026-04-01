import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z
    .array(z.string())
    .optional()
    .describe("Subset of depository account IDs"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getAuthNumbers",
    "Get account and routing numbers",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.authGet({
          access_token: args.access_token,
          ...(args.account_ids
            ? { options: { account_ids: args.account_ids } }
            : {}),
        });

        return textResponse(
          JSON.stringify(
            {
              numbers: {
                ach: response.data.numbers.ach,
                eft: response.data.numbers.eft,
                international: response.data.numbers.international,
                bacs: response.data.numbers.bacs,
              },
              accounts: response.data.accounts.map((acct) => ({
                account_id: acct.account_id,
                name: acct.name,
                type: acct.type,
                subtype: acct.subtype,
                mask: acct.mask,
              })),
              item: {
                item_id: response.data.item.item_id,
                institution_id: response.data.item.institution_id,
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
