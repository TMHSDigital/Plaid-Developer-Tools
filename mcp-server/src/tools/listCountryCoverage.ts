import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listCountryCoverage",
    "Show Plaid-supported countries and available products per country",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_listCountryCoverage", "v0.2.0");
    },
  );
}
