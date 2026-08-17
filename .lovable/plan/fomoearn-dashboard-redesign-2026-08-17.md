# FomoEarn Dashboard Redesign

Rebuild all seven dashboard pages in this project with the TradUp-style look from the reference: deep violet-black canvas, soft purple glow washes, large rounded cards, gradient accent panels, and a pill-style sidebar. Frontend only, with mock data matching the numbers in your screenshots.

## Visual direction

- Dark base near-black with a violet tint; ambient purple radial glows behind the header area.
- Cards: large radius (~20px), subtle inner border, layered surface tint, soft shadow.
- One hero "gradient panel" per page (violet-to-magenta) for the most important number, like the Total Investment card in the reference.
- Sidebar: floating panel, active item as a filled violet pill, icons + labels, Light/Dark toggle pill, bottom promo card.
- Topbar: page title, search field with shortcut hint, notification/message icon buttons, avatar with name and handle.
- Typography: clean geometric sans, oversized numeric displays with lighter decimal tails.
- Accent colors kept for status: green for gains/credits, red for negatives.

## Pages

1. **Home** — balance hero gradient card, four stat cards (Credited today, Available balance, Total credited, Tasks completed), an Android-app install banner, payout history panel with empty state, and a quick-actions list (Watch, Request payout, Share link).
2. **Watch** — install/APK card with image, QR sign-in card with expiry timer, permissions and step-by-step install guide, manufacturer paths table, and three limit stats (Daily, Hourly, Watch time).
3. **Referrals** — referral code + share link with copy buttons, four level cards (L1 50%, L2 10%, L3 1%, Referral credit), recent referrals panel with level tabs and empty state.
4. **Payouts** — Request payout / Payout history tabs, balance + minimum cards, withdrawal method select, amount input with "Use max", wallet address field, fee summary breakdown, submit button, and a "Before you request" checklist card.
5. **Support** — ticket list panel with New ticket action and empty state.
6. **Help** — Android app card with numbered steps and actions, FAQ accordion, account rules card, Telegram and Email contact cards, footer links.
7. **Account** — profile card, edit profile, change password, login history table with pagination, plus right column: balances summary, verify email, security toggle, sign out.

## Technical notes

- Routes: `src/routes/index.tsx` (Home), plus `watch.tsx`, `referrals.tsx`, `payouts.tsx`, `support.tsx`, `help.tsx`, `account.tsx`.
- Shared layout (sidebar + topbar + glow background) as a component rendered by each page, so routes stay independent.
- Design tokens (violet palette, gradients, glow shadows, radii) defined in `src/styles.css` under `@theme inline` / `:root` — no hardcoded color classes in components.
- Mock data in a single `src/lib/mock-data.ts` so numbers stay consistent across pages.
- Components from shadcn (tabs, select, accordion, table, switch, input, button) restyled to match the reference.
- Interactive bits are local state only: tabs, accordion, copy-to-clipboard, fee calculator, login-history pagination, sidebar collapse.
- Per-route `head()` metadata with unique titles and descriptions.
- One generated image for the Watch page phone/APK visual.
