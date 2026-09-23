type AnalyticsPayload = Record<string, unknown> & {
  type: "interaction" | "web-vital";
};

const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;

export function sendAnalytics(payload: AnalyticsPayload) {
  if (!endpoint || typeof navigator === "undefined") return;

  const body = JSON.stringify({
    ...payload,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
  });

  if (navigator.sendBeacon?.(endpoint, body)) return;

  void fetch(endpoint, {
    method: "POST",
    body,
    keepalive: true,
    headers: { "content-type": "application/json" },
  });
}
