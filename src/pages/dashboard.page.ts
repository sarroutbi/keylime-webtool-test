import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

type KpiTitle =
  | "Total Agents"
  | "Attestation Success Rate"
  | "Failed Attestations"
  | "Timed-Out Attestations"
  | "Urgent Alerts";

export class DashboardPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get pageTitle(): Locator {
    return this.getByRole("heading", { name: /fleet overview/i, level: 1 });
  }

  kpiCard(title: KpiTitle): Locator {
    return this.getByRole("link", { name: new RegExp(title, "i") });
  }

  kpiCardValue(title: KpiTitle): Locator {
    return this.kpiCard(title).locator(".kpi-card__value");
  }

  async goto(): Promise<void> {
    await this.navigateTo("/");
  }
}
