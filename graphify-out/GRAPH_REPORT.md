# Graph Report - tallocpa-dashboard  (2026-11-28)

## Corpus Check
- 1179 files · ~965,978 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 22 file(s) not represented in the graph (top: .css 11, (none) 4, .woff2 3)

## Summary
- 7146 nodes · 25055 edges · 224 communities (206 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 228 edges (avg confidence: 0.85)
- Token cost: 240,974 input · 0 output

## Graph Freshness
- Built from commit: `11e13081`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- form-2307.ts
- parallel-run.test.ts
- migrate.yml
- ui.ts
- quote.ts
- dependencies
- Card
- TypeScript Config
- CI Workflow
- Free components
- Deadline Engine Docs
- form-1601c.ts
- Sign-in & Setup Docs
- PageHeader
- Sign-off, Ledger & Payments
- draft.ts
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
- business-switcher.tsx
- fees/schedule.ts
- remittances/forms.tsx
- webhook.ts
- leads/[id]/page.tsx
- registrations/[id]/page.tsx
- payroll/data.ts
- quote/page.tsx
- returns/types.ts
- source.ts
- review-form.tsx
- books/forms.tsx
- access.ts
- theme-toggle.tsx
- year-end/page.tsx
- marketing/page.tsx
- Apple Design
- cx
- testing.ts
- supabaseServer
- payroll/data.ts
- app/page.tsx
- work/load.ts
- Rules
- Animation Performance
- ai-oauth.test.ts
- stat-cards.tsx
- LinkButton
- reports/parallel-run/page.tsx
- step-files.tsx
- parties/[id]/page.tsx
- how-we-work/page.tsx
- app/settings/notifications/page.tsx
- modal.tsx
- Pro components
- modal.tsx
- button.tsx
- cx.ts
- settings/actions.ts
- idle-watcher.tsx
- document-scanner.tsx
- intake-picker.tsx
- form-2316.tsx
- bir-mail/[id]/page.tsx
- tasks/page.tsx
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
- ingest.ts
- auth-templates.ts
- filings/run.ts
- module-pages.tsx
- Notice
- lib/books/actions.ts
- Opening balances: checklist for any cut-off
- payment-proof/poll.ts
- portal/page.tsx
- opening.ts
- collections/forms.tsx
- zod
- apply-migrations.sh
- public.ts
- devDependencies
- notifications-view.tsx
- tieouts.test.ts
- onboarding/forms.tsx
- batch/register.ts
- Staff and Owner UX review (Phase 1)
- @remixicon/react
- Collections Clerk's desk
- collections/page.tsx
- read.test.ts
- cx.ts
- return-file-actions.ts
- tax-codes.ts
- Skeleton
- Card
- collections/ai-tools.ts
- next
- supabaseServer
- tasks/[id]/page.tsx
- pre-review-assistant/README.md
- sign-off-actions.tsx
- payroll/types.ts
- payroll/forms.tsx
- runner-drafts.tsx
- addDays
- slots.ts
- chief-of-staff/README.md
- supabaseAdmin
- site-document.tsx
- authority-templates.ts
- vitest
- pre-review-tools.ts
- document-clerk/README.md
- documents/actions.ts
- template.ts
- filings/[id]/page.tsx
- pending-review.tsx
- cycle/page.tsx
- requireOwner
- arap.ts
- package.json
- portal/layout.tsx
- Rework: one flow from lead to year-end
- money.ts
- calendar/page.tsx
- portal-billing.test.ts
- protocol.ts
- register/page.tsx
- opengraph-image.tsx
- notification-bell.tsx
- registration/ai-tools.ts
- ai-employees.test.ts
- notification-settings-view.tsx
- workpapers/load.ts
- app/documents/page.tsx
- ticked-allocation.test.ts
- acting-approver.test.ts
- app/settings/page.tsx
- memo.ts
- quote/page.tsx
- Payment Proof Clerk's desk
- ref_node_path
- layout.ts
- payment-forms.tsx
- onboarding/ai-tools.ts
- rates.ts
- queries.ts
- eslint.config.mjs
- documents/[id]/page.tsx
- social-button.tsx
- calendar/ai-tools.ts
- contribution-remittances.test.ts
- returns-sign-off.test.ts
- profile.ts
- notifications/format.ts
- bir-mail-clerk/README.md
- registration-runner/README.md
- params.ts
- onboarding-officer/project-instructions.md
- settlement-pages.tsx
- month.ts
- fields.ts
- bir-mail/ai-tools.ts
- returns/books.test.ts
- tests/proposal-email.test.ts
- templates/README.md
- sign-in-form.tsx
- bell-store.ts
- proposal-view.tsx
- fixed-assets/forms.tsx
- showMonth
- leads/page.tsx
- filed-returns.ts
- holiday-list.ts
- ContactAccess
- ai-desks/README.md
- BoardUI page patterns
- lead-attribution.test.ts
- books-migration.test.ts
- tests/books.test.ts
- fixed-assets.test.ts
- workpapers.test.ts
- firm/page.tsx
- workpapers/page.tsx

## God Nodes (most connected - your core abstractions)
1. `supabaseServer()` - 455 edges
2. `cx` - 319 edges
3. `react` - 303 edges
4. `Notice()` - 297 edges
5. `Button()` - 280 edges
6. `Skeleton()` - 276 edges
7. `next` - 271 edges
8. `vitest` - 226 edges
9. `Card()` - 211 edges
10. `Badge()` - 203 edges

## Surprising Connections (you probably didn't know these)
- `Design rules` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `The workflow` --references--> `cx()`  [INFERRED]
  .claude/skills/boardui/SKILL.md → src/components/bir/form-2316.tsx
- `worksheet()` --indirect_call--> `employeeFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `itemFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts
- `worksheet()` --indirect_call--> `priorEmployerFromRow()`  [INFERRED]
  supabase/tests/december-rehearsal.test.ts → src/lib/payroll/rows.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Invite-only authentication setup** — docs_setup_invite_only_sign_in, docs_setup_magic_link_otp, docs_setup_google_oauth_sign_in, docs_setup_resend_custom_smtp, docs_setup_first_owner_bootstrap [EXTRACTED 1.00]
- **Return lifecycle: intake to filed return** — docs_spec_ocr_intake_review_queue, docs_spec_bookkeeping, docs_spec_tax_computation_returns, docs_spec_sign_off_chain, docs_spec_period_lock [EXTRACTED 1.00]
- **Deadline generation flow** — docs_spec_deadline_rules_as_data, docs_spec_holiday_rollforward, docs_spec_calendar_year_withholding, docs_spec_filing_instance_generation, readme_bir_deadline_engine, docs_setup_generate_filings_cron [INFERRED 0.85]

## Communities (224 total, 18 thin omitted)

### Community 0 - "form-2307.ts"
Cohesion: 0.09
Nodes (48): booksContext(), BooksContext, one(), Print(), Print2307Page(), load2307Staff(), PortalPrint2307Page(), Print() (+40 more)

### Community 1 - "parallel-run.test.ts"
Cohesion: 0.10
Nodes (9): doc(), root, approved(), as(), root, Row, bundle(), Part (+1 more)

### Community 2 - "migrate.yml"
Cohesion: 0.07
Nodes (26): concurrency, cancel-in-progress, group, default, description, type, SUPABASE_DB_URL, dry_run (+18 more)

### Community 3 - "ui.ts"
Cohesion: 0.08
Nodes (51): booksViewFor(), fmtMonth(), WithdrawReportButton(), MonthSelect(), BooksSummaryPage(), Summary(), SummaryCard(), fmtDate() (+43 more)

### Community 4 - "quote.ts"
Cohesion: 0.09
Nodes (43): PriceRow, EngagementRow, proposal(), TaxpayerType, EstimatedProfile, estimateProfile(), ExistingClient, gapFor() (+35 more)

### Community 5 - "dependencies"
Cohesion: 0.12
Nodes (16): dependencies, exceljs@4.4.0, @internationalized/date@^3.12.4, next@16.4.6, pg@^8.23.1, react@19.3.0, react-aria-components@^1.22.1, @remixicon/react@^4.9.0 (+8 more)

### Community 6 - "Card"
Cohesion: 0.07
Nodes (53): Detail(), maskNumber(), StatementPage(), metadata, Shared(), SharedStatementPage(), Detail(), PortalStatementDetail() (+45 more)

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

### Community 11 - "form-1601c.ts"
Cohesion: 0.09
Nodes (35): tinDashed(), alphaCols(), Alphalist, AlphalistAgent, alphalistCsv(), alphalistDat(), AlphalistRow, branch4() (+27 more)

### Community 12 - "Sign-in & Setup Docs"
Cohesion: 0.20
Nodes (9): First Owner Bootstrap (staff_profiles insert), Google OAuth Sign-In, Magic Link Email with 6-digit Code, Resend Custom SMTP, Setup Guide, Vercel Deployment (app.tallocpa.com), ocr-provider Interface (Gemini paid tier), Technology Stack (+1 more)

### Community 13 - "PageHeader"
Cohesion: 0.09
Nodes (48): Certificates(), Form2316Page(), ClientList(), ClientsPage(), Row, SORTS, STATUS_GROUPS, Contacts() (+40 more)

### Community 14 - "Sign-off, Ledger & Payments"
Cohesion: 0.25
Nodes (8): Amendment Workflow, Bookkeeping (Phase 1B double-entry ledger), Collections & Statement of Account, Payment Check at Owner Approval, Period Lock, Roles: Owner, Acting Approver, Reviewer, Staff, Client User, Sign-Off Chain, Tax Computation & Returns

### Community 15 - "draft.ts"
Cohesion: 0.18
Nodes (15): DraftIssue, draftSchema, digits(), editDistance(), EmployeeMatch, keyNo(), matchEmployee(), MatchStatus (+7 more)

### Community 16 - "Brand, Fees & Service Lines"
Cohesion: 0.29
Nodes (7): Brands & Firm Settings, Clients & Engagements, Appendix A: Draft Fee Bands, Fee Schedule & Pricing, Gross Receipts Watch (P2.5M warning before P3M VAT), Service Lines, Website Calculator Review Findings

### Community 17 - "Portal, OCR & Scores"
Cohesion: 0.38
Nodes (7): Client Compliance Score (green/yellow/red), Client Portal, Dashboards & Scores, Assigning an Uploaded Document to a Period, Monthly Cycle & Cutoff, OCR Intake & Review Queue, Prior-Year Exceptions Queue

### Community 18 - "statements.ts"
Cohesion: 0.10
Nodes (35): statementsFrom(), FsLine, FsLineKey, isFsLine(), Section, Statement, add(), buildStatements() (+27 more)

### Community 19 - "Data Model & Security Docs"
Cohesion: 0.33
Nodes (4): Supabase Project Setup (Singapore), Data Model (first draft), Notifications & Automation (Resend, n8n plumbing only), Privacy, Security, Retention

### Community 20 - "income.ts"
Cohesion: 0.10
Nodes (69): annualAttachments(), balanceSheet(), compute1701(), compute1702RT(), deductionSchedule(), empty(), inputs1701(), inputs1702RT() (+61 more)

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
Nodes (49): amount(), CwtMatch(), dateFmt, InvoiceList(), showDate(), PortalCwt2307Page(), Tracker(), CwtLooseDocuments() (+41 more)

### Community 41 - "scores/page.tsx"
Cohesion: 0.09
Nodes (39): OcrRate, OwnerSections(), Queue, QueueCell(), waited(), ClientRow, order, PartCell() (+31 more)

### Community 42 - "compare.ts"
Cohesion: 0.05
Nodes (77): CELL, FirmParallelRunPage(), monthShort(), Summary(), Atcs(), Diff(), Documents(), FigureRows() (+69 more)

### Community 43 - "proposal.ts"
Cohesion: 0.08
Nodes (33): corp, items, items, schedule, OWNER_PRICES, OWNER_SETTINGS, bandForSales(), JOB_GROUPS (+25 more)

### Community 44 - "returns/types.ts"
Cohesion: 0.08
Nodes (49): branch4(), branchOfTin(), ParsedTin, payeeKeyOf(), tin9(), tinDigits(), tinHasBranch(), agentBackground() (+41 more)

### Community 45 - "ocr/run.ts"
Cohesion: 0.06
Nodes (44): isSplittable(), MAX_BUNDLE_PAGES, OcrManyOutput, ocrManySchema, OcrPart, page, parseMany(), pdfPageCount() (+36 more)

### Community 46 - "register-xlsx.ts"
Cohesion: 0.09
Nodes (34): RFC-4180, sortItems(), filled(), Grid, GridResult, isCsv(), isXls(), MAX_COLS (+26 more)

### Community 47 - "ai-employees/actions.ts"
Cohesion: 0.04
Nodes (70): maxDuration, POST(), copy(), hashKey(), isKeyShaped(), KEY_LIFETIMES, KEY_PREFIX, keyHint() (+62 more)

### Community 48 - "registrations/actions.ts"
Cohesion: 0.05
Nodes (66): cancelRegistrationAction(), completeRegistrationAction(), dtiRegisteredOn(), fieldErrors(), FormState, openClientCaseAction(), openRegistrationAction(), openYearRenewalsAction() (+58 more)

### Community 49 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:seed:generate, dev, email:auth-templates, lint, postinstall, start (+3 more)

### Community 50 - "business-switcher.tsx"
Cohesion: 0.31
Nodes (10): switchBusinessAction(), BusinessSwitcher(), ALL_BUSINESSES, PORTAL_BUSINESS_COOKIE, Dropdown(), DropdownDivider(), DropdownGroup(), DropdownItem() (+2 more)

### Community 51 - "fees/schedule.ts"
Cohesion: 0.12
Nodes (22): ProposalSetup, JobOption, ProposalQuote, Quote, conditionsSchema, FEE_ITEM_COLUMNS, FEE_SCHEDULE_COLUMNS, FeeItemRow (+14 more)

### Community 52 - "remittances/forms.tsx"
Cohesion: 0.09
Nodes (65): setIncomeTaxMethodAction(), EmployerCard(), setPartyVerifiedAction(), setPresetAccountAction(), GET(), ListRow, ORDER, Remittance() (+57 more)

### Community 53 - "webhook.ts"
Cohesion: 0.08
Nodes (48): maxDuration, POST(), TelegramEnv, ClaimedNotification, TelegramApi, telegramApi(), ALLOWED, BUTTON_LABELS (+40 more)

### Community 54 - "leads/[id]/page.tsx"
Cohesion: 0.09
Nodes (35): NotesCard(), ClientNoteForm(), BookingLink(), CopyLink(), DiscoveryCallForm(), LeadContact, Person, pesoFmt (+27 more)

### Community 55 - "registrations/[id]/page.tsx"
Cohesion: 0.07
Nodes (54): ClientCaseKind, CompleteButton(), StepRow, caseStatus, CertificateDetails, certificateLabel(), fmt(), Registration() (+46 more)

### Community 56 - "payroll/data.ts"
Cohesion: 0.13
Nodes (38): saveMonthAction(), EmployeeDetail(), EmployeePage(), NewEmployee(), NewEmployeePage(), file(), GET(), safe() (+30 more)

### Community 57 - "quote/page.tsx"
Cohesion: 0.11
Nodes (39): activateAction(), createFromTemplateAction(), deleteDraftAction(), FeeFormState, newDraftSchema, refresh(), savePricesAction(), saveSettingsAction() (+31 more)

### Community 58 - "returns/types.ts"
Cohesion: 0.08
Nodes (38): BIR_LINES, BirGroup, BirLine, BirLineKey, isBirLine(), FinancialStatements, BookIncome, INCOME_GROUPS (+30 more)

### Community 59 - "source.ts"
Cohesion: 0.07
Nodes (40): worksheetTaxDue(), recomputeWorksheetAction(), WorksheetState, row(), moduleForForm(), amount(), approvedFields(), BooksSourceRow (+32 more)

### Community 60 - "review-form.tsx"
Cohesion: 0.07
Nodes (49): ApproveItem, approveSelectedAction(), BOOKED, BulkState, INVOICED, key(), approveDocumentAction(), Booking (+41 more)

### Community 61 - "books/forms.tsx"
Cohesion: 0.05
Nodes (103): Accounts(), AccountsPage(), GROUPS, ArapState, changeBooksStartAction(), checkArapFile(), checkOpeningFile(), closeYearAction() (+95 more)

### Community 62 - "access.ts"
Cohesion: 0.08
Nodes (52): addContactBusinessAction(), ContactFormState, createContactAction(), errorsOf(), refresh(), removeContactBusinessAction(), saveContactDetailsAction(), updateContactAccessAction() (+44 more)

### Community 63 - "theme-toggle.tsx"
Cohesion: 0.07
Nodes (41): AppLayout(), nav, ownerNav, OwnerNavLinks(), roleLabel, items, Links(), NavKey (+33 more)

### Community 64 - "year-end/page.tsx"
Cohesion: 0.11
Nodes (31): BooksLockBar(), ICON, LockBarFor(), MonthLock(), loadLockContext(), LockContext, BooksMonthsPage(), Months() (+23 more)

### Community 65 - "marketing/page.tsx"
Cohesion: 0.07
Nodes (52): archiveLinkAction(), createLinkAction(), MarketingState, text(), ArchiveButton(), CopyLink(), N(), pct() (+44 more)

### Community 66 - "Apple Design"
Cohesion: 0.09
Nodes (21): 10. Gesture design details (the "feel" checklist), 11. Frame-level smoothness, 12. Materials & depth — translucency conveys hierarchy, 13. Multimodal feedback — motion + sound + haptics, 14. Reduced motion & accessibility, 15. Typography — optical sizing, tracking, leading, 16. Design foundations — the eight principles, 17. Process (+13 more)

### Community 67 - "cx"
Cohesion: 0.06
Nodes (46): globalSearch(), SearchHit, SearchKind, CommandSearch(), Icon, isMac(), KINDS, noop() (+38 more)

### Community 68 - "testing.ts"
Cohesion: 0.12
Nodes (21): vitest, year, individual, individual, amounts(), cert2307(), ctxFor(), doc() (+13 more)

### Community 69 - "supabaseServer"
Cohesion: 0.05
Nodes (61): nextConfig, next, acceptBirMailMatchAction(), attachBirConfirmationAction(), BirMailState, dismissBirMailAction(), linkBirMailAction(), uuid (+53 more)

### Community 70 - "payroll/data.ts"
Cohesion: 0.06
Nodes (75): GridRow, MonthGrid(), toInput(), AlphaCols, buildAlphalist(), Certificates2316, certificatesFromRaw(), form2316() (+67 more)

### Community 71 - "app/page.tsx"
Cohesion: 0.10
Nodes (39): FilingTable(), ActingNotice(), AmendmentNotice(), DashboardPage(), OwnerBirMail(), OwnerView(), SafeguardsNotice(), Summary() (+31 more)

### Community 72 - "work/load.ts"
Cohesion: 0.21
Nodes (18): amt(), FixedAssets(), FixedAssetsPage(), one(), shiftMonth(), shortMonth(), Row, accumulated() (+10 more)

### Community 73 - "Rules"
Cohesion: 0.09
Nodes (20): caveman, Example output, How to invoke, See also, What it does, 1. Answer first, 2. Kill ceremony, 3. Short word (+12 more)

### Community 74 - "Animation Performance"
Cohesion: 0.11
Nodes (17): Animation Performance, Hard Rules, Initial Response, Operating Posture, Phase 1: Find what animates, Phase 2: Diagnose, Phase 3: Report, React: Don't Animate Through State (+9 more)

### Community 75 - "ai-oauth.test.ts"
Cohesion: 0.06
Nodes (55): RFC-7636, RFC-8414, allowAction(), check(), Checked, ConsentState, denyAction(), OPTIONS (+47 more)

### Community 76 - "stat-cards.tsx"
Cohesion: 0.06
Nodes (38): DashboardStat, DashboardStats(), icons, DEFAULT_FOOTER_STATS, DEFAULT_STATS, DELTA_STYLES, DeltaPill(), FooterStatCard() (+30 more)

### Community 77 - "LinkButton"
Cohesion: 0.22
Nodes (16): Batch(), BatchPage(), one(), toCentavos(), Certificates(), Staff2307Page(), print2307Href(), Portal2307() (+8 more)

### Community 78 - "reports/parallel-run/page.tsx"
Cohesion: 0.60
Nodes (5): ParallelRun(), ParallelRunPage(), quarterMonths(), monthName(), StatusBadge()

### Community 79 - "step-files.tsx"
Cohesion: 0.39
Nodes (8): addStepFile(), removeStepFile(), startStepFileUpload(), FileChip(), StepFile, StepFileList(), StepFileUpload(), send()

### Community 80 - "parties/[id]/page.tsx"
Cohesion: 0.08
Nodes (45): fieldErrors(), mergePartyAction(), PartyFormState, savePartyAction(), fmtDate(), PartyPage(), datAddress(), datNameCols() (+37 more)

### Community 81 - "how-we-work/page.tsx"
Cohesion: 0.12
Nodes (35): HowWeWorkPage(), metadata, Pair(), Split(), step(), StepText(), TimelineFigure(), Chip() (+27 more)

### Community 82 - "app/settings/notifications/page.tsx"
Cohesion: 0.36
Nodes (10): Content(), NotificationSettingsPage(), TelegramLinkButton(), TelegramUnlinkButton(), telegramEnv(), LinkState, setTelegramEnabledAction(), telegramLinkAction() (+2 more)

### Community 83 - "modal.tsx"
Cohesion: 0.06
Nodes (37): react-dom@19.3.0, react-dom, UserMenu(), Avatar(), AvatarColor, AvatarProps, AvatarSize, styles (+29 more)

### Community 84 - "Pro components"
Cohesion: 0.06
Nodes (31): Activity Rings Card, Agent Avatar, Agent Creator, Agent Limits Card, Agent Progress, Area Chart Card, Bar List Card, Calendar (+23 more)

### Community 85 - "modal.tsx"
Cohesion: 0.11
Nodes (34): DecideUnlock(), LockControl(), LockMonth(), Message(), RequestLock(), UnlockDialog(), Button(), CloseButton() (+26 more)

### Community 86 - "button.tsx"
Cohesion: 0.07
Nodes (34): apply(), cookieSaysCollapsed(), isCollapsed(), SidebarToggle(), subscribe(), ButtonLinkProps, ButtonProps, ButtonSize (+26 more)

### Community 87 - "cx.ts"
Cohesion: 0.10
Nodes (57): Books(), PortalBooks(), BookPrint(), PortalBookPrint(), basePeriod(), HeldNote(), holdsWhat(), BooksSection() (+49 more)

### Community 88 - "settings/actions.ts"
Cohesion: 0.21
Nodes (16): addHolidayAction(), addHolidayYearAction(), fieldErrors(), refreshAfterChange(), removeHolidayAction(), RuleRow, SettingsState, updateRuleAction() (+8 more)

### Community 89 - "idle-watcher.tsx"
Cohesion: 0.19
Nodes (19): POST(), ACTIVITY, IdleWatcher(), readCookie(), writeCookie(), formatIdleCookie(), IDLE_COOKIE, IDLE_COOKIE_MAX_AGE (+11 more)

### Community 90 - "document-scanner.tsx"
Cohesion: 0.18
Nodes (20): Adjuster(), DocumentScanner(), capture(), saveScan(), Stage, CV, detectDocument(), loadCv() (+12 more)

### Community 91 - "intake-picker.tsx"
Cohesion: 0.11
Nodes (28): Checkbox(), CheckboxProps, CheckboxGlyph(), CheckboxGlyphState, CheckboxSize, checkboxSizes, SelectItem(), AttributionKeeper() (+20 more)

### Community 92 - "form-2316.tsx"
Cohesion: 0.11
Nodes (29): BoardUI Pro, Building UIs with BoardUI, Choosing components, Design rules, Going deeper, Known gotchas, The workflow, PrintAll() (+21 more)

### Community 93 - "bir-mail/[id]/page.tsx"
Cohesion: 0.19
Nodes (22): checkBirMailboxAction(), BirMailMessagePage(), Mail, manilaDay(), Message(), BirMailPage(), MailList(), MailTable() (+14 more)

### Community 94 - "tasks/page.tsx"
Cohesion: 0.13
Nodes (24): RequestDetail(), RequestPage(), registrationSteps(), STEP_STATUS, TaskRow, Tasks(), TasksPage(), View (+16 more)

### Community 95 - "Recipes"
Cohesion: 0.15
Nodes (13): BoardUI motion reference, Charts and data, Checklist before shipping motion, Duration scale, Hover and press, Modals, Popovers, dropdowns, selects (the soft blur-in), Principles (+5 more)

### Community 96 - "sawt.ts"
Cohesion: 0.09
Nodes (49): Prior, EntryLineOut, Bucket, SaleSplit, invoiceLabel(), sawtAnnualAttachments(), SawtAnnualForm, sawtAttachments() (+41 more)

### Community 97 - "BoardUI page patterns"
Cohesion: 0.18
Nodes (7): BoardUI component catalog, Architecture, BoardUI theming reference, Dark mode, Rebranding, Semantic color families, Type scale

### Community 98 - "Pro templates"
Cohesion: 0.18
Nodes (11): AI Chat Template, AI Image Generation Template, AI Profile Template, Finance Dashboard Template, Home Dashboard Template, HR Management Template, Marketing Dashboard Template, Medical Report Template (+3 more)

### Community 99 - "toCentavos"
Cohesion: 0.09
Nodes (37): AGENCIES, Db, LOANS, p(), PayrollRuns(), Run, applyColumnsAction(), done() (+29 more)

### Community 100 - "ledger/books.ts"
Cohesion: 0.07
Nodes (45): BookPrint(), BookPrintPage(), PrintButton(), LooseLeafHead, LooseLeafPages(), Pad(), BOOK_ABBR, BookEntry (+37 more)

### Community 101 - "deadlines/page.tsx"
Cohesion: 0.07
Nodes (53): AmendmentCard(), BooksStillOpen(), Deadlines(), DeadlinesPage(), documentsWaiting(), FilingGroup(), GROUP_HINT, one() (+45 more)

### Community 102 - "combobox.tsx"
Cohesion: 0.05
Nodes (74): react-aria-components, ChipColor, animateTag(), ComboBox(), ComboBoxItemProps, ComboBoxProps, ComboBoxSectionProps, ComboBoxSelectionMode (+66 more)

### Community 103 - "calendar/page.tsx"
Cohesion: 0.07
Nodes (69): RFC-822, GET(), GET(), checkMailboxesNowAction(), disconnectMailboxAction(), MailboxState, setMailboxPurposesAction(), uuid (+61 more)

### Community 104 - "boardui"
Cohesion: 0.40
Nodes (4): DO_NOT_TRACK, NODE_USE_ENV_PROXY, npx, boardui

### Community 105 - "ingest.ts"
Cohesion: 0.10
Nodes (36): GET(), readBirMail, addDays(), BIR_MAIL_KINDS, classifyBirMail(), findTins(), isBirSender(), iso() (+28 more)

### Community 106 - "auth-templates.ts"
Cohesion: 0.19
Nodes (11): dir, readme, templates, afterButton(), AUTH_EMAIL_BRAND, authEmailTemplates(), AuthTemplate, escape() (+3 more)

### Community 107 - "filings/run.ts"
Cohesion: 0.07
Nodes (53): generateFilingsNow(), generatePastFilingsAction(), Rule, compareIso(), IsoDate, DeadlineRule, DueRule, EfpsGroup (+45 more)

### Community 108 - "module-pages.tsx"
Cohesion: 0.09
Nodes (35): BankAccountsRoute(), SearchParams, BooksFrame(), BooksList(), Column, ListRow, RowLink(), CustomersRoute() (+27 more)

### Community 109 - "Notice"
Cohesion: 0.06
Nodes (117): react, setupMissingChartsAction(), BatchUpload(), PreviewTable(), AccountForm(), AmendmentRequestForm(), ArapUpload(), CloseYearForm() (+109 more)

### Community 110 - "lib/books/actions.ts"
Cohesion: 0.06
Nodes (68): decideUnlockAction(), lockMonthAction(), LockState, refresh(), requestLockAction(), requestUnlockAction(), run(), text() (+60 more)

### Community 111 - "Opening balances: checklist for any cut-off"
Cohesion: 0.40
Nodes (4): Choosing the cut-off, Opening balances: checklist for any cut-off, The checklist, What the app does with a mid-year cut-off

### Community 112 - "payment-proof/poll.ts"
Cohesion: 0.06
Nodes (57): MailPart, recordCheck(), Candidate, cents(), CLERK, FilingRow, MailDetail, mailId (+49 more)

### Community 113 - "portal/page.tsx"
Cohesion: 0.11
Nodes (34): BooksChart(), compact, longMonth(), short(), shortMonth(), BooksCards(), cents(), Home() (+26 more)

### Community 114 - "opening.ts"
Cohesion: 0.15
Nodes (18): PNL_TYPES, CheckedOpening, checkOpening(), fmt(), ItemRow, OpeningItem, OpeningLine, sheetOf() (+10 more)

### Community 115 - "collections/forms.tsx"
Cohesion: 0.16
Nodes (26): addChargeAction(), applyCreditAction(), approveLateSurchargeAction(), clearRemittedAction(), date, depositSchema, markRemittedAction(), MoneyState (+18 more)

### Community 116 - "zod"
Cohesion: 0.08
Nodes (35): zod, mySchedule, clientRef, findClient(), getClient, listMyClients, notYours(), CLERK (+27 more)

### Community 118 - "public.ts"
Cohesion: 0.15
Nodes (19): pageAttribution(), previewQuoteAction(), PreviewState, quoteFields(), requestQuoteAction(), SERVICES, StartState, InstantQuote (+11 more)

### Community 119 - "devDependencies"
Cohesion: 0.12
Nodes (16): devDependencies, @tailwindcss/turbopack@4.3.3, tsx@^4.23.15, @types/node@^20, @types/pg@^8.23.1, @types/react@^19, @types/react-dom@^19, typescript@^5 (+8 more)

### Community 120 - "notifications-view.tsx"
Cohesion: 0.12
Nodes (28): Content(), NotificationsPage(), Content(), PortalNotificationsPage(), notifyNotificationsChanged(), MarkAllReadButton(), NotificationFilterTabs(), NotificationRow() (+20 more)

### Community 121 - "tieouts.test.ts"
Cohesion: 0.17
Nodes (8): RegisterRow, base, books, buy, sale, approved(), as(), root

### Community 122 - "onboarding/forms.tsx"
Cohesion: 0.13
Nodes (21): ClientTab, ClientTabs(), UNDER, addClientFile(), KINDS, OnboardingState, refresh(), removeClientFileAction() (+13 more)

### Community 123 - "batch/register.ts"
Cohesion: 0.09
Nodes (39): BatchPreview, BatchState, postBatchAction(), previewBatchAction(), readAndCheck(), GET(), safe(), loadAccounts() (+31 more)

### Community 124 - "Staff and Owner UX review (Phase 1)"
Cohesion: 0.18
Nodes (10): Build order, Capital expenditure and depreciation, Data flow: one register, Deadline safeguards, Findings, Owner's decisions (25 November 2026), Recommendations, Sidebar (+2 more)

### Community 125 - "@remixicon/react"
Cohesion: 0.12
Nodes (38): @remixicon/react, Row, PortalRequest(), RequestDetail(), PortalRequests(), Requests(), Row, when() (+30 more)

### Community 126 - "Collections Clerk's desk"
Cohesion: 0.14
Nodes (11): Collections run, Rules, Steps, Where to deposit, How you work, Your job, Before you start (TalloCPA OS), Check it (+3 more)

### Community 127 - "collections/page.tsx"
Cohesion: 0.11
Nodes (40): ClientCollectionsPage(), Deposit, Detail(), maskNumber(), ApplyCreditButton(), LateSurchargeActions(), ReasonAction(), Result() (+32 more)

### Community 128 - "read.test.ts"
Cohesion: 0.06
Nodes (61): geminiJson(), PayrollItem, amountOf(), applyColumns(), CATEGORY_ALIASES, columnsOf(), FIELD_ALIASES, FIELD_BY_ALIAS (+53 more)

### Community 129 - "cx.ts"
Cohesion: 0.09
Nodes (26): BirCalendarPage(), metadata, CounterColor, CounterProps, styles, StatusDot(), StatusDotColor, StatusDotProps (+18 more)

### Community 130 - "return-file-actions.ts"
Cohesion: 0.09
Nodes (45): RFC-2047, RFC-2822, GET(), RetryBookEntry(), send(), addReturnFile(), checkEsubmissionReplyAction(), markEsubmissionSentAction() (+37 more)

### Community 131 - "tax-codes.ts"
Cohesion: 0.13
Nodes (23): blankLine(), InvoiceForm(), InvoiceFormValue, ComboBoxItem(), ComboBoxSection(), Pick(), PickOption, appliesTo() (+15 more)

### Community 132 - "Skeleton"
Cohesion: 0.08
Nodes (50): fmtDate(), INVOICE_KINDS, InvoiceEdit(), InvoiceList(), InvoiceView(), Kind, Props, STATUS_TONE (+42 more)

### Community 133 - "Card"
Cohesion: 0.10
Nodes (27): StaffOptions(), DocReviewActions(), DocumentsCard(), when(), Form(), NewBillPage(), DraftRow, PaymentProofSuggestions() (+19 more)

### Community 134 - "collections/ai-tools.ts"
Cohesion: 0.08
Nodes (28): Due, byStatement(), cents(), CLERK, clientPaymentHistory, collectionsSummary, draftPaymentReminder, History (+20 more)

### Community 135 - "next"
Cohesion: 0.06
Nodes (84): metadata, QuotesClosed(), Start(), StartPage(), robots(), AboutPage(), HOW, metadata (+76 more)

### Community 136 - "supabaseServer"
Cohesion: 0.05
Nodes (65): addEngagementAction(), assignStaffAction(), ClientStatusTarget, createClientAction(), fieldErrors(), FormState, removeAssignmentAction(), setCatchUpAction() (+57 more)

### Community 137 - "tasks/[id]/page.tsx"
Cohesion: 0.17
Nodes (24): TaskDetail(), TaskPage(), ClientOption, pesos, StaffOption, TaskDefaults, TaskStatusButtons(), TaskWorkflow() (+16 more)

### Community 138 - "pre-review-assistant/README.md"
Cohesion: 0.17
Nodes (9): Pre-review, Rules, Steps, How you work, Your job, Before you start (TalloCPA OS), Check it, Pre-Review Assistant's desk (+1 more)

### Community 139 - "sign-off-actions.tsx"
Cohesion: 0.24
Nodes (11): SignOffState, checkTone, checkWord, needsNote(), noteLabel(), noteRequired(), PaymentCheck, PaymentCheckView() (+3 more)

### Community 140 - "payroll/types.ts"
Cohesion: 0.11
Nodes (22): cellText(), CheckedEmployees, checkEmployeeImport(), code(), EMPLOYEE_IMPORT_COLUMNS, EMPLOYEE_SHEET, EmployeeImportRow, readEmployeeFile() (+14 more)

### Community 141 - "payroll/forms.tsx"
Cohesion: 0.09
Nodes (46): checkEmployeeFile(), deleteItemAction(), deletePriorEmployerAction(), EmployeeImportState, fieldErrors(), fileOf(), FormState, friendly() (+38 more)

### Community 142 - "runner-drafts.tsx"
Cohesion: 0.15
Nodes (19): AuthorityPrint(), AuthorityPrintPage(), Payload, DraftRow, RunnerDrafts(), when, SendRunnerRequestsButtons(), AiDraftsPanel() (+11 more)

### Community 143 - "addDays"
Cohesion: 0.15
Nodes (22): Action(), MyWork(), MyWorkPage(), short(), TONE, loadAssets(), standingLine(), sortTasks() (+14 more)

### Community 144 - "slots.ts"
Cohesion: 0.12
Nodes (33): bookDiscoveryCallAction(), Booking(), BookingPage(), metadata, when, bookClientMeetingAction(), cancelMyMeetingAction(), Book() (+25 more)

### Community 145 - "chief-of-staff/README.md"
Cohesion: 0.12
Nodes (12): Format, Morning brief, Rules, Steps, How you work, When the Owner asks something else, Your job, Before you start (TalloCPA OS) (+4 more)

### Community 146 - "supabaseAdmin"
Cohesion: 0.07
Nodes (66): server-only, @supabase/supabase-js, GET(), GET(), GET(), GET(), PLACES, assignReviewerAction() (+58 more)

### Community 147 - "site-document.tsx"
Cohesion: 0.11
Nodes (15): GlobalNotFound(), metadata, inter, metadata, montserrat, metadata, SiteLayout(), SiteNotFound() (+7 more)

### Community 148 - "authority-templates.ts"
Cohesion: 0.13
Nodes (21): AuthorityDocument, authorityDocumentFor(), authorityRequirement(), BLANK, buildAuthority(), FilledAuthority, FilledField, fillTemplate() (+13 more)

### Community 149 - "vitest"
Cohesion: 0.02
Nodes (56): codes, PNL, acct(), ADVANCES_FROM, ASSETS, build(), COA_TEMPLATES, CONTRA (+48 more)

### Community 150 - "pre-review-tools.ts"
Cohesion: 0.13
Nodes (21): compareLines(), LineChange, NEAR_SHARE, NOTABLE_AMOUNT, NOTABLE_PCT, pesos(), quarterStart(), ThresholdStatus (+13 more)

### Community 151 - "document-clerk/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Document Clerk's desk, Set up the desk (Cowork, once), Review queue, Rules (+1 more)

### Community 152 - "documents/actions.ts"
Cohesion: 0.19
Nodes (18): AttachBatchImage(), attach(), DocumentUpload(), send(), upload(), Item, typeFromName(), ALLOWED (+10 more)

### Community 153 - "template.ts"
Cohesion: 0.13
Nodes (17): AUDIT_FIRM_FALLBACK, AUDIT_ITEMS, AUDIT_TAXPAYERS, BILLED, BOOKKEEPING_LABEL, DOCUMENT_BANDS, EMPLOYEE_BANDS, employeeItems() (+9 more)

### Community 154 - "filings/[id]/page.tsx"
Cohesion: 0.05
Nodes (56): ClientReturnsPage(), FilingRow, Returns(), FilingListRow, bookKind, BookRow, bookStatus, Event (+48 more)

### Community 155 - "pending-review.tsx"
Cohesion: 0.33
Nodes (12): moveSelectedAction(), MoveState, plural(), requestUnlockToDeferAction(), unapproveSelectedAction(), MoveBar(), MoveItem, crossesYear() (+4 more)

### Community 156 - "cycle/page.tsx"
Cohesion: 0.11
Nodes (34): Cycle(), CycleWithClient, DocRow, shift(), one(), ORDER, PortalUpload(), STREAM_INFO (+26 more)

### Community 157 - "requireOwner"
Cohesion: 0.07
Nodes (67): RFC-2606, MonthRemittances(), StepBadge(), addWorkforceAction(), AiState, assignClientAction(), createAiLogin(), createKeyAction() (+59 more)

### Community 158 - "arap.ts"
Cohesion: 0.12
Nodes (27): exceljs, dayBefore(), GET(), safe(), accountLabel(), AGING, aging(), agingBucket() (+19 more)

### Community 159 - "package.json"
Cohesion: 0.18
Nodes (10): motion@^12.43.0, @techstark/opencv-js@4.12.0-release.1, tailwindcss@4.3.3, name, packageManager, private, version, motion (+2 more)

### Community 160 - "portal/layout.tsx"
Cohesion: 0.19
Nodes (15): BusinessBar(), ClosingNotice(), Nav(), PortalLayout(), PortalNav(), activeTab(), GRID_COLS, mainTabs (+7 more)

### Community 161 - "Rework: one flow from lead to year-end"
Cohesion: 0.13
Nodes (14): After the rework (Owner, 26 November 2026), Books (Manager.io style, staff only), Build plan, Collections and the portal, Decisions (Owner, 25 November 2026), Firm, leads, calendar, year-end, Intake and Inbox, Navigation (+6 more)

### Community 162 - "money.ts"
Cohesion: 0.19
Nodes (15): Lines(), lineStyle, Problems(), sameFigures(), Schedule(), when(), Worksheet(), WorksheetPage() (+7 more)

### Community 163 - "calendar/page.tsx"
Cohesion: 0.13
Nodes (30): cancelMeetingAction(), disconnectCalendarAction(), FormState, DisconnectButton(), addDays(), dayLabel(), ERRORS, TeamCalendar() (+22 more)

### Community 164 - "portal-billing.test.ts"
Cohesion: 0.33
Nodes (3): as(), root, signIn()

### Community 165 - "protocol.ts"
Cohesion: 0.14
Nodes (17): ERR, fail(), handleBody(), handleMessage(), Id, isRequest(), LATEST_VERSION, McpServer (+9 more)

### Community 166 - "register/page.tsx"
Cohesion: 0.12
Nodes (35): amt(), CertificatesTable(), Href, LineParts(), one(), PartsLink(), PurchasesTable(), Register() (+27 more)

### Community 167 - "opengraph-image.tsx"
Cohesion: 0.40
Nodes (5): alt, contentType, Image(), montserrat(), size

### Community 168 - "notification-bell.tsx"
Cohesion: 0.24
Nodes (16): markReadLocally(), BellPanel(), BellRow(), DotBadge(), NotificationBell(), base(), BellAudience, notificationSettingsHref() (+8 more)

### Community 169 - "registration/ai-tools.ts"
Cohesion: 0.14
Nodes (18): loadMail(), loadDocument(), loadFiling(), ToolRefusal, mailDetail(), caseId, draftAuthorityDocument, draftBirRegistrationForm (+10 more)

### Community 170 - "ai-employees.test.ts"
Cohesion: 0.22
Nodes (5): BOOKS, CLIENT_RECORDS, DOCUMENT_RECORDS, OWN, root

### Community 171 - "notification-settings-view.tsx"
Cohesion: 0.20
Nodes (14): Content(), PortalNotificationSettingsPage(), EmailSwitches(), EmailSwitchGroup, NotificationSettingsView(), Switch(), setEmailPreference(), kindsFor() (+6 more)

### Community 172 - "workpapers/load.ts"
Cohesion: 0.17
Nodes (20): month1601C(), RegisterLine, Adjustment, c(), loadPeriodFile(), monthEnd(), PeriodFile, quarterStart() (+12 more)

### Community 173 - "app/documents/page.tsx"
Cohesion: 0.08
Nodes (41): ApprovedReview(), ApprovedRow, ClientSelect(), ApprovedTable(), BOOKED_TYPES, bundleLabels(), ClientList(), ClientPending() (+33 more)

### Community 174 - "ticked-allocation.test.ts"
Cohesion: 0.32
Nodes (4): root, signIn(), submit(), verify()

### Community 175 - "acting-approver.test.ts"
Cohesion: 0.29
Nodes (3): as(), root, signIn()

### Community 176 - "app/settings/page.tsx"
Cohesion: 0.26
Nodes (12): RemoveHolidayButton(), appliesTo(), DeadlineSettings(), fmtDate(), kindLabel, periodNote(), SettingsPage(), describeDue() (+4 more)

### Community 177 - "memo.ts"
Cohesion: 0.19
Nodes (12): ReviewNote, Memo, MemoMonth, ALWAYS, REFS_FOR_FORM, refsToSign(), reviewGaps(), SIGNED_REFS (+4 more)

### Community 178 - "quote/page.tsx"
Cohesion: 0.22
Nodes (15): loadSchedules(), loadTaxOnFee(), FeeGapPage(), Gap(), COMPLEXITY_LABEL, Lines(), Preview(), QuotePreviewPage() (+7 more)

### Community 179 - "Payment Proof Clerk's desk"
Cohesion: 0.13
Nodes (12): Payment proofs, Rules, Steps, How you work, Your job, 1. The payment mailbox (once; docs/SETUP.md → *Payment confirmations mailbox*), 2. TalloCPA OS: Settings → AI employees → **Payment Proof Clerk**, Before you start (+4 more)

### Community 180 - "ref_node_path"
Cohesion: 0.02
Nodes (37): pg, outDir, pkgDir, require, { version }, poolConfig(), root, root (+29 more)

### Community 181 - "layout.ts"
Cohesion: 0.08
Nodes (37): digestMessage(), DigestRow, longDay(), peso, time(), cycleMessage(), dayFmt, NoticeKind (+29 more)

### Community 182 - "payment-forms.tsx"
Cohesion: 0.20
Nodes (22): PaymentSettings(), accountSchema, addPaymentAccountAction(), movePaymentAccountAction(), PaymentSettingsState, QR_TYPES, refresh(), replaceQrAction() (+14 more)

### Community 183 - "onboarding/ai-tools.ts"
Cohesion: 0.07
Nodes (31): DRAFT_KIND_LABELS, DraftLine, NewDraft, saveDraft(), AiOnboardingFacts, cents(), checklistOf(), DRAFT_KINDS (+23 more)

### Community 184 - "rates.ts"
Cohesion: 0.26
Nodes (16): AmountRate, CorporateRate, corporateRates(), eightPercentRate(), graduatedIncomeTax(), IncomeTaxTable, mcitRate(), percentageTaxNonbankRate() (+8 more)

### Community 185 - "queries.ts"
Cohesion: 0.19
Nodes (14): GET(), BELL_LIMIT, BellData, bellData, bellDataFor, emailOffKinds(), emailPreferences(), latestNotifications() (+6 more)

### Community 186 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 187 - "documents/[id]/page.tsx"
Cohesion: 0.08
Nodes (47): Doc, ExceptionRow, addBundleInvoiceAction(), deleteBundleInvoiceAction(), pageOf(), setBundlePageAction(), AddBundleInvoice(), BundlePage() (+39 more)

### Community 188 - "social-button.tsx"
Cohesion: 0.20
Nodes (12): DARK_INVERTED_BRANDS, SocialBrand, SocialBrandConfig, SocialButtonAppearance, SocialButtonBaseProps, SocialButtonLinkProps, SocialButtonProps, SocialButtonSize (+4 more)

### Community 189 - "calendar/ai-tools.ts"
Cohesion: 0.21
Nodes (10): asDate(), isoDay(), KIND_ORDER, manilaDay, manilaTime, SCHEDULE_MAX_DAYS, ScheduleItem, scheduleItems() (+2 more)

### Community 190 - "contribution-remittances.test.ts"
Cohesion: 0.40
Nodes (3): as(), postRun(), root

### Community 191 - "returns-sign-off.test.ts"
Cohesion: 0.15
Nodes (8): api, ctx, fn, rows, src, as(), attach(), root

### Community 192 - "profile.ts"
Cohesion: 0.06
Nodes (61): BrandSettingsState, finishBrandUpload(), refresh(), saveBrandSectionAction(), SAVED, StartBrandUpload, startBrandUpload(), BrandFileUpload() (+53 more)

### Community 193 - "notifications/format.ts"
Cohesion: 0.21
Nodes (13): clock, DayGroup, dayLabel(), daysBetween(), groupByDay(), longDay, longDayYear, manilaDay() (+5 more)

### Community 194 - "bir-mail-clerk/README.md"
Cohesion: 0.17
Nodes (9): BIR mail, Rules, Steps, How you work, Your job, Before you start (TalloCPA OS), BIR Mail Clerk's desk, Check it (+1 more)

### Community 195 - "registration-runner/README.md"
Cohesion: 0.17
Nodes (9): How you work, Your job, Before you start (TalloCPA OS), Check it, Registration Runner's desk, Set up the desk (Cowork, once), Registration check, Rules (+1 more)

### Community 196 - "params.ts"
Cohesion: 0.24
Nodes (12): complexity(), count(), EWT_CHOICES, first(), MAX_MONTHS_BEHIND, pick(), profileFromQuery(), profileFromStored() (+4 more)

### Community 197 - "onboarding-officer/project-instructions.md"
Cohesion: 0.15
Nodes (10): Onboard a client, Rules, Steps, How you work, Never, Your job, Before you start (TalloCPA OS), Check it (+2 more)

### Community 198 - "settlement-pages.tsx"
Cohesion: 0.13
Nodes (22): PaymentsNewPage(), PaymentsListPage(), PaymentsEditPage(), ReceiptsNewPage(), ReceiptsListPage(), ReceiptsEditPage(), fmt(), OpenInvoice (+14 more)

### Community 199 - "month.ts"
Cohesion: 0.26
Nodes (10): invoiceLabel(), MissingNumber, MissingRange, missingRanges(), monthTimeline(), PLAIN, plainForm(), none (+2 more)

### Community 200 - "fields.ts"
Cohesion: 0.11
Nodes (26): checkFields(), Issue, num(), msgs(), ok, dateFarFromMonth(), iso(), MONTHS (+18 more)

### Community 201 - "bir-mail/ai-tools.ts"
Cohesion: 0.18
Nodes (12): BIR_MAIL_DRAFT, birMailToMatch, CLERK, isoDate, mailId, MailRow, manilaDay(), MESSAGE_KINDS (+4 more)

### Community 202 - "returns/books.test.ts"
Cohesion: 0.19
Nodes (8): client, form1701, form1702RT, form1701Q, form1702Q, form2551Q, form2550Q, payslipSchedule()

### Community 203 - "tests/proposal-email.test.ts"
Cohesion: 0.29
Nodes (4): HASH, LEAD, root, Row

### Community 206 - "sign-in-form.tsx"
Cohesion: 0.27
Nodes (10): sendSignInEmail(), verifySignInCode(), errors, Form(), LoginPage(), notices, SignInForm(), Divider() (+2 more)

### Community 207 - "bell-store.ts"
Cohesion: 0.38
Nodes (11): emit(), listeners, onChanged(), onFocus(), onVisible(), refreshBell(), set(), start() (+3 more)

### Community 208 - "proposal-view.tsx"
Cohesion: 0.29
Nodes (11): jobName(), lineName(), longDate(), money(), php, ProposalView(), Rows(), Section() (+3 more)

### Community 209 - "fixed-assets/forms.tsx"
Cohesion: 0.36
Nodes (8): addOpeningAssetAction(), AssetState, refresh(), runDepreciationAction(), setupAssetAction(), Message(), RunDepreciationButton(), SetupAssetForm()

### Community 210 - "showMonth"
Cohesion: 0.14
Nodes (25): amt(), Binder(), BinderPage(), MonthSection(), one(), RegisterTable(), TIE_STATUS, advanceFilingAction() (+17 more)

### Community 211 - "leads/page.tsx"
Cohesion: 0.31
Nodes (9): FunnelSwitch(), day(), Leads(), LeadsPage(), Row, ViewLink(), LEAD_STAGE_ORDER, LEAD_STAGES (+1 more)

### Community 212 - "filed-returns.ts"
Cohesion: 0.22
Nodes (8): TAX_TYPE_GROUPS, FiledFileRow, FiledReturn, FiledReturnRow, LegacyFileRow, TaxTypeGroup, rows, TYPE_ORDER

### Community 213 - "holiday-list.ts"
Cohesion: 0.27
Nodes (9): easterSunday(), HolidayKind, HolidayRule, holidayYear(), iso(), STANDARD_HOLIDAYS, StandardHoliday, suggestedDate() (+1 more)

### Community 214 - "ContactAccess"
Cohesion: 0.22
Nodes (9): SwitcherBusiness, PortalClient, Identity, IdentityRow, ContactAccess, GrantInput, Contact, ContactBusiness (+1 more)

### Community 216 - "BoardUI page patterns"
Cohesion: 0.29
Nodes (7): AI chat page, Auth page, BoardUI page patterns, Dashboard page, Settings, Table page, When a template fits, use it

### Community 217 - "lead-attribution.test.ts"
Cohesion: 0.29
Nodes (4): LEAD, LinkRow, ReportRow, root

### Community 218 - "books-migration.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 219 - "tests/books.test.ts"
Cohesion: 0.50
Nodes (3): approved(), as(), root

### Community 220 - "fixed-assets.test.ts"
Cohesion: 0.50
Nodes (3): as(), purchase(), root

### Community 221 - "workpapers.test.ts"
Cohesion: 0.50
Nodes (3): as(), bookedDoc(), root

### Community 222 - "firm/page.tsx"
Cohesion: 0.67
Nodes (3): FirmPage(), Places(), REVIEWER_PLACES

### Community 223 - "workpapers/page.tsx"
Cohesion: 0.18
Nodes (20): ExplainState, explainTieAction(), noteAction(), raiseNoteAction(), SIGNED, signWorkpaperAction(), tickAdjustmentAction(), amt() (+12 more)

## Knowledge Gaps
- **32 isolated node(s):** `RFC-822`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY`, `npx`, `RFC-2047` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1983 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `vitest` connect `testing.ts` to `form-2307.ts`, `parallel-run.test.ts`, `ui.ts`, `quote.ts`, `Card`, `PageHeader`, `statements.ts`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `proposal.ts`, `returns/types.ts`, `ocr/run.ts`, `ai-employees/actions.ts`, `registrations/actions.ts`, `fees/schedule.ts`, `remittances/forms.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `registrations/[id]/page.tsx`, `quote/page.tsx`, `returns/types.ts`, `source.ts`, `review-form.tsx`, `books/forms.tsx`, `access.ts`, `year-end/page.tsx`, `marketing/page.tsx`, `supabaseServer`, `payroll/data.ts`, `app/page.tsx`, `work/load.ts`, `ai-oauth.test.ts`, `parties/[id]/page.tsx`, `cx.ts`, `settings/actions.ts`, `idle-watcher.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `tasks/page.tsx`, `toCentavos`, `ledger/books.ts`, `deadlines/page.tsx`, `calendar/page.tsx`, `ingest.ts`, `auth-templates.ts`, `filings/run.ts`, `lib/books/actions.ts`, `payment-proof/poll.ts`, `portal/page.tsx`, `opening.ts`, `zod`, `public.ts`, `devDependencies`, `tieouts.test.ts`, `batch/register.ts`, `@remixicon/react`, `collections/page.tsx`, `read.test.ts`, `cx.ts`, `return-file-actions.ts`, `tax-codes.ts`, `Skeleton`, `collections/ai-tools.ts`, `next`, `supabaseServer`, `addDays`, `slots.ts`, `supabaseAdmin`, `authority-templates.ts`, `vitest`, `pre-review-tools.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `arap.ts`, `package.json`, `portal/layout.tsx`, `money.ts`, `calendar/page.tsx`, `portal-billing.test.ts`, `protocol.ts`, `register/page.tsx`, `ai-employees.test.ts`, `app/documents/page.tsx`, `ticked-allocation.test.ts`, `acting-approver.test.ts`, `app/settings/page.tsx`, `memo.ts`, `ref_node_path`, `layout.ts`, `onboarding/ai-tools.ts`, `rates.ts`, `calendar/ai-tools.ts`, `contribution-remittances.test.ts`, `returns-sign-off.test.ts`, `profile.ts`, `notifications/format.ts`, `params.ts`, `month.ts`, `fields.ts`, `returns/books.test.ts`, `tests/proposal-email.test.ts`, `filed-returns.ts`, `holiday-list.ts`, `lead-attribution.test.ts`, `books-migration.test.ts`, `tests/books.test.ts`, `fixed-assets.test.ts`, `workpapers.test.ts`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **What connects `RFC-822`, `DO_NOT_TRACK`, `NODE_USE_ENV_PROXY` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `form-2307.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08757062146892655 - nodes in this community are weakly interconnected._
- **Why does `next` connect `supabaseServer` to `form-2307.ts`, `ui.ts`, `dependencies`, `Card`, `PageHeader`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `ai-employees/actions.ts`, `registrations/actions.ts`, `business-switcher.tsx`, `remittances/forms.tsx`, `webhook.ts`, `leads/[id]/page.tsx`, `registrations/[id]/page.tsx`, `payroll/data.ts`, `quote/page.tsx`, `source.ts`, `review-form.tsx`, `books/forms.tsx`, `access.ts`, `theme-toggle.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `cx`, `app/page.tsx`, `work/load.ts`, `ai-oauth.test.ts`, `LinkButton`, `reports/parallel-run/page.tsx`, `step-files.tsx`, `parties/[id]/page.tsx`, `app/settings/notifications/page.tsx`, `cx.ts`, `settings/actions.ts`, `idle-watcher.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `bir-mail/[id]/page.tsx`, `tasks/page.tsx`, `toCentavos`, `ledger/books.ts`, `deadlines/page.tsx`, `calendar/page.tsx`, `ingest.ts`, `filings/run.ts`, `module-pages.tsx`, `Notice`, `lib/books/actions.ts`, `portal/page.tsx`, `collections/forms.tsx`, `public.ts`, `notifications-view.tsx`, `onboarding/forms.tsx`, `batch/register.ts`, `@remixicon/react`, `collections/page.tsx`, `return-file-actions.ts`, `Skeleton`, `Card`, `next`, `supabaseServer`, `tasks/[id]/page.tsx`, `sign-off-actions.tsx`, `payroll/forms.tsx`, `runner-drafts.tsx`, `addDays`, `slots.ts`, `supabaseAdmin`, `site-document.tsx`, `documents/actions.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `arap.ts`, `package.json`, `portal/layout.tsx`, `money.ts`, `calendar/page.tsx`, `register/page.tsx`, `opengraph-image.tsx`, `notification-bell.tsx`, `app/documents/page.tsx`, `app/settings/page.tsx`, `quote/page.tsx`, `payment-forms.tsx`, `queries.ts`, `documents/[id]/page.tsx`, `profile.ts`, `settlement-pages.tsx`, `fixed-assets/forms.tsx`, `showMonth`, `leads/page.tsx`, `firm/page.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **Should `parallel-run.test.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09941520467836257 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Notice` to `form-2307.ts`, `ui.ts`, `dependencies`, `Card`, `PageHeader`, `cwt-tracker.ts`, `scores/page.tsx`, `compare.ts`, `proposal.ts`, `business-switcher.tsx`, `remittances/forms.tsx`, `leads/[id]/page.tsx`, `registrations/[id]/page.tsx`, `payroll/data.ts`, `quote/page.tsx`, `review-form.tsx`, `books/forms.tsx`, `access.ts`, `theme-toggle.tsx`, `year-end/page.tsx`, `marketing/page.tsx`, `cx`, `supabaseServer`, `app/page.tsx`, `work/load.ts`, `stat-cards.tsx`, `LinkButton`, `reports/parallel-run/page.tsx`, `step-files.tsx`, `parties/[id]/page.tsx`, `how-we-work/page.tsx`, `app/settings/notifications/page.tsx`, `modal.tsx`, `modal.tsx`, `button.tsx`, `cx.ts`, `settings/actions.ts`, `idle-watcher.tsx`, `document-scanner.tsx`, `intake-picker.tsx`, `form-2316.tsx`, `bir-mail/[id]/page.tsx`, `tasks/page.tsx`, `toCentavos`, `ledger/books.ts`, `deadlines/page.tsx`, `combobox.tsx`, `calendar/page.tsx`, `module-pages.tsx`, `lib/books/actions.ts`, `portal/page.tsx`, `collections/forms.tsx`, `notifications-view.tsx`, `onboarding/forms.tsx`, `@remixicon/react`, `collections/page.tsx`, `cx.ts`, `return-file-actions.ts`, `tax-codes.ts`, `Skeleton`, `Card`, `next`, `supabaseServer`, `tasks/[id]/page.tsx`, `sign-off-actions.tsx`, `payroll/forms.tsx`, `runner-drafts.tsx`, `addDays`, `slots.ts`, `supabaseAdmin`, `site-document.tsx`, `documents/actions.ts`, `filings/[id]/page.tsx`, `pending-review.tsx`, `cycle/page.tsx`, `requireOwner`, `package.json`, `portal/layout.tsx`, `money.ts`, `calendar/page.tsx`, `register/page.tsx`, `notification-bell.tsx`, `notification-settings-view.tsx`, `app/documents/page.tsx`, `app/settings/page.tsx`, `quote/page.tsx`, `payment-forms.tsx`, `queries.ts`, `documents/[id]/page.tsx`, `social-button.tsx`, `profile.ts`, `settlement-pages.tsx`, `sign-in-form.tsx`, `bell-store.ts`, `fixed-assets/forms.tsx`, `showMonth`, `leads/page.tsx`, `firm/page.tsx`, `workpapers/page.tsx`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Should `migrate.yml` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._