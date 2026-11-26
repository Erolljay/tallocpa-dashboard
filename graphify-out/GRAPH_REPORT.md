# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 920 files · ~742,230 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5677 nodes · 20058 edges · 201 communities (176 shown, 25 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `7d59f172`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- december-rehearsal.test.ts
- migrate.yml
- remittances/[id]/page.tsx
- fees/types.ts
- devDependencies
- safeguards-load.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- portal/page.tsx
- Sign-in & Setup Docs
- cx
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
- compare.ts
- payroll/types.ts
- onboarding/page.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- board.ts
- scripts
- supabaseAdmin
- fees/[id]/page.tsx
- register-xlsx.ts
- getIdentity
- module-pages.tsx
- marketing/page.tsx
- ui.ts
- work/page.tsx
- returns/types.ts
- Notice
- registrations/[id]/page.tsx
- books/export/route.ts
- gemini.ts
- lock-bar.tsx
- site/brand.ts
- status.ts
- Apple Design
- supabaseServer
- testing.ts
- clients/actions.ts
- parties/actions.ts
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- input.tsx
- @remixicon/react
- Badge
- theme-toggle.tsx
- proposal-view.tsx
- branches/page.tsx
- how-we-work/page.tsx
- registrations/forms.tsx
- link-button.tsx
- Pro components
- site-document.tsx
- tools/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- notification.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- collections/forms.tsx
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- generate.ts
- select.tsx
- review-queue.ts
- boardui
- public.ts
- profile.ts
- manilaToday
- template.ts
- social-button.tsx
- vitest
- Opening balances: checklist for any cut-off
- filings/actions.ts
- home.ts
- lib/books/actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- idle-watcher.tsx
- returns/load.ts
- work/load.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- portalContext
- toCentavos
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- mime.ts
- fields.ts
- chrome.tsx
- documents/[id]/page.tsx
- fixed-assets/page.tsx
- rates.ts
- react
- ticked-allocation.test.ts
- requests/actions.ts
- ledger.test.ts
- engine.ts
- move-bar.tsx
- sign-off.ts
- blocks.tsx
- dates.ts
- register/page.tsx
- server-only
- ledger/data.ts
- steps.test.ts
- sign-off-actions.tsx
- (site)/page.tsx
- holiday-list.ts
- safeguards.ts
- tax-codes.ts
- package.json
- app/documents/page.tsx
- fixed-assets/forms.tsx
- quote.ts
- leads/[id]/page.tsx
- steps.ts
- clients/[id]/page.tsx
- Rework: one flow from lead to year-end
- slots.ts
- formatAmount
- onboarding/forms.tsx
- bir-filing-calendar/page.tsx
- file-upload.tsx
- opengraph-image.tsx
- lead-attribution.test.ts
- staff/actions.ts
- Building UIs with BoardUI
- cycle/actions.ts
- app/settings/page.tsx
- month.ts
- ref_node_fs
- acting-approver.test.ts
- fixed-assets.test.ts
- eslint.config.mjs
- copy-opencv.mjs
- returns-sign-off.test.ts
- books-2307.test.ts
- payroll/data.ts
- books/periods.ts
- generate-qap-fixture.mjs
- leads-pipeline.test.ts
- tests/books.test.ts
- contribution-remittances.test.ts
- portal-statements-approval.test.ts
- books-migration.test.ts
- books/reports/statements/page.tsx
- defer-documents.test.ts
- tests/parties.test.ts
- parallel-run.test.ts
- ledger-lock.test.ts
- tests/payroll.test.ts
- @types/react@^19
- engine.test.ts
- funnel.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 351 edges
2. `cx` - 286 edges
3. `react` - 262 edges
4. `Skeleton()` - 250 edges
5. `Notice()` - 245 edges
6. `next` - 224 edges
7. `Button()` - 220 edges
8. `Badge()` - 179 edges
9. `Card()` - 177 edges
10. `vitest` - 171 edges

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

## Communities (201 total, 25 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.07
Nodes (58): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+50 more)

### Community 1 - "december-rehearsal.test.ts"
Cohesion: 0.09
Nodes (17): buildFilingRows(), toDeadlineRule(), as(), client(), root, approveIntoBooks(), as(), generateFilings() (+9 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (63): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+55 more)

### Community 4 - "fees/types.ts"
Cohesion: 0.11
Nodes (30): zod, EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+22 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "safeguards-load.ts"
Cohesion: 0.20
Nodes (13): ClientValues, TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow (+5 more)

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

### Community 11 - "portal/page.tsx"
Cohesion: 0.09
Nodes (32): PortalClient, portalContext(), decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row (+24 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.04
Nodes (66): NotificationFilterTabs(), NotificationRowData, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter() (+58 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (38): defaultCashFlow(), codes, PNL, COA_TEMPLATES, statementsFrom(), FS_LINES, FsLine, FsLineKey (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (67): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+59 more)

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

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (27): ClientRow, order, PartCell(), ScoredClient, Scores(), ScoresPage(), Trend(), ClientMonth (+19 more)

### Community 42 - "compare.ts"
Cohesion: 0.07
Nodes (48): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+40 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "onboarding/page.tsx"
Cohesion: 0.14
Nodes (20): ClientTab, ClientTabs(), UNDER, StatusButton(), RemoveFileButton(), TickForm(), fmtDate(), Onboarding() (+12 more)

### Community 45 - "index.ts"
Cohesion: 0.04
Nodes (29): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+21 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (51): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+43 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "board.ts"
Cohesion: 0.21
Nodes (13): StepProgress(), StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS, fiveSteps() (+5 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.12
Nodes (35): @supabase/supabase-js, generateFilingsNow(), generatePastFilingsAction(), GenerateState, bookDiscoveryCallAction(), Booking(), BookingPage(), metadata (+27 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.10
Nodes (45): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+37 more)

### Community 52 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (34): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+26 more)

### Community 53 - "getIdentity"
Cohesion: 0.11
Nodes (30): DocReviewActions(), DocumentUpload(), send(), upload(), Item, typeFromName(), AssignRequestForm(), ReplyForm() (+22 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.10
Nodes (64): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+56 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (55): MarketingState, ArchiveButton(), CopyLink(), N(), pct(), php, ReportLine, ReportTable() (+47 more)

### Community 56 - "ui.ts"
Cohesion: 0.11
Nodes (30): MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+22 more)

### Community 57 - "work/page.tsx"
Cohesion: 0.06
Nodes (76): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, RequestDetail(), RequestPage() (+68 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (72): client, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv(), payslipSchedule(), PAYROLL_FORMS (+64 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (81): FormState, setupMissingChartsAction(), ClientForm(), frequencyLabel, Props, StaffOptions(), BatchUpload(), PreviewTable() (+73 more)

### Community 60 - "registrations/[id]/page.tsx"
Cohesion: 0.18
Nodes (28): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+20 more)

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (25): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+17 more)

### Community 62 - "gemini.ts"
Cohesion: 0.09
Nodes (28): runOcrAction(), OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+20 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.19
Nodes (17): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, day(), dayFmt (+9 more)

### Community 64 - "site/brand.ts"
Cohesion: 0.17
Nodes (26): AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata, FaqPage() (+18 more)

### Community 65 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "supabaseServer"
Cohesion: 0.05
Nodes (72): nextConfig, next, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction(), EditClient(), EditClientPage(), addClientNoteAction() (+64 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.14
Nodes (20): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), obligationChanges(), obligationsForTaxTypes(), TaxTypeError (+12 more)

### Community 70 - "parties/actions.ts"
Cohesion: 0.31
Nodes (8): fieldErrors(), PartyFormState, savePartyAction(), blank(), optionalText(), PartyInput, partySchema, normalizeBranch()

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.06
Nodes (72): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+64 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "input.tsx"
Cohesion: 0.11
Nodes (29): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+21 more)

### Community 76 - "@remixicon/react"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "Badge"
Cohesion: 0.04
Nodes (108): Doc, DocumentsCard(), when(), amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth() (+100 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.06
Nodes (51): react-dom@19.3.0, react-dom, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu() (+43 more)

### Community 79 - "proposal-view.tsx"
Cohesion: 0.10
Nodes (25): jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView(), Rows() (+17 more)

### Community 80 - "branches/page.tsx"
Cohesion: 0.23
Nodes (10): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchSchema, branchUpdateSchema, groupByBranch() (+2 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.15
Nodes (30): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+22 more)

### Community 82 - "registrations/forms.tsx"
Cohesion: 0.11
Nodes (26): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openRegistrationAction(), openYearRenewalsAction() (+18 more)

### Community 83 - "link-button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "site-document.tsx"
Cohesion: 0.12
Nodes (14): GlobalNotFound(), metadata, inter, metadata, montserrat, SiteLayout(), SiteNotFound(), geist (+6 more)

### Community 86 - "tools/page.tsx"
Cohesion: 0.15
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+18 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (66): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat(), BooksSection() (+58 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.14
Nodes (22): AttributionKeeper(), noop(), readAttribution(), useAttribution(), EwtKind, ATTRIBUTION_KEY, pickAttribution(), withAttribution() (+14 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.28
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Item(), mmddyyyy(), PartyFields() (+5 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.21
Nodes (23): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+15 more)

### Community 94 - "collections/forms.tsx"
Cohesion: 0.31
Nodes (10): ApplyCreditButton(), OpenItem, PaymentAccount, ReasonAction(), RemittedForm(), Result(), RunBillingForm(), RunReadyButton() (+2 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.05
Nodes (86): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+78 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.10
Nodes (35): blankLine(), InvoiceForm(), InvoiceFormValue, ApproveItem, BulkState, Booking, BookingFields(), DirectoryParty (+27 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (43): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookKind (+35 more)

### Community 101 - "generate.ts"
Cohesion: 0.15
Nodes (19): TimelineFiling, TimelineItem, IsoDate, EfpsGroup, FilingChannel, FilingInstance, Period, PeriodFilter (+11 more)

### Community 102 - "select.tsx"
Cohesion: 0.06
Nodes (42): SheetPreview(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider() (+34 more)

### Community 103 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "public.ts"
Cohesion: 0.10
Nodes (31): ProposalSetup, acceptProposalAction(), AcceptState, TAXPAYER_TYPES, complexity(), count(), EWT_CHOICES, first() (+23 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 107 - "manilaToday"
Cohesion: 0.05
Nodes (88): ClientReturnsPage(), FilingRow, Returns(), DashboardStats(), FilingListRow, FilingTable(), GenerateButton(), AmendmentCard() (+80 more)

### Community 108 - "template.ts"
Cohesion: 0.10
Nodes (21): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_LABEL, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS (+13 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors (+19 more)

### Community 110 - "vitest"
Cohesion: 0.05
Nodes (14): pg, vitest, root, root, root, root, root, Row (+6 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "filings/actions.ts"
Cohesion: 0.06
Nodes (60): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+52 more)

### Community 113 - "home.ts"
Cohesion: 0.15
Nodes (19): BooksChart(), compact, longMonth(), short(), shortMonth(), Stream, BooksSummaryRaw, c() (+11 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.09
Nodes (45): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+37 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (35): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), Client, CollectionsPage(), OpenDue (+27 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.13
Nodes (26): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+18 more)

### Community 118 - "vat.ts"
Cohesion: 0.12
Nodes (47): sawtBuckets(), atcInfo(), atcKind(), normalizeAtc(), incomeAttachments(), Periods, periods(), buildSawt() (+39 more)

### Community 119 - "idle-watcher.tsx"
Cohesion: 0.21
Nodes (18): ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.09
Nodes (46): FinancialStatements, normalizeAtc(), row(), withNonDeductible(), dayBefore(), FilingRow, ListedDocument, listInvoices() (+38 more)

### Community 121 - "work/load.ts"
Cohesion: 0.20
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.11
Nodes (13): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "portalContext"
Cohesion: 0.09
Nodes (36): @remixicon/react, Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+28 more)

### Community 126 - "toCentavos"
Cohesion: 0.08
Nodes (35): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run (+27 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (42): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), normalizeTin(), datAddress(), datNameCols() (+34 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (62): PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow() (+54 more)

### Community 129 - "opening.ts"
Cohesion: 0.08
Nodes (34): EntryLineOut, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+26 more)

### Community 130 - "mime.ts"
Cohesion: 0.09
Nodes (51): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+43 more)

### Community 131 - "fields.ts"
Cohesion: 0.09
Nodes (29): BatchRow, ACCOUNT_SOURCES, Readiness, clean, ctx, checkFields(), Issue, num() (+21 more)

### Community 132 - "chrome.tsx"
Cohesion: 0.20
Nodes (17): metadata, QuotesClosed(), Start(), StartPage(), ButtonLink(), Lockup(), NAV, SiteChrome() (+9 more)

### Community 133 - "documents/[id]/page.tsx"
Cohesion: 0.13
Nodes (27): file(), GET(), safe(), BOOKED_TYPES, PayrollDocument(), ReadPayrollButton(), SPREADSHEET_TYPES, buildEmployeeTemplate() (+19 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.28
Nodes (12): Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals() (+4 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 136 - "react"
Cohesion: 0.04
Nodes (84): react, addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Accounts(), AccountsPage() (+76 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "requests/actions.ts"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "engine.ts"
Cohesion: 0.21
Nodes (19): compareIso(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), nextWorkingDay() (+11 more)

### Community 141 - "move-bar.tsx"
Cohesion: 0.29
Nodes (12): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), unapproveSelectedAction(), MoveBar(), crossesYear() (+4 more)

### Community 142 - "sign-off.ts"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 143 - "blocks.tsx"
Cohesion: 0.17
Nodes (17): generateMetadata(), PICKER_SERVICE, Service(), ServicePage(), Breadcrumb(), BreadcrumbItem(), Crumb, Crumbs() (+9 more)

### Community 144 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 145 - "register/page.tsx"
Cohesion: 0.12
Nodes (22): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), isBalanced(), KIND_LABELS (+14 more)

### Community 146 - "server-only"
Cohesion: 0.07
Nodes (59): server-only, GET(), GET(), GET(), digestMessage(), DigestRow, longDay(), peso (+51 more)

### Community 147 - "ledger/data.ts"
Cohesion: 0.09
Nodes (36): Access, STATUS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+28 more)

### Community 148 - "steps.test.ts"
Cohesion: 0.19
Nodes (14): openClientCaseAction(), ClientCaseForm(), birForm(), branchStepsFor(), closureStepsFor(), registersWithSec(), renewalStepsFor(), stepsFor() (+6 more)

### Community 149 - "sign-off-actions.tsx"
Cohesion: 0.15
Nodes (17): NoteState, ClientNoteForm(), ExplainForm(), PayrollIntake(), SignOffState, AmendFilingForm(), checkTone, checkWord (+9 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.09
Nodes (32): robots(), metadata, FLOW_ICONS, GROUP_SPAN, metadata, sitemap(), SiteBrand, BRAND_NAME (+24 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.11
Nodes (30): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+22 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.13
Nodes (21): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+13 more)

### Community 153 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 154 - "package.json"
Cohesion: 0.18
Nodes (10): @supabase/ssr@^0.12.7, @techstark/opencv-js@4.12.0-release.1, tsx@^4.23.15, name, packageManager, private, version, @supabase/ssr (+2 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (31): ClientSelect(), loadBooking(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy() (+23 more)

### Community 156 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 157 - "quote.ts"
Cohesion: 0.09
Nodes (41): PriceRow, proposal(), buildProposalQuote(), JOB_GROUPS, JobBand, JobGroup, jobGroupOf(), jobOptions() (+33 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (32): NotesCard(), BookingLink(), ReopenForm(), bookedTime, Lead(), LeadPage(), LeadTouch, Person (+24 more)

### Community 159 - "steps.ts"
Cohesion: 0.13
Nodes (16): Agency, BranchOptions, CaseStep, ClosureOptions, dayNumber(), EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+8 more)

### Community 160 - "clients/[id]/page.tsx"
Cohesion: 0.25
Nodes (12): RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row, months (+4 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "slots.ts"
Cohesion: 0.15
Nodes (25): addDays(), byDay(), DAY_LABEL, freeSlots(), isFree(), LabelledDay, manilaDate(), manilaInstant() (+17 more)

### Community 163 - "formatAmount"
Cohesion: 0.13
Nodes (29): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+21 more)

### Community 164 - "onboarding/forms.tsx"
Cohesion: 0.28
Nodes (12): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), send() (+4 more)

### Community 165 - "bir-filing-calendar/page.tsx"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 166 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "staff/actions.ts"
Cohesion: 0.32
Nodes (9): addClientUserAction(), fieldErrors(), inviteStaffAction(), ensureLogin(), clientUserSchema, email, inviteStaffSchema, name (+1 more)

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "cycle/actions.ts"
Cohesion: 0.40
Nodes (9): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+1 more)

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (38): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), Rule (+30 more)

### Community 173 - "month.ts"
Cohesion: 0.33
Nodes (8): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none

### Community 174 - "ref_node_fs"
Cohesion: 0.07
Nodes (7): ctx, input, root, root, root, root, root

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 177 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 178 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 181 - "payroll/data.ts"
Cohesion: 0.11
Nodes (46): saveMonthAction(), EmployeeDetail(), EmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), PayrollRuns(), applyRegister() (+38 more)

### Community 182 - "books/periods.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 183 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 184 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 186 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 188 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 189 - "books/reports/statements/page.tsx"
Cohesion: 0.25
Nodes (10): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), loadReleasedReports() (+2 more)

### Community 192 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 198 - "engine.test.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 201 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1501 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **25 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `mime.ts`, `remittances/[id]/page.tsx`, `fees/types.ts`, `documents/[id]/page.tsx`, `chrome.tsx`, `react`, `requests/actions.ts`, `portal/page.tsx`, `move-bar.tsx`, `cx`, `dependencies`, `blocks.tsx`, `server-only`, `ledger/data.ts`, `sign-off-actions.tsx`, `(site)/page.tsx`, `holiday-list.ts`, `package.json`, `app/documents/page.tsx`, `fixed-assets/forms.tsx`, `leads/[id]/page.tsx`, `clients/[id]/page.tsx`, `formatAmount`, `onboarding/forms.tsx`, `opengraph-image.tsx`, `year-end/page.tsx`, `scores/page.tsx`, `staff/actions.ts`, `cycle/actions.ts`, `onboarding/page.tsx`, `app/settings/page.tsx`, `payroll/forms.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `getIdentity`, `module-pages.tsx`, `payroll/data.ts`, `ui.ts`, `marketing/page.tsx`, `work/page.tsx`, `registrations/[id]/page.tsx`, `books/export/route.ts`, `books/reports/statements/page.tsx`, `site/brand.ts`, `clients/actions.ts`, `parties/actions.ts`, `books/forms.tsx`, `Badge`, `theme-toggle.tsx`, `branches/page.tsx`, `registrations/forms.tsx`, `site-document.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `notifications-view.tsx`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `public.ts`, `profile.ts`, `manilaToday`, `social-button.tsx`, `filings/actions.ts`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `idle-watcher.tsx`, `batch/register.ts`, `portalContext`, `toCentavos`, `parties/[id]/page.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07367641614216956 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `december-rehearsal.test.ts`, `remittances/[id]/page.tsx`, `devDependencies`, `safeguards-load.ts`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `onboarding/page.tsx`, `index.ts`, `board.ts`, `fees/[id]/page.tsx`, `marketing/page.tsx`, `ui.ts`, `work/page.tsx`, `returns/types.ts`, `books/export/route.ts`, `gemini.ts`, `lock-bar.tsx`, `status.ts`, `testing.ts`, `clients/actions.ts`, `payroll/data.ts`, `Badge`, `theme-toggle.tsx`, `proposal-view.tsx`, `branches/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `notifications-view.tsx`, `ledger/books.ts`, `generate.ts`, `review-queue.ts`, `public.ts`, `profile.ts`, `manilaToday`, `template.ts`, `social-button.tsx`, `filings/actions.ts`, `home.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `idle-watcher.tsx`, `returns/load.ts`, `auth-templates.ts`, `batch/register.ts`, `toCentavos`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `mime.ts`, `fields.ts`, `fixed-assets/page.tsx`, `rates.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `engine.ts`, `move-bar.tsx`, `sign-off.ts`, `dates.ts`, `register/page.tsx`, `server-only`, `ledger/data.ts`, `steps.test.ts`, `(site)/page.tsx`, `holiday-list.ts`, `safeguards.ts`, `tax-codes.ts`, `package.json`, `app/documents/page.tsx`, `quote.ts`, `leads/[id]/page.tsx`, `slots.ts`, `bir-filing-calendar/page.tsx`, `lead-attribution.test.ts`, `staff/actions.ts`, `app/settings/page.tsx`, `month.ts`, `ref_node_fs`, `acting-approver.test.ts`, `fixed-assets.test.ts`, `returns-sign-off.test.ts`, `books-2307.test.ts`, `books/periods.ts`, `leads-pipeline.test.ts`, `tests/books.test.ts`, `contribution-remittances.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `books/reports/statements/page.tsx`, `defer-documents.test.ts`, `tests/parties.test.ts`, `parallel-run.test.ts`, `ledger-lock.test.ts`, `tests/payroll.test.ts`, `dispatch.test.ts`, `funnel.test.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `december-rehearsal.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08505747126436781 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `remittances/[id]/page.tsx`, `fees/types.ts`, `portal/page.tsx`, `cx`, `dependencies`, `year-end/page.tsx`, `scores/page.tsx`, `onboarding/page.tsx`, `payroll/forms.tsx`, `modal.tsx`, `supabaseAdmin`, `fees/[id]/page.tsx`, `getIdentity`, `module-pages.tsx`, `marketing/page.tsx`, `ui.ts`, `work/page.tsx`, `Notice`, `registrations/[id]/page.tsx`, `lock-bar.tsx`, `site/brand.ts`, `supabaseServer`, `books/forms.tsx`, `input.tsx`, `@remixicon/react`, `Badge`, `theme-toggle.tsx`, `proposal-view.tsx`, `how-we-work/page.tsx`, `registrations/forms.tsx`, `link-button.tsx`, `site-document.tsx`, `tools/page.tsx`, `portal/reports/page.tsx`, `notification.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/forms.tsx`, `collections/forms.tsx`, `notifications-view.tsx`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `profile.ts`, `manilaToday`, `social-button.tsx`, `filings/actions.ts`, `lib/books/actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `idle-watcher.tsx`, `batch/register.ts`, `portalContext`, `toCentavos`, `parties/[id]/page.tsx`, `mime.ts`, `chrome.tsx`, `documents/[id]/page.tsx`, `requests/actions.ts`, `move-bar.tsx`, `blocks.tsx`, `sign-off-actions.tsx`, `(site)/page.tsx`, `holiday-list.ts`, `package.json`, `app/documents/page.tsx`, `fixed-assets/forms.tsx`, `leads/[id]/page.tsx`, `clients/[id]/page.tsx`, `formatAmount`, `onboarding/forms.tsx`, `file-upload.tsx`, `cycle/actions.ts`, `app/settings/page.tsx`, `payroll/data.ts`, `books/reports/statements/page.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._