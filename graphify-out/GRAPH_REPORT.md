# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1055 files · ~877,599 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6475 nodes · 23043 edges · 219 communities (196 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 216 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ba1100f3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- fees/types.ts
- devDependencies
- ai-employees/actions.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/[id]/page.tsx
- Sign-in & Setup Docs
- registrations/[id]/page.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- income.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- TalloCPA OS — AI Workforce (design note)
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- Centavos
- quote.ts
- returns/types.ts
- clients/actions.ts
- register-xlsx.ts
- modal.tsx
- registrations/forms.tsx
- scripts
- returns/types.ts
- button.tsx
- requireStaff
- webhook.ts
- leads/[id]/page.tsx
- marketing/page.tsx
- requireOwner
- proposal-view.tsx
- returns/load.ts
- handler.ts
- fields.ts
- books/export/route.ts
- supabaseServer
- react
- proposal.ts
- public.ts
- Apple Design
- generate.ts
- testing.ts
- work/page.tsx
- payroll/payroll.test.ts
- books/forms.tsx
- fixed-assets/forms.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- board.ts
- cx
- Centavos
- parties/[id]/page.tsx
- how-we-work/page.tsx
- clients/[id]/page.tsx
- notification.tsx
- Pro components
- lib/books/actions.ts
- cycle/actions.ts
- portalContext
- portal-billing.test.ts
- theme-toggle.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/page.tsx
- @remixicon/react
- Recipes
- rows.ts
- BoardUI page patterns
- Pro templates
- books-context.ts
- ledger/books.ts
- ledger/data.ts
- cx
- supabaseAdmin
- boardui
- ledger/types.ts
- auth-templates.ts
- getIdentity
- leads/actions.ts
- Notice
- Card
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- opening.ts
- requireOwner
- Badge
- apply-migrations.sh
- fees/schedule.ts
- Skeleton
- notification-bell.tsx
- workpapers/load.ts
- payroll/data.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- notification-bell.tsx
- portal/layout.tsx
- read.test.ts
- register-books.test.ts
- return-file-actions.ts
- settings/actions.ts
- module-pages.tsx
- ocr/run.ts
- structured-data.ts
- [slug]/page.tsx
- formToObject
- ticked-allocation.test.ts
- filings/actions.ts
- package.json
- invoice-pages.tsx
- payroll/forms.tsx
- chrome.tsx
- app/page.tsx
- holiday-list.ts
- blocks.tsx
- next
- sign-in-form.tsx
- fees/[id]/page.tsx
- seed.ts
- zod
- generate-qap-fixture.mjs
- filters.tsx
- getIdentity
- cwt-2307-tracker.test.ts
- pending-review.tsx
- app/documents/page.tsx
- command-search.tsx
- idle-watcher.tsx
- year-end/page.tsx
- index.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- books-migration.test.ts
- protocol.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- proof-upload.tsx
- eslint.config.mjs
- direction.tsx
- [key]/page.tsx
- engine.ts
- tax-codes.ts
- acting-approver.test.ts
- ui.tsx
- documents/actions.ts
- db.test.ts
- lead-attribution.test.ts
- review-form.tsx
- telegram-uploads.test.ts
- app/settings/page.tsx
- onboarding/forms.tsx
- rates.ts
- tests/proposal-email.test.ts
- binder/page.tsx
- bir-filing-calendar/page.tsx
- social-button.tsx
- formatAmount
- vitest
- branches.ts
- return-files.tsx
- site-document.tsx
- tests/books.test.ts
- onboarding/checklist.ts
- sign-off-actions.tsx
- site/brand.ts
- catch-up-forms.tsx
- filings/[id]/page.tsx
- pending-review.tsx
- payment-forms.tsx
- ai-employees.test.ts
- BoardUI page patterns
- templates/README.md
- copy-opencv.mjs
- proof-upload.tsx
- toCentavos
- funnel.test.ts
- notifications.test.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- buildFilingRows
- fixed-assets.test.ts
- ledger-closing.test.ts
- lock-by-return-type.test.ts
- tasks-and-request-owners.test.ts
- client-requests.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 414 edges
2. `cx` - 317 edges
3. `react` - 289 edges
4. `Notice()` - 280 edges
5. `Skeleton()` - 264 edges
6. `Button()` - 262 edges
7. `next` - 250 edges
8. `vitest` - 204 edges
9. `Card()` - 193 edges
10. `Badge()` - 193 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (219 total, 23 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.11
Nodes (40): Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one(), portal2307() (+32 more)

### Community 1 - "client"
Cohesion: 0.04
Nodes (23): BOOK_LOCK_FORMS, as(), client(), root, addFiling(), root, send(), root (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.11
Nodes (32): blankLine(), InvoiceForm(), SummaryCard(), TaxCode, taxOn(), BOOKS_MODULES, BOOKS_VIEWS, BooksModule (+24 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.11
Nodes (29): EngagementRow, PlannedObligation, TAXPAYER_TYPES, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+21 more)

### Community 5 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+8 more)

### Community 6 - "ai-employees/actions.ts"
Cohesion: 0.13
Nodes (31): addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction(), fieldErrors(), refresh(), removeToolAction() (+23 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "Free components"
Cohesion: 0.03
Nodes (79): Accordion, Agent Chat, Agent runtime, Agent Thinking, Announcement, Auth Card, Avatar, Badge (+71 more)

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (36): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+28 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "registrations/[id]/page.tsx"
Cohesion: 0.07
Nodes (60): ClientList(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, one() (+52 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (43): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES (+35 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (61): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+53 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 25 - "Vercel Cron Config"
Cohesion: 0.50
Nodes (3): crons, regions, $schema

### Community 29 - "TalloCPA OS — AI Workforce (design note)"
Cohesion: 0.10
Nodes (19): 10. Data model (first draft), 11. Build order, 12. Open items, 1. The idea in one paragraph, 2. Principles, 3. The AI employees, 4.1 The in-app model is swappable, 4. Where they run and what they cost (+11 more)

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.08
Nodes (54): Cwt2307TrackerPage(), Tracker(), amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page() (+46 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (33): ClientRow, order, PartCell(), ScoredClient, Scores(), ScoresPage(), Trend(), ClientMonth (+25 more)

### Community 42 - "Centavos"
Cohesion: 0.05
Nodes (73): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+65 more)

### Community 43 - "quote.ts"
Cohesion: 0.10
Nodes (34): PriceRow, proposal(), buildProposalQuote(), buildQuote(), catchUpFor(), CatchUpLine, cents(), CustomQuoteItem (+26 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.08
Nodes (44): tinHasBranch(), lookupAtc(), agentBackground(), agentErrors(), atcSchedule(), AtcTotal, detailSchedule(), docLabel() (+36 more)

### Community 45 - "clients/actions.ts"
Cohesion: 0.12
Nodes (21): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), setCatchUpAction(), setClientStatusAction(), updateClientAction() (+13 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (33): PayrollItem, sortItems(), employee(), entry(), fixtureContext(), ITEMS, P(), pay() (+25 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 48 - "registrations/forms.tsx"
Cohesion: 0.04
Nodes (97): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+89 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "returns/types.ts"
Cohesion: 0.05
Nodes (58): tinDashed(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+50 more)

### Community 51 - "button.tsx"
Cohesion: 0.09
Nodes (27): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), IconButton(), IconButtonProps, IconButtonSize (+19 more)

### Community 52 - "requireStaff"
Cohesion: 0.09
Nodes (58): setIncomeTaxMethodAction(), EmployerCard(), setPresetAccountAction(), GET(), ListRow, ORDER, Remittance(), RemittancePage() (+50 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), SPREADSHEET_TYPES, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+38 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (49): NoteState, ClientNoteForm(), bookingLinkAction(), reopenLeadAction(), sendProposalAction(), setFunnelOpenAction(), BookingLink(), CopyLink() (+41 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (54): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+46 more)

### Community 56 - "requireOwner"
Cohesion: 0.12
Nodes (35): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+27 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.09
Nodes (43): FinancialStatements, ATC_MASTER, AtcInfo, normalizeAtc(), withNonDeductible(), dayBefore(), FilingRow, listInvoices() (+35 more)

### Community 59 - "handler.ts"
Cohesion: 0.06
Nodes (46): RFC-2606, maxDuration, POST(), SettingsValues, Ai, Row, BOOKS_LEVELS, BooksLevel (+38 more)

### Community 60 - "fields.ts"
Cohesion: 0.10
Nodes (26): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+18 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.14
Nodes (22): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+14 more)

### Community 62 - "supabaseServer"
Cohesion: 0.06
Nodes (49): nextConfig, next, ClientValues, loadLockContext(), BooksMonthsPage(), Months(), one(), EditClient() (+41 more)

### Community 63 - "react"
Cohesion: 0.11
Nodes (27): react, PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage() (+19 more)

### Community 64 - "proposal.ts"
Cohesion: 0.10
Nodes (28): ProposalSetup, corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, bandForSales() (+20 more)

### Community 65 - "public.ts"
Cohesion: 0.13
Nodes (22): acceptProposalAction(), AcceptState, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+14 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.16
Nodes (20): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+12 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "work/page.tsx"
Cohesion: 0.17
Nodes (16): loadAssets(), standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 70 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (50): MonthGrid(), toInput(), AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, form2316(), Form2316Employer (+42 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.12
Nodes (47): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+39 more)

### Community 72 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (62): sawtBuckets(), branchOfTin(), payeeKeyOf(), tin9(), tinDigits(), annualAttachments(), AtcInfo, atcInfo() (+54 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "board.ts"
Cohesion: 0.08
Nodes (32): StepProgress(), Row, FilingRow, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED (+24 more)

### Community 78 - "cx"
Cohesion: 0.06
Nodes (44): Portal2316(), Portal2316Page(), StatusDot(), StatusDotColor, StatusDotProps, styles, Breadcrumb(), BreadcrumbItemProps (+36 more)

### Community 79 - "Centavos"
Cohesion: 0.15
Nodes (16): EntryLineOut, EntryLine, RegisterTotals, TaxLine, SawtRow, SlpRow, SlsRow, AnnualPayeeRow (+8 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), fmtDate(), PartyDetail(), PartyPage(), withDirectory() (+41 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (42): removeAssignmentAction(), ClientTab, ClientTabs(), UNDER, RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), NotesCard() (+34 more)

### Community 83 - "notification.tsx"
Cohesion: 0.06
Nodes (36): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, ButtonLinkProps (+28 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (30): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+22 more)

### Community 86 - "cycle/actions.ts"
Cohesion: 0.20
Nodes (18): MonthComplete(), SentRow, StandingRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+10 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (64): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat(), BooksSection() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): SelectItem(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+6 more)

### Community 94 - "@remixicon/react"
Cohesion: 0.06
Nodes (69): @remixicon/react, RequestDetail(), RequestPage(), Row, TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS (+61 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "rows.ts"
Cohesion: 0.11
Nodes (27): EmployeeDetail(), EmployeePage(), certificatesFromRaw(), payAccountsOf(), PayrollClient, loadPayrollContext(), Row, cents() (+19 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "books-context.ts"
Cohesion: 0.26
Nodes (11): BooksContext, booksViewFor(), one(), Print(), Print2307Page(), PortalPrint2307Page(), Print(), Form2307Sheet() (+3 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (48): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+40 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.13
Nodes (30): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+22 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (68): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBoxItemProps (+60 more)

### Community 103 - "supabaseAdmin"
Cohesion: 0.07
Nodes (60): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), generateFilingsNow(), generatePastFilingsAction(), bookDiscoveryCallAction() (+52 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ledger/types.ts"
Cohesion: 0.10
Nodes (33): Access, STATUS, Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor() (+25 more)

### Community 106 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 107 - "getIdentity"
Cohesion: 0.14
Nodes (30): NewRequestForm(), TicketForm(), ReplyForm(), send(), uploadRequestFile(), ReturnStandingForm(), StandingSwitches(), StandingUpload() (+22 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.13
Nodes (29): cancelMeetingAction(), assignReviewerAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+21 more)

### Community 109 - "Notice"
Cohesion: 0.06
Nodes (105): FormState, setupMissingChartsAction(), ClientForm(), frequencyLabel, Props, StaffOptions(), BatchUpload(), PreviewTable() (+97 more)

### Community 110 - "Card"
Cohesion: 0.16
Nodes (19): fmtMonth(), WithdrawReportButton(), BooksSummaryPage(), Summary(), fmtDate(), lastMonth(), Reports(), ReportsPage() (+11 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.09
Nodes (45): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+37 more)

### Community 114 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 115 - "requireOwner"
Cohesion: 0.10
Nodes (46): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), CHARGE_SUGGESTIONS (+38 more)

### Community 116 - "Badge"
Cohesion: 0.10
Nodes (45): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), amt(), one() (+37 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.14
Nodes (20): conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num(), optionalAmount, range (+12 more)

### Community 119 - "Skeleton"
Cohesion: 0.08
Nodes (41): NewEmployee(), NewEmployeePage(), Binder(), BinderPage(), Contacts(), ContactsPage(), SORTS, when (+33 more)

### Community 120 - "notification-bell.tsx"
Cohesion: 0.09
Nodes (44): SheetPreview(), emit(), listeners, markReadLocally(), onChanged(), onFocus(), onVisible(), refreshBell() (+36 more)

### Community 121 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (23): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+15 more)

### Community 122 - "payroll/data.ts"
Cohesion: 0.11
Nodes (41): postSubmissionAction(), previewRegisterAction(), saveMonthAction(), saveRegisterAction(), file(), GET(), safe(), PayrollMonth() (+33 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.07
Nodes (45): Detail(), maskNumber(), StatementPage(), metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail() (+37 more)

### Community 126 - "notification-bell.tsx"
Cohesion: 0.07
Nodes (53): GET(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup, MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData (+45 more)

### Community 127 - "portal/layout.tsx"
Cohesion: 0.14
Nodes (22): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, BusinessBar(), ClosingNotice(), Nav(), PortalLayout() (+14 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (74): RFC-4180, geminiJson(), amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+66 more)

### Community 129 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (41): RFC-2047, RFC-2822, server-only, GET(), ReturnFileState, sendEsubmissionAction(), TYPES, EsubmissionMailEnv (+33 more)

### Community 131 - "settings/actions.ts"
Cohesion: 0.19
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 132 - "module-pages.tsx"
Cohesion: 0.10
Nodes (40): BankAccountsRoute(), booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+32 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+35 more)

### Community 134 - "structured-data.ts"
Cohesion: 0.14
Nodes (20): robots(), metadata, sitemap(), SiteBrand, BRAND_NAME, QUOTE_LABEL, SITE_URL, siteUrl() (+12 more)

### Community 135 - "[slug]/page.tsx"
Cohesion: 0.14
Nodes (28): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+20 more)

### Community 136 - "formToObject"
Cohesion: 0.13
Nodes (29): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+21 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "filings/actions.ts"
Cohesion: 0.15
Nodes (21): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+13 more)

### Community 139 - "package.json"
Cohesion: 0.18
Nodes (10): motion@^12.43.0, @supabase/ssr@^0.12.7, tsx@^4.23.15, name, packageManager, private, version, motion (+2 more)

### Community 140 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (35): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+27 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.05
Nodes (65): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+57 more)

### Community 142 - "chrome.tsx"
Cohesion: 0.18
Nodes (19): GlobalNotFound(), metadata, SiteLayout(), SiteNotFound(), HomePage(), SiteDocument(), ButtonLink(), Lockup() (+11 more)

### Community 143 - "app/page.tsx"
Cohesion: 0.07
Nodes (52): TAX_TYPES, invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+44 more)

### Community 144 - "holiday-list.ts"
Cohesion: 0.26
Nodes (10): easterSunday(), HolidayKind, HolidayRule, iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+2 more)

### Community 145 - "blocks.tsx"
Cohesion: 0.14
Nodes (20): FLOW_ICONS, GROUP_SPAN, metadata, metadata, BreadcrumbItem(), Crumb, Crumbs(), H1 (+12 more)

### Community 146 - "next"
Cohesion: 0.08
Nodes (47): @supabase/supabase-js, GET(), GET(), GET(), digestMessage(), DigestRow, longDay(), peso (+39 more)

### Community 147 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (17): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+9 more)

### Community 148 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 149 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 150 - "zod"
Cohesion: 0.18
Nodes (17): zod, clientRef, findClient(), getClient, listMyClients, notYours(), upcomingFilings, isoDate (+9 more)

### Community 151 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 152 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 153 - "getIdentity"
Cohesion: 0.15
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+13 more)

### Community 154 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 155 - "pending-review.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "app/documents/page.tsx"
Cohesion: 0.05
Nodes (79): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+71 more)

### Community 157 - "command-search.tsx"
Cohesion: 0.14
Nodes (20): globalSearch(), SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop() (+12 more)

### Community 158 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 159 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (49): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, FormState, setYearEndCheckAction(), TickForm() (+41 more)

### Community 160 - "index.ts"
Cohesion: 0.04
Nodes (26): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+18 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.12
Nodes (33): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), addDays(), byDay(), DAY_LABEL (+25 more)

### Community 163 - "template.ts"
Cohesion: 0.11
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+12 more)

### Community 164 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "protocol.ts"
Cohesion: 0.14
Nodes (17): ERR, fail(), handleBody(), handleMessage(), Id, isRequest(), LATEST_VERSION, McpServer (+9 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.14
Nodes (33): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+25 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "proof-upload.tsx"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 170 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 171 - "direction.tsx"
Cohesion: 0.12
Nodes (19): MonthSelect(), SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent (+11 more)

### Community 172 - "[key]/page.tsx"
Cohesion: 0.15
Nodes (20): grantToolsAction(), ActivityList(), ActivityRow, outcome, when, EnabledSwitch(), GrantToolsButton(), RemoveToolButton() (+12 more)

### Community 173 - "engine.ts"
Cohesion: 0.21
Nodes (18): compareIso(), isWeekend(), lastDayOfMonth(), fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+10 more)

### Community 174 - "tax-codes.ts"
Cohesion: 0.17
Nodes (17): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+9 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "ui.tsx"
Cohesion: 0.12
Nodes (15): DocReviewActions(), ReplyForm(), YearSelect(), php, QuoteDetails(), StartForm(), Thanks(), buttonClass() (+7 more)

### Community 177 - "documents/actions.ts"
Cohesion: 0.23
Nodes (15): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+7 more)

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 180 - "review-form.tsx"
Cohesion: 0.16
Nodes (17): Booking, BookingFields(), DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, ReviewForm() (+9 more)

### Community 182 - "app/settings/page.tsx"
Cohesion: 0.22
Nodes (15): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+7 more)

### Community 183 - "onboarding/forms.tsx"
Cohesion: 0.26
Nodes (14): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+6 more)

### Community 184 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 186 - "binder/page.tsx"
Cohesion: 0.20
Nodes (12): amt(), MonthSection(), one(), RegisterTable(), TIE_STATUS, ALWAYS, MonthActivity, REFS_FOR_FORM (+4 more)

### Community 187 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 188 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 189 - "formatAmount"
Cohesion: 0.26
Nodes (13): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+5 more)

### Community 190 - "vitest"
Cohesion: 0.02
Nodes (37): pg, dir, poolConfig(), mcpConnector(), ctx, input, root, root (+29 more)

### Community 191 - "branches.ts"
Cohesion: 0.23
Nodes (10): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchSchema, branchUpdateSchema, groupByBranch() (+2 more)

### Community 192 - "return-files.tsx"
Cohesion: 0.32
Nodes (12): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+4 more)

### Community 193 - "site-document.tsx"
Cohesion: 0.18
Nodes (7): inter, metadata, montserrat, geist, geistMono, montserrat, themeScript

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "onboarding/checklist.ts"
Cohesion: 0.21
Nodes (9): ItemState, MANUAL_ITEM_LABELS, MANUAL_ITEMS, ONBOARDING_GROUPS, onboardingChecklist(), OnboardingFacts, OnboardingItem, state() (+1 more)

### Community 196 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 197 - "site/brand.ts"
Cohesion: 0.33
Nodes (8): metadata, QuotesClosed(), Start(), StartPage(), funnelLive(), clean(), FALLBACK_BRAND, phoneLinks()

### Community 198 - "catch-up-forms.tsx"
Cohesion: 0.42
Nodes (7): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), CatchUpRecorded

### Community 199 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (82): ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow, FilingTable(), AmendmentCard(), BooksStillOpen() (+74 more)

### Community 200 - "pending-review.tsx"
Cohesion: 0.10
Nodes (33): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+25 more)

### Community 201 - "payment-forms.tsx"
Cohesion: 0.46
Nodes (7): AddPaymentAccountForm(), ChannelFields(), ChannelValues, EditPaymentAccountForm(), PaymentDaysForm(), ReplaceQrForm(), Result()

### Community 202 - "ai-employees.test.ts"
Cohesion: 0.25
Nodes (4): BOOKS, CLIENT_RECORDS, OWN, root

### Community 203 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 206 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 207 - "proof-upload.tsx"
Cohesion: 0.60
Nodes (5): METHODS, ProofUpload(), send(), startProofUpload(), submitProof()

### Community 208 - "toCentavos"
Cohesion: 0.07
Nodes (45): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+37 more)

### Community 209 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 211 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 213 - "buildFilingRows"
Cohesion: 0.50
Nodes (5): buildFilingRows(), holidaysByClient(), recomputeDueDates(), toDeadlineRule(), generateFilings()

### Community 214 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 215 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **22 isolated node(s):** `npx`, `NODE_USE_ENV_PROXY`, `DO_NOT_TRACK`, `RFC-2606`, `RFC-2047` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1723 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `client`, `ui.ts`, `fees/types.ts`, `devDependencies`, `ai-employees/actions.ts`, `documents/[id]/page.tsx`, `registrations/[id]/page.tsx`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `quote.ts`, `returns/types.ts`, `clients/actions.ts`, `register-xlsx.ts`, `registrations/forms.tsx`, `returns/types.ts`, `requireStaff`, `webhook.ts`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `returns/load.ts`, `handler.ts`, `fields.ts`, `books/export/route.ts`, `proposal.ts`, `public.ts`, `generate.ts`, `work/page.tsx`, `payroll/payroll.test.ts`, `board.ts`, `Centavos`, `parties/[id]/page.tsx`, `portalContext`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `@remixicon/react`, `rows.ts`, `ledger/books.ts`, `supabaseAdmin`, `ledger/types.ts`, `leads/actions.ts`, `Card`, `profile.ts`, `portal/page.tsx`, `opening.ts`, `requireOwner`, `fees/schedule.ts`, `notification-bell.tsx`, `workpapers/load.ts`, `batch/register.ts`, `showDate`, `portal/layout.tsx`, `read.test.ts`, `register-books.test.ts`, `return-file-actions.ts`, `settings/actions.ts`, `ocr/run.ts`, `structured-data.ts`, `formToObject`, `ticked-allocation.test.ts`, `filings/actions.ts`, `package.json`, `invoice-pages.tsx`, `app/page.tsx`, `holiday-list.ts`, `next`, `sign-in-form.tsx`, `fees/[id]/page.tsx`, `filters.tsx`, `cwt-2307-tracker.test.ts`, `pending-review.tsx`, `app/documents/page.tsx`, `idle-watcher.tsx`, `year-end/page.tsx`, `index.ts`, `calendar/page.tsx`, `template.ts`, `books-migration.test.ts`, `protocol.ts`, `register/page.tsx`, `ledger.test.ts`, `engine.ts`, `tax-codes.ts`, `acting-approver.test.ts`, `db.test.ts`, `lead-attribution.test.ts`, `telegram-uploads.test.ts`, `app/settings/page.tsx`, `rates.ts`, `tests/proposal-email.test.ts`, `binder/page.tsx`, `bir-filing-calendar/page.tsx`, `vitest`, `branches.ts`, `tests/books.test.ts`, `onboarding/checklist.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `ai-employees.test.ts`, `toCentavos`, `funnel.test.ts`, `notifications.test.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `fixed-assets.test.ts`, `ledger-closing.test.ts`, `lock-by-return-type.test.ts`, `tasks-and-request-owners.test.ts`, `client-requests.test.ts`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **What connects `npx`, `NODE_USE_ENV_PROXY`, `DO_NOT_TRACK` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11137254901960784 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `ai-employees/actions.ts`, `documents/[id]/page.tsx`, `registrations/[id]/page.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `clients/actions.ts`, `modal.tsx`, `registrations/forms.tsx`, `requireStaff`, `webhook.ts`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `requireOwner`, `proposal-view.tsx`, `handler.ts`, `books/export/route.ts`, `react`, `public.ts`, `books/forms.tsx`, `fixed-assets/forms.tsx`, `cx`, `parties/[id]/page.tsx`, `clients/[id]/page.tsx`, `lib/books/actions.ts`, `cycle/actions.ts`, `portalContext`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `@remixicon/react`, `rows.ts`, `books-context.ts`, `ledger/books.ts`, `ledger/data.ts`, `supabaseAdmin`, `ledger/types.ts`, `getIdentity`, `leads/actions.ts`, `Card`, `profile.ts`, `portal/page.tsx`, `requireOwner`, `Badge`, `Skeleton`, `notification-bell.tsx`, `payroll/data.ts`, `batch/register.ts`, `showDate`, `notification-bell.tsx`, `portal/layout.tsx`, `return-file-actions.ts`, `settings/actions.ts`, `module-pages.tsx`, `structured-data.ts`, `[slug]/page.tsx`, `formToObject`, `filings/actions.ts`, `package.json`, `invoice-pages.tsx`, `payroll/forms.tsx`, `chrome.tsx`, `blocks.tsx`, `next`, `sign-in-form.tsx`, `fees/[id]/page.tsx`, `getIdentity`, `pending-review.tsx`, `app/documents/page.tsx`, `command-search.tsx`, `idle-watcher.tsx`, `year-end/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `proof-upload.tsx`, `direction.tsx`, `[key]/page.tsx`, `ui.tsx`, `documents/actions.ts`, `review-form.tsx`, `app/settings/page.tsx`, `onboarding/forms.tsx`, `binder/page.tsx`, `formatAmount`, `branches.ts`, `return-files.tsx`, `site-document.tsx`, `sign-off-actions.tsx`, `site/brand.ts`, `catch-up-forms.tsx`, `filings/[id]/page.tsx`, `pending-review.tsx`, `proof-upload.tsx`, `toCentavos`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.04163265306122449 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `documents/[id]/page.tsx`, `registrations/[id]/page.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `modal.tsx`, `registrations/forms.tsx`, `button.tsx`, `requireStaff`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `requireOwner`, `proposal-view.tsx`, `handler.ts`, `supabaseServer`, `proposal.ts`, `books/forms.tsx`, `fixed-assets/forms.tsx`, `stat-cards.tsx`, `cx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `clients/[id]/page.tsx`, `notification.tsx`, `lib/books/actions.ts`, `cycle/actions.ts`, `portalContext`, `theme-toggle.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `@remixicon/react`, `rows.ts`, `books-context.ts`, `ledger/books.ts`, `ledger/data.ts`, `cx`, `supabaseAdmin`, `getIdentity`, `Notice`, `Card`, `profile.ts`, `portal/page.tsx`, `requireOwner`, `Badge`, `Skeleton`, `notification-bell.tsx`, `payroll/data.ts`, `batch/register.ts`, `showDate`, `notification-bell.tsx`, `portal/layout.tsx`, `module-pages.tsx`, `structured-data.ts`, `[slug]/page.tsx`, `package.json`, `invoice-pages.tsx`, `payroll/forms.tsx`, `chrome.tsx`, `blocks.tsx`, `sign-in-form.tsx`, `fees/[id]/page.tsx`, `filters.tsx`, `getIdentity`, `pending-review.tsx`, `app/documents/page.tsx`, `command-search.tsx`, `idle-watcher.tsx`, `year-end/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `direction.tsx`, `[key]/page.tsx`, `ui.tsx`, `documents/actions.ts`, `review-form.tsx`, `app/settings/page.tsx`, `onboarding/forms.tsx`, `binder/page.tsx`, `social-button.tsx`, `return-files.tsx`, `site-document.tsx`, `sign-off-actions.tsx`, `site/brand.ts`, `catch-up-forms.tsx`, `filings/[id]/page.tsx`, `pending-review.tsx`, `payment-forms.tsx`, `proof-upload.tsx`, `toCentavos`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._