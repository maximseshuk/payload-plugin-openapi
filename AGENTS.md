# OpenAPI Plugin for Payload

Payload 4 plugin. Builds OpenAPI 3.0/3.1/3.2 document from sanitized Payload config. Serves it at `/api/openapi.json`, docs UI via Scalar or Swagger UI. Features: filters, security marking from access functions, `custom.openapi` metadata on fields/endpoints, i18n (44 locales), interactive auth, cache, CLI command `openapi:generate`.

## Environment

- pnpm 12. Node.js 24.15+. Payload 4.
- Shared dev config from `@seshuk/payload-plugin-tooling` (oxlint, oxfmt, tsconfig, tsdown, test DB, CI/release workflows, changelog).
- Secrets from env only. Never hardcode keys.

## Commands

```bash
pnpm typecheck        # tsc --noEmit
pnpm lint             # oxlint
pnpm lint:fix
pnpm format           # oxfmt write; format:check to verify
pnpm test:unit        # vitest, tests/unit: no DB
pnpm test:int         # vitest, tests/integration: in-memory DB (TEST_DB=sqlite|postgres|mongodb, default sqlite)
pnpm build            # tsdown -> dist/

pnpm dev              # dev Payload + Next app (tests/payload.config.ts)
pnpm docs:dev         # Mintlify docs site (docs/)
pnpm docs:validate
```

Before every commit: `pnpm typecheck && pnpm lint && pnpm format && pnpm test:unit && pnpm test:int`.

## Structure

`src/index.ts` is the only public entry.

```
src/
├── index.ts               # openapi() plugin, exports
├── shared/
│   ├── constants.ts       # PLUGIN_NAME, paths
│   ├── types/index.ts     # public types (JSDoc = editor hints), ResolvedOptions, BuildContext
│   ├── translations/      # makeT + locales/ (44)
│   └── utils.ts           # deepMerge, isPlainObject, … check here first
├── server/
│   ├── options/resolveOptions.ts # every default lives here
│   ├── endpoints/         # spec.ts (serve doc, ?lang=, cache), interactiveAuth.ts
│   ├── spec/              # generator: build, buildDocument, entitySchemas, fields, params, components, filters, names, tags, security, downconvert, paths/
│   └── ui/                # createUiPlugin + scalar/swagger/html
└── cli/generateSpec.ts    # `payload openapi:generate` (--lang, --out, --server)
tests/
├── vitest.config.ts       # projects: unit, int
├── unit/                  # no DB
├── integration/           # *.int.spec.ts, dev config + testDatabase()
├── helpers/               # i18n stub, build context
└── payload.config.ts, app/, collections/, globals/, blocks/   # runnable dev app
```

## Architecture

- `openapi()` builds nothing at config time. Registers CLI command, stashes `ResolvedOptions` on `config.custom[PLUGIN_NAME]`, merges i18n, mounts endpoints (unless `serve: false`).
- Document built per request or per CLI run from sanitized config. Other plugins' collections/endpoints visible regardless of order.
- Builder always makes 3.2. `openapiVersion: '3.1' | '3.0'` downconverts finished doc in `server/spec/downconvert.ts`. Never branch builder on version.
- Field/endpoint docs ride on Payload `custom.openapi`. No own registry. Types augment `CollectionCustom`/`GlobalCustom`/`FieldCustom` in `shared/types`.
- `servers` set per request in `server/endpoints/spec.ts`: `servers` fn > array > `Host` in `trustedHosts` > `serverURL` > `[]`. Never trust `Host` outside allowlist.
- Extension `transform` fails closed. No try/catch around it.
- UI default `cdnBase` pinned + SRI. Bump version = recompute sha384 in `server/ui/scalar.ts`/`swagger.ts`.

## Rules

- No code comments. Only JSDoc on plugin options types (`src/shared/types/index.ts`).
- Defaults only in `resolveOptions`. Builders take `ResolvedOptions`.
- Removed/renamed v0 keys throw via `assertNoRemovedKeys` (`[<plugin>] <old> was renamed to <new>`). No aliases.
- `excludeOperations` + `security` run for every path group (collection, global, custom, jobs, system) through `finalize` in `buildDocument`. Secured ops get `PayloadLogin` there when `serve && interactiveAuth`.
- Runtime deps: `@scalar/openapi-types` only. Ask before adding one.
- New public option: `shared/types/index.ts` (JSDoc), `server/options/resolveOptions.ts`, `README.md`, docs page, test.
- Match surrounding naming and idiom. Imports end in `.js`. `@/` (= `src/`) for any import that leaves the folder, `./x.js` only in the same folder, no `../`. Tests import source through `@/` too.

## Testing

- vitest in `tests/`: `unit/` (builders, options, plugin factory; no DB), `integration/*.int.spec.ts` (full doc against dev config).
- Test DB from `testDatabase()` (`@seshuk/payload-plugin-tooling/test-database`).
- Plugin factory testable directly: `openapi(opts)(config)`, assert on `endpoints`/`cli`/`custom`/`i18n`.

## Docs

- Mintlify site in `docs/`. User-facing change: update `README.md` and matching docs page.

## Branches

| Branch | Major | Payload | Node   | Takes                          |
| ------ | ----- | ------- | ------ | ------------------------------ |
| `main` | v1    | 4       | 24.15+ | all work; PRs target `main`    |
| `0.x`  | v0    | 3       | 20+    | critical fixes only, from main |

## Releases

- Run `/payload-plugin:release` skill: version bump in `package.json`, `.github/releases/vX.Y.Z.md`, checks, commit `chore(release): vX.Y.Z`, tag. Never pushes.
- Tag push `vX.Y.Z[-pre.N]` runs tooling release workflow: checks, git-cliff notes, GitHub Release, npm publish (OIDC). Dist-tag: `beta` for `-beta.N`, `latest` for newest major, `latest-N` for older major.
- New major and its first prerelease need `.github/releases/vX.Y.Z.md`.
- Tags `v*` never move. Bad release = new version.

## Commits

- One-line Conventional Commit (`feat: add nestedTags option`). Optional scope = `src/` area (`cli`, `endpoints`, `spec`, `translations`, `ui`).
- No co-authored-by or agent trailers.
- Commit locally. Push only when asked.

## Boundaries

Ask first: new runtime dependency, public API change, large refactor, commit/push not requested.

Never: secrets in repo; push, force-push or destructive git without explicit request; edit `dist/` or generated files by hand.
