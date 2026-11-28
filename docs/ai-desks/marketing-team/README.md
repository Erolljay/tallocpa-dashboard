# Marketing Team (Claude Code)

One connector for the whole **Marketing & Growth** department. You use it from **Claude Code**, together with the marketing skill packs you choose from GitHub. Each of the five roles is a skill there: Content Writer, Social Media Manager, SEO Specialist, Sales Assistant and Marketing Analyst.

**What it sees:**
- Tallo CPA's **public** facts: names, credentials, services, service areas and contact details.
- The **fee schedule**.
- The **leads**: prospects who asked for a quote.
- The **Firm → Marketing** report: leads, quotes and wins by channel and month.
- The **website's** pages, SEO titles and FAQs.

**What it never sees:** client records, books, returns, documents or receivables. If a lead became a client, it sees only "converted" and the date.

**What it never does:** send, post, publish, or change a price. Proposals and follow-ups are **drafts** that only you see, on the lead's page under *Suggested by the Marketing Team*. Website changes go in as pull requests for you to review.

## 1. TalloCPA OS (once)

1. Go to **Settings → AI employees**. If **Marketing Team** isn't listed, click **Add workforce**.
2. Open **Marketing Team** and switch it **On**. Books access stays **None**; no clients can be assigned.
3. Go to **Connector → Tools** and grant all eight:

| Tool | What it gives |
|---|---|
| `firm_profile` | Public facts: names, credentials, services, areas, contact details |
| `fee_schedule` | The active fee schedule (read-only) |
| `leads_pipeline` | Leads by stage and channel, with counts (no email or mobile) |
| `lead` | One lead in full, with contact details, calls and proposals |
| `marketing_report` | Clicks, leads, quotes, won and lost by month, channel and campaign |
| `website_pages` | tallocpa.com pages, SEO titles, descriptions, FAQs |
| `draft_proposal` | A proposal draft priced **only** from the fee schedule |
| `draft_follow_up` | A follow-up message draft (email, SMS, Messenger, call script) |

## 2. Claude Code (once per computer)

1. Make a folder for marketing work, for example `tallo-marketing`. Open a terminal there and add the connector:

   ```bash
   claude mcp add --transport http --scope project tallo-marketing https://app.tallocpa.com/api/mcp/marketing_team
   ```

   - `--scope project` saves it in that folder's `.mcp.json`.
   - Use `--scope user` instead to have it in every folder.
2. Start `claude` in that folder and type `/mcp`. Choose **tallo-marketing → Authenticate**.
3. Your browser opens TalloCPA OS. Sign in as the Owner and click **Allow**. The sign-in lasts 90 days from the last use, like the Cowork connectors.
4. Check it: ask *"Use tallo-marketing whoami."* It should answer **Marketing Team** with clients **None (no client data)**. Grant `whoami` too if you want this check.

## 3. Add your marketing skills from GitHub

You can add skills in either of two ways.

**A. As a plugin, if the repo is a Claude Code plugin marketplace:**
1. Inside Claude Code, run `/plugin marketplace add <owner>/<repo>`.
2. Then run `/plugin install <plugin-name>@<marketplace>`.

**B. As loose skills:**
1. Copy each skill's folder, the one containing `SKILL.md`, into one of these:
   - `tallo-marketing/.claude/skills/`, for this folder only;
   - `~/.claude/skills/`, for every folder.
2. Restart Claude Code. Type `/skills` to see what loaded.

**Before you rely on a skill pack, read its `SKILL.md` files.** Remove anything that sends email, posts to social media or runs scripts you don't need. The `CLAUDE.md` below still binds them.

## 4. `CLAUDE.md` for the marketing folder

Save this as `tallo-marketing/CLAUDE.md` and adjust it as you like:

```markdown
# Tallo CPA Marketing

You work for Tallo CPA (EJ Tallo Cloud Accounting and Auditing Services), a CPA firm in public
practice in Iloilo City, Philippines. Use the tallo-marketing connector for every fact about the
firm, its fees, leads and website; never invent them.

## Rules (Code of Ethics for Professional Accountants in the Philippines, advertising)
- Factual and in good taste. No false, misleading or exaggerated claims; no "best", "No. 1", "guaranteed".
- Never promise or imply a tax result (lower tax, refunds, "no penalties", "BIR-proof").
- No comparison with, or criticism of, other firms or accountants.
- No client names, logos, figures or testimonials unless the Owner confirms written consent.
- Fees only from `fee_schedule`; never invent, change or discount a price.
- Credentials exactly as in `firm_profile`.
- Tax content is general information, citing the BIR issuance; not advice for one taxpayer.
- Leads' details are for answering their inquiry only, never for public copy.

## Drafts only
- Never send email or messages, never post to social media, never publish.
- Proposals and follow-ups: save with `draft_proposal` / `draft_follow_up`; the Owner sends.
- Website changes: edit the tallocpa-dashboard repo on a branch and open a pull request; never push to main.
- Social posts, articles, captions: write them as files in `drafts/` for the Owner.

## Voice
Clear Numbers. Clean Compliance. Plain English (Taglish or Hiligaynon when asked), warm, never pushy.
```

## 5. Example prompts by role

| Role (skill) | Try |
|---|---|
| Sales Assistant | *List leads at the Lead stage from the last 30 days. Draft a follow-up for the two oldest, by email.* |
| Sales Assistant | *Open lead &lt;id&gt; and draft a proposal from the fee schedule for monthly bookkeeping and BIR registration.* |
| Marketing Analyst | *Make this month's marketing report: leads, quotes and wins by channel, and which campaign link worked best.* |
| Content Writer | *Write a 700-word article on the January deadlines for withholding taxes, factual, citing the BIR forms, for our blog.* |
| SEO Specialist | *Review website_pages: suggest better SEO titles and meta descriptions where they are over length or miss the keyword, as a pull request.* |
| Social Media Manager | *Plan two weeks of Facebook posts around the BIR filing calendar; captions in English and Hiligaynon; save to drafts/.* |

## Check it

- **Settings → AI employees → Marketing Team → Activity** lists every call.
- Proposal and follow-up drafts appear on the lead's page, for you only. When you reject one, write why, then add the lesson to the skill or `CLAUDE.md`.
