import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class TopbarPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get searchInput(): Locator {
    return this.getByRole("searchbox");
  }

  get notificationBell(): Locator {
    return this.getByRole("button", { name: /notification/i });
  }

  get notificationCount(): Locator {
    return this.getByTestId("notification-count");
  }

  get timeRangeSelector(): Locator {
    return this.getByTestId("time-range-selector");
  }

  get userMenu(): Locator {
    return this.getByRole("button", { name: /user.*menu|account/i });
  }

  get hamburgerButton(): Locator {
    return this.getByRole("button", { name: /menu|hamburger/i });
  }

  async goto(): Promise<void> {
    await this.navigateTo("/");
  }
}
