# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 736 files · ~582,277 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 15 file(s) not represented in the graph (top: .css 7, (none) 4, .mdc 1)

## Summary
- 4627 nodes · 15995 edges · 161 communities (138 shown, 23 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 127 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `ce4ea200`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- filings/run.ts
- migrate.yml
- cx.ts
- ledger/data.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- PageHeader
- Sign-in & Setup Docs
- onboarding/page.tsx
- Sign-off, Ledger & Payments
- zod
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
- toCentavos
- scores/page.tsx
- income.ts
- payroll/types.ts
- ui.ts
- index.ts
- payroll/forms.tsx
- modal.tsx
- lib/books/actions.ts
- scripts
- Badge
- workpapers/page.tsx
- deadlines/page.tsx
- month.ts
- percentage.ts
- ledger/data.ts
- payroll/payroll.test.ts
- Skeleton
- money.ts
- Notice
- describe.ts
- quote/page.tsx
- registrations/forms.tsx
- templatePayload
- cx
- select.tsx
- Apple Design
- items.ts
- returns/books.test.ts
- party-pages.tsx
- parties/[id]/page.tsx
- books/forms.tsx
- formatAmount
- Rules
- Animation Performance
- ledger/types.ts
- stat-cards.tsx
- Card
- theme-toggle.tsx
- quote.ts
- register-books.test.ts
- supabaseServer
- branches/page.tsx
- button.tsx
- Pro components
- parties/[id]/page.tsx
- cycle/actions.ts
- portal/reports/page.tsx
- portal-billing.test.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- public.ts
- ledger/types.ts
- Recipes
- payroll/data.ts
- BoardUI theming reference
- Pro templates
- social-button.tsx
- print/page.tsx
- tax-codes.ts
- [month]/page.tsx
- status.ts
- boardui
- rates.ts
- fees/types.ts
- proxy.ts
- returns/types.ts
- formatAmount
- ledger-lock.test.ts
- Opening balances: checklist for any cut-off
- fixed-assets/forms.tsx
- portal/page.tsx
- acting-approver.test.ts
- leads-pipeline.test.ts
- registration.test.ts
- apply-migrations.sh
- fees.test.ts
- settlement-pages.tsx
- filings/[id]/page.tsx
- returns/load.ts
- 2316/page.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- gap/page.tsx
- ledger-documents.test.ts
- cycle/page.tsx
- read.test.ts
- checkbox.tsx
- server-only
- workpapers.test.ts
- fields.ts
- work/page.tsx
- @remixicon/react
- manilaToday
- gemini.ts
- ledger.test.ts
- ref_node_fs
- settings-schema.ts
- proxy.ts
- util.ts
- ref_node_fs
- template.ts
- db.test.ts
- leads/[id]/page.tsx
- safeguards.ts
- register/page.tsx
- quote.test.ts
- filters.tsx
- next
- BoardUI page patterns
- register-xlsx.ts
- Rework: one flow from lead to year-end
- BoardUI page patterns
- eslint.config.mjs
- proof-review.tsx
- fixed-assets.test.ts
- portal/layout.tsx
- requests/actions.ts
- clients/[id]/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 284 edges
2. `cx` - 223 edges
3. `Skeleton()` - 216 edges
4. `react` - 212 edges
5. `Notice()` - 210 edges
6. `Button()` - 187 edges
7. `next` - 171 edges
8. `Card()` - 159 edges
9. `Badge()` - 151 edges
10. `vitest` - 131 edges

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

## Communities (161 total, 23 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (42): one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href(), Portal2307() (+34 more)

### Community 1 - "filings/run.ts"
Cohesion: 0.09
Nodes (43): Rule, compareIso(), isWeekend(), lastDayOfMonth(), parseIso(), DeadlineRule, DueRule, EfpsGroup (+35 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "cx.ts"
Cohesion: 0.04
Nodes (47): AvatarColor, AvatarProps, AvatarSize, styles, CHIP_COLORS, ChipColor, ChipProps, ChipVariant (+39 more)

### Community 4 - "ledger/data.ts"
Cohesion: 0.07
Nodes (55): dayBefore(), GET(), safe(), AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+47 more)

### Community 5 - "package.json"
Cohesion: 0.09
Nodes (28): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15 (+20 more)

### Community 6 - "gemini.ts"
Cohesion: 0.10
Nodes (21): OCR_DOC_TYPES, OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError (+13 more)

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
Cohesion: 0.14
Nodes (22): DeadlinesPage(), FilingsTabs(), FilingsTabsFor(), Section, SECTIONS, SectionTabs(), TabKey, one() (+14 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.10
Nodes (35): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+27 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "zod"
Cohesion: 0.11
Nodes (19): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-dom@19.3.0, @remixicon/react@^4.9.0 (+11 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.09
Nodes (41): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), defaultCashFlow(), loadReleasedReports(), loadStatements() (+33 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.15
Nodes (35): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments() (+27 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "toCentavos"
Cohesion: 0.08
Nodes (43): file(), GET(), safe(), PayrollDocument(), PayrollReadState, KIND_LABEL, MATCH_BADGE, PayrollReadReview() (+35 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.05
Nodes (77): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), RunReadyButton(), VoidDepositForm() (+69 more)

### Community 42 - "income.ts"
Cohesion: 0.09
Nodes (72): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+64 more)

### Community 43 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 44 - "ui.ts"
Cohesion: 0.07
Nodes (54): blankLine(), InvoiceForm(), InvoiceFormValue, fmt(), OpenInvoice, SettlementForm(), SettlementFormValue, TransactionJournal() (+46 more)

### Community 45 - "index.ts"
Cohesion: 0.09
Nodes (18): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+10 more)

### Community 46 - "payroll/forms.tsx"
Cohesion: 0.08
Nodes (61): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+53 more)

### Community 47 - "modal.tsx"
Cohesion: 0.10
Nodes (35): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), UnlockRequests(), when() (+27 more)

### Community 48 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (67): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+59 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Badge"
Cohesion: 0.13
Nodes (29): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+21 more)

### Community 51 - "workpapers/page.tsx"
Cohesion: 0.05
Nodes (73): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+65 more)

### Community 52 - "deadlines/page.tsx"
Cohesion: 0.12
Nodes (31): generateFilingsNow(), GenerateState, GenerateButton(), AmendmentCard(), BooksStillOpen(), Deadlines(), documentsWaiting(), FilingGroup() (+23 more)

### Community 53 - "month.ts"
Cohesion: 0.18
Nodes (15): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+7 more)

### Community 54 - "percentage.ts"
Cohesion: 0.15
Nodes (19): ClientTab, ClientTabs(), UNDER, ClientReturnsPage(), Returns(), Queue(), ReviewPage(), Row (+11 more)

### Community 55 - "ledger/data.ts"
Cohesion: 0.16
Nodes (26): DashboardStats(), FilingTable(), ActingNotice(), DashboardPage(), OwnerView(), SafeguardsNotice(), Summary(), Acting() (+18 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.07
Nodes (68): MonthGrid(), toInput(), AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat() (+60 more)

### Community 57 - "Skeleton"
Cohesion: 0.07
Nodes (47): react, Batch(), BatchPage(), one(), toCentavos(), BankAccountsRoute(), INVOICE_KINDS, InvoiceEdit() (+39 more)

### Community 58 - "money.ts"
Cohesion: 0.08
Nodes (46): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel(), EwtLine, ewtLines() (+38 more)

### Community 59 - "Notice"
Cohesion: 0.09
Nodes (78): setupMissingChartsAction(), ClientForm(), BatchUpload(), PreviewTable(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm() (+70 more)

### Community 60 - "describe.ts"
Cohesion: 0.43
Nodes (5): describeDue(), FREQUENCY_SECTIONS, ordinal(), periodWord, taxTypeOfForm()

### Community 61 - "quote/page.tsx"
Cohesion: 0.14
Nodes (31): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+23 more)

### Community 62 - "registrations/forms.tsx"
Cohesion: 0.05
Nodes (93): frequencyLabel, Props, ClientList(), ClientsPage(), Row, ClientCaseKind, dtiRegisteredOn(), fieldErrors() (+85 more)

### Community 63 - "templatePayload"
Cohesion: 0.09
Nodes (11): templatePayload(), as(), client(), root, root, as(), books(), root (+3 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (44): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, InputOtp(), InputOtpProps, Kbd() (+36 more)

### Community 65 - "select.tsx"
Cohesion: 0.08
Nodes (36): SheetPreview(), Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem() (+28 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "items.ts"
Cohesion: 0.15
Nodes (18): dateFmt, statusLabel, statusTone, Supabase, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+10 more)

### Community 68 - "returns/books.test.ts"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "party-pages.tsx"
Cohesion: 0.15
Nodes (18): server-only, GET(), GET(), digestMessage(), DigestRow, longDay(), peso, time() (+10 more)

### Community 70 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (39): normalizeTin(), runOcr(), SKIP, datAddress(), datNameCols(), displayName(), fullAddress(), listNameCols() (+31 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.10
Nodes (53): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+45 more)

### Community 72 - "formatAmount"
Cohesion: 0.11
Nodes (42): booksContext(), BooksContext, fmtDate(), fmtMonth(), SearchParams, BooksFrame(), BooksList(), Column (+34 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ledger/types.ts"
Cohesion: 0.15
Nodes (19): Access, STATUS, CashFlowClass, Cutoff, cutoffOf(), PNL_TYPES, TbRowOut, ChecklistInput (+11 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (49): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+41 more)

### Community 77 - "Card"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (29): EstimatedProfile, ExistingClient, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange() (+21 more)

### Community 80 - "register-books.test.ts"
Cohesion: 0.40
Nodes (4): client(), approved(), as(), root

### Community 81 - "supabaseServer"
Cohesion: 0.06
Nodes (81): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction(), EditClient(), EditClientPage() (+73 more)

### Community 82 - "branches/page.tsx"
Cohesion: 0.20
Nodes (14): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), BranchRowForm(), Branches(), BranchesPage() (+6 more)

### Community 83 - "button.tsx"
Cohesion: 0.09
Nodes (26): ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent, styles (+18 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "parties/[id]/page.tsx"
Cohesion: 0.20
Nodes (16): fieldErrors(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), setPresetAccountAction(), MergeForm(), PresetAccountForm(), VerifyButton() (+8 more)

### Community 86 - "cycle/actions.ts"
Cohesion: 0.24
Nodes (15): MonthComplete(), SentRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), confirmMonthAction() (+7 more)

### Community 87 - "portal/reports/page.tsx"
Cohesion: 0.08
Nodes (68): Detail(), PortalStatementDetail(), PortalClient, portalContext(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+60 more)

### Community 88 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 89 - "input.tsx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.09
Nodes (31): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, UserMenu(), items, Links() (+23 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.24
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "public.ts"
Cohesion: 0.10
Nodes (27): metadata, Proposal(), ProposalPage(), SERVICES, StartState, metadata, Start(), StartPage() (+19 more)

### Community 94 - "ledger/types.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "payroll/data.ts"
Cohesion: 0.16
Nodes (27): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), certificatesFromRaw(), loadEntries(), loadPriorEmployers(), loadStored(), payAccountsOf() (+19 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.06
Nodes (50): exceljs, BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR (+42 more)

### Community 101 - "tax-codes.ts"
Cohesion: 0.20
Nodes (14): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+6 more)

### Community 102 - "[month]/page.tsx"
Cohesion: 0.14
Nodes (20): GridRow, PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES (+12 more)

### Community 103 - "status.ts"
Cohesion: 0.39
Nodes (7): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, invoiceTotals(), plural()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.23
Nodes (19): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+11 more)

### Community 106 - "fees/types.ts"
Cohesion: 0.11
Nodes (21): count(), first(), pick(), profileFromQuery(), items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE (+13 more)

### Community 107 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 108 - "returns/types.ts"
Cohesion: 0.07
Nodes (36): FinancialStatements, tinDashed(), client, row(), form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q (+28 more)

### Community 109 - "formatAmount"
Cohesion: 0.21
Nodes (15): Accreditation(), amount(), AmountRow(), DateCells(), Form2307(), Form2307Set(), padded(), PartyFields() (+7 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "fixed-assets/forms.tsx"
Cohesion: 0.14
Nodes (27): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+19 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "leads-pipeline.test.ts"
Cohesion: 0.33
Nodes (3): HASH, LEAD, root

### Community 119 - "settlement-pages.tsx"
Cohesion: 0.13
Nodes (26): PaymentsEditPage(), PaymentsViewPage(), ReceiptsEditPage(), ReceiptsViewPage(), Kind, Props, SETTLEMENT_KINDS, SettlementEdit() (+18 more)

### Community 120 - "filings/[id]/page.tsx"
Cohesion: 0.06
Nodes (47): FilingRow, FilingListRow, SignOffState, bookKind, BookRow, bookStatus, Event, eventText (+39 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.07
Nodes (55): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+47 more)

### Community 122 - "2316/page.tsx"
Cohesion: 0.30
Nodes (11): PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), PortalPrint2307Page(), Print(), Portal2316(), Portal2316Page() (+3 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (41): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+33 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "gap/page.tsx"
Cohesion: 0.18
Nodes (14): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), estimateProfile(), gapFor(), GapRow (+6 more)

### Community 127 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (20): DocumentsCard(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), DecideExceptionForm(), CycleRow (+12 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (87): RFC-4180, applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), PayrollItem (+79 more)

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "server-only"
Cohesion: 0.08
Nodes (51): RFC-2047, RFC-2822, GET(), Filing(), ActionButton(), EsubmissionControls(), RetryBookEntry(), ReturnFileUpload() (+43 more)

### Community 131 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 133 - "fields.ts"
Cohesion: 0.07
Nodes (45): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), BOOKED_TYPES (+37 more)

### Community 134 - "work/page.tsx"
Cohesion: 0.15
Nodes (23): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), holidaySet(), loadBoard() (+15 more)

### Community 135 - "@remixicon/react"
Cohesion: 0.05
Nodes (62): Detail(), StatementPage(), Billing(), PortalBilling(), statementHref(), Detail(), PayNow(), credit() (+54 more)

### Community 136 - "manilaToday"
Cohesion: 0.10
Nodes (35): @remixicon/react, Doc, when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+27 more)

### Community 137 - "gemini.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "ref_node_fs"
Cohesion: 0.05
Nodes (16): pg, vitest, root, root, root, root, HASH, LEAD (+8 more)

### Community 141 - "settings-schema.ts"
Cohesion: 0.43
Nodes (5): checkbox, dayBefore(), holidaySchema, ruleEditSchema, base

### Community 142 - "proxy.ts"
Cohesion: 0.14
Nodes (18): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS, NonDeductibleRow (+10 more)

### Community 144 - "util.ts"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 145 - "ref_node_fs"
Cohesion: 0.09
Nodes (12): outDir, pkgDir, require, { version }, ctx, input, api, ctx (+4 more)

### Community 146 - "template.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 150 - "leads/[id]/page.tsx"
Cohesion: 0.07
Nodes (53): addClientNoteAction(), NoteState, NotesCard(), ClientNoteForm(), FirmPage(), PLACES, Places(), REVIEWER_PLACES (+45 more)

### Community 152 - "safeguards.ts"
Cohesion: 0.09
Nodes (39): ClientValues, TaxpayerType, TaxType, CoverageClient, coverageGaps(), Gap, GapKind, Email (+31 more)

### Community 153 - "register/page.tsx"
Cohesion: 0.10
Nodes (46): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+38 more)

### Community 154 - "quote.test.ts"
Cohesion: 0.33
Nodes (3): Data, root, Row

### Community 155 - "filters.tsx"
Cohesion: 0.15
Nodes (23): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+15 more)

### Community 157 - "next"
Cohesion: 0.11
Nodes (15): nextConfig, next, POST(), GET(), GET(), GET(), acceptProposalAction(), AcceptState (+7 more)

### Community 158 - "BoardUI page patterns"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 160 - "register-xlsx.ts"
Cohesion: 0.18
Nodes (17): checkRegister(), fmt(), ID_HEADERS, NewEmployeeRow, norm(), normalizeTin(), parseName(), tinDigits() (+9 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.14
Nodes (13): Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation, Needed from the Owner (+5 more)

### Community 163 - "eslint.config.mjs"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 164 - "proof-review.tsx"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 165 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 172 - "portal/layout.tsx"
Cohesion: 0.27
Nodes (10): Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs, registrationTab, requestsTab (+2 more)

### Community 173 - "requests/actions.ts"
Cohesion: 0.08
Nodes (49): amendFilingAction(), RequestDetail(), RequestPage(), Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests() (+41 more)

### Community 174 - "clients/[id]/page.tsx"
Cohesion: 0.10
Nodes (30): FormState, removeAssignmentAction(), setIncomeTaxMethodAction(), StaffOptions(), AssignForm(), ClientUserForm(), IncomeTaxMethodForm(), RemoveAssignmentButton() (+22 more)

## Knowledge Gaps
- **21 isolated node(s):** `RFC-4180`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1263 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **23 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `next` to `form-2307.ts`, `read.test.ts`, `server-only`, `ledger/data.ts`, `package.json`, `fields.ts`, `@remixicon/react`, `work/page.tsx`, `manilaToday`, `PageHeader`, `onboarding/page.tsx`, `zod`, `statements.ts`, `leads/[id]/page.tsx`, `register/page.tsx`, `filters.tsx`, `toCentavos`, `scores/page.tsx`, `ui.ts`, `requests/actions.ts`, `clients/[id]/page.tsx`, `payroll/forms.tsx`, `lib/books/actions.ts`, `modal.tsx`, `Badge`, `workpapers/page.tsx`, `deadlines/page.tsx`, `portal/layout.tsx`, `percentage.ts`, `ledger/data.ts`, `Skeleton`, `quote/page.tsx`, `registrations/forms.tsx`, `cx`, `party-pages.tsx`, `books/forms.tsx`, `formatAmount`, `ledger/types.ts`, `Card`, `supabaseServer`, `branches/page.tsx`, `parties/[id]/page.tsx`, `cycle/actions.ts`, `portal/reports/page.tsx`, `app/app/layout.tsx`, `form-2316.tsx`, `public.ts`, `payroll/data.ts`, `print/page.tsx`, `[month]/page.tsx`, `proxy.ts`, `formatAmount`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `settlement-pages.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `2316/page.tsx`, `batch/register.ts`, `gap/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **What connects `RFC-4180`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10482180293501048 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `form-2307.ts`, `filings/run.ts`, `ledger/data.ts`, `package.json`, `gemini.ts`, `onboarding/page.tsx`, `statements.ts`, `scores/page.tsx`, `ui.ts`, `index.ts`, `lib/books/actions.ts`, `workpapers/page.tsx`, `deadlines/page.tsx`, `month.ts`, `percentage.ts`, `ledger/data.ts`, `payroll/payroll.test.ts`, `money.ts`, `describe.ts`, `registrations/forms.tsx`, `templatePayload`, `items.ts`, `returns/books.test.ts`, `party-pages.tsx`, `parties/[id]/page.tsx`, `books/forms.tsx`, `ledger/types.ts`, `Card`, `quote.ts`, `register-books.test.ts`, `branches/page.tsx`, `portal/reports/page.tsx`, `portal-billing.test.ts`, `document-scanner.tsx`, `public.ts`, `ledger/types.ts`, `print/page.tsx`, `tax-codes.ts`, `[month]/page.tsx`, `status.ts`, `rates.ts`, `fees/types.ts`, `returns/types.ts`, `ledger-lock.test.ts`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `acting-approver.test.ts`, `leads-pipeline.test.ts`, `registration.test.ts`, `fees.test.ts`, `filings/[id]/page.tsx`, `returns/load.ts`, `batch/register.ts`, `gap/page.tsx`, `ledger-documents.test.ts`, `cycle/page.tsx`, `read.test.ts`, `server-only`, `workpapers.test.ts`, `fields.ts`, `@remixicon/react`, `gemini.ts`, `ledger.test.ts`, `settings-schema.ts`, `ref_node_fs`, `template.ts`, `db.test.ts`, `leads/[id]/page.tsx`, `safeguards.ts`, `register/page.tsx`, `quote.test.ts`, `filters.tsx`, `BoardUI page patterns`, `BoardUI page patterns`, `eslint.config.mjs`, `proof-review.tsx`, `fixed-assets.test.ts`, `portal/layout.tsx`, `requests/actions.ts`, `clients/[id]/page.tsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Should `filings/run.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08506493506493507 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Skeleton` to `form-2307.ts`, `checkbox.tsx`, `server-only`, `cx.ts`, `ledger/data.ts`, `package.json`, `fields.ts`, `@remixicon/react`, `work/page.tsx`, `manilaToday`, `PageHeader`, `onboarding/page.tsx`, `zod`, `statements.ts`, `leads/[id]/page.tsx`, `register/page.tsx`, `filters.tsx`, `next`, `toCentavos`, `scores/page.tsx`, `ui.ts`, `requests/actions.ts`, `clients/[id]/page.tsx`, `modal.tsx`, `lib/books/actions.ts`, `payroll/forms.tsx`, `Badge`, `workpapers/page.tsx`, `deadlines/page.tsx`, `portal/layout.tsx`, `percentage.ts`, `ledger/data.ts`, `Notice`, `quote/page.tsx`, `registrations/forms.tsx`, `cx`, `select.tsx`, `books/forms.tsx`, `formatAmount`, `stat-cards.tsx`, `Card`, `theme-toggle.tsx`, `supabaseServer`, `branches/page.tsx`, `button.tsx`, `parties/[id]/page.tsx`, `cycle/actions.ts`, `portal/reports/page.tsx`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `public.ts`, `payroll/data.ts`, `social-button.tsx`, `print/page.tsx`, `[month]/page.tsx`, `fixed-assets/forms.tsx`, `portal/page.tsx`, `settlement-pages.tsx`, `filings/[id]/page.tsx`, `returns/load.ts`, `2316/page.tsx`, `batch/register.ts`, `gap/page.tsx`, `cycle/page.tsx`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._