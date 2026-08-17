import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Plus } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/shell";
import { EmptyState, Panel, PanelHeader } from "@/components/dashboard/primitives";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support — FomoEarn dashboard" },
      {
        name: "description",
        content: "Open a support ticket about a payout, a referral or your account.",
      },
      { property: "og:title", content: "Support — FomoEarn dashboard" },
      {
        property: "og:description",
        content: "Open a support ticket about a payout, a referral or your account.",
      },
    ],
  }),
  component: SupportPage,
});

function SupportPage() {
  return (
    <DashboardShell
      title="Support"
      subtitle="Stuck with a payout, a referral or your account? Open a ticket and we will reply here."
    >
      <Panel>
        <PanelHeader
          title="Your tickets"
          action={
            <button className="gradient-violet flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              <Plus className="h-4 w-4" /> New ticket
            </button>
          }
        />
        <EmptyState
          icon={LifeBuoy}
          title="You have no support tickets yet"
          body="Open a ticket and our team replies inside this panel, usually within 24 hours."
        />
      </Panel>
    </DashboardShell>
  );
}
