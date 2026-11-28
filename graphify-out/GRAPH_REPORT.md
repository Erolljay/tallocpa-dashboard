# Graph Report - tallocpa-dashboard  (2026-11-28)

## Corpus Check
- 1157 files · ~951,631 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 21 file(s) not represented in the graph (top: .css 10, (none) 4, .woff2 3)

## Summary
- 7040 nodes · 24651 edges · 212 communities (194 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 228 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `60b9d0fe`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- client
- migrate.yml
- ui.ts
- quote.ts
- dependencies
- Card
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- money.ts
- Sign-in & Setup Docs
- PageHeader
- Sign-off, Ledger & Payments
- documents/[id]/page.tsx
- Brand, Fees & Service Lines
- Portal, OCR & Scores
- statements.ts
- Data Model & Security Docs
- income.ts
- Moxie Migration & Phasing
- Capacity & Open Items
- Product Spec Root
- DB Test Script
- Vercel Cron Config
- pnpm Workspace
- TalloCPA OS — AI Workforce (design note)
- Develop Commands
- cwt-tracker.ts
- scores/page.tsx
- compare.ts
- proposal.ts
- returns/types.ts
- ocr/run.ts
- register-xlsx.ts
- ai-employees/actions.ts
- registrations/actions.ts
- scripts
- cx
- public.ts
- remittances/forms.tsx
- webhook.ts
- leads/[id]/page.tsx
- registrations/[id]/page.tsx
- Centavos
- quote/page.tsx
- returns/types.ts
- authorize/page.tsx
- review-form.tsx
- ledger/data.ts
- people/schema.ts
- theme-toggle.tsx
- year-end/page.tsx
- marketing/page.tsx
- Apple Design
- engine.ts
- testing.ts
- supabaseServer
- payroll/data.ts
- books/forms.tsx
- work/load.ts
- Rules
- Animation Performance
- ai-oauth.test.ts
- stat-cards.tsx
- LinkButton
- formatAmount
- step-files.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- manilaToday
- modal.tsx
- Pro components
- modal.tsx
- button.tsx
- cx.ts
- settings/actions.ts
- app/layout.tsx
- document-scanner.tsx
- intake-picker.tsx
- LinkButton
- bir-mail/[id]/page.tsx
- manilaToday
- Recipes
- sawt.ts
- BoardUI page patterns
- Pro templates
- toCentavos
- ledger/books.ts
- deadlines/page.tsx
- combobox.tsx
- calendar/page.tsx
- boardui
- env.ts
- auth-templates.ts
- filings/run.ts
- leads/actions.ts
- Notice
- lib/books/actions.ts
- Opening balances: checklist for any cut-off
- parse.ts
- portal/page.tsx
- opening.ts
- collections/forms.tsx
- [month]/page.tsx
- apply-migrations.sh
- fees/schedule.ts
- devDependencies
- notification-bell.tsx
- tieouts.test.ts
- onboarding/forms.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- staff/page.tsx
- Collections Clerk's desk
- collections/page.tsx
- read.test.ts
- sign-in-form.tsx
- return-file-actions.ts
- tax-codes.ts
- module-pages.tsx
- opening-checklist.tsx
- collections/ai-tools.ts
- next
- supabaseServer
- collections/summary.ts
- pre-review-assistant/README.md
- sign-off-actions.tsx
- status.ts
- payroll/forms.tsx
- binder/page.tsx
- addDays
- slots.ts
- chief-of-staff/README.md
- server-only
- safeguards.ts
- TaxpayerType
- vitest
- onboarding/ai-tools.ts
- document-clerk/README.md
- documents/labels.ts
- template.ts
- filings/[id]/page.tsx
- pending-review.tsx
- cycle/page.tsx
- requireOwner
- arap.ts
- package.json
- payment-proof/poll.ts
- Rework: one flow from lead to year-end
- book/actions.ts
- calendar/page.tsx
- portal-billing.test.ts
- protocol.ts
- register/page.tsx
- opengraph-image.tsx
- ledger.test.ts
- cycle/actions.ts
- ai-employees.test.ts
- deadlines/actions.ts
- workpapers/load.ts
- app/documents/page.tsx
- ticked-allocation.test.ts
- acting-approver.test.ts
- app/settings/page.tsx
- payment-proof/ai-tools.ts
- register-books.test.ts
- Payment Proof Clerk's desk
- db.test.ts
- morning.ts
- payment-forms.tsx
- onboarding/ai-tools.ts
- rates.ts
- [clientId]/page.tsx
- eslint.config.mjs
- documents/[id]/page.tsx
- social-button.tsx
- calendar/ai-tools.ts
- contribution-remittances.test.ts
- contact-access.test.ts
- profile.ts
- billing/[id]/page.tsx
- bir-mail-clerk/README.md
- registration-runner/README.md
- approval-memo.tsx
- onboarding-officer/project-instructions.md
- react
- month.ts
- fields.ts
- notifications.test.ts
- late-submitters.ts
- tests/proposal-email.test.ts
- templates/README.md
- sign-in-form.tsx
- filings/actions.ts
- parallel-run.test.ts
- returns-sign-off.test.ts
- ai-desks/README.md
- workpapers/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 447 edges
2. `cx` - 317 edges
3. `react` - 298 edges
4. `Notice()` - 293 edges
5. `Button()` - 276 edges
6. `Skeleton()` - 272 edges
7. `next` - 266 edges
8. `vitest` - 222 edges
9. `Card()` - 209 edges
10. `Badge()` - 201 edges

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

## Communities (212 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.10
Nodes (46): BooksContext, one(), Certificates(), Staff2307Page(), Print(), Print2307Page(), load2307Staff(), print2307Href() (+38 more)

### Community 1 - "client"
Cohesion: 0.05
Nodes (24): as(), client(), root, approved(), as(), root, approved(), as() (+16 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.06
Nodes (67): booksViewFor(), fmtMonth(), blankLine(), InvoiceForm(), InvoiceFormValue, MonthSelect(), BooksSummaryPage(), Summary() (+59 more)

### Community 4 - "quote.ts"
Cohesion: 0.09
Nodes (45): PriceRow, EngagementRow, FeeGapPage(), Gap(), EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+37 more)

### Community 5 - "dependencies"
Cohesion: 0.11
Nodes (18): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1, react-dom@19.3.0 (+10 more)

### Community 6 - "Card"
Cohesion: 0.07
Nodes (47): Detail(), maskNumber(), StatementPage(), metadata, Shared(), SharedStatementPage(), Billing(), PortalBilling() (+39 more)

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

### Community 11 - "money.ts"
Cohesion: 0.14
Nodes (27): AlphaCols, alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+19 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.06
Nodes (72): @remixicon/react, ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, RemoveBusinessButton(), Contacts() (+64 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "documents/[id]/page.tsx"
Cohesion: 0.12
Nodes (28): GET(), safe(), Payroll(), PayrollPage(), PayrollDocument(), ReadPayrollButton(), loadEmployees(), loadStored() (+20 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.08
Nodes (40): defaultCashFlow(), codes, PNL, COA_TEMPLATES, FS_LINES, FsLine, FsLineKey, isFsLine() (+32 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.08
Nodes (80): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), annualAttachments(), balanceSheet(), compute1701() (+72 more)

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

### Community 29 - "TalloCPA OS — AI Workforce (design note)"
Cohesion: 0.11
Nodes (19): 10. Data model (first draft), 11. Build order, 12. Open items, 1. The idea in one paragraph, 2. Principles, 3. The AI employees, 4.1 The in-app model is swappable, 4. Where they run and what they cost (+11 more)

### Community 40 - "cwt-tracker.ts"
Cohesion: 0.08
Nodes (47): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), CwtLooseDocuments(), CwtTrackerGroups(), CwtTrackerSummary() (+39 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.11
Nodes (34): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+26 more)

### Community 42 - "compare.ts"
Cohesion: 0.06
Nodes (70): atcRows(), BookInvoiceRow, Bucket, compareParallelRun(), differs(), DocumentReason, FigureGroup, fmtMonthShort() (+62 more)

### Community 43 - "proposal.ts"
Cohesion: 0.08
Nodes (38): ProposalSetup, jobName(), lineName(), longDate(), money(), php, ProposalData, ProposalView() (+30 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.06
Nodes (66): client, row(), incomePayment(), agentLines(), agentProblems(), amountText(), emptyResult(), PAYROLL_NOT_LOADED (+58 more)

### Community 45 - "ocr/run.ts"
Cohesion: 0.06
Nodes (46): MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount(), planRead() (+38 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.12
Nodes (26): RFC-4180, monthlyTable(), monthlyWithholding(), sortItems(), filled(), Grid, GridResult, isCsv() (+18 more)

### Community 47 - "ai-employees/actions.ts"
Cohesion: 0.05
Nodes (49): AiState, createAiLogin(), createKeyAction(), fieldErrors(), updateAiSettingsAction(), expiryFrom(), hashKey(), isKeyShaped() (+41 more)

### Community 48 - "registrations/actions.ts"
Cohesion: 0.05
Nodes (85): cancelRegistrationAction(), ClientCaseKind, completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction() (+77 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "cx"
Cohesion: 0.09
Nodes (46): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Bell(), emit(), listeners, markReadLocally() (+38 more)

### Community 51 - "public.ts"
Cohesion: 0.07
Nodes (49): COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage(), QuoteView(), TAXPAYER_LABEL, Total(), complexity() (+41 more)

### Community 52 - "remittances/forms.tsx"
Cohesion: 0.09
Nodes (62): GET(), ListRow, ORDER, Remittance(), RemittancePage(), STEPS, Remittances(), RemittancesPage() (+54 more)

### Community 53 - "webhook.ts"
Cohesion: 0.09
Nodes (47): maxDuration, POST(), ClaimedNotification, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS, checked() (+39 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.06
Nodes (57): NotesCard(), ClientNoteForm(), BookingLink(), ConvertForm(), CopyLink(), DiscoveryCallForm(), FunnelSwitch(), JobRow() (+49 more)

### Community 55 - "registrations/[id]/page.tsx"
Cohesion: 0.07
Nodes (61): CompleteButton(), StepBadge(), StepRow, caseStatus, CertificateDetails, certificateLabel(), fmt(), Registration() (+53 more)

### Community 56 - "Centavos"
Cohesion: 0.11
Nodes (28): EmployeeDetail(), EmployeePage(), previewOf(), RegisterPreview, totals(), Form2316Line, loadPriorEmployers(), payAccountsOf() (+20 more)

### Community 57 - "quote/page.tsx"
Cohesion: 0.11
Nodes (41): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+33 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.07
Nodes (47): recomputeWorksheetAction(), WorksheetState, Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when() (+39 more)

### Community 59 - "authorize/page.tsx"
Cohesion: 0.11
Nodes (38): RFC-7636, RFC-8414, allowAction(), check(), Checked, ConsentState, denyAction(), ConsentForm() (+30 more)

### Community 60 - "review-form.tsx"
Cohesion: 0.07
Nodes (46): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+38 more)

### Community 61 - "ledger/data.ts"
Cohesion: 0.09
Nodes (42): AmendmentDecision(), ArapDecision(), ConfirmAllButton(), ConfirmButton(), RelockForm(), RepostRegisterButton(), ReverseForm(), OpeningChecklist() (+34 more)

### Community 62 - "people/schema.ts"
Cohesion: 0.20
Nodes (12): access, clientUserSchema, contactAccessSchema, contactDetailsSchema, contactLinkSchema, email, inviteStaffSchema, mobile (+4 more)

### Community 63 - "theme-toggle.tsx"
Cohesion: 0.12
Nodes (24): applyTheme(), applyThemeWithTransition(), createBlurCircleMask(), currentTheme(), elementCenter(), installThemeTransitionStyle(), normalizedOrigin(), storedTheme() (+16 more)

### Community 64 - "year-end/page.tsx"
Cohesion: 0.07
Nodes (54): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+46 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.09
Nodes (33): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), CreateLinkForm(), N() (+25 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "engine.ts"
Cohesion: 0.14
Nodes (22): compareIso(), DeadlineRule, fiscalYearOf(), followsCalendarYear(), formYearEndMonth(), generateFilingInstances(), Obligation, periodApplies() (+14 more)

### Community 68 - "testing.ts"
Cohesion: 0.11
Nodes (28): form1701, form1702RT, year, BUSINESS_TAX_FORMS, form1701Q, form1702Q, individual, form2551Q (+20 more)

### Community 69 - "supabaseServer"
Cohesion: 0.05
Nodes (80): addClientNoteAction(), NoteState, file(), amount, CatchUpState, confirmCatchUpAction(), recordCatchUpAction(), refresh() (+72 more)

### Community 70 - "payroll/data.ts"
Cohesion: 0.06
Nodes (69): GridRow, Certificates2316, certificatesFromRaw(), form2316(), Form2316Employer, Form2316Signatory, mmdd(), paidInYear() (+61 more)

### Community 71 - "books/forms.tsx"
Cohesion: 0.16
Nodes (40): ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction(), confirmAllAction(), confirmEntryAction(), decideAmendmentAction() (+32 more)

### Community 72 - "work/load.ts"
Cohesion: 0.15
Nodes (25): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), OpeningAssetForm(), RunDepreciationButton() (+17 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ai-oauth.test.ts"
Cohesion: 0.09
Nodes (30): maxDuration, POST(), OPTIONS, POST(), RFC-7591, OPTIONS, POST(), GET() (+22 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.05
Nodes (50): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+42 more)

### Community 77 - "LinkButton"
Cohesion: 0.16
Nodes (18): Batch(), BatchPage(), one(), toCentavos(), Accounts(), AccountsPage(), GROUPS, NewEntry() (+10 more)

### Community 78 - "formatAmount"
Cohesion: 0.09
Nodes (39): ParallelRun(), ParallelRunPage(), quarterMonths(), Accreditation(), amount(), AmountRow(), DateCells(), Form2307() (+31 more)

### Community 79 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.10
Nodes (32): VerifyButton(), fmtDate(), PartyDetail(), PartyPage(), datAddress(), datNameCols(), displayName(), fullAddress() (+24 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.14
Nodes (27): Chip(), CHIP_COLORS, ChipProps, ChipVariant, styles, Button(), Mark(), DOCS (+19 more)

### Community 82 - "manilaToday"
Cohesion: 0.14
Nodes (28): EmployerCard(), RemoveAssignmentButton(), RemoveClientUserButton(), ClientDetail(), ClientPage(), fmtDate(), fmtMonth(), frequencyLabel (+20 more)

### Community 83 - "modal.tsx"
Cohesion: 0.04
Nodes (51): UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles, ButtonLinkProps, ButtonProps (+43 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "modal.tsx"
Cohesion: 0.06
Nodes (58): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+50 more)

### Community 86 - "button.tsx"
Cohesion: 0.07
Nodes (31): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), inter, metadata, montserrat (+23 more)

### Community 87 - "cx.ts"
Cohesion: 0.07
Nodes (79): PortalClient, portalContext, Portal2316(), Portal2316Page(), Books(), PortalBooks(), BookPrint(), PortalBookPrint() (+71 more)

### Community 88 - "settings/actions.ts"
Cohesion: 0.12
Nodes (26): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+18 more)

### Community 89 - "app/layout.tsx"
Cohesion: 0.06
Nodes (59): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+51 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "LinkButton"
Cohesion: 0.25
Nodes (14): amount(), BoxCells(), cx(), DateBoxes(), Form2316(), Form2316Set(), Item(), mmddyyyy() (+6 more)

### Community 93 - "bir-mail/[id]/page.tsx"
Cohesion: 0.11
Nodes (37): acceptBirMailMatchAction(), BirMailState, checkBirMailboxAction(), dismissBirMailAction(), linkBirMailAction(), uuid, BirMailMessagePage(), Mail (+29 more)

### Community 94 - "manilaToday"
Cohesion: 0.06
Nodes (74): RequestDetail(), RequestPage(), Row, TaskDetail(), TaskPage(), registrationSteps(), STEP_STATUS, TaskRow (+66 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "sawt.ts"
Cohesion: 0.09
Nodes (54): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), person, blank(), optionalText(), PartyInput (+46 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.11
Nodes (14): BoardUI component catalog, AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it (+6 more)

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "toCentavos"
Cohesion: 0.13
Nodes (20): PayrollReadState, KIND_LABEL, MATCH_BADGE, peso(), ReadItem, SheetPreview(), ComboBox(), SelectList() (+12 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.06
Nodes (52): exceljs, dayBefore(), GET(), safe(), BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead (+44 more)

### Community 101 - "deadlines/page.tsx"
Cohesion: 0.13
Nodes (30): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+22 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.04
Nodes (74): react-aria-components, ChipColor, Breadcrumb(), BreadcrumbItemProps, BreadcrumbProps, IconComponent, animateTag(), ComboBoxItemProps (+66 more)

### Community 103 - "calendar/page.tsx"
Cohesion: 0.11
Nodes (35): GET(), GET(), accountProblem(), newState(), redirectUri(), STATE_COOKIE, stateMatches(), Interval (+27 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "env.ts"
Cohesion: 0.18
Nodes (24): GET(), classifyBirMail(), findTins(), isBirSender(), ingestBirMail(), IngestResult, EsubmissionMailEnv, esubmissionMailEnv() (+16 more)

### Community 106 - "auth-templates.ts"
Cohesion: 0.21
Nodes (10): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+2 more)

### Community 107 - "filings/run.ts"
Cohesion: 0.13
Nodes (23): IsoDate, EfpsGroup, FilingChannel, FilingInstance, nextWorkingDay(), Period, normalizeRdo(), ACTIVE (+15 more)

### Community 108 - "leads/actions.ts"
Cohesion: 0.13
Nodes (30): assignReviewerAction(), bookingLinkAction(), cancelCallAction(), convertLeadAction(), emailProposalAction(), LeadState, markLostAction(), recordCallAction() (+22 more)

### Community 109 - "Notice"
Cohesion: 0.08
Nodes (91): BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), BookPicker(), ChangeBooksStartForm(), CloseYearForm() (+83 more)

### Community 110 - "lib/books/actions.ts"
Cohesion: 0.13
Nodes (29): books(), checkInvoice(), checkSettlement(), invoiceModule(), revalidate(), saveInvoiceAction(), saveSettlementAction(), settlementModule() (+21 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "parse.ts"
Cohesion: 0.13
Nodes (23): UNIONBANK_FROM, UNIONBANK_HTML, UNIONBANK_RECEIVED, UNIONBANK_SUBJECT, formatTin(), htmlToText(), iso(), LABELS (+15 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.12
Nodes (33): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+25 more)

### Community 114 - "opening.ts"
Cohesion: 0.14
Nodes (20): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+12 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.19
Nodes (23): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+15 more)

### Community 116 - "[month]/page.tsx"
Cohesion: 0.13
Nodes (22): MonthGrid(), PayrollMonth(), PayrollMonthPage(), when(), postPayrollAction(), PostState, PostPayrollButton(), AGENCIES (+14 more)

### Community 118 - "fees/schedule.ts"
Cohesion: 0.13
Nodes (36): GET(), Link, pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES (+28 more)

### Community 119 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+8 more)

### Community 120 - "notification-bell.tsx"
Cohesion: 0.05
Nodes (68): GET(), Content(), PortalNotificationSettingsPage(), notifyNotificationsChanged(), EmailSwitches(), EmailSwitchGroup, MarkAllReadButton(), NotificationFilterTabs() (+60 more)

### Community 121 - "tieouts.test.ts"
Cohesion: 0.29
Nodes (4): base, books, buy, sale

### Community 122 - "onboarding/forms.tsx"
Cohesion: 0.15
Nodes (23): ClientTab, ClientTabs(), UNDER, StatusButton(), addClientFile(), KINDS, OnboardingState, refresh() (+15 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (40): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+32 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "staff/page.tsx"
Cohesion: 0.14
Nodes (20): addBranchAction(), BranchState, errors(), refresh(), updateBranchAction(), AddBranchForm(), BranchRowForm(), BranchOption (+12 more)

### Community 126 - "Collections Clerk's desk"
Cohesion: 0.14
Nodes (11): Collections run, Rules, Steps, Where to deposit, How you work, Your job, Before you start (TalloCPA OS), Check it (+3 more)

### Community 127 - "collections/page.tsx"
Cohesion: 0.18
Nodes (23): RunReadyButton(), Client, CollectionsPage(), OpenDue, Overview(), Stat(), REMINDER_KIND, ageOpenItems() (+15 more)

### Community 128 - "read.test.ts"
Cohesion: 0.05
Nodes (77): applyColumnsAction(), done(), payrollDocument(), readPayrollAction(), saveColumnMap(), savePayrollReadAction(), geminiJson(), BirCategory (+69 more)

### Community 129 - "sign-in-form.tsx"
Cohesion: 0.27
Nodes (10): amount, date, ProofState, refresh(), rejectProofAction(), StartProof, submitSchema, text() (+2 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.15
Nodes (23): RFC-2047, RFC-2822, ReturnFileState, sendEsubmissionAction(), TYPES, DatFiles, datFiles(), Db (+15 more)

### Community 131 - "tax-codes.ts"
Cohesion: 0.18
Nodes (15): appliesTo(), canGoOn(), formsFor(), InvoiceKind, placeOf(), RETURN_LINES, ReturnForm, ReturnLine (+7 more)

### Community 132 - "module-pages.tsx"
Cohesion: 0.08
Nodes (69): booksContext(), fmtDate(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink() (+61 more)

### Community 133 - "opening-checklist.tsx"
Cohesion: 0.15
Nodes (16): Access, STATUS, loadAssets(), Row, Asset, cutoffOf(), ChecklistInput, ChecklistItem (+8 more)

### Community 134 - "collections/ai-tools.ts"
Cohesion: 0.11
Nodes (19): Due, byStatement(), cents(), CLERK, clientPaymentHistory, collectionsSummary, draftPaymentReminder, History (+11 more)

### Community 135 - "next"
Cohesion: 0.04
Nodes (113): nextConfig, next, GlobalNotFound(), metadata, QuotesClosed(), robots(), AboutPage(), HOW (+105 more)

### Community 136 - "supabaseServer"
Cohesion: 0.06
Nodes (70): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+62 more)

### Community 137 - "collections/summary.ts"
Cohesion: 0.24
Nodes (11): bucketFor(), bucketLabel, DEPOSIT_TO, ItemCategory, othersName(), REMITTANCE_BUCKETS, summarize(), SUMMARY_BUCKETS (+3 more)

### Community 138 - "pre-review-assistant/README.md"
Cohesion: 0.17
Nodes (9): Pre-review, Rules, Steps, How you work, Your job, Before you start (TalloCPA OS), Check it, Pre-Review Assistant's desk (+1 more)

### Community 139 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 140 - "status.ts"
Cohesion: 0.43
Nodes (6): daysBetween(), InvoiceForStatus, InvoiceStatus, invoiceStatus(), InvoiceStatusKind, plural()

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.06
Nodes (69): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+61 more)

### Community 142 - "binder/page.tsx"
Cohesion: 0.46
Nodes (7): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS

### Community 143 - "addDays"
Cohesion: 0.13
Nodes (27): SafeguardsNotice(), Summary(), addDays(), BoardRow, holidaySet(), loadBoard(), loadCoverage(), monthStart() (+19 more)

### Community 144 - "slots.ts"
Cohesion: 0.11
Nodes (38): GET(), bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction() (+30 more)

### Community 145 - "chief-of-staff/README.md"
Cohesion: 0.12
Nodes (12): Format, Morning brief, Rules, Steps, How you work, When the Owner asks something else, Your job, Before you start (TalloCPA OS) (+4 more)

### Community 146 - "server-only"
Cohesion: 0.09
Nodes (46): server-only, @supabase/supabase-js, GET(), GET(), GET(), runActingDigest(), tellPreparer(), emailConfigured() (+38 more)

### Community 147 - "safeguards.ts"
Cohesion: 0.15
Nodes (18): board, MARCO, none, RHEA, row(), steps, documentCutoff(), DONE_FROM_STATUS (+10 more)

### Community 148 - "TaxpayerType"
Cohesion: 0.29
Nodes (7): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow

### Community 149 - "vitest"
Cohesion: 0.02
Nodes (75): pg, vitest, dir, acct(), ADVANCES_FROM, ASSETS, build(), CONTRA (+67 more)

### Community 150 - "onboarding/ai-tools.ts"
Cohesion: 0.06
Nodes (59): zod, DRAFT_KIND_LABELS, DraftLine, NewDraft, saveDraft(), BIR_MAIL_DRAFT, birMailToMatch, CLERK (+51 more)

### Community 151 - "document-clerk/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Document Clerk's desk, Set up the desk (Cowork, once), Review queue, Rules (+1 more)

### Community 152 - "documents/labels.ts"
Cohesion: 0.08
Nodes (44): DocReviewActions(), Doc, DocumentsCard(), when(), ExceptionRow, Row, Doc, Documents() (+36 more)

### Community 153 - "template.ts"
Cohesion: 0.10
Nodes (20): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+12 more)

### Community 154 - "filings/[id]/page.tsx"
Cohesion: 0.05
Nodes (84): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, FilingTable(), bookKind, BookRow, bookStatus (+76 more)

### Community 155 - "pending-review.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.15
Nodes (23): Cycle(), CyclePage(), CycleWithClient, DocRow, shift(), CycleRow, EXCEPTION_DECISIONS, ExceptionDecision (+15 more)

### Community 157 - "requireOwner"
Cohesion: 0.08
Nodes (53): RFC-2606, addWorkforceAction(), assignClientAction(), disconnectAppAction(), grantToolsAction(), refresh(), removeToolAction(), revokeKeyAction() (+45 more)

### Community 158 - "arap.ts"
Cohesion: 0.16
Nodes (18): accountLabel(), AGING, aging(), agingBucket(), AgingRow, CashAccount, CheckedUpdate, checkUpdate() (+10 more)

### Community 159 - "package.json"
Cohesion: 0.18
Nodes (10): motion@^12.43.0, @supabase/ssr@^0.12.7, tsx@^4.23.15, name, packageManager, private, version, motion (+2 more)

### Community 160 - "payment-proof/poll.ts"
Cohesion: 0.16
Nodes (18): PaymentMailEnv, paymentMailEnv(), gmailQuery(), paymentSender(), proofLines(), pdfText(), PER_PAGE, textPdf() (+10 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "book/actions.ts"
Cohesion: 0.20
Nodes (16): cancelMeetingAction(), disconnectCalendarAction(), FormState, DisconnectButton(), calendarNote(), CalendarOutcome, cancelledMessage(), cancelReason() (+8 more)

### Community 163 - "calendar/page.tsx"
Cohesion: 0.26
Nodes (17): addDays(), dayLabel(), ERRORS, TeamCalendar(), TeamCalendarPage(), manilaWhen(), manilaInstant(), appBookedEvents() (+9 more)

### Community 164 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 165 - "protocol.ts"
Cohesion: 0.07
Nodes (39): callsToday(), instructionsFor(), manilaDay(), McpRequest, McpResponse, Outcome, serverFor(), toolInfo() (+31 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (36): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+28 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "ledger.test.ts"
Cohesion: 0.33
Nodes (3): asCommit(), failsAtCommit(), root

### Community 169 - "cycle/actions.ts"
Cohesion: 0.22
Nodes (16): MonthComplete(), SentRow, StandingRow, TimelineRow, CloseCycleButton(), Message(), NothingToSubmitButton(), closeCycleAction() (+8 more)

### Community 170 - "ai-employees.test.ts"
Cohesion: 0.22
Nodes (5): BOOKS, CLIENT_RECORDS, DOCUMENT_RECORDS, OWN, root

### Community 171 - "deadlines/actions.ts"
Cohesion: 0.42
Nodes (6): generateFilingsNow(), generatePastFilingsAction(), GenerateState, GenerateButton(), runFilingGeneration(), splitHolidays()

### Community 172 - "workpapers/load.ts"
Cohesion: 0.15
Nodes (21): RegisterLine, Adjustment, PeriodFile, ReviewNote, Memo, MemoInput, MemoMonth, MonthActivity (+13 more)

### Community 173 - "app/documents/page.tsx"
Cohesion: 0.12
Nodes (30): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+22 more)

### Community 174 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "app/settings/page.tsx"
Cohesion: 0.21
Nodes (16): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), Rule, SettingsPage() (+8 more)

### Community 177 - "payment-proof/ai-tools.ts"
Cohesion: 0.16
Nodes (18): Candidate, cents(), CLERK, FilingRow, MailDetail, mailId, MailRow, money (+10 more)

### Community 178 - "register-books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 179 - "Payment Proof Clerk's desk"
Cohesion: 0.13
Nodes (12): Payment proofs, Rules, Steps, How you work, Your job, 1. The payment mailbox (once; docs/SETUP.md → *Payment confirmations mailbox*), 2. TalloCPA OS: Settings → AI employees → **Payment Proof Clerk**, Before you start (+4 more)

### Community 180 - "db.test.ts"
Cohesion: 0.05
Nodes (13): outDir, pkgDir, require, { version }, ctx, input, root, root (+5 more)

### Community 181 - "morning.ts"
Cohesion: 0.17
Nodes (15): digestMessage(), DigestRow, longDay(), peso, time(), Email, line(), longDay() (+7 more)

### Community 182 - "payment-forms.tsx"
Cohesion: 0.20
Nodes (22): PaymentSettings(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+14 more)

### Community 183 - "onboarding/ai-tools.ts"
Cohesion: 0.07
Nodes (30): AiOnboardingFacts, cents(), checklistOf(), DRAFT_KINDS, draftBody(), draftInput, DraftInput, draftOnboardingItem (+22 more)

### Community 184 - "rates.ts"
Cohesion: 0.25
Nodes (15): AmountRate, CorporateRate, IncomeTaxTable, percentageTaxNonbankRate(), percentageTaxRate(), PercentRate, pickEffective(), RateEntry (+7 more)

### Community 185 - "[clientId]/page.tsx"
Cohesion: 0.23
Nodes (13): statementLinkAction(), ClientCollectionsPage(), Deposit, Detail(), maskNumber(), ApplyCreditButton(), VoidDepositForm(), WaiveDueForm() (+5 more)

### Community 186 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 187 - "documents/[id]/page.tsx"
Cohesion: 0.10
Nodes (35): addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage(), ReadBundleAgain(), RemoveBundleInvoice() (+27 more)

### Community 188 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 189 - "calendar/ai-tools.ts"
Cohesion: 0.20
Nodes (11): mySchedule, asDate(), isoDay(), KIND_ORDER, manilaDay, manilaTime, SCHEDULE_MAX_DAYS, ScheduleItem (+3 more)

### Community 190 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 191 - "contact-access.test.ts"
Cohesion: 0.09
Nodes (9): api, ctx, fn, rows, src, root, HASH, LEAD (+1 more)

### Community 192 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 193 - "billing/[id]/page.tsx"
Cohesion: 0.27
Nodes (10): Detail(), PortalStatementDetail(), accessFor(), decideMissing2307Action(), DecisionState, Decision(), Missing(), Missing2307Page() (+2 more)

### Community 194 - "bir-mail-clerk/README.md"
Cohesion: 0.17
Nodes (9): BIR mail, Rules, Steps, How you work, Your job, Before you start (TalloCPA OS), BIR Mail Clerk's desk, Check it (+1 more)

### Community 195 - "registration-runner/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Registration Runner's desk, Set up the desk (Cowork, once), Registration check, Rules (+1 more)

### Community 196 - "approval-memo.tsx"
Cohesion: 0.21
Nodes (10): amt(), ApprovalMemo(), Db, TIE, BOOKS_GO_LIVE, c(), loadPeriodFile(), monthEnd() (+2 more)

### Community 197 - "onboarding-officer/project-instructions.md"
Cohesion: 0.15
Nodes (10): Onboard a client, Rules, Steps, How you work, Never, Your job, Before you start (TalloCPA OS), Check it (+2 more)

### Community 198 - "react"
Cohesion: 0.06
Nodes (47): react, BankAccountsRoute(), CustomersRoute(), PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), PaymentsViewPage(), PurchaseInvoicesEditPage() (+39 more)

### Community 199 - "month.ts"
Cohesion: 0.29
Nodes (9): invoiceLabel(), MissingNumber, missingRanges(), monthTimeline(), PLAIN, plainForm(), none, TimelineFiling (+1 more)

### Community 200 - "fields.ts"
Cohesion: 0.08
Nodes (37): CLERK, docId, documentsToReview, fieldLabel(), lowConfidence(), manilaDay(), readDocument, suggestDocumentReview (+29 more)

### Community 201 - "notifications.test.ts"
Cohesion: 0.16
Nodes (3): root, Row, root

### Community 202 - "late-submitters.ts"
Cohesion: 0.42
Nodes (6): isAlwaysLate(), isLateMonth(), LATE_SUBMITTER_RULES, LateSubmitter, lateSubmitters(), ScorecardRow

### Community 203 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 206 - "sign-in-form.tsx"
Cohesion: 0.60
Nodes (5): sendSignInEmail(), verifySignInCode(), SignInForm(), Divider(), SocialButton()

### Community 210 - "filings/actions.ts"
Cohesion: 0.19
Nodes (18): advanceFilingAction(), amendFilingAction(), amount, reviewHolding(), stepData(), text(), tieOutsBlocking(), workpapersFrom() (+10 more)

### Community 211 - "parallel-run.test.ts"
Cohesion: 0.40
Nodes (4): approved(), as(), root, Row

### Community 212 - "returns-sign-off.test.ts"
Cohesion: 0.40
Nodes (3): as(), attach(), root

### Community 223 - "workpapers/page.tsx"
Cohesion: 0.16
Nodes (24): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), ExplainForm() (+16 more)

## Knowledge Gaps
- **31 isolated node(s):** `RFC-2606`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1956 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `vitest` to `form-2307.ts`, `client`, `ui.ts`, `quote.ts`, `Card`, `money.ts`, `PageHeader`, `statements.ts`, `income.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `proposal.ts`, `returns/types.ts`, `ocr/run.ts`, `ai-employees/actions.ts`, `registrations/actions.ts`, `public.ts`, `remittances/forms.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `registrations/[id]/page.tsx`, `quote/page.tsx`, `returns/types.ts`, `authorize/page.tsx`, `review-form.tsx`, `people/schema.ts`, `year-end/page.tsx`, `engine.ts`, `testing.ts`, `supabaseServer`, `payroll/data.ts`, `work/load.ts`, `ai-oauth.test.ts`, `parties/[id]/page.tsx`, `cx.ts`, `settings/actions.ts`, `app/layout.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `manilaToday`, `sawt.ts`, `ledger/books.ts`, `deadlines/page.tsx`, `calendar/page.tsx`, `env.ts`, `filings/run.ts`, `leads/actions.ts`, `parse.ts`, `portal/page.tsx`, `opening.ts`, `[month]/page.tsx`, `fees/schedule.ts`, `devDependencies`, `notification-bell.tsx`, `tieouts.test.ts`, `batch/register.ts`, `staff/page.tsx`, `collections/page.tsx`, `read.test.ts`, `return-file-actions.ts`, `tax-codes.ts`, `opening-checklist.tsx`, `next`, `supabaseServer`, `collections/summary.ts`, `status.ts`, `slots.ts`, `server-only`, `safeguards.ts`, `onboarding/ai-tools.ts`, `template.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `arap.ts`, `package.json`, `book/actions.ts`, `calendar/page.tsx`, `portal-billing.test.ts`, `protocol.ts`, `register/page.tsx`, `ledger.test.ts`, `ai-employees.test.ts`, `workpapers/load.ts`, `app/documents/page.tsx`, `ticked-allocation.test.ts`, `acting-approver.test.ts`, `app/settings/page.tsx`, `register-books.test.ts`, `db.test.ts`, `morning.ts`, `onboarding/ai-tools.ts`, `rates.ts`, `documents/[id]/page.tsx`, `calendar/ai-tools.ts`, `contribution-remittances.test.ts`, `contact-access.test.ts`, `profile.ts`, `approval-memo.tsx`, `month.ts`, `fields.ts`, `notifications.test.ts`, `late-submitters.ts`, `tests/proposal-email.test.ts`, `filings/actions.ts`, `parallel-run.test.ts`, `returns-sign-off.test.ts`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **What connects `RFC-2606`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09526592635885447 - nodes in this community are weakly interconnected._
- **Why does `next` connect `next` to `form-2307.ts`, `ui.ts`, `quote.ts`, `dependencies`, `Card`, `PageHeader`, `documents/[id]/page.tsx`, `cwt-tracker.ts`, `scores/page.tsx`, `ai-employees/actions.ts`, `registrations/actions.ts`, `cx`, `public.ts`, `remittances/forms.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `registrations/[id]/page.tsx`, `Centavos`, `quote/page.tsx`, `returns/types.ts`, `authorize/page.tsx`, `review-form.tsx`, `ledger/data.ts`, `year-end/page.tsx`, `marketing/page.tsx`, `supabaseServer`, `payroll/data.ts`, `books/forms.tsx`, `work/load.ts`, `ai-oauth.test.ts`, `LinkButton`, `formatAmount`, `step-files.tsx`, `parties/[id]/page.tsx`, `manilaToday`, `modal.tsx`, `button.tsx`, `cx.ts`, `settings/actions.ts`, `app/layout.tsx`, `intake-picker.tsx`, `LinkButton`, `bir-mail/[id]/page.tsx`, `manilaToday`, `sawt.ts`, `ledger/books.ts`, `deadlines/page.tsx`, `combobox.tsx`, `calendar/page.tsx`, `env.ts`, `leads/actions.ts`, `Notice`, `lib/books/actions.ts`, `portal/page.tsx`, `collections/forms.tsx`, `[month]/page.tsx`, `fees/schedule.ts`, `notification-bell.tsx`, `onboarding/forms.tsx`, `batch/register.ts`, `staff/page.tsx`, `collections/page.tsx`, `read.test.ts`, `sign-in-form.tsx`, `return-file-actions.ts`, `module-pages.tsx`, `opening-checklist.tsx`, `supabaseServer`, `sign-off-actions.tsx`, `payroll/forms.tsx`, `binder/page.tsx`, `slots.ts`, `server-only`, `documents/labels.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `package.json`, `book/actions.ts`, `calendar/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `cycle/actions.ts`, `deadlines/actions.ts`, `app/documents/page.tsx`, `app/settings/page.tsx`, `payment-forms.tsx`, `[clientId]/page.tsx`, `documents/[id]/page.tsx`, `profile.ts`, `billing/[id]/page.tsx`, `approval-memo.tsx`, `react`, `filings/actions.ts`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Should `client` be split into smaller, more focused modules?**
  _Cohesion score 0.04830917874396135 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `form-2307.ts`, `ui.ts`, `quote.ts`, `dependencies`, `Card`, `PageHeader`, `documents/[id]/page.tsx`, `cwt-tracker.ts`, `scores/page.tsx`, `proposal.ts`, `registrations/actions.ts`, `cx`, `public.ts`, `remittances/forms.tsx`, `leads/[id]/page.tsx`, `registrations/[id]/page.tsx`, `Centavos`, `quote/page.tsx`, `returns/types.ts`, `authorize/page.tsx`, `review-form.tsx`, `ledger/data.ts`, `theme-toggle.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `supabaseServer`, `books/forms.tsx`, `work/load.ts`, `stat-cards.tsx`, `LinkButton`, `formatAmount`, `step-files.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `manilaToday`, `modal.tsx`, `modal.tsx`, `button.tsx`, `cx.ts`, `settings/actions.ts`, `app/layout.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `bir-mail/[id]/page.tsx`, `manilaToday`, `toCentavos`, `ledger/books.ts`, `deadlines/page.tsx`, `combobox.tsx`, `Notice`, `portal/page.tsx`, `collections/forms.tsx`, `[month]/page.tsx`, `fees/schedule.ts`, `notification-bell.tsx`, `onboarding/forms.tsx`, `batch/register.ts`, `staff/page.tsx`, `collections/page.tsx`, `sign-in-form.tsx`, `module-pages.tsx`, `next`, `supabaseServer`, `sign-off-actions.tsx`, `payroll/forms.tsx`, `binder/page.tsx`, `slots.ts`, `documents/labels.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `package.json`, `book/actions.ts`, `calendar/page.tsx`, `register/page.tsx`, `cycle/actions.ts`, `deadlines/actions.ts`, `app/documents/page.tsx`, `app/settings/page.tsx`, `payment-forms.tsx`, `[clientId]/page.tsx`, `documents/[id]/page.tsx`, `social-button.tsx`, `profile.ts`, `billing/[id]/page.tsx`, `sign-in-form.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._