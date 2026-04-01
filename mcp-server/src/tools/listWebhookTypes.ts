import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listWebhookTypes",
    "List all Plaid webhook types with payload shapes and descriptions",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_listWebhookTypes", "v0.2.0");
    },
  );
}
