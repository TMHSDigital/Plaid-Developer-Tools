---
name: plaid-react-integration
description: Integrate Plaid Link into React apps using react-plaid-link hooks, error boundaries, loading states, and context providers. Use when the user is building a React frontend with Plaid.
---

# Plaid React Integration

> **Coming in v0.6.0** - This skill will provide React-specific patterns for Plaid Link integration including hooks, context, error boundaries, and state management.

## Trigger

Use this skill when the user:

- Is building a React app that integrates Plaid Link
- Needs react-plaid-link hook patterns beyond basic setup
- Wants context providers for managing Plaid state
- Needs error boundaries for Link failures
- Is handling loading states during token creation and exchange
- Wants reusable Plaid components

## Required Inputs

- **React version**: React 18+, with or without a framework (Next.js, Remix, etc.)
- **State management**: useState, Context, Redux, Zustand, etc.
- **Products**: Which Plaid products to integrate

## Workflow

1. Install react-plaid-link and set up the PlaidLink component
2. Create a context provider for managing Link tokens and access tokens
3. Implement loading states during async operations
4. Add error boundaries for Link initialization failures
5. Build reusable components for common Plaid UI patterns

**Planned content:**
- `usePlaidLink` hook deep dive (all options and callbacks)
- PlaidContext provider for managing tokens across components
- Loading skeletons during Link token creation
- Error boundary implementation for Link crashes
- Multi-item flow with state management
- Reconnection UI for broken items
- TypeScript type patterns for Plaid responses
- Testing Plaid components with React Testing Library

## Key References

- [react-plaid-link](https://www.npmjs.com/package/react-plaid-link)
- [Plaid Link web](https://plaid.com/docs/link/web/)

## Example Interaction

**User:** "I need a reusable React component for connecting bank accounts with Plaid that handles loading, errors, and success states."

**Agent:**
1. Creates a PlaidLinkButton component with loading/error/success states
2. Wraps it in a context provider for token management
3. Adds error boundary for Link initialization failures
4. Shows TypeScript types for all callbacks
5. Notes: "Pre-fetch the Link token on page load so the button is immediately ready"

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Create Link token | `plaid_createLinkToken` | Test Link token creation for component development |

## Common Pitfalls

1. **Creating Link tokens on every render** - fetch once and cache until expiration
2. **Missing cleanup** - destroy Link on unmount to prevent memory leaks
3. **Not handling the ready state** - disable the button until `usePlaidLink` reports ready

## See Also

- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - foundational Link integration
- [Plaid Next.js Integration](../plaid-nextjs-integration/SKILL.md) - Next.js-specific patterns
