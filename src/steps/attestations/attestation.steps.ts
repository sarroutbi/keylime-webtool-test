import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { AttestationsPage } from "../../pages/attestations.page.js";

When(
  "the user views the Attestations page",
  async function (this: CustomWorld) {
    const attestations = new AttestationsPage(this);
    await attestations.goto();
    await attestations.waitForPageLoad();
  },
);

Then(
  "the attestation summary MUST display total count",
  async function (this: CustomWorld) {
    const attestations = new AttestationsPage(this);
    await expect(attestations.totalCount).toBeVisible({ timeout: 10_000 });
  },
);

Then(
  "the attestation failures table MUST be visible",
  async function (this: CustomWorld) {
    const attestations = new AttestationsPage(this);
    await expect(attestations.failuresTable).toBeVisible({ timeout: 10_000 });
  },
);
