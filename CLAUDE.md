# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (runs codegen first, then Next.js dev server with Turbopack)
npm run dev

# Build (runs codegen first)
npm run build

# Lint (auto-fixes)
npm run lint

# Format
npm run prettier

# GraphQL codegen only (regenerate gql/ types from Contentful schema)
npm run codegen
```

There are no automated tests in this project.

## Architecture

This is the **Turun Wappuradio** website — a Next.js 15 app using the Pages Router with static export (`output: 'export'`). All pages use `getStaticProps` for SSG; there are no API routes in production.

### Live vs. Offseason Modes

The site has two operational modes controlled by environment variables:

- `NEXT_PUBLIC_PLAYER_MODE=live` — shows the audio player with live stream
- `NEXT_PUBLIC_SHOWLIST_MODE=live` — shows the programme schedule (ohjelmakartta)
- `NEXT_PUBLIC_HLS_MODE=live` — enables HLS stream instead of MP3

When neither is live, the front page shows static Contentful content (images, rich text). When live, it shows the player and/or showlist fetched from Google Sheets.

### Data Sources

**Contentful (CMS)** — all static page content, navigation, sponsors, archive entries. Fetched via Apollo Client using the Contentful GraphQL API. GraphQL queries live in `contentful/graphql/*.graphql` and types are generated into `gql/` via `npm run codegen`. Requires `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN`.

**Google Sheets** — the live programme schedule (ohjelmakartta). `scripts/google/client.ts` fetches `GA_SPREADSHEET_SHOWLIST` and parses it into `Show[]` / `ShowsByDate`. Show images are downloaded from Google Drive and saved to `public/showlist/` at build time. Requires `GA_*` service account env vars.

**Google Calendar** — embedded in the off-season homepage via `components/calendar.tsx` using `NEXT_PUBLIC_GOOGLE_CALENDAR_ID` and `NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY`.

**Shoutbox/Metadata backend** — WebSocket connection at `NEXT_PUBLIC_SHOUTBOX_SOURCE` for live chat and now-playing metadata. Managed in `hooks/useShoutboxAndVideo.tsx` context.

### Key Structural Patterns

- `pages/_app.tsx` — global audio element, HLS setup, play/mute state passed as props to all pages. The fixed bottom bar (PlayerControlPanel + ShoutBox + VideoPlayer) lives here.
- `pages/[...slug].tsx` — dynamic content pages from Contentful.
- `pages/arkisto/` — archive of past broadcasts. Static list from Contentful; individual show schedules served from `archive.turunwappuradio.com` (S3).
- `contentful/client.ts` — singleton Apollo Client for SSG fetches.
- `gql/` — auto-generated; do not edit manually.

### Archive Workflow

When archiving a past broadcast: fetch show images + schedule JSON via `pages/api/archiver` (dev only), then upload to S3 at `archive.turunwappuradio.com/<id>` and create a Contentful `Ohjelmakartta` entry. See `archiver/README.md` for full steps.

### Tailwind / Styling

Tailwind v4 with PostCSS. Custom color tokens use the `radio-` prefix (e.g. `bg-radio-bg`, `bg-radio-bg200`, `text-radio-accent200`, `bg-radio-common`). Defined in `tailwind.config.js`.

### Path Aliases

`@/` maps to the project root (configured in `tsconfig.json`).
