# Graph Report - tallocpa-dashboard  (2026-11-23)

## Corpus Check
- 207 files · ~230,116 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: .css 3, (none) 2, .example 1)

## Summary
- 1869 nodes · 3220 edges · 141 communities (121 shown, 20 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.85)
- Token cost: 120,842 input · 0 output

## Graph Freshness
- Built from commit: `39a8410b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Deadline Engine & Dates
- Core Schema & RLS
- client-form.tsx
- Decisions & Setup
- Dev Tooling Deps
- Client & Deadline Pages
- [id]/forms.tsx
- sign-in-form.tsx
- Runtime Deps & Cron Route
- TypeScript Config
- CI Workflow
- vitest
- App Shell & Login
- Sign-off, Ledger & Payments
- Brand & Fee Schedule
- Product Spec & Migration
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- sloplint.mjs
- refcheck.mjs
- theme.mjs
- getAttr
- report
- resolveVars
- parseColor
- ref_node_fs
- macrostructures.md
- sloplint-render.mjs
- supabaseServer
- capture.mjs
- install.mjs
- clsLits
- 4. The gates
- twGroup
- picture.mjs
- Craft
- Anatomy
- Flow branches
- Scroll choreography: the one earned pattern
- imagegen.mjs
- Flow
- Interaction and states
- Patterns
- Almanac
- Arcade
- Atelier
- Bloom
- Blueprint
- Broadside
- Brutal
- Carnival
- Cobalt
- Console
- Coral
- Darkroom
- Dose
- Dusk
- Editorial
- Formwork
- Furrow
- Garden
- Grid
- Halftone
- Hedgerow
- Hum
- Ink
- Kiln
- Loom
- Lumen
- Manifesto
- Midnight
- Newsprint
- Overprint
- Paste-up
- Piste
- Refract
- Ribbon
- Rim
- Riso
- Solstice
- Specimen
- Spore
- Sport
- Squeeze
- Sticker
- Studio
- Terminal
- Terrazzo
- Ultraviolet
- Vantage
- Vellum
- Wayfind
- Werkstatt
- checkTailwind
- Dark mode: parity, never inversion
- Imagery
- Texture and print artifacts: a budgeted vocabulary
- install-hook.mjs
- dependencies
- Custom: a page of its own
- Fonts
- Layout
- Redesign
- scripts
- interface
- Comp before build: composing in pixels before composing in CSS
- Responsive
- Data viz: charts that read as set, not generated
- Export formats
- Writing a theme file
- proxy.ts
- Genre: atmospheric
- Genre: editorial (the default)
- Genre: modern-minimal
- Genre: playful
- Macrostructures
- tailwind-fail/Hero.tsx
- eslint.config.mjs
- design.md: the locked system
- Microinteractions
- src/app/layout.tsx
- settings/page.tsx
- 05-workbench.md
- 07-manifesto.md
- 09-quote-led.md
- 11-catalogue.md
- 17-type-specimen.md
- review-finish.md
- review-hero.md
- Feature.vue
- headings
- walk
- people/schema.ts
- Brand truth: never theme a real brand from memory

## God Nodes (most connected - your core abstractions)
1. `report()` - 90 edges
2. `supabaseServer()` - 46 edges
3. `trunc()` - 44 edges
4. `resolveVars()` - 42 edges
5. `requireOwner()` - 28 edges
6. `next` - 26 edges
7. `getAttr()` - 25 edges
8. `Notice()` - 23 edges
9. `isTokenRule()` - 21 edges
10. `react` - 21 edges

## Surprising Connections (you probably didn't know these)
- `Stack: Next.js/Vercel, Supabase Singapore, Gemini OCR, n8n, Resend` --semantically_similar_to--> `Technology Choices & Running Cost`  [INFERRED] [semantically similar]
  README.md → docs/SPEC.md
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Nightly Filing Job (120 days ahead)` --conceptually_related_to--> `Filing Obligations & Deadline Engine`  [AMBIGUOUS]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Nightly Filing Job (120 days ahead)` --conceptually_related_to--> `/api/cron/generate-filings (02:00 Manila)`  [INFERRED]
  README.md → docs/SETUP.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication and access control** — docs_setup_invite_only_sign_in, docs_setup_google_sign_in, docs_setup_first_owner, docs_spec_roles, docs_spec_row_level_security [INFERRED 0.75]
- **Deadline rules to dated filing instances** — docs_spec_deadline_engine, readme_bir_deadline_engine, readme_nightly_filing_job, docs_setup_generate_filings_cron, docs_setup_server_only_keys [INFERRED 0.85]
- **Return preparation and approval flow** — docs_spec_ocr_review_queue, docs_spec_tax_computation_returns, docs_spec_signoff_chain, docs_spec_payment_check, docs_spec_period_lock [INFERRED 0.85]

## Communities (141 total, 20 thin omitted)

### Community 0 - "Deadline Engine & Dates"
Cohesion: 0.09
Nodes (48): PlannedObligation, addDays(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+40 more)

### Community 1 - "Core Schema & RLS"
Cohesion: 0.09
Nodes (32): filing_instances_client_idx, filing_instances_due_idx, private.audit(), private.can_access_client(), private.can_manage_client(), private.staff_role(), public.acting_approver_delegations, public.audit_log (+24 more)

### Community 2 - "client-form.tsx"
Cohesion: 0.11
Nodes (21): HeroProps, react, ClientValues, frequencyLabel, Props, obligationChanges(), obligationsForTaxTypes(), TAX_TYPES (+13 more)

### Community 3 - "Decisions & Setup"
Cohesion: 0.06
Nodes (31): First Owner Bootstrap (staff_profiles insert), /api/cron/generate-filings (02:00 Manila), Google OAuth Sign-In, Invite-Only Sign-In (signups disabled), Resend Custom SMTP, Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Supabase Project Setup (Singapore), Vercel Deployment (app.tallocpa.com) (+23 more)

### Community 4 - "Dev Tooling Deps"
Cohesion: 0.12
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 5 - "Client & Deadline Pages"
Cohesion: 0.12
Nodes (31): EditClientPage(), ClientPage(), fmtDate(), frequencyLabel, NewClientPage(), OwnerOnly(), ClientList(), ClientsPage() (+23 more)

### Community 6 - "[id]/forms.tsx"
Cohesion: 0.25
Nodes (24): ClientForm(), AssignForm(), ClientUserForm(), EngagementForm(), StatusButton(), ClientDetail(), HolidayForm(), periodWord (+16 more)

### Community 7 - "sign-in-form.tsx"
Cohesion: 0.14
Nodes (17): nextConfig, next, GET(), GET(), POST(), code, email, sendSignInEmail() (+9 more)

### Community 8 - "Runtime Deps & Cron Route"
Cohesion: 0.23
Nodes (10): lucide-react@^1.77.0, lucide-react, server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, supabaseEnv() (+2 more)

### Community 9 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 11 - "vitest"
Cohesion: 0.27
Nodes (7): vitest@^5.1.1, vitest, checkbox, dayBefore(), holidaySchema, ruleEditSchema, base

### Community 12 - "App Shell & Login"
Cohesion: 0.19
Nodes (14): AppLayout(), nav, NavLinks(), ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), PortalPage() (+6 more)

### Community 13 - "Sign-off, Ledger & Payments"
Cohesion: 0.33
Nodes (6): Per-Client Double-Entry Ledger, Collections & Statement of Account, Payment Check at Owner Approval, Period Lock & Amendment, Sign-off Chain (Prepared to Proof Uploaded), Tax Computation & Return Worksheet

### Community 14 - "Brand & Fee Schedule"
Cohesion: 0.33
Nodes (5): Tallo CPA Brand Design System, Brands & Firm Settings, Appendix A: Draft Fee Bands & Calculator Review, Fee Schedule & Pricing Model, Gross Receipts Watch (warn at PHP 2.5M)

### Community 15 - "Product Spec & Migration"
Cohesion: 0.50
Nodes (4): Decisions Log (Q1-Q61), Migration from Moxie, TalloCPA OS Product Specification, TalloCPA OS

### Community 23 - "sloplint.mjs"
Cohesion: 0.03
Nodes (72): ANSWERED, APP_SKIP, args, BUILD_DIRS, check25(), check62(), check76(), CHECKS (+64 more)

### Community 24 - "refcheck.mjs"
Cohesion: 0.04
Nodes (44): args, AS_JSON, BY_BASE, CANON, catalogFaces, clean, exemplarDir, expectations (+36 more)

### Community 25 - "theme.mjs"
Cohesion: 0.09
Nodes (51): addLog(), ADJUST, args, ASK, BASE_CUSTOM, buildIndex(), check(), contrastOf() (+43 more)

### Community 26 - "getAttr"
Cohesion: 0.11
Nodes (38): accentedHeads(), accentedWordInHero(), ancestorMap(), capsRatio(), check28(), check3(), check30(), check33() (+30 more)

### Community 27 - "report"
Cohesion: 0.08
Nodes (38): applyWaivers(), appSkip(), baseGate(), check10(), check10Motion(), check11(), check15(), check17() (+30 more)

### Community 28 - "resolveVars"
Cohesion: 0.12
Nodes (35): baseSelector(), check11Lift(), check12(), check15Fade(), check23(), check24a(), check40_41(), check55() (+27 more)

### Community 29 - "parseColor"
Cohesion: 0.10
Nodes (34): bannedGradient(), check1(), check2(), check29Glow(), check37(), check48(), check65(), check7() (+26 more)

### Community 30 - "ref_node_fs"
Cohesion: 0.09
Nodes (13): globalRoot(), script, png, script, main(), OK(), script, dir (+5 more)

### Community 31 - "macrostructures.md"
Cohesion: 0.08
Nodes (12): 01 · Bento Grid, 03 · Marquee Hero, 06 · Conversational FAQ, 08 · Photographic, 10 · Specimen, 12 · Letter, 13 · Index-First, 15 · Split Studio (+4 more)

### Community 32 - "sloplint-render.mjs"
Cohesion: 0.18
Nodes (21): CHROMES, contrast(), focusRing(), frames(), hideStyles(), inventory(), isUrl(), lineBreaks() (+13 more)

### Community 33 - "supabaseServer"
Cohesion: 0.18
Nodes (29): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+21 more)

### Community 34 - "capture.mjs"
Cohesion: 0.10
Nodes (15): argv, chrome, CHROMES, HERE, isUrl, made, out, roots (+7 more)

### Community 35 - "install.mjs"
Cohesion: 0.13
Nodes (14): args, copyDir(), DRY, explicit, FLAGS, has(), HERE, HOME (+6 more)

### Community 36 - "clsLits"
Cohesion: 0.24
Nodes (16): braceEnd(), classCalls(), clsLits(), cutGlued(), jsxPseudo(), el(), js(), jsScan() (+8 more)

### Community 37 - "4. The gates"
Cohesion: 0.12
Nodes (15): 1. How a gate binds, 2. Waivers and answers, 3. Pre-emit critique, 4. The gates, 5. Finish checks and judged clauses, 6. The reviews, in fresh context, Assets and access, Chrome and copy (+7 more)

### Community 38 - "twGroup"
Cohesion: 0.15
Nodes (16): buildContext(), buildTokens(), check26(), check27(), check34(), checkF16(), importsOf(), linksOf() (+8 more)

### Community 39 - "picture.mjs"
Cohesion: 0.13
Nodes (11): chrome, CHROMES, cssPath, HERE, out, page, roots, [slug, pageArg, yArg] (+3 more)

### Community 40 - "Craft"
Cohesion: 0.15
Nodes (11): 1. Type, 2. Colour, 3. Surfaces, 4. The hero's motion, 5. Motion, 6. Copy, 7. Opening a section, 8. Missing facts (+3 more)

### Community 42 - "Anatomy"
Cohesion: 0.17
Nodes (12): Anatomy, attend (an event, a festival, a race, a conference), book (a restaurant, a class, a clinic, a studio), buy (a physical product, a small shop), hire (a studio, a freelancer, an architect), How pages end, join (a club, a community, a membership), listen (a band, a film, a podcast, a publication) (+4 more)

### Community 43 - "Flow branches"
Cohesion: 0.17
Nodes (12): App screens, Comp before build (signal 9), Component scope, Edit-time linting, Fast mode, Flow branches, Framework projects, Harnesses (+4 more)

### Community 44 - "Scroll choreography: the one earned pattern"
Cohesion: 0.17
Nodes (9): 14 · Narrative Workflow, 16 · Feature Stack, 1 · Pinned chapter: steps reveal while the section is pinned, 2 · Scrub-linked headline: one display element, clip wipe, 3 · Progress spine: `scroll(root)` scaling a 2px rule, 4 · Sticky diptych: a two-pane pin, Budget, JS fallback (optional, shared) (+1 more)

### Community 45 - "imagegen.mjs"
Cohesion: 0.17
Nodes (7): args, hash, n, prompt, stem, steps, [w, h]

### Community 46 - "Flow"
Cohesion: 0.17
Nodes (12): 0. Pre-flight, 1. Ask once, 2. Shape, 3. Direction, 4. Load, 5. The Picks block, 6. Build, 7. Sweep (+4 more)

### Community 47 - "Interaction and states"
Cohesion: 0.18
Nodes (10): Focus rings, Forms, Hit targets, Interaction and states, Loading and empty, Modals and overlays, Popovers, menus, tooltips, The eight states (+2 more)

### Community 48 - "Patterns"
Cohesion: 0.18
Nodes (11): A choice between a few, A fact the prompt did not give, A form that posts nowhere yet, A loop that can pause, A photograph in a slot, A rail and a switcher, A way past the nav, Controls, all eight states (+3 more)

### Community 49 - "Almanac"
Cohesion: 0.18
Nodes (10): Almanac, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 50 - "Arcade"
Cohesion: 0.18
Nodes (10): Arcade, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 51 - "Atelier"
Cohesion: 0.18
Nodes (10): Atelier, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 52 - "Bloom"
Cohesion: 0.18
Nodes (10): Bloom, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 53 - "Blueprint"
Cohesion: 0.18
Nodes (10): Blueprint, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 54 - "Broadside"
Cohesion: 0.18
Nodes (10): Broadside, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 55 - "Brutal"
Cohesion: 0.18
Nodes (10): Brutal, Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 56 - "Carnival"
Cohesion: 0.18
Nodes (10): Build hint, Carnival, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 57 - "Cobalt"
Cohesion: 0.18
Nodes (10): Build hint, Cobalt, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 58 - "Console"
Cohesion: 0.18
Nodes (10): Build hint, Console, Controls, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 59 - "Coral"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Coral, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 60 - "Darkroom"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Darkroom, Do-nots, Motion, Range, Surfaces, Tokens (+2 more)

### Community 61 - "Dose"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Dose, Motion, Range, Surfaces, Tokens (+2 more)

### Community 62 - "Dusk"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Dusk, Motion, Range, Surfaces, Tokens (+2 more)

### Community 63 - "Editorial"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Editorial, Motion, Range, Surfaces, Tokens (+2 more)

### Community 64 - "Formwork"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Formwork, Motion, Range, Surfaces, Tokens (+2 more)

### Community 65 - "Furrow"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Furrow, Motion, Range, Surfaces, Tokens (+2 more)

### Community 66 - "Garden"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Garden, Motion, Range, Surfaces, Tokens (+2 more)

### Community 67 - "Grid"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Grid, Motion, Range, Surfaces, Tokens (+2 more)

### Community 68 - "Halftone"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Halftone, Motion, Range, Surfaces, Tokens (+2 more)

### Community 69 - "Hedgerow"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Hedgerow, Motion, Range, Surfaces, Tokens (+2 more)

### Community 70 - "Hum"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Hum, Motion, Range, Surfaces, Tokens (+2 more)

### Community 71 - "Ink"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Ink, Motion, Range, Surfaces, Tokens (+2 more)

### Community 72 - "Kiln"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Kiln, Motion, Range, Surfaces, Tokens (+2 more)

### Community 73 - "Loom"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Loom, Motion, Range, Surfaces, Tokens (+2 more)

### Community 74 - "Lumen"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Lumen, Motion, Range, Surfaces, Tokens (+2 more)

### Community 75 - "Manifesto"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Manifesto, Motion, Range, Surfaces, Tokens (+2 more)

### Community 76 - "Midnight"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Midnight, Motion, Range, Surfaces, Tokens (+2 more)

### Community 77 - "Newsprint"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Newsprint, Range, Surfaces, Tokens (+2 more)

### Community 78 - "Overprint"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Overprint, Range, Surfaces, Tokens (+2 more)

### Community 79 - "Paste-up"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Paste-up, Range, Surfaces, Tokens (+2 more)

### Community 80 - "Piste"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Piste, Range, Surfaces, Tokens (+2 more)

### Community 81 - "Refract"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Refract, Surfaces, Tokens (+2 more)

### Community 82 - "Ribbon"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Ribbon, Surfaces, Tokens (+2 more)

### Community 83 - "Rim"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Rim, Surfaces, Tokens (+2 more)

### Community 84 - "Riso"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Riso, Surfaces, Tokens (+2 more)

### Community 85 - "Solstice"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Solstice, Surfaces, Tokens (+2 more)

### Community 86 - "Specimen"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Specimen, Surfaces, Tokens (+2 more)

### Community 87 - "Spore"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Spore, Surfaces, Tokens (+2 more)

### Community 88 - "Sport"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Sport, Surfaces, Tokens (+2 more)

### Community 89 - "Squeeze"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Squeeze, Surfaces, Tokens (+2 more)

### Community 90 - "Sticker"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Sticker, Surfaces, Tokens (+2 more)

### Community 91 - "Studio"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Studio, Surfaces, Tokens (+2 more)

### Community 92 - "Terminal"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Terminal, Tokens (+2 more)

### Community 93 - "Terrazzo"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Terrazzo, Tokens (+2 more)

### Community 94 - "Ultraviolet"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens, Type (+2 more)

### Community 95 - "Vantage"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens, Type (+2 more)

### Community 96 - "Vellum"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens, Type (+2 more)

### Community 97 - "Wayfind"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens, Type (+2 more)

### Community 98 - "Werkstatt"
Cohesion: 0.18
Nodes (10): Build hint, Controls, Do-nots, Motion, Range, Surfaces, Tokens, Type (+2 more)

### Community 99 - "checkTailwind"
Cohesion: 0.25
Nodes (11): checkComponentText(), checkTailwind(), closeIndex(), compInner(), tw54(), tw67(), twDataText(), twPlain() (+3 more)

### Community 100 - "Dark mode: parity, never inversion"
Cohesion: 0.20
Nodes (7): Dark discipline (the rules that change), Dark mode: parity, never inversion, Emission, The stance, Token re-derivation (per token, from the light value), Verification, 04 · Stat-Led

### Community 101 - "Imagery"
Cohesion: 0.20
Nodes (10): 1. What fills a page, 2. The library, 3. Slots, 4. The product: captured first, built only when it cannot be, 5. Placing and treating photographs, 6. Generated stills, 7. Never, 8. Icons, logos, video, 3D (+2 more)

### Community 102 - "Texture and print artifacts: a budgeted vocabulary"
Cohesion: 0.20
Nodes (9): 1 · Grain (paper), 2 · Halftone (dot field), 3 · Misregistration (chromatic echo), 4 · Scanline (CRT), 5 · Deckle (paper edge), Affinity: who earns texture, Reduced motion and accessibility, Texture and print artifacts: a budgeted vocabulary (+1 more)

### Community 103 - "install-hook.mjs"
Cohesion: 0.22
Nodes (6): args, HERE, hookEntry, ourHook(), settings, withoutOurs()

### Community 104 - "dependencies"
Cohesion: 0.22
Nodes (9): dependencies, next@16.4.6, react@19.3.0, react-dom@19.3.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2, zod@^4.6.7, react-dom (+1 more)

### Community 105 - "Custom: a page of its own"
Cohesion: 0.22
Nodes (8): Before the first line of code, Custom: a page of its own, Mechanics, Pictures, Spent, What still binds, Words, Yours, all of it

### Community 106 - "Fonts"
Cohesion: 0.22
Nodes (8): Banned as a default, Body faces, Display faces the catalog does not use, Fonts, Loading, Sources, The rule, The wordmark

### Community 107 - "Layout"
Cohesion: 0.22
Nodes (9): 1. The canvas, 2. Sizes, 3. Rhythm between sections, 4. A section, 5. Compositions, 6. The hero, 7. The page, 8. Before shipping (+1 more)

### Community 108 - "Redesign"
Cohesion: 0.22
Nodes (8): After, Before, Build, Depth, Redesign, The ask, The plan, What a redesign keeps

### Community 109 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, db:seed:generate, dev, lint, start, test, test:db (+1 more)

### Community 110 - "interface"
Cohesion: 0.25
Nodes (7): dependencies, interface, default_prompts, display_name, short_description, policy, allow_implicit_invocation

### Community 111 - "Comp before build: composing in pixels before composing in CSS"
Cohesion: 0.25
Nodes (7): Comp before build: composing in pixels before composing in CSS, § Generated stills, § Reproduction discipline, § The approval point, § The call, § The medium inventory, § What the comp is, and is not

### Community 112 - "Responsive"
Cohesion: 0.25
Nodes (7): Breakpoints, Clickable text never wraps, Fluid and discrete, Responsive, Tables, images, languages, Units and safe areas, What the script checks and what it cannot

### Community 113 - "Data viz: charts that read as set, not generated"
Cohesion: 0.29
Nodes (7): Colour, Construction (inline SVG written for the data, no chart library), Dark, Data viz: charts that read as set, not generated, Form first (before any drawing), Honesty (gate 46a binds here hardest), The dashboard bar

### Community 114 - "Export formats"
Cohesion: 0.29
Nodes (6): DTCG `tokens.json`, Export formats, shadcn/ui, Tailwind v4, The token set, `tokens.css` in a project

### Community 115 - "Writing a theme file"
Cohesion: 0.29
Nodes (6): Contradictions to avoid, The body, in order, 3,000 to 8,000 bytes, The header block, The picture, What a theme may not carry, Writing a theme file

### Community 116 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 117 - "Genre: atmospheric"
Cohesion: 0.33
Nodes (5): Allowed here, Chrome that fits, Genre: atmospheric, Refused here, Voice

### Community 118 - "Genre: editorial (the default)"
Cohesion: 0.33
Nodes (5): Allowed here, Chrome that fits, Genre: editorial (the default), Refused here, Voice

### Community 119 - "Genre: modern-minimal"
Cohesion: 0.33
Nodes (5): Allowed here, Chrome that fits, Genre: modern-minimal, Refused here, Voice

### Community 120 - "Genre: playful"
Cohesion: 0.33
Nodes (5): Allowed here, Chrome that fits, Genre: playful, Refused here, Voice

### Community 121 - "Macrostructures"
Cohesion: 0.33
Nodes (6): Domain to trio, when the prompt names no shape, How to pick, Macrostructures, SaaS section deck: deal it, do not sequence it, The 21 macrostructures, index, The fingerprint: six axes

### Community 122 - "tailwind-fail/Hero.tsx"
Cohesion: 0.40
Nodes (3): badge, Hero(), HeroProps

### Community 123 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 124 - "design.md: the locked system"
Cohesion: 0.40
Nodes (4): After the file exists, design.md: the locked system, Format, Triggers

### Community 125 - "Microinteractions"
Cohesion: 0.40
Nodes (4): Microinteractions, Motion character, Principles, Recipes

### Community 127 - "settings/page.tsx"
Cohesion: 0.22
Nodes (14): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, Rule, SettingsPage(), describeDue() (+6 more)

### Community 139 - "people/schema.ts"
Cohesion: 0.39
Nodes (6): clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 140 - "Brand truth: never theme a real brand from memory"
Cohesion: 0.40
Nodes (5): Brand truth: never theme a real brand from memory, Caching and staleness, The protocol, What this protocol never does, When fetching is impossible

## Ambiguous Edges - Review These
- `Filing Obligations & Deadline Engine` → `Nightly Filing Job (120 days ahead)`  [AMBIGUOUS]
  README.md · relation: conceptually_related_to

## Knowledge Gaps
- **14 isolated node(s):** `Collections & Statement of Account`, `Tax Computation & Return Worksheet`, `Tallo CPA Brand Design System`, `Gross Receipts Watch (warn at PHP 2.5M)`, `Appendix A: Draft Fee Bands & Calculator Review` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1078 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `Deadline Engine & Dates`, `client-form.tsx`, `Dev Tooling Deps`, `sign-in-form.tsx`, `people/schema.ts`, `ref_node_fs`, `settings/page.tsx`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **What connects `Collections & Statement of Account`, `Tax Computation & Return Worksheet`, `Tallo CPA Brand Design System` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.08892921960072596 - nodes in this community are weakly interconnected._
- **Why does `next` connect `sign-in-form.tsx` to `supabaseServer`, `client-form.tsx`, `Dev Tooling Deps`, `Client & Deadline Pages`, `[id]/forms.tsx`, `dependencies`, `Runtime Deps & Cron Route`, `App Shell & Login`, `proxy.ts`, `tailwind-fail/Hero.tsx`, `src/app/layout.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Should `Core Schema & RLS` be split into smaller, more focused modules?**
  _Cohesion score 0.09178743961352658 - nodes in this community are weakly interconnected._
- **Why does `pg` connect `Dev Tooling Deps` to `ref_node_fs`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Filing Obligations & Deadline Engine` and `Nightly Filing Job (120 days ahead)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._