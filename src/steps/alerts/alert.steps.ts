import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { AlertsPage } from "../../pages/alerts.page.js";

When(
  "the user views the Alerts page",
  async function (this: CustomWorld) {
    const alerts = new AlertsPage(this);
    await alerts.goto();
    await alerts.waitForPageLoad();
  },
);

Then(
  "the alert list MUST be visible",
  async function (this: CustomWorld) {
    const alerts = new AlertsPage(this);
    await expect(alerts.alertTable).toBeVisible({ timeout: 10_000 });
  },
);

When(
  "the user acknowledges alert at row {int}",
  async function (this: CustomWorld, rowIndex: number) {
    const alerts = new AlertsPage(this);
    await alerts.alertRow(rowIndex).click();
    await alerts.acknowledge();
  },
);

Then(
  "the alert status MUST be {string}",
  async function (this: CustomWorld, expectedStatus: string) {
    const alerts = new AlertsPage(this);
    const selectedRow = alerts.alertTable.locator("tr.selected, tr[aria-selected='true']");
    const statusCell = selectedRow.getByTestId("alert-status");
    await expect(statusCell).toHaveText(expectedStatus, { timeout: 10_000 });
  },
);
