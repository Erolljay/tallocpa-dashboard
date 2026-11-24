# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 385 files · ~266,810 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2624 nodes · 8216 edges · 121 communities (105 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a2ede249`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- engine.ts
- Skeleton
- manilaToday
- vat.ts
- package.json
- review-form.tsx
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
- buildSawt
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
- register-xlsx.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- Centavos
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- fees/data.ts
- scripts
- payroll/data.ts
- quote.ts
- statement-view.tsx
- parties/[id]/page.tsx
- payroll/payroll.test.ts
- supabaseServer
- [id]/payroll/page.tsx
- src/app/layout.tsx
- rates.ts
- ledger/data.ts
- toCentavos
- form-1601eq.ts
- server-only
- sign-off-actions.tsx
- cx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- requireOwner
- react
- books/actions.ts
- fees/types.ts
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- quote/page.tsx
- theme-toggle.tsx
- Card
- percentage.ts
- form-2316.tsx
- filings/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- FormModule
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- ui.tsx
- settings/actions.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- income.ts
- breadcrumb.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- zod
- staff/actions.ts
- parties/parties.test.ts
- template.ts
- coa.test.ts
- proof-upload.tsx
- index.ts
- accounts/page.tsx
- year/[year]/page.tsx
- acting-approver.test.ts
- worksheet/page.tsx
- filters.tsx
- copy-opencv.mjs
- checkbox.tsx
- SourceDocument
- ledger.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 168 edges
2. `cx` - 118 edges
3. `react` - 117 edges
4. `Notice()` - 115 edges
5. `Skeleton()` - 95 edges
6. `Button()` - 95 edges
7. `next` - 95 edges
8. `requireOwner()` - 88 edges
9. `Card()` - 87 edges
10. `Badge()` - 83 edges

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

## Communities (121 total, 16 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.09
Nodes (22): advanceFilingAction(), amount, SignOffState, stepData(), text(), Row, QueueFiling, QueueViewer (+14 more)

### Community 1 - "engine.ts"
Cohesion: 0.06
Nodes (69): GET(), shift(), Rule, digestMessage(), DigestRow, longDay(), peso, time() (+61 more)

### Community 2 - "Skeleton"
Cohesion: 0.18
Nodes (21): NewEmployee(), NewEmployeePage(), NewClientPage(), OwnerOnly(), ClientList(), ClientsPage(), FilingTable(), Deadlines() (+13 more)

### Community 3 - "manilaToday"
Cohesion: 0.11
Nodes (35): DocReviewActions(), Doc, DocumentsCard(), when(), DocumentReviewPage(), Review(), Row, Doc (+27 more)

### Community 4 - "vat.ts"
Cohesion: 0.17
Nodes (32): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, branchCode(), crlf(), csv() (+24 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.07
Nodes (38): approveDocumentAction(), DirectoryParty, typeLabel, DocActionState, LockFiling, lockingFiling(), checkFields(), Issue (+30 more)

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
Cohesion: 0.15
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, CloseCycleButton(), Message(), NothingToSubmitButton() (+14 more)

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
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "buildSawt"
Cohesion: 0.26
Nodes (10): ATC_MASTER, AtcInfo, normalizeAtc(), atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc() (+2 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

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
Cohesion: 0.16
Nodes (20): CheckedRegister, checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin(), parseName() (+12 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Notice"
Cohesion: 0.15
Nodes (47): ClientForm(), StaffOptions(), AccountForm(), EntryForm(), OpeningUpload(), SetupForm(), AssignForm(), ClientUserForm() (+39 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (64): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+56 more)

### Community 44 - "Centavos"
Cohesion: 0.09
Nodes (49): AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line (+41 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.09
Nodes (8): pg@^8.23.1, pg, ctx, input, root, root, root, root

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.09
Nodes (49): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+41 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.13
Nodes (29): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, VatData, FilingRow, loadWorksheet(), PAYROLL_FORM_CODES (+21 more)

### Community 48 - "fees/data.ts"
Cohesion: 0.14
Nodes (18): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+10 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "payroll/data.ts"
Cohesion: 0.18
Nodes (24): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), check(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), PayrollClient (+16 more)

### Community 51 - "quote.ts"
Cohesion: 0.09
Nodes (38): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items, PRICES (+30 more)

### Community 52 - "statement-view.tsx"
Cohesion: 0.14
Nodes (24): Detail(), StatementPage(), PortalClient, portalContext(), Detail(), PortalStatementDetail(), Latest(), PortalStatement() (+16 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (21): PartyFormState, setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols() (+13 more)

### Community 54 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (30): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+22 more)

### Community 55 - "supabaseServer"
Cohesion: 0.11
Nodes (25): nextConfig, next, ClientValues, EditClient(), EditClientPage(), nextEffectiveDate(), FeeSchedulePage(), Schedules() (+17 more)

### Community 56 - "[id]/payroll/page.tsx"
Cohesion: 0.28
Nodes (13): file(), GET(), safe(), Payroll(), PayrollPage(), GET(), employeesForMonth(), buildEmployeeTemplate() (+5 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 59 - "ledger/data.ts"
Cohesion: 0.15
Nodes (25): ReverseForm(), Books(), BooksPage(), dayBefore(), fmtDate(), monthEnd(), BooksClient, cents() (+17 more)

### Community 60 - "toCentavos"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 61 - "form-1601eq.ts"
Cohesion: 0.08
Nodes (42): lookupAtc(), AtcInfo, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), tinDigits() (+34 more)

### Community 62 - "server-only"
Cohesion: 0.20
Nodes (18): server-only, fieldErrors(), mergePartyAction(), savePartyAction(), runOcr(), SKIP, lookupParties(), fillFromDirectory() (+10 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.09
Nodes (41): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+33 more)

### Community 68 - "vitest"
Cohesion: 0.21
Nodes (17): vitest, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+9 more)

### Community 69 - "requireOwner"
Cohesion: 0.11
Nodes (30): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), updateClientAction(), frequencyLabel (+22 more)

### Community 70 - "react"
Cohesion: 0.17
Nodes (16): react, @remixicon/react, removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate() (+8 more)

### Community 71 - "books/actions.ts"
Cohesion: 0.26
Nodes (19): checkOpeningFile(), deleteAccountAction(), FormState, friendly(), OpeningState, path(), postEntryAction(), previewOpeningAction() (+11 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.20
Nodes (15): TAXPAYER_TYPES, TaxpayerType, count(), first(), pick(), profileFromQuery(), QuerySource, BOOKKEEPING_LEVELS (+7 more)

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
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.22
Nodes (16): loadItems(), loadSchedules(), loadTaxOnFee(), longDate(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL (+8 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "Card"
Cohesion: 0.14
Nodes (26): ApprovedTable(), ClientList(), countBy(), Documents(), DocumentsPage(), MonthCell(), one(), PendingTable() (+18 more)

### Community 80 - "percentage.ts"
Cohesion: 0.20
Nodes (22): comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), priorDiffWarning(), salesOf(), typedOrPrior() (+14 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (45): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), DashboardStats(), FilingListRow (+37 more)

### Community 83 - "button.tsx"
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

### Community 87 - "FormModule"
Cohesion: 0.20
Nodes (7): BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, modules, FormModule

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.11
Nodes (24): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+16 more)

### Community 92 - "ui.tsx"
Cohesion: 0.22
Nodes (16): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+8 more)

### Community 93 - "settings/actions.ts"
Cohesion: 0.22
Nodes (14): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), periodWord (+6 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

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

### Community 100 - "income.ts"
Cohesion: 0.23
Nodes (18): incomeAttachments(), inputs1701Q(), inputs1702Q(), Periods, periods(), REGIMES, inputsFor(), SawtResult (+10 more)

### Community 101 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "zod"
Cohesion: 0.21
Nodes (12): zod@^4.6.7, zod, addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchSchema (+4 more)

### Community 106 - "staff/actions.ts"
Cohesion: 0.13
Nodes (20): generateFilingsNow(), GenerateState, GenerateButton(), addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction() (+12 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.24
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+6 more)

### Community 108 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 109 - "coa.test.ts"
Cohesion: 0.15
Nodes (13): BIR_LINES, BirGroup, BirLine, BirLineKey, codes, PNL, FS_LINES, FsLine (+5 more)

### Community 110 - "proof-upload.tsx"
Cohesion: 0.18
Nodes (17): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+9 more)

### Community 111 - "index.ts"
Cohesion: 0.15
Nodes (14): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+6 more)

### Community 112 - "accounts/page.tsx"
Cohesion: 0.22
Nodes (11): Accounts(), AccountsPage(), GROUPS, dayBefore(), GET(), safe(), NewEntry(), NewEntryPage() (+3 more)

### Community 113 - "year/[year]/page.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "worksheet/page.tsx"
Cohesion: 0.39
Nodes (8): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage()

### Community 116 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 117 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "SourceDocument"
Cohesion: 0.33
Nodes (4): Split, EwtLine, ListedDocument, SourceDocument

### Community 120 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 800 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Skeleton`, `manilaToday`, `package.json`, `review-form.tsx`, `cycle/page.tsx`, `profile.ts`, `dependencies`, `fees/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `payroll/data.ts`, `statement-view.tsx`, `parties/[id]/page.tsx`, `supabaseServer`, `[id]/payroll/page.tsx`, `ledger/data.ts`, `sign-off-actions.tsx`, `cx`, `dropdown.tsx`, `requireOwner`, `books/actions.ts`, `settings/page.tsx`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `Card`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `ui.tsx`, `settings/actions.ts`, `social-button.tsx`, `file-upload.tsx`, `breadcrumb.tsx`, `zod`, `staff/actions.ts`, `proof-upload.tsx`, `accounts/page.tsx`, `year/[year]/page.tsx`, `worksheet/page.tsx`, `filters.tsx`, `checkbox.tsx`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09425287356321839 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `sign-off.ts`, `engine.ts`, `Skeleton`, `manilaToday`, `package.json`, `review-form.tsx`, `cycle/page.tsx`, `profile.ts`, `dependencies`, `fees/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `returns/load.ts`, `payroll/data.ts`, `statement-view.tsx`, `parties/[id]/page.tsx`, `[id]/payroll/page.tsx`, `src/app/layout.tsx`, `ledger/data.ts`, `server-only`, `sign-off-actions.tsx`, `requireOwner`, `react`, `books/actions.ts`, `settings/page.tsx`, `quote/page.tsx`, `Card`, `form-2316.tsx`, `filings/[id]/page.tsx`, `app/app/layout.tsx`, `ui.tsx`, `settings/actions.ts`, `social-button.tsx`, `breadcrumb.tsx`, `proxy.ts`, `zod`, `staff/actions.ts`, `proof-upload.tsx`, `accounts/page.tsx`, `year/[year]/page.tsx`, `worksheet/page.tsx`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.056948798328108674 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `sign-off.ts`, `engine.ts`, `package.json`, `review-form.tsx`, `cycle/page.tsx`, `profile.ts`, `scores/page.tsx`, `Centavos`, `ref_node_fs`, `[clientId]/page.tsx`, `returns/load.ts`, `fees/data.ts`, `quote.ts`, `payroll/payroll.test.ts`, `rates.ts`, `toCentavos`, `form-1601eq.ts`, `returns/types.ts`, `requireOwner`, `settings/page.tsx`, `filings/[id]/page.tsx`, `document-scanner.tsx`, `settings/actions.ts`, `social-button.tsx`, `db.test.ts`, `zod`, `staff/actions.ts`, `parties/parties.test.ts`, `template.ts`, `coa.test.ts`, `acting-approver.test.ts`, `filters.tsx`, `SourceDocument`, `ledger.test.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `manilaToday` be split into smaller, more focused modules?**
  _Cohesion score 0.1101010101010101 - nodes in this community are weakly interconnected._