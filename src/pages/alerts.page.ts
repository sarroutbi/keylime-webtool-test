import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class AlertsPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get alertTable(): Locator {
    return this.getByRole("table", { name: /alerts/i });
  }

  alertRow(index: number): Locator {
    return this.alertTable.getByRole("row").nth(index);
  }

  alertSeverity(id: string): Locator {
    return this.getByTestId(`alert-severity-${id}`);
  }

  alertStatus(id: string): Locator {
    return this.getByTestId(`alert-status-${id}`);
  }

  get criticalCard(): Locator {
    return this.getByTestId("summary-card-critical");
  }

  get highCard(): Locator {
    return this.getByTestId("summary-card-high");
  }

  get mediumCard(): Locator {
    return this.getByTestId("summary-card-medium");
  }

  get lowCard(): Locator {
    return this.getByTestId("summary-card-low");
  }

  get acknowledgeButton(): Locator {
    return this.getByRole("button", { name: /acknowledge/i });
  }

  get investigateButton(): Locator {
    return this.getByRole("button", { name: /investigate/i });
  }

  get resolveButton(): Locator {
    return this.getByRole("button", { name: /resolve/i });
  }

  get dismissButton(): Locator {
    return this.getByRole("button", { name: /dismiss/i });
  }

  get escalateButton(): Locator {
    return this.getByRole("button", { name: /escalate/i });
  }

  async goto(): Promise<void> {
    await this.navigateTo("/alerts");
  }

  async acknowledge(): Promise<void> {
    await this.acknowledgeButton.click();
  }

  async investigate(): Promise<void> {
    await this.investigateButton.click();
  }

  async resolve(): Promise<void> {
    await this.resolveButton.click();
  }

  async dismiss(): Promise<void> {
    await this.dismissButton.click();
  }

  async escalate(): Promise<void> {
    await this.escalateButton.click();
  }

  async transitionToAcknowledged(): Promise<void> {
    await this.acknowledge();
  }

  async transitionToInvestigating(): Promise<void> {
    await this.investigate();
  }

  async transitionToResolved(): Promise<void> {
    await this.resolve();
  }

  async transitionToDismissed(): Promise<void> {
    await this.dismiss();
  }
}
