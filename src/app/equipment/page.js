"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import EquipmentCard from "@/components/EquipmentCard";
import { CardGridSkeleton } from "@/components/Skeleton";
const cats = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
];
function List() {
  const sp = useSearchParams();
  const [f, setF] = useState({
    search: sp.get("search") || "",
    category: sp.get("category") || "",
    rentalType: "",
    minPrice: "",
    maxPrice: "",
    available: "",
    sort: "",
    page: 1,
  });
  const [data, setData] = useState(null);
  const first = useRef(true);

  useEffect(() => {
    const q = new URLSearchParams(
      Object.entries(f).filter(([, v]) => v !== ""),
    );
    const run = () =>
      api(`/equipment?${q}&limit=9`)
        .then(setData)
        .catch(() => setData({ items: [], pages: 1 }));
    if (first.current) {
      first.current = false;
      run();
      return;
    }
    const t = setTimeout(run, 400);
    return () => clearTimeout(t);
  }, [f]);

  const cat = sp.get("category") || "";
  useEffect(() => {
    setF((o) => (o.category === cat ? o : { ...o, category: cat, page: 1 }));
  }, [cat]);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value, page: 1 });
  const blank = {
    search: "",
    category: "",
    rentalType: "",
    minPrice: "",
    maxPrice: "",
    available: "",
    sort: "",
    page: 1,
  };
  const active = Object.entries(f).filter(
    ([k, v]) => k !== "page" && k !== "sort" && v !== "",
  );
  const goPage = (p) => {
    setF({ ...f, page: p });
    window.scrollTo({ top: 260, behavior: "smooth" });
  };
  const sel = "select select-bordered w-full",
    inp = "input input-bordered w-full";
  return (
    <main>
      <section
        className="relative overflow-hidden px-4 py-16 text-center text-white"
        style={{
          background:
            "radial-gradient(600px 260px at 85% 0%, rgba(255,127,0,.4), transparent 60%), linear-gradient(120deg,#000 0%,#522600 100%)",
        }}
      >
        <span className="eyebrow" style={{ color: "#FFA95B" }}>
          Marketplace
        </span>
        <h1 className="page-title mt-3">
          All <span className="gradient-text">Equipment</span>
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[#ffe7cf]/80">
          Search, filter and sort approved equipment from verified owners.
        </p>
        <span
          className="palette-bar absolute inset-x-0 bottom-0 rounded-none"
          style={{ height: 8 }}
        />
      </section>
      <div className="container-x py-10">
        <div className="surface mb-10 grid gap-3 p-5 md:grid-cols-4 lg:grid-cols-7">
          <input
            className={`${inp} lg:col-span-2`}
            placeholder="Search name or location"
            value={f.search}
            onChange={set("search")}
          />
          <select className={sel} value={f.category} onChange={set("category")}>
            <option value="">Category</option>
            {cats.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className={sel}
            value={f.rentalType}
            onChange={set("rentalType")}
          >
            <option value="">Rental type</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
          </select>
          <select
            className={sel}
            value={f.available}
            onChange={set("available")}
          >
            <option value="">Availability</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
          <input
            className={inp}
            type="number"
            placeholder="Min $"
            value={f.minPrice}
            onChange={set("minPrice")}
          />
          <input
            className={inp}
            type="number"
            placeholder="Max $"
            value={f.maxPrice}
            onChange={set("maxPrice")}
          />
          <select
            className={`${sel} md:col-span-2 lg:col-span-1 lg:col-start-7`}
            value={f.sort}
            onChange={set("sort")}
          >
            <option value="">Recently added</option>
            <option value="low">Price low to high</option>
            <option value="high">Price high to low</option>
          </select>
        </div>
        {active.length > 0 && (
          <div className="-mt-4 mb-8 flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold opacity-60">Filters:</span>
            {active.map(([k, v]) => (
              <button
                key={k}
                onClick={() => setF({ ...f, [k]: "", page: 1 })}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold brand-ink transition-colors hover:bg-primary/25"
                aria-label={`Remove filter ${k}`}
              >
                {k === "available"
                  ? v === "true"
                    ? "Available"
                    : "Unavailable"
                  : k === "minPrice"
                    ? `Min $${v}`
                    : k === "maxPrice"
                      ? `Max $${v}`
                      : v}
                <span aria-hidden="true">✕</span>
              </button>
            ))}
            <button
              onClick={() => setF(blank)}
              className="btn btn-ghost btn-xs ml-1"
            >
              Clear all
            </button>
          </div>
        )}
        {!data ? (
          <CardGridSkeleton count={9} />
        ) : !data.items.length ? (
          <div className="surface grid place-items-center gap-2 py-20 text-center">
            <span className="text-5xl">🔍</span>
            <p className="font-display text-xl font-bold">No equipment found</p>
            <p className="text-sm opacity-60">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((e) => (
              <EquipmentCard key={e._id} e={e} showStatus />
            ))}
          </div>
        )}
        {(data?.pages || 0) > 1 && (
          <div className="pager join mt-10 flex flex-wrap justify-center gap-2">
            <button
              className="btn"
              disabled={f.page <= 1}
              onClick={() => goPage(f.page - 1)}
              aria-label="Previous page"
            >
              ←
            </button>
            {Array.from({ length: data.pages }, (_, i) => (
              <button
                key={i}
                className={`btn ${f.page === i + 1 ? "btn-active" : ""}`}
                onClick={() => goPage(i + 1)}
                aria-current={f.page === i + 1 ? "page" : undefined}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn"
              disabled={f.page >= data.pages}
              onClick={() => goPage(f.page + 1)}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
export default function AllEquipment() {
  return (
    <Suspense>
      <List />
    </Suspense>
  );
}
