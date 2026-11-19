import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function POST() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return Response.json({ message: "Unauthorized" }, { status: 401 });

  const u = session.user,
    base = process.env.NEXT_PUBLIC_API_URL;
  const h = {
    "Content-Type": "application/json",
    "x-internal-key": process.env.INTERNAL_KEY,
  };

  try {
    await fetch(`${base}/users`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ name: u.name, email: u.email, photo: u.image }),
    });
    const r = await fetch(`${base}/jwt`, {
      method: "POST",
      headers: h,
      body: JSON.stringify({ email: u.email }),
    });
    const data = await r.json().catch(() => ({}));
    return Response.json(data, { status: r.status });
  } catch (e) {
    return Response.json(
      { message: "Backend server e connect kora jacche na" },
      { status: 502 },
    );
  }
}
