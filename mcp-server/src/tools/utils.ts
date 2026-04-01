import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

let cachedClient: PlaidApi | null = null;

export function getPlaidClient(): PlaidApi {
  if (cachedClient) return cachedClient;

  const clientId = process.env.PLAID_CLIENT_ID;
  const secret = process.env.PLAID_SECRET;
  const env = process.env.PLAID_ENV ?? "sandbox";

  if (!clientId || !secret) {
    throw new Error(
      "PLAID_CLIENT_ID and PLAID_SECRET environment variables are required. " +
        "Get free sandbox credentials at https://dashboard.plaid.com/signup"
    );
  }

  const validEnvs = ["sandbox", "development", "production"] as const;
  if (!validEnvs.includes(env as any)) {
    throw new Error(
      `Invalid PLAID_ENV: "${env}". Must be one of: ${validEnvs.join(", ")}`
    );
  }

  const configuration = new Configuration({
    basePath: PlaidEnvironments[env as keyof typeof PlaidEnvironments],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  });

  cachedClient = new PlaidApi(configuration);
  return cachedClient;
}
