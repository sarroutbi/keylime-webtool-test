export interface TestEnvironment {
  readonly baseUrl: string;
  readonly apiBaseUrl: string;
  readonly headless: boolean;
  readonly recordVideo: boolean;
  readonly jwtSecret: string;
  readonly mockoonVerifierPort: number;
  readonly mockoonRegistrarPort: number;
  readonly backendPort: number;
  readonly frontendPort: number;
  readonly cockpitPort: number;
  readonly slowMo: number;
  readonly browserChannel: string;
}

function envOrDefault(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export function loadEnvironment(): TestEnvironment {
  return {
    baseUrl: envOrDefault("BASE_URL", "http://localhost:5173"),
    apiBaseUrl: envOrDefault("API_BASE_URL", "http://localhost:8080"),
    headless: process.env["HEADLESS"] !== "false",
    recordVideo: process.env["RECORD_VIDEO"] === "true",
    jwtSecret: envOrDefault("JWT_SECRET", "test-secret-key"),
    mockoonVerifierPort: parseInt(envOrDefault("MOCKOON_VERIFIER_PORT", "3000"), 10),
    mockoonRegistrarPort: parseInt(envOrDefault("MOCKOON_REGISTRAR_PORT", "3001"), 10),
    backendPort: parseInt(envOrDefault("BACKEND_PORT", "8080"), 10),
    frontendPort: parseInt(envOrDefault("FRONTEND_PORT", "5173"), 10),
    cockpitPort: parseInt(envOrDefault("COCKPIT_PORT", "9090"), 10),
    slowMo: parseInt(envOrDefault("SLOW_MO", "0"), 10),
    browserChannel: envOrDefault("BROWSER_CHANNEL", "chrome"),
  };
}
