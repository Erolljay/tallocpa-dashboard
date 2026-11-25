# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 529 files · ~416,455 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3484 nodes · 11522 edges · 159 communities (140 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 112 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `5cd6681c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off-actions.tsx
- engine.ts
- migrate.yml
- notification.tsx
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- settings/page.tsx
- Sign-in & Setup Docs
- steps.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- vat.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- apply.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Skeleton
- templatePayload
- [month]/page.tsx
- requireOwner
- profile.ts
- scripts
- percentage.ts
- [clientId]/page.tsx
- zod
- safeguards.ts
- payroll/types.ts
- server.ts
- Centavos
- clients/actions.ts
- form-1601eq.ts
- books/page.tsx
- payroll/data.ts
- filings/[id]/page.tsx
- fixed-assets.test.ts
- fees/actions.ts
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- register-xlsx.ts
- percentage.ts
- books/forms.tsx
- clients/[id]/page.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- morning.ts
- theme-toggle.tsx
- quote.ts
- safeguards-load.ts
- payment-forms.tsx
- requireStaff
- button.tsx
- Pro components
- cx.ts
- brand/actions.ts
- returns/load.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- generate-filings/route.ts
- opening.ts
- Recipes
- index.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- fees/data.ts
- BoardUI page patterns
- registrations/forms.tsx
- boardui
- rates.ts
- Textarea
- parties/[id]/page.tsx
- filters.tsx
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- source.ts
- payroll/payroll.test.ts
- acting-approver.test.ts
- react
- parties/parties.test.ts
- apply-migrations.sh
- showMonth
- fees/types.ts
- document-upload.tsx
- assets/schedule.ts
- work/load.ts
- formatAmount
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- qap.ts
- lookupAtc
- cycle/page.tsx
- checkbox.tsx
- db.test.ts
- proof-actions.ts
- quote/page.tsx
- workpapers/load.ts
- money.ts
- withholding.test.ts
- app/documents/page.tsx
- src/app/layout.tsx
- documents/[id]/page.tsx
- ledger.test.ts
- ref_node_fs
- social-button.tsx
- proxy.ts
- ledger-lock.test.ts
- ledger-documents.test.ts
- eslint.config.mjs
- books/reports/page.tsx
- amountInput
- fields.ts
- manilaToday
- workpapers.test.ts
- @remixicon/react
- periods
- branches/actions.ts
- sign-in-form.tsx
- gap.test.ts
- SourceDocument
- deadlines/actions.ts
- post-button.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 226 edges
2. `cx` - 153 edges
3. `Notice()` - 150 edges
4. `react` - 147 edges
5. `Button()` - 145 edges
6. `Skeleton()` - 131 edges
7. `Card()` - 128 edges
8. `Badge()` - 125 edges
9. `next` - 125 edges
10. `PageHeader()` - 104 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Postgres Row-Level Security`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (159 total, 19 thin omitted)

### Community 0 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (48): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule (+40 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.09
Nodes (23): react-dom@19.3.0, react-dom, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET, GLYPH_SIZE, STROKE_WIDTH (+15 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.12
Nodes (17): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+9 more)

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

### Community 11 - "settings/page.tsx"
Cohesion: 0.24
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, describeDue(), FREQUENCY_SECTIONS (+4 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "steps.ts"
Cohesion: 0.12
Nodes (40): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+32 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), TbRowOut, FS_LINES, FsLine, FsLineKey, isFsLine() (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.13
Nodes (48): incomeAttachments(), compute(), buildSawt(), incomePayment(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm (+40 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "apply.ts"
Cohesion: 0.24
Nodes (13): RegisterPreview, CheckedRegister, checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin() (+5 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+29 more)

### Community 42 - "Notice"
Cohesion: 0.09
Nodes (73): AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), OpeningUpload() (+65 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (43): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+35 more)

### Community 44 - "Skeleton"
Cohesion: 0.08
Nodes (47): nextConfig, next, NewClientPage(), ClientList(), ClientsPage(), Row, Lines(), lineStyle (+39 more)

### Community 45 - "templatePayload"
Cohesion: 0.17
Nodes (8): templatePayload(), as(), client(), root, as(), books(), root, root

### Community 46 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+7 more)

### Community 47 - "requireOwner"
Cohesion: 0.32
Nodes (14): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+6 more)

### Community 48 - "profile.ts"
Cohesion: 0.09
Nodes (31): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+23 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.10
Nodes (36): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), form1701, form1702RT, reconciliation() (+28 more)

### Community 51 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (33): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+25 more)

### Community 52 - "zod"
Cohesion: 0.24
Nodes (8): zod, GET(), GET(), code, email, SignInState, signInWithGoogle(), safeNextPath()

### Community 53 - "safeguards.ts"
Cohesion: 0.20
Nodes (14): documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), RISK_ORDER, riskOf(), STEP_LABELS, StepKey, stepsFor() (+6 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "server.ts"
Cohesion: 0.16
Nodes (20): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+12 more)

### Community 56 - "Centavos"
Cohesion: 0.07
Nodes (62): GridRow, AlphaCols, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+54 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.11
Nodes (25): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+17 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.16
Nodes (20): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines() (+12 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.09
Nodes (40): Accounts(), AccountsPage(), GROUPS, AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+32 more)

### Community 60 - "payroll/data.ts"
Cohesion: 0.11
Nodes (30): server-only, @supabase/supabase-js, EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), check(), PortalPayrollState (+22 more)

### Community 61 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (21): FilingListRow, Event, eventText, Filing(), FilingPage(), paymentText, when(), SignOffActions() (+13 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "fees/actions.ts"
Cohesion: 0.15
Nodes (21): activateAction(), createFromTemplateAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction(), text() (+13 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.06
Nodes (35): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+27 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.13
Nodes (23): alphaCols(), Alphalist, tinDashed(), differsFromSuggestion(), enteredNet(), PayrollContext, displayName(), BUSINESS_TAX_FORMS (+15 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "register-xlsx.ts"
Cohesion: 0.18
Nodes (22): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), sortItems(), registerHeaders() (+14 more)

### Community 70 - "percentage.ts"
Cohesion: 0.22
Nodes (16): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), penalties(), quarterlyPayments(), compute1701Q() (+8 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "clients/[id]/page.tsx"
Cohesion: 0.10
Nodes (35): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm() (+27 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (16): Access, STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem (+8 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (39): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+31 more)

### Community 77 - "morning.ts"
Cohesion: 0.16
Nodes (16): Gap, Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+8 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (30): EstimatedProfile, ExistingClient, GapRow, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE (+22 more)

### Community 80 - "safeguards-load.ts"
Cohesion: 0.20
Nodes (10): Row, BoardRow, FilingRow, holidaySet(), Risk, Step, QueueFiling, QueueViewer (+2 more)

### Community 81 - "payment-forms.tsx"
Cohesion: 0.25
Nodes (16): PaymentSettings(), accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+8 more)

### Community 82 - "requireStaff"
Cohesion: 0.10
Nodes (45): FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, ActingNotice() (+37 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "brand/actions.ts"
Cohesion: 0.18
Nodes (15): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+7 more)

### Community 87 - "returns/load.ts"
Cohesion: 0.18
Nodes (16): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, dayBefore(), FilingRow, loadLedger(), loadWorksheet() (+8 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.08
Nodes (34): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+26 more)

### Community 92 - "LinkButton"
Cohesion: 0.12
Nodes (27): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+19 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.17
Nodes (15): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+7 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "index.ts"
Cohesion: 0.11
Nodes (15): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+7 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.14
Nodes (15): EditClient(), EditClientPage(), addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), OwnerOnly() (+7 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.07
Nodes (50): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+42 more)

### Community 101 - "fees/data.ts"
Cohesion: 0.16
Nodes (15): dateFmt, Supabase, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num(), optionalAmount (+7 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (53): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction() (+45 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "Textarea"
Cohesion: 0.26
Nodes (14): ReplyForm(), send(), getIdentity(), shrinkImage(), closeRequestAction(), createRequestAction(), openTicketAction(), refresh() (+6 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.12
Nodes (32): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+24 more)

### Community 108 - "filters.tsx"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (25): deleteDraftAction(), FeeFormState, loadSchedule(), longDate(), nextEffectiveDate(), statusLabel, statusTone, ActivateForm() (+17 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "source.ts"
Cohesion: 0.16
Nodes (21): normalizeAtc(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromRegisterLine(), isApproved() (+13 more)

### Community 113 - "payroll/payroll.test.ts"
Cohesion: 0.15
Nodes (19): MonthGrid(), toInput(), BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS (+11 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "react"
Cohesion: 0.09
Nodes (27): react, Message(), OpeningAssetForm(), RunDepreciationButton(), SetupAssetForm(), one(), PartyList(), Row (+19 more)

### Community 116 - "parties/parties.test.ts"
Cohesion: 0.16
Nodes (21): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), normalizeTin(), runOcr() (+13 more)

### Community 118 - "showMonth"
Cohesion: 0.13
Nodes (28): MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard(), PortalHome() (+20 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.21
Nodes (13): count(), first(), pick(), profileFromQuery(), QuerySource, items, BOOKKEEPING_LEVELS, BookkeepingLevel (+5 more)

### Community 120 - "document-upload.tsx"
Cohesion: 0.23
Nodes (13): DocumentUpload(), send(), upload(), Item, ALLOWED, finishUpload(), replyDocumentAction(), reviewDocumentAction() (+5 more)

### Community 121 - "assets/schedule.ts"
Cohesion: 0.25
Nodes (16): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), accumulated(), bookFor() (+8 more)

### Community 122 - "work/load.ts"
Cohesion: 0.18
Nodes (16): loadAssets(), Row, lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency() (+8 more)

### Community 123 - "formatAmount"
Cohesion: 0.08
Nodes (54): PayrollSetupPage(), Setup(), Certificates(), Form2316Page(), amt(), CertificatesTable(), Href, LineParts() (+46 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 126 - "qap.ts"
Cohesion: 0.26
Nodes (13): tinDigits(), branchFromTin(), buildQapRows(), csvCell(), mmYYYY(), MONTH_NAMES, qapCsv(), qapDat() (+5 more)

### Community 127 - "lookupAtc"
Cohesion: 0.22
Nodes (11): ATC_MASTER, AtcInfo, lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+3 more)

### Community 128 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (24): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton() (+16 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "proof-actions.ts"
Cohesion: 0.27
Nodes (10): amount, date, refresh(), rejectProofAction(), StartProof, submitProof(), submitSchema, text() (+2 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.21
Nodes (16): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview() (+8 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.05
Nodes (72): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+64 more)

### Community 134 - "money.ts"
Cohesion: 0.32
Nodes (9): monthlyTable(), monthlyWithholding(), applyRate(), basisPoints(), grossUp(), grouped, roundHalfAway(), sum() (+1 more)

### Community 135 - "withholding.test.ts"
Cohesion: 0.24
Nodes (5): form0619E, form1601EQ, WITHHOLDING_FORMS, client, Q1

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (31): approveSelectedAction(), BOOKED, BulkState, key(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList() (+23 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "documents/[id]/page.tsx"
Cohesion: 0.36
Nodes (6): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), LockFiling, lockingFiling()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.07
Nodes (13): pg, vitest, ctx, input, root, root, root, root (+5 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "ledger-lock.test.ts"
Cohesion: 0.15
Nodes (6): outDir, pkgDir, require, { version }, BOOK_LOCK_FORMS, root

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "books/reports/page.tsx"
Cohesion: 0.13
Nodes (24): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+16 more)

### Community 147 - "amountInput"
Cohesion: 0.40
Nodes (10): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), inputsFor(), amountInput() (+2 more)

### Community 148 - "fields.ts"
Cohesion: 0.09
Nodes (31): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, DocActionState, checkFields() (+23 more)

### Community 149 - "manilaToday"
Cohesion: 0.13
Nodes (24): GET(), Detail(), StatementPage(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail() (+16 more)

### Community 150 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 151 - "@remixicon/react"
Cohesion: 0.42
Nodes (7): @remixicon/react, PortalRequest(), RequestDetail(), CloseRequestButton(), Thread(), ThreadMessage, when()

### Community 152 - "periods"
Cohesion: 0.57
Nodes (8): Periods, periods(), addMonths(), monthEnd(), monthsBetween(), pad2(), quarterOf(), taxableYear()

### Community 153 - "branches/actions.ts"
Cohesion: 0.48
Nodes (6): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema

### Community 154 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (8): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 155 - "gap.test.ts"
Cohesion: 0.29
Nodes (6): estimateProfile(), has(), items, PRICES, schedule, settings

### Community 156 - "SourceDocument"
Cohesion: 0.33
Nodes (4): Split, EwtLine, ListedDocument, SourceDocument

### Community 157 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 158 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1012 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Skeleton` to `cycle/page.tsx`, `sign-off-actions.tsx`, `proof-actions.ts`, `quote/page.tsx`, `devDependencies`, `workpapers/load.ts`, `app/documents/page.tsx`, `src/app/layout.tsx`, `documents/[id]/page.tsx`, `settings/page.tsx`, `steps.ts`, `proxy.ts`, `dependencies`, `books/reports/page.tsx`, `fields.ts`, `manilaToday`, `@remixicon/react`, `branches/actions.ts`, `deadlines/actions.ts`, `post-button.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[month]/page.tsx`, `requireOwner`, `[clientId]/page.tsx`, `zod`, `server.ts`, `clients/actions.ts`, `books/page.tsx`, `payroll/data.ts`, `filings/[id]/page.tsx`, `fees/actions.ts`, `dropdown.tsx`, `register-xlsx.ts`, `books/forms.tsx`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `payment-forms.tsx`, `requireStaff`, `brand/actions.ts`, `returns/load.ts`, `app/app/layout.tsx`, `LinkButton`, `generate-filings/route.ts`, `supabaseServer`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `react`, `parties/parties.test.ts`, `showMonth`, `document-upload.tsx`, `assets/schedule.ts`, `formatAmount`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07924984875983061 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `cycle/page.tsx`, `sign-off-actions.tsx`, `checkbox.tsx`, `notification.tsx`, `quote/page.tsx`, `devDependencies`, `workpapers/load.ts`, `app/documents/page.tsx`, `documents/[id]/page.tsx`, `settings/page.tsx`, `steps.ts`, `social-button.tsx`, `dependencies`, `books/reports/page.tsx`, `statements.ts`, `fields.ts`, `manilaToday`, `@remixicon/react`, `sign-in-form.tsx`, `deadlines/actions.ts`, `post-button.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `[month]/page.tsx`, `[clientId]/page.tsx`, `server.ts`, `books/page.tsx`, `payroll/data.ts`, `filings/[id]/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `payment-forms.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `showMonth`, `document-upload.tsx`, `assets/schedule.ts`, `formatAmount`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `cycle/page.tsx`, `engine.ts`, `db.test.ts`, `arap.ts`, `devDependencies`, `workpapers/load.ts`, `gemini.ts`, `app/documents/page.tsx`, `withholding.test.ts`, `documents/[id]/page.tsx`, `settings/page.tsx`, `money.ts`, `steps.ts`, `ledger.test.ts`, `ledger-lock.test.ts`, `ledger-documents.test.ts`, `statements.ts`, `fields.ts`, `workpapers.test.ts`, `gap.test.ts`, `SourceDocument`, `scores/page.tsx`, `templatePayload`, `[month]/page.tsx`, `profile.ts`, `[clientId]/page.tsx`, `zod`, `safeguards.ts`, `Centavos`, `clients/actions.ts`, `books/page.tsx`, `fixed-assets.test.ts`, `fees/actions.ts`, `vitest`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `morning.ts`, `quote.ts`, `safeguards-load.ts`, `requireStaff`, `document-scanner.tsx`, `generate-filings/route.ts`, `opening.ts`, `index.ts`, `print/page.tsx`, `registrations/forms.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `filters.tsx`, `settings/actions.ts`, `source.ts`, `payroll/payroll.test.ts`, `acting-approver.test.ts`, `showMonth`, `fees/types.ts`, `assets/schedule.ts`, `formatAmount`, `sign-off.ts`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._