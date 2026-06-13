# payload-plugin-openapi Development Guidelines

This document outlines coding standards and practices for **@seshuk/payload-plugin-openapi** — a Payload CMS plugin that builds an OpenAPI 3.0/3.1/3.2 document from a sanitized Payload config and serves it through Scalar or Swagger UI.

`CLAUDE.md` and `GEMINI.md` are symlinks to this file.

## Core Principles

**Lazy, Config-Driven Generation**: The document is never built at config time. `openapi()` only registers the `bin` script, stashes `ResolvedOptions` on `config.custom[PLUGIN_NAME]`, merges i18n bundles, and (unless `serve: false`) mounts the endpoints. The actual document is built per request or per CLI run from the fully _sanitized_ config — so every other plugin's collections, globals, fields, and endpoints are visible regardless of plugin order.

**Always Build 3.2, Downconvert Down**: The builder always produces OpenAPI 3.2. `openapiVersion: '3.1'` and `'3.0'` run a downconversion pass (`src/spec/downconvert.ts`) on the finished document. Never branch the builder on version — add to the downconverter instead.

**Native Metadata, No Registry**: Field- and endpoint-level docs ride on Payload's own `custom.openapi` key. The plugin reads that shape; it does not keep a parallel registry. Localizable strings (`description`/`title`/`summary`) may be functions or locale-keyed objects, resolved in `src/spec/entitySchemas.ts`.

**Resolve Options Once**: Defaults live in `resolveOptions` (`src/options.ts`), nowhere else. Builders take `ResolvedOptions`, never raw user options.

**Minimal Surface**: `src/index.ts` is the single public entry point. The runtime dependency footprint is essentially just `@scalar/openapi-types` — keep it that way.

## Toolchain

The toolchain is **oxc**: `oxlint` for linting, `oxfmt` for formatting. There is **no eslint or prettier** — don't reach for them. The build is **rslib** (not rsbuild or tsup). The package manager is **pnpm**; don't use npm/yarn or commit a `package-lock.json`/`yarn.lock`.

## Key Restrictions

- Never switch the toolchain (eslint, prettier, tsup, a different package manager) without being asked.
- Never downgrade the TypeScript `lib`/`target` below ES2023 / Node 20 — `.toSorted()` and friends are intentional.
- Never branch the builder on `openapiVersion`; downconvert from 3.2 instead.
- Never scatter option defaults outside `resolveOptions`.
- Never edit `dist/`, `node_modules/`, or other generated output by hand.
- Never commit secrets, push directly to `main`, or add the agent as a commit/PR author.

## Repository Layout

The shipped source is `src/`. `tests/` is both the vitest suite and a runnable Payload + Next dev app.

- `src/index.ts` — public exports: `openapi`, `scalar`/`swaggerUi`, `buildOpenApiDocument`, the downconverters, and all types.
- `src/options.ts` — `resolveOptions`; the home of every default.
- `src/types.ts` — public types plus `ResolvedOptions`/`BuildContext`.
- `src/endpoints/` — runtime handlers: `spec.ts` (serves the doc; `?lang=` + cache), `interactiveAuth.ts` (credential→JWT).
- `src/bin/generateSpec.ts` — the `openapi:generate` CLI (`--lang`, `--out`, `--server`).
- `src/spec/` — the generator: `build.ts`, `buildDocument.ts`, `entitySchemas.ts`, `fields.ts`, `params.ts`, `components.ts`, `filters.ts`, `names.ts`, `tags.ts`, `downconvert.ts`, and `spec/paths/` (collections, globals, auth, versions, jobs, custom).
- `src/ui/` — docs renderers: `createUiPlugin.ts` (shared factory), `scalar.ts`/`swagger.ts` (thin), `html.ts`.
- `src/translations/` — `index.ts` registers locale bundles + `makeT`; `locales/` holds 44 files.
- `src/utils.ts` — shared helpers (`deepMerge`, `isPlainObject`, …); check here before adding a utility.

## Code Style

Internal imports use the `.js` extension under ESM/NodeNext even though the files are `.ts` — match the surrounding imports. TypeScript runs in strict mode; avoid `any` and prefer precise types from `@scalar/openapi-types` and `payload`. Keep comments load-bearing — explain _why_, not _what_, and match the existing low density. When adding a public option, change all four sites in one PR: `types.ts` (with accurate JSDoc — it's the editor-hint source of truth), `options.ts`, the `README.md`, and a test. Format and lint touched files: `pnpm exec oxfmt <file>` and `pnpm lint`.

## Testing Requirements

Tests are vitest in `tests/` — `unit.spec.ts` (builders, options, downconvert, the plugin factory in isolation) and `int.spec.ts` (the full document built against the dev config). Follow TDD for behavior changes: write the failing test first. The plugin factory is directly testable — call `openapi(opts)(config)` and assert on the returned `endpoints`/`bin`/`custom`/`i18n`. Cover success, failure, and the edge that motivated the change; don't assert on log output. Run `pnpm test` before committing anything under `src/`, and **show the output** — never claim "tested" or "all green" without pasted evidence in the same turn.

## Build & Commands

| Task           | Command                                      |
| -------------- | -------------------------------------------- |
| Typecheck      | `pnpm typecheck`                             |
| Lint / fix     | `pnpm lint` · `pnpm lint:fix`                |
| Format / check | `pnpm format` · `pnpm format:check`          |
| Test / watch   | `pnpm test` · `pnpm test:watch`              |
| One test file  | `pnpm exec vitest run tests/unit.spec.ts`    |
| Build          | `pnpm build`                                 |
| Dev app        | `pnpm dev` (boots `tests/payload.config.ts`) |

## Commits and PRs

Use Conventional Commits (`type: subject`) with the subject focused on user impact, one logical change per commit. The **scope is optional** — there's no commitlint enforcing it. When one helps, use the `src/` folder you touched (`bin`, `endpoints`, `spec`, `translations`, `ui`); `release` is reserved for the `pnpm version` scripts (`chore(release): v%s`). Don't invent scopes beyond those.

**Never add a `Co-Authored-By` trailer or any agent attribution to commits.** Agents assist; they don't author. The commit message is the subject line and (when needed) a body explaining _why_ — nothing else.

Branch off `main` and open a PR rather than pushing to it; force-push only with `--force-with-lease`. Keep `README.md` and JSDoc in sync with any option, command, or behavior change in the same PR. Ask first before adding a runtime dependency, changing a public signature, or doing a repo-wide refactor.
