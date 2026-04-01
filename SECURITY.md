# Security Policy

## Reporting a Vulnerability

If you discover a security issue in this plugin (e.g., a rule that fails to catch a secret pattern, or a skill that could leak credentials), please report it responsibly.

**Report:** Open a [private security advisory](https://github.com/TMHSDigital/Plaid-Developer-Tools/security/advisories/new) on GitHub.

Please include:

- Description of the vulnerability
- Steps to reproduce
- Which skill or rule is affected
- Any suggested fix

## Scope

This plugin contains Markdown skill files, MDC rule files, and a TypeScript MCP server for Plaid API integration. The primary security concerns are:

- **Secrets detection rules** failing to flag sensitive patterns (API keys, access tokens, client credentials)
- **Skills recommending insecure practices** (hardcoding keys, storing tokens client-side, skipping webhook verification)
- **MCP server** exposing credentials through improper environment variable handling or logging
- **Access token handling** in MCP tool implementations

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x   | Yes       |
| < 0.1.0 | No        |

## Response Timeline

We aim to acknowledge reports within 48 hours and provide a fix or mitigation within 7 days for confirmed issues.
