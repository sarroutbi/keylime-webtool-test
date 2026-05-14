import fs from "node:fs";
import path from "node:path";
import { scrubSensitiveData } from "./sensitive-data-scrubber.js";

interface CucumberScenario {
  id: string;
  name: string;
  tags: Array<{ name: string }>;
  steps: Array<{ result: { status: string } }>;
}

interface CucumberFeature {
  name: string;
  tags: Array<{ name: string }>;
  elements: CucumberScenario[];
}

interface RequirementCoverage {
  requirementId: string;
  featureName: string;
  scenarios: Array<{
    name: string;
    status: "passed" | "failed" | "skipped" | "pending";
  }>;
}

function extractRequirementTags(tags: Array<{ name: string }>): string[] {
  return tags
    .map((t) => t.name)
    .filter((name) => /^@(FR|NFR|SR)-\d{3}$/.test(name))
    .map((name) => name.replace("@", ""));
}

function determineScenarioStatus(
  scenario: CucumberScenario,
): "passed" | "failed" | "skipped" | "pending" {
  const statuses = scenario.steps.map((s) => s.result.status);
  if (statuses.includes("failed")) return "failed";
  if (statuses.includes("skipped")) return "skipped";
  if (statuses.includes("pending")) return "pending";
  return "passed";
}

function buildTraceabilityMatrix(features: CucumberFeature[]): RequirementCoverage[] {
  const coverageMap = new Map<string, RequirementCoverage>();

  for (const feature of features) {
    const featureTags = extractRequirementTags(feature.tags);

    for (const scenario of feature.elements) {
      const scenarioTags = extractRequirementTags(scenario.tags);
      const allTags = [...new Set([...featureTags, ...scenarioTags])];

      for (const reqId of allTags) {
        if (!coverageMap.has(reqId)) {
          coverageMap.set(reqId, {
            requirementId: reqId,
            featureName: feature.name,
            scenarios: [],
          });
        }
        coverageMap.get(reqId)!.scenarios.push({
          name: scenario.name,
          status: determineScenarioStatus(scenario),
        });
      }
    }
  }

  return Array.from(coverageMap.values()).sort((a, b) =>
    a.requirementId.localeCompare(b.requirementId),
  );
}

function generateHtmlReport(matrix: RequirementCoverage[]): string {
  const totalReqs = matrix.length;
  const passedReqs = matrix.filter((r) =>
    r.scenarios.every((s) => s.status === "passed"),
  ).length;
  const failedReqs = matrix.filter((r) =>
    r.scenarios.some((s) => s.status === "failed"),
  ).length;

  const rows = matrix
    .map((req) => {
      const allPassed = req.scenarios.every((s) => s.status === "passed");
      const anyFailed = req.scenarios.some((s) => s.status === "failed");
      const statusClass = anyFailed ? "failed" : allPassed ? "passed" : "pending";
      const statusText = anyFailed ? "FAIL" : allPassed ? "PASS" : "PENDING";

      return `<tr class="${statusClass}">
        <td>${req.requirementId}</td>
        <td>${req.featureName}</td>
        <td>${req.scenarios.length}</td>
        <td>${statusText}</td>
      </tr>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Requirements Traceability Matrix</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 2rem; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #333; color: #fff; }
    .passed { background: #d4edda; }
    .failed { background: #f8d7da; }
    .pending { background: #fff3cd; }
    .summary { margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>Requirements Traceability Matrix</h1>
  <div class="summary">
    <p>Total requirements covered: ${totalReqs} | Passed: ${passedReqs} | Failed: ${failedReqs}</p>
  </div>
  <table>
    <thead>
      <tr><th>Requirement</th><th>Feature</th><th>Scenarios</th><th>Status</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}

async function main(): Promise<void> {
  const reportPath = path.resolve("reports/cucumber-report.json");

  if (!fs.existsSync(reportPath)) {
    console.error(`Report not found: ${reportPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(reportPath, "utf-8");
  const scrubbed = scrubSensitiveData(raw);
  const features: CucumberFeature[] = JSON.parse(scrubbed);

  fs.writeFileSync(reportPath, scrubbed, "utf-8");

  const matrix = buildTraceabilityMatrix(features);

  const jsonPath = path.resolve("reports/traceability-matrix.json");
  fs.writeFileSync(jsonPath, JSON.stringify(matrix, null, 2), "utf-8");

  const htmlPath = path.resolve("reports/traceability-matrix.html");
  fs.writeFileSync(htmlPath, generateHtmlReport(matrix), "utf-8");

  console.log(`Traceability matrix: ${matrix.length} requirements covered`);
  console.log(`JSON: ${jsonPath}`);
  console.log(`HTML: ${htmlPath}`);
}

const isDirectExecution =
  process.argv[1]?.endsWith("traceability-reporter.ts") ||
  process.argv[1]?.endsWith("traceability-reporter.js");

if (isDirectExecution) {
  main().catch(console.error);
}
