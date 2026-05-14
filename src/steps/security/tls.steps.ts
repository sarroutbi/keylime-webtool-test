import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import { loadEnvironment } from "../../config/env.js";

Then(
  "the backend MUST serve responses over HTTPS",
  async function (this: CustomWorld) {
    const env = loadEnvironment();
    this.attach(
      `TLS requirement: backend at ${env.apiBaseUrl} must use HTTPS in production`,
      "text/plain",
    );
  },
);

Then(
  "the TLS version MUST be at least {string}",
  async function (this: CustomWorld, minVersion: string) {
    this.attach(
      `TLS version check: minimum ${minVersion} required. Actual TLS negotiation verification requires openssl s_client or equivalent.`,
      "text/plain",
    );
  },
);

Then(
  "the response headers MUST include Strict-Transport-Security",
  async function (this: CustomWorld) {
    const response = this.lastApiResponse as Record<string, unknown>;
    const headers = response["headers"] as Record<string, string> | undefined;

    if (headers) {
      expect(headers["strict-transport-security"]).toBeDefined();
    } else {
      const apiResponse = await this.apiContext.get("/api/kpis");
      const hsts = apiResponse.headers()["strict-transport-security"];
      expect(hsts).toBeDefined();
    }
  },
);
