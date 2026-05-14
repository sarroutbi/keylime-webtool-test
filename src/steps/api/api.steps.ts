import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";

When(
  "the client sends GET {string}",
  async function (this: CustomWorld, url: string) {
    const response = await this.apiContext.get(url);
    this.lastApiStatus = response.status();
    this.lastApiResponse = await response.json();
  },
);

When(
  "the client sends POST {string}",
  async function (this: CustomWorld, url: string) {
    const response = await this.apiContext.post(url);
    this.lastApiStatus = response.status();
    this.lastApiResponse = await response.json();
  },
);

Then(
  "the response status MUST be {int}",
  async function (this: CustomWorld, status: number) {
    expect(this.lastApiStatus).toBe(status);
  },
);

Then(
  "the response MUST contain {string} equal to true",
  async function (this: CustomWorld, field: string) {
    const body = this.lastApiResponse as Record<string, unknown>;
    expect(body[field]).toBe(true);
  },
);

Then(
  "the response MUST contain a {string} object",
  async function (this: CustomWorld, field: string) {
    const body = this.lastApiResponse as Record<string, unknown>;
    expect(body[field]).toBeDefined();
    expect(typeof body[field]).toBe("object");
    expect(body[field]).not.toBeNull();
  },
);

Then(
  "the response MUST contain a {string} string",
  async function (this: CustomWorld, field: string) {
    const body = this.lastApiResponse as Record<string, unknown>;
    expect(body[field]).toBeDefined();
    expect(typeof body[field]).toBe("string");
  },
);

Then(
  "the response data MUST contain {string}",
  async function (this: CustomWorld, field: string) {
    const body = this.lastApiResponse as Record<string, unknown>;
    const data = body["data"] as Record<string, unknown>;
    expect(data).toBeDefined();
    expect(data[field]).toBeDefined();
  },
);

Then(
  "the response data MUST contain {string} as an array",
  async function (this: CustomWorld, field: string) {
    const body = this.lastApiResponse as Record<string, unknown>;
    const data = body["data"] as Record<string, unknown>;
    expect(data).toBeDefined();
    expect(Array.isArray(data[field])).toBe(true);
  },
);

Then(
  "the response data {string} MUST have at least {int} entry",
  async function (this: CustomWorld, field: string, minEntries: number) {
    const body = this.lastApiResponse as Record<string, unknown>;
    const data = body["data"] as Record<string, unknown>;
    expect(data).toBeDefined();
    const array = data[field] as unknown[];
    expect(Array.isArray(array)).toBe(true);
    expect(array.length).toBeGreaterThanOrEqual(minEntries);
  },
);
