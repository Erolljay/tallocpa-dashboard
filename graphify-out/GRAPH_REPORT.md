# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1017 files · ~850,204 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6238 nodes · 22248 edges · 184 communities (164 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 192 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `9043198f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- params.ts
- package.json
- access.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
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
- requireStaff
- scripts
- slots.ts
- button.tsx
- remittances/[id]/page.tsx
- webhook.ts
- returns/types.ts
- binder/page.tsx
- tax-codes.ts
- proposal-view.tsx
- returns/load.ts
- steps.ts
- deadlines/page.tsx
- arap.ts
- lock-bar.tsx
- lib/books/actions.ts
- report-periods.ts
- marketing/page.tsx
- Apple Design
- filings/run.ts
- testing.ts
- quote/page.tsx
- money.ts
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- worksheet/page.tsx
- collections/forms.tsx
- buildSawt
- parties/[id]/page.tsx
- how-we-work/page.tsx
- idle-watcher.tsx
- cx.ts
- Pro components
- review/page.tsx
- Notice
- portalContext
- portal-billing.test.ts
- sign-off.ts
- document-scanner.tsx
- [slug]/page.tsx
- LinkButton
- workpapers/page.tsx
- work/page.tsx
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- [clientId]/[year]/page.tsx
- Centavos
- ledger/data.ts
- cx
- payment-actions.ts
- boardui
- layout.ts
- package.json
- LinkButton
- leads/actions.ts
- [month]/page.tsx
- client
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- sign-off-actions.tsx
- [clientId]/page.tsx
- missing-2307/page.tsx
- apply-migrations.sh
- public.ts
- late-submitters.ts
- book/actions.ts
- leads/[id]/page.tsx
- addDays
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- leads-pipeline.test.ts
- holiday-list.ts
- read.test.ts
- social-button.tsx
- return-file-actions.ts
- app/settings/page.tsx
- react
- ocr/run.ts
- terms.ts
- blocks.tsx
- requireOwner
- ticked-allocation.test.ts
- work/load.ts
- payroll/forms.tsx
- deadlines/page.tsx
- quote.ts
- payroll/types.ts
- email/brand.ts
- @remixicon/react
- template.ts
- proof-upload.tsx
- ledger.test.ts
- supabaseServer
- move-bar.tsx
- Review
- onboarding/page.tsx
- documents/labels.ts
- Rework: one flow from lead to year-end
- calendar/staff.ts
- step-files.tsx
- register/page.tsx
- opengraph-image.tsx
- auth.ts
- app/settings/notifications/page.tsx
- portal-statements-approval.test.ts
- cycle/page.tsx
- notification-bell.tsx
- acting-approver.test.ts
- fields.ts
- returns-sign-off.test.ts
- filed-returns.ts
- rates.ts
- tests/proposal-email.test.ts
- vitest
- books-migration.test.ts
- eslint.config.mjs
- staff/page.tsx
- tests/books.test.ts
- people/schema.ts
- filings/[id]/page.tsx
- review-form.tsx
- templates/README.md
- documents/[id]/page.tsx
- seed-sql.ts
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
9. `Badge()` - 187 edges
10. `Card()` - 187 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `fromBooksRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/returns/source.ts
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

## Communities (184 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (56): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+48 more)

### Community 1 - "index.ts"
Cohesion: 0.03
Nodes (35): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+27 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (61): booksViewFor(), fmtMonth(), WithdrawReportButton(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage() (+53 more)

### Community 4 - "params.ts"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 5 - "package.json"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "access.ts"
Cohesion: 0.17
Nodes (22): AccessOptions(), AccessRowForm(), AddBusinessForm(), Business, ContactDetailsForm(), NewContactForm(), RemoveBusinessButton(), Result() (+14 more)

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

### Community 11 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (39): ApprovedRow, loadBooking(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending(), confirmedMonths() (+31 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.07
Nodes (73): ClientList(), ClientsPage(), SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS, when (+65 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0, @remixicon/react@^4.9.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (38): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), defaultCashFlow(), isFsLine(), add() (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (72): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+64 more)

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
Cohesion: 0.09
Nodes (43): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (71): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+63 more)

### Community 43 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (41): FormState, removeAssignmentAction(), ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient() (+33 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (59): client, row(), BUSINESS_TAX_FORMS, VatData, agentBackground(), agentErrors(), atcSchedule(), AtcTotal (+51 more)

### Community 45 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 46 - "register-xlsx.ts"
Cohesion: 0.16
Nodes (22): file(), GET(), safe(), monthlyTable(), employeesForMonth(), buildEmployeeTemplate(), sortItems(), draftToTemplate() (+14 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (45): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+37 more)

### Community 48 - "requireStaff"
Cohesion: 0.11
Nodes (36): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+28 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.11
Nodes (33): cancelMeetingAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction() (+25 more)

### Community 51 - "button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 52 - "remittances/[id]/page.tsx"
Cohesion: 0.09
Nodes (61): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+53 more)

### Community 53 - "webhook.ts"
Cohesion: 0.10
Nodes (41): ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery(), CODE_OF, CODES (+33 more)

### Community 54 - "returns/types.ts"
Cohesion: 0.10
Nodes (32): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+24 more)

### Community 55 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 56 - "tax-codes.ts"
Cohesion: 0.19
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.12
Nodes (23): COMPLEXITY_LABEL, Lines(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), jobName(), lineName() (+15 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.08
Nodes (44): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+36 more)

### Community 59 - "steps.ts"
Cohesion: 0.05
Nodes (88): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+80 more)

### Community 60 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (28): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+20 more)

### Community 61 - "arap.ts"
Cohesion: 0.07
Nodes (39): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+31 more)

### Community 62 - "lock-bar.tsx"
Cohesion: 0.12
Nodes (29): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+21 more)

### Community 63 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 64 - "report-periods.ts"
Cohesion: 0.26
Nodes (16): basePeriod(), HeldNote(), holdsWhat(), taxableYearStart(), BooksYear, booksYears(), iso(), lockedMonths() (+8 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.06
Nodes (64): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+56 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.08
Nodes (50): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+42 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (24): form1701, form1702RT, year, form1701Q, form1702Q, individual, form2551Q, individual (+16 more)

### Community 69 - "quote/page.tsx"
Cohesion: 0.10
Nodes (42): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+34 more)

### Community 70 - "money.ts"
Cohesion: 0.07
Nodes (64): GridRow, MonthGrid(), toInput(), AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, form2316() (+56 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.12
Nodes (39): SaleSplit, tin9(), tinDashed(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments(), sawtCsv(), sawtDat() (+31 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "worksheet/page.tsx"
Cohesion: 0.35
Nodes (10): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+2 more)

### Community 78 - "collections/forms.tsx"
Cohesion: 0.22
Nodes (20): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+12 more)

### Community 79 - "buildSawt"
Cohesion: 0.19
Nodes (17): qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo() (+9 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (45): mergePartyAction(), withDirectory(), datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols(), Names (+37 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (95): ApprovedReview(), ZoomPreview(), switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, AvatarColor, AvatarProps (+87 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "review/page.tsx"
Cohesion: 0.21
Nodes (12): CatchUpRow, CatchUpSection(), Queue(), ReviewPage(), Row, Section(), FilingRow, QueueFiling (+4 more)

### Community 86 - "Notice"
Cohesion: 0.05
Nodes (123): setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+115 more)

### Community 87 - "portalContext"
Cohesion: 0.15
Nodes (28): PortalClient, portalContext, Content(), PortalNotificationsPage(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+20 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "[slug]/page.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "LinkButton"
Cohesion: 0.17
Nodes (19): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+11 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.06
Nodes (71): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+63 more)

### Community 94 - "work/page.tsx"
Cohesion: 0.06
Nodes (66): RequestDetail(), RequestPage(), Row, TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow (+58 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.14
Nodes (27): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), loadStored() (+19 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "[clientId]/[year]/page.tsx"
Cohesion: 0.35
Nodes (9): PrintAll(), PrintAll2316Page(), Portal2316(), Portal2316Page(), linkClass, Form2316Set(), Form2316Sheet(), PrintButton() (+1 more)

### Community 100 - "Centavos"
Cohesion: 0.07
Nodes (47): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BOOK_KINDS (+39 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.05
Nodes (74): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+66 more)

### Community 102 - "cx"
Cohesion: 0.05
Nodes (71): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+63 more)

### Community 103 - "payment-actions.ts"
Cohesion: 0.29
Nodes (12): accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+4 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "layout.ts"
Cohesion: 0.06
Nodes (41): dir, readme, templates, digestMessage(), DigestRow, longDay(), peso, time() (+33 more)

### Community 106 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 107 - "LinkButton"
Cohesion: 0.29
Nodes (8): Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), Certificates(), Form2316Page(), LinkButton()

### Community 108 - "leads/actions.ts"
Cohesion: 0.12
Nodes (31): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+23 more)

### Community 109 - "[month]/page.tsx"
Cohesion: 0.08
Nodes (47): PayrollMonth(), PayrollMonthPage(), when(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+39 more)

### Community 110 - "client"
Cohesion: 0.07
Nodes (20): as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth(), payroll() (+12 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (54): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+46 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.07
Nodes (49): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+41 more)

### Community 114 - "sign-off-actions.tsx"
Cohesion: 0.27
Nodes (10): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+2 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (40): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton(), VoidDepositForm() (+32 more)

### Community 116 - "missing-2307/page.tsx"
Cohesion: 0.36
Nodes (7): accessFor(), decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 118 - "public.ts"
Cohesion: 0.10
Nodes (34): ProposalSetup, loadTaxOnFee(), FeeGapPage(), Gap(), Preview(), GapRow, lastWholeMonths(), QuerySource (+26 more)

### Community 119 - "late-submitters.ts"
Cohesion: 0.42
Nodes (6): isAlwaysLate(), isLateMonth(), LATE_SUBMITTER_RULES, LateSubmitter, lateSubmitters(), ScorecardRow

### Community 120 - "book/actions.ts"
Cohesion: 0.36
Nodes (7): calendarNote(), CalendarOutcome, cancelledMessage(), leadCancellationEmail(), manilaWhen(), MAX_CANCEL_REASON, when

### Community 121 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (54): NotesCard(), ClientNoteForm(), PayrollPending(), MonthRemittances(), BookingLink(), CopyLink(), DiscoveryCallForm(), FunnelSwitch() (+46 more)

### Community 122 - "addDays"
Cohesion: 0.22
Nodes (17): EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge, activeFor(), Appointment, appointmentSchema (+9 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (43): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+35 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.11
Nodes (36): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+28 more)

### Community 126 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 127 - "holiday-list.ts"
Cohesion: 0.16
Nodes (16): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+8 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (75): RFC-4180, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+67 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (48): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+40 more)

### Community 131 - "app/settings/page.tsx"
Cohesion: 0.15
Nodes (25): periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings() (+17 more)

### Community 132 - "react"
Cohesion: 0.06
Nodes (97): react, BankAccountsRoute(), booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList() (+89 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+35 more)

### Community 134 - "terms.ts"
Cohesion: 0.48
Nodes (4): acceptedQuote(), canonicalContent(), defaultTerms(), ProposalContent

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (103): GlobalNotFound(), metadata, QuotesClosed(), robots(), AboutPage(), HOW, metadata, BirCalendarPage() (+95 more)

### Community 136 - "requireOwner"
Cohesion: 0.06
Nodes (63): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), setCatchUpAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+55 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 139 - "work/load.ts"
Cohesion: 0.16
Nodes (19): loadAssets(), filingsBooksReady(), onlyBooksReady(), booksReadyMap(), keepBooksReady(), lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (47): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+39 more)

### Community 143 - "deadlines/page.tsx"
Cohesion: 0.08
Nodes (41): CoverageClient, coverageGaps(), Gap, GapKind, line(), longDay(), NEEDS, ownerEmail() (+33 more)

### Community 144 - "quote.ts"
Cohesion: 0.07
Nodes (55): EngagementRow, corp, items, proposal(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient (+47 more)

### Community 145 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 146 - "email/brand.ts"
Cohesion: 0.12
Nodes (39): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), generatePastFilingsAction(), emailProposalAction() (+31 more)

### Community 147 - "@remixicon/react"
Cohesion: 0.06
Nodes (55): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items (+47 more)

### Community 148 - "template.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 150 - "proof-upload.tsx"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 154 - "supabaseServer"
Cohesion: 0.07
Nodes (38): nextConfig, next, addClientNoteAction(), NoteState, postPayrollAction(), PostState, PostPayrollButton(), markCwtFollowedUpAction() (+30 more)

### Community 155 - "move-bar.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 156 - "Review"
Cohesion: 0.26
Nodes (14): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+6 more)

### Community 159 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 160 - "documents/labels.ts"
Cohesion: 0.09
Nodes (39): Doc, Row, Doc, Documents(), FolderKey, FOLDERS, Item, MONTHS (+31 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/staff.ts"
Cohesion: 0.08
Nodes (54): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), addDays(), dayLabel(), ERRORS (+46 more)

### Community 163 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 166 - "register/page.tsx"
Cohesion: 0.08
Nodes (46): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+38 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 169 - "auth.ts"
Cohesion: 0.10
Nodes (33): zod@^4.6.7, zod, amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh(), text() (+25 more)

### Community 170 - "app/settings/notifications/page.tsx"
Cohesion: 0.26
Nodes (10): maxDuration, POST(), Content(), NotificationSettingsPage(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi (+2 more)

### Community 173 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (35): DocumentsCard(), when(), Cycle(), CycleWithClient, DocRow, ExceptionRow, shift(), one() (+27 more)

### Community 174 - "notification-bell.tsx"
Cohesion: 0.04
Nodes (102): GET(), SheetPreview(), Content(), NotificationsPage(), Content(), PortalNotificationSettingsPage(), emit(), listeners (+94 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "fields.ts"
Cohesion: 0.11
Nodes (26): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), month() (+18 more)

### Community 177 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 182 - "filed-returns.ts"
Cohesion: 0.18
Nodes (21): BooksSection(), NavRow(), PortalReports(), Released, Reports(), Section(), Statements(), when() (+13 more)

### Community 184 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 190 - "vitest"
Cohesion: 0.02
Nodes (49): pg, vitest, outDir, pkgDir, require, { version }, dir, ctx (+41 more)

### Community 191 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 192 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 193 - "staff/page.tsx"
Cohesion: 0.36
Nodes (8): FormState, BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 195 - "people/schema.ts"
Cohesion: 0.20
Nodes (12): access, clientUserSchema, contactAccessSchema, contactDetailsSchema, contactLinkSchema, email, inviteStaffSchema, mobile (+4 more)

### Community 199 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (31): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind (+23 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.07
Nodes (50): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+42 more)

### Community 208 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (37): BOOKED_TYPES, BundleChild, PayrollDocument(), Supabase, PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview() (+29 more)

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
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1652 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `params.ts`, `package.json`, `app/documents/page.tsx`, `Badge`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/[id]/page.tsx`, `returns/types.ts`, `status.ts`, `slots.ts`, `remittances/[id]/page.tsx`, `webhook.ts`, `returns/types.ts`, `tax-codes.ts`, `returns/load.ts`, `steps.ts`, `arap.ts`, `lock-bar.tsx`, `lib/books/actions.ts`, `report-periods.ts`, `marketing/page.tsx`, `filings/run.ts`, `testing.ts`, `quote/page.tsx`, `money.ts`, `fixed-assets/page.tsx`, `parties/[id]/page.tsx`, `idle-watcher.tsx`, `review/page.tsx`, `portal-billing.test.ts`, `sign-off.ts`, `document-scanner.tsx`, `[slug]/page.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `Centavos`, `ledger/data.ts`, `layout.ts`, `package.json`, `[month]/page.tsx`, `client`, `profile.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `public.ts`, `late-submitters.ts`, `book/actions.ts`, `leads/[id]/page.tsx`, `addDays`, `batch/register.ts`, `leads-pipeline.test.ts`, `holiday-list.ts`, `read.test.ts`, `return-file-actions.ts`, `app/settings/page.tsx`, `ocr/run.ts`, `terms.ts`, `blocks.tsx`, `requireOwner`, `ticked-allocation.test.ts`, `deadlines/page.tsx`, `quote.ts`, `email/brand.ts`, `@remixicon/react`, `template.ts`, `ledger.test.ts`, `supabaseServer`, `move-bar.tsx`, `onboarding/page.tsx`, `calendar/staff.ts`, `register/page.tsx`, `portal-statements-approval.test.ts`, `cycle/page.tsx`, `notification-bell.tsx`, `acting-approver.test.ts`, `fields.ts`, `returns-sign-off.test.ts`, `filed-returns.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `people/schema.ts`, `review-form.tsx`, `contribution-remittances.test.ts`, `cwt-2307-tracker.test.ts`, `tests/register.test.ts`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07660455486542443 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `access.ts`, `app/documents/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/[id]/page.tsx`, `register-xlsx.ts`, `modal.tsx`, `requireStaff`, `slots.ts`, `button.tsx`, `remittances/[id]/page.tsx`, `binder/page.tsx`, `proposal-view.tsx`, `steps.ts`, `deadlines/page.tsx`, `lock-bar.tsx`, `lib/books/actions.ts`, `report-periods.ts`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `worksheet/page.tsx`, `collections/forms.tsx`, `idle-watcher.tsx`, `cx.ts`, `review/page.tsx`, `Notice`, `portalContext`, `[slug]/page.tsx`, `LinkButton`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `[clientId]/[year]/page.tsx`, `Centavos`, `ledger/data.ts`, `payment-actions.ts`, `package.json`, `LinkButton`, `leads/actions.ts`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `sign-off-actions.tsx`, `[clientId]/page.tsx`, `missing-2307/page.tsx`, `public.ts`, `leads/[id]/page.tsx`, `addDays`, `batch/register.ts`, `showDate`, `return-file-actions.ts`, `app/settings/page.tsx`, `react`, `blocks.tsx`, `requireOwner`, `payroll/forms.tsx`, `email/brand.ts`, `@remixicon/react`, `proof-upload.tsx`, `move-bar.tsx`, `Review`, `onboarding/page.tsx`, `documents/labels.ts`, `calendar/staff.ts`, `step-files.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `auth.ts`, `app/settings/notifications/page.tsx`, `cycle/page.tsx`, `notification-bell.tsx`, `filed-returns.ts`, `filings/[id]/page.tsx`, `review-form.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.029546758462421115 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `access.ts`, `app/documents/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `clients/[id]/page.tsx`, `modal.tsx`, `requireStaff`, `slots.ts`, `button.tsx`, `remittances/[id]/page.tsx`, `binder/page.tsx`, `proposal-view.tsx`, `steps.ts`, `deadlines/page.tsx`, `lock-bar.tsx`, `lib/books/actions.ts`, `marketing/page.tsx`, `quote/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `worksheet/page.tsx`, `collections/forms.tsx`, `how-we-work/page.tsx`, `idle-watcher.tsx`, `cx.ts`, `review/page.tsx`, `Notice`, `portalContext`, `document-scanner.tsx`, `[slug]/page.tsx`, `workpapers/page.tsx`, `work/page.tsx`, `payroll/data.ts`, `[clientId]/[year]/page.tsx`, `Centavos`, `ledger/data.ts`, `cx`, `package.json`, `LinkButton`, `leads/actions.ts`, `[month]/page.tsx`, `profile.ts`, `portal/page.tsx`, `sign-off-actions.tsx`, `[clientId]/page.tsx`, `missing-2307/page.tsx`, `public.ts`, `leads/[id]/page.tsx`, `addDays`, `batch/register.ts`, `showDate`, `social-button.tsx`, `return-file-actions.ts`, `app/settings/page.tsx`, `blocks.tsx`, `payroll/forms.tsx`, `quote.ts`, `@remixicon/react`, `supabaseServer`, `move-bar.tsx`, `Review`, `onboarding/page.tsx`, `documents/labels.ts`, `calendar/staff.ts`, `step-files.tsx`, `register/page.tsx`, `auth.ts`, `app/settings/notifications/page.tsx`, `cycle/page.tsx`, `notification-bell.tsx`, `filed-returns.ts`, `staff/page.tsx`, `filings/[id]/page.tsx`, `review-form.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._