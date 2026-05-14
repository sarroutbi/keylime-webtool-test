import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

type AgentTab =
  | "Timeline"
  | "PCR Values"
  | "IMA Log"
  | "Boot Log"
  | "Certificates"
  | "Raw Data";

export class AgentDetailPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get agentId(): Locator {
    return this.getByTestId("agent-id");
  }

  get agentStatus(): Locator {
    return this.getByTestId("agent-status");
  }

  get agentIp(): Locator {
    return this.getByTestId("agent-ip");
  }

  get activeTab(): Locator {
    return this.locator('[role="tab"][aria-selected="true"]');
  }

  get timelineEntries(): Locator {
    return this.getByTestId("timeline-entries");
  }

  get pcrTable(): Locator {
    return this.getByTestId("pcr-table");
  }

  get imaLogEntries(): Locator {
    return this.getByTestId("ima-log-entries");
  }

  get bootLogContent(): Locator {
    return this.getByTestId("boot-log-content");
  }

  get certificateList(): Locator {
    return this.getByTestId("certificate-list");
  }

  get rawDataContent(): Locator {
    return this.getByTestId("raw-data-content");
  }

  tab(name: AgentTab): Locator {
    return this.getByRole("tab", { name });
  }

  async selectTab(name: AgentTab): Promise<void> {
    await this.tab(name).click();
  }

  async gotoAgent(agentId: string): Promise<void> {
    await this.navigateTo(`/agents/${agentId}`);
  }

  async goto(): Promise<void> {
    await this.navigateTo("/agents");
  }
}
