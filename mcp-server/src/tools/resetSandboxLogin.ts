import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_resetSandboxLogin",
    "Force an ITEM_LOGIN_REQUIRED error on a sandbox item",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.sandboxItemResetLogin({
          access_token: args.access_token,
        });

        return textResponse(
          JSON.stringify(
            {
              reset_login: response.data.reset_login,
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
