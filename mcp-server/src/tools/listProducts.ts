import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse } from "../types.js";

interface ProductInfo {
  name: string;
  description: string;
  tier: string;
  key_endpoints: string[];
}

const PRODUCTS: ProductInfo[] = [
  {
    name: "transactions",
    description:
      "Access transaction data via /transactions/sync (cursor-based) or legacy /transactions/get. Includes merchant info, categories, and location data.",
    tier: "Core",
    key_endpoints: [
      "/transactions/sync",
      "/transactions/get",
      "/transactions/refresh",
      "/transactions/recurring/get",
    ],
  },
  {
    name: "auth",
    description:
      "Retrieve account and routing numbers for ACH payments. Supports instant auth, same-day micro-deposits, and database match verification.",
    tier: "Core",
    key_endpoints: ["/auth/get"],
  },
  {
    name: "identity",
    description:
      "Access account holder identity data including name, email, phone, and address from the financial institution.",
    tier: "Core",
    key_endpoints: ["/identity/get"],
  },
  {
    name: "balance",
    description:
      "Real-time account balance checks. Returns current, available, and limit balances. No webhook support - poll as needed.",
    tier: "Core",
    key_endpoints: ["/accounts/balance/get"],
  },
  {
    name: "investments",
    description:
      "Holdings, securities, and investment transactions. Covers brokerage, 401(k), IRA, and other investment accounts.",
    tier: "Premium",
    key_endpoints: [
      "/investments/holdings/get",
      "/investments/transactions/get",
    ],
  },
  {
    name: "liabilities",
    description:
      "Credit card, mortgage, and student loan details including APR, minimum payments, and remaining balance.",
    tier: "Premium",
    key_endpoints: ["/liabilities/get"],
  },
  {
    name: "identity_verification",
    description:
      "KYC identity verification with document checks, selfie comparison, and watchlist screening.",
    tier: "Premium",
    key_endpoints: [
      "/identity_verification/create",
      "/identity_verification/get",
      "/identity_verification/retry",
    ],
  },
  {
    name: "transfer",
    description:
      "ACH and RTP payment initiation with ledger management. Covers same-day ACH, instant payments, and recurring transfers.",
    tier: "Premium",
    key_endpoints: [
      "/transfer/create",
      "/transfer/get",
      "/transfer/intent/create",
      "/transfer/ledger/get",
    ],
  },
  {
    name: "signal",
    description:
      "ACH return risk scoring. Predicts likelihood of NSF, admin returns, and unauthorized returns before initiating a transfer.",
    tier: "Premium",
    key_endpoints: ["/signal/evaluate", "/signal/decision/report"],
  },
  {
    name: "income",
    description:
      "Income and employment verification via payroll data, bank transactions, or uploaded documents.",
    tier: "Premium",
    key_endpoints: [
      "/credit/payroll_income/get",
      "/credit/bank_income/get",
    ],
  },
  {
    name: "assets",
    description:
      "Generate asset reports for mortgage lending and underwriting. Provides 2+ years of account history.",
    tier: "Premium",
    key_endpoints: [
      "/asset_report/create",
      "/asset_report/get",
      "/asset_report/pdf/get",
    ],
  },
];

const inputSchema = {
  tier: z
    .string()
    .optional()
    .describe("Filter by pricing tier: Core or Premium"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listProducts",
    "List all Plaid products with descriptions and pricing tier",
    inputSchema,
    async (args) => {
      let filtered = PRODUCTS;
      if (args.tier) {
        const t = args.tier.charAt(0).toUpperCase() + args.tier.slice(1).toLowerCase();
        filtered = PRODUCTS.filter((p) => p.tier === t);
        if (filtered.length === 0) {
          return textResponse(
            `No products found for tier "${args.tier}". Use "Core" or "Premium".`,
          );
        }
      }
      return textResponse(JSON.stringify(filtered, null, 2));
    },
  );
}
