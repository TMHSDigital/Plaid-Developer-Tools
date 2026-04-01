import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  public_token: z.string().describe("Public token from Plaid Link onSuccess"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_exchangePublicToken",
    "Exchange a Plaid public token for an access token",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.itemPublicTokenExchange({
          public_token: args.public_token,
        });

        return textResponse(
          JSON.stringify(
            {
              access_token: response.data.access_token,
              item_id: response.data.item_id,
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
