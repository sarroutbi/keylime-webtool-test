import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { PoliciesPage } from "../../pages/policies.page.js";

When(
  "the user views the Policies page",
  async function (this: CustomWorld) {
    const policies = new PoliciesPage(this);
    await policies.goto();
    await policies.waitForPageLoad();
  },
);

Then(
  "the policy list MUST display at least {int} policies",
  async function (this: CustomWorld, minCount: number) {
    const policies = new PoliciesPage(this);
    const rows = policies.policyTable.locator("tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  },
);

When(
  "the user creates a policy named {string}",
  async function (this: CustomWorld, policyName: string) {
    const policies = new PoliciesPage(this);
    await policies.createPolicy(policyName);
  },
);

Then(
  "the approval status MUST be {string}",
  async function (this: CustomWorld, expectedStatus: string) {
    const policies = new PoliciesPage(this);
    await expect(policies.approvalStatus).toHaveText(expectedStatus, { timeout: 10_000 });
  },
);
