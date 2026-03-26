"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  dashboardKpis,
  growthChartData,
  projectImpactBars,
  tickerItems,
} from "@/lib/portfolio-data";

const chartTheme = {
  grid: "rgba(137, 162, 255, 0.12)",
  label: "rgba(150, 167, 209, 0.82)",
};

export function FinanceDashboard() {
  return (
    <div className="glass-panel overflow-hidden rounded-[36px] p-6 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan/78">
            Finance Dashboard
          </p>
          <h3 className="mt-3 text-2xl text-foreground">
            Hedge-fund inspired signal board
          </h3>
        </div>
        <p className="max-w-xl text-sm text-muted/72">
          A minimal command center for recruiter review with KPI cards, trend
          lines, comparative impact bars, and a market-style ticker.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {dashboardKpis.map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-[28px] border border-white/8 bg-white/[0.03] p-5"
          >
            <p className="text-xs uppercase tracking-[0.26em] text-muted/72">
              {kpi.label}
            </p>
            <p className="mt-3 text-3xl text-foreground">{kpi.value}</p>
            <p className="mt-3 text-sm text-muted/74">{kpi.insight}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-[32px] border border-white/8 bg-black/10 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-cyan/78">
                Performance Curve
              </p>
              <h4 className="mt-2 text-xl text-foreground">
                Revenue, conversion, and efficiency
              </h4>
            </div>
            <p className="text-xs uppercase tracking-[0.22em] text-muted/65">
              Simulated live feed
            </p>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={growthChartData}>
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fill: chartTheme.label, fontSize: 12 }} />
                <YAxis tick={{ fill: chartTheme.label, fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(8, 10, 24, 0.92)",
                    border: "1px solid rgba(137, 162, 255, 0.18)",
                    borderRadius: "16px",
                    color: "#F4F7FF",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#7AA7FF"
                  strokeWidth={2.75}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="conversion"
                  stroke="#B67DFF"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#54D7FF"
                  strokeWidth={2.5}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/8 bg-black/10 p-5 sm:p-6">
          <div className="mb-5">
            <p className="text-sm uppercase tracking-[0.26em] text-cyan/78">
              Impact Split
            </p>
            <h4 className="mt-2 text-xl text-foreground">
              Skills and project influence
            </h4>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectImpactBars} layout="vertical">
                <CartesianGrid stroke={chartTheme.grid} strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fill: chartTheme.label, fontSize: 12 }} />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: chartTheme.label, fontSize: 12 }}
                  width={76}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(8, 10, 24, 0.92)",
                    border: "1px solid rgba(137, 162, 255, 0.18)",
                    borderRadius: "16px",
                    color: "#F4F7FF",
                  }}
                />
                <Bar
                  dataKey="impact"
                  radius={[999, 999, 999, 999]}
                  fill="url(#barGradient)"
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#54D7FF" />
                    <stop offset="100%" stopColor="#B67DFF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mask-fade-x mt-8 overflow-hidden rounded-full border border-white/8 bg-black/15 py-3">
        <div className="flex min-w-max animate-ticker gap-8 px-6">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-3 whitespace-nowrap text-xs uppercase tracking-[0.32em] text-muted/76"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
