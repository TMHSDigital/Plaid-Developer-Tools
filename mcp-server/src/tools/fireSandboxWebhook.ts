import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";
const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
  webhook_code: z.string().describe("Webhook code to fire, e.g. DEFAULT_UPDATE"),
  webhook_type: z
    .string()
    .optional()
    .default("TRANSACTIONS")
    .describe("Webhook type category"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_fireSandboxWebhook",
    "Fire a specific webhook type for a sandbox item",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.sandboxItemFireWebhook({
          access_token: args.access_token,
          webhook_code: args.webhook_code as any,
          webhook_type: args.webhook_type as any,
        });

        return textResponse(
          JSON.stringify(
            {
              webhook_fired: response.data.webhook_fired,
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
