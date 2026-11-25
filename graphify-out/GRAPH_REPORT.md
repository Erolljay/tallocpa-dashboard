# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 573 files · ~441,768 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3693 nodes · 12372 edges · 170 communities (148 shown, 22 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 114 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `12779e83`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- react
- settings/page.tsx
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- steps.ts
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
- percentage.ts
- payroll/types.ts
- @remixicon/react
- parties/forms.tsx
- payroll/forms.tsx
- requireOwner
- profile.ts
- scripts
- income.ts
- memo.ts
- batch/register.ts
- ledger/data.ts
- payroll/data.ts
- documents/labels.ts
- Centavos
- clients/actions.ts
- money.ts
- Notice
- year/[year]/page.tsx
- Skeleton
- fixed-assets.test.ts
- review-forms.tsx
- tabs.tsx
- cx
- Apple Design
- returns/types.ts
- testing.ts
- file-upload.tsx
- funnel.test.ts
- books/forms.tsx
- clients/[id]/page.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- safeguards-load.ts
- theme-toggle.tsx
- quote.ts
- filings/actions.ts
- books/page.tsx
- app/app/page.tsx
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- month.ts
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
- supabaseServer
- print/page.tsx
- public.ts
- payroll/payroll.test.ts
- registrations/forms.tsx
- boardui
- rates.ts
- Textarea
- parties/[id]/page.tsx
- db.test.ts
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- branches.ts
- acting-approver.test.ts
- pending-review.tsx
- Card
- apply-migrations.sh
- showMonth
- fees/types.ts
- batch/actions.ts
- source.ts
- work/load.ts
- formatAmount
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- supabaseAdmin
- receipts.ts
- leads/[id]/page.tsx
- checkbox.tsx
- resolve.ts
- proof-upload.tsx
- quote/page.tsx
- workpapers/load.ts
- manilaToday
- fixed-assets/forms.tsx
- app/documents/page.tsx
- src/app/layout.tsx
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- proposal-view.tsx
- returns/load.ts
- approval-memo.tsx
- periods
- eslint.config.mjs
- fields.ts
- statement-view.tsx
- ref_node_fs
- fees/forms.tsx
- review-queue.ts
- names.ts
- any-cutoff.test.ts
- ledger-closing.test.ts
- [id]/forms.tsx
- server-only
- BoardUI page patterns
- index.ts
- parts.ts
- Rework: one pipeline from lead to year-end
- workpapers.test.ts
- onboarding/forms.tsx
- filters.tsx
- tieouts.test.ts
- ocr/run.ts
- fees.test.ts
- tests/payroll.test.ts
- adjustments.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 252 edges
2. `Notice()` - 176 edges
3. `cx` - 163 edges
4. `Button()` - 162 edges
5. `react` - 161 edges
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

## Communities (170 total, 22 thin omitted)

### Community 0 - "react"
Cohesion: 0.09
Nodes (27): react, DocReviewActions(), postPayrollAction(), PostState, PostPayrollButton(), ReplyForm(), YearSelect(), AcceptForm() (+19 more)

### Community 1 - "settings/page.tsx"
Cohesion: 0.06
Nodes (69): shift(), RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote (+61 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "package.json"
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

### Community 11 - "steps.ts"
Cohesion: 0.10
Nodes (41): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+33 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (26): ClientTab, ClientTabs(), StatusButton(), KINDS, OnboardingState, refresh(), removeClientFileAction(), tickOnboardingAction() (+18 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (49): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+41 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (45): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+37 more)

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
Cohesion: 0.35
Nodes (8): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), lastDay(), PAY_PERIODS, PayPeriod, periodEnd()

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (31): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+23 more)

### Community 42 - "percentage.ts"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "@remixicon/react"
Cohesion: 0.16
Nodes (22): @remixicon/react, RequestDetail(), RequestPage(), Row, PortalClient, portalContext(), PortalRequest(), RequestDetail() (+14 more)

### Community 45 - "parties/forms.tsx"
Cohesion: 0.18
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), PARTY_KINDS (+9 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (66): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+58 more)

### Community 47 - "requireOwner"
Cohesion: 0.14
Nodes (28): zod@^4.6.7, zod, addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso (+20 more)

### Community 48 - "profile.ts"
Cohesion: 0.14
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "income.ts"
Cohesion: 0.09
Nodes (45): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+37 more)

### Community 51 - "memo.ts"
Cohesion: 0.17
Nodes (12): ReviewNote, Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps() (+4 more)

### Community 52 - "batch/register.ts"
Cohesion: 0.10
Nodes (31): exceljs, Batch(), BatchPage(), one(), toCentavos(), accountLabel(), BATCH_COLUMNS, BATCH_KINDS (+23 more)

### Community 53 - "ledger/data.ts"
Cohesion: 0.08
Nodes (37): Accounts(), AccountsPage(), GROUPS, CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL (+29 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.08
Nodes (51): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316() (+43 more)

### Community 55 - "documents/labels.ts"
Cohesion: 0.09
Nodes (37): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+29 more)

### Community 56 - "Centavos"
Cohesion: 0.11
Nodes (32): GridRow, AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear() (+24 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.13
Nodes (22): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setupMissingChartsAction(), updateClientAction(), ActingState, appointActingAction() (+14 more)

### Community 58 - "money.ts"
Cohesion: 0.08
Nodes (46): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine, ewtLines() (+38 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (64): BatchUpload(), PreviewTable(), AccountForm(), ArapUpload(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm() (+56 more)

### Community 60 - "year/[year]/page.tsx"
Cohesion: 0.39
Nodes (8): release2316Action(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 61 - "Skeleton"
Cohesion: 0.09
Nodes (36): ClientPage(), Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), FilingListRow (+28 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "review-forms.tsx"
Cohesion: 0.20
Nodes (15): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+7 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (51): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+43 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.09
Nodes (38): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+30 more)

### Community 68 - "testing.ts"
Cohesion: 0.17
Nodes (19): year, BUSINESS_TAX_FORMS, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage() (+20 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (16): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Cutoff, cutoffOf(), ChecklistInput, ChecklistItem (+8 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "safeguards-load.ts"
Cohesion: 0.11
Nodes (30): Gap, Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+22 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.10
Nodes (35): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), has(), lastWholeMonths(), items, PRICES (+27 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.38
Nodes (10): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+2 more)

### Community 81 - "books/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm() (+17 more)

### Community 82 - "app/app/page.tsx"
Cohesion: 0.11
Nodes (40): DashboardStats(), FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO (+32 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+26 more)

### Community 87 - "month.ts"
Cohesion: 0.20
Nodes (15): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+7 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (26): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+18 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+13 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "brand/forms.tsx"
Cohesion: 0.14
Nodes (22): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+14 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.09
Nodes (47): nextConfig, next, NewEntry(), NewEntryPage(), ClientDetail(), ClientList(), ClientsPage(), recomputeWorksheetAction() (+39 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (45): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+37 more)

### Community 101 - "public.ts"
Cohesion: 0.09
Nodes (27): dateFmt, Supabase, acceptProposalAction(), AcceptState, SERVICES, StartState, QuerySource, conditionsSchema (+19 more)

### Community 102 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (29): GET(), safe(), GET(), monthlyTable(), monthlyWithholding(), employeesForMonth(), buildEmployeeTemplate(), employee() (+21 more)

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.08
Nodes (45): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+37 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "Textarea"
Cohesion: 0.27
Nodes (15): NewRequestForm(), TicketForm(), ReplyForm(), send(), Textarea(), getIdentity(), closeRequestAction(), createRequestAction() (+7 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (21): fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), listNameCols(), Names, Party (+13 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.17
Nodes (24): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+16 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.20
Nodes (19): SetupAssetForm(), amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row (+11 more)

### Community 113 - "branches.ts"
Cohesion: 0.22
Nodes (11): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Branch, branchSchema, branchUpdateSchema (+3 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "pending-review.tsx"
Cohesion: 0.19
Nodes (15): approveSelectedAction(), BOOKED, BulkState, key(), PendingReview(), PendingRow, ACCOUNT_SOURCES, AccountSource (+7 more)

### Community 116 - "Card"
Cohesion: 0.15
Nodes (24): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+16 more)

### Community 118 - "showMonth"
Cohesion: 0.10
Nodes (36): Cycle(), CyclePage(), CycleWithClient, DocRow, MonthComplete(), SentRow, TimelineRow, Home() (+28 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.14
Nodes (18): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+10 more)

### Community 120 - "batch/actions.ts"
Cohesion: 0.18
Nodes (14): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+6 more)

### Community 121 - "source.ts"
Cohesion: 0.14
Nodes (24): ATC_MASTER, AtcInfo, normalizeAtc(), loadWorksheet(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND (+16 more)

### Community 122 - "work/load.ts"
Cohesion: 0.19
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 123 - "formatAmount"
Cohesion: 0.29
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 126 - "supabaseAdmin"
Cohesion: 0.29
Nodes (8): GET(), generateFilingsNow(), GenerateState, GenerateButton(), runMorningEmail(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 127 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 128 - "leads/[id]/page.tsx"
Cohesion: 0.33
Nodes (7): Lead(), LeadPage(), TYPE_LABEL, LEAD_STATUS, LeadStatus, defaultTerms(), SERVICE_LABELS

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "resolve.ts"
Cohesion: 0.32
Nodes (11): displayName(), fullAddress(), partyTinLabel(), ABBREVIATIONS, nameTokens(), PartyFields, resolveParty(), sameAddress() (+3 more)

### Community 131 - "proof-upload.tsx"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.17
Nodes (20): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setLeadStatusAction(), loadSchedules(), loadTaxOnFee(), longDate() (+12 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.19
Nodes (18): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+10 more)

### Community 134 - "manilaToday"
Cohesion: 0.19
Nodes (17): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, Detail() (+9 more)

### Community 135 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton()

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (26): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+18 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

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

### Community 143 - "proposal-view.tsx"
Cohesion: 0.23
Nodes (11): PriceRow, Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote (+3 more)

### Community 144 - "returns/load.ts"
Cohesion: 0.24
Nodes (9): dayBefore(), FilingRow, ListedDocument, loadLedger(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase, moduleForForm() (+1 more)

### Community 145 - "approval-memo.tsx"
Cohesion: 0.31
Nodes (7): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, grossSales(), approvalMemo()

### Community 146 - "periods"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "fields.ts"
Cohesion: 0.11
Nodes (27): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, BatchRow, checkFields() (+19 more)

### Community 149 - "statement-view.tsx"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 150 - "ref_node_fs"
Cohesion: 0.12
Nodes (7): outDir, pkgDir, require, { version }, ctx, input, root

### Community 151 - "fees/forms.tsx"
Cohesion: 0.29
Nodes (10): ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm() (+2 more)

### Community 152 - "review-queue.ts"
Cohesion: 0.32
Nodes (4): Row, QueueFiling, QueueViewer, ReviewQueue

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 155 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 156 - "[id]/forms.tsx"
Cohesion: 0.17
Nodes (16): removeAssignmentAction(), setClientStatusAction(), RemoveAssignmentButton(), RemoveClientUserButton(), addClientUserAction(), fieldErrors(), FormState, inviteStaffAction() (+8 more)

### Community 157 - "server-only"
Cohesion: 0.16
Nodes (17): server-only, @supabase/supabase-js, GET(), digestMessage(), DigestRow, longDay(), peso, time() (+9 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 159 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 160 - "parts.ts"
Cohesion: 0.12
Nodes (23): client(), ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine (+15 more)

### Community 161 - "Rework: one pipeline from lead to year-end"
Cohesion: 0.29
Nodes (6): Build plan, Decisions (Owner, 25 November 2026), Navigation, Rework: one pipeline from lead to year-end, The pipeline, Why

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 163 - "onboarding/forms.tsx"
Cohesion: 0.48
Nodes (6): addClientFile(), startClientFileUpload(), ClientFileForm(), send(), TickForm(), file()

### Community 164 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 165 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 166 - "ocr/run.ts"
Cohesion: 0.53
Nodes (5): runOcr(), SKIP, lookupParties(), fillFromDirectory(), partyKey()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1060 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **22 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `settings/page.tsx`, `arap.ts`, `package.json`, `gemini.ts`, `app/documents/page.tsx`, `steps.ts`, `ledger.test.ts`, `onboarding/page.tsx`, `social-button.tsx`, `approval-memo.tsx`, `statements.ts`, `fields.ts`, `ref_node_fs`, `review-queue.ts`, `names.ts`, `any-cutoff.test.ts`, `ledger-closing.test.ts`, `[id]/forms.tsx`, `server-only`, `index.ts`, `parts.ts`, `workpapers.test.ts`, `filters.tsx`, `tieouts.test.ts`, `fees.test.ts`, `portal/payroll/actions.ts`, `scores/page.tsx`, `adjustments.test.ts`, `tests/payroll.test.ts`, `@remixicon/react`, `memo.ts`, `batch/register.ts`, `ledger/data.ts`, `payroll/data.ts`, `clients/actions.ts`, `money.ts`, `fixed-assets.test.ts`, `testing.ts`, `funnel.test.ts`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `safeguards-load.ts`, `quote.ts`, `app/app/page.tsx`, `[clientId]/page.tsx`, `month.ts`, `document-scanner.tsx`, `opening.ts`, `ledger-lock.test.ts`, `print/page.tsx`, `public.ts`, `payroll/payroll.test.ts`, `registrations/forms.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `settings/actions.ts`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `branches.ts`, `acting-approver.test.ts`, `pending-review.tsx`, `showMonth`, `fees/types.ts`, `source.ts`, `work/load.ts`, `sign-off.ts`, `receipts.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.09103840682788052 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `react`, `leads/[id]/page.tsx`, `settings/page.tsx`, `proof-upload.tsx`, `quote/page.tsx`, `package.json`, `manilaToday`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `src/app/layout.tsx`, `sign-off-actions.tsx`, `steps.ts`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `proxy.ts`, `approval-memo.tsx`, `statements.ts`, `fields.ts`, `[id]/forms.tsx`, `server-only`, `onboarding/forms.tsx`, `portal/payroll/actions.ts`, `scores/page.tsx`, `@remixicon/react`, `parties/forms.tsx`, `payroll/forms.tsx`, `requireOwner`, `batch/register.ts`, `ledger/data.ts`, `payroll/data.ts`, `documents/labels.ts`, `clients/actions.ts`, `year/[year]/page.tsx`, `Skeleton`, `review-forms.tsx`, `cx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `filings/actions.ts`, `books/page.tsx`, `app/app/page.tsx`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `print/page.tsx`, `public.ts`, `payroll/payroll.test.ts`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `branches.ts`, `pending-review.tsx`, `Card`, `showMonth`, `batch/actions.ts`, `formatAmount`, `supabaseAdmin`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `settings/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05742296918767507 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `leads/[id]/page.tsx`, `settings/page.tsx`, `checkbox.tsx`, `notification.tsx`, `quote/page.tsx`, `package.json`, `manilaToday`, `fixed-assets/forms.tsx`, `app/documents/page.tsx`, `proof-upload.tsx`, `sign-off-actions.tsx`, `steps.ts`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `statements.ts`, `fields.ts`, `statement-view.tsx`, `fees/forms.tsx`, `[id]/forms.tsx`, `onboarding/forms.tsx`, `filters.tsx`, `portal/payroll/actions.ts`, `scores/page.tsx`, `@remixicon/react`, `parties/forms.tsx`, `payroll/forms.tsx`, `batch/register.ts`, `ledger/data.ts`, `payroll/data.ts`, `documents/labels.ts`, `Notice`, `year/[year]/page.tsx`, `Skeleton`, `review-forms.tsx`, `tabs.tsx`, `cx`, `file-upload.tsx`, `books/forms.tsx`, `clients/[id]/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `books/page.tsx`, `app/app/page.tsx`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `brand/forms.tsx`, `supabaseServer`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `parties/[id]/page.tsx`, `fees/[id]/page.tsx`, `fixed-assets/page.tsx`, `pending-review.tsx`, `Card`, `showMonth`, `formatAmount`, `supabaseAdmin`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._