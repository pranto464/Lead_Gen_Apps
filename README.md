# Lead Research Desk — small-team SaaS pilot

Netlify-hosted company research workspace with Cloudflare D1. Open `NETLIFY-GUIDE.html` for the complete Bengali setup guide; it is also available at `/setup/` after deployment.

## Product flow

- Pranto creates the protected owner account and controls the admin dashboard.
- Up to 10 total accounts; intended for the owner plus 2–3 team members during this trial.
- Members sign up with Gmail/Google Workspace, or use email/password for a non-Google company email.
- New members remain pending until an admin approves their trial, allowance and product access.
- Approval has two independent products: **Lead Generation & Sales** and **Marketing & Content**. Selecting both unlocks the complete workspace. Owner/admin accounts always have both and are not blocked by member quotas.
- Owner-provided OpenAI, Anthropic, Firecrawl and D1 connections are shared through the server. Team members never receive the keys.
- Each member connects their own Google account for Sheets. Refresh tokens are encrypted with `AUTH_SECRET` before storage in D1.
- Each member sees only their own projects, companies, jobs and exports.

## Product workspaces

**Lead Generation & Sales:** natural-language briefs, company discovery, large CSV lists, sequential page reading, evidence-backed qualification, optional LinkedIn/Facebook/job-board research when requested, DNC/already-emailed flags, Google Sheets import/live writes, CSV/JSON export, ICP Builder, Company 360, Competitor Intelligence, Decision-Maker Finder, Smart Extractor, Market Research and a saved pipeline.

**Marketing & Content:** Campaign Planner, Content Studio, public Social Intelligence, Design Creative Brief and SEO Visibility. Every Studio result is saved privately to that user's D1 workspace.

The evidence-first company worklist has both a manual ChatGPT/Claude subscription workflow and automatic GPT/Claude API workflow. Growth Studio automation uses the owner's API connections.

## Deployment

1. Create Cloudflare D1 and a scoped Account → D1 → Edit API token.
2. Create a Google Cloud OAuth web client, enable Google Sheets API, and configure the app origin and `/api/google` callback. During a private pilot, add the owner/team Google accounts as OAuth test users.
3. Upload this source to a private GitHub repository and import it into Netlify.
4. Build command: `pnpm build:netlify`; publish: `out`; functions: `netlify/functions`.
5. Add all required values from `.env.example` in Netlify server environment settings, then deploy.
6. Open **First-time owner setup**, create Pranto's owner account with `OWNER_SETUP_KEY`, and complete onboarding. The owner can later link the same email to Google by using the Google sign-in button.
7. Share the app URL. In Admin, approve each member, choose one or both product-access checkboxes, and set their trial allowance.

Do not use Netlify Drop with only `out`; backend functions are required. Never put secrets in `NEXT_PUBLIC_*`, GitHub, or browser code.

## Billing and limits

Automatic research uses the owner's configured API accounts. ChatGPT Plus and Claude chat subscriptions are separate from API billing. Manual mode can use the user's normal ChatGPT/Claude chat account without app API usage.

Trial starts on admin approval. Trial allowance covers the whole trial; ongoing allowance resets by UTC calendar month. Attempts can consume allowance even when a downstream provider fails. Registration is capped at 10 accounts, each account at 20 projects, and each project at 20,000 companies. Provider, Netlify and Cloudflare limits can be lower.

This pilot does not include payments, automated subscriptions, email verification, or email password recovery. Google sign-in verifies Google-owned email identity. Email/password users can ask the admin for a reset.

## Verification

Node 22+, pnpm. Run `pnpm typecheck`, `pnpm test`, and `pnpm build:netlify`.

Automated tests use in-memory SQLite with mocked Cloudflare/provider APIs and cover approval, isolation, admin permissions, session revocation, trial limits, evidence integrity, requested social-source reading, and both model providers. The production build and both Netlify functions are bundled before delivery. Live deployment and paid credentials require your own accounts and are not exercised here.
