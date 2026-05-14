import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class AttestationsPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get failuresTable(): Locator {
    return this.getByTestId("failures-table");
  }

  get timelineChart(): Locator {
    return this.getByTestId("timeline-chart");
  }

  get timeRangeSelector(): Locator {
    return this.getByTestId("time-range-selector");
  }

  get totalCount(): Locator {
    return this.getByTestId("total-count");
  }

  get passedCount(): Locator {
    return this.getByTestId("passed-count");
  }

  get failedCount(): Locator {
    return this.getByTestId("failed-count");
  }

  summaryCard(title: string): Locator {
    return this.getByTestId(`summary-card-${title}`);
  }

  async goto(): Promise<void> {
    await this.navigateTo("/attestations");
  }
}
