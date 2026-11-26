# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 792 files · ~636,353 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4931 nodes · 17130 edges · 173 communities (155 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 142 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `eaab4e15`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- statement.ts
- ledger/data.ts
- package.json
- year-end/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- requireStaff
- Sign-in & Setup Docs
- app/app/layout.tsx
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- income.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- supabaseServer
- scores/page.tsx
- compare.ts
- payroll/types.ts
- settlement-pages.tsx
- index.ts
- payroll/forms.tsx
- modal.tsx
- deadlines/page.tsx
- scripts
- server-only
- client-form.tsx
- review-queue.ts
- app/settings/page.tsx
- filings/[id]/page.tsx
- clients/[id]/page.tsx
- Centavos
- status.ts
- returns/types.ts
- Notice
- requireOwner
- toDecimalString
- batch/page.tsx
- review-form.tsx
- cx
- select.tsx
- Apple Design
- social-button.tsx
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- LinkButton
- stat-cards.tsx
- fees/[id]/page.tsx
- theme-toggle.tsx
- quote/page.tsx
- module-pages.tsx
- app/requests/page.tsx
- fields.ts
- @remixicon/react
- Pro components
- manilaToday
- app/app/page.tsx
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- notification.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- quote/page.tsx
- ledger/books.ts
- ui.ts
- parallel-run.tsx
- Skeleton
- boardui
- rates.ts
- slots.ts
- proxy.ts
- bulk-actions.ts
- profile.ts
- vitest
- Opening balances: checklist for any cut-off
- Badge
- portal/page.tsx
- lib/books/actions.ts
- Lockup
- calendar/callback/route.ts
- apply-migrations.sh
- money.ts
- cycle/page.tsx
- fixed-assets/forms.tsx
- returns/load.ts
- ui.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- public.ts
- [month]/page.tsx
- safeguards.ts
- read.test.ts
- engine.test.ts
- mime.ts
- Building UIs with BoardUI
- xlsx.ts
- gemini.ts
- work/page.tsx
- proof-upload.tsx
- getIdentity
- ticked-allocation.test.ts
- proposal/[token]/page.tsx
- ledger.test.ts
- template.ts
- file-upload.tsx
- month.ts
- book-income.ts
- [employeeId]/page.tsx
- copy-opencv.mjs
- sign-off-actions.tsx
- ledger/types.ts
- calendar/staff.ts
- checkbox.tsx
- proposal-view.tsx
- filters.tsx
- safeguards.ts
- Badge
- names.ts
- app/documents/page.tsx
- deadlines/actions.ts
- books-2307.test.ts
- parallel-run.test.ts
- generate-alphalist-fixture.mjs
- register-xlsx.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- fixed-assets.test.ts
- toCentavos
- settings/actions.ts
- clients/actions.ts
- acting-approver.test.ts
- registrations/forms.tsx
- binder/page.tsx
- returns-sign-off.test.ts
- onboarding/page.tsx
- workpapers/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 293 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 226 edges
5. `react` - 224 edges
6. `Button()` - 194 edges
7. `next` - 183 edges
8. `Badge()` - 163 edges
9. `Card()` - 163 edges
10. `vitest` - 146 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `employeeFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `itemFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `priorEmployerFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (173 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (43): PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams, Accreditation(), amount() (+35 more)

### Community 1 - "engine.ts"
Cohesion: 0.11
Nodes (38): Rule, compareIso(), IsoDate, lastDayOfMonth(), DueRule, EfpsGroup, FilingChannel, FilingInstance (+30 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "statement.ts"
Cohesion: 0.10
Nodes (35): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), decideMissing2307Action(), DecisionState, Decision() (+27 more)

### Community 4 - "ledger/data.ts"
Cohesion: 0.11
Nodes (36): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+28 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (52): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, FormState, setYearEndCheckAction(), TickForm() (+44 more)

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

### Community 11 - "requireStaff"
Cohesion: 0.19
Nodes (19): RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction(), refresh(), retryReturnBookEntryAction() (+11 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (31): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+23 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (46): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+38 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.07
Nodes (105): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+97 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "supabaseServer"
Cohesion: 0.09
Nodes (41): nextConfig, next, setIncomeTaxMethodAction(), loadLockContext(), BooksMonthsPage(), Months(), one(), addClientNoteAction() (+33 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.08
Nodes (49): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+41 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "settlement-pages.tsx"
Cohesion: 0.11
Nodes (31): PaymentsNewPage(), PaymentsEditPage(), PaymentsViewPage(), ReceiptsNewPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm() (+23 more)

### Community 45 - "index.ts"
Cohesion: 0.03
Nodes (35): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+27 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (61): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+53 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (45): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+37 more)

### Community 48 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "server-only"
Cohesion: 0.22
Nodes (19): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+11 more)

### Community 51 - "client-form.tsx"
Cohesion: 0.12
Nodes (26): FormState, ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage() (+18 more)

### Community 52 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.12
Nodes (37): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+29 more)

### Community 54 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (50): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+42 more)

### Community 55 - "clients/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): @remixicon/react, removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), NotesCard(), ClientDetail(), ClientPage(), fmtDate() (+36 more)

### Community 56 - "Centavos"
Cohesion: 0.07
Nodes (64): GridRow, MonthGrid(), toInput(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+56 more)

### Community 57 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (76): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+68 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (68): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+60 more)

### Community 60 - "requireOwner"
Cohesion: 0.25
Nodes (18): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+10 more)

### Community 61 - "toDecimalString"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 62 - "batch/page.tsx"
Cohesion: 0.70
Nodes (4): Batch(), BatchPage(), one(), toCentavos()

### Community 63 - "review-form.tsx"
Cohesion: 0.14
Nodes (19): DocReviewActions(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, ReplyForm(), DocumentUpload(), send() (+11 more)

### Community 64 - "cx"
Cohesion: 0.05
Nodes (46): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+38 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (38): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (43): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+35 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (38): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), ocrProviderFromEnv(), runOcr(), runPendingOcr() (+30 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (56): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+48 more)

### Community 72 - "formatAmount"
Cohesion: 0.19
Nodes (27): fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+19 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "LinkButton"
Cohesion: 0.18
Nodes (23): booksContext(), BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+15 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.08
Nodes (49): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+41 more)

### Community 80 - "module-pages.tsx"
Cohesion: 0.13
Nodes (23): JournalEntryRoute(), dayBefore(), INVOICE_LABEL, JournalView(), Props, SettingsPage(), SettingsRoute(), payslips() (+15 more)

### Community 81 - "app/requests/page.tsx"
Cohesion: 0.17
Nodes (21): RequestDetail(), RequestPage(), Requests(), RequestsPage(), Row, PortalRequest(), RequestDetail(), PortalRequests() (+13 more)

### Community 82 - "fields.ts"
Cohesion: 0.15
Nodes (19): approveDocumentAction(), postDocumentToBooks(), unpostDocumentFromBooks(), ok, FieldKey, keys, normalizeAmount(), normalizeFields() (+11 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "manilaToday"
Cohesion: 0.16
Nodes (16): server-only, @supabase/supabase-js, GET(), digestMessage(), DigestRow, longDay(), peso, time() (+8 more)

### Community 86 - "app/app/page.tsx"
Cohesion: 0.18
Nodes (21): appointActingAction(), endActingAction(), refresh(), EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge (+13 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (67): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+59 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "notification.tsx"
Cohesion: 0.04
Nodes (47): AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor, ChipProps, ChipVariant (+39 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.29
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+5 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.20
Nodes (22): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+14 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.09
Nodes (44): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Form2316Sheet(), AlphaCols, Certificates2316, certificatesFromRaw() (+36 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "quote/page.tsx"
Cohesion: 0.17
Nodes (20): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+12 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "ui.ts"
Cohesion: 0.08
Nodes (44): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), TransactionJournal(), Booking, BooksChoices(), Codes (+36 more)

### Community 102 - "parallel-run.tsx"
Cohesion: 0.14
Nodes (22): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+14 more)

### Community 103 - "Skeleton"
Cohesion: 0.09
Nodes (31): react, BankAccountsRoute(), EmployeesRoute(), INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props (+23 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "slots.ts"
Cohesion: 0.16
Nodes (23): addDays(), byDay(), DAY_LABEL, freeSlots(), isFree(), LabelledDay, manilaDate(), manilaInstant() (+15 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "bulk-actions.ts"
Cohesion: 0.12
Nodes (21): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BatchRow, DocumentCodes (+13 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (48): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+40 more)

### Community 110 - "vitest"
Cohesion: 0.03
Nodes (26): pg, vitest, root, root, root, root, root, root (+18 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "Badge"
Cohesion: 0.08
Nodes (52): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), amt(), FixedAssets(), FixedAssetsPage() (+44 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, BooksCards(), cents() (+27 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (26): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+18 more)

### Community 115 - "Lockup"
Cohesion: 0.22
Nodes (12): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+4 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.22
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "money.ts"
Cohesion: 0.16
Nodes (16): SaleSplit, SawtResult, Split, AtcTotal, docLabel(), EwtLine, ewtLines(), ListedDocument (+8 more)

### Community 119 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (38): Cycle(), CycleWithClient, DocRow, shift(), MonthComplete(), TimelineRow, one(), ORDER (+30 more)

### Community 120 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.05
Nodes (72): loadAssets(), FinancialStatements, displayName(), fullAddress(), Party, partyTinLabel(), ABBREVIATIONS, nameTokens() (+64 more)

### Community 122 - "ui.tsx"
Cohesion: 0.13
Nodes (18): NewParty(), NewPartyPage(), FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel (+10 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.11
Nodes (27): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), loadBatchContext(), monthsBetween(), BATCH_KINDS (+19 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "public.ts"
Cohesion: 0.09
Nodes (27): zod, acceptProposalAction(), AcceptState, SERVICES, StartState, QuerySource, conditionsSchema, FEE_ITEM_COLUMNS (+19 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.15
Nodes (18): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+10 more)

### Community 127 - "safeguards.ts"
Cohesion: 0.23
Nodes (13): isWeekend(), documentCutoff(), DONE_FROM_STATUS, isWorkingDay(), riskOf(), STEP_LABELS, StepKey, stepsFor() (+5 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (76): RFC-4180, exceljs, SPREADSHEET_TYPES, geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES (+68 more)

### Community 129 - "engine.test.ts"
Cohesion: 0.20
Nodes (10): DeadlineRule, dueDates(), none, seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027 (+2 more)

### Community 130 - "mime.ts"
Cohesion: 0.14
Nodes (29): RFC-2047, RFC-2822, GET(), EsubmissionMailEnv, accessToken(), call(), findReplies(), headerOf() (+21 more)

### Community 131 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 132 - "xlsx.ts"
Cohesion: 0.23
Nodes (12): GET(), safe(), loadAccounts(), accountLabel(), BATCH_COLUMNS, buildBatchTemplate(), cellText(), MAX_ROWS (+4 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (19): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+11 more)

### Community 134 - "work/page.tsx"
Cohesion: 0.21
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 135 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 136 - "getIdentity"
Cohesion: 0.20
Nodes (18): NoteState, ClientNoteForm(), NewRequestForm(), TicketForm(), ReplyForm(), send(), Textarea(), getIdentity() (+10 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "proposal/[token]/page.tsx"
Cohesion: 0.21
Nodes (12): AcceptForm(), metadata, Proposal(), ProposalPage(), requestQuoteAction(), php, StartForm(), metadata (+4 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "template.ts"
Cohesion: 0.18
Nodes (10): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+2 more)

### Community 141 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 142 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 143 - "book-income.ts"
Cohesion: 0.27
Nodes (9): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+1 more)

### Community 144 - "[employeeId]/page.tsx"
Cohesion: 0.40
Nodes (8): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), loadPriorEmployers(), payAccountsOf(), displayName()

### Community 145 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 146 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.11
Nodes (30): Access, STATUS, Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor() (+22 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.16
Nodes (22): Interval, Admin, appBookedEvents(), busyOf(), connect(), Connection, PersonWeek, teamWeek() (+14 more)

### Community 149 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 150 - "proposal-view.tsx"
Cohesion: 0.39
Nodes (7): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote

### Community 151 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 152 - "safeguards.ts"
Cohesion: 0.12
Nodes (28): GET(), Gap, Email, line(), longDay(), NEEDS, ownerEmail(), shortDay() (+20 more)

### Community 153 - "Badge"
Cohesion: 0.10
Nodes (38): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+30 more)

### Community 154 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.07
Nodes (54): Doc, DocumentsCard(), when(), ExceptionRow, ClientSelect(), loadBooking(), Review(), ApprovedTable() (+46 more)

### Community 156 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 157 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 158 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 160 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (29): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), CheckedRegister, checkRegister() (+21 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "toCentavos"
Cohesion: 0.08
Nodes (45): BOOKED_TYPES, PayrollDocument(), applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap() (+37 more)

### Community 168 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.10
Nodes (30): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction(), addBranchAction() (+22 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (89): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+81 more)

### Community 178 - "binder/page.tsx"
Cohesion: 0.22
Nodes (13): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, amt() (+5 more)

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.20
Nodes (6): approved(), as(), root, as(), attach(), root

### Community 185 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (28): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+20 more)

### Community 193 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (75): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+67 more)

## Knowledge Gaps
- **21 isolated node(s):** `RFC-2047`, `RFC-2822`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1330 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `engine.test.ts`, `mime.ts`, `engine.ts`, `read.test.ts`, `package.json`, `year-end/page.tsx`, `gemini.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `template.ts`, `month.ts`, `statements.ts`, `ledger/types.ts`, `filters.tsx`, `safeguards.ts`, `Badge`, `names.ts`, `app/documents/page.tsx`, `books-2307.test.ts`, `parallel-run.test.ts`, `books-migration.test.ts`, `fixed-assets.test.ts`, `settings/actions.ts`, `scores/page.tsx`, `compare.ts`, `index.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `deadlines/page.tsx`, `registrations/forms.tsx`, `client-form.tsx`, `review-queue.ts`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `clients/[id]/page.tsx`, `Centavos`, `status.ts`, `onboarding/page.tsx`, `returns/types.ts`, `returns-sign-off.test.ts`, `toDecimalString`, `workpapers/page.tsx`, `social-button.tsx`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `quote/page.tsx`, `module-pages.tsx`, `app/requests/page.tsx`, `fields.ts`, `manilaToday`, `app/app/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `payroll/data.ts`, `ledger/books.ts`, `ui.ts`, `rates.ts`, `slots.ts`, `bulk-actions.ts`, `profile.ts`, `portal/page.tsx`, `Lockup`, `calendar/callback/route.ts`, `money.ts`, `cycle/page.tsx`, `returns/load.ts`, `batch/register.ts`, `public.ts`, `[month]/page.tsx`, `safeguards.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `RFC-2047`, `RFC-2822`, `DO_NOT_TRACK` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09216255442670537 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `statement.ts`, `ledger/data.ts`, `package.json`, `year-end/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `dependencies`, `statements.ts`, `scores/page.tsx`, `settlement-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `server-only`, `client-form.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `clients/[id]/page.tsx`, `Notice`, `requireOwner`, `batch/page.tsx`, `review-form.tsx`, `cx`, `social-button.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `LinkButton`, `fees/[id]/page.tsx`, `module-pages.tsx`, `app/requests/page.tsx`, `fields.ts`, `manilaToday`, `app/app/page.tsx`, `portal/reports/page.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `quote/page.tsx`, `ledger/books.ts`, `ui.ts`, `parallel-run.tsx`, `Skeleton`, `proxy.ts`, `bulk-actions.ts`, `profile.ts`, `Badge`, `portal/page.tsx`, `lib/books/actions.ts`, `Lockup`, `calendar/callback/route.ts`, `cycle/page.tsx`, `fixed-assets/forms.tsx`, `ui.tsx`, `batch/register.ts`, `public.ts`, `[month]/page.tsx`, `mime.ts`, `xlsx.ts`, `proof-upload.tsx`, `getIdentity`, `proposal/[token]/page.tsx`, `[employeeId]/page.tsx`, `sign-off-actions.tsx`, `ledger/types.ts`, `safeguards.ts`, `Badge`, `app/documents/page.tsx`, `deadlines/actions.ts`, `register-xlsx.ts`, `toCentavos`, `settings/actions.ts`, `clients/actions.ts`, `registrations/forms.tsx`, `binder/page.tsx`, `onboarding/page.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11184939091915837 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `statement.ts`, `ledger/data.ts`, `package.json`, `year-end/page.tsx`, `proof-upload.tsx`, `getIdentity`, `proposal/[token]/page.tsx`, `requireStaff`, `app/app/layout.tsx`, `file-upload.tsx`, `dependencies`, `[employeeId]/page.tsx`, `statements.ts`, `sign-off-actions.tsx`, `checkbox.tsx`, `filters.tsx`, `Badge`, `app/documents/page.tsx`, `deadlines/actions.ts`, `toCentavos`, `supabaseServer`, `scores/page.tsx`, `settlement-pages.tsx`, `payroll/forms.tsx`, `modal.tsx`, `deadlines/page.tsx`, `registrations/forms.tsx`, `binder/page.tsx`, `client-form.tsx`, `server-only`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `clients/[id]/page.tsx`, `onboarding/page.tsx`, `Notice`, `batch/page.tsx`, `review-form.tsx`, `cx`, `workpapers/page.tsx`, `select.tsx`, `social-button.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `LinkButton`, `stat-cards.tsx`, `fees/[id]/page.tsx`, `theme-toggle.tsx`, `module-pages.tsx`, `app/requests/page.tsx`, `@remixicon/react`, `app/app/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `notification.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `quote/page.tsx`, `ledger/books.ts`, `ui.ts`, `parallel-run.tsx`, `Badge`, `portal/page.tsx`, `lib/books/actions.ts`, `Lockup`, `calendar/callback/route.ts`, `cycle/page.tsx`, `fixed-assets/forms.tsx`, `ui.tsx`, `[month]/page.tsx`?**
  _High betweenness centrality (0.115) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._