# Graph Report - agent-a4b1d885105bd39f4  (2026-11-25)

## Corpus Check
- 690 files · ~541,025 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4311 nodes · 14840 edges · 165 communities (147 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 123 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `e9e7026c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- returns/load.ts
- filings/run.ts
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
- copy-opencv.mjs
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
- ui.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- approval-memo.tsx
- deadlines/page.tsx
- app/requests/page.tsx
- lock-bar.tsx
- income.ts
- money.ts
- settlement-pages.tsx
- returns/types.ts
- Notice
- app/settings/page.tsx
- quote/page.tsx
- ocr/run.ts
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- payroll/payroll.test.ts
- testing.ts
- quote.ts
- review/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- ledger/types.ts
- stat-cards.tsx
- requireStaff
- theme-toggle.tsx
- tieouts.ts
- parts.ts
- clients/[id]/page.tsx
- cycle/actions.ts
- button.tsx
- Pro components
- cx.ts
- register/page.tsx
- ledger/data.ts
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- book-income.ts
- opening.ts
- Recipes
- Centavos
- BoardUI page patterns
- Pro templates
- social-button.tsx
- print/page.tsx
- [token]/page.tsx
- db.test.ts
- public.ts
- boardui
- rates.ts
- proof-actions.ts
- parties/[id]/page.tsx
- template.ts
- react
- staff/actions.ts
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- workpapers/load.ts
- acting-approver.test.ts
- tools/page.tsx
- breadcrumb.tsx
- apply-migrations.sh
- filings/actions.ts
- staff/page.tsx
- app/app/page.tsx
- source.ts
- next
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- file-upload.tsx
- cycle/page.tsx
- binder/page.tsx
- parties/parties.test.ts
- server-only
- documents/labels.ts
- register-books.test.ts
- return-files.tsx
- work/page.tsx
- Badge
- app/documents/page.tsx
- gemini.ts
- checkbox.tsx
- ledger.test.ts
- vitest
- settings/actions.ts
- proxy.ts
- Building UIs with BoardUI
- 2316/page.tsx
- names.ts
- returns/books.test.ts
- review.ts
- proof-upload.tsx
- portal/page.tsx
- @remixicon/react
- Card
- safeguards.ts
- funnel.test.ts
- fixed-assets.test.ts
- ledger-documents.test.ts
- clients/schema.ts
- supabaseServer
- returns-sign-off.test.ts
- register-xlsx.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- invoice-pages.tsx
- leads/actions.ts
- tests/books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 284 edges
2. `Skeleton()` - 204 edges
3. `react` - 204 edges
4. `cx` - 203 edges
5. `Notice()` - 199 edges
6. `Button()` - 182 edges
7. `next` - 163 edges
8. `Card()` - 161 edges
9. `Badge()` - 152 edges
10. `Input()` - 129 edges

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

## Communities (165 total, 18 thin omitted)

### Community 0 - "returns/load.ts"
Cohesion: 0.16
Nodes (19): withNonDeductible(), dayBefore(), FilingRow, ListedDocument, listInvoices(), loadEwtRemittances(), loadLedger(), loadPayslips() (+11 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (38): compareIso(), lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel, fiscalYearOf(), followsCalendarYear(), Frequency (+30 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 5 - "package.json"
Cohesion: 0.06
Nodes (44): eslintConfig, dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0 (+36 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.06
Nodes (58): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+50 more)

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
Cohesion: 0.06
Nodes (82): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), FormState, openClientCaseAction(), openYearRenewalsAction(), caseNote (+74 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (33): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+25 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (45): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, COA_TEMPLATES, loadStatements(), FS_LINES (+37 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (48): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), buildSawt() (+40 more)

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
Cohesion: 0.30
Nodes (10): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, p(), PayrollRuns(), Run (+2 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "annual.ts"
Cohesion: 0.18
Nodes (33): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+25 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.07
Nodes (48): blankLine(), InvoiceForm(), fmt(), SettlementForm(), PickOption, AllocationRow, InvoiceLineRow, InvoiceRow (+40 more)

### Community 45 - "index.ts"
Cohesion: 0.06
Nodes (27): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+19 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (56): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+48 more)

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
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 51 - "approval-memo.tsx"
Cohesion: 0.17
Nodes (14): amt(), ApprovalMemo(), Db, TIE, grossSales(), ReviewNote, approvalMemo(), Memo (+6 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 53 - "app/requests/page.tsx"
Cohesion: 0.19
Nodes (19): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+11 more)

### Community 54 - "lock-bar.tsx"
Cohesion: 0.11
Nodes (31): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+23 more)

### Community 55 - "income.ts"
Cohesion: 0.13
Nodes (26): BOOK_FIGURES, COMPARISON_COLUMNS, comparisonSchedule(), costsOf(), EIGHT_PCT_REDUCTION, InputsCtx, METHOD_LABEL, Periods (+18 more)

### Community 56 - "money.ts"
Cohesion: 0.11
Nodes (33): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), csvCell() (+25 more)

### Community 57 - "settlement-pages.tsx"
Cohesion: 0.13
Nodes (26): InvoiceView(), PaymentsNewPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), ReceiptsViewPage(), OpenInvoice, SettlementFormValue (+18 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (47): PayrollContext, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel() (+39 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (69): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), ChangeBooksStartForm(), EntryForm(), ReleaseReportForm(), SetupForm() (+61 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.13
Nodes (29): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+21 more)

### Community 61 - "quote/page.tsx"
Cohesion: 0.09
Nodes (51): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+43 more)

### Community 62 - "ocr/run.ts"
Cohesion: 0.20
Nodes (17): mergePartyAction(), runOcrAction(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP, lookupParties(), blank() (+9 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+14 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (32): MonthGrid(), toInput(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet() (+24 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote.ts"
Cohesion: 0.07
Nodes (52): ClientValues, PriceRow, EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+44 more)

### Community 70 - "review/page.tsx"
Cohesion: 0.18
Nodes (15): ClientReturnsPage(), Returns(), Queue(), ReviewPage(), Row, Section(), booksStillOpen(), filingsBooksReady() (+7 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "formatAmount"
Cohesion: 0.15
Nodes (38): booksContext(), BooksContext, fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+30 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/types.ts"
Cohesion: 0.12
Nodes (24): Access, STATUS, Row, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+16 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.09
Nodes (29): react-aria-components@^1.22.1, react-aria-components, DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill() (+21 more)

### Community 77 - "requireStaff"
Cohesion: 0.08
Nodes (37): addClientNoteAction(), NoteState, markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), Lines(), lineStyle (+29 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "tieouts.ts"
Cohesion: 0.14
Nodes (13): LedgerTotals, purchases(), sales(), base, books, buy, sale, tieOuts() (+5 more)

### Community 80 - "parts.ts"
Cohesion: 0.16
Nodes (18): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+10 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): FormState, removeAssignmentAction(), frequencyLabel, Props, StaffOptions(), AssignForm(), ClientUserForm(), EngagementForm() (+16 more)

### Community 82 - "cycle/actions.ts"
Cohesion: 0.22
Nodes (16): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+8 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "register/page.tsx"
Cohesion: 0.31
Nodes (15): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+7 more)

### Community 87 - "ledger/data.ts"
Cohesion: 0.10
Nodes (31): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+23 more)

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
Cohesion: 0.09
Nodes (29): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "book-income.ts"
Cohesion: 0.20
Nodes (13): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, bookIncome(), INCOME_GROUPS (+5 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Centavos"
Cohesion: 0.07
Nodes (66): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), GridRow, GET(), AlphaCols, buildAlphalist() (+58 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (48): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+40 more)

### Community 101 - "[token]/page.tsx"
Cohesion: 0.16
Nodes (18): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+10 more)

### Community 102 - "db.test.ts"
Cohesion: 0.13
Nodes (6): api, ctx, fn, rows, src, root

### Community 103 - "public.ts"
Cohesion: 0.14
Nodes (17): SERVICES, StartState, QuerySource, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 106 - "proof-actions.ts"
Cohesion: 0.24
Nodes (11): zod, amount, date, refresh(), rejectProofAction(), StartProof, submitProof(), submitSchema (+3 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.16
Nodes (20): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_COLUMNS (+12 more)

### Community 108 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 109 - "react"
Cohesion: 0.07
Nodes (45): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+37 more)

### Community 110 - "staff/actions.ts"
Cohesion: 0.28
Nodes (10): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), ensureLogin(), clientUserSchema, email, inviteStaffSchema (+2 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 113 - "workpapers/load.ts"
Cohesion: 0.26
Nodes (12): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+4 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.15
Nodes (25): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton() (+17 more)

### Community 116 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronDownSmall(), ChevronRightSmall(), IconProps

### Community 118 - "filings/actions.ts"
Cohesion: 0.38
Nodes (10): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+2 more)

### Community 119 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 120 - "app/app/page.tsx"
Cohesion: 0.14
Nodes (30): DashboardStats(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), ActingState (+22 more)

### Community 121 - "source.ts"
Cohesion: 0.13
Nodes (26): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), amount(), approvedFields(), BooksSourceRow, buildPriorFigures() (+18 more)

### Community 122 - "next"
Cohesion: 0.08
Nodes (27): nextConfig, next, postPayrollAction(), PostState, PostPayrollButton(), ClientList(), ClientsPage(), Row (+19 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.10
Nodes (37): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadAccounts(), loadBatchContext(), monthsBetween() (+29 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (48): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+40 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.19
Nodes (18): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), CycleRow, ExceptionDecision (+10 more)

### Community 128 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 129 - "parties/parties.test.ts"
Cohesion: 0.22
Nodes (15): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, fillFromDirectory(), nameTokens() (+7 more)

### Community 130 - "server-only"
Cohesion: 0.06
Nodes (63): RFC-2047, RFC-2822, server-only, @supabase/supabase-js, GET(), GET(), generateFilingsNow(), GenerateState (+55 more)

### Community 131 - "documents/labels.ts"
Cohesion: 0.08
Nodes (42): DocReviewActions(), Doc, DocumentsCard(), when(), Row, Doc, Documents(), FolderKey (+34 more)

### Community 132 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "return-files.tsx"
Cohesion: 0.50
Nodes (7): ActionButton(), EsubmissionControls(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), startReturnFileUpload()

### Community 134 - "work/page.tsx"
Cohesion: 0.16
Nodes (20): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), lastMonth(), loadMyWork() (+12 more)

### Community 135 - "Badge"
Cohesion: 0.10
Nodes (39): Detail(), StatementPage(), FilingTable(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref() (+31 more)

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (31): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable(), BOOKED_TYPES (+23 more)

### Community 137 - "gemini.ts"
Cohesion: 0.12
Nodes (16): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+8 more)

### Community 138 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.04
Nodes (21): pg, vitest, ctx, input, root, root, root, root (+13 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 144 - "2316/page.tsx"
Cohesion: 0.38
Nodes (9): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page(), Form2316Sheet(), PrintButton() (+1 more)

### Community 145 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 146 - "returns/books.test.ts"
Cohesion: 0.11
Nodes (21): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, inputs1701Q() (+13 more)

### Community 147 - "review.ts"
Cohesion: 0.43
Nodes (5): ALWAYS, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 148 - "proof-upload.tsx"
Cohesion: 0.26
Nodes (12): file(), ReplyForm(), send(), METHODS, ProofUpload(), send(), ProofState, startProofUpload() (+4 more)

### Community 149 - "portal/page.tsx"
Cohesion: 0.11
Nodes (36): PortalClient, BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents() (+28 more)

### Community 150 - "@remixicon/react"
Cohesion: 0.10
Nodes (30): @remixicon/react, NotesCard(), DiscoveryCallForm(), LostForm(), ReopenForm(), Result(), ReviewerForm(), Lead() (+22 more)

### Community 151 - "Card"
Cohesion: 0.12
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+26 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.06
Nodes (59): GET(), TaxType, invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN (+51 more)

### Community 153 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 154 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 156 - "clients/schema.ts"
Cohesion: 0.16
Nodes (10): TAX_TYPES, TAXPAYER_TYPES, assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient (+2 more)

### Community 157 - "supabaseServer"
Cohesion: 0.10
Nodes (53): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction(), updateClientAction() (+45 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 160 - "register-xlsx.ts"
Cohesion: 0.10
Nodes (32): GET(), safe(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), sortItems(), lastDay() (+24 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.13
Nodes (20): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+12 more)

### Community 164 - "leads/actions.ts"
Cohesion: 0.19
Nodes (22): PLACES, assignReviewerAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+14 more)

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1181 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `binder/page.tsx`, `server-only`, `documents/labels.ts`, `notification.tsx`, `package.json`, `review-form.tsx`, `Badge`, `app/documents/page.tsx`, `return-files.tsx`, `work/page.tsx`, `registrations/forms.tsx`, `checkbox.tsx`, `onboarding/page.tsx`, `2316/page.tsx`, `statements.ts`, `proof-upload.tsx`, `portal/page.tsx`, `@remixicon/react`, `Card`, `supabaseServer`, `register-xlsx.ts`, `invoice-pages.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `modal.tsx`, `profile.ts`, `deadlines/page.tsx`, `app/requests/page.tsx`, `lock-bar.tsx`, `settlement-pages.tsx`, `Notice`, `app/settings/page.tsx`, `quote/page.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `review/page.tsx`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `requireStaff`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `cycle/actions.ts`, `button.tsx`, `cx.ts`, `register/page.tsx`, `ledger/data.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Centavos`, `social-button.tsx`, `print/page.tsx`, `[token]/page.tsx`, `parties/[id]/page.tsx`, `fixed-assets/page.tsx`, `tools/page.tsx`, `breadcrumb.tsx`, `staff/page.tsx`, `app/app/page.tsx`, `next`, `batch/register.ts`, `filings/[id]/page.tsx`, `file-upload.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09387755102040816 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `binder/page.tsx`, `server-only`, `documents/labels.ts`, `package.json`, `review-form.tsx`, `Badge`, `app/documents/page.tsx`, `return-files.tsx`, `work/page.tsx`, `registrations/forms.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `proxy.ts`, `2316/page.tsx`, `proof-upload.tsx`, `portal/page.tsx`, `@remixicon/react`, `Card`, `safeguards.ts`, `supabaseServer`, `register-xlsx.ts`, `invoice-pages.tsx`, `leads/actions.ts`, `[month]/page.tsx`, `scores/page.tsx`, `ui.ts`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `approval-memo.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `lock-bar.tsx`, `settlement-pages.tsx`, `app/settings/page.tsx`, `quote/page.tsx`, `workpapers/page.tsx`, `review/page.tsx`, `books/forms.tsx`, `formatAmount`, `ledger/types.ts`, `requireStaff`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `cycle/actions.ts`, `register/page.tsx`, `ledger/data.ts`, `app/app/layout.tsx`, `form-2316.tsx`, `Centavos`, `social-button.tsx`, `print/page.tsx`, `[token]/page.tsx`, `proof-actions.ts`, `parties/[id]/page.tsx`, `react`, `staff/actions.ts`, `fixed-assets/page.tsx`, `tools/page.tsx`, `breadcrumb.tsx`, `filings/actions.ts`, `app/app/page.tsx`, `batch/register.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `filings/run.ts`, `server-only`, `parties/parties.test.ts`, `arap.ts`, `package.json`, `review-form.tsx`, `work/page.tsx`, `app/documents/page.tsx`, `gemini.ts`, `register-books.test.ts`, `registrations/forms.tsx`, `ledger.test.ts`, `settings/actions.ts`, `onboarding/page.tsx`, `names.ts`, `statements.ts`, `returns/books.test.ts`, `review.ts`, `portal/page.tsx`, `@remixicon/react`, `Card`, `safeguards.ts`, `funnel.test.ts`, `fixed-assets.test.ts`, `ledger-documents.test.ts`, `clients/schema.ts`, `supabaseServer`, `returns-sign-off.test.ts`, `register-xlsx.ts`, `books-migration.test.ts`, `invoice-pages.tsx`, `tests/books.test.ts`, `scores/page.tsx`, `ui.ts`, `index.ts`, `profile.ts`, `approval-memo.tsx`, `deadlines/page.tsx`, `app/requests/page.tsx`, `lock-bar.tsx`, `money.ts`, `returns/types.ts`, `app/settings/page.tsx`, `quote/page.tsx`, `payroll/payroll.test.ts`, `testing.ts`, `quote.ts`, `review/page.tsx`, `ledger/types.ts`, `theme-toggle.tsx`, `tieouts.ts`, `parts.ts`, `clients/[id]/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `Centavos`, `social-button.tsx`, `print/page.tsx`, `db.test.ts`, `rates.ts`, `template.ts`, `staff/actions.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `app/app/page.tsx`, `source.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08275862068965517 - nodes in this community are weakly interconnected._