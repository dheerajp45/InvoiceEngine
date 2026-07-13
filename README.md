# Invoice Engine

A modern invoice SaaS built as a hands-on Next.js learning project. Create professional invoices, save them securely, download PDFs, and share public links with clients.

Every invoice belongs to an authenticated user. This is a document-creation tool—not accounting or payment tracking.

## What it does (V1)

- **Landing page** — Marketing homepage at `/` with product hero, feature pills, and session-aware navigation
- **Authentication** — Email/password sign up and sign in, Google OAuth, email verification, forgot/reset password, sign out (Better Auth + Resend)
- **Invoice management** — Create, save, edit, delete, and duplicate invoices with customer info, line items, tax, discounts, and notes
- **Dashboard** — Stats row (total invoices, created this month, latest invoice), searchable invoice list, desktop table + mobile cards, duplicate action
- **PDF generation** — Download professional invoice PDFs via `@react-pdf/renderer`
- **Public links** — Share read-only invoices at `/share/[publicId]` (clients can view and download PDF)
- **Business settings** — Business name, address, GST/tax info, currency (default INR), and logo on every invoice
- **Email delivery** — Send clients a link to view the invoice (URL only, no PDF attachment)
- **Account settings** — Business profile, set/change password (credential and Google-linked accounts)

### Out of scope for V1

Recurring invoices, OCR, teams/roles, custom templates, and invoice analytics.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/docs) (App Router) |
| Language | TypeScript |
| Database | PostgreSQL |
| ORM | Prisma 7 |
| Auth | [Better Auth](https://www.better-auth.com/) (email/password + Google) |
| Email | [Resend](https://resend.com/) |
| PDF | [@react-pdf/renderer](https://react-pdf.org/) |
| Styling | Tailwind CSS 4, shadcn/ui |

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/signin`, `/signup` | Public | Auth (redirects to dashboard if logged in) |
| `/verify-email` | Public | Resend verification email |
| `/password-reset-request`, `/password-reset` | Public | Forgot / reset password |
| `/dashboard` | Protected | Invoice list and stats |
| `/create` | Protected | Create new invoice |
| `/invoice/[id]` | Protected | View owned invoice |
| `/invoice/[id]/edit` | Protected | Edit invoice |
| `/settings` | Protected | Business profile and password |
| `/share/[publicId]` | Public | Client-facing invoice view |
| `/api/auth/[...all]` | API | Better Auth handlers |
| `/api/invoice/[id]/pdf` | Protected | Owner PDF download |
| `/api/share/[publicId]/pdf` | Public | Shared invoice PDF |

Protected routes are guarded by `src/proxy.ts` (session cookie check).

## Project structure

```
src/
  app/
    page.tsx                    # Landing page (/)
    (app)/                      # Authenticated app shell + Header
      dashboard/                # Stats, search, invoice list
      create/                   # Create invoice form
      invoice/[id]/             # View + edit invoice
      settings/                 # Business + account settings
    (auth)/                     # Auth pages (no app header)
      signin/ signup/           # Auth forms (AuthPageShell)
      verify-email/             # Email verification
      password-reset*/          # Forgot + reset password
    share/[publicId]/           # Public invoice view
    actions/                    # Server Actions (invoice, business, email, account)
    api/                        # Auth + PDF route handlers
    components/                 # Shared UI (InvoiceDocument, BrandLogo, auth shell, etc.)
  components/landing/           # Landing page sections
lib/
  auth.ts                       # Better Auth server config
  auth-client.ts                # Client auth hooks
  prisma.ts                     # Prisma client
  business.ts                   # Business settings helpers
  invoice.ts                    # Invoice totals / date helpers
  resend.ts                     # Resend client
prisma/
  schema.prisma                 # User, Invoice, InvoiceItem, BusinessSettings
src/proxy.ts                    # Route protection middleware
```

## Getting started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or hosted, e.g. Neon, Supabase)
- [Resend](https://resend.com/) account (verification + password reset + invoice emails)
- Google OAuth credentials (optional, for Google sign-in)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# Better Auth
BETTER_AUTH_SECRET="your-secret-key-at-least-32-chars"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
APP_URL="http://localhost:3000"

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="Invoice Engine <onboarding@yourdomain.com>"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
```

Generate a secret:

```bash
openssl rand -base64 32
```

In production, set `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, and `APP_URL` to your deployed domain.

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

Focus areas: App Router, Server/Client Components, Server Actions, data fetching, authentication, middleware, Prisma, PDF generation, email delivery, and deployment.

See [`project_info.md`](./project_info.md) for the full roadmap, V1 spec, phased build plan, and implementation progress.

## Current status

| Area | Status |
|------|--------|
| Landing page | Done |
| Auth (email, Google, verify, reset password) | Done |
| Protected routes (`proxy.ts`) | Done |
| Prisma schema + migrations | Done |
| Invoice CRUD + duplicate | Done |
| Dashboard (stats, search, list) | Done |
| Public share links | Done |
| Business settings + logo | Done |
| PDF generation | Done |
| Email delivery (invoice link) | Done |
| Account settings (set/change password) | Done |
| Production deployment | Planned |

## Roadmap (remaining)

1. Deploy to production (Vercel + hosted PostgreSQL)
2. Polish and harden (error boundaries, loading states, edge cases)
3. Optional: dark mode, additional invoice templates

## License

Private learning project.