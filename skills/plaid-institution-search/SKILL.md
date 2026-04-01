---
name: plaid-institution-search
description: Search Plaid institutions by name, routing number, products supported, and country. Use when the user needs to find bank coverage, check institution availability, or look up institution details.
---

# Plaid Institution Search

> **Coming in v0.2.0** - This skill will provide comprehensive institution search, coverage checking, and routing number lookup.

## Trigger

Use this skill when the user:

- Wants to check if a specific bank is supported by Plaid
- Needs to search institutions by name or routing number
- Wants to filter institutions by supported products
- Needs institution details (logo, URL, products, MFA type)
- Is checking country-level coverage

## Required Inputs

- **Search query**: Institution name, routing number, or institution ID
- **Filters** (optional): Country code, supported products

## Workflow

1. Search for institutions using `/institutions/search` or `/institutions/get`
2. Filter results by products, country, or other criteria
3. Present institution details including supported products, logo, and coverage info
4. Note any limitations or regional restrictions

**Planned content:**
- Institution search by name with fuzzy matching
- Routing number lookup via `/institutions/search`
- Product coverage matrix by institution
- Country filtering (US, CA, UK, EU)
- Institution health status monitoring
- Coverage comparison tables for popular banks

## Key References

- [Institutions search](https://plaid.com/docs/api/institutions/#institutionssearch)
- [Institutions get by ID](https://plaid.com/docs/api/institutions/#institutionsget_by_id)
- [Supported institutions](https://plaid.com/docs/link/duplicate-items/)

## Example Interaction

**User:** "Does Plaid support Chase bank for transactions and identity?"

**Agent:**
1. Searches for "Chase" using /institutions/search
2. Returns institution details: Chase (ins_3), supports Transactions, Auth, Identity, Balance, Investments
3. Notes OAuth requirement for Chase
4. Shows coverage details for US accounts

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Search by name | `plaid_searchInstitutions` | Search institutions by name, products, country |
| Get details | `plaid_getInstitution` | Get institution details by institution ID |
| Check coverage | `plaid_listCountryCoverage` | Show supported countries and products per country |

## Common Pitfalls

1. **Assuming all institutions support all products** - product support varies by institution
2. **Not handling OAuth institutions** - many large banks (Chase, Wells Fargo) require OAuth redirects
3. **Hardcoding institution IDs** - IDs can change; always search dynamically

## See Also

- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - connect to discovered institutions via Link
- [Plaid API Reference](../plaid-api-reference/SKILL.md) - institution endpoint documentation
