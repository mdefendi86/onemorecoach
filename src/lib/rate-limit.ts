/*
  Per-IP rate limiter for the application Server Action.

  REBUILD_PLAN.md §9: "in-memory with caveat that serverless cold-starts
  reset state." This is the v1 implementation; v2 swaps in Vercel KV
  for cross-instance persistence. For a low-volume coaching site
  (5 submissions/IP/hour cap), in-memory is sufficient most of the
  time — and the honeypot is the primary spam defense anyway.

  Sliding-window implementation: each IP has an array of submission
  timestamps; old timestamps outside the window are pruned on every
  check. Caller gets a boolean (true = allowed).
*/

const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const MAX_PER_WINDOW = 5

const requests = new Map<string, number[]>()

/**
 * Returns true if the IP is under the per-window cap, false if rate-limited.
 * Records the timestamp as part of the check.
 */
export function checkAndRecordRequest(ip: string): boolean {
  const now = Date.now()
  const pruned = (requests.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (pruned.length >= MAX_PER_WINDOW) {
    requests.set(ip, pruned)
    return false
  }

  pruned.push(now)
  requests.set(ip, pruned)
  return true
}
