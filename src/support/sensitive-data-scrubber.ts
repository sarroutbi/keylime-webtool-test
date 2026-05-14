interface RedactionRule {
  readonly pattern: RegExp;
  readonly replacement: string;
}

const REDACTION_RULES: readonly RedactionRule[] = [
  {
    pattern: /ek_tpm["']?\s*[:=]\s*["'][^"']+["']/gi,
    replacement: 'ek_tpm: "[REDACTED]"',
  },
  {
    pattern: /aik_tpm["']?\s*[:=]\s*["'][^"']+["']/gi,
    replacement: 'aik_tpm: "[REDACTED]"',
  },
  {
    pattern: /ekcert["']?\s*[:=]\s*["'][^"']+["']/gi,
    replacement: 'ekcert: "[REDACTED]"',
  },
  {
    pattern: /mtls_cert["']?\s*[:=]\s*["'][^"']+["']/gi,
    replacement: 'mtls_cert: "[REDACTED]"',
  },
  {
    pattern:
      /-----BEGIN\s+(CERTIFICATE|PRIVATE KEY|PUBLIC KEY)-----[\s\S]*?-----END\s+\1-----/g,
    replacement: "[REDACTED CERTIFICATE]",
  },
  {
    pattern: /filedata_hash["']?\s*[:=]\s*["'][^"']+["']/gi,
    replacement: 'filedata_hash: "[REDACTED]"',
  },
  {
    pattern: /Bearer\s+[A-Za-z0-9\-._~+/]+=*/g,
    replacement: "Bearer [REDACTED]",
  },
  {
    pattern: /pop_token["']?\s*[:=]\s*["'][^"']+["']/gi,
    replacement: 'pop_token: "[REDACTED]"',
  },
  {
    pattern: /boot_log["']?\s*[:=]\s*["'][^"']{64,}["']/gi,
    replacement: 'boot_log: "[REDACTED]"',
  },
  {
    pattern: /ima_log["']?\s*[:=]\s*["'][^"']{64,}["']/gi,
    replacement: 'ima_log: "[REDACTED]"',
  },
];

export function scrubSensitiveData(text: string): string {
  let result = text;
  for (const { pattern, replacement } of REDACTION_RULES) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export async function scrubJsonReport(reportPath: string): Promise<void> {
  const fs = await import("node:fs");
  const raw = fs.readFileSync(reportPath, "utf-8");
  const scrubbed = scrubSensitiveData(raw);
  fs.writeFileSync(reportPath, scrubbed, "utf-8");
}
