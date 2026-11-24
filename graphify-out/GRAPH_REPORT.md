# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 367 files · ~250,953 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2485 nodes · 7745 edges · 119 communities (102 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 87 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `6416b315`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- filings/run.ts
- next
- alphalist.ts
- staff/page.tsx
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
- Sign-in & Setup Docs
- profile.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- income.ts
- Data Model & Security Docs
- fees/[id]/page.tsx
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
- payroll/payroll.test.ts
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- fees/data.ts
- scripts
- Centavos
- quote.ts
- Badge
- parties/[id]/page.tsx
- payroll/types.ts
- acting-approver/page.tsx
- register-xlsx.ts
- src/app/layout.tsx
- supabaseServer
- ocr/run.ts
- settings/page.tsx
- money.ts
- rates.ts
- Notice
- cx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- clients/actions.ts
- clients/[id]/page.tsx
- requireOwner
- fees/types.ts
- staff/actions.ts
- Animation Performance
- payment-actions.ts
- stat-cards.tsx
- quote/page.tsx
- theme-toggle.tsx
- Skeleton
- vat.ts
- form-2316.tsx
- app/app/page.tsx
- @remixicon/react
- Pro components
- notification.tsx
- cx.ts
- FormModule
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- react
- fees/data.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- boardui/SKILL.md
- Pro templates
- breadcrumb.tsx
- worksheet/page.tsx
- checkbox.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- documents/actions.ts
- staff/actions.ts
- parties/parties.test.ts
- template.ts
- resolve.ts
- proof-actions.ts
- payment-actions.ts
- copy-opencv.mjs
- year/[year]/page.tsx
- acting-approver.test.ts
- BoardUI theming reference
- documents/period.ts
- acting-approver/actions.ts
- upload.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 166 edges
2. `cx` - 116 edges
3. `react` - 113 edges
4. `Notice()` - 108 edges
5. `Skeleton()` - 89 edges
6. `Button()` - 89 edges
7. `requireOwner()` - 88 edges
8. `next` - 87 edges
9. `Card()` - 81 edges
10. `Badge()` - 81 edges

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

## Communities (119 total, 17 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.14
Nodes (18): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+10 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.05
Nodes (74): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), Rule, digestMessage() (+66 more)

### Community 2 - "next"
Cohesion: 0.12
Nodes (19): nextConfig, next, Deadlines(), DeadlinesPage(), advanceFilingAction(), amount, SignOffState, stepData() (+11 more)

### Community 3 - "alphalist.ts"
Cohesion: 0.14
Nodes (29): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), PortalDocuments() (+21 more)

### Community 4 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "fields.ts"
Cohesion: 0.15
Nodes (21): approveDocumentAction(), DirectoryParty, typeLabel, DocActionState, checkFields(), Issue, num(), msgs() (+13 more)

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

### Community 11 - "app/documents/page.tsx"
Cohesion: 0.15
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), Message(), NothingToSubmitButton() (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+44 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "income.ts"
Cohesion: 0.13
Nodes (21): ATC_MASTER, AtcInfo, lookupAtc(), EwtLine, tinDigits(), branchFromTin(), buildQapRows(), csvCell() (+13 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "fees/[id]/page.tsx"
Cohesion: 0.18
Nodes (25): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+17 more)

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
Cohesion: 0.14
Nodes (22): AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, MonthLines, Suggestion, PayrollItem, CheckedRegister (+14 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Notice"
Cohesion: 0.15
Nodes (38): ClientForm(), DocReviewActions(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PriorEmployerForm(), AddChargeForm() (+30 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 44 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (33): GridRow, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+25 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.09
Nodes (8): pg@^8.23.1, pg, ctx, input, root, root, root, root

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (33): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+25 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.15
Nodes (25): normalizeAtc(), FilingRow, ListedDocument, loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase, toSource() (+17 more)

### Community 48 - "fees/data.ts"
Cohesion: 0.12
Nodes (25): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+17 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Centavos"
Cohesion: 0.10
Nodes (40): AlphaCols, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+32 more)

### Community 51 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 52 - "Badge"
Cohesion: 0.15
Nodes (24): Detail(), StatementPage(), portalContext(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), PrintButton() (+16 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row (+16 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.12
Nodes (21): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EmployeeImportRow, readEmployeeFile(), reasonChoices (+13 more)

### Community 55 - "acting-approver/page.tsx"
Cohesion: 0.13
Nodes (17): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+9 more)

### Community 56 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (22): exceljs, file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), ID_HEADERS (+14 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "supabaseServer"
Cohesion: 0.15
Nodes (16): removeAssignmentAction(), setClientStatusAction(), EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), addBranchAction(), BranchState (+8 more)

### Community 59 - "ocr/run.ts"
Cohesion: 0.17
Nodes (13): AtcTotal, docLabel(), ewtLines(), totalsByAtc(), client, Q1, applyRate(), basisPoints() (+5 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.17
Nodes (27): saveMonthAction(), EmployeeDetail(), EmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), Payroll(), PayrollPage() (+19 more)

### Community 61 - "money.ts"
Cohesion: 0.21
Nodes (17): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), PREVIOUSLY_REMITTED, INPUTS, MONTH (+9 more)

### Community 62 - "rates.ts"
Cohesion: 0.19
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), lookupParties(), person, blank() (+9 more)

### Community 63 - "Notice"
Cohesion: 0.15
Nodes (21): PreviewTable(), RegisterUpload(), SubmissionReview(), checkTone, checkWord, needsNote(), noteLabel(), noteRequired() (+13 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.16
Nodes (23): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+15 more)

### Community 68 - "vitest"
Cohesion: 0.16
Nodes (22): vitest, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts() (+14 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.15
Nodes (21): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), obligationChanges(), obligationsForTaxTypes(), PlannedObligation (+13 more)

### Community 70 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (26): FormState, ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+18 more)

### Community 71 - "requireOwner"
Cohesion: 0.32
Nodes (14): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+6 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.13
Nodes (26): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+18 more)

### Community 73 - "staff/actions.ts"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "payment-actions.ts"
Cohesion: 0.17
Nodes (21): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+13 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (30): Nav(), PortalLayout(), baseTabs, payrollTab, PortalNav(), applyTheme(), applyThemeWithTransition(), createBlurCircleMask() (+22 more)

### Community 79 - "Skeleton"
Cohesion: 0.15
Nodes (27): NewEmployee(), NewEmployeePage(), ClientList(), ClientsPage(), ClientSelect(), DocumentReviewPage(), Review(), ApprovedTable() (+19 more)

### Community 80 - "vat.ts"
Cohesion: 0.06
Nodes (101): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), comparisonSchedule(), compute1701Q() (+93 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "app/app/page.tsx"
Cohesion: 0.11
Nodes (32): DashboardStats(), FilingListRow, FilingTable(), ActingNotice(), DashboardPage(), OwnerView(), Summary(), Queue() (+24 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.07
Nodes (33): @remixicon/react, Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant (+25 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 86 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 87 - "FormModule"
Cohesion: 0.17
Nodes (9): form1601C, form1604C, PAYROLL_FORMS, form0619E, form1601EQ, WITHHOLDING_FORMS, LoadedWorksheet, modules (+1 more)

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
Cohesion: 0.13
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "react"
Cohesion: 0.23
Nodes (11): react, AddBranchForm(), BranchRowForm(), Branches(), BranchesPage(), buttonClass(), ButtonStyle, control (+3 more)

### Community 93 - "fees/data.ts"
Cohesion: 0.25
Nodes (12): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+4 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "breadcrumb.tsx"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "worksheet/page.tsx"
Cohesion: 0.17
Nodes (17): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+9 more)

### Community 101 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "documents/actions.ts"
Cohesion: 0.38
Nodes (6): ALLOWED, finishUpload(), replyDocumentAction(), reviewDocumentAction(), runOcrAction(), runOcr()

### Community 106 - "staff/actions.ts"
Cohesion: 0.25
Nodes (11): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email (+3 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.29
Nodes (10): Detail(), PayNow(), METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof() (+2 more)

### Community 108 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 109 - "resolve.ts"
Cohesion: 0.27
Nodes (13): displayName(), fullAddress(), Party, partyTinLabel(), ABBREVIATIONS, fillFromDirectory(), nameTokens(), ResolvedParty (+5 more)

### Community 110 - "proof-actions.ts"
Cohesion: 0.23
Nodes (11): zod@^4.6.7, zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema (+3 more)

### Community 111 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 112 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 113 - "year/[year]/page.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "BoardUI theming reference"
Cohesion: 0.33
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 116 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 117 - "acting-approver/actions.ts"
Cohesion: 0.60
Nodes (4): ActingState, appointActingAction(), endActingAction(), refresh()

### Community 118 - "upload.tsx"
Cohesion: 0.60
Nodes (4): PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PortalPayrollUpload()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 766 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `filings/run.ts`, `next`, `alphalist.ts`, `staff/page.tsx`, `package.json`, `fields.ts`, `app/documents/page.tsx`, `profile.ts`, `dependencies`, `fees/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `fees/data.ts`, `Badge`, `parties/[id]/page.tsx`, `supabaseServer`, `settings/page.tsx`, `Notice`, `cx`, `dropdown.tsx`, `clients/[id]/page.tsx`, `payment-actions.ts`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `Skeleton`, `form-2316.tsx`, `app/app/page.tsx`, `@remixicon/react`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `social-button.tsx`, `file-upload.tsx`, `worksheet/page.tsx`, `checkbox.tsx`, `parties/parties.test.ts`, `year/[year]/page.tsx`, `upload.tsx`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `filings/run.ts`, `alphalist.ts`, `package.json`, `fields.ts`, `app/documents/page.tsx`, `profile.ts`, `dependencies`, `fees/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `fees/data.ts`, `Centavos`, `Badge`, `parties/[id]/page.tsx`, `register-xlsx.ts`, `src/app/layout.tsx`, `supabaseServer`, `settings/page.tsx`, `rates.ts`, `Notice`, `dropdown.tsx`, `clients/actions.ts`, `clients/[id]/page.tsx`, `requireOwner`, `payment-actions.ts`, `quote/page.tsx`, `theme-toggle.tsx`, `Skeleton`, `form-2316.tsx`, `app/app/page.tsx`, `app/app/layout.tsx`, `react`, `fees/data.ts`, `social-button.tsx`, `worksheet/page.tsx`, `proxy.ts`, `documents/actions.ts`, `staff/actions.ts`, `parties/parties.test.ts`, `proof-actions.ts`, `payment-actions.ts`, `year/[year]/page.tsx`, `acting-approver/actions.ts`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05232323232323232 - nodes in this community are weakly interconnected._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.12473118279569892 - nodes in this community are weakly interconnected._
- **Should `alphalist.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13949579831932774 - nodes in this community are weakly interconnected._