# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 550 files · ~430,223 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3590 nodes · 11898 edges · 147 communities (130 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 113 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `aa6284c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off-actions.tsx
- engine.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- settings/page.tsx
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
- Notice
- payroll/forms.tsx
- registrations/forms.tsx
- batch/register.ts
- [month]/page.tsx
- requireOwner
- profile.ts
- scripts
- percentage.ts
- pending-review.tsx
- batch/register.ts
- ledger/data.ts
- Centavos
- server.ts
- payroll/payroll.test.ts
- clients/actions.ts
- form-1601eq.ts
- Input
- payroll/data.ts
- Badge
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- file-upload.tsx
- percentage.ts
- books/forms.tsx
- obligations.ts
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- deadlines/page.tsx
- theme-toggle.tsx
- quote.ts
- safeguards-load.ts
- payment-forms.tsx
- requireStaff
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- month.ts
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
- source.ts
- seed.ts
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- buildSawt
- [employeeId]/page.tsx
- acting-approver.test.ts
- react
- brand/page.tsx
- apply-migrations.sh
- showMonth
- fees/types.ts
- deadlines/actions.ts
- assets/schedule.ts
- work/load.ts
- Card
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- messages.ts
- ComponentLetter
- dates.ts
- checkbox.tsx
- proof-upload.tsx
- quote/page.tsx
- parts.ts
- app/documents/page.tsx
- src/app/layout.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- books/reports/page.tsx
- fields.ts
- manilaToday
- Skeleton
- names.ts
- staff/actions.ts
- server-only
- register-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 235 edges
2. `Notice()` - 159 edges
3. `cx` - 159 edges
4. `Button()` - 151 edges
5. `react` - 151 edges
6. `Skeleton()` - 135 edges
7. `next` - 133 edges
8. `Card()` - 132 edges
9. `Badge()` - 129 edges
10. `PageHeader()` - 108 edges

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

## Communities (147 total, 17 thin omitted)

### Community 0 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 1 - "engine.ts"
Cohesion: 0.12
Nodes (34): compareIso(), IsoDate, lastDayOfMonth(), EfpsGroup, FilingChannel, FilingInstance, fiscalYearOf(), followsCalendarYear() (+26 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 4 - "arap.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

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
Cohesion: 0.20
Nodes (15): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, Rule, SettingsPage() (+7 more)

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
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (42): CASH_FLOW_CLASSES, defaultCashFlow(), codes, PNL, COA_TEMPLATES, loadStatements(), FS_LINES, FsLine (+34 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (42): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow (+34 more)

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
Nodes (41): previewRegisterAction(), saveMonthAction(), Payroll(), PayrollPage(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction() (+33 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Notice"
Cohesion: 0.13
Nodes (51): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm() (+43 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (62): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+54 more)

### Community 44 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (37): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton() (+29 more)

### Community 45 - "batch/register.ts"
Cohesion: 0.15
Nodes (17): accountLabel(), BatchCheck, BatchColumn, BatchContext, centavosOf(), checkBatch(), checkRow(), findAccount() (+9 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (15): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+7 more)

### Community 47 - "requireOwner"
Cohesion: 0.23
Nodes (18): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+10 more)

### Community 48 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.09
Nodes (45): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+37 more)

### Community 51 - "pending-review.tsx"
Cohesion: 0.17
Nodes (16): approveSelectedAction(), BOOKED, BulkState, key(), PendingRow, BatchRow, ACCOUNT_SOURCES, AccountSource (+8 more)

### Community 52 - "batch/register.ts"
Cohesion: 0.14
Nodes (22): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+14 more)

### Community 53 - "ledger/data.ts"
Cohesion: 0.16
Nodes (17): CashFlowClass, accountFromRow(), Amendment, AmendmentStatus, BooksClient, BooksMonth, ClientBooks, EntryLineOut (+9 more)

### Community 54 - "Centavos"
Cohesion: 0.10
Nodes (37): AlphaCols, AlphalistRow, Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line, Form2316Signatory (+29 more)

### Community 55 - "server.ts"
Cohesion: 0.09
Nodes (37): DocReviewActions(), Doc, DocumentsCard(), when(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review() (+29 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (26): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+18 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.13
Nodes (23): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), addBranchAction() (+15 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.07
Nodes (52): Split, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+44 more)

### Community 59 - "Input"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+13 more)

### Community 60 - "payroll/data.ts"
Cohesion: 0.13
Nodes (34): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+26 more)

### Community 61 - "Badge"
Cohesion: 0.14
Nodes (25): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+17 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+6 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.11
Nodes (35): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+27 more)

### Community 68 - "vitest"
Cohesion: 0.14
Nodes (22): year, BUSINESS_TAX_FORMS, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+14 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "percentage.ts"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "obligations.ts"
Cohesion: 0.21
Nodes (14): ClientValues, EngagementRow, obligationsForTaxTypes(), PlannedObligation, TAX_TYPES, TaxpayerType, TaxType, TaxTypeError (+6 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.10
Nodes (30): Access, OpeningChecklist(), STATUS, loadAssets(), Row, Asset, Cutoff, cutoffOf() (+22 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (37): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board (+29 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.10
Nodes (36): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), lastWholeMonths(), items (+28 more)

### Community 80 - "safeguards-load.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 81 - "payment-forms.tsx"
Cohesion: 0.25
Nodes (16): PaymentSettings(), accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+8 more)

### Community 82 - "requireStaff"
Cohesion: 0.11
Nodes (42): FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, Event (+34 more)

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
Cohesion: 0.12
Nodes (35): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+27 more)

### Community 87 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (9): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+1 more)

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.13
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "LinkButton"
Cohesion: 0.12
Nodes (27): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+19 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.28
Nodes (9): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), runDocumentCycles() (+1 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (20): exceljs, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+12 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "index.ts"
Cohesion: 0.07
Nodes (27): setupMissingChartsAction(), acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY (+19 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.08
Nodes (39): nextConfig, next, EditClient(), EditClientPage(), approveDocumentAction(), recomputeWorksheetAction(), GET(), Lines() (+31 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (48): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+40 more)

### Community 101 - "fees/data.ts"
Cohesion: 0.13
Nodes (19): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+11 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (81): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction() (+73 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "Textarea"
Cohesion: 0.22
Nodes (17): NewRequestForm(), ReplyForm(), TicketForm(), ReplyForm(), send(), Textarea(), getIdentity(), shrinkImage() (+9 more)

### Community 107 - "source.ts"
Cohesion: 0.06
Nodes (69): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), runOcr(), SKIP, datAddress() (+61 more)

### Community 108 - "seed.ts"
Cohesion: 0.25
Nodes (8): DeadlineRule, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.17
Nodes (28): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+20 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "buildSawt"
Cohesion: 0.25
Nodes (12): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+4 more)

### Community 113 - "[employeeId]/page.tsx"
Cohesion: 0.44
Nodes (7): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), loadPriorEmployers(), payAccountsOf()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "react"
Cohesion: 0.10
Nodes (24): react, postPayrollAction(), PostState, PostPayrollButton(), PeriodKey, periodRange(), PERIODS, ym() (+16 more)

### Community 116 - "brand/page.tsx"
Cohesion: 0.43
Nodes (6): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard()

### Community 118 - "showMonth"
Cohesion: 0.10
Nodes (38): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, PortalClient, MonthComplete(), SentRow (+30 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.12
Nodes (19): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+11 more)

### Community 120 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 121 - "assets/schedule.ts"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 122 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 123 - "Card"
Cohesion: 0.16
Nodes (31): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+23 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 126 - "messages.ts"
Cohesion: 0.60
Nodes (3): cycleMessage(), dayFmt, showDay()

### Community 127 - "ComponentLetter"
Cohesion: 0.50
Nodes (4): PriceRow, QuoteLine, Billing, ComponentLetter

### Community 128 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "proof-upload.tsx"
Cohesion: 0.17
Nodes (18): Detail(), PayNow(), METHODS, ProofUpload(), send(), amount, date, ProofState (+10 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.29
Nodes (10): loadTaxOnFee(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+2 more)

### Community 133 - "parts.ts"
Cohesion: 0.05
Nodes (64): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+56 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.17
Nodes (18): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+10 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.04
Nodes (19): pg, vitest, ctx, input, root, root, root, root (+11 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 146 - "books/reports/page.tsx"
Cohesion: 0.17
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 148 - "fields.ts"
Cohesion: 0.10
Nodes (26): Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, runOcrAction(), checkFields(), Issue (+18 more)

### Community 149 - "manilaToday"
Cohesion: 0.13
Nodes (26): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), Detail() (+18 more)

### Community 151 - "Skeleton"
Cohesion: 0.09
Nodes (48): @remixicon/react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+40 more)

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 156 - "staff/actions.ts"
Cohesion: 0.21
Nodes (13): zod@^4.6.7, zod, addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin() (+5 more)

### Community 157 - "server-only"
Cohesion: 0.28
Nodes (9): server-only, @supabase/supabase-js, GET(), sendEmail(), NoticeKind, Due, runMorningEmail(), supabaseEnv() (+1 more)

### Community 160 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1035 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `dates.ts`, `engine.ts`, `arap.ts`, `package.json`, `gemini.ts`, `parts.ts`, `app/documents/page.tsx`, `settings/page.tsx`, `ledger.test.ts`, `onboarding/page.tsx`, `social-button.tsx`, `statements.ts`, `fields.ts`, `names.ts`, `staff/actions.ts`, `register-books.test.ts`, `scores/page.tsx`, `registrations/forms.tsx`, `batch/register.ts`, `[month]/page.tsx`, `profile.ts`, `pending-review.tsx`, `Centavos`, `payroll/payroll.test.ts`, `clients/actions.ts`, `form-1601eq.ts`, `fixed-assets.test.ts`, `vitest`, `obligations.ts`, `opening-checklist.tsx`, `deadlines/page.tsx`, `quote.ts`, `safeguards-load.ts`, `requireStaff`, `[clientId]/page.tsx`, `month.ts`, `document-scanner.tsx`, `generate-filings/route.ts`, `opening.ts`, `index.ts`, `print/page.tsx`, `fees/data.ts`, `registrations/forms.tsx`, `rates.ts`, `source.ts`, `settings/actions.ts`, `acting-approver.test.ts`, `react`, `showMonth`, `fees/types.ts`, `assets/schedule.ts`, `work/load.ts`, `sign-off.ts`, `messages.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11585365853658537 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `sign-off-actions.tsx`, `proof-upload.tsx`, `quote/page.tsx`, `package.json`, `parts.ts`, `app/documents/page.tsx`, `src/app/layout.tsx`, `settings/page.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `proxy.ts`, `books/reports/page.tsx`, `fields.ts`, `manilaToday`, `Skeleton`, `staff/actions.ts`, `server-only`, `Centavos`, `scores/page.tsx`, `payroll/forms.tsx`, `registrations/forms.tsx`, `[month]/page.tsx`, `requireOwner`, `profile.ts`, `pending-review.tsx`, `batch/register.ts`, `ledger/data.ts`, `server.ts`, `clients/actions.ts`, `Input`, `payroll/data.ts`, `Badge`, `workpapers/page.tsx`, `dropdown.tsx`, `books/forms.tsx`, `opening-checklist.tsx`, `theme-toggle.tsx`, `payment-forms.tsx`, `requireStaff`, `[clientId]/page.tsx`, `app/app/layout.tsx`, `LinkButton`, `generate-filings/route.ts`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `source.ts`, `settings/actions.ts`, `fees/[id]/page.tsx`, `[employeeId]/page.tsx`, `react`, `brand/page.tsx`, `showMonth`, `deadlines/actions.ts`, `assets/schedule.ts`, `Card`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `sign-off-actions.tsx`, `checkbox.tsx`, `notification.tsx`, `quote/page.tsx`, `package.json`, `proof-upload.tsx`, `app/documents/page.tsx`, `settings/page.tsx`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `books/reports/page.tsx`, `statements.ts`, `fields.ts`, `manilaToday`, `Skeleton`, `Centavos`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `registrations/forms.tsx`, `[month]/page.tsx`, `profile.ts`, `pending-review.tsx`, `server.ts`, `Input`, `payroll/data.ts`, `Badge`, `workpapers/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `file-upload.tsx`, `books/forms.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `payment-forms.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `supabaseServer`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `source.ts`, `fees/[id]/page.tsx`, `[employeeId]/page.tsx`, `brand/page.tsx`, `showMonth`, `deadlines/actions.ts`, `assets/schedule.ts`, `Card`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._