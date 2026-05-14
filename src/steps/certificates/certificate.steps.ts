import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { CertificatesPage } from "../../pages/certificates.page.js";

When(
  "the user views the Certificates page",
  async function (this: CustomWorld) {
    const certificates = new CertificatesPage(this);
    await certificates.goto();
    await certificates.waitForPageLoad();
  },
);

Then(
  "the certificate list MUST be visible",
  async function (this: CustomWorld) {
    const certificates = new CertificatesPage(this);
    await expect(certificates.certificateTable).toBeVisible({ timeout: 10_000 });
  },
);

Then(
  "the expiry warnings section MUST be visible",
  async function (this: CustomWorld) {
    const certificates = new CertificatesPage(this);
    await expect(certificates.expiryWarnings).toBeVisible({ timeout: 10_000 });
  },
);
