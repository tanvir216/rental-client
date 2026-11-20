import Link from "next/link";
import Logo from "./Logo";
const L = ({ href, children }) => (
  <Link
    href={href}
    className="w-fit text-sm text-[#d9d2ca]/80 transition-all hover:translate-x-1 hover:text-primary"
  >
    {children}
  </Link>
);
export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative mt-10 overflow-hidden text-[#f1ebe4]"
      style={{
        background:
          "radial-gradient(700px 300px at 85% 0%, rgba(242,138,46,.08), transparent 60%), linear-gradient(180deg,#0e0e0e,#000)",
      }}
    >
      <div className="palette-bar rounded-none" style={{ height: 8 }} />
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <aside className="space-y-4 lg:col-span-2">
          <Logo light />
          <p className="max-w-sm text-sm leading-relaxed text-[#d9d2ca]/75">
            Rent equipment from verified owners. A transparent, secure
            marketplace for construction, photography, vehicles and more.
          </p>
          <p className="text-sm text-[#d9d2ca]/75">
            support@rentgear.com
            <br />
            +880 1700-000000
          </p>
        </aside>
        <nav className="flex flex-col gap-3">
          <h6 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Explore
          </h6>
          <L href="/">Home</L>
          <L href="/equipment">All Equipment</L>
          <L href="/#how">How It Works</L>
          <L href="/login">Login</L>
          <L href="/register">Register</L>
        </nav>
        <nav className="flex flex-col gap-3">
          <h6 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-primary">
            Follow us
          </h6>
          <a
            href="https://x.com"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="grid h-11 w-11 place-items-center rounded-full border border-[#F5A35C]/40 text-white transition-all hover:-translate-y-1 hover:border-primary hover:bg-primary hover:text-black"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </nav>
      </div>
      <div className="border-t border-[#F5A35C]/15 py-5 text-center text-xs text-[#d9d2ca]/55">
        © {new Date().getFullYear()} RentGear. All rights reserved.
      </div>
    </footer>
  );
}
