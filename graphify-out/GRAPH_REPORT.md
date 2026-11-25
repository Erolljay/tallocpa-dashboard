# Graph Report - agent-aa02c9eac9e20480b  (2026-11-25)

## Corpus Check
- 722 files · ~566,622 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 16 file(s) not represented in the graph (top: .css 7, (none) 5, .mdc 1)

## Summary
- 4486 nodes · 15513 edges · 165 communities (145 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 128 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `606ccad8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- notification.tsx
- books/export/route.ts
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- PageHeader
- Sign-in & Setup Docs
- onboarding/forms.tsx
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
- register-xlsx.ts
- scores/page.tsx
- income.ts
- payroll/types.ts
- review-form.tsx
- templatePayload
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- profile.ts
- workpapers/load.ts
- deadlines/page.tsx
- lock-bar.tsx
- sign-off.ts
- requireStaff
- Centavos
- Skeleton
- returns/types.ts
- Notice
- app/settings/page.tsx
- fees/[id]/page.tsx
- registrations/forms.tsx
- review-forms.tsx
- cx
- select.tsx
- Apple Design
- public.ts
- testing.ts
- server-only
- parties/[id]/page.tsx
- books/forms.tsx
- module-pages.tsx
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- proof-actions.ts
- theme-toggle.tsx
- quote.ts
- clients/[id]/page.tsx
- requireOwner
- ledger/data.ts
- button.tsx
- Pro components
- cx.ts
- safeguards-load.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- sidebar-toggle.tsx
- form-2316.tsx
- proposal-view.tsx
- opening.ts
- Recipes
- rows.ts
- BoardUI page patterns
- Pro templates
- social-button.tsx
- ledger/books.ts
- compute.ts
- [month]/page.tsx
- [clientId]/page.tsx
- boardui
- compute.ts
- fees/types.ts
- template.ts
- form-1601c.ts
- return-file-actions.ts
- Card
- Opening balances: checklist for any cut-off
- fixed-assets/forms.tsx
- portal/page.tsx
- acting-approver.test.ts
- tools/page.tsx
- ui.ts
- apply-migrations.sh
- tax-codes.ts
- invoice-pages.tsx
- Badge
- returns/load.ts
- filed-returns.ts
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- quote/page.tsx
- file-upload.tsx
- cycle/page.tsx
- BoardUI page patterns
- checkbox.tsx
- mime.ts
- proxy.ts
- staff/actions.ts
- eslint.config.mjs
- work/page.tsx
- branches/actions.ts
- app/documents/page.tsx
- ticked-allocation.test.ts
- sign-off-actions.tsx
- ledger.test.ts
- vitest
- settings/actions.ts
- leads-pipeline.test.ts
- tests/register.test.ts
- returns-books.test.ts
- generate-qap-fixture.mjs
- db.test.ts
- notes.ts
- collections/page.tsx
- safeguards.ts
- Card
- books-2307.test.ts
- filters.tsx
- funnel.test.ts
- supabaseServer
- returns-sign-off.test.ts
- payroll/payroll.test.ts
- Rework: one flow from lead to year-end
- portal-statements-approval.test.ts
- books-migration.test.ts
- index.ts
- portal/layout.tsx
- @remixicon/react
- clients/actions.ts
- seed.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 282 edges
2. `cx` - 217 edges
3. `Skeleton()` - 216 edges
4. `react` - 211 edges
5. `Notice()` - 207 edges
6. `Button()` - 183 edges
7. `next` - 170 edges
8. `Card()` - 159 edges
9. `Badge()` - 148 edges
10. `vitest` - 129 edges

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

## Communities (165 total, 20 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.08
Nodes (55): BooksContext, Certificates(), Staff2307Page(), load2307Staff(), print2307Href(), Portal2307(), Portal2307Page(), PortalPrint2307Page() (+47 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (46): shift(), Rule, PlannedObligation, addMonths(), compareIso(), IsoDate, lastDayOfMonth(), toIso() (+38 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.06
Nodes (44): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+36 more)

### Community 4 - "books/export/route.ts"
Cohesion: 0.10
Nodes (32): dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket(), AgingRow (+24 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "fields.ts"
Cohesion: 0.06
Nodes (40): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, normalizeAmount() (+32 more)

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

### Community 11 - "PageHeader"
Cohesion: 0.08
Nodes (55): StepBadge(), StepForm(), StepRow, caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+47 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/forms.tsx"
Cohesion: 0.26
Nodes (14): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+6 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0, server-only@^0.0.1 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (40): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), FinancialStatementsView(), StatementTable(), CashFlowClass (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.14
Nodes (47): costsOf(), salesOf(), compute(), inputsFor(), buildSawt(), incomePayment(), invoiceLabel(), sawtAttachments() (+39 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "register-xlsx.ts"
Cohesion: 0.16
Nodes (21): file(), GET(), safe(), yearWorksheet(), employeesForMonth(), PayrollClient, buildEmployeeTemplate(), sortItems() (+13 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.10
Nodes (36): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+28 more)

### Community 42 - "income.ts"
Cohesion: 0.09
Nodes (63): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), balanceSheet(), compute1701(), compute1702RT() (+55 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.10
Nodes (24): exceljs@4.4.0, exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET (+16 more)

### Community 44 - "review-form.tsx"
Cohesion: 0.07
Nodes (51): blankLine(), InvoiceForm(), InvoiceFormValue, ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED (+43 more)

### Community 45 - "templatePayload"
Cohesion: 0.09
Nodes (10): templatePayload(), as(), client(), root, as(), books(), root, root (+2 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (43): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+35 more)

### Community 47 - "modal.tsx"
Cohesion: 0.09
Nodes (39): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), AlertDialog() (+31 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.10
Nodes (39): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+31 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "profile.ts"
Cohesion: 0.06
Nodes (52): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+44 more)

### Community 51 - "workpapers/load.ts"
Cohesion: 0.12
Nodes (16): RegisterLine, LedgerTotals, purchases(), sales(), base, books, buy, sale (+8 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.14
Nodes (29): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+21 more)

### Community 53 - "lock-bar.tsx"
Cohesion: 0.14
Nodes (24): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, booksMonthStatus(), BOOKS_MONTH_STATUS_LABELS (+16 more)

### Community 54 - "sign-off.ts"
Cohesion: 0.11
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions(), FilingState (+9 more)

### Community 55 - "requireStaff"
Cohesion: 0.08
Nodes (51): setIncomeTaxMethodAction(), DashboardStats(), FilingTable(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs() (+43 more)

### Community 56 - "Centavos"
Cohesion: 0.07
Nodes (46): GridRow, Note, StatementLine, MonthLines, PriorAmounts, Suggestion, CheckedRegister, TemplateInput (+38 more)

### Community 57 - "Skeleton"
Cohesion: 0.06
Nodes (48): react, @remixicon/react, BankAccountsRoute(), CustomersRoute(), EmployeesRoute(), JournalEntryRoute(), PaymentsNewPage(), PaymentsListPage() (+40 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.06
Nodes (65): client, row(), VatData, agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, INPUTS (+57 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (77): setupMissingChartsAction(), ClientForm(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), ChangeBooksStartForm() (+69 more)

### Community 60 - "app/settings/page.tsx"
Cohesion: 0.11
Nodes (37): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+29 more)

### Community 61 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (24): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+16 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (56): FormState, frequencyLabel, Props, StaffOptions(), cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn() (+48 more)

### Community 63 - "review-forms.tsx"
Cohesion: 0.20
Nodes (15): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+7 more)

### Community 64 - "cx"
Cohesion: 0.05
Nodes (47): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+39 more)

### Community 65 - "select.tsx"
Cohesion: 0.10
Nodes (30): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+22 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "public.ts"
Cohesion: 0.11
Nodes (23): acceptProposalAction(), AcceptState, metadata, Start(), StartPage(), QuerySource, conditionsSchema, FEE_ITEM_COLUMNS (+15 more)

### Community 68 - "testing.ts"
Cohesion: 0.09
Nodes (32): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+24 more)

### Community 69 - "server-only"
Cohesion: 0.10
Nodes (28): server-only, @supabase/supabase-js, GET(), GET(), GET(), generateFilingsNow(), GenerateState, GenerateButton() (+20 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (53): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail() (+45 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.13
Nodes (44): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+36 more)

### Community 72 - "module-pages.tsx"
Cohesion: 0.13
Nodes (43): booksContext(), fmtDate(), fmtMonth(), one(), SearchParams, BooksFrame(), BooksList(), Column (+35 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.12
Nodes (27): Access, OpeningChecklist(), STATUS, loadAssets(), Row, accumulated(), Asset, bookFor() (+19 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.10
Nodes (27): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+19 more)

### Community 77 - "proof-actions.ts"
Cohesion: 0.25
Nodes (10): zod, amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text() (+2 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.12
Nodes (26): PriceRow, gapFor(), buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange() (+18 more)

### Community 80 - "clients/[id]/page.tsx"
Cohesion: 0.14
Nodes (23): ClientTab, ClientTabs(), UNDER, DocumentsCard(), when(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton() (+15 more)

### Community 81 - "requireOwner"
Cohesion: 0.33
Nodes (15): addChargeAction(), applyCreditAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), peso, recordDepositAction() (+7 more)

### Community 82 - "ledger/data.ts"
Cohesion: 0.11
Nodes (23): codes, PNL, COA_TEMPLATES, Amendment, AmendmentStatus, BooksClient, BooksMonth, ClientBooks (+15 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "safeguards-load.ts"
Cohesion: 0.18
Nodes (18): ClientValues, obligationChanges(), obligationsForTaxTypes(), TAX_TYPES, TaxType, TaxTypeError, forms(), CoverageClient (+10 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.11
Nodes (56): PortalClient, portalContext(), Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+48 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (27): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "sidebar-toggle.tsx"
Cohesion: 0.18
Nodes (12): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+4 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.13
Nodes (25): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+17 more)

### Community 93 - "proposal-view.tsx"
Cohesion: 0.21
Nodes (9): Lines(), longDate(), money(), php, ProposalView(), canonicalContent(), defaultTerms(), ProposalContent (+1 more)

### Community 94 - "opening.ts"
Cohesion: 0.16
Nodes (17): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+9 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "rows.ts"
Cohesion: 0.11
Nodes (29): Certificates2316, certificatesFromRaw(), Payroll2316Raw, loadEntries(), loadStored(), BirCategory, Category, CATEGORY_KEYS (+21 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.10
Nodes (27): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+19 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (46): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+38 more)

### Community 101 - "compute.ts"
Cohesion: 0.20
Nodes (19): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+11 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.22
Nodes (13): PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES, Db (+5 more)

### Community 103 - "[clientId]/page.tsx"
Cohesion: 0.17
Nodes (23): MoneyState, ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton() (+15 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "compute.ts"
Cohesion: 0.24
Nodes (17): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+9 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.13
Nodes (25): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, GapRow, has(), items (+17 more)

### Community 107 - "template.ts"
Cohesion: 0.12
Nodes (15): SERVICES, StartState, count(), first(), pick(), profileFromQuery(), items, Quote (+7 more)

### Community 108 - "form-1601c.ts"
Cohesion: 0.11
Nodes (32): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+24 more)

### Community 109 - "return-file-actions.ts"
Cohesion: 0.27
Nodes (16): ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+8 more)

### Community 110 - "Card"
Cohesion: 0.07
Nodes (58): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+50 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/forms.tsx"
Cohesion: 0.33
Nodes (9): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+1 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.08
Nodes (40): BooksChart(), compact, longMonth(), short(), shortMonth(), SentRow, cents(), initials() (+32 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "tools/page.tsx"
Cohesion: 0.17
Nodes (21): AmendmentDecision(), ArapDecision(), BookPicker(), CloseYearForm(), ConfirmAllButton(), ConfirmButton(), PermitForm(), RelockForm() (+13 more)

### Community 116 - "ui.ts"
Cohesion: 0.10
Nodes (33): MonthSelect(), fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, Kind, Props, SETTLEMENT_KINDS (+25 more)

### Community 118 - "tax-codes.ts"
Cohesion: 0.18
Nodes (15): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+7 more)

### Community 119 - "invoice-pages.tsx"
Cohesion: 0.12
Nodes (27): INVOICE_KINDS, InvoiceEdit(), InvoiceView(), Kind, Props, STATUS_TONE, SalesInvoicesViewPage(), VoidForm() (+19 more)

### Community 120 - "Badge"
Cohesion: 0.06
Nodes (74): ClientReturnsPage(), FilingRow, Returns(), amt(), one(), shiftMonth(), SignStatus(), STATUS (+66 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.08
Nodes (52): FinancialStatements, ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind (+44 more)

### Community 122 - "filed-returns.ts"
Cohesion: 0.21
Nodes (11): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, filedYears(), groupFiledReturns(), LegacyFileRow, returnYear() (+3 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "quote/page.tsx"
Cohesion: 0.16
Nodes (27): dateFmt, loadItems(), loadSchedule(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel (+19 more)

### Community 126 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.14
Nodes (22): MonthComplete(), TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction(), CycleState (+14 more)

### Community 128 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "mime.ts"
Cohesion: 0.08
Nodes (47): RFC-2047, RFC-2822, advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text() (+39 more)

### Community 131 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 132 - "staff/actions.ts"
Cohesion: 0.24
Nodes (11): addClientUserAction(), fieldErrors(), inviteStaffAction(), removeClientUserAction(), updateStaffAction(), ensureLogin(), clientUserSchema, email (+3 more)

### Community 133 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 134 - "work/page.tsx"
Cohesion: 0.18
Nodes (17): addDays(), holidaySet(), loadBoard(), lastMonth(), loadMyWork(), MyWork, plural(), ym() (+9 more)

### Community 135 - "branches/actions.ts"
Cohesion: 0.60
Nodes (5): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction()

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.06
Nodes (64): Doc, ExceptionRow, BOOKED_TYPES, DocumentReviewPage(), loadBooking(), PayrollDocument(), Review(), ApprovedTable() (+56 more)

### Community 137 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 138 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.04
Nodes (26): pg, vitest, outDir, pkgDir, require, { version }, ctx, input (+18 more)

### Community 141 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 142 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 143 - "tests/register.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 145 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 150 - "notes.ts"
Cohesion: 0.11
Nodes (23): NotesCard(), ICON, NotesTimeline(), when, inquiryAnswers(), NoteEntry, noteEntry(), NoteRow (+15 more)

### Community 151 - "collections/page.tsx"
Cohesion: 0.11
Nodes (30): FirmBlock, ageOpenItems(), AGING_BUCKETS, AgingBucket, agingBucket(), AllocationRow, daysPastDue(), describeBillingDays() (+22 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.11
Nodes (29): isWeekend(), parseIso(), line(), longDay(), NEEDS, ownerEmail(), shortDay(), staffEmails() (+21 more)

### Community 153 - "Card"
Cohesion: 0.11
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 154 - "books-2307.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 155 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

### Community 156 - "funnel.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 157 - "supabaseServer"
Cohesion: 0.05
Nodes (65): nextConfig, next, EditClient(), EditClientPage(), addClientNoteAction(), markCwtFollowedUpAction(), recomputeWorksheetAction(), GET() (+57 more)

### Community 158 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 160 - "payroll/payroll.test.ts"
Cohesion: 0.17
Nodes (18): DEFAULT_ITEMS, employee(), entry(), fixtureContext(), ITEMS, P(), pay(), checkRegister() (+10 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 163 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "index.ts"
Cohesion: 0.09
Nodes (17): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+9 more)

### Community 172 - "portal/layout.tsx"
Cohesion: 0.22
Nodes (12): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+4 more)

### Community 173 - "@remixicon/react"
Cohesion: 0.15
Nodes (25): PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread(), ThreadMessage, when() (+17 more)

### Community 174 - "clients/actions.ts"
Cohesion: 0.12
Nodes (22): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), removeAssignmentAction(), setClientStatusAction(), updateClientAction(), ActingState (+14 more)

### Community 176 - "seed.ts"
Cohesion: 0.29
Nodes (7): seedDeadlineRules, SeedHoliday, seedHolidays, seedHolidays2026, seedHolidays2027, buildSeedSql(), q()

## Knowledge Gaps
- **20 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047`, `RFC-2822` (+15 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1213 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `mime.ts`, `notification.tsx`, `books/export/route.ts`, `package.json`, `staff/actions.ts`, `branches/actions.ts`, `app/documents/page.tsx`, `proxy.ts`, `sign-off-actions.tsx`, `PageHeader`, `onboarding/forms.tsx`, `settings/actions.ts`, `dependencies`, `statements.ts`, `Card`, `register-xlsx.ts`, `scores/page.tsx`, `review-form.tsx`, `portal/layout.tsx`, `clients/actions.ts`, `payroll/forms.tsx`, `lib/books/actions.ts`, `@remixicon/react`, `profile.ts`, `deadlines/page.tsx`, `requireStaff`, `Skeleton`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `review-forms.tsx`, `cx`, `public.ts`, `server-only`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `opening-checklist.tsx`, `proof-actions.ts`, `clients/[id]/page.tsx`, `requireOwner`, `ledger/data.ts`, `portal/reports/page.tsx`, `sidebar-toggle.tsx`, `form-2316.tsx`, `social-button.tsx`, `ledger/books.ts`, `[month]/page.tsx`, `[clientId]/page.tsx`, `return-file-actions.ts`, `Card`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `tools/page.tsx`, `ui.ts`, `invoice-pages.tsx`, `Badge`, `batch/register.ts`, `quote/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.105) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _20 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07800511508951406 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `checkbox.tsx`, `notification.tsx`, `package.json`, `app/documents/page.tsx`, `sign-off-actions.tsx`, `PageHeader`, `onboarding/forms.tsx`, `dependencies`, `statements.ts`, `Card`, `filters.tsx`, `supabaseServer`, `scores/page.tsx`, `review-form.tsx`, `portal/layout.tsx`, `payroll/forms.tsx`, `modal.tsx`, `lib/books/actions.ts`, `@remixicon/react`, `profile.ts`, `deadlines/page.tsx`, `lock-bar.tsx`, `requireStaff`, `Notice`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `review-forms.tsx`, `cx`, `select.tsx`, `public.ts`, `server-only`, `parties/[id]/page.tsx`, `books/forms.tsx`, `module-pages.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `clients/[id]/page.tsx`, `button.tsx`, `cx.ts`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `sidebar-toggle.tsx`, `social-button.tsx`, `ledger/books.ts`, `[month]/page.tsx`, `[clientId]/page.tsx`, `return-file-actions.ts`, `Card`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `tools/page.tsx`, `ui.ts`, `invoice-pages.tsx`, `Badge`, `batch/register.ts`, `quote/page.tsx`, `file-upload.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09350649350649351 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `vitest` to `form-2307.ts`, `filings/run.ts`, `mime.ts`, `books/export/route.ts`, `package.json`, `fields.ts`, `staff/actions.ts`, `app/documents/page.tsx`, `work/page.tsx`, `ticked-allocation.test.ts`, `PageHeader`, `ledger.test.ts`, `settings/actions.ts`, `leads-pipeline.test.ts`, `tests/register.test.ts`, `returns-books.test.ts`, `statements.ts`, `db.test.ts`, `notes.ts`, `collections/page.tsx`, `safeguards.ts`, `Card`, `books-2307.test.ts`, `filters.tsx`, `funnel.test.ts`, `returns-sign-off.test.ts`, `payroll/payroll.test.ts`, `portal-statements-approval.test.ts`, `books-migration.test.ts`, `index.ts`, `scores/page.tsx`, `portal/layout.tsx`, `review-form.tsx`, `clients/actions.ts`, `payroll/forms.tsx`, `templatePayload`, `profile.ts`, `workpapers/load.ts`, `deadlines/page.tsx`, `lock-bar.tsx`, `sign-off.ts`, `requireStaff`, `Centavos`, `returns/types.ts`, `app/settings/page.tsx`, `fees/[id]/page.tsx`, `registrations/forms.tsx`, `testing.ts`, `server-only`, `parties/[id]/page.tsx`, `opening-checklist.tsx`, `quote.ts`, `ledger/data.ts`, `safeguards-load.ts`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `proposal-view.tsx`, `opening.ts`, `social-button.tsx`, `ledger/books.ts`, `compute.ts`, `fees/types.ts`, `template.ts`, `form-1601c.ts`, `portal/page.tsx`, `acting-approver.test.ts`, `ui.ts`, `tax-codes.ts`, `invoice-pages.tsx`, `returns/load.ts`, `filed-returns.ts`, `batch/register.ts`, `cycle/page.tsx`?**
  _High betweenness centrality (0.098) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._