# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 521 files · ~411,203 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3439 nodes · 11291 edges · 147 communities (127 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 111 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `9f2c1ea2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off-actions.tsx
- generate.ts
- migrate.yml
- notification.tsx
- arap.ts
- devDependencies
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- settings/page.tsx
- Sign-in & Setup Docs
- steps.ts
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
- apply.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- ui.tsx
- pg
- register-xlsx.ts
- supabaseServer
- profile.ts
- scripts
- percentage.ts
- ledger/types.ts
- zod
- safeguards.ts
- payroll/types.ts
- server.ts
- alphalist.ts
- clients/actions.ts
- returns/types.ts
- books/page.tsx
- payroll/data.ts
- @remixicon/react
- fixed-assets.test.ts
- engine.ts
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- Badge
- parties/parties.test.ts
- books/forms.tsx
- clients/[id]/page.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- morning.ts
- theme-toggle.tsx
- quote/page.tsx
- safeguards-load.ts
- review-forms.tsx
- requireStaff
- button.tsx
- Pro components
- cx.ts
- file-upload.tsx
- workpapers/load.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- LinkButton
- server-only
- opening.ts
- Recipes
- portal/layout.tsx
- BoardUI theming reference
- Pro templates
- fixed-assets/forms.tsx
- print/page.tsx
- seed.ts
- BoardUI page patterns
- year/[year]/page.tsx
- boardui
- rates.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- filters.tsx
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- returns/load.ts
- payroll/payroll.test.ts
- acting-approver.test.ts
- post-button.tsx
- parties/parties.test.ts
- apply-migrations.sh
- showMonth
- filings/actions.ts
- register-books.test.ts
- breadcrumb.tsx
- workpapers/page.tsx
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- checkbox.tsx
- db.test.ts
- proof-actions.ts
- gap/page.tsx
- workpapers/load.ts
- app/documents/page.tsx
- src/app/layout.tsx
- copy-opencv.mjs
- ledger.test.ts
- ref_node_fs
- sign-in-form.tsx
- proxy.ts
- ledger-lock.test.ts
- vitest
- eslint.config.mjs
- books/reports/page.tsx
- parts.ts
- review-form.tsx
- manilaToday
- workpapers.test.ts
- fields.ts
- tests/parties.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 221 edges
2. `cx` - 151 edges
3. `Notice()` - 148 edges
4. `Button()` - 145 edges
5. `react` - 145 edges
6. `Skeleton()` - 126 edges
7. `next` - 122 edges
8. `Badge()` - 121 edges
9. `Card()` - 121 edges
10. `Input()` - 101 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `approved()` --indirect_call--> `client()`  [INFERRED]
  supabase/tests/register-books.test.ts → src/lib/deadlines/coverage.test.ts
- `BIR Deadline Engine (src/lib/deadlines)` --implements--> `Filing Obligations & Deadline Engine`  [INFERRED]
  README.md → docs/SPEC.md
- `Phase 1A Build Status` --implements--> `Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)`  [INFERRED]
  README.md → docs/SPEC.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (147 total, 20 thin omitted)

### Community 0 - "sign-off-actions.tsx"
Cohesion: 0.19
Nodes (13): ExplainForm(), AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck (+5 more)

### Community 1 - "generate.ts"
Cohesion: 0.13
Nodes (23): Rule, TimelineFiling, TimelineItem, IsoDate, DueRule, EfpsGroup, FilingChannel, FilingInstance (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.12
Nodes (17): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+9 more)

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

### Community 11 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "steps.ts"
Cohesion: 0.05
Nodes (87): ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+79 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (37): defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.10
Nodes (58): normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), costsOf() (+50 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "apply.ts"
Cohesion: 0.14
Nodes (22): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), previewOf(), RegisterPreview, totals(), lastDay() (+14 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Notice"
Cohesion: 0.12
Nodes (55): ClientForm(), AccountForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm(), OpeningUpload(), ReleaseReportForm(), SetupForm() (+47 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (45): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+37 more)

### Community 44 - "ui.tsx"
Cohesion: 0.08
Nodes (56): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), EditClient(), EditClientPage(), EmployeeDetail() (+48 more)

### Community 45 - "pg"
Cohesion: 0.10
Nodes (12): pg, templatePayload(), root, as(), client(), root, root, as() (+4 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.19
Nodes (20): file(), GET(), safe(), GET(), buildEmployeeTemplate(), sortItems(), registerHeaders(), buildRegisterTemplate() (+12 more)

### Community 47 - "supabaseServer"
Cohesion: 0.10
Nodes (45): removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction(), OwnerOnly(), addChargeAction(), applyCreditAction(), date, depositSchema (+37 more)

### Community 48 - "profile.ts"
Cohesion: 0.06
Nodes (60): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+52 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "percentage.ts"
Cohesion: 0.11
Nodes (55): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+47 more)

### Community 51 - "ledger/types.ts"
Cohesion: 0.07
Nodes (38): CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM, ASSETS, build() (+30 more)

### Community 52 - "zod"
Cohesion: 0.31
Nodes (7): zod@^4.6.7, zod, clientUserSchema, email, inviteStaffSchema, name, updateStaffSchema

### Community 53 - "safeguards.ts"
Cohesion: 0.18
Nodes (17): row(), documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), RISK_LABELS, RISK_ORDER, riskOf(), RiskState (+9 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "server.ts"
Cohesion: 0.08
Nodes (39): Doc, BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Row, Event, eventText (+31 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.23
Nodes (18): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+10 more)

### Community 57 - "clients/actions.ts"
Cohesion: 0.12
Nodes (27): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), updateClientAction(), addBranchAction(), BranchState, errors() (+19 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (50): ATC_MASTER, AtcInfo, lookupAtc(), agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal (+42 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.15
Nodes (26): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm() (+18 more)

### Community 60 - "payroll/data.ts"
Cohesion: 0.12
Nodes (35): server-only, @supabase/supabase-js, MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES (+27 more)

### Community 61 - "@remixicon/react"
Cohesion: 0.11
Nodes (35): nextConfig, next, react, RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row (+27 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "engine.ts"
Cohesion: 0.22
Nodes (18): compareIso(), isWeekend(), lastDayOfMonth(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), generateFilingInstances(), nextWorkingDay() (+10 more)

### Community 64 - "tabs.tsx"
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
Nodes (24): FinancialStatements, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+16 more)

### Community 68 - "vitest"
Cohesion: 0.17
Nodes (19): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+11 more)

### Community 69 - "Badge"
Cohesion: 0.13
Nodes (26): amt(), one(), shiftMonth(), SignStatus(), STATUS, TieRow(), Workpapers(), WorkpapersPage() (+18 more)

### Community 70 - "parties/parties.test.ts"
Cohesion: 0.21
Nodes (16): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, fillFromDirectory() (+8 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (36): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+28 more)

### Community 72 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm(), RemoveAssignmentButton() (+16 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (26): Access, STATUS, Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor() (+18 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "morning.ts"
Cohesion: 0.20
Nodes (14): GET(), Email, line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+6 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.08
Nodes (52): PriceRow, COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+44 more)

### Community 80 - "safeguards-load.ts"
Cohesion: 0.20
Nodes (14): ClientValues, TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, client() (+6 more)

### Community 81 - "review-forms.tsx"
Cohesion: 0.23
Nodes (13): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+5 more)

### Community 82 - "requireStaff"
Cohesion: 0.10
Nodes (44): DashboardStats(), FilingTable(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE, WHO (+36 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 87 - "workpapers/load.ts"
Cohesion: 0.14
Nodes (13): RegisterLine, LedgerTotals, purchases(), sales(), base, books, buy, sale (+5 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.16
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+9 more)

### Community 92 - "LinkButton"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 93 - "server-only"
Cohesion: 0.17
Nodes (16): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+8 more)

### Community 94 - "opening.ts"
Cohesion: 0.14
Nodes (19): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "portal/layout.tsx"
Cohesion: 0.20
Nodes (11): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+3 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (45): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+37 more)

### Community 101 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "year/[year]/page.tsx"
Cohesion: 0.46
Nodes (7): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 106 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+26 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.15
Nodes (20): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names (+12 more)

### Community 108 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 109 - "settings/actions.ts"
Cohesion: 0.14
Nodes (19): generateFilingsNow(), GenerateState, GenerateButton(), addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow (+11 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.09
Nodes (49): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+41 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "returns/load.ts"
Cohesion: 0.09
Nodes (41): recomputeWorksheetAction(), WorksheetState, loadAssets(), LOCKED_STATUSES, Split, VatData, dayBefore(), FilingRow (+33 more)

### Community 113 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (65): GridRow, AlphalistRow, buildAlphalist(), Certificates2316, form2316(), Form2316Data, Form2316Employer, Form2316Line (+57 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 116 - "parties/parties.test.ts"
Cohesion: 0.18
Nodes (19): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), normalizeTin(), runOcr(), SKIP (+11 more)

### Community 118 - "showMonth"
Cohesion: 0.06
Nodes (62): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift() (+54 more)

### Community 119 - "filings/actions.ts"
Cohesion: 0.33
Nodes (11): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), SignOffState, stepData(), text(), tieOutsBlocking() (+3 more)

### Community 120 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 121 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 123 - "workpapers/page.tsx"
Cohesion: 0.28
Nodes (18): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+10 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.11
Nodes (16): Row, QueueFiling, QueueViewer, ReviewQueue, ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS (+8 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 131 - "proof-actions.ts"
Cohesion: 0.21
Nodes (13): send(), amount, date, ProofState, refresh(), rejectProofAction(), StartProof, startProofUpload() (+5 more)

### Community 132 - "gap/page.tsx"
Cohesion: 0.10
Nodes (21): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), estimateProfile(), gapFor(), GapRow (+13 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (19): Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote, ALWAYS (+11 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.13
Nodes (24): approveSelectedAction(), BOOKED, BulkState, key(), ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList() (+16 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.13
Nodes (4): ctx, input, root, root

### Community 141 - "sign-in-form.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 144 - "vitest"
Cohesion: 0.10
Nodes (6): vitest, root, root, root, root, root

### Community 145 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 146 - "books/reports/page.tsx"
Cohesion: 0.18
Nodes (17): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReports(), Reports(), when() (+9 more)

### Community 147 - "parts.ts"
Cohesion: 0.16
Nodes (17): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+9 more)

### Community 148 - "review-form.tsx"
Cohesion: 0.10
Nodes (25): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, ALLOWED, DocActionState (+17 more)

### Community 149 - "manilaToday"
Cohesion: 0.11
Nodes (31): @remixicon/react, amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Detail() (+23 more)

### Community 150 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 151 - "fields.ts"
Cohesion: 0.12
Nodes (20): msgs(), ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms() (+12 more)

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1003 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `@remixicon/react` to `sign-off-actions.tsx`, `checkbox.tsx`, `notification.tsx`, `gap/page.tsx`, `devDependencies`, `app/documents/page.tsx`, `settings/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `books/reports/page.tsx`, `statements.ts`, `review-form.tsx`, `manilaToday`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `ui.tsx`, `profile.ts`, `server.ts`, `books/page.tsx`, `payroll/data.ts`, `tabs.tsx`, `dropdown.tsx`, `Badge`, `books/forms.tsx`, `clients/[id]/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `review-forms.tsx`, `requireStaff`, `button.tsx`, `cx.ts`, `file-upload.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `portal/layout.tsx`, `fixed-assets/forms.tsx`, `print/page.tsx`, `year/[year]/page.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `filters.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `post-button.tsx`, `showMonth`, `breadcrumb.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `generate.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13105413105413105 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `generate.ts`, `db.test.ts`, `gap/page.tsx`, `devDependencies`, `arap.ts`, `gemini.ts`, `app/documents/page.tsx`, `workpapers/load.ts`, `settings/page.tsx`, `ref_node_fs`, `steps.ts`, `sign-in-form.tsx`, `ledger-lock.test.ts`, `ledger.test.ts`, `statements.ts`, `parts.ts`, `review-form.tsx`, `workpapers.test.ts`, `fields.ts`, `tests/parties.test.ts`, `apply.ts`, `scores/page.tsx`, `pg`, `profile.ts`, `ledger/types.ts`, `zod`, `safeguards.ts`, `clients/actions.ts`, `returns/types.ts`, `@remixicon/react`, `fixed-assets.test.ts`, `engine.ts`, `vitest`, `parties/parties.test.ts`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `morning.ts`, `quote/page.tsx`, `safeguards-load.ts`, `requireStaff`, `workpapers/load.ts`, `document-scanner.tsx`, `server-only`, `opening.ts`, `print/page.tsx`, `rates.ts`, `[clientId]/page.tsx`, `filters.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `returns/load.ts`, `payroll/payroll.test.ts`, `acting-approver.test.ts`, `showMonth`, `register-books.test.ts`, `sign-off.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `next` connect `@remixicon/react` to `sign-off-actions.tsx`, `proof-actions.ts`, `gap/page.tsx`, `devDependencies`, `app/documents/page.tsx`, `src/app/layout.tsx`, `settings/page.tsx`, `steps.ts`, `sign-in-form.tsx`, `dependencies`, `proxy.ts`, `books/reports/page.tsx`, `review-form.tsx`, `manilaToday`, `apply.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `ui.tsx`, `register-xlsx.ts`, `supabaseServer`, `profile.ts`, `ledger/types.ts`, `server.ts`, `clients/actions.ts`, `books/page.tsx`, `payroll/data.ts`, `Badge`, `books/forms.tsx`, `clients/[id]/page.tsx`, `opening-checklist.tsx`, `morning.ts`, `quote/page.tsx`, `review-forms.tsx`, `requireStaff`, `app/app/layout.tsx`, `LinkButton`, `server-only`, `portal/layout.tsx`, `fixed-assets/forms.tsx`, `print/page.tsx`, `year/[year]/page.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fees/[id]/page.tsx`, `returns/load.ts`, `post-button.tsx`, `parties/parties.test.ts`, `showMonth`, `filings/actions.ts`, `breadcrumb.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._