import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";
import { CountryCode } from "plaid";

const inputSchema = {
  institution_id: z.string().describe("Plaid institution ID (e.g. ins_109508)"),
  country_codes: z
    .array(z.string())
    .optional()
    .default(["US"])
    .describe("ISO 3166-1 alpha-2 country codes (default: US)"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getInstitution",
    "Get institution details by ID including name, products, logo, and URL",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();
        const countryCodes = args.country_codes.map(
          (c) => c.toUpperCase() as CountryCode,
        );

        const response = await client.institutionsGetById({
          institution_id: args.institution_id,
          country_codes: countryCodes,
          options: {
            include_optional_metadata: true,
            include_status: true,
          },
        });

        const inst = response.data.institution;
        const result = {
          institution_id: inst.institution_id,
          name: inst.name,
          products: inst.products,
          country_codes: inst.country_codes,
          url: inst.url ?? null,
          logo: inst.logo ? "(base64 logo available)" : null,
          primary_color: inst.primary_color ?? null,
          oauth: inst.oauth,
          routing_numbers: inst.routing_numbers,
          status: inst.status ?? null,
        };

        return textResponse(JSON.stringify(result, null, 2));
      } catch (error) {
        return errorResponse(error);
      }
    },
  );
}
