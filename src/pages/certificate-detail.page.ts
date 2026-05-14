import type { Locator } from "playwright";
import { BasePage } from "./base.page.js";
import { CustomWorld } from "../support/world.js";

export class CertificateDetailPage extends BasePage {
  constructor(world: CustomWorld) {
    super(world);
  }

  get subject(): Locator {
    return this.getByTestId("certificate-subject");
  }

  get issuer(): Locator {
    return this.getByTestId("certificate-issuer");
  }

  get serialNumber(): Locator {
    return this.getByTestId("certificate-serial-number");
  }

  get validFrom(): Locator {
    return this.getByTestId("certificate-valid-from");
  }

  get validUntil(): Locator {
    return this.getByTestId("certificate-valid-until");
  }

  get status(): Locator {
    return this.getByTestId("certificate-status");
  }

  get downloadPemButton(): Locator {
    return this.getByRole("button", { name: "Download PEM" });
  }

  get downloadDerButton(): Locator {
    return this.getByRole("button", { name: "Download DER" });
  }

  async gotoCertificate(id: string): Promise<void> {
    await this.navigateTo(`/certificates/${id}`);
  }

  async goto(): Promise<void> {
    await this.navigateTo("/certificates");
  }
}
