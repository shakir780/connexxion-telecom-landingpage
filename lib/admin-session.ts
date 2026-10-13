/* ─── Admin session ───
   A single shared password, no user accounts. A successful login gets a
   cookie holding its own expiry plus an HMAC of that expiry, signed with
   SESSION_SECRET. Nothing is stored server-side, so changing SESSION_SECRET
   logs everyone out.

   Web Crypto only, so this module runs both in proxy.ts and on the server. */

export const SESSION_COOKIE = "cx_admin";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days, in seconds

const encoder = new TextEncoder();

function secret(): string | null {
  const value = process.env.SESSION_SECRET;
  return value && value.length >= 32 ? value : null;
}

async function hmacKey(value: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(value),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(bytes)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(text: string): Uint8Array<ArrayBuffer> | null {
  try {
    const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/"));
    return Uint8Array.from(binary, (c) => c.charCodeAt(0));
  } catch {
    return null;
  }
}

export async function createSessionToken(): Promise<string> {
  const key = secret();
  if (!key) throw new Error("SESSION_SECRET must be set (at least 32 characters).");
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);
  const signature = await crypto.subtle.sign("HMAC", await hmacKey(key), encoder.encode(expires));
  return `${expires}.${toBase64Url(signature)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const key = secret();
  if (!key || !token) return false;

  const [expires, signature] = token.split(".");
  if (!expires || !signature || !/^\d+$/.test(expires)) return false;
  if (Number(expires) < Date.now() / 1000) return false;

  const bytes = fromBase64Url(signature);
  if (!bytes) return false;
  return crypto.subtle.verify("HMAC", await hmacKey(key), bytes, encoder.encode(expires));
}
