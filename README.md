<div align="center">

# Plaid Developer Tools

**Cursor plugin and MCP companion for building on Plaid**

[![Version](https://img.shields.io/badge/version-0.4.0-3B5CFF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xMiAyTDIyIDEyTDEyIDIyTDIgMTJaIi8+PC9zdmc+)](https://github.com/TMHSDigital/Plaid-Developer-Tools)
[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey?style=for-the-badge)](https://creativecommons.org/licenses/by-nc-nd/4.0/)
[![CI](https://img.shields.io/github/actions/workflow/status/TMHSDigital/Plaid-Developer-Tools/ci.yml?branch=main&label=CI&logo=githubactions&style=for-the-badge)](https://github.com/TMHSDigital/Plaid-Developer-Tools/actions/workflows/ci.yml)
[![Validate](https://img.shields.io/github/actions/workflow/status/TMHSDigital/Plaid-Developer-Tools/validate.yml?branch=main&label=Validate&logo=githubactions&style=for-the-badge)](https://github.com/TMHSDigital/Plaid-Developer-Tools/actions/workflows/validate.yml)
[![CodeQL](https://img.shields.io/github/actions/workflow/status/TMHSDigital/Plaid-Developer-Tools/codeql.yml?branch=main&label=CodeQL&logo=githubactions&style=for-the-badge)](https://github.com/TMHSDigital/Plaid-Developer-Tools/actions/workflows/codeql.yml)

**17 skills** - **7 rules** - **30 MCP tools**

[Features](#skills) - [Rules](#rules) - [MCP tools](#mcp-tools) - [Install](#installation) - [Config](#configuration) - [Roadmap](#roadmap)

</div>

---

## Overview

Plaid Developer Tools is a **Cursor** plugin by **TMHSDigital** that packages agent skills, editor rules, and a TypeScript **MCP server** (`mcp-server/`) so you can design, debug, and ship Plaid integrations without leaving the IDE. Production coverage today is **v0.4.0** with ten skills, six rules, and twenty live MCP tools; the rest are staged stubs with version targets on the [roadmap](ROADMAP.md).

<table>
<tr>
<td width="50%">

**What you get**

| Layer | Role |
| --- | --- |
| **Skills** | Guided workflows: Link, `/transactions/sync`, webhooks, sandbox, categories, errors, and future topics |
| **Rules** | Guardrails: `plaid-secrets`, `plaid-error-handling`, `plaid-env-safety`, and upcoming checks |
| **MCP** | Thirty tools (20 live, 10 stubs) for institutions, items, balances, sync, investments, identity, webhooks, and more |

</td>
<td width="50%">

**Quick facts**

| Item | Detail |
| --- | --- |
| **License** | [CC-BY-NC-ND-4.0](LICENSE) |
| **Author** | [TMHSDigital](https://github.com/TMHSDigital) |
| **Repository** | [github.com/TMHSDigital/Plaid-Developer-Tools](https://github.com/TMHSDigital/Plaid-Developer-Tools) |
| **Runtime** | Node 20+ for MCP server builds |

</td>
</tr>
</table>

### How it works

```mermaid
flowchart LR
  U[User / Developer] --> C[Cursor loads plugin]
  C --> S[Skill selected or rule applies]
  S --> M{MCP server configured?}
  M -->|Yes| P[plaid-mcp tools]
  M -->|No| D[Docs-only answers]
  P --> A[Plaid API sandbox / metadata]
  A --> R[Answer in chat or code edits]
  D --> R
```

<details>
<summary><strong>Expand: end-to-end mental model</strong></summary>

1. Install the plugin (symlink into your Cursor plugins directory).
2. Open a Plaid-related task; **rules** such as `plaid-secrets` and `plaid-env-safety` run as you edit.
3. Invoke a **skill** by name (for example `plaid-link-setup` or `plaid-transaction-sync`) when you need a structured workflow.
4. Optionally wire **MCP** so tools like `createLinkToken`, `syncTransactions`, or `verifyWebhookSignature` can call the in-repo server against your credentials.

</details>

---

## Compatibility

| Client | Skills | Rules | MCP server (`mcp-server/`) |
| --- | --- | --- | --- |
| **Cursor** | Yes (native plugin) | Yes (`.mdc` rules) | Yes, via MCP config |
| **Claude Code** | Yes, copy `skills/` | Yes, copy `rules/` | Yes, any MCP-capable host |
| **Other MCP clients** | Manual import | Manual import | Yes, stdio or hosted adapter |

---

## Quick start

**1. Clone**

```bash
git clone https://github.com/TMHSDigital/Plaid-Developer-Tools.git
cd Plaid-Developer-Tools
```

**2. Symlink the plugin (pick your OS)**

Windows PowerShell (run as Administrator if your policy requires it):

```powershell
New-Item -ItemType SymbolicLink `
  -Path "$env:USERPROFILE\.cursor\plugins\plaid-developer-tools" `
  -Target (Get-Location)
```

macOS / Linux:

```bash
ln -s "$(pwd)" ~/.cursor/plugins/plaid-developer-tools
```

Adjust the target path to your actual clone location.

**3. Build the MCP server**

```bash
cd mcp-server
npm install
npm run build
```

**4. Environment**

Copy `.env.example` to `.env` and set `PLAID_CLIENT_ID`, `PLAID_SECRET`, and `PLAID_ENV` (see [Configuration](#configuration)).

<details>
<summary><strong>Example: reference a skill in chat</strong></summary>

Ask the agent to follow **`plaid-webhook-handling`** when implementing webhook routes, or **`plaid-sandbox-testing`** when you need sandbox institutions and error simulation patterns.

</details>

---

## Skills

All seventeen skill directories are listed below. Names match the folder under `skills/` (for example `plaid-api-reference`).

| Skill | Status | Summary |
| --- | --- | --- |
| `plaid-link-setup` | v0.1.0 | Plaid Link integration with `react-plaid-link` |
| `plaid-transaction-sync` | v0.1.0 | `/transactions/sync` cursor-based pagination |
| `plaid-webhook-handling` | v0.1.0 | Webhook types, verification, sandbox firing |
| `plaid-sandbox-testing` | v0.1.0 (enhanced v0.3.0) | Sandbox credentials, test institutions, error simulation, MCP automation |
| `plaid-category-mapping` | v0.1.0 | Personal finance category taxonomy |
| `plaid-error-handling` | v0.1.0 | Error codes, detection, recovery |
| `plaid-api-reference` | v0.2.0 | Endpoint lookup and quick reference |
| `plaid-institution-search` | v0.2.0 | Institution search and coverage |
| `plaid-account-verification` | v0.4.0 | Auth product, micro-deposits, database match |
| `plaid-investment-tracking` | v0.4.0 | Holdings, securities, portfolio aggregation |
| `plaid-identity-verification` | coming v0.5.0 | KYC flows, document verification |
| `plaid-recurring-detection` | coming v0.5.0 | Recurring transaction detection |
| `plaid-react-integration` | coming v0.6.0 | React hooks and patterns |
| `plaid-nextjs-integration` | coming v0.6.0 | Next.js App Router patterns |
| `plaid-migration-guide` | coming v0.7.0 | Migrate from other aggregators |
| `plaid-security-best-practices` | coming v0.7.0 | Token encryption, RLS, audit logging |
| `plaid-production-readiness` | coming v0.7.0 | Production access checklist |

Natural-language aliases you can use in prompts include **link setup**, **transaction sync**, **webhook handling**, **sandbox testing**, **category mapping**, **error handling**, **API reference**, **institution search**, **account verification**, **investment tracking**, **identity verification**, **recurring detection**, **React integration**, **Next.js integration**, **migration guide**, **security best practices**, and **production readiness**.

---

## Rules

| Rule | Status | Scope | What it flags |
| --- | --- | --- | --- |
| `plaid-secrets` | v0.1.0 | Always on | Hardcoded tokens, API keys, client secrets |
| `plaid-error-handling` | v0.1.0 | `*.ts`, `*.js` | Unchecked Plaid API calls |
| `plaid-env-safety` | v0.1.0 | `.env*`, config | Sandbox credentials in production-like settings |
| `plaid-webhook-security` | v0.2.0 | Webhook handlers | Missing webhook signature verification |
| `plaid-sync-cursor` | v0.3.0 | Sync code | Missing cursor persistence for `/transactions/sync` |
| `plaid-link-best-practices` | v0.4.0 | Link UI | Link integration issues and anti-patterns |
| `plaid-token-storage` | coming v0.5.0 | Token storage | Insecure access token handling |

---

## MCP tools

The **`mcp-server/`** package exposes **30** tools (20 live in v0.4.0, 10 stubs; build with `npm run build`). Grouping matches how you would tier access in a real deployment.

### Read-only (no auth)

| Tool | Purpose |
| --- | --- |
| `listCategories` | Personal finance categories |
| `searchInstitutions` | Institution search |
| `getInstitution` | Institution metadata |
| `listProducts` | Available Plaid products |
| `getApiEndpoint` | Endpoint helper |
| `listWebhookTypes` | Webhook event types |
| `listSandboxCredentials` | Sandbox test credentials |
| `listCountryCoverage` | Country coverage |

### Sandbox auth

| Tool | Purpose |
| --- | --- |
| `createLinkToken` | Create a Link token |
| `exchangePublicToken` | Exchange public token |
| `createSandboxItem` | Create sandbox Item |
| `resetSandboxLogin` | Reset sandbox login |
| `fireSandboxWebhook` | Fire sandbox webhook |
| `getAccounts` | List accounts |
| `getBalance` | Balances |
| `syncTransactions` | Transaction sync |
| `getRecurring` | Recurring streams |
| `getInvestmentHoldings` | Investment holdings |
| `getIdentity` | Identity data |
| `getAuthNumbers` | Auth micro-deposit numbers |

### Write / advanced

| Tool | Purpose |
| --- | --- |
| `sandboxSetVerificationStatus` | Sandbox verification status |
| `simulateTransactions` | Simulate transactions |
| `refreshTransactions` | Refresh transactions |
| `removeItem` | Remove Item |
| `getItemStatus` | Item status |
| `updateItemWebhook` | Update Item webhook URL |
| `getLiabilities` | Liabilities |
| `getTransferIntent` | Transfer intent |
| `verifyWebhookSignature` | Verify webhook signature |
| `inspectAccessToken` | Inspect token metadata (debug) |

---

## Installation

| Step | Action |
| --- | --- |
| 1 | Clone [Plaid-Developer-Tools](https://github.com/TMHSDigital/Plaid-Developer-Tools) |
| 2 | Symlink `.cursor-plugin` / repo root per [Quick start](#quick-start) |
| 3 | Restart Cursor |
| 4 | (Optional) Register MCP: point your client at `mcp-server/dist/index.js` after `npm run build` |

Plugin manifest: [`.cursor-plugin/plugin.json`](.cursor-plugin/plugin.json).

---

## Configuration

| Variable | Required | Description |
| --- | --- | --- |
| `PLAID_CLIENT_ID` | For live MCP calls | Plaid client ID |
| `PLAID_SECRET` | For live MCP calls | Plaid secret for the chosen environment |
| `PLAID_ENV` | Recommended | `sandbox`, `development`, or `production` |

Never commit real secrets. The **`plaid-secrets`** and **`plaid-env-safety`** rules exist to catch leaks early.

---

## Roadmap

Summary aligned with [ROADMAP.md](ROADMAP.md):

| Version | Focus |
| --- | --- |
| **v0.1.0** | Core skills, secret / env / error rules, CI, docs, MCP scaffold |
| **v0.2.0** | Read-only MCP tools, `plaid-api-reference`, `plaid-institution-search`, `plaid-webhook-security` |
| **v0.3.0** | Sandbox MCP tools, `plaid-sync-cursor`, `plaid-sandbox-testing` enhancements |
| **v0.4.0** (current) | Full API tools, `plaid-account-verification`, `plaid-investment-tracking`, `plaid-link-best-practices` |
| **v0.5.0** | Identity, recurring detection, `plaid-token-storage` |
| **v0.6.0** | `plaid-react-integration`, `plaid-nextjs-integration` |
| **v0.7.0** | `plaid-migration-guide`, `plaid-security-best-practices`, `plaid-production-readiness` |
| **v1.0.0** | Full polish, 17 skills, 7 rules, 30 MCP tools stable |

---

## Contributing

Issues and PRs are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for conventions (this repo tracks **17 skills** and **7 rules** across docs).

---

## License

Copyright (c) TMHSDigital. Licensed under **CC-BY-NC-ND-4.0** - see [LICENSE](LICENSE).

---

<div align="center">

**Plaid Developer Tools** · Built by [TMHSDigital](https://github.com/TMHSDigital) · [Repository](https://github.com/TMHSDigital/Plaid-Developer-Tools)

</div>
