import { createFileRoute } from "@tanstack/react-router";
import { Check, Inbox } from "lucide-react";
import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyState, Panel } from "@/components/dashboard/primitives";
import { cn } from "@/lib/utils";
import { balances, payoutMethods, payoutRules, usd } from "@/lib/mock-data";

export const Route = createFileRoute("/payouts")({
  head: () => ({
    meta: [
      { title: "Payouts — FomoEarn dashboard" },
      { name: "description", content: "Withdraw your balance to any supported wallet." },
      { property: "og:title", content: "Payouts — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Withdraw your balance to any supported wallet.",
      },
    ],
  }),
  component: PayoutsPage,
});

const MIN = 0.01;
const FEE_RATE = 0.04;

function PayoutsPage() {
  const [tab, setTab] = useState<"request" | "history">("request");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(payoutMethods[0]!.value);
  const [address, setAddress] = useState("");

  const parsed = Number(amount) || 0;
  const fee = parsed * FEE_RATE;
  const receive = Math.max(parsed - fee, 0);
  const valid = parsed >= MIN && parsed <= balances.available && address.trim().length > 10;

  return (
    <DashboardShell title="Payouts" subtitle="Withdraw your balance to any supported wallet.">
      <div className="mb-5 inline-flex gap-1 rounded-full bg-surface p-1">
        {(
          [
            ["request", "Request payout"],
            ["history", "Payout history"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              tab === key
                ? "gradient-violet text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "history" ? (
        <Panel>
          <EmptyState
            icon={Inbox}
            title="No payouts yet"
            body="Your withdrawal requests will show up here."
          />
        </Panel>
      ) : (
        <div className="grid gap-5 xl:grid-cols-3">
          <Panel className="xl:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="gradient-violet glow-ring rounded-3xl p-5">
                <p className="text-sm text-primary-foreground/80">Available balance</p>
                <p className="num mt-3 text-3xl font-extrabold text-primary-foreground">
                  {usd(balances.available, 3)}
                </p>
              </div>
              <div className="rounded-3xl bg-surface p-5">
                <p className="text-sm text-muted-foreground">Minimum payout</p>
                <p className="num mt-3 text-3xl font-extrabold">{usd(MIN)}</p>
                <p className="mt-1 text-xs text-muted-foreground">Minimum on every method.</p>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold" htmlFor="method">
                Withdrawal methods
              </label>
              <select
                id="method"
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 text-sm outline-none"
              >
                {payoutMethods.map((m) => (
                  <option key={m.value} value={m.value} className="bg-popover">
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold" htmlFor="amount">
                  Amount (USD)
                </label>
                <button
                  type="button"
                  onClick={() => setAmount(String(balances.available))}
                  className="text-sm font-medium text-primary-glow"
                >
                  Use max
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-2xl bg-surface px-4">
                <span className="text-muted-foreground">$</span>
                <input
                  id="amount"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="num w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <div className="mt-5">
              <label className="text-sm font-semibold" htmlFor="address">
                Wallet address
              </label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="0x…"
                className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 font-mono text-sm outline-none placeholder:text-muted-foreground"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                BNB Smart Chain (BEP-20) address, starts with 0x and is 42 characters.
              </p>
              <p className="text-xs text-muted-foreground">
                This address is saved when you submit and prefills next time.
              </p>
            </div>

            <div className="mt-6 rounded-2xl bg-surface/60 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="num font-semibold">{usd(parsed)}</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fee (4% + $0.00)</span>
                <span className="num font-semibold text-destructive">−{usd(fee)}</span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-semibold">You receive</span>
                <span className="num text-lg font-extrabold text-success">{usd(receive)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={!valid}
              className={cn(
                "mt-5 w-full rounded-full px-6 py-3.5 text-sm font-semibold transition-opacity",
                valid
                  ? "gradient-violet text-primary-foreground"
                  : "cursor-not-allowed bg-surface text-muted-foreground",
              )}
            >
              Submit request
            </button>
          </Panel>

          <Panel className="h-fit">
            <h2 className="text-lg font-bold tracking-tight">Before you request</h2>
            <ul className="mt-5 flex flex-col gap-4">
              {payoutRules.map((rule) => (
                <li key={rule} className="flex gap-3 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {rule}
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      )}
    </DashboardShell>
  );
}
