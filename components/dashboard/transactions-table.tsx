import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Transaction } from "@/app/actions/fraud"

function RiskPill({ score }: { score: number }) {
  const tone =
    score >= 80
      ? "bg-rose-100 text-rose-700"
      : score >= 60
        ? "bg-amber-100 text-amber-700"
        : "bg-emerald-100 text-emerald-700"
  return <span className={`inline-flex min-w-9 justify-center rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums ${tone}`}>{score}</span>
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    blocked: "border-rose-200 bg-rose-50 text-rose-700",
    review: "border-amber-200 bg-amber-50 text-amber-700",
    approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  }
  return (
    <Badge variant="outline" className={`capitalize ${map[status] ?? ""}`}>
      {status}
    </Badge>
  )
}

export function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">Recent transactions</h2>
        <p className="text-sm text-muted-foreground">Latest scored payments across all channels</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reference</TableHead>
              <TableHead>Merchant</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Risk</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-mono text-xs text-muted-foreground">{t.txnRef}</TableCell>
                <TableCell className="font-medium">
                  {t.merchant}
                  <span className="block text-xs text-muted-foreground">{t.category}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{t.channel}</TableCell>
                <TableCell className="text-muted-foreground">{t.country}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: t.currency }).format(Number(t.amount))}
                </TableCell>
                <TableCell className="text-center">
                  <RiskPill score={t.riskScore} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={t.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  )
}
