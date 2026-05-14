import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { DashboardPage } from "../../pages/dashboard.page.js";

Then(
  "the dashboard MUST display the {string} KPI",
  async function (this: CustomWorld, kpiTitle: string) {
    const dashboard = new DashboardPage(this);
    const card = dashboard.kpiCard(kpiTitle as Parameters<typeof dashboard.kpiCard>[0]);
    await expect(card).toBeVisible({ timeout: 10_000 });
  },
);

When(
  "the user clicks the {string} KPI card",
  async function (this: CustomWorld, kpiTitle: string) {
    const dashboard = new DashboardPage(this);
    const card = dashboard.kpiCard(kpiTitle as Parameters<typeof dashboard.kpiCard>[0]);
    await expect(card).toBeVisible({ timeout: 10_000 });
    await card.click();
  },
);

Then(
  "failed agents MUST be rendered in red in the visualization",
  async function (this: CustomWorld) {
    const section = this.page.locator(".section", { hasText: /Agent State Distribution/i });
    await expect(section).toBeVisible({ timeout: 10_000 });
    const failedLegend = section.locator("li", { hasText: /FAIL/i });
    await expect(failedLegend.first()).toBeVisible();
  },
);

Then(
  "timed-out agents MUST be rendered in orange in the visualization",
  async function (this: CustomWorld) {
    const section = this.page.locator(".section", { hasText: /Agent State Distribution/i });
    await expect(section).toBeVisible({ timeout: 10_000 });
    const timeoutLegend = section.locator("li", { hasText: /TIMEOUT/i });
    await expect(timeoutLegend).toBeVisible();
  },
);

Then(
  "the dashboard MUST display a staleness warning banner",
  async function (this: CustomWorld) {
    const banner = this.page.locator("[data-testid='staleness-warning'], [role='alert']");
    await expect(banner).toBeVisible({ timeout: 10_000 });
  },
);
