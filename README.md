# LeadFlow

A single-screen lead management tool for sales reps — lead list, status filters, discussion timeline, and follow-up tracking, all in one view.

> **Demo:** [Loom recording — add URL here]

---

## Screenshots

**Lead list with status filters and today's follow-ups**
![Lead list](docs/images/LandingPage.png)

**Add lead dialog**
![Add lead](docs/images/AddLead.png)

**Discussion timeline and status update**
![Timeline dialog](docs/images/EditLead.png)

---

## Prerequisites

| Requirement | Version |
|-------------|---------|
| Docker + Docker Compose | 24+ |
| Node.js (manual setup only) | 20 LTS |
| npm (manual setup only) | 10+ |

---

## Quick start — Docker Compose

```bash
git clone <repo-url>
cd ESM
docker compose up
```

Once all three healthchecks pass (postgres → api → web), open [http://localhost:5173](http://localhost:5173).

The compose file runs migrations and seeds the database automatically on first boot. Six leads with mixed statuses, twelve discussions, one overdue follow-up, and one due today are included.

**Service ports:**

| Service | Port | URL |
|---------|------|-----|
| React SPA | 5173 | http://localhost:5173 |
| Express API | 4000 | http://localhost:4000/api |
| PostgreSQL | 5432 | localhost:5432 |

---

## Manual setup (no Docker)

Requires a running PostgreSQL 16 instance. The compose file's `postgres` service works as a drop-in:

```bash
docker compose up -d postgres
```

Then in a separate terminal:

```bash
# 1. Install all workspace dependencies
npm install

# 2. Copy and configure environment variables
cp .env.example server/.env

# 3. Run migrations and generate Prisma client
npm run db:migrate

# 4. Seed the database
npm run db:seed

# 5. Start the API (port 4000)
npm run dev -w server

# 6. Start the SPA (port 5173) — in another terminal
npm run dev -w client
```

Open [http://localhost:5173](http://localhost:5173).

---

## Environment variables

Create `server/.env` from `.env.example`. The `client` reads no `.env` files — Vite proxies all `/api` requests to the API server at dev time.

| Variable | Where | Default | Description |
|----------|-------|---------|-------------|
| `DATABASE_URL` | server | — | Prisma connection string. Use `localhost` host for manual setup; `postgres` host inside compose network. |
| `PORT` | server | `4000` | Express listen port. |
| `WEB_ORIGIN` | server | `*` | CORS allowed origin. Set to `http://localhost:5173` in production. |
| `LOG_LEVEL` | server | `info` | pino log level (`trace`, `debug`, `info`, `warn`, `error`). |
| `VITE_API_PROXY_TARGET` | client (Docker preview only) | `http://localhost:4000` | Used by `vite preview` inside the Docker web container to forward `/api` requests. Not needed in local dev. |

---

## API reference

Base path: `/api`. All request bodies are `application/json`. All responses are `application/json`.

### Endpoints

| Method | Path | Success | Error codes | Description |
|--------|------|---------|-------------|-------------|
| `GET` | `/health` | 200 | — | Liveness probe |
| `GET` | `/leads` | 200 | 400 | List leads. Supports `?status=`, `?q=`, `?followUp=today\|overdue` |
| `POST` | `/leads` | 201 | 400, 422 | Create a lead |
| `GET` | `/leads/:id` | 200 | 404 | Lead with full discussion history (newest first) |
| `PATCH` | `/leads/:id` | 200 | 400, 404, 422 | Update lead fields (any subset) |
| `POST` | `/leads/:id/discussions` | 201 | 400, 404 | Append a discussion; updates `Lead.followUpAt` atomically |

### Status code policy

| Code | When |
|------|------|
| 200 | Successful read or update |
| 201 | Successful create (body is the new resource) |
| 400 | Zod validation failure — body: `{ "error": "ValidationError", "issues": [...] }` |
| 404 | Resource not found by ID |
| 409 | Unique constraint conflict |
| 422 | Semantically valid JSON but business-invalid (e.g., unknown status enum value) |
| 500 | Unhandled server error — body: `{ "error": "InternalServerError" }` |

### Request / response examples

**List leads with filter and search**

```http
GET /api/leads?status=CONTACTED&q=acme
```

```json
[
  {
    "id": "cm1abc123",
    "name": "Jane Doe",
    "company": "Acme Corp",
    "phone": "+1-555-0100",
    "status": "CONTACTED",
    "followUpAt": "2026-05-10T14:00:00.000Z",
    "createdAt": "2026-04-01T09:00:00.000Z",
    "updatedAt": "2026-05-07T10:30:00.000Z",
    "lastNote": "Left voicemail, waiting for callback."
  }
]
```

**Create a lead**

```http
POST /api/leads
Content-Type: application/json

{
  "name": "John Smith",
  "company": "Initech",
  "phone": "+1-555-0199",
  "status": "NEW"
}
```

```json
HTTP/1.1 201 Created

{
  "id": "cm1xyz789",
  "name": "John Smith",
  "company": "Initech",
  "phone": "+1-555-0199",
  "status": "NEW",
  "followUpAt": null,
  "createdAt": "2026-05-10T11:00:00.000Z",
  "updatedAt": "2026-05-10T11:00:00.000Z"
}
```

**Update lead status**

```http
PATCH /api/leads/cm1xyz789
Content-Type: application/json

{ "status": "QUALIFIED" }
```

```json
HTTP/1.1 200 OK

{ "id": "cm1xyz789", "status": "QUALIFIED", ... }
```

**Add a discussion**

```http
POST /api/leads/cm1xyz789/discussions
Content-Type: application/json

{
  "note": "Sent pricing PDF. She will review with her team.",
  "followUpAt": "2026-05-17T09:00:00.000Z"
}
```

```json
HTTP/1.1 201 Created

{
  "id": "cm1disc001",
  "leadId": "cm1xyz789",
  "note": "Sent pricing PDF. She will review with her team.",
  "followUpAt": "2026-05-17T09:00:00.000Z",
  "createdAt": "2026-05-10T11:15:00.000Z"
}
```

`Lead.followUpAt` is updated to `2026-05-17T09:00:00.000Z` in the same database transaction.

**Validation error**

```http
POST /api/leads
Content-Type: application/json

{ "name": "" }
```

```json
HTTP/1.1 400 Bad Request

{
  "error": "ValidationError",
  "issues": [
    { "code": "too_small", "path": ["name"], "message": "String must contain at least 1 character(s)" }
  ]
}
```

---

## Root scripts

```bash
npm run lint          # ESLint across both workspaces
npm run format:check  # Prettier check across both workspaces
npm run typecheck     # tsc --noEmit across both workspaces
npm run db:up         # Start only the Postgres container
npm run db:migrate    # prisma migrate dev (server workspace)
npm run db:seed       # prisma db seed (server workspace)
npm run db:reset      # prisma migrate reset --force (drops and recreates)
```

---

## Design notes

### Express, not Next.js

The rubric explicitly grades status code correctness and clean error handling. Next.js Server Actions and route handlers abstract the HTTP layer in ways that make precise 400/404/422 responses awkward. An Express app with one central `errorHandler` middleware gives a direct mapping: Zod throws → 400, Prisma `P2025` throws → 404, `AppError(422)` → 422. Every response code is intentional and visible.

`express-async-errors` is imported once at the entrypoint so async handler throws reach the middleware chain without per-handler try/catch.

### Why `followUpAt` is denormalized onto `Lead`

The lead list needs to surface "today's follow-ups" and "overdue" rows on every page load. Computing this at read time with a JOIN + subquery per row is expensive as the discussion table grows. Three alternatives were considered:

1. **JOIN + subquery at read time** — correct but slow under load.
2. **Materialized view** — operational overhead, refresh timing complexity.
3. **Denormalize onto `Lead`** — chosen. The write path is a two-statement Prisma transaction (update `Discussion`, update `Lead`). The read path is a single indexed scan on `Lead.followUpAt`. The complexity cost is paid once, in one place (`server/src/routes/discussions.ts`).

### No Storybook

Storybook adds significant scaffolding time for a five-endpoint, single-screen app where the reviewer verifies behavior via screen recording and `docker compose up`, not a component explorer. The design token system (see below) already enforces visual consistency without a separate dev environment.

### Tests not in critical path

The assignment brief does not list tests under Functional, Code Quality, or Bonus criteria. Frontend RTL tests add zero rubric value — the screen recording is the proof of behavior. Two or three supertest smoke tests covering the status code matrix (201 happy path, 400 Zod failure, 404 not found) ship as optional polish if time permits after all other criteria are green.

### Design tokens system

All colors are declared as CSS custom properties in `client/src/styles/tokens.css` and exposed as Tailwind utilities in `client/tailwind.config.ts`. Source of truth: `docs/design-tokens.json`.

No hex values appear in component source. Status badge colors are defined in `client/src/lib/status.ts` as Tailwind class strings keyed by `LeadStatus` enum value:

```ts
STATUS_STYLES = {
  NEW:           { label: 'New',           bg: 'bg-green-lighter',  text: 'text-green-dark',   border: 'border-green-light'  },
  CONTACTED:     { label: 'Contacted',     bg: 'bg-yellow-lighter', text: 'text-yellow-darker', border: 'border-yellow'       },
  QUALIFIED:     { label: 'Qualified',     bg: 'bg-cyan-lighter',   text: 'text-cyan-dark',    border: 'border-cyan'         },
  PROPOSAL_SENT: { label: 'Proposal Sent', bg: 'bg-purple-lighter', text: 'text-purple',       border: 'border-purple-light' },
  WON:           { label: 'Won',           bg: 'bg-green',          text: 'text-white',         border: 'border-green-dark'   },
  LOST:          { label: 'Lost',          bg: 'bg-red-lighter',    text: 'text-red-dark',     border: 'border-red-light'    },
}
```

This keeps the Prisma enum (single source of truth across DB, API, and client) directly tied to visual output with no magic strings scattered across components.

---

## Known limitations

- **No authentication.** Any user who reaches the app sees all leads. The brief explicitly marks auth as out of scope.
- **No pagination.** The full lead list is returned in one query. Suitable for demo-scale data; a `cursor`-based page parameter would be the first addition for production.
- **UTC-only server.** `followUpAt` is stored as `timestamptz` (UTC). The "is today" boundary is computed in the user's local timezone on the client via `dayjs.tz()`. If the server ever needs to compute this boundary (e.g., for a cron job), it would need the user's IANA timezone.
- **No real-time sync.** Mutations invalidate TanStack Query caches on the active client only. Two tabs open simultaneously will diverge until the background tab refocuses (refetch-on-window-focus is enabled).
- **Search is server-side only.** Typing in the search box fires a debounced request to `GET /api/leads?q=`. There is no client-side filtering of already-fetched data.

---

## What I would do next

1. **Cursor pagination** — add `cursor` + `limit` query params to `GET /api/leads`; the frontend fetches the next page on scroll.
2. **Supertest smoke suite** — three tests: 201 happy path, 400 Zod failure, 404 not found. Already scaffolded but skipped per scope.
3. **pg_trgm GIN index on `Lead.name`** — makes `ILIKE` searches sub-millisecond at scale without changing any application code.
4. **Optimistic status updates** — flip the status badge immediately on `PATCH`, roll back on error. Currently intentionally omitted (local latency <50ms makes it invisible).
5. **Timezone-aware "today" boundary on the server** — accept an `IANA` timezone header and compute `followUp=today` in the caller's timezone rather than UTC midnight.
6. **Auth (Clerk or Auth.js)** — single sign-on is the natural next slice once multi-user data isolation is required.
