import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listProducts",
    "List all Plaid products with descriptions and pricing tier",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_listProducts", "v0.2.0");
    },
  );
}
