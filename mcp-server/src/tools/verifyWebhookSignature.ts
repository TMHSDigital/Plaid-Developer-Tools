import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse, errorResponse } from "../types.js";
import { getPlaidClient } from "./utils.js";
import { createHash } from "crypto";

const inputSchema = {
  body: z.string().describe("Raw webhook request body as received"),
  plaid_verification: z
    .string()
    .describe("JWT from the Plaid-Verification (plaid-verification) header"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_verifyWebhookSignature",
    "Verify a webhook payload signature given body and headers",
    inputSchema,
    async (args) => {
      try {
        const client = getPlaidClient();

        const jwtParts = args.plaid_verification.split(".");
        if (jwtParts.length !== 3) {
          return textResponse(
            JSON.stringify(
              { verified: false, error: "Invalid JWT format" },
              null,
              2,
            ),
          );
        }

        const headerJson = Buffer.from(jwtParts[0], "base64url").toString();
        const header = JSON.parse(headerJson);
        const kid = header.kid;

        if (!kid) {
          return textResponse(
            JSON.stringify(
              { verified: false, error: "No kid in JWT header" },
              null,
              2,
            ),
          );
        }

        const keyResponse = await client.webhookVerificationKeyGet({
          key_id: kid,
        });

        const bodyHash = createHash("sha256")
          .update(args.body)
          .digest("hex");

        const claimsJson = Buffer.from(jwtParts[1], "base64url").toString();
        const claims = JSON.parse(claimsJson);

        const verified = claims.request_body_sha256 === bodyHash;

        return textResponse(
          JSON.stringify(
            {
              verified,
              kid,
              algorithm: header.alg,
              body_sha256: bodyHash,
              claims_sha256: claims.request_body_sha256,
              issued_at: claims.iat
                ? new Date(claims.iat * 1000).toISOString()
                : null,
              request_id: keyResponse.data.request_id,
            },
            null,
            2,
          ),
        );
      } catch (error) {
        return errorResponse(error);
      }
    },
  );
}
