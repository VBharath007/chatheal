# ChatHeal — complete light glass redesign

The seven main public pages now share a light mint/cream glass design, locally bundled Roboto, colourful Lucide icons and Framer Motion transitions. Existing public detail pages and member screens use the same shared visual system.

## Run locally

Use Node.js 24 LTS. From this folder:

```bash
npm ci
cp .env.local.example .env.local
npm run dev
```

Open http://localhost:3000. Set `NEXT_PUBLIC_API_URL` in `.env.local` to your existing backend URL. For production checks, run `npm run build` followed by `npm start`. Run `npm run typecheck` for TypeScript validation.

## Page map

| Page | Route | Main implementation |
| --- | --- | --- |
| Home | `/` | `src/components/pages/Home.tsx` |
| About ChatHeal | `/about` | `src/components/pages/About.tsx` |
| Meet Sujitha | `/team` | `src/components/pages/Team.tsx` |
| Our approach | `/approach` | `src/components/pages/Approach.tsx` |
| Programmes | `/programmes` | `src/components/pages/Programmes.tsx` |
| Recipes & stories | `/recipes` | `src/components/pages/Journal.tsx` |
| Contact | `/contact` | `src/components/pages/Contact.tsx` |

Member routes remain `/wellness`, `/diary`, `/discover`, `/appointments`, `/sessions`, `/progress` and `/settings`. The member workspace has a desktop sidebar and a mobile drawer. Programme and recipe details, journal articles, assessment, cart, checkout and policy routes are retained.

## Maintain the project

- `src/app`: Next.js App Router routes, layouts and styles.
- `src/components/design`: shared buttons, headings, cards, icons, FAQ and motion wrappers.
- `src/components/pages`: the seven redesigned public pages.
- `src/components/store`: shared public shell, cart state and existing checkout/detail flows.
- `src/components/screens`: existing member screen components.
- `src/lib/design/content.ts`: shared editorial copy and FAQ data.
- `src/lib/catalog.ts`: programme, recipe and article data.
- `src/lib/api.ts`: existing backend integration.
- `src/app/glass-system.css`: shared colour, typography, glass surfaces and responsive overrides; Tailwind utilities handle component grids and spacing.
- `public`: bundled images, logo and local Roboto font files with licence.

Change a reusable component or design token once to update its consumers. Keep new routes thin and place page content in `components/pages`. Motion respects reduced-motion settings. Comparison tables can scroll horizontally on small screens.

## Integration boundaries

This ZIP contains the user frontend, not the backend. Authentication, persisted member information, food services, appointments and live sessions need your original API and provider configuration. The client demo can preview the member UI without those services.

Programme prices and checkout remain illustrative. Payments are not connected. The contact form prepares a copyable enquiry; it does not send email or messages. The founder page uses verified existing profile text, without invented staff or testimonials.

See `QA-NOTES.md` for validation scope. Install dependencies locally; generated build output and node_modules are intentionally excluded from the ZIP.
