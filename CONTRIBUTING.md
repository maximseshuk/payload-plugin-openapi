# Contributing

Thanks for helping with the OpenAPI plugin for Payload. This guide covers the setup, the rules the code follows, and how pull requests get reviewed.

## Before you start

- For a bug, open an issue with steps to reproduce first, unless the fix is small and obvious.
- For a new feature or a change to the public options, open an issue first and describe the use case. It saves you work if the idea doesn't fit the plugin.
- For security problems, don't open an issue. Follow [SECURITY.md](SECURITY.md).

## Setup

You need Node.js 24.15+ and pnpm 12.

```bash
pnpm install
pnpm test:unit
```

## Test setup

Tests and the dev app need no accounts and no `.env` file. Tests run on an in-memory SQLite database. To run them on Postgres or MongoDB, set `TEST_DB=postgres` (in-memory PGlite) or `TEST_DB=mongodb` (in-memory MongoDB server). `pnpm dev` starts the dev Payload app from `tests/payload.config.ts` and keeps its data in `tests/payload.db`.

## Commands

```bash
pnpm typecheck      # tsc --noEmit
pnpm lint           # oxlint
pnpm format         # oxfmt
pnpm test:unit      # unit tests, no database
pnpm test:int       # integration tests, in-memory database
pnpm build          # tsdown
pnpm dev            # dev Payload app
pnpm docs:dev       # docs site
```

Run `pnpm typecheck && pnpm lint && pnpm format && pnpm test:unit && pnpm test:int` before you push.

## Code rules

- **Keep defaults in `resolveOptions`.** Every default lives in `src/server/options/resolveOptions.ts`. Builders take `ResolvedOptions`, never the raw options.
- **Document every new public option.** Add it to `src/shared/types/index.ts` (with JSDoc) and `src/server/options/resolveOptions.ts`, then to `README.md` and the docs page, and cover it with a test.
- **Build once, convert after.** The builder always produces OpenAPI 3.2. `openapiVersion: '3.1' | '3.0'` is applied to the finished document in `src/server/spec/downconvert.ts`. Never branch the builder on the version.
- **Describe fields and endpoints through `custom.openapi`.** It is Payload's own `custom` key. Don't add a separate registry.
- **Reuse `src/shared/utils.ts`.** Check it before you write a helper such as `deepMerge` or `isPlainObject`.
- **Comment sparingly.** Name things so the code explains itself. Add a comment only for a workaround or a constraint a reader would miss. The public types in `src/shared/types/index.ts` keep their JSDoc.
- **Match the surrounding code.** Follow the naming and patterns already used in the file you change. Imports end in `.js`. Use `@/` (`src/`) for an import that leaves the folder and `./x.js` only within the same folder.
- **Ask before adding a runtime dependency.** The only one today is `@scalar/openapi-types`. Say why in the issue or PR.

## Tests

- Add or update tests for every behavior change.
- Tests live in `tests/`. `tests/unit/` covers builders, options and the plugin factory without a database. `tests/integration/*.int.spec.ts` builds the full document against the dev config.
- Get the database from `testDatabase()` (`@seshuk/payload-plugin-tooling/test-database`), not from a hard-coded adapter.
- Name a `describe` after the function or feature under test (`schemaName`, `spec/fields`). Start an `it` name with a present-tense verb and write it in plain English: `turns a slug into PascalCase`, not `should turn…`.
- A bug fix should come with a test that fails without the fix.
- Don't commit `.only`, `.skip` or placeholder tests.

## Docs

If users will notice the change, update `README.md` and the matching page in `docs/`. Preview the site with `pnpm docs:dev`, and run `pnpm docs:validate` and `pnpm docs:check-links` after you edit it.

## Commits and pull requests

- Use [Conventional Commits](https://www.conventionalcommits.org/) with a short, one-line subject, for example `fix: keep tags when a filter hides a path` or `feat: add nestedTags option`. The release changelog is built from these.
- Keep each PR focused on one change. Open it against `main`, which holds 1.x for Payload 4. The `0.x` branch (Payload 3) only takes critical and high-severity security fixes, which are cherry-picked from `main` where possible.
- Fill in the PR template: what changed, why, and how you tested it. Link the issue (`Closes #123`).
- CI must pass. The `Lint, typecheck, test, build (24)` check runs lint, format check, typecheck, unit tests and the build on Node 24.
- All review threads need to be resolved before merge.

## License

By contributing, you agree that your work is released under the [MIT License](LICENSE).
