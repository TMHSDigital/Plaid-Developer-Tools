---
name: plaid-identity-verification
description: Implement Plaid Identity and Identity Verification products for KYC flows, document verification, and match scores. Use when the user needs to verify account holder identity.
---

# Plaid Identity Verification

> **Coming in v0.5.0** - This skill will cover the Identity product for account holder information and the Identity Verification product for KYC compliance.

## Trigger

Use this skill when the user:

- Needs to verify the identity of account holders
- Is implementing KYC (Know Your Customer) flows
- Wants to retrieve account holder names, addresses, and contact info
- Needs document verification (ID, passport, driver's license)
- Wants match scores comparing Plaid data to user-provided info

## Required Inputs

- **Product**: Identity (account holder data) or Identity Verification (KYC)
- **Verification level**: Basic identity data, document verification, or selfie match

## Workflow

1. Connect accounts with the `identity` product via Link
2. Retrieve identity data using `/identity/get`
3. For KYC flows, use the Identity Verification product
4. Compare identity data against user-provided information
5. Determine match confidence and take appropriate action

**Planned content:**
- Identity data retrieval (`/identity/get`)
- Identity Verification product setup and flow
- Document verification (ID scanning, OCR)
- Match score interpretation and thresholds
- KYC compliance patterns (CIP, AML)
- Multi-step verification workflows

## Key References

- [Identity product](https://plaid.com/docs/identity/)
- [Identity Verification](https://plaid.com/docs/identity-verification/)
- [Identity match](https://plaid.com/docs/api/products/identity/#identitymatch)

## Example Interaction

**User:** "I need to verify that the person connecting their bank account is who they say they are for KYC compliance."

**Agent:**
1. Explains the difference between Identity and Identity Verification products
2. Shows how to retrieve account holder names and addresses
3. Implements match scoring against user-provided data
4. Sets up document verification as an additional step
5. Notes: "Identity data availability varies by institution"

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Get identity | `plaid_getIdentity` | Get account holder identity information |

## Common Pitfalls

1. **Assuming all institutions return identity data** - coverage varies; handle missing data
2. **Using exact string matching** - names may have variations; use fuzzy matching
3. **Not handling multiple account holders** - joint accounts have multiple owners

## See Also

- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - connect with identity product
- [Plaid Security Best Practices](../plaid-security-best-practices/SKILL.md) - secure handling of PII
