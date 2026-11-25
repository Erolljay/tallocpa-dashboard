# Graph Report - agent-a4277e517455bb425  (2026-11-25)

## Corpus Check
- 605 files · ~476,462 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 3898 nodes · 13010 edges · 163 communities (144 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 117 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c758e858`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-in-form.tsx
- addDays
- migrate.yml
- notification.tsx
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- next
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
- Centavos
- scores/page.tsx
- income.ts
- payroll/types.ts
- PageHeader
- supabaseServer
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/page.tsx
- deadlines/page.tsx
- registrations/[id]/page.tsx
- payroll/data.ts
- getIdentity
- payroll/payroll.test.ts
- collections/page.tsx
- returns/types.ts
- Notice
- settings/page.tsx
- quote/page.tsx
- fixed-assets.test.ts
- Textarea
- tabs.tsx
- cx
- Apple Design
- alphalist.ts
- testing.ts
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- steps.test.ts
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- safeguards.ts
- theme-toggle.tsx
- quote.ts
- fees/schedule.ts
- ledger/data.ts
- Skeleton
- @remixicon/react
- Pro components
- cx.ts
- [clientId]/page.tsx
- books/reports/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- brand/forms.tsx
- toCentavos
- Recipes
- [id]/payroll/page.tsx
- BoardUI theming reference
- Pro templates
- auth.ts
- print/page.tsx
- public.ts
- formatAmount
- registrations/forms.tsx
- boardui
- rates.ts
- statement-view.tsx
- parties/[id]/page.tsx
- db.test.ts
- fees/types.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- react
- acting-approver.test.ts
- clients/page.tsx
- staff/page.tsx
- apply-migrations.sh
- cycle/page.tsx
- tax-codes.ts
- review/page.tsx
- returns/load.ts
- work/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- settings/actions.ts
- staff/actions.ts
- leads/[id]/page.tsx
- checkbox.tsx
- safeguards-load.ts
- documents/labels.ts
- gap/page.tsx
- steps.ts
- binder/page.tsx
- payment-actions.ts
- app/documents/page.tsx
- worksheet/page.tsx
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- IsoDate
- FormModule
- ledger-lock.test.ts
- post-button.tsx
- eslint.config.mjs
- fields.ts
- ref_node_fs
- package.json
- templatePayload
- requireOwner
- server-only
- BoardUI page patterns
- index.ts
- Card
- Rework: one flow from lead to year-end
- workpapers.test.ts
- status.ts
- ledger-documents.test.ts
- books-migration.test.ts
- tests/books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 262 edges
2. `cx` - 182 edges
3. `Notice()` - 178 edges
4. `react` - 168 edges
5. `Button()` - 162 edges
6. `Skeleton()` - 149 edges
7. `Card()` - 145 edges
8. `next` - 145 edges
9. `Badge()` - 138 edges
10. `PageHeader()` - 119 edges

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

## Communities (163 total, 19 thin omitted)

### Community 0 - "sign-in-form.tsx"
Cohesion: 0.15
Nodes (18): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), requestQuoteAction(), php (+10 more)

### Community 1 - "addDays"
Cohesion: 0.09
Nodes (43): PlannedObligation, addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule (+35 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

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

### Community 11 - "next"
Cohesion: 0.10
Nodes (25): nextConfig, next, GET(), OcrRate, Queue, QueueCell(), waited(), portalContext() (+17 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (51): incomeAttachments(), Periods, inputsFor(), buildSawt(), incomePayment(), sawtAttachments(), sawtCsv(), sawtDat() (+43 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "Centavos"
Cohesion: 0.11
Nodes (33): RegisterPreview, BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, PayrollItem (+25 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (27): ClientRow, order, PartCell(), ScoredClient, Scores(), ScoresPage(), Trend(), ClientMonth (+19 more)

### Community 42 - "income.ts"
Cohesion: 0.10
Nodes (57): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+49 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "PageHeader"
Cohesion: 0.24
Nodes (14): Requests(), RequestsPage(), Row, PortalRequests(), Requests(), Row, when(), PageHeader() (+6 more)

### Community 45 - "supabaseServer"
Cohesion: 0.09
Nodes (33): zod, EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), addChargeAction(), applyCreditAction(), date (+25 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (44): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+36 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (35): react-aria-components, DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button() (+27 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (60): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+52 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (54): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+46 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.06
Nodes (60): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+52 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 53 - "registrations/[id]/page.tsx"
Cohesion: 0.17
Nodes (28): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+20 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.14
Nodes (29): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction() (+21 more)

### Community 55 - "getIdentity"
Cohesion: 0.17
Nodes (23): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+15 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (51): GridRow, Certificates2316, form2316(), Form2316Employer, Form2316Line, Form2316Party, Form2316Signatory, mmdd() (+43 more)

### Community 57 - "collections/page.tsx"
Cohesion: 0.15
Nodes (23): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+15 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (56): Split, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+48 more)

### Community 59 - "Notice"
Cohesion: 0.13
Nodes (51): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+43 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.16
Nodes (24): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+16 more)

### Community 61 - "quote/page.tsx"
Cohesion: 0.14
Nodes (22): dateFmt, loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm() (+14 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "Textarea"
Cohesion: 0.19
Nodes (16): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+8 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "alphalist.ts"
Cohesion: 0.12
Nodes (30): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+22 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+28 more)

### Community 72 - "steps.test.ts"
Cohesion: 0.16
Nodes (18): fieldErrors(), openClientCaseAction(), openRegistrationAction(), updateStepAction(), Check(), ClientCaseForm(), birForm(), branchStepsFor() (+10 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.15
Nodes (18): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput, ChecklistItem (+10 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "safeguards.ts"
Cohesion: 0.21
Nodes (14): documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), RISK_LABELS, RISK_ORDER, RiskState, STEP_LABELS, StepKey (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.10
Nodes (35): EstimatedProfile, estimateProfile(), ExistingClient, has(), items, PRICES, schedule, settings (+27 more)

### Community 80 - "fees/schedule.ts"
Cohesion: 0.11
Nodes (18): conditionsSchema, num(), optionalAmount, range, ScheduleStatus, SettingsInput, settingsSchema, toFeeItem() (+10 more)

### Community 81 - "ledger/data.ts"
Cohesion: 0.08
Nodes (45): Accounts(), AccountsPage(), GROUPS, AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+37 more)

### Community 82 - "Skeleton"
Cohesion: 0.11
Nodes (37): ClientTab, ClientTabs(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+29 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.07
Nodes (31): @remixicon/react, ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+23 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.23
Nodes (19): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+11 more)

### Community 87 - "books/reports/page.tsx"
Cohesion: 0.14
Nodes (22): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+14 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (25): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (31): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+23 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 94 - "toCentavos"
Cohesion: 0.14
Nodes (20): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+12 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "[id]/payroll/page.tsx"
Cohesion: 0.26
Nodes (14): file(), GET(), safe(), Payroll(), PayrollPage(), GET(), employeesForMonth(), loadStored() (+6 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "auth.ts"
Cohesion: 0.14
Nodes (24): FilingTable(), OwnerSections(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+16 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+38 more)

### Community 101 - "public.ts"
Cohesion: 0.16
Nodes (13): acceptProposalAction(), AcceptState, SERVICES, StartState, QuerySource, Quote, brandSchedule(), contentHash() (+5 more)

### Community 102 - "formatAmount"
Cohesion: 0.15
Nodes (20): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+12 more)

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.12
Nodes (28): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), FormState, openYearRenewalsAction(), caseNote, caseTitle, ChecklistPreview() (+20 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "statement-view.tsx"
Cohesion: 0.10
Nodes (32): Detail(), StatementPage(), Detail(), PayNow(), METHODS, ProofUpload(), send(), proofBadge (+24 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (52): fieldErrors(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate(), PartyDetail() (+44 more)

### Community 108 - "db.test.ts"
Cohesion: 0.24
Nodes (3): buildSeedSql(), q(), root

### Community 109 - "fees/types.ts"
Cohesion: 0.21
Nodes (13): count(), first(), pick(), profileFromQuery(), items, BOOKKEEPING_LEVELS, BookkeepingLevel, COMPLEXITY_FLAGS (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.17
Nodes (27): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+19 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 113 - "react"
Cohesion: 0.13
Nodes (23): react, FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AddBranchForm() (+15 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "clients/page.tsx"
Cohesion: 0.21
Nodes (13): ClientList(), ClientsPage(), Row, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+5 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (40): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), PortalClient, MonthComplete(), SentRow (+32 more)

### Community 119 - "tax-codes.ts"
Cohesion: 0.18
Nodes (16): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+8 more)

### Community 120 - "review/page.tsx"
Cohesion: 0.12
Nodes (27): Queue(), ReviewPage(), Row, Section(), EndButton(), Acting(), ActingApproverPage(), Approval (+19 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (44): recomputeWorksheetAction(), WorksheetState, GET(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo (+36 more)

### Community 122 - "work/page.tsx"
Cohesion: 0.16
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 126 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 127 - "staff/actions.ts"
Cohesion: 0.26
Nodes (11): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), ensureLogin(), clientUserSchema, email, inviteStaffSchema (+3 more)

### Community 128 - "leads/[id]/page.tsx"
Cohesion: 0.15
Nodes (19): ConvertForm(), LostForm(), ProposalForm(), Lead(), LeadPage(), TYPE_LABEL, AcceptForm(), metadata (+11 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "safeguards-load.ts"
Cohesion: 0.12
Nodes (29): TAX_TYPES, CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+21 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.13
Nodes (26): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Item (+18 more)

### Community 132 - "gap/page.tsx"
Cohesion: 0.23
Nodes (14): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction(), loadTaxOnFee(), EngagementRow (+6 more)

### Community 133 - "steps.ts"
Cohesion: 0.16
Nodes (13): Agency, BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep, RegistrationOptions (+5 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 135 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (29): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+21 more)

### Community 137 - "worksheet/page.tsx"
Cohesion: 0.33
Nodes (8): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage()

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (12): pg, vitest, root, root, root, root, root, root (+4 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "IsoDate"
Cohesion: 0.21
Nodes (13): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+5 more)

### Community 144 - "FormModule"
Cohesion: 0.13
Nodes (13): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+5 more)

### Community 146 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "fields.ts"
Cohesion: 0.06
Nodes (50): approveSelectedAction(), BOOKED, BulkState, key(), approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS (+42 more)

### Community 150 - "ref_node_fs"
Cohesion: 0.10
Nodes (8): outDir, pkgDir, require, { version }, ctx, input, root, root

### Community 152 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 154 - "templatePayload"
Cohesion: 0.17
Nodes (8): templatePayload(), as(), client(), root, root, as(), books(), root

### Community 156 - "requireOwner"
Cohesion: 0.09
Nodes (38): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+30 more)

### Community 157 - "server-only"
Cohesion: 0.12
Nodes (24): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow (+16 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 160 - "Card"
Cohesion: 0.10
Nodes (42): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+34 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.15
Nodes (12): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+4 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 167 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 168 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1118 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `addDays`, `safeguards-load.ts`, `arap.ts`, `devDependencies`, `gemini.ts`, `app/documents/page.tsx`, `ledger.test.ts`, `onboarding/page.tsx`, `IsoDate`, `ledger-lock.test.ts`, `statements.ts`, `fields.ts`, `ref_node_fs`, `package.json`, `templatePayload`, `requireOwner`, `server-only`, `index.ts`, `Card`, `workpapers.test.ts`, `status.ts`, `ledger-documents.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `scores/page.tsx`, `PageHeader`, `supabaseServer`, `lib/books/actions.ts`, `profile.ts`, `workpapers/page.tsx`, `deadlines/page.tsx`, `payroll/payroll.test.ts`, `collections/page.tsx`, `returns/types.ts`, `settings/page.tsx`, `fixed-assets.test.ts`, `testing.ts`, `funnel.test.ts`, `steps.test.ts`, `opening-checklist.tsx`, `safeguards.ts`, `quote.ts`, `fees/schedule.ts`, `ledger/data.ts`, `document-scanner.tsx`, `toCentavos`, `print/page.tsx`, `public.ts`, `formatAmount`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fees/types.ts`, `fixed-assets/page.tsx`, `react`, `acting-approver.test.ts`, `cycle/page.tsx`, `tax-codes.ts`, `review/page.tsx`, `returns/load.ts`, `work/page.tsx`, `batch/register.ts`, `sign-off.ts`, `settings/actions.ts`, `staff/actions.ts`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addDays` be split into smaller, more focused modules?**
  _Cohesion score 0.09125188536953242 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `leads/[id]/page.tsx`, `sign-in-form.tsx`, `documents/labels.ts`, `gap/page.tsx`, `binder/page.tsx`, `payment-actions.ts`, `app/documents/page.tsx`, `worksheet/page.tsx`, `sign-off-actions.tsx`, `onboarding/page.tsx`, `proxy.ts`, `dependencies`, `post-button.tsx`, `fields.ts`, `package.json`, `requireOwner`, `server-only`, `Card`, `scores/page.tsx`, `PageHeader`, `supabaseServer`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `workpapers/page.tsx`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `payroll/data.ts`, `getIdentity`, `collections/page.tsx`, `settings/page.tsx`, `quote/page.tsx`, `Textarea`, `cx`, `books/forms.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `ledger/data.ts`, `Skeleton`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `[id]/payroll/page.tsx`, `auth.ts`, `print/page.tsx`, `public.ts`, `formatAmount`, `registrations/forms.tsx`, `statement-view.tsx`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `react`, `clients/page.tsx`, `cycle/page.tsx`, `review/page.tsx`, `returns/load.ts`, `work/page.tsx`, `batch/register.ts`, `settings/actions.ts`, `staff/actions.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `leads/[id]/page.tsx`, `sign-in-form.tsx`, `checkbox.tsx`, `documents/labels.ts`, `gap/page.tsx`, `notification.tsx`, `binder/page.tsx`, `app/documents/page.tsx`, `worksheet/page.tsx`, `sign-off-actions.tsx`, `next`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `post-button.tsx`, `statements.ts`, `fields.ts`, `package.json`, `requireOwner`, `server-only`, `Card`, `scores/page.tsx`, `PageHeader`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `profile.ts`, `workpapers/page.tsx`, `deadlines/page.tsx`, `registrations/[id]/page.tsx`, `payroll/data.ts`, `getIdentity`, `collections/page.tsx`, `Notice`, `settings/page.tsx`, `quote/page.tsx`, `Textarea`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `ledger/data.ts`, `Skeleton`, `@remixicon/react`, `cx.ts`, `[clientId]/page.tsx`, `books/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `[id]/payroll/page.tsx`, `auth.ts`, `print/page.tsx`, `formatAmount`, `registrations/forms.tsx`, `statement-view.tsx`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `clients/page.tsx`, `staff/page.tsx`, `cycle/page.tsx`, `review/page.tsx`, `work/page.tsx`, `batch/register.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._