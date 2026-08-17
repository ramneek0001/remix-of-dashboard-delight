import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, LogOut } from "lucide-react";
import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/shell";
import { Panel } from "@/components/dashboard/primitives";
import { cn } from "@/lib/utils";
import { balances, loginHistory, usd, user } from "@/lib/mock-data";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Account — FomoEarn dashboard" },
      { name: "description", content: "Your account details, security settings and balances." },
      { property: "og:title", content: "Account — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Your account details, security settings and balances.",
      },
    ],
  }),
  component: AccountPage,
});

const PER_PAGE = 6;

function AccountPage() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState(user.name);
  const [lockIp, setLockIp] = useState(false);
  const [page, setPage] = useState(0);

  const pages = Math.ceil(loginHistory.length / PER_PAGE);
  const rows = loginHistory.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <DashboardShell title="Account" subtitle="Your account details and balances.">
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="flex flex-col gap-5 xl:col-span-2">
          <Panel>
            <div className="flex items-center gap-4">
              <div className="gradient-violet flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-primary-foreground">
                {user.initial}
              </div>
              <div>
                <p className="text-lg font-bold">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-border">
              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-muted-foreground">Your referral code</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm">{user.referralCode}</span>
                  <button
                    type="button"
                    onClick={() => {
                      void navigator.clipboard?.writeText(user.referralCode);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                    className="flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-muted-foreground">User ID</span>
                <span className="num font-semibold">{user.userId}</span>
              </div>
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-muted-foreground">Member since</span>
                <span className="num font-semibold">{user.memberSince}</span>
              </div>
            </div>
          </Panel>

          <Panel>
            <h2 className="text-lg font-bold tracking-tight">Edit profile</h2>
            <label className="mt-4 block text-sm font-semibold" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 text-sm outline-none"
            />
            <button className="gradient-violet mt-4 rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              Save
            </button>
          </Panel>

          <Panel>
            <h2 className="text-lg font-bold tracking-tight">Change password</h2>
            <label className="mt-4 block text-sm font-semibold" htmlFor="current">
              Current password
            </label>
            <input
              id="current"
              type="password"
              className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 text-sm outline-none"
            />
            <label className="mt-4 block text-sm font-semibold" htmlFor="new">
              New password
            </label>
            <input
              id="new"
              type="password"
              className="mt-2 w-full rounded-2xl bg-surface px-4 py-3.5 text-sm outline-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">At least 8 characters.</p>
            <button className="gradient-violet mt-4 rounded-full px-6 py-2.5 text-sm font-semibold text-primary-foreground">
              Save
            </button>
          </Panel>

          <Panel className="p-0">
            <h2 className="p-6 pb-4 text-lg font-bold tracking-tight">Login history</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-y border-border text-left text-[11px] tracking-[0.14em] text-muted-foreground">
                    <th className="px-6 py-3 font-semibold">WHEN</th>
                    <th className="px-6 py-3 font-semibold">IP</th>
                    <th className="px-6 py-3 font-semibold">COUNTRY</th>
                    <th className="px-6 py-3 font-semibold">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.when} className="border-b border-border/60">
                      <td className="num whitespace-nowrap px-6 py-4">{row.when}</td>
                      <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{row.ip}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.country}</td>
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-semibold text-success">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between gap-4 p-6">
              <button
                type="button"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(p - 1, 0))}
                className={cn(
                  "rounded-full bg-surface px-5 py-2.5 text-sm font-semibold",
                  page === 0 && "cursor-not-allowed text-muted-foreground",
                )}
              >
                Previous
              </button>
              <span className="text-sm text-muted-foreground">
                Page {page + 1} of {pages}
              </span>
              <button
                type="button"
                disabled={page >= pages - 1}
                onClick={() => setPage((p) => Math.min(p + 1, pages - 1))}
                className={cn(
                  "rounded-full bg-surface px-5 py-2.5 text-sm font-semibold",
                  page >= pages - 1 && "cursor-not-allowed text-muted-foreground",
                )}
              >
                Next
              </button>
            </div>
          </Panel>
        </div>

        <div className="flex flex-col gap-5">
          <section className="gradient-violet glow-ring rounded-3xl p-6">
            <h2 className="text-lg font-bold text-primary-foreground">Available balance</h2>
            <div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/85">
              {[
                ["Available balance", usd(balances.available, 3)],
                ["Credited today", usd(balances.creditedToday)],
                ["Total credited", usd(balances.totalCredited, 3)],
                ["Referral credit", usd(balances.referralCredit)],
                ["Tasks completed", String(balances.tasksCompleted)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between">
                  <span>{label}</span>
                  <span className="num font-bold text-primary-foreground">{value}</span>
                </div>
              ))}
            </div>
          </section>

          <Panel>
            <h2 className="text-lg font-bold tracking-tight">Verify email</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We will send a 6-digit code to {user.email}.
            </p>
            <button className="mt-4 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold">
              Send code
            </button>
          </Panel>

          <Panel>
            <h2 className="text-lg font-bold tracking-tight">Security</h2>
            <button
              type="button"
              onClick={() => setLockIp((v) => !v)}
              className="mt-4 flex w-full items-start gap-3 text-left"
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border",
                  lockIp && "gradient-violet border-transparent",
                )}
              >
                {lockIp ? <Check className="h-3 w-3 text-primary-foreground" /> : null}
              </span>
              <span>
                <span className="block text-sm font-semibold">Lock sessions to this IP</span>
                <span className="block text-sm text-muted-foreground">
                  New logins from a different IP will be flagged.
                </span>
              </span>
            </button>
          </Panel>

          <button className="panel flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-destructive">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
