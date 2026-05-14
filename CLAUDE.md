# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

BDD functional test suite for the Keylime Monitoring Dashboard, using **Playwright + cucumber-js** in TypeScript. Tests validate the SRS requirements (95 FRs, 28 NFRs, 30 SRs) against both deployment modes: standalone React SPA and Cockpit plugin.

## Architecture

```
cucumber-js (test runner)
  └── Step definitions (src/steps/)
        ├── Page Objects (src/pages/) → Playwright browser automation
        └── API assertions            → Playwright request context

Three profiles:
  standalone  → React SPA on :5173, JWT auth via sessionStorage
  cockpit     → Cockpit plugin on :9090, PAM auth, iframe navigation
  api         → Direct HTTP against backend on :8080 (no browser)
```

**cucumber-js runs the tests, not `@playwright/test`.** Playwright is used as a library within step definitions. The `@playwright/test` package exists only for `npx playwright install`.

The `CustomWorld` class (`src/support/world.ts`) holds the Playwright `Browser`, `BrowserContext`, `Page`, and `APIRequestContext`. `BasePage` (`src/pages/base.page.ts`) abstracts standalone vs cockpit iframe navigation.

## Sibling Repositories

| Repository | Role | Port |
|------------|------|------|
| `keylime-webtool-backend` | Rust/Axum REST + WebSocket API | :8080 |
| `keylime-webtool-frontend` | React 18 SPA (Vite) | :5173 |
| `keylime-webtool-cockpit-plugin` | Cockpit plugin (esbuild, PatternFly) | :9090 |
| `keylime-webtool-doc` / `keylime-webtool-spec` | SRS specification | — |

Upstream Keylime APIs are mocked via Mockoon (verifier on :3000, registrar on :3001) using data from `keylime-webtool-backend/test-data/`.

## Build & Test Commands

```bash
npm install                          # install dependencies
npx playwright install chrome        # download Chrome for Testing (or use system Chrome)
npm run typecheck                    # tsc --noEmit
npm run lint                         # eslint (zero warnings)
npm run test                         # all tests (default profile)
npm run test:standalone              # standalone SPA tests
npm run test:cockpit                 # cockpit plugin tests
npm run test:api                     # API-only tests (no browser)
npm run test:dry                     # dry run — validate features/steps match
npm run report:html                  # generate traceability matrix from JSON report
```

Run a single feature or tag:
```bash
npm run test -- --tags @FR-001                    # single requirement
npm run test -- --tags "@smoke and not @wip"      # tag expression
npm run test -- features/dashboard/FR-001-*.feature  # single file
CUCUMBER_PROFILE=api npm run test                 # switch profile via env var
```

Environment variables:
```bash
HEADLESS=false           # show browser (default: true)
RECORD_VIDEO=true        # capture video on failure
BASE_URL=http://...      # override frontend URL
API_BASE_URL=http://...  # override backend URL
JWT_SECRET=...           # JWT signing key for test tokens
SLOW_MO=100              # slow down Playwright actions (ms)
BROWSER_CHANNEL=chrome   # browser channel: chrome (default), chromium, msedge
```

## Key Patterns

- **Feature files** live in `features/<domain>/` and are tagged with SRS requirement IDs (`@FR-001`, `@NFR-001`, `@SR-001`)
- **Step definitions** in `src/steps/<domain>/` — parameterized via custom Cucumber parameter types (`{page}`, `{role}`, `{httpMethod}`)
- **Page objects** in `src/pages/` — extend `BasePage` which handles cockpit iframe vs standalone DOM
- **Fixtures** in `src/fixtures/` — JWT auth, Cockpit PAM auth, Mockoon lifecycle, WebSocket client
- **Sensitive data** (TPM quotes, IMA logs, certificates, tokens) is scrubbed from reports by `src/support/sensitive-data-scrubber.ts`

## Constraints

- Air-gapped deployment: no external CDN or runtime internet access
- TLS 1.3 minimum for browser connections
- Sensitive data must never appear in test reports or logs
- GPG-signed commits enforced via CI

## License

Apache-2.0
