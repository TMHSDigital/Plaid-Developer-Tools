---
name: plaid-api-reference
description: Search and retrieve Plaid API endpoint documentation including parameters, authentication requirements, response shapes, and rate limits. Use when the user needs to call a Plaid API or wants to know available endpoints.
---

# Plaid API Reference

> **Coming in v0.2.0** - This skill will provide comprehensive Plaid API endpoint lookup with parameters, auth requirements, response shapes, rate limits, and code examples.

## Trigger

Use this skill when the user:

- Asks how to call a specific Plaid API endpoint
- Wants to know what Plaid APIs are available
- Needs parameter details for a Plaid endpoint
- Is looking up authentication requirements for an endpoint
- Needs to understand response shapes and error codes

## Required Inputs

- **Query**: The API endpoint, product, or method the user is looking for (e.g. "get transactions", "/accounts/get", "link token")

## Workflow

1. Identify the relevant Plaid API endpoint from the user's query
2. Look up the endpoint documentation at `https://plaid.com/docs/api/`
3. Present the endpoint URL, HTTP method, required parameters, authentication, and response shape
4. Provide a code example in the user's preferred language
5. Note any rate limits or special requirements

**Planned content:**
- Full endpoint reference for all Plaid products (Transactions, Auth, Identity, Balance, Investments, Liabilities, Transfer)
- Request/response shapes with TypeScript interfaces
- Rate limit tables per endpoint
- Authentication tiers (sandbox, development, production)
- Code examples in TypeScript, Python, Ruby, and Go
- Common parameter combinations and best practices

## Key References

- [Plaid API documentation](https://plaid.com/docs/api/)
- [API endpoint reference](https://plaid.com/docs/api/products/)

## Example Interaction

**User:** "What parameters does /transactions/sync accept?"

**Agent:**
1. Looks up the /transactions/sync endpoint
2. Lists all parameters: access_token (required), cursor (optional), count (optional, default 100, max 500), options (optional)
3. Shows the response shape with added, modified, removed, next_cursor, has_more
4. Provides a TypeScript code example
5. Notes rate limit: 15 requests per minute per item

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Look up endpoint | `plaid_getApiEndpoint` | Get full documentation for any Plaid API endpoint |
| List products | `plaid_listProducts` | List all Plaid products with descriptions |

## Common Pitfalls

1. **Using deprecated endpoints** - `/transactions/get` is deprecated in favor of `/transactions/sync`
2. **Missing required headers** - all Plaid requests need `PLAID-CLIENT-ID` and `PLAID-SECRET` headers
3. **Wrong environment base URL** - sandbox, development, and production use different base URLs

## See Also

- [Plaid Error Handling](../plaid-error-handling/SKILL.md) - handle API error responses
- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - the starting point for most API integrations
