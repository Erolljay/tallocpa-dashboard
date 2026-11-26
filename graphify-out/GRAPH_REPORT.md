# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 792 files · ~636,664 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4932 nodes · 17134 edges · 180 communities (154 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 142 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `912420d8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- engine.ts
- migrate.yml
- manilaToday
- ledger/data.ts
- package.json
- cx.ts
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
- vat.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- lock-bar.tsx
- scores/page.tsx
- registrations/forms.tsx
- payroll/types.ts
- returns/types.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- filings/run.ts
- scripts
- supabaseAdmin
- workpapers/page.tsx
- review/page.tsx
- app/settings/page.tsx
- filings/[id]/page.tsx
- app/app/page.tsx
- payroll/payroll.test.ts
- invoice-pages.tsx
- form-1604e.ts
- Notice
- supabaseServer
- toDecimalString
- Centavos
- ui.tsx
- cx
- select.tsx
- Apple Design
- sign-in-form.tsx
- testing.ts
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- reader.ts
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote/page.tsx
- ref_node_fs
- PageHeader
- documents/labels.ts
- button.tsx
- Pro components
- server-only
- acting-approver/page.tsx
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
- settlement-pages.tsx
- ledger/books.ts
- ui.ts
- columns.ts
- Skeleton
- boardui
- rates.ts
- slots.ts
- proxy.ts
- documents/[id]/page.tsx
- profile.ts
- vitest
- Opening balances: checklist for any cut-off
- assets/schedule.ts
- portal/page.tsx
- lib/books/actions.ts
- package.json
- calendar/callback/route.ts
- apply-migrations.sh
- buildSawt
- cycle/actions.ts
- payroll-read.tsx
- Centavos
- staff/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- [month]/page.tsx
- cycle/page.tsx
- read.test.ts
- missing-2307/page.tsx
- return-file-actions.ts
- returns/books.test.ts
- app/requests/[id]/page.tsx
- gemini.ts
- work/load.ts
- [employeeId]/page.tsx
- Textarea
- ticked-allocation.test.ts
- manilaToday
- ledger.test.ts
- form-1604e.test.ts
- BoardUI page patterns
- section-tabs.tsx
- parties/page.tsx
- eslint.config.mjs
- generate-qap-fixture.mjs
- names.ts
- ledger/types.ts
- calendar/staff.ts
- copy-opencv.mjs
- register-books.test.ts
- ledger-lock.test.ts
- safeguards.ts
- parts.ts
- funnel.test.ts
- filters.tsx
- leads-pipeline.test.ts
- parallel-run.test.ts
- portal-statements-approval.test.ts
- registration.test.ts
- grid.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- any-cutoff.test.ts
- fixed-assets.test.ts
- toCentavos
- ledger-closing.test.ts
- returns-books.test.ts
- adjustments.test.ts
- batch-upload.test.ts
- client-reports.test.ts
- year-end.test.ts
- clients/actions.ts
- acting-approver.test.ts
- registrations/forms.tsx
- db.test.ts
- returns-sign-off.test.ts
- onboarding/page.tsx
- money.ts

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

## Communities (180 total, 26 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (52): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307() (+44 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (50): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+42 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.10
Nodes (38): @remixicon/react, Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), portalContext(), one() (+30 more)

### Community 4 - "ledger/data.ts"
Cohesion: 0.10
Nodes (37): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), AMENDMENT_BADGE, Books() (+29 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, tsx@^4.23.15, @types/node@^20, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "cx.ts"
Cohesion: 0.05
Nodes (43): ClientTab, UNDER, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter() (+35 more)

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
Cohesion: 0.25
Nodes (19): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), markCwtFollowedUpAction(), addReturnFile(), checkEsubmissionReplyAction() (+11 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "app/app/layout.tsx"
Cohesion: 0.14
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+11 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (53): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+45 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.11
Nodes (61): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+53 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "lock-bar.tsx"
Cohesion: 0.06
Nodes (57): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+49 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (63): KIND, REASON, Section(), shortDate(), STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow (+55 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.09
Nodes (41): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+33 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (52): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+44 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (44): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+36 more)

### Community 48 - "filings/run.ts"
Cohesion: 0.14
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.19
Nodes (19): GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book() (+11 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.06
Nodes (56): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+48 more)

### Community 52 - "review/page.tsx"
Cohesion: 0.11
Nodes (29): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, Queue(), ReviewPage(), Row (+21 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (25): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+17 more)

### Community 54 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): SignOffState, bookKind, BookRow, bookStatus, Event, eventText, Filing(), FilingFile (+29 more)

### Community 55 - "app/app/page.tsx"
Cohesion: 0.11
Nodes (28): removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), NotesCard(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+20 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (68): GridRow, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet() (+60 more)

### Community 57 - "invoice-pages.tsx"
Cohesion: 0.09
Nodes (37): INVOICE_KINDS, InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE, PurchaseInvoicesViewPage(), PurchaseInvoicesListPage() (+29 more)

### Community 58 - "form-1604e.ts"
Cohesion: 0.07
Nodes (52): VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine (+44 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (68): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+60 more)

### Community 60 - "supabaseServer"
Cohesion: 0.07
Nodes (58): nextConfig, next, zod, addClientNoteAction(), addChargeAction(), applyCreditAction(), clearRemittedAction(), date (+50 more)

### Community 61 - "toDecimalString"
Cohesion: 0.12
Nodes (26): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+18 more)

### Community 62 - "Centavos"
Cohesion: 0.10
Nodes (23): BirLineKey, Bucket, SaleSplit, LABELS, PayTotals, TotalCheck, totalsAgree(), BookIncome (+15 more)

### Community 63 - "ui.tsx"
Cohesion: 0.11
Nodes (17): DocReviewActions(), NewParty(), NewPartyPage(), ReplyForm(), YearSelect(), metadata, Start(), StartPage() (+9 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (39): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, Checkbox(), CheckboxProps, CheckboxGlyph() (+31 more)

### Community 65 - "select.tsx"
Cohesion: 0.10
Nodes (32): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+24 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "sign-in-form.tsx"
Cohesion: 0.15
Nodes (18): GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors (+10 more)

### Community 68 - "testing.ts"
Cohesion: 0.17
Nodes (19): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+11 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (49): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), OpenItem (+41 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (49): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+41 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (52): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+44 more)

### Community 72 - "formatAmount"
Cohesion: 0.12
Nodes (36): BankAccountsRoute(), booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column (+28 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "reader.ts"
Cohesion: 0.15
Nodes (20): geminiJson(), ITEM_KINDS, confidence(), geminiPayrollReader(), imageRead(), payrollReaderFromEnv(), toFigure(), describeItems() (+12 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (44): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+36 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.09
Nodes (35): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+27 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.06
Nodes (65): PriceRow, requestQuoteAction(), SERVICES, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+57 more)

### Community 80 - "ref_node_fs"
Cohesion: 0.08
Nodes (8): ctx, input, Data, root, Row, root, root, root

### Community 81 - "PageHeader"
Cohesion: 0.09
Nodes (50): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+42 more)

### Community 82 - "documents/labels.ts"
Cohesion: 0.10
Nodes (35): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+27 more)

### Community 83 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.18
Nodes (14): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+6 more)

### Community 86 - "acting-approver/page.tsx"
Cohesion: 0.15
Nodes (26): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), Summary(), EndButton() (+18 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.09
Nodes (56): PortalClient, Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat() (+48 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (31): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+23 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (43): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState (+35 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.11
Nodes (38): server-only, @supabase/supabase-js, AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+30 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "settlement-pages.tsx"
Cohesion: 0.16
Nodes (18): PaymentsNewPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsEditPage(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+10 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "ui.ts"
Cohesion: 0.07
Nodes (52): blankLine(), InvoiceForm(), InvoiceFormValue, BooksSummaryPage(), Summary(), SummaryCard(), Booking, BookingFields() (+44 more)

### Community 102 - "columns.ts"
Cohesion: 0.14
Nodes (20): BirCategory, CATEGORY_ALIASES, FIELD_ALIASES, FIELD_BY_ALIAS, liveTarget(), SavedMap, SheetRows, targetOptions() (+12 more)

### Community 103 - "Skeleton"
Cohesion: 0.10
Nodes (32): react, one(), CustomersRoute(), InvoiceEdit(), JournalEntryRoute(), NewEntry(), NewEntryPage(), MonthSelect() (+24 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 106 - "slots.ts"
Cohesion: 0.23
Nodes (14): addDays(), byDay(), DAY_LABEL, freeSlots(), isFree(), LabelledDay, manilaDate(), overlaps() (+6 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "documents/[id]/page.tsx"
Cohesion: 0.05
Nodes (73): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BOOKED_TYPES (+65 more)

### Community 109 - "profile.ts"
Cohesion: 0.06
Nodes (43): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, BRAND_FILES, BrandFileKind, birSchema, blank() (+35 more)

### Community 110 - "vitest"
Cohesion: 0.04
Nodes (20): pg, vitest, approved(), as(), root, root, root, root (+12 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "assets/schedule.ts"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.09
Nodes (40): BooksChart(), compact, longMonth(), short(), shortMonth(), cents(), Home(), initials() (+32 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.15
Nodes (26): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+18 more)

### Community 115 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, @types/pg@^8.23.1, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.21
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "buildSawt"
Cohesion: 0.14
Nodes (41): incomeAttachments(), Periods, buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments(), sawtCsv(), sawtDat() (+33 more)

### Community 119 - "cycle/actions.ts"
Cohesion: 0.21
Nodes (17): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton(), closeCycleAction() (+9 more)

### Community 120 - "payroll-read.tsx"
Cohesion: 0.17
Nodes (17): PayrollDocument(), PayrollIntake(), KIND_LABEL, MATCH_BADGE, PayrollReadReview(), peso(), ReadItem, ReadPayrollButton() (+9 more)

### Community 121 - "Centavos"
Cohesion: 0.06
Nodes (65): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+57 more)

### Community 122 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.07
Nodes (67): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+59 more)

### Community 126 - "[month]/page.tsx"
Cohesion: 0.10
Nodes (32): MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton() (+24 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.18
Nodes (19): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, EXCEPTION_DECISIONS, ExceptionDecision (+11 more)

### Community 128 - "read.test.ts"
Cohesion: 0.09
Nodes (23): amountOf(), applyColumns(), columnsOf(), findHeaderRow(), knownTarget(), unmappedColumns(), ANA1, ANA2 (+15 more)

### Community 129 - "missing-2307/page.tsx"
Cohesion: 0.33
Nodes (7): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row, peso

### Community 130 - "return-file-actions.ts"
Cohesion: 0.15
Nodes (27): RFC-2047, RFC-2822, EsubmissionMailEnv, accessToken(), call(), findReplies(), headerOf(), MailMessage (+19 more)

### Community 131 - "returns/books.test.ts"
Cohesion: 0.16
Nodes (10): client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q (+2 more)

### Community 132 - "app/requests/[id]/page.tsx"
Cohesion: 0.40
Nodes (8): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), Thread(), ThreadMessage, when()

### Community 133 - "gemini.ts"
Cohesion: 0.09
Nodes (25): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+17 more)

### Community 134 - "work/load.ts"
Cohesion: 0.16
Nodes (21): Action(), MyWork(), MyWorkPage(), short(), TONE, addDays(), parseIso(), lastMonth() (+13 more)

### Community 135 - "[employeeId]/page.tsx"
Cohesion: 0.44
Nodes (7): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), EmployeeForm(), PriorEmployerForm(), payAccountsOf()

### Community 136 - "Textarea"
Cohesion: 0.14
Nodes (25): NoteState, ClientNoteForm(), ExplainForm(), NewRequestForm(), TicketForm(), ReplyForm(), send(), METHODS (+17 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "manilaToday"
Cohesion: 0.09
Nodes (33): GET(), Binder(), BinderPage(), one(), TIE_STATUS, generateFilingsNow(), CELL, FirmParallelRunPage() (+25 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "form-1604e.test.ts"
Cohesion: 0.22
Nodes (4): form1604E, client, YEAR, EwtQuarter

### Community 141 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 142 - "section-tabs.tsx"
Cohesion: 0.43
Nodes (6): FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey

### Community 143 - "parties/page.tsx"
Cohesion: 0.38
Nodes (6): one(), PartiesPage(), PartyList(), Row, PARTY_KINDS, VAT_STATUSES

### Community 144 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 146 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 147 - "ledger/types.ts"
Cohesion: 0.12
Nodes (26): Access, OpeningChecklist(), STATUS, Row, Asset, CASH_FLOW_CLASSES, CashFlowClass, Cutoff (+18 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (21): Interval, Admin, busyOf(), connect(), Connection, PersonWeek, teamWeek(), accessToken() (+13 more)

### Community 149 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 150 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 152 - "safeguards.ts"
Cohesion: 0.08
Nodes (45): SafeguardsNotice(), TAX_TYPES, CoverageClient, coverageGaps(), Gap, GapKind, isWeekend(), Email (+37 more)

### Community 153 - "parts.ts"
Cohesion: 0.10
Nodes (45): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+37 more)

### Community 154 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 155 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 156 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 160 - "grid.ts"
Cohesion: 0.24
Nodes (11): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+9 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "toCentavos"
Cohesion: 0.14
Nodes (23): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+15 more)

### Community 167 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 174 - "clients/actions.ts"
Cohesion: 0.05
Nodes (64): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction(), setIncomeTaxMethodAction(), setupMissingChartsAction() (+56 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.07
Nodes (54): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+46 more)

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 185 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (30): StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction() (+22 more)

### Community 193 - "money.ts"
Cohesion: 0.15
Nodes (20): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+12 more)

## Knowledge Gaps
- **21 isolated node(s):** `RFC-2047`, `RFC-2822`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1330 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `engine.ts`, `package.json`, `statements.ts`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `index.ts`, `filings/run.ts`, `workpapers/page.tsx`, `review/page.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `app/app/page.tsx`, `payroll/payroll.test.ts`, `invoice-pages.tsx`, `form-1604e.ts`, `toDecimalString`, `sign-in-form.tsx`, `testing.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `theme-toggle.tsx`, `quote/page.tsx`, `ref_node_fs`, `PageHeader`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `leads/[id]/page.tsx`, `opening.ts`, `payroll/data.ts`, `ledger/books.ts`, `ui.ts`, `rates.ts`, `slots.ts`, `documents/[id]/page.tsx`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `package.json`, `calendar/callback/route.ts`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `returns/books.test.ts`, `gemini.ts`, `work/load.ts`, `ticked-allocation.test.ts`, `ledger.test.ts`, `form-1604e.test.ts`, `names.ts`, `ledger/types.ts`, `register-books.test.ts`, `ledger-lock.test.ts`, `safeguards.ts`, `parts.ts`, `funnel.test.ts`, `filters.tsx`, `leads-pipeline.test.ts`, `parallel-run.test.ts`, `portal-statements-approval.test.ts`, `registration.test.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `any-cutoff.test.ts`, `fixed-assets.test.ts`, `ledger-closing.test.ts`, `returns-books.test.ts`, `adjustments.test.ts`, `batch-upload.test.ts`, `client-reports.test.ts`, `year-end.test.ts`, `clients/actions.ts`, `acting-approver.test.ts`, `registrations/forms.tsx`, `db.test.ts`, `returns-sign-off.test.ts`, `onboarding/page.tsx`, `money.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **What connects `RFC-2047`, `RFC-2822`, `DO_NOT_TRACK` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07932692307692307 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `missing-2307/page.tsx`, `manilaToday`, `ledger/data.ts`, `app/requests/[id]/page.tsx`, `work/load.ts`, `[employeeId]/page.tsx`, `Textarea`, `cx.ts`, `manilaToday`, `requireStaff`, `app/app/layout.tsx`, `section-tabs.tsx`, `dependencies`, `parties/page.tsx`, `statements.ts`, `parts.ts`, `filters.tsx`, `calendar/page.tsx`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `clients/actions.ts`, `modal.tsx`, `payroll/forms.tsx`, `filings/run.ts`, `registrations/forms.tsx`, `workpapers/page.tsx`, `review/page.tsx`, `app/settings/page.tsx`, `filings/[id]/page.tsx`, `app/app/page.tsx`, `supabaseAdmin`, `invoice-pages.tsx`, `onboarding/page.tsx`, `Notice`, `supabaseServer`, `ui.tsx`, `cx`, `money.ts`, `select.tsx`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `PageHeader`, `documents/labels.ts`, `button.tsx`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `notification.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `settlement-pages.tsx`, `ledger/books.ts`, `ui.ts`, `documents/[id]/page.tsx`, `assets/schedule.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `calendar/callback/route.ts`, `cycle/actions.ts`, `payroll-read.tsx`, `staff/page.tsx`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07796610169491526 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `missing-2307/page.tsx`, `manilaToday`, `ledger/data.ts`, `app/requests/[id]/page.tsx`, `cx.ts`, `[employeeId]/page.tsx`, `work/load.ts`, `Textarea`, `manilaToday`, `requireStaff`, `app/app/layout.tsx`, `section-tabs.tsx`, `dependencies`, `parties/page.tsx`, `statements.ts`, `ledger/types.ts`, `parts.ts`, `toCentavos`, `lock-bar.tsx`, `scores/page.tsx`, `registrations/forms.tsx`, `clients/actions.ts`, `modal.tsx`, `payroll/forms.tsx`, `filings/run.ts`, `supabaseAdmin`, `workpapers/page.tsx`, `review/page.tsx`, `registrations/forms.tsx`, `filings/[id]/page.tsx`, `app/app/page.tsx`, `app/settings/page.tsx`, `invoice-pages.tsx`, `onboarding/page.tsx`, `Notice`, `toDecimalString`, `ui.tsx`, `cx`, `money.ts`, `sign-in-form.tsx`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `formatAmount`, `theme-toggle.tsx`, `PageHeader`, `documents/labels.ts`, `button.tsx`, `server-only`, `acting-approver/page.tsx`, `portal/reports/page.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `settlement-pages.tsx`, `ledger/books.ts`, `ui.ts`, `Skeleton`, `proxy.ts`, `documents/[id]/page.tsx`, `profile.ts`, `assets/schedule.ts`, `portal/page.tsx`, `lib/books/actions.ts`, `package.json`, `calendar/callback/route.ts`, `cycle/actions.ts`, `Centavos`, `batch/register.ts`, `quote/page.tsx`, `[month]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._