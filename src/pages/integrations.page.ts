import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class IntegrationsPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get verifierStatus(): Locator {
    return this.getByTestId("verifier-status");
  }

  get registrarStatus(): Locator {
    return this.getByTestId("registrar-status");
  }

  get databaseStatus(): Locator {
    return this.getByTestId("database-status");
  }

  get cacheStatus(): Locator {
    return this.getByTestId("cache-status");
  }

  connectionIndicator(service: string): Locator {
    return this.getByTestId(`connection-indicator-${service}`);
  }

  get topologyView(): Locator {
    return this.getByTestId("topology-view");
  }

  get sshCheckButton(): Locator {
    return this.getByRole("button", { name: /ssh check/i });
  }

  async goto(): Promise<void> {
    await this.navigateTo("/integrations");
  }
}
