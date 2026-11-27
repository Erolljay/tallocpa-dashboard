# Graph Report - tallocpa-dashboard  (2026-11-27)

## Corpus Check
- 989 files · ~825,695 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 6097 nodes · 21617 edges · 180 communities (160 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 189 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `22d65185`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- draft.ts
- migrate.yml
- ui.ts
- public.ts
- devDependencies
- [month]/page.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- vat.ts
- Sign-in & Setup Docs
- quote.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- modal.tsx
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
- payroll/types.ts
- notification-settings-view.tsx
- documents/labels.ts
- payroll/forms.tsx
- settings/actions.ts
- morning.ts
- scripts
- slots.ts
- fees/[id]/page.tsx
- supabaseServer
- webhook.ts
- module-pages.tsx
- notification-actions.tsx
- react
- button.tsx
- returns/types.ts
- steps.ts
- portal/page.tsx
- engine.ts
- template.ts
- lock-bar.tsx
- money.ts
- LinkButton
- Apple Design
- generate.ts
- testing.ts
- filed-returns.ts
- year-end/page.tsx
- books/forms.tsx
- payroll/data.ts
- Rules
- Animation Performance
- income.ts
- stat-cards.tsx
- blocks.tsx
- leads/page.tsx
- vitest
- Building UIs with BoardUI
- how-we-work/page.tsx
- leads/[id]/page.tsx
- cx.ts
- Pro components
- split-bundled-pdfs.test.ts
- Notice
- portal/reports/page.tsx
- portal-billing.test.ts
- register/page.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- payroll/payroll.test.ts
- PageHeader
- Recipes
- cwt-2307-tracker.test.ts
- BoardUI page patterns
- Pro templates
- manilaToday
- ledger/types.ts
- ledger/data.ts
- cx
- rates.ts
- boardui
- addDays
- standing-forms.tsx
- ledger/data.ts
- cycle/page.tsx
- client
- index.ts
- Opening balances: checklist for any cut-off
- profile.ts
- telegram-uploads.test.ts
- marketing/page.tsx
- collections/forms.tsx
- calendar/staff.ts
- apply-migrations.sh
- tests/books.test.ts
- quote/page.tsx
- returns/load.ts
- theme-toggle.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- statement.ts
- parties/[id]/page.tsx
- read.test.ts
- social-button.tsx
- mime.ts
- board.ts
- ocr/run.ts
- fixed-assets/page.tsx
- LinkButton
- app/settings/page.tsx
- ticked-allocation.test.ts
- @remixicon/react
- review-form.tsx
- move-bar.tsx
- transactions-actions.ts
- safeguards.ts
- notifications/format.ts
- server-only
- Centavos
- queries.ts
- notifications-view.tsx
- layout.ts
- ledger.test.ts
- notification-bell.tsx
- app/documents/page.tsx
- clients/[id]/page.tsx
- filings/[id]/page.tsx
- leads/[id]/page.tsx
- remittances/[id]/page.tsx
- app/requests/[id]/page.tsx
- Rework: one flow from lead to year-end
- calendar/page.tsx
- bell-store.ts
- opengraph-image.tsx
- eslint.config.mjs
- next-actions.ts
- db.test.ts
- tests/proposal-email.test.ts
- acting-approver.test.ts
- cancel.ts
- month.ts
- staff/page.tsx
- documents/[id]/page.tsx
- contribution-remittances.test.ts
- public.ts
- toCentavos
- review-forms.tsx
- names.ts
- seed.ts
- proposal-view.tsx
- package.json
- templates/README.md
- workpapers/page.tsx
- fields.ts
- returns-sign-off.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 383 edges
2. `cx` - 306 edges
3. `react` - 275 edges
4. `Notice()` - 263 edges
5. `Skeleton()` - 254 edges
6. `Button()` - 242 edges
7. `next` - 238 edges
8. `vitest` - 191 edges
9. `Card()` - 182 edges
10. `Badge()` - 182 edges

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

## Communities (180 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (51): Portal2307(), Portal2307Page(), PortalPrint2307Page(), Print(), one(), portal2307(), portal2307Href(), SearchParams (+43 more)

### Community 1 - "draft.ts"
Cohesion: 0.14
Nodes (23): file(), GET(), safe(), employeesForMonth(), buildEmployeeTemplate(), DraftIssue, draftSchema, draftToTemplate() (+15 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.07
Nodes (60): booksViewFor(), BooksFrame(), WithdrawReportButton(), blankLine(), InvoiceForm(), InvoiceFormValue, BooksLockBar(), MonthSelect() (+52 more)

### Community 4 - "public.ts"
Cohesion: 0.15
Nodes (19): acceptProposalAction(), AcceptState, complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick() (+11 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+7 more)

### Community 6 - "[month]/page.tsx"
Cohesion: 0.16
Nodes (29): previewRegisterAction(), saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), Payroll(), PayrollPage(), applyRegister() (+21 more)

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

### Community 11 - "vat.ts"
Cohesion: 0.15
Nodes (38): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDashed(), tinDigits(), tinHasBranch() (+30 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "quote.ts"
Cohesion: 0.10
Nodes (37): PriceRow, EstimatedProfile, estimateProfile(), ExistingClient, has(), buildQuote(), catchUpFor(), CatchUpLine (+29 more)

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
Nodes (38): FinancialStatementsView(), StatementTable(), PrintButton(), defaultCashFlow(), statementsFrom(), isFsLine(), add(), buildStatements() (+30 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+26 more)

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
Cohesion: 0.10
Nodes (45): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page(), Tracker(), CwtLooseDocuments() (+37 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.08
Nodes (44): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+36 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (76): Atcs(), Diff(), Documents(), FigureRows(), KIND, MonthDetail(), Parties(), PartyRow() (+68 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "notification-settings-view.tsx"
Cohesion: 0.21
Nodes (13): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), setEmailPreference(), kindsFor(), NOTIFICATION_GROUPS (+5 more)

### Community 45 - "documents/labels.ts"
Cohesion: 0.08
Nodes (47): Doc, DocumentsCard(), when(), Row, Doc, Documents(), FolderKey, FOLDERS (+39 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (50): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+42 more)

### Community 47 - "settings/actions.ts"
Cohesion: 0.16
Nodes (15): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), parseRdoList(), STANDARD_HOLIDAYS, StandardHoliday (+7 more)

### Community 48 - "morning.ts"
Cohesion: 0.13
Nodes (18): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+10 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "slots.ts"
Cohesion: 0.11
Nodes (35): cancelMeetingAction(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction() (+27 more)

### Community 51 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (24): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+16 more)

### Community 52 - "supabaseServer"
Cohesion: 0.06
Nodes (79): nextConfig, next, setIncomeTaxMethodAction(), addClientNoteAction(), NoteState, Detail(), StatementPage(), markCwtFollowedUpAction() (+71 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (48): maxDuration, POST(), TelegramEnv, telegramEnv(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED (+40 more)

### Community 54 - "module-pages.tsx"
Cohesion: 0.07
Nodes (43): BankAccountsRoute(), fmtMonth(), SearchParams, BooksList(), Column, ListRow, RowLink(), CustomersRoute() (+35 more)

### Community 55 - "notification-actions.tsx"
Cohesion: 0.16
Nodes (19): notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow(), NotificationRowData, IconComponent, Tab(), TabList() (+11 more)

### Community 56 - "react"
Cohesion: 0.06
Nodes (71): react, fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props (+63 more)

### Community 57 - "button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (61): SaleSplit, client, row(), SawtResult, form2550Q, payslipCsv(), payslipSchedule(), agentBackground() (+53 more)

### Community 59 - "steps.ts"
Cohesion: 0.04
Nodes (128): addStepFile(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction() (+120 more)

### Community 60 - "portal/page.tsx"
Cohesion: 0.09
Nodes (39): BooksChart(), compact, longMonth(), short(), shortMonth(), MonthComplete(), SentRow, StandingRow (+31 more)

### Community 61 - "engine.ts"
Cohesion: 0.17
Nodes (25): addMonths(), compareIso(), isWeekend(), lastDayOfMonth(), toIso(), ymd(), fiscalYearOf(), followsCalendarYear() (+17 more)

### Community 62 - "template.ts"
Cohesion: 0.06
Nodes (49): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, bandForSales(), JOB_GROUPS (+41 more)

### Community 63 - "lock-bar.tsx"
Cohesion: 0.13
Nodes (26): ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months(), one() (+18 more)

### Community 64 - "money.ts"
Cohesion: 0.10
Nodes (33): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell(), datDate() (+25 more)

### Community 65 - "LinkButton"
Cohesion: 0.33
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), LeadsPage(), Portal2316(), Portal2316Page(), Form2316Sheet() (+3 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "generate.ts"
Cohesion: 0.12
Nodes (26): Rule, IsoDate, DeadlineRule, DueRule, EfpsGroup, FilingChannel, FilingInstance, Frequency (+18 more)

### Community 68 - "testing.ts"
Cohesion: 0.13
Nodes (25): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+17 more)

### Community 69 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 70 - "year-end/page.tsx"
Cohesion: 0.06
Nodes (58): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+50 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.09
Nodes (61): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+53 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.08
Nodes (50): EmployeeDetail(), EmployeePage(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+42 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "income.ts"
Cohesion: 0.08
Nodes (78): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+70 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (37): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+29 more)

### Community 77 - "blocks.tsx"
Cohesion: 0.05
Nodes (95): GlobalNotFound(), metadata, metadata, QuotesClosed(), Start(), StartPage(), AboutPage(), HOW (+87 more)

### Community 78 - "leads/page.tsx"
Cohesion: 0.36
Nodes (7): day(), Leads(), Row, ViewLink(), LEAD_STAGE_ORDER, LEAD_STAGES, LeadStage

### Community 79 - "vitest"
Cohesion: 0.03
Nodes (27): pg, vitest, quiet, root, root, root, root, HASH (+19 more)

### Community 80 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.11
Nodes (40): robots(), HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure() (+32 more)

### Community 82 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (39): NotesCard(), ClientNoteForm(), setFunnelOpenAction(), BookingLink(), CopyLink(), DiscoveryCallForm(), FunnelSwitch(), JobRow() (+31 more)

### Community 83 - "cx.ts"
Cohesion: 0.03
Nodes (93): @remixicon/react, AvatarColor, AvatarProps, AvatarSize, styles, CounterColor, CounterProps, styles (+85 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 86 - "Notice"
Cohesion: 0.05
Nodes (120): BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), EntryForm() (+112 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.11
Nodes (54): PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote() (+46 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "register/page.tsx"
Cohesion: 0.10
Nodes (39): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+31 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (29): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, ComboBoxItem(), SelectItem() (+21 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (53): GridRow, AlphalistRow, buildAlphalist(), AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear() (+45 more)

### Community 94 - "PageHeader"
Cohesion: 0.07
Nodes (61): ClientList(), ClientsPage(), Row, CELL, FirmParallelRunPage(), monthShort(), Summary(), FilingsTabs() (+53 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "cwt-2307-tracker.test.ts"
Cohesion: 0.47
Nodes (4): approve(), as(), root, send2307()

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "manilaToday"
Cohesion: 0.11
Nodes (36): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+28 more)

### Community 100 - "ledger/types.ts"
Cohesion: 0.05
Nodes (64): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+56 more)

### Community 101 - "ledger/data.ts"
Cohesion: 0.16
Nodes (16): Access, STATUS, Row, Asset, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput (+8 more)

### Community 102 - "cx"
Cohesion: 0.04
Nodes (83): react-aria-components, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, animateTag(), ComboBox() (+75 more)

### Community 103 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "addDays"
Cohesion: 0.12
Nodes (30): DashboardStats(), FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary() (+22 more)

### Community 106 - "standing-forms.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 107 - "ledger/data.ts"
Cohesion: 0.07
Nodes (58): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+50 more)

### Community 108 - "cycle/page.tsx"
Cohesion: 0.14
Nodes (22): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), CloseCycleButton(), Message() (+14 more)

### Community 109 - "client"
Cohesion: 0.07
Nodes (17): as(), client(), root, send(), as(), purchase(), root, doc() (+9 more)

### Community 110 - "index.ts"
Cohesion: 0.03
Nodes (51): dir, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY (+43 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "profile.ts"
Cohesion: 0.06
Nodes (43): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, BRAND_FILES, BrandFileKind, birSchema, blank() (+35 more)

### Community 114 - "marketing/page.tsx"
Cohesion: 0.05
Nodes (67): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+59 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.12
Nodes (37): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), VoidDepositForm(), WaiveDueForm(), Client (+29 more)

### Community 116 - "calendar/staff.ts"
Cohesion: 0.11
Nodes (37): disconnectCalendarAction(), GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches() (+29 more)

### Community 118 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 119 - "quote/page.tsx"
Cohesion: 0.12
Nodes (29): dateFmt, loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase (+21 more)

### Community 120 - "returns/load.ts"
Cohesion: 0.08
Nodes (46): DatFiles, datFiles(), Db, isDatKind(), MailAttachment, NonDeductibleRow, withNonDeductible(), dayBefore() (+38 more)

### Community 121 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (36): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+28 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.08
Nodes (44): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), Batch(), BatchPage(), one() (+36 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "statement.ts"
Cohesion: 0.10
Nodes (35): Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), decideMissing2307Action(), DecisionState, Decision() (+27 more)

### Community 127 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (44): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+36 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (72): RFC-4180, PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+64 more)

### Community 129 - "social-button.tsx"
Cohesion: 0.09
Nodes (29): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+21 more)

### Community 130 - "mime.ts"
Cohesion: 0.10
Nodes (46): RFC-2047, RFC-2822, GET(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send() (+38 more)

### Community 132 - "board.ts"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 133 - "ocr/run.ts"
Cohesion: 0.06
Nodes (45): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, pdfPageCount(), planRead() (+37 more)

### Community 134 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (26): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+18 more)

### Community 135 - "LinkButton"
Cohesion: 0.23
Nodes (17): booksContext(), BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff() (+9 more)

### Community 136 - "app/settings/page.tsx"
Cohesion: 0.09
Nodes (45): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+37 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "@remixicon/react"
Cohesion: 0.09
Nodes (38): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+30 more)

### Community 139 - "review-form.tsx"
Cohesion: 0.10
Nodes (30): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Codes (+22 more)

### Community 140 - "move-bar.tsx"
Cohesion: 0.32
Nodes (13): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+5 more)

### Community 142 - "transactions-actions.ts"
Cohesion: 0.10
Nodes (42): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+34 more)

### Community 143 - "safeguards.ts"
Cohesion: 0.09
Nodes (34): CoverageClient, coverageGaps(), Gap, GapKind, board, MARCO, none, RHEA (+26 more)

### Community 145 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 146 - "server-only"
Cohesion: 0.13
Nodes (35): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), cancelDiscoveryCall(), CancelResult (+27 more)

### Community 147 - "Centavos"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 148 - "queries.ts"
Cohesion: 0.20
Nodes (13): GET(), isNotificationKind(), BELL_LIMIT, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications(), loadBellData() (+5 more)

### Community 150 - "notifications-view.tsx"
Cohesion: 0.25
Nodes (12): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), Empty(), NotificationsView(), one(), SearchParams (+4 more)

### Community 151 - "layout.ts"
Cohesion: 0.13
Nodes (23): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+15 more)

### Community 152 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 154 - "notification-bell.tsx"
Cohesion: 0.22
Nodes (18): Bell(), markReadLocally(), BellPanel(), BellRow(), BellVariant, DotBadge(), NotificationBell(), base() (+10 more)

### Community 155 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (39): ApprovedReview(), ApprovedRow, ClientSelect(), PeriodFilter(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList() (+31 more)

### Community 156 - "clients/[id]/page.tsx"
Cohesion: 0.06
Nodes (70): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction() (+62 more)

### Community 157 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (53): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+45 more)

### Community 158 - "leads/[id]/page.tsx"
Cohesion: 0.13
Nodes (30): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction() (+22 more)

### Community 159 - "remittances/[id]/page.tsx"
Cohesion: 0.13
Nodes (35): EmployerCard(), GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances() (+27 more)

### Community 160 - "app/requests/[id]/page.tsx"
Cohesion: 0.11
Nodes (44): RequestDetail(), RequestPage(), PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row, when() (+36 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "calendar/page.tsx"
Cohesion: 0.23
Nodes (18): FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaInstant() (+10 more)

### Community 165 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 172 - "next-actions.ts"
Cohesion: 0.18
Nodes (17): addDays(), parseIso(), standingLine(), lastMonth(), loadMyWork(), MyWork, plural(), ym() (+9 more)

### Community 173 - "db.test.ts"
Cohesion: 0.09
Nodes (9): outDir, pkgDir, require, { version }, root, LEAD, LinkRow, ReportRow (+1 more)

### Community 174 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "cancel.ts"
Cohesion: 0.36
Nodes (7): calendarNote(), CalendarOutcome, cancelledMessage(), leadCancellationEmail(), manilaWhen(), MAX_CANCEL_REASON, when

### Community 179 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 180 - "staff/page.tsx"
Cohesion: 0.25
Nodes (13): addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), BranchOption, BranchOptions(), InviteStaffForm() (+5 more)

### Community 181 - "documents/[id]/page.tsx"
Cohesion: 0.15
Nodes (27): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+19 more)

### Community 183 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 184 - "public.ts"
Cohesion: 0.11
Nodes (25): ProposalSetup, JobOption, Quote, conditionsSchema, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num() (+17 more)

### Community 185 - "toCentavos"
Cohesion: 0.09
Nodes (39): postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db, LOANS, p(), PayrollRuns() (+31 more)

### Community 188 - "review-forms.tsx"
Cohesion: 0.23
Nodes (13): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), Msg() (+5 more)

### Community 191 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 195 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 201 - "proposal-view.tsx"
Cohesion: 0.27
Nodes (11): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+3 more)

### Community 203 - "package.json"
Cohesion: 0.18
Nodes (10): @internationalized/date@^3.12.4, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, name, packageManager, private, version, @internationalized/date (+2 more)

### Community 209 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (71): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, amt() (+63 more)

### Community 211 - "fields.ts"
Cohesion: 0.07
Nodes (43): Booking, DirectoryParty, ENTRY_STATUS, fmtDay(), fmtMonthOf(), ONLY_FOR, typeLabel, BatchRow (+35 more)

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

## Knowledge Gaps
- **21 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1616 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `ui.ts`, `public.ts`, `devDependencies`, `quote.ts`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `settings/actions.ts`, `morning.ts`, `slots.ts`, `fees/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `react`, `returns/types.ts`, `steps.ts`, `portal/page.tsx`, `engine.ts`, `template.ts`, `lock-bar.tsx`, `money.ts`, `generate.ts`, `testing.ts`, `filed-returns.ts`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `income.ts`, `blocks.tsx`, `how-we-work/page.tsx`, `leads/[id]/page.tsx`, `split-bundled-pdfs.test.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `payroll/payroll.test.ts`, `PageHeader`, `cwt-2307-tracker.test.ts`, `ledger/types.ts`, `ledger/data.ts`, `rates.ts`, `addDays`, `ledger/data.ts`, `cycle/page.tsx`, `client`, `index.ts`, `profile.ts`, `telegram-uploads.test.ts`, `marketing/page.tsx`, `collections/forms.tsx`, `calendar/staff.ts`, `tests/books.test.ts`, `returns/load.ts`, `theme-toggle.tsx`, `batch/register.ts`, `parties/[id]/page.tsx`, `read.test.ts`, `social-button.tsx`, `mime.ts`, `board.ts`, `ocr/run.ts`, `fixed-assets/page.tsx`, `app/settings/page.tsx`, `ticked-allocation.test.ts`, `@remixicon/react`, `review-form.tsx`, `move-bar.tsx`, `safeguards.ts`, `notifications/format.ts`, `server-only`, `Centavos`, `layout.ts`, `ledger.test.ts`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `leads/[id]/page.tsx`, `remittances/[id]/page.tsx`, `app/requests/[id]/page.tsx`, `calendar/page.tsx`, `db.test.ts`, `tests/proposal-email.test.ts`, `acting-approver.test.ts`, `cancel.ts`, `month.ts`, `contribution-remittances.test.ts`, `public.ts`, `toCentavos`, `names.ts`, `package.json`, `workpapers/page.tsx`, `fields.ts`, `returns-sign-off.test.ts`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0819252432155658 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `draft.ts`, `ui.ts`, `public.ts`, `[month]/page.tsx`, `dependencies`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `documents/labels.ts`, `payroll/forms.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `webhook.ts`, `module-pages.tsx`, `notification-actions.tsx`, `react`, `button.tsx`, `steps.ts`, `portal/page.tsx`, `lock-bar.tsx`, `LinkButton`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `blocks.tsx`, `leads/page.tsx`, `how-we-work/page.tsx`, `leads/[id]/page.tsx`, `cx.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `PageHeader`, `manilaToday`, `ledger/types.ts`, `ledger/data.ts`, `addDays`, `standing-forms.tsx`, `ledger/data.ts`, `cycle/page.tsx`, `profile.ts`, `marketing/page.tsx`, `collections/forms.tsx`, `calendar/staff.ts`, `quote/page.tsx`, `theme-toggle.tsx`, `batch/register.ts`, `statement.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `board.ts`, `fixed-assets/page.tsx`, `LinkButton`, `app/settings/page.tsx`, `@remixicon/react`, `review-form.tsx`, `move-bar.tsx`, `transactions-actions.ts`, `server-only`, `queries.ts`, `notifications-view.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `leads/[id]/page.tsx`, `remittances/[id]/page.tsx`, `app/requests/[id]/page.tsx`, `calendar/page.tsx`, `opengraph-image.tsx`, `staff/page.tsx`, `documents/[id]/page.tsx`, `toCentavos`, `review-forms.tsx`, `package.json`, `workpapers/page.tsx`, `fields.ts`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **Should `draft.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14153846153846153 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `[month]/page.tsx`, `dependencies`, `statements.ts`, `modal.tsx`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `notification-settings-view.tsx`, `documents/labels.ts`, `payroll/forms.tsx`, `slots.ts`, `fees/[id]/page.tsx`, `supabaseServer`, `module-pages.tsx`, `notification-actions.tsx`, `button.tsx`, `steps.ts`, `portal/page.tsx`, `template.ts`, `lock-bar.tsx`, `LinkButton`, `year-end/page.tsx`, `books/forms.tsx`, `payroll/data.ts`, `stat-cards.tsx`, `blocks.tsx`, `leads/page.tsx`, `how-we-work/page.tsx`, `leads/[id]/page.tsx`, `cx.ts`, `Notice`, `portal/reports/page.tsx`, `register/page.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `PageHeader`, `manilaToday`, `ledger/types.ts`, `cx`, `addDays`, `standing-forms.tsx`, `ledger/data.ts`, `cycle/page.tsx`, `marketing/page.tsx`, `collections/forms.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `batch/register.ts`, `statement.ts`, `parties/[id]/page.tsx`, `social-button.tsx`, `mime.ts`, `board.ts`, `fixed-assets/page.tsx`, `LinkButton`, `app/settings/page.tsx`, `@remixicon/react`, `review-form.tsx`, `move-bar.tsx`, `transactions-actions.ts`, `queries.ts`, `notifications-view.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `clients/[id]/page.tsx`, `filings/[id]/page.tsx`, `leads/[id]/page.tsx`, `remittances/[id]/page.tsx`, `app/requests/[id]/page.tsx`, `calendar/page.tsx`, `bell-store.ts`, `staff/page.tsx`, `documents/[id]/page.tsx`, `toCentavos`, `review-forms.tsx`, `package.json`, `workpapers/page.tsx`, `fields.ts`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._