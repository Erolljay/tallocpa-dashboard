# Graph Report - agent-ac8678a5e4ee21e95  (2026-11-25)

## Corpus Check
- 782 files · ~617,542 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 7, (none) 5, .mdc 1)

## Summary
- 4891 nodes · 16984 edges · 179 communities (162 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 138 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `3c66e348`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- addDays
- migrate.yml
- cx.ts
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- supabaseServer
- Sign-in & Setup Docs
- onboarding/forms.tsx
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
- draft.ts
- scores/page.tsx
- compare.ts
- payroll/types.ts
- return-file-actions.ts
- ledger/types.ts
- payroll/forms.tsx
- modal.tsx
- year-end/page.tsx
- scripts
- supabaseAdmin
- workpapers/load.ts
- deadlines/page.tsx
- app/settings/page.tsx
- sign-off.ts
- notes.ts
- payroll/payroll.test.ts
- Skeleton
- money.ts
- Notice
- collections/actions.ts
- fees/actions.ts
- steps.ts
- tieouts.test.ts
- cx
- select.tsx
- Apple Design
- public.ts
- vitest
- [clientId]/page.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- safeguards.ts
- stat-cards.tsx
- social-button.tsx
- theme-toggle.tsx
- quote.ts
- notification.tsx
- next
- clients/[id]/page.tsx
- button.tsx
- Pro components
- server-only
- portal/reports/page.tsx
- portal/reports/statements/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- opening.ts
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- workpapers/page.tsx
- ledger/books.ts
- tax-codes.ts
- documents/[id]/page.tsx
- status.ts
- boardui
- rates.ts
- reports/books/print/page.tsx
- proxy.ts
- year.ts
- profile.ts
- sidebar-toggle.tsx
- Opening balances: checklist for any cut-off
- opening-checklist.tsx
- portal/page.tsx
- lib/books/actions.ts
- ledger/data.ts
- calendar/callback/route.ts
- apply-migrations.sh
- vat.ts
- cycle/page.tsx
- filings/[id]/page.tsx
- returns/load.ts
- portalContext
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- Card
- toCentavos
- cycle/actions.ts
- read.test.ts
- checkbox.tsx
- mime.ts
- template.ts
- filings/actions.ts
- review-form.tsx
- work/load.ts
- payment-actions.ts
- documents/labels.ts
- ticked-allocation.test.ts
- fixed-assets/forms.tsx
- ledger.test.ts
- ref_node_fs
- settings/actions.ts
- Centavos
- formatAmount
- Building UIs with BoardUI
- db.test.ts
- sign-off-actions.tsx
- fees/forms.tsx
- calendar/staff.ts
- getIdentity
- leads/actions.ts
- zod
- safeguards-load.ts
- register/page.tsx
- seed.ts
- app/documents/page.tsx
- workpapers.test.ts
- missing-2307/page.tsx
- receipts.ts
- proposal-view.tsx
- register-xlsx.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- fees/types.ts
- file-upload.tsx
- spinner.tsx
- items.ts
- form-1604e.test.ts
- terms.ts
- parallel-run.test.ts
- Badge
- requireOwner
- acting-approver.test.ts
- eslint.config.mjs
- templatePayload
- returns-sign-off.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 293 edges
2. `cx` - 237 edges
3. `Skeleton()` - 230 edges
4. `Notice()` - 226 edges
5. `react` - 224 edges
6. `Button()` - 194 edges
7. `next` - 183 edges
8. `Card()` - 163 edges
9. `Badge()` - 163 edges
10. `vitest` - 141 edges

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

## Communities (179 total, 17 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (52): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307() (+44 more)

### Community 1 - "addDays"
Cohesion: 0.09
Nodes (48): shift(), TimelineFiling, TimelineItem, addDays(), addMonths(), compareIso(), IsoDate, isWeekend() (+40 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "cx.ts"
Cohesion: 0.08
Nodes (23): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+15 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, OpenItem (+10 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

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

### Community 11 - "supabaseServer"
Cohesion: 0.13
Nodes (19): setIncomeTaxMethodAction(), GET(), GET(), POST(), GET(), GET(), GET(), code (+11 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/forms.tsx"
Cohesion: 0.24
Nodes (15): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+7 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (37): FinancialStatementsView(), StatementTable(), statementsFrom(), FsLineKey, Section, add(), buildStatements(), classOf() (+29 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (68): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+60 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "draft.ts"
Cohesion: 0.19
Nodes (14): DraftIssue, draftSchema, digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus (+6 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (37): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+29 more)

### Community 42 - "compare.ts"
Cohesion: 0.07
Nodes (51): KIND, REASON, STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow, compareParallelRun(), differs() (+43 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 44 - "return-file-actions.ts"
Cohesion: 0.26
Nodes (17): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+9 more)

### Community 45 - "ledger/types.ts"
Cohesion: 0.07
Nodes (38): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), codes, PNL, acct(), ADVANCES_FROM, ASSETS (+30 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (56): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+48 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 48 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (52): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, FormState, setYearEndCheckAction() (+44 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "supabaseAdmin"
Cohesion: 0.13
Nodes (32): bookDiscoveryCallAction(), Booking(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage(), when (+24 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.11
Nodes (30): amt(), ApprovalMemo(), Db, TIE, Adjustment, c(), loadPeriodFile(), monthEnd() (+22 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+21 more)

### Community 53 - "app/settings/page.tsx"
Cohesion: 0.14
Nodes (28): SettingsState, HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate() (+20 more)

### Community 54 - "sign-off.ts"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), availableActions(), FilingState, SIGN_OFF_STEPS (+9 more)

### Community 55 - "notes.ts"
Cohesion: 0.11
Nodes (23): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+15 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (50): MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+42 more)

### Community 57 - "Skeleton"
Cohesion: 0.06
Nodes (62): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+54 more)

### Community 58 - "money.ts"
Cohesion: 0.05
Nodes (82): qapBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), client, row(), BUSINESS_TAX_FORMS, form1701Q (+74 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (79): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ChangeBooksStartForm(), CloseYearForm(), EntryForm(), ReleaseReportForm() (+71 more)

### Community 60 - "collections/actions.ts"
Cohesion: 0.30
Nodes (13): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso, recordDepositAction() (+5 more)

### Community 61 - "fees/actions.ts"
Cohesion: 0.28
Nodes (14): activateAction(), createFromTemplateAction(), deleteDraftAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+6 more)

### Community 62 - "steps.ts"
Cohesion: 0.07
Nodes (45): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction(), updateStepAction() (+37 more)

### Community 63 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 64 - "cx"
Cohesion: 0.05
Nodes (46): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+38 more)

### Community 65 - "select.tsx"
Cohesion: 0.07
Nodes (42): react-aria-components@^1.22.1, react-aria-components, blankLine(), InvoiceFormValue, Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider() (+34 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "public.ts"
Cohesion: 0.11
Nodes (25): requestQuoteAction(), SERVICES, StartState, metadata, Start(), StartPage(), conditionsSchema, FEE_ITEM_COLUMNS (+17 more)

### Community 68 - "vitest"
Cohesion: 0.16
Nodes (21): vitest, form1701, form1702RT, year, individual, individual, amounts(), cert2307() (+13 more)

### Community 69 - "[clientId]/page.tsx"
Cohesion: 0.07
Nodes (60): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+52 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (57): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), VerifyButton(), fmtDate() (+49 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.05
Nodes (109): booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList(), Column (+101 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "safeguards.ts"
Cohesion: 0.13
Nodes (22): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "social-button.tsx"
Cohesion: 0.18
Nodes (13): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButton(), SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps (+5 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (40): react-dom@19.3.0, react-dom, BookingPage(), Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS (+32 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (31): EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), buildQuote(), cents() (+23 more)

### Community 80 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 81 - "next"
Cohesion: 0.07
Nodes (47): nextConfig, next, addClientNoteAction(), Binder(), BinderPage(), one(), TIE_STATUS, DashboardStats() (+39 more)

### Community 82 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (43): ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), ClientTab, ClientTabs(), UNDER (+35 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "server-only"
Cohesion: 0.14
Nodes (19): server-only, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow, longDay() (+11 more)

### Community 86 - "portal/reports/page.tsx"
Cohesion: 0.16
Nodes (22): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+14 more)

### Community 87 - "portal/reports/statements/page.tsx"
Cohesion: 0.15
Nodes (31): PortalClient, Books(), PortalBooks(), basePeriod(), HeldNote(), holdsWhat(), ParamSelect(), emptyClass (+23 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (23): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+15 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.16
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+11 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.18
Nodes (14): bookedTime, LeadPage(), Person, day(), Leads(), LeadsPage(), Row, ViewLink() (+6 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.09
Nodes (46): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+38 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.08
Nodes (43): dayBefore(), GET(), safe(), fromWorkbookData(), BOOK_ABBR, BOOK_KINDS, BookEntry, BookKind (+35 more)

### Community 101 - "tax-codes.ts"
Cohesion: 0.21
Nodes (14): appliesTo(), canGoOn(), formsFor(), placeOf(), RETURN_LINES, ReturnForm, ReturnLine, returnLinesFor() (+6 more)

### Community 102 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (32): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), PayrollReadState, ColumnMapping(), KIND_LABEL (+24 more)

### Community 103 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 106 - "reports/books/print/page.tsx"
Cohesion: 0.15
Nodes (19): BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages(), Pad() (+11 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "year.ts"
Cohesion: 0.16
Nodes (20): Payroll(), PayrollPage(), MonthLines, Suggestion, CheckedRegister, checkRegister(), fmt(), ID_HEADERS (+12 more)

### Community 109 - "profile.ts"
Cohesion: 0.07
Nodes (44): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+36 more)

### Community 110 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (25): Access, STATUS, Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor() (+17 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (33): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+25 more)

### Community 114 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (37): fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, books(), checkInvoice(), checkSettlement(), invoiceModule() (+29 more)

### Community 115 - "ledger/data.ts"
Cohesion: 0.11
Nodes (35): AmendmentDecision(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), OpeningUpload(), PermitForm() (+27 more)

### Community 116 - "calendar/callback/route.ts"
Cohesion: 0.18
Nodes (18): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+10 more)

### Community 118 - "vat.ts"
Cohesion: 0.14
Nodes (40): sawtBuckets(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+32 more)

### Community 119 - "cycle/page.tsx"
Cohesion: 0.23
Nodes (12): Cycle(), CyclePage(), CycleWithClient, DocRow, CycleRow, EXCEPTION_DECISIONS, ExceptionDecision, parseMonth() (+4 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (65): ClientReturnsPage(), FilingRow, Returns(), Detail(), StatementPage(), FilingListRow, bookKind, BookRow (+57 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.07
Nodes (57): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule() (+49 more)

### Community 122 - "portalContext"
Cohesion: 0.25
Nodes (13): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), portalContext(), Portal2316(), Portal2316Page(), PortalReport() (+5 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "Card"
Cohesion: 0.11
Nodes (41): BooksMonthsPage(), Months(), one(), DocumentsCard(), when(), BrandSettings(), BrandSettingsPage(), COLUMNS (+33 more)

### Community 126 - "toCentavos"
Cohesion: 0.15
Nodes (19): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+11 more)

### Community 127 - "cycle/actions.ts"
Cohesion: 0.24
Nodes (15): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+7 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (72): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), PayrollItem, amountOf() (+64 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "mime.ts"
Cohesion: 0.12
Nodes (31): RFC-2047, RFC-2822, GET(), DatFiles, datFiles(), Db, accessToken(), call() (+23 more)

### Community 131 - "template.ts"
Cohesion: 0.14
Nodes (11): items, PRICES, schedule, settings, items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+3 more)

### Community 132 - "filings/actions.ts"
Cohesion: 0.22
Nodes (15): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+7 more)

### Community 133 - "review-form.tsx"
Cohesion: 0.06
Nodes (61): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), Booking, BookingFields() (+53 more)

### Community 134 - "work/load.ts"
Cohesion: 0.20
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 135 - "payment-actions.ts"
Cohesion: 0.29
Nodes (12): accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+4 more)

### Community 136 - "documents/labels.ts"
Cohesion: 0.07
Nodes (42): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+34 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.03
Nodes (32): pg, outDir, pkgDir, require, { version }, ctx, input, root (+24 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.26
Nodes (12): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, updateRuleAction(), checkbox, dayBefore() (+4 more)

### Community 142 - "Centavos"
Cohesion: 0.10
Nodes (25): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), Bucket, SaleSplit, NewEmployeeRow (+17 more)

### Community 143 - "formatAmount"
Cohesion: 0.20
Nodes (22): amt(), CertificatesTable(), PartsLink(), PurchasesTable(), SalesTable(), th(), amt(), MonthSection() (+14 more)

### Community 144 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "db.test.ts"
Cohesion: 0.13
Nodes (6): api, ctx, fn, rows, src, root

### Community 146 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 147 - "fees/forms.tsx"
Cohesion: 0.24
Nodes (11): FeeFormState, ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result() (+3 more)

### Community 148 - "calendar/staff.ts"
Cohesion: 0.17
Nodes (18): Interval, Admin, Connection, PersonWeek, accessToken(), CALENDAR_SCOPES, CalendarEvent, emailOf() (+10 more)

### Community 149 - "getIdentity"
Cohesion: 0.17
Nodes (22): ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity(), ProofState, startProofUpload() (+14 more)

### Community 150 - "leads/actions.ts"
Cohesion: 0.25
Nodes (19): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+11 more)

### Community 151 - "zod"
Cohesion: 0.25
Nodes (10): zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text() (+2 more)

### Community 152 - "safeguards-load.ts"
Cohesion: 0.12
Nodes (28): GET(), CoverageClient, coverageGaps(), Gap, GapKind, Email, line(), longDay() (+20 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.13
Nodes (28): Href, LineParts(), one(), Register(), RegisterPage(), shiftMonth(), SOURCE, ACCOUNTS (+20 more)

### Community 154 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (25): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+17 more)

### Community 156 - "workpapers.test.ts"
Cohesion: 0.20
Nodes (8): client(), RegisterRow, approved(), as(), root, as(), bookedDoc(), root

### Community 157 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 158 - "receipts.ts"
Cohesion: 0.28
Nodes (8): cents(), CLIENT_MONEY_KINDS, FEE_KINDS, grossReceiptsWatch(), pesos(), ReceiptRow, VAT_THRESHOLD, WatchStatus

### Community 159 - "proposal-view.tsx"
Cohesion: 0.23
Nodes (11): PriceRow, Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote (+3 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (26): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+18 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.24
Nodes (18): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), manilaInstant(), appBookedEvents() (+10 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 166 - "fees/types.ts"
Cohesion: 0.23
Nodes (12): count(), first(), pick(), profileFromQuery(), QuerySource, BOOKKEEPING_LEVELS, BookkeepingLevel, COMPLEXITY_FLAGS (+4 more)

### Community 167 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 168 - "spinner.tsx"
Cohesion: 0.32
Nodes (7): PendingGlyph(), Arc(), SIZES, Spinner(), SpinnerGlyph(), SpinnerProps, SpinnerSize

### Community 169 - "items.ts"
Cohesion: 0.29
Nodes (7): BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, AmountField

### Community 170 - "form-1604e.test.ts"
Cohesion: 0.25
Nodes (3): client, YEAR, EwtQuarter

### Community 171 - "terms.ts"
Cohesion: 0.47
Nodes (3): canonicalContent(), defaultTerms(), ProposalContent

### Community 172 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 173 - "Badge"
Cohesion: 0.09
Nodes (54): @remixicon/react, caseNote, caseTitle, CompleteButton(), statusTone, StepBadge(), StepRow, submitLabel (+46 more)

### Community 174 - "requireOwner"
Cohesion: 0.09
Nodes (40): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setupMissingChartsAction() (+32 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 177 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 180 - "templatePayload"
Cohesion: 0.06
Nodes (16): templatePayload(), as(), client(), root, Data, root, Row, as() (+8 more)

### Community 181 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1312 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `addDays`, `mime.ts`, `template.ts`, `arap.ts`, `package.json`, `review-form.tsx`, `gemini.ts`, `read.test.ts`, `filings/actions.ts`, `ticked-allocation.test.ts`, `supabaseServer`, `ref_node_fs`, `settings/actions.ts`, `ledger.test.ts`, `db.test.ts`, `statements.ts`, `safeguards-load.ts`, `register/page.tsx`, `app/documents/page.tsx`, `workpapers.test.ts`, `calendar/page.tsx`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `scores/page.tsx`, `compare.ts`, `terms.ts`, `form-1604e.test.ts`, `ledger/types.ts`, `requireOwner`, `Badge`, `year-end/page.tsx`, `acting-approver.test.ts`, `supabaseAdmin`, `workpapers/load.ts`, `deadlines/page.tsx`, `app/settings/page.tsx`, `sign-off.ts`, `notes.ts`, `payroll/payroll.test.ts`, `templatePayload`, `money.ts`, `returns-sign-off.test.ts`, `fees/actions.ts`, `steps.ts`, `tieouts.test.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `module-pages.tsx`, `safeguards.ts`, `theme-toggle.tsx`, `quote.ts`, `clients/[id]/page.tsx`, `server-only`, `portal/reports/page.tsx`, `portal/reports/statements/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `opening.ts`, `payroll/data.ts`, `parallel-run.test.ts`, `ledger/books.ts`, `tax-codes.ts`, `documents/[id]/page.tsx`, `status.ts`, `rates.ts`, `profile.ts`, `opening-checklist.tsx`, `portal/page.tsx`, `calendar/callback/route.ts`, `cycle/page.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `toCentavos`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08028846153846154 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `checkbox.tsx`, `cx.ts`, `package.json`, `review-form.tsx`, `documents/labels.ts`, `fixed-assets/forms.tsx`, `supabaseServer`, `onboarding/forms.tsx`, `dependencies`, `sign-off-actions.tsx`, `fees/forms.tsx`, `statements.ts`, `getIdentity`, `leads/actions.ts`, `register/page.tsx`, `app/documents/page.tsx`, `missing-2307/page.tsx`, `calendar/page.tsx`, `file-upload.tsx`, `spinner.tsx`, `scores/page.tsx`, `compare.ts`, `return-file-actions.ts`, `Badge`, `payroll/forms.tsx`, `modal.tsx`, `year-end/page.tsx`, `supabaseAdmin`, `deadlines/page.tsx`, `app/settings/page.tsx`, `Notice`, `cx`, `select.tsx`, `public.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `social-button.tsx`, `theme-toggle.tsx`, `notification.tsx`, `next`, `clients/[id]/page.tsx`, `button.tsx`, `server-only`, `portal/reports/page.tsx`, `portal/reports/statements/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `documents/[id]/page.tsx`, `reports/books/print/page.tsx`, `year.ts`, `profile.ts`, `sidebar-toggle.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `cycle/page.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `portalContext`, `batch/register.ts`, `Card`, `toCentavos`, `cycle/actions.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `addDays` be split into smaller, more focused modules?**
  _Cohesion score 0.09316394434361766 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `read.test.ts`, `mime.ts`, `filings/actions.ts`, `package.json`, `review-form.tsx`, `payment-actions.ts`, `documents/labels.ts`, `fixed-assets/forms.tsx`, `supabaseServer`, `onboarding/forms.tsx`, `settings/actions.ts`, `dependencies`, `sign-off-actions.tsx`, `getIdentity`, `leads/actions.ts`, `zod`, `safeguards-load.ts`, `register/page.tsx`, `app/documents/page.tsx`, `missing-2307/page.tsx`, `scores/page.tsx`, `compare.ts`, `return-file-actions.ts`, `Badge`, `requireOwner`, `modal.tsx`, `payroll/forms.tsx`, `year-end/page.tsx`, `supabaseAdmin`, `workpapers/load.ts`, `deadlines/page.tsx`, `app/settings/page.tsx`, `Skeleton`, `collections/actions.ts`, `fees/actions.ts`, `steps.ts`, `cx`, `public.ts`, `[clientId]/page.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `server-only`, `portal/reports/page.tsx`, `portal/reports/statements/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `payroll/data.ts`, `workpapers/page.tsx`, `ledger/books.ts`, `documents/[id]/page.tsx`, `reports/books/print/page.tsx`, `proxy.ts`, `year.ts`, `profile.ts`, `sidebar-toggle.tsx`, `opening-checklist.tsx`, `portal/page.tsx`, `lib/books/actions.ts`, `ledger/data.ts`, `calendar/callback/route.ts`, `cycle/page.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `portalContext`, `batch/register.ts`, `Card`, `toCentavos`, `cycle/actions.ts`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._