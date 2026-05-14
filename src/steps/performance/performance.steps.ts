import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { PerformancePage } from "../../pages/performance.page.js";

When(
  "the user views the Performance page",
  async function (this: CustomWorld) {
    const performance = new PerformancePage(this);
    await performance.goto();
    await performance.waitForPageLoad();
  },
);

Then(
  "the overall health status MUST be visible",
  async function (this: CustomWorld) {
    const performance = new PerformancePage(this);
    await expect(performance.overallHealthStatus).toBeVisible({ timeout: 10_000 });
  },
);

Then(
  "the circuit breaker status MUST be visible",
  async function (this: CustomWorld) {
    const performance = new PerformancePage(this);
    await expect(performance.circuitBreakerStatus).toBeVisible({ timeout: 10_000 });
  },
);
