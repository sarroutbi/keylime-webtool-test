import type { Page } from "playwright";
import { COCKPIT } from "../config/constants.js";

interface CockpitTestUser {
  readonly username: string;
  readonly password: string;
  readonly groups: string[];
}

const COCKPIT_USERS: Record<string, CockpitTestUser> = {
  viewer: {
    username: "testviewer",
    password: "testpass",
    groups: ["wheel"],
  },
  operator: {
    username: "testoperator",
    password: "testpass",
    groups: ["wheel", COCKPIT.PAM_GROUPS.OPERATOR],
  },
  admin: {
    username: "testadmin",
    password: "testpass",
    groups: ["wheel", COCKPIT.PAM_GROUPS.ADMIN],
  },
};

export async function loginToCockpit(page: Page, role: string): Promise<void> {
  const user = COCKPIT_USERS[role] ?? COCKPIT_USERS["operator"]!;

  await page.goto("/");
  await page.waitForSelector("#login-user-input", { timeout: 15_000 });

  await page.fill("#login-user-input", user.username);
  await page.fill("#login-password-input", user.password);
  await page.click("#login-button");

  await page.waitForSelector("#content", { timeout: 15_000 });
}

export async function navigateToCockpitPlugin(page: Page): Promise<void> {
  await page.goto(COCKPIT.PLUGIN_PATH);
  const iframe = page.frameLocator(COCKPIT.IFRAME_SELECTOR);
  await iframe.locator("#app").waitFor({ state: "visible", timeout: 15_000 });
}

export function getCockpitUser(role: string): CockpitTestUser {
  return COCKPIT_USERS[role] ?? COCKPIT_USERS["operator"]!;
}
