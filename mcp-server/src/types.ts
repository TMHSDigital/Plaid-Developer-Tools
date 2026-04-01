export interface PlaidToolResponse {
  [key: string]: unknown;
  content: Array<{ type: "text"; text: string }>;
  isError?: boolean;
}

export function textResponse(text: string): PlaidToolResponse {
  return { content: [{ type: "text" as const, text }] };
}

export function errorResponse(error: unknown): PlaidToolResponse {
  const message =
    error instanceof Error ? error.message : String(error);

  const plaidError = (error as any)?.response?.data;
  if (plaidError?.error_type) {
    return {
      content: [
        {
          type: "text" as const,
          text: `Plaid API error (${plaidError.error_type}/${plaidError.error_code}): ${plaidError.error_message}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [{ type: "text" as const, text: `Error: ${message}` }],
    isError: true,
  };
}

export function stubResponse(toolName: string, version: string): PlaidToolResponse {
  return textResponse(
    `${toolName} is not yet implemented. Coming in ${version}. ` +
      "Configure PLAID_CLIENT_ID, PLAID_SECRET, and PLAID_ENV to use this tool when available."
  );
}
