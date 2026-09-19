"use client"

import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

type Row = { category: string; count: number; fraud: number }

export function CategoryChart({ data }: { data: Row[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">Fraud by category</h2>
        <p className="text-sm text-muted-foreground">Flagged transactions grouped by spend category</p>
      </div>
      <ChartContainer
        config={{
          fraud: { label: "Fraud", color: "hsl(347 77% 50%)" },
          count: { label: "Total", color: "hsl(215 16% 80%)" },
        }}
        className="aspect-[none] h-[280px] w-full"
      >
        <BarChart data={data} margin={{ left: 4, right: 12, top: 8 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} fontSize={11} />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} width={28} fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="fraud" fill="var(--color-fraud)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </Card>
  )
}
