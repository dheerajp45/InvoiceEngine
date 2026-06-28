# Invoice Engine

A modern invoice app built as a hands-on learning project. Create professional invoices, save them securely, download PDFs, and share public links with clients.

Every invoice belongs to an authenticated user. This is a document-creation tool—not accounting or payment tracking.

## What it does (V1)

- **Authentication** — Register, sign in, sign out (Better Auth)
- **Invoice management** — Create, save, edit, delete, and duplicate invoices with customer info, line items, tax, discounts, and notes
- **Dashboard** — View, search, and open your invoices (no revenue analytics)
- **PDF generation** — Download professional invoice PDFs
- **Public links** — Share invoices at `/invoice/[publicId]` (read-only for clients)
- **Business settings** — Business name, address, GST/tax info, currency, and logo on every invoice
- **Email delivery** — Send clients a link to view the invoice (URL only, no PDF attachment)
- **Profile** — Update profile and change password

### Out of scope for V1

Recurring invoices, OCR, teams/roles, custom templates, and invoice analytics.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/docs) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Auth | Better Auth |
| Styling | Tailwind CSS 4, shadcn/ui |

## Project structure

```
src/app/
  page.tsx              # Home
  landing/              # About / product overview
  signin/ signup/       # Auth pages
  dashboard/            # Invoice list (authenticated)
  create/               # Invoice form
  preview/              # Live invoice preview
  api/auth/[...all]/    # Better Auth API routes
lib/
  auth.ts               # Server auth config
  auth-client.ts        # Client auth hooks
  prisma.ts             # Prisma client
prisma/
  schema.prisma         # Database schema
proxy.ts                # Route protection (dashboard, create)
```

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or hosted, e.g. Neon, Supabase)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
BETTER_AUTH_SECRET="your-secret-key-at-least-32-chars"
```

Generate a secret:

```bash
openssl rand -base64 32
```

### 3. Database setup

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |

## Learning approach

This repo is built to learn Next.js and related tools through real features—not isolated tutorials. The primary reference is the [Next.js documentation](https://nextjs.org/docs).

Focus areas: App Router, Server/Client Components, Server Actions, data fetching, authentication, middleware, Prisma, and deployment.

See [`project_info.md`](./project_info.md) for the full roadmap, V1 spec, and phased build plan.

## Current status

| Area | Status |
|------|--------|
| App routing & layouts | Done |
| Invoice create form & preview | Done (in-memory context) |
| Auth (sign up / sign in / sign out) | In progress |
| Protected routes | In progress |
| Database-backed invoices | Planned |
| Dashboard | Planned |
| PDF, public links, email | Planned |

## Roadmap (summary)

1. Finish auth and protected routes
2. Expand Prisma schema (`Invoice`, `InvoiceItem`, `BusinessSettings`)
3. Save invoices with Server Actions
4. Build dashboard (list + search)
5. View, edit, delete, duplicate invoices
6. Public share links
7. Business settings and logo upload
8. PDF generation
9. Email delivery
10. Deploy to production

## License

Private learning project.
