# Changelog

All notable changes to this project will be documented in this file.

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
