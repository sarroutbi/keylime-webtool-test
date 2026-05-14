import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setWorldConstructor,
  Status,
} from "@cucumber/cucumber";
import { chromium, request } from "playwright";
import { CustomWorld } from "./world.js";
import { loadEnvironment } from "../config/env.js";
import { scrubSensitiveData } from "./sensitive-data-scrubber.js";

setWorldConstructor(CustomWorld);

const env = loadEnvironment();

BeforeAll(async function () {
  CustomWorld.browser = await chromium.launch({
    channel: env.browserChannel,
    headless: env.headless,
    slowMo: env.slowMo,
  });
});

Before(async function (this: CustomWorld) {
  if (!this.isApiOnly) {
    this.context = await CustomWorld.browser.newContext({
      baseURL: this.baseUrl,
      ignoreHTTPSErrors: true,
      recordVideo: env.recordVideo
        ? { dir: "reports/videos/" }
        : undefined,
    });
    this.page = await this.context.newPage();
  }

  this.apiContext = await request.newContext({
    baseURL: this.apiBaseUrl,
    ignoreHTTPSErrors: true,
  });
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED && this.page) {
    const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9]/g, "-");
    const screenshotBuffer = await this.page.screenshot({ fullPage: true });
    this.attach(screenshotBuffer, "image/png");
    this.attach(
      scrubSensitiveData(`Failure screenshot captured for: ${safeName}`),
      "text/plain",
    );
  }

  if (this.apiContext) await this.apiContext.dispose();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  if (CustomWorld.browser) await CustomWorld.browser.close();
});
