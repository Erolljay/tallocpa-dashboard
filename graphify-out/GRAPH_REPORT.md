# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 368 files · ~251,849 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2494 nodes · 7770 edges · 116 communities (98 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 87 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bec8b1f1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- engine.ts
- supabaseServer
- portal/documents/page.tsx
- vat.ts
- package.json
- fields.ts
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
- lookupAtc
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
- items.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/payroll.test.ts
- vitest
- [clientId]/page.tsx
- returns/load.ts
- quote/page.tsx
- scripts
- Centavos
- filings/run.ts
- statement-view.tsx
- format.ts
- payroll/types.ts
- gemini.ts
- register-xlsx.ts
- src/app/layout.tsx
- rates.ts
- server-only
- review-queue.ts
- form-1601eq.ts
- parties/actions.ts
- sign-off-actions.tsx
- cx
- dropdown.tsx
- Apple Design
- alphalist.ts
- testing.ts
- clients/actions.ts
- clients/[id]/page.tsx
- supabaseServer
- quote.ts
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- gap.ts
- theme-toggle.tsx
- Badge
- income.ts
- form-2316.tsx
- review/page.tsx
- @remixicon/react
- Pro components
- notification.tsx
- cx.ts
- FormModule
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- ui.tsx
- payroll/data.ts
- social-button.tsx
- Recipes
- Skeleton
- BoardUI theming reference
- Pro templates
- engine.test.ts
- digest.ts
- cx
- BoardUI page patterns
- proxy.ts
- boardui
- messages.ts
- parties/[id]/page.tsx
- deadlines/actions.ts
- fees/types.ts
- ComponentLetter
- proof-upload.tsx
- items.ts
- copy-opencv.mjs
- brand/forms.tsx
- SourceDocument
- period.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 166 edges
2. `cx` - 118 edges
3. `react` - 113 edges
4. `Notice()` - 108 edges
5. `Button()` - 89 edges
6. `Skeleton()` - 89 edges
7. `next` - 89 edges
8. `requireOwner()` - 88 edges
9. `Badge()` - 81 edges
10. `Card()` - 81 edges

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

## Communities (116 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (17): advanceFilingAction(), amount, SignOffState, stepData(), text(), ACTION_LABEL, availableActions(), FilingState (+9 more)

### Community 1 - "engine.ts"
Cohesion: 0.09
Nodes (52): shift(), Rule, addDays(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth() (+44 more)

### Community 2 - "supabaseServer"
Cohesion: 0.09
Nodes (47): nextConfig, next, react, NewEmployee(), NewEmployeePage(), NewClientPage(), OwnerOnly(), ClientList() (+39 more)

### Community 3 - "portal/documents/page.tsx"
Cohesion: 0.08
Nodes (43): DocReviewActions(), Doc, DocumentsCard(), when(), Payroll(), PayrollPage(), Cycle(), CyclePage() (+35 more)

### Community 4 - "vat.ts"
Cohesion: 0.17
Nodes (32): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, branchCode(), crlf(), csv() (+24 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "fields.ts"
Cohesion: 0.15
Nodes (21): approveDocumentAction(), DirectoryParty, typeLabel, DocActionState, runOcrAction(), checkFields(), Issue, num() (+13 more)

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
Nodes (17): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+9 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (19): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+11 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "lookupAtc"
Cohesion: 0.29
Nodes (10): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+2 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "sign-in-form.tsx"
Cohesion: 0.17
Nodes (27): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+19 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "items.ts"
Cohesion: 0.12
Nodes (30): GridRow, AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, MonthLines, PriorAmounts, Suggestion (+22 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Notice"
Cohesion: 0.14
Nodes (48): EngagementForm(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm(), RegisterUpload() (+40 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.13
Nodes (42): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+34 more)

### Community 44 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (40): MonthGrid(), toInput(), AlphaCols, form2316(), Form2316Employer, mmdd(), period2316(), contrib (+32 more)

### Community 45 - "vitest"
Cohesion: 0.08
Nodes (13): pg@^8.23.1, pg, vitest, outDir, pkgDir, require, { version }, ctx (+5 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (30): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), Client, CollectionsPage(), OpenDue (+22 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.13
Nodes (26): Split, EwtLine, FilingRow, ListedDocument, loadWorksheet(), PAYROLL_FORM_CODES, Supabase, toSource() (+18 more)

### Community 48 - "quote/page.tsx"
Cohesion: 0.14
Nodes (18): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+10 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Centavos"
Cohesion: 0.16
Nodes (26): EmployeeDetail(), EmployeePage(), check(), Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear(), Payroll2316Raw (+18 more)

### Community 51 - "filings/run.ts"
Cohesion: 0.12
Nodes (30): EstimatedProfile, estimateProfile(), gapFor(), GapRow, has(), buildQuote(), cents(), CustomQuoteItem (+22 more)

### Community 52 - "statement-view.tsx"
Cohesion: 0.12
Nodes (30): @remixicon/react, Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when() (+22 more)

### Community 53 - "format.ts"
Cohesion: 0.11
Nodes (33): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+25 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "gemini.ts"
Cohesion: 0.13
Nodes (15): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+7 more)

### Community 56 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (23): file(), GET(), safe(), GET(), employeesForMonth(), buildEmployeeTemplate(), sortItems(), ID_HEADERS (+15 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 59 - "server-only"
Cohesion: 0.33
Nodes (8): server-only, @supabase/supabase-js, GET(), runActingDigest(), sendEmail(), runDocumentCycles(), supabaseEnv(), supabaseAdmin()

### Community 60 - "review-queue.ts"
Cohesion: 0.29
Nodes (6): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), FilingStatus

### Community 61 - "form-1601eq.ts"
Cohesion: 0.07
Nodes (49): incomePayment(), VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+41 more)

### Community 62 - "parties/actions.ts"
Cohesion: 0.18
Nodes (20): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP (+12 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "alphalist.ts"
Cohesion: 0.11
Nodes (36): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+28 more)

### Community 68 - "testing.ts"
Cohesion: 0.15
Nodes (22): BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts(), cert2307() (+14 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.08
Nodes (42): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), updateClientAction(), ClientForm() (+34 more)

### Community 70 - "clients/[id]/page.tsx"
Cohesion: 0.21
Nodes (16): removeAssignmentAction(), AssignForm(), ClientUserForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage() (+8 more)

### Community 71 - "supabaseServer"
Cohesion: 0.23
Nodes (20): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+12 more)

### Community 72 - "quote.ts"
Cohesion: 0.17
Nodes (17): EngagementRow, TaxpayerType, ExistingClient, count(), first(), pick(), profileFromQuery(), QuerySource (+9 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.12
Nodes (31): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+23 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "gap.ts"
Cohesion: 0.27
Nodes (11): loadTaxOnFee(), longDate(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL (+3 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (30): Nav(), PortalLayout(), baseTabs, payrollTab, PortalNav(), applyTheme(), applyThemeWithTransition(), createBlurCircleMask() (+22 more)

### Community 79 - "Badge"
Cohesion: 0.12
Nodes (28): DocumentReviewPage(), Review(), ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell() (+20 more)

### Community 80 - "income.ts"
Cohesion: 0.14
Nodes (41): comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), incomeAttachments(), inputs1701Q(), inputs1702Q() (+33 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "review/page.tsx"
Cohesion: 0.10
Nodes (40): DashboardStats(), FilingListRow, FilingTable(), Event, eventText, Filing(), FilingPage(), paymentText (+32 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

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
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+11 more)

### Community 92 - "ui.tsx"
Cohesion: 0.21
Nodes (13): loadSchedules(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules(), buttonClass(), ButtonStyle (+5 more)

### Community 93 - "payroll/data.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Skeleton"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "engine.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 101 - "cx"
Cohesion: 0.13
Nodes (18): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps, CheckboxGlyph() (+10 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 106 - "parties/[id]/page.tsx"
Cohesion: 0.23
Nodes (12): zod, addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), ensureLogin(), clientUserSchema (+4 more)

### Community 107 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 108 - "fees/types.ts"
Cohesion: 0.15
Nodes (10): items, PRICES, schedule, settings, items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 109 - "ComponentLetter"
Cohesion: 0.50
Nodes (4): PriceRow, QuoteLine, Billing, ComponentLetter

### Community 110 - "proof-upload.tsx"
Cohesion: 0.18
Nodes (17): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+9 more)

### Community 113 - "items.ts"
Cohesion: 0.15
Nodes (18): Release2316Form(), PayrollSetupPage(), Setup(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release() (+10 more)

### Community 114 - "copy-opencv.mjs"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "brand/forms.tsx"
Cohesion: 0.33
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 116 - "SourceDocument"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 117 - "period.ts"
Cohesion: 0.67
Nodes (4): ActingState, appointActingAction(), endActingAction(), refresh()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 771 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `supabaseServer` to `portal/documents/page.tsx`, `package.json`, `fields.ts`, `cycle/page.tsx`, `profile.ts`, `dependencies`, `sign-in-form.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `Centavos`, `statement-view.tsx`, `format.ts`, `sign-off-actions.tsx`, `cx`, `dropdown.tsx`, `clients/actions.ts`, `clients/[id]/page.tsx`, `supabaseServer`, `settings/page.tsx`, `stat-cards.tsx`, `gap.ts`, `theme-toggle.tsx`, `Badge`, `form-2316.tsx`, `review/page.tsx`, `@remixicon/react`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `ui.tsx`, `social-button.tsx`, `Skeleton`, `cx`, `deadlines/actions.ts`, `proof-upload.tsx`, `items.ts`, `SourceDocument`, `period.ts`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `portal/documents/page.tsx`, `package.json`, `fields.ts`, `cycle/page.tsx`, `profile.ts`, `dependencies`, `sign-in-form.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `Centavos`, `statement-view.tsx`, `format.ts`, `register-xlsx.ts`, `src/app/layout.tsx`, `server-only`, `parties/actions.ts`, `sign-off-actions.tsx`, `clients/actions.ts`, `clients/[id]/page.tsx`, `supabaseServer`, `settings/page.tsx`, `gap.ts`, `theme-toggle.tsx`, `Badge`, `form-2316.tsx`, `review/page.tsx`, `app/app/layout.tsx`, `ui.tsx`, `payroll/data.ts`, `social-button.tsx`, `cx`, `proxy.ts`, `parties/[id]/page.tsx`, `deadlines/actions.ts`, `proof-upload.tsx`, `items.ts`, `period.ts`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0855094726062468 - nodes in this community are weakly interconnected._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.08823529411764706 - nodes in this community are weakly interconnected._
- **Should `portal/documents/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08200290275761973 - nodes in this community are weakly interconnected._