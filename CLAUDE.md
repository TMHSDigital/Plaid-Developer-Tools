# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The **Plaid Developer Tools** Cursor plugin is at **v0.5.0**. It accelerates Plaid integration work with **17 skills**, **7 rules**, and a companion MCP server exposing **30 tools** for Link, transactions, webhooks, sandbox flows, and API discovery. Skills encode workflows; rules enforce secrets handling, errors, webhook safety, sync cursor persistence, Link best practices, and token storage; the MCP server has 25 live tools (reference data, institutions, sandbox, Link tokens, accounts, balances, transactions, investments, identity, auth, item management) and 5 stubs for future releases.

## Plugin Architecture

```
.cursor-plugin/plugin.json   - Plugin manifest
skills/<skill-name>/SKILL.md - AI workflow definitions
rules/<rule-name>.mdc        - Code quality and security rules
mcp-server/                  - MCP server with 30 tools
```

## Skills (17 total)

| Skill | Purpose |
| --- | --- |
| plaid-link-setup | Plaid Link integration - react-plaid-link, token exchange, OAuth |
| plaid-transaction-sync | /transactions/sync cursor-based pagination, dedup |
| plaid-webhook-handling | Webhook types, verification, sandbox firing, retry |
| plaid-sandbox-testing | Sandbox credentials, test institutions, error simulation |
| plaid-category-mapping | Personal finance category taxonomy and mapping |
| plaid-error-handling | Error codes, detection, and recovery strategies |
| plaid-api-reference | API endpoint lookup |
| plaid-institution-search | Institution search and coverage |
| plaid-account-verification | Auth product, micro-deposits, database match |
| plaid-investment-tracking | Holdings, securities, portfolio aggregation |
| plaid-identity-verification | KYC flows, identity data, match scoring, document verification |
| plaid-recurring-detection | Recurring transaction streams, subscription detection, income recognition |
| plaid-migration-guide | Migration from other aggregators (coming v0.7.0) |
| plaid-security-best-practices | Token encryption, RLS, audit logging (coming v0.7.0) |
| plaid-react-integration | React hooks and components (coming v0.6.0) |
| plaid-nextjs-integration | Next.js App Router patterns (coming v0.6.0) |
| plaid-production-readiness | Production access checklist (coming v0.7.0) |

## Rules (7 total)

| Rule | Scope | Purpose |
| --- | --- | --- |
| plaid-secrets.mdc | Global | Flags Plaid API keys, access tokens, client credentials |
| plaid-error-handling.mdc | *.ts, *.js, *.tsx, *.jsx | Flags unchecked Plaid API calls |
| plaid-env-safety.mdc | .env*, config files | Flags sandbox credentials in production |
| plaid-webhook-security.mdc | webhook files | Flags missing webhook verification |
| plaid-token-storage.mdc | *.ts, *.js | Flags insecure access token storage (localStorage, cookies, logs, unencrypted DB) |
| plaid-sync-cursor.mdc | *sync*, *transaction* | Flags missing cursor persistence |
| plaid-link-best-practices.mdc | *plaid*link* | Flags Link integration issues |

## Companion MCP Server

Tools use the `plaid_` prefix (for example `plaid_syncTransactions`). Grouped by typical credential requirements.

### No auth (8 tools)

| Tool | Auth | Description |
| --- | --- | --- |
| plaid_listCategories | None | Browse the full Plaid personal_finance_category taxonomy |
| plaid_listProducts | None | List all Plaid products with descriptions and pricing tier |
| plaid_getApiEndpoint | None | Look up any Plaid API endpoint - parameters, auth, and response shape |
| plaid_listWebhookTypes | None | List all Plaid webhook types with payload shapes and descriptions |
| plaid_listSandboxCredentials | None | List available sandbox test credentials and their behaviors |
| plaid_listCountryCoverage | None | Show Plaid-supported countries and available products per country |
| plaid_verifyWebhookSignature | None | Verify a webhook payload signature given body and headers |
| plaid_inspectAccessToken | None | Decode and display access token metadata including item_id, institution, and products |

### Sandbox credentials (12 tools)

| Tool | Auth | Description |
| --- | --- | --- |
| plaid_searchInstitutions | Sandbox credentials | Search Plaid institutions by name, products, and country |
| plaid_getInstitution | Sandbox credentials | Get institution details by ID including name, products, logo, and URL |
| plaid_createLinkToken | Sandbox credentials | Create a Plaid Link token for sandbox testing |
| plaid_exchangePublicToken | Sandbox credentials | Exchange a Plaid public token for an access token |
| plaid_getAccounts | Sandbox credentials + access token | Get accounts for a Plaid access token |
| plaid_getBalance | Sandbox credentials + access token | Get real-time balance for accounts |
| plaid_syncTransactions | Sandbox credentials + access token | Run /transactions/sync with cursor management |
| plaid_getRecurring | Sandbox credentials + access token | Get recurring transactions for an item |
| plaid_getInvestmentHoldings | Sandbox credentials + access token | Get investment holdings and securities |
| plaid_getIdentity | Sandbox credentials + access token | Get account holder identity information |
| plaid_getAuthNumbers | Sandbox credentials + access token | Get account and routing numbers |
| plaid_getLiabilities | Sandbox credentials + access token | Get liability accounts including credit cards, student loans, and mortgages |

### Write/advanced (10 tools)

| Tool | Auth | Description |
| --- | --- | --- |
| plaid_createSandboxItem | Sandbox credentials | Create a sandbox item without Link UI for instant test bank connection |
| plaid_resetSandboxLogin | Sandbox credentials | Force an ITEM_LOGIN_REQUIRED error on a sandbox item |
| plaid_fireSandboxWebhook | Sandbox credentials | Fire a specific webhook type for a sandbox item |
| plaid_sandboxSetVerificationStatus | Sandbox credentials | Set micro-deposit verification status in sandbox |
| plaid_simulateTransactions | Sandbox credentials + access token | Fire sandbox transaction webhook to generate test transactions |
| plaid_refreshTransactions | Sandbox credentials + access token | Force a transaction refresh for an item |
| plaid_removeItem | Sandbox credentials + access token | Remove and disconnect a Plaid item |
| plaid_getItemStatus | Sandbox credentials + access token | Get item health, last successful and failed update timestamps |
| plaid_updateItemWebhook | Sandbox credentials + access token | Update the webhook URL for an item |
| plaid_getTransferIntent | Sandbox credentials + access token | Create a transfer intent for payment initiation |

## Development Workflow

- **Skills and rules**: No build step; edit `SKILL.md` and `.mdc` files directly.
- **MCP server**: From repo root, run `cd mcp-server && npm install && npm run build`.

**Symlink the plugin for local Cursor development**

- **Windows (PowerShell)** - run as Administrator if required for symlink creation:

```powershell
New-Item -ItemType SymbolicLink -Path "$env:USERPROFILE\.cursor\plugins\plaid-developer-tools" -Target (Get-Location)
```

- **macOS / Linux**:

```bash
ln -s /path/to/Plaid-Developer-Tools ~/.cursor/plugins/plaid-developer-tools
```

Run each command from the repo root. Adjust paths if your clone is elsewhere.

## Key Conventions

- **Plaid environments**: `sandbox`, `development`, and `production`, selected via `PLAID_ENV` (or equivalent app config).
- **Access tokens**: `access-{env}-{uuid}` format; long-lived; must be **encrypted at rest** in real apps.
- **Sandbox test user**: `user_good` / `pass_good` for default happy-path institution flows.
- **MCP tool prefix**: `plaid_` (e.g. `plaid_syncTransactions`).
- **Never hardcode** `client_id` or `secret`; use environment variables or a secrets manager.

## Plaid API Quick Reference

| Endpoint / area | Typical auth |
| --- | --- |
| `/institutions/search`, `/institutions/get_by_id` | Client ID + secret (`PLAID_ENV`) |
| `/link/token/create` | Client ID + secret |
| `/item/public_token/exchange` | Client ID + secret |
| `/accounts/get`, `/accounts/balance/get` | Access token |
| `/transactions/sync`, `/transactions/refresh` | Access token |
| `/item/webhook/update`, `/item/remove` | Access token |
| `/sandbox/*` helpers (item, fire webhook, reset login, etc.) | Client ID + secret (sandbox only) |
| Webhook verification (JWT / `Plaid-Verification`) | Webhook verification key (not the client secret) |
