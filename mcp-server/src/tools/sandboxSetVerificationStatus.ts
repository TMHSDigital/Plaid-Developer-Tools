import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
  account_id: z.string().describe("Plaid account_id to update"),
  verification_status: z
    .string()
    .describe("Target micro-deposit verification status for sandbox"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_sandboxSetVerificationStatus",
    "Set micro-deposit verification status in sandbox",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.sandboxItemSetVerificationStatus({
          access_token: args.access_token,
          account_id: args.account_id,
          verification_status: args.verification_status as any,
        });

        return textResponse(
          JSON.stringify(
            {
              verification_status: args.verification_status,
              account_id: args.account_id,
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
