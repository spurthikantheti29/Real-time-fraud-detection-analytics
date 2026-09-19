"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ingestTransaction, type Transaction } from "@/app/actions/fraud"
import { Pause, Play, Radio } from "lucide-react"

function timeAgo(date: Date) {
  const s = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 1000))
  if (s < 5) return "just now"
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m ago`
  return `${Math.floor(m / 60)}h ago`
}

export function LiveFeed({ initial }: { initial: Transaction[] }) {
  const router = useRouter()
  const [live, setLive] = useState(true)
  const [feed, setFeed] = useState<Transaction[]>(initial)
  const [isPending, startTransition] = useTransition()
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setFeed(initial)
  }, [initial])

  useEffect(() => {
    if (!live) {
      if (timer.current) clearInterval(timer.current)
      return
    }
    timer.current = setInterval(async () => {
      const row = await ingestTransaction()
      setFeed((prev) => [row, ...prev].slice(0, 12))
      startTransition(() => router.refresh())
    }, 4000)
    return () => {
      if (timer.current) clearInterval(timer.current)
    }
  }, [live, router])

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            {live && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${live ? "bg-emerald-500" : "bg-muted-foreground"}`}
            />
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight">Live transaction stream</h2>
            <p className="text-xs text-muted-foreground">
              {live ? "Scoring incoming payments in real time" : "Stream paused"}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => setLive((v) => !v)}>
          {live ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {live ? "Pause" : "Resume"}
        </Button>
      </div>

      <ul className="flex flex-col gap-2 overflow-y-auto">
        {feed.map((t) => {
          const flagged = t.riskScore >= 60
          return (
            <li
              key={t.id}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                flagged ? "border-rose-200 bg-rose-50/60" : "border-border bg-muted/30"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {t.merchant} <span className="text-muted-foreground">· {t.country}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Intl.NumberFormat("en-US", { style: "currency", currency: t.currency }).format(
                    Number(t.amount),
                  )}{" "}
                  · {timeAgo(t.createdAt as unknown as Date)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Radio className={`h-3.5 w-3.5 ${flagged ? "text-rose-500" : "text-muted-foreground"}`} />
                <span
                  className={`inline-flex min-w-9 justify-center rounded-md px-1.5 py-0.5 text-xs font-semibold tabular-nums ${
                    t.riskScore >= 80
                      ? "bg-rose-100 text-rose-700"
                      : t.riskScore >= 60
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {t.riskScore}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
