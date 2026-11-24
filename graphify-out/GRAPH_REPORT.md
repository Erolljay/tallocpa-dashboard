# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 340 files · ~231,641 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2347 nodes · 7249 edges · 118 communities (102 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `465670d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- Deadline Engine & Dates
- clients/actions.ts
- vat.ts
- document-scanner.tsx
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Notice
- Deadline Engine Docs
- documents/[id]/page.tsx
- Sign-in & Setup Docs
- supabaseServer
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- copy-opencv.mjs
- Data Model & Security Docs
- social-button.tsx
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- Free components
- ui.tsx
- scores/page.tsx
- [clientId]/page.tsx
- payroll/forms.tsx
- db.test.ts
- notification.tsx
- react
- Centavos
- scripts
- dropdown.tsx
- proxy.ts
- rows.ts
- eslint.config.mjs
- cx
- vitest
- input.tsx
- profile.ts
- next
- returns/load.ts
- payroll/payroll.test.ts
- theme-toggle.tsx
- quote.ts
- stat-cards.tsx
- Pro components
- manilaToday
- returns/types.ts
- cycle/page.tsx
- fees/[id]/page.tsx
- testing.ts
- payroll/types.ts
- qap.ts
- payroll/data.ts
- app/app/layout.tsx
- parties/[id]/page.tsx
- settings/page.tsx
- Apple Design
- form-2316.tsx
- fees/data.ts
- Badge
- Card
- gemini.ts
- clients/[id]/page.tsx
- fees/types.ts
- Animation Performance
- money.ts
- requireOwner
- gap/page.tsx
- settings/actions.ts
- template.ts
- alphalist.ts
- FormModule
- template-copy.tsx
- ocr/run.ts
- Recipes
- portal/page.tsx
- review/page.tsx
- brand/actions.ts
- apply.ts
- file-upload.tsx
- BoardUI theming reference
- breadcrumb.tsx
- form-1604c.ts
- Pro templates
- quote/page.tsx
- cycle/run.ts
- resolve.ts
- link-button.tsx
- worksheet/page.tsx
- document-upload.tsx
- checkbox.tsx
- BoardUI page patterns
- [id]/payroll/page.tsx
- staff/page.tsx
- generate-qap-fixture.mjs
- src/app/layout.tsx
- parties/schema.ts
- boardui

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 149 edges
2. `cx` - 112 edges
3. `react` - 106 edges
4. `Notice()` - 96 edges
5. `Skeleton()` - 84 edges
6. `next` - 81 edges
7. `Free components` - 79 edges
8. `Button()` - 77 edges
9. `Badge()` - 77 edges
10. `Card()` - 75 edges

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

## Communities (118 total, 16 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (29): SignOffState, Event, eventText, Filing(), FilingPage(), paymentText, when(), checkTone (+21 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.08
Nodes (49): obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TaxTypeError, forms(), addDays(), compareIso(), IsoDate (+41 more)

### Community 2 - "clients/actions.ts"
Cohesion: 0.11
Nodes (29): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+21 more)

### Community 3 - "vat.ts"
Cohesion: 0.06
Nodes (101): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), comparisonSchedule() (+93 more)

### Community 4 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (24): @techstark/opencv-js@4.12.0-release.1, devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+16 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.16
Nodes (20): approveDocumentAction(), DirectoryParty, typeLabel, DocActionState, checkFields(), Issue, num(), msgs() (+12 more)

### Community 7 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "CI Workflow"
Cohesion: 0.12
Nodes (15): runs-on, steps, jobs, check, name, on, pull_request, push (+7 more)

### Community 9 - "Notice"
Cohesion: 0.20
Nodes (31): ClientForm(), DocReviewActions(), AssignForm(), ClientUserForm(), EngagementForm(), EmployeeForm(), EmployeeUpload(), ItemForm() (+23 more)

### Community 10 - "Deadline Engine Docs"
Cohesion: 0.21
Nodes (11): /api/cron/generate-filings (02:00 Manila), Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET), Withholding Returns Follow Calendar Year (calendar_year flag), Onboarding a Client Workflow, Nightly Filing Instance Generation (120 days ahead, 60 back), Filing Obligations & Deadline Engine, Weekend/Holiday Roll to Next Working Day, BIR Deadline Engine (src/lib/deadlines) (+3 more)

### Community 11 - "documents/[id]/page.tsx"
Cohesion: 0.23
Nodes (18): Doc, DocumentReviewPage(), Review(), DocumentsQueuePage(), Queue(), Row, when(), Doc (+10 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "supabaseServer"
Cohesion: 0.12
Nodes (28): server-only, zod, advanceFilingAction(), amount, stepData(), text(), accountSchema, addPaymentAccountAction() (+20 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, @internationalized/date@^3.12.4, lucide-react@^1.77.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "Free components"
Cohesion: 0.03
Nodes (79): Accordion, Agent Chat, Agent runtime, Agent Thinking, Announcement, Auth Card, Avatar, Badge (+71 more)

### Community 41 - "ui.tsx"
Cohesion: 0.11
Nodes (40): NewEmployee(), NewEmployeePage(), Release2316Form(), PayrollSetupPage(), Setup(), PrintAll(), PrintAll2316Page(), Certificates() (+32 more)

### Community 42 - "scores/page.tsx"
Cohesion: 0.09
Nodes (40): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+32 more)

### Community 43 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (42): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+34 more)

### Community 44 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (42): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+34 more)

### Community 45 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 46 - "notification.tsx"
Cohesion: 0.06
Nodes (38): react-dom@19.3.0, react-dom, @remixicon/react, Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize (+30 more)

### Community 47 - "react"
Cohesion: 0.06
Nodes (32): react, AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor, CounterProps (+24 more)

### Community 48 - "Centavos"
Cohesion: 0.09
Nodes (39): GridRow, MonthGrid(), toInput(), AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualTax() (+31 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "dropdown.tsx"
Cohesion: 0.08
Nodes (36): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+28 more)

### Community 51 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 52 - "rows.ts"
Cohesion: 0.12
Nodes (33): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+25 more)

### Community 53 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 54 - "cx"
Cohesion: 0.09
Nodes (33): Avatar(), CloseButton(), Notification(), NotificationAvatarVisual(), SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+25 more)

### Community 55 - "vitest"
Cohesion: 0.10
Nodes (9): pg@^8.23.1, pg, vitest, ctx, input, root, root, root (+1 more)

### Community 56 - "input.tsx"
Cohesion: 0.10
Nodes (31): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+23 more)

### Community 57 - "profile.ts"
Cohesion: 0.08
Nodes (33): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+25 more)

### Community 58 - "next"
Cohesion: 0.11
Nodes (23): nextConfig, next, DashboardStats(), generateFilingsNow(), GenerateState, FilingTable(), GenerateButton(), Deadlines() (+15 more)

### Community 59 - "returns/load.ts"
Cohesion: 0.13
Nodes (29): recomputeWorksheetAction(), WorksheetState, ATC_MASTER, AtcInfo, normalizeAtc(), FilingRow, ListedDocument, loadWorksheet() (+21 more)

### Community 60 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (30): exceljs@4.4.0, exceljs, PayrollItem, sortItems(), employee(), entry(), fixtureContext(), ITEMS (+22 more)

### Community 61 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (30): Nav(), PortalLayout(), baseTabs, payrollTab, PortalNav(), applyTheme(), applyThemeWithTransition(), createBlurCircleMask() (+22 more)

### Community 62 - "quote.ts"
Cohesion: 0.13
Nodes (30): EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), buildQuote(), cents(), CustomQuoteItem (+22 more)

### Community 63 - "stat-cards.tsx"
Cohesion: 0.09
Nodes (29): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+21 more)

### Community 64 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 65 - "manilaToday"
Cohesion: 0.17
Nodes (19): GET(), Detail(), StatementPage(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail() (+11 more)

### Community 66 - "returns/types.ts"
Cohesion: 0.16
Nodes (22): VatData, INPUTS, MONTH, agentBackground(), agentErrors(), tinDashed(), PREVIOUSLY_REMITTED, INPUTS (+14 more)

### Community 67 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, CloseCycleButton(), Message(), NothingToSubmitButton() (+14 more)

### Community 68 - "fees/[id]/page.tsx"
Cohesion: 0.15
Nodes (25): FeeFormState, loadSchedule(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusTone, ActivateForm(), billingHint (+17 more)

### Community 69 - "testing.ts"
Cohesion: 0.16
Nodes (21): BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts(), cert2307() (+13 more)

### Community 70 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 71 - "qap.ts"
Cohesion: 0.13
Nodes (18): EwtLine, tinDigits(), branchFromTin(), buildQapRows(), csvCell(), mmYYYY(), MONTH_NAMES, qapCsv() (+10 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.19
Nodes (21): @supabase/supabase-js, file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), yearWorksheet() (+13 more)

### Community 73 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (20): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+12 more)

### Community 74 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (21): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), listNameCols(), Names (+13 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.17
Nodes (21): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, Rule (+13 more)

### Community 76 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 77 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 78 - "fees/data.ts"
Cohesion: 0.14
Nodes (19): dateFmt, statusLabel, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+11 more)

### Community 79 - "Badge"
Cohesion: 0.20
Nodes (16): FilingListRow, Section(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReturns() (+8 more)

### Community 80 - "Card"
Cohesion: 0.21
Nodes (18): BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+10 more)

### Community 81 - "gemini.ts"
Cohesion: 0.14
Nodes (14): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+6 more)

### Community 82 - "clients/[id]/page.tsx"
Cohesion: 0.20
Nodes (15): ClientValues, frequencyLabel, Props, StatusButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+7 more)

### Community 83 - "fees/types.ts"
Cohesion: 0.18
Nodes (16): EngagementRow, TaxpayerType, ExistingClient, count(), first(), pick(), profileFromQuery(), QuerySource (+8 more)

### Community 84 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 85 - "money.ts"
Cohesion: 0.22
Nodes (14): atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines(), totalsByAtc(), applyRate(), basisPoints() (+6 more)

### Community 86 - "requireOwner"
Cohesion: 0.28
Nodes (15): NewClientPage(), OwnerOnly(), addChargeAction(), applyCreditAction(), date, depositSchema, peso, recordDepositAction() (+7 more)

### Community 87 - "gap/page.tsx"
Cohesion: 0.26
Nodes (15): activateAction(), createFromTemplateAction(), deleteDraftAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+7 more)

### Community 88 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 89 - "template.ts"
Cohesion: 0.14
Nodes (11): items, PRICES, schedule, settings, items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+3 more)

### Community 90 - "alphalist.ts"
Cohesion: 0.26
Nodes (15): alphaCols(), AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell(), datDate() (+7 more)

### Community 91 - "FormModule"
Cohesion: 0.17
Nodes (9): form1601C, form1604C, PAYROLL_FORMS, form0619E, form1601EQ, WITHHOLDING_FORMS, LoadedWorksheet, modules (+1 more)

### Community 92 - "template-copy.tsx"
Cohesion: 0.14
Nodes (10): CopyContext, CopySettings, dataProps, dataText, MenuContext, renderProps, TemplateCopyTranslator, textProps (+2 more)

### Community 93 - "ocr/run.ts"
Cohesion: 0.29
Nodes (11): normalizeTin(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), fillFromDirectory(), HEAD_OFFICE (+3 more)

### Community 94 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 95 - "portal/page.tsx"
Cohesion: 0.37
Nodes (10): DocumentsCard(), when(), shift(), Home(), PortalHome(), addMonths(), ymd(), monthChoices() (+2 more)

### Community 96 - "review/page.tsx"
Cohesion: 0.28
Nodes (9): Queue(), ReviewPage(), Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), f() (+1 more)

### Community 97 - "brand/actions.ts"
Cohesion: 0.23
Nodes (11): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), upload() (+3 more)

### Community 98 - "apply.ts"
Cohesion: 0.24
Nodes (11): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), RegisterPreview, totals(), CheckedRegister (+3 more)

### Community 99 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 100 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 101 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronDownSmall(), ChevronRightSmall(), IconProps

### Community 102 - "form-1604c.ts"
Cohesion: 0.27
Nodes (9): Alphalist, tinDashed(), agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, MONTHS (+1 more)

### Community 103 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 104 - "quote/page.tsx"
Cohesion: 0.25
Nodes (10): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), Quote (+2 more)

### Community 105 - "cycle/run.ts"
Cohesion: 0.33
Nodes (7): sendEmail(), cycleMessage(), dayFmt, NoticeKind, showDay(), Due, runDocumentCycles()

### Community 106 - "resolve.ts"
Cohesion: 0.36
Nodes (10): displayName(), fullAddress(), partyTinLabel(), ABBREVIATIONS, nameTokens(), resolveParty(), sameAddress(), sameName() (+2 more)

### Community 107 - "link-button.tsx"
Cohesion: 0.24
Nodes (9): IconComponent, LinkButtonAnchorProps, LinkButtonBaseProps, LinkButtonButtonProps, LinkButtonProps, LinkButtonSize, linkButtonStyles, LinkButtonVariant (+1 more)

### Community 108 - "worksheet/page.tsx"
Cohesion: 0.39
Nodes (8): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage()

### Community 109 - "document-upload.tsx"
Cohesion: 0.44
Nodes (7): DocumentUpload(), send(), upload(), Item, finishUpload(), startUpload(), shrinkImage()

### Community 110 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 111 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 112 - "[id]/payroll/page.tsx"
Cohesion: 0.48
Nodes (5): EmployeeDetail(), EmployeePage(), Payroll(), PayrollPage(), displayName()

### Community 113 - "staff/page.tsx"
Cohesion: 0.52
Nodes (5): InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 114 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 115 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 116 - "parties/schema.ts"
Cohesion: 0.53
Nodes (5): blank(), optionalText(), PartyInput, partySchema, normalizeBranch()

### Community 117 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

## Knowledge Gaps
- **18 isolated node(s):** `npx`, `NODE_USE_ENV_PROXY`, `DO_NOT_TRACK`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 722 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `clients/actions.ts`, `document-scanner.tsx`, `package.json`, `review-form.tsx`, `Notice`, `documents/[id]/page.tsx`, `dependencies`, `social-button.tsx`, `ui.tsx`, `scores/page.tsx`, `[clientId]/page.tsx`, `payroll/forms.tsx`, `notification.tsx`, `dropdown.tsx`, `cx`, `input.tsx`, `next`, `theme-toggle.tsx`, `stat-cards.tsx`, `manilaToday`, `cycle/page.tsx`, `fees/[id]/page.tsx`, `payroll/data.ts`, `app/app/layout.tsx`, `parties/[id]/page.tsx`, `settings/page.tsx`, `Badge`, `Card`, `clients/[id]/page.tsx`, `requireOwner`, `gap/page.tsx`, `template-copy.tsx`, `portal/page.tsx`, `review/page.tsx`, `file-upload.tsx`, `breadcrumb.tsx`, `quote/page.tsx`, `link-button.tsx`, `worksheet/page.tsx`, `document-upload.tsx`, `checkbox.tsx`, `[id]/payroll/page.tsx`, `staff/page.tsx`?**
  _High betweenness centrality (0.194) - this node is a cross-community bridge._
- **What connects `npx`, `NODE_USE_ENV_PROXY`, `DO_NOT_TRACK` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09982174688057041 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `clients/actions.ts`, `package.json`, `review-form.tsx`, `Notice`, `documents/[id]/page.tsx`, `supabaseServer`, `dependencies`, `social-button.tsx`, `ui.tsx`, `scores/page.tsx`, `[clientId]/page.tsx`, `payroll/forms.tsx`, `proxy.ts`, `returns/load.ts`, `theme-toggle.tsx`, `manilaToday`, `cycle/page.tsx`, `fees/[id]/page.tsx`, `payroll/data.ts`, `app/app/layout.tsx`, `parties/[id]/page.tsx`, `settings/page.tsx`, `form-2316.tsx`, `Badge`, `Card`, `clients/[id]/page.tsx`, `requireOwner`, `gap/page.tsx`, `settings/actions.ts`, `portal/page.tsx`, `review/page.tsx`, `brand/actions.ts`, `apply.ts`, `breadcrumb.tsx`, `quote/page.tsx`, `worksheet/page.tsx`, `document-upload.tsx`, `[id]/payroll/page.tsx`, `src/app/layout.tsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.08361581920903954 - nodes in this community are weakly interconnected._
- **Should `clients/actions.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10668563300142248 - nodes in this community are weakly interconnected._
- **Should `vat.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06380783966990863 - nodes in this community are weakly interconnected._