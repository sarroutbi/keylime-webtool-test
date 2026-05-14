import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class SettingsPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get verifierUrlInput(): Locator {
    return this.getByRole("textbox", { name: /verifier url/i });
  }

  get registrarUrlInput(): Locator {
    return this.getByRole("textbox", { name: /registrar url/i });
  }

  get saveButton(): Locator {
    return this.getByRole("button", { name: /save/i });
  }

  get cancelButton(): Locator {
    return this.getByRole("button", { name: /cancel/i });
  }

  get certificateSettings(): Locator {
    return this.getByTestId("certificate-settings");
  }

  get successMessage(): Locator {
    return this.getByRole("alert").filter({ hasText: /success/i });
  }

  get errorMessage(): Locator {
    return this.getByRole("alert").filter({ hasText: /error/i });
  }

  async goto(): Promise<void> {
    await this.navigateTo("/settings");
  }
}
