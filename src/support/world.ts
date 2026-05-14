import { World, IWorldOptions } from "@cucumber/cucumber";
import {
  Browser,
  BrowserContext,
  Page,
  APIRequestContext,
} from "playwright";
import type { DeploymentMode, WorldParameters } from "../types/world.js";

export class CustomWorld extends World<WorldParameters> {
  static browser: Browser;

  context!: BrowserContext;
  page!: Page;
  apiContext!: APIRequestContext;

  lastApiResponse: unknown;
  lastApiStatus: number = 0;
  currentAgentId: string | undefined;
  authToken: string | undefined;

  constructor(options: IWorldOptions<WorldParameters>) {
    super(options);
  }

  get deploymentMode(): DeploymentMode {
    return this.parameters.deploymentMode;
  }

  get baseUrl(): string {
    return this.parameters.baseUrl;
  }

  get apiBaseUrl(): string {
    return this.parameters.apiBaseUrl;
  }

  get isCockpit(): boolean {
    return this.deploymentMode === "cockpit";
  }

  get isApiOnly(): boolean {
    return this.deploymentMode === "api-only";
  }

  get isStandalone(): boolean {
    return this.deploymentMode === "standalone";
  }
}
