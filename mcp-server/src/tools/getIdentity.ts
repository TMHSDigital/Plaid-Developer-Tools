import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getIdentity",
    "Get account holder identity information",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.identityGet({
          access_token: args.access_token,
        });

        const accounts = response.data.accounts.map((acct) => ({
          account_id: acct.account_id,
          name: acct.name,
          type: acct.type,
          subtype: acct.subtype,
          owners: acct.owners?.map((owner) => ({
            names: owner.names,
            addresses: owner.addresses,
            emails: owner.emails,
            phone_numbers: owner.phone_numbers,
          })),
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
