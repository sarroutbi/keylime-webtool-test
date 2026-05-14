import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { PAGE_ROUTES, COCKPIT } from "../../config/constants.js";

async function navigateToPage(world: CustomWorld, pageName: string): Promise<void> {
  const route = PAGE_ROUTES[pageName];
  if (!route) throw new Error(`Unknown page: ${pageName}`);

  if (world.isCockpit) {
    const cockpitPath = route === "/" ? "" : route.replace(/^\//, "");
    await world.page.goto(`${world.baseUrl}${COCKPIT.PLUGIN_PATH}#/${cockpitPath}`);
  } else {
    await world.page.goto(route);
  }
  await world.page.waitForLoadState("networkidle");
}

When(
  "the user navigates to the {string}",
  async function (this: CustomWorld, pageName: string) {
    await navigateToPage(this, pageName);
  },
);

Given(
  "the user is on the {string}",
  async function (this: CustomWorld, pageName: string) {
    await navigateToPage(this, pageName);
  },
);

Then(
  "the browser MUST navigate to {string}",
  async function (this: CustomWorld, expectedPath: string) {
    await this.page.waitForURL(`**${expectedPath}*`, { timeout: 10_000 });
    const url = this.page.url();
    expect(url).toContain(expectedPath);
  },
);
