# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 1037 files · ~868,832 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6370 nodes · 22712 edges · 186 communities (165 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 193 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `bdbe933f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- index.ts
- migrate.yml
- ui.ts
- params.ts
- devDependencies
- [key]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- documents/[id]/page.tsx
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
- TalloCPA OS — AI Workforce (design note)
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- Centavos
- quote.ts
- returns/types.ts
- supabaseServer
- register-xlsx.ts
- modal.tsx
- registrations/forms.tsx
- scripts
- book/actions.ts
- button.tsx
- requireStaff
- webhook.ts
- leads/[id]/page.tsx
- marketing/page.tsx
- zod
- proposal-view.tsx
- returns/load.ts
- steps.ts
- names.ts
- books/export/route.ts
- lock-bar.tsx
- react
- proposal.ts
- form.tsx
- Apple Design
- engine.ts
- testing.ts
- work/page.tsx
- payroll/payroll.test.ts
- books/forms.tsx
- fixed-assets/page.tsx
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- deadlines/page.tsx
- reports/parallel-run/page.tsx
- workpapers/load.ts
- parties/[id]/page.tsx
- how-we-work/page.tsx
- clients/[id]/page.tsx
- cx.ts
- Pro components
- lib/books/actions.ts
- cycle/page.tsx
- portalContext
- portal-billing.test.ts
- @remixicon/react
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- workpapers/page.tsx
- tasks/page.tsx
- Recipes
- payroll/data.ts
- BoardUI page patterns
- Pro templates
- LinkButton
- ledger/books.ts
- ledger/data.ts
- cx
- calendar/actions.ts
- boardui
- opening-checklist.tsx
- layout.ts
- getIdentity
- leads/actions.ts
- Notice
- Card
- Opening balances: checklist for any cut-off
- profile.ts
- portal/page.tsx
- opening.ts
- requireOwner
- app/requests/[id]/page.tsx
- apply-migrations.sh
- manilaToday
- notes.ts
- cancel-server.ts
- tieouts.ts
- review/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- showDate
- notification-bell.tsx
- digest.ts
- read.test.ts
- tieouts.test.ts
- return-file-actions.ts
- settings/actions.ts
- formatAmount
- ocr/run.ts
- task-form.tsx
- blocks.tsx
- auth.ts
- ticked-allocation.test.ts
- filings/actions.ts
- package.json
- status.ts
- payroll/forms.tsx
- filings/run.ts
- app/page.tsx
- holiday-list.ts
- employees-xlsx.ts
- next
- social-button.tsx
- fees/[id]/page.tsx
- seed-sql.ts
- Building UIs with BoardUI
- generate-qap-fixture.mjs
- app/documents/page.tsx
- share-message.ts
- cwt-2307-tracker.test.ts
- pending-review.tsx
- showMonth
- inactive-client-portal.test.ts
- step-files.tsx
- year-end/page.tsx
- portal-statements-approval.test.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- template.ts
- books-migration.test.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- proof-upload.tsx
- eslint.config.mjs
- deadlines/dates.ts
- acting-approver.test.ts
- db.test.ts
- lead-attribution.test.ts
- split-bundled-pdfs.test.ts
- tests/register.test.ts
- rates.ts
- tests/proposal-email.test.ts
- vitest
- tests/books.test.ts
- filings/[id]/page.tsx
- review-form.tsx
- templates/README.md
- toCentavos
- contribution-remittances.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 412 edges
2. `cx` - 317 edges
3. `react` - 289 edges
4. `Notice()` - 280 edges
5. `Skeleton()` - 264 edges
6. `Button()` - 259 edges
7. `next` - 249 edges
8. `vitest` - 200 edges
9. `Card()` - 193 edges
10. `Badge()` - 193 edges

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

## Communities (186 total, 21 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (57): BooksContext, Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+49 more)

### Community 1 - "index.ts"
Cohesion: 0.03
Nodes (50): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+42 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (61): blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue (+53 more)

### Community 4 - "params.ts"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "[key]/page.tsx"
Cohesion: 0.07
Nodes (62): RFC-2606, addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction(), fieldErrors(), refresh() (+54 more)

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

### Community 11 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+32 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "Badge"
Cohesion: 0.08
Nodes (53): ClientList(), ClientsPage(), SORTS, STATUS_GROUPS, Contacts(), ContactsPage(), SORTS, when (+45 more)

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
Cohesion: 0.10
Nodes (36): defaultCashFlow(), statementsFrom(), FsLine, FsLineKey, isFsLine(), Section, Statement, add() (+28 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.07
Nodes (62): FollowUpForm(), Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet() (+54 more)

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

### Community 29 - "TalloCPA OS — AI Workforce (design note)"
Cohesion: 0.10
Nodes (19): 10. Data model (first draft), 11. Build order, 12. Open items, 1. The idea in one paragraph, 2. Principles, 3. The AI employees, 4.1 The in-app model is swappable, 4. Where they run and what they cost (+11 more)

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.08
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), Rematch2307Button(), CwtLooseDocuments(), CwtTrackerGroups() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "Centavos"
Cohesion: 0.05
Nodes (78): KIND, REASON, Section(), shortDate(), STATUS_TONE, AtcComparison, atcRows(), BookInvoiceRow (+70 more)

### Community 43 - "quote.ts"
Cohesion: 0.07
Nodes (55): PriceRow, EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), has() (+47 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.05
Nodes (71): client, agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS (+63 more)

### Community 45 - "supabaseServer"
Cohesion: 0.05
Nodes (65): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setCatchUpAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+57 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (33): RFC-4180, filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS, MAX_ROWS (+25 more)

### Community 47 - "modal.tsx"
Cohesion: 0.08
Nodes (46): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), globalSearch(), SearchHit (+38 more)

### Community 48 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (58): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+50 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "book/actions.ts"
Cohesion: 0.11
Nodes (36): cancelMeetingAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction() (+28 more)

### Community 51 - "button.tsx"
Cohesion: 0.06
Nodes (38): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+30 more)

### Community 52 - "requireStaff"
Cohesion: 0.09
Nodes (62): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (44): CLIENT_DOC_TYPES, SPREADSHEET_TYPES, ALLOWED, BUTTON_LABELS, checked(), Choice, clientButtons(), clientQuery() (+36 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (46): bookingLinkAction(), LeadState, BookingLink(), DiscoveryCallForm(), FunnelSwitch(), LeadContact, LostForm(), Person (+38 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (24): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+16 more)

### Community 56 - "zod"
Cohesion: 0.24
Nodes (14): zod@^4.6.7, zod, accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh() (+6 more)

### Community 57 - "proposal-view.tsx"
Cohesion: 0.14
Nodes (20): AcceptForm(), acceptProposalAction(), AcceptState, metadata, Proposal(), ProposalPage(), jobName(), lineName() (+12 more)

### Community 58 - "returns/load.ts"
Cohesion: 0.07
Nodes (51): markCwtFollowedUpAction(), recomputeWorksheetAction(), WorksheetState, GET(), FinancialStatements, oldDocs(), row(), withNonDeductible() (+43 more)

### Community 59 - "steps.ts"
Cohesion: 0.07
Nodes (65): CancelForm(), StepRow, YearRenewalsForm(), caseStatus, CertificateDetails, certificateLabel(), fmt(), Registration() (+57 more)

### Community 60 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 61 - "books/export/route.ts"
Cohesion: 0.12
Nodes (26): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+18 more)

### Community 62 - "lock-bar.tsx"
Cohesion: 0.10
Nodes (32): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, UnlockRequests(), when() (+24 more)

### Community 63 - "react"
Cohesion: 0.06
Nodes (48): react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), InvoiceEdit(), JournalEntryRoute(), JournalRoute(), PaymentsNewPage() (+40 more)

### Community 64 - "proposal.ts"
Cohesion: 0.11
Nodes (27): sendProposalAction(), JobRow(), ProposalForm(), corp, items, proposal(), auditIndependenceWarning(), bandForSales() (+19 more)

### Community 65 - "form.tsx"
Cohesion: 0.12
Nodes (38): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.09
Nodes (45): compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel, FilingInstance, fiscalYearOf() (+37 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (27): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+19 more)

### Community 69 - "work/page.tsx"
Cohesion: 0.15
Nodes (22): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), Row, sortTasks() (+14 more)

### Community 70 - "payroll/payroll.test.ts"
Cohesion: 0.08
Nodes (53): GridRow, MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv() (+45 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.17
Nodes (39): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+31 more)

### Community 72 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.10
Nodes (62): tin9(), tinDashed(), annualAttachments(), incomeAttachments(), inputs1701Q(), inputs1702Q(), Periods, periods() (+54 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "deadlines/page.tsx"
Cohesion: 0.12
Nodes (31): GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup() (+23 more)

### Community 78 - "reports/parallel-run/page.tsx"
Cohesion: 0.27
Nodes (13): ParallelRun(), ParallelRunPage(), quarterMonths(), Atcs(), Diff(), Documents(), FigureRows(), MonthDetail() (+5 more)

### Community 79 - "workpapers/load.ts"
Cohesion: 0.13
Nodes (21): Adjustment, PeriodFile, ReviewNote, approvalMemo(), Memo, MemoInput, MemoMonth, ALWAYS (+13 more)

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.07
Nodes (58): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), MergeForm(), PresetAccountForm() (+50 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "clients/[id]/page.tsx"
Cohesion: 0.09
Nodes (37): ClientStatusTarget, removeAssignmentAction(), StaffOptions(), AssignForm(), CatchUpForm(), IncomeTaxMethodForm(), RemoveAssignmentButton(), RemoveClientUserButton() (+29 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (66): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+58 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (40): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+32 more)

### Community 86 - "cycle/page.tsx"
Cohesion: 0.16
Nodes (21): Cycle(), CycleWithClient, DocRow, ExceptionRow, CloseCycleButton(), DecideExceptionForm(), Message(), NothingToSubmitButton() (+13 more)

### Community 87 - "portalContext"
Cohesion: 0.08
Nodes (72): PortalClient, portalContext, Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+64 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "@remixicon/react"
Cohesion: 0.06
Nodes (56): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+48 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "workpapers/page.tsx"
Cohesion: 0.20
Nodes (19): noteAction(), raiseNoteAction(), signWorkpaperAction(), tickAdjustmentAction(), ExplainForm(), amt(), one(), shiftMonth() (+11 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.15
Nodes (25): TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+17 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.09
Nodes (46): EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd() (+38 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "LinkButton"
Cohesion: 0.09
Nodes (30): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage() (+22 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+37 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.11
Nodes (28): BookEntry, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, COA_TEMPLATES, Amendment, AmendmentStatus (+20 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (96): react-aria-components, SheetPreview(), switchBusinessAction(), BusinessSwitcher(), SwitcherBusiness, ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, ChipColor (+88 more)

### Community 103 - "calendar/actions.ts"
Cohesion: 0.20
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "opening-checklist.tsx"
Cohesion: 0.17
Nodes (17): ChangeBooksStartForm(), Access, OpeningChecklist(), STATUS, Asset, Cutoff, cutoffOf(), PNL_TYPES (+9 more)

### Community 106 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 107 - "getIdentity"
Cohesion: 0.22
Nodes (20): send(), uploadRequestFile(), StandingUpload(), send(), getIdentity, assignRequestAction(), closeRequestAction(), createRequestAction() (+12 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.17
Nodes (22): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), cancelCallAction(), convertLeadAction(), emailProposalAction() (+14 more)

### Community 109 - "Notice"
Cohesion: 0.06
Nodes (104): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton(), EntryForm() (+96 more)

### Community 110 - "Card"
Cohesion: 0.14
Nodes (28): booksViewFor(), fmtMonth(), ReleaseReportForm(), WithdrawReportButton(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+20 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (58): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+50 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.07
Nodes (50): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+42 more)

### Community 114 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 115 - "requireOwner"
Cohesion: 0.07
Nodes (77): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+69 more)

### Community 116 - "app/requests/[id]/page.tsx"
Cohesion: 0.14
Nodes (24): RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row (+16 more)

### Community 118 - "manilaToday"
Cohesion: 0.10
Nodes (41): dateFmt, loadItems(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), Supabase, FeeGapPage() (+33 more)

### Community 119 - "notes.ts"
Cohesion: 0.18
Nodes (16): NotesCard(), ClientNoteForm(), ICON, NotesTimeline(), when, taxpayerTypeLabel, inquiryAnswers(), NoteEntry (+8 more)

### Community 120 - "cancel-server.ts"
Cohesion: 0.26
Nodes (12): calendarNote(), CalendarOutcome, cancelledMessage(), leadCancellationEmail(), manilaWhen(), MAX_CANCEL_REASON, cancelDiscoveryCall(), CancelResult (+4 more)

### Community 121 - "tieouts.ts"
Cohesion: 0.22
Nodes (11): ExplainState, explainTieAction(), SIGNED, RegisterLine, purchases(), sales(), TIE_IDS, TieId (+3 more)

### Community 122 - "review/page.tsx"
Cohesion: 0.12
Nodes (27): ActingNotice(), CatchUpRow, CatchUpSection(), Queue(), ReviewPage(), Row, Section(), Acting() (+19 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "showDate"
Cohesion: 0.09
Nodes (43): SignOffActions(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), accessFor(), decideMissing2307Action() (+35 more)

### Community 126 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (83): GET(), emit(), listeners, markReadLocally(), notifyNotificationsChanged(), onChanged(), onFocus(), onVisible() (+75 more)

### Community 127 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (71): BirCategory, CATEGORIES, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, ITEM_KINDS (+63 more)

### Community 129 - "tieouts.test.ts"
Cohesion: 0.17
Nodes (8): RegisterRow, base, books, buy, sale, approved(), as(), root

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (50): RFC-2047, RFC-2822, ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile() (+42 more)

### Community 131 - "settings/actions.ts"
Cohesion: 0.21
Nodes (15): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+7 more)

### Community 132 - "formatAmount"
Cohesion: 0.10
Nodes (67): booksContext(), fmtDate(), one(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+59 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (43): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+35 more)

### Community 134 - "task-form.tsx"
Cohesion: 0.22
Nodes (19): ClientOption, pesos, StaffOption, TaskWorkflow(), askClientAction(), createTaskAction(), fieldErrors(), optionalDate (+11 more)

### Community 135 - "blocks.tsx"
Cohesion: 0.05
Nodes (108): GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage() (+100 more)

### Community 136 - "auth.ts"
Cohesion: 0.06
Nodes (63): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+55 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "filings/actions.ts"
Cohesion: 0.16
Nodes (22): Binder(), BinderPage(), one(), TIE_STATUS, advanceFilingAction(), amendFilingAction(), amount, reviewHolding() (+14 more)

### Community 139 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 140 - "status.ts"
Cohesion: 0.43
Nodes (6): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, plural()

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (66): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+58 more)

### Community 142 - "filings/run.ts"
Cohesion: 0.12
Nodes (20): @supabase/supabase-js, GET(), GET(), maxDuration, POST(), generateFilingsNow(), generatePastFilingsAction(), metadata (+12 more)

### Community 143 - "app/page.tsx"
Cohesion: 0.10
Nodes (39): DashboardStats(), FilingTable(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), currentClientStatuses (+31 more)

### Community 144 - "holiday-list.ts"
Cohesion: 0.26
Nodes (11): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), normalizeRdo(), parseRdoList(), STANDARD_HOLIDAYS (+3 more)

### Community 145 - "employees-xlsx.ts"
Cohesion: 0.12
Nodes (19): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+11 more)

### Community 146 - "next"
Cohesion: 0.10
Nodes (40): nextConfig, next, server-only, GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+32 more)

### Community 147 - "social-button.tsx"
Cohesion: 0.06
Nodes (48): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+40 more)

### Community 148 - "fees/[id]/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 150 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 151 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 152 - "app/documents/page.tsx"
Cohesion: 0.11
Nodes (26): ApprovedReview(), ApprovedRow, ClientSelect(), BOOKED_TYPES, ClientList(), confirmedMonths(), Documents(), DocumentsPage() (+18 more)

### Community 153 - "share-message.ts"
Cohesion: 0.40
Nodes (4): peso, Shared, shareMessage(), base

### Community 154 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 155 - "pending-review.tsx"
Cohesion: 0.15
Nodes (23): BulkState, Booking, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+15 more)

### Community 156 - "showMonth"
Cohesion: 0.08
Nodes (48): DocReviewActions(), Doc, DocumentsCard(), when(), Row, Doc, Documents(), FolderKey (+40 more)

### Community 158 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 159 - "year-end/page.tsx"
Cohesion: 0.05
Nodes (65): CloseYearForm(), ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState (+57 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (38): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), Interval, manilaInstant(), Admin (+30 more)

### Community 163 - "template.ts"
Cohesion: 0.11
Nodes (19): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+11 more)

### Community 164 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "proof-upload.tsx"
Cohesion: 0.19
Nodes (16): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+8 more)

### Community 170 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 173 - "deadlines/dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 179 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 181 - "split-bundled-pdfs.test.ts"
Cohesion: 0.09
Nodes (4): root, Part, root, root

### Community 182 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 184 - "rates.ts"
Cohesion: 0.22
Nodes (20): roundHalfAway(), AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate() (+12 more)

### Community 185 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 190 - "vitest"
Cohesion: 0.02
Nodes (48): pg, vitest, outDir, pkgDir, require, { version }, dir, ctx (+40 more)

### Community 194 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 199 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (36): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+28 more)

### Community 200 - "review-form.tsx"
Cohesion: 0.06
Nodes (63): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+55 more)

### Community 208 - "toCentavos"
Cohesion: 0.07
Nodes (50): AGENCIES, Db, LOANS, p(), Run, applyColumnsAction(), done(), payrollDocument() (+42 more)

### Community 214 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

## Knowledge Gaps
- **22 isolated node(s):** `RFC-2606`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1699 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `[key]/page.tsx`, `documents/[id]/page.tsx`, `Badge`, `dependencies`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `supabaseServer`, `modal.tsx`, `registrations/forms.tsx`, `book/actions.ts`, `button.tsx`, `requireStaff`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `zod`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `books/export/route.ts`, `lock-bar.tsx`, `react`, `form.tsx`, `work/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `deadlines/page.tsx`, `reports/parallel-run/page.tsx`, `parties/[id]/page.tsx`, `clients/[id]/page.tsx`, `lib/books/actions.ts`, `cycle/page.tsx`, `portalContext`, `@remixicon/react`, `intake-picker.tsx`, `form-2316.tsx`, `workpapers/page.tsx`, `tasks/page.tsx`, `payroll/data.ts`, `LinkButton`, `ledger/books.ts`, `ledger/data.ts`, `cx`, `calendar/actions.ts`, `opening-checklist.tsx`, `getIdentity`, `leads/actions.ts`, `Notice`, `Card`, `profile.ts`, `portal/page.tsx`, `requireOwner`, `app/requests/[id]/page.tsx`, `manilaToday`, `tieouts.ts`, `review/page.tsx`, `batch/register.ts`, `showDate`, `notification-bell.tsx`, `return-file-actions.ts`, `settings/actions.ts`, `formatAmount`, `task-form.tsx`, `blocks.tsx`, `auth.ts`, `filings/actions.ts`, `package.json`, `payroll/forms.tsx`, `filings/run.ts`, `app/page.tsx`, `social-button.tsx`, `fees/[id]/page.tsx`, `app/documents/page.tsx`, `pending-review.tsx`, `showMonth`, `step-files.tsx`, `year-end/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `proof-upload.tsx`, `filings/[id]/page.tsx`, `review-form.tsx`, `toCentavos`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **What connects `RFC-2606`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07511737089201878 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `index.ts`, `ui.ts`, `params.ts`, `devDependencies`, `[key]/page.tsx`, `documents/[id]/page.tsx`, `Badge`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `quote.ts`, `returns/types.ts`, `supabaseServer`, `registrations/forms.tsx`, `book/actions.ts`, `requireStaff`, `webhook.ts`, `leads/[id]/page.tsx`, `returns/load.ts`, `steps.ts`, `names.ts`, `books/export/route.ts`, `lock-bar.tsx`, `proposal.ts`, `form.tsx`, `engine.ts`, `testing.ts`, `work/page.tsx`, `payroll/payroll.test.ts`, `fixed-assets/page.tsx`, `deadlines/page.tsx`, `workpapers/load.ts`, `parties/[id]/page.tsx`, `clients/[id]/page.tsx`, `cycle/page.tsx`, `portalContext`, `portal-billing.test.ts`, `@remixicon/react`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `payroll/data.ts`, `ledger/books.ts`, `ledger/data.ts`, `calendar/actions.ts`, `opening-checklist.tsx`, `layout.ts`, `leads/actions.ts`, `Notice`, `profile.ts`, `portal/page.tsx`, `opening.ts`, `requireOwner`, `app/requests/[id]/page.tsx`, `manilaToday`, `notes.ts`, `cancel-server.ts`, `review/page.tsx`, `batch/register.ts`, `notification-bell.tsx`, `digest.ts`, `read.test.ts`, `tieouts.test.ts`, `return-file-actions.ts`, `settings/actions.ts`, `ocr/run.ts`, `blocks.tsx`, `auth.ts`, `ticked-allocation.test.ts`, `package.json`, `status.ts`, `filings/run.ts`, `app/page.tsx`, `holiday-list.ts`, `next`, `social-button.tsx`, `fees/[id]/page.tsx`, `app/documents/page.tsx`, `share-message.ts`, `cwt-2307-tracker.test.ts`, `pending-review.tsx`, `inactive-client-portal.test.ts`, `year-end/page.tsx`, `portal-statements-approval.test.ts`, `calendar/page.tsx`, `template.ts`, `books-migration.test.ts`, `register/page.tsx`, `ledger.test.ts`, `deadlines/dates.ts`, `acting-approver.test.ts`, `db.test.ts`, `lead-attribution.test.ts`, `split-bundled-pdfs.test.ts`, `tests/register.test.ts`, `rates.ts`, `tests/proposal-email.test.ts`, `tests/books.test.ts`, `filings/[id]/page.tsx`, `review-form.tsx`, `toCentavos`, `contribution-remittances.test.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.027412280701754384 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `[key]/page.tsx`, `documents/[id]/page.tsx`, `Badge`, `dependencies`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `Centavos`, `supabaseServer`, `modal.tsx`, `registrations/forms.tsx`, `book/actions.ts`, `button.tsx`, `requireStaff`, `leads/[id]/page.tsx`, `marketing/page.tsx`, `proposal-view.tsx`, `returns/load.ts`, `steps.ts`, `lock-bar.tsx`, `proposal.ts`, `form.tsx`, `work/page.tsx`, `books/forms.tsx`, `fixed-assets/page.tsx`, `stat-cards.tsx`, `deadlines/page.tsx`, `reports/parallel-run/page.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `clients/[id]/page.tsx`, `cx.ts`, `cycle/page.tsx`, `portalContext`, `@remixicon/react`, `document-scanner.tsx`, `intake-picker.tsx`, `workpapers/page.tsx`, `tasks/page.tsx`, `payroll/data.ts`, `LinkButton`, `ledger/books.ts`, `cx`, `calendar/actions.ts`, `getIdentity`, `leads/actions.ts`, `Notice`, `Card`, `profile.ts`, `portal/page.tsx`, `requireOwner`, `app/requests/[id]/page.tsx`, `manilaToday`, `tieouts.ts`, `review/page.tsx`, `batch/register.ts`, `showDate`, `notification-bell.tsx`, `return-file-actions.ts`, `formatAmount`, `task-form.tsx`, `blocks.tsx`, `auth.ts`, `filings/actions.ts`, `package.json`, `payroll/forms.tsx`, `filings/run.ts`, `app/page.tsx`, `social-button.tsx`, `fees/[id]/page.tsx`, `app/documents/page.tsx`, `pending-review.tsx`, `showMonth`, `step-files.tsx`, `year-end/page.tsx`, `calendar/page.tsx`, `register/page.tsx`, `proof-upload.tsx`, `filings/[id]/page.tsx`, `review-form.tsx`, `toCentavos`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._