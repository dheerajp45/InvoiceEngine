# Landing Page Hero — Implementation Spec

> **Design reference:** `hero design.png` (project root)  
> **Route:** `/landing` (or replace `/` when marketing home is ready)  
> **Status:** Ready to build — assets in `public/` are complete except OG image.

---

## Goal

Build a full-viewport dark hero matching `hero design.png`, using the **Midnight Mist** background (exact CSS below). Navbar, copy, CTAs, feature pills, and right-side illustration sit **on top** of the mist layer.

---

## Assets (`public/`)

| File | Purpose |
|------|---------|
| `/logo.svg` | Navbar wordmark (dark backgrounds only) |
| `/logo-icon.svg` | Mobile / compact logo mark |
| `/hero-illustration.png` | Right column isometric wireframe |
| `/favicon.png` | Browser tab (wire in layout metadata) |
| `/og-image.png` | **Pending** — add last for social previews (1200×630) |

**Do not use** default scaffold SVGs (`vercel.svg`, `file.svg`, etc.) for the hero.

---

## Background — Midnight Mist (do not change)

The outer wrapper **must** be full viewport, black, and `relative`. Mist is a sibling **behind** content (`z-0`). All hero UI goes in a `relative z-10` sibling.

```tsx
<div className="min-h-screen w-full bg-black relative">
  {/* Midnight Mist */}
  <div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      backgroundImage: `
        radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
        radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
        radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
      `,
    }}
  />

  {/* Navbar + Hero — relative z-10 */}
  <div className="relative z-10 flex min-h-screen flex-col">
    ...
  </div>
</div>