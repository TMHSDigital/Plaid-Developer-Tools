---
name: plaid-account-verification
description: Verify bank accounts using Plaid Auth, micro-deposits, same-day micro-deposits, and database match. Use when the user needs account and routing numbers or ACH payment verification.
---

# Plaid Account Verification

> **Coming in v0.4.0** - This skill will cover the full Auth product, micro-deposit flows, same-day verification, and database match for ACH payment initiation.

## Trigger

Use this skill when the user:

- Needs account and routing numbers for ACH payments
- Wants to verify bank account ownership
- Is setting up micro-deposit verification
- Needs same-day micro-deposit flows
- Is implementing database match verification

## Required Inputs

- **Verification method**: Instant Auth, micro-deposits, same-day micro-deposits, or database match
- **Use case**: ACH payments, direct deposit, account funding

## Workflow

1. Determine the appropriate verification method based on the use case
2. Implement the Auth product for instant account/routing number retrieval
3. Set up micro-deposit flows as a fallback for institutions without instant Auth
4. Handle verification callbacks and status updates
5. Store verified account details securely for payment initiation

**Planned content:**
- Instant Auth via `/auth/get` with full account/routing numbers
- Micro-deposit initiation and verification flow
- Same-day micro-deposit setup for faster verification
- Database match for identity-verified accounts
- Automated micro-deposit verification via sandbox
- ACH payment initiation patterns

## Key References

- [Auth product](https://plaid.com/docs/auth/)
- [Micro-deposits](https://plaid.com/docs/auth/coverage/microdeposits/)
- [Same-day micro-deposits](https://plaid.com/docs/auth/coverage/same-day-micro-deposits/)

## Example Interaction

**User:** "I need to get account and routing numbers for ACH payments using Plaid."

**Agent:**
1. Sets up the Auth product in Link token creation
2. Calls /auth/get to retrieve account and routing numbers
3. Shows how to handle institutions that require micro-deposits as fallback
4. Demonstrates storing verified account details securely
5. Notes: "Instant Auth covers ~80% of US accounts. Micro-deposits cover the rest."

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Get auth data | `plaid_getAuthNumbers` | Get account and routing numbers |
| Set verification | `plaid_sandboxSetVerificationStatus` | Set micro-deposit status in sandbox |

## Common Pitfalls

1. **Not handling micro-deposit fallback** - not all institutions support instant Auth
2. **Storing routing numbers in plain text** - treat account/routing numbers as sensitive data
3. **Ignoring verification expiration** - micro-deposits expire after a set period

## See Also

- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - connect accounts with Auth product
- [Plaid Security Best Practices](../plaid-security-best-practices/SKILL.md) - secure storage of account numbers
