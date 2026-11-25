# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 511 files · ~402,840 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3396 nodes · 11147 edges · 155 communities (134 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c9c77967`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- generate.ts
- migrate.yml
- FormModule
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
- clients/[id]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Skeleton
- ref_node_fs
- payroll/payroll.test.ts
- registrations/actions.ts
- notification.tsx
- scripts
- percentage.ts
- ledger/types.ts
- payroll/data.ts
- deadlines/page.tsx
- payroll/types.ts
- app/documents/page.tsx
- alphalist.ts
- clients/actions.ts
- returns/types.ts
- books/page.tsx
- rows.ts
- @remixicon/react
- fixed-assets.test.ts
- statement-view.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- Centavos
- vitest
- Badge
- staff/actions.ts
- books/forms.tsx
- react
- Rules
- Animation Performance
- fixed-assets/page.tsx
- stat-cards.tsx
- index.ts
- theme-toggle.tsx
- quote/page.tsx
- book-income.ts
- parties/parties.test.ts
- requireStaff
- button.tsx
- Pro components
- cx.ts
- file-upload.tsx
- workpapers/load.ts
- ref_node_fs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- server-only
- opening.ts
- Recipes
- supabaseServer
- BoardUI theming reference
- Pro templates
- collections/actions.ts
- print/page.tsx
- Textarea
- BoardUI page patterns
- profile.ts
- boardui
- rates.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- engine.ts
- settings/actions.ts
- quote/page.tsx
- registrations/forms.tsx
- source.ts
- payroll/payroll.test.ts
- acting-approver.test.ts
- pending-review.tsx
- parties/actions.ts
- apply-migrations.sh
- showMonth
- filings/actions.ts
- social-button.tsx
- breadcrumb.tsx
- templatePayload
- Badge
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- review-queue.ts
- staff/page.tsx
- @supabase/supabase-js
- checkbox.tsx
- db.test.ts
- seed.ts
- IsoDate
- portal/layout.tsx
- fixed-assets/forms.tsx
- document-upload.tsx
- documents/period.ts
- src/app/layout.tsx
- copy-opencv.mjs
- ledger.test.ts
- register-books.test.ts
- sign-in-form.tsx
- proxy.ts
- ledger-lock.test.ts
- register.test.ts
- eslint.config.mjs
- Card
- parts.ts
- fields.ts
- proof-upload.tsx
- skeleton.tsx
- names.ts
- registration.test.ts
- ledger-documents.test.ts
- table.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 220 edges
2. `cx` - 151 edges
3. `Notice()` - 148 edges
4. `react` - 145 edges
5. `Button()` - 143 edges
6. `Skeleton()` - 126 edges
7. `next` - 121 edges
8. `Card()` - 119 edges
9. `Badge()` - 119 edges
10. `PageHeader()` - 101 edges

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

## Communities (155 total, 21 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 1 - "generate.ts"
Cohesion: 0.15
Nodes (22): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+14 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "FormModule"
Cohesion: 0.11
Nodes (15): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, form1601C (+7 more)

### Community 4 - "arap.ts"
Cohesion: 0.14
Nodes (20): exceljs@4.4.0, exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

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
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "steps.ts"
Cohesion: 0.08
Nodes (61): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+53 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (52): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+44 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (44): atcKind(), normalizeAtc(), incomeAttachments(), Periods, periods(), buildSawt(), incomePayment(), sawtAttachments() (+36 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm() (+19 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.07
Nodes (55): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+47 more)

### Community 42 - "Notice"
Cohesion: 0.13
Nodes (42): AccountForm(), EntryForm(), ReleaseReportForm(), OpeningAssetForm(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm() (+34 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (45): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+37 more)

### Community 44 - "Skeleton"
Cohesion: 0.11
Nodes (39): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), Payroll() (+31 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (9): pg, vitest, root, root, root, root, root, root (+1 more)

### Community 46 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (29): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), RegisterPreview, totals(), PayrollItem (+21 more)

### Community 47 - "registrations/actions.ts"
Cohesion: 0.13
Nodes (22): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openRegistrationAction(), openYearRenewalsAction() (+14 more)

### Community 48 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.12
Nodes (54): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+46 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.11
Nodes (24): codes, PNL, COA_TEMPLATES, accountFromRow(), Amendment, AmendmentStatus, BooksClient, BooksMonth (+16 more)

### Community 52 - "payroll/data.ts"
Cohesion: 0.14
Nodes (28): saveMonthAction(), NewEmployee(), NewEmployeePage(), MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when() (+20 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.10
Nodes (32): CoverageClient, coverageGaps(), Gap, GapKind, board, MARCO, none, RHEA (+24 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.12
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, readEmployeeFile(), reasonChoices (+13 more)

### Community 55 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (43): Doc, DocumentsCard(), when(), ExceptionRow, ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking() (+35 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.17
Nodes (21): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), csvCell() (+13 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.11
Nodes (29): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+21 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.09
Nodes (42): VatData, INPUTS, MONTH, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule() (+34 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+21 more)

### Community 60 - "rows.ts"
Cohesion: 0.11
Nodes (34): AlphaCols, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+26 more)

### Community 61 - "@remixicon/react"
Cohesion: 0.42
Nodes (7): @remixicon/react, PortalRequest(), RequestDetail(), CloseRequestButton(), Thread(), ThreadMessage, when()

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "statement-view.tsx"
Cohesion: 0.12
Nodes (29): Detail(), StatementPage(), PortalClient, portalContext(), Payroll(), PortalPayroll(), STATUS, when() (+21 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (43): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+35 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "Centavos"
Cohesion: 0.13
Nodes (20): SawtResult, SawtRow, SlpRow, SlsRow, Split, AtcTotal, docLabel(), EwtLine (+12 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "Badge"
Cohesion: 0.14
Nodes (20): ClientList(), ClientsPage(), Row, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+12 more)

### Community 70 - "staff/actions.ts"
Cohesion: 0.18
Nodes (14): GET(), generateFilingsNow(), GenerateState, GenerateButton(), addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction() (+6 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+31 more)

### Community 72 - "react"
Cohesion: 0.10
Nodes (27): react, DocReviewActions(), ExplainState, ExplainForm(), RaiseNoteForm(), SignOffState, AmendFilingForm(), checkTone (+19 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (19): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), loadAssets(), Row (+11 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (24): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+16 more)

### Community 77 - "index.ts"
Cohesion: 0.12
Nodes (15): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+7 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.17
Nodes (17): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+9 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.06
Nodes (62): PriceRow, COMPLEXITY_LABEL, TAXPAYER_LABEL, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+54 more)

### Community 80 - "book-income.ts"
Cohesion: 0.31
Nodes (8): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, LedgerMovement

### Community 81 - "parties/parties.test.ts"
Cohesion: 0.17
Nodes (20): runOcr(), SKIP, displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), lookupParties() (+12 more)

### Community 82 - "requireStaff"
Cohesion: 0.13
Nodes (38): FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, ActingNotice() (+30 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (29): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+21 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 87 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (22): RegisterLine, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote, MonthActivity (+14 more)

### Community 88 - "ref_node_fs"
Cohesion: 0.12
Nodes (8): ctx, input, api, ctx, fn, rows, src, root

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.27
Nodes (11): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+3 more)

### Community 92 - "LinkButton"
Cohesion: 0.14
Nodes (22): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+14 more)

### Community 93 - "server-only"
Cohesion: 0.12
Nodes (24): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+16 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "supabaseServer"
Cohesion: 0.07
Nodes (46): nextConfig, next, EditClient(), EditClientPage(), postPayrollAction(), PostState, PostPayrollButton(), explainTieAction() (+38 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "collections/actions.ts"
Cohesion: 0.16
Nodes (24): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+16 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "Textarea"
Cohesion: 0.28
Nodes (14): ReplyForm(), send(), getIdentity(), closeRequestAction(), createRequestAction(), openTicketAction(), refresh(), replyRequest() (+6 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 106 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+12 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (21): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+13 more)

### Community 108 - "engine.ts"
Cohesion: 0.17
Nodes (25): shift(), addMonths(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), ymd() (+17 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.21
Nodes (14): zod, addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+6 more)

### Community 110 - "quote/page.tsx"
Cohesion: 0.08
Nodes (52): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+44 more)

### Community 111 - "registrations/forms.tsx"
Cohesion: 0.23
Nodes (16): openClientCaseAction(), CancelForm(), caseNote, caseTitle, Check(), ChecklistPreview(), ClientCaseForm(), NewRegistrationForm() (+8 more)

### Community 112 - "source.ts"
Cohesion: 0.15
Nodes (23): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, BUSINESS_TAX_ATCS (+15 more)

### Community 113 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (41): GridRow, entry(), P(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+33 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "pending-review.tsx"
Cohesion: 0.21
Nodes (12): approveSelectedAction(), BOOKED, BulkState, key(), PendingReview(), PendingRow, ACCOUNT_SOURCES, AccountSource (+4 more)

### Community 116 - "parties/actions.ts"
Cohesion: 0.23
Nodes (13): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), blank(), optionalText() (+5 more)

### Community 118 - "showMonth"
Cohesion: 0.11
Nodes (36): Cycle(), CyclePage(), CycleWithClient, DocRow, MonthComplete(), SentRow, TimelineRow, Home() (+28 more)

### Community 119 - "filings/actions.ts"
Cohesion: 0.24
Nodes (13): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), ALWAYS (+5 more)

### Community 120 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 121 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 122 - "templatePayload"
Cohesion: 0.22
Nodes (5): templatePayload(), as(), books(), root, root

### Community 123 - "Badge"
Cohesion: 0.26
Nodes (13): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+5 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (22): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), FilingListRow, Event (+14 more)

### Community 126 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 127 - "staff/page.tsx"
Cohesion: 0.39
Nodes (7): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList()

### Community 128 - "@supabase/supabase-js"
Cohesion: 0.19
Nodes (19): @supabase/supabase-js, file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+11 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 132 - "IsoDate"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 133 - "portal/layout.tsx"
Cohesion: 0.19
Nodes (12): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+4 more)

### Community 134 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 135 - "document-upload.tsx"
Cohesion: 0.44
Nodes (7): DocumentUpload(), send(), upload(), Item, finishUpload(), startUpload(), shrinkImage()

### Community 136 - "documents/period.ts"
Cohesion: 0.39
Nodes (5): PeriodFilter(), PeriodKey, periodRange(), PERIODS, ym()

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 144 - "register.test.ts"
Cohesion: 0.40
Nodes (4): RegisterSourceRow, approved(), as(), root

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "Card"
Cohesion: 0.14
Nodes (32): fmtDate(), lastMonth(), Reports(), ReportsPage(), amt(), CertificatesTable(), Href, LineParts() (+24 more)

### Community 147 - "parts.ts"
Cohesion: 0.09
Nodes (24): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+16 more)

### Community 148 - "fields.ts"
Cohesion: 0.10
Nodes (31): Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, Readiness, checkFields(), Issue (+23 more)

### Community 149 - "proof-upload.tsx"
Cohesion: 0.39
Nodes (7): Detail(), PayNow(), METHODS, ProofUpload(), send(), startProofUpload(), PayAccount

### Community 150 - "skeleton.tsx"
Cohesion: 0.33
Nodes (6): Skeleton(), SkeletonProps, SkeletonShape, SkeletonText(), SkeletonTextProps, styles

### Community 151 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "table.tsx"
Cohesion: 0.50
Nodes (3): Table(), TableProps, TableSize

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 986 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `@supabase/supabase-js`, `checkbox.tsx`, `devDependencies`, `fixed-assets/forms.tsx`, `portal/layout.tsx`, `documents/period.ts`, `document-upload.tsx`, `settings/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `Card`, `statements.ts`, `fields.ts`, `proof-upload.tsx`, `skeleton.tsx`, `table.tsx`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `registrations/actions.ts`, `notification.tsx`, `payroll/data.ts`, `app/documents/page.tsx`, `books/page.tsx`, `@remixicon/react`, `statement-view.tsx`, `tabs.tsx`, `dropdown.tsx`, `Badge`, `staff/actions.ts`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `supabaseServer`, `print/page.tsx`, `Textarea`, `profile.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `quote/page.tsx`, `registrations/forms.tsx`, `pending-review.tsx`, `showMonth`, `social-button.tsx`, `breadcrumb.tsx`, `Badge`, `filings/[id]/page.tsx`, `staff/page.tsx`?**
  _High betweenness centrality (0.176) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1455026455026455 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `@supabase/supabase-js`, `devDependencies`, `fixed-assets/forms.tsx`, `portal/layout.tsx`, `document-upload.tsx`, `src/app/layout.tsx`, `settings/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `proxy.ts`, `Card`, `fields.ts`, `proof-upload.tsx`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Skeleton`, `payroll/payroll.test.ts`, `registrations/actions.ts`, `ledger/types.ts`, `payroll/data.ts`, `app/documents/page.tsx`, `clients/actions.ts`, `books/page.tsx`, `@remixicon/react`, `statement-view.tsx`, `Badge`, `staff/actions.ts`, `books/forms.tsx`, `react`, `fixed-assets/page.tsx`, `quote/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `collections/actions.ts`, `print/page.tsx`, `Textarea`, `profile.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `settings/actions.ts`, `quote/page.tsx`, `pending-review.tsx`, `parties/actions.ts`, `showMonth`, `filings/actions.ts`, `breadcrumb.tsx`, `Badge`, `filings/[id]/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `sign-off.ts`, `generate.ts`, `db.test.ts`, `IsoDate`, `devDependencies`, `arap.ts`, `gemini.ts`, `documents/period.ts`, `settings/page.tsx`, `ledger.test.ts`, `steps.ts`, `sign-in-form.tsx`, `ledger-lock.test.ts`, `register-books.test.ts`, `register.test.ts`, `statements.ts`, `parts.ts`, `fields.ts`, `names.ts`, `registration.test.ts`, `ledger-documents.test.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `ledger/types.ts`, `deadlines/page.tsx`, `app/documents/page.tsx`, `clients/actions.ts`, `returns/types.ts`, `rows.ts`, `fixed-assets.test.ts`, `Centavos`, `vitest`, `fixed-assets/page.tsx`, `index.ts`, `quote/page.tsx`, `parties/parties.test.ts`, `requireStaff`, `ref_node_fs`, `document-scanner.tsx`, `server-only`, `opening.ts`, `print/page.tsx`, `profile.ts`, `rates.ts`, `engine.ts`, `settings/actions.ts`, `quote/page.tsx`, `source.ts`, `payroll/payroll.test.ts`, `acting-approver.test.ts`, `pending-review.tsx`, `showMonth`, `filings/actions.ts`, `templatePayload`, `review-queue.ts`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Should `FormModule` be split into smaller, more focused modules?**
  _Cohesion score 0.11428571428571428 - nodes in this community are weakly interconnected._