# Changelog

All notable changes to this project will be documented in this file.

## [0.6.0] - 2026-04-02

### Added

- 3 live MCP tools: `plaid_updateItemWebhook`, `plaid_getLiabilities`, `plaid_verifyWebhookSignature`
- Production skill: `plaid-react-integration` - usePlaidLink hook, PlaidContext provider, error boundaries, reconnection UI, TypeScript types
- Production skill: `plaid-nextjs-integration` - App Router API routes, server-only Plaid client, middleware auth, webhook handler, server actions

### Changed

- Re-tagged 2 MCP tool stubs (`getTransferIntent`, `inspectAccessToken`) from v0.6.0 to v0.7.0
- `plaid_verifyWebhookSignature` verifies body hash against JWT claims and fetches the verification key from Plaid
- `plaid_getLiabilities` supports optional `account_ids` filter for scoping to specific liability accounts

## [0.5.0] - 2026-04-01

### Added

- 5 live MCP tools: `plaid_sandboxSetVerificationStatus`, `plaid_simulateTransactions`, `plaid_refreshTransactions`, `plaid_removeItem`, `plaid_getItemStatus`
- Production skill: `plaid-identity-verification` - identity data retrieval, match scoring, Identity Verification (KYC), joint account handling
- Production skill: `plaid-recurring-detection` - inflow/outflow streams, frequency types, stream lifecycle, subscription tracking, income detection
- Production rule: `plaid-token-storage` - flags localStorage, cookies, client-side code, unencrypted DB, and log output containing access tokens

### Changed

- Re-tagged 3 MCP tool stubs (`updateItemWebhook`, `getLiabilities`, `getTransferIntent`) from v0.5.0 to v0.6.0
- `plaid_simulateTransactions` fires a `TRANSACTIONS` / `DEFAULT_UPDATE` webhook to generate sandbox test data
- `plaid_getItemStatus` returns full item metadata including products, webhook, and consent expiration

## [0.4.0] - 2026-04-01

### Added

- 6 live MCP tools: `plaid_getBalance`, `plaid_syncTransactions`, `plaid_getRecurring`, `plaid_getInvestmentHoldings`, `plaid_getIdentity`, `plaid_getAuthNumbers`
- Production skill: `plaid-account-verification` - Instant Auth, micro-deposits, same-day micro-deposits, database match, ACH payment patterns
- Production skill: `plaid-investment-tracking` - holdings, securities, investment transactions, portfolio aggregation, cost basis
- Production rule: `plaid-link-best-practices` - flags missing onExit, unhandled token exchange errors, hardcoded products, missing OAuth, render-cycle token creation

### Changed

- `plaid_getRecurring` auto-fetches account IDs if not provided
- `plaid_syncTransactions` returns one page (caller controls pagination via `has_more` / `next_cursor`)

## [0.3.0] - 2026-04-01

### Added

- 6 live sandbox MCP tools: `plaid_createLinkToken`, `plaid_exchangePublicToken`, `plaid_createSandboxItem`, `plaid_resetSandboxLogin`, `plaid_fireSandboxWebhook`, `plaid_getAccounts`
- Production rule: `plaid-sync-cursor` - flags missing cursor persistence, incomplete has_more loops, and premature cursor saves in transaction sync code

### Changed

- `plaid_createSandboxItem` auto-exchanges the public token, returning `access_token` and `item_id` in one call
- `plaid_getAccounts` moved from v0.4.0 to v0.3.0 (needed to verify sandbox items)
- Enhanced `plaid-sandbox-testing` skill with automated MCP workflow, custom sandbox users, OAuth testing, and updated tool table

## [0.2.0] - 2026-04-01

### Added

- 8 live read-only MCP tools: `plaid_listCategories`, `plaid_searchInstitutions`, `plaid_getInstitution`, `plaid_listProducts`, `plaid_getApiEndpoint`, `plaid_listWebhookTypes`, `plaid_listSandboxCredentials`, `plaid_listCountryCoverage`
- Production skill: `plaid-api-reference` - full Plaid API endpoint reference with parameters, auth tiers, rate limits, and code examples
- Production skill: `plaid-institution-search` - institution search by name, routing number, product filtering, OAuth handling
- Production rule: `plaid-webhook-security` - flags missing webhook verification, unvalidated payloads, missing body hash comparison

### Changed

- `searchInstitutions` and `getInstitution` MCP tools now call the Plaid SDK live (require sandbox credentials)
- 6 reference MCP tools return embedded data (no credentials needed): categories, products, endpoints, webhook types, sandbox credentials, country coverage

## [0.1.0] - 2026-04-01

### Added

- Plugin scaffold with `.cursor-plugin/plugin.json`
- 6 production skills: `plaid-link-setup`, `plaid-transaction-sync`, `plaid-webhook-handling`, `plaid-sandbox-testing`, `plaid-category-mapping`, `plaid-error-handling`
- 11 stub skills for future versions
- 3 production rules: `plaid-secrets`, `plaid-error-handling`, `plaid-env-safety`
- 4 stub rules for future versions
- MCP server scaffold with 30 tool stubs (`@tmhs/plaid-mcp`)
- GitHub Actions: CI, Validate, CodeQL workflows
- Full test suite: skills, rules, plugin manifest, docs consistency, internal links, roadmap
- Documentation: README, CLAUDE.md, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, ROADMAP
- CC-BY-NC-ND-4.0 license
