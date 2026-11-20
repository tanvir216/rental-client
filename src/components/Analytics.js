"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useFetch from "@/lib/useFetch";
import { Spin } from "./Table";

const tiles = [
  { bar: "#F28A2E", chip: "rgba(242,138,46,.16)" },
  { bar: "#C4691A", chip: "rgba(242,138,46,.16)" },
  { bar: "#F5A35C", chip: "rgba(245,163,92,.22)" },
  { bar: "#1a1a1a", chip: "rgba(0,0,0,.14)" },
  { bar: "#FFD3AA", chip: "rgba(255,211,170,.35)" },
  { bar: "#000000", chip: "rgba(0,0,0,.1)" },
];
const shades = ["#F28A2E", "#F5A35C", "#C4691A"];
export default function Analytics({ url, stats, chartKey, dataKey, title }) {
  const [d] = useFetch(url);
  if (!d) return <Spin />;
  const data = d[chartKey] || [];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map(([label, key, pre = ""], i) => {
          const t = tiles[i % tiles.length];
          return (
            <div
              key={key}
              className="surface lift relative overflow-hidden p-6"
            >
              <span
                className="absolute inset-x-0 top-0 h-1.5"
                style={{ background: t.bar }}
              />
              <span
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full"
                style={{ background: t.chip }}
              />
              <p className="relative text-xs font-bold uppercase tracking-[0.14em] opacity-60">
                {label}
              </p>
              <p className="relative mt-2 font-display text-4xl font-black brand-ink">
                {pre}
                {d[key] ?? 0}
              </p>
            </div>
          );
        })}
      </div>
      <div className="surface p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <span className="palette-bar w-24" />
        </div>
        <div className="h-72 text-base-content">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -10, right: 8 }}>
              <defs>
                <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F28A2E" />
                  <stop offset="100%" stopColor="#C4691A" />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 6"
                vertical={false}
                stroke="currentColor"
                strokeOpacity={0.15}
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "currentColor", opacity: 0.7, fontSize: 12 }}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "currentColor", opacity: 0.7, fontSize: 12 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(242,138,46,.1)" }}
                contentStyle={{
                  background: "#0e0e0e",
                  border: "1px solid #F28A2E",
                  borderRadius: 12,
                  color: "#f1ebe4",
                }}
                labelStyle={{ color: "#F5A35C", fontWeight: 700 }}
                itemStyle={{ color: "#f1ebe4" }}
              />
              <Bar
                dataKey={dataKey}
                fill="url(#barG)"
                radius={[10, 10, 0, 0]}
                maxBarSize={48}
              >
                {data.map((_, i) => (
                  <Cell
                    key={i}
                    fill={i % 3 === 0 ? "url(#barG)" : shades[i % 3]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
