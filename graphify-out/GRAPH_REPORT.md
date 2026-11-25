# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 667 files · ~519,092 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 4196 nodes · 14424 edges · 152 communities (135 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 121 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `19c89240`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- manilaToday
- filings/run.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- registrations/forms.tsx
- Sign-in & Setup Docs
- onboarding/page.tsx
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
- payroll/payroll.test.ts
- scores/page.tsx
- income.ts
- payroll/types.ts
- settlement-pages.tsx
- social-button.tsx
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- Badge
- lock-bar.tsx
- app/requests/page.tsx
- Centavos
- react
- money.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- ui.tsx
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- payroll/payroll.test.ts
- returns/books.test.ts
- party-pages.tsx
- brand/actions.ts
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- getIdentity
- theme-toggle.tsx
- fees/types.ts
- Card
- clients/[id]/page.tsx
- sign-off.ts
- button.tsx
- Pro components
- cx.ts
- collections/forms.tsx
- formatAmount
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- eslint.config.mjs
- ledger/types.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- leads/[id]/page.tsx
- [month]/page.tsx
- branches/page.tsx
- boardui
- rates.ts
- proof-actions.ts
- parties/[id]/page.tsx
- db.test.ts
- module-pages.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- acting-approver.test.ts
- ledger/data.ts
- staff/page.tsx
- apply-migrations.sh
- portal/page.tsx
- module-pages.tsx
- review/page.tsx
- returns/load.ts
- addDays
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- app/app/page.tsx
- cycle/page.tsx
- checkbox.tsx
- server-only
- documents/labels.ts
- tieouts.test.ts
- review-form.tsx
- @remixicon/react
- app/documents/page.tsx
- gemini.ts
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- settings/actions.ts
- proxy.ts
- 2316/page.tsx
- @remixicon/react
- LinkButton
- manilaToday
- safeguards.ts
- staff/actions.ts
- requireOwner
- requireOwner
- BoardUI page patterns
- payroll/register.ts
- Rework: one flow from lead to year-end
- InvoiceList
- leads/actions.ts
- leads-pipeline.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 273 edges
2. `Skeleton()` - 202 edges
3. `react` - 202 edges
4. `cx` - 196 edges
5. `Notice()` - 195 edges
6. `Button()` - 176 edges
7. `Card()` - 157 edges
8. `next` - 157 edges
9. `Badge()` - 150 edges
10. `Input()` - 127 edges

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

## Communities (152 total, 17 thin omitted)

### Community 0 - "manilaToday"
Cohesion: 0.22
Nodes (12): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+4 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.08
Nodes (47): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 4 - "arap.ts"
Cohesion: 0.16
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "fields.ts"
Cohesion: 0.10
Nodes (25): BatchRow, checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+17 more)

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

### Community 11 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (58): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+50 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+22 more)

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
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, FS_LINES, FsLine (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.13
Nodes (43): incomeAttachments(), Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+35 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (25): GET(), safe(), file(), GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction() (+17 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (34): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), OwnerView(), ClientRow, order (+26 more)

### Community 42 - "income.ts"
Cohesion: 0.10
Nodes (63): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+55 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 44 - "settlement-pages.tsx"
Cohesion: 0.15
Nodes (21): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props, SETTLEMENT_KINDS, SettlementEdit() (+13 more)

### Community 45 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (45): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+37 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.07
Nodes (48): BrandFileUpload(), FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm() (+40 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.07
Nodes (49): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+41 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "Badge"
Cohesion: 0.15
Nodes (31): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+23 more)

### Community 54 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (30): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+22 more)

### Community 55 - "app/requests/page.tsx"
Cohesion: 0.13
Nodes (27): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalClient, portalContext(), Payroll() (+19 more)

### Community 56 - "Centavos"
Cohesion: 0.06
Nodes (65): GridRow, EntryLineOut, Note, StatementLine, AlphaCols, alphaCols(), Alphalist, AlphalistAgent (+57 more)

### Community 57 - "react"
Cohesion: 0.10
Nodes (26): react, INVOICE_KINDS, InvoiceEdit(), Kind, Props, STATUS_TONE, JournalRoute(), PaymentsNewPage() (+18 more)

### Community 58 - "money.ts"
Cohesion: 0.06
Nodes (64): agentProblems(), amountText(), emptyResult(), form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS, form1604C (+56 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (61): BatchUpload(), PreviewTable(), AccountForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm(), OpeningUpload(), ReleaseReportForm() (+53 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (25): ClientNoteForm(), RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote (+17 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.07
Nodes (59): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+51 more)

### Community 62 - "ui.tsx"
Cohesion: 0.11
Nodes (19): DocReviewActions(), DocumentsCard(), when(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, NewParty() (+11 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 64 - "cx"
Cohesion: 0.08
Nodes (28): SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps, SegmentedControlVariant, Thumb, IconComponent, PillTab() (+20 more)

### Community 65 - "select.tsx"
Cohesion: 0.06
Nodes (51): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Dropdown(), DropdownContext, DropdownContextValue (+43 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (36): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet(), grossCompensation() (+28 more)

### Community 68 - "returns/books.test.ts"
Cohesion: 0.07
Nodes (38): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), client, form1701, form1702RT (+30 more)

### Community 69 - "party-pages.tsx"
Cohesion: 0.20
Nodes (12): BooksList(), Column, ListRow, RowLink(), CustomersRoute(), EmployeesRoute(), Employees(), KINDS (+4 more)

### Community 70 - "brand/actions.ts"
Cohesion: 0.17
Nodes (14): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), upload() (+6 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+31 more)

### Community 72 - "formatAmount"
Cohesion: 0.15
Nodes (23): BankAccountsRoute(), booksContext(), BooksContext, fmtMonth(), one(), SearchParams, BankAccounts(), dayBefore() (+15 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.09
Nodes (33): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, accountFromRow(), Amendment, AmendmentStatus (+25 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (47): DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent, PlainStatCard(), Stat (+39 more)

### Community 77 - "getIdentity"
Cohesion: 0.34
Nodes (12): ReplyForm(), send(), getIdentity(), closeRequestAction(), createRequestAction(), openTicketAction(), refresh(), replyRequest() (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "fees/types.ts"
Cohesion: 0.06
Nodes (65): PriceRow, COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total() (+57 more)

### Community 80 - "Card"
Cohesion: 0.12
Nodes (40): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+32 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.12
Nodes (29): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm() (+21 more)

### Community 82 - "sign-off.ts"
Cohesion: 0.19
Nodes (11): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, client, owner, preparer, reviewer (+3 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (25): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+17 more)

### Community 86 - "collections/forms.tsx"
Cohesion: 0.33
Nodes (9): AddChargeForm(), ApplyCreditButton(), BillingDaysForm(), OpenItem, PaymentAccount, ReasonAction(), RecordDepositForm(), Result() (+1 more)

### Community 87 - "formatAmount"
Cohesion: 0.14
Nodes (21): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+13 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.14
Nodes (8): api, ctx, fn, rows, src, as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (26): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+18 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.16
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+11 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.18
Nodes (18): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+10 more)

### Community 93 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 94 - "ledger/types.ts"
Cohesion: 0.13
Nodes (23): checkUpdate(), CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload() (+15 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.12
Nodes (30): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), Release2316Form(), yearWorksheet(), PayrollYear() (+22 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.09
Nodes (33): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), UnlockRequests() (+25 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (39): NotesCard(), FunnelSwitch(), ReopenForm(), Lead(), LeadPage(), Person, day(), Leads() (+31 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.16
Nodes (19): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p() (+11 more)

### Community 103 - "branches/page.tsx"
Cohesion: 0.67
Nodes (4): AddBranchForm(), BranchRowForm(), Branches(), BranchesPage()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.24
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+10 more)

### Community 106 - "proof-actions.ts"
Cohesion: 0.12
Nodes (24): zod@^4.6.7, zod, accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh() (+16 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (56): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+48 more)

### Community 108 - "db.test.ts"
Cohesion: 0.09
Nodes (8): outDir, pkgDir, require, { version }, root, HASH, LEAD, root

### Community 109 - "module-pages.tsx"
Cohesion: 0.22
Nodes (18): fmtDate(), InvoiceView(), JournalEntryRoute(), INVOICE_LABEL, JournalView(), Payslips(), Props, PayslipsRoute() (+10 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (28): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+20 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ledger/data.ts"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm() (+17 more)

### Community 116 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 118 - "portal/page.tsx"
Cohesion: 0.18
Nodes (18): MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard(), PortalHome() (+10 more)

### Community 119 - "module-pages.tsx"
Cohesion: 0.09
Nodes (35): blankLine(), InvoiceForm(), InvoiceFormValue, SettingsPage(), SettingsRoute(), PickOption, appliesTo(), canGoOn() (+27 more)

### Community 120 - "review/page.tsx"
Cohesion: 0.13
Nodes (25): Queue(), ReviewPage(), Row, Section(), EndButton(), Acting(), ActingApproverPage(), Approval (+17 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.06
Nodes (64): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+56 more)

### Community 122 - "addDays"
Cohesion: 0.12
Nodes (27): CyclePage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, Action() (+19 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (42): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+34 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "app/app/page.tsx"
Cohesion: 0.09
Nodes (39): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), DashboardStat, DashboardStats() (+31 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.14
Nodes (26): Cycle(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+18 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.11
Nodes (28): server-only, @supabase/supabase-js, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow (+20 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.08
Nodes (40): Doc, ExceptionRow, approveDocumentAction(), Row, Doc, Documents(), FolderKey, FOLDERS (+32 more)

### Community 132 - "tieouts.test.ts"
Cohesion: 0.15
Nodes (9): client(), RegisterRow, base, books, buy, sale, approved(), as() (+1 more)

### Community 133 - "review-form.tsx"
Cohesion: 0.11
Nodes (29): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Booking, BooksChoices() (+21 more)

### Community 135 - "@remixicon/react"
Cohesion: 0.14
Nodes (24): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), credit() (+16 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (30): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+22 more)

### Community 137 - "gemini.ts"
Cohesion: 0.11
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheckView(), StepForm() (+3 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.03
Nodes (52): pg, vitest, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST (+44 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 144 - "2316/page.tsx"
Cohesion: 0.31
Nodes (12): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Set(), Form2316Sheet() (+4 more)

### Community 148 - "@remixicon/react"
Cohesion: 0.30
Nodes (10): @remixicon/react, Detail(), PayNow(), METHODS, ProofUpload(), send(), startProofUpload(), submitProof() (+2 more)

### Community 149 - "LinkButton"
Cohesion: 0.22
Nodes (11): BooksFrame(), NewEntry(), NewEntryPage(), MonthSelect(), ClientList(), ClientsPage(), LeadsPage(), LinkButton() (+3 more)

### Community 151 - "manilaToday"
Cohesion: 0.12
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+26 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (41): GET(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+33 more)

### Community 155 - "staff/actions.ts"
Cohesion: 0.39
Nodes (6): clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 156 - "requireOwner"
Cohesion: 0.07
Nodes (50): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+42 more)

### Community 157 - "requireOwner"
Cohesion: 0.29
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+5 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 160 - "payroll/register.ts"
Cohesion: 0.26
Nodes (11): CheckedRegister, checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin(), parseName() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 163 - "InvoiceList"
Cohesion: 0.36
Nodes (8): InvoiceList(), daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 164 - "leads/actions.ts"
Cohesion: 0.25
Nodes (17): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction() (+9 more)

### Community 179 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1159 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `manilaToday`, `checkbox.tsx`, `server-only`, `documents/labels.ts`, `notification.tsx`, `package.json`, `review-form.tsx`, `@remixicon/react`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `dependencies`, `2316/page.tsx`, `@remixicon/react`, `LinkButton`, `manilaToday`, `requireOwner`, `leads/actions.ts`, `scores/page.tsx`, `settlement-pages.tsx`, `social-button.tsx`, `payroll/forms.tsx`, `modal.tsx`, `profile.ts`, `deadlines/page.tsx`, `Badge`, `lock-bar.tsx`, `app/requests/page.tsx`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `ui.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `party-pages.tsx`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `getIdentity`, `theme-toggle.tsx`, `fees/types.ts`, `Card`, `clients/[id]/page.tsx`, `button.tsx`, `cx.ts`, `collections/forms.tsx`, `formatAmount`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `payroll/data.ts`, `supabaseServer`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `branches/page.tsx`, `parties/[id]/page.tsx`, `module-pages.tsx`, `fixed-assets/page.tsx`, `ledger/data.ts`, `staff/page.tsx`, `portal/page.tsx`, `module-pages.tsx`, `review/page.tsx`, `returns/load.ts`, `addDays`, `batch/register.ts`, `app/app/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08007013442431327 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `manilaToday`, `server-only`, `documents/labels.ts`, `package.json`, `review-form.tsx`, `@remixicon/react`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `dependencies`, `2316/page.tsx`, `proxy.ts`, `@remixicon/react`, `LinkButton`, `manilaToday`, `safeguards.ts`, `requireOwner`, `requireOwner`, `leads/actions.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `settlement-pages.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `Badge`, `lock-bar.tsx`, `app/requests/page.tsx`, `react`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `ui.tsx`, `workpapers/page.tsx`, `select.tsx`, `party-pages.tsx`, `brand/actions.ts`, `books/forms.tsx`, `formatAmount`, `opening-checklist.tsx`, `getIdentity`, `theme-toggle.tsx`, `fees/types.ts`, `Card`, `clients/[id]/page.tsx`, `button.tsx`, `formatAmount`, `app/app/layout.tsx`, `form-2316.tsx`, `payroll/data.ts`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `branches/page.tsx`, `proof-actions.ts`, `parties/[id]/page.tsx`, `module-pages.tsx`, `fixed-assets/page.tsx`, `ledger/data.ts`, `portal/page.tsx`, `review/page.tsx`, `returns/load.ts`, `addDays`, `batch/register.ts`, `app/app/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/run.ts`, `server-only`, `arap.ts`, `package.json`, `review-form.tsx`, `fields.ts`, `app/documents/page.tsx`, `gemini.ts`, `tieouts.test.ts`, `registrations/forms.tsx`, `ledger.test.ts`, `settings/actions.ts`, `onboarding/page.tsx`, `statements.ts`, `manilaToday`, `safeguards.ts`, `staff/actions.ts`, `requireOwner`, `InvoiceList`, `scores/page.tsx`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `leads-pipeline.test.ts`, `lock-bar.tsx`, `app/requests/page.tsx`, `Centavos`, `money.ts`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `payroll/payroll.test.ts`, `returns/books.test.ts`, `opening-checklist.tsx`, `fees/types.ts`, `Card`, `clients/[id]/page.tsx`, `sign-off.ts`, `formatAmount`, `portal-billing.test.ts`, `document-scanner.tsx`, `ledger/types.ts`, `supabaseServer`, `print/page.tsx`, `leads/[id]/page.tsx`, `[month]/page.tsx`, `rates.ts`, `parties/[id]/page.tsx`, `db.test.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `portal/page.tsx`, `module-pages.tsx`, `review/page.tsx`, `returns/load.ts`, `batch/register.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.097) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08465608465608465 - nodes in this community are weakly interconnected._