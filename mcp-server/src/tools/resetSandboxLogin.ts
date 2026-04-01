import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_resetSandboxLogin",
    "Force an ITEM_LOGIN_REQUIRED error on a sandbox item",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_resetSandboxLogin", "v0.3.0");
    },
  );
}
