import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  query: z.string().describe("Search text for institution name"),
  country_codes: z.array(z.string()).optional().describe("ISO 3166-1 alpha-2 country codes"),
  products: z.array(z.string()).optional().describe("Plaid products to filter by"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_searchInstitutions",
    "Search Plaid institutions by name, products, and country",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_searchInstitutions", "v0.2.0");
    },
  );
}
