# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 398 files · ~283,574 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2733 nodes · 8579 edges · 120 communities (103 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `c477d928`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- engine.ts
- money.ts
- manilaToday
- vat.ts
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- cycle-forms.tsx
- Sign-in & Setup Docs
- profile.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- payroll/data.ts
- Data Model & Security Docs
- quote.test.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- payroll/payroll.test.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- rows.ts
- ref_node_fs
- Card
- returns/load.ts
- fees/data.ts
- scripts
- manilaToday
- quote.ts
- statement-view.tsx
- parties/[id]/page.tsx
- payroll/payroll.test.ts
- supabaseServer
- [month]/page.tsx
- src/app/layout.tsx
- rates.ts
- books/page.tsx
- toCentavos
- form-1601eq.ts
- server-only
- sign-off-actions.tsx
- cx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- clients/[id]/page.tsx
- gemini.ts
- books/actions.ts
- fees/types.ts
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- quote/page.tsx
- theme-toggle.tsx
- arap.ts
- percentage.ts
- form-2316.tsx
- filings/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- returns/types.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- react
- settings/actions.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- breadcrumb.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- Centavos
- Card
- parties/parties.test.ts
- template.ts
- gap.ts
- proof-upload.tsx
- boardui/SKILL.md
- documents/actions.ts
- acting-approver.test.ts
- brand/forms.tsx
- filters.tsx
- copy-opencv.mjs
- checkbox.tsx
- receipts.ts
- ledger.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 169 edges
2. `cx` - 121 edges
3. `Notice()` - 119 edges
4. `react` - 118 edges
5. `Button()` - 103 edges
6. `Skeleton()` - 97 edges
7. `next` - 96 edges
8. `requireOwner()` - 88 edges
9. `Card()` - 87 edges
10. `Badge()` - 83 edges

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

## Communities (120 total, 17 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.12
Nodes (17): Row, QueueFiling, QueueViewer, ReviewQueue, ACTION_LABEL, availableActions(), FilingState, FilingStatus (+9 more)

### Community 1 - "engine.ts"
Cohesion: 0.07
Nodes (58): shift(), Rule, addDays(), addMonths(), compareIso(), IsoDate, isWeekend(), lastDayOfMonth() (+50 more)

### Community 2 - "money.ts"
Cohesion: 0.26
Nodes (11): PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PortalPayrollUpload(), applyRate(), basisPoints(), grossUp(), grouped (+3 more)

### Community 3 - "manilaToday"
Cohesion: 0.08
Nodes (48): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+40 more)

### Community 4 - "vat.ts"
Cohesion: 0.12
Nodes (40): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+32 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.13
Nodes (20): approveDocumentAction(), checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+12 more)

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

### Community 11 - "cycle-forms.tsx"
Cohesion: 0.18
Nodes (15): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+7 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.11
Nodes (22): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), daysBetween(), Expiry (+14 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.14
Nodes (14): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+6 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "payroll/data.ts"
Cohesion: 0.25
Nodes (11): @supabase/supabase-js, Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), PayrollClient (+3 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "quote.test.ts"
Cohesion: 0.21
Nodes (11): EWT_NOTE, QuoteInput, base, code(), priced(), quote(), settings, TEST_PRICES (+3 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/payroll.test.ts"
Cohesion: 0.10
Nodes (39): file(), GET(), safe(), check(), GET(), previewOf(), totals(), monthlyTable() (+31 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "Notice"
Cohesion: 0.08
Nodes (76): ClientForm(), StaffOptions(), AccountForm(), EntryForm(), SetupForm(), DocReviewActions(), AssignForm(), ClientUserForm() (+68 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.10
Nodes (49): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+41 more)

### Community 44 - "rows.ts"
Cohesion: 0.13
Nodes (30): Certificates2316, certificatesFromRaw(), form2316(), Form2316Data, Form2316Employer, Form2316Line, Form2316Signatory, mmdd() (+22 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (9): pg@^8.23.1, pg, ctx, input, root, root, root, root (+1 more)

### Community 46 - "Card"
Cohesion: 0.13
Nodes (30): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), Client, CollectionsPage(), OpenDue (+22 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.14
Nodes (26): recomputeWorksheetAction(), WorksheetState, FilingRow, ListedDocument, loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+18 more)

### Community 48 - "fees/data.ts"
Cohesion: 0.12
Nodes (29): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+21 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.10
Nodes (33): @remixicon/react, Detail(), StatementPage(), PortalClient, portalContext(), Documents(), FolderKey, FOLDERS (+25 more)

### Community 51 - "quote.ts"
Cohesion: 0.17
Nodes (18): PriceRow, buildQuote(), cents(), CustomQuoteItem, inRange(), matches(), pesos(), Quote (+10 more)

### Community 52 - "statement-view.tsx"
Cohesion: 0.21
Nodes (10): Detail(), PayNow(), FirmBlock, PayAccount, PaymentProof, ProofMethod, ProofStatus, Statement (+2 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.17
Nodes (18): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, Party (+10 more)

### Community 54 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.09
Nodes (43): nextConfig, next, EditClient(), EditClientPage(), NewClientPage(), OwnerOnly(), addChargeAction(), applyCreditAction() (+35 more)

### Community 56 - "[month]/page.tsx"
Cohesion: 0.16
Nodes (20): EmployeeDetail(), EmployeePage(), MonthGrid(), toInput(), PayrollMonth(), PayrollMonthPage(), when(), loadPriorEmployers() (+12 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.07
Nodes (54): dayBefore(), GET(), safe(), ArapDecision(), ArapUpload(), BookPicker(), ConfirmAllButton(), ConfirmButton() (+46 more)

### Community 60 - "toCentavos"
Cohesion: 0.14
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 61 - "form-1601eq.ts"
Cohesion: 0.10
Nodes (29): Split, tinDashed(), AtcTotal, docLabel(), EwtLine, ewtLines(), tinDigits(), branchFromTin() (+21 more)

### Community 62 - "server-only"
Cohesion: 0.20
Nodes (16): mergePartyAction(), normalizeTin(), lookupParties(), person, blank(), optionalText(), PartyInput, partySchema (+8 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.31
Nodes (9): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), StepForm() (+1 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.21
Nodes (19): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+11 more)

### Community 68 - "vitest"
Cohesion: 0.15
Nodes (23): vitest, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts() (+15 more)

### Community 69 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (65): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction() (+57 more)

### Community 70 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+8 more)

### Community 71 - "books/actions.ts"
Cohesion: 0.11
Nodes (44): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), deleteAccountAction(), FormState, friendly() (+36 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.15
Nodes (19): EngagementRow, TaxpayerType, EstimatedProfile, ExistingClient, count(), first(), pick(), profileFromQuery() (+11 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.29
Nodes (13): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+5 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.12
Nodes (24): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+16 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.16
Nodes (26): dateFmt, loadItems(), loadSchedules(), loadTaxOnFee(), longDate(), nextEffectiveDate(), statusLabel, statusTone (+18 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (30): Nav(), PortalLayout(), baseTabs, payrollTab, PortalNav(), applyTheme(), applyThemeWithTransition(), createBlurCircleMask() (+22 more)

### Community 79 - "arap.ts"
Cohesion: 0.16
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 80 - "percentage.ts"
Cohesion: 0.13
Nodes (44): comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), incomeAttachments(), inputs1701Q(), inputs1702Q() (+36 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.12
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (47): FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), Event, eventText, Filing(), FilingPage() (+39 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): react-dom@19.3.0, react-dom, AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 87 - "returns/types.ts"
Cohesion: 0.10
Nodes (32): agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED, form1601C, INPUTS, MONTH, form1604C (+24 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.11
Nodes (26): advanceFilingAction(), amount, SignOffState, stepData(), text(), AppLayout(), nav, ownerNav (+18 more)

### Community 92 - "react"
Cohesion: 0.11
Nodes (38): react, Accounts(), AccountsPage(), GROUPS, NewEntry(), NewEntryPage(), RemoveClientUserButton(), StatusButton() (+30 more)

### Community 93 - "settings/actions.ts"
Cohesion: 0.12
Nodes (22): server-only, GET(), generateFilingsNow(), GenerateState, GenerateButton(), digestMessage(), DigestRow, longDay() (+14 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.10
Nodes (28): GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors (+20 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.10
Nodes (22): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+14 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.33
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (41): exceljs, BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad(), PrintButton(), BOOK_ABBR (+33 more)

### Community 101 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "Centavos"
Cohesion: 0.13
Nodes (31): GridRow, AlphalistRow, AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion() (+23 more)

### Community 106 - "Card"
Cohesion: 0.15
Nodes (25): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+17 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.26
Nodes (13): displayName(), fullAddress(), listNameCols(), partyTinLabel(), ABBREVIATIONS, fillFromDirectory(), nameTokens(), ResolvedParty (+5 more)

### Community 108 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 109 - "gap.ts"
Cohesion: 0.27
Nodes (9): estimateProfile(), gapFor(), GapRow, has(), items, PRICES, schedule, settings (+1 more)

### Community 110 - "proof-upload.tsx"
Cohesion: 0.21
Nodes (15): METHODS, ProofUpload(), send(), amount, date, ProofState, refresh(), rejectProofAction() (+7 more)

### Community 112 - "documents/actions.ts"
Cohesion: 0.50
Nodes (4): ALLOWED, replyDocumentAction(), runOcrAction(), runOcr()

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "brand/forms.tsx"
Cohesion: 0.17
Nodes (19): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+11 more)

### Community 116 - "filters.tsx"
Cohesion: 0.48
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

### Community 117 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 118 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 119 - "receipts.ts"
Cohesion: 0.22
Nodes (11): firmBlockLines(), formatTin(), cents(), CLIENT_MONEY_KINDS, FEE_KINDS, GrossReceiptsWatch, grossReceiptsWatch(), pesos() (+3 more)

### Community 120 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 834 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `money.ts`, `manilaToday`, `package.json`, `cycle-forms.tsx`, `dependencies`, `payroll/data.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Card`, `manilaToday`, `statement-view.tsx`, `parties/[id]/page.tsx`, `supabaseServer`, `[month]/page.tsx`, `books/page.tsx`, `sign-off-actions.tsx`, `cx`, `dropdown.tsx`, `clients/[id]/page.tsx`, `books/actions.ts`, `settings/page.tsx`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `settings/actions.ts`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `breadcrumb.tsx`, `Card`, `proof-upload.tsx`, `brand/forms.tsx`, `filters.tsx`, `checkbox.tsx`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11594202898550725 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `manilaToday`, `package.json`, `review-form.tsx`, `cycle-forms.tsx`, `dependencies`, `payroll/data.ts`, `payroll/payroll.test.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `Card`, `returns/load.ts`, `fees/data.ts`, `manilaToday`, `parties/[id]/page.tsx`, `[month]/page.tsx`, `src/app/layout.tsx`, `books/page.tsx`, `sign-off-actions.tsx`, `clients/[id]/page.tsx`, `books/actions.ts`, `settings/page.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `app/app/layout.tsx`, `react`, `settings/actions.ts`, `social-button.tsx`, `print/page.tsx`, `breadcrumb.tsx`, `proxy.ts`, `Card`, `proof-upload.tsx`, `documents/actions.ts`, `brand/forms.tsx`?**
  _High betweenness centrality (0.138) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07243460764587525 - nodes in this community are weakly interconnected._
- **Should `manilaToday` be split into smaller, more focused modules?**
  _Cohesion score 0.07948568088836938 - nodes in this community are weakly interconnected._
- **Should `vat.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11733615221987315 - nodes in this community are weakly interconnected._