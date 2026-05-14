const profile = process.env.CUCUMBER_PROFILE || "standalone";

const featurePaths = {
  standalone: ["features/**/*.feature"],
  cockpit: [
    "features/cockpit/**/*.feature",
    "features/dashboard/**/*.feature",
    "features/agents/**/*.feature",
    "features/attestations/**/*.feature",
    "features/policies/**/*.feature",
    "features/certificates/**/*.feature",
    "features/alerts/**/*.feature",
    "features/performance/**/*.feature",
    "features/audit/**/*.feature",
    "features/integrations/**/*.feature",
    "features/settings/**/*.feature",
  ],
  api: ["features/api/**/*.feature"],
};

const tagFilters = {
  standalone: "not @cockpit and not @wip",
  cockpit: "not @standalone-only and not @wip",
  api: "@api and not @wip",
};

const worldParams = {
  standalone: {
    deploymentMode: "standalone",
    baseUrl: "http://localhost:5173",
    apiBaseUrl: "http://localhost:8080",
  },
  cockpit: {
    deploymentMode: "cockpit",
    baseUrl: "http://localhost:9090",
    apiBaseUrl: "http://localhost:8080",
  },
  api: {
    deploymentMode: "api-only",
    baseUrl: "http://localhost:8080",
    apiBaseUrl: "http://localhost:8080",
  },
};

export default {
  import: ["src/support/*.ts", "src/steps/**/*.ts"],
  paths: featurePaths[profile] || featurePaths.standalone,
  tags: tagFilters[profile] || tagFilters.standalone,
  format: [
    "progress-bar",
    "json:reports/cucumber-report.json",
    "html:reports/cucumber-report.html",
  ],
  formatOptions: {
    snippetInterface: "async-await",
  },
  worldParameters: worldParams[profile] || worldParams.standalone,
};
