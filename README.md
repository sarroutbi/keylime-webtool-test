# Keylime Monitoring Dashboard — Functional Test Suite

BDD functional tests for the [Keylime Monitoring Dashboard](https://keylime.dev/) using **Playwright + cucumber-js** in TypeScript.

Tests validate the SRS requirements (95 FRs, 28 NFRs, 30 SRs with Gherkin acceptance criteria) against two deployment modes:

- **Standalone**: React SPA on `:5173` with JWT authentication
- **Cockpit**: Cockpit plugin on `:9090` with PAM authentication (iframe)

## Prerequisites

- Node.js >= 22
- Google Chrome or Chromium installed on the system
- Rust toolchain (for building the backend)
- Mockoon CLI (installed as dev dependency)
- Sibling repos cloned: `keylime-webtool-backend`, `keylime-webtool-frontend`, `keylime-webtool-cockpit-plugin`

## Setup

```bash
npm install
npx playwright install chrome        # downloads Chrome for Testing (Debian/Ubuntu)
```

On Fedora/RHEL where `playwright install-deps` is not supported, install Google Chrome or Chromium system-wide instead:
```bash
sudo dnf install google-chrome-stable   # or: sudo dnf install chromium
```

## Running Tests

### Start the test environment

1. Start Mockoon mocks (upstream Keylime API simulation):
```bash
mockoon-cli start --data ../keylime-webtool-backend/test-data/verifier.json --port 3000 &
mockoon-cli start --data ../keylime-webtool-backend/test-data/registrar.json --port 3001 &
```

2. Start the backend:
```bash
cd ../keylime-webtool-backend
KEYLIME_VERIFIER_URL=http://localhost:3000 \
KEYLIME_REGISTRAR_URL=http://localhost:3001 \
DATABASE_URL=sqlite::memory: \
cargo run &
```

3. Start the frontend:
```bash
cd ../keylime-webtool-frontend
npm run dev &
```

### Run tests

```bash
npm run test                # all tests (standalone profile)
npm run test:standalone     # standalone SPA tests
npm run test:cockpit        # cockpit plugin tests
npm run test:api            # API-only tests (no browser)
npm run test:dry            # dry run (validate feature/step matching)
```

### Run specific tests

```bash
npm run test -- --tags @FR-001                       # single requirement
npm run test -- --tags "@smoke and not @wip"         # tag expression
npm run test -- features/dashboard/FR-001-*.feature  # single feature file
CUCUMBER_PROFILE=api npm run test                    # switch profile via env var
```

### Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `HEADLESS` | `true` | Run browser headless |
| `RECORD_VIDEO` | `false` | Capture video on failure |
| `BASE_URL` | `http://localhost:5173` | Frontend URL |
| `API_BASE_URL` | `http://localhost:8080` | Backend URL |
| `JWT_SECRET` | `test-secret-key` | JWT signing key |
| `SLOW_MO` | `0` | Playwright slow motion (ms) |
| `BROWSER_CHANNEL` | `chrome` | Playwright browser channel (`chrome`, `chromium`, `msedge`) |

## Writing New Scenarios

### 1. Create a feature file

Place it in `features/<domain>/` with SRS requirement tags:

```gherkin
@FR-042 @policies
Feature: Policy Version Rollback
  As an operator
  I want to rollback a policy to a previous version
  So that I can revert unintended changes

  Background:
    Given the user is authenticated as "operator"
    And the backend is running with Mockoon mocks

  @standalone
  Scenario: Rollback policy to previous version
    Given the user is on the "Policies"
    When the user rolls back policy "production-v1" to version 1
    Then the policy version MUST be 1
```

### 2. Implement step definitions

Create or extend files in `src/steps/<domain>/`:

```typescript
import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { PoliciesPage } from "../../pages/policies.page.js";

When(
  "the user rolls back policy {string} to version {int}",
  async function (this: CustomWorld, policyName: string, version: number) {
    const page = new PoliciesPage(this);
    // ... implementation
  },
);
```

### 3. Add page object methods if needed

Extend page objects in `src/pages/` following the `BasePage` pattern. Use `this.locator()` which automatically handles cockpit iframe scoping.

## Tagging Convention

| Tag | Meaning |
|-----|---------|
| `@FR-NNN` | Functional requirement from SRS |
| `@NFR-NNN` | Non-functional requirement |
| `@SR-NNN` | Security requirement |
| `@smoke` | Smoke test (fast subset) |
| `@standalone` | Runs only in standalone mode |
| `@cockpit` | Runs only in cockpit mode |
| `@api` | API-only test (no browser) |
| `@wip` | Work in progress (excluded from CI) |
| `@standalone-only` | Excluded from cockpit profile |

## Reports

Test reports are generated in `reports/`:

- `cucumber-report.json` — Raw cucumber JSON (sensitive data scrubbed)
- `cucumber-report.html` — HTML report
- `traceability-matrix.html` — Requirements coverage matrix
- `traceability-matrix.json` — Machine-readable coverage data

Generate the traceability matrix after a test run:
```bash
npm run report:html
```

## CI

GitHub Actions workflow (`.github/workflows/e2e.yaml`) runs three jobs:

1. **e2e-standalone** — Full browser tests against standalone SPA
2. **e2e-api** — API-only contract tests
3. **lint-typecheck** — TypeScript + ESLint checks

Reports are uploaded as artifacts with 14-day retention.

## License

Apache-2.0
