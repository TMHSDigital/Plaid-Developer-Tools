# Contributing to Plaid Developer Tools

Thanks for helping improve this plugin. This document describes how to set up locally, extend skills and rules, and submit changes.

## Getting Started

1. **Fork** the repository on GitHub.
2. **Clone** your fork:

   ```bash
   git clone https://github.com/<your-username>/Plaid-Developer-Tools.git
   cd Plaid-Developer-Tools
   ```

3. **Create a branch** for your work:

   ```bash
   git checkout -b your-feature-name
   ```

## Local Development

Install the plugin from your working copy so Cursor loads your changes.

Symlink the repo into the local plugins directory: `~/.cursor/plugins/local/plaid-developer-tools/` (create parent folders if needed).

**Windows (PowerShell):**

```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.cursor\plugins\local\plaid-developer-tools" | Out-Null
cmd /c mklink /J "$env:USERPROFILE\.cursor\plugins\local\plaid-developer-tools\Plaid-Developer-Tools" (Get-Location)
```

Adjust the final path if your clone lives elsewhere.

**macOS / Linux:**

```bash
mkdir -p ~/.cursor/plugins/local/plaid-developer-tools
ln -s "$(pwd)" ~/.cursor/plugins/local/plaid-developer-tools/Plaid-Developer-Tools
```

Restart Cursor after linking so it picks up the plugin.

## Plugin Structure

The repo is organized as a Cursor plugin with **17 skills** and **7 rules**, plus supporting assets.

```text
.cursor-plugin/
  plugin.json
skills/
  <skill-name-kebab>/
    SKILL.md
rules/
  <rule-name>.mdc
assets/
.github/
  workflows/
mcp-server/
tests/
```

- **`plugin.json`** - manifest (name, version, paths to skills/rules).
- **`skills/`** - one directory per skill; each contains `SKILL.md`.
- **`rules/`** - Cursor rules as `.mdc` files with YAML frontmatter.

## Adding a Skill

1. Add a **kebab-case** directory under `skills/`, e.g. `skills/plaid-example-flow/`.
2. Create **`SKILL.md`** with YAML frontmatter including at least `name` and `description`.
3. In the body, include these sections (use `##` headings with these titles):
   - **Trigger** - when the skill should load.
   - **Required Inputs** - what the agent or user must provide.
   - **Workflow** - step-by-step guidance.
   - **Key References** - docs, APIs, or repo paths.
   - **Example Interaction** - short example prompt/response pattern.
   - **MCP Usage** - when to use the companion MCP server, if relevant.
   - **Common Pitfalls** - mistakes to avoid.
   - **See Also** - links to related skills or rules.

Match tone, formatting, and frontmatter style of existing skills in this repo.

## Adding a Rule

1. Add a **`.mdc`** file under `rules/`, e.g. `rules/plaid-example.mdc`.
2. Start with YAML **frontmatter**:
   - `description` - one-line summary for humans and tooling.
   - `alwaysApply` - `true` or `false` depending on whether the rule should apply globally.
   - `globs` - optional glob patterns (e.g. TypeScript paths) when the rule is path-scoped.

3. Below the frontmatter, write the rule content in Markdown (constraints, patterns, anti-patterns).

Keep rules focused; prefer linking to a skill for long workflows.

## Pull Request Process

1. **Update docs** if you change behavior, skill lists, or versioning (`README.md`, `CLAUDE.md`, `CHANGELOG.md`, `ROADMAP.md` as appropriate).
2. **Run tests** from the repo root (see `requirements-test.txt`):

   ```bash
   pip install -r requirements-test.txt
   pytest
   ```

3. **Open a PR** against `main` with a clear title and summary of changes.
4. **Respond to review** feedback; CI must pass before merge.

## Code of Conduct

This project follows the guidelines in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md). By participating, you agree to uphold them.
