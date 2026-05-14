import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class AgentListPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get agentTable(): Locator {
    return this.getByRole("table");
  }

  get searchInput(): Locator {
    return this.getByRole("searchbox");
  }

  get stateFilter(): Locator {
    return this.getByTestId("state-filter");
  }

  get sortDropdown(): Locator {
    return this.getByTestId("sort-dropdown");
  }

  get bulkActionButton(): Locator {
    return this.getByRole("button", { name: /bulk.*action/i });
  }

  get agentCount(): Locator {
    return this.getByTestId("agent-count");
  }

  agentRow(index: number): Locator {
    return this.getByRole("row").nth(index + 1);
  }

  agentLink(agentId: string): Locator {
    return this.getByRole("link", { name: agentId });
  }

  async goto(): Promise<void> {
    await this.navigateTo("/agents");
  }

  async searchAgents(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }
}
