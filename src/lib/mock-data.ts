export const user = {
  name: "Ramneek Sidhu",
  handle: "@ramneek",
  email: "ram@ram.com",
  initial: "R",
  userId: "618640",
  memberSince: "15/08/2026",
  referralCode: "iYAqkqmw",
  shareLink: "https://fomoearn.app/r/iYAqkqmw",
};

export const balances = {
  available: 0.187,
  creditedToday: 0,
  totalCredited: 0.187,
  referralCredit: 0,
  tasksCompleted: 22,
  coins: 0,
};

export const watchLimits = {
  daily: 530,
  hourly: 62,
  watchTime: "15s",
};

export const referralLevels = [
  { level: "Level 1", share: "50%", count: 0 },
  { level: "Level 2", share: "10%", count: 0 },
  { level: "Level 3", share: "1%", count: 0 },
];

export const payoutMethods = [
  { value: "usdt-bep20", label: "USDT BEP-20 — min $0.01" },
  { value: "usdt-trc20", label: "USDT TRC-20 — min $0.01" },
  { value: "bnb", label: "BNB (BEP-20) — min $0.01" },
];

export const payoutRules = [
  "The minimum withdrawal is $0.01.",
  "Fee is 4% plus $0.00, taken from the amount you request. A request with a $0.01 flat fee pays out $0.99.",
  "Requests are processed automatically, but may be reviewed manually for up to 72 hours.",
  "Double-check your wallet address. Transfers to a wrong address cannot be reversed.",
];

export const installSteps = [
  {
    title: "Activation in accessibility list",
    body: "Launch the app. It will redirect you to accessibility settings. Find FomoEarn in the list and tap on it, even if it appears inactive.",
  },
  {
    title: "Granting permission via menu",
    body: 'Go to Settings → Apps → FomoEarn. Tap three dots in the upper right corner and select "Allow special capabilities". If three dots don\'t appear, go back to step 1.',
  },
  {
    title: "Enabling accessibility service",
    body: "Launch the app again. It will redirect to accessibility settings. Now the toggle should be active. Enable the service and confirm.",
  },
  {
    title: "Display over other apps permission",
    body: "Launch the app once more. It will request permission to display over other apps. Find FomoEarn in the list and enable it.",
  },
];

export const manufacturerPaths = [
  { brand: "Samsung", path: "Settings → Accessibility → Installed services" },
  { brand: "Xiaomi", path: "Settings → Additional settings → Accessibility" },
  { brand: "Huawei", path: "Settings → Accessibility → Accessibility" },
  { brand: "OnePlus", path: "Settings → System → Accessibility" },
  { brand: "Android", path: "Settings → Accessibility" },
];

export const faqs = [
  {
    q: "On which devices can I complete views?",
    a: "You can open the site on any device. Completing listed video tasks is built for the official FomoEarn Android app.",
  },
  {
    q: "How is the credit calculated?",
    a: "Each completed view credits a fixed rate. Referral credit is added on top of your own completed views.",
  },
  {
    q: "How do withdrawals work?",
    a: "Request a payout from the Payouts page. Requests are processed automatically, but may be reviewed for up to 72 hours.",
  },
  {
    q: "What is the official Android path?",
    a: "Download the APK from the Watch page. Never install FomoEarn from a third-party mirror.",
  },
  {
    q: "Can I use multiple accounts?",
    a: "No. One account per person. Extra accounts can lock the balance of every linked account.",
  },
  {
    q: "Can I use a VPN?",
    a: "No. VPNs, emulators and unofficial bots are not allowed and can lock your balance.",
  },
];

export const helpSteps = [
  "Create a FomoEarn account.",
  "Install the official Android app from the Android page.",
  "Leave the phone on. The app advances listed videos and records completed views.",
];

export const loginHistory = [
  { when: "17/08/2026, 13:14:55", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "16/08/2026, 14:30:06", ip: "2001:8f8:1b6f:e1e5:91bf:e618:9620:3abd", country: "—", status: "Normal" },
  { when: "16/08/2026, 13:58:21", ip: "2001:8f8:1b6f:e1e5:91bf:e618:9620:3abd", country: "—", status: "Normal" },
  { when: "16/08/2026, 13:54:04", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "16/08/2026, 13:49:09", ip: "2001:8f8:1b6f:e1e5:91bf:e618:9620:3abd", country: "—", status: "Normal" },
  { when: "16/08/2026, 13:38:36", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "15/08/2026, 18:26:01", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "15/08/2026, 17:54:49", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "15/08/2026, 16:04:14", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "15/08/2026, 15:58:37", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "15/08/2026, 15:12:02", ip: "86.99.209.32", country: "—", status: "Normal" },
  { when: "15/08/2026, 14:41:18", ip: "86.99.209.32", country: "—", status: "Normal" },
];

export const usd = (n: number, digits = 2) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}`;
