# Wehave Ticketing Overview

A small React + TypeScript + Vite take-home app for visualizing sponsor ticket allocations across upcoming football matchdays.

## What It Includes

- Section-based ticketing overview grouped by stadium area
- Sponsor rows with season totals and per-matchday metrics
- Toggleable `Distributed`, `Allocated`, and `Pending` display modes
- Matchday details drawer with ticket-level mock data
- Lightweight tests for key interactions and regressions

## Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Vitest + Testing Library
- ESLint + Prettier

## Scripts

- `bun run dev` starts the local dev server
- `bun run build` creates the production build
- `bun run lint` runs ESLint
- `bun run test` runs the test suite
- `bun run format` formats the repo with Prettier

## Notes

- All data is mock data tailored for the UI exercise.
- The drawer state is reflected in the URL through query params.
- The interface is intentionally minimal and tuned to the provided references rather than built as a generic admin dashboard.
