# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 423 files · ~311,091 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2926 nodes · 9330 edges · 130 communities (113 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `8ff8d0c6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- next
- cycle/page.tsx
- worksheet/page.tsx
- app/documents/page.tsx
- registrations/forms.tsx
- package.json
- documents/[id]/page.tsx
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
- register-xlsx.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- quote/page.tsx
- scripts
- next
- breadcrumb.tsx
- clients/[id]/page.tsx
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- alphalist.ts
- src/app/layout.tsx
- returns/types.ts
- cycle/page.tsx
- opening.ts
- payroll/payroll.test.ts
- Centavos
- sign-off-actions.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- qap.ts
- vitest
- react
- gemini.ts
- books/forms.tsx
- formToObject
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- parties/actions.ts
- theme-toggle.tsx
- arap.ts
- income.ts
- form-2316.tsx
- filings/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- collections/page.tsx
- generate-qap-fixture.mjs
- cx
- document-scanner.tsx
- app/app/layout.tsx
- Skeleton
- generate-filings/route.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- boardui/SKILL.md
- Pro templates
- db.test.ts
- print/page.tsx
- settings/actions.ts
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- parties/parties.test.ts
- [month]/page.tsx
- quote.ts
- book-income.ts
- proof-actions.ts
- receipts.ts
- portal/documents/page.tsx
- @remixicon/react
- acting-approver.test.ts
- clients/actions.ts
- ledger.test.ts
- login/actions.ts
- checkbox.tsx
- copy-opencv.mjs
- brand/forms.tsx
- BoardUI theming reference
- generate-filings/route.ts
- documents/period.ts
- zod
- fees/forms.tsx
- cycle-forms.tsx
- money.ts
- brand/actions.ts
- sign-in-form.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 183 edges
2. `Notice()` - 133 edges
3. `cx` - 127 edges
4. `react` - 126 edges
5. `Button()` - 115 edges
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

## Communities (130 total, 17 thin omitted)

### Community 0 - "next"
Cohesion: 0.10
Nodes (21): nextConfig, next, server-only, approveDocumentAction(), advanceFilingAction(), amount, stepData(), text() (+13 more)

### Community 1 - "cycle/page.tsx"
Cohesion: 0.09
Nodes (43): Rule, PlannedObligation, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup (+35 more)

### Community 2 - "worksheet/page.tsx"
Cohesion: 0.08
Nodes (37): Event, eventText, Filing(), FilingPage(), paymentText, when(), Lines(), lineStyle (+29 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.17
Nodes (20): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), ApprovedTable(), ClientList(), countBy(), Documents() (+12 more)

### Community 4 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (75): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+67 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "documents/[id]/page.tsx"
Cohesion: 0.14
Nodes (18): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, LOW_CONFIDENCE (+10 more)

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
Cohesion: 0.06
Nodes (56): GROUPS, AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE (+48 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.13
Nodes (19): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+11 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.06
Nodes (59): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+51 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.19
Nodes (27): sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, branchCode(), crlf(), csv(), csvCell() (+19 more)

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
Nodes (29): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), totals(), PayrollItem, sortItems() (+21 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "Notice"
Cohesion: 0.15
Nodes (45): ClientForm(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), EntryForm(), OpeningUpload(), PermitForm() (+37 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (44): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+36 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.15
Nodes (28): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), Form2316Signatory, paidInYear(), Payroll2316Raw (+20 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.07
Nodes (10): pg@^8.23.1, pg, ctx, input, root, root, root, root (+2 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.23
Nodes (19): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+11 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.11
Nodes (31): recomputeWorksheetAction(), WorksheetState, EwtLine, dayBefore(), FilingRow, ListedDocument, loadLedger(), loadWorksheet() (+23 more)

### Community 48 - "quote/page.tsx"
Cohesion: 0.08
Nodes (58): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+50 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "next"
Cohesion: 0.17
Nodes (22): Detail(), StatementPage(), BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard() (+14 more)

### Community 51 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 52 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): removeAssignmentAction(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+16 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (19): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+11 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.17
Nodes (23): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+15 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.11
Nodes (32): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+24 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.09
Nodes (38): BUSINESS_TAX_FORMS, agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS, MONTH (+30 more)

### Community 59 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (21): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Home(), PortalHome(), NothingToSubmitButton() (+13 more)

### Community 60 - "opening.ts"
Cohesion: 0.14
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 61 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (28): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+20 more)

### Community 62 - "Centavos"
Cohesion: 0.12
Nodes (25): GridRow, MonthLines, PriorAmounts, Suggestion, CheckedRegister, NewEmployeeRow, MonthInput, Employee (+17 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (33): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+25 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "qap.ts"
Cohesion: 0.10
Nodes (29): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+21 more)

### Community 68 - "vitest"
Cohesion: 0.16
Nodes (22): vitest, form1701Q, form1702Q, individual, form2551Q, individual, amounts(), cert2307() (+14 more)

### Community 69 - "react"
Cohesion: 0.11
Nodes (21): react, DocReviewActions(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel, BranchOption, BranchOptions() (+13 more)

### Community 70 - "gemini.ts"
Cohesion: 0.13
Nodes (15): OCR_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+7 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction(), FormState (+28 more)

### Community 72 - "formToObject"
Cohesion: 0.16
Nodes (19): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), addClientUserAction(), fieldErrors(), FormState (+11 more)

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
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "parties/actions.ts"
Cohesion: 0.20
Nodes (16): normalizeTin(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), fillFromDirectory(), blank() (+8 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (32): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), reportsTab, applyTheme() (+24 more)

### Community 79 - "arap.ts"
Cohesion: 0.16
Nodes (17): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+9 more)

### Community 80 - "income.ts"
Cohesion: 0.12
Nodes (49): BOOK_FIGURES, COMPARISON_COLUMNS, comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), incomeAttachments() (+41 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, Certificates() (+21 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.10
Nodes (40): DashboardStats(), FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), ActingNotice(), AmendmentNotice(), DashboardPage() (+32 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 86 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 87 - "collections/page.tsx"
Cohesion: 0.16
Nodes (22): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+14 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "cx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.13
Nodes (21): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+13 more)

### Community 92 - "Skeleton"
Cohesion: 0.14
Nodes (27): @remixicon/react, Accounts(), AccountsPage(), NewEntry(), NewEntryPage(), NewEmployee(), NewEmployeePage(), Payroll() (+19 more)

### Community 93 - "generate-filings/route.ts"
Cohesion: 0.18
Nodes (13): digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail(), cycleMessage() (+5 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (49): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate() (+41 more)

### Community 101 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

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
Cohesion: 0.25
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+9 more)

### Community 106 - "parties/parties.test.ts"
Cohesion: 0.24
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+6 more)

### Community 107 - "[month]/page.tsx"
Cohesion: 0.21
Nodes (22): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), GET() (+14 more)

### Community 108 - "quote.ts"
Cohesion: 0.06
Nodes (60): PriceRow, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), items (+52 more)

### Community 109 - "book-income.ts"
Cohesion: 0.33
Nodes (8): BirLineKey, isBirLine(), BookIncome, bookIncome(), INCOME_GROUPS, linesWithMovement(), IncomeSource, LedgerMovement

### Community 110 - "proof-actions.ts"
Cohesion: 0.23
Nodes (12): send(), amount, date, refresh(), rejectProofAction(), StartProof, startProofUpload(), submitProof() (+4 more)

### Community 111 - "receipts.ts"
Cohesion: 0.17
Nodes (14): daysBetween(), expiryStatus(), firmBlockLines(), formatTin(), parseSection(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS (+6 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.12
Nodes (31): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+23 more)

### Community 113 - "@remixicon/react"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "clients/actions.ts"
Cohesion: 0.10
Nodes (29): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), updateClientAction(), EditClient() (+21 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 117 - "login/actions.ts"
Cohesion: 0.24
Nodes (9): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+1 more)

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 120 - "brand/forms.tsx"
Cohesion: 0.18
Nodes (11): BrandSettingsState, FieldDef, FIELDS, pesoInput(), SUBMIT, BRAND_FILES, BrandFileKind, INVOICE_METHODS (+3 more)

### Community 121 - "BoardUI theming reference"
Cohesion: 0.33
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 122 - "generate-filings/route.ts"
Cohesion: 0.31
Nodes (8): GET(), generateFilingsNow(), GenerateState, GenerateButton(), runOcrAction(), supabaseEnv(), runFilingGeneration(), supabaseAdmin()

### Community 123 - "documents/period.ts"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 124 - "zod"
Cohesion: 0.29
Nodes (11): zod, accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+3 more)

### Community 125 - "fees/forms.tsx"
Cohesion: 0.29
Nodes (9): ActivateForm(), billingHint, NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm(), SettingsValues, ReplyForm() (+1 more)

### Community 126 - "cycle-forms.tsx"
Cohesion: 0.38
Nodes (9): CloseCycleButton(), DecideExceptionForm(), Message(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+1 more)

### Community 127 - "money.ts"
Cohesion: 0.33
Nodes (7): incomePayment(), applyRate(), basisPoints(), grossUp(), grouped, sum(), toCentavos()

### Community 128 - "brand/actions.ts"
Cohesion: 0.36
Nodes (8): finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload(), upload()

### Community 129 - "sign-in-form.tsx"
Cohesion: 0.43
Nodes (6): errors, Form(), LoginPage(), SignInForm(), Divider(), SocialButton()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 874 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `next`, `sign-in-form.tsx`, `worksheet/page.tsx`, `app/documents/page.tsx`, `registrations/forms.tsx`, `package.json`, `ledger/types.ts`, `dependencies`, `statements.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `[clientId]/page.tsx`, `quote/page.tsx`, `next`, `breadcrumb.tsx`, `clients/[id]/page.tsx`, `parties/[id]/page.tsx`, `cycle/page.tsx`, `sign-off-actions.tsx`, `tabs.tsx`, `dropdown.tsx`, `books/forms.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `collections/page.tsx`, `cx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Skeleton`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `[month]/page.tsx`, `portal/documents/page.tsx`, `@remixicon/react`, `clients/actions.ts`, `checkbox.tsx`, `brand/forms.tsx`, `generate-filings/route.ts`, `documents/period.ts`, `fees/forms.tsx`, `cycle-forms.tsx`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `next` be split into smaller, more focused modules?**
  _Cohesion score 0.10338680926916222 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `brand/actions.ts`, `worksheet/page.tsx`, `app/documents/page.tsx`, `registrations/forms.tsx`, `package.json`, `ledger/types.ts`, `dependencies`, `statements.ts`, `register-xlsx.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `[clientId]/page.tsx`, `returns/load.ts`, `quote/page.tsx`, `next`, `breadcrumb.tsx`, `clients/[id]/page.tsx`, `parties/[id]/page.tsx`, `supabaseServer`, `src/app/layout.tsx`, `cycle/page.tsx`, `sign-off-actions.tsx`, `react`, `books/forms.tsx`, `formToObject`, `settings/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `collections/page.tsx`, `app/app/layout.tsx`, `Skeleton`, `print/page.tsx`, `settings/actions.ts`, `proxy.ts`, `[month]/page.tsx`, `proof-actions.ts`, `portal/documents/page.tsx`, `clients/actions.ts`, `login/actions.ts`, `brand/forms.tsx`, `generate-filings/route.ts`, `zod`, `cycle-forms.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09333333333333334 - nodes in this community are weakly interconnected._
- **Should `worksheet/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.07676767676767676 - nodes in this community are weakly interconnected._
- **Should `registrations/forms.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.059006211180124224 - nodes in this community are weakly interconnected._