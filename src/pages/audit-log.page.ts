import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class AuditLogPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get auditTable(): Locator {
    return this.getByRole("table", { name: /audit/i });
  }

  auditRow(index: number): Locator {
    return this.auditTable.getByRole("row").nth(index);
  }

  eventType(index: number): Locator {
    return this.auditRow(index).getByTestId("event-type");
  }

  user(index: number): Locator {
    return this.auditRow(index).getByTestId("user");
  }

  action(index: number): Locator {
    return this.auditRow(index).getByTestId("action");
  }

  timestamp(index: number): Locator {
    return this.auditRow(index).getByTestId("timestamp");
  }

  get hashChainStatus(): Locator {
    return this.getByTestId("hash-chain-status");
  }

  get exportButton(): Locator {
    return this.getByRole("button", { name: /export/i });
  }

  get verifyButton(): Locator {
    return this.getByRole("button", { name: /verify/i });
  }

  async goto(): Promise<void> {
    await this.navigateTo("/audit");
  }
}
