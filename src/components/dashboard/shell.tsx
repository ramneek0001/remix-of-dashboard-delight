import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  CircleHelp,
  Home,
  LifeBuoy,
  MessageSquare,
  Moon,
  PlayCircle,
  Search,
  Sparkles,
  Sun,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { balances, usd, user } from "@/lib/mock-data";

const menu = [
  { title: "Home", url: "/", icon: Home },
  { title: "Watch", url: "/watch", icon: PlayCircle },
  { title: "Referrals", url: "/referrals", icon: Users },
  { title: "Payouts", url: "/payouts", icon: Wallet },
] as const;

const manage = [
  { title: "Support", url: "/support", icon: LifeBuoy },
  { title: "Help", url: "/help", icon: CircleHelp },
  { title: "Account", url: "/account", icon: UserRound },
] as const;

function ThemeToggle() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);

  return (
    <div className="mt-4 flex items-center gap-1 rounded-full bg-surface p-1">
      {[
        { key: "light", label: "Light", icon: Sun },
        { key: "dark", label: "Dark", icon: Moon },
      ].map((opt) => {
        const active = (opt.key === "light") === light;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => setLight(opt.key === "light")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "gradient-violet text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <opt.icon className="h-4 w-4" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const item = (entry: { title: string; url: string; icon: typeof Home }) => {
    const active = pathname === entry.url;
    return (
      <Link
        key={entry.url}
        to={entry.url}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
          active
            ? "gradient-violet text-primary-foreground shadow-[var(--shadow-glow)]"
            : "text-muted-foreground hover:bg-surface hover:text-foreground",
        )}
      >
        <entry.icon className="h-[18px] w-[18px]" />
        {entry.title}
      </Link>
    );
  };

  return (
    <aside className="panel sticky top-6 hidden h-[calc(100vh-3rem)] w-[268px] shrink-0 flex-col p-5 lg:flex">
      <div className="flex items-center gap-3">
        <div className="gradient-violet flex h-10 w-10 items-center justify-center rounded-2xl">
          <PlayCircle className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-extrabold tracking-tight">FomoEarn</span>
      </div>

      <p className="mt-8 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">MENU</p>
      <nav className="mt-3 flex flex-col gap-1">{menu.map(item)}</nav>

      <ThemeToggle />

      <p className="mt-8 text-[11px] font-semibold tracking-[0.18em] text-muted-foreground">
        MANAGE
      </p>
      <nav className="mt-3 flex flex-col gap-1">{manage.map(item)}</nav>

      <div className="gradient-violet mt-auto rounded-3xl p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <p className="mt-4 text-base font-bold text-primary-foreground">Boost your earnings</p>
        <p className="mt-1 text-xs text-primary-foreground/75">
          Install the app and keep views running.
        </p>
        <Link
          to="/watch"
          className="mt-4 flex items-center justify-center rounded-full bg-background/85 px-4 py-2 text-sm font-semibold text-foreground"
        >
          Get the app
        </Link>
      </div>
    </aside>
  );
}

function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="panel mb-5 flex gap-1 overflow-x-auto p-2 lg:hidden">
      {[...menu, ...manage].map((entry) => (
        <Link
          key={entry.url}
          to={entry.url}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium",
            pathname === entry.url
              ? "gradient-violet text-primary-foreground"
              : "text-muted-foreground",
          )}
        >
          {entry.title}
        </Link>
      ))}
    </nav>
  );
}

export function DashboardShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-[520px] w-[720px] rounded-full opacity-45 blur-[140px]"
        style={{ backgroundImage: "var(--gradient-violet)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-52 -left-32 h-[420px] w-[520px] rounded-full bg-primary/25 blur-[150px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1600px] gap-6 px-4 py-6 md:px-6">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <header className="mb-6 flex flex-wrap items-center gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-extrabold tracking-tight md:text-[34px]">{title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
            </div>

            <label className="panel hidden h-12 items-center gap-3 rounded-full px-5 xl:flex xl:w-[340px]">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <span className="rounded-md bg-surface px-2 py-1 text-[11px] text-muted-foreground">
                ⌘F
              </span>
            </label>

            <div className="flex items-center gap-3">
              <button
                type="button"
                className="panel flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Messages"
              >
                <MessageSquare className="h-[18px] w-[18px]" />
              </button>
              <button
                type="button"
                className="panel relative flex h-12 w-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary-glow" />
              </button>
              <div className="flex items-center gap-3">
                <div className="gradient-violet flex h-12 w-12 items-center justify-center rounded-full text-base font-bold text-primary-foreground">
                  {user.initial}
                </div>
                <div className="hidden leading-tight md:block">
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.handle}</p>
                </div>
              </div>
            </div>
          </header>

          <MobileNav />
          <main className="pb-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

export function BalanceHero({ children }: { children?: ReactNode }) {
  return (
    <section className="gradient-violet glow-ring relative overflow-hidden rounded-3xl p-6 md:p-7">
      <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15">
            <Wallet className="h-4 w-4 text-primary-foreground" />
          </div>
          <p className="text-sm font-medium text-primary-foreground/80">Available balance</p>
        </div>
        <p className="num mt-5 text-5xl font-extrabold text-primary-foreground">
          {usd(balances.available, 3)}
        </p>
        <p className="mt-2 text-sm text-primary-foreground/75">{balances.coins} coins</p>
        {children}
      </div>
    </section>
  );
}
