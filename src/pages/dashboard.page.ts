import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

type KpiTitle =
  | "Total Agents"
  | "Attestation Success Rate"
  | "Failed Attestations"
  | "Timed-Out Attestations"
  | "Urgent Alerts"
  | "Certificate Warnings";

export class DashboardPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get pageTitle(): Locator {
    return this.getByRole("heading", { name: /dashboard/i, level: 1 });
  }

  get agentStateChart(): Locator {
    return this.getByTestId("agent-state-chart");
  }

  get alertDistributionChart(): Locator {
    return this.getByTestId("alert-distribution-chart");
  }

  get attestationTimelineChart(): Locator {
    return this.getByTestId("attestation-timeline-chart");
  }

  kpiCard(title: KpiTitle): Locator {
    return this.locator(`[data-testid="kpi-card-${title.toLowerCase().replace(/\s+/g, "-")}"]`);
  }

  getKpiValue(title: KpiTitle): Locator {
    return this.kpiCard(title).locator("[data-testid='kpi-value']");
  }

  async goto(): Promise<void> {
    await this.navigateTo("/");
  }
}
