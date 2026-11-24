# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 348 files · ~236,545 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2390 nodes · 7350 edges · 108 communities (92 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `75ea7258`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- Deadline Engine & Dates
- supabaseServer
- returns/types.ts
- react
- package.json
- review-form.tsx
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
- copy-opencv.mjs
- Data Model & Security Docs
- sign-in-form.tsx
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- payroll/data.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- compute.ts
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- fees/[id]/page.tsx
- scripts
- Centavos
- quote.ts
- Badge
- parties/[id]/page.tsx
- payroll/payroll.test.ts
- gemini.ts
- register-xlsx.ts
- src/app/layout.tsx
- collections/page.tsx
- worksheet/page.tsx
- settings/page.tsx
- qap.ts
- zod
- Rules
- cx
- dropdown.tsx
- Apple Design
- form-1601eq.ts
- vitest
- client-form.tsx
- clients/[id]/page.tsx
- requireOwner
- template.ts
- staff/actions.ts
- Animation Performance
- payment-actions.ts
- stat-cards.tsx
- documents-card.tsx
- theme-toggle.tsx
- settings/actions.ts
- vat.ts
- form-2316.tsx
- quote/page.tsx
- @remixicon/react
- Pro components
- notification.tsx
- cx.ts
- brand/forms.tsx
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- db.test.ts
- fees/data.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- breadcrumb.tsx
- payment-forms.tsx
- checkbox.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- document-upload.tsx
- business.ts
- SourceDocument

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 150 edges
2. `cx` - 116 edges
3. `react` - 107 edges
4. `Notice()` - 96 edges
5. `Skeleton()` - 85 edges
6. `next` - 81 edges
7. `Button()` - 79 edges
8. `Free components` - 79 edges
9. `Card()` - 77 edges
10. `Badge()` - 77 edges

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

## Communities (108 total, 16 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (45): SignOffState, Event, eventText, Filing(), FilingPage(), paymentText, when(), checkTone (+37 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.06
Nodes (73): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Home(), PortalHome(), CloseCycleButton() (+65 more)

### Community 2 - "supabaseServer"
Cohesion: 0.11
Nodes (24): nextConfig, next, Detail(), StatementPage(), recomputeWorksheetAction(), GET(), fieldErrors(), mergePartyAction() (+16 more)

### Community 3 - "returns/types.ts"
Cohesion: 0.14
Nodes (21): alphaCols(), tinDashed(), PayrollContext, agentLines(), agentProblems(), emptyResult(), PAYROLL_NOT_LOADED, form1601C (+13 more)

### Community 4 - "react"
Cohesion: 0.08
Nodes (60): react, EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Payroll(), PayrollPage(), PayrollSetupPage() (+52 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.15
Nodes (20): approveDocumentAction(), DirectoryParty, typeLabel, runOcrAction(), checkFields(), Issue, num(), msgs() (+12 more)

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
Nodes (19): ClientSelect(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one() (+11 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.07
Nodes (40): BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), birSchema, blank(), BRANCH_CODE, contactSchema (+32 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+6 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "sign-in-form.tsx"
Cohesion: 0.31
Nodes (9): sendSignInEmail(), SignInState, verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), Divider() (+1 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/data.ts"
Cohesion: 0.10
Nodes (37): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), Certificates2316, certificatesFromRaw(), form2316() (+29 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (31): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+23 more)

### Community 42 - "Notice"
Cohesion: 0.23
Nodes (27): EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm(), RegisterUpload(), SubmissionReview() (+19 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (45): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+37 more)

### Community 44 - "compute.ts"
Cohesion: 0.20
Nodes (19): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+11 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.09
Nodes (8): pg@^8.23.1, pg, ctx, input, root, root, root, root

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+12 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.13
Nodes (28): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), VatData, FilingRow, loadWorksheet(), PAYROLL_FORM_CODES (+20 more)

### Community 48 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Centavos"
Cohesion: 0.09
Nodes (42): AlphaCols, Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+34 more)

### Community 51 - "quote.ts"
Cohesion: 0.08
Nodes (49): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+41 more)

### Community 52 - "Badge"
Cohesion: 0.18
Nodes (20): OwnerSections(), BrandSettings(), GrossReceiptsCard(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail() (+12 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.05
Nodes (69): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, VerifyButton(), fmtDate(), PartyDetail() (+61 more)

### Community 54 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (47): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+39 more)

### Community 55 - "gemini.ts"
Cohesion: 0.14
Nodes (14): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+6 more)

### Community 56 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (27): file(), GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET() (+19 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "collections/page.tsx"
Cohesion: 0.16
Nodes (22): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+14 more)

### Community 59 - "worksheet/page.tsx"
Cohesion: 0.18
Nodes (19): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+11 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.19
Nodes (19): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+11 more)

### Community 61 - "qap.ts"
Cohesion: 0.13
Nodes (22): tinDigits(), totalsByAtc(), form0619E, form1601EQ, branchFromTin(), buildQapRows(), csvCell(), mmYYYY() (+14 more)

### Community 62 - "zod"
Cohesion: 0.53
Nodes (5): zod, advanceFilingAction(), amount, stepData(), text()

### Community 63 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "form-1601eq.ts"
Cohesion: 0.19
Nodes (15): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), PREVIOUSLY_REMITTED, INPUTS, MONTH (+7 more)

### Community 68 - "vitest"
Cohesion: 0.21
Nodes (17): vitest, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+9 more)

### Community 69 - "client-form.tsx"
Cohesion: 0.10
Nodes (33): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+25 more)

### Community 70 - "clients/[id]/page.tsx"
Cohesion: 0.21
Nodes (16): AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage() (+8 more)

### Community 71 - "requireOwner"
Cohesion: 0.20
Nodes (21): addChargeAction(), applyCreditAction(), date, depositSchema, peso, recordDepositAction(), refresh(), runBillingAction() (+13 more)

### Community 72 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 73 - "staff/actions.ts"
Cohesion: 0.19
Nodes (15): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), roleLabel, StaffList(), StaffPage() (+7 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "payment-actions.ts"
Cohesion: 0.38
Nodes (9): accountSchema, addPaymentAccountAction(), QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction(), text() (+1 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "documents-card.tsx"
Cohesion: 0.19
Nodes (14): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, ALLOWED (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 80 - "vat.ts"
Cohesion: 0.07
Nodes (96): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), comparisonSchedule(), compute1701Q() (+88 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.14
Nodes (22): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+14 more)

### Community 82 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+6 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.07
Nodes (33): @remixicon/react, Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant (+25 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (29): react-dom@19.3.0, react-dom, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+21 more)

### Community 86 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 87 - "brand/forms.tsx"
Cohesion: 0.23
Nodes (11): BrandSettingsState, BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT (+3 more)

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
Cohesion: 0.11
Nodes (24): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+16 more)

### Community 92 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 93 - "fees/data.ts"
Cohesion: 0.12
Nodes (23): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+15 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 100 - "payment-forms.tsx"
Cohesion: 0.33
Nodes (9): PaymentSettings(), PaymentSettingsState, AddPaymentAccountForm(), PaymentDaysForm(), ReplaceQrForm(), Result(), ToggleAccountButton(), ReplyForm() (+1 more)

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

### Community 105 - "document-upload.tsx"
Cohesion: 0.38
Nodes (8): DocumentUpload(), send(), upload(), Item, finishUpload(), startUpload(), shrinkImage(), month()

### Community 106 - "business.ts"
Cohesion: 0.25
Nodes (7): BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, moduleForForm(), modules

### Community 107 - "SourceDocument"
Cohesion: 0.33
Nodes (4): Split, EwtLine, ListedDocument, SourceDocument

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 743 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `supabaseServer`, `package.json`, `review-form.tsx`, `app/documents/page.tsx`, `profile.ts`, `dependencies`, `sign-in-form.tsx`, `payroll/data.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `fees/[id]/page.tsx`, `Badge`, `parties/[id]/page.tsx`, `collections/page.tsx`, `worksheet/page.tsx`, `settings/page.tsx`, `cx`, `dropdown.tsx`, `client-form.tsx`, `clients/[id]/page.tsx`, `staff/actions.ts`, `stat-cards.tsx`, `documents-card.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `@remixicon/react`, `notification.tsx`, `cx.ts`, `brand/forms.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `fees/data.ts`, `social-button.tsx`, `file-upload.tsx`, `breadcrumb.tsx`, `payment-forms.tsx`, `checkbox.tsx`, `document-upload.tsx`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06390977443609022 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `react`, `package.json`, `review-form.tsx`, `app/documents/page.tsx`, `profile.ts`, `dependencies`, `payroll/data.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `fees/[id]/page.tsx`, `Badge`, `parties/[id]/page.tsx`, `register-xlsx.ts`, `src/app/layout.tsx`, `collections/page.tsx`, `worksheet/page.tsx`, `settings/page.tsx`, `zod`, `client-form.tsx`, `clients/[id]/page.tsx`, `requireOwner`, `staff/actions.ts`, `payment-actions.ts`, `documents-card.tsx`, `settings/actions.ts`, `form-2316.tsx`, `quote/page.tsx`, `brand/forms.tsx`, `app/app/layout.tsx`, `fees/data.ts`, `breadcrumb.tsx`, `proxy.ts`, `document-upload.tsx`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.05773726040205704 - nodes in this community are weakly interconnected._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.10569105691056911 - nodes in this community are weakly interconnected._
- **Should `returns/types.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13793103448275862 - nodes in this community are weakly interconnected._