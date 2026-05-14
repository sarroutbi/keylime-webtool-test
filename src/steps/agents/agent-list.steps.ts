import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { AgentListPage } from "../../pages/agent-list.page.js";

When(
  "the user views the Agent Fleet Management list",
  async function (this: CustomWorld) {
    const agentList = new AgentListPage(this);
    await agentList.goto();
    await agentList.waitForPageLoad();
  },
);

Then(
  "the agent list MUST display at least {int} agents",
  async function (this: CustomWorld, minCount: number) {
    const agentList = new AgentListPage(this);
    const rows = agentList.agentTable.locator("tbody tr");
    const count = await rows.count();
    expect(count).toBeGreaterThanOrEqual(minCount);
  },
);

When(
  "the user searches for agent {string}",
  async function (this: CustomWorld, query: string) {
    const agentList = new AgentListPage(this);
    await agentList.searchAgents(query);
  },
);

When(
  "the user clicks on agent {string}",
  async function (this: CustomWorld, agentId: string) {
    const agentList = new AgentListPage(this);
    await agentList.agentLink(agentId).click();
  },
);
