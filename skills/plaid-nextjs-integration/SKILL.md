---
name: plaid-nextjs-integration
description: Integrate Plaid into Next.js apps with App Router API routes, middleware auth, server-side token exchange, and webhook route handlers. Use when the user is building a Next.js app with Plaid.
---

# Plaid Next.js Integration

> **Coming in v0.6.0** - This skill will provide Next.js App Router patterns for Plaid integration including API routes, middleware, server actions, and webhook handlers.

## Trigger

Use this skill when the user:

- Is building a Next.js app with Plaid integration
- Needs App Router API routes for Plaid endpoints
- Wants middleware authentication for Plaid routes
- Is setting up server-side token exchange
- Needs webhook route handlers in Next.js
- Wants server actions for Plaid operations

## Required Inputs

- **Next.js version**: 13+ (App Router) or Pages Router
- **Auth solution**: NextAuth, Clerk, Auth0, custom
- **Deployment target**: Vercel, self-hosted, other

## Workflow

1. Set up Plaid client configuration in a server-only module
2. Create API routes for Link token creation and token exchange
3. Add authentication middleware for Plaid routes
4. Implement webhook handler route with signature verification
5. Build server actions for Plaid data fetching

**Planned content:**
- App Router API routes (`/api/plaid/create-link-token`, `/api/plaid/exchange-token`)
- Server-only Plaid client module pattern
- Middleware authentication for Plaid API routes
- Webhook handler with Next.js route handlers
- Server actions for transaction sync
- Edge runtime considerations (Plaid SDK requires Node runtime)
- Environment variable configuration for Vercel
- Rate limiting middleware for Plaid routes

## Key References

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Plaid quickstart Next.js](https://github.com/plaid/quickstart/tree/master/frontend/src)

## Example Interaction

**User:** "Set up Plaid API routes in my Next.js App Router project with authentication."

**Agent:**
1. Creates `/app/api/plaid/create-link-token/route.ts` with auth check
2. Creates `/app/api/plaid/exchange-token/route.ts` with session validation
3. Creates `/app/api/plaid/webhook/route.ts` with signature verification
4. Adds server-only Plaid client in `/lib/plaid.ts`
5. Notes: "Use `export const runtime = 'nodejs'` - the Plaid SDK doesn't work in Edge runtime"

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Test routes | `plaid_createLinkToken` | Verify token creation logic matches MCP output |

## Common Pitfalls

1. **Using Edge runtime** - the Plaid Node SDK requires Node.js runtime, not Edge
2. **Exposing secrets in client components** - Plaid credentials must stay server-side
3. **Missing webhook route** - Next.js needs explicit POST handler for webhooks

## See Also

- [Plaid React Integration](../plaid-react-integration/SKILL.md) - client-side React components
- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - foundational Link integration
- [Plaid Webhook Handling](../plaid-webhook-handling/SKILL.md) - webhook verification patterns
