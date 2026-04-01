---
name: plaid-sandbox-testing
description: Test Plaid integrations using the sandbox environment with test credentials, test institutions, custom user scenarios, and error simulation. Use when the user needs to develop or test against Plaid without real bank accounts.
---

# Plaid Sandbox Testing

## Trigger

Use this skill when the user:

- Is developing a Plaid integration and needs test data
- Wants to create sandbox items without the Link UI
- Needs to simulate specific error conditions
- Wants to test webhook handling in sandbox
- Needs to generate test transactions
- Wants to verify their integration works before going to development/production

## Required Inputs

- **Plaid sandbox credentials**: `client_id` and sandbox `secret` (free at https://dashboard.plaid.com/signup)
- **Test scenario**: What the user wants to test (happy path, error handling, specific products)

## Workflow

1. **Sandbox credentials.** Plaid provides three environments. Sandbox requires no real bank accounts:

   | Environment | Base URL | Purpose |
   |-------------|----------|---------|
   | Sandbox | `https://sandbox.plaid.com` | Test with fake data, free, instant |
   | Development | `https://development.plaid.com` | Test with real banks, limited items |
   | Production | `https://production.plaid.com` | Live with real users |

2. **Test user credentials for Link.** Use these in the Plaid Link UI when in sandbox mode:

   | Username | Password | Behavior |
   |----------|----------|----------|
   | `user_good` | `pass_good` | Standard successful login |
   | `user_good` | `pass_good` (MFA: `1234`) | Login requiring MFA code |
   | `user_custom` | varies | Custom sandbox user (see step 5) |

3. **Create sandbox items without Link.** Skip the Link UI entirely for automated testing:

   ```typescript
   const response = await plaidClient.sandboxPublicTokenCreate({
     institution_id: "ins_109508", // First Platypus Bank
     initial_products: [Products.Transactions],
     options: {
       webhook: "https://myapp.com/api/plaid-webhook",
     },
   });

   const publicToken = response.data.public_token;

   // Exchange for access token
   const exchangeResponse = await plaidClient.itemPublicTokenExchange({
     public_token: publicToken,
   });

   const accessToken = exchangeResponse.data.access_token;
   ```

4. **Test institutions available in sandbox:**

   | Institution ID | Name | Products |
   |---------------|------|----------|
   | `ins_109508` | First Platypus Bank | All products |
   | `ins_109509` | First Gingham Credit Union | All products |
   | `ins_109510` | Houndstooth Bank | All products |
   | `ins_109511` | Tartan Bank | All products |
   | `ins_109512` | Tattersall Federal Credit Union | All products |

5. **Simulate errors.** Force specific error states on sandbox items:

   ```typescript
   // Force ITEM_LOGIN_REQUIRED error
   await plaidClient.sandboxItemResetLogin({
     access_token: accessToken,
   });

   // Now calls to this item will return ITEM_LOGIN_REQUIRED
   // Test your update mode Link flow
   ```

6. **Fire test webhooks:**

   ```typescript
   await plaidClient.sandboxItemFireWebhook({
     access_token: accessToken,
     webhook_code: "SYNC_UPDATES_AVAILABLE",
     webhook_type: "TRANSACTIONS",
   });
   ```

7. **Generate test transactions.** Fire the transaction webhook to have Plaid generate new sandbox transactions:

   ```typescript
   await plaidClient.sandboxItemFireWebhook({
     access_token: accessToken,
     webhook_code: "DEFAULT_UPDATE",
     webhook_type: "TRANSACTIONS",
   });

   // Wait a moment, then sync transactions
   const syncResponse = await plaidClient.transactionsSync({
     access_token: accessToken,
     cursor: "",
   });
   ```

8. **Set micro-deposit verification status:**

   ```typescript
   await plaidClient.sandboxItemSetVerificationStatus({
     access_token: accessToken,
     account_id: accountId,
     verification_status: "automatically_verified",
   });
   ```

## Key References

- [Sandbox overview](https://plaid.com/docs/sandbox/)
- [Sandbox test credentials](https://plaid.com/docs/sandbox/test-credentials/)
- [Sandbox public token create](https://plaid.com/docs/api/sandbox/#sandboxpublictokencreate)
- [Sandbox item reset login](https://plaid.com/docs/api/sandbox/#sandboxitemresetlogin)
- [Sandbox item fire webhook](https://plaid.com/docs/api/sandbox/#sandboxitemfirewebhook)

## Example Interaction

**User:** "I want to test my Plaid transaction sync without going through the Link flow every time."

**Agent:**
1. Creates a sandbox item using `sandboxPublicTokenCreate` with `ins_109508`
2. Exchanges the public token for an access token
3. Runs an initial transaction sync to get historical data
4. Fires `SYNC_UPDATES_AVAILABLE` webhook to generate new transactions
5. Demonstrates the full sync loop processing
6. Notes: "Store this access token - sandbox items persist until manually removed"

## MCP Usage

| Step | MCP Tool | Description |
|------|----------|-------------|
| Create sandbox item | `plaid_createSandboxItem` | Instantly create a connected test bank account |
| Reset login | `plaid_resetSandboxLogin` | Force ITEM_LOGIN_REQUIRED error for testing |
| Fire webhook | `plaid_fireSandboxWebhook` | Trigger any webhook type for testing |
| Simulate transactions | `plaid_simulateTransactions` | Generate new test transactions |
| Set verification | `plaid_sandboxSetVerificationStatus` | Set micro-deposit verification status |
| List credentials | `plaid_listSandboxCredentials` | Show available test usernames and behaviors |

## Common Pitfalls

1. **Using sandbox credentials in production** - sandbox `client_id`/`secret` only work against `sandbox.plaid.com`. The `plaid-env-safety` rule flags this.
2. **Expecting real bank data in sandbox** - sandbox returns synthetic data. Account numbers, balances, and transactions are all fake.
3. **Not testing error flows** - happy path works in sandbox by default. Use `sandboxItemResetLogin` to test error recovery.
4. **Forgetting webhook testing** - sandbox webhooks only fire when you explicitly call `sandboxItemFireWebhook`. They don't fire automatically like in production.
5. **Assuming sandbox behavior matches production** - some timing differences exist. Production transactions appear with a delay; sandbox transactions are instant.

## See Also

- [Plaid Link Setup](../plaid-link-setup/SKILL.md) - use Link with sandbox test credentials
- [Plaid Error Handling](../plaid-error-handling/SKILL.md) - handle errors simulated in sandbox
- [Plaid Webhook Handling](../plaid-webhook-handling/SKILL.md) - process webhooks fired from sandbox
