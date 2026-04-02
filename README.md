<div align="center">

# Wehave Ticketing Overview

A take-home exercise for [wehave.io](https://wehave.io) — sponsor ticket allocations across upcoming matchdays,
built to match the platform's design system.

[![React](https://img.shields.io/badge/React-19-58c4dc?style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=flat-square)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-runtime-f472b6?style=flat-square)](https://bun.sh)
[![Tests](https://img.shields.io/badge/Tests-7%20passing-22c55e?style=flat-square)](#scripts)

</div>

---

<div align="center">

**`/ticketing-wehaveio`** is the main deliverable.
The app shell simulates the wehave.io sidebar navigation with placeholder routes.

</div>

---

## Features

| Feature | Status |
| :--- | :---: |
| Section-based overview (Business Seats, Lounge, Press Club) | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Collapsible sections with tree-view sponsor rows | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Season totals, progress bars, per-matchday counts | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Status filter: Distributed / Allocated / Pending | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Status-aware progress (purple, teal, dashed) | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Search, sort, column visibility toolbar | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Season dropdown with distinct data per season | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Matchday details drawer (URL-driven) | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| CSV export for selected season | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |
| Simulated wehave.io app shell | ![done](https://img.shields.io/badge/-done-22c55e?style=flat-square) |

## Structure

```
src/
  features/ticketing-wehaveio-v2/   Screen + components (SponsorTableRow, SectionGroupHeader, TicketDetailsDrawer)
  shared/ticketing/                 Types, utils (filter, sort, selection), CSV export
  mocks/ticketing.ts                Season-keyed mock data (2023-24, 2024-25, 2025-26)
  components/ui/                    shadcn/ui primitives (Button, Badge, DropdownMenu)
  app/                              App shell, router, tests
```

## Scripts

```bash
bun run dev       # Start dev server
bun run build     # Production build
bun run test      # Run test suite
bun run lint      # ESLint
bun run format    # Prettier
```

## Design Approach

- Closely follows the wehave.io platform styling: system-ui font, exact color palette extracted from the reference, shadcn/ui base components with wehave-specific variants.
- Kept minimal and theme-agnostic — focused on matching the existing design language rather than introducing new patterns.
- All data is mock data tailored for the UI exercise.
- Drawer state reflected in the URL through query params.
