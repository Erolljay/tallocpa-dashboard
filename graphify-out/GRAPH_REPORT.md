# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 423 files · ~306,957 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2909 nodes · 9247 edges · 123 communities (105 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 91 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `2769119c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/actions.ts
- cycle/page.tsx
- worksheet/page.tsx
- app/documents/page.tsx
- auth.ts
- package.json
- documents/[id]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ledger/types.ts
- Sign-in & Setup Docs
- profile.ts
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
- register-xlsx.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- quote/page.tsx
- scripts
- next
- breadcrumb.tsx
- react
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- alphalist.ts
- src/app/layout.tsx
- returns/types.ts
- ledger/data.ts
- opening.ts
- payroll/payroll.test.ts
- year.ts
- sign-off-actions.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- qap.ts
- vitest
- server.ts
- gemini.ts
- books/forms.tsx
- registrations/actions.ts
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- parties/actions.ts
- theme-toggle.tsx
- arap.ts
- income.ts
- form-2316.tsx
- filings/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- collections/page.tsx
- generate-qap-fixture.mjs
- cx
- document-scanner.tsx
- app/app/layout.tsx
- Skeleton
- generate-filings/route.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- boardui/SKILL.md
- Pro templates
- db.test.ts
- print/page.tsx
- documents/actions.ts
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- parties/parties.test.ts
- items.ts
- quote.ts
- Centavos
- proof-actions.ts
- clients/[id]/page.tsx
- portal/documents/page.tsx
- @remixicon/react
- acting-approver.test.ts
- clients/actions.ts
- ledger.test.ts
- document-upload.tsx
- checkbox.tsx
- copy-opencv.mjs
- brand/forms.tsx
- BoardUI theming reference
- documents/period.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 181 edges
2. `Notice()` - 132 edges
3. `cx` - 127 edges
4. `react` - 126 edges
5. `Button()` - 113 edges
6. `Skeleton()` - 109 edges
7. `next` - 102 edges
8. `Card()` - 96 edges
9. `requireOwner()` - 94 edges
10. `Badge()` - 91 edges

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

## Communities (123 total, 18 thin omitted)

### Community 0 - "filings/actions.ts"
Cohesion: 0.43
Nodes (6): advanceFilingAction(), amount, SignOffState, stepData(), text(), SignOffAction

### Community 1 - "cycle/page.tsx"
Cohesion: 0.05
Nodes (72): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), CloseCycleButton(), DecideExceptionForm() (+64 more)

### Community 2 - "worksheet/page.tsx"
Cohesion: 0.18
Nodes (19): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+11 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.19
Nodes (16): ClientSelect(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one() (+8 more)

### Community 4 - "auth.ts"
Cohesion: 0.10
Nodes (40): CompleteButton(), StepBadge(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+32 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): approveDocumentAction(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel (+19 more)

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

### Community 11 - "ledger/types.ts"
Cohesion: 0.08
Nodes (30): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.07
Nodes (41): BrandSettingsState, SAVED, BRAND_FILES, BrandFileKind, birSchema, blank(), BRANCH_CODE, contactSchema (+33 more)

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
Nodes (53): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+45 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.19
Nodes (31): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, branchCode(), crlf(), csv(), csvCell() (+23 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (37): file(), GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET() (+29 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.13
Nodes (27): ClientRow, order, PartCell(), ScoredClient, Scores(), Trend(), ClientMonth, complianceScore() (+19 more)

### Community 42 - "Notice"
Cohesion: 0.13
Nodes (52): AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), EntryForm(), OpeningUpload(), PermitForm(), ReleaseReportForm() (+44 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (45): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+37 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.14
Nodes (28): server-only, @supabase/supabase-js, EmployeeDetail(), EmployeePage(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage() (+20 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.06
Nodes (11): pg@^8.23.1, pg, ctx, input, root, root, root, root (+3 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (35): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+27 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.14
Nodes (28): recomputeWorksheetAction(), WorksheetState, dayBefore(), FilingRow, loadLedger(), loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet (+20 more)

### Community 48 - "quote/page.tsx"
Cohesion: 0.08
Nodes (55): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+47 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "next"
Cohesion: 0.10
Nodes (39): nextConfig, next, DocumentsCard(), Payroll(), PayrollPage(), Detail(), StatementPage(), Review() (+31 more)

### Community 51 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronDownSmall(), ChevronRightSmall(), IconProps

### Community 52 - "react"
Cohesion: 0.11
Nodes (29): react, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage() (+21 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.17
Nodes (18): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_KINDS (+10 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.12
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, readEmployeeFile(), reasonChoices (+13 more)

### Community 55 - "supabaseServer"
Cohesion: 0.10
Nodes (46): OwnerOnly(), addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction() (+38 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.14
Nodes (28): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+20 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.08
Nodes (36): BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, VatData, form1601C, INPUTS (+28 more)

### Community 59 - "ledger/data.ts"
Cohesion: 0.11
Nodes (36): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+28 more)

### Community 60 - "opening.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 61 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (28): GridRow, MonthGrid(), toInput(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+20 more)

### Community 62 - "year.ts"
Cohesion: 0.14
Nodes (27): certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw, period2316() (+19 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.22
Nodes (12): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+4 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (36): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "qap.ts"
Cohesion: 0.12
Nodes (29): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+21 more)

### Community 68 - "vitest"
Cohesion: 0.19
Nodes (18): vitest, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "server.ts"
Cohesion: 0.17
Nodes (21): DashboardStats(), FilingListRow, FilingTable(), Deadlines(), GET(), OcrRate, OwnerSections(), Queue (+13 more)

### Community 70 - "gemini.ts"
Cohesion: 0.12
Nodes (20): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+12 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (35): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction(), FormState (+27 more)

### Community 72 - "registrations/actions.ts"
Cohesion: 0.13
Nodes (17): zod, cancelRegistrationAction(), completeRegistrationAction(), fieldErrors(), FormState, openRegistrationAction(), updateStepAction(), TAXPAYER_TYPES (+9 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.15
Nodes (25): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+17 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (23): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+15 more)

### Community 77 - "parties/actions.ts"
Cohesion: 0.18
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), normalizeTin(), PARTY_COLUMNS (+9 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (32): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), reportsTab, applyTheme() (+24 more)

### Community 79 - "arap.ts"
Cohesion: 0.16
Nodes (18): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+10 more)

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (46): linesWithMovement(), BOOK_FIGURES, COMPARISON_COLUMNS, comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt() (+38 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): Event, eventText, Filing(), FilingPage(), paymentText, when(), Queue(), ReviewPage() (+35 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.09
Nodes (26): Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize (+18 more)

### Community 86 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 87 - "collections/page.tsx"
Cohesion: 0.18
Nodes (15): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), SignOffActions(), PortalReturns() (+7 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "cx"
Cohesion: 0.09
Nodes (36): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+28 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "Skeleton"
Cohesion: 0.12
Nodes (32): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), NewEmployee(), NewEmployeePage(), Certificates() (+24 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.17
Nodes (15): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+7 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.09
Nodes (39): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+31 more)

### Community 101 - "documents/actions.ts"
Cohesion: 0.11
Nodes (23): generateFilingsNow(), GenerateState, GenerateButton(), addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow (+15 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+11 more)

### Community 106 - "parties/parties.test.ts"
Cohesion: 0.23
Nodes (15): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, fillFromDirectory() (+7 more)

### Community 107 - "items.ts"
Cohesion: 0.20
Nodes (13): PayrollSetupPage(), Setup(), BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+5 more)

### Community 108 - "quote.ts"
Cohesion: 0.06
Nodes (62): PriceRow, EngagementRow, Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+54 more)

### Community 109 - "Centavos"
Cohesion: 0.10
Nodes (22): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, bookIncome(), INCOME_GROUPS (+14 more)

### Community 110 - "proof-actions.ts"
Cohesion: 0.21
Nodes (13): send(), amount, date, ProofState, refresh(), rejectProofAction(), StartProof, startProofUpload() (+5 more)

### Community 111 - "clients/[id]/page.tsx"
Cohesion: 0.27
Nodes (13): FormState, AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+5 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.15
Nodes (21): Doc, when(), Row, Doc, Documents(), FolderKey, FOLDERS, Item (+13 more)

### Community 113 - "@remixicon/react"
Cohesion: 0.20
Nodes (12): @remixicon/react, Detail(), PayNow(), METHODS, FirmBlock, PayAccount, PaymentProof, ProofMethod (+4 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "clients/actions.ts"
Cohesion: 0.12
Nodes (26): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), addBranchAction() (+18 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 117 - "document-upload.tsx"
Cohesion: 0.44
Nodes (7): DocumentUpload(), send(), upload(), Item, finishUpload(), startUpload(), shrinkImage()

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 120 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 121 - "BoardUI theming reference"
Cohesion: 0.33
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 123 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 870 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `cycle/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `auth.ts`, `package.json`, `documents/[id]/page.tsx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `[clientId]/page.tsx`, `quote/page.tsx`, `next`, `breadcrumb.tsx`, `parties/[id]/page.tsx`, `ledger/data.ts`, `sign-off-actions.tsx`, `tabs.tsx`, `dropdown.tsx`, `server.ts`, `books/forms.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `collections/page.tsx`, `cx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Skeleton`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `documents/actions.ts`, `items.ts`, `quote.ts`, `clients/[id]/page.tsx`, `portal/documents/page.tsx`, `@remixicon/react`, `document-upload.tsx`, `checkbox.tsx`, `brand/forms.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05318352059925094 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/actions.ts`, `cycle/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `auth.ts`, `package.json`, `documents/[id]/page.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `register-xlsx.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/data.ts`, `[clientId]/page.tsx`, `returns/load.ts`, `quote/page.tsx`, `breadcrumb.tsx`, `react`, `parties/[id]/page.tsx`, `supabaseServer`, `src/app/layout.tsx`, `ledger/data.ts`, `sign-off-actions.tsx`, `server.ts`, `books/forms.tsx`, `registrations/actions.ts`, `settings/page.tsx`, `parties/actions.ts`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `collections/page.tsx`, `app/app/layout.tsx`, `Skeleton`, `generate-filings/route.ts`, `social-button.tsx`, `print/page.tsx`, `documents/actions.ts`, `proxy.ts`, `quote.ts`, `proof-actions.ts`, `clients/[id]/page.tsx`, `portal/documents/page.tsx`, `@remixicon/react`, `clients/actions.ts`, `document-upload.tsx`, `brand/forms.tsx`?**
  _High betweenness centrality (0.141) - this node is a cross-community bridge._
- **Should `auth.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09990749306197964 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.0960591133004926 - nodes in this community are weakly interconnected._
- **Should `documents/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11586452762923351 - nodes in this community are weakly interconnected._