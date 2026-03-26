"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  experienceItems,
  growthChartData,
  impactMetrics,
  skillMetrics,
} from "@/lib/portfolio-data";

const toneMap = {
  blue: "from-accent to-cyan",
  cyan: "from-cyan to-white",
  violet: "from-violet to-accent",
};

const chartTheme = {
  grid: "rgba(137, 162, 255, 0.12)",
  label: "rgba(150, 167, 209, 0.82)",
};

export function ResumeDashboard() {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
      <div className="glass-panel rounded-[34px] p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan/78">
              Resume Dashboard
            </p>
            <h3 className="mt-3 text-2xl text-foreground">
              Experience timeline and skill profile
            </h3>
          </div>
          <p className="text-sm text-muted/70">Animated vertical timeline</p>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.9fr]">
          <div className="relative space-y-6 pl-6">
            <div className="absolute left-2 top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-cyan/60 via-violet/30 to-transparent" />
            {experienceItems.map((item, index) => (
              <motion.div
                key={`${item.company}-${item.role}`}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.07 }}
                className="relative"
              >
                <span className="absolute -left-[1.18rem] top-2 h-3 w-3 rounded-full border border-cyan/50 bg-cyan shadow-[0_0_16px_rgba(84,215,255,0.42)]" />
                <p className="text-xs uppercase tracking-[0.24em] text-muted/65">
                  {item.timeframe}
                </p>
                <p className="mt-1 text-base text-foreground">{item.role}</p>
                <p className="text-sm text-muted/72">{item.company}</p>
              </motion.div>
            ))}
          </div>

          <div className="space-y-5">
            {skillMetrics.map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{skill.label}</span>
                  <span className="text-muted/70">{skill.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-white/6">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${toneMap[skill.tone]}`}
                    style={{ width: `${skill.value}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              className="glass-panel rounded-[28px] p-5"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-cyan/78">
                {metric.label}
              </p>
              <p className="mt-3 text-3xl text-foreground">{metric.value}</p>
              <p className="mt-3 text-sm text-muted/74">{metric.footnote}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass-panel rounded-[34px] p-6 sm:p-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan/78">
                KPI Tracking
              </p>
              <h3 className="mt-3 text-2xl text-foreground">
                Growth curve and execution trend
              </h3>
            </div>
            <p className="text-sm text-muted/70">Simulated operating data</p>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthChartData}>
                <defs>
                  <linearGradient id="resumeArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(84,215,255,0.7)" />
                    <stop offset="100%" stopColor="rgba(84,215,255,0)" />
                  </linearGradient>
                </defs>
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
                <Area
                  type="monotone"
                  dataKey="efficiency"
                  stroke="#54D7FF"
                  strokeWidth={2.5}
                  fill="url(#resumeArea)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
