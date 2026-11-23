"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import EquipmentCard from "@/components/EquipmentCard";
import { CardGridSkeleton } from "@/components/Skeleton";
import CountUp from "@/components/CountUp";

const faqs = [
  [
    "How do I rent equipment?",
    "Browse or search, pick your dates and quantity, then pay securely with Stripe. The owner is notified instantly and your booking appears in My Rentals.",
  ],
  [
    "Can I list my own equipment?",
    "Yes. Register, ask an admin for the Owner role, then add your equipment with photos and pricing. Listings go live after admin approval.",
  ],
  [
    "Is my payment secure?",
    "All payments are processed by Stripe Checkout. We never store your card details on our servers.",
  ],
  [
    "What if I need to cancel?",
    "Contact the owner or support before the rental start date. Eligible payments are refunded to the original payment method.",
  ],
  [
    "Are the owners verified?",
    "Every listing is reviewed and approved by our admin team before it becomes visible to customers.",
  ],
];
const cats = [
  ["Construction Equipment", "🏗️"],
  ["Photography Equipment", "📷"],
  ["Vehicles & Transportation", "🚚"],
  ["Agriculture Equipment", "🚜"],
  ["Electronics", "💻"],
  ["Event Equipment", "🎪"],
];

const tile = Array(6).fill({
  bg: "rgba(242,138,46,.14)",
  fg: "#C4691A",
  chip: "rgba(242,138,46,.14)",
});
const why = [
  ["💰", "Affordable Prices", "Transparent daily, weekly and monthly rates."],
  ["✅", "Verified Owners", "Every listing is approved by our admins."],
  ["📅", "Flexible Periods", "Rent for a day or a whole month."],
  ["🔒", "Secure Payments", "Pay safely with Stripe Checkout."],
];
const reviews = [
  [
    "Rahim Uddin",
    5,
    "Rented an excavator for a week. Smooth booking and fair price.",
  ],
  [
    "Nusrat Jahan",
    5,
    "Got a full camera kit for our shoot. Owner was very helpful.",
  ],
  [
    "Tanvir Hasan",
    4,
    "Easy to compare options and pay online. Will use again.",
  ],
  ["Sadia Islam", 5, "Event lighting arrived on time and in great condition."],
];
const steps = [
  ["1", "Browse", "Search and filter equipment near you."],
  ["2", "Book", "Pick dates and quantity in seconds."],
  ["3", "Pay", "Complete payment securely via Stripe."],
  ["4", "Use & Return", "Enjoy the equipment and return it on time."],
];
const stats = [
  ["500+", "Equipment listed"],
  ["120+", "Verified owners"],
  ["2,000+", "Happy renters"],
  ["4.8/5", "Average rating"],
];
const fade = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5 },
};

const H = ({ eyebrow, children, sub, light }) => (
  <div className="mx-auto mb-12 max-w-2xl text-center">
    <span className="eyebrow" style={light ? { color: "#F5A35C" } : undefined}>
      {eyebrow}
    </span>
    <h2 className="section-title mt-3">{children}</h2>
    {sub && <p className="section-sub mx-auto">{sub}</p>}
    <span className="palette-bar mx-auto mt-5 block w-28" />
  </div>
);
export default function Home() {
  const router = useRouter();
  const [items, setItems] = useState(null);
  const [q, setQ] = useState("");
  useEffect(() => {
    api("/equipment/featured")
      .then(setItems)
      .catch(() => setItems([]));
  }, []);
  const search = (e) => {
    e.preventDefault();
    const t = q.trim();
    router.push(
      t ? `/equipment?search=${encodeURIComponent(t)}` : "/equipment",
    );
  };
  return (
    <main>
      {/* Banner */}
      <section
        className="relative isolate grid min-h-[82vh] place-items-center overflow-hidden px-4 py-24 text-white"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.78) 0%, rgba(0,0,0,.62) 50%, rgba(0,0,0,.9) 100%), url('https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=1600') center/cover",
        }}
      >
        <div
          className="pointer-events-none absolute -right-24 top-10 -z-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: "rgba(242,138,46,.14)" }}
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 -z-10 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(245,163,92,.08)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container-x max-w-5xl text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#F5A35C]/50 bg-black/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#ffd3aa] backdrop-blur">
            <i className="h-2 w-2 animate-pulse rounded-full bg-primary" />
            Equipment Rental Platform
          </span>
          <h1 className="font-display text-5xl font-black leading-[1.05] sm:text-6xl lg:text-7xl">
            Rent the right <span className="gradient-text">equipment</span>, on
            demand
          </h1>
          <p className="mx-auto max-w-2xl py-7 text-lg leading-relaxed text-[#f1ebe4]/85">
            Connect with verified owners and rent construction, photography,
            vehicles and more with secure online payments.
          </p>
          <form
            onSubmit={search}
            role="search"
            className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1.5 pl-5 shadow-2xl backdrop-blur-md focus-within:border-[#F5A35C]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              className="shrink-0 opacity-70"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search excavator, camera, tractor…"
              aria-label="Search equipment"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-white outline-none placeholder:text-white/50"
            />
            <button className="btn btn-primary px-7">Search</button>
          </form>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="text-white/60">Popular:</span>
            {cats.slice(0, 4).map(([c, ic]) => (
              <Link
                key={c}
                href={`/equipment?category=${encodeURIComponent(c)}`}
                className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-white/85 backdrop-blur transition-colors hover:border-[#F5A35C] hover:bg-white/15"
              >
                {ic} {c.split(" ")[0]}
              </Link>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm font-semibold text-[#ffd3aa]/90">
            <li>✓ Verified owners</li>
            <li>✓ Secure Stripe payments</li>
            <li>✓ Flexible rental periods</li>
          </ul>
        </motion.div>
        <span
          className="palette-bar absolute inset-x-0 bottom-0 rounded-none"
          style={{ height: 10 }}
        />
      </section>

      {/* Featured Equipment */}
      <section className="section container-x">
        <H
          eyebrow="Top picks"
          sub="Hand-picked, admin-approved gear ready to rent today."
        >
          Featured Equipment
        </H>
        {!items ? (
          <CardGridSkeleton />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((e, i) => (
              <motion.div
                key={e._id}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="h-full"
              >
                <EquipmentCard e={e} />
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <Link href="/equipment" className="btn btn-outline px-8">
            View all equipment →
          </Link>
        </div>
      </section>

      <section className="py-16 sm:py-20" style={{ background: "var(--soft)" }}>
        <div className="container-x">
          <H
            eyebrow="Browse by type"
            sub="Find exactly what your project needs."
          >
            Popular Categories
          </H>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cats.map(([c, ic], i) => (
              <motion.div
                key={c}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="h-full"
              >
                <Link
                  href={`/equipment?category=${encodeURIComponent(c)}`}
                  className="surface group relative flex h-full min-h-[9rem] items-center gap-5 overflow-hidden p-6 transition-colors hover:border-primary/60"
                >
                  <span className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 transition-transform duration-500 group-hover:scale-150" />
                  <span className="relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-primary/15 text-3xl">
                    {ic}
                  </span>
                  <span className="relative">
                    <span className="block font-display text-xl font-extrabold leading-snug">
                      {c}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold brand-ink">
                      Explore{" "}
                      <i className="transition-transform group-hover:translate-x-1">
                        →
                      </i>
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section container-x">
        <H
          eyebrow="Why RentGear"
          sub="Everything you need for a stress-free rental experience."
        >
          Why Choose Us
        </H>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {why.map(([ic, t, d], i) => (
            <motion.div
              key={t}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="surface lift h-full p-7 text-center"
            >
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-primary/15 text-3xl">
                {ic}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how"
        className="py-16 sm:py-20"
        style={{ background: "var(--soft)" }}
      >
        <div className="container-x">
          <H
            eyebrow="Simple process"
            sub="From search to return in four easy steps."
          >
            How It Works
          </H>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <span
              className="absolute left-[12%] right-[12%] top-9 hidden h-0.5 lg:block"
              style={{
                background:
                  "repeating-linear-gradient(90deg,#F28A2E 0 10px,transparent 10px 20px)",
              }}
            />
            {steps.map(([n, t, d]) => (
              <motion.div
                key={n}
                {...fade}
                className="surface relative h-full p-7 text-center"
              >
                <div
                  className="relative mx-auto grid h-[4.5rem] w-[4.5rem] place-items-center rounded-full font-display text-3xl font-black text-[#1A0C00] shadow-xl"
                  style={{
                    background: "linear-gradient(135deg,#F28A2E,#F5A35C)",
                    boxShadow: "0 0 0 8px rgba(242,138,46,.15)",
                  }}
                >
                  {n}
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-70">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted stats */}
      <section
        className="relative overflow-hidden py-16 text-white sm:py-20"
        style={{
          background:
            "radial-gradient(600px 300px at 90% 0%, rgba(242,138,46,.14), transparent 60%), #0a0a0a",
        }}
      >
        <div className="container-x">
          <H eyebrow="Our community" light>
            Trusted by Owners and Renters
          </H>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map(([v, l], i) => (
              <motion.div
                key={l}
                {...fade}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-[#F5A35C]/30 bg-white/5 p-7 text-center backdrop-blur"
              >
                <div
                  className="font-display text-4xl font-black sm:text-5xl"
                  style={{
                    color: "#F5A35C",
                  }}
                >
                  <CountUp value={v} />
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-[#f1ebe4]/70">
                  {l}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section container-x">
        <H
          eyebrow="Testimonials"
          sub="Real feedback from people who rented through RentGear."
        >
          Customer Reviews
        </H>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map(([n, r, c], i) => (
            <motion.div
              key={n}
              {...fade}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="surface lift relative flex h-full flex-col p-7"
            >
              <span className="absolute right-5 top-2 font-display text-7xl font-black leading-none text-primary/20">
                “
              </span>
              <div className="text-lg tracking-widest text-primary">
                {"★".repeat(r)}
                <span className="opacity-30">{"★".repeat(5 - r)}</span>
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed opacity-80">
                "{c}"
              </p>
              <div
                className="mt-5 flex items-center gap-3 border-t pt-4"
                style={{ borderColor: "var(--line)" }}
              >
                <span
                  className="grid h-11 w-11 place-items-center rounded-full font-display text-lg font-extrabold"
                  style={{ background: tile[i].bg, color: tile[i].fg }}
                >
                  {n[0]}
                </span>
                <p className="font-display font-bold">{n}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20" style={{ background: "var(--soft)" }}>
        <div className="container-x max-w-3xl">
          <H eyebrow="FAQ" sub="Quick answers to common questions.">
            Frequently Asked Questions
          </H>
          <div className="space-y-3">
            {faqs.map(([qn, a]) => (
              <details key={qn} className="faq surface group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-lg font-bold">
                  {qn}
                  <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-xl brand-ink transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed opacity-75">
                  {a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Owner CTA */}
      <section className="section container-x">
        <div
          className="relative overflow-hidden rounded-[2rem] p-10 text-center text-white sm:p-14"
          style={{
            background:
              "radial-gradient(500px 280px at 100% 0%, rgba(242,138,46,.45), transparent 60%), linear-gradient(135deg,#000 0%,#522600 100%)",
          }}
        >
          <h2 className="font-display text-3xl font-black sm:text-4xl">
            Own equipment sitting idle?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[#ffe7cf]/80">
            List it on RentGear and start earning. Reach thousands of renters
            with secure payments and simple booking management.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/register" className="btn btn-primary btn-lg px-8">
              Become an owner
            </Link>
            <Link href="/equipment" className="btn btn-glass btn-lg px-8">
              Browse equipment
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
