import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item to remove"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_removeItem",
    "Remove and disconnect a Plaid item",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const response = await client.itemRemove({
          access_token: args.access_token,
        });

        return textResponse(
          JSON.stringify(
            {
              removed: true,
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
