import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the sandbox item"),
  account_id: z.string().describe("Plaid account_id to update"),
  verification_status: z
    .string()
    .describe("Target micro-deposit verification status for sandbox"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_sandboxSetVerificationStatus",
    "Set micro-deposit verification status in sandbox",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_sandboxSetVerificationStatus", "v0.5.0");
    },
  );
}
