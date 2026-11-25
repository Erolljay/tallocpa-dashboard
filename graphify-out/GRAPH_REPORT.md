# Graph Report - tallocpa-dashboard  (2026-11-25)

## Corpus Check
- 567 files · ~438,414 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 14 file(s) not represented in the graph (top: .css 6, (none) 4, .mdc 1)

## Summary
- 3660 nodes · 12246 edges · 163 communities (142 shown, 21 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 115 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `f6e4001a`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ui.tsx
- engine.ts
- migrate.yml
- notification.tsx
- arap.ts
- package.json
- gemini.ts
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- requireStaff
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
- payroll/register.ts
- scores/page.tsx
- parties/[id]/page.tsx
- payroll/forms.tsx
- clients/[id]/page.tsx
- parties/actions.ts
- payrollAccess
- requireOwner
- profile.ts
- scripts
- income.ts
- Centavos
- batch/register.ts
- ledger/data.ts
- payroll/data.ts
- documents/labels.ts
- payroll/payroll.test.ts
- requireOwner
- form-1601eq.ts
- Button
- year/[year]/page.tsx
- collections/page.tsx
- fixed-assets.test.ts
- workpapers/page.tsx
- tabs.tsx
- dropdown.tsx
- Apple Design
- returns/types.ts
- vitest
- file-upload.tsx
- ref_node_fs
- books/forms.tsx
- obligations.ts
- Rules
- Animation Performance
- opening-checklist.tsx
- stat-cards.tsx
- deadlines/page.tsx
- theme-toggle.tsx
- quote.ts
- filings/actions.ts
- Card
- requireStaff
- button.tsx
- Pro components
- cx.ts
- [clientId]/page.tsx
- showMonth
- generate-qap-fixture.mjs
- input.tsx
- document-scanner.tsx
- app/app/layout.tsx
- form-2316.tsx
- gap/page.tsx
- opening.ts
- Recipes
- ledger-lock.test.ts
- BoardUI theming reference
- Pro templates
- supabaseServer
- print/page.tsx
- fees/data.ts
- register-xlsx.ts
- registrations/forms.tsx
- boardui
- rates.ts
- Textarea
- format.ts
- db.test.ts
- settings/actions.ts
- fees/[id]/page.tsx
- Opening balances: checklist for any cut-off
- buildSawt
- branches.ts
- acting-approver.test.ts
- Notice
- Badge
- apply-migrations.sh
- cycle/page.tsx
- fees/types.ts
- social-button.tsx
- returns/load.ts
- work/load.ts
- Card
- Staff and Owner UX review (Phase 1)
- sign-off.ts
- [token]/page.tsx
- documents/[id]/page.tsx
- leads/[id]/page.tsx
- checkbox.tsx
- breadcrumb.tsx
- proof-actions.ts
- quote/page.tsx
- workpapers/load.ts
- binder/page.tsx
- book-income.ts
- app/documents/page.tsx
- src/app/layout.tsx
- document-upload.tsx
- ledger.test.ts
- vitest
- social-button.tsx
- proxy.ts
- proposal-view.tsx
- business.ts
- Building UIs with BoardUI
- books/reports/page.tsx
- eslint.config.mjs
- fields.ts
- manilaToday
- copy-opencv.mjs
- react
- post-button.tsx
- names.ts
- any-cutoff.test.ts
- ledger-closing.test.ts
- staff/actions.ts
- server-only
- ledger-documents.test.ts
- month-complete.test.ts
- tieouts.test.ts
- tests/parties.test.ts
- workpapers.test.ts

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 252 edges
2. `Notice()` - 174 edges
3. `cx` - 161 edges
4. `Button()` - 160 edges
5. `react` - 158 edges
6. `Skeleton()` - 143 edges
7. `next` - 139 edges
8. `Card()` - 136 edges
9. `Badge()` - 133 edges
10. `Input()` - 114 edges

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

## Communities (163 total, 21 thin omitted)

### Community 0 - "ui.tsx"
Cohesion: 0.10
Nodes (25): DocReviewActions(), ExplainForm(), SignOffState, AmendFilingForm(), checkTone, checkWord, needsNote(), noteLabel() (+17 more)

### Community 1 - "engine.ts"
Cohesion: 0.09
Nodes (44): Rule, TimelineFiling, TimelineItem, compareIso(), IsoDate, lastDayOfMonth(), DeadlineRule, DueRule (+36 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "notification.tsx"
Cohesion: 0.08
Nodes (27): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, CloseButton(), CloseButtonProps (+19 more)

### Community 4 - "arap.ts"
Cohesion: 0.14
Nodes (21): exceljs, accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate (+13 more)

### Community 5 - "package.json"
Cohesion: 0.11
Nodes (23): devDependencies, pg@^8.23.1, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19 (+15 more)

### Community 6 - "gemini.ts"
Cohesion: 0.13
Nodes (16): OCR_READ_FIELDS, OcrOutput, BACKOFF, base64(), DEFAULT_FALLBACK_MODEL, DEFAULT_GEMINI_MODEL, GeminiError, geminiProvider() (+8 more)

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

### Community 11 - "requireStaff"
Cohesion: 0.12
Nodes (41): StepBadge(), StepRow, YearRenewalsForm(), caseStatus, fmt(), Registration(), RegistrationPage(), SlipCell() (+33 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "onboarding/page.tsx"
Cohesion: 0.12
Nodes (29): addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction(), startClientFileUpload(), tickOnboardingAction(), ClientFileForm() (+21 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, motion@^12.43.0, next@16.4.6, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): defaultCashFlow(), loadStatements(), FS_LINES, FsLine, FsLineKey, isFsLine(), Section, Statement (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "vat.ts"
Cohesion: 0.16
Nodes (37): Periods, periods(), sawtAttachments(), sawtCsv(), sawtDat(), SawtForm, SawtRow, addMonths() (+29 more)

### Community 21 - "Moxie Migration & Phasing"
Cohesion: 0.40
Nodes (4): Remove TEST Clients Before Go-Live, Migration from Moxie, Out of Scope for Phase 1, Phasing (1A Compliance, 1B Bookkeeping, 2 Growth, 3 Money)

### Community 22 - "Capacity & Open Items"
Cohesion: 0.40
Nodes (5): Tallo CPA Brand Design System, Open Items (O1-O10), Staff Capacity: Load Points = Retainer / P1,000 (rule of thirds), Starting BIR Forms Table, Staff Page: Capacity and Load

### Community 23 - "Product Spec Root"
Cohesion: 1.00
Nodes (3): Decisions Q1-Q61 (DECISIONS.md), TalloCPA OS Product Specification, TalloCPA OS

### Community 40 - "payroll/register.ts"
Cohesion: 0.15
Nodes (19): check(), PortalPayrollState, previewPortalPayrollAction(), submitPortalPayrollAction(), RegisterPreview, lastDay(), PAY_PERIODS, PayPeriod (+11 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.12
Nodes (33): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+25 more)

### Community 42 - "parties/[id]/page.tsx"
Cohesion: 0.23
Nodes (15): setPartyVerifiedAction(), MergeForm(), PartyForm(), PresetAccountForm(), VerifyButton(), fmtDate(), PartyDetail(), PartyPage() (+7 more)

### Community 43 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (59): deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), FormState, friendly(), previewEmployeesAction(), RegisterState (+51 more)

### Community 44 - "clients/[id]/page.tsx"
Cohesion: 0.22
Nodes (15): FormState, removeAssignmentAction(), StaffOptions(), ClientTab, ClientTabs(), AssignForm(), ClientUserForm(), RemoveAssignmentButton() (+7 more)

### Community 45 - "parties/actions.ts"
Cohesion: 0.19
Nodes (18): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), setPresetAccountAction(), normalizeTin(), SKIP, lookupParties() (+10 more)

### Community 46 - "payrollAccess"
Cohesion: 0.15
Nodes (32): checkEmployeeFile(), fileOf(), postSubmissionAction(), previewRegisterAction(), saveMonthAction(), saveRegisterAction(), file(), GET() (+24 more)

### Community 47 - "requireOwner"
Cohesion: 0.27
Nodes (14): addChargeAction(), applyCreditAction(), date, depositSchema, MoneyState, peso, recordDepositAction(), refresh() (+6 more)

### Community 48 - "profile.ts"
Cohesion: 0.07
Nodes (41): BrandSettingsState, refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, BRAND_FILES, BrandFileKind, birSchema (+33 more)

### Community 49 - "scripts"
Cohesion: 0.20
Nodes (10): scripts, build, db:seed:generate, dev, lint, postinstall, start, test (+2 more)

### Community 50 - "income.ts"
Cohesion: 0.11
Nodes (59): balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT(), penalties() (+51 more)

### Community 51 - "Centavos"
Cohesion: 0.14
Nodes (19): amt(), ApprovalMemo(), Db, TIE, EntryLine, RegisterTotals, TaxLine, SlpRow (+11 more)

### Community 52 - "batch/register.ts"
Cohesion: 0.09
Nodes (38): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+30 more)

### Community 53 - "ledger/data.ts"
Cohesion: 0.08
Nodes (37): BookEntry, CASH_FLOW_CLASSES, CashFlowClass, codes, PNL, acct(), ADVANCES_FROM, ASSETS (+29 more)

### Community 54 - "payroll/data.ts"
Cohesion: 0.11
Nodes (39): AlphaCols, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+31 more)

### Community 55 - "documents/labels.ts"
Cohesion: 0.14
Nodes (20): Doc, ExceptionRow, Row, Doc, Documents(), FolderKey, FOLDERS, Item (+12 more)

### Community 56 - "payroll/payroll.test.ts"
Cohesion: 0.12
Nodes (29): annualSummary(), annualTax(), computeEmployeeYear(), dateForYear(), employeeContributions(), grossCompensation(), MonthLines, monthlyTable() (+21 more)

### Community 57 - "requireOwner"
Cohesion: 0.09
Nodes (36): addEngagementAction(), assignStaffAction(), createClientAction(), fieldErrors(), setClientStatusAction(), setupMissingChartsAction(), updateClientAction(), NewClientPage() (+28 more)

### Community 58 - "form-1601eq.ts"
Cohesion: 0.07
Nodes (50): Split, VatData, agentBackground(), agentErrors(), tinDashed(), atcSchedule(), detailSchedule(), docLabel() (+42 more)

### Community 59 - "Button"
Cohesion: 0.08
Nodes (68): AmendmentDecision(), AmendmentRequestForm(), ArapDecision(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm(), ConfirmAllButton() (+60 more)

### Community 60 - "year/[year]/page.tsx"
Cohesion: 0.31
Nodes (9): release2316Action(), Release2316Form(), yearWorksheet(), PayrollYear(), PayrollYearPage(), when(), load2316Release(), loadPayrollSettings() (+1 more)

### Community 61 - "collections/page.tsx"
Cohesion: 0.20
Nodes (18): Client, OpenDue, Overview(), Stat(), ageOpenItems(), AGING_BUCKETS, AgingBucket, agingBucket() (+10 more)

### Community 62 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 63 - "workpapers/page.tsx"
Cohesion: 0.17
Nodes (22): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+14 more)

### Community 64 - "tabs.tsx"
Cohesion: 0.08
Nodes (33): InputOtp(), InputOtpProps, Kbd(), KbdProps, SegmentedControl(), SegmentedControlItem(), SegmentedControlItemProps, SegmentedControlProps (+25 more)

### Community 65 - "dropdown.tsx"
Cohesion: 0.08
Nodes (38): Dropdown(), DropdownContext, DropdownContextValue, DropdownDivider(), DropdownGroup(), DropdownGroupProps, DropdownItem(), DropdownItemProps (+30 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "returns/types.ts"
Cohesion: 0.09
Nodes (38): alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4(), buildAlphalist() (+30 more)

### Community 68 - "vitest"
Cohesion: 0.18
Nodes (18): year, individual, individual, amounts(), cert2307(), ctxFor(), doc(), DocInput (+10 more)

### Community 69 - "file-upload.tsx"
Cohesion: 0.26
Nodes (12): DEFAULT_EXTENSIONS, DefaultFileIcon(), extensionFor(), FileUpload(), FileUploadProps, formatFileSize(), ringPath(), staggerContainer() (+4 more)

### Community 70 - "ref_node_fs"
Cohesion: 0.10
Nodes (7): ctx, input, root, HASH, LEAD, root, root

### Community 71 - "books/forms.tsx"
Cohesion: 0.18
Nodes (37): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+29 more)

### Community 72 - "obligations.ts"
Cohesion: 0.23
Nodes (15): ClientForm(), ClientValues, frequencyLabel, Props, EditClient(), EditClientPage(), obligationChanges(), obligationsForTaxTypes() (+7 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "opening-checklist.tsx"
Cohesion: 0.18
Nodes (15): Access, STATUS, Cutoff, cutoffOf(), PNL_TYPES, ChecklistInput, ChecklistItem, ItemStatus (+7 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.07
Nodes (33): DashboardStat, icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard(), IconComponent (+25 more)

### Community 77 - "deadlines/page.tsx"
Cohesion: 0.07
Nodes (50): generateFilingsNow(), GenerateState, GenerateButton(), BoardTable(), Deadlines(), DeadlinesPage(), one(), TONE (+42 more)

### Community 78 - "theme-toggle.tsx"
Cohesion: 0.08
Nodes (34): Nav(), PortalLayout(), baseTabs, GRID_COLS, payrollTab, PortalNav(), registrationTab, reportsTab (+26 more)

### Community 79 - "quote.ts"
Cohesion: 0.13
Nodes (23): buildQuote(), cents(), CustomQuoteItem, EWT_NOTE, inRange(), matches(), pesos(), QuoteLine (+15 more)

### Community 80 - "filings/actions.ts"
Cohesion: 0.18
Nodes (17): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+9 more)

### Community 81 - "Card"
Cohesion: 0.12
Nodes (33): HolidayForm(), periodWord, RemoveHolidayButton(), RuleEditor(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel (+25 more)

### Community 82 - "requireStaff"
Cohesion: 0.08
Nodes (50): DashboardStats(), FilingListRow, FilingTable(), Event, eventText, paymentText, when(), PaymentCheck (+42 more)

### Community 83 - "button.tsx"
Cohesion: 0.07
Nodes (32): Button(), ButtonLink(), ButtonLinkProps, ButtonProps, ButtonSize, buttonStyles, ButtonVariant, IconComponent (+24 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "cx.ts"
Cohesion: 0.08
Nodes (22): CHIP_COLORS, ChipColor, ChipProps, ChipVariant, styles, Counter(), CounterColor, CounterProps (+14 more)

### Community 86 - "[clientId]/page.tsx"
Cohesion: 0.21
Nodes (15): ClientCollectionsPage(), Deposit, Detail(), Due, maskNumber(), ApplyCreditButton(), OpenItem, PaymentAccount (+7 more)

### Community 87 - "showMonth"
Cohesion: 0.15
Nodes (25): MonthComplete(), SentRow, TimelineRow, Home(), KINDS, manilaDay(), MonthCard(), PortalHome() (+17 more)

### Community 88 - "generate-qap-fixture.mjs"
Cohesion: 0.29
Nodes (5): api, ctx, fn, rows, src

### Community 89 - "input.tsx"
Cohesion: 0.10
Nodes (30): react-aria-components, HintText(), hintTextClassName(), HintTextProps, IconComponent, Input(), InputBase(), InputBaseProps (+22 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "app/app/layout.tsx"
Cohesion: 0.16
Nodes (17): AppLayout(), nav, ownerNav, OwnerNavLinks(), reviewNav, roleLabel, items, Links() (+9 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.23
Nodes (15): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+7 more)

### Community 93 - "gap/page.tsx"
Cohesion: 0.19
Nodes (15): EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor(), GapRow (+7 more)

### Community 94 - "opening.ts"
Cohesion: 0.15
Nodes (18): CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf(), TbRow (+10 more)

### Community 95 - "Recipes"
Cohesion: 0.14
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 97 - "BoardUI theming reference"
Cohesion: 0.12
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "supabaseServer"
Cohesion: 0.11
Nodes (24): nextConfig, next, addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), approveDocumentAction() (+16 more)

### Community 100 - "print/page.tsx"
Cohesion: 0.08
Nodes (48): dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), dayBefore(), fmtDate(), Pad() (+40 more)

### Community 101 - "fees/data.ts"
Cohesion: 0.09
Nodes (28): dateFmt, statusLabel, statusTone, Supabase, SERVICES, StartState, QuerySource, conditionsSchema (+20 more)

### Community 102 - "register-xlsx.ts"
Cohesion: 0.23
Nodes (15): GET(), PayrollItem, sortItems(), registerHeaders(), buildRegisterTemplate(), cellText(), GROUP_COLORS, MONTHS (+7 more)

### Community 103 - "registrations/forms.tsx"
Cohesion: 0.06
Nodes (59): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openYearRenewalsAction() (+51 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "rates.ts"
Cohesion: 0.22
Nodes (20): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), osdRate() (+12 more)

### Community 106 - "Textarea"
Cohesion: 0.17
Nodes (22): @remixicon/react, PortalRequest(), RequestDetail(), CloseRequestButton(), ReplyForm(), send(), Thread(), ThreadMessage (+14 more)

### Community 107 - "format.ts"
Cohesion: 0.13
Nodes (26): datAddress(), displayName(), fullAddress(), listNameCols(), Names, Party, PARTY_COLUMNS, PARTY_ROLES (+18 more)

### Community 108 - "db.test.ts"
Cohesion: 0.21
Nodes (4): seedHolidays, buildSeedSql(), q(), root

### Community 109 - "settings/actions.ts"
Cohesion: 0.23
Nodes (13): addHolidayAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction(), checkbox (+5 more)

### Community 110 - "fees/[id]/page.tsx"
Cohesion: 0.16
Nodes (30): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+22 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "buildSawt"
Cohesion: 0.39
Nodes (7): lookupAtc(), AtcInfo, atcInfo(), AtcKind, atcKind(), BUSINESS_TAX_ATCS, normalizeAtc()

### Community 113 - "branches.ts"
Cohesion: 0.22
Nodes (11): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), Branch, branchSchema, branchUpdateSchema (+3 more)

### Community 114 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 115 - "Notice"
Cohesion: 0.19
Nodes (18): BatchUpload(), PreviewTable(), Batch(), BatchPage(), one(), toCentavos(), PreviewTable(), RegisterUpload() (+10 more)

### Community 116 - "Badge"
Cohesion: 0.13
Nodes (28): PendingReview(), finishBrandUpload(), startBrandUpload(), BrandFileUpload(), upload(), FieldDef, FIELDS, pesoInput() (+20 more)

### Community 118 - "cycle/page.tsx"
Cohesion: 0.13
Nodes (29): DocumentsCard(), when(), Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CloseCycleButton() (+21 more)

### Community 119 - "fees/types.ts"
Cohesion: 0.12
Nodes (21): count(), first(), pick(), profileFromQuery(), items, QuoteInput, DOCUMENT_BANDS, EMPLOYEE_BANDS (+13 more)

### Community 120 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 121 - "returns/load.ts"
Cohesion: 0.06
Nodes (67): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), recomputeWorksheetAction(), WorksheetState (+59 more)

### Community 122 - "work/load.ts"
Cohesion: 0.18
Nodes (19): Action(), MyWork(), MyWorkPage(), short(), TONE, lastMonth(), loadMyWork(), MyWork (+11 more)

### Community 123 - "Card"
Cohesion: 0.14
Nodes (32): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+24 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "sign-off.ts"
Cohesion: 0.17
Nodes (13): ACTION_LABEL, availableActions(), FilingState, SIGN_OFF_STEPS, SignOffAction, stepIndex(), client, owner (+5 more)

### Community 126 - "[token]/page.tsx"
Cohesion: 0.27
Nodes (10): metadata, Proposal(), ProposalPage(), metadata, Start(), StartPage(), Lockup(), Mark() (+2 more)

### Community 127 - "documents/[id]/page.tsx"
Cohesion: 0.29
Nodes (8): BOOKED_TYPES, DocumentReviewPage(), loadBooking(), Review(), Booking, LOCKED_STATUSES, LockFiling, lockingFiling()

### Community 128 - "leads/[id]/page.tsx"
Cohesion: 0.29
Nodes (8): FunnelSwitch(), LeadPage(), TYPE_LABEL, Leads(), LeadsPage(), LEAD_STATUS, LeadStatus, SERVICE_LABELS

### Community 129 - "checkbox.tsx"
Cohesion: 0.43
Nodes (6): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes

### Community 130 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (7): Breadcrumb(), BreadcrumbItem(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, ChevronRightSmall(), IconProps

### Community 131 - "proof-actions.ts"
Cohesion: 0.29
Nodes (9): amount, date, refresh(), rejectProofAction(), StartProof, submitSchema, text(), TYPES (+1 more)

### Community 132 - "quote/page.tsx"
Cohesion: 0.20
Nodes (17): convertLeadAction(), LeadState, refresh(), sendProposalAction(), setFunnelOpenAction(), setLeadStatusAction(), loadSchedules(), loadTaxOnFee() (+9 more)

### Community 133 - "workpapers/load.ts"
Cohesion: 0.19
Nodes (18): RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart(), MonthActivity (+10 more)

### Community 134 - "binder/page.tsx"
Cohesion: 0.38
Nodes (8): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, PrintButton()

### Community 135 - "book-income.ts"
Cohesion: 0.36
Nodes (7): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), BookIncome, INCOME_GROUPS

### Community 136 - "app/documents/page.tsx"
Cohesion: 0.14
Nodes (21): ClientSelect(), ApprovedTable(), BOOKED_TYPES, ClientList(), ClientPending(), confirmedMonths(), countBy(), Documents() (+13 more)

### Community 137 - "src/app/layout.tsx"
Cohesion: 0.33
Nodes (3): inter, metadata, montserrat

### Community 138 - "document-upload.tsx"
Cohesion: 0.43
Nodes (7): DocumentUpload(), send(), upload(), Item, finishUpload(), startUpload(), month()

### Community 139 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 140 - "vitest"
Cohesion: 0.07
Nodes (11): pg, vitest, root, root, root, root, root, root (+3 more)

### Community 141 - "social-button.tsx"
Cohesion: 0.19
Nodes (15): GET(), GET(), code, email, sendSignInEmail(), SignInState, signInWithGoogle(), verifySignInCode() (+7 more)

### Community 142 - "proxy.ts"
Cohesion: 0.33
Nodes (6): @supabase/ssr@^0.12.7, @supabase/ssr, config, PROTECTED, proxy(), redirectKeepingCookies()

### Community 143 - "proposal-view.tsx"
Cohesion: 0.39
Nodes (7): Lines(), longDate(), money(), php, ProposalData, ProposalView(), Quote

### Community 144 - "business.ts"
Cohesion: 0.25
Nodes (7): form1701, form1702RT, BUSINESS_TAX_FORMS, form1701Q, form1702Q, form2551Q, form2550Q

### Community 145 - "Building UIs with BoardUI"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 146 - "books/reports/page.tsx"
Cohesion: 0.13
Nodes (22): WithdrawReportButton(), fmtDate(), lastMonth(), Reports(), ReportsPage(), PortalReport(), Report(), when() (+14 more)

### Community 147 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 148 - "fields.ts"
Cohesion: 0.08
Nodes (38): approveSelectedAction(), BOOKED, BulkState, key(), DirectoryParty, ENTRY_STATUS, ONLY_FOR, typeLabel (+30 more)

### Community 149 - "manilaToday"
Cohesion: 0.12
Nodes (27): Detail(), StatementPage(), PortalClient, portalContext(), PortalRequests(), Requests(), when(), Detail() (+19 more)

### Community 150 - "copy-opencv.mjs"
Cohesion: 0.33
Nodes (4): outDir, pkgDir, require, { version }

### Community 151 - "react"
Cohesion: 0.08
Nodes (54): react, Accounts(), AccountsPage(), GROUPS, AccountForm(), EntryForm(), NewEntry(), NewEntryPage() (+46 more)

### Community 152 - "post-button.tsx"
Cohesion: 0.70
Nodes (3): postPayrollAction(), PostState, PostPayrollButton()

### Community 153 - "names.ts"
Cohesion: 0.38
Nodes (5): PARTICLES, PersonName, splitPersonName(), SUFFIXES, tidy()

### Community 154 - "any-cutoff.test.ts"
Cohesion: 0.50
Nodes (3): as(), client(), root

### Community 155 - "ledger-closing.test.ts"
Cohesion: 0.50
Nodes (3): as(), books(), root

### Community 156 - "staff/actions.ts"
Cohesion: 0.29
Nodes (8): zod@^4.6.7, zod, clientUserSchema, email, inviteStaffSchema, loadPoints(), name, updateStaffSchema

### Community 157 - "server-only"
Cohesion: 0.14
Nodes (21): server-only, @supabase/supabase-js, GET(), GET(), digestMessage(), DigestRow, longDay(), peso (+13 more)

### Community 160 - "tieouts.test.ts"
Cohesion: 0.15
Nodes (9): client(), RegisterRow, base, books, buy, sale, approved(), as() (+1 more)

### Community 162 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

## Knowledge Gaps
- **18 isolated node(s):** `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `Server-Only Keys (SUPABASE_SECRET_KEY, CRON_SECRET)`, `Withholding Returns Follow Calendar Year (calendar_year flag)` (+13 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1046 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `supabaseServer` to `ui.tsx`, `leads/[id]/page.tsx`, `breadcrumb.tsx`, `proof-actions.ts`, `quote/page.tsx`, `package.json`, `binder/page.tsx`, `app/documents/page.tsx`, `src/app/layout.tsx`, `document-upload.tsx`, `requireStaff`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `proxy.ts`, `books/reports/page.tsx`, `fields.ts`, `manilaToday`, `react`, `post-button.tsx`, `server-only`, `payroll/register.ts`, `scores/page.tsx`, `parties/[id]/page.tsx`, `payroll/forms.tsx`, `clients/[id]/page.tsx`, `parties/actions.ts`, `payrollAccess`, `requireOwner`, `profile.ts`, `Centavos`, `batch/register.ts`, `ledger/data.ts`, `payroll/data.ts`, `documents/labels.ts`, `requireOwner`, `Button`, `year/[year]/page.tsx`, `collections/page.tsx`, `workpapers/page.tsx`, `books/forms.tsx`, `obligations.ts`, `opening-checklist.tsx`, `deadlines/page.tsx`, `theme-toggle.tsx`, `filings/actions.ts`, `Card`, `requireStaff`, `[clientId]/page.tsx`, `showMonth`, `app/app/layout.tsx`, `form-2316.tsx`, `gap/page.tsx`, `print/page.tsx`, `register-xlsx.ts`, `registrations/forms.tsx`, `Textarea`, `settings/actions.ts`, `fees/[id]/page.tsx`, `branches.ts`, `Notice`, `Badge`, `cycle/page.tsx`, `returns/load.ts`, `work/load.ts`, `Card`, `[token]/page.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **What connects `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx` to the rest of the system?**
  _18 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `ui.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0962566844919786 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `ui.tsx`, `leads/[id]/page.tsx`, `breadcrumb.tsx`, `notification.tsx`, `quote/page.tsx`, `package.json`, `binder/page.tsx`, `checkbox.tsx`, `app/documents/page.tsx`, `document-upload.tsx`, `requireStaff`, `onboarding/page.tsx`, `social-button.tsx`, `dependencies`, `books/reports/page.tsx`, `fields.ts`, `manilaToday`, `post-button.tsx`, `scores/page.tsx`, `parties/[id]/page.tsx`, `payroll/forms.tsx`, `clients/[id]/page.tsx`, `payrollAccess`, `batch/register.ts`, `documents/labels.ts`, `requireOwner`, `Button`, `year/[year]/page.tsx`, `collections/page.tsx`, `workpapers/page.tsx`, `tabs.tsx`, `dropdown.tsx`, `file-upload.tsx`, `books/forms.tsx`, `obligations.ts`, `stat-cards.tsx`, `deadlines/page.tsx`, `theme-toggle.tsx`, `Card`, `requireStaff`, `button.tsx`, `cx.ts`, `[clientId]/page.tsx`, `showMonth`, `input.tsx`, `document-scanner.tsx`, `app/app/layout.tsx`, `gap/page.tsx`, `print/page.tsx`, `registrations/forms.tsx`, `Textarea`, `fees/[id]/page.tsx`, `Notice`, `Badge`, `cycle/page.tsx`, `social-button.tsx`, `returns/load.ts`, `work/load.ts`, `Card`, `[token]/page.tsx`, `documents/[id]/page.tsx`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Should `engine.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08944793850454227 - nodes in this community are weakly interconnected._
- **Why does `cx()` connect `form-2316.tsx` to `Building UIs with BoardUI`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._