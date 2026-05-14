import { expect, type Locator } from "@playwright/test";

export async function expectVisible(locator: Locator, description?: string): Promise<void> {
  await expect(
    locator,
    description ?? "Element MUST be visible",
  ).toBeVisible({ timeout: 10_000 });
}

export async function expectHidden(locator: Locator, description?: string): Promise<void> {
  await expect(
    locator,
    description ?? "Element MUST NOT be visible",
  ).toBeHidden({ timeout: 10_000 });
}

export async function expectTextContent(
  locator: Locator,
  expected: string | RegExp,
  description?: string,
): Promise<void> {
  if (typeof expected === "string") {
    await expect(locator, description).toHaveText(expected, { timeout: 10_000 });
  } else {
    await expect(locator, description).toHaveText(expected, { timeout: 10_000 });
  }
}

export async function expectCount(
  locator: Locator,
  count: number,
  description?: string,
): Promise<void> {
  await expect(locator, description ?? `Expected ${count} elements`).toHaveCount(count, {
    timeout: 10_000,
  });
}

export async function expectMinCount(
  locator: Locator,
  minCount: number,
  description?: string,
): Promise<void> {
  const actualCount = await locator.count();
  expect(
    actualCount,
    description ?? `Expected at least ${minCount} elements, got ${actualCount}`,
  ).toBeGreaterThanOrEqual(minCount);
}

export function expectApiSuccess(response: Record<string, unknown>): void {
  expect(response["success"], "API response MUST indicate success").toBe(true);
  expect(response["timestamp"], "API response MUST contain timestamp").toBeTruthy();
  expect(response["request_id"], "API response MUST contain request_id").toBeTruthy();
}
