import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token for the item"),
  account_id: z.string().describe("Source depository account ID"),
  amount: z.string().describe("Transfer amount as a decimal string"),
  description: z.string().describe("Human-readable description for the transfer"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getTransferIntent",
    "Create a transfer intent for payment initiation",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_getTransferIntent", "v0.5.0");
    },
  );
}
