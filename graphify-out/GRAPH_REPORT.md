# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1017 files · ~850,375 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6239 nodes · 22253 edges · 195 communities (165 shown, 30 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `76181777`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- params.ts
- package.json
- [userId]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/period.ts
- Sign-in & Setup Docs
- Badge
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
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- clients/[id]/page.tsx
- returns/types.ts
- status.ts
- register-xlsx.ts
- modal.tsx
- supabaseServer
- scripts
- slots.ts
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- quote.ts
- binder/page.tsx
- tax-codes.ts
- proposal-view.tsx
- returns/load.ts
- steps.ts
- ref_node_fs
- opening.ts
- year-end/page.tsx
- lib/books/actions.ts
- report-periods.ts
- marketing/page.tsx
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- payroll/payroll.test.ts
- books/forms.tsx
- assets/schedule.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- year.ts
- requireOwner
- quote/page.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- idle-watcher.tsx
- cx.ts
- Pro components
- review/page.tsx
- Notice
- portalContext
- portal-billing.test.ts
- board.ts
- document-scanner.tsx
- [slug]/page.tsx
- LinkButton
- memo.ts
- server.ts
- Recipes
- Skeleton
- BoardUI theming reference
- Pro templates
- calendar/page.tsx
- Centavos
- ledger/data.ts
- cx
- opening-checklist.tsx
- boardui
- layout.ts
- cwt-tracker-view.tsx
- review-forms.tsx
- tieouts.ts
- [month]/page.tsx
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- sign-off-actions.tsx
- cwt-match.tsx
- filings/actions.ts
- apply-migrations.sh
- public.ts
- auth-templates.ts
- cancel-server.ts
- leads/[id]/page.tsx
- fixed-assets/forms.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- auth.ts
- leads-pipeline.test.ts
- holiday-list.ts
- read.test.ts
- month.ts
- return-file-actions.ts
- app/settings/page.tsx
- react
- ocr/run.ts
- public.ts
- blocks.tsx
- clients/actions.ts
- ticked-allocation.test.ts
- runs.tsx
- work/load.ts
- workpapers/load.ts
- payroll/forms.tsx
- BoardUI page patterns
- deadlines/page.tsx
- quote.ts
- payroll/types.ts
- email/brand.ts
- @remixicon/react
- template.ts
- generate-qap-fixture.mjs
- db.test.ts
- lead-attribution.test.ts
- ledger.test.ts
- split-bundled-pdfs.test.ts
- social-button.tsx
- move-bar.tsx
- copy-opencv.mjs
- parties/schema.ts
- contact-access.test.ts
- onboarding/page.tsx
- next
- Rework: one flow from lead to year-end
- calendar/staff.ts
- notifications.test.ts
- ledger-lock.test.ts
- returns-books.test.ts
- register/page.tsx
- opengraph-image.tsx
- adjustments.test.ts
- getIdentity
- approve-and-post.test.ts
- contribution-payables.test.ts
- year-end.test.ts
- cycle/page.tsx
- notification-bell.tsx
- acting-approver.test.ts
- fields.ts
- returns-sign-off.test.ts
- @supabase/ssr
- @techstark/opencv-js
- filed-returns.ts
- rates.ts
- tests/proposal-email.test.ts
- vitest
- books-migration.test.ts
- eslint.config.mjs
- Badge
- review-form.tsx
- templates/README.md
- documents/[id]/page.tsx
- seed.ts
- contribution-remittances.test.ts
- cwt-2307-tracker.test.ts
- tests/register.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 399 edges
2. `cx` - 313 edges
3. `react` - 283 edges
4. `Notice()` - 269 edges
5. `Skeleton()` - 258 edges
6. `Button()` - 250 edges
7. `next` - 245 edges
8. `vitest` - 195 edges
9. `Card()` - 187 edges
10. `Badge()` - 187 edges

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

## Communities (195 total, 30 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (51): BooksContext, load2307Staff(), Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307() (+43 more)

### Community 1 - "index.ts"
Cohesion: 0.04
Nodes (33): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+25 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (70): booksViewFor(), fmtMonth(), WithdrawReportButton(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage() (+62 more)

### Community 4 - "params.ts"
Cohesion: 0.22
Nodes (13): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+5 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "[userId]/page.tsx"
Cohesion: 0.07
Nodes (56): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+48 more)

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

### Community 11 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.07
Nodes (76): ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS (+68 more)

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
Cohesion: 0.10
Nodes (34): FinancialStatementsView(), StatementTable(), CashFlowClass, statementsFrom(), add(), buildStatements(), classOf(), Column (+26 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (78): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+70 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 25 - "Vercel Cron Config"
Cohesion: 0.50
Nodes (3): crons, regions, $schema

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.17
Nodes (25): addMonths(), buildTracker(), calendarQuarterStart(), cents(), explainMatch(), fromCents(), lastDay(), looseDocuments() (+17 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (60): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+52 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (77): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), KIND (+69 more)

### Community 43 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (25): RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), fmtMonth(), frequencyLabel, Content() (+17 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.04
Nodes (91): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+83 more)

### Community 45 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 46 - "register-xlsx.ts"
Cohesion: 0.13
Nodes (23): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+15 more)

### Community 47 - "modal.tsx"
Cohesion: 0.07
Nodes (47): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+39 more)

### Community 48 - "supabaseServer"
Cohesion: 0.06
Nodes (74): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), AmendmentNotice(), fieldErrors(), PartyFormState, savePartyAction() (+66 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.11
Nodes (31): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), bookDiscoveryCallAction(), bookClientMeetingAction(), CancelState, BookingState (+23 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.12
Nodes (33): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+25 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (46): maxDuration, POST(), TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked(), Choice (+38 more)

### Community 54 - "quote.ts"
Cohesion: 0.11
Nodes (31): PriceRow, proposal(), gapFor(), buildProposalQuote(), buildQuote(), catchUpFor(), CatchUpLine, cents() (+23 more)

### Community 55 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 56 - "tax-codes.ts"
Cohesion: 0.16
Nodes (18): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+10 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (15): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+7 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.08
Nodes (46): FinancialStatements, withNonDeductible(), dayBefore(), FilingRow, listInvoices(), loadEwtRemittances(), loadEwtYear(), loadLedger() (+38 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (89): StaffOptions(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+81 more)

### Community 60 - "ref_node_fs"
Cohesion: 0.07
Nodes (7): ctx, input, root, root, root, root, root

### Community 61 - "opening.ts"
Cohesion: 0.13
Nodes (20): exceljs, PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine (+12 more)

### Community 62 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (54): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+46 more)

### Community 63 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (41): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+33 more)

### Community 64 - "report-periods.ts"
Cohesion: 0.23
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), periodTitle(), PortalBooks, BooksYear, iso(), lockedMonths() (+8 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (56): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+48 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.10
Nodes (43): Rule, PlannedObligation, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup (+35 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (24): form1701, form1702RT, year, form1701Q, form1702Q, individual, form2551Q, individual (+16 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 70 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (72): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+64 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (53): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+45 more)

### Community 72 - "assets/schedule.ts"
Cohesion: 0.28
Nodes (12): Row, accumulated(), Asset, bookFor(), CAPITALIZATION_THRESHOLD, depreciationFor(), monthIndex(), monthTotals() (+4 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.08
Nodes (53): EntryLineOut, PrintLine, Bucket, SaleSplit, TotalCheck, EntryLine, RegisterTotals, TaxLine (+45 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "year.ts"
Cohesion: 0.15
Nodes (25): GridRow, annualTax(), computeEmployeeYear(), dateForYear(), employeeContributions(), grossCompensation(), MonthLines, monthlyTable() (+17 more)

### Community 78 - "requireOwner"
Cohesion: 0.11
Nodes (44): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+36 more)

### Community 79 - "quote/page.tsx"
Cohesion: 0.16
Nodes (21): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+13 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (40): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), withDirectory(), datAddress(), datNameCols() (+32 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (65): AvatarColor, AvatarProps, AvatarSize, styles, Counter(), CounterColor, CounterProps, styles (+57 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "review/page.tsx"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 86 - "Notice"
Cohesion: 0.07
Nodes (98): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+90 more)

### Community 87 - "portalContext"
Cohesion: 0.17
Nodes (25): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), PortalCwt2307Page(), Tracker(), ParamSelect(), emptyClass (+17 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "board.ts"
Cohesion: 0.10
Nodes (27): StepProgress(), FilingRow, StepWho, CauseTag, DUE_GROUP_LABELS, DueGroup, FILED, FIVE_STEPS (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "[slug]/page.tsx"
Cohesion: 0.09
Nodes (33): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState (+25 more)

### Community 92 - "LinkButton"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "memo.ts"
Cohesion: 0.18
Nodes (13): ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign() (+5 more)

### Community 94 - "server.ts"
Cohesion: 0.13
Nodes (32): RequestDetail(), RequestPage(), TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks() (+24 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Skeleton"
Cohesion: 0.05
Nodes (59): @remixicon/react, NewEntry(), NewEntryPage(), EditClient(), EditClientPage(), amt(), FixedAssets(), FixedAssetsPage() (+51 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "calendar/page.tsx"
Cohesion: 0.21
Nodes (19): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaWhen() (+11 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.06
Nodes (64): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+56 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (91): react-aria-components, switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, ChipColor, Breadcrumb(), BreadcrumbItemProps (+83 more)

### Community 103 - "opening-checklist.tsx"
Cohesion: 0.19
Nodes (14): Access, STATUS, Cutoff, cutoffOf(), ChecklistInput, ChecklistItem, ItemStatus, longDate() (+6 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.12
Nodes (23): digestMessage(), DigestRow, longDay(), peso, time(), bodyBlocks(), EmailAction, escapeHtml() (+15 more)

### Community 106 - "cwt-tracker-view.tsx"
Cohesion: 0.24
Nodes (15): Cwt2307TrackerPage(), Tracker(), CwtFollowUpForm(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary(), dateFmt, Figure() (+7 more)

### Community 107 - "review-forms.tsx"
Cohesion: 0.21
Nodes (14): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+6 more)

### Community 108 - "tieouts.ts"
Cohesion: 0.15
Nodes (12): blockingTies(), purchases(), sales(), base, books, buy, sale, TieInputs (+4 more)

### Community 109 - "[month]/page.tsx"
Cohesion: 0.12
Nodes (37): saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when(), PayrollRuns() (+29 more)

### Community 110 - "client"
Cohesion: 0.08
Nodes (16): as(), client(), root, generateFilings(), send(), as(), purchase(), root (+8 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (50): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+42 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.07
Nodes (51): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+43 more)

### Community 114 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 115 - "cwt-match.tsx"
Cohesion: 0.26
Nodes (11): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtActionState, markCwtFollowedUp() (+3 more)

### Community 116 - "filings/actions.ts"
Cohesion: 0.27
Nodes (13): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+5 more)

### Community 118 - "public.ts"
Cohesion: 0.12
Nodes (24): ProposalSetup, JobOption, Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow (+16 more)

### Community 119 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.24
Nodes (14): cancelMeetingAction(), cancelMyMeetingAction(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason(), leadCancellationEmail(), MAX_CANCEL_REASON (+6 more)

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (61): addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction() (+53 more)

### Community 122 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (45): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+37 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "auth.ts"
Cohesion: 0.06
Nodes (56): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), SwitcherBusiness (+48 more)

### Community 126 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 127 - "holiday-list.ts"
Cohesion: 0.16
Nodes (17): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+9 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (64): geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+56 more)

### Community 129 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.09
Nodes (45): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+37 more)

### Community 132 - "react"
Cohesion: 0.05
Nodes (103): react, Accounts(), AccountsPage(), GROUPS, BankAccountsRoute(), booksContext(), fmtDate(), one() (+95 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (41): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+33 more)

### Community 134 - "public.ts"
Cohesion: 0.14
Nodes (20): acceptProposalAction(), AcceptState, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+12 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (102): GlobalNotFound(), metadata, robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata (+94 more)

### Community 136 - "clients/actions.ts"
Cohesion: 0.07
Nodes (46): zod, addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction() (+38 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "runs.tsx"
Cohesion: 0.25
Nodes (8): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), Run

### Community 139 - "work/load.ts"
Cohesion: 0.19
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 140 - "workpapers/load.ts"
Cohesion: 0.31
Nodes (10): Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity, AssetTotals (+2 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (44): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+36 more)

### Community 142 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.09
Nodes (34): CoverageClient, coverageGaps(), Gap, GapKind, isWeekend(), board, MARCO, none (+26 more)

### Community 144 - "quote.ts"
Cohesion: 0.09
Nodes (31): EngagementRow, corp, items, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, GapRow (+23 more)

### Community 145 - "payroll/types.ts"
Cohesion: 0.12
Nodes (20): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+12 more)

### Community 146 - "email/brand.ts"
Cohesion: 0.09
Nodes (44): server-only, @supabase/supabase-js, GET(), GET(), GET(), emailProposalAction(), runActingDigest(), tellPreparer() (+36 more)

### Community 147 - "@remixicon/react"
Cohesion: 0.05
Nodes (59): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+51 more)

### Community 148 - "template.ts"
Cohesion: 0.08
Nodes (30): bandForSales(), JOB_GROUPS, JobBand, JobGroup, jobGroupOf(), jobOptions(), ProposalQuote, readJobs() (+22 more)

### Community 149 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 151 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 154 - "social-button.tsx"
Cohesion: 0.10
Nodes (28): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+20 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 157 - "parties/schema.ts"
Cohesion: 0.53
Nodes (5): blank(), optionalText(), PartyInput, partySchema, normalizeBranch()

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (33): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+25 more)

### Community 160 - "next"
Cohesion: 0.04
Nodes (111): nextConfig, next, Doc, DocumentsCard(), when(), ExceptionRow, ApprovedReview(), ApprovedRow (+103 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (39): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+31 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.10
Nodes (40): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+32 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 169 - "getIdentity"
Cohesion: 0.09
Nodes (44): amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text(), CatchUpRecorded, ReplyForm() (+36 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.10
Nodes (37): Cycle(), CycleWithClient, DocRow, shift(), MonthComplete(), SentRow, StandingRow, TimelineRow (+29 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (95): GET(), SheetPreview(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus() (+87 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.09
Nodes (31): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+23 more)

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 182 - "filed-returns.ts"
Cohesion: 0.18
Nodes (21): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+13 more)

### Community 184 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 190 - "vitest"
Cohesion: 0.03
Nodes (23): pg, vitest, dir, root, root, root, root, root (+15 more)

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 199 - "Badge"
Cohesion: 0.05
Nodes (102): ClientReturnsPage(), FilingRow, Returns(), amt(), one(), shiftMonth(), SignStatus(), STATUS (+94 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.11
Nodes (32): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+24 more)

### Community 208 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (42): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+34 more)

### Community 209 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 217 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 224 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1652 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **30 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `form-2307.ts`, `return-file-actions.ts`, `ui.ts`, `app/settings/page.tsx`, `package.json`, `[userId]/page.tsx`, `blocks.tsx`, `clients/actions.ts`, `runs.tsx`, `payroll/forms.tsx`, `Badge`, `dependencies`, `quote.ts`, `statements.ts`, `@remixicon/react`, `social-button.tsx`, `move-bar.tsx`, `onboarding/page.tsx`, `next`, `register/page.tsx`, `getIdentity`, `compare.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `cycle/page.tsx`, `notification-bell.tsx`, `modal.tsx`, `supabaseServer`, `slots.ts`, `button.tsx`, `remittances/[id]/page.tsx`, `filed-returns.ts`, `binder/page.tsx`, `proposal-view.tsx`, `steps.ts`, `year-end/page.tsx`, `lib/books/actions.ts`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `Badge`, `review-form.tsx`, `stat-cards.tsx`, `requireOwner`, `quote/page.tsx`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `idle-watcher.tsx`, `cx.ts`, `Notice`, `portalContext`, `document-scanner.tsx`, `[slug]/page.tsx`, `LinkButton`, `server.ts`, `Skeleton`, `calendar/page.tsx`, `Centavos`, `ledger/data.ts`, `cx`, `cwt-tracker-view.tsx`, `review-forms.tsx`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `sign-off-actions.tsx`, `cwt-match.tsx`, `leads/[id]/page.tsx`, `fixed-assets/forms.tsx`, `batch/register.ts`, `auth.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08085317460317461 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `params.ts`, `package.json`, `[userId]/page.tsx`, `documents/period.ts`, `Badge`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `returns/types.ts`, `status.ts`, `slots.ts`, `remittances/[id]/page.tsx`, `webhook.ts`, `quote.ts`, `tax-codes.ts`, `returns/load.ts`, `steps.ts`, `ref_node_fs`, `opening.ts`, `year-end/page.tsx`, `report-periods.ts`, `marketing/page.tsx`, `filings/run.ts`, `testing.ts`, `quote/page.tsx`, `payroll/payroll.test.ts`, `books/forms.tsx`, `assets/schedule.ts`, `parties/[id]/page.tsx`, `idle-watcher.tsx`, `review/page.tsx`, `portal-billing.test.ts`, `board.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `memo.ts`, `server.ts`, `calendar/page.tsx`, `Centavos`, `ledger/data.ts`, `opening-checklist.tsx`, `layout.ts`, `tieouts.ts`, `client`, `profile.ts`, `portal/page.tsx`, `public.ts`, `cancel-server.ts`, `leads/[id]/page.tsx`, `batch/register.ts`, `leads-pipeline.test.ts`, `holiday-list.ts`, `read.test.ts`, `month.ts`, `return-file-actions.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `public.ts`, `blocks.tsx`, `clients/actions.ts`, `ticked-allocation.test.ts`, `work/load.ts`, `deadlines/page.tsx`, `quote.ts`, `email/brand.ts`, `@remixicon/react`, `db.test.ts`, `lead-attribution.test.ts`, `ledger.test.ts`, `split-bundled-pdfs.test.ts`, `social-button.tsx`, `move-bar.tsx`, `contact-access.test.ts`, `onboarding/page.tsx`, `next`, `calendar/staff.ts`, `notifications.test.ts`, `ledger-lock.test.ts`, `returns-books.test.ts`, `register/page.tsx`, `adjustments.test.ts`, `approve-and-post.test.ts`, `contribution-payables.test.ts`, `year-end.test.ts`, `cycle/page.tsx`, `notification-bell.tsx`, `acting-approver.test.ts`, `fields.ts`, `returns-sign-off.test.ts`, `filed-returns.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `books-migration.test.ts`, `Badge`, `review-form.tsx`, `documents/[id]/page.tsx`, `contribution-remittances.test.ts`, `cwt-2307-tracker.test.ts`, `tests/register.test.ts`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.036231884057971016 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `return-file-actions.ts`, `ui.ts`, `react`, `package.json`, `[userId]/page.tsx`, `blocks.tsx`, `clients/actions.ts`, `app/settings/page.tsx`, `runs.tsx`, `public.ts`, `payroll/forms.tsx`, `Badge`, `dependencies`, `email/brand.ts`, `@remixicon/react`, `social-button.tsx`, `move-bar.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `register/page.tsx`, `opengraph-image.tsx`, `getIdentity`, `compare.ts`, `clients/[id]/page.tsx`, `scores/page.tsx`, `cycle/page.tsx`, `notification-bell.tsx`, `modal.tsx`, `supabaseServer`, `slots.ts`, `button.tsx`, `remittances/[id]/page.tsx`, `webhook.ts`, `filed-returns.ts`, `binder/page.tsx`, `proposal-view.tsx`, `steps.ts`, `year-end/page.tsx`, `lib/books/actions.ts`, `report-periods.ts`, `marketing/page.tsx`, `quote/page.tsx`, `payroll/payroll.test.ts`, `books/forms.tsx`, `Badge`, `review-form.tsx`, `requireOwner`, `quote/page.tsx`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `idle-watcher.tsx`, `Notice`, `portalContext`, `[slug]/page.tsx`, `LinkButton`, `server.ts`, `Skeleton`, `calendar/page.tsx`, `Centavos`, `ledger/data.ts`, `cx`, `opening-checklist.tsx`, `cwt-tracker-view.tsx`, `review-forms.tsx`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `sign-off-actions.tsx`, `cwt-match.tsx`, `filings/actions.ts`, `leads/[id]/page.tsx`, `fixed-assets/forms.tsx`, `batch/register.ts`, `auth.ts`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._