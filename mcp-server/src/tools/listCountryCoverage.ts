import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse } from "../types.js";

interface CountryCoverage {
  country_code: string;
  country_name: string;
  supported_products: string[];
  notes: string;
}

const COVERAGE: CountryCoverage[] = [
  {
    country_code: "US",
    country_name: "United States",
    supported_products: [
      "transactions", "auth", "identity", "balance", "investments",
      "liabilities", "transfer", "signal", "income", "assets",
      "identity_verification",
    ],
    notes: "Full product coverage. ~11,000 institutions. OAuth and credential-based connections.",
  },
  {
    country_code: "CA",
    country_name: "Canada",
    supported_products: [
      "transactions", "identity", "balance", "investments", "liabilities", "assets",
    ],
    notes: "No Auth or Transfer. ~200 institutions including Big Five banks.",
  },
  {
    country_code: "GB",
    country_name: "United Kingdom",
    supported_products: [
      "transactions", "auth", "identity", "balance",
    ],
    notes: "Open Banking via OAuth only. Auth returns sort code and account number.",
  },
  {
    country_code: "IE",
    country_name: "Ireland",
    supported_products: ["transactions", "identity", "balance"],
    notes: "Open Banking via OAuth. Growing institution coverage.",
  },
  {
    country_code: "FR",
    country_name: "France",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "ES",
    country_name: "Spain",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "NL",
    country_name: "Netherlands",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "DE",
    country_name: "Germany",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "IT",
    country_name: "Italy",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "DK",
    country_name: "Denmark",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "NO",
    country_name: "Norway",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "SE",
    country_name: "Sweden",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "EE",
    country_name: "Estonia",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "LT",
    country_name: "Lithuania",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "LV",
    country_name: "Latvia",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "PL",
    country_name: "Poland",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "BE",
    country_name: "Belgium",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
  {
    country_code: "PT",
    country_name: "Portugal",
    supported_products: ["transactions", "identity", "balance"],
    notes: "PSD2 Open Banking. OAuth connections.",
  },
];

const inputSchema = {
  country_code: z
    .string()
    .optional()
    .describe("ISO 3166-1 alpha-2 code to filter (e.g. US, GB, CA)"),
};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listCountryCoverage",
    "Show Plaid-supported countries and available products per country",
    inputSchema,
    async (args) => {
      if (args.country_code) {
        const code = args.country_code.toUpperCase();
        const match = COVERAGE.find((c) => c.country_code === code);
        if (!match) {
          const codes = COVERAGE.map((c) => c.country_code).join(", ");
          return textResponse(
            `Country "${args.country_code}" not found. Supported: ${codes}`,
          );
        }
        return textResponse(JSON.stringify(match, null, 2));
      }
      return textResponse(JSON.stringify(COVERAGE, null, 2));
    },
  );
}
