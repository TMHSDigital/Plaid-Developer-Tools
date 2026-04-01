import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_simulateTransactions",
    "Fire sandbox transaction webhook to generate test transactions",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.sandboxItemFireWebhook({
          access_token: args.access_token,
          webhook_code: "DEFAULT_UPDATE" as any,
          webhook_type: "TRANSACTIONS" as any,
        });

        return textResponse(
          JSON.stringify(
            {
              webhook_fired: response.data.webhook_fired,
              webhook_code: "DEFAULT_UPDATE",
              webhook_type: "TRANSACTIONS",
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
