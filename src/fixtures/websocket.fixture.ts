import { WebSocket } from "ws";

export interface WebSocketTestClient {
  readonly ws: WebSocket;
  readonly messages: string[];
  send(data: string): void;
  waitForMessage(timeoutMs?: number): Promise<string>;
  close(): void;
}

export async function connectWebSocket(
  url: string,
  token?: string,
): Promise<WebSocketTestClient> {
  const fullUrl = token ? `${url}?token=${token}` : url;
  const messages: string[] = [];

  return new Promise((resolve, reject) => {
    const ws = new WebSocket(fullUrl, {
      rejectUnauthorized: false,
    });

    const client: WebSocketTestClient = {
      ws,
      messages,
      send(data: string) {
        ws.send(data);
      },
      waitForMessage(timeoutMs = 5_000): Promise<string> {
        return new Promise((msgResolve, msgReject) => {
          if (messages.length > 0) {
            msgResolve(messages.shift()!);
            return;
          }

          const timeout = setTimeout(() => {
            msgReject(new Error("Timed out waiting for WebSocket message"));
          }, timeoutMs);

          ws.once("message", (data) => {
            clearTimeout(timeout);
            msgResolve(data.toString());
          });
        });
      },
      close() {
        ws.close();
      },
    };

    ws.on("open", () => resolve(client));
    ws.on("error", (err) => reject(err));
    ws.on("message", (data) => messages.push(data.toString()));
  });
}
