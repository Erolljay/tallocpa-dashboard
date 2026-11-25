# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 480 files · ~377,836 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3246 nodes · 10561 edges · 141 communities (123 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `83f2a946`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- engine.ts
- migrate.yml
- app/documents/page.tsx
- toCentavos
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
- Centavos
- scripts
- manilaToday
- ledger/types.ts
- returns/types.ts
- safeguards.ts
- payroll/types.ts
- supabaseServer
- payroll/payroll.test.ts
- safeguards-load.ts
- qap.ts
- books/page.tsx
- quote/page.tsx
- register-xlsx.ts
- cycle/actions.ts
- Badge
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- Card
- fields.ts
- books/forms.tsx
- sign-in-form.tsx
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- requireStaff
- income.ts
- collections/forms.tsx
- acting-approver/page.tsx
- button.tsx
- Pro components
- notification.tsx
- file-upload.tsx
- morning.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- server-only
- social-button.tsx
- Recipes
- requireOwner
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- Textarea
- BoardUI page patterns
- profile.ts
- boardui
- rates.ts
- portal/documents/page.tsx
- parties/parties.test.ts
- brand/page.tsx
- settings/actions.ts
- filters.tsx
- pending-review.tsx
- documents/[id]/page.tsx
- form-1601eq.ts
- acting-approver.test.ts
- Skeleton
- returns/load.ts
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- worksheet/page.tsx
- react
- staff/actions.ts
- month.ts
- Staff and Owner UX review (Phase 1)
- sign-off-actions.tsx
- lookupAtc
- util.ts
- percentage.ts
- checkbox.tsx
- review-queue.ts
- checks.test.ts
- digest.ts
- names.ts
- proxy.ts
- SourceDocument
- ledger.test.ts
- src/app/layout.tsx
- copy-opencv.mjs
- FormModule
- ledger-closing.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 204 edges
2. `cx` - 147 edges
3. `Notice()` - 146 edges
4. `react` - 138 edges
5. `Button()` - 129 edges
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

## Communities (141 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (46): Rule, PlannedObligation, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup (+38 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.18
Nodes (17): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+9 more)

### Community 4 - "toCentavos"
Cohesion: 0.07
Nodes (47): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+39 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

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
Cohesion: 0.16
Nodes (20): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+12 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (55): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+47 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.16
Nodes (36): incomeAttachments(), buildSawt(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, branchCode() (+28 more)

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
Nodes (19): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton() (+11 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, ScoredClient (+24 more)

### Community 42 - "Notice"
Cohesion: 0.16
Nodes (33): ClientForm(), BookPicker(), EntryForm(), ReleaseReportForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable() (+25 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 44 - "certificate.ts"
Cohesion: 0.16
Nodes (25): Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+17 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.05
Nodes (14): pg, BOOK_LOCK_FORMS, ctx, input, root, root, root, root (+6 more)

### Community 46 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (29): saveMonthAction(), EmployeeDetail(), EmployeePage(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when() (+21 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (87): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+79 more)

### Community 48 - "Centavos"
Cohesion: 0.17
Nodes (20): GridRow, AlphaCols, AlphalistRow, Form2316Line, AnnualSummary, MonthLines, PriorAmounts, Suggestion (+12 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.20
Nodes (16): portalContext(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), Payroll(), PortalPayroll(), STATUS, when() (+8 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.08
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM, ASSETS, build() (+32 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.11
Nodes (32): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+24 more)

### Community 53 - "safeguards.ts"
Cohesion: 0.13
Nodes (22): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+14 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.06
Nodes (67): nextConfig, next, zod, removeAssignmentAction(), setClientStatusAction(), EditClient(), EditClientPage(), OwnerOnly() (+59 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (37): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+29 more)

### Community 57 - "safeguards-load.ts"
Cohesion: 0.20
Nodes (14): ClientValues, EngagementRow, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap, GapKind (+6 more)

### Community 58 - "qap.ts"
Cohesion: 0.12
Nodes (23): tinDashed(), tinDigits(), form0619E, form1601EQ, branchFromTin(), buildQapRows(), csvCell(), mmYYYY() (+15 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.15
Nodes (28): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), OpeningUpload() (+20 more)

### Community 60 - "quote/page.tsx"
Cohesion: 0.06
Nodes (60): COMPLEXITY_LABEL, Lines(), QuoteView(), TAXPAYER_LABEL, Total(), EstimatedProfile, estimateProfile(), ExistingClient (+52 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (27): check(), applyRegister(), previewOf(), RegisterPreview, totals(), CheckedRegister, checkRegister(), fmt() (+19 more)

### Community 62 - "cycle/actions.ts"
Cohesion: 0.39
Nodes (8): closeCycleAction(), confirmMonthAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh(), tellPreparer(), text()

### Community 63 - "Badge"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.17
Nodes (19): amount(), approvedFields(), buildPriorFigures(), DOC_TYPE_OF_KIND, DocumentRow, fromRegisterLine(), isApproved(), monthInPeriod() (+11 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "Card"
Cohesion: 0.11
Nodes (37): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), FilingListRow, Event (+29 more)

### Community 70 - "fields.ts"
Cohesion: 0.14
Nodes (20): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel, DocActionState, FieldKey, keys (+12 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.14
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction() (+34 more)

### Community 72 - "sign-in-form.tsx"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

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
Cohesion: 0.24
Nodes (21): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+13 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "requireStaff"
Cohesion: 0.21
Nodes (19): DashboardStats(), FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO (+11 more)

### Community 80 - "income.ts"
Cohesion: 0.12
Nodes (35): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), reconciliation(), BookIncome (+27 more)

### Community 81 - "collections/forms.tsx"
Cohesion: 0.12
Nodes (35): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+27 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.21
Nodes (19): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentRow() (+11 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.09
Nodes (26): Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize (+18 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "morning.ts"
Cohesion: 0.35
Nodes (9): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+1 more)

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
Nodes (20): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+12 more)

### Community 92 - "LinkButton"
Cohesion: 0.33
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+3 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (17): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, runActingDigest(), sendEmail(), cycleMessage() (+9 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "requireOwner"
Cohesion: 0.15
Nodes (19): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), obligationChanges(), obligationsForTaxTypes(), TAX_TYPES (+11 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (42): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+34 more)

### Community 101 - "Textarea"
Cohesion: 0.16
Nodes (22): file(), NewRequestForm(), ReplyForm(), TicketForm(), ReplyForm(), send(), METHODS, ProofUpload() (+14 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "profile.ts"
Cohesion: 0.14
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+11 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 106 - "portal/documents/page.tsx"
Cohesion: 0.16
Nodes (17): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+9 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.07
Nodes (58): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+50 more)

### Community 108 - "brand/page.tsx"
Cohesion: 0.16
Nodes (16): COLUMNS, EXPIRING, fmtMonth(), firmBlockLines(), formatTin(), TAX_ON_FEE, TaxOnFee, cents() (+8 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "filters.tsx"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 111 - "pending-review.tsx"
Cohesion: 0.20
Nodes (14): approveSelectedAction(), BOOKED, BulkState, key(), PendingRow, ACCOUNT_SOURCES, AccountSource, bulkReadiness() (+6 more)

### Community 112 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (43): DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, shift(), BOOKED_TYPES, DocumentReviewPage() (+35 more)

### Community 113 - "form-1601eq.ts"
Cohesion: 0.15
Nodes (21): incomePayment(), agentBackground(), agentErrors(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines() (+13 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Skeleton"
Cohesion: 0.10
Nodes (40): @remixicon/react, NewClientPage(), ClientList(), ClientsPage(), CyclePage(), DocumentsPage(), NewParty(), NewPartyPage() (+32 more)

### Community 116 - "returns/load.ts"
Cohesion: 0.18
Nodes (16): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, dayBefore(), FilingRow, loadLedger(), loadWorksheet() (+8 more)

### Community 118 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.08
Nodes (62): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+54 more)

### Community 120 - "worksheet/page.tsx"
Cohesion: 0.31
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 121 - "react"
Cohesion: 0.10
Nodes (26): react, DocReviewActions(), NewEmployee(), NewEmployeePage(), EmployeeForm(), AddBranchForm(), BranchRowForm(), Branches() (+18 more)

### Community 122 - "staff/actions.ts"
Cohesion: 0.32
Nodes (9): addClientUserAction(), fieldErrors(), inviteStaffAction(), ensureLogin(), clientUserSchema, email, inviteStaffSchema, name (+1 more)

### Community 123 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off-actions.tsx"
Cohesion: 0.19
Nodes (16): advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text(), AmendFilingForm(), checkTone (+8 more)

### Community 126 - "lookupAtc"
Cohesion: 0.29
Nodes (10): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+2 more)

### Community 127 - "util.ts"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 128 - "percentage.ts"
Cohesion: 0.38
Nodes (10): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), inputsFor(), amountInput() (+2 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 131 - "checks.test.ts"
Cohesion: 0.36
Nodes (6): checkFields(), Issue, num(), msgs(), ok, ocrOutputSchema

### Community 132 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 133 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 134 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 135 - "SourceDocument"
Cohesion: 0.33
Nodes (4): Split, EwtLine, ListedDocument, SourceDocument

### Community 136 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 139 - "FormModule"
Cohesion: 0.15
Nodes (10): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, LoadedWorksheet (+2 more)

### Community 140 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 957 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `app/documents/page.tsx`, `toCentavos`, `package.json`, `proxy.ts`, `src/app/layout.tsx`, `register/page.tsx`, `brand/forms.tsx`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `ledger/types.ts`, `books/page.tsx`, `quote/page.tsx`, `register-xlsx.ts`, `cycle/actions.ts`, `dropdown.tsx`, `Card`, `fields.ts`, `books/forms.tsx`, `sign-in-form.tsx`, `settings/page.tsx`, `theme-toggle.tsx`, `requireStaff`, `collections/forms.tsx`, `acting-approver/page.tsx`, `morning.ts`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `requireOwner`, `print/page.tsx`, `Textarea`, `portal/documents/page.tsx`, `parties/parties.test.ts`, `brand/page.tsx`, `settings/actions.ts`, `pending-review.tsx`, `documents/[id]/page.tsx`, `Skeleton`, `returns/load.ts`, `fees/[id]/page.tsx`, `worksheet/page.tsx`, `react`, `staff/actions.ts`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08311688311688312 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `checkbox.tsx`, `app/documents/page.tsx`, `package.json`, `register/page.tsx`, `brand/forms.tsx`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[month]/page.tsx`, `registrations/forms.tsx`, `manilaToday`, `supabaseServer`, `books/page.tsx`, `quote/page.tsx`, `Badge`, `tabs.tsx`, `dropdown.tsx`, `Card`, `fields.ts`, `books/forms.tsx`, `sign-in-form.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `requireStaff`, `collections/forms.tsx`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `LinkButton`, `social-button.tsx`, `requireOwner`, `print/page.tsx`, `Textarea`, `portal/documents/page.tsx`, `parties/parties.test.ts`, `brand/page.tsx`, `pending-review.tsx`, `documents/[id]/page.tsx`, `Skeleton`, `cx.ts`, `fees/[id]/page.tsx`, `worksheet/page.tsx`, `sign-off-actions.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/[id]/page.tsx`, `engine.ts`, `review-queue.ts`, `app/documents/page.tsx`, `digest.ts`, `package.json`, `toCentavos`, `checks.test.ts`, `gemini.ts`, `names.ts`, `SourceDocument`, `register/page.tsx`, `ledger-closing.test.ts`, `ledger.test.ts`, `statements.ts`, `scores/page.tsx`, `certificate.ts`, `ref_node_fs`, `registrations/forms.tsx`, `ledger/types.ts`, `safeguards.ts`, `payroll/payroll.test.ts`, `safeguards-load.ts`, `qap.ts`, `quote/page.tsx`, `source.ts`, `fields.ts`, `sign-in-form.tsx`, `settings/page.tsx`, `collections/forms.tsx`, `acting-approver/page.tsx`, `document-scanner.tsx`, `server-only`, `requireOwner`, `db.test.ts`, `print/page.tsx`, `rates.ts`, `parties/parties.test.ts`, `brand/page.tsx`, `settings/actions.ts`, `filters.tsx`, `pending-review.tsx`, `documents/[id]/page.tsx`, `form-1601eq.ts`, `acting-approver.test.ts`, `Skeleton`, `fees/[id]/page.tsx`, `react`, `staff/actions.ts`, `month.ts`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `toCentavos` be split into smaller, more focused modules?**
  _Cohesion score 0.07062146892655367 - nodes in this community are weakly interconnected._