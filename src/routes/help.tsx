import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, CircleHelp, Download, ListChecks, Mail, Send, ShieldCheck, Smartphone } from "lucide-react";
import { useState } from "react";

import { DashboardShell } from "@/components/dashboard/shell";
import { Panel } from "@/components/dashboard/primitives";
import { cn } from "@/lib/utils";
import { faqs, helpSteps } from "@/lib/mock-data";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help — FomoEarn dashboard" },
      {
        name: "description",
        content: "Official Android app status, account rules, FAQ and support contacts.",
      },
      { property: "og:title", content: "Help — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Official Android app status, account rules, FAQ and support contacts.",
      },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <DashboardShell
      title="Help"
      subtitle="Official Android app status, account rules, and support."
    >
      <Panel>
        <div className="flex items-center gap-4">
          <div className="gradient-violet flex h-12 w-12 items-center justify-center rounded-2xl text-primary-foreground">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Official Android app</h2>
            <p className="text-sm text-muted-foreground">Official app available</p>
          </div>
        </div>

        <ol className="mt-6 flex flex-col gap-3">
          {helpSteps.map((step, i) => (
            <li key={step} className="flex items-center gap-4 rounded-2xl bg-surface/60 px-5 py-3.5">
              <span className="gradient-violet flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>

        <p className="mt-5 text-sm text-muted-foreground">
          Download the official APK on the Watch page. Do not use third-party automation apps.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/watch"
            className="gradient-violet flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            <Download className="h-4 w-4" /> Download app
          </Link>
          <Link
            to="/watch"
            className="flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-semibold"
          >
            <ListChecks className="h-4 w-4" /> Install instructions
          </Link>
          <Link
            to="/support"
            className="flex items-center gap-2 rounded-full bg-surface px-5 py-3 text-sm font-semibold"
          >
            <Send className="h-4 w-4" /> Ask support
          </Link>
        </div>
      </Panel>

      <Panel className="mt-5">
        <div className="flex items-center gap-3">
          <CircleHelp className="h-5 w-5 text-primary-glow" />
          <h2 className="text-lg font-bold tracking-tight">Frequently asked questions</h2>
        </div>
        <div className="mt-5 divide-y divide-border">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="py-4">
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 text-left text-sm font-semibold"
              >
                {faq.q}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                    open === i && "rotate-180",
                  )}
                />
              </button>
              {open === i ? (
                <p className="mt-3 text-sm text-muted-foreground">{faq.a}</p>
              ) : null}
            </div>
          ))}
        </div>
      </Panel>

      <Panel className="mt-5">
        <div className="flex gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-surface text-primary-glow">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Account rules</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              One account per person. Extra accounts, emulators, unofficial bots, and VPNs are not
              allowed and can lock the balance. Withdrawals need a $0.01 minimum. The address you
              enter on the request is saved for next time. A wrong address cannot be reversed.
            </p>
          </div>
        </div>
      </Panel>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Panel>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-primary-glow">
            <Send className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-bold tracking-tight">Telegram</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Fastest route. Our team answers in the community chat.
          </p>
          <span className="mt-4 inline-block rounded-full bg-surface px-4 py-2 text-sm font-semibold">
            @fomoearn
          </span>
        </Panel>
        <Panel>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-primary-glow">
            <Mail className="h-5 w-5" />
          </div>
          <h3 className="mt-4 text-lg font-bold tracking-tight">Email</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Send details and we'll respond within 24 hours.
          </p>
          <a
            href="mailto:support@fomoearn.com"
            className="mt-4 inline-block text-sm font-semibold text-primary-glow"
          >
            support@fomoearn.com
          </a>
        </Panel>
      </div>
    </DashboardShell>
  );
}
