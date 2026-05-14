import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";
import { PAGE_ROUTES } from "../config/constants.js";

type SidebarModuleName =
  | "Dashboard"
  | "Agents"
  | "Attestations"
  | "Policies"
  | "Certificates"
  | "Alerts"
  | "Performance"
  | "Audit Log"
  | "Integrations"
  | "Settings";

export class SidebarPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get toggleButton(): Locator {
    return this.getByRole("button", { name: /toggle.*sidebar|menu/i });
  }

  get activeLink(): Locator {
    return this.locator("nav a[aria-current='page'], nav a.active");
  }

  navLink(name: SidebarModuleName): Locator {
    return this.getByRole("link", { name });
  }

  async goto(): Promise<void> {
    await this.navigateTo(PAGE_ROUTES["Dashboard"]);
  }
}
