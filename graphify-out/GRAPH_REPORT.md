# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 400 files · ~288,846 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2754 nodes · 8651 edges · 118 communities (101 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `af786318`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- cycle/page.tsx
- money.ts
- app/documents/page.tsx
- clients/[id]/page.tsx
- package.json
- fields.ts
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
- Badge
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- @remixicon/react
- next
- review/page.tsx
- books/page.tsx
- opening.ts
- social-button.tsx
- parties/actions.ts
- react
- tabs.tsx
- cx
- Apple Design
- Centavos
- testing.ts
- clients/actions.ts
- manilaToday
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
- acting-approver/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- returns/types.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- Skeleton
- server-only
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
- worksheet/page.tsx
- filings/labels.ts
- template.ts
- fees/page.tsx
- auth.ts
- branches/actions.ts
- portal/documents/page.tsx
- acting-approver.test.ts
- brand/forms.tsx
- copy-opencv.mjs
- checkbox.tsx
- ledger.test.ts

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

## Communities (118 total, 17 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.13
Nodes (20): Event, eventText, Filing(), FilingPage(), paymentText, when(), PaymentCheck, ACTION_LABEL (+12 more)

### Community 1 - "cycle/page.tsx"
Cohesion: 0.05
Nodes (80): Cycle(), CycleWithClient, DocRow, shift(), Rule, Home(), PortalHome(), CloseCycleButton() (+72 more)

### Community 2 - "money.ts"
Cohesion: 0.16
Nodes (18): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings(), PayrollClient (+10 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (23): ClientSelect(), BOOKED_TYPES, loadBooking(), Booking, ApprovedTable(), ClientList(), countBy(), Documents() (+15 more)

### Community 4 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (38): FormState, removeAssignmentAction(), setClientStatusAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions() (+30 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "fields.ts"
Cohesion: 0.07
Nodes (36): approveDocumentAction(), checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+28 more)

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
Nodes (40): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, BRAND_FILES, BrandFileKind, birSchema, blank() (+32 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, server-only@^0.0.1, @supabase/supabase-js@^2.119.2 (+5 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "server.ts"
Cohesion: 0.23
Nodes (11): @supabase/supabase-js, generateFilingsNow(), GenerateState, GenerateButton(), addClientUserAction(), fieldErrors(), inviteStaffAction(), supabaseEnv() (+3 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "fees/data.ts"
Cohesion: 0.14
Nodes (18): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+10 more)

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
Cohesion: 0.12
Nodes (31): file(), GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), buildEmployeeTemplate() (+23 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "Notice"
Cohesion: 0.14
Nodes (43): AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), EntryForm(), OpeningUpload(), PermitForm(), SetupForm() (+35 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (56): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+48 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.10
Nodes (43): GET(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+35 more)

### Community 45 - "vitest"
Cohesion: 0.07
Nodes (12): pg@^8.23.1, pg, vitest, BOOK_LOCK_FORMS, ctx, input, root, root (+4 more)

### Community 46 - "Card"
Cohesion: 0.11
Nodes (43): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+35 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.13
Nodes (27): recomputeWorksheetAction(), WorksheetState, GET(), FilingRow, ListedDocument, loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet (+19 more)

### Community 48 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "statement-view.tsx"
Cohesion: 0.14
Nodes (23): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Latest(), PortalStatement(), Detail(), PayNow() (+15 more)

### Community 51 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 52 - "Badge"
Cohesion: 0.26
Nodes (13): DocReviewActions(), DocumentsCard(), when(), Payroll(), PayrollPage(), Review(), Payroll(), PortalPayroll() (+5 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.12
Nodes (32): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+24 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.22
Nodes (17): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+9 more)

### Community 56 - "@remixicon/react"
Cohesion: 0.21
Nodes (11): @remixicon/react@^4.9.0, @remixicon/react, PortalClient, portalContext(), Nav(), PortalLayout(), baseTabs, payrollTab (+3 more)

### Community 57 - "next"
Cohesion: 0.13
Nodes (13): nextConfig, next, Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), inter (+5 more)

### Community 58 - "review/page.tsx"
Cohesion: 0.26
Nodes (10): Queue(), ReviewPage(), Row, Section(), showDate(), QueueFiling, QueueViewer, ReviewQueue (+2 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.10
Nodes (37): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+29 more)

### Community 60 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 61 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 62 - "parties/actions.ts"
Cohesion: 0.18
Nodes (19): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), runOcr(), SKIP (+11 more)

### Community 63 - "react"
Cohesion: 0.12
Nodes (23): react, DirectoryParty, ENTRY_STATUS, typeLabel, checkTone, checkWord, needsNote(), noteLabel() (+15 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "cx"
Cohesion: 0.06
Nodes (50): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+42 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "Centavos"
Cohesion: 0.11
Nodes (31): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+23 more)

### Community 68 - "testing.ts"
Cohesion: 0.21
Nodes (16): individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput, lineNo() (+8 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.15
Nodes (20): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), obligationChanges(), obligationsForTaxTypes(), PlannedObligation (+12 more)

### Community 70 - "manilaToday"
Cohesion: 0.34
Nodes (12): DashboardStats(), FilingTable(), Deadlines(), DeadlinesPage(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView() (+4 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (38): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction(), FormState (+30 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.11
Nodes (30): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+22 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "requireOwner"
Cohesion: 0.13
Nodes (33): removeHolidayAction(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+25 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.24
Nodes (14): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "arap.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 80 - "vat.ts"
Cohesion: 0.06
Nodes (106): normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), BUSINESS_TAX_FORMS (+98 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.19
Nodes (19): ActingState, appointActingAction(), endActingAction(), refresh(), EndButton(), Acting(), ActingApproverPage(), Approval (+11 more)

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
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 87 - "returns/types.ts"
Cohesion: 0.06
Nodes (64): tinDashed(), PayrollContext, ATC_MASTER, AtcInfo, lookupAtc(), agentLines(), agentProblems(), emptyResult() (+56 more)

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
Cohesion: 0.15
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+11 more)

### Community 92 - "Skeleton"
Cohesion: 0.15
Nodes (21): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), ClientList(), ClientsPage(), CyclePage(), DocumentReviewPage() (+13 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (16): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+8 more)

### Community 94 - "sign-in-form.tsx"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

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

### Community 100 - "print/page.tsx"
Cohesion: 0.09
Nodes (39): BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR, BOOK_KINDS (+31 more)

### Community 101 - "settings/actions.ts"
Cohesion: 0.26
Nodes (11): addHolidayAction(), fieldErrors(), refreshAfterChange(), RuleRow, SettingsState, updateRuleAction(), checkbox, dayBefore() (+3 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "payroll/payroll.test.ts"
Cohesion: 0.13
Nodes (28): GridRow, MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+20 more)

### Community 106 - "worksheet/page.tsx"
Cohesion: 0.36
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 107 - "filings/labels.ts"
Cohesion: 0.31
Nodes (8): FilingListRow, PortalReturns(), Returns(), Row, FILED, filingStatusLabel, filingStatusTone, fmt

### Community 108 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 109 - "fees/page.tsx"
Cohesion: 0.46
Nodes (7): longDate(), nextEffectiveDate(), CreateFromTemplateForm(), NewDraftForm(), StartNewVersionForm(), FeeSchedulePage(), Schedules()

### Community 110 - "auth.ts"
Cohesion: 0.11
Nodes (24): zod@^4.6.7, zod, advanceFilingAction(), amount, SignOffState, stepData(), text(), send() (+16 more)

### Community 111 - "branches/actions.ts"
Cohesion: 0.48
Nodes (6): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.10
Nodes (30): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+22 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "brand/forms.tsx"
Cohesion: 0.17
Nodes (21): finishBrandUpload(), StartBrandUpload, startBrandUpload(), BrandFileUpload(), upload(), FieldDef, FIELDS, pesoInput() (+13 more)

### Community 117 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 120 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 840 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `cycle/page.tsx`, `money.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `package.json`, `dependencies`, `server.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Card`, `fees/[id]/page.tsx`, `statement-view.tsx`, `Badge`, `parties/[id]/page.tsx`, `@remixicon/react`, `next`, `review/page.tsx`, `books/page.tsx`, `social-button.tsx`, `tabs.tsx`, `cx`, `manilaToday`, `books/forms.tsx`, `requireOwner`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Skeleton`, `sign-in-form.tsx`, `file-upload.tsx`, `print/page.tsx`, `worksheet/page.tsx`, `filings/labels.ts`, `fees/page.tsx`, `portal/documents/page.tsx`, `brand/forms.tsx`, `checkbox.tsx`?**
  _High betweenness centrality (0.192) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12681159420289856 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `filings/[id]/page.tsx`, `cycle/page.tsx`, `money.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `package.json`, `fields.ts`, `profile.ts`, `dependencies`, `server.ts`, `register-xlsx.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `Card`, `returns/load.ts`, `fees/[id]/page.tsx`, `statement-view.tsx`, `Badge`, `parties/[id]/page.tsx`, `supabaseServer`, `@remixicon/react`, `review/page.tsx`, `books/page.tsx`, `parties/actions.ts`, `react`, `cx`, `clients/actions.ts`, `manilaToday`, `books/forms.tsx`, `requireOwner`, `quote/page.tsx`, `form-2316.tsx`, `acting-approver/page.tsx`, `app/app/layout.tsx`, `Skeleton`, `server-only`, `sign-in-form.tsx`, `print/page.tsx`, `settings/actions.ts`, `proxy.ts`, `worksheet/page.tsx`, `filings/labels.ts`, `fees/page.tsx`, `auth.ts`, `branches/actions.ts`, `portal/documents/page.tsx`, `brand/forms.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0516404581634634 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/[id]/page.tsx`, `cycle/page.tsx`, `money.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `package.json`, `fields.ts`, `ledger/types.ts`, `profile.ts`, `fees/data.ts`, `scores/page.tsx`, `payroll/data.ts`, `Card`, `returns/load.ts`, `quote.ts`, `parties/[id]/page.tsx`, `review/page.tsx`, `opening.ts`, `testing.ts`, `clients/actions.ts`, `fees/types.ts`, `requireOwner`, `arap.ts`, `vat.ts`, `acting-approver/page.tsx`, `returns/types.ts`, `document-scanner.tsx`, `server-only`, `sign-in-form.tsx`, `db.test.ts`, `print/page.tsx`, `settings/actions.ts`, `payroll/payroll.test.ts`, `template.ts`, `acting-approver.test.ts`, `ledger.test.ts`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **Should `app/documents/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12413793103448276 - nodes in this community are weakly interconnected._