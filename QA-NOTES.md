# Validation — 2 November 2026

## Passed

- `npm run build`: production build and all 31 generated routes.
- `npm run typecheck`: no TypeScript errors.
- Production server launched locally and exercised with headless Chromium/Playwright.
- 60 responsive route checks: 16 public/login routes at 1440px and 375px; the seven redesigned pages additionally at 1024px and 768px; seven member screens at 1440px and 375px.
- Public responses were HTTP 200, images loaded, and no document-level horizontal overflow was detected. Programme comparison intentionally scrolls within its own labelled region.
- No browser page exceptions during the test run.
- Programme search, empty state/reset, add-to-bag and cart display.
- Recipes/stories filtering.
- Contact enquiry draft generation.
- Mobile public navigation to the founder page.
- Member demo entry, hidden mobile sidebar, open/close drawer, all member route layouts.
- Full-page visual inspection of public homepage and member overview; screenshots are QA-only and excluded from this package.

## Scope and limits

Tests use the client demo and an unauthenticated API response; the backend is not included. Live login, real API persistence, booking providers, video calls and payments were not verified. Checkout remains a preview, and the contact form creates a copyable draft rather than sending it.

The browser checks simulate viewport widths; they do not certify every physical device or Safari rendering. Review your real API integration and content/prices before deployment.
