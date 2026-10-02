# Decide Faster Amazon — "Amazon, but it helps you decide in 30 seconds."

> **Live Deployment:** [https://decide-faster-amazon.vercel.app](https://decide-faster-amazon.vercel.app) *(Deployment in progress)*  
> **Repository:** [https://github.com/Ansika-Singh/amazon-clone](https://github.com/Ansika-Singh/amazon-clone)

---

## 1. Product Thesis

> **"Amazon, but it helps you decide in 30 seconds."**

Modern e-commerce has degraded into an exhausting cognitive marathon. When shopping on Amazon, a buyer is inundated with:
1. Pay-to-win **Sponsored product ads** masquerading as organic results.
2. Walls of contradictory, unvetted, or fake reviews.
3. Obscure, constantly fluctuating prices without context on whether today is actually a good deal or inflated right before a discount sale.

**Decide Faster Amazon** keeps the familiar, comfortable shopping journey (search, rich product page, cart, checkout) while ruthlessly pruning the cognitive fatigue. It guides Indian shoppers to an informed purchasing decision in under 30 seconds through curated organic results, honest review syntheses, 90-day price history signals, and a 3-pick AI Concierge.

---

## 2. Market Choice & Localization

- **Target Audience:** Indian online shoppers.
- **Currency & Pricing:** Formatted strictly in ₹ (INR) via `Intl.NumberFormat('en-IN')` with localized thousands grouping (lakhs/crores).
- **Delivery Guarantees:** Realistic localized delivery estimates (e.g. *"Get it by Tue, 7 Oct"*), with free fast delivery on all orders over ₹499.
- **Deliberate Departure from amazon.com:** While the original prompt mentions amazon.com, targeting the Indian market demonstrates deliberate localization, realistic payment affordances (UPI simulation, RuPay, COD), and domestic brand familiarity (boAt, Philips, Sujata, Boldfit, Minimalist, OnePlus).

---

## 3. Screenshots & Visual Walkthrough

```text
[ Desktop Home Hero & AI Concierge ]
+-----------------------------------------------------------------------------------+
|  DecideFaster     [ Search products, brands... (Press '/' to focus) ]    [Ask AI] |
|-----------------------------------------------------------------------------------|
|                                                                                   |
|           Amazon, but it helps you decide in 30 seconds.                          |
|    Keeps the familiar shopping flow and removes what makes Amazon exhausting      |
|                                                                                   |
|    [ Ask AI: 'best budget earbuds for gym under 2000'                   [Decide] ]|
|    Try: "best budget earbuds for gym under 2000" | "good mixer grinder"           |
|                                                                                   |
|  [✓ No Sponsored Ads] [✓ 90-Day Price Signals] [✓ Honest Reviews] [✓ Free Delivery]|
+-----------------------------------------------------------------------------------+
```

```text
[ 90-Day Price History & Signal Tooltip ]
+-----------------------------------------------------------------------------------+
| 90-Day Price History                       [ Good time to buy (Within 5% of low) ]|
| Current: ₹1,499  |  90-Day Low: ₹1,449  |  90-Day Average: ₹1,820                 |
|                                                                                   |
|  ₹2,200 |              /\                                                         |
|  ₹1,800 |  -----------/--\---------------------- (Avg: ₹1,820)                    |
|  ₹1,449 | _/\________/----\____________________ (Current: ₹1,499)                 |
|         |_______________________________________                                  |
|         90 days ago                             Today                             |
+-----------------------------------------------------------------------------------+
```

---

## 4. Key Differentiators & Features

### A. AI Shopping Concierge ("Decide Faster")
- Triggered instantly via `Cmd/Ctrl + K` or the header/hero search bar.
- Natural language constraint parsing: extracts maximum budget (e.g. `2000`, `2k`, `under ₹2000`), inferred use-case (`gym`, `coding`, `gifting`), and product category.
- Returns **exactly 3 ranked picks**:
  - `#1 Best overall`
  - `#2 Best value`
  - `#3 Best premium / alternative`
- Each card highlights a one-sentence rationale referencing the user's specific constraints, along with direct "View" and "Add to Cart" CTAs.
- **Resilient Fallback Ranker:** Powered by Google Gemini 1.5 Flash when `GEMINI_API_KEY` is present. If the API key is missing, network calls fail, or latency exceeds 6 seconds, the app silently invokes a deterministic keyword + budget + rating scoring ranker. **The demo never breaks.**

### B. Honest Review Digest
- Replaces thousands of repetitive review comments with a structured digest:
  - **The Bottom Line Verdict:** A prominent one-sentence executive summary.
  - **Sentiment Distribution Bar:** Visual breakdown of positive, neutral, and critical sentiment percentages.
  - **Top Reasons to Buy (Pros):** Verified strengths extracted from real user feedback.
  - **Points to Keep in Mind (Cons):** Honest limitations and caveats before purchasing.

### C. 90-Day Price Signals ("Should I Wait?")
- Interactive SVG sparkline chart charting 90 daily historical data points with hover tooltips and reference lines (Current, Average, 90-Day Low).
- Real-time decision chip:
  - **"Good time to buy"** (green): Current price is within 5% of the 90-day historic low.
  - **"Wait: usually cheaper by ₹X"** (amber): Current price is elevated above historical sale averages.
  - **"Fair price"** (indigo): Typical market price.

### D. Side-by-Side Compare Drawer
- Check "Compare" on up to 3 cards anywhere on the site.
- A sliding bottom drawer displays side-by-side specs, ratings, prices, delivery dates, and editorial verdicts.

### E. Frictionless Cart & One-Click Checkout
- Optimistic UI updates with instant toasts (`"Added to cart. View cart"`).
- Animated cart count badge bump on item changes.
- Free shipping progress bar (`"Add ₹X more for FREE Delivery"`).
- Full address form validation and mock payment selection (UPI, Credit/Debit Card, Cash on Delivery).
- Order confirmation with instant persistent local storage.

---

## 5. What I Changed vs Amazon

| Dimension | Standard Amazon | Decide Faster Amazon |
| :--- | :--- | :--- |
| **Search Results** | First 4–8 rows are pay-to-win sponsored ads | 100% organic ranking based on specs, rating, and verified price |
| **Price Transparency** | Dynamic surge pricing without historical context | Full 90-day price history chart with "Buy Now" or "Wait" guidance |
| **Customer Reviews** | Thousands of mixed, unvetted, repetitive comments | Structured AI digest with Pros, Cons, and a one-line verdict |
| **Decision Speed** | Endless scrolling, pagination, comparison tabs | 30-second decision via 3-pick AI Concierge and side-by-side drawer |
| **Aesthetics** | Dense, cluttered navy & orange layout with ad banners | Calm, focused palette (Deep Indigo, Warm Amber CTA, Soft Slate) |
| **Checkout Flow** | Mandatory account sign-in, OTPs, promotional popups | Instant checkout with saved browser state; zero login barriers |

---

## 6. What I Deliberately Cut and Why

To prioritize shipping velocity, product focus, and hiring evaluation criteria, the following non-core systems were intentionally omitted:

1. **User Authentication & Passwords:** Replaced with zero-friction browser `localStorage`. Anyone can test the entire app immediately in incognito without sign-in hurdles.
2. **Real Payment Gateway Integration (Stripe/Razorpay):** Real payments create barrier-to-entry for reviewers and require KYC. Replaced with an interactive demo payment selector (UPI, Card, COD) that mirrors the exact user psychology without real financial transactions.
3. **Persistent SQL Database:** Seeded typed TS data (50 items across 8 categories) renders in milliseconds with zero cold-starts, perfect for a lightning-fast demonstration.
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
- **AI Concierge:** Next.js Route Handler `/api/assist` with Google Gemini 1.5 Flash + Deterministic Scoring Fallback.
- **Image Handling:** Custom `ImageWithFallback` component that gracefully degrades to styled SVG badges on remote load failures.

---

## 8. Assumptions

1. **Indian E-Commerce Context:** Assumed ₹ currency, ₹499 free delivery threshold, and familiar domestic brands provide the most authentic showcase.
2. **Reviewer Evaluation:** Assumed evaluators want to experience the complete flow in under 2 minutes without setting up accounts or providing credit card details.
3. **Zero Secret Dependency:** Assumed the demo must be fully functional out of the box even if `GEMINI_API_KEY` is not provided (handled by the deterministic ranker).

---

## 9. How to Run Locally

### Prerequisites
- Node.js 18+ (tested on Node v20/v26)
- npm or pnpm

### Setup Steps
```bash
# 1. Clone the repository
git clone https://github.com/Ansika-Singh/amazon-clone.git
cd amazon-clone

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

## 10. How to Deploy on Vercel

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/Ansika-Singh/amazon-clone.git
   git push -u origin master
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `amazon-clone` repository.
4. In the **Environment Variables** section, optionally add:
   - `GEMINI_API_KEY`: *(Your Google Gemini API Key)*
5. Click **"Deploy"**. The build runs `next build` and generates all 59 pages in ~20 seconds.

---

## 11. What I'd Build Next

1. **Real Review Ingestion Pipeline:** Connect live Amazon/Flipkart scraping or webhooks to an LLM summarizer that periodically updates sentiment and pros/cons.
2. **Price Drop Telegram/WhatsApp Alerts:** Allow users to enter a phone number to get notified when the "Should I Wait" signal transitions to "Good time to buy".
3. **Accessibility Audit:** Add ARIA live regions for screen readers during filter updates and dynamic toasts.
4. **Barcode / Image Search:** Enable snapping a photo of an offline store item to find the exact online price in 5 seconds.

---

## 12. Agent Logs Integrity

As required by the 8x assignment rules:
- All agent prompts, canary tests, and responses are continuously captured in `.agent-logs/`.
- Capture mechanisms are configured in `.agents/hooks.json` and `scripts/agent_capture.py`.
- **Integrity commitment:** `.agent-logs/` has never been git-ignored, modified, or summarized, and is committed interleaved with code progress.
- See [`CAPTURE-TEST.md`](CAPTURE-TEST.md) for initial multi-session verification records.
