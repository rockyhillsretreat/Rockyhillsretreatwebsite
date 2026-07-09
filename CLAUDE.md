# CLAUDE.md — Rocky Hills Retreat Website

Read this before starting any session on this repo.

---

## What this project is

The public-facing website for Rocky Hills Retreat, a secluded couples retreat on Tasmania's east coast. Live at **rockyhillsretreat.com.au**. Built by Courtenay with Claude.

GitHub: `rockyhillsretreat/Rockyhillsretreatwebsite`

---

## Tech stack

- **React 18 + TypeScript + Vite** — frontend
- **Vercel serverless functions** (`/api/*.ts`) — booking, contact, availability, add-on logging
- **Tailwind CSS** — available but most pages use inline styles (see Design section)
- **React Router v7** — client-side routing
- **Lucide React** — icons
- **Nodemailer** — Gmail SMTP for contact form

---

## Git workflow — CRITICAL

Persistent `.git/index.lock` files prevent standard git. **Never use `git add`, `git commit`, `git checkout`**. Use plumbing only:

```bash
# Hash a file
git hash-object -w path/to/file

# Build tree from an existing tree with one blob swapped
git cat-file -p <parent_tree_sha> | sed "s/<old_blob>/<new_blob>/" | git mktree

# Create commit
GIT_AUTHOR_NAME="Rocky Hills Retreat" \
GIT_AUTHOR_EMAIL="rockyhillsretreat@gmail.com" \
GIT_COMMITTER_NAME="Rocky Hills Retreat" \
GIT_COMMITTER_EMAIL="rockyhillsretreat@gmail.com" \
  git commit-tree <tree> -p <parent_commit> -m "message"

# Push
git push origin <commit_sha>:refs/heads/main

# Get current remote HEAD
git ls-remote origin refs/heads/main
```

**Author MUST be `rockyhillsretreat@gmail.com` / `"Rocky Hills Retreat"`** — `courtenay.rickey@gmail.com` causes Vercel to BLOCK deployments.

Lock files can't be deleted from bash. Ignore the local tracking ref error on push — if the output shows `old_sha..new_sha -> main`, the push succeeded.

**Two path systems:**
- Read/Write/Edit tools: `/Users/extemporal/Documents/projects/Rockyhillsretreatwebsite/`
- Bash / git operations: `/sessions/*/mnt/projects/Rockyhillsretreatwebsite/`

---

## Pages and routes

| Route | Component | Notes |
|---|---|---|
| `/` | `HomePage.tsx` | Hero, packages overview, experiences teaser |
| `/retreat` | `RetreatPage.tsx` | Property detail |
| `/packages` | `PackagesPage.tsx` | 4 packages, no prices shown |
| `/experiences` | `ExperiencesPage.tsx` | Add-on experiences |
| `/provisions` | `ProvisionsPage.tsx` | Food & produce |
| `/location` | `LocationPage.tsx` | Getting there, seasons |
| `/gallery` | `GalleryPage.tsx` | Photo gallery |
| `/journal` | `JournalPage.tsx` | Blog |
| `/faqs` | `FAQsPage.tsx` | FAQs |
| `/policies` | `PoliciesPage.tsx` | Terms & cancellation |
| `/contact` | `ContactPage.tsx` | Contact form + details |
| `/booking` | `BookingPage.tsx` | Full booking flow (2 steps) |
| `/confirmation` | `ConfirmationPage.tsx` | Post-payment thank you |
| `/studio` | `StudioPage.tsx` | Studio/yoga space |
| `/property-works` | `PropertyWorksPage.tsx` | Internal task tracker (see note below) |

**Removed / not routed:** `/go-dark` (GoDarkPage.tsx file kept but not in router — removed for the season)

---

## API functions

| Endpoint | File | What it does |
|---|---|---|
| `GET /api/availability` | `api/availability.ts` | Fetches OwnerRez bookings, returns blocked dates |
| `POST /api/create-quote` | `api/create-quote.ts` | Creates OR guest + quote, returns pricing + payment URL |
| `POST /api/contact` | `api/contact.ts` | Sends contact form email via Gmail SMTP (nodemailer) |
| `POST /api/log-addons` | `api/log-addons.ts` | Upserts guest in Supabase + creates tasks for add-ons |

---

## Environment variables (set in Vercel dashboard)

| Variable | Used in | Purpose |
|---|---|---|
| `OWNERREZ_USERNAME` | availability, create-quote | OwnerRez API auth (email address) |
| `OWNERREZ_API_KEY` | availability, create-quote | OwnerRez API token |
| `SMTP_USER` | contact.ts | Gmail address for contact form sends |
| `SMTP_PASS` | contact.ts | Gmail App Password (16-char, not the account password) |
| `SUPABASE_URL` | log-addons.ts | `https://kzktuccfexjhthwmeqre.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | log-addons.ts | Server-side only — never `VITE_` prefix |

---

## External services

| Service | Purpose |
|---|---|
| **OwnerRez** | Property Management System. Source of booking truth. Handles payments, guest management, OTA channels |
| **Gmail SMTP** | Contact form sends to `stay@rockyhillsretreat.com.au` via `rockyhillsretreat@gmail.com` |
| **Supabase** | Stores guests + tasks created from booking add-on selections |
| **Cloudinary** | All images hosted at `res.cloudinary.com/dfvjhslxp/image/upload/[filename]` |

**No Make, no Airtable, no Stripe on this site.** All booking payments go through OwnerRez.

---

## Booking flow

1. Guest fills form (dates, details, add-ons, discount code, T&Cs)
2. Clicks "Review My Booking" → `goToReview()` calls `POST /api/create-quote`
   - Creates OR guest, creates OR quote with `discount_code` if provided
   - Returns pricing breakdown + payment URL
3. Review step shows pricing, guest details, add-ons
4. "Proceed to Payment" → `handleSubmit()`:
   - Calls `POST /api/log-addons` (writes to Supabase — never blocks flow)
   - Redirects to OwnerRez payment URL (or fallback OR booking page)
5. After payment, OR redirects to `/confirmation`

Pricing: $650/weeknight, $800/weekend night and public holidays, 2-night minimum. GST included.

---

## Design system

Two style systems exist (legacy split):

**Most pages — inline styles:**
```tsx
style={{ fontFamily: "'Playfair Display', serif", color: '#EDE9E3' }}
```

**ContactPage, LocationPage (below fold) — old Tailwind classes:**
```tsx
className="text-bone heading-display bg-ink-black"
```

**When editing, match the existing style of the file you're in.**

Colour palette:
| Name | Hex |
|---|---|
| Primary background | `#26333A` |
| Card/dark | `#2E3D45` |
| Dark dark | `#0B0F0F` |
| Accent blue | `#8FA9B3` |
| Bone/text | `#EDE9E3` |
| Muted text | `#B8AE9F` |
| Border | `rgba(143, 169, 179, 0.2)` |

Fonts: **Playfair Display** (headings), **Inter** (body). Loaded via Google Fonts.

---

## Pricing rules (as shown on site)

- Packages: **Enquire for pricing** (no dollar amounts shown)
- Beach Picnic add-on: **$145**
- Photographer: **POA**
- Provisions (Fruit Box $35, Veg Box $45, Charcuterie $185): shown as prices
- Accommodation: shown at checkout from OwnerRez quote only

---

## PropertyWorksPage note

`/property-works` is an internal page (not in nav, shared by URL with Curtis/Jeremy). It currently reads from **Airtable** via `VITE_AIRTABLE_PAT`. This is a known inconsistency — the management app uses Supabase for tasks. If/when this page is migrated to the management app fully, PropertyWorksPage can be removed from this repo.

---

## What NOT to do

- Never commit with `courtenay.rickey@gmail.com` as the git author
- Never use `VITE_` prefix for secret keys
- Don't show package prices (POA policy)
- Don't add Go Dark content back without Courtenay asking — it was removed for the season
- Don't add gift voucher pages — removed intentionally
- Don't use standard git commands — see git workflow above
