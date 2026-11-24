# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 403 files · ~291,760 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2774 nodes · 8720 edges · 125 communities (109 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 89 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `34df02c7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- cycle/page.tsx
- worksheet/page.tsx
- app/documents/page.tsx
- next
- package.json
- gemini.ts
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
- server.ts
- Data Model & Security Docs
- fees/data.ts
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
- vitest
- Card
- returns/load.ts
- fees/[id]/page.tsx
- scripts
- statement-view.tsx
- quote.ts
- review-form.tsx
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- src/app/layout.tsx
- qap.ts
- books/page.tsx
- opening.ts
- certificate.ts
- parties/actions.ts
- sign-off-actions.tsx
- tabs.tsx
- cx
- Apple Design
- alphalist.ts
- testing.ts
- clients/actions.ts
- [id]/forms.tsx
- books/forms.tsx
- fees/types.ts
- Rules
- Animation Performance
- requireOwner
- stat-cards.tsx
- quote/page.tsx
- theme-toggle.tsx
- arap.ts
- vat.ts
- form-2316.tsx
- requireStaff
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- returns/types.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- react
- acting/run.ts
- sign-in-form.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- settings/actions.ts
- BoardUI page patterns
- proxy.ts
- boardui
- payroll/payroll.test.ts
- fields.ts
- payroll/payroll.test.ts
- fees/types.ts
- form-1601eq.ts
- proof-actions.ts
- branches/actions.ts
- portal/documents/page.tsx
- parties/parties.test.ts
- acting-approver.test.ts
- client-form.tsx
- proof-upload.tsx
- copy-opencv.mjs
- checkbox.tsx
- parties/[id]/page.tsx
- payment-actions.ts
- cycle/run.ts
- Building UIs with BoardUI
- filters.tsx
- SourceDocument

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 170 edges
2. `Notice()` - 121 edges
3. `cx` - 121 edges
4. `react` - 118 edges
5. `Button()` - 106 edges
6. `Skeleton()` - 97 edges
7. `next` - 96 edges
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

## Communities (125 total, 16 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.09
Nodes (22): advanceFilingAction(), amount, SignOffState, stepData(), text(), Row, QueueFiling, QueueViewer (+14 more)

### Community 1 - "cycle/page.tsx"
Cohesion: 0.06
Nodes (75): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), Rule, CloseCycleButton() (+67 more)

### Community 2 - "worksheet/page.tsx"
Cohesion: 0.15
Nodes (21): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+13 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.15
Nodes (22): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable(), ClientList(), countBy() (+14 more)

### Community 4 - "next"
Cohesion: 0.08
Nodes (34): nextConfig, next, ClientValues, DocumentsCard(), when(), EditClient(), EditClientPage(), StatusButton() (+26 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

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

### Community 11 - "ledger/types.ts"
Cohesion: 0.05
Nodes (39): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (50): BrandSettingsState, finishBrandUpload(), refresh(), SAVED, startBrandUpload(), BrandFileUpload(), upload(), FieldDef (+42 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "server.ts"
Cohesion: 0.26
Nodes (10): @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), runDocumentCycles(), supabaseEnv(), runFilingGeneration() (+2 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "fees/data.ts"
Cohesion: 0.15
Nodes (17): dateFmt, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+9 more)

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
Cohesion: 0.11
Nodes (34): file(), GET(), safe(), yearWorksheet(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction() (+26 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (31): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+23 more)

### Community 42 - "Notice"
Cohesion: 0.15
Nodes (46): ClientForm(), StaffOptions(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), EntryForm(), OpeningUpload() (+38 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.17
Nodes (28): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+20 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.15
Nodes (35): server-only, saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), GET(), applyRegister(), previewOf() (+27 more)

### Community 45 - "vitest"
Cohesion: 0.08
Nodes (10): pg@^8.23.1, pg, vitest, ctx, input, root, root, root (+2 more)

### Community 46 - "Card"
Cohesion: 0.12
Nodes (36): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+28 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.14
Nodes (29): recomputeWorksheetAction(), WorksheetState, dayBefore(), FilingRow, loadLedger(), loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet (+21 more)

### Community 48 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (32): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+24 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "statement-view.tsx"
Cohesion: 0.16
Nodes (20): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), PrintButton(), proofBadge (+12 more)

### Community 51 - "quote.ts"
Cohesion: 0.15
Nodes (21): buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches(), pesos() (+13 more)

### Community 52 - "review-form.tsx"
Cohesion: 0.18
Nodes (14): DocReviewActions(), approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel, ReplyForm(), ALLOWED (+6 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.14
Nodes (22): datAddress(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_ROLES, PARTY_SOURCES (+14 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.17
Nodes (24): NewClientPage(), OwnerOnly(), addChargeAction(), applyCreditAction(), date, depositSchema, peso, recordDepositAction() (+16 more)

### Community 56 - "Centavos"
Cohesion: 0.10
Nodes (30): GridRow, EntryLineOut, CheckedOpening, OpeningLine, AlphalistRow, AnnualSummary, MonthLines, PriorAmounts (+22 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "qap.ts"
Cohesion: 0.12
Nodes (20): PAYROLL_FORMS, totalsByAtc(), form0619E, form1601EQ, branchFromTin(), buildQapRows(), csvCell(), mmYYYY() (+12 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.12
Nodes (35): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+27 more)

### Community 60 - "opening.ts"
Cohesion: 0.16
Nodes (17): checkOpening(), fmt(), ItemRow, OpeningItem, sheetOf(), TbRow, accounts, buildOpeningTemplate() (+9 more)

### Community 61 - "certificate.ts"
Cohesion: 0.16
Nodes (19): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+11 more)

### Community 62 - "parties/actions.ts"
Cohesion: 0.25
Nodes (12): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), blank(), optionalText(), PartyInput (+4 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.29
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+2 more)

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
Cohesion: 0.28
Nodes (14): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+6 more)

### Community 68 - "testing.ts"
Cohesion: 0.14
Nodes (23): BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts(), cert2307() (+15 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.19
Nodes (14): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), assignmentSchema, clientFields, editClientSchema (+6 more)

### Community 70 - "[id]/forms.tsx"
Cohesion: 0.17
Nodes (17): FormState, removeAssignmentAction(), setClientStatusAction(), RemoveAssignmentButton(), RemoveClientUserButton(), addClientUserAction(), fieldErrors(), FormState (+9 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.20
Nodes (31): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction(), FormState (+23 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.14
Nodes (24): loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+16 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "requireOwner"
Cohesion: 0.17
Nodes (21): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+13 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (24): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+16 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.23
Nodes (14): loadSchedules(), longDate(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), Schedules(), COMPLEXITY_LABEL, Lines() (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (30): Nav(), PortalLayout(), baseTabs, payrollTab, PortalNav(), applyTheme(), applyThemeWithTransition(), createBlurCircleMask() (+22 more)

### Community 79 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 80 - "vat.ts"
Cohesion: 0.05
Nodes (115): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), ATC_MASTER, AtcInfo, lookupAtc() (+107 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 82 - "requireStaff"
Cohesion: 0.08
Nodes (56): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), FilingListRow, FilingTable() (+48 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (33): @remixicon/react, Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant (+25 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 87 - "returns/types.ts"
Cohesion: 0.15
Nodes (20): tinDashed(), PayrollClient, PayrollContext, agentLines(), agentProblems(), emptyResult(), PAYROLL_NOT_LOADED, form1601C (+12 more)

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
Cohesion: 0.12
Nodes (23): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+15 more)

### Community 92 - "react"
Cohesion: 0.11
Nodes (42): react, Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), NewEmployee(), NewEmployeePage() (+34 more)

### Community 93 - "acting/run.ts"
Cohesion: 0.33
Nodes (7): digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail()

### Community 94 - "sign-in-form.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.29
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "print/page.tsx"
Cohesion: 0.09
Nodes (39): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+31 more)

### Community 101 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.20
Nodes (8): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "payroll/payroll.test.ts"
Cohesion: 0.20
Nodes (19): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+11 more)

### Community 106 - "fields.ts"
Cohesion: 0.16
Nodes (17): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, LOW_CONFIDENCE (+9 more)

### Community 107 - "payroll/payroll.test.ts"
Cohesion: 0.15
Nodes (18): BirCategory, Category, CATEGORY_KEYS, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS (+10 more)

### Community 108 - "fees/types.ts"
Cohesion: 0.13
Nodes (18): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+10 more)

### Community 109 - "form-1601eq.ts"
Cohesion: 0.20
Nodes (15): agentBackground(), agentErrors(), tinDashed(), detailSchedule(), PREVIOUSLY_REMITTED, INPUTS, MONTH, QapAgent (+7 more)

### Community 110 - "proof-actions.ts"
Cohesion: 0.23
Nodes (11): zod@^4.6.7, zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema (+3 more)

### Community 111 - "branches/actions.ts"
Cohesion: 0.23
Nodes (10): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchSchema, branchUpdateSchema, groupByBranch() (+2 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.09
Nodes (40): Doc, EmployeeDetail(), EmployeePage(), Payroll(), PayrollPage(), Row, Doc, Documents() (+32 more)

### Community 113 - "parties/parties.test.ts"
Cohesion: 0.23
Nodes (11): runOcr(), SKIP, PARTY_COLUMNS, lookupParties(), person, fillFromDirectory(), branch4(), HEAD_OFFICE (+3 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "client-form.tsx"
Cohesion: 0.25
Nodes (11): frequencyLabel, Props, months, taxpayerTypeLabel, obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TAX_TYPES (+3 more)

### Community 116 - "proof-upload.tsx"
Cohesion: 0.29
Nodes (10): Detail(), PayNow(), METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof() (+2 more)

### Community 117 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "parties/[id]/page.tsx"
Cohesion: 0.36
Nodes (10): setPartyVerifiedAction(), MergeForm(), PartyForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+2 more)

### Community 120 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 121 - "cycle/run.ts"
Cohesion: 0.43
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 122 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 123 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 124 - "SourceDocument"
Cohesion: 0.33
Nodes (4): Split, EwtLine, ListedDocument, SourceDocument

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 844 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `cycle/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `next`, `package.json`, `profile.ts`, `dependencies`, `server.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `fees/[id]/page.tsx`, `statement-view.tsx`, `review-form.tsx`, `supabaseServer`, `books/page.tsx`, `sign-off-actions.tsx`, `tabs.tsx`, `cx`, `[id]/forms.tsx`, `books/forms.tsx`, `fees/types.ts`, `requireOwner`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `requireStaff`, `button.tsx`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `sign-in-form.tsx`, `file-upload.tsx`, `print/page.tsx`, `portal/documents/page.tsx`, `client-form.tsx`, `proof-upload.tsx`, `checkbox.tsx`, `parties/[id]/page.tsx`, `filters.tsx`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09425287356321839 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `sign-off.ts`, `cycle/page.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `package.json`, `profile.ts`, `dependencies`, `server.ts`, `register-xlsx.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `returns/load.ts`, `fees/[id]/page.tsx`, `statement-view.tsx`, `review-form.tsx`, `supabaseServer`, `src/app/layout.tsx`, `books/page.tsx`, `parties/actions.ts`, `sign-off-actions.tsx`, `cx`, `clients/actions.ts`, `[id]/forms.tsx`, `books/forms.tsx`, `fees/types.ts`, `requireOwner`, `quote/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `requireStaff`, `app/app/layout.tsx`, `react`, `sign-in-form.tsx`, `print/page.tsx`, `settings/actions.ts`, `proxy.ts`, `proof-actions.ts`, `branches/actions.ts`, `portal/documents/page.tsx`, `proof-upload.tsx`, `parties/[id]/page.tsx`, `payment-actions.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05637840420449116 - nodes in this community are weakly interconnected._
- **Why does `cx()` connect `form-2316.tsx` to `Building UIs with BoardUI`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `app/documents/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14814814814814814 - nodes in this community are weakly interconnected._