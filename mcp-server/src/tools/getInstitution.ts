import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  institution_id: z.string().describe("Plaid institution ID"),
  country_codes: z.array(z.string()).optional().describe("ISO 3166-1 alpha-2 country codes"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getInstitution",
    "Get institution details by ID including name, products, logo, and URL",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getInstitution", "v0.2.0");
    },
  );
}
