import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Users } from "lucide-react";
import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyState, Panel, Pill } from "@/components/dashboard/primitives";
import { cn } from "@/lib/utils";
import { balances, referralLevels, usd, user } from "@/lib/mock-data";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      { title: "Referrals — FomoEarn dashboard" },
      {
        name: "description",
        content: "Invite users and receive a share of their completed-view credit.",
      },
      { property: "og:title", content: "Referrals — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Invite users and receive a share of their completed-view credit.",
      },
    ],
  }),
  component: ReferralsPage,
});

function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard?.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-2 rounded-full bg-surface px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-surface-2"
    >
      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : label}
    </button>
  );
}

function ReferralsPage() {
  const [level, setLevel] = useState("Level 1");

  return (
    <DashboardShell
      title="Referrals"
      subtitle="Invite users and receive a share of their completed-view credit."
    >
      <Panel>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Your referral code</p>
            <div className="mt-3 flex items-center gap-3">
              <span className="rounded-2xl bg-surface px-5 py-3 font-mono text-base">
                {user.referralCode}
              </span>
              <CopyButton value={user.referralCode} />
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Share link</p>
            <div className="mt-3 flex items-center gap-3">
              <input
                readOnly
                value={user.shareLink}
                className="min-w-0 flex-1 rounded-2xl bg-surface px-5 py-3 font-mono text-sm text-muted-foreground outline-none"
              />
              <CopyButton value={user.shareLink} />
            </div>
          </div>
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {referralLevels.map((lvl) => (
          <div key={lvl.level} className="panel p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{lvl.level}</p>
              <Pill>{lvl.share}</Pill>
            </div>
            <p className="num mt-4 text-3xl font-extrabold">{lvl.count}</p>
          </div>
        ))}
        <div className="gradient-violet glow-ring rounded-3xl p-5">
          <p className="text-sm text-primary-foreground/80">Referral credit</p>
          <p className="num mt-4 text-3xl font-extrabold text-primary-foreground">
            {usd(balances.referralCredit)}
          </p>
        </div>
      </div>

      <Panel className="mt-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold tracking-tight">Recent referrals</h2>
          <div className="flex gap-1 rounded-full bg-surface p-1">
            {referralLevels.map((lvl) => (
              <button
                key={lvl.level}
                type="button"
                onClick={() => setLevel(lvl.level)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  level === lvl.level
                    ? "gradient-violet text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {lvl.level}
              </button>
            ))}
          </div>
        </div>
        <EmptyState
          icon={Users}
          title="You don't have any referrals yet"
          body="Share your link. Anyone who signs up through it appears here."
        />
      </Panel>
    </DashboardShell>
  );
}
