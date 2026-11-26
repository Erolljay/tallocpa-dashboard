# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 855 files · ~673,025 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 8, (none) 4, .mdc 1)

## Summary
- 5306 nodes · 18470 edges · 194 communities (169 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 155 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `85845520`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- generate.ts
- migrate.yml
- ledger/data.ts
- public.ts
- package.json
- clients/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- documents/[id]/page.tsx
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
- Decisions Log
- Develop Commands
- year-end/page.tsx
- scores/page.tsx
- Centavos
- payroll/types.ts
- tax-codes.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- addDays
- scripts
- slots.ts
- workpapers/page.tsx
- register-xlsx.ts
- app/settings/page.tsx
- binder/page.tsx
- marketing/page.tsx
- year.ts
- status.ts
- returns/types.ts
- Notice
- layout.ts
- ledger/data.ts
- workpapers/load.ts
- pg
- cx
- dropdown.tsx
- Apple Design
- server.ts
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- marketing/attribution.ts
- Rules
- Animation Performance
- [month]/page.tsx
- stat-cards.tsx
- cycle-forms.tsx
- theme-toggle.tsx
- quote.ts
- portal/layout.tsx
- idle-watcher.tsx
- leads/actions.ts
- button.tsx
- Pro components
- proof-upload.tsx
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- gap/page.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- toCentavos
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- formatAmount
- ledger/books.ts
- ref_node_fs
- holiday-list.ts
- react
- boardui
- staff/page.tsx
- profile.ts
- filings/[id]/page.tsx
- app/documents/page.tsx
- document-upload.tsx
- generate-qap-fixture.mjs
- Opening balances: checklist for any cut-off
- showMonth
- portal/page.tsx
- lib/books/actions.ts
- approval-memo.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- documents/labels.ts
- Centavos
- returns/load.ts
- quote/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- documents/[id]/page.tsx
- dates.ts
- read.test.ts
- Badge
- return-file-actions.ts
- fees/forms.tsx
- onboarding/page.tsx
- gemini.ts
- work/load.ts
- xlsx.ts
- Card
- ticked-allocation.test.ts
- app/page.tsx
- ledger.test.ts
- deadlines/actions.ts
- filings/actions.ts
- notifications/format.ts
- ledger-closing.test.ts
- names.ts
- queries.ts
- supabaseAdmin
- opening-checklist.tsx
- fixed-assets/page.tsx
- notifications-view.tsx
- (site)/page.tsx
- notification-actions.tsx
- safeguards.ts
- register/page.tsx
- social-button.tsx
- filters.tsx
- notes.ts
- financial-statements-view.tsx
- notification-settings-view.tsx
- filed-returns.ts
- file-upload.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- bell-store.ts
- worksheet/page.tsx
- batch/forms.tsx
- books/reports/statements/page.tsx
- db.test.ts
- lead-attribution.test.ts
- Building UIs with BoardUI
- workpapers.test.ts
- copy-opencv.mjs
- ledger-lock.test.ts
- funnel.test.ts
- supabaseServer
- acting-approver.test.ts
- leads-pipeline.test.ts
- registrations/forms.tsx
- parallel-run.test.ts
- returns-sign-off.test.ts
- books/reports/2307/page.tsx
- fees/types.ts
- any-cutoff.test.ts
- vitest
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- ledger-documents.test.ts
- month-complete.test.ts
- tests/parties.test.ts
- portal-statements-approval.test.ts
- tests/payroll.test.ts
- returns-books.test.ts
- review/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 310 edges
2. `cx` - 259 edges
3. `react` - 245 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 206 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 156 edges

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

## Communities (194 total, 25 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (48): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), one(), portal2307(), portal2307Href(), SearchParams (+40 more)

### Community 1 - "generate.ts"
Cohesion: 0.07
Nodes (56): Rule, TimelineFiling, TimelineItem, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth() (+48 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ledger/data.ts"
Cohesion: 0.10
Nodes (28): Accounts(), AccountsPage(), GROUPS, BookEntry, CashFlowClass, codes, PNL, COA_TEMPLATES (+20 more)

### Community 4 - "public.ts"
Cohesion: 0.15
Nodes (20): QuerySource, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num(), optionalAmount (+12 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "clients/[id]/page.tsx"
Cohesion: 0.10
Nodes (32): FormState, removeAssignmentAction(), setIncomeTaxMethodAction(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm() (+24 more)

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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.19
Nodes (17): markReadLocally(), BellPanel(), BellRow(), DotBadge(), NotificationBell(), base(), BellAudience, notificationSettingsHref() (+9 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (37): file(), GET(), safe(), Payroll(), PayrollPage(), BOOKED_TYPES, DocumentReviewPage(), loadBooking() (+29 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.11
Nodes (33): CASH_FLOW_CLASSES, defaultCashFlow(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+25 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (82): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+74 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (54): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+46 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "Centavos"
Cohesion: 0.07
Nodes (61): ParallelRun(), ParallelRunPage(), quarterMonths(), Documents(), KIND, MonthDetail(), monthName(), Parties() (+53 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "tax-codes.ts"
Cohesion: 0.18
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (42): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+34 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 48 - "addDays"
Cohesion: 0.11
Nodes (33): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+25 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.14
Nodes (26): noteAction(), raiseNoteAction(), signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+18 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (24): sortItems(), CheckedRegister, checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin() (+16 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.13
Nodes (32): appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), accountSchema, addPaymentAccountAction() (+24 more)

### Community 54 - "binder/page.tsx"
Cohesion: 0.42
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, totals()

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (29): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+21 more)

### Community 56 - "year.ts"
Cohesion: 0.05
Nodes (82): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+74 more)

### Community 57 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 58 - "returns/types.ts"
Cohesion: 0.04
Nodes (83): client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+75 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (86): BatchUpload(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+78 more)

### Community 60 - "layout.ts"
Cohesion: 0.11
Nodes (25): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+17 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 62 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (20): ExplainState, explainTieAction(), SIGNED, RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd() (+12 more)

### Community 63 - "pg"
Cohesion: 0.08
Nodes (9): pg, Data, root, Row, root, root, root, Row (+1 more)

### Community 64 - "cx"
Cohesion: 0.03
Nodes (93): ClientTab, UNDER, AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor (+85 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.11
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+20 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "server.ts"
Cohesion: 0.13
Nodes (21): zod, GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+13 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (48): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+40 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (53): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+45 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+28 more)

### Community 72 - "marketing/attribution.ts"
Cohesion: 0.18
Nodes (27): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, ATTR_COOKIE, ATTR_COOKIE_MAX_AGE (+19 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "cycle-forms.tsx"
Cohesion: 0.16
Nodes (21): Cycle(), CycleWithClient, DocRow, ExceptionRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+13 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 79 - "quote.ts"
Cohesion: 0.14
Nodes (22): buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches(), pesos() (+14 more)

### Community 80 - "portal/layout.tsx"
Cohesion: 0.09
Nodes (33): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+25 more)

### Community 81 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 82 - "leads/actions.ts"
Cohesion: 0.33
Nodes (15): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+7 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (37): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+29 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "proof-upload.tsx"
Cohesion: 0.12
Nodes (29): ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity(), amount, date (+21 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.19
Nodes (19): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+11 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (59): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+51 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (28): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "gap/page.tsx"
Cohesion: 0.15
Nodes (20): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+12 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.32
Nodes (12): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+4 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (24): BookingLink(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadTouch, Person, Lines() (+16 more)

### Community 94 - "toCentavos"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.17
Nodes (26): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), certificatesFromRaw(), load2316Release(), loadEntries() (+18 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "formatAmount"
Cohesion: 0.08
Nodes (82): booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList(), Column (+74 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (52): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, Pad() (+44 more)

### Community 101 - "ref_node_fs"
Cohesion: 0.09
Nodes (6): ctx, input, root, root, root, root

### Community 102 - "holiday-list.ts"
Cohesion: 0.12
Nodes (25): addHolidayYearAction(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, periodWord, RemoveHolidayButton(), easterSunday() (+17 more)

### Community 103 - "react"
Cohesion: 0.06
Nodes (45): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage() (+37 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "staff/page.tsx"
Cohesion: 0.18
Nodes (14): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), roleLabel, StaffList(), StaffPage() (+6 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (57): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+49 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (34): FilingRow, FilingListRow, bookKind, BookRow, bookStatus, Event, eventText, FilingFile (+26 more)

### Community 108 - "app/documents/page.tsx"
Cohesion: 0.05
Nodes (76): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), ClientSelect(), approveDocumentAction() (+68 more)

### Community 109 - "document-upload.tsx"
Cohesion: 0.19
Nodes (15): DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED, DocActionState, finishUpload() (+7 more)

### Community 110 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "showMonth"
Cohesion: 0.16
Nodes (18): MonthComplete(), SentRow, TimelineRow, manilaDay(), MonthCard(), shortDay(), confirmMonthAction(), CycleState (+10 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (31): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+23 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (42): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, books() (+34 more)

### Community 115 - "approval-memo.tsx"
Cohesion: 0.19
Nodes (12): amt(), ApprovalMemo(), Db, TIE, approvalMemo(), Memo, MemoInput, MemoMonth (+4 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.21
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "vat.ts"
Cohesion: 0.11
Nodes (47): qapBuckets(), sawtBuckets(), lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+39 more)

### Community 119 - "documents/labels.ts"
Cohesion: 0.14
Nodes (23): DocReviewActions(), Doc, DocumentsCard(), when(), Row, Doc, Documents(), FolderKey (+15 more)

### Community 120 - "Centavos"
Cohesion: 0.09
Nodes (28): BatchCheck, BatchRow, BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), Note (+20 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.06
Nodes (55): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), loadAssets(), LOCKED_STATUSES, FinancialStatements, ATC_MASTER (+47 more)

### Community 122 - "quote/page.tsx"
Cohesion: 0.19
Nodes (17): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+9 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.14
Nodes (19): loadBatchContext(), monthsBetween(), accountLabel(), BatchAccount, BatchColumn, BatchContext, centavosOf(), checkRow() (+11 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.11
Nodes (37): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+29 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (35): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+27 more)

### Community 127 - "dates.ts"
Cohesion: 0.30
Nodes (12): shift(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload(), addMonths(), ymd() (+4 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (80): RFC-4180, BirCategory, CATEGORIES, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS (+72 more)

### Community 129 - "Badge"
Cohesion: 0.12
Nodes (30): PreviewTable(), day(), Leads(), LeadsPage(), Row, ViewLink(), RequestDetail(), RequestPage() (+22 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "fees/forms.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 132 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 133 - "gemini.ts"
Cohesion: 0.09
Nodes (25): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+17 more)

### Community 134 - "work/load.ts"
Cohesion: 0.18
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 135 - "xlsx.ts"
Cohesion: 0.21
Nodes (13): GET(), safe(), loadAccounts(), BATCH_COLUMNS, BATCH_KINDS, buildBatchTemplate(), cellText(), MAX_ROWS (+5 more)

### Community 136 - "Card"
Cohesion: 0.06
Nodes (62): Batch(), BatchPage(), one(), toCentavos(), NewEntry(), NewEntryPage(), MonthSelect(), Print() (+54 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "app/page.tsx"
Cohesion: 0.24
Nodes (14): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), Chip() (+6 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 141 - "filings/actions.ts"
Cohesion: 0.24
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 142 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 143 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 144 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 145 - "queries.ts"
Cohesion: 0.20
Nodes (13): GET(), BELL_LIMIT, BellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.14
Nodes (31): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+23 more)

### Community 147 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (15): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem, ItemStatus (+7 more)

### Community 148 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 149 - "notifications-view.tsx"
Cohesion: 0.25
Nodes (13): Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one() (+5 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.05
Nodes (85): nextConfig, next, @remixicon/react, alt, contentType, Image(), montserrat(), size (+77 more)

### Community 151 - "notification-actions.tsx"
Cohesion: 0.21
Nodes (13): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+5 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.10
Nodes (34): Gap, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+26 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.10
Nodes (38): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+30 more)

### Community 154 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 155 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 156 - "notes.ts"
Cohesion: 0.21
Nodes (12): ICON, when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow, NoteSource, notesTimeline() (+4 more)

### Community 157 - "financial-statements-view.tsx"
Cohesion: 0.23
Nodes (9): react-dom@19.3.0, react-dom, PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), PrintButton() (+1 more)

### Community 158 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (11): EmailSwitches(), EmailSwitchGroup, Switch(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS, NOTIFICATION_KINDS, NotificationAudience (+3 more)

### Community 159 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 160 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (38): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+30 more)

### Community 163 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 164 - "worksheet/page.tsx"
Cohesion: 0.38
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 165 - "batch/forms.tsx"
Cohesion: 0.44
Nodes (7): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchKind, checkBatch()

### Community 166 - "books/reports/statements/page.tsx"
Cohesion: 0.46
Nodes (7): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), loadReleasedReports(), loadStatements()

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 170 - "workpapers.test.ts"
Cohesion: 0.17
Nodes (8): LedgerTotals, base, books, buy, sale, as(), bookedDoc(), root

### Community 171 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 173 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 174 - "supabaseServer"
Cohesion: 0.06
Nodes (71): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction(), ClientForm() (+63 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (89): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+81 more)

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "books/reports/2307/page.tsx"
Cohesion: 0.70
Nodes (4): Certificates(), Staff2307Page(), print2307Href(), Form2307List()

### Community 181 - "fees/types.ts"
Cohesion: 0.14
Nodes (18): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+10 more)

### Community 182 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 183 - "vitest"
Cohesion: 0.06
Nodes (12): vitest, root, root, root, root, root, root, root (+4 more)

### Community 184 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 186 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 193 - "review/page.tsx"
Cohesion: 0.12
Nodes (27): Queue(), ReviewPage(), Row, Section(), ActingState, appointActingAction(), endActingAction(), refresh() (+19 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1420 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `(site)/page.tsx` to `form-2307.ts`, `ledger/data.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `payroll/forms.tsx`, `modal.tsx`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `marketing/page.tsx`, `Notice`, `workpapers/load.ts`, `cx`, `server.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `marketing/attribution.ts`, `[month]/page.tsx`, `cycle-forms.tsx`, `portal/layout.tsx`, `idle-watcher.tsx`, `leads/actions.ts`, `button.tsx`, `proof-upload.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `gap/page.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `formatAmount`, `ledger/books.ts`, `holiday-list.ts`, `react`, `staff/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `document-upload.tsx`, `showMonth`, `portal/page.tsx`, `lib/books/actions.ts`, `approval-memo.tsx`, `calendar/staff.ts`, `documents/labels.ts`, `returns/load.ts`, `quote/page.tsx`, `manilaToday`, `documents/[id]/page.tsx`, `dates.ts`, `Badge`, `return-file-actions.ts`, `fees/forms.tsx`, `onboarding/page.tsx`, `work/load.ts`, `xlsx.ts`, `Card`, `app/page.tsx`, `deadlines/actions.ts`, `filings/actions.ts`, `queries.ts`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `notifications-view.tsx`, `notification-actions.tsx`, `register/page.tsx`, `financial-statements-view.tsx`, `worksheet/page.tsx`, `batch/forms.tsx`, `books/reports/statements/page.tsx`, `supabaseServer`, `registrations/forms.tsx`, `review/page.tsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0847457627118644 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ledger/data.ts`, `package.json`, `clients/[id]/page.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `payroll/forms.tsx`, `modal.tsx`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `app/settings/page.tsx`, `binder/page.tsx`, `marketing/page.tsx`, `Notice`, `workpapers/load.ts`, `cx`, `dropdown.tsx`, `server.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `[month]/page.tsx`, `stat-cards.tsx`, `cycle-forms.tsx`, `theme-toggle.tsx`, `portal/layout.tsx`, `idle-watcher.tsx`, `leads/actions.ts`, `button.tsx`, `proof-upload.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `gap/page.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `formatAmount`, `ledger/books.ts`, `holiday-list.ts`, `staff/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `document-upload.tsx`, `showMonth`, `portal/page.tsx`, `lib/books/actions.ts`, `calendar/staff.ts`, `documents/labels.ts`, `quote/page.tsx`, `manilaToday`, `documents/[id]/page.tsx`, `dates.ts`, `Badge`, `return-file-actions.ts`, `fees/forms.tsx`, `onboarding/page.tsx`, `work/load.ts`, `Card`, `app/page.tsx`, `deadlines/actions.ts`, `queries.ts`, `fixed-assets/page.tsx`, `notifications-view.tsx`, `(site)/page.tsx`, `notification-actions.tsx`, `register/page.tsx`, `social-button.tsx`, `filters.tsx`, `financial-statements-view.tsx`, `notification-settings-view.tsx`, `file-upload.tsx`, `calendar/page.tsx`, `bell-store.ts`, `worksheet/page.tsx`, `batch/forms.tsx`, `books/reports/statements/page.tsx`, `supabaseServer`, `registrations/forms.tsx`, `books/reports/2307/page.tsx`, `review/page.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07289002557544758 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `generate.ts`, `ledger/data.ts`, `public.ts`, `package.json`, `clients/[id]/page.tsx`, `documents/[id]/page.tsx`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `tax-codes.ts`, `index.ts`, `addDays`, `slots.ts`, `workpapers/page.tsx`, `app/settings/page.tsx`, `year.ts`, `status.ts`, `returns/types.ts`, `layout.ts`, `ledger/data.ts`, `pg`, `server.ts`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `marketing/attribution.ts`, `cycle-forms.tsx`, `quote.ts`, `portal/layout.tsx`, `idle-watcher.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `gap/page.tsx`, `leads/[id]/page.tsx`, `toCentavos`, `formatAmount`, `ledger/books.ts`, `ref_node_fs`, `holiday-list.ts`, `staff/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `showMonth`, `portal/page.tsx`, `approval-memo.tsx`, `calendar/staff.ts`, `returns/load.ts`, `batch/register.ts`, `documents/[id]/page.tsx`, `dates.ts`, `read.test.ts`, `Badge`, `return-file-actions.ts`, `onboarding/page.tsx`, `gemini.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `filings/actions.ts`, `notifications/format.ts`, `ledger-closing.test.ts`, `names.ts`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `(site)/page.tsx`, `safeguards.ts`, `register/page.tsx`, `filters.tsx`, `notes.ts`, `financial-statements-view.tsx`, `filed-returns.ts`, `calendar/page.tsx`, `db.test.ts`, `lead-attribution.test.ts`, `workpapers.test.ts`, `ledger-lock.test.ts`, `funnel.test.ts`, `supabaseServer`, `acting-approver.test.ts`, `leads-pipeline.test.ts`, `registrations/forms.tsx`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `fees/types.ts`, `any-cutoff.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `ledger-documents.test.ts`, `month-complete.test.ts`, `tests/parties.test.ts`, `portal-statements-approval.test.ts`, `tests/payroll.test.ts`, `returns-books.test.ts`, `review/page.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._