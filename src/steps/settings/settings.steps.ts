import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { SettingsPage } from "../../pages/settings.page.js";

When(
  "the user views the Settings page",
  async function (this: CustomWorld) {
    const settings = new SettingsPage(this);
    await settings.goto();
    await settings.waitForPageLoad();
  },
);

Then(
  "the Verifier URL input MUST be visible",
  async function (this: CustomWorld) {
    const settings = new SettingsPage(this);
    await expect(settings.verifierUrlInput).toBeVisible({ timeout: 10_000 });
  },
);

When(
  "the user saves settings",
  async function (this: CustomWorld) {
    const settings = new SettingsPage(this);
    await settings.saveButton.click();
  },
);
