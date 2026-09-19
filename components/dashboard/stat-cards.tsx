import { Card } from "@/components/ui/card"
import { Activity, AlertTriangle, ShieldX, Gauge } from "lucide-react"

type Stats = {
  total: number
  fraud: number
  blocked: number
  review: number
  volume: number
  fraudVolume: number
  avgRisk: number
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function StatCards({ stats }: { stats: Stats }) {
  const fraudRate = stats.total ? ((stats.fraud / stats.total) * 100).toFixed(1) : "0.0"

  const items = [
    {
      label: "Transactions analyzed",
      value: stats.total.toLocaleString(),
      hint: `${formatCurrency(stats.volume)} total volume`,
      icon: Activity,
      tone: "text-sky-600 bg-sky-50",
    },
    {
      label: "Fraud detected",
      value: stats.fraud.toLocaleString(),
      hint: `${fraudRate}% of all transactions`,
      icon: AlertTriangle,
      tone: "text-amber-600 bg-amber-50",
    },
    {
      label: "Blocked payments",
      value: stats.blocked.toLocaleString(),
      hint: `${formatCurrency(stats.fraudVolume)} at risk`,
      icon: ShieldX,
      tone: "text-rose-600 bg-rose-50",
    },
    {
      label: "Avg risk score",
      value: Math.round(stats.avgRisk).toString(),
      hint: `${stats.review} flagged for review`,
      icon: Gauge,
      tone: "text-violet-600 bg-violet-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <Card key={item.label} className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight tabular-nums">{item.value}</p>
            </div>
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.tone}`}>
              <item.icon className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">{item.hint}</p>
        </Card>
      ))}
    </div>
  )
}
