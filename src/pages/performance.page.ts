import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class PerformancePage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get overallHealthStatus(): Locator {
    return this.getByTestId("overall-health-status");
  }

  get verifierMetrics(): Locator {
    return this.getByTestId("verifier-metrics");
  }

  get databasePoolStats(): Locator {
    return this.getByTestId("database-pool-stats");
  }

  get apiResponseTimes(): Locator {
    return this.getByTestId("api-response-times");
  }

  get circuitBreakerStatus(): Locator {
    return this.getByTestId("circuit-breaker-status");
  }

  get capacityUtilization(): Locator {
    return this.getByTestId("capacity-utilization");
  }

  async goto(): Promise<void> {
    await this.navigateTo("/performance");
  }
}
