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
    await card.click();
  },
);

Then(
  "failed agents MUST be rendered in red in the visualization",
  async function (this: CustomWorld) {
    const dashboard = new DashboardPage(this);
    const failedSegment = dashboard.agentStateChart.locator("[data-state='failed']");
    const color = await failedSegment.evaluate((el) => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(2[0-2]\d,\s*[0-5]\d,\s*[0-5]\d\)/);
  },
);

Then(
  "timed-out agents MUST be rendered in orange in the visualization",
  async function (this: CustomWorld) {
    const dashboard = new DashboardPage(this);
    const timedOutSegment = dashboard.agentStateChart.locator("[data-state='timed-out']");
    const color = await timedOutSegment.evaluate((el) => getComputedStyle(el).color);
    expect(color).toMatch(/rgb\(2[0-5]\d,\s*1[0-6]\d,\s*[0-5]\d\)/);
  },
);

Then(
  "the dashboard MUST display a staleness warning banner",
  async function (this: CustomWorld) {
    const banner = this.page.getByTestId("staleness-warning");
    await expect(banner).toBeVisible({ timeout: 10_000 });
  },
);
