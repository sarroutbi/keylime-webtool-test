import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class PoliciesPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get policyTable(): Locator {
    return this.getByTestId("policy-table");
  }

  get createButton(): Locator {
    return this.getByRole("button", { name: "Create" });
  }

  get versionBadge(): Locator {
    return this.getByTestId("version-badge");
  }

  get approvalStatus(): Locator {
    return this.getByTestId("approval-status");
  }

  get approveButton(): Locator {
    return this.getByRole("button", { name: "Approve" });
  }

  get rejectButton(): Locator {
    return this.getByRole("button", { name: "Reject" });
  }

  policyRow(index: number): Locator {
    return this.locator(`[data-testid="policy-table"] tbody tr:nth-child(${index + 1})`);
  }

  policyName(name: string): Locator {
    return this.getByText(name, { exact: true });
  }

  async createPolicy(name: string): Promise<void> {
    await this.createButton.click();
    await this.locator('[data-testid="policy-name-input"]').fill(name);
    await this.getByRole("button", { name: "Save" }).click();
  }

  async goto(): Promise<void> {
    await this.navigateTo("/policies");
  }
}
