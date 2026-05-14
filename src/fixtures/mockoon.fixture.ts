import { exec, type ChildProcess } from "node:child_process";
import { loadEnvironment } from "../config/env.js";

let verifierProcess: ChildProcess | null = null;
let registrarProcess: ChildProcess | null = null;

export async function startMockoonServers(
  verifierDataPath: string,
  registrarDataPath: string,
): Promise<void> {
  const env = loadEnvironment();

  verifierProcess = exec(
    `npx @mockoon/cli start --data ${verifierDataPath} --port ${env.mockoonVerifierPort}`,
  );

  registrarProcess = exec(
    `npx @mockoon/cli start --data ${registrarDataPath} --port ${env.mockoonRegistrarPort}`,
  );

  await waitForPort(env.mockoonVerifierPort);
  await waitForPort(env.mockoonRegistrarPort);
}

export async function stopMockoonServers(): Promise<void> {
  if (verifierProcess) {
    verifierProcess.kill();
    verifierProcess = null;
  }
  if (registrarProcess) {
    registrarProcess.kill();
    registrarProcess = null;
  }
}

async function waitForPort(port: number, timeoutMs: number = 10_000): Promise<void> {
  const start = Date.now();
  const { createConnection } = await import("node:net");

  return new Promise((resolve, reject) => {
    function tryConnect() {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timeout waiting for port ${port}`));
        return;
      }

      const socket = createConnection({ port, host: "127.0.0.1" }, () => {
        socket.destroy();
        resolve();
      });

      socket.on("error", () => {
        setTimeout(tryConnect, 250);
      });
    }

    tryConnect();
  });
}
