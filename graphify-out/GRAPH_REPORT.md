# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 483 files · ~382,046 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3255 nodes · 10607 edges · 135 communities (117 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 109 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bfd92dcf`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- migrate.yml
- documents/[id]/page.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- register/page.tsx
- Sign-in & Setup Docs
- brand/forms.tsx
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
- certificate.ts
- ref_node_fs
- [month]/page.tsx
- registrations/forms.tsx
- engine.ts
- scripts
- manilaToday
- ledger/data.ts
- form-1604c.ts
- deadlines/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- client-form.tsx
- returns/types.ts
- books/page.tsx
- fees/types.ts
- register-xlsx.ts
- index.ts
- statement-view.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- worksheet/page.tsx
- fields.ts
- books/forms.tsx
- sign-in-form.tsx
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- quote.ts
- income.ts
- collections/forms.tsx
- requireStaff
- button.tsx
- Pro components
- notification.tsx
- file-upload.tsx
- registrations/[id]/page.tsx
- generate-qap-fixture.mjs
- input.tsx
- portal/documents/page.tsx
- app/app/layout.tsx
- Skeleton
- server-only
- opening.ts
- Recipes
- clients/schema.ts
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- Textarea
- BoardUI page patterns
- profile.ts
- boardui
- rates.ts
- parties/actions.ts
- parties/parties.test.ts
- react
- settings/actions.ts
- fees/actions.ts
- app/documents/page.tsx
- cycle/page.tsx
- money.ts
- acting-approver.test.ts
- Skeleton
- next
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- fees/data.ts
- staff/page.tsx
- quote/page.tsx
- showMonth
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- lookupAtc
- template.ts
- zod
- checkbox.tsx
- seed.ts
- employees/new/page.tsx
- ledger.test.ts
- src/app/layout.tsx
- copy-opencv.mjs

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 205 edges
2. `cx` - 147 edges
3. `Notice()` - 146 edges
4. `react` - 139 edges
5. `Button()` - 131 edges
6. `Skeleton()` - 122 edges
7. `next` - 115 edges
8. `Card()` - 113 edges
9. `Badge()` - 111 edges
10. `PageHeader()` - 97 edges

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

## Communities (135 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions(), FilingState (+9 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.13
Nodes (24): Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance (+16 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "documents/[id]/page.tsx"
Cohesion: 0.31
Nodes (7): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LockFiling, lockingFiling()

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.11
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

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

### Community 11 - "register/page.tsx"
Cohesion: 0.07
Nodes (60): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amt() (+52 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "brand/forms.tsx"
Cohesion: 0.36
Nodes (7): FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm()

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
Cohesion: 0.07
Nodes (50): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when() (+42 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (42): Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, addMonths() (+34 more)

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
Cohesion: 0.18
Nodes (20): DocumentsCard(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel, Row (+12 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.07
Nodes (53): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+45 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (40): AccountForm(), EntryForm(), ReleaseReportForm(), AssignForm(), ClientUserForm(), EngagementForm(), StatusButton(), EmployeeUpload() (+32 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 44 - "certificate.ts"
Cohesion: 0.14
Nodes (31): @supabase/supabase-js, Certificates2316, certificatesFromRaw(), form2316(), Form2316Data, Form2316Line, Form2316Signatory, mmdd() (+23 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.06
Nodes (18): pg, vitest, templatePayload(), BOOK_LOCK_FORMS, ctx, input, root, root (+10 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.14
Nodes (32): saveMonthAction(), EmployeeDetail(), EmployeePage(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage() (+24 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (69): StaffOptions(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+61 more)

### Community 48 - "engine.ts"
Cohesion: 0.17
Nodes (26): shift(), addDays(), addMonths(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso() (+18 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.13
Nodes (26): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), Detail(), StatementPage() (+18 more)

### Community 51 - "ledger/data.ts"
Cohesion: 0.09
Nodes (34): Accounts(), AccountsPage(), GROUPS, CASH_FLOW_CLASSES, CashFlowClass, accountFromRow(), Amendment, AmendmentStatus (+26 more)

### Community 52 - "form-1604c.ts"
Cohesion: 0.15
Nodes (19): Alphalist, tinDashed(), one(), differsFromSuggestion(), enteredNet(), buildYear(), agentLines(), agentProblems() (+11 more)

### Community 53 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (47): GET(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO, Gap (+39 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.11
Nodes (44): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction() (+36 more)

### Community 56 - "Centavos"
Cohesion: 0.08
Nodes (56): GridRow, AlphaCols, alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+48 more)

### Community 57 - "client-form.tsx"
Cohesion: 0.12
Nodes (25): FormState, ClientForm(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), NewClientPage() (+17 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (52): BUSINESS_TAX_FORMS, Split, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+44 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.17
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+18 more)

### Community 60 - "fees/types.ts"
Cohesion: 0.12
Nodes (26): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, GapRow, has(), items (+18 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (27): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), sortItems(), CheckedRegister, checkRegister(), fmt() (+19 more)

### Community 62 - "index.ts"
Cohesion: 0.09
Nodes (23): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+15 more)

### Community 63 - "statement-view.tsx"
Cohesion: 0.10
Nodes (30): Detail(), PayNow(), ProofReview(), METHODS, ProofUpload(), send(), proofBadge, proofMethod (+22 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (51): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+43 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.13
Nodes (25): recomputeWorksheetAction(), WorksheetState, LOCKED_STATUSES, loadWorksheet(), amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND (+17 more)

### Community 68 - "vitest"
Cohesion: 0.17
Nodes (19): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+11 more)

### Community 69 - "worksheet/page.tsx"
Cohesion: 0.16
Nodes (17): FilingListRow, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+9 more)

### Community 70 - "fields.ts"
Cohesion: 0.10
Nodes (26): approveDocumentAction(), checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+18 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+28 more)

### Community 72 - "sign-in-form.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "compute1702RT"
Cohesion: 0.18
Nodes (30): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+22 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.14
Nodes (22): buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches(), pesos() (+14 more)

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (38): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+30 more)

### Community 81 - "collections/forms.tsx"
Cohesion: 0.21
Nodes (20): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+12 more)

### Community 82 - "requireStaff"
Cohesion: 0.13
Nodes (35): DashboardStats(), FilingTable(), Event, eventText, Filing(), FilingPage(), paymentText, when() (+27 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "registrations/[id]/page.tsx"
Cohesion: 0.24
Nodes (20): StepBadge(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell(), RegistrationList(), RegistrationsPage() (+12 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.15
Nodes (6): api, ctx, fn, rows, src, root

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (26): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+18 more)

### Community 90 - "portal/documents/page.tsx"
Cohesion: 0.07
Nodes (49): Doc, when(), ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS (+41 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.13
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "Skeleton"
Cohesion: 0.17
Nodes (25): NewEntry(), NewEntryPage(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), ClientList(), ClientsPage() (+17 more)

### Community 93 - "server-only"
Cohesion: 0.13
Nodes (21): server-only, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow, longDay() (+13 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "clients/schema.ts"
Cohesion: 0.14
Nodes (14): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema, assignmentSchema, clientFields (+6 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (49): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+41 more)

### Community 101 - "Textarea"
Cohesion: 0.18
Nodes (19): NewRequestForm(), ScheduleSettingsForm(), ReplyForm(), TicketForm(), ReplyForm(), send(), Textarea(), shrinkImage() (+11 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "profile.ts"
Cohesion: 0.07
Nodes (41): BrandSettingsState, SAVED, BRAND_FILES, BrandFileKind, birSchema, blank(), BRANCH_CODE, contactSchema (+33 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "parties/actions.ts"
Cohesion: 0.20
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), normalizeTin(), lookupParties(), blank() (+9 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.10
Nodes (36): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+28 more)

### Community 108 - "react"
Cohesion: 0.20
Nodes (13): react, DocReviewActions(), BookingFields(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, ReviewForm(), typeLabel (+5 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/actions.ts"
Cohesion: 0.24
Nodes (14): activateAction(), createFromTemplateAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+6 more)

### Community 111 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (34): approveSelectedAction(), BOOKED, BulkState, key(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList() (+26 more)

### Community 112 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth() (+4 more)

### Community 113 - "money.ts"
Cohesion: 0.39
Nodes (6): applyRate(), basisPoints(), formatPeso(), grossUp(), grouped, sum()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Skeleton"
Cohesion: 0.18
Nodes (20): @remixicon/react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail() (+12 more)

### Community 116 - "next"
Cohesion: 0.17
Nodes (8): nextConfig, next, GET(), Branches(), BranchesPage(), Identity, IdentityRow, StaffRole

### Community 118 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (25): deleteDraftAction(), loadSchedule(), loadSchedules(), longDate(), nextEffectiveDate(), statusLabel, statusTone, ActivateForm() (+17 more)

### Community 120 - "fees/data.ts"
Cohesion: 0.17
Nodes (14): dateFmt, Supabase, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num(), optionalAmount (+6 more)

### Community 121 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 122 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadItems(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuoteView() (+6 more)

### Community 123 - "showMonth"
Cohesion: 0.13
Nodes (31): PortalClient, MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard() (+23 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.18
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text(), AmendFilingForm(), checkTone (+9 more)

### Community 126 - "lookupAtc"
Cohesion: 0.23
Nodes (13): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+5 more)

### Community 127 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 128 - "zod"
Cohesion: 0.26
Nodes (12): zod@^4.6.7, zod, accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+4 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 131 - "employees/new/page.tsx"
Cohesion: 0.83
Nodes (3): NewEmployee(), NewEmployeePage(), EmployeeForm()

### Community 136 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 957 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `checkbox.tsx`, `employees/new/page.tsx`, `documents/[id]/page.tsx`, `package.json`, `register/page.tsx`, `brand/forms.tsx`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/data.ts`, `deadlines/page.tsx`, `client-form.tsx`, `books/page.tsx`, `statement-view.tsx`, `tabs.tsx`, `dropdown.tsx`, `worksheet/page.tsx`, `books/forms.tsx`, `sign-in-form.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `collections/forms.tsx`, `requireStaff`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `registrations/[id]/page.tsx`, `input.tsx`, `portal/documents/page.tsx`, `app/app/layout.tsx`, `Skeleton`, `server-only`, `print/page.tsx`, `Textarea`, `parties/parties.test.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `Skeleton`, `next`, `cx.ts`, `fees/[id]/page.tsx`, `staff/page.tsx`, `quote/page.tsx`, `showMonth`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10869565217391304 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `filings/[id]/page.tsx`, `filings/run.ts`, `documents/[id]/page.tsx`, `arap.ts`, `package.json`, `gemini.ts`, `ledger.test.ts`, `register/page.tsx`, `statements.ts`, `scores/page.tsx`, `registrations/forms.tsx`, `engine.ts`, `deadlines/page.tsx`, `Centavos`, `client-form.tsx`, `returns/types.ts`, `fees/types.ts`, `index.ts`, `source.ts`, `vitest`, `fields.ts`, `sign-in-form.tsx`, `settings/page.tsx`, `quote.ts`, `requireStaff`, `generate-qap-fixture.mjs`, `portal/documents/page.tsx`, `server-only`, `opening.ts`, `clients/schema.ts`, `db.test.ts`, `print/page.tsx`, `profile.ts`, `rates.ts`, `parties/parties.test.ts`, `settings/actions.ts`, `fees/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `money.ts`, `acting-approver.test.ts`, `Skeleton`, `showMonth`, `template.ts`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1310344827586207 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `zod`, `documents/[id]/page.tsx`, `package.json`, `src/app/layout.tsx`, `register/page.tsx`, `brand/forms.tsx`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `certificate.ts`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/data.ts`, `deadlines/page.tsx`, `supabaseServer`, `client-form.tsx`, `books/page.tsx`, `register-xlsx.ts`, `statement-view.tsx`, `dropdown.tsx`, `source.ts`, `worksheet/page.tsx`, `fields.ts`, `books/forms.tsx`, `sign-in-form.tsx`, `settings/page.tsx`, `theme-toggle.tsx`, `collections/forms.tsx`, `requireStaff`, `registrations/[id]/page.tsx`, `portal/documents/page.tsx`, `app/app/layout.tsx`, `Skeleton`, `server-only`, `clients/schema.ts`, `print/page.tsx`, `Textarea`, `profile.ts`, `parties/actions.ts`, `parties/parties.test.ts`, `react`, `settings/actions.ts`, `fees/actions.ts`, `app/documents/page.tsx`, `cycle/page.tsx`, `Skeleton`, `fees/[id]/page.tsx`, `quote/page.tsx`, `showMonth`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.116) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._