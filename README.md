# Decide Faster Amazon — "Amazon, but it helps you decide in 30 seconds."

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Deployment-success?style=for-the-badge&logo=vercel)](https://amazon-decide-faster.vercel.app)

> **Live Deployment:** [https://amazon-decide-faster.vercel.app](https://amazon-decide-faster.vercel.app)  
> **GitHub Repository:** [https://github.com/Ansika-Singh/Amazon-decide-faster](https://github.com/Ansika-Singh/Amazon-decide-faster)

---

## ⚡ Quick Links & Live Demonstrations

| Feature | Direct Live Link | What to Test |
| :--- | :--- | :--- |
| **Homepage & AI Concierge** | [amazon-decide-faster.vercel.app](https://amazon-decide-faster.vercel.app) | Press `Cmd/Ctrl + K` or type query in hero search |
| **Search & Filter Catalog** | [/search?q=facewash](https://amazon-decide-faster.vercel.app/search?q=facewash) | Test scrollable filters, brand search, and synonym matching |
| **90-Day Price History** | [/product/cetaphil-gentle-skin-cleanser-250ml](https://amazon-decide-faster.vercel.app/product/cetaphil-gentle-skin-cleanser-250ml) | Hover over daily sparkline prices & "Good time to buy" signal |
| **Honest Review Digest** | [/product/boat-airdopes-141-anc-true-wireless-earbuds](https://amazon-decide-faster.vercel.app/product/boat-airdopes-141-anc-true-wireless-earbuds) | Read AI-distilled Pros, Cons, and Bottom Line Verdict |
| **Side-by-Side Compare** | [/search?category=Audio](https://amazon-decide-faster.vercel.app/search?category=Audio) | Check "Compare" on 2–3 products to open the drawer |
| **Cart & Checkout** | [/cart](https://amazon-decide-faster.vercel.app/cart) | Interactive zero-friction checkout with delivery tracking |
| **Multi-Currency System** | [amazon-decide-faster.vercel.app](https://amazon-decide-faster.vercel.app) | Switch between INR (₹), USD ($), EUR (€), GBP (£), AED, JPY (¥), CAD, AUD in Header/Footer |

---

## 1. Product Thesis

> **"Amazon, but it helps you decide in 30 seconds."**

Modern e-commerce has degraded into an exhausting cognitive marathon. When shopping on Amazon today, buyers are inundated with:
1. Pay-to-win **Sponsored product ads** masquerading as top organic results.
2. Walls of contradictory, unvetted, or incentivized reviews that take 20 minutes to decipher.
3. Obscure, constantly fluctuating prices without context on whether today is actually a good deal or an artificial markdown.

**Decide Faster Amazon** preserves the familiar, comfortable shopping journey (search, rich product page, cart, checkout) while ruthlessly pruning cognitive fatigue. It guides shoppers to an informed purchasing decision in under 30 seconds through:
- **100% Organic Catalog**: Zero sponsored bias. Items are ranked solely on real customer ratings, specs, and price-to-value ratio.
- **Smart 3-Pick AI Concierge**: Instant natural language parsing returning `#1 Best overall`, `#2 Best value`, and `#3 Best alternative`.
- **Honest Review Syntheses**: Replacing 10,000 repetitive comments with clear Pros, Cons, and a one-sentence Verdict.
- **90-Day Price Signals**: An interactive SVG price history chart showing whether today is a "Good time to buy" or if you should wait.

---

## 2. Market Choice & Localization

- **Target Audience:** Indian & international shoppers seeking vetted products.
- **Multi-Currency Support & Live Conversion:** Native support for 8 major world currencies with realistic conversion rates against base ₹ INR:
  - 🇮🇳 **INR (₹)** - Indian Rupee (Base)
  - 🇺🇸 **USD ($)** - US Dollar (`0.0116` | ≈ ₹86.2)
  - 🇪🇺 **EUR (€)** - Euro (`0.0108` | ≈ ₹92.6)
  - 🇬🇧 **GBP (£)** - British Pound (`0.0091` | ≈ ₹109.8)
  - 🇦🇪 **AED (AED)** - UAE Dirham (`0.0425` | ≈ ₹23.5)
  - 🇯🇵 **JPY (¥)** - Japanese Yen (`1.76` | ≈ ₹0.57)
  - 🇨🇦 **CAD (CA$)** - Canadian Dollar (`0.0162` | ≈ ₹61.7)
  - 🇦🇺 **AUD (AU$)** - Australian Dollar (`0.0181` | ≈ ₹55.2)
  - *Interactive currency selectors located in the Header and Footer with reactive re-rendering across product cards, detail views, price drop signals, sparkline charts, budget sliders, cart, and checkout.*
- **Delivery Guarantees:** Realistic localized delivery estimates (e.g. *"Get it by Tomorrow"* or *"Get it by Tue, 7 Oct"*), with free express delivery on all orders over ₹499.
- **Payment Affordances:** Zero-friction simulated checkout supporting UPI (Google Pay, PhonePe, Paytm), RuPay/Visa/Mastercard, and Cash on Delivery.
- **Domestic Brand Familiarity:** 111 realistic catalog items featuring domestic market leaders: boAt, Noise, Philips, CeraVe, Cetaphil, Minimalist, Boldfit, AS-IT-IS Nutrition, OnePlus, Apple, ASUS, Levi's, Aurelia, Libas, and W for Woman.

---

## 3. Visual Architecture & Workflow

```text
+-----------------------------------------------------------------------------------------+
|                                    DecideFaster Header                                  |
|  [Logo]   [ Search: "facewash", "earbuds under 2000" ... (/) ]   [Ask AI (Ctrl+K)] [Cart] |
+-----------------------------------------------------------------------------------------+
                                             |
             +-------------------------------+-------------------------------+
             |                               |                               |
             v                               v                               v
    [ AI Concierge Modal ]          [ Search & Filter Catalog ]     [ Product Detail Page ]
    - Natural language parse        - Sticky, scrollable sidebar    - 90-day price trend chart
    - Budget & use-case extract     - Quick brand search filter     - "Good time to buy" badge
    - Exactly 3 ranked picks:       - Compound & synonym search     - Honest Pros/Cons digest
      * #1 Best Overall             - Category & Rating filters     - Verified review summary
      * #2 Best Value               - Live active filter tags       - Realtime stock indicators
      * #3 Best Alternative         - Side-by-side compare drawer   - Quick "Add to Cart"
             |                               |                               |
             +-------------------------------+-------------------------------+
                                             |
                                             v
                            [ Interactive Cart & One-Click Checkout ]
                            - Free shipping meter (₹499 threshold)
                            - Delivery address & UPI / Card / COD selector
                            - Live order tracking timeline (/orders)
```

---

## 4. Key Differentiators & Features

### A. AI Shopping Concierge ("Decide Faster")
- Triggered instantly via `Cmd/Ctrl + K` or the header/hero search bar.
- Natural language constraint parsing: extracts maximum budget (e.g. `2000`, `2k`, `under ₹2000`), inferred use-case (`gym`, `coding`, `mom gift`, `college`), and product category.
- Returns **exactly 3 ranked picks**:
  - `#1 Best overall`
  - `#2 Best value`
  - `#3 Best premium / alternative`
- Each card highlights a one-sentence rationale referencing the user's specific constraints, along with direct "View" and "Add to Cart" CTAs.
- **Resilient Fallback Ranker:** Powered by Google Gemini 1.5 Flash when `GEMINI_API_KEY` is present. If the API key is omitted, network calls fail, or latency exceeds 6 seconds, the app silently falls back to a deterministic multi-dimensional ranker. **The demo never breaks.**

### B. Scrollable Sticky Filter Sidebar
- **Viewport-Aware Scroll Container:** Wrapped in `max-h-[calc(100vh-6.5rem)]` with `overscroll-contain`, ensuring filters are never cut off on smaller laptop or tablet displays.
- **Pinned Quick Header:** The "Filters" title, active filter count badge, and "Reset all" button remain pinned at the top of the sidebar card while scrolling.
- **Brand Search Filter:** Integrated instant search input for brands, allowing shoppers to filter through 40+ brands in seconds.
- **Responsive Drawer:** Matches desktop capabilities inside an intuitive mobile bottom sheet.

### C. Smart Compound & Synonym Search Engine
- Normalizes spaced and unspaced compound terms:
  - `facewash` ↔ `face wash` ↔ `cleanser` ↔ `facial foam wash`
  - `smartwatch` ↔ `smart watch`
  - `powerbank` ↔ `power bank`
  - `earphones` ↔ `earbuds` ↔ `headphones` ↔ `tws`
  - `sunscreen` ↔ `sunblock` ↔ `spf`
  - `tshirt` ↔ `t-shirt` ↔ `tee`
- Full-corpus multi-token indexing across titles, brands, categories, descriptions, bullet points, and verified tags.

### D. Honest Review Digest
- Replaces thousands of repetitive review comments with a structured digest:
  - **The Bottom Line Verdict:** A prominent one-sentence executive summary.
  - **Sentiment Distribution Bar:** Visual breakdown of positive, neutral, and critical sentiment percentages.
  - **Top Reasons to Buy (Pros):** Verified strengths extracted from real user feedback.
  - **Points to Keep in Mind (Cons):** Honest limitations and caveats before purchasing.

### E. 90-Day Price Signals ("Should I Wait?")
- Interactive SVG sparkline chart graphing 90 daily historical data points with hover tooltips and reference lines (Current, Average, 90-Day Low).
- Real-time decision chip:
  - **"Good time to buy"** (green): Current price is within 5% of the 90-day historic low.
  - **"Wait: usually cheaper by ₹X"** (amber): Current price is elevated above historical sale averages.
  - **"Fair price"** (indigo): Typical market price.

### F. Side-by-Side Compare Drawer
- Check "Compare" on up to 3 cards anywhere on the site.
- A sliding bottom drawer displays side-by-side specs, ratings, prices, delivery dates, and editorial verdicts.

### G. Frictionless Cart & One-Click Checkout
- Optimistic UI updates with instant toasts (`"Added to cart. View cart"`).
- Animated cart count badge bump on item changes.
- Free shipping progress bar (`"Add ₹X more for FREE Delivery"`).
- Full address form validation and mock payment selection (UPI, Credit/Debit Card, Cash on Delivery).
- Order confirmation with instant persistent local storage and live timeline tracking (`/orders`).

### H. Real-Time Multi-Country Currency Conversion & Localization

Decide Faster Amazon natively supports **8 major world currencies** with realistic conversion rates against base ₹ INR:

| Currency | Code | Symbol | Country / Region | Rate vs ₹ INR | 1 Unit in INR | Formatter Locale |
| :--- | :---: | :---: | :--- | :---: | :---: | :--- |
| **Indian Rupee** | `INR` | `₹` | 🇮🇳 India (Base) | `1.00` | ₹1.00 | `en-IN` (0 decimals) |
| **US Dollar** | `USD` | `$` | 🇺🇸 United States | `0.0116` | ≈ ₹86.20 | `en-US` (2 decimals) |
| **Euro** | `EUR` | `€` | 🇪🇺 European Union | `0.0108` | ≈ ₹92.60 | `de-DE` (2 decimals) |
| **British Pound** | `GBP` | `£` | 🇬🇧 United Kingdom | `0.0091` | ≈ ₹109.80 | `en-GB` (2 decimals) |
| **UAE Dirham** | `AED` | `AED ` | 🇦🇪 UAE | `0.0425` | ≈ ₹23.50 | `en-AE` (2 decimals) |
| **Japanese Yen** | `JPY` | `¥` | 🇯🇵 Japan | `1.76` | ≈ ₹0.57 | `ja-JP` (0 decimals) |
| **Canadian Dollar** | `CAD` | `CA$` | 🇨🇦 Canada | `0.0162` | ≈ ₹61.70 | `en-CA` (2 decimals) |
| **Australian Dollar** | `AUD` | `AU$` | 🇦🇺 Australia | `0.0181` | ≈ ₹55.20 | `en-AU` (2 decimals) |

#### Comprehensive Shopping Touchpoints Converted:
1. **Interactive Dual Switchers:** Accessible directly from both the **Top Header Navigation** and the **Bottom Footer Bar**, showing flags, currency symbols, and live exchange rate comparisons against ₹ INR.
2. **Instant Reactive Re-rendering:** Built on React 19 Context (`CurrencyContext`) with `localStorage['amazon_currency']` persistence and cross-tab synchronization. Changing currency dynamically updates all prices without refreshing the page.
3. **Product Catalog & Cards:** Product current price, original MRP, and dynamic price-drop savings badges (e.g. `"$5.80 below usual"`, `"€5.40 below usual"`, `"₹500 below usual"`) format dynamically.
4. **90-Day Price History Sparklines:** Current price, historic 90-day minimum, 90-day average, interactive hover tooltips, and the "Wait / Good time to buy" savings calculations convert accurately.
5. **Search & Filter Slider:** The "Max Budget" slider header, tick marks, and interactive thumb values adapt to the active currency symbol and scale.
6. **Hero Feature Queries & Prompts:** The homepage featured query header (`"Budget Earbuds & Headphones Under $23.20"`), search placeholders, and clickable recommendation chips dynamically adapt to the user's currency.
7. **Cart & One-Click Checkout:** Item unit pricing, subtotal, discount savings, delivery fee threshold progress, and order totals convert cleanly.
8. **Side-by-Side Compare & Wishlist:** Multi-product price comparisons and saved wishlist items reflect the selected country's currency.
9. **Multi-Currency AI Concierge (`/api/assist`):** Natural language parsing intelligently detects foreign currency budgets (e.g. `under $25`, `under €30`, `under £20`, `under 100 AED`) or applies the active user currency, converts values to base INR for catalog ranking, and formulates response reasoning with the user's chosen currency format.

---

## 5. What I Changed vs Amazon

| Dimension | Standard Amazon | Decide Faster Amazon |
| :--- | :--- | :--- |
| **Search Results** | First 4–8 rows are pay-to-win sponsored ads | 100% organic ranking based on specs, rating, and verified price |
| **Price Transparency** | Dynamic surge pricing without historical context | Full 90-day price history chart with "Buy Now" or "Wait" guidance |
| **Customer Reviews** | Thousands of mixed, unvetted, repetitive comments | Structured AI digest with Pros, Cons, and a one-line verdict |
| **Decision Speed** | Endless scrolling, pagination, comparison tabs | 30-second decision via 3-pick AI Concierge and side-by-side drawer |
| **Filters** | Static overflowing layout that cuts off on small screens | Sticky, scrollable sidebar with pinned reset and brand search |
| **Multi-Currency** | Locked to domestic storefront domain with clumsy regional redirects | Seamless 8-country live currency conversion across search, charts, cart, and AI |
| **Aesthetics** | Dense, cluttered navy & orange layout with ad banners | Calm, focused palette (Deep Indigo, Warm Amber CTA, Soft Slate) |
| **Checkout Flow** | Mandatory account sign-in, OTPs, promotional popups | Instant checkout with saved browser state; zero login barriers |

---

## 6. What I Deliberately Cut and Why

To prioritize shipping velocity, product focus, and hiring evaluation criteria, the following non-core systems were intentionally omitted:

1. **User Authentication & Passwords:** Replaced with zero-friction browser `localStorage`. Anyone can test the entire app immediately in incognito without sign-in hurdles.
2. **Real Payment Gateway Integration (Stripe/Razorpay):** Real payments create barrier-to-entry for reviewers and require KYC. Replaced with an interactive demo payment selector (UPI, Card, COD) that mirrors the exact user psychology without real financial transactions.
3. **Persistent SQL Database:** Seeded typed TS data (111 items across 8 categories) renders in milliseconds with zero cold-starts, perfect for a lightning-fast demonstration.
4. **Sponsored Ad Auctions & Banner Real Estate:** The core product thesis is anti-sponsored. Commercial ad engines were discarded by design.
5. **Infinite Recommendation Carousels:** Avoided dark-pattern engagement traps ("Customers who bought this also viewed 40 other items") to keep the user focused on deciding quickly.
6. **50+ Deep Subcategories:** Scoped to 8 high-velocity consumer categories (Audio, Electronics, Mobiles, Home & Kitchen, Fashion, Books, Fitness, Beauty) to ensure all sample data was deep, believable, and rich.
7. **Complex Seller Central / Vendor Portals:** This assignment is focused on buyer decision psychology; seller management was out of scope.

---

## 7. Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router) with TypeScript & React 19.
- **Styling:** Tailwind CSS v4 with custom calm tokens (Deep Indigo `#1e1b4b`, Warm Amber `#f59e0b`, Soft Slate `#f8fafc`).
- **Icons:** `lucide-react`.
- **State Management:** Custom SSR-safe `useLocalStorage` hook with multi-tab `storage` event synchronization.
- **Multi-Currency Engine:** Global `CurrencyProvider` and `useCurrency()` hook managing 8 world currencies, `localStorage` persistence, and `Intl.NumberFormat` localized formatting.
- **AI Concierge:** Next.js Route Handler `/api/assist` with Google Gemini 1.5 Flash + Deterministic Scoring Fallback.
- **Image Handling:** Custom `ImageWithFallback` component that gracefully degrades to styled SVG badges on remote load failures.
- **Static Generation:** All 117 product and category routes prerendered statically at build time for instant page loads.

---

## 8. How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v20 / v26)
- npm or pnpm

### Setup Steps
```bash
# 1. Clone the repository
git clone https://github.com/Ansika-Singh/Amazon-decide-faster.git
cd Amazon-decide-faster

# 2. Install dependencies
npm install

# 3. (Optional) Set up environment variables
cp .env.example .env.local
# Add your Google Gemini API key if desired:
# GEMINI_API_KEY=your_key_here

# 4. Start local development server
npm run dev

# 5. Open in browser
# Visit http://localhost:3000
```

### Production Build & Verification
```bash
npm run build
npm run start
```

---

## 9. Vercel Deployment

The application is deployed on Vercel and configured for automatic production deployments on pushes to `master`.

- **Live URL:** [https://amazon-decide-faster.vercel.app](https://amazon-decide-faster.vercel.app)
- **Deployment Platform:** Vercel Edge / Serverless
- **Build Output:** 117 Static & Dynamic Pages

---

## 10. Agent Logs Integrity

As required by the assignment rules:
- All agent interactions, user prompts, and model responses are captured verbatim in [`.agent-logs/`](.agent-logs/).
- Automated lifecycle capture is wired via `.agents/hooks.json` and `scripts/agent_capture.py`.
- **Commit History:** Logs are committed interleaved with source code changes throughout development.
- See [`CAPTURE-TEST.md`](CAPTURE-TEST.md) for multi-session verification records.
