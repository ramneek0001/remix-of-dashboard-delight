import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CircleDollarSign,
  Download,
  Inbox,
  ListChecks,
  PlayCircle,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react";

import { BalanceHero, DashboardShell } from "@/components/dashboard/shell";
import { EmptyState, Panel, PanelHeader, StatCard } from "@/components/dashboard/primitives";
import { balances, usd, user } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — FomoEarn dashboard" },
      {
        name: "description",
        content: "Your balance, completed tasks, and payouts at a glance.",
      },
      { property: "og:title", content: "Home — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Your balance, completed tasks, and payouts at a glance.",
      },
    ],
  }),
  component: HomePage,
});

const quickActions = [
  { title: "Watch", body: "Open listed tasks", to: "/watch" as const, icon: PlayCircle },
  { title: "Request payout", body: usd(balances.available, 3), to: "/payouts" as const, icon: Wallet },
  { title: "Share link", body: user.referralCode, to: "/referrals" as const, icon: Users },
];

function HomePage() {
  return (
    <DashboardShell title="Home" subtitle="Your balance, completed tasks, and payouts at a glance.">
      <div className="grid gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Panel className="flex h-full flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-primary-glow">
                <Smartphone className="h-4 w-4" />
                OFFICIAL ANDROID APP
              </div>
              <h2 className="mt-3 text-2xl font-bold tracking-tight">
                Install FomoEarn on your phone
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Completed views run in the official app. Download the APK, install it, then scan the
                sign-in code to open this account on your phone.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                to="/watch"
                className="gradient-violet flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                <Download className="h-4 w-4" /> Download APK
              </Link>
              <Link
                to="/help"
                className="flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-semibold"
              >
                <ListChecks className="h-4 w-4" /> Install steps
              </Link>
            </div>
          </Panel>
        </div>

        <BalanceHero>
          <Link
            to="/payouts"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-background/85 px-4 py-2 text-sm font-semibold text-foreground"
          >
            Request payout <ArrowRight className="h-4 w-4" />
          </Link>
        </BalanceHero>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Credited today" value={usd(balances.creditedToday)} icon={CircleDollarSign} />
        <StatCard label="Available balance" value={usd(balances.available, 3)} icon={Wallet} />
        <StatCard label="Total credited" value={usd(balances.totalCredited, 3)} icon={Users} />
        <StatCard
          label="Tasks completed"
          value={String(balances.tasksCompleted)}
          icon={BadgeCheck}
        />
      </div>

      <div className="mt-5 grid gap-5 xl:grid-cols-3">
        <Panel className="xl:col-span-2">
          <PanelHeader
            title="Payout history"
            action={
              <Link
                to="/payouts"
                className="flex items-center gap-1 text-sm font-medium text-primary-glow"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <EmptyState
            icon={Inbox}
            title="No payouts yet"
            body="Your withdrawal requests will show up here."
          />
        </Panel>

        <div className="flex flex-col gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.to}
              className="panel flex items-center gap-4 p-5 transition-colors hover:bg-surface"
            >
              <div className="gradient-violet flex h-11 w-11 items-center justify-center rounded-2xl text-primary-foreground">
                <action.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{action.title}</p>
                <p className="truncate text-sm text-muted-foreground">{action.body}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
