import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../../support/world.js";
import {
  connectWebSocket,
  type WebSocketTestClient,
} from "../../fixtures/websocket.fixture.js";
import { loadEnvironment } from "../../config/env.js";

let wsClient: WebSocketTestClient | null = null;

Given(
  "a WebSocket connection is established",
  async function (this: CustomWorld) {
    const env = loadEnvironment();
    const wsUrl = `ws://localhost:${env.backendPort}/ws/events`;
    wsClient = await connectWebSocket(wsUrl, this.authToken);
  },
);

When(
  "the WebSocket connection drops unexpectedly",
  async function (this: CustomWorld) {
    if (wsClient) {
      wsClient.close();
      wsClient = null;
    }
    this.attach("WebSocket connection closed to simulate drop", "text/plain");
  },
);

Then(
  "the WebSocket MUST receive a message within {int} seconds",
  async function (this: CustomWorld, seconds: number) {
    if (!wsClient) throw new Error("No WebSocket connection established");
    const message = await wsClient.waitForMessage(seconds * 1000);
    expect(message).toBeTruthy();
    this.lastApiResponse = JSON.parse(message);
  },
);

Then(
  "the WebSocket connection MUST be open",
  async function (_this: CustomWorld) {
    if (!wsClient) throw new Error("No WebSocket connection established");
    expect(wsClient.ws.readyState).toBe(1); // WebSocket.OPEN
  },
);
