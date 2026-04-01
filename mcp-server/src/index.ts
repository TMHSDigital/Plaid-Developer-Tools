#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { register as registerListCategories } from "./tools/listCategories.js";
import { register as registerSearchInstitutions } from "./tools/searchInstitutions.js";
import { register as registerGetInstitution } from "./tools/getInstitution.js";
import { register as registerListProducts } from "./tools/listProducts.js";
import { register as registerGetApiEndpoint } from "./tools/getApiEndpoint.js";
import { register as registerListWebhookTypes } from "./tools/listWebhookTypes.js";
import { register as registerListSandboxCredentials } from "./tools/listSandboxCredentials.js";
import { register as registerListCountryCoverage } from "./tools/listCountryCoverage.js";
import { register as registerCreateLinkToken } from "./tools/createLinkToken.js";
import { register as registerExchangePublicToken } from "./tools/exchangePublicToken.js";
import { register as registerCreateSandboxItem } from "./tools/createSandboxItem.js";
import { register as registerResetSandboxLogin } from "./tools/resetSandboxLogin.js";
import { register as registerFireSandboxWebhook } from "./tools/fireSandboxWebhook.js";
import { register as registerGetAccounts } from "./tools/getAccounts.js";
import { register as registerGetBalance } from "./tools/getBalance.js";
import { register as registerSyncTransactions } from "./tools/syncTransactions.js";
import { register as registerGetRecurring } from "./tools/getRecurring.js";
import { register as registerGetInvestmentHoldings } from "./tools/getInvestmentHoldings.js";
import { register as registerGetIdentity } from "./tools/getIdentity.js";
import { register as registerGetAuthNumbers } from "./tools/getAuthNumbers.js";
import { register as registerSandboxSetVerificationStatus } from "./tools/sandboxSetVerificationStatus.js";
import { register as registerSimulateTransactions } from "./tools/simulateTransactions.js";
import { register as registerRefreshTransactions } from "./tools/refreshTransactions.js";
import { register as registerRemoveItem } from "./tools/removeItem.js";
import { register as registerGetItemStatus } from "./tools/getItemStatus.js";
import { register as registerUpdateItemWebhook } from "./tools/updateItemWebhook.js";
import { register as registerGetLiabilities } from "./tools/getLiabilities.js";
import { register as registerGetTransferIntent } from "./tools/getTransferIntent.js";
import { register as registerVerifyWebhookSignature } from "./tools/verifyWebhookSignature.js";
import { register as registerInspectAccessToken } from "./tools/inspectAccessToken.js";

const server = new McpServer({
  name: "plaid-mcp",
  version: "0.5.0",
});

registerListCategories(server);
registerSearchInstitutions(server);
registerGetInstitution(server);
registerListProducts(server);
registerGetApiEndpoint(server);
registerListWebhookTypes(server);
registerListSandboxCredentials(server);
registerListCountryCoverage(server);
registerCreateLinkToken(server);
registerExchangePublicToken(server);
registerCreateSandboxItem(server);
registerResetSandboxLogin(server);
registerFireSandboxWebhook(server);
registerGetAccounts(server);
registerGetBalance(server);
registerSyncTransactions(server);
registerGetRecurring(server);
registerGetInvestmentHoldings(server);
registerGetIdentity(server);
registerGetAuthNumbers(server);
registerSandboxSetVerificationStatus(server);
registerSimulateTransactions(server);
registerRefreshTransactions(server);
registerRemoveItem(server);
registerGetItemStatus(server);
registerUpdateItemWebhook(server);
registerGetLiabilities(server);
registerGetTransferIntent(server);
registerVerifyWebhookSignature(server);
registerInspectAccessToken(server);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
