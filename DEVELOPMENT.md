# Development Notes

## Context

For this app, I intentionally kept the stack lightweight. The scope is a small front-end exercise centered around a two-screen experience, so I prioritized speed, clarity, and low setup overhead over a heavier production-style foundation.

I chose `Bun` here because it is fast, reliable in this context, and a good fit for a small take-home where quick iteration matters. For a larger or longer-lived production repository, I would usually default to `pnpm` because it is more mature across bigger structure, larger dependency graphs, and long-term maintenance.

## Current App Choices

For this implementation, I chose:

- `React` for the UI layer
- `TypeScript` for type safety and maintainability
- `Vite` for a fast local development workflow
- `React Router` for simple client-side routing and query-param driven UI state
- `Tailwind CSS` for rapid styling with enough flexibility to match a precise visual direction
- `Vitest` and `React Testing Library` for lightweight testing
- `ESLint` and `Prettier` for code quality and consistency

I kept the current architecture intentionally small and feature-oriented because the app scope is narrow. The goal here was not to over-engineer, but to keep the structure readable and extensible enough for the exercise.

## Preferred Scalable Frontend Architecture

If this project were growing into a larger front-end codebase, I would move toward a feature-first structure like this:

```text
src/
├── assets/          # Static files (images, fonts)
├── components/      # Shared/reusable UI components
├── features/        # Feature modules (self-contained)
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       └── index.ts
├── hooks/           # Global custom hooks
├── layouts/         # Page layout wrappers
├── lib/             # Third-party library configs
├── pages/           # Route-level screens
├── services/        # API calls
├── store/           # Global state
├── types/           # Shared TypeScript types/interfaces
└── utils/           # Pure helper functions
```

The principle behind that structure is straightforward: keep business areas isolated, keep shared UI reusable, and avoid coupling unrelated concerns together. The current repo is a reduced version of that philosophy, not a contradiction of it.

## Preferred Full-Stack Direction

If this were a more complete product with a real server layer, I would strongly consider `tRPC` in a TypeScript-heavy stack. I like it because it provides end-to-end typing, a strong developer experience, and shared contracts between client and server without adding unnecessary API boilerplate.

For projects that require SSR, a tighter full-stack web model, or a more integrated routing/data-loading story, I would likely choose `Next.js`. It is a strong option when the application needs more than a purely client-rendered front end.

## State, Validation, UI, And Quality

For client-side state, I would often use `zustand` because it stays lightweight and predictable without adding too much ceremony.

For validation, I would use `zod`. I value it for runtime schema validation, typed form handling, and stronger API boundary safety.

For UI composition, I like `Tailwind CSS` because it is productive and easy to scale. If I needed a stronger component baseline, I would also consider `shadcn/ui` as a practical starting point that still allows enough room for custom design decisions.

For code quality, my default baseline is:

- `ESLint`
- `Prettier`
- `Husky`

That combination helps enforce consistency early and keeps code review focused on product and architecture rather than formatting noise.

## Performance And Component Philosophy

I generally prefer lightweight, reusable, single-purpose components. In my experience, performance stays healthier when components remain focused and responsibilities are easy to reason about.

When the application justifies it, I would use `React.lazy` and `Suspense` for code splitting, and I would use `useMemo` or `useCallback` selectively when profiling or clear rerender pressure shows they are warranted. I do not treat those tools as defaults everywhere; I treat them as targeted optimizations.

## Testing Strategy

My default testing approach is layered:

- `Vitest` + `React Testing Library` for component and integration testing
- `Playwright` for end-to-end flows
- `MSW` for API mocking during development and test execution

In an older or already-established codebase, I could still work with `Jest` if the project was built around it. For a modern Vite-based setup, though, I would generally prefer `Vitest` because it aligns better with the toolchain and keeps the developer experience fast.

## Monorepo Direction

If the product evolved into a monorepo with multiple apps, packages, or shared UI libraries, I would likely use `Turborepo`. It is a strong fit for task orchestration, caching, and coordination across packages without adding unnecessary complexity too early.

## Documentation Preference

For development documentation, I prefer using `Mermaid` diagrams to represent data structures, relationships, and broader app context when a visual explanation is helpful.

I would keep that kind of architectural and implementation-oriented documentation in this file or other developer-facing docs rather than treating the `README` as the primary place for it.
