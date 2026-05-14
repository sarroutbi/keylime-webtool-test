import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { AuditLogPage } from "../../pages/audit-log.page.js";

When(
  "the user views the Audit Log",
  async function (this: CustomWorld) {
    const auditLog = new AuditLogPage(this);
    await auditLog.goto();
    await auditLog.waitForPageLoad();
  },
);

Then(
  "the audit log MUST display entries",
  async function (this: CustomWorld) {
    const auditLog = new AuditLogPage(this);
    const rows = auditLog.auditTable.getByRole("row");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(2);
  },
);

Then(
  "the hash chain verification MUST be available",
  async function (this: CustomWorld) {
    const auditLog = new AuditLogPage(this);
    await expect(auditLog.verifyButton).toBeVisible({ timeout: 10_000 });
  },
);
