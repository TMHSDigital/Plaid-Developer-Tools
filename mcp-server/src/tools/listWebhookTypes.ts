import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse } from "../types.js";

interface WebhookEntry {
  webhook_type: string;
  webhook_code: string;
  description: string;
  key_fields: string[];
}

const WEBHOOKS: WebhookEntry[] = [
  {
    webhook_type: "TRANSACTIONS",
    webhook_code: "SYNC_UPDATES_AVAILABLE",
    description: "New, modified, or removed transactions are ready. Call /transactions/sync to fetch.",
    key_fields: ["item_id", "initial_update_complete", "historical_update_complete"],
  },
  {
    webhook_type: "TRANSACTIONS",
    webhook_code: "RECURRING_TRANSACTIONS_UPDATE",
    description: "Recurring transaction streams have been updated.",
    key_fields: ["item_id"],
  },
  {
    webhook_type: "TRANSACTIONS",
    webhook_code: "INITIAL_UPDATE",
    description: "Initial transaction pull is complete (deprecated - use SYNC_UPDATES_AVAILABLE).",
    key_fields: ["item_id", "new_transactions"],
  },
  {
    webhook_type: "TRANSACTIONS",
    webhook_code: "DEFAULT_UPDATE",
    description: "New transactions are available (deprecated - use SYNC_UPDATES_AVAILABLE).",
    key_fields: ["item_id", "new_transactions"],
  },
  {
    webhook_type: "TRANSACTIONS",
    webhook_code: "TRANSACTIONS_REMOVED",
    description: "Transactions have been removed (deprecated - use /transactions/sync removed array).",
    key_fields: ["item_id", "removed_transactions"],
  },
  {
    webhook_type: "ITEM",
    webhook_code: "ERROR",
    description: "An Item-level error occurred, e.g. ITEM_LOGIN_REQUIRED. User must re-authenticate.",
    key_fields: ["item_id", "error"],
  },
  {
    webhook_type: "ITEM",
    webhook_code: "PENDING_EXPIRATION",
    description: "Access to the Item will expire in 7 days. Prompt user to re-authenticate via update mode.",
    key_fields: ["item_id", "consent_expiration_time"],
  },
  {
    webhook_type: "ITEM",
    webhook_code: "USER_PERMISSION_REVOKED",
    description: "User revoked access at their financial institution.",
    key_fields: ["item_id", "error"],
  },
  {
    webhook_type: "ITEM",
    webhook_code: "USER_ACCOUNT_REVOKED",
    description: "A specific account was disconnected or closed by the user at their institution.",
    key_fields: ["item_id", "account_ids_to_remove", "error"],
  },
  {
    webhook_type: "ITEM",
    webhook_code: "WEBHOOK_UPDATE_ACKNOWLEDGED",
    description: "Confirmation that the Item webhook URL was updated.",
    key_fields: ["item_id", "new_webhook_url"],
  },
  {
    webhook_type: "ITEM",
    webhook_code: "LOGIN_REPAIRED",
    description: "A previously broken login has been repaired. Resume data fetching.",
    key_fields: ["item_id"],
  },
  {
    webhook_type: "AUTH",
    webhook_code: "AUTOMATICALLY_VERIFIED",
    description: "Micro-deposit verification completed automatically.",
    key_fields: ["item_id", "account_id"],
  },
  {
    webhook_type: "AUTH",
    webhook_code: "VERIFICATION_EXPIRED",
    description: "Micro-deposits expired before user verified. Must restart.",
    key_fields: ["item_id", "account_id"],
  },
  {
    webhook_type: "HOLDINGS",
    webhook_code: "DEFAULT_UPDATE",
    description: "Investment holdings data has been updated.",
    key_fields: ["item_id"],
  },
  {
    webhook_type: "INVESTMENTS_TRANSACTIONS",
    webhook_code: "DEFAULT_UPDATE",
    description: "Investment transactions data has been updated.",
    key_fields: ["item_id", "new_investments_transactions", "cancelled_investments_transactions"],
  },
  {
    webhook_type: "IDENTITY",
    webhook_code: "DEFAULT_UPDATE",
    description: "Identity data has been updated for the Item.",
    key_fields: ["item_id"],
  },
  {
    webhook_type: "LIABILITIES",
    webhook_code: "DEFAULT_UPDATE",
    description: "Liabilities data has been updated.",
    key_fields: ["item_id"],
  },
  {
    webhook_type: "IDENTITY_VERIFICATION",
    webhook_code: "STEP_UPDATED",
    description: "User completed a step in the identity verification flow.",
    key_fields: ["identity_verification_id"],
  },
  {
    webhook_type: "IDENTITY_VERIFICATION",
    webhook_code: "STATUS_UPDATED",
    description: "Final status of the identity verification (success, failed, etc.).",
    key_fields: ["identity_verification_id"],
  },
  {
    webhook_type: "TRANSFER",
    webhook_code: "TRANSFER_EVENTS_UPDATE",
    description: "New transfer events are available. Call /transfer/event/sync to fetch.",
    key_fields: ["environment"],
  },
];

const inputSchema = {
  type: z
    .string()
    .optional()
    .describe("Filter by webhook_type (e.g. TRANSACTIONS, ITEM, AUTH)"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listWebhookTypes",
    "List all Plaid webhook types with payload shapes and descriptions",
    inputSchema,
    async (args) => {
      let filtered = WEBHOOKS;
      if (args.type) {
        const t = args.type.toUpperCase();
        filtered = WEBHOOKS.filter((w) => w.webhook_type === t);
        if (filtered.length === 0) {
          const types = [...new Set(WEBHOOKS.map((w) => w.webhook_type))].join(", ");
          return textResponse(
            `No webhooks found for type "${args.type}". Available types: ${types}`,
          );
        }
      }
      return textResponse(JSON.stringify(filtered, null, 2));
    },
  );
}
