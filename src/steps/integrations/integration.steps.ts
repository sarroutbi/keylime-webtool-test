import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { IntegrationsPage } from "../../pages/integrations.page.js";

When(
  "the user views the Integrations page",
  async function (this: CustomWorld) {
    const integrations = new IntegrationsPage(this);
    await integrations.goto();
    await integrations.waitForPageLoad();
  },
);

Then(
  "the {string} connection status MUST be visible",
  async function (this: CustomWorld, serviceName: string) {
    const integrations = new IntegrationsPage(this);
    const indicator = integrations.connectionIndicator(serviceName);
    await expect(indicator).toBeVisible({ timeout: 10_000 });
  },
);
