import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class CertificatesPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get certificateTable(): Locator {
    return this.getByTestId("certificate-table");
  }

  get expiryWarnings(): Locator {
    return this.getByTestId("expiry-warnings");
  }

  get validCount(): Locator {
    return this.getByTestId("valid-count");
  }

  get warningCount(): Locator {
    return this.getByTestId("warning-count");
  }

  get expiredCount(): Locator {
    return this.getByTestId("expired-count");
  }

  certificateRow(index: number): Locator {
    return this.locator(`[data-testid="certificate-table"] tbody tr:nth-child(${index + 1})`);
  }

  downloadButton(format: string): Locator {
    return this.getByTestId(`download-${format}`);
  }

  async goto(): Promise<void> {
    await this.navigateTo("/certificates");
  }
}
