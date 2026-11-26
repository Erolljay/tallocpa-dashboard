# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 920 files · ~743,918 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5684 nodes · 20086 edges · 184 communities (166 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 182 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `61cff357`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- LinkButton
- client
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- server.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- cx
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
- year-end/page.tsx
- scores/page.tsx
- compare.ts
- payroll/types.ts
- notification.tsx
- Badge
- payroll/forms.tsx
- modal.tsx
- safeguards.ts
- scripts
- slots.ts
- fees/[id]/page.tsx
- books-context.ts
- public.ts
- module-pages.tsx
- input.tsx
- payroll/data.ts
- registrations/forms.tsx
- returns/types.ts
- Notice
- params.ts
- arap.ts
- site-document.tsx
- lock-bar.tsx
- decision.tsx
- Skeleton
- Apple Design
- filings/run.ts
- testing.ts
- clients/actions.ts
- formatAmount
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- vat.ts
- stat-cards.tsx
- marketing/page.tsx
- theme-toggle.tsx
- documents/labels.ts
- form-2307.tsx
- how-we-work/page.tsx
- registrations/forms.tsx
- staff/actions.ts
- Pro components
- IsoDate
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- filings/actions.ts
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/forms.tsx
- supabaseServer
- Recipes
- Centavos
- BoardUI page patterns
- Pro templates
- review-form.tsx
- ledger/books.ts
- engine.ts
- select.tsx
- rates.ts
- boardui
- pending-review.tsx
- profile.ts
- board.ts
- dates.ts
- social-button.tsx
- vitest
- Opening balances: checklist for any cut-off
- registrations/[id]/page.tsx
- money.ts
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- documents/[id]/page.tsx
- quote.ts
- source.ts
- work/load.ts
- auth-templates.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- next
- documents/[id]/page.tsx
- parties/[id]/page.tsx
- read.test.ts
- opening.ts
- return-file-actions.ts
- settings/actions.ts
- proof-actions.ts
- gemini.ts
- fixed-assets/page.tsx
- tin.ts
- react
- ticked-allocation.test.ts
- [id]/books/page.tsx
- tax-codes.ts
- queries.ts
- runs.tsx
- obligations.ts
- notifications/format.ts
- db.test.ts
- formatAmount
- filings/run.ts
- ledger/types.ts
- sign-off-actions.tsx
- package.json
- blocks.tsx
- holiday-list.ts
- ledger.test.ts
- workpapers/page.tsx
- notification-settings-view.tsx
- app/documents/page.tsx
- month.ts
- template.ts
- leads/[id]/page.tsx
- deadlines/page.tsx
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- proposal-view.tsx
- notifications.test.ts
- ocr/run.ts
- deadlines/actions.ts
- opengraph-image.tsx
- lead-attribution.test.ts
- notifications.test.ts
- [month]/page.tsx
- registrations/new/page.tsx
- Textarea
- BoardUI page patterns
- names.ts
- acting-approver.test.ts
- tests/books.test.ts
- lead-attribution.test.ts
- eslint.config.mjs
- fixed-assets.test.ts
- parallel-run.test.ts
- register-xlsx.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 352 edges
2. `cx` - 289 edges
3. `react` - 262 edges
4. `Skeleton()` - 250 edges
5. `Notice()` - 245 edges
6. `next` - 224 edges
7. `Button()` - 220 edges
8. `Badge()` - 179 edges
9. `Card()` - 177 edges
10. `vitest` - 171 edges

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

## Communities (184 total, 18 thin omitted)

### Community 0 - "LinkButton"
Cohesion: 0.12
Nodes (38): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), one() (+30 more)

### Community 1 - "client"
Cohesion: 0.07
Nodes (17): as(), client(), root, approved(), as(), root, approved(), as() (+9 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.11
Nodes (33): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Booking (+25 more)

### Community 4 - "public.ts"
Cohesion: 0.08
Nodes (39): dateFmt, loadSchedules(), loadTaxOnFee(), statusTone, Supabase, EngagementRow, FeeGapPage(), Gap() (+31 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "server.ts"
Cohesion: 0.07
Nodes (44): nextConfig, next, removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), NotesCard(), addClientFile() (+36 more)

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

### Community 11 - "notification-bell.tsx"
Cohesion: 0.22
Nodes (18): Bell(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+10 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "cx"
Cohesion: 0.04
Nodes (63): ClientTab, UNDER, NotificationFilterTabs(), StatusDot(), StatusDotColor, StatusDotProps, styles, Breadcrumb() (+55 more)

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
Nodes (38): PortalReport(), Report(), when(), FinancialStatementsView(), StatementTable(), statementsFrom(), add(), buildStatements() (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.09
Nodes (70): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+62 more)

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

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (69): CELL, FirmParallelRunPage(), monthShort(), Summary(), KIND, REASON, Section(), shortDate() (+61 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "notification.tsx"
Cohesion: 0.04
Nodes (56): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps (+48 more)

### Community 45 - "Badge"
Cohesion: 0.08
Nodes (61): ClientList(), Client, OpenDue, Overview(), Stat(), SectionTabs(), RequestDetail(), RequestPage() (+53 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (47): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+39 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (38): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+30 more)

### Community 48 - "safeguards.ts"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.12
Nodes (36): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+28 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.12
Nodes (34): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+26 more)

### Community 52 - "books-context.ts"
Cohesion: 0.09
Nodes (63): EmployerCard(), RemittancesDue(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS (+55 more)

### Community 53 - "public.ts"
Cohesion: 0.10
Nodes (42): GET(), Link, acceptProposalAction(), AcceptState, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields() (+34 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.08
Nodes (62): booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+54 more)

### Community 55 - "input.tsx"
Cohesion: 0.09
Nodes (33): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+25 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.17
Nodes (24): EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), Certificates2316, certificatesFromRaw(), loadPriorEmployers(), payAccountsOf() (+16 more)

### Community 57 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (18): cancelRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction(), updateStepAction(), branchSchema (+10 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (67): incomePayment(), agentProblems(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS (+59 more)

### Community 59 - "Notice"
Cohesion: 0.08
Nodes (83): ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm(), CloseYearForm() (+75 more)

### Community 60 - "params.ts"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 61 - "arap.ts"
Cohesion: 0.13
Nodes (24): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+16 more)

### Community 62 - "site-document.tsx"
Cohesion: 0.11
Nodes (33): line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails(), board, MARCO (+25 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.11
Nodes (31): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+23 more)

### Community 64 - "decision.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 65 - "Skeleton"
Cohesion: 0.12
Nodes (24): INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage(), PurchaseInvoicesNewPage() (+16 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "filings/run.ts"
Cohesion: 0.10
Nodes (27): Rule, PlannedObligation, DueRule, EfpsGroup, FilingChannel, Frequency, PeriodFilter, normalizeRdo() (+19 more)

### Community 68 - "testing.ts"
Cohesion: 0.10
Nodes (28): client, row(), form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q (+20 more)

### Community 69 - "clients/actions.ts"
Cohesion: 0.08
Nodes (39): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, setClientStatusAction() (+31 more)

### Community 70 - "formatAmount"
Cohesion: 0.22
Nodes (17): StepRow, YearRenewalsForm(), RegistrationList(), RegistrationsPage(), Row, CaseRow, clientStatus, fmt() (+9 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (53): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+45 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.06
Nodes (76): GridRow, AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow (+68 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "vat.ts"
Cohesion: 0.15
Nodes (40): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths() (+32 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "marketing/page.tsx"
Cohesion: 0.10
Nodes (25): archiveLinkAction(), MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php (+17 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.06
Nodes (59): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links() (+51 more)

### Community 79 - "documents/labels.ts"
Cohesion: 0.10
Nodes (35): DocReviewActions(), DocumentsCard(), when(), one(), ORDER, PortalUpload(), STREAM_INFO, Upload() (+27 more)

### Community 80 - "form-2307.tsx"
Cohesion: 0.12
Nodes (25): one(), Print(), Print2307Page(), ParallelRun(), ParallelRunPage(), quarterMonths(), PortalPrint2307Page(), Print() (+17 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.13
Nodes (34): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+26 more)

### Community 82 - "registrations/forms.tsx"
Cohesion: 0.21
Nodes (14): openRegistrationAction(), caseNote, caseTitle, Check(), ChecklistPreview(), ClientCaseForm(), NewRegistrationForm(), statusTone (+6 more)

### Community 83 - "staff/actions.ts"
Cohesion: 0.18
Nodes (17): addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), BranchOption, BranchOptions(), InviteStaffForm() (+9 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "IsoDate"
Cohesion: 0.16
Nodes (16): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+8 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.16
Nodes (26): AmendmentDecision(), ArapDecision(), BookPicker(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm(), ReverseForm() (+18 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (71): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+63 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "filings/actions.ts"
Cohesion: 0.06
Nodes (59): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+51 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.13
Nodes (24): Select(), AttributionKeeper(), noop(), readAttribution(), useAttribution(), IntakePicker(), EwtKind, ATTRIBUTION_KEY (+16 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (28): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+20 more)

### Community 93 - "leads/forms.tsx"
Cohesion: 0.13
Nodes (36): assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh(), reopenLeadAction() (+28 more)

### Community 94 - "supabaseServer"
Cohesion: 0.06
Nodes (68): setIncomeTaxMethodAction(), addClientNoteAction(), amendFilingAction(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), Lines(), lineStyle (+60 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Centavos"
Cohesion: 0.11
Nodes (20): EntryLineOut, Bucket, SaleSplit, EntryLine, RegisterTotals, TaxLine, NonDeductibleRow, SawtResult (+12 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "review-form.tsx"
Cohesion: 0.09
Nodes (39): ApproveItem, approveSelectedAction(), BOOKED, INVOICED, key(), approveDocumentAction(), DirectoryParty, ENTRY_STATUS (+31 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (48): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+40 more)

### Community 101 - "engine.ts"
Cohesion: 0.12
Nodes (29): compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), toIso(), ymd(), DeadlineRule, fiscalYearOf() (+21 more)

### Community 102 - "select.tsx"
Cohesion: 0.11
Nodes (28): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+20 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "pending-review.tsx"
Cohesion: 0.16
Nodes (16): BulkState, BooksChoices(), Codes, initialCodes(), ocrKeys(), PendingReview(), PendingRow, PendingTaxCodes (+8 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (59): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+51 more)

### Community 107 - "board.ts"
Cohesion: 0.06
Nodes (57): ClientTabs(), ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus (+49 more)

### Community 108 - "dates.ts"
Cohesion: 0.15
Nodes (23): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), DecideExceptionForm(), Message() (+15 more)

### Community 109 - "social-button.tsx"
Cohesion: 0.06
Nodes (52): GET(), GET(), POST(), code, email, sendSignInEmail(), SignInState, signInWithGoogle() (+44 more)

### Community 110 - "vitest"
Cohesion: 0.02
Nodes (62): pg, vitest, dir, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA (+54 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "registrations/[id]/page.tsx"
Cohesion: 0.22
Nodes (16): completeRegistrationAction(), CompleteButton(), StepBadge(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+8 more)

### Community 113 - "money.ts"
Cohesion: 0.11
Nodes (35): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, BooksCards(), cents() (+27 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.14
Nodes (28): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+20 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.08
Nodes (62): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+54 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.12
Nodes (35): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+27 more)

### Community 118 - "documents/[id]/page.tsx"
Cohesion: 0.24
Nodes (12): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton(), pendingDocumentTaxCodes(), LockFiling (+4 more)

### Community 119 - "quote.ts"
Cohesion: 0.10
Nodes (39): proposal(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has(), buildProposalQuote() (+31 more)

### Community 120 - "source.ts"
Cohesion: 0.07
Nodes (46): withNonDeductible(), VatData, form1604E, client, YEAR, dayBefore(), FilingRow, listInvoices() (+38 more)

### Community 121 - "work/load.ts"
Cohesion: 0.20
Nodes (14): lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem(), nextActions() (+6 more)

### Community 122 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "next"
Cohesion: 0.12
Nodes (31): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Detail() (+23 more)

### Community 126 - "documents/[id]/page.tsx"
Cohesion: 0.07
Nodes (48): applyColumnsAction(), done(), payrollDocument(), PayrollReadState, readPayrollAction(), saveColumnMap(), savePayrollReadAction(), KIND_LABEL (+40 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.09
Nodes (47): mergePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName() (+39 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (60): PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow() (+52 more)

### Community 129 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+9 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.11
Nodes (39): RFC-2047, RFC-2822, GET(), ReturnFileState, sendEsubmissionAction(), TYPES, EsubmissionMailEnv, esubmissionMailEnv() (+31 more)

### Community 131 - "settings/actions.ts"
Cohesion: 0.30
Nodes (12): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+4 more)

### Community 132 - "proof-actions.ts"
Cohesion: 0.21
Nodes (13): send(), amount, date, ProofState, refresh(), rejectProofAction(), StartProof, startProofUpload() (+5 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.14
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+18 more)

### Community 135 - "tin.ts"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 136 - "react"
Cohesion: 0.06
Nodes (66): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+58 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "[id]/books/page.tsx"
Cohesion: 0.22
Nodes (15): WithdrawReportButton(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate(), lastMonth(), Reports(), ReportsPage() (+7 more)

### Community 139 - "tax-codes.ts"
Cohesion: 0.23
Nodes (11): canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine, returnLinesFor() (+3 more)

### Community 140 - "queries.ts"
Cohesion: 0.22
Nodes (12): GET(), BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData(), NotificationItem (+4 more)

### Community 141 - "runs.tsx"
Cohesion: 0.26
Nodes (14): ApprovedReview(), ApprovedRow, moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar() (+6 more)

### Community 142 - "obligations.ts"
Cohesion: 0.26
Nodes (9): ClientValues, TAX_TYPES, TAXPAYER_TYPES, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap (+1 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "db.test.ts"
Cohesion: 0.05
Nodes (16): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+8 more)

### Community 145 - "formatAmount"
Cohesion: 0.10
Nodes (44): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+36 more)

### Community 146 - "filings/run.ts"
Cohesion: 0.09
Nodes (47): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+39 more)

### Community 147 - "ledger/types.ts"
Cohesion: 0.12
Nodes (25): Access, OpeningChecklist(), STATUS, Asset, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+17 more)

### Community 148 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 149 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 150 - "blocks.tsx"
Cohesion: 0.07
Nodes (79): robots(), AboutPage(), HOW, metadata, BRING, ContactList(), ContactPage(), metadata (+71 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (15): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+7 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.14
Nodes (26): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+18 more)

### Community 154 - "notification-settings-view.tsx"
Cohesion: 0.14
Nodes (17): EmailSwitches(), EmailSwitchGroup, Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes, SwitchTrack() (+9 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (26): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), Documents(), DocumentsPage() (+18 more)

### Community 156 - "month.ts"
Cohesion: 0.13
Nodes (19): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, EMPLOYER_STEPS, LGU_STEPS, PlannedStep (+11 more)

### Community 157 - "template.ts"
Cohesion: 0.07
Nodes (33): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, jobField, ProposalJob (+25 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (44): BookingLink(), FunnelSwitch(), ReopenForm(), Result(), bookedTime, Lead(), LeadPage(), LeadSource() (+36 more)

### Community 159 - "deadlines/page.tsx"
Cohesion: 0.11
Nodes (35): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), Queue() (+27 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.22
Nodes (20): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), Interval, manilaInstant() (+12 more)

### Community 163 - "proposal-view.tsx"
Cohesion: 0.19
Nodes (16): metadata, Proposal(), ProposalPage(), jobName(), lineName(), longDate(), money(), php (+8 more)

### Community 164 - "notifications.test.ts"
Cohesion: 0.16
Nodes (3): root, Row, root

### Community 165 - "ocr/run.ts"
Cohesion: 0.29
Nodes (10): BirCalendarPage(), metadata, FilingCalendar(), BIR_FORMS, BirForm, deadlinesIn(), FormGroup, formsIn() (+2 more)

### Community 166 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.15
Nodes (18): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+10 more)

### Community 169 - "notifications.test.ts"
Cohesion: 0.21
Nodes (17): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), NotificationRowData, Empty(), NotificationsView(), one(), SearchParams (+9 more)

### Community 170 - "[month]/page.tsx"
Cohesion: 0.09
Nodes (44): saveMonthAction(), MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState (+36 more)

### Community 171 - "registrations/new/page.tsx"
Cohesion: 0.39
Nodes (6): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), manilaDate(), dtiRenewalDue()

### Community 172 - "Textarea"
Cohesion: 0.12
Nodes (35): RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote(), SettingsPage() (+27 more)

### Community 173 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 174 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "tests/books.test.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 177 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 178 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 179 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 180 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 181 - "register-xlsx.ts"
Cohesion: 0.11
Nodes (30): RFC-4180, file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), draftToTemplate(), initialDraft() (+22 more)

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-4180`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1503 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `server.ts` to `LinkButton`, `public.ts`, `notification-bell.tsx`, `cx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `Badge`, `payroll/forms.tsx`, `modal.tsx`, `safeguards.ts`, `slots.ts`, `fees/[id]/page.tsx`, `books-context.ts`, `public.ts`, `module-pages.tsx`, `payroll/data.ts`, `registrations/forms.tsx`, `Notice`, `arap.ts`, `lock-bar.tsx`, `decision.tsx`, `Skeleton`, `clients/actions.ts`, `formatAmount`, `books/forms.tsx`, `marketing/page.tsx`, `theme-toggle.tsx`, `documents/labels.ts`, `form-2307.tsx`, `staff/actions.ts`, `ledger/data.ts`, `portal/reports/page.tsx`, `filings/actions.ts`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `supabaseServer`, `review-form.tsx`, `ledger/books.ts`, `pending-review.tsx`, `profile.ts`, `board.ts`, `dates.ts`, `social-button.tsx`, `registrations/[id]/page.tsx`, `money.ts`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `documents/[id]/page.tsx`, `batch/register.ts`, `next`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `return-file-actions.ts`, `settings/actions.ts`, `proof-actions.ts`, `fixed-assets/page.tsx`, `tin.ts`, `react`, `[id]/books/page.tsx`, `queries.ts`, `runs.tsx`, `formatAmount`, `filings/run.ts`, `ledger/types.ts`, `sign-off-actions.tsx`, `package.json`, `blocks.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `proposal-view.tsx`, `deadlines/actions.ts`, `opengraph-image.tsx`, `lead-attribution.test.ts`, `notifications.test.ts`, `[month]/page.tsx`, `registrations/new/page.tsx`, `Textarea`, `register-xlsx.ts`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `LinkButton` be split into smaller, more focused modules?**
  _Cohesion score 0.11564625850340136 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `LinkButton`, `client`, `ui.ts`, `public.ts`, `devDependencies`, `server.ts`, `statements.ts`, `income.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `Badge`, `safeguards.ts`, `slots.ts`, `fees/[id]/page.tsx`, `books-context.ts`, `public.ts`, `registrations/forms.tsx`, `returns/types.ts`, `params.ts`, `arap.ts`, `site-document.tsx`, `lock-bar.tsx`, `Skeleton`, `filings/run.ts`, `testing.ts`, `clients/actions.ts`, `books/forms.tsx`, `payroll/payroll.test.ts`, `theme-toggle.tsx`, `documents/labels.ts`, `staff/actions.ts`, `IsoDate`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `review-form.tsx`, `ledger/books.ts`, `engine.ts`, `rates.ts`, `pending-review.tsx`, `profile.ts`, `board.ts`, `dates.ts`, `social-button.tsx`, `registrations/[id]/page.tsx`, `money.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `documents/[id]/page.tsx`, `quote.ts`, `source.ts`, `work/load.ts`, `batch/register.ts`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `read.test.ts`, `opening.ts`, `return-file-actions.ts`, `gemini.ts`, `fixed-assets/page.tsx`, `ticked-allocation.test.ts`, `tax-codes.ts`, `runs.tsx`, `obligations.ts`, `notifications/format.ts`, `db.test.ts`, `formatAmount`, `filings/run.ts`, `ledger/types.ts`, `package.json`, `blocks.tsx`, `holiday-list.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `calendar/page.tsx`, `notifications.test.ts`, `ocr/run.ts`, `Textarea`, `names.ts`, `acting-approver.test.ts`, `tests/books.test.ts`, `lead-attribution.test.ts`, `fixed-assets.test.ts`, `parallel-run.test.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.07311827956989247 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `LinkButton`, `ui.ts`, `public.ts`, `server.ts`, `notification-bell.tsx`, `cx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `compare.ts`, `notification.tsx`, `Badge`, `payroll/forms.tsx`, `modal.tsx`, `safeguards.ts`, `slots.ts`, `fees/[id]/page.tsx`, `books-context.ts`, `public.ts`, `module-pages.tsx`, `input.tsx`, `payroll/data.ts`, `Notice`, `lock-bar.tsx`, `decision.tsx`, `Skeleton`, `clients/actions.ts`, `formatAmount`, `books/forms.tsx`, `stat-cards.tsx`, `marketing/page.tsx`, `theme-toggle.tsx`, `documents/labels.ts`, `form-2307.tsx`, `how-we-work/page.tsx`, `registrations/forms.tsx`, `staff/actions.ts`, `ledger/data.ts`, `portal/reports/page.tsx`, `filings/actions.ts`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `leads/forms.tsx`, `supabaseServer`, `review-form.tsx`, `ledger/books.ts`, `select.tsx`, `pending-review.tsx`, `profile.ts`, `board.ts`, `dates.ts`, `social-button.tsx`, `registrations/[id]/page.tsx`, `money.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `documents/[id]/page.tsx`, `batch/register.ts`, `next`, `documents/[id]/page.tsx`, `parties/[id]/page.tsx`, `settings/actions.ts`, `fixed-assets/page.tsx`, `tin.ts`, `[id]/books/page.tsx`, `queries.ts`, `runs.tsx`, `formatAmount`, `sign-off-actions.tsx`, `package.json`, `blocks.tsx`, `workpapers/page.tsx`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `template.ts`, `leads/[id]/page.tsx`, `deadlines/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `proposal-view.tsx`, `deadlines/actions.ts`, `lead-attribution.test.ts`, `notifications.test.ts`, `[month]/page.tsx`, `registrations/new/page.tsx`, `Textarea`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._