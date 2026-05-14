import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { COCKPIT } from "../../config/constants.js";
import type { FrameLocator, Page } from "playwright";

function getRoot(world: CustomWorld): Page | FrameLocator {
  if (world.isCockpit) {
    return world.page.frameLocator(COCKPIT.IFRAME_SELECTOR);
  }
  return world.page;
}

Then(
  "the table MUST display at least {int} rows",
  async function (this: CustomWorld, minRows: number) {
    const root = getRoot(this);
    const rows = root.locator("table tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(minRows);
  },
);

Then(
  "the table MUST display exactly {int} rows",
  async function (this: CustomWorld, expectedRows: number) {
    const root = getRoot(this);
    const rows = root.locator("table tbody tr");
    await expect(rows).toHaveCount(expectedRows, { timeout: 10_000 });
  },
);

Then(
  "the table MUST contain a row with text {string}",
  async function (this: CustomWorld, expectedText: string) {
    const root = getRoot(this);
    const row = root.locator("table tbody tr").filter({ hasText: expectedText });
    await expect(row.first()).toBeVisible({ timeout: 10_000 });
  },
);
