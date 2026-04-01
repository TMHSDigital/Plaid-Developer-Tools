# Roadmap

**Current:** v0.4.0

| Version | Theme | Skills | Rules | MCP Tools | Highlights | Status |
| --- | --- | --- | --- | --- | --- | --- |
| v0.1.0 | Foundation | 6 | 3 | 0 | Core skills, secret/env/error rules, plugin scaffold, CI, docs | Done |
| v0.2.0 | Live Data | +2 | +1 | 8 | MCP server read-only tools, API reference skill, institution search skill, webhook security rule | Done |
| v0.3.0 | Sandbox Power | +0 (enhanced 1) | +1 | +6 | 6 sandbox MCP tools, sandbox testing enhancements, sync cursor rule | Done |
| v0.4.0 (current) | Full API | +2 | +1 | +6 | Account verification, investment tracking, link best practices rule | **Current** |
| v0.5.0 | Advanced | +2 | +1 | +5 | Identity verification, recurring detection, token storage rule | Planned |
| v0.6.0 | Framework Integration | +2 | 0 | +3 | React integration, Next.js integration, webhook tools | Planned |
| v0.7.0 | Ship It | +2 | 0 | +2 | Migration guide, production readiness, utility tools | Planned |
| v1.0.0 | Stable | 17 | 7 | 30 | Final polish, all docs, comprehensive test suite, npm publish | Planned |

## Completed

- [x] `plaid-link-setup` added in v0.1.0
- [x] `plaid-transaction-sync` added in v0.1.0
- [x] `plaid-webhook-handling` added in v0.1.0
- [x] `plaid-sandbox-testing` added in v0.1.0
- [x] `plaid-category-mapping` added in v0.1.0
- [x] `plaid-error-handling` added in v0.1.0
- [x] `plaid-secrets` added in v0.1.0
- [x] `plaid-error-handling` rule added in v0.1.0
- [x] `plaid-env-safety` added in v0.1.0
- [x] `plaid-api-reference` added in v0.2.0
- [x] `plaid-institution-search` added in v0.2.0
- [x] `plaid-webhook-security` rule added in v0.2.0
- [x] 8 read-only MCP tools implemented in v0.2.0
- [x] `plaid-sync-cursor` rule added in v0.3.0
- [x] `plaid-sandbox-testing` skill enhanced in v0.3.0
- [x] 6 sandbox MCP tools implemented in v0.3.0 (createLinkToken, exchangePublicToken, createSandboxItem, resetSandboxLogin, fireSandboxWebhook, getAccounts)
- [x] `plaid-account-verification` added in v0.4.0
- [x] `plaid-investment-tracking` added in v0.4.0
- [x] `plaid-link-best-practices` rule added in v0.4.0
- [x] 6 Full API MCP tools implemented in v0.4.0 (getBalance, syncTransactions, getRecurring, getInvestmentHoldings, getIdentity, getAuthNumbers)
