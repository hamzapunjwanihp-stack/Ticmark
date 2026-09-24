/**
 * Forwards a JSON payload to a webhook (Formspree, Zapier, Make, Slack, a CRM…).
 * Returns "delivered", "not-configured" or "failed".
 */
export async function forwardToWebhook(url: string | undefined, payload: Record<string, unknown>) {
  if (!url) return "not-configured" as const;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    return res.ok ? ("delivered" as const) : ("failed" as const);
  } catch {
    return "failed" as const;
  }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

export function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
