import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const u = session.user,
    base = process.env.NEXT_PUBLIC_API_URL;

  try {
    // One request: the backend creates the user if new and returns the token.
    const r = await fetch(`${base}/jwt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-key": process.env.INTERNAL_KEY,
      },
      body: JSON.stringify({ name: u.name, email: u.email, photo: u.image }),
    });
    const data = await r.json().catch(() => ({}));
    return Response.json(data, { status: r.status });
  } catch (e) {
    return Response.json(
      { message: "Could not reach the backend server" },
      { status: 502 },
    );
  }
}
