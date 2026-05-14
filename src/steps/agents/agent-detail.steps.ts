import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { AgentDetailPage } from "../../pages/agent-detail.page.js";

When(
  "the user views agent detail for {string}",
  async function (this: CustomWorld, agentId: string) {
    const detail = new AgentDetailPage(this);
    await detail.gotoAgent(agentId);
    await detail.waitForPageLoad();
  },
);

Then(
  "the agent status MUST be {string}",
  async function (this: CustomWorld, expectedStatus: string) {
    const detail = new AgentDetailPage(this);
    await expect(detail.agentStatus).toHaveText(expectedStatus, { timeout: 10_000 });
  },
);

When(
  "the user selects the {string} tab",
  async function (this: CustomWorld, tabName: string) {
    const detail = new AgentDetailPage(this);
    await detail.selectTab(tabName as Parameters<typeof detail.selectTab>[0]);
  },
);

Then(
  "the {string} tab content MUST be visible",
  async function (this: CustomWorld, tabName: string) {
    const detail = new AgentDetailPage(this);
    const tabPanel = detail.tab(tabName as Parameters<typeof detail.tab>[0]);
    await expect(tabPanel).toHaveAttribute("aria-selected", "true", { timeout: 10_000 });
  },
);
