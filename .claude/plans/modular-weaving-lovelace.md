# Review: Ticketing Feature V2

## Context

This is a conceptual task from the CEO to see how you'd implement a ticketing overview screen that looks like their existing wehave.io dashboard (rights page). You extracted design tokens from the login/landing page via `dembrandt`, used the CEO's screenshot of the actual rights page as the visual reference, and built a full feature.

---

## Overall Verdict

**This is strong work.** The architecture, test coverage, responsive design, and feature completeness go well beyond what a "see what you come up with" test typically gets. The code is clean, typed, and well-structured. The main improvements are around **design system accuracy** and **a few copy/labeling issues** that would stand out to the CEO since they'd be comparing your output directly against their screenshot.

---

## What's Good (keep these)

1. **Architecture is clean** - Feature-first folder structure (`ticketing-wehaveio-v2/`), shared types/utils layer, mocks separated. This signals you understand scalable project organization.

2. **The AppShell context is a smart move** - Building the full sidebar + workspace layout shows you're thinking about how this feature lives inside their product, not just building a standalone page. The placeholder screens are a nice touch.

3. **Drawer with URL state** - Using `useSearchParams` for the drawer selection is production-quality UX. Deep-linkable, back-button friendly. This is the kind of detail a technical CEO would notice.

4. **Test coverage is meaningful** - 6 tests covering rendering, search filtering, status switching, section collapse, drawer opening, and empty state. These test real user behavior, not implementation details.

5. **Responsive design** - Desktop table layout + mobile card layout with different information hierarchy. The mobile matchday buttons being full-width stacked is a good adaptation.

6. **Accessibility basics** - `aria-expanded`, `aria-label` on buttons, `aria-hidden` on decorative SVGs. Not perfect but shows awareness.

7. **Theme as CSS custom properties** - Centralizing tokens in `theme.ts` and consuming them via `var(--wehave-v2-*)` is the right pattern. Makes future theming trivial.

---

## What to Improve

### High Priority (would stand out to the CEO)

**1. Column headers are copied from the rights page but don't fit tickets**
- `TicketingWehaveioV2Screen.tsx:145-149`
- "Asset" and "Total price" are carried over from the rights page screenshot verbatim. But in your ticketing context, you're showing sponsors and ticket counts. The CEO will notice that "Total price" shows a number like "45" (tickets) not a price.
- **Fix:** Rename to "Sponsor" and "Season total" (or just "Total").

**2. Hardcoded season strings in multiple places**
- `SponsorTableRow.tsx:87` has `2025/26` hardcoded
- `TicketDetailsDrawer.tsx:89` has `Season 2025/26` hardcoded
- Meanwhile `seasonLabel` exists in the mocks and is used correctly in the screen header.
- **Fix:** Pass `seasonLabel` through or derive it from context.

**3. Description text reads like a developer note, not user-facing copy**
- `TicketingWehaveioV2Screen.tsx:92` — "Rights-page density adapted for multi-sponsor ticket allocations."
- The CEO will read this literally. It exposes that you're "adapting their rights page" rather than designing a purpose-built ticketing screen.
- **Fix:** Something like "Sponsor ticket allocations across upcoming matchdays" or even just drop it.

**4. Primary color mismatch with their actual brand**
- Your theme uses `#5736f3` but the wehave.io brand purple from the landing page extraction is `#5e24ff` / `#4e1fe2` / `#5020e5`. The screenshot's purple also looks deeper/more saturated than what you have.
- This is subtle but the CEO looks at their own brand color every day. They'd notice.
- **Fix:** Cross-reference the screenshot more carefully. `#5020e5` or `#4f20e4` would be closer.

### Medium Priority (code quality)

**5. AppShell uses hardcoded hex colors instead of theme variables**
- `AppShell.tsx` has `#5736f3`, `#f9f9fa`, `#e4e4e7`, etc. inline everywhere
- The V2 feature uses CSS custom properties via `wehaveV2Theme`
- These should share the same token system. If the CEO asks you to tweak the purple, you'd have to change it in two places.
- **Fix:** Either extend the theme to AppShell or extract shared color constants.

**6. Duplicated icon components across files**
- `ChevronDownIcon` is defined in both `TicketingWehaveioV2Screen.tsx:283` and `SectionGroupHeader.tsx:86`
- `SidebarIcon` in AppShell is nearly identical to `SectionGlyph` in SectionGroupHeader
- **Fix:** Extract shared icons to a `shared/icons/` module or a single icons file.

**7. `ToolbarSelect` is defined inline in the screen file**
- `TicketingWehaveioV2Screen.tsx:236-268` — This is a reusable component that should live in `components/`.
- Same for `SearchIcon` and `ChevronDownIcon`.

**8. `getUpcomingMatchdays` is fragile**
- `utils.ts:20-23` — Just grabs matchdays from the first sponsor of the first section. Assumes all sponsors share the same matchday schedule.
- Fine for a demo but worth noting: in production, matchdays would come from a separate fixture list, not derived from sponsor allocations.

### Low Priority (nice-to-haves)

**9. No Escape key to close the drawer**
- Standard UX pattern. Currently only close button and backdrop click work.

**10. The "More" button opens drawer for the first matchday**
- `SponsorTableRow.tsx:122` — `sponsor.matchdays[0]?.matchId`. This is arbitrary. It would make more sense as a link to a sponsor detail page, or to not have a "more" button at all since each matchday cell already opens the drawer.

**11. Badge tone colors in TicketDetailsDrawer are hardcoded**
- `TicketDetailsDrawer.tsx:14-21` — The distributed badge uses `rgba(87,54,243,...)` which is the theme primary, but allocated uses a teal (`rgba(14,116,144,...)`). These status colors aren't in the theme and aren't derived from the design system. They work visually but aren't connected to the token system.

---

## What's Irrelevant / Could Be Dropped

1. **The `dembrandt` extraction output in INSTRUCTIONS.md** — Most of the color data is in lab/oklab format that's basically unusable. The login page and landing page extractions tell you very little about the actual dashboard styling. The screenshot is doing 95% of the work. The extraction adds noise and might make the CEO wonder why you didn't just reference the screenshot directly.

2. **The topbar chips in AppShell** ("By Company", "By Category", "Daily", "Monthly") — These don't connect to anything and aren't from the screenshot. They add visual noise without demonstrating understanding of the product.

3. **`TicketingFilterState` and `DrawerSelection` types** — Defined in `shared/ticketing/types.ts` but never imported or used. The screen manages its own filter state with `useState` and the drawer selection is an inline type.

---

## Summary of Recommended Changes

| Priority | Change | Files |
|----------|--------|-------|
| High | Rename "Asset" -> "Sponsor", "Total price" -> "Season total" | `TicketingWehaveioV2Screen.tsx` |
| High | Replace developer-note description with user-facing copy | `TicketingWehaveioV2Screen.tsx` |
| High | Fix hardcoded season strings | `SponsorTableRow.tsx`, `TicketDetailsDrawer.tsx` |
| High | Adjust primary purple to match wehave brand (`~#5020e5`) | `theme.ts`, `AppShell.tsx` |
| Medium | Unify AppShell colors with theme tokens | `AppShell.tsx`, `theme.ts` |
| Medium | Extract duplicated icons | Multiple files |
| Medium | Move `ToolbarSelect` to components/ | `TicketingWehaveioV2Screen.tsx` |
| Low | Add Escape key handler for drawer | `TicketDetailsDrawer.tsx` |
| Low | Reconsider "More" button behavior | `SponsorTableRow.tsx` |
| Low | Clean up unused types | `types.ts` |

---

## Verification

After applying changes:
1. `bun run test` — all 6 tests should still pass
2. `bun run build` — no type errors
3. Visual check at `localhost:5173/ticketing-wehaveio` — compare column headers, colors, and copy against the CEO's screenshot
