// Simple in-memory sliding-window rate limiter.
//
// This is a reasonable default for a single server instance / small studio
// site. If you deploy across multiple serverless instances or regions,
// swap this for a shared store (Upstash Redis, Vercel KV, etc.) so limits
// are enforced globally instead of per-instance.
const buckets = new Map();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // per window, per IP, per form

export function rateLimit(key, { windowMs = WINDOW_MS, max = MAX_REQUESTS } = {}) {
  const now = Date.now();
  const entry = buckets.get(key);

  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 });
    return { ok: true, remaining: max - 1 };
  }

  if (entry.count >= max) {
    return { ok: false, remaining: 0, retryAfterMs: windowMs - (now - entry.start) };
  }

  entry.count += 1;
  return { ok: true, remaining: max - entry.count };
}

// Periodically clear stale buckets so this Map doesn't grow forever on a
// long-running server.
if (typeof globalThis.__rateLimitSweepStarted === "undefined") {
  globalThis.__rateLimitSweepStarted = true;
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of buckets) {
      if (now - entry.start > WINDOW_MS * 2) buckets.delete(key);
    }
  }, WINDOW_MS).unref?.();
}

export function clientIpFrom(request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}
