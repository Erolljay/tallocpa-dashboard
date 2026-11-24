# Graph Report - tallocpa-dashboard  (2026-11-24)

## Corpus Check
- 346 files · ~235,151 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: .css 5, (none) 4, .mdc 1)

## Summary
- 2368 nodes · 7329 edges · 103 communities (87 shown, 16 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 83 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `108a4394`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- filings/[id]/page.tsx
- Deadline Engine & Dates
- supabaseServer
- income.ts
- Skeleton
- package.json
- review-form.tsx
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- app/documents/page.tsx
- Sign-in & Setup Docs
- supabaseServer
- Sign-off, Ledger & Payments
- dependencies
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- copy-opencv.mjs
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
- ui.tsx
- scores/page.tsx
- [clientId]/page.tsx
- payroll/forms.tsx
- db.test.ts
- notification.tsx
- react
- Centavos
- scripts
- Centavos
- proxy.ts
- rows.ts
- eslint.config.mjs
- cx
- vitest
- input.tsx
- src/app/layout.tsx
- next
- money.ts
- apply.ts
- returns/types.ts
- quote.ts
- sign-off-actions.tsx
- cx
- dropdown.tsx
- returns/types.ts
- income.ts
- fees/[id]/page.tsx
- testing.ts
- payroll/types.ts
- qap.ts
- payroll/data.ts
- react
- parties/[id]/page.tsx
- payment-actions.ts
- stat-cards.tsx
- gap.ts
- theme-toggle.tsx
- vat.ts
- form-2316.tsx
- clients/[id]/page.tsx
- button.tsx
- Pro components
- notification.tsx
- cx.ts
- settings/actions.ts
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- rates.ts
- schedule.ts
- social-button.tsx
- Recipes
- file-upload.tsx
- BoardUI theming reference
- Pro templates
- breadcrumb.tsx
- cycle/run.ts
- checkbox.tsx
- BoardUI page patterns
- proxy.ts
- boardui

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 150 edges
2. `cx` - 116 edges
3. `react` - 107 edges
4. `Notice()` - 96 edges
5. `Skeleton()` - 85 edges
6. `next` - 81 edges
7. `Button()` - 79 edges
8. `Free components` - 79 edges
9. `Card()` - 77 edges
10. `Badge()` - 77 edges

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

## Communities (103 total, 16 thin omitted)

### Community 0 - "filings/[id]/page.tsx"
Cohesion: 0.15
Nodes (17): Event, eventText, Filing(), FilingPage(), paymentText, when(), ACTION_LABEL, availableActions() (+9 more)

### Community 1 - "Deadline Engine & Dates"
Cohesion: 0.06
Nodes (67): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote, Rule, addDays() (+59 more)

### Community 2 - "supabaseServer"
Cohesion: 0.09
Nodes (39): nextConfig, next, Deadlines(), DeadlinesPage(), DocumentReviewPage(), Review(), advanceFilingAction(), amount (+31 more)

### Community 3 - "income.ts"
Cohesion: 0.16
Nodes (28): comparisonSchedule(), compute1701Q(), compute1702Q(), costsOf(), cwt(), inputs1701Q(), inputs1702Q(), priorDiffWarning() (+20 more)

### Community 4 - "Skeleton"
Cohesion: 0.10
Nodes (46): Certificates(), Form2316Page(), ClientList(), ClientsPage(), DashboardPage(), OwnerView(), Summary(), NewParty() (+38 more)

### Community 5 - "package.json"
Cohesion: 0.10
Nodes (26): eslintConfig, devDependencies, eslint@^9, eslint-config-next@16.4.6, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20 (+18 more)

### Community 6 - "review-form.tsx"
Cohesion: 0.13
Nodes (25): approveDocumentAction(), DirectoryParty, typeLabel, ALLOWED, DocActionState, replyDocumentAction(), reviewDocumentAction(), runOcrAction() (+17 more)

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
Cohesion: 0.05
Nodes (72): Doc, DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, ExceptionRow (+64 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "supabaseServer"
Cohesion: 0.06
Nodes (43): BrandSettingsState, FieldDef, FIELDS, pesoInput(), SUBMIT, BRAND_FILES, BrandFileKind, birSchema (+35 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+8 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "copy-opencv.mjs"
Cohesion: 0.25
Nodes (6): @techstark/opencv-js@4.12.0-release.1, @techstark/opencv-js, outDir, pkgDir, require, { version }

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "sign-in-form.tsx"
Cohesion: 0.21
Nodes (14): GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode(), errors (+6 more)

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
Cohesion: 0.14
Nodes (30): server-only, @supabase/supabase-js, EmployeeDetail(), EmployeePage(), check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction() (+22 more)

### Community 41 - "ui.tsx"
Cohesion: 0.10
Nodes (38): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+30 more)

### Community 42 - "scores/page.tsx"
Cohesion: 0.14
Nodes (45): react, DocReviewActions(), AssignForm(), ClientUserForm(), EngagementForm(), EmployeeUpload(), ItemForm(), PayrollSettingsForm() (+37 more)

### Community 43 - "[clientId]/page.tsx"
Cohesion: 0.11
Nodes (47): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+39 more)

### Community 44 - "payroll/forms.tsx"
Cohesion: 0.12
Nodes (32): MonthGrid(), toInput(), annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), differsFromSuggestion(), employeeContributions() (+24 more)

### Community 45 - "db.test.ts"
Cohesion: 0.08
Nodes (11): pg@^8.23.1, vitest@^5.1.1, pg, vitest, ctx, input, root, root (+3 more)

### Community 46 - "notification.tsx"
Cohesion: 0.12
Nodes (36): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), AddChargeForm(), ApplyCreditButton(), BillingDaysForm() (+28 more)

### Community 47 - "react"
Cohesion: 0.11
Nodes (28): ATC_MASTER, AtcInfo, normalizeAtc(), EwtLine, FilingRow, ListedDocument, loadWorksheet(), PAYROLL_FORM_CODES (+20 more)

### Community 48 - "Centavos"
Cohesion: 0.13
Nodes (34): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+26 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "Centavos"
Cohesion: 0.06
Nodes (65): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+57 more)

### Community 51 - "proxy.ts"
Cohesion: 0.12
Nodes (24): PriceRow, buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos() (+16 more)

### Community 52 - "rows.ts"
Cohesion: 0.10
Nodes (39): Client, CollectionsPage(), OpenDue, Overview(), RunBilling(), Stat(), Detail(), StatementPage() (+31 more)

### Community 53 - "eslint.config.mjs"
Cohesion: 0.11
Nodes (33): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+25 more)

### Community 54 - "cx"
Cohesion: 0.11
Nodes (23): exceljs, cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow (+15 more)

### Community 55 - "vitest"
Cohesion: 0.13
Nodes (15): OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider(), call() (+7 more)

### Community 56 - "input.tsx"
Cohesion: 0.18
Nodes (19): file(), GET(), safe(), buildEmployeeTemplate(), sortItems(), ID_HEADERS, registerHeaders(), TOTAL_HEADERS (+11 more)

### Community 57 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 58 - "next"
Cohesion: 0.30
Nodes (8): GET(), generateFilingsNow(), GenerateState, GenerateButton(), supabaseEnv(), runFilingGeneration(), runPendingOcr(), supabaseAdmin()

### Community 59 - "money.ts"
Cohesion: 0.19
Nodes (15): Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings(), amountText() (+7 more)

### Community 60 - "apply.ts"
Cohesion: 0.15
Nodes (20): RegisterPreview, BirCategory, Category, DEDUCTION_FIELDS, DEFAULT_ITEMS, EARNING_FIELDS, KIND_ORDER, PayrollItem (+12 more)

### Community 61 - "returns/types.ts"
Cohesion: 0.07
Nodes (56): lookupAtc(), BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q, VatData, agentBackground() (+48 more)

### Community 62 - "quote.ts"
Cohesion: 0.23
Nodes (14): zod, runOcr(), SKIP, lookupParties(), blank(), optionalText(), PartyInput, partySchema (+6 more)

### Community 63 - "sign-off-actions.tsx"
Cohesion: 0.29
Nodes (10): checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView(), SignOffActions() (+2 more)

### Community 64 - "cx"
Cohesion: 0.06
Nodes (42): DropdownDivider(), DropdownGroup(), DropdownItem(), DropdownPopover(), DropdownTrigger(), InputOtp(), InputOtpProps, Kbd() (+34 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.09
Nodes (35): react-aria-components, Dropdown(), DropdownContext, DropdownContextValue, DropdownGroupProps, DropdownItemProps, DropdownPopoverProps, DropdownProps (+27 more)

### Community 66 - "returns/types.ts"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "income.ts"
Cohesion: 0.31
Nodes (14): incomeAttachments(), Periods, periods(), REGIMES, sawtAttachments(), SawtResult, addMonths(), docsWithin() (+6 more)

### Community 68 - "fees/[id]/page.tsx"
Cohesion: 0.21
Nodes (16): individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput, lineNo() (+8 more)

### Community 69 - "testing.ts"
Cohesion: 0.11
Nodes (30): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), FormState, updateClientAction(), ClientForm(), ClientValues (+22 more)

### Community 70 - "payroll/types.ts"
Cohesion: 0.21
Nodes (14): removeAssignmentAction(), RemoveAssignmentButton(), RemoveClientUserButton(), StatusButton(), ClientDetail(), ClientPage(), fmtDate(), frequencyLabel (+6 more)

### Community 71 - "qap.ts"
Cohesion: 0.12
Nodes (36): setClientStatusAction(), addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction() (+28 more)

### Community 72 - "payroll/data.ts"
Cohesion: 0.13
Nodes (19): count(), first(), pick(), profileFromQuery(), QuerySource, items, DOCUMENT_BANDS, EMPLOYEE_BANDS (+11 more)

### Community 73 - "react"
Cohesion: 0.22
Nodes (9): NewEmployee(), NewEmployeePage(), EmployeeForm(), buttonClass(), ButtonStyle, control, noticeTones, tones (+1 more)

### Community 74 - "parties/[id]/page.tsx"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "payment-actions.ts"
Cohesion: 0.33
Nodes (10): accountSchema, addPaymentAccountAction(), QR_TYPES, refresh(), replaceQrAction(), setAccountActiveAction(), setPaymentDaysAction(), text() (+2 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (34): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+26 more)

### Community 77 - "gap.ts"
Cohesion: 0.15
Nodes (19): EngagementRow, TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow, has() (+11 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): @remixicon/react@^4.9.0, @remixicon/react, Nav(), PortalLayout(), baseTabs, payrollTab, PortalNav(), applyTheme() (+26 more)

### Community 80 - "vat.ts"
Cohesion: 0.15
Nodes (37): AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc(), buildSawt(), incomePayment() (+29 more)

### Community 81 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 82 - "clients/[id]/page.tsx"
Cohesion: 0.26
Nodes (9): Queue(), ReviewPage(), Row, Section(), QueueFiling, QueueViewer, ReviewQueue, reviewQueue() (+1 more)

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
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 88 - "settings/actions.ts"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.13
Nodes (24): HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps, inputElementClassName (+16 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.16
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+9 more)

### Community 92 - "rates.ts"
Cohesion: 0.26
Nodes (15): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+7 more)

### Community 93 - "schedule.ts"
Cohesion: 0.16
Nodes (14): conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow, FeeScheduleRow, num(), optionalAmount, range (+6 more)

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

### Community 99 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 100 - "cycle/run.ts"
Cohesion: 0.33
Nodes (7): sendEmail(), cycleMessage(), dayFmt, NoticeKind, showDay(), Due, runDocumentCycles()

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

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 726 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `scores/page.tsx` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `supabaseServer`, `Skeleton`, `package.json`, `review-form.tsx`, `app/documents/page.tsx`, `supabaseServer`, `dependencies`, `sign-in-form.tsx`, `payroll/data.ts`, `ui.tsx`, `[clientId]/page.tsx`, `notification.tsx`, `Centavos`, `rows.ts`, `eslint.config.mjs`, `next`, `money.ts`, `sign-off-actions.tsx`, `cx`, `dropdown.tsx`, `testing.ts`, `payroll/types.ts`, `react`, `stat-cards.tsx`, `theme-toggle.tsx`, `form-2316.tsx`, `clients/[id]/page.tsx`, `button.tsx`, `notification.tsx`, `cx.ts`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `social-button.tsx`, `file-upload.tsx`, `breadcrumb.tsx`, `checkbox.tsx`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `filings/[id]/page.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14761904761904762 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `filings/[id]/page.tsx`, `Deadline Engine & Dates`, `Skeleton`, `package.json`, `review-form.tsx`, `app/documents/page.tsx`, `supabaseServer`, `dependencies`, `sign-in-form.tsx`, `payroll/data.ts`, `ui.tsx`, `scores/page.tsx`, `[clientId]/page.tsx`, `notification.tsx`, `Centavos`, `rows.ts`, `eslint.config.mjs`, `input.tsx`, `src/app/layout.tsx`, `next`, `money.ts`, `sign-off-actions.tsx`, `testing.ts`, `payroll/types.ts`, `qap.ts`, `react`, `payment-actions.ts`, `theme-toggle.tsx`, `form-2316.tsx`, `clients/[id]/page.tsx`, `app/app/layout.tsx`, `breadcrumb.tsx`, `proxy.ts`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `Deadline Engine & Dates` be split into smaller, more focused modules?**
  _Cohesion score 0.056022408963585436 - nodes in this community are weakly interconnected._
- **Should `supabaseServer` be split into smaller, more focused modules?**
  _Cohesion score 0.08831168831168831 - nodes in this community are weakly interconnected._
- **Should `Skeleton` be split into smaller, more focused modules?**
  _Cohesion score 0.09764309764309764 - nodes in this community are weakly interconnected._