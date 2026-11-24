# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 423 files · ~313,650 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 2939 nodes · 9368 edges · 130 communities (112 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 92 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `fc71cba9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- supabaseServer
- cycle/page.tsx
- sign-off.ts
- app/documents/page.tsx
- registrations/forms.tsx
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- ledger/types.ts
- Sign-in & Setup Docs
- profile.ts
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
- [month]/page.tsx
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/data.ts
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- fees/[id]/page.tsx
- scripts
- manilaToday
- breadcrumb.tsx
- LinkButton
- parties/[id]/page.tsx
- payroll/types.ts
- supabaseServer
- alphalist.ts
- src/app/layout.tsx
- returns/types.ts
- cycle/page.tsx
- opening.ts
- payroll/payroll.test.ts
- Centavos
- sign-off-actions.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- buildSawt
- vitest
- react
- registrations/forms.tsx
- books/forms.tsx
- ledger/data.ts
- Rules
- Animation Performance
- settings/page.tsx
- stat-cards.tsx
- parties/actions.ts
- theme-toggle.tsx
- arap.ts
- income.ts
- form-2316.tsx
- filings/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- formatAmount
- generate-qap-fixture.mjs
- cx
- document-scanner.tsx
- app/app/layout.tsx
- Skeleton
- fees/types.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- db.test.ts
- print/page.tsx
- settings/actions.ts
- BoardUI page patterns
- proxy.ts
- boardui
- rates.ts
- parties/parties.test.ts
- register-xlsx.ts
- quote.ts
- gap.ts
- fees/data.ts
- receipts.ts
- portal/documents/page.tsx
- @remixicon/react
- acting-approver.test.ts
- clients/actions.ts
- ledger.test.ts
- portal/layout.tsx
- schedule.ts
- copy-opencv.mjs
- brand/forms.tsx
- gap/page.tsx
- worksheet/page.tsx
- staff/page.tsx
- zod
- fees/forms.tsx
- quote/page.tsx
- money.ts
- brand/actions.ts
- tests/parties.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 183 edges
2. `Notice()` - 133 edges
3. `cx` - 127 edges
4. `react` - 126 edges
5. `Button()` - 115 edges
6. `Skeleton()` - 109 edges
7. `next` - 103 edges
8. `Card()` - 98 edges
9. `requireOwner()` - 96 edges
10. `Badge()` - 91 edges

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

## Communities (130 total, 18 thin omitted)

### Community 0 - "supabaseServer"
Cohesion: 0.06
Nodes (59): nextConfig, next, zod, Detail(), StatementPage(), approveDocumentAction(), advanceFilingAction(), amount (+51 more)

### Community 1 - "cycle/page.tsx"
Cohesion: 0.06
Nodes (63): server-only, Rule, digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest() (+55 more)

### Community 2 - "sign-off.ts"
Cohesion: 0.11
Nodes (18): Row, QueueFiling, QueueViewer, ReviewQueue, reviewQueue(), ACTION_LABEL, availableActions(), FilingState (+10 more)

### Community 3 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (26): ClientSelect(), BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, ApprovedTable(), ClientList() (+18 more)

### Community 4 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (50): CompleteButton(), StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage() (+42 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "fields.ts"
Cohesion: 0.08
Nodes (34): checkFields(), Issue, num(), msgs(), ok, FieldKey, keys, LOW_CONFIDENCE (+26 more)

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

### Community 11 - "ledger/types.ts"
Cohesion: 0.08
Nodes (30): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+22 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.14
Nodes (18): birSchema, blank(), BRANCH_CODE, contactSchema, credentialsSchema, date(), Expiry, ExpiryTone (+10 more)

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
Cohesion: 0.10
Nodes (32): FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement, add(), buildStatements() (+24 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.13
Nodes (46): Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult, SawtRow (+38 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "[month]/page.tsx"
Cohesion: 0.12
Nodes (34): previewRegisterAction(), saveMonthAction(), PayrollMonth(), PayrollMonthPage(), when(), Payroll(), PayrollPage(), check() (+26 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.06
Nodes (62): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), OcrRate, OwnerSections() (+54 more)

### Community 42 - "Notice"
Cohesion: 0.15
Nodes (45): ClientForm(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), EntryForm(), OpeningUpload(), PermitForm() (+37 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (36): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+28 more)

### Community 44 - "payroll/data.ts"
Cohesion: 0.10
Nodes (38): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Data (+30 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (9): pg@^8.23.1, pg, ctx, input, root, root, root, root (+1 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.22
Nodes (20): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+12 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.14
Nodes (27): dayBefore(), FilingRow, ListedDocument, loadLedger(), loadWorksheet(), PAYROLL_FORM_CODES, SavedWorksheet, Supabase (+19 more)

### Community 48 - "fees/[id]/page.tsx"
Cohesion: 0.21
Nodes (21): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+13 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.31
Nodes (11): portalContext(), PortalReturns(), Returns(), Row, Detail(), PortalStatementDetail(), Latest(), PortalStatement() (+3 more)

### Community 51 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 52 - "LinkButton"
Cohesion: 0.22
Nodes (15): AssignForm(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+7 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (25): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList() (+17 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "supabaseServer"
Cohesion: 0.29
Nodes (13): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+5 more)

### Community 56 - "alphalist.ts"
Cohesion: 0.11
Nodes (33): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+25 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "returns/types.ts"
Cohesion: 0.08
Nodes (42): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), tinDigits(), totalsByAtc(), form0619E (+34 more)

### Community 59 - "cycle/page.tsx"
Cohesion: 0.17
Nodes (21): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), Home(), PortalHome(), NothingToSubmitButton() (+13 more)

### Community 60 - "opening.ts"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+11 more)

### Community 61 - "payroll/payroll.test.ts"
Cohesion: 0.14
Nodes (20): MonthGrid(), toInput(), BirCategory, Category, categoryTotals(), DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS (+12 more)

### Community 62 - "Centavos"
Cohesion: 0.13
Nodes (31): GridRow, AlphalistRow, AnnualSummary, annualTax(), computeEmployeeYear(), dateForYear(), employeeContributions(), grossCompensation() (+23 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.07
Nodes (36): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+28 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "buildSawt"
Cohesion: 0.23
Nodes (13): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+5 more)

### Community 68 - "vitest"
Cohesion: 0.13
Nodes (26): vitest, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q, individual, amounts() (+18 more)

### Community 69 - "react"
Cohesion: 0.09
Nodes (25): react, PrintButton(), DocReviewActions(), GenerateButton(), Deadlines(), DeadlinesPage(), DirectoryParty, ENTRY_STATUS (+17 more)

### Community 70 - "registrations/forms.tsx"
Cohesion: 0.09
Nodes (34): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+26 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (38): ArapState, checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction(), deleteAccountAction(), FormState (+30 more)

### Community 72 - "ledger/data.ts"
Cohesion: 0.11
Nodes (33): Accounts(), AccountsPage(), GROUPS, AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm() (+25 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.17
Nodes (22): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+14 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "parties/actions.ts"
Cohesion: 0.17
Nodes (21): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), ocrProviderFromEnv(), runOcr(), runPendingOcr() (+13 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "arap.ts"
Cohesion: 0.14
Nodes (19): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+11 more)

### Community 80 - "income.ts"
Cohesion: 0.11
Nodes (40): BirLineKey, BookIncome, bookIncome(), INCOME_GROUPS, linesWithMovement(), BOOK_FIGURES, booksCover(), COMPARISON_COLUMNS (+32 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.16
Nodes (20): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, amount() (+12 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.11
Nodes (40): DashboardStats(), FilingListRow, FilingTable(), Event, eventText, Filing(), FilingPage(), paymentText (+32 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (33): @remixicon/react, Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant (+25 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 86 - "cx.ts"
Cohesion: 0.07
Nodes (28): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+20 more)

### Community 87 - "formatAmount"
Cohesion: 0.15
Nodes (23): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+15 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "cx"
Cohesion: 0.11
Nodes (28): react-aria-components@^1.22.1, react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase() (+20 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.15
Nodes (19): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu(), items (+11 more)

### Community 92 - "Skeleton"
Cohesion: 0.30
Nodes (12): NewEmployee(), NewEmployeePage(), PrintAll(), PrintAll2316Page(), Certificates(), Form2316Page(), Portal2316(), Portal2316Page() (+4 more)

### Community 93 - "fees/types.ts"
Cohesion: 0.12
Nodes (20): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+12 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (46): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+38 more)

### Community 101 - "settings/actions.ts"
Cohesion: 0.15
Nodes (19): GET(), generateFilingsNow(), GenerateState, addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow (+11 more)

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "parties/parties.test.ts"
Cohesion: 0.26
Nodes (12): displayName(), fullAddress(), listNameCols(), Party, person, ABBREVIATIONS, nameTokens(), ResolvedParty (+4 more)

### Community 107 - "register-xlsx.ts"
Cohesion: 0.19
Nodes (21): file(), GET(), safe(), GET(), monthlyTable(), employeesForMonth(), buildEmployeeTemplate(), sortItems() (+13 more)

### Community 108 - "quote.ts"
Cohesion: 0.13
Nodes (24): PriceRow, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange(), matches() (+16 more)

### Community 109 - "gap.ts"
Cohesion: 0.20
Nodes (15): TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, has(), items, PRICES, schedule (+7 more)

### Community 110 - "fees/data.ts"
Cohesion: 0.20
Nodes (14): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+6 more)

### Community 111 - "receipts.ts"
Cohesion: 0.14
Nodes (21): BrandSettings(), BrandSettingsPage(), COLUMNS, EXPIRING, fmtMonth(), GrossReceiptsCard(), daysBetween(), expiryStatus() (+13 more)

### Community 112 - "portal/documents/page.tsx"
Cohesion: 0.10
Nodes (34): Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents(), FolderKey (+26 more)

### Community 113 - "@remixicon/react"
Cohesion: 0.18
Nodes (14): Detail(), PayNow(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount, PaymentProof (+6 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "clients/actions.ts"
Cohesion: 0.07
Nodes (58): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+50 more)

### Community 116 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 117 - "portal/layout.tsx"
Cohesion: 0.24
Nodes (9): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), reportsTab, Lockup() (+1 more)

### Community 118 - "schedule.ts"
Cohesion: 0.21
Nodes (11): conditionsSchema, num(), optionalAmount, range, ScheduleStatus, SettingsInput, settingsSchema, toFeeItem() (+3 more)

### Community 119 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 120 - "brand/forms.tsx"
Cohesion: 0.36
Nodes (7): FieldDef, FIELDS, pesoInput(), Result(), SectionForm(), SUBMIT, TaxForm()

### Community 121 - "gap/page.tsx"
Cohesion: 0.29
Nodes (11): loadSchedules(), loadTaxOnFee(), EngagementRow, FeeGapPage(), Gap(), Preview(), QuotePreviewPage(), gapFor() (+3 more)

### Community 122 - "worksheet/page.tsx"
Cohesion: 0.31
Nodes (9): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+1 more)

### Community 123 - "staff/page.tsx"
Cohesion: 0.42
Nodes (7): BranchOption, BranchOptions(), InviteStaffForm(), StaffRowForm(), roleLabel, StaffList(), StaffPage()

### Community 124 - "zod"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 125 - "fees/forms.tsx"
Cohesion: 0.39
Nodes (7): ActivateForm(), billingHint, NewDraftForm(), PricesForm(), Result(), ScheduleSettingsForm(), SettingsValues

### Community 126 - "quote/page.tsx"
Cohesion: 0.47
Nodes (5): COMPLEXITY_LABEL, Lines(), QuoteView(), TAXPAYER_LABEL, Total()

### Community 127 - "money.ts"
Cohesion: 0.19
Nodes (13): Split, AtcTotal, docLabel(), EwtLine, ewtLines(), applyRate(), basisPoints(), formatPeso() (+5 more)

### Community 128 - "brand/actions.ts"
Cohesion: 0.19
Nodes (14): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+6 more)

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 879 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `supabaseServer`, `app/documents/page.tsx`, `registrations/forms.tsx`, `package.json`, `dependencies`, `statements.ts`, `[month]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `[clientId]/page.tsx`, `fees/[id]/page.tsx`, `manilaToday`, `breadcrumb.tsx`, `LinkButton`, `parties/[id]/page.tsx`, `cycle/page.tsx`, `sign-off-actions.tsx`, `tabs.tsx`, `dropdown.tsx`, `registrations/forms.tsx`, `books/forms.tsx`, `ledger/data.ts`, `settings/page.tsx`, `stat-cards.tsx`, `theme-toggle.tsx`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `formatAmount`, `cx`, `document-scanner.tsx`, `app/app/layout.tsx`, `Skeleton`, `social-button.tsx`, `file-upload.tsx`, `print/page.tsx`, `fees/data.ts`, `receipts.ts`, `portal/documents/page.tsx`, `@remixicon/react`, `clients/actions.ts`, `portal/layout.tsx`, `brand/forms.tsx`, `gap/page.tsx`, `worksheet/page.tsx`, `staff/page.tsx`, `fees/forms.tsx`, `quote/page.tsx`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.05671466353217749 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `brand/actions.ts`, `app/documents/page.tsx`, `registrations/forms.tsx`, `package.json`, `dependencies`, `[month]/page.tsx`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/data.ts`, `[clientId]/page.tsx`, `fees/[id]/page.tsx`, `manilaToday`, `breadcrumb.tsx`, `LinkButton`, `parties/[id]/page.tsx`, `supabaseServer`, `src/app/layout.tsx`, `cycle/page.tsx`, `sign-off-actions.tsx`, `react`, `registrations/forms.tsx`, `books/forms.tsx`, `ledger/data.ts`, `settings/page.tsx`, `parties/actions.ts`, `form-2316.tsx`, `filings/[id]/page.tsx`, `formatAmount`, `app/app/layout.tsx`, `Skeleton`, `print/page.tsx`, `settings/actions.ts`, `proxy.ts`, `register-xlsx.ts`, `fees/data.ts`, `receipts.ts`, `portal/documents/page.tsx`, `clients/actions.ts`, `portal/layout.tsx`, `brand/forms.tsx`, `gap/page.tsx`, `worksheet/page.tsx`, `zod`, `quote/page.tsx`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Should `cycle/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05789009697325889 - nodes in this community are weakly interconnected._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `app/documents/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12310606060606061 - nodes in this community are weakly interconnected._