import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const u = session.user,
    base = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");

  if (!base)
    return Response.json(
      { message: "NEXT_PUBLIC_API_URL is not set on the client" },
      { status: 500 },
    );
  if (!process.env.INTERNAL_KEY)
    return Response.json(
      { message: "INTERNAL_KEY is not set on the client" },
      { status: 500 },
    );

  try {
    // One request: the backend creates the user if new and returns the token.
    const r = await fetch(`${base}/jwt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-key": process.env.INTERNAL_KEY,
      },
      body: JSON.stringify({ name: u.name, email: u.email, photo: u.image }),
      cache: "no-store",
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok && !data.message) data.message = `Backend responded ${r.status}`;
    return Response.json(data, { status: r.status });
  } catch (e) {
    return Response.json(
      { message: `Could not reach the backend server (${base}): ${e.message}` },
      { status: 502 },
    );
  }
}
