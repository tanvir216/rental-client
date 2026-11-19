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
  { bar: "#FF7F00", chip: "rgba(255,127,0,.16)" },
  { bar: "#B05400", chip: "rgba(176,84,0,.16)" },
  { bar: "#FFA95B", chip: "rgba(255,169,91,.22)" },
  { bar: "#522600", chip: "rgba(82,38,0,.14)" },
  { bar: "#FFD3AA", chip: "rgba(255,211,170,.35)" },
  { bar: "#000000", chip: "rgba(0,0,0,.1)" },
];
const shades = ["#FF7F00", "#FFA95B", "#B05400"];
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
                  <stop offset="0%" stopColor="#FF7F00" />
                  <stop offset="100%" stopColor="#B05400" />
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
                cursor={{ fill: "rgba(255,127,0,.1)" }}
                contentStyle={{
                  background: "#140A03",
                  border: "1px solid #FF7F00",
                  borderRadius: 12,
                  color: "#FFE7CF",
                }}
                labelStyle={{ color: "#FFA95B", fontWeight: 700 }}
                itemStyle={{ color: "#FFE7CF" }}
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
