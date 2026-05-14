import jwt from "jsonwebtoken";
import type { Page } from "playwright";
import { loadEnvironment } from "../config/env.js";

interface TestUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly role: string;
}

const TEST_USERS: Record<string, TestUser> = {
  viewer: {
    id: "test-viewer-001",
    name: "Test Viewer",
    email: "viewer@test.keylime.dev",
    role: "viewer",
  },
  operator: {
    id: "test-operator-001",
    name: "Test Operator",
    email: "operator@test.keylime.dev",
    role: "operator",
  },
  admin: {
    id: "test-admin-001",
    name: "Test Admin",
    email: "admin@test.keylime.dev",
    role: "admin",
  },
};

export function generateTestToken(role: string): string {
  const user = TEST_USERS[role] ?? TEST_USERS["operator"]!;
  const env = loadEnvironment();
  return jwt.sign(
    { sub: user.id, name: user.name, email: user.email, role: user.role },
    env.jwtSecret,
    { expiresIn: "1h" },
  );
}

export async function injectAuthToken(page: Page, role: string): Promise<void> {
  const token = generateTestToken(role);
  const user = TEST_USERS[role] ?? TEST_USERS["operator"]!;

  await page.addInitScript(
    ({ token, user }) => {
      sessionStorage.setItem("access_token", token);
      sessionStorage.setItem("user", JSON.stringify(user));
    },
    { token, user },
  );
}

export function getTestUser(role: string): TestUser {
  return TEST_USERS[role] ?? TEST_USERS["operator"]!;
}
