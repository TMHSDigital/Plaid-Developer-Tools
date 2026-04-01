import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z
    .array(z.string())
    .optional()
    .describe("Subset of account IDs to fetch balances for"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getBalance",
    "Get real-time balance for accounts",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.accountsBalanceGet({
          access_token: args.access_token,
          ...(args.account_ids
            ? { options: { account_ids: args.account_ids } }
            : {}),
        });

        const accounts = response.data.accounts.map((acct) => ({
          account_id: acct.account_id,
          name: acct.name,
          official_name: acct.official_name,
          type: acct.type,
          subtype: acct.subtype,
          mask: acct.mask,
          balances: {
            available: acct.balances.available,
            current: acct.balances.current,
            limit: acct.balances.limit,
            iso_currency_code: acct.balances.iso_currency_code,
            unofficial_currency_code: acct.balances.unofficial_currency_code,
          },
        }));

        return textResponse(
          JSON.stringify(
            {
              accounts,
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
