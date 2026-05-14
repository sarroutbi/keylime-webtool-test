import { Given } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world.js";
import { injectAuthToken } from "../../fixtures/auth.fixture.js";
import { loginToCockpit } from "../../fixtures/cockpit-auth.fixture.js";

Given(
  "the user is authenticated as {string}",
  async function (this: CustomWorld, role: string) {
    if (this.isApiOnly) {
      return;
    }

    if (this.isCockpit) {
      await loginToCockpit(this.page, role);
    } else {
      await injectAuthToken(this.page, role);
    }
  },
);

Given(
  "the backend is running with Mockoon mocks",
  async function (this: CustomWorld) {
    const response = await this.apiContext.get("/api/kpis");
    if (!response.ok()) {
      throw new Error(
        `Backend not reachable at ${this.apiBaseUrl}: ${response.status()}`,
      );
    }
  },
);

Given(
  "the Verifier API is unreachable",
  async function (this: CustomWorld) {
    // Mockoon must be stopped for this scenario; handled by test orchestration
    this.attach("Verifier API is expected to be unreachable for this test", "text/plain");
  },
);

Given(
  "the Verifier reports agents in mixed states",
  async function (this: CustomWorld) {
    // Mockoon provides 7 agents in mixed states by default
    this.attach("Using default Mockoon fleet with 7 agents in mixed states", "text/plain");
  },
);

Given(
  "the fleet contains agents in PASS, FAILED, and TIMEOUT states",
  async function (this: CustomWorld) {
    // Mockoon provides agents in these states by default
    this.attach("Using default Mockoon fleet with mixed agent states", "text/plain");
  },
);
