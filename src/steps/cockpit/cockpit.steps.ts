import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { navigateToCockpitPlugin } from "../../fixtures/cockpit-auth.fixture.js";
import { COCKPIT } from "../../config/constants.js";

Given(
  "the Cockpit plugin is loaded",
  async function (this: CustomWorld) {
    await navigateToCockpitPlugin(this.page);
    const iframe = this.page.locator(COCKPIT.IFRAME_SELECTOR);
    await expect(iframe).toBeVisible({ timeout: 15_000 });
  },
);

Then(
  "the Cockpit plugin MUST be displayed in the iframe",
  async function (this: CustomWorld) {
    const iframe = this.page.locator(COCKPIT.IFRAME_SELECTOR);
    await expect(iframe).toBeVisible({ timeout: 10_000 });
  },
);

Then(
  "the plugin MUST display the sidebar navigation",
  async function (this: CustomWorld) {
    const iframe = this.page.frameLocator(COCKPIT.IFRAME_SELECTOR);
    const sidebar = iframe.locator("nav[aria-label='sidebar'], aside, .sidebar");
    await expect(sidebar.first()).toBeVisible({ timeout: 10_000 });
  },
);

Then(
  "the Cockpit sidebar MUST show {string}",
  async function (this: CustomWorld, label: string) {
    const sidebar = this.page.locator("#host-apps, .cockpit-sidebar, nav");
    const entry = sidebar.locator(`text=${label}`);
    await expect(entry.first()).toBeVisible({ timeout: 10_000 });
  },
);
