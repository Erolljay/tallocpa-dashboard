# Graph Report - agent-a1b102c330a388119  (2026-11-25)

## Corpus Check
- 696 files · ~551,322 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 6, (none) 5, .mdc 1)

## Summary
- 4414 nodes · 15181 edges · 180 communities (159 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 124 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `e9e7026c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [token]/page.tsx
- engine.ts
- migrate.yml
- notification.tsx
- arap.ts
- devDependencies
- bulk-actions.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- steps.ts
- Sign-in & Setup Docs
- onboarding/page.tsx
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
- documents/[id]/page.tsx
- scores/page.tsx
- percentage.ts
- employees-xlsx.ts
- read.test.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- tieouts.ts
- deadlines/page.tsx
- registrations/forms.tsx
- next
- income.ts
- returns/types.ts
- react
- form-1601eq.ts
- Notice
- app/settings/page.tsx
- quote/page.tsx
- ui.tsx
- workpapers/page.tsx
- cx
- select.tsx
- Apple Design
- payroll/payroll.test.ts
- testing.ts
- quote.ts
- review-queue.ts
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- getIdentity
- theme-toggle.tsx
- returns/books.test.ts
- parts.ts
- clients/[id]/page.tsx
- sign-off.ts
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- statements/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- dates.ts
- opening.ts
- Recipes
- Centavos
- BoardUI theming reference
- Pro templates
- social-button.tsx
- print/page.tsx
- leads/[id]/page.tsx
- ref_node_fs
- register/page.tsx
- boardui
- rates.ts
- approval-memo.tsx
- parties/[id]/page.tsx
- gmail.ts
- fields.ts
- sidebar-toggle.tsx
- Opening balances: checklist for any cut-off
- fixed-assets/page.tsx
- registration/page.tsx
- acting-approver.test.ts
- ledger/data.ts
- mime.ts
- apply-migrations.sh
- workpapers/load.ts
- registrations/actions.ts
- return-file-actions.ts
- returns/load.ts
- Card
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- filings/[id]/page.tsx
- file-upload.tsx
- cycle/page.tsx
- buildSawt
- registration.test.ts
- server-only
- app/documents/page.tsx
- register-books.test.ts
- formatAmount
- work/load.ts
- manilaToday
- filters.tsx
- gemini.ts
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- settings/actions.ts
- proxy.ts
- safeguards-load.ts
- return-files.tsx
- xlsx.ts
- breadcrumb.tsx
- seed.ts
- package.json
- requireStaff
- month.ts
- filings/actions.ts
- safeguards.ts
- checkbox.tsx
- fees/forms.tsx
- review.ts
- clients/schema.ts
- supabaseServer
- returns-sign-off.test.ts
- templatePayload
- register-xlsx.ts
- Rework: one flow from lead to year-end
- books-migration.test.ts
- invoice-pages.tsx
- leads/actions.ts
- tests/books.test.ts
- BoardUI page patterns
- names.ts
- generate-qap-fixture.mjs
- db.test.ts
- eslint.config.mjs
- copy-opencv.mjs
- deadlines/actions.ts
- [id]/actions.ts
- ledger-lock.test.ts
- funnel.test.ts
- post-button.tsx
- fixed-assets.test.ts
- month-complete.test.ts
- returns-books.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 287 edges
2. `react` - 204 edges
3. `Skeleton()` - 202 edges
4. `Notice()` - 202 edges
5. `cx` - 200 edges
6. `Button()` - 184 edges
7. `next` - 162 edges
8. `Card()` - 157 edges
9. `Badge()` - 153 edges
10. `Input()` - 132 edges

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

## Communities (180 total, 21 thin omitted)

### Community 0 - "[token]/page.tsx"
Cohesion: 0.17
Nodes (17): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+9 more)

### Community 1 - "engine.ts"
Cohesion: 0.11
Nodes (38): Rule, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup, FilingChannel (+30 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.10
Nodes (21): CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET, GLYPH_SIZE, STROKE_WIDTH, styles, IconComponent (+13 more)

### Community 4 - "arap.ts"
Cohesion: 0.15
Nodes (20): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+12 more)

### Community 5 - "devDependencies"
Cohesion: 0.13
Nodes (15): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, typescript@^5 (+7 more)

### Community 6 - "bulk-actions.ts"
Cohesion: 0.12
Nodes (21): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), BatchRow, DocumentCodes (+13 more)

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

### Community 11 - "steps.ts"
Cohesion: 0.13
Nodes (23): Agency, birForm(), BranchOptions, CaseStep, ClosureOptions, dayNumber(), daysBetween(), daysOpen() (+15 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.11
Nodes (32): ClientTabs(), StatusButton(), addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload() (+24 more)

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
Cohesion: 0.09
Nodes (40): CASH_FLOW_CLASSES, CashFlowClass, defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine() (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (42): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow (+34 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "documents/[id]/page.tsx"
Cohesion: 0.09
Nodes (40): GET(), safe(), BOOKED_TYPES, PayrollDocument(), PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview() (+32 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (56): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+48 more)

### Community 42 - "percentage.ts"
Cohesion: 0.19
Nodes (28): balanceSheet(), compute1701(), compute1702RT(), empty(), penalties(), quarterlyPayments(), compute1701Q(), compute1702Q() (+20 more)

### Community 43 - "employees-xlsx.ts"
Cohesion: 0.17
Nodes (14): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+6 more)

### Community 44 - "read.test.ts"
Cohesion: 0.04
Nodes (89): RFC-4180, applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), ocrProviderFromEnv() (+81 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (16): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+8 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (79): @supabase/supabase-js, checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState (+71 more)

### Community 47 - "modal.tsx"
Cohesion: 0.11
Nodes (33): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+25 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (67): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+59 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (47): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+39 more)

### Community 51 - "tieouts.ts"
Cohesion: 0.13
Nodes (16): RegisterLine, PeriodFile, AssetTotals, LedgerTotals, PayrollTotals, purchases(), sales(), base (+8 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 53 - "registrations/forms.tsx"
Cohesion: 0.13
Nodes (24): completeRegistrationAction(), FormState, caseNote, caseTitle, Check(), CompleteButton(), statusTone, StepBadge() (+16 more)

### Community 54 - "next"
Cohesion: 0.11
Nodes (28): nextConfig, next, RequestDetail(), RequestPage(), Row, PortalClient, portalContext(), Home() (+20 more)

### Community 55 - "income.ts"
Cohesion: 0.11
Nodes (42): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), deductionSchedule(), inputs1701(), inputs1702RT() (+34 more)

### Community 56 - "returns/types.ts"
Cohesion: 0.11
Nodes (32): FinancialStatements, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), csvCell() (+24 more)

### Community 57 - "react"
Cohesion: 0.10
Nodes (44): react, Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS (+36 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.08
Nodes (46): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), ewtLines() (+38 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (73): setupMissingChartsAction(), ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker() (+65 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.17
Nodes (20): appliesTo(), fmtDate(), kindLabel, PaymentSettings(), periodNote, AddPaymentAccountForm(), ChannelFields(), ChannelValues (+12 more)

### Community 61 - "quote/page.tsx"
Cohesion: 0.08
Nodes (59): zod@^4.6.7, zod, activateAction(), createFromTemplateAction(), deleteDraftAction(), newDraftSchema, refresh(), savePricesAction() (+51 more)

### Community 62 - "ui.tsx"
Cohesion: 0.14
Nodes (18): PayrollIntake(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel, ReplyForm(), buttonClass(), ButtonStyle (+10 more)

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (23): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+15 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (39): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+31 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (36): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (34): MonthGrid(), toInput(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions(), enteredNet() (+26 more)

### Community 68 - "testing.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "quote.ts"
Cohesion: 0.05
Nodes (66): ClientValues, PriceRow, EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+58 more)

### Community 70 - "review-queue.ts"
Cohesion: 0.31
Nodes (5): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue()

### Community 71 - "books/forms.tsx"
Cohesion: 0.19
Nodes (35): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+27 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.08
Nodes (46): BankAccountsRoute(), booksContext(), BooksContext, fmtMonth(), one(), SearchParams, BooksFrame(), BooksList() (+38 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.14
Nodes (20): Access, STATUS, Row, Asset, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut (+12 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "getIdentity"
Cohesion: 0.12
Nodes (30): CloseRequestButton(), ReplyForm(), send(), METHODS, ProofUpload(), send(), getIdentity(), amount (+22 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "returns/books.test.ts"
Cohesion: 0.11
Nodes (13): client, form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q (+5 more)

### Community 80 - "parts.ts"
Cohesion: 0.12
Nodes (21): ACCOUNTS, birLabel(), bookkeepingPart(), c(), cr(), dr(), EntryLine, KIND_LABELS (+13 more)

### Community 81 - "clients/[id]/page.tsx"
Cohesion: 0.18
Nodes (18): FormState, removeAssignmentAction(), frequencyLabel, Props, StaffOptions(), AssignForm(), RemoveAssignmentButton(), RemoveClientUserButton() (+10 more)

### Community 82 - "sign-off.ts"
Cohesion: 0.18
Nodes (12): availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner, preparer (+4 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.07
Nodes (24): ClientTab, UNDER, CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter() (+16 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (20): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+12 more)

### Community 87 - "statements/page.tsx"
Cohesion: 0.15
Nodes (20): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+12 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.12
Nodes (23): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+15 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.12
Nodes (30): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+22 more)

### Community 93 - "dates.ts"
Cohesion: 0.39
Nodes (9): shift(), addMonths(), isWeekend(), parseIso(), toIso(), ymd(), monthChoices(), nextCutoff() (+1 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "Centavos"
Cohesion: 0.07
Nodes (62): GridRow, AlphaCols, AlphalistRow, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer (+54 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.07
Nodes (50): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+42 more)

### Community 101 - "leads/[id]/page.tsx"
Cohesion: 0.08
Nodes (37): NoteState, NotesCard(), ClientNoteForm(), LeadState, ConvertForm(), DiscoveryCallForm(), LostForm(), Person (+29 more)

### Community 102 - "ref_node_fs"
Cohesion: 0.11
Nodes (5): ctx, input, root, root, root

### Community 103 - "register/page.tsx"
Cohesion: 0.27
Nodes (17): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+9 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 106 - "approval-memo.tsx"
Cohesion: 0.18
Nodes (13): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, approvalMemo(), Memo, MemoInput (+5 more)

### Community 107 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (50): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+42 more)

### Community 108 - "gmail.ts"
Cohesion: 0.22
Nodes (16): accessToken(), call(), headerOf(), MailMessage, MailPart, partsOf(), readAttachment(), readThread() (+8 more)

### Community 109 - "fields.ts"
Cohesion: 0.18
Nodes (15): ok, FieldKey, keys, normalizeAmount(), normalizeFields(), normalizePartyKind(), normalizeTerms(), normalizeTin() (+7 more)

### Community 110 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/page.tsx"
Cohesion: 0.15
Nodes (24): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm() (+16 more)

### Community 113 - "registration/page.tsx"
Cohesion: 0.21
Nodes (14): ClientCaseKind, clientCase, NewRegistrationPage(), OwnerOnly(), CaseRow, clientStatus, fmt(), PortalRegistration() (+6 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "ledger/data.ts"
Cohesion: 0.09
Nodes (36): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), ReverseForm(), OpeningChecklist(), AMENDMENT_BADGE (+28 more)

### Community 116 - "mime.ts"
Cohesion: 0.23
Nodes (13): RFC-2047, RFC-2822, DatFiles, datFiles(), Db, b64(), buildMime(), classifyReply() (+5 more)

### Community 118 - "workpapers/load.ts"
Cohesion: 0.23
Nodes (14): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, Adjustment (+6 more)

### Community 119 - "registrations/actions.ts"
Cohesion: 0.22
Nodes (13): dtiRegisteredOn(), fieldErrors(), openRegistrationAction(), openYearRenewalsAction(), updateStepAction(), branchSchema, checkbox, closureSchema (+5 more)

### Community 120 - "return-file-actions.ts"
Cohesion: 0.25
Nodes (11): GET(), checkEsubmissionReplyAction(), ReturnFileState, sendEsubmissionAction(), TYPES, EsubmissionMailEnv, esubmissionMailEnv(), supabaseEnv() (+3 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.07
Nodes (48): row(), withNonDeductible(), SawtResult, Split, VatData, EwtLine, dayBefore(), FilingRow (+40 more)

### Community 122 - "Card"
Cohesion: 0.09
Nodes (45): @remixicon/react, ClientList(), ClientsPage(), Client, CollectionsPage(), OpenDue, Overview(), RunBilling() (+37 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.16
Nodes (16): BatchCheck, BatchColumn, BatchContext, centavosOf(), checkBatch(), checkRow(), findAccount(), isoDate() (+8 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "filings/[id]/page.tsx"
Cohesion: 0.08
Nodes (54): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+46 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (28): Cycle(), CyclePage(), CycleWithClient, DocRow, MonthComplete(), SentRow, TimelineRow, CloseCycleButton() (+20 more)

### Community 128 - "buildSawt"
Cohesion: 0.23
Nodes (13): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+5 more)

### Community 129 - "registration.test.ts"
Cohesion: 0.24
Nodes (9): openClientCaseAction(), ChecklistPreview(), ClientCaseForm(), branchStepsFor(), closureStepsFor(), registersWithSec(), renewalStepsFor(), updateStepsFor() (+1 more)

### Community 130 - "server-only"
Cohesion: 0.18
Nodes (15): server-only, GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+7 more)

### Community 131 - "app/documents/page.tsx"
Cohesion: 0.06
Nodes (57): Doc, DocumentsCard(), when(), ExceptionRow, loadBooking(), Review(), ApprovedTable(), BOOKED_TYPES (+49 more)

### Community 132 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 133 - "formatAmount"
Cohesion: 0.07
Nodes (54): blankLine(), InvoiceForm(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Booking, BookingFields() (+46 more)

### Community 134 - "work/load.ts"
Cohesion: 0.19
Nodes (15): loadAssets(), lastMonth(), loadMyWork(), MyWork, plural(), ym(), byUrgency(), filingItem() (+7 more)

### Community 135 - "manilaToday"
Cohesion: 0.11
Nodes (32): Detail(), StatementPage(), Detail(), PortalStatementDetail(), Billing(), PortalBilling(), statementHref(), Payroll() (+24 more)

### Community 136 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 137 - "gemini.ts"
Cohesion: 0.10
Nodes (20): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+12 more)

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.06
Nodes (14): pg, vitest, root, root, HASH, LEAD, root, root (+6 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.21
Nodes (14): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), RemoveHolidayButton() (+6 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "safeguards-load.ts"
Cohesion: 0.13
Nodes (26): GET(), obligationChanges(), obligationsForTaxTypes(), PlannedObligation, TaxType, TaxTypeError, forms(), CoverageClient (+18 more)

### Community 144 - "return-files.tsx"
Cohesion: 0.33
Nodes (11): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), markEsubmissionSentAction(), recordEsubmissionErrorsAction() (+3 more)

### Community 145 - "xlsx.ts"
Cohesion: 0.14
Nodes (22): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+14 more)

### Community 146 - "breadcrumb.tsx"
Cohesion: 0.20
Nodes (8): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronDownSmall(), ChevronRightSmall(), IconProps

### Community 147 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

### Community 148 - "package.json"
Cohesion: 0.18
Nodes (10): tailwind-merge@^3.7.1, tsx@^4.23.15, @types/react-dom@^19, name, packageManager, private, version, tailwind-merge (+2 more)

### Community 149 - "requireStaff"
Cohesion: 0.10
Nodes (32): addClientNoteAction(), FilingTable(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET(), Lines(), lineStyle, Problems() (+24 more)

### Community 150 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 151 - "filings/actions.ts"
Cohesion: 0.42
Nodes (9): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+1 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.13
Nodes (23): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+15 more)

### Community 153 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 154 - "fees/forms.tsx"
Cohesion: 0.26
Nodes (11): FeeFormState, ActivateForm(), billingHint, CreateFromTemplateForm(), DeleteDraftButton(), NewDraftForm(), PricesForm(), Result() (+3 more)

### Community 155 - "review.ts"
Cohesion: 0.36
Nodes (6): ALWAYS, MonthActivity, refsToSign(), reviewGaps(), SIGNED_REFS, quiet

### Community 156 - "clients/schema.ts"
Cohesion: 0.16
Nodes (10): TAX_TYPES, TAXPAYER_TYPES, assignmentSchema, clientFields, editClientSchema, efpsGroupError, engagementSchema, NewClient (+2 more)

### Community 157 - "supabaseServer"
Cohesion: 0.06
Nodes (66): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setIncomeTaxMethodAction(), updateClientAction(), EditClient() (+58 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 159 - "templatePayload"
Cohesion: 0.13
Nodes (9): templatePayload(), as(), client(), root, root, root, as(), books() (+1 more)

### Community 160 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (28): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), GET(), checkRegister(), fmt(), ID_HEADERS (+20 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 162 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 163 - "invoice-pages.tsx"
Cohesion: 0.08
Nodes (34): InvoiceFormValue, INVOICE_KINDS, InvoiceEdit(), InvoiceList(), Kind, Props, STATUS_TONE, PurchaseInvoicesEditPage() (+26 more)

### Community 164 - "leads/actions.ts"
Cohesion: 0.18
Nodes (21): FirmPage(), PLACES, Places(), REVIEWER_PLACES, assignReviewerAction(), convertLeadAction(), markLostAction(), recordCallAction() (+13 more)

### Community 165 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 166 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 167 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 168 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 170 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 171 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 172 - "deadlines/actions.ts"
Cohesion: 0.60
Nodes (4): generateFilingsNow(), GenerateState, GenerateButton(), runFilingGeneration()

### Community 173 - "[id]/actions.ts"
Cohesion: 0.53
Nodes (5): approveDocumentAction(), postDocumentToBooks(), unpostDocumentFromBooks(), streamOf(), OCR_FIELDS

### Community 175 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 176 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 177 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

## Knowledge Gaps
- **21 isolated node(s):** `RFC-4180`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1221 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `[token]/page.tsx`, `server-only`, `app/documents/page.tsx`, `formatAmount`, `bulk-actions.ts`, `manilaToday`, `sign-off-actions.tsx`, `onboarding/page.tsx`, `settings/actions.ts`, `safeguards-load.ts`, `dependencies`, `xlsx.ts`, `return-files.tsx`, `breadcrumb.tsx`, `package.json`, `requireStaff`, `proxy.ts`, `filings/actions.ts`, `supabaseServer`, `register-xlsx.ts`, `invoice-pages.tsx`, `leads/actions.ts`, `documents/[id]/page.tsx`, `scores/page.tsx`, `deadlines/actions.ts`, `[id]/actions.ts`, `payroll/forms.tsx`, `read.test.ts`, `lib/books/actions.ts`, `post-button.tsx`, `profile.ts`, `deadlines/page.tsx`, `registrations/forms.tsx`, `react`, `Notice`, `app/settings/page.tsx`, `quote/page.tsx`, `ui.tsx`, `workpapers/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `getIdentity`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `cx.ts`, `[clientId]/page.tsx`, `statements/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `register/page.tsx`, `approval-memo.tsx`, `parties/[id]/page.tsx`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `registration/page.tsx`, `ledger/data.ts`, `workpapers/load.ts`, `registrations/actions.ts`, `return-file-actions.ts`, `Card`, `filings/[id]/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `RFC-4180`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10909090909090909 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `[token]/page.tsx`, `app/documents/page.tsx`, `notification.tsx`, `formatAmount`, `manilaToday`, `filters.tsx`, `sign-off-actions.tsx`, `onboarding/page.tsx`, `dependencies`, `return-files.tsx`, `breadcrumb.tsx`, `statements.ts`, `package.json`, `requireStaff`, `checkbox.tsx`, `fees/forms.tsx`, `supabaseServer`, `invoice-pages.tsx`, `leads/actions.ts`, `documents/[id]/page.tsx`, `scores/page.tsx`, `deadlines/actions.ts`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `post-button.tsx`, `deadlines/page.tsx`, `registrations/forms.tsx`, `next`, `Notice`, `app/settings/page.tsx`, `quote/page.tsx`, `ui.tsx`, `workpapers/page.tsx`, `cx`, `select.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `getIdentity`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `statements/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `register/page.tsx`, `parties/[id]/page.tsx`, `sidebar-toggle.tsx`, `fixed-assets/page.tsx`, `registration/page.tsx`, `ledger/data.ts`, `workpapers/load.ts`, `Card`, `filings/[id]/page.tsx`, `file-upload.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.122) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `engine.ts`, `arap.ts`, `devDependencies`, `bulk-actions.ts`, `steps.ts`, `onboarding/page.tsx`, `statements.ts`, `scores/page.tsx`, `read.test.ts`, `index.ts`, `payroll/forms.tsx`, `lib/books/actions.ts`, `profile.ts`, `tieouts.ts`, `deadlines/page.tsx`, `next`, `form-1601eq.ts`, `app/settings/page.tsx`, `quote/page.tsx`, `payroll/payroll.test.ts`, `testing.ts`, `quote.ts`, `review-queue.ts`, `opening-checklist.tsx`, `returns/books.test.ts`, `parts.ts`, `sign-off.ts`, `portal-billing.test.ts`, `document-scanner.tsx`, `dates.ts`, `opening.ts`, `Centavos`, `social-button.tsx`, `print/page.tsx`, `leads/[id]/page.tsx`, `ref_node_fs`, `rates.ts`, `approval-memo.tsx`, `parties/[id]/page.tsx`, `fields.ts`, `fixed-assets/page.tsx`, `acting-approver.test.ts`, `ledger/data.ts`, `mime.ts`, `returns/load.ts`, `batch/register.ts`, `filings/[id]/page.tsx`, `cycle/page.tsx`, `registration.test.ts`, `server-only`, `app/documents/page.tsx`, `register-books.test.ts`, `formatAmount`, `work/load.ts`, `filters.tsx`, `gemini.ts`, `ledger.test.ts`, `settings/actions.ts`, `safeguards-load.ts`, `package.json`, `month.ts`, `safeguards.ts`, `review.ts`, `clients/schema.ts`, `supabaseServer`, `returns-sign-off.test.ts`, `templatePayload`, `books-migration.test.ts`, `invoice-pages.tsx`, `tests/books.test.ts`, `names.ts`, `db.test.ts`, `ledger-lock.test.ts`, `funnel.test.ts`, `fixed-assets.test.ts`, `month-complete.test.ts`, `returns-books.test.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Should `notification.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10276679841897234 - nodes in this community are weakly interconnected._