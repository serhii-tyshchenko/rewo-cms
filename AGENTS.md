# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project At A Glance

- Stack: React 18 + TypeScript + Vite, Redux, React Query, SCSS, i18next.
- Backend contract: WordPress REST API (`wp-json/wp/v2/*`) plus JWT auth endpoint.
- Runtime requirement: set `VITE_API_ROOT_URL`.

For full project overview, see [README.md](README.md).

## High-Value Commands

- Install: `npm install`
- Dev server: `npm start`
- Build: `npm run build`
- Tests: `npm test`
- Coverage: `npm run test:coverage`
- TS lint: `npm run lint:ts`
- SCSS lint: `npm run lint:scss`

Prefer validating changes with targeted tests first, then run broader checks before finishing.

## Architecture Map

- App routing and auth gating: [src/App.tsx](src/App.tsx), [src/protected-route.tsx](src/protected-route.tsx)
- API layer: [src/api/](src/api/)
- API constants and routes: [src/constants/\_api.ts](src/constants/_api.ts), [src/constants/\_common.ts](src/constants/_common.ts)
- Data fetching hooks: [src/queries/](src/queries/)
- Global state: [src/store/](src/store/)
- UI and page composition: [src/components/](src/components/), [src/pages/](src/pages/)
- Localization bootstrap: [src/i18n.ts](src/i18n.ts)
- Tooling config: [tsconfig.json](tsconfig.json), [vite.config.ts](vite.config.ts)

## Repository Conventions

- Use TypeScript path aliases from [tsconfig.json](tsconfig.json) (`@api/*`, `@components/*`, `@store/*`, `@utils/*`, `~styles`, `~assets`).
- Keep file naming aligned with existing patterns:
  - resource modules/constants: `_posts.ts`, `_users.ts`, etc.
  - shared exports via `index.ts` barrels
  - components commonly in kebab-case
- Reuse existing constants for routes/endpoints/messages before introducing new literals.
- Follow existing separation:
  - API calls in `src/api`
  - React Query logic in `src/queries`
  - Redux actions/reducers/selectors in `src/store`

## Auth And API Pitfalls

- Auth flow depends on:
  - `POST /wp-json/jwt-auth/v1/token`
  - `GET /wp-json/wp/v2/users/me?context=edit`
- Route access depends on both Redux auth state and token validation in [src/App.tsx](src/App.tsx).
- Local storage key is derived from app name (`LS_KEY_NAME` in [src/constants/\_common.ts](src/constants/_common.ts)).
- Bulk operations must respect `BATCH_ENTRIES_LIMIT` in [src/constants/\_common.ts](src/constants/_common.ts).

## Editing Guardrails

- Do not edit generated output unless explicitly asked:
  - [build/](build/)
  - [coverage/](coverage/)
- Keep changes focused and consistent with existing style/lint rules.
- If adding dependencies or changing scripts/tooling, document rationale in PR/commit message.

## When Unsure

Start from existing patterns in the same feature area (page, query, API module, store slice) and mirror the local style before introducing new abstractions.
