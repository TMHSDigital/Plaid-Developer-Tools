import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getAccounts",
    "Get accounts for a Plaid access token",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.accountsGet({
          access_token: args.access_token,
        });

        const accounts = response.data.accounts.map((acct) => ({
          account_id: acct.account_id,
          name: acct.name,
          official_name: acct.official_name,
          type: acct.type,
          subtype: acct.subtype,
          mask: acct.mask,
          balances: acct.balances,
        }));

        return textResponse(
          JSON.stringify(
            {
              accounts,
              item: {
                item_id: response.data.item.item_id,
                institution_id: response.data.item.institution_id,
                products: response.data.item.products,
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
