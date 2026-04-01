import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";
import { CountryCode, Products } from "plaid";
import { randomUUID } from "node:crypto";

const inputSchema = {
  products: z
    .array(z.string())
    .describe('Plaid products to enable, e.g. ["transactions"]'),
  country_codes: z
    .array(z.string())
    .optional()
    .default(["US"])
    .describe("ISO 3166-1 alpha-2 country codes"),
  language: z.string().optional().default("en").describe("BCP-47 language tag"),
  webhook: z.string().optional().describe("Webhook URL for item events"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_createLinkToken",
    "Create a Plaid Link token for sandbox testing",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const countryCodes = args.country_codes.map(
          (c) => c.toUpperCase() as CountryCode,
        );
        const products = args.products.map((p) => p as Products);

        const response = await client.linkTokenCreate({
          user: { client_user_id: randomUUID() },
          client_name: "Plaid MCP",
          products,
          country_codes: countryCodes,
          language: args.language,
          ...(args.webhook ? { webhook: args.webhook } : {}),
        });

        return textResponse(
          JSON.stringify(
            {
              link_token: response.data.link_token,
              expiration: response.data.expiration,
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
