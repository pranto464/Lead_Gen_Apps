# Growth Intelligence — deployment notes

This repository is the Netlify + Cloudflare D1 pilot. For step-by-step Bengali instructions, open `NETLIFY-GUIDE.html` or visit `/setup/` after deployment.

## Architecture

- Next.js static export in `out/`
- Netlify API and background functions in `netlify/functions/`
- Cloudflare D1 accessed server-side through the scoped REST API
- Google Identity Services for signup/sign-in; per-user Google OAuth for Sheets
- Admin-owned Firecrawl, OpenAI and/or Anthropic API credentials

Never ship `.env`, provider keys, Google secrets, D1 tokens, or a service-account key in GitHub or browser code.

## Netlify settings

- Build command: `pnpm build:netlify`
- Publish directory: `out`
- Functions directory: `netlify/functions`
- Node: 22

Use GitHub import. Netlify Drop of only the `out` directory cannot run the API or background functions.

## Required environment

Copy the names from `.env.example`. `AUTH_SECRET` and `OWNER_SETUP_KEY` must each be at least 32 characters. D1 token scope should be limited to Account → D1 → Edit. Add Google OAuth origins and the exact `/api/google` callback for every deployed hostname.

Automatic tasks require Firecrawl for web-reading tools and at least one configured AI provider. ChatGPT Plus and Claude chat subscriptions do not provide API credit.

## First run

1. Open First-time owner setup and enter `OWNER_SETUP_KEY`.
2. The app creates its D1 schema automatically.
3. Remove `OWNER_SETUP_KEY` from Netlify after owner setup if desired.
4. Team members sign up and remain pending.
5. In Admin, choose Lead Generation & Sales, Marketing & Content, or both; then activate the account and set its trial/ongoing allowance.

Owner/admin accounts always have every feature and are not blocked by member quotas. Member access is enforced on the server, not only hidden in the UI.

## Verification

Run:

```bash
pnpm typecheck
pnpm test
pnpm build:netlify
```

Tests cover authentication, approval, user isolation, product entitlements, trial enforcement, evidence validation, requested social-source reading and both AI provider adapters. Live credentials and provider billing are not exercised by the automated suite.
