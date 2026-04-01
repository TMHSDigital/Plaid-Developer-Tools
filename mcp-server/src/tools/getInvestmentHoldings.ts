import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z
    .array(z.string())
    .optional()
    .describe("Subset of investment account IDs"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getInvestmentHoldings",
    "Get investment holdings and securities",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.investmentsHoldingsGet({
          access_token: args.access_token,
          ...(args.account_ids
            ? { options: { account_ids: args.account_ids } }
            : {}),
        });

        const holdings = response.data.holdings.map((h) => ({
          account_id: h.account_id,
          security_id: h.security_id,
          quantity: h.quantity,
          institution_price: h.institution_price,
          institution_value: h.institution_value,
          cost_basis: h.cost_basis,
          iso_currency_code: h.iso_currency_code,
        }));

        const securities = response.data.securities.map((s) => ({
          security_id: s.security_id,
          name: s.name,
          ticker_symbol: s.ticker_symbol,
          cusip: s.cusip,
          isin: s.isin,
          type: s.type,
          close_price: s.close_price,
          iso_currency_code: s.iso_currency_code,
        }));

        const accounts = response.data.accounts.map((acct) => ({
          account_id: acct.account_id,
          name: acct.name,
          type: acct.type,
          subtype: acct.subtype,
          balances: acct.balances,
        }));

        return textResponse(
          JSON.stringify(
            { holdings, securities, accounts, request_id: response.data.request_id },
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
