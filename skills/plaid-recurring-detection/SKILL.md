---
name: plaid-recurring-detection
description: Detect recurring transactions using the /transactions/recurring endpoint. Covers frequency detection, subscription identification, and recurring stream management.
---

# Plaid Recurring Detection

> **Coming in v0.5.0** - This skill will cover the recurring transactions endpoint for subscription identification, bill detection, and income stream recognition.

## Trigger

Use this skill when the user:

- Needs to identify recurring transactions (subscriptions, bills, income)
- Wants to detect subscription payments automatically
- Is building a subscription tracker or bill reminder
- Needs to separate recurring from one-time transactions
- Wants to predict upcoming charges

## Required Inputs

- **Access token**: A Plaid access token with the `transactions` product
- **Use case**: Subscription tracking, bill detection, income recognition, or budgeting

## Workflow

1. Ensure the item has the `transactions` product enabled
2. Call `/transactions/recurring/get` to detect recurring streams
3. Process inflow (income) and outflow (bills/subscriptions) streams
4. Map recurring streams to merchant names and categories
5. Build prediction logic for upcoming charges

**Planned content:**
- `/transactions/recurring/get` endpoint usage
- Inflow streams (paychecks, regular deposits)
- Outflow streams (subscriptions, bills, loan payments)
- Frequency detection (weekly, biweekly, monthly, annual)
- Stream status tracking (active, mature, tombstoned)
- Predicted next payment dates
- Subscription management UI patterns

## Key References

- [Recurring transactions](https://plaid.com/docs/api/products/transactions/#transactionsrecurringget)
- [Recurring transaction streams](https://plaid.com/docs/transactions/recurring/)

## Example Interaction

**User:** "I want to show users their active subscriptions detected from bank transactions."

**Agent:**
1. Calls /transactions/recurring/get to get outflow streams
2. Filters for active streams with monthly frequency
3. Maps streams to merchant names and categories
4. Displays subscription list with amount, frequency, and next expected date
5. Notes: "Recurring detection requires 60+ days of transaction history for best results"

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Get recurring | `plaid_getRecurring` | Get recurring transactions for an item |
| Sync transactions | `plaid_syncTransactions` | Ensure transaction history is available |

## Common Pitfalls

1. **Calling too early** - recurring detection needs 60+ days of history to be reliable
2. **Ignoring stream status** - only show "active" streams; "tombstoned" means cancelled
3. **Not refreshing periodically** - recurring streams update as new transactions arrive

## See Also

- [Plaid Transaction Sync](../plaid-transaction-sync/SKILL.md) - ensure transaction data is synced first
- [Plaid Category Mapping](../plaid-category-mapping/SKILL.md) - categorize recurring transactions
