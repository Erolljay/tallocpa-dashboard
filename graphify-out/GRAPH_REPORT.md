# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 391 files · ~278,289 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2679 nodes · 8403 edges · 124 communities (107 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 88 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `a54241b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- sign-off.ts
- engine.ts
- payroll/payroll.test.ts
- manilaToday
- vat.ts
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- cycle/page.tsx
- Sign-in & Setup Docs
- profile.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- buildSawt
- Data Model & Security Docs
- fees/[id]/page.tsx
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
- Button
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
- payroll/data.ts
- src/app/layout.tsx
- rates.ts
- books/page.tsx
- toCentavos
- form-1601eq.ts
- server-only
- Notice
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
- FormModule
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
- books/forms.tsx
- breadcrumb.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- Centavos
- settings/page.tsx
- parties/parties.test.ts
- template.ts
- coa.test.ts
- proof-upload.tsx
- index.ts
- books/export/route.ts
- requireOwner
- acting-approver.test.ts
- brand/actions.ts
- filters.tsx
- copy-opencv.mjs
- checkbox.tsx
- receipts.ts
- ledger.test.ts
- brand/forms.tsx
- acting-approver/actions.ts
- Building UIs with BoardUI

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 169 edges
2. `cx` - 118 edges
3. `Notice()` - 117 edges
4. `react` - 117 edges
5. `Button()` - 100 edges
6. `Skeleton()` - 95 edges
7. `next` - 95 edges
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

## Communities (124 total, 17 thin omitted)

### Community 0 - "sign-off.ts"
Cohesion: 0.09
Nodes (22): advanceFilingAction(), amount, SignOffState, stepData(), text(), Row, QueueFiling, QueueViewer (+14 more)

### Community 1 - "engine.ts"
Cohesion: 0.08
Nodes (46): Rule, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, DueRule, EfpsGroup (+38 more)

### Community 2 - "payroll/payroll.test.ts"
Cohesion: 0.15
Nodes (26): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+18 more)

### Community 3 - "manilaToday"
Cohesion: 0.07
Nodes (51): @remixicon/react, DocReviewActions(), Doc, DocumentsCard(), when(), BOOKED_TYPES, DocumentReviewPage(), loadBooking() (+43 more)

### Community 4 - "vat.ts"
Cohesion: 0.14
Nodes (41): incomeAttachments(), Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtResult (+33 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (27): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+19 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.13
Nodes (24): approveDocumentAction(), Booking, DirectoryParty, ENTRY_STATUS, typeLabel, DocActionState, checkFields(), Issue (+16 more)

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

### Community 11 - "cycle/page.tsx"
Cohesion: 0.12
Nodes (32): Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift(), Home(), PortalHome() (+24 more)

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
Cohesion: 0.12
Nodes (17): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+9 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "buildSawt"
Cohesion: 0.25
Nodes (12): ATC_MASTER, AtcInfo, lookupAtc(), normalizeAtc(), AtcInfo, atcInfo(), AtcKind, atcKind() (+4 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "fees/[id]/page.tsx"
Cohesion: 0.19
Nodes (19): deleteDraftAction(), FeeFormState, loadSchedule(), loadTaxOnFee(), ActivateForm(), billingHint, DeleteDraftButton(), PriceRow (+11 more)

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
Cohesion: 0.12
Nodes (30): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), PayrollItem, sortItems(), checkRegister(), fmt() (+22 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (31): OcrRate, Queue, QueueCell(), waited(), ClientRow, order, PartCell(), ScoredClient (+23 more)

### Community 42 - "Button"
Cohesion: 0.14
Nodes (41): ClientForm(), AccountForm(), ArapUpload(), EntryForm(), OpeningUpload(), SetupForm(), EngagementForm(), EmployeeForm() (+33 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.11
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 44 - "rows.ts"
Cohesion: 0.12
Nodes (32): Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear(), Payroll2316Raw (+24 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (10): pg@^8.23.1, pg, vitest, ctx, input, root, root, root (+2 more)

### Community 46 - "Card"
Cohesion: 0.13
Nodes (31): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), Client, CollectionsPage(), OpenDue (+23 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.14
Nodes (25): Split, VatData, FilingRow, ListedDocument, PAYROLL_FORM_CODES, SavedWorksheet, Supabase, toSource() (+17 more)

### Community 48 - "fees/data.ts"
Cohesion: 0.12
Nodes (30): zod, activateAction(), createFromTemplateAction(), newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+22 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "manilaToday"
Cohesion: 0.18
Nodes (19): EmployeeDetail(), EmployeePage(), Detail(), StatementPage(), PortalClient, portalContext(), Payroll(), PortalPayroll() (+11 more)

### Community 51 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 52 - "statement-view.tsx"
Cohesion: 0.16
Nodes (15): Detail(), PayNow(), PrintButton(), proofBadge, proofMethod, statusBadge, FirmBlock, PayAccount (+7 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.17
Nodes (18): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), Names, PARTY_KINDS (+10 more)

### Community 54 - "payroll/payroll.test.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 55 - "supabaseServer"
Cohesion: 0.11
Nodes (25): nextConfig, next, EditClient(), EditClientPage(), recomputeWorksheetAction(), GET(), Lines(), lineStyle (+17 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.17
Nodes (28): @supabase/supabase-js, saveMonthAction(), file(), GET(), safe(), PayrollMonth(), PayrollMonthPage(), when() (+20 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "rates.ts"
Cohesion: 0.23
Nodes (18): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+10 more)

### Community 59 - "books/page.tsx"
Cohesion: 0.21
Nodes (17): ArapDecision(), ConfirmAllButton(), ConfirmButton(), ReverseForm(), Books(), BooksPage(), dayBefore(), fmtDate() (+9 more)

### Community 60 - "toCentavos"
Cohesion: 0.15
Nodes (19): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, openingPayload(), sheetOf() (+11 more)

### Community 61 - "form-1601eq.ts"
Cohesion: 0.08
Nodes (49): agentBackground(), agentErrors(), tinDashed(), atcSchedule(), AtcTotal, detailSchedule(), docLabel(), EwtLine (+41 more)

### Community 62 - "server-only"
Cohesion: 0.19
Nodes (17): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPartyVerifiedAction(), normalizeTin(), PARTY_COLUMNS, blank() (+9 more)

### Community 63 - "Notice"
Cohesion: 0.14
Nodes (23): ClientUserForm(), EmployeeUpload(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm(), RegisterUpload(), Release2316Form(), SubmissionReview() (+15 more)

### Community 64 - "cx"
Cohesion: 0.07
Nodes (37): react-aria-components, InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps (+29 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.07
Nodes (40): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+32 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.13
Nodes (30): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist(), csvCell() (+22 more)

### Community 68 - "vitest"
Cohesion: 0.21
Nodes (16): individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput, lineNo() (+8 more)

### Community 69 - "clients/[id]/page.tsx"
Cohesion: 0.05
Nodes (65): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setClientStatusAction(), updateClientAction() (+57 more)

### Community 70 - "gemini.ts"
Cohesion: 0.11
Nodes (21): OCR_DOC_TYPES, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+13 more)

### Community 71 - "books/actions.ts"
Cohesion: 0.25
Nodes (22): checkArapFile(), checkOpeningFile(), confirmAllAction(), confirmEntryAction(), deleteAccountAction(), friendly(), path(), postArapAction() (+14 more)

### Community 72 - "fees/types.ts"
Cohesion: 0.10
Nodes (33): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+25 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "settings/page.tsx"
Cohesion: 0.25
Nodes (16): PaymentSettings(), accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction() (+8 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "quote/page.tsx"
Cohesion: 0.29
Nodes (10): loadSchedules(), longDate(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL (+2 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (25): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+17 more)

### Community 79 - "arap.ts"
Cohesion: 0.15
Nodes (20): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+12 more)

### Community 80 - "percentage.ts"
Cohesion: 0.18
Nodes (29): comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), inputs1701Q(), inputs1702Q(), priorDiffWarning() (+21 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 82 - "filings/[id]/page.tsx"
Cohesion: 0.09
Nodes (48): DashboardStats(), FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), Event, eventText, Filing() (+40 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 86 - "cx.ts"
Cohesion: 0.10
Nodes (18): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+10 more)

### Community 87 - "FormModule"
Cohesion: 0.15
Nodes (10): BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, WITHHOLDING_FORMS, LoadedWorksheet, moduleForForm() (+2 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.13
Nodes (24): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+16 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.11
Nodes (24): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+16 more)

### Community 92 - "react"
Cohesion: 0.08
Nodes (59): react, NewEntry(), NewEntryPage(), NewEmployee(), NewEmployeePage(), Payroll(), PayrollPage(), PrintAll() (+51 more)

### Community 93 - "settings/actions.ts"
Cohesion: 0.08
Nodes (35): server-only, GET(), generateFilingsNow(), GenerateState, GenerateButton(), addHolidayAction(), fieldErrors(), refreshAfterChange() (+27 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.08
Nodes (31): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+23 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.29
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 100 - "books/forms.tsx"
Cohesion: 0.16
Nodes (20): Accounts(), AccountsPage(), GROUPS, ArapState, FormState, OpeningState, BooksClient, ClientBooks (+12 more)

### Community 101 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 102 - "BoardUI page patterns"
Cohesion: 0.20
Nodes (8): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "Centavos"
Cohesion: 0.14
Nodes (23): GridRow, AlphaCols, AlphalistRow, AnnualSummary, MonthLines, PriorAmounts, Suggestion, CheckedRegister (+15 more)

### Community 106 - "settings/page.tsx"
Cohesion: 0.21
Nodes (16): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+8 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.24
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+6 more)

### Community 108 - "template.ts"
Cohesion: 0.22
Nodes (6): items, DOCUMENT_BANDS, EMPLOYEE_BANDS, EMPLOYEE_PER_HEAD_ABOVE, FEE_TEMPLATE, NON_INDIVIDUAL

### Community 109 - "coa.test.ts"
Cohesion: 0.14
Nodes (13): BIR_LINES, BirGroup, BirLine, BirLineKey, codes, PNL, COA_TEMPLATES, FS_LINES (+5 more)

### Community 110 - "proof-upload.tsx"
Cohesion: 0.18
Nodes (17): ProofReview(), METHODS, ProofUpload(), send(), amount, date, ProofState, refresh() (+9 more)

### Community 111 - "index.ts"
Cohesion: 0.14
Nodes (15): acct(), ADVANCES_FROM, ASSETS, build(), CONTRA, COST, EQUITY, EXPENSES (+7 more)

### Community 112 - "books/export/route.ts"
Cohesion: 0.48
Nodes (6): dayBefore(), GET(), safe(), fromWorkbookData(), accountFromRow(), loadAccounts()

### Community 113 - "requireOwner"
Cohesion: 0.30
Nodes (15): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+7 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "brand/actions.ts"
Cohesion: 0.21
Nodes (11): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, BRAND_FILES, BrandFileKind, parseSection() (+3 more)

### Community 116 - "filters.tsx"
Cohesion: 0.39
Nodes (5): ClientSelect(), PeriodKey, periodRange(), PERIODS, ym()

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

### Community 121 - "brand/forms.tsx"
Cohesion: 0.29
Nodes (11): finishBrandUpload(), startBrandUpload(), BrandFileUpload(), upload(), FieldDef, FIELDS, pesoInput(), Result() (+3 more)

### Community 122 - "acting-approver/actions.ts"
Cohesion: 0.50
Nodes (6): ActingState, appointActingAction(), endActingAction(), refresh(), AppointForm(), EndButton()

### Community 123 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 815 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `manilaToday`, `package.json`, `review-form.tsx`, `cycle/page.tsx`, `dependencies`, `fees/[id]/page.tsx`, `scores/page.tsx`, `Button`, `payroll/forms.tsx`, `Card`, `manilaToday`, `statement-view.tsx`, `parties/[id]/page.tsx`, `supabaseServer`, `payroll/data.ts`, `books/page.tsx`, `Notice`, `cx`, `dropdown.tsx`, `clients/[id]/page.tsx`, `settings/page.tsx`, `stat-cards.tsx`, `quote/page.tsx`, `theme-toggle.tsx`, `filings/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `settings/actions.ts`, `social-button.tsx`, `file-upload.tsx`, `books/forms.tsx`, `breadcrumb.tsx`, `settings/page.tsx`, `proof-upload.tsx`, `filters.tsx`, `checkbox.tsx`, `brand/forms.tsx`, `acting-approver/actions.ts`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `sign-off.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09425287356321839 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `sign-off.ts`, `manilaToday`, `package.json`, `review-form.tsx`, `cycle/page.tsx`, `dependencies`, `fees/[id]/page.tsx`, `register-xlsx.ts`, `scores/page.tsx`, `payroll/forms.tsx`, `Card`, `fees/data.ts`, `manilaToday`, `parties/[id]/page.tsx`, `payroll/data.ts`, `src/app/layout.tsx`, `books/page.tsx`, `server-only`, `Notice`, `clients/[id]/page.tsx`, `books/actions.ts`, `settings/page.tsx`, `quote/page.tsx`, `form-2316.tsx`, `filings/[id]/page.tsx`, `app/app/layout.tsx`, `react`, `settings/actions.ts`, `social-button.tsx`, `books/forms.tsx`, `breadcrumb.tsx`, `proxy.ts`, `settings/page.tsx`, `proof-upload.tsx`, `books/export/route.ts`, `requireOwner`, `brand/actions.ts`, `brand/forms.tsx`, `acting-approver/actions.ts`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08376623376623377 - nodes in this community are weakly interconnected._
- **Why does `cx()` connect `form-2316.tsx` to `Building UIs with BoardUI`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Should `payroll/payroll.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1477832512315271 - nodes in this community are weakly interconnected._