# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 468 files · ~366,687 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3188 nodes · 10357 edges · 131 communities (113 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 107 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `be7a19ec`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- engine.ts
- migrate.yml
- app/documents/page.tsx
- opening.ts
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- register/page.tsx
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
- clients/[id]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- certificate.ts
- ref_node_fs
- gemini.ts
- registrations/forms.tsx
- payroll/data.ts
- scripts
- manilaToday
- ledger/types.ts
- returns/types.ts
- safeguards.ts
- payroll/types.ts
- supabaseServer
- money.ts
- safeguards-load.ts
- form-1601eq.ts
- ledger/data.ts
- quote.ts
- payroll/payroll.test.ts
- cycle/page.tsx
- [clientId]/page.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- source.ts
- vitest
- @supabase/supabase-js
- books/reports/page.tsx
- books/forms.tsx
- @remixicon/react
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- compute1702RT
- theme-toggle.tsx
- collections/actions.ts
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
- PageHeader
- server-only
- social-button.tsx
- Recipes
- requireOwner
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- zod
- BoardUI page patterns
- arap.ts
- boardui
- rates.ts
- fees/types.ts
- parties/actions.ts
- quote/page.tsx
- settings/actions.ts
- filters.tsx
- registrations/[id]/page.tsx
- react
- acting-approver.test.ts
- templatePayload
- apply-migrations.sh
- cx.ts
- fees/[id]/page.tsx
- Badge
- zod
- fees/data.ts
- review/page.tsx
- Staff and Owner UX review (Phase 1)
- Textarea
- parties/parties.test.ts
- staff/forms.tsx
- gap.ts
- checkbox.tsx
- template.ts
- copy-opencv.mjs
- src/app/layout.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 199 edges
2. `Notice()` - 146 edges
3. `cx` - 143 edges
4. `react` - 136 edges
5. `Button()` - 125 edges
6. `Skeleton()` - 121 edges
7. `next` - 113 edges
8. `Card()` - 110 edges
9. `Badge()` - 107 edges
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

## Communities (131 total, 18 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.17
Nodes (12): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, client, owner, preparer (+4 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (47): Rule, PlannedObligation, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, DueRule (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.16
Nodes (19): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable(), ClientList(), countBy(), Documents() (+11 more)

### Community 4 - "opening.ts"
Cohesion: 0.13
Nodes (21): CashFlowClass, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload() (+13 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.12
Nodes (23): Booking, DirectoryParty, ENTRY_STATUS, typeLabel, checkFields(), Issue, num(), msgs() (+15 more)

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
Cohesion: 0.06
Nodes (61): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amt() (+53 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (21): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+13 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (40): CASH_FLOW_CLASSES, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.12
Nodes (48): atcInfo(), atcKind(), normalizeAtc(), incomeAttachments(), Periods, periods(), buildSawt(), incomePayment() (+40 more)

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
Cohesion: 0.13
Nodes (22): ClientValues, frequencyLabel, Props, AssignForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail() (+14 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (36): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+28 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (56): ClientForm(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm(), OpeningUpload() (+48 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (54): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+46 more)

### Community 44 - "certificate.ts"
Cohesion: 0.17
Nodes (19): Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+11 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.06
Nodes (11): pg, ctx, input, root, root, root, root, root (+3 more)

### Community 46 - "gemini.ts"
Cohesion: 0.11
Nodes (22): runOcrAction(), OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+14 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (59): StaffOptions(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+51 more)

### Community 48 - "payroll/data.ts"
Cohesion: 0.11
Nodes (38): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+30 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.15
Nodes (22): Detail(), StatementPage(), portalContext(), Payroll(), PortalPayroll(), STATUS, when(), PortalReport() (+14 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.10
Nodes (22): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+14 more)

### Community 52 - "returns/types.ts"
Cohesion: 0.09
Nodes (46): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+38 more)

### Community 53 - "safeguards.ts"
Cohesion: 0.13
Nodes (22): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+14 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.09
Nodes (31): nextConfig, next, EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), ClientList(), ClientsPage() (+23 more)

### Community 56 - "money.ts"
Cohesion: 0.18
Nodes (17): computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation(), monthlyTable(), monthlyWithholding() (+9 more)

### Community 57 - "safeguards-load.ts"
Cohesion: 0.22
Nodes (11): TAX_TYPES, CoverageClient, coverageGaps(), Gap, GapKind, BoardRow, FilingRow, holidaySet() (+3 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.07
Nodes (48): BUSINESS_TAX_FORMS, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel() (+40 more)

### Community 59 - "ledger/data.ts"
Cohesion: 0.10
Nodes (37): Accounts(), AccountsPage(), GROUPS, AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+29 more)

### Community 60 - "quote.ts"
Cohesion: 0.12
Nodes (25): PriceRow, buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos() (+17 more)

### Community 61 - "payroll/payroll.test.ts"
Cohesion: 0.09
Nodes (40): BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ItemKind, KIND_ORDER (+32 more)

### Community 62 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Home(), PortalHome(), CloseCycleButton() (+21 more)

### Community 63 - "[clientId]/page.tsx"
Cohesion: 0.12
Nodes (30): ClientCollectionsPage(), Deposit, Due, Client, CollectionsPage(), OpenDue, Overview(), RunBilling() (+22 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.06
Nodes (42): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+34 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.07
Nodes (40): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+32 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "source.ts"
Cohesion: 0.08
Nodes (44): FinancialStatements, ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, AtcKind, BUSINESS_TAX_ATCS (+36 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (19): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+11 more)

### Community 69 - "@supabase/supabase-js"
Cohesion: 0.27
Nodes (8): @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 70 - "books/reports/page.tsx"
Cohesion: 0.26
Nodes (12): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), PrintButton() (+4 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (35): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+27 more)

### Community 72 - "@remixicon/react"
Cohesion: 0.07
Nodes (47): @remixicon/react, PortalRequest(), RequestDetail(), LabelProps, CloseRequestButton(), ReplyForm(), send(), Thread() (+39 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.13
Nodes (30): RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote (+22 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "compute1702RT"
Cohesion: 0.22
Nodes (25): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+17 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "collections/actions.ts"
Cohesion: 0.29
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+5 more)

### Community 80 - "income.ts"
Cohesion: 0.09
Nodes (43): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), form1701, form1702RT (+35 more)

### Community 81 - "collections/forms.tsx"
Cohesion: 0.30
Nodes (13): Detail(), maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm(), OpenItem, PaymentAccount, ReasonAction() (+5 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.18
Nodes (22): ActingState, appointActingAction(), endActingAction(), refresh(), EndButton(), Acting(), ActingApproverPage(), Approval (+14 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "morning.ts"
Cohesion: 0.42
Nodes (8): Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), runMorningEmail()

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (26): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+18 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.13
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "PageHeader"
Cohesion: 0.10
Nodes (42): NewEntry(), NewEntryPage(), EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), PrintAll(), PrintAll2316Page() (+34 more)

### Community 93 - "server-only"
Cohesion: 0.18
Nodes (15): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+7 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "requireOwner"
Cohesion: 0.11
Nodes (36): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+28 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (41): exceljs, BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR (+33 more)

### Community 101 - "zod"
Cohesion: 0.31
Nodes (7): zod@^4.6.7, zod, clientUserSchema, email, inviteStaffSchema, name, updateStaffSchema

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "arap.ts"
Cohesion: 0.12
Nodes (25): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+17 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.20
Nodes (14): count(), first(), pick(), profileFromQuery(), QuerySource, items, BOOKKEEPING_LEVELS, BookkeepingLevel (+6 more)

### Community 107 - "parties/actions.ts"
Cohesion: 0.24
Nodes (13): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), blank(), optionalText(), PartyInput, partySchema (+5 more)

### Community 108 - "quote/page.tsx"
Cohesion: 0.29
Nodes (10): loadTaxOnFee(), longDate(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL (+2 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), HolidayForm() (+7 more)

### Community 110 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 111 - "registrations/[id]/page.tsx"
Cohesion: 0.11
Nodes (41): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+33 more)

### Community 112 - "react"
Cohesion: 0.09
Nodes (40): react, DocReviewActions(), Doc, DocumentsCard(), when(), Payroll(), PayrollPage(), ExceptionRow (+32 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 116 - "templatePayload"
Cohesion: 0.12
Nodes (9): templatePayload(), BOOK_LOCK_FORMS, as(), books(), root, root, asCommit(), failsAtCommit() (+1 more)

### Community 118 - "cx.ts"
Cohesion: 0.10
Nodes (18): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+10 more)

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 120 - "Badge"
Cohesion: 0.10
Nodes (42): FilingListRow, FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO (+34 more)

### Community 121 - "zod"
Cohesion: 0.14
Nodes (19): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+11 more)

### Community 122 - "fees/data.ts"
Cohesion: 0.17
Nodes (13): dateFmt, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, optionalAmount (+5 more)

### Community 123 - "review/page.tsx"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Textarea"
Cohesion: 0.17
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text(), AmendFilingForm(), checkTone (+10 more)

### Community 126 - "parties/parties.test.ts"
Cohesion: 0.12
Nodes (32): fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols() (+24 more)

### Community 127 - "staff/forms.tsx"
Cohesion: 0.60
Nodes (4): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm()

### Community 128 - "gap.ts"
Cohesion: 0.16
Nodes (18): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+10 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 133 - "template.ts"
Cohesion: 0.29
Nodes (4): DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, NON_INDIVIDUAL

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 141 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 940 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `checkbox.tsx`, `app/documents/page.tsx`, `package.json`, `review-form.tsx`, `register/page.tsx`, `profile.ts`, `dependencies`, `statements.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `registrations/forms.tsx`, `payroll/data.ts`, `manilaToday`, `supabaseServer`, `ledger/data.ts`, `cycle/page.tsx`, `[clientId]/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `@supabase/supabase-js`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `collections/forms.tsx`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `PageHeader`, `social-button.tsx`, `requireOwner`, `print/page.tsx`, `quote/page.tsx`, `settings/actions.ts`, `filters.tsx`, `registrations/[id]/page.tsx`, `cx.ts`, `fees/[id]/page.tsx`, `Badge`, `zod`, `Textarea`, `parties/parties.test.ts`, `staff/forms.tsx`?**
  _High betweenness centrality (0.139) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08145363408521303 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `app/documents/page.tsx`, `package.json`, `review-form.tsx`, `register/page.tsx`, `profile.ts`, `src/app/layout.tsx`, `dependencies`, `clients/[id]/page.tsx`, `scores/page.tsx`, `payroll/forms.tsx`, `registrations/forms.tsx`, `payroll/data.ts`, `manilaToday`, `ledger/data.ts`, `cycle/page.tsx`, `[clientId]/page.tsx`, `tabs.tsx`, `@supabase/supabase-js`, `books/reports/page.tsx`, `books/forms.tsx`, `@remixicon/react`, `settings/page.tsx`, `theme-toggle.tsx`, `collections/actions.ts`, `acting-approver/page.tsx`, `app/app/layout.tsx`, `PageHeader`, `server-only`, `requireOwner`, `print/page.tsx`, `arap.ts`, `parties/actions.ts`, `quote/page.tsx`, `settings/actions.ts`, `registrations/[id]/page.tsx`, `react`, `fees/[id]/page.tsx`, `Badge`, `zod`, `Textarea`, `parties/parties.test.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `opening.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12807881773399016 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.09195402298850575 - nodes in this community are weakly interconnected._