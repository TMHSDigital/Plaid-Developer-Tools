import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";
import { CountryCode, Products } from "plaid";

const inputSchema = {
  query: z.string().describe("Search text for institution name"),
  country_codes: z
    .array(z.string())
    .optional()
    .default(["US"])
    .describe("ISO 3166-1 alpha-2 country codes (default: US)"),
  products: z
    .array(z.string())
    .optional()
    .describe("Plaid products to filter by (e.g. transactions, auth)"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_searchInstitutions",
    "Search Plaid institutions by name, products, and country",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const countryCodes = args.country_codes.map(
          (c) => c.toUpperCase() as CountryCode,
        );

        const response = await client.institutionsSearch({
          query: args.query,
          products: args.products
            ? (args.products as Products[])
            : null,
          country_codes: countryCodes,
          options: {
            include_optional_metadata: true,
          },
        });

        const institutions = response.data.institutions.map((inst) => ({
          institution_id: inst.institution_id,
          name: inst.name,
          products: inst.products,
          country_codes: inst.country_codes,
          url: inst.url ?? null,
          logo: inst.logo ? "(base64 logo available)" : null,
          oauth: inst.oauth,
          routing_numbers: inst.routing_numbers,
        }));

        if (institutions.length === 0) {
          return textResponse(
            `No institutions found for "${args.query}" in ${args.country_codes.join(", ")}.`,
          );
        }

        return textResponse(JSON.stringify(institutions, null, 2));
      } catch (error) {
        return errorResponse(error);
      }
    },
  );
}
