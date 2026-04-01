import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse } from "../types.js";

interface EndpointInfo {
  path: string;
  method: string;
  product: string;
  description: string;
  auth: string;
  required_params: string[];
  optional_params: string[];
  rate_limit: string;
}

const ENDPOINTS: EndpointInfo[] = [
  {
    path: "/link/token/create",
    method: "POST",
    product: "link",
    description: "Create a Link token to initialize Plaid Link on the client side.",
    auth: "client_id + secret",
    required_params: ["client_id", "secret", "user.client_user_id", "client_name", "products", "country_codes", "language"],
    optional_params: ["webhook", "access_token (update mode)", "redirect_uri", "account_filters"],
    rate_limit: "No specific limit",
  },
  {
    path: "/item/public_token/exchange",
    method: "POST",
    product: "link",
    description: "Exchange a public_token from Link for a permanent access_token.",
    auth: "client_id + secret",
    required_params: ["client_id", "secret", "public_token"],
    optional_params: [],
    rate_limit: "No specific limit",
  },
  {
    path: "/transactions/sync",
    method: "POST",
    product: "transactions",
    description: "Get incremental transaction updates using a cursor. Returns added, modified, and removed transactions.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["cursor", "count (default 100, max 500)", "options.include_personal_finance_category", "options.include_logo_and_counterparty_beta"],
    rate_limit: "15 requests/min per item",
  },
  {
    path: "/transactions/get",
    method: "POST",
    product: "transactions",
    description: "Fetch transactions for a date range. Deprecated in favor of /transactions/sync.",
    auth: "access_token",
    required_params: ["access_token", "start_date", "end_date"],
    optional_params: ["options.count", "options.offset", "options.account_ids"],
    rate_limit: "15 requests/min per item",
  },
  {
    path: "/transactions/refresh",
    method: "POST",
    product: "transactions",
    description: "Force a transaction data refresh. Fires SYNC_UPDATES_AVAILABLE webhook when done.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: [],
    rate_limit: "2 requests/day per item",
  },
  {
    path: "/transactions/recurring/get",
    method: "POST",
    product: "transactions",
    description: "Get recurring transaction streams (subscriptions, bills, income).",
    auth: "access_token",
    required_params: ["access_token", "account_ids"],
    optional_params: ["options.include_personal_finance_category"],
    rate_limit: "15 requests/min per item",
  },
  {
    path: "/accounts/get",
    method: "POST",
    product: "accounts",
    description: "Retrieve all accounts associated with an Item.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["options.account_ids"],
    rate_limit: "No specific limit",
  },
  {
    path: "/accounts/balance/get",
    method: "POST",
    product: "balance",
    description: "Get real-time balance for accounts. Makes a live request to the institution.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["options.account_ids", "options.min_last_updated_datetime"],
    rate_limit: "No specific limit (institution-dependent)",
  },
  {
    path: "/auth/get",
    method: "POST",
    product: "auth",
    description: "Get account and routing numbers for ACH transfers.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["options.account_ids"],
    rate_limit: "No specific limit",
  },
  {
    path: "/identity/get",
    method: "POST",
    product: "identity",
    description: "Get account holder identity info (name, email, phone, address).",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["options.account_ids"],
    rate_limit: "No specific limit",
  },
  {
    path: "/investments/holdings/get",
    method: "POST",
    product: "investments",
    description: "Get investment holdings including securities, quantities, and values.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["options.account_ids"],
    rate_limit: "No specific limit",
  },
  {
    path: "/investments/transactions/get",
    method: "POST",
    product: "investments",
    description: "Get investment transactions (buys, sells, dividends, fees).",
    auth: "access_token",
    required_params: ["access_token", "start_date", "end_date"],
    optional_params: ["options.account_ids", "options.count", "options.offset"],
    rate_limit: "No specific limit",
  },
  {
    path: "/liabilities/get",
    method: "POST",
    product: "liabilities",
    description: "Get liability details: credit cards (APR, min payment), student loans, mortgages.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: ["options.account_ids"],
    rate_limit: "No specific limit",
  },
  {
    path: "/institutions/search",
    method: "POST",
    product: "institutions",
    description: "Search Plaid-supported institutions by name, products, and country.",
    auth: "client_id + secret",
    required_params: ["query", "products", "country_codes"],
    optional_params: ["options.routing_numbers", "options.oauth", "options.include_optional_metadata"],
    rate_limit: "No specific limit",
  },
  {
    path: "/institutions/get_by_id",
    method: "POST",
    product: "institutions",
    description: "Get institution details by Plaid institution ID.",
    auth: "client_id + secret",
    required_params: ["institution_id", "country_codes"],
    optional_params: ["options.include_optional_metadata", "options.include_status"],
    rate_limit: "No specific limit",
  },
  {
    path: "/item/get",
    method: "POST",
    product: "items",
    description: "Get Item status including health, last update timestamps, and connected products.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: [],
    rate_limit: "No specific limit",
  },
  {
    path: "/item/remove",
    method: "POST",
    product: "items",
    description: "Remove an Item and invalidate its access_token.",
    auth: "access_token",
    required_params: ["access_token"],
    optional_params: [],
    rate_limit: "No specific limit",
  },
  {
    path: "/item/webhook/update",
    method: "POST",
    product: "items",
    description: "Update the webhook URL for an Item.",
    auth: "access_token",
    required_params: ["access_token", "webhook"],
    optional_params: [],
    rate_limit: "No specific limit",
  },
  {
    path: "/sandbox/public_token/create",
    method: "POST",
    product: "sandbox",
    description: "Create a test public_token for sandbox. Bypasses Link UI.",
    auth: "client_id + secret (sandbox only)",
    required_params: ["institution_id", "initial_products"],
    optional_params: ["options.webhook", "options.override_username", "options.override_password"],
    rate_limit: "Sandbox only",
  },
  {
    path: "/sandbox/item/fire_webhook",
    method: "POST",
    product: "sandbox",
    description: "Fire a webhook for a sandbox Item to test webhook handling.",
    auth: "access_token (sandbox only)",
    required_params: ["access_token", "webhook_code"],
    optional_params: ["webhook_type"],
    rate_limit: "Sandbox only",
  },
  {
    path: "/sandbox/item/reset_login",
    method: "POST",
    product: "sandbox",
    description: "Force ITEM_LOGIN_REQUIRED on a sandbox Item to test re-authentication.",
    auth: "access_token (sandbox only)",
    required_params: ["access_token"],
    optional_params: [],
    rate_limit: "Sandbox only",
  },
];

const inputSchema = {
  endpoint: z
    .string()
    .describe(
      'Plaid API path or search term, e.g. "/transactions/sync", "balance", "sandbox"',
    ),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_getApiEndpoint",
    "Look up any Plaid API endpoint - parameters, auth, and response shape",
    inputSchema,
    async (args) => {
      const q = args.endpoint.toLowerCase().replace(/^\//, "");

      const exact = ENDPOINTS.find(
        (e) => e.path.toLowerCase().replace(/^\//, "") === q,
      );
      if (exact) {
        return textResponse(JSON.stringify(exact, null, 2));
      }

      const matches = ENDPOINTS.filter(
        (e) =>
          e.path.toLowerCase().includes(q) ||
          e.product.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q),
      );

      if (matches.length === 0) {
        return textResponse(
          `No endpoints matched "${args.endpoint}". Try a path like "/transactions/sync" or a product name like "auth".`,
        );
      }

      return textResponse(JSON.stringify(matches, null, 2));
    },
  );
}
