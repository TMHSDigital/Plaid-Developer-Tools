import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_ids: z
    .array(z.string())
    .optional()
    .describe("Subset of liability account IDs"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getLiabilities",
    "Get liability accounts including credit cards, student loans, and mortgages",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const request: Record<string, unknown> = {
          access_token: args.access_token,
        };
        if (args.account_ids?.length) {
          request.options = { account_ids: args.account_ids };
        }

        const response = await client.liabilitiesGet(request as any);

        return textResponse(
          JSON.stringify(
            {
              accounts: response.data.accounts,
              liabilities: {
                credit: response.data.liabilities.credit,
                mortgage: response.data.liabilities.mortgage,
                student: response.data.liabilities.student,
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
