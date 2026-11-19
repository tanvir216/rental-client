"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/components/AuthProvider";
const b = "/dashboard/";
const menus = {
  customer: [
    ["My Rentals", b + "customer/rentals"],
    ["Favorites", b + "customer/favorites"],
  ],
  owner: [
    ["Analytics", b + "owner"],
    ["Add Equipment", b + "owner/add"],
    ["My Equipment", b + "owner/equipment"],
    ["My Equipment Rental", b + "owner/rentals"],
  ],
  admin: [
    ["Analytics", b + "admin"],
    ["All Users", b + "admin/users"],
    ["All Equipment", b + "admin/equipment"],
    ["All Rentals", b + "admin/rentals"],
  ],
};
const icon = {
  "My Rentals": "📋",
  Favorites: "⭐",
  Analytics: "📈",
  "Add Equipment": "➕",
  "My Equipment": "🧰",
  "My Equipment Rental": "📋",
  "All Users": "👥",
  "All Equipment": "🧰",
  "All Rentals": "📋",
  "My Profile": "👤",
};
function Shell({ children }) {
  const { user, role } = useAuth();
  const path = usePathname();
  const items = [...(menus[role] || []), ["My Profile", b + "profile"]];
  return (
    <div className="drawer lg:drawer-open">
      <input id="dr" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-[calc(100vh-4.5rem)] w-full p-4 sm:p-6 lg:p-10">
        <div className="mb-6 flex items-center justify-between gap-3 lg:hidden">
          <label htmlFor="dr" className="btn btn-primary btn-sm">
            ☰ Menu
          </label>
          <span className="badge badge-primary font-bold capitalize">
            {role} panel
          </span>
        </div>
        {children}
      </div>
      <div className="drawer-side z-50 lg:top-[4.5rem] lg:z-30 lg:h-[calc(100vh-4.5rem)]">
        <label htmlFor="dr" className="drawer-overlay" />
        <aside
          className="flex min-h-full w-72 flex-col gap-2 p-5 text-[#ffe7cf]"
          style={{
            background:
              "radial-gradient(400px 260px at 0% 0%, rgba(255,127,0,.28), transparent 60%), linear-gradient(180deg,#140A03,#000)",
          }}
        >
          <div className="mb-3 flex items-center gap-3 rounded-2xl border border-[#ffa95b]/25 bg-white/5 p-3">
            <img
              src={user?.image || "https://i.ibb.co/2kRjVHB/user.png"}
              alt=""
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary"
            />
            <div className="min-w-0">
              <p className="truncate font-display font-bold text-white">
                {user?.name}
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {role} panel
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1.5">
            {items.map(([l, h]) => (
              <Link
                key={h}
                href={h}
                className={`side-link ${path === h ? "is-active" : ""}`}
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-base">
                  {icon[l]}
                </span>
                {l}
              </Link>
            ))}
          </nav>
          <span className="palette-bar mt-auto" />
        </aside>
      </div>
    </div>
  );
}
export default function Layout({ children }) {
  const seg = usePathname().split("/")[2];
  const roles = ["customer", "owner", "admin"].includes(seg)
    ? [seg]
    : undefined;
  return (
    <PrivateRoute roles={roles}>
      <Shell>{children}</Shell>
    </PrivateRoute>
  );
}
