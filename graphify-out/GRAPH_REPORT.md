# Graph Report - agent-a690b5ca4b9f9857b  (2026-11-25)

## Corpus Check
- 575 files · ~443,467 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 3709 nodes · 12409 edges · 170 communities (147 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 116 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `28300edd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- filings/run.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- registrations/forms.tsx
- Sign-in & Setup Docs
- onboarding/page.tsx
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
- portal/payroll/actions.ts
- scores/page.tsx
- Card
- payroll/types.ts
- @remixicon/react
- settings/page.tsx
- payroll/forms.tsx
- payment-actions.ts
- profile.ts
- scripts
- income.ts
- review.ts
- batch/register.ts
- ledger/data.ts
- certificate.ts
- portal/documents/page.tsx
- Centavos
- supabaseServer
- returns/types.ts
- Notice
- addDays
- collections/page.tsx
- fixed-assets.test.ts
- workpapers/page.tsx
- cx
- dropdown.tsx
- Apple Design
- alphalist.ts
- testing.ts
- file-upload.tsx
- ref_node_fs
- books/forms.tsx
- clients/[id]/page.tsx
- Rules
- Animation Performance
- ledger/types.ts
- stat-cards.tsx
- safeguards-load.ts
- theme-toggle.tsx
- quote.ts
- showMonth
- Button
- requireStaff
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- safeguards.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- brand/forms.tsx
- opening.ts
- Recipes
- ledger-lock.test.ts
- BoardUI theming reference
- Pro templates
- next
- print/page.tsx
- public.ts
- payroll/payroll.test.ts
- books/reports/page.tsx
- boardui
- rates.ts
- getIdentity
- parties/[id]/page.tsx
- db.test.ts
- settings/actions.ts
- fees/schedule.ts
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- LinkButton
- acting-approver.test.ts
- gap.ts
- staff/page.tsx
- apply-migrations.sh
- portal/page.tsx
- fees/types.ts
- batch/load.ts
- returns/load.ts
- work/load.ts
- formatAmount
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- cycle/page.tsx
- documents/labels.ts
- leads/[id]/page.tsx
- checkbox.tsx
- clients/schema.ts
- proof-upload.tsx
- quote/page.tsx
- workpapers/load.ts
- Skeleton
- documents-card.tsx
- app/documents/page.tsx
- sidebar-toggle.tsx
- breadcrumb.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- seed.ts
- start/page.tsx
- batch/forms.tsx
- [employeeId]/page.tsx
- eslint.config.mjs
- fields.ts
- statement-view.tsx
- copy-opencv.mjs
- fees/forms.tsx
- xlsx.ts
- names.ts
- templatePayload
- binder/page.tsx
- zod
- acting/run.ts
- BoardUI page patterns
- index.ts
- parts.ts
- Rework: one flow from lead to year-end
- workpapers.test.ts
- payroll/data.ts
- filters.tsx
- post-button.tsx
- ledger-documents.test.ts
- fees.test.ts
- tests/payroll.test.ts
- month-complete.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 252 edges
2. `Notice()` - 176 edges
3. `cx` - 167 edges
4. `Button()` - 162 edges
5. `react` - 162 edges
6. `Skeleton()` - 145 edges
7. `next` - 141 edges
8. `Card()` - 138 edges
9. `Badge()` - 135 edges
10. `PageHeader()` - 115 edges

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

## Communities (170 total, 23 thin omitted)

### Community 0 - "react"
Cohesion: 0.10
Nodes (28): react, DocReviewActions(), RecordDepositForm(), PayrollIntake(), SignOffState, AmendFilingForm(), checkTone, checkWord (+20 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.12
Nodes (25): GET(), Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel (+17 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.12
Nodes (16): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+8 more)

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

### Community 11 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (78): ClientCaseKind, dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), updateStepAction(), caseNote, caseTitle (+70 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (30): ClientTab, ClientTabs(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload() (+22 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (41): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.10
Nodes (55): ATC_MASTER, AtcInfo, lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS (+47 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "portal/payroll/actions.ts"
Cohesion: 0.24
Nodes (10): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), totals(), lastDay(), PAY_PERIODS (+2 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Card"
Cohesion: 0.14
Nodes (26): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), Booking, FunnelSwitch(), Leads() (+18 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "@remixicon/react"
Cohesion: 0.18
Nodes (20): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+12 more)

### Community 45 - "settings/page.tsx"
Cohesion: 0.17
Nodes (21): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+13 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (39): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+31 more)

### Community 47 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 48 - "profile.ts"
Cohesion: 0.06
Nodes (53): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+45 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "income.ts"
Cohesion: 0.09
Nodes (68): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+60 more)

### Community 51 - "review.ts"
Cohesion: 0.43
Nodes (5): ALWAYS, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 52 - "batch/register.ts"
Cohesion: 0.13
Nodes (19): BATCH_COLUMNS, BATCH_KINDS, BatchCheck, BatchColumn, BatchContext, BatchRow, centavosOf(), checkRow() (+11 more)

### Community 53 - "ledger/data.ts"
Cohesion: 0.13
Nodes (25): Accounts(), AccountsPage(), GROUPS, dayBefore(), GET(), safe(), NewEntry(), NewEntryPage() (+17 more)

### Community 54 - "certificate.ts"
Cohesion: 0.11
Nodes (32): server-only, @supabase/supabase-js, AlphaCols, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+24 more)

### Community 55 - "portal/documents/page.tsx"
Cohesion: 0.16
Nodes (17): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+9 more)

### Community 56 - "Centavos"
Cohesion: 0.09
Nodes (40): GridRow, MonthGrid(), toInput(), AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualSummary() (+32 more)

### Community 57 - "supabaseServer"
Cohesion: 0.10
Nodes (41): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction() (+33 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (69): Alphalist, tinDashed(), BUSINESS_TAX_FORMS, agentLines(), agentProblems(), emptyResult(), PAYROLL_NOT_LOADED, form1601C (+61 more)

### Community 59 - "Notice"
Cohesion: 0.12
Nodes (42): BatchUpload(), AccountForm(), EntryForm(), ReleaseReportForm(), OpeningAssetForm(), EmployeeForm(), EmployeeUpload(), ItemForm() (+34 more)

### Community 60 - "addDays"
Cohesion: 0.20
Nodes (21): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, fiscalYearOf() (+13 more)

### Community 61 - "collections/page.tsx"
Cohesion: 0.16
Nodes (22): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+14 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (33): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+25 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "alphalist.ts"
Cohesion: 0.36
Nodes (11): alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate(), prevDat() (+3 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "ref_node_fs"
Cohesion: 0.13
Nodes (6): ctx, input, root, HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "clients/[id]/page.tsx"
Cohesion: 0.10
Nodes (38): ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage(), AssignForm() (+30 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/types.ts"
Cohesion: 0.12
Nodes (26): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, loadAssets(), Row, Asset, checkUpdate() (+18 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "safeguards-load.ts"
Cohesion: 0.11
Nodes (31): GET(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+23 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (25): PriceRow, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches() (+17 more)

### Community 80 - "showMonth"
Cohesion: 0.16
Nodes (22): PreviewTable(), advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking() (+14 more)

### Community 81 - "Button"
Cohesion: 0.16
Nodes (27): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+19 more)

### Community 82 - "requireStaff"
Cohesion: 0.10
Nodes (45): DashboardStats(), FilingListRow, FilingTable(), Event, eventText, Filing(), FilingPage(), paymentText (+37 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (31): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+23 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.14
Nodes (30): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+22 more)

### Community 87 - "safeguards.ts"
Cohesion: 0.17
Nodes (19): invoiceLabel(), missingRanges(), monthTimeline(), PLAIN, plainForm(), none, documentCutoff(), DONE_FROM_STATUS (+11 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+13 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "brand/forms.tsx"
Cohesion: 0.36
Nodes (7): FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm()

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "next"
Cohesion: 0.07
Nodes (42): nextConfig, next, ClientList(), ClientsPage(), BoardTable(), Deadlines(), DeadlinesPage(), one() (+34 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (40): exceljs, BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR (+32 more)

### Community 101 - "public.ts"
Cohesion: 0.12
Nodes (18): dateFmt, Supabase, acceptProposalAction(), AcceptState, SERVICES, StartState, QuerySource, FEE_ITEM_COLUMNS (+10 more)

### Community 102 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (40): monthlyTable(), monthlyWithholding(), BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS (+32 more)

### Community 103 - "books/reports/page.tsx"
Cohesion: 0.17
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 106 - "getIdentity"
Cohesion: 0.25
Nodes (15): ReplyForm(), send(), getIdentity(), shrinkImage(), closeRequestAction(), createRequestAction(), openTicketAction(), refresh() (+7 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+46 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.16
Nodes (17): generateFilingsNow(), GenerateState, addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState (+9 more)

### Community 110 - "fees/schedule.ts"
Cohesion: 0.15
Nodes (24): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+16 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 113 - "LinkButton"
Cohesion: 0.25
Nodes (14): Batch(), BatchPage(), one(), toCentavos(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+6 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "gap.ts"
Cohesion: 0.17
Nodes (17): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+9 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.39
Nodes (7): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList()

### Community 118 - "portal/page.tsx"
Cohesion: 0.14
Nodes (24): PortalClient, MonthComplete(), SentRow, TimelineRow, KINDS, manilaDay(), MonthCard(), PortalHome() (+16 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.12
Nodes (20): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+12 more)

### Community 120 - "batch/load.ts"
Cohesion: 0.33
Nodes (7): GET(), safe(), loadAccounts(), loadBatchContext(), monthsBetween(), BatchAccount, dupKey()

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (46): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+38 more)

### Community 122 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 123 - "formatAmount"
Cohesion: 0.26
Nodes (19): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+11 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions(), FilingState (+9 more)

### Community 126 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, ExceptionDecision, parseMonth() (+4 more)

### Community 127 - "documents/labels.ts"
Cohesion: 0.22
Nodes (13): DocumentUpload(), send(), upload(), Item, typeFromName(), finishUpload(), StartUpload, startUpload() (+5 more)

### Community 128 - "leads/[id]/page.tsx"
Cohesion: 0.13
Nodes (22): ConvertForm(), LostForm(), ProposalForm(), Lead(), LeadPage(), TYPE_LABEL, AcceptForm(), metadata (+14 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "clients/schema.ts"
Cohesion: 0.19
Nodes (8): assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema, base

### Community 131 - "proof-upload.tsx"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.21
Nodes (19): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction(), loadItems(), loadSchedules() (+11 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (23): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+15 more)

### Community 134 - "Skeleton"
Cohesion: 0.27
Nodes (16): Detail(), StatementPage(), portalContext(), Home(), Payroll(), PortalPayroll(), STATUS, when() (+8 more)

### Community 135 - "documents-card.tsx"
Cohesion: 0.45
Nodes (8): DocumentsCard(), when(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth(), CLIENT_DOC_TYPES

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (35): approveSelectedAction(), BOOKED, BulkState, key(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList() (+27 more)

### Community 137 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 138 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.07
Nodes (11): pg, vitest, root, root, root, root, root, root (+3 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 144 - "start/page.tsx"
Cohesion: 0.33
Nodes (8): requestQuoteAction(), php, StartForm(), metadata, Start(), StartPage(), funnelLive(), funnelOpen()

### Community 145 - "batch/forms.tsx"
Cohesion: 0.44
Nodes (7): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), BatchKind, checkBatch()

### Community 146 - "[employeeId]/page.tsx"
Cohesion: 0.36
Nodes (7): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), payAccountsOf(), EMPLOYEE_COLUMNS, displayName()

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "fields.ts"
Cohesion: 0.13
Nodes (22): approveDocumentAction(), streamOf(), checkFields(), Issue, num(), msgs(), ok, FieldKey (+14 more)

### Community 149 - "statement-view.tsx"
Cohesion: 0.20
Nodes (13): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+5 more)

### Community 150 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 151 - "fees/forms.tsx"
Cohesion: 0.33
Nodes (8): ActivateForm(), billingHint, DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm(), SettingsValues

### Community 152 - "xlsx.ts"
Cohesion: 0.39
Nodes (8): accountLabel(), buildBatchTemplate(), cellText(), MAX_ROWS, norm(), readBatch(), sheetName(), colLetter()

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "templatePayload"
Cohesion: 0.17
Nodes (8): templatePayload(), as(), client(), root, root, as(), books(), root

### Community 155 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 156 - "zod"
Cohesion: 0.29
Nodes (8): zod@^4.6.7, zod, clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 157 - "acting/run.ts"
Cohesion: 0.18
Nodes (13): digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail(), cycleMessage() (+5 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.12
Nodes (18): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+10 more)

### Community 160 - "parts.ts"
Cohesion: 0.09
Nodes (26): client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+18 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "payroll/data.ts"
Cohesion: 0.14
Nodes (33): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES (+25 more)

### Community 164 - "filters.tsx"
Cohesion: 0.39
Nodes (5): PeriodFilter(), PeriodKey, periodRange(), PERIODS, ym()

### Community 165 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1065 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `filings/run.ts`, `clients/schema.ts`, `arap.ts`, `package.json`, `gemini.ts`, `documents-card.tsx`, `app/documents/page.tsx`, `workpapers/load.ts`, `registrations/forms.tsx`, `ledger.test.ts`, `onboarding/page.tsx`, `social-button.tsx`, `statements.ts`, `fields.ts`, `names.ts`, `templatePayload`, `zod`, `acting/run.ts`, `index.ts`, `parts.ts`, `workpapers.test.ts`, `filters.tsx`, `ledger-documents.test.ts`, `fees.test.ts`, `portal/payroll/actions.ts`, `scores/page.tsx`, `month-complete.test.ts`, `tests/payroll.test.ts`, `@remixicon/react`, `settings/page.tsx`, `profile.ts`, `review.ts`, `batch/register.ts`, `certificate.ts`, `returns/types.ts`, `addDays`, `collections/page.tsx`, `fixed-assets.test.ts`, `testing.ts`, `ref_node_fs`, `clients/[id]/page.tsx`, `ledger/types.ts`, `safeguards-load.ts`, `quote.ts`, `showMonth`, `requireStaff`, `safeguards.ts`, `document-scanner.tsx`, `opening.ts`, `ledger-lock.test.ts`, `print/page.tsx`, `public.ts`, `payroll/payroll.test.ts`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `settings/actions.ts`, `fees/schedule.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `gap.ts`, `fees/types.ts`, `returns/load.ts`, `work/load.ts`, `sign-off.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.10252100840336134 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `react`, `filings/run.ts`, `leads/[id]/page.tsx`, `proof-upload.tsx`, `quote/page.tsx`, `package.json`, `Skeleton`, `app/documents/page.tsx`, `sidebar-toggle.tsx`, `breadcrumb.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `start/page.tsx`, `batch/forms.tsx`, `[employeeId]/page.tsx`, `proxy.ts`, `fields.ts`, `binder/page.tsx`, `payroll/data.ts`, `post-button.tsx`, `portal/payroll/actions.ts`, `scores/page.tsx`, `Card`, `@remixicon/react`, `settings/page.tsx`, `payroll/forms.tsx`, `payment-actions.ts`, `profile.ts`, `ledger/data.ts`, `portal/documents/page.tsx`, `supabaseServer`, `Notice`, `collections/page.tsx`, `workpapers/page.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `ledger/types.ts`, `safeguards-load.ts`, `theme-toggle.tsx`, `showMonth`, `Button`, `requireStaff`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `print/page.tsx`, `public.ts`, `books/reports/page.tsx`, `getIdentity`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fees/schedule.ts`, `fixed-assets/page.tsx`, `LinkButton`, `portal/page.tsx`, `batch/load.ts`, `returns/load.ts`, `formatAmount`, `cycle/page.tsx`, `documents/labels.ts`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11895161290322581 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `leads/[id]/page.tsx`, `checkbox.tsx`, `notification.tsx`, `quote/page.tsx`, `package.json`, `Skeleton`, `proof-upload.tsx`, `app/documents/page.tsx`, `sidebar-toggle.tsx`, `breadcrumb.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `start/page.tsx`, `batch/forms.tsx`, `[employeeId]/page.tsx`, `statements.ts`, `statement-view.tsx`, `fees/forms.tsx`, `binder/page.tsx`, `payroll/data.ts`, `filters.tsx`, `post-button.tsx`, `scores/page.tsx`, `Card`, `@remixicon/react`, `settings/page.tsx`, `payroll/forms.tsx`, `profile.ts`, `ledger/data.ts`, `portal/documents/page.tsx`, `Notice`, `collections/page.tsx`, `workpapers/page.tsx`, `cx`, `dropdown.tsx`, `file-upload.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `Button`, `requireStaff`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `brand/forms.tsx`, `next`, `print/page.tsx`, `books/reports/page.tsx`, `getIdentity`, `parties/[id]/page.tsx`, `fixed-assets/page.tsx`, `LinkButton`, `staff/page.tsx`, `portal/page.tsx`, `returns/load.ts`, `formatAmount`, `cycle/page.tsx`, `documents/labels.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._