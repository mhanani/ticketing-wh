# Wehave Ticketing Overview

A small React + TypeScript + Vite take-home app for visualizing sponsor ticket allocations across upcoming football matchdays.

Added [`DEVELOPMENT.md`] to discuss broader context and how this could be managed inside a larger repository.

## Routes

- `/`
  A liberty I took to suggest my own design direction for the ticketing overview, since the brief mentioned curiosity about how I would approach it.
- `/ticketing-wehaveio`
  A second version where I adapted the ticketing overview to better match the styling language, controls, and visual rhythm from the provided `wehave.io` references.

## What It Includes

- Section-based ticketing overview grouped by stadium area
- Sponsor rows with season totals and per-matchday metrics
- Toggleable `Distributed`, `Allocated`, and `Pending` display modes
- Matchday details drawer with ticket-level mock data
- Two route-level design interpretations of the same ticketing problem
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
- Both routes reuse the same shared mock ticketing data and core logic.
- The drawer state is reflected in the URL through query params.
- The interface is intentionally minimal and tuned to the provided references rather than built as a generic admin dashboard.
- For this take-home, leverage custom components rather than a component library.
