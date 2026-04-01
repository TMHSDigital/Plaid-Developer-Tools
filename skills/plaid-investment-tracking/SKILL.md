---
name: plaid-investment-tracking
description: Track investment holdings, securities, and transactions using the Plaid Investments product. Covers holdings retrieval, security details, cost basis, and supported brokerages.
---

# Plaid Investment Tracking

> **Coming in v0.4.0** - This skill will cover the Investments product including holdings, securities, investment transactions, cost basis, and brokerage coverage.

## Trigger

Use this skill when the user:

- Needs to fetch investment holdings from brokerage accounts
- Wants security details (ticker, CUSIP, ISIN, type)
- Needs investment transaction history (buys, sells, dividends)
- Is building a portfolio tracker or net worth calculator
- Wants cost basis or gain/loss calculations

## Required Inputs

- **Access token**: A Plaid access token with the `investments` product
- **Data needed**: Holdings, securities, transactions, or all

## Workflow

1. Connect brokerage accounts with the `investments` product via Link
2. Fetch holdings using `/investments/holdings/get`
3. Retrieve security details for each holding
4. Fetch investment transactions for history
5. Calculate portfolio value and performance

**Planned content:**
- Holdings retrieval with `/investments/holdings/get`
- Security type mapping (equity, ETF, mutual fund, bond, option, crypto)
- Investment transactions (buys, sells, dividends, fees)
- Cost basis calculation patterns
- Portfolio aggregation across multiple brokerages
- Supported brokerages list and coverage

## Key References

- [Investments product](https://plaid.com/docs/investments/)
- [Holdings endpoint](https://plaid.com/docs/api/products/investments/#investmentsholdingsget)
- [Investment transactions](https://plaid.com/docs/api/products/investments/#investmentstransactionsget)

## Example Interaction

**User:** "I want to show users their total investment portfolio across all connected brokerage accounts."

**Agent:**
1. Fetches holdings from each connected investment item
2. Groups holdings by security type
3. Calculates total portfolio value
4. Shows allocation breakdown by asset class
5. Notes: "Investment data refreshes once per day in production"

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Get holdings | `plaid_getInvestmentHoldings` | Fetch investment holdings and securities |
| Get accounts | `plaid_getAccounts` | List investment accounts with balances |

## Common Pitfalls

1. **Assuming real-time data** - investment holdings update once daily, not in real-time
2. **Ignoring security type** - different security types need different display logic
3. **Missing cost basis** - not all brokerages provide cost basis data

## See Also

- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - connect brokerage accounts
- [Plaid Account Verification](../plaid-account-verification/SKILL.md) - verify investment accounts
