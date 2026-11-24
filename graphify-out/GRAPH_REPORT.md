# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 352 files · ~240,386 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2417 nodes · 7449 edges · 110 communities (94 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 84 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `75ea7258`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- engine.ts
- auth.ts
- manilaToday
- Skeleton
- package.json
- next
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- cycle/page.tsx
- Sign-in & Setup Docs
- profile.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- qap.ts
- Data Model & Security Docs
- server.ts
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
- Card
- scripts
- payroll/data.ts
- filings/run.ts
- statement-view.tsx
- parties/[id]/page.tsx
- payroll/types.ts
- gemini.ts
- register-xlsx.ts
- src/app/layout.tsx
- ocr/run.ts
- worksheet/page.tsx
- [month]/page.tsx
- returns/types.ts
- parties/actions.ts
- react
- tabs.tsx
- cx
- Apple Design
- alphalist.ts
- vitest
- clients/schema.ts
- clients/[id]/page.tsx
- supabaseServer
- quote.ts
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- gap/page.tsx
- theme-toggle.tsx
- app/documents/page.tsx
- vat.ts
- form-2316.tsx
- review/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- LinkButton
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- @remixicon/react
- template-copy.tsx
- settings/actions.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- returns/page.tsx
- checkbox.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- documents/[id]/page.tsx
- sign-in-form.tsx
- proof-upload.tsx
- ymd
- eslint.config.mjs

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 155 edges
2. `cx` - 116 edges
3. `react` - 109 edges
4. `Notice()` - 100 edges
5. `Skeleton()` - 85 edges
6. `Button()` - 83 edges
7. `next` - 83 edges
8. `Free components` - 79 edges
9. `requireOwner()` - 78 edges
10. `Card()` - 77 edges

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

## Communities (110 total, 16 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.14
Nodes (18): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+10 more)

### Community 1 - "engine.ts"
Cohesion: 0.16
Nodes (24): addDays(), compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), DeadlineRule, fiscalYearOf() (+16 more)

### Community 2 - "auth.ts"
Cohesion: 0.12
Nodes (21): zod@^4.6.7, zod, advanceFilingAction(), amount, SignOffState, stepData(), text(), getIdentity() (+13 more)

### Community 3 - "manilaToday"
Cohesion: 0.15
Nodes (27): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Home() (+19 more)

### Community 4 - "Skeleton"
Cohesion: 0.15
Nodes (27): NewEmployee(), NewEmployeePage(), ClientList(), ClientsPage(), DashboardStats(), FilingTable(), Deadlines(), DeadlinesPage() (+19 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (22): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+14 more)

### Community 6 - "next"
Cohesion: 0.11
Nodes (26): nextConfig, next, approveDocumentAction(), DirectoryParty, typeLabel, ALLOWED, DocActionState, replyDocumentAction() (+18 more)

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

### Community 11 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (21): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+13 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

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

### Community 18 - "qap.ts"
Cohesion: 0.13
Nodes (22): lookupAtc(), tinDigits(), form0619E, form1601EQ, branchFromTin(), buildQapRows(), csvCell(), mmYYYY() (+14 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "server.ts"
Cohesion: 0.27
Nodes (7): GET(), GET(), code, email, SignInState, signInWithGoogle(), safeNextPath()

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
Cohesion: 0.15
Nodes (17): Form2316Data, Form2316Line, BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind (+9 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (61): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), OcrRate, OwnerSections() (+53 more)

### Community 42 - "Notice"
Cohesion: 0.19
Nodes (34): ClientForm(), EngagementForm(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm() (+26 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (45): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+37 more)

### Community 44 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (39): GridRow, MonthGrid(), toInput(), AlphalistRow, AnnualSummary, annualTax(), computeEmployeeYear(), dateForYear() (+31 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.07
Nodes (12): pg@^8.23.1, pg, outDir, pkgDir, require, { version }, ctx, input (+4 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.23
Nodes (18): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), BillingDaysForm(), OpenItem (+10 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.10
Nodes (33): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, ATC_MASTER, AtcInfo, normalizeAtc(), EwtLine (+25 more)

### Community 48 - "Card"
Cohesion: 0.07
Nodes (63): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+55 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "payroll/data.ts"
Cohesion: 0.11
Nodes (37): server-only, @supabase/supabase-js, check(), AlphaCols, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316() (+29 more)

### Community 51 - "filings/run.ts"
Cohesion: 0.15
Nodes (22): Rule, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency, Period (+14 more)

### Community 52 - "statement-view.tsx"
Cohesion: 0.11
Nodes (31): Detail(), StatementPage(), PortalClient, portalContext(), Nav(), PortalLayout(), PortalNav(), Detail() (+23 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.12
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "gemini.ts"
Cohesion: 0.13
Nodes (15): OcrOutput, ocrOutputSchema, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+7 more)

### Community 56 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (26): file(), GET(), safe(), GET(), employeesForMonth(), loadEntries(), loadStored(), buildEmployeeTemplate() (+18 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "ocr/run.ts"
Cohesion: 0.15
Nodes (17): GET(), generateFilingsNow(), GenerateState, GenerateButton(), sendEmail(), cycleMessage(), dayFmt, NoticeKind (+9 more)

### Community 59 - "worksheet/page.tsx"
Cohesion: 0.16
Nodes (21): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+13 more)

### Community 60 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (24): EmployeeDetail(), EmployeePage(), PayrollMonth(), PayrollMonthPage(), when(), previewOf(), RegisterPreview, totals() (+16 more)

### Community 61 - "returns/types.ts"
Cohesion: 0.12
Nodes (27): VatData, form1601C, INPUTS, MONTH, form1604C, PAYROLL_FORMS, agentBackground(), agentErrors() (+19 more)

### Community 62 - "parties/actions.ts"
Cohesion: 0.25
Nodes (12): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), blank(), optionalText(), PartyInput (+4 more)

### Community 63 - "react"
Cohesion: 0.13
Nodes (24): react, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+16 more)

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
Cohesion: 0.18
Nodes (21): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+13 more)

### Community 68 - "vitest"
Cohesion: 0.16
Nodes (22): vitest, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts() (+14 more)

### Community 69 - "clients/schema.ts"
Cohesion: 0.19
Nodes (8): assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient, newClientSchema, base

### Community 70 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (26): removeAssignmentAction(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), AssignForm(), ClientUserForm() (+18 more)

### Community 71 - "supabaseServer"
Cohesion: 0.12
Nodes (39): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), updateClientAction(), NewClientPage() (+31 more)

### Community 72 - "quote.ts"
Cohesion: 0.06
Nodes (56): TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, has(), items, PRICES, schedule (+48 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.13
Nodes (29): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, SettingsPage() (+21 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.09
Nodes (29): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+21 more)

### Community 77 - "gap/page.tsx"
Cohesion: 0.39
Nodes (7): loadSchedules(), EngagementRow, FeeGapPage(), Gap(), gapFor(), GapRow, lastWholeMonths()

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "app/documents/page.tsx"
Cohesion: 0.18
Nodes (17): ClientSelect(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one() (+9 more)

### Community 80 - "vat.ts"
Cohesion: 0.06
Nodes (101): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), comparisonSchedule(), compute1701Q() (+93 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 82 - "review/page.tsx"
Cohesion: 0.26
Nodes (9): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue() (+1 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.10
Nodes (17): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+9 more)

### Community 87 - "LinkButton"
Cohesion: 0.34
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Set(), Form2316Sheet() (+3 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "@remixicon/react"
Cohesion: 0.12
Nodes (22): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu() (+14 more)

### Community 92 - "template-copy.tsx"
Cohesion: 0.14
Nodes (10): CopyContext, CopySettings, dataProps, dataText, MenuContext, renderProps, TemplateCopyTranslator, textProps (+2 more)

### Community 93 - "settings/actions.ts"
Cohesion: 0.26
Nodes (10): refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, checkbox, dayBefore(), holidaySchema, ruleEditSchema (+2 more)

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

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "returns/page.tsx"
Cohesion: 0.29
Nodes (9): FilingListRow, SignOffActions(), PortalReturns(), Returns(), Row, FILED, filingStatusLabel, filingStatusTone (+1 more)

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

### Community 105 - "documents/[id]/page.tsx"
Cohesion: 0.35
Nodes (7): DocumentReviewPage(), Review(), LockFiling, lockingFiling(), runOcr(), lookupParties(), partyKey()

### Community 106 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (8): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 107 - "proof-upload.tsx"
Cohesion: 0.42
Nodes (7): METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof(), shrinkImage()

### Community 108 - "ymd"
Cohesion: 0.64
Nodes (6): shift(), addMonths(), ymd(), monthChoices(), nextCutoff(), openMonth()

### Community 109 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 753 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `manilaToday`, `Skeleton`, `package.json`, `next`, `cycle/page.tsx`, `profile.ts`, `dependencies`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `Card`, `statement-view.tsx`, `parties/[id]/page.tsx`, `ocr/run.ts`, `worksheet/page.tsx`, `[month]/page.tsx`, `tabs.tsx`, `cx`, `clients/[id]/page.tsx`, `supabaseServer`, `settings/page.tsx`, `stat-cards.tsx`, `gap/page.tsx`, `theme-toggle.tsx`, `app/documents/page.tsx`, `review/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `LinkButton`, `input.tsx`, `document-scanner.tsx`, `@remixicon/react`, `template-copy.tsx`, `social-button.tsx`, `file-upload.tsx`, `returns/page.tsx`, `checkbox.tsx`, `documents/[id]/page.tsx`, `sign-in-form.tsx`, `proof-upload.tsx`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13852813852813853 - nodes in this community are weakly interconnected._
- **Why does `Building UIs with BoardUI` connect `form-2316.tsx` to `BoardUI theming reference`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `auth.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11666666666666667 - nodes in this community are weakly interconnected._
- **Should `manilaToday` be split into smaller, more focused modules?**
  _Cohesion score 0.14516129032258066 - nodes in this community are weakly interconnected._
- **Should `Skeleton` be split into smaller, more focused modules?**
  _Cohesion score 0.14919354838709678 - nodes in this community are weakly interconnected._