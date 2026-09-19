# Real-time Fraud Detection Analytics

Next.js + Better Auth + Drizzle ORM + PostgreSQL dashboard for fraud analytics.

## Local setup

1. Install Node.js 20+.
2. Create PostgreSQL database:
   `CREATE DATABASE fraud_detection;`
3. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and `BETTER_AUTH_URL`.
4. Install dependencies:
   `npm install`
5. Create/update database tables:
   `npm run db:push`
6. Run:
   `npm run dev`
7. Open http://localhost:3000

## Verification

Run:
- `npm run typecheck`
- `npm run build`

## Vercel deployment

Create a PostgreSQL database that is reachable from Vercel (Neon, Supabase, or another managed PostgreSQL provider).

Set these Vercel Environment Variables for Production (and Preview if desired):
- `DATABASE_URL` = your managed PostgreSQL connection string
- `BETTER_AUTH_SECRET` = a random secret of at least 32 characters
- `BETTER_AUTH_URL` = your production HTTPS URL, for example `https://your-app.vercel.app`

Before the first production deployment, run the schema against the production database from a trusted machine/CI environment:

`npm run db:push`

Then deploy to Vercel. Build command:
`npm run build`

Start command is handled by Vercel/Next.js.

## Important

Do not commit `.env.local` or production database credentials. `.env.example` is safe to commit.

The demo data seeding happens once per authenticated user. It is intentionally not performed with `revalidatePath()` during page rendering because Next.js does not allow that cache invalidation during render.
