"use client"

import { Card } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart } from "recharts"

type Row = { channel: string; count: number; fraud: number }

const COLORS = [
  "hsl(199 89% 48%)",
  "hsl(262 83% 58%)",
  "hsl(347 77% 50%)",
  "hsl(37 92% 50%)",
  "hsl(160 84% 39%)",
]

export function ChannelChart({ data }: { data: Row[] }) {
  const chartData = data.map((d, i) => ({ ...d, fill: COLORS[i % COLORS.length] }))

  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">Volume by channel</h2>
        <p className="text-sm text-muted-foreground">Where transactions originate</p>
      </div>
      <ChartContainer config={{ count: { label: "Transactions" } }} className="mx-auto aspect-square h-[240px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="channel" />} />
          <Pie data={chartData} dataKey="count" nameKey="channel" innerRadius={55} strokeWidth={2}>
            {chartData.map((entry) => (
              <Cell key={entry.channel} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
        {chartData.map((d) => (
          <div key={d.channel} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: d.fill }} />
            {d.channel}
          </div>
        ))}
      </div>
    </Card>
  )
}
