# Graph Report - agent-a7595dee7b7f3e766  (2026-11-25)

## Corpus Check
- 693 files · ~541,284 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4332 nodes · 14899 edges · 165 communities (146 shown, 19 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `e9e7026c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [token]/page.tsx
- addDays
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- review-form.tsx
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
- [month]/page.tsx
- scores/page.tsx
- annual.ts
- payroll/types.ts
- formatAmount
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- Badge
- approval-memo.tsx
- income.ts
- money.ts
- react
- returns/types.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- parties/actions.ts
- server.ts
- cx
- select.tsx
- Apple Design
- cycle/page.tsx
- testing.ts
- fees/types.ts
- review/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- ledger/data.ts
- stat-cards.tsx
- getIdentity
- theme-toggle.tsx
- quote.ts
- register/page.tsx
- clients/[id]/page.tsx
- app/requests/[id]/page.tsx
- button.tsx
- Pro components
- staff/actions.ts
- ref_node_fs
- next
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- notes.ts
- opening.ts
- Recipes
- Centavos
- BoardUI page patterns
- Pro templates
- zod
- ledger/books.ts
- leads/[id]/page.tsx
- filings/actions.ts
- accept-form.tsx
- boardui
- rates.ts
- Filing
- parties/[id]/page.tsx
- fees/schedule.ts
- social-button.tsx
- sidebar-toggle.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- documents/[id]/page.tsx
- acting-approver.test.ts
- tools/page.tsx
- quote/page.tsx
- apply-migrations.sh
- percentage.ts
- tax-codes.ts
- app/app/page.tsx
- returns/load.ts
- showMonth
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- periods
- portal/page.tsx
- books/reports/statements/page.tsx
- Building UIs with BoardUI
- return-file-actions.ts
- documents/labels.ts
- register-books.test.ts
- portal-nav.tsx
- work/page.tsx
- @remixicon/react
- app/documents/page.tsx
- gemini.ts
- names.ts
- ledger.test.ts
- vitest
- supabaseServer
- proxy.ts
- filings/run.ts
- Skeleton
- generate-qap-fixture.mjs
- amountInput
- db.test.ts
- copy-opencv.mjs
- ledger-lock.test.ts
- funnel.test.ts
- manilaToday
- safeguards.ts
- fixed-assets.test.ts
- returns-books.test.ts
- workpapers.test.ts
- [clientId]/page.tsx
- returns-sign-off.test.ts
- templatePayload
- register-xlsx.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- invoice-pages.tsx
- leads/actions.ts
- tests/books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 280 edges
2. `Skeleton()` - 206 edges
3. `cx` - 205 edges
4. `react` - 204 edges
5. `Notice()` - 201 edges
6. `Button()` - 178 edges
7. `next` - 162 edges
8. `Card()` - 155 edges
9. `Badge()` - 146 edges
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

## Communities (165 total, 19 thin omitted)

### Community 0 - "[token]/page.tsx"
Cohesion: 0.27
Nodes (10): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+2 more)

### Community 1 - "addDays"
Cohesion: 0.09
Nodes (47): Rule, PlannedObligation, addDays(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), parseIso() (+39 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (19): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+11 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.09
Nodes (38): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+30 more)

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
Cohesion: 0.08
Nodes (42): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+34 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

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

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (39): CASH_FLOW_CLASSES, defaultCashFlow(), statementsFrom(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section (+31 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (46): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), buildSawt() (+38 more)

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
Cohesion: 0.08
Nodes (40): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), PreviewTable(), SubmissionReview(), PayrollMonth() (+32 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "annual.ts"
Cohesion: 0.20
Nodes (29): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), penalties(), quarterlyPayments(), reconciliation() (+21 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "formatAmount"
Cohesion: 0.09
Nodes (45): BooksSummaryPage(), Summary(), SummaryCard(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, TransactionJournal() (+37 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (70): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+62 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.16
Nodes (20): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), ReviewNote (+12 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "Badge"
Cohesion: 0.07
Nodes (64): ClientList(), Row, FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey (+56 more)

### Community 54 - "approval-memo.tsx"
Cohesion: 0.14
Nodes (17): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+9 more)

### Community 55 - "income.ts"
Cohesion: 0.12
Nodes (25): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, bookIncome(), INCOME_GROUPS (+17 more)

### Community 56 - "money.ts"
Cohesion: 0.13
Nodes (26): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+18 more)

### Community 57 - "react"
Cohesion: 0.10
Nodes (28): react, MonthSelect(), PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage() (+20 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (61): lookupAtc(), client, BUSINESS_TAX_FORMS, VatData, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS (+53 more)

### Community 59 - "Notice"
Cohesion: 0.11
Nodes (64): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), EntryForm() (+56 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (33): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote, accountSchema (+25 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (32): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+24 more)

### Community 62 - "parties/actions.ts"
Cohesion: 0.17
Nodes (20): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), runOcrAction(), normalizeTin(), runOcr() (+12 more)

### Community 63 - "server.ts"
Cohesion: 0.16
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 64 - "cx"
Cohesion: 0.04
Nodes (75): Counter(), CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps, styles (+67 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (35): react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+27 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "cycle/page.tsx"
Cohesion: 0.20
Nodes (17): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, ExceptionDecision, parseMonth() (+9 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "fees/types.ts"
Cohesion: 0.11
Nodes (22): items, PRICES, schedule, settings, count(), first(), pick(), profileFromQuery() (+14 more)

### Community 70 - "review/page.tsx"
Cohesion: 0.15
Nodes (18): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), Queue(), ReviewPage(), Row (+10 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (38): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+30 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.11
Nodes (41): BankAccountsRoute(), booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame() (+33 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/data.ts"
Cohesion: 0.09
Nodes (35): Access, STATUS, CashFlowClass, codes, PNL, COA_TEMPLATES, Cutoff, cutoffOf() (+27 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (52): DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent, PlainStatCard(), StatCards() (+44 more)

### Community 77 - "getIdentity"
Cohesion: 0.12
Nodes (30): ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity(), amount, date (+22 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.15
Nodes (21): Nav(), PortalLayout(), PortalNav(), applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter() (+13 more)

### Community 79 - "quote.ts"
Cohesion: 0.11
Nodes (32): EstimatedProfile, estimateProfile(), ExistingClient, GapRow, has(), buildQuote(), cents(), CustomQuoteItem (+24 more)

### Community 80 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.15
Nodes (21): FormState, frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), IncomeTaxMethodForm(), RemoveAssignmentButton() (+13 more)

### Community 82 - "app/requests/[id]/page.tsx"
Cohesion: 0.21
Nodes (17): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+9 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "staff/actions.ts"
Cohesion: 0.18
Nodes (18): addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm() (+10 more)

### Community 86 - "ref_node_fs"
Cohesion: 0.10
Nodes (7): ctx, input, HASH, LEAD, root, root, root

### Community 87 - "next"
Cohesion: 0.07
Nodes (64): nextConfig, next, PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks() (+56 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (25): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+17 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.17
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+9 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "notes.ts"
Cohesion: 0.20
Nodes (14): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+6 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Centavos"
Cohesion: 0.06
Nodes (93): saveMonthAction(), GridRow, AlphaCols, AlphalistRow, buildAlphalist(), applyRegister(), Certificates2316, certificatesFromRaw() (+85 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "zod"
Cohesion: 0.18
Nodes (16): zod, GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+8 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (53): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages() (+45 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (20): LeadPage(), Person, requestQuoteAction(), SERVICES, StartState, Lines(), longDate(), money() (+12 more)

### Community 102 - "filings/actions.ts"
Cohesion: 0.19
Nodes (14): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+6 more)

### Community 103 - "accept-form.tsx"
Cohesion: 0.70
Nodes (3): acceptProposalAction(), AcceptState, contentHash()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "Filing"
Cohesion: 0.28
Nodes (14): file(), Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile() (+6 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (37): fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList(), Row, datAddress() (+29 more)

### Community 108 - "fees/schedule.ts"
Cohesion: 0.14
Nodes (17): dateFmt, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+9 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 110 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 113 - "documents/[id]/page.tsx"
Cohesion: 0.30
Nodes (8): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), pendingDocumentTaxCodes(), LockFiling, lockingFiling()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+17 more)

### Community 116 - "quote/page.tsx"
Cohesion: 0.17
Nodes (19): loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), CreateFromTemplateForm(), StartNewVersionForm(), EngagementRow, FeeGapPage() (+11 more)

### Community 118 - "percentage.ts"
Cohesion: 0.24
Nodes (8): form1701, form1702RT, form1701Q, form1702Q, form2551Q, docLabel(), uncodedErrors(), form2550Q

### Community 119 - "tax-codes.ts"
Cohesion: 0.19
Nodes (15): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+7 more)

### Community 120 - "app/app/page.tsx"
Cohesion: 0.18
Nodes (22): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), EndButton() (+14 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.06
Nodes (60): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle, Problems(), sameFigures() (+52 more)

### Community 122 - "showMonth"
Cohesion: 0.44
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, showMonth()

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadAccounts(), loadBatchContext(), monthsBetween() (+30 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (46): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+38 more)

### Community 126 - "periods"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 127 - "portal/page.tsx"
Cohesion: 0.11
Nodes (32): MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard(), PortalHome() (+24 more)

### Community 128 - "books/reports/statements/page.tsx"
Cohesion: 0.26
Nodes (11): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), Released, loadReleasedReports(), loadStatements() (+3 more)

### Community 129 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 130 - "return-file-actions.ts"
Cohesion: 0.11
Nodes (37): RFC-2047, RFC-2822, GET(), ReturnFileState, sendEsubmissionAction(), TYPES, EsubmissionMailEnv, esubmissionMailEnv() (+29 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.09
Nodes (39): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+31 more)

### Community 132 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "portal-nav.tsx"
Cohesion: 0.29
Nodes (6): baseTabs, GRID_COLS, payrollTab, registrationTab, reportsTab, requestsTab

### Community 134 - "work/page.tsx"
Cohesion: 0.17
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 135 - "@remixicon/react"
Cohesion: 0.10
Nodes (35): @remixicon/react, Detail(), StatementPage(), DashboardStat, icons, Detail(), PortalStatementDetail(), Billing() (+27 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.10
Nodes (30): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+22 more)

### Community 137 - "gemini.ts"
Cohesion: 0.11
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 138 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (13): pg, vitest, root, root, root, root, root, root (+5 more)

### Community 141 - "supabaseServer"
Cohesion: 0.06
Nodes (60): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+52 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "filings/run.ts"
Cohesion: 0.11
Nodes (25): server-only, @supabase/supabase-js, GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage() (+17 more)

### Community 144 - "Skeleton"
Cohesion: 0.08
Nodes (48): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+40 more)

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "amountInput"
Cohesion: 0.36
Nodes (11): inputs1701(), inputs1702RT(), penaltyInputs(), inputs1701Q(), inputs1702Q(), withoutBookFigures(), withoutMethodChoice(), inputsFor() (+3 more)

### Community 147 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 148 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 150 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 151 - "manilaToday"
Cohesion: 0.16
Nodes (23): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), ageOpenItems(), AGING_BUCKETS (+15 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.08
Nodes (44): ClientValues, SafeguardsNotice(), TAX_TYPES, TaxType, CoverageClient, coverageGaps(), Gap, GapKind (+36 more)

### Community 153 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 155 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 157 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (33): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+25 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "templatePayload"
Cohesion: 0.12
Nodes (9): templatePayload(), root, as(), client(), root, as(), books(), root (+1 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.14
Nodes (20): GET(), safe(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), ID_HEADERS, TOTAL_HEADERS (+12 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.10
Nodes (28): blankLine(), InvoiceForm(), InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props (+20 more)

### Community 164 - "leads/actions.ts"
Cohesion: 0.18
Nodes (21): assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction(), sendProposalAction() (+13 more)

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1189 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **19 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `books/reports/statements/page.tsx`, `[token]/page.tsx`, `return-file-actions.ts`, `documents/labels.ts`, `package.json`, `review-form.tsx`, `@remixicon/react`, `app/documents/page.tsx`, `work/page.tsx`, `portal-nav.tsx`, `registrations/forms.tsx`, `supabaseServer`, `onboarding/page.tsx`, `filings/run.ts`, `dependencies`, `Skeleton`, `proxy.ts`, `manilaToday`, `[clientId]/page.tsx`, `register-xlsx.ts`, `invoice-pages.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `scores/page.tsx`, `formatAmount`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `deadlines/page.tsx`, `Badge`, `approval-memo.tsx`, `react`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `parties/actions.ts`, `server.ts`, `cx`, `cycle/page.tsx`, `review/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `ledger/data.ts`, `getIdentity`, `register/page.tsx`, `clients/[id]/page.tsx`, `app/requests/[id]/page.tsx`, `staff/actions.ts`, `app/app/layout.tsx`, `form-2316.tsx`, `Centavos`, `zod`, `ledger/books.ts`, `leads/[id]/page.tsx`, `filings/actions.ts`, `accept-form.tsx`, `Filing`, `parties/[id]/page.tsx`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `documents/[id]/page.tsx`, `tools/page.tsx`, `quote/page.tsx`, `app/app/page.tsx`, `returns/load.ts`, `showMonth`, `batch/register.ts`, `filings/[id]/page.tsx`, `portal/page.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `addDays` be split into smaller, more focused modules?**
  _Cohesion score 0.09025974025974026 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `books/reports/statements/page.tsx`, `[token]/page.tsx`, `documents/labels.ts`, `notification.tsx`, `package.json`, `review-form.tsx`, `@remixicon/react`, `app/documents/page.tsx`, `work/page.tsx`, `registrations/forms.tsx`, `supabaseServer`, `onboarding/page.tsx`, `dependencies`, `Skeleton`, `filings/run.ts`, `statements.ts`, `manilaToday`, `[clientId]/page.tsx`, `invoice-pages.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `scores/page.tsx`, `formatAmount`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `profile.ts`, `deadlines/page.tsx`, `Badge`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `server.ts`, `cx`, `select.tsx`, `cycle/page.tsx`, `review/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `getIdentity`, `theme-toggle.tsx`, `register/page.tsx`, `clients/[id]/page.tsx`, `app/requests/[id]/page.tsx`, `button.tsx`, `staff/actions.ts`, `next`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `zod`, `ledger/books.ts`, `leads/[id]/page.tsx`, `accept-form.tsx`, `Filing`, `parties/[id]/page.tsx`, `social-button.tsx`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `documents/[id]/page.tsx`, `tools/page.tsx`, `quote/page.tsx`, `app/app/page.tsx`, `returns/load.ts`, `showMonth`, `batch/register.ts`, `filings/[id]/page.tsx`, `portal/page.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `addDays`, `return-file-actions.ts`, `arap.ts`, `package.json`, `review-form.tsx`, `register-books.test.ts`, `app/documents/page.tsx`, `gemini.ts`, `names.ts`, `ledger.test.ts`, `registrations/forms.tsx`, `supabaseServer`, `onboarding/page.tsx`, `filings/run.ts`, `statements.ts`, `db.test.ts`, `ledger-lock.test.ts`, `funnel.test.ts`, `manilaToday`, `safeguards.ts`, `fixed-assets.test.ts`, `returns-books.test.ts`, `workpapers.test.ts`, `returns-sign-off.test.ts`, `templatePayload`, `books-migration.test.ts`, `invoice-pages.tsx`, `tests/books.test.ts`, `[month]/page.tsx`, `scores/page.tsx`, `formatAmount`, `index.ts`, `lib/books/actions.ts`, `profile.ts`, `deadlines/page.tsx`, `Badge`, `approval-memo.tsx`, `income.ts`, `money.ts`, `returns/types.ts`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `cycle/page.tsx`, `testing.ts`, `fees/types.ts`, `review/page.tsx`, `ledger/data.ts`, `quote.ts`, `register/page.tsx`, `clients/[id]/page.tsx`, `app/requests/[id]/page.tsx`, `staff/actions.ts`, `ref_node_fs`, `next`, `portal-billing.test.ts`, `document-scanner.tsx`, `notes.ts`, `opening.ts`, `Centavos`, `zod`, `ledger/books.ts`, `leads/[id]/page.tsx`, `filings/actions.ts`, `rates.ts`, `parties/[id]/page.tsx`, `fixed-assets/page.tsx`, `documents/[id]/page.tsx`, `acting-approver.test.ts`, `tax-codes.ts`, `app/app/page.tsx`, `returns/load.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `portal/page.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._