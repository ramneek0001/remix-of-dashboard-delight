import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Download, Gauge, ListChecks, Timer } from "lucide-react";
import { useEffect, useState } from "react";

import apkPhone from "@/assets/apk-phone.jpg";
import { DashboardShell } from "@/components/dashboard/shell";
import { Panel, StatCard } from "@/components/dashboard/primitives";
import { installSteps, manufacturerPaths, watchLimits } from "@/lib/mock-data";

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch — FomoEarn dashboard" },
      {
        name: "description",
        content: "Install the official FomoEarn Android app and sign in with a QR code to run views.",
      },
      { property: "og:title", content: "Watch — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Install the official FomoEarn Android app and sign in with a QR code to run views.",
      },
    ],
  }),
  component: WatchPage,
});

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const id = setInterval(() => setLeft((v) => (v > 0 ? v - 1 : seconds)), 1000);
    return () => clearInterval(id);
  }, [seconds]);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function WatchPage() {
  const expires = useCountdown(103);

  return (
    <DashboardShell
      title="Watch"
      subtitle="Watch a short video the whole way through to get credited."
    >
      <div className="grid gap-5 xl:grid-cols-2">
        <Panel className="p-0">
          <img
            src={apkPhone}
            alt="FomoEarn Android app APK download"
            width={1024}
            height={1024}
            className="h-64 w-full rounded-t-[var(--radius-2xl)] object-cover"
          />
          <div className="p-6">
            <p className="text-xs font-semibold tracking-[0.16em] text-primary-glow">
              OFFICIAL ANDROID APP
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">
              Install FomoEarn on your phone
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Completed views run in the official app. Download the APK, install it, then scan the
              sign-in code to open this account on your phone.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button className="gradient-violet flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground">
                <Download className="h-4 w-4" /> Download APK
              </button>
              <a
                href="#install-guide"
                className="flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-semibold"
              >
                <ListChecks className="h-4 w-4" /> Install steps
              </a>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              FomoEarn-v2 · APK · ~50 MB · Android only
            </p>
          </div>
        </Panel>

        <Panel className="flex flex-col">
          <h2 className="text-lg font-bold tracking-tight">Then sign in with this code</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            After the app is installed, scan this code on your phone. It signs the same account in.
            The code expires and can be refreshed.
          </p>
          <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10">
            <div className="rounded-3xl bg-foreground p-5">
              <QrPlaceholder />
            </div>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> Expires in
              <span className="num font-semibold text-primary-glow">{expires}</span>
            </p>
          </div>
        </Panel>
      </div>

      <Panel className="mt-5" >
        <div id="install-guide">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary-glow">OUR APP</p>
          <h2 className="mt-2 text-xl font-bold tracking-tight">Install FomoEarn</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Own app for automatic video viewing. Does not require installing additional programs.
            Two permissions are required after you install the APK.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-surface p-5">
            <p className="font-semibold">Accessibility Service</p>
            <p className="mt-1 text-sm text-muted-foreground">Allows controlling other applications.</p>
          </div>
          <div className="rounded-2xl bg-surface p-5">
            <p className="font-semibold">Display over other apps</p>
            <p className="mt-1 text-sm text-muted-foreground">Allows showing interface elements.</p>
          </div>
        </div>

        <ol className="mt-6 flex flex-col gap-4">
          {installSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-2xl bg-surface/60 p-5">
              <span className="gradient-violet flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold">{step.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <p className="text-base font-bold">Paths for different manufacturers</p>
          <div className="mt-3 divide-y divide-border overflow-hidden rounded-2xl bg-surface/60">
            {manufacturerPaths.map((row) => (
              <div key={row.brand} className="flex flex-wrap gap-2 px-5 py-3 text-sm">
                <span className="w-28 font-semibold">{row.brand}</span>
                <span className="text-muted-foreground">{row.path}</span>
              </div>
            ))}
          </div>
          <Link to="/help" className="mt-4 inline-block text-sm font-semibold text-primary-glow">
            Full install page →
          </Link>
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <StatCard label="Daily limit" value={String(watchLimits.daily)} icon={Gauge} />
        <StatCard label="Hourly limit" value={String(watchLimits.hourly)} icon={Timer} />
        <StatCard label="Watch time" value={watchLimits.watchTime} icon={Clock} />
      </div>
    </DashboardShell>
  );
}

function QrPlaceholder() {
  const cells = Array.from({ length: 441 }, (_, i) => {
    const r = Math.floor(i / 21);
    const c = i % 21;
    const corner =
      (r < 7 && c < 7) || (r < 7 && c > 13) || (r > 13 && c < 7) ? (r + c) % 3 !== 1 : null;
    const on = corner === null ? (r * 7 + c * 13 + ((r * c) % 5)) % 3 === 0 : corner;
    return on;
  });
  return (
    <div className="grid h-40 w-40 grid-cols-21 gap-0" style={{ gridTemplateColumns: "repeat(21, 1fr)" }}>
      {cells.map((on, i) => (
        <span key={i} className={on ? "bg-background" : "bg-foreground"} />
      ))}
    </div>
  );
}
