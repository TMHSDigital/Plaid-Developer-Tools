import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";
import { Products } from "plaid";

const inputSchema = {
  institution_id: z
    .string()
    .optional()
    .default("ins_109508")
    .describe("Sandbox institution ID"),
  products: z
    .array(z.string())
    .optional()
    .default(["transactions"])
    .describe("Plaid products for the sandbox item"),
  webhook: z.string().optional().describe("Webhook URL for item events"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_createSandboxItem",
    "Create a sandbox item without Link UI for instant test bank connection",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const products = args.products.map((p) => p as Products);

        const createResponse = await client.sandboxPublicTokenCreate({
          institution_id: args.institution_id,
          initial_products: products,
          options: {
            ...(args.webhook ? { webhook: args.webhook } : {}),
          },
        });

        const publicToken = createResponse.data.public_token;

        const exchangeResponse = await client.itemPublicTokenExchange({
          public_token: publicToken,
        });

        return textResponse(
          JSON.stringify(
            {
              public_token: publicToken,
              access_token: exchangeResponse.data.access_token,
              item_id: exchangeResponse.data.item_id,
              institution_id: args.institution_id,
              products: args.products,
              request_id: createResponse.data.request_id,
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
