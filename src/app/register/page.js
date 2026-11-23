"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "@/components/Logo";
export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target),
      password = f.get("password");
    if (!/[A-Z]/.test(password))
      return toast.error("Password needs an uppercase letter");
    if (!/[a-z]/.test(password))
      return toast.error("Password needs a lowercase letter");
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters");
    setBusy(true);
    const { error } = await authClient.signUp.email({
      name: f.get("name"),
      email: f.get("email"),
      password,
      image: f.get("photo"),
    });
    setBusy(false);
    if (error) return toast.error(error.message || "Registration failed");
    toast.success("Registration successful");
    router.push("/");
  };
  return (
    <div className="container-x grid min-h-[calc(100vh-4.5rem)] items-center py-10">
      <div
        className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2rem] bg-base-100 shadow-2xl lg:grid-cols-2"
        style={{ border: "1px solid var(--line)" }}
      >
        <aside
          className="relative hidden flex-col justify-between overflow-hidden p-10 text-white lg:flex"
          style={{
            background:
              "radial-gradient(500px 300px at 100% 0%, rgba(255,127,0,.55), transparent 60%), linear-gradient(160deg,#000 0%,#522600 100%)",
          }}
        >
          <Logo light />
          <div>
            <h2 className="font-display text-4xl font-black leading-tight">
              Join the rental marketplace
            </h2>
            <p className="mt-4 text-[#ffe7cf]/80">
              Create a free account and start renting or listing equipment
              today.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              {[
                ["500+", "Equipment"],
                ["120+", "Owners"],
                ["4.8★", "Rating"],
              ].map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-2xl border border-[#ffa95b]/30 bg-white/5 p-3"
                >
                  <p className="font-display text-xl font-extrabold text-[#FFA95B]">
                    {v}
                  </p>
                  <p className="text-xs text-[#ffe7cf]/70">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <span className="palette-bar" />
        </aside>
        <div className="p-7 sm:p-10">
          <span className="eyebrow">Register</span>
          <h1 className="page-title mb-2 mt-2">Create account</h1>
          <p className="mb-7 text-sm opacity-70">It only takes a minute.</p>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="field-label">Name</label>
              <input
                name="name"
                required
                placeholder="Your full name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="field-label">Photo URL</label>
              <input
                name="photo"
                type="url"
                required
                pattern="https?://.+"
                title="Enter a direct image link starting with http:// or https://"
                placeholder="https://..."
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  required
                  placeholder="Min 6 chars, upper + lower case"
                  className="input input-bordered w-full pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm opacity-60 hover:opacity-100"
                >
                  {show ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            <button disabled={busy} className="btn btn-primary w-full">
              {busy ? "Creating..." : "Register"}
            </button>
          </form>
          <div className="divider text-xs font-bold opacity-60">OR</div>
          <button
            onClick={() =>
              authClient.signIn.social({ provider: "google", callbackURL: "/" })
            }
            className="btn btn-outline w-full"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
              <path
                fill="#FFC107"
                d="M43.6 20.1H42V20H24v8h11.3A12 12 0 1 1 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7A20 20 0 1 0 44 24c0-1.3-.1-2.7-.4-3.9z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7A20 20 0 0 0 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.5 5A20 20 0 0 0 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.1H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.7-.4-3.9z"
              />
            </svg>
            Continue with Google
          </button>
          <p className="mt-6 text-center text-sm">
            Already registered?{" "}
            <Link href="/login" className="link font-bold brand-ink">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}