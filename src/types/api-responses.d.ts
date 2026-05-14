export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  request_id: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

export interface Agent {
  agent_id: string;
  ip: string | null;
  port: number | null;
  operational_state: number;
  operational_state_description: string;
  attestation_count: number;
  last_successful_attestation: string | null;
  last_received_quote: string | null;
  v: string | null;
  regcount: number;
  accept_tpm_hash_algs: string[];
  accept_tpm_encryption_algs: string[];
  accept_tpm_signing_algs: string[];
  hash_alg: string;
  enc_alg: string;
  sign_alg: string;
  tpm_policy: string | null;
  mb_policy: string | null;
  ima_policy: string | null;
  metadata: string | null;
  severity_level: number | null;
}

export interface KpiData {
  total_agents: number;
  active_agents: number;
  failed_agents: number;
  timed_out_agents: number;
  attestation_success_rate: number;
  average_attestation_latency_ms: number;
  certificate_expiry_warnings: number;
  active_ima_policies: number;
  revocation_events_24h: number;
}

export interface AttestationSummary {
  total: number;
  passed: number;
  failed: number;
  pending: number;
  range: string;
}

export interface Policy {
  name: string;
  type: "ima" | "measured_boot";
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: string;
  subject: string;
  issuer: string;
  serial_number: string;
  not_before: string;
  not_after: string;
  status: "valid" | "warning" | "expired";
  agent_id: string;
}

export interface Alert {
  id: string;
  type: string;
  severity: "critical" | "high" | "medium" | "low" | "info";
  status: "new" | "acknowledged" | "investigating" | "resolved" | "dismissed";
  message: string;
  agent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuditEntry {
  id: string;
  event_type: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  hash: string;
  previous_hash: string;
}
