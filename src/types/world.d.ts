export type DeploymentMode = "standalone" | "cockpit" | "api-only";

export interface WorldParameters {
  deploymentMode: DeploymentMode;
  baseUrl: string;
  apiBaseUrl: string;
}
