# Graph Report - tallocpa-dashboard  (2026-11-26)

## Corpus Check
- 880 files · ~687,826 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 5428 nodes · 18924 edges · 206 communities (179 shown, 27 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 168 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `6b973ae3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- formatAmount
- client
- migrate.yml
- alphalist.ts
- public.ts
- package.json
- client-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- notification-bell.tsx
- Sign-in & Setup Docs
- documents/[id]/page.tsx
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
- Centavos
- payroll/types.ts
- supabaseServer
- index.ts
- payroll/forms.tsx
- modal.tsx
- addDays
- scripts
- slots.ts
- fees/[id]/page.tsx
- payroll/export/route.ts
- documents/labels.ts
- module-pages.tsx
- marketing/page.tsx
- payroll/data.ts
- Badge
- returns/types.ts
- Notice
- digest.ts
- ledger/data.ts
- layout.ts
- manilaToday
- cx
- dropdown.tsx
- Apple Design
- social-button.tsx
- testing.ts
- collections/forms.tsx
- source.ts
- books/forms.tsx
- payroll/payroll.test.ts
- Rules
- Animation Performance
- site-document.tsx
- stat-cards.tsx
- cycle-forms.tsx
- notification-settings-view.tsx
- quote.ts
- theme-toggle.tsx
- how-we-work/page.tsx
- zod
- button.tsx
- Pro components
- getIdentity
- ledger/data.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- Centavos
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- leads/[id]/page.tsx
- toCentavos
- Recipes
- notifications-view.tsx
- BoardUI page patterns
- Pro templates
- ui.ts
- ledger/books.ts
- addDays
- select.tsx
- status.ts
- boardui
- quote/page.tsx
- profile.ts
- filings/[id]/page.tsx
- app/documents/page.tsx
- marketing/attribution.ts
- ref_node_fs
- Opening balances: checklist for any cut-off
- month.ts
- portal/page.tsx
- transactions-actions.ts
- [clientId]/page.tsx
- calendar/staff.ts
- apply-migrations.sh
- vat.ts
- documents/actions.ts
- returns/load.ts
- tests/register.test.ts
- notes.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- manilaToday
- toCentavos
- lib/books/actions.ts
- read.test.ts
- workpapers/load.ts
- return-file-actions.ts
- review/page.tsx
- clients/[id]/page.tsx
- gemini.ts
- work/load.ts
- rates.ts
- react
- ticked-allocation.test.ts
- books-ready.ts
- ledger.test.ts
- queries.ts
- filings/actions.ts
- idle-watcher.tsx
- notifications/format.ts
- names.ts
- register/page.tsx
- supabaseAdmin
- opening-checklist.tsx
- fixed-assets/page.tsx
- Textarea
- (site)/page.tsx
- holiday-list.ts
- safeguards.ts
- workpapers/page.tsx
- notifications-view.tsx
- app/documents/page.tsx
- buildSawt
- gap/page.tsx
- seed.ts
- filed-returns.ts
- bell-store.ts
- Rework: one flow from lead to year-end
- calendar/page.tsx
- lock-actions.ts
- Card
- items.ts
- params.ts
- opengraph-image.tsx
- lead-attribution.test.ts
- deadlines/actions.ts
- Building UIs with BoardUI
- register-books.test.ts
- app/settings/page.tsx
- fixed-assets/forms.tsx
- requireOwner
- acting-approver.test.ts
- books-2307.test.ts
- registrations/forms.tsx
- parallel-run.test.ts
- returns-sign-off.test.ts
- LinkButton
- funnel.test.ts
- leads-pipeline.test.ts
- vitest
- books-migration.test.ts
- tests/books.test.ts
- ref_node_path
- portal-statements-approval.test.ts
- fees.test.ts
- sign-in-form.tsx
- ledger-documents.test.ts
- month-complete.test.ts
- cycle/actions.ts
- requireStaff
- site/calendar.ts
- missing-2307/page.tsx
- scroll-fade.tsx
- messages.ts
- db.test.ts
- staff/forms.tsx
- ledger-closing.test.ts
- tests/payroll.test.ts
- returns-books.test.ts
- payroll-books.test.ts
- templates/README.md

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 310 edges
2. `cx` - 278 edges
3. `react` - 250 edges
4. `Skeleton()` - 240 edges
5. `Notice()` - 233 edges
6. `next` - 209 edges
7. `Button()` - 204 edges
8. `Card()` - 166 edges
9. `Badge()` - 165 edges
10. `vitest` - 160 edges

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

## Communities (206 total, 27 thin omitted)

### Community 0 - "formatAmount"
Cohesion: 0.07
Nodes (59): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+51 more)

### Community 1 - "client"
Cohesion: 0.09
Nodes (18): BOOK_LOCK_FORMS, as(), client(), root, approveIntoBooks(), as(), generateFilings(), lockMonth() (+10 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "alphalist.ts"
Cohesion: 0.14
Nodes (26): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+18 more)

### Community 4 - "public.ts"
Cohesion: 0.11
Nodes (24): metadata, Proposal(), ProposalPage(), Lines(), longDate(), money(), php, ProposalData (+16 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "client-form.tsx"
Cohesion: 0.12
Nodes (24): ClientForm(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage(), OwnerOnly() (+16 more)

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
Cohesion: 0.23
Nodes (17): markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base(), BellAudience (+9 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "documents/[id]/page.tsx"
Cohesion: 0.24
Nodes (13): EmployeeDetail(), EmployeePage(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ReadPayrollButton() (+5 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.10
Nodes (20): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+12 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.07
Nodes (53): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), PrintButton() (+45 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (74): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+66 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "year-end/page.tsx"
Cohesion: 0.12
Nodes (28): FormState, setYearEndCheckAction(), TickForm(), ANNUAL_FORMS, BADGE, CALENDAR_YEAR_FORMS, fmtYear(), YearEnd() (+20 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Centavos"
Cohesion: 0.06
Nodes (72): ParallelRun(), ParallelRunPage(), quarterMonths(), CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs() (+64 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "supabaseServer"
Cohesion: 0.07
Nodes (43): nextConfig, next, addClientNoteAction(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), archiveLinkAction(), createLinkAction() (+35 more)

### Community 45 - "index.ts"
Cohesion: 0.07
Nodes (19): acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA, COST, EQUITY (+11 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (48): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+40 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "addDays"
Cohesion: 0.15
Nodes (27): AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup(), GROUP_HINT, one(), OpenRow (+19 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.13
Nodes (31): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), Book(), PortalBookPage() (+23 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.11
Nodes (36): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+28 more)

### Community 52 - "payroll/export/route.ts"
Cohesion: 0.23
Nodes (14): file(), GET(), safe(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when() (+6 more)

### Community 53 - "documents/labels.ts"
Cohesion: 0.12
Nodes (26): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+18 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.09
Nodes (71): booksContext(), fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column, ListRow (+63 more)

### Community 55 - "marketing/page.tsx"
Cohesion: 0.11
Nodes (28): MarketingState, ArchiveButton(), CopyLink(), CreateLinkForm(), N(), pct(), php, ReportLine (+20 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.09
Nodes (44): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+36 more)

### Community 57 - "Badge"
Cohesion: 0.08
Nodes (61): SectionTabs(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+53 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.05
Nodes (80): FinancialStatements, client, VatData, form1601C, INPUTS, MONTH, PAYSLIP_COLUMNS, payslipCsv() (+72 more)

### Community 59 - "Notice"
Cohesion: 0.10
Nodes (68): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+60 more)

### Community 60 - "digest.ts"
Cohesion: 0.43
Nodes (5): digestMessage(), DigestRow, longDay(), peso, time()

### Community 61 - "ledger/data.ts"
Cohesion: 0.15
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 62 - "layout.ts"
Cohesion: 0.14
Nodes (21): afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape(), Spec, SPECS, dir (+13 more)

### Community 63 - "manilaToday"
Cohesion: 0.16
Nodes (21): BooksLockBar(), ICON, LockBarFor(), MonthLock(), LockContext, BooksMonthsPage(), Months(), one() (+13 more)

### Community 64 - "cx"
Cohesion: 0.03
Nodes (84): AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles, StatusDot() (+76 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.10
Nodes (28): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+20 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 68 - "testing.ts"
Cohesion: 0.16
Nodes (20): year, BUSINESS_TAX_FORMS, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+12 more)

### Community 69 - "collections/forms.tsx"
Cohesion: 0.19
Nodes (21): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState, peso (+13 more)

### Community 70 - "source.ts"
Cohesion: 0.09
Nodes (46): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), normalizeTin(), datAddress(), datNameCols(), displayName() (+38 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.15
Nodes (42): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+34 more)

### Community 72 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (53): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+45 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (43): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+35 more)

### Community 77 - "cycle-forms.tsx"
Cohesion: 0.15
Nodes (24): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton(), Message(), NothingToSubmitButton() (+16 more)

### Community 78 - "notification-settings-view.tsx"
Cohesion: 0.23
Nodes (10): EmailSwitches(), EmailSwitchGroup, Switch(), SwitchProps, SwitchShape, SwitchSize, switchSizes, SwitchTrack() (+2 more)

### Community 79 - "quote.ts"
Cohesion: 0.10
Nodes (38): EstimatedProfile, ExistingClient, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange() (+30 more)

### Community 80 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (45): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+37 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "zod"
Cohesion: 0.21
Nodes (12): zod@^4.6.7, zod, amount, date, ProofState, refresh(), rejectProofAction(), StartProof (+4 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "getIdentity"
Cohesion: 0.18
Nodes (22): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread() (+14 more)

### Community 86 - "ledger/data.ts"
Cohesion: 0.11
Nodes (38): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+30 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.10
Nodes (55): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), basePeriod(), HeldNote() (+47 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "Centavos"
Cohesion: 0.09
Nodes (27): amt(), ApprovalMemo(), Db, TIE, EntryLineOut, BOOKS_GO_LIVE, MonthInput, EntryLine (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.09
Nodes (35): metadata, QuotesClosed(), Start(), StartPage(), Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState (+27 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.28
Nodes (13): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Item(), mmddyyyy(), PartyFields() (+5 more)

### Community 93 - "leads/[id]/page.tsx"
Cohesion: 0.12
Nodes (32): PLACES, assignReviewerAction(), bookingLinkAction(), convertLeadAction(), LeadState, markLostAction(), recordCallAction(), refresh() (+24 more)

### Community 94 - "toCentavos"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "notifications-view.tsx"
Cohesion: 0.16
Nodes (17): NotificationFilterTabs(), NotificationRowData, IconComponent, Tab(), TabList(), TabListProps, TabPanel(), TabPanelProps (+9 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "ui.ts"
Cohesion: 0.07
Nodes (58): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Booking (+50 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (48): exceljs, BookPrint(), BookPrintPage(), PrintButton(), BookPrint(), PortalBookPrint(), LooseLeafHead, LooseLeafPages() (+40 more)

### Community 101 - "addDays"
Cohesion: 0.11
Nodes (38): compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, EfpsGroup, FilingChannel, FilingInstance, fiscalYearOf() (+30 more)

### Community 102 - "select.tsx"
Cohesion: 0.09
Nodes (30): DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps, DropdownPopoverProps (+22 more)

### Community 103 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "quote/page.tsx"
Cohesion: 0.17
Nodes (20): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+12 more)

### Community 106 - "profile.ts"
Cohesion: 0.06
Nodes (56): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+48 more)

### Community 107 - "filings/[id]/page.tsx"
Cohesion: 0.07
Nodes (45): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+37 more)

### Community 108 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (38): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BatchRow (+30 more)

### Community 109 - "marketing/attribution.ts"
Cohesion: 0.16
Nodes (29): GET(), Link, pageAttribution(), requestQuoteAction(), SERVICES, StartState, php, StartForm() (+21 more)

### Community 110 - "ref_node_fs"
Cohesion: 0.07
Nodes (13): dir, readme, templates, ctx, input, api, ctx, fn (+5 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "transactions-actions.ts"
Cohesion: 0.28
Nodes (15): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+7 more)

### Community 115 - "[clientId]/page.tsx"
Cohesion: 0.10
Nodes (43): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), ReasonAction() (+35 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.20
Nodes (17): disconnectCalendarAction(), FormState, GET(), GET(), DisconnectButton(), accountProblem(), newState(), redirectUri() (+9 more)

### Community 118 - "vat.ts"
Cohesion: 0.16
Nodes (38): Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, addMonths(), branchCode() (+30 more)

### Community 119 - "documents/actions.ts"
Cohesion: 0.17
Nodes (16): DocumentUpload(), send(), upload(), typeFromName(), ALLOWED, DocActionState, finishUpload(), replyDocumentAction() (+8 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.07
Nodes (51): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+43 more)

### Community 121 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 122 - "notes.ts"
Cohesion: 0.18
Nodes (16): NotesCard(), Lead(), LeadPage(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry (+8 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "manilaToday"
Cohesion: 0.10
Nodes (37): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), one() (+29 more)

### Community 126 - "toCentavos"
Cohesion: 0.06
Nodes (54): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+46 more)

### Community 127 - "lib/books/actions.ts"
Cohesion: 0.17
Nodes (12): AmendmentFlag, BooksMonthRow, CodeSource, Db, DocumentPortion, DocumentPosting, InvoiceInput, InvoiceLineInput (+4 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (72): RFC-4180, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS, findHeaderRow() (+64 more)

### Community 129 - "workpapers/load.ts"
Cohesion: 0.17
Nodes (19): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+11 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.10
Nodes (42): RFC-2047, RFC-2822, GET(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+34 more)

### Community 131 - "review/page.tsx"
Cohesion: 0.28
Nodes (8): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 132 - "clients/[id]/page.tsx"
Cohesion: 0.08
Nodes (41): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+33 more)

### Community 133 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 134 - "work/load.ts"
Cohesion: 0.15
Nodes (22): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), addDays(), parseIso() (+14 more)

### Community 135 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+11 more)

### Community 136 - "react"
Cohesion: 0.05
Nodes (72): react, @remixicon/react, Batch(), BatchPage(), one(), toCentavos(), BankAccountsRoute(), EmployeesRoute() (+64 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "books-ready.ts"
Cohesion: 0.52
Nodes (5): BOOKS_MONTH_STATUS_LABELS, isLocked(), monthsInPeriod(), onlyBooksReady(), periodLocked()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "queries.ts"
Cohesion: 0.21
Nodes (13): GET(), BELL_LIMIT, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 141 - "filings/actions.ts"
Cohesion: 0.19
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 142 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (18): POST(), ACTIVITY, readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE, IDLE_WARNING_SECONDS (+10 more)

### Community 143 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 144 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 145 - "register/page.tsx"
Cohesion: 0.11
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.14
Nodes (31): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+23 more)

### Community 147 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (24): Access, OpeningChecklist(), STATUS, CASH_FLOW_CLASSES, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES (+16 more)

### Community 148 - "fixed-assets/page.tsx"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 149 - "Textarea"
Cohesion: 0.14
Nodes (17): NoteState, ClientNoteForm(), PayrollIntake(), SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote() (+9 more)

### Community 150 - "(site)/page.tsx"
Cohesion: 0.06
Nodes (83): robots(), AboutPage(), HOW, metadata, BirCalendarPage(), metadata, BRING, ContactList() (+75 more)

### Community 151 - "holiday-list.ts"
Cohesion: 0.16
Nodes (15): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+7 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.08
Nodes (42): CoverageClient, coverageGaps(), Gap, GapKind, isWeekend(), Email, line(), longDay() (+34 more)

### Community 153 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 154 - "notifications-view.tsx"
Cohesion: 0.17
Nodes (17): notifyNotificationsChanged(), MarkAllReadButton(), NotificationRow(), Empty(), NotificationsView(), one(), SearchParams, fullDateTime() (+9 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (26): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+18 more)

### Community 156 - "buildSawt"
Cohesion: 0.20
Nodes (16): qapBuckets(), sawtBuckets(), ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo() (+8 more)

### Community 157 - "gap/page.tsx"
Cohesion: 0.19
Nodes (13): EngagementRow, FeeGapPage(), Gap(), estimateProfile(), gapFor(), GapRow, has(), lastWholeMonths() (+5 more)

### Community 158 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 159 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 160 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (39): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), AnchorButton(), buttonClass(), Interval (+31 more)

### Community 163 - "lock-actions.ts"
Cohesion: 0.31
Nodes (13): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+5 more)

### Community 164 - "Card"
Cohesion: 0.38
Nodes (9): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, Card() (+1 more)

### Community 165 - "items.ts"
Cohesion: 0.20
Nodes (12): PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, Category, CATEGORY_KEYS, DEDUCTION_FIELDS, DEFAULT_ITEMS (+4 more)

### Community 166 - "params.ts"
Cohesion: 0.22
Nodes (11): count(), first(), pick(), profileFromQuery(), items, suggestedAnnualItems(), BOOKKEEPING_LEVELS, BookkeepingLevel (+3 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 169 - "deadlines/actions.ts"
Cohesion: 0.43
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 170 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 171 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 172 - "app/settings/page.tsx"
Cohesion: 0.13
Nodes (32): SettingsState, HolidayForm(), HolidayYearForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings() (+24 more)

### Community 173 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 174 - "requireOwner"
Cohesion: 0.06
Nodes (63): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), setIncomeTaxMethodAction() (+55 more)

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 177 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (39): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+31 more)

### Community 178 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 179 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 180 - "LinkButton"
Cohesion: 0.19
Nodes (16): MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page() (+8 more)

### Community 181 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 182 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 183 - "vitest"
Cohesion: 0.06
Nodes (13): pg, vitest, root, root, root, root, root, root (+5 more)

### Community 184 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 185 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 186 - "ref_node_path"
Cohesion: 0.08
Nodes (9): outDir, pkgDir, require, { version }, root, root, Row, root (+1 more)

### Community 189 - "sign-in-form.tsx"
Cohesion: 0.27
Nodes (10): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+2 more)

### Community 192 - "cycle/actions.ts"
Cohesion: 0.30
Nodes (10): MonthComplete(), SentRow, TimelineRow, confirmMonthAction(), CycleState, decideExceptionAction(), refresh(), text() (+2 more)

### Community 193 - "requireStaff"
Cohesion: 0.13
Nodes (31): loadLockContext(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+23 more)

### Community 194 - "site/calendar.ts"
Cohesion: 0.33
Nodes (6): BIR_FORMS, BirForm, deadlinesIn(), FormGroup, GROUPS, MONTHS

### Community 195 - "missing-2307/page.tsx"
Cohesion: 0.39
Nodes (6): decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page(), Row

### Community 196 - "scroll-fade.tsx"
Cohesion: 0.38
Nodes (6): SheetPreview(), SelectList(), SCROLL_FADE_DISTANCE, ScrollFade(), ScrollFadeProps, useScrollFade()

### Community 197 - "messages.ts"
Cohesion: 0.38
Nodes (5): cycleMessage(), dayFmt, NoticeKind, showDay(), Due

### Community 199 - "staff/forms.tsx"
Cohesion: 0.53
Nodes (5): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), StaffList()

### Community 200 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

## Knowledge Gaps
- **21 isolated node(s):** `npx`, `NODE_USE_ENV_PROXY`, `DO_NOT_TRACK`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1440 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `formatAmount`, `public.ts`, `package.json`, `client-form.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `payroll/forms.tsx`, `addDays`, `slots.ts`, `fees/[id]/page.tsx`, `payroll/export/route.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `payroll/data.ts`, `Badge`, `manilaToday`, `cx`, `collections/forms.tsx`, `source.ts`, `books/forms.tsx`, `site-document.tsx`, `cycle-forms.tsx`, `theme-toggle.tsx`, `zod`, `getIdentity`, `ledger/data.ts`, `portal/reports/page.tsx`, `Centavos`, `intake-picker.tsx`, `form-2316.tsx`, `leads/[id]/page.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `marketing/attribution.ts`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `documents/actions.ts`, `returns/load.ts`, `batch/register.ts`, `manilaToday`, `toCentavos`, `return-file-actions.ts`, `review/page.tsx`, `clients/[id]/page.tsx`, `work/load.ts`, `react`, `queries.ts`, `filings/actions.ts`, `idle-watcher.tsx`, `register/page.tsx`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `Textarea`, `(site)/page.tsx`, `workpapers/page.tsx`, `notifications-view.tsx`, `app/documents/page.tsx`, `gap/page.tsx`, `lock-actions.ts`, `Card`, `opengraph-image.tsx`, `deadlines/actions.ts`, `app/settings/page.tsx`, `fixed-assets/forms.tsx`, `requireOwner`, `registrations/forms.tsx`, `LinkButton`, `cycle/actions.ts`, `requireStaff`, `missing-2307/page.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **What connects `npx`, `NODE_USE_ENV_PROXY`, `DO_NOT_TRACK` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `formatAmount` be split into smaller, more focused modules?**
  _Cohesion score 0.0745945945945946 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `formatAmount`, `public.ts`, `package.json`, `client-form.tsx`, `notification-bell.tsx`, `documents/[id]/page.tsx`, `dependencies`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `supabaseServer`, `payroll/forms.tsx`, `modal.tsx`, `addDays`, `slots.ts`, `fees/[id]/page.tsx`, `payroll/export/route.ts`, `documents/labels.ts`, `module-pages.tsx`, `marketing/page.tsx`, `Badge`, `Notice`, `manilaToday`, `cx`, `dropdown.tsx`, `social-button.tsx`, `collections/forms.tsx`, `source.ts`, `books/forms.tsx`, `site-document.tsx`, `stat-cards.tsx`, `cycle-forms.tsx`, `notification-settings-view.tsx`, `theme-toggle.tsx`, `how-we-work/page.tsx`, `button.tsx`, `getIdentity`, `ledger/data.ts`, `portal/reports/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `leads/[id]/page.tsx`, `notifications-view.tsx`, `ui.ts`, `ledger/books.ts`, `select.tsx`, `quote/page.tsx`, `profile.ts`, `filings/[id]/page.tsx`, `marketing/attribution.ts`, `portal/page.tsx`, `transactions-actions.ts`, `[clientId]/page.tsx`, `calendar/staff.ts`, `documents/actions.ts`, `returns/load.ts`, `batch/register.ts`, `manilaToday`, `toCentavos`, `return-file-actions.ts`, `review/page.tsx`, `clients/[id]/page.tsx`, `work/load.ts`, `queries.ts`, `idle-watcher.tsx`, `register/page.tsx`, `fixed-assets/page.tsx`, `Textarea`, `(site)/page.tsx`, `workpapers/page.tsx`, `app/documents/page.tsx`, `gap/page.tsx`, `bell-store.ts`, `calendar/page.tsx`, `Card`, `items.ts`, `deadlines/actions.ts`, `app/settings/page.tsx`, `fixed-assets/forms.tsx`, `requireOwner`, `registrations/forms.tsx`, `LinkButton`, `sign-in-form.tsx`, `cycle/actions.ts`, `requireStaff`, `missing-2307/page.tsx`, `scroll-fade.tsx`, `staff/forms.tsx`?**
  _High betweenness centrality (0.140) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.08547008547008547 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `formatAmount`, `client`, `public.ts`, `package.json`, `client-form.tsx`, `statements.ts`, `year-end/page.tsx`, `scores/page.tsx`, `Centavos`, `supabaseServer`, `index.ts`, `addDays`, `slots.ts`, `fees/[id]/page.tsx`, `payroll/data.ts`, `Badge`, `returns/types.ts`, `digest.ts`, `ledger/data.ts`, `layout.ts`, `manilaToday`, `testing.ts`, `source.ts`, `payroll/payroll.test.ts`, `cycle-forms.tsx`, `quote.ts`, `theme-toggle.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `Centavos`, `document-scanner.tsx`, `intake-picker.tsx`, `toCentavos`, `ui.ts`, `ledger/books.ts`, `addDays`, `status.ts`, `profile.ts`, `filings/[id]/page.tsx`, `app/documents/page.tsx`, `marketing/attribution.ts`, `ref_node_fs`, `month.ts`, `portal/page.tsx`, `[clientId]/page.tsx`, `calendar/staff.ts`, `returns/load.ts`, `tests/register.test.ts`, `notes.ts`, `batch/register.ts`, `toCentavos`, `read.test.ts`, `return-file-actions.ts`, `review/page.tsx`, `clients/[id]/page.tsx`, `gemini.ts`, `work/load.ts`, `rates.ts`, `ticked-allocation.test.ts`, `books-ready.ts`, `ledger.test.ts`, `filings/actions.ts`, `idle-watcher.tsx`, `notifications/format.ts`, `names.ts`, `register/page.tsx`, `supabaseAdmin`, `opening-checklist.tsx`, `fixed-assets/page.tsx`, `(site)/page.tsx`, `holiday-list.ts`, `safeguards.ts`, `app/documents/page.tsx`, `gap/page.tsx`, `filed-returns.ts`, `calendar/page.tsx`, `params.ts`, `lead-attribution.test.ts`, `register-books.test.ts`, `app/settings/page.tsx`, `requireOwner`, `acting-approver.test.ts`, `books-2307.test.ts`, `registrations/forms.tsx`, `parallel-run.test.ts`, `returns-sign-off.test.ts`, `funnel.test.ts`, `leads-pipeline.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `ref_node_path`, `portal-statements-approval.test.ts`, `fees.test.ts`, `ledger-documents.test.ts`, `month-complete.test.ts`, `requireStaff`, `site/calendar.ts`, `messages.ts`, `db.test.ts`, `ledger-closing.test.ts`, `tests/payroll.test.ts`, `returns-books.test.ts`, `payroll-books.test.ts`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._