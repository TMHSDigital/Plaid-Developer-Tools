import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  public_token: z.string().describe("Public token from Plaid Link onSuccess"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_exchangePublicToken",
    "Exchange a Plaid public token for an access token",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_exchangePublicToken", "v0.3.0");
    },
  );
}
