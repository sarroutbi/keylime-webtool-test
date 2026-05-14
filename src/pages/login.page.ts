import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class LoginPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get usernameInput(): Locator {
    return this.getByRole("textbox", { name: /username/i });
  }

  get passwordInput(): Locator {
    return this.locator('input[type="password"]');
  }

  get loginButton(): Locator {
    return this.getByRole("button", { name: /log\s*in|sign\s*in/i });
  }

  get errorMessage(): Locator {
    return this.getByRole("alert");
  }

  async goto(): Promise<void> {
    await this.navigateTo("/login");
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
