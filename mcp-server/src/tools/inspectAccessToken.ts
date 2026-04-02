import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { stubResponse } from "../types.js";

const inputSchema = {
  access_token: z.string().describe("Plaid access token to inspect"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_inspectAccessToken",
    "Decode and display access token metadata including item_id, institution, and products",
    inputSchema,
    async (args) => {
      return stubResponse("plaid_inspectAccessToken", "v0.7.0");
    },
  );
}
