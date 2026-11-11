type UmamiTracker = {
  track: (event: string, data?: Record<string, string>) => void;
};

/**
 * Umami olayı gönderir. Umami yüklü değilse (env boş, reklam engelleyici,
 * script henüz gelmedi) sessizce hiçbir şey yapmaz.
 */
export function track(event: string, data?: Record<string, string>) {
  try {
    if (typeof window === "undefined") return;
    const umami = (window as unknown as { umami?: UmamiTracker }).umami;
    if (umami && typeof umami.track === "function") umami.track(event, data);
  } catch {
    // analitik hiçbir zaman siteyi bozmamalı
  }
}
