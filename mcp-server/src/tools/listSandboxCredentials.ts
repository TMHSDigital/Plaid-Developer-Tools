import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { textResponse } from "../types.js";

interface SandboxCredential {
  username: string;
  password: string;
  mfa_code: string | null;
  behavior: string;
  institution_id: string;
  institution_name: string;
}

const CREDENTIALS: SandboxCredential[] = [
  {
    username: "user_good",
    password: "pass_good",
    mfa_code: "1234",
    behavior: "Happy path. Returns accounts with transactions, balances, and identity. MFA prompt with code 1234.",
    institution_id: "ins_109508",
    institution_name: "First Platypus Bank",
  },
  {
    username: "user_good",
    password: "pass_good",
    mfa_code: null,
    behavior: "Happy path without MFA. Use with institutions that have MFA disabled (e.g. ins_109510 Houndstooth Bank).",
    institution_id: "ins_109510",
    institution_name: "Houndstooth Bank",
  },
  {
    username: "user_good",
    password: "pass_good",
    mfa_code: null,
    behavior: "OAuth institution. Redirects to oauth-sandbox.plaid.com. Use for testing OAuth Link flows.",
    institution_id: "ins_127989",
    institution_name: "Platypus OAuth Bank",
  },
  {
    username: "user_custom",
    password: "pass_custom",
    mfa_code: null,
    behavior: "Custom data. Use with /sandbox/public_token/create override options to simulate specific accounts and balances.",
    institution_id: "ins_109508",
    institution_name: "First Platypus Bank",
  },
  {
    username: "user_transactions_dynamic",
    password: "pass_good",
    mfa_code: null,
    behavior: "Generates new transactions each time /transactions/sync or /transactions/get is called. Useful for testing sync loops.",
    institution_id: "ins_109508",
    institution_name: "First Platypus Bank",
  },
  {
    username: "user_bad",
    password: "pass_bad",
    mfa_code: null,
    behavior: "Always fails authentication. Returns INVALID_CREDENTIALS error.",
    institution_id: "ins_109508",
    institution_name: "First Platypus Bank",
  },
  {
    username: "user_institution_down",
    password: "pass_good",
    mfa_code: null,
    behavior: "Simulates institution downtime. Returns INSTITUTION_NOT_RESPONDING error.",
    institution_id: "ins_109508",
    institution_name: "First Platypus Bank",
  },
  {
    username: "user_account_locked",
    password: "pass_good",
    mfa_code: null,
    behavior: "Account is locked at the institution. Returns ITEM_LOGIN_REQUIRED error.",
    institution_id: "ins_109508",
    institution_name: "First Platypus Bank",
  },
];

const inputSchema = {};

export function register(server: McpServer): void {
  server.tool(
    "plaid_listSandboxCredentials",
    "List available sandbox test credentials and their behaviors",
    inputSchema,
    async () => {
      return textResponse(JSON.stringify(CREDENTIALS, null, 2));
    },
  );
}
