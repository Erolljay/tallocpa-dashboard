# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 363 files · ~246,884 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2458 nodes · 7646 edges · 116 communities (99 shown, 17 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 86 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `248d32ff`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- Deadline Engine & Dates
- supabaseServer
- alphalist.ts
- worksheet/page.tsx
- package.json
- fields.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
- Sign-in & Setup Docs
- profile.ts
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- income.ts
- Data Model & Security Docs
- sign-in-form.tsx
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- Decisions Log
- Develop Commands
- payroll/data.ts
- scores/page.tsx
- Notice
- payroll/forms.tsx
- payroll/payroll.test.ts
- ref_node_fs
- [clientId]/page.tsx
- returns/load.ts
- fees/[id]/page.tsx
- scripts
- Centavos
- quote.ts
- Badge
- parties/[id]/page.tsx
- payroll/types.ts
- acting-approver/page.tsx
- register-xlsx.ts
- src/app/layout.tsx
- Skeleton
- ocr/run.ts
- settings/page.tsx
- money.ts
- rates.ts
- Rules
- cx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- client-form.tsx
- clients/[id]/page.tsx
- requireOwner
- template.ts
- staff/actions.ts
- Animation Performance
- payment-actions.ts
- stat-cards.tsx
- cycle/page.tsx
- theme-toggle.tsx
- settings/actions.ts
- vat.ts
- form-2316.tsx
- quote/page.tsx
- @remixicon/react
- Pro components
- notification.tsx
- cx.ts
- generate-filings/route.ts
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- [month]/page.tsx
- fees/data.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- boardui/SKILL.md
- Pro templates
- breadcrumb.tsx
- react
- checkbox.tsx
- BoardUI page patterns
- proxy.ts
- boardui
- fees/types.ts
- fees/actions.ts
- parties/parties.test.ts
- sign-off-actions.tsx
- cycle-forms.tsx
- docsWithin
- acting-approver.test.ts
- branches/actions.ts
- BoardUI theming reference
- eslint.config.mjs
- documents/period.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 161 edges
2. `cx` - 116 edges
3. `react` - 111 edges
4. `Notice()` - 104 edges
5. `Skeleton()` - 89 edges
6. `Button()` - 85 edges
7. `requireOwner()` - 85 edges
8. `next` - 85 edges
9. `Badge()` - 81 edges
10. `Card()` - 81 edges

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

## Communities (116 total, 17 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.15
Nodes (17): Event, eventText, Filing(), FilingPage(), paymentText, when(), availableActions(), FilingState (+9 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.08
Nodes (46): generateFilingsNow(), GenerateState, compareIso(), IsoDate, isWeekend(), lastDayOfMonth(), DeadlineRule, EfpsGroup (+38 more)

### Community 2 - "supabaseServer"
Cohesion: 0.12
Nodes (20): nextConfig, next, advanceFilingAction(), amount, SignOffState, stepData(), text(), ActingState (+12 more)

### Community 3 - "alphalist.ts"
Cohesion: 0.12
Nodes (31): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), branch4(), buildAlphalist() (+23 more)

### Community 4 - "worksheet/page.tsx"
Cohesion: 0.15
Nodes (23): DashboardStats(), FilingListRow, FilingTable(), Deadlines(), DeadlinesPage(), Lines(), lineStyle, Problems() (+15 more)

### Community 5 - "package.json"
Cohesion: 0.12
Nodes (22): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19 (+14 more)

### Community 6 - "fields.ts"
Cohesion: 0.08
Nodes (32): approveDocumentAction(), checkFields(), Issue, num(), msgs(), ok, FieldKey, keys (+24 more)

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

### Community 11 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (31): Doc, DocumentReviewPage(), Review(), ApprovedTable(), MonthCell(), PendingTable(), Row, Sort (+23 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "profile.ts"
Cohesion: 0.06
Nodes (50): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, startBrandUpload(), BrandFileUpload(), upload() (+42 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "income.ts"
Cohesion: 0.17
Nodes (30): comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), inputs1701Q(), inputs1702Q(), priorDiffWarning() (+22 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "sign-in-form.tsx"
Cohesion: 0.14
Nodes (19): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+11 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/data.ts"
Cohesion: 0.11
Nodes (37): @supabase/supabase-js, EmployeeDetail(), EmployeePage(), Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory (+29 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (32): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+24 more)

### Community 42 - "Notice"
Cohesion: 0.14
Nodes (42): ClientForm(), DocReviewActions(), EmployeeForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm(), PreviewTable(), PriorEmployerForm() (+34 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.13
Nodes (40): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+32 more)

### Community 44 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (25): MonthGrid(), toInput(), PayrollSetupPage(), Setup(), loadPayrollSettings(), BirCategory, Category, CATEGORY_KEYS (+17 more)

### Community 45 - "ref_node_fs"
Cohesion: 0.08
Nodes (10): pg@^8.23.1, pg, vitest, ctx, input, root, root, root (+2 more)

### Community 46 - "[clientId]/page.tsx"
Cohesion: 0.13
Nodes (34): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+26 more)

### Community 47 - "returns/load.ts"
Cohesion: 0.12
Nodes (31): recomputeWorksheetAction(), WorksheetState, GET(), LOCKED_STATUSES, ATC_MASTER, AtcInfo, normalizeAtc(), FilingRow (+23 more)

### Community 48 - "fees/[id]/page.tsx"
Cohesion: 0.22
Nodes (17): deleteDraftAction(), loadSchedule(), ActivateForm(), billingHint, DeleteDraftButton(), NewDraftForm(), PriceRow, PricesForm() (+9 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Centavos"
Cohesion: 0.11
Nodes (37): GridRow, AlphalistRow, Form2316Data, Form2316Line, AnnualSummary, annualSummary(), annualTax(), computeEmployeeYear() (+29 more)

### Community 51 - "quote.ts"
Cohesion: 0.13
Nodes (29): EstimatedProfile, GapRow, buildQuote(), cents(), CustomQuoteItem, documentBand(), EWT_NOTE, inRange() (+21 more)

### Community 52 - "Badge"
Cohesion: 0.12
Nodes (31): Payroll(), PayrollPage(), Detail(), StatementPage(), BrandSettings(), GrossReceiptsCard(), PortalClient, portalContext() (+23 more)

### Community 53 - "parties/[id]/page.tsx"
Cohesion: 0.13
Nodes (24): setPartyVerifiedAction(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), one(), PartiesPage(), PartyList() (+16 more)

### Community 54 - "payroll/types.ts"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "acting-approver/page.tsx"
Cohesion: 0.14
Nodes (26): Queue(), Row, Section(), EndButton(), Acting(), ActingApproverPage(), Approval, stateBadge (+18 more)

### Community 56 - "register-xlsx.ts"
Cohesion: 0.17
Nodes (22): file(), GET(), safe(), GET(), employeesForMonth(), loadStored(), buildEmployeeTemplate(), ID_HEADERS (+14 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "Skeleton"
Cohesion: 0.12
Nodes (29): NewEmployee(), NewEmployeePage(), ClientList(), ClientsPage(), Client, CollectionsPage(), OpenDue, Overview() (+21 more)

### Community 59 - "ocr/run.ts"
Cohesion: 0.18
Nodes (20): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), ocrProviderFromEnv(), runOcr(), runPendingOcr(), SKIP (+12 more)

### Community 60 - "settings/page.tsx"
Cohesion: 0.16
Nodes (22): periodWord, RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, PaymentSettings(), periodNote (+14 more)

### Community 61 - "money.ts"
Cohesion: 0.09
Nodes (35): lookupAtc(), AtcInfo, Split, tinDashed(), AtcTotal, docLabel(), EwtLine, ewtLines() (+27 more)

### Community 62 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 63 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (42): DropdownDivider(), DropdownGroup(), DropdownItem(), DropdownPopover(), DropdownTrigger(), InputOtp(), InputOtpProps, Kbd() (+34 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.10
Nodes (32): Dropdown(), DropdownContext, DropdownContextValue, DropdownGroupProps, DropdownItemProps, DropdownPopoverProps, DropdownProps, DropdownVariant (+24 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.10
Nodes (30): BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, VatData, agentBackground(), agentErrors() (+22 more)

### Community 68 - "vitest"
Cohesion: 0.21
Nodes (16): individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput, lineNo() (+8 more)

### Community 69 - "client-form.tsx"
Cohesion: 0.11
Nodes (27): zod@^4.6.7, zod, addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), updateClientAction() (+19 more)

### Community 70 - "clients/[id]/page.tsx"
Cohesion: 0.11
Nodes (31): FormState, removeAssignmentAction(), ClientValues, frequencyLabel, Props, StaffOptions(), EditClient(), EditClientPage() (+23 more)

### Community 71 - "requireOwner"
Cohesion: 0.29
Nodes (15): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+7 more)

### Community 72 - "template.ts"
Cohesion: 0.12
Nodes (13): estimateProfile(), has(), items, PRICES, schedule, settings, items, DOCUMENT_BANDS (+5 more)

### Community 73 - "staff/actions.ts"
Cohesion: 0.18
Nodes (14): server-only, addClientUserAction(), fieldErrors(), FormState, inviteStaffAction(), updateStaffAction(), supabaseEnv(), ensureLogin() (+6 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction() (+2 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (23): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow, shift() (+15 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.10
Nodes (26): react-dom@19.3.0, react-dom, applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle() (+18 more)

### Community 79 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 80 - "vat.ts"
Cohesion: 0.13
Nodes (41): atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), incomeAttachments(), buildSawt(), incomePayment() (+33 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.12
Nodes (30): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+22 more)

### Community 82 - "quote/page.tsx"
Cohesion: 0.23
Nodes (15): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+7 more)

### Community 83 - "@remixicon/react"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "notification.tsx"
Cohesion: 0.08
Nodes (25): AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps, CloseButtonSize, GLYPH_INSET (+17 more)

### Community 86 - "cx.ts"
Cohesion: 0.10
Nodes (18): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+10 more)

### Community 87 - "generate-filings/route.ts"
Cohesion: 0.18
Nodes (14): GET(), digestMessage(), DigestRow, longDay(), peso, time(), runActingDigest(), sendEmail() (+6 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.14
Nodes (9): outDir, pkgDir, require, { version }, api, ctx, fn, rows (+1 more)

### Community 89 - "input.tsx"
Cohesion: 0.12
Nodes (27): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+19 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.10
Nodes (30): @remixicon/react, AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, UserMenu() (+22 more)

### Community 92 - "[month]/page.tsx"
Cohesion: 0.19
Nodes (18): PayrollMonth(), PayrollMonthPage(), when(), check(), previewOf(), RegisterPreview, totals(), monthLocked() (+10 more)

### Community 93 - "fees/data.ts"
Cohesion: 0.14
Nodes (21): dateFmt, longDate(), nextEffectiveDate(), statusLabel, statusTone, Supabase, CreateFromTemplateForm(), StartNewVersionForm() (+13 more)

### Community 94 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 100 - "react"
Cohesion: 0.15
Nodes (17): react, DirectoryParty, typeLabel, AddBranchForm(), BranchRowForm(), Branches(), ReplyForm(), buttonClass() (+9 more)

### Community 101 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 102 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 103 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "fees/types.ts"
Cohesion: 0.15
Nodes (18): EngagementRow, TaxpayerType, ExistingClient, count(), first(), pick(), profileFromQuery(), QuerySource (+10 more)

### Community 106 - "fees/actions.ts"
Cohesion: 0.26
Nodes (15): activateAction(), createFromTemplateAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction(), startNewVersionAction() (+7 more)

### Community 107 - "parties/parties.test.ts"
Cohesion: 0.24
Nodes (14): displayName(), fullAddress(), listNameCols(), Party, partyTinLabel(), person, ABBREVIATIONS, nameTokens() (+6 more)

### Community 108 - "sign-off-actions.tsx"
Cohesion: 0.26
Nodes (11): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), SignOffActions() (+3 more)

### Community 109 - "cycle-forms.tsx"
Cohesion: 0.35
Nodes (10): CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction(), CycleState, decideExceptionAction(), nothingToSubmitAction(), refresh() (+2 more)

### Community 110 - "docsWithin"
Cohesion: 0.47
Nodes (9): Periods, periods(), addMonths(), docsWithin(), monthEnd(), monthWithin(), pad2(), quarterOf() (+1 more)

### Community 111 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 112 - "branches/actions.ts"
Cohesion: 0.48
Nodes (6): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), branchUpdateSchema

### Community 113 - "BoardUI theming reference"
Cohesion: 0.33
Nodes (6): Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 114 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 115 - "documents/period.ts"
Cohesion: 0.47
Nodes (4): PeriodKey, periodRange(), PERIODS, ym()

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 756 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `filings/[id]/page.tsx`, `worksheet/page.tsx`, `package.json`, `app/documents/page.tsx`, `profile.ts`, `dependencies`, `sign-in-form.tsx`, `payroll/data.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `payroll/payroll.test.ts`, `[clientId]/page.tsx`, `fees/[id]/page.tsx`, `Badge`, `parties/[id]/page.tsx`, `acting-approver/page.tsx`, `Skeleton`, `settings/page.tsx`, `cx`, `dropdown.tsx`, `client-form.tsx`, `clients/[id]/page.tsx`, `stat-cards.tsx`, `cycle/page.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `quote/page.tsx`, `@remixicon/react`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `[month]/page.tsx`, `fees/data.ts`, `social-button.tsx`, `file-upload.tsx`, `breadcrumb.tsx`, `checkbox.tsx`, `sign-off-actions.tsx`, `cycle-forms.tsx`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.07832080200501253 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `worksheet/page.tsx`, `package.json`, `app/documents/page.tsx`, `profile.ts`, `dependencies`, `sign-in-form.tsx`, `payroll/data.ts`, `scores/page.tsx`, `Notice`, `payroll/forms.tsx`, `[clientId]/page.tsx`, `returns/load.ts`, `fees/[id]/page.tsx`, `Badge`, `parties/[id]/page.tsx`, `acting-approver/page.tsx`, `register-xlsx.ts`, `src/app/layout.tsx`, `Skeleton`, `ocr/run.ts`, `settings/page.tsx`, `client-form.tsx`, `clients/[id]/page.tsx`, `requireOwner`, `staff/actions.ts`, `payment-actions.ts`, `cycle/page.tsx`, `settings/actions.ts`, `form-2316.tsx`, `quote/page.tsx`, `generate-filings/route.ts`, `app/app/layout.tsx`, `[month]/page.tsx`, `fees/data.ts`, `breadcrumb.tsx`, `react`, `proxy.ts`, `fees/actions.ts`, `sign-off-actions.tsx`, `cycle-forms.tsx`, `branches/actions.ts`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.12096774193548387 - nodes in this community are weakly interconnected._
- **Why does `vitest` connect `ref_node_fs` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `package.json`, `fields.ts`, `app/documents/page.tsx`, `profile.ts`, `sign-in-form.tsx`, `payroll/data.ts`, `scores/page.tsx`, `payroll/payroll.test.ts`, `[clientId]/page.tsx`, `returns/load.ts`, `quote.ts`, `acting-approver/page.tsx`, `settings/page.tsx`, `money.ts`, `rates.ts`, `vitest`, `client-form.tsx`, `clients/[id]/page.tsx`, `template.ts`, `staff/actions.ts`, `cycle/page.tsx`, `settings/actions.ts`, `generate-filings/route.ts`, `document-scanner.tsx`, `fees/actions.ts`, `parties/parties.test.ts`, `acting-approver.test.ts`, `documents/period.ts`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `alphalist.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11861861861861862 - nodes in this community are weakly interconnected._