/**
 * Reads the XSRF-TOKEN cookie set by double-submit CSRF protection middleware.
 */
export function getCsrfToken(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|; )XSRF-TOKEN=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

export function getCsrfHeaders(): Record<string, string> {
  const token = getCsrfToken();
  return token ? { "X-CSRF-Token": token } : {};
}
