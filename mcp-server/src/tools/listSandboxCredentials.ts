import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listSandboxCredentials",
    "List available sandbox test credentials and their behaviors",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_listSandboxCredentials", "v0.2.0");
    },
  );
}
