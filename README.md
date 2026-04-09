# ReWo CMS

A lightweight content-management interface built with React, TypeScript and Vite.

Repository: https://github.com/serhii-tyshchenko/rewo-cms

## Overview

`ReWo CMS` is an admin UI for managing posts, categories, media, tags, users and related content. The project is implemented with React + TypeScript, built with Vite, and includes utilities for localization, API integration, and testing.

## Key Features

- Modern React with TypeScript and Vite for fast development
- i18n support using `i18next`
- Redux for state management
- React Router for route handling and protected routes
- Unit testing with Vitest and testing-library
- Linting and formatting setup (ESLint, Prettier, Stylelint)
- Data fetching and caching using `react-query`
- Styling with SCSS (Sass)

## Tech Stack

- Runtime: Node.js (recommended 16+; use 18+ for best compatibility)
- Framework: React 18 + TypeScript
- Bundler: Vite
- State: Redux, redux-thunk
- Testing: Vitest, @testing-library/react
- Data fetching: `react-query` (caching, background refetching)
- Styling: SCSS (`sass`) for project styles

## Quickstart

1. Install dependencies

```powershell
npm install
```

2. Run development server

```powershell
npm run start
```

3. Build for production

```powershell
npm run build
```

4. Run tests

```powershell
npm run test
```

## Available npm scripts

- `start`: Run the Vite dev server
- `build`: Produce a production build with Vite
- `test`: Run unit tests with Vitest
- `test:coverage`: Run tests and produce coverage report
- `lint:ts`: Run ESLint across `src`
- `lint:scss`: Run Stylelint for SCSS files

## Project Structure (important folders)

- `src/` — main source files
  - `api/` — wrapper functions for backend API endpoints
  - `components/` — reusable React components and UI primitives
  - `pages/` — top-level page components (posts, users, media, etc.)
  - `store/` — Redux configuration, actions and reducers
  - `styles/` — SCSS sources and theme variables (project uses `sass`)
  - `i18n.ts` — localization bootstrap
- `public/` — static assets and localized content for builds
- `build/` — output of CI/builds (committed as part of some deploy workflows)

## Configuration

- Vite configuration: `vite.config.ts`
- TypeScript configuration: `tsconfig.json`
- Linting and formatting: ESLint, Prettier and Stylelint are configured via project devDependencies.

## Environment & Deployment

Environment variables and backend API endpoints are configured through the `src/api` helpers and usage in services. The project includes a `homepage` field and is deployable to services like Netlify (the repo contains a `_redirects` file).

## Contributing

If you'd like to contribute:

1. Fork the repository and create a feature branch
2. Follow the existing code style and run linters/tests locally
3. Open a pull request describing your changes

## License

MIT
