"use client"

import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

type Row = { day: string; fraud: number; legit: number; avgRisk: number }

export function RiskTrendChart({ data }: { data: Row[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">Transaction risk over time</h2>
        <p className="text-sm text-muted-foreground">Legitimate vs. fraudulent volume by day (last 14 days)</p>
      </div>
      <ChartContainer
        config={{
          legit: { label: "Legitimate", color: "hsl(199 89% 48%)" },
          fraud: { label: "Fraud", color: "hsl(347 77% 50%)" },
        }}
        className="aspect-[none] h-[280px] w-full"
      >
        <AreaChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
          <defs>
            <linearGradient id="fillLegit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-legit)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-legit)" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="fillFraud" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-fraud)" stopOpacity={0.35} />
              <stop offset="95%" stopColor="var(--color-fraud)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="legit"
            stroke="var(--color-legit)"
            fill="url(#fillLegit)"
            strokeWidth={2}
            stackId="a"
          />
          <Area
            type="monotone"
            dataKey="fraud"
            stroke="var(--color-fraud)"
            fill="url(#fillFraud)"
            strokeWidth={2}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}
