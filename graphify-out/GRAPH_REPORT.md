# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 433 files · ~324,821 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3007 nodes · 9643 edges · 141 communities (122 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 103 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `0b5ead61`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- supabaseServer
- cycle/page.tsx
- sign-off.ts
- app/documents/page.tsx
- registrations/forms.tsx
- devDependencies
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
- [month]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- [clientId]/page.tsx
- registrations/forms.tsx
- fees/[id]/page.tsx
- scripts
- manilaToday
- ledger/data.ts
- LinkButton
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- Centavos
- src/app/layout.tsx
- returns/types.ts
- books/page.tsx
- opening.ts
- register-xlsx.ts
- Centavos
- sign-off-actions.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- buildSawt
- vitest
- clients/[id]/page.tsx
- certificate.ts
- books/forms.tsx
- Skeleton
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- templatePayload
- theme-toggle.tsx
- arap.ts
- income.ts
- form-2316.tsx
- acting-approver/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- formatAmount
- generate-qap-fixture.mjs
- cx
- document-scanner.tsx
- app/app/layout.tsx
- Skeleton
- fees/types.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- percentage.ts
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- books/reports/page.tsx
- register-xlsx.ts
- quote.ts
- settings/actions.ts
- proof-upload.tsx
- requireOwner
- manilaToday
- @remixicon/react
- acting-approver.test.ts
- Card
- ledger.test.ts
- portal/layout.tsx
- schedule.ts
- fees/[id]/page.tsx
- fees/types.ts
- server.ts
- react
- staff/page.tsx
- buildSawt
- proof-actions.ts
- package.json
- pg
- worksheet/page.tsx
- breadcrumb.tsx
- returns/load.ts
- brand/forms.tsx
- fees/data.ts
- staff/page.tsx
- sign-in-form.tsx
- Badge
- branches/actions.ts
- eslint.config.mjs
- copy-opencv.mjs
- ledger-lock.test.ts
- ledger-documents.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 184 edges
2. `Notice()` - 137 edges
3. `react` - 127 edges
4. `cx` - 127 edges
5. `Button()` - 118 edges
6. `Skeleton()` - 109 edges
7. `next` - 103 edges
8. `Card()` - 98 edges
9. `requireOwner()` - 96 edges
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

## Communities (141 total, 19 thin omitted)

### Community 0 - "supabaseServer"
Cohesion: 0.13
Nodes (19): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+11 more)

### Community 1 - "cycle/page.tsx"
Cohesion: 0.08
Nodes (53): shift(), Rule, PlannedObligation, addDays(), addMonths(), compareIso(), IsoDate, isWeekend() (+45 more)

### Community 2 - "sign-off.ts"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 4 - "registrations/forms.tsx"
Cohesion: 0.14
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 5 - "devDependencies"
Cohesion: 0.14
Nodes (14): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react-dom@^19, vitest@^5.1.1 (+6 more)

### Community 6 - "fields.ts"
Cohesion: 0.13
Nodes (24): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel, checkFields(), Issue, num() (+16 more)

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
Cohesion: 0.14
Nodes (15): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+7 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (47): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+39 more)

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

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): defaultCashFlow(), loadStatements(), FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (41): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult (+33 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "[month]/page.tsx"
Cohesion: 0.13
Nodes (29): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+21 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "Notice"
Cohesion: 0.13
Nodes (50): AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), CloseYearForm(), EntryForm(), OpeningUpload(), PermitForm() (+42 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (39): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+31 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.21
Nodes (24): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), applyRegister() (+16 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.13
Nodes (4): ctx, input, root, root

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (20): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+12 more)

### Community 47 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (85): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+77 more)

### Community 48 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (24): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+16 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.09
Nodes (38): nextConfig, next, @remixicon/react, Detail(), StatementPage(), FilingListRow, SignOffActions(), PortalClient (+30 more)

### Community 51 - "ledger/data.ts"
Cohesion: 0.11
Nodes (29): Accounts(), AccountsPage(), GROUPS, BookEntry, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL (+21 more)

### Community 52 - "LinkButton"
Cohesion: 0.11
Nodes (35): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+27 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (19): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names (+11 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.09
Nodes (34): advanceFilingAction(), amendFilingAction(), amount, SignOffState, stepData(), text(), recomputeWorksheetAction(), WorksheetState (+26 more)

### Community 56 - "Centavos"
Cohesion: 0.07
Nodes (41): GridRow, EntryLineOut, CheckedOpening, OpeningLine, Note, StatementLine, AlphalistRow, AnnualSummary (+33 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (51): Split, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule() (+43 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.20
Nodes (18): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+10 more)

### Community 60 - "opening.ts"
Cohesion: 0.19
Nodes (16): PriceRow, buildQuote(), cents(), CustomQuoteItem, inRange(), matches(), pesos(), QuoteLine (+8 more)

### Community 61 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (30): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET(), sortItems(), checkRegister(), fmt() (+22 more)

### Community 62 - "Centavos"
Cohesion: 0.16
Nodes (21): Cycle(), CyclePage(), CycleWithClient, DocRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+13 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.29
Nodes (4): DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, NON_INDIVIDUAL

### Community 64 - "tabs.tsx"
Cohesion: 0.06
Nodes (42): DropdownDivider(), DropdownGroup(), DropdownItem(), DropdownPopover(), DropdownTrigger(), InputOtp(), InputOtpProps, Kbd() (+34 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.09
Nodes (36): react-aria-components@^1.22.1, react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownGroupProps, DropdownItemProps, DropdownPopoverProps (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "buildSawt"
Cohesion: 0.19
Nodes (17): partyTinLabel(), toSource(), amount(), approvedFields(), buildPriorFigures(), DocumentRow, isApproved(), monthInPeriod() (+9 more)

### Community 68 - "vitest"
Cohesion: 0.12
Nodes (29): vitest, form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual (+21 more)

### Community 69 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (27): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm() (+19 more)

### Community 70 - "certificate.ts"
Cohesion: 0.13
Nodes (28): EmployeeDetail(), EmployeePage(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+20 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction() (+28 more)

### Community 72 - "Skeleton"
Cohesion: 0.16
Nodes (29): NewEntry(), NewEntryPage(), Certificates(), Form2316Page(), ClientList(), ClientsPage(), DashboardStats(), FilingTable() (+21 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.17
Nodes (21): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+13 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (23): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+15 more)

### Community 77 - "templatePayload"
Cohesion: 0.24
Nodes (5): templatePayload(), root, as(), books(), root

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (32): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), reportsTab, applyTheme() (+24 more)

### Community 79 - "arap.ts"
Cohesion: 0.17
Nodes (16): checkOpening(), fmt(), ItemRow, OpeningItem, sheetOf(), TbRow, accounts, buildOpeningTemplate() (+8 more)

### Community 80 - "income.ts"
Cohesion: 0.12
Nodes (38): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+30 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "acting-approver/page.tsx"
Cohesion: 0.14
Nodes (23): Queue(), ReviewPage(), Row, Section(), Acting(), ActingApproverPage(), Approval, stateBadge (+15 more)

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

### Community 87 - "formatAmount"
Cohesion: 0.09
Nodes (49): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+41 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "cx"
Cohesion: 0.13
Nodes (24): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+16 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+11 more)

### Community 92 - "Skeleton"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 93 - "fees/types.ts"
Cohesion: 0.14
Nodes (20): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, digestMessage(), DigestRow, longDay() (+12 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (47): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+39 more)

### Community 101 - "percentage.ts"
Cohesion: 0.23
Nodes (23): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+15 more)

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
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 106 - "books/reports/page.tsx"
Cohesion: 0.17
Nodes (19): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+11 more)

### Community 107 - "register-xlsx.ts"
Cohesion: 0.21
Nodes (16): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), lookupParties(), blank(), optionalText() (+8 more)

### Community 108 - "quote.ts"
Cohesion: 0.12
Nodes (24): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items, PRICES (+16 more)

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "proof-upload.tsx"
Cohesion: 0.29
Nodes (10): Detail(), PayNow(), METHODS, ProofUpload(), send(), ProofState, startProofUpload(), submitProof() (+2 more)

### Community 111 - "requireOwner"
Cohesion: 0.10
Nodes (36): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), EditClient() (+28 more)

### Community 112 - "manilaToday"
Cohesion: 0.09
Nodes (38): Doc, DocumentsCard(), when(), Payroll(), PayrollPage(), ExceptionRow, Row, Doc (+30 more)

### Community 113 - "@remixicon/react"
Cohesion: 0.20
Nodes (16): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview() (+8 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Card"
Cohesion: 0.17
Nodes (20): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable(), ClientList(), countBy() (+12 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 118 - "schedule.ts"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "fees/[id]/page.tsx"
Cohesion: 0.28
Nodes (13): ActivateForm(), billingHint, DeleteDraftButton(), NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm(), SettingsValues (+5 more)

### Community 120 - "fees/types.ts"
Cohesion: 0.16
Nodes (16): count(), first(), pick(), profileFromQuery(), QuerySource, items, suggestedAnnualItems(), BILLINGS (+8 more)

### Community 121 - "server.ts"
Cohesion: 0.23
Nodes (8): GET(), GET(), code, email, SignInState, signInWithGoogle(), supabaseEnv(), safeNextPath()

### Community 122 - "react"
Cohesion: 0.16
Nodes (15): react, NewEmployee(), NewEmployeePage(), EmployeeForm(), GenerateButton(), AddBranchForm(), BranchRowForm(), Branches() (+7 more)

### Community 123 - "staff/page.tsx"
Cohesion: 0.26
Nodes (12): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, nameTokens(), ResolvedParty (+4 more)

### Community 124 - "buildSawt"
Cohesion: 0.25
Nodes (12): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+4 more)

### Community 125 - "proof-actions.ts"
Cohesion: 0.23
Nodes (11): zod@^4.6.7, zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema (+3 more)

### Community 126 - "package.json"
Cohesion: 0.18
Nodes (10): @techstark/opencv-js@4.12.0-release.1, @types/react@^19, typescript@^5, name, packageManager, private, version, @techstark/opencv-js (+2 more)

### Community 127 - "pg"
Cohesion: 0.18
Nodes (4): pg@^8.23.1, pg, root, root

### Community 128 - "worksheet/page.tsx"
Cohesion: 0.31
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 129 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 130 - "returns/load.ts"
Cohesion: 0.24
Nodes (10): FinancialStatements, dayBefore(), FilingRow, ListedDocument, loadLedger(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+2 more)

### Community 131 - "brand/forms.tsx"
Cohesion: 0.38
Nodes (6): FieldDef, FIELDS, pesoInput(), Result(), SUBMIT, TaxForm()

### Community 132 - "fees/data.ts"
Cohesion: 0.21
Nodes (13): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+5 more)

### Community 133 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 134 - "sign-in-form.tsx"
Cohesion: 0.36
Nodes (8): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

### Community 135 - "Badge"
Cohesion: 0.43
Nodes (7): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), Badge()

### Community 136 - "branches/actions.ts"
Cohesion: 0.48
Nodes (6): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema

### Community 137 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 896 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `supabaseServer`, `worksheet/page.tsx`, `breadcrumb.tsx`, `app/documents/page.tsx`, `brand/forms.tsx`, `fees/data.ts`, `fields.ts`, `Badge`, `staff/page.tsx`, `sign-in-form.tsx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `manilaToday`, `ledger/data.ts`, `parties/[id]/page.tsx`, `books/page.tsx`, `Centavos`, `tabs.tsx`, `dropdown.tsx`, `clients/[id]/page.tsx`, `certificate.ts`, `books/forms.tsx`, `Skeleton`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `acting-approver/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `formatAmount`, `cx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Skeleton`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `books/reports/page.tsx`, `proof-upload.tsx`, `requireOwner`, `manilaToday`, `@remixicon/react`, `Card`, `schedule.ts`, `fees/[id]/page.tsx`, `package.json`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `supabaseServer`, `cycle/page.tsx`, `app/documents/page.tsx`, `registrations/forms.tsx`, `devDependencies`, `fields.ts`, `ledger-lock.test.ts`, `ledger-documents.test.ts`, `profile.ts`, `statements.ts`, `[month]/page.tsx`, `scores/page.tsx`, `ref_node_fs`, `[clientId]/page.tsx`, `registrations/forms.tsx`, `fees/[id]/page.tsx`, `ledger/data.ts`, `LinkButton`, `returns/types.ts`, `Centavos`, `buildSawt`, `clients/[id]/page.tsx`, `certificate.ts`, `settings/page.tsx`, `templatePayload`, `arap.ts`, `acting-approver/page.tsx`, `formatAmount`, `document-scanner.tsx`, `fees/types.ts`, `db.test.ts`, `print/page.tsx`, `rates.ts`, `quote.ts`, `settings/actions.ts`, `requireOwner`, `acting-approver.test.ts`, `Card`, `ledger.test.ts`, `fees/types.ts`, `server.ts`, `staff/page.tsx`, `package.json`, `pg`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Why does `next` connect `manilaToday` to `supabaseServer`, `worksheet/page.tsx`, `breadcrumb.tsx`, `brand/forms.tsx`, `fees/data.ts`, `fields.ts`, `Badge`, `branches/actions.ts`, `profile.ts`, `dependencies`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `fees/[id]/page.tsx`, `ledger/data.ts`, `parties/[id]/page.tsx`, `supabaseServer`, `src/app/layout.tsx`, `books/page.tsx`, `register-xlsx.ts`, `Centavos`, `clients/[id]/page.tsx`, `certificate.ts`, `books/forms.tsx`, `Skeleton`, `settings/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `acting-approver/page.tsx`, `formatAmount`, `app/app/layout.tsx`, `Skeleton`, `fees/types.ts`, `print/page.tsx`, `proxy.ts`, `books/reports/page.tsx`, `register-xlsx.ts`, `settings/actions.ts`, `proof-upload.tsx`, `requireOwner`, `manilaToday`, `@remixicon/react`, `Card`, `fees/[id]/page.tsx`, `server.ts`, `react`, `proof-actions.ts`, `package.json`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._