import type { Page, FrameLocator, Locator } from "playwright";
import { CustomWorld } from "../support/world.js";
import { COCKPIT } from "../config/constants.js";

export abstract class BasePage {
  protected readonly world: CustomWorld;

  constructor(world: CustomWorld) {
    this.world = world;
  }

  protected get root(): Page | FrameLocator {
    if (this.world.isCockpit) {
      return this.world.page.frameLocator(COCKPIT.IFRAME_SELECTOR);
    }
    return this.world.page;
  }

  protected locator(selector: string): Locator {
    return this.root.locator(selector);
  }

  protected getByRole(
    role: Parameters<Page["getByRole"]>[0],
    options?: Parameters<Page["getByRole"]>[1],
  ): Locator {
    return this.root.getByRole(role, options);
  }

  protected getByText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.root.getByText(text, options);
  }

  protected getByTestId(testId: string): Locator {
    return this.root.getByTestId(testId);
  }

  async navigateTo(path: string): Promise<void> {
    if (this.world.isCockpit) {
      const cockpitPath = path === "/" ? "" : path.replace(/^\//, "");
      await this.world.page.goto(`${this.world.baseUrl}${COCKPIT.PLUGIN_PATH}#/${cockpitPath}`);
    } else {
      await this.world.page.goto(path);
    }
  }

  async waitForPageLoad(): Promise<void> {
    if (this.world.isCockpit) {
      const iframe = this.world.page.frameLocator(COCKPIT.IFRAME_SELECTOR);
      await iframe.locator("#app").waitFor({ state: "visible", timeout: 15_000 });
    }
    await this.world.page.waitForLoadState("networkidle", { timeout: 15_000 });
  }

  async currentUrl(): Promise<string> {
    return this.world.page.url();
  }
}
