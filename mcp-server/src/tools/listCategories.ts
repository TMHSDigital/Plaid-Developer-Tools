import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listCategories",
    "Browse the full Plaid personal_finance_category taxonomy",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_listCategories", "v0.2.0");
    },
  );
}
