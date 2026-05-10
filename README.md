# LeadFlow

A single-screen lead management tool — lead list with status filters, discussion timeline, and follow-up tracking.

**Demo video:** _<Loom URL here>_

## Screenshots
<img width="1893" height="963" alt="Screenshot 2026-05-10 203735" src="https://github.com/user-attachments/assets/b44defaf-26cf-446b-a70e-a8ed5bb77901" />
<img width="1912" height="870" alt="Screenshot 2026-05-10 203910" src="https://github.com/user-attachments/assets/cd176911-7b9e-4fa6-b111-241199ffed1b" />
<img width="1913" height="842" alt="Screenshot 2026-05-10 203952" src="https://github.com/user-attachments/assets/5c626531-734a-45ff-b2ca-580f84079780" />
<img width="1907" height="950" alt="Screenshot 2026-05-10 204031" src="https://github.com/user-attachments/assets/910a14a3-b9f8-41d7-b2e8-6c7d78696771" />
<img width="1895" height="916" alt="Screenshot 2026-05-10 204425" src="https://github.com/user-attachments/assets/244fdb23-8cbd-463e-96f1-6410dfbe07da" />




## Quick start

```bash
git clone https://github.com/SachinM44/Es-magico-.git leadflow
cd leadflow
cp .env.example server/.env
docker compose up
```

Open [http://localhost:5173](http://localhost:5173). Migrations run and the database seeds automatically on first boot — six leads with mixed statuses, twelve discussions, one overdue, one due today.

| Service | Port |
| --- | --- |
| Web (Vite preview) | 5173 |
| API (Express) | 4000 |
| Postgres | 5432 |

## Manual setup (no Docker)

Requires Node 20+ and a running Postgres 16. The compose file's `postgres` service works as a drop-in: `docker compose up -d postgres`.

```bash
npm install
cp .env.example server/.env
npm run db:migrate
npm run db:seed
npm run dev -w server     # terminal 1, port 4000
npm run dev -w client     # terminal 2, port 5173
```

## Environment

See [`.env.example`](./.env.example). All variables are read by the server. The client uses Vite's proxy to reach the API in dev.

## API

Base path: `/api`. JSON in, JSON out.

| Method | Path | Success | Errors |
| --- | --- | --- | --- |
| GET | `/health` | 200 | — |
| GET | `/leads` | 200 | 400 |
| POST | `/leads` | 201 | 400, 422 |
| GET | `/leads/:id` | 200 | 404 |
| PATCH | `/leads/:id` | 200 | 400, 404, 422 |
| POST | `/leads/:id/discussions` | 201 | 400, 404 |

`GET /leads` supports `?status=`, `?q=` (case-insensitive name search), `?followUp=today|overdue`. List rows include a `lastNote` field denormalized from the latest discussion.

`POST /leads/:id/discussions` updates `Lead.followUpAt` in the same transaction when the body includes `followUpAt`.

Validation errors return `{ "error": "ValidationError", "issues": [...] }` with Zod issue shape.

## Scripts

```bash
npm run lint          # ESLint across both workspaces
npm run typecheck     # tsc --noEmit across both workspaces
npm run db:migrate    # prisma migrate dev
npm run db:seed       # prisma db seed
```
