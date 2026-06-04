# ReWo CMS

A React and TypeScript admin panel built around the WordPress REST API.

Repository: https://github.com/serhii-tyshchenko/rewo-cms

## Overview

`ReWo CMS` is a headless-style WordPress administration interface. Its core functionality is reading and mutating WordPress content through REST endpoints.

The application connects to a WordPress instance, authenticates with a JWT token, and manages the main `wp/v2` resources used by editorial teams:

- posts
- categories
- comments
- media
- tags
- users

This makes the frontend effectively a custom WordPress back office powered by a modern React UI.

## WordPress API as Core Functionality

The project is structured around the WordPress REST API in `src/api/`.

- Authentication uses `POST /wp-json/jwt-auth/v1/token`
- Current-user role lookup uses `GET /wp-json/wp/v2/users/me?context=edit`
- Content entities are managed through `wp-json/wp/v2/*` endpoints
- Bulk post deletion uses `POST /wp-json/batch/v1`
- Pagination metadata is read from WordPress response headers such as `X-WP-Total` and `X-WP-TotalPages`

Configured resource endpoints include:

- `/wp-json/wp/v2/posts`
- `/wp-json/wp/v2/categories`
- `/wp-json/wp/v2/comments`
- `/wp-json/wp/v2/media`
- `/wp-json/wp/v2/tags`
- `/wp-json/wp/v2/users`

In practice, this means the app depends on a reachable WordPress backend and is not useful without that API layer.

## Key Features

- WordPress-first content management UI for posts, taxonomy, comments, users, and media
- JWT-based login flow against a WordPress backend
- React Query-powered data fetching and caching for REST resources
- React Router protected routes for authenticated admin flows
- Redux store for shared application state
- i18n support with `i18next`
- SCSS-based styling system
- Unit testing with Vitest and Testing Library

## Tech Stack

- Runtime: Node.js 18+ recommended
- Framework: React 18 + TypeScript
- Bundler: Vite
- State: Redux, redux-thunk
- Data fetching: `react-query`
- Styling: SCSS via `sass`
- Testing: Vitest, `@testing-library/react`

## Backend Requirements

To run this project successfully, the target WordPress installation should provide:

- WordPress REST API access for `wp/v2` resources
- JWT authentication endpoint at `/wp-json/jwt-auth/v1/token`
- Permission for the authenticated user to access `users/me?context=edit`
- Support for the batch endpoint `/wp-json/batch/v1` if bulk post deletion is required
- CORS configuration that allows requests from this frontend origin

If your WordPress setup does not expose the JWT route by default, you will need a plugin or custom backend implementation that provides it.

## Exposing Meta Fields in API Responses

By default, WordPress custom post meta fields (post meta) are not exposed in REST API responses. To make meta fields visible and accessible to the frontend, you must explicitly register them in your WordPress `functions.php` file.

Use the `register_post_meta()` function to expose meta fields:

```php
add_action( 'init', function() {
    register_post_meta(
        'post', // Post type
        'your_meta_field_name', // Meta key
        array(
            'type' => 'string', // or 'number', 'boolean', etc.
            'single' => true, // Single value or array of values
            'show_in_rest' => true, // **Required to expose in REST API**
        )
    );
} );
```

Without `'show_in_rest' => true`, the meta field will not appear in API responses even if it exists in the database. Apply this pattern for each custom meta field you need to access from this frontend.

For more details, see [WordPress register_post_meta documentation](https://developer.wordpress.org/reference/functions/register_post_meta/).

## Quickstart

1. Install dependencies

```powershell
npm install
```

2. Configure the WordPress API root URL

Create a local environment file with the base URL of your WordPress site:

```env
VITE_API_ROOT_URL=https://your-wordpress-site.example
```

The app uses this value as the base for all API calls.

3. Run the development server

```powershell
npm run start
```

4. Build for production

```powershell
npm run build
```

5. Run tests

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
- `storybook`: Run Storybook locally
- `storybook:build`: Build the Storybook bundle

## Project Structure

- `src/api/` - WordPress REST API wrappers for authentication and `wp/v2` resources
- `src/pages/` - page-level screens for posts, categories, comments, media, tags, users, and login
- `src/components/` - reusable UI building blocks
- `src/store/` - Redux actions, reducers, selectors, and store setup
- `src/queries/` - data-fetching hooks and query integrations
- `src/localization/` and `src/i18n.ts` - translation setup
- `public/` - static assets and locale files

## Configuration

- `VITE_API_ROOT_URL` defines the WordPress site root used by the API client
- WordPress endpoint constants are defined in `src/constants/_api.ts`
- Shared API helpers for auth headers, error extraction, and pagination header parsing live in `src/api/`
- Vite configuration: `vite.config.ts`
- TypeScript configuration: `tsconfig.json`

## Environment & Deployment

This frontend is intended to be deployed separately from WordPress while communicating with the WordPress REST API over HTTP. The repository includes static hosting artifacts such as `public/_redirects`, making it suitable for deployments on platforms like Netlify, provided the WordPress backend is reachable from the deployed frontend.

## Contributing

1. Fork the repository and create a feature branch
2. Keep the WordPress API contract intact or document any backend changes
3. Run tests and linting locally before opening a pull request
4. Open a pull request with a clear description of the behavioral change

## License

MIT
