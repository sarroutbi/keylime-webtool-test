export const PORTS = {
  MOCKOON_VERIFIER: 3000,
  MOCKOON_REGISTRAR: 3001,
  BACKEND: 8080,
  FRONTEND: 5173,
  COCKPIT: 9090,
} as const;

export const MOCK_AGENTS = {
  PULL_HEALTHY: "d432fbb3-d2f1-4a97-9ef7-75bd81c00000",
  PULL_FAILED: "a1b2c3d4-0000-1111-2222-333344445555",
  PUSH_HEALTHY: "f7e6d5c4-b3a2-9180-7654-321098765432",
  PUSH_FAILED: "b2c3d4e5-a1b0-8765-4321-fedcba987654",
  PUSH_HEALTHY_2: "c5d6e7f8-a9b0-4321-8765-abcdef012345",
  PUSH_NULL_IP: "e6f7a8b9-c0d1-2345-6789-aabbccddeeff",
  PUSH_TIMEOUT: "d1e2f3a4-b5c6-7890-1234-567890abcdef",
} as const;

export const MOCK_POLICIES = {
  IMA_PRODUCTION: "production-v1",
  IMA_STAGING: "staging-v2",
  MEASURED_BOOT: "measured-boot-v1",
} as const;

export const AGENT_STATES = {
  GET_QUOTE: "Get Quote",
  PROVIDE_V: "Provide V",
  FAILED: "Failed",
  INVALID_QUOTE: "Invalid Quote",
  TENANT_FAILED: "Tenant Failed",
  TIMEOUT: "Timeout",
} as const;

export const ROLES = {
  VIEWER: "viewer",
  OPERATOR: "operator",
  ADMIN: "admin",
} as const;

export const COCKPIT = {
  PLUGIN_PATH: "/cockpit/@localhost/keylime/",
  IFRAME_SELECTOR: 'iframe[name*="cockpit"][name*="keylime"]',
  PAM_GROUPS: {
    ADMIN: "keylime-admin",
    OPERATOR: "keylime-operator",
  },
} as const;

export const PAGE_ROUTES: Record<string, string> = {
  Dashboard: "/",
  Agents: "/agents",
  Attestations: "/attestations",
  Policies: "/policies",
  Certificates: "/certificates",
  Alerts: "/alerts",
  Performance: "/performance",
  "Audit Log": "/audit",
  Integrations: "/integrations",
  Settings: "/settings",
  Login: "/login",
};
