const API = process.env.NEXT_PUBLIC_API_URL;
export async function api(path, { method = "GET", body } = {}) {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const r = await fetch(`${API}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: body && JSON.stringify(body),
  });
  if (!r.ok)
    throw new Error(
      (await r.json().catch(() => ({}))).message || "Request failed",
    );
  return r.json();
}
