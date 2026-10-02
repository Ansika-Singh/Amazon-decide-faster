import { NextRequest, NextResponse } from 'next/server';
import { products } from '@/data/products';
import { Product, AssistResponse, AssistPick } from '@/types';

// Deterministic fallback ranker
function deterministicRanker(query: string): AssistResponse {
  const q = query.toLowerCase();
  
  // Extract budget: matches "under 2000", "under ₹2000", "2k", "< 2000", "2000 budget"
  let budget: number | undefined;
  const kMatch = q.match(/(\d+(?:\.\d+)?)\s*k\b/i);
  if (kMatch) {
    budget = parseFloat(kMatch[1]) * 1000;
  } else {
    const numMatch = q.match(/(?:under|below|less than|within|around|₹|\b)\s*(\d{3,6})\b/i);
    if (numMatch) {
      budget = parseInt(numMatch[1], 10);
    }
  }

  // Detect category keywords
  let category: string | undefined;
  if (/earbuds|earphone|headphone|audio|neckband|tws|sound/i.test(q)) {
    category = 'Audio';
  } else if (/phone|mobile|smartphone|iphone|android|samsung|oneplus/i.test(q)) {
    category = 'Mobiles';
  } else if (/laptop|macbook|notebook|pc|computer|mouse|keyboard|ssd|monitor|charger|wifi|router|electronics/i.test(q)) {
    category = 'Electronics';
  } else if (/mixer|grinder|air fryer|iron|bottle|flask|kitchen|vacuum|home/i.test(q)) {
    category = 'Home & Kitchen';
  } else if (/shoes|jeans|watch|backpack|sunglasses|fashion|shirt|clothes|cloths|clothing|apparel|wear|tshirt|t-shirt|tee|polo|trousers|kurti|kurtis|kurta|saree|sari|anarkali|dress|crop top|women fashion|women clothes|girls clothes/i.test(q)) {
    category = 'Fashion';
  } else if (/book|read|habits|psychology|sapiens|ikigai|novel/i.test(q)) {
    category = 'Books';
  } else if (/gym|dumbbell|protein|workout|fitness|yoga|bands|massage|kettlebell/i.test(q)) {
    category = 'Fitness';
  } else if (/serum|sunscreen|cream|cleanser|trimmer|lipstick|moisturizer|beauty/i.test(q)) {
    category = 'Beauty';
  }

  // Detect use cases & gifting intent
  const isMomGift = /\b(?:mom|mother|maa|mummy|parents?)\b/i.test(q) && (/\bgift\b|\bpresent\b|\bbuy\b/i.test(q) || true);
  const isGeneralGift = /\bgift\b|\bpresent\b|\bbirthday\b|\banniversary\b/i.test(q);

  let useCase = 'daily use';
  if (/gym|workout|exercise|running|fitness|sweat/i.test(q) && !/gift/i.test(q)) {
    useCase = 'gym & fitness workouts';
  } else if (/coding|programming|developer|work|office|desk/i.test(q)) {
    useCase = 'coding and workplace productivity';
  } else if (isMomGift) {
    useCase = 'thoughtful gift for mom';
  } else if (isGeneralGift) {
    useCase = 'thoughtful gifting';
  } else if (/travel|commute|outdoor|flight/i.test(q)) {
    useCase = 'travel and commute';
  } else if (/fashion|clothing|clothes|cloths|style|wear/i.test(q)) {
    useCase = 'fashion & daily wardrobe';
  } else if (/budget|cheap|affordable/i.test(q)) {
    useCase = 'budget-friendly value';
  }

  if (isMomGift && !category) {
    category = 'Thoughtful Gifts';
  }

  // Specific item type exact match boost and mismatch penalty
  const itemIntents: Array<{ pattern: RegExp; tag: string; titleKeywords: string[] }> = [
    { pattern: /\blaptops?\b|\bmacbooks?\b|\bnotebooks?\b/i, tag: 'laptop', titleKeywords: ['laptop', 'macbook', 'vivobook', 'ideapad', '15s'] },
    { pattern: /\bearbuds?\b|\btws\b/i, tag: 'earbuds', titleKeywords: ['earbuds', 'airdopes', 'buds'] },
    { pattern: /\bheadphones?\b/i, tag: 'headphones', titleKeywords: ['headphones', 'rockerz', 'wh-ch', '510bt'] },
    { pattern: /\bneckbands?\b/i, tag: 'neckband', titleKeywords: ['neckband', 'bullets'] },
    { pattern: /\bmixers?\b|\bgrinders?\b/i, tag: 'mixer grinder', titleKeywords: ['mixer', 'grinder'] },
    { pattern: /\bair fryers?\b/i, tag: 'air fryer', titleKeywords: ['air fryer', 'healthifry', 'aerocrisp'] },
    { pattern: /\bproteins?\b|\bwhey\b/i, tag: 'protein', titleKeywords: ['protein', 'whey'] },
    { pattern: /\bcreatine\b/i, tag: 'creatine', titleKeywords: ['creatine'] },
    { pattern: /\bkettlebells?\b/i, tag: 'kettlebell', titleKeywords: ['kettlebell'] },
    { pattern: /\byoga mats?\b/i, tag: 'yoga', titleKeywords: ['yoga mat', 'mat'] },
    { pattern: /\bbackpacks?\b|\bbags?\b/i, tag: 'backpack', titleKeywords: ['backpack', 'rucksack', 'valex', 'quill'] },
    { pattern: /\bcloth(?:es|s|ing)?\b|\bapparel\b|\bwear\b/i, tag: 'clothing', titleKeywords: ['t-shirt', 'tshirt', 'shirt', 'polo', 'jeans', 'kurti', 'kurta', 'saree', 'dress', 'crop top', 'crew neck', 'round neck'] },
    { pattern: /\bwomen(?:'?s)?\s*(?:fashion|cloth(?:es|ing)|wear|apparel)?\b|\bgirls?\s*(?:cloth(?:es|ing)|fashion)\b/i, tag: 'women', titleKeywords: ['women', 'kurti', 'saree', 'dress', 'crop top', 'aurelia', 'biba', 'suta', 'only', 'vero moda'] },
    { pattern: /\bkurtis?\b|\bkurtas?\b|\banarkalis?\b/i, tag: 'kurti', titleKeywords: ['kurti', 'kurta', 'anarkali'] },
    { pattern: /\bsarees?\b|\bsaris?\b/i, tag: 'saree', titleKeywords: ['saree', 'sari', 'banarasi'] },
    { pattern: /\bdress(?:es)?\b|\bmaxi\b|\bmidi\b/i, tag: 'dress', titleKeywords: ['dress', 'midi', 'maxi'] },
    { pattern: /\bcrop\s*tops?\b|\bcrops?\b/i, tag: 'crop top', titleKeywords: ['crop', 'crop t-shirt', 'crop top'] },
    { pattern: /\bt-?shirts?\b|\btees?\b/i, tag: 't-shirt', titleKeywords: ['t-shirt', 'tshirt', 'tee', 'crew neck', 'round neck'] },
    { pattern: /\bpolos?\b/i, tag: 'polo', titleKeywords: ['polo'] },
    { pattern: /\bshirts?\b/i, tag: 'shirt', titleKeywords: ['shirt', 'casual shirt', 'polo'] },
    { pattern: /\bshoes?\b|\bsneakers?\b/i, tag: 'shoes', titleKeywords: ['shoes', 'oxford', 'sneakers'] },
    { pattern: /\bjeans?\b|\bdenims?\b/i, tag: 'jeans', titleKeywords: ['jeans', 'denim'] },
    { pattern: /\bwatches?\b|\bsmartwatches?\b/i, tag: 'watch', titleKeywords: ['watch', 'smartwatch'] },
    { pattern: /\bserums?\b/i, tag: 'serum', titleKeywords: ['serum'] },
    { pattern: /\bsunscreens?\b/i, tag: 'sunscreen', titleKeywords: ['sunscreen', 'sunblock'] },
    { pattern: /\bcleansers?\b|\bface wash\b/i, tag: 'cleanser', titleKeywords: ['cleanser', 'face wash'] },
    { pattern: /\bvacuums?\b/i, tag: 'vacuum', titleKeywords: ['vacuum'] },
    { pattern: /\bmouses?\b|\bmice\b/i, tag: 'mouse', titleKeywords: ['mouse'] },
    { pattern: /\bkeyboards?\b/i, tag: 'keyboard', titleKeywords: ['keyboard'] },
    { pattern: /\bmonitors?\b/i, tag: 'monitor', titleKeywords: ['monitor'] },
  ];

  // Score products
  const scored = products.map((product) => {
    let score = 0;
    const tLow = product.title.toLowerCase();
    const catLow = product.category.toLowerCase();
    
    // Category match
    if (category && category !== 'Thoughtful Gifts' && product.category.toLowerCase() === category.toLowerCase()) {
      score += 40;
    }

    // Budget match
    if (budget) {
      if (product.price <= budget) {
        score += 35;
        // Closer to budget without exceeding gives minor bonus
        const ratio = product.price / budget;
        if (ratio > 0.5) score += 10;
      } else {
        score -= 250; // Heavily penalize products exceeding budget
      }
    }

    // Gifting logic for Mom / Parents
    if (isMomGift) {
      // Strictly penalize items completely unsuitable as mom gifts
      if (
        /pull-up|chin-up|dumbbell|kettlebell|creatine|protein|whey|trimmer|men's|gaming mouse|gaming keyboard|ssd/i.test(
          product.title
        )
      ) {
        score -= 700;
      } else if (catLow === 'fitness' && !/massage|yoga/i.test(product.title)) {
        score -= 600;
      } else if (catLow === 'mobiles' && /case|cover/i.test(product.title)) {
        score -= 300;
      }

      // Boost deeply appreciated, thoughtful mom gifts
      if (product.id === 'fit-06') {
        // beatXP Percussion Massage Gun (pain relief & relaxation)
        score += 290;
      } else if (product.id === 'bok-05') {
        // Ikigai Hardcover
        score += 280;
      } else if (product.id === 'hom-03' || product.id === 'hom-09' || product.id === 'hom-10') {
        // Insulated water bottles / flasks
        score += 270;
      } else if (catLow === 'beauty' && !/trimmer/i.test(product.title)) {
        // Skincare & pampering
        score += 250;
      } else if (product.id === 'aud-12' || product.id === 'aud-02') {
        // Neckband / comfortable earbuds for bhajans, audiobooks, calls
        score += 240;
      } else if (product.id === 'fit-05') {
        // Yoga mat
        score += 230;
      } else if (product.id === 'bok-06' || product.id === 'bok-01' || product.id === 'bok-02') {
        // Malgudi Days, Atomic Habits, Psychology of Money
        score += 220;
      }
    } else if (isGeneralGift) {
      // General gift query penalty for industrial/specialist gym gear
      if (/pull-up|chin-up|kettlebell|dumbbell|creatine/i.test(product.title)) {
        score -= 400;
      }
    }

    // Specific product-type intent matching
    for (const intent of itemIntents) {
      if (intent.pattern.test(q)) {
        const matchesIntent =
          product.tags.some((t) => t.toLowerCase().includes(intent.tag)) ||
          intent.titleKeywords.some((kw) => product.title.toLowerCase().includes(kw));
        if (matchesIntent) {
          score += 250;
        } else {
          score -= 300;
        }
      }
    }

    // Tag and keyword matching
    const queryTokens = q.split(/\s+/).filter((t) => t.length > 2);
    for (const token of queryTokens) {
      if (product.title.toLowerCase().includes(token)) score += 15;
      if (product.brand.toLowerCase().includes(token)) score += 10;
      if (product.tags.some((tag) => tag.toLowerCase().includes(token))) score += 12;
      if (product.description.toLowerCase().includes(token)) score += 5;
    }

    // High rating & review count boost
    score += (product.rating - 3.5) * 10;
    score += Math.min(10, Math.log10(product.reviewCount) * 2);

    return { product, score };
  });

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top 3 with category diversity if this is an open gift query
  let selectedPicks: typeof scored = [];
  if (isMomGift || (isGeneralGift && !category)) {
    const seenCategories = new Set<string>();
    for (const item of scored) {
      if (!seenCategories.has(item.product.category)) {
        selectedPicks.push(item);
        seenCategories.add(item.product.category);
        if (selectedPicks.length === 3) break;
      }
    }
  }
  if (selectedPicks.length < 3) {
    for (const item of scored) {
      if (!selectedPicks.some((s) => s.product.id === item.product.id)) {
        selectedPicks.push(item);
        if (selectedPicks.length === 3) break;
      }
    }
  }

  // Format picks with contextual reasons
  const topPicks = selectedPicks.map((item, index) => {
    const p = item.product;
    let label = 'Best overall';
    let reason = '';

    if (isMomGift) {
      if (p.id === 'fit-06') {
        label = 'Best wellness gift';
        reason = 'Deeply soothing percussion massage gun with 4 heads to relieve back, neck, and joint stiffness at home.';
      } else if (p.id === 'bok-05') {
        label = 'Best heartfelt gift';
        reason = 'A heartwarming, beautiful hardcover bestseller on finding peace, purpose, and longevity that she will cherish.';
      } else if (p.id === 'hom-03' || p.id === 'hom-09' || p.id === 'hom-10') {
        label = 'Best daily essential';
        reason = 'Premium double-wall insulated flask keeping herbal tea, warm water, or soup hot for 24 hours with zero leaks.';
      } else if (p.category === 'Beauty') {
        label = 'Best self-care gift';
        reason = 'Gentle, dermatologist-approved skincare pampering to keep her skin nourished, hydrated, and radiant.';
      } else if (p.id === 'aud-12') {
        label = 'Best comfort audio';
        reason = 'Lightweight neckband with 60-hour battery, perfect for enjoying bhajans, audiobooks, and family calls hands-free.';
      } else if (p.id === 'fit-05') {
        label = 'Best wellness pick';
        reason = 'Extra-cushioned 6mm eco-friendly mat with alignment marks for serene morning yoga and light stretching.';
      } else {
        label = index === 0 ? 'Best overall' : index === 1 ? 'Best value' : 'Thoughtful pick';
        reason = `A lovely, practical gift choice well within your ₹${budget || 1500} budget with top ratings.`;
      }
    } else if (p.category === 'Fashion') {
      if (index === 0) {
        label = 'Best overall';
        reason = `Top rated ${p.brand} pick featuring breathable, high-comfort fabric${budget ? ` well within your ₹${budget} budget` : ''}.`;
      } else if (index === 1) {
        label = 'Best value';
        reason = `Outstanding price-to-performance at ₹${p.price}, crafted with durable daily-wear cotton stitching.`;
      } else {
        label = 'Best alternative';
        reason = `Versatile ${p.brand} classic offering timeless styling and stellar customer reviews.`;
      }
    } else {
      if (index === 0) {
        label = 'Best overall';
        reason = `Top rated ${p.brand} pick balancing high performance and durability${budget ? ` well within your ₹${budget} budget` : ''}.`;
      } else if (index === 1) {
        label = 'Best value';
        reason = `Outstanding price-to-performance at ₹${p.price}, packing essential features without overpaying.`;
      } else {
        label = 'Best premium/alt';
        reason = `Proven alternative with specialized ${p.tags[1] || 'design'} tuning and stellar customer satisfaction.`;
      }
    }

    return {
      productId: p.id,
      rank: (index + 1) as 1 | 2 | 3,
      label,
      reason,
    };
  });

  return {
    picks: topPicks,
    interpretedAs: {
      budget,
      useCase,
      category,
    },
    source: 'fallback',
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const query = body?.query;

    if (!query || typeof query !== 'string' || !query.trim()) {
      return NextResponse.json(
        { error: 'Valid query parameter is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is missing, immediately use the deterministic ranker
    if (!apiKey) {
      const fallbackResult = deterministicRanker(query);
      return NextResponse.json(fallbackResult);
    }

    // Prepare catalog summary for Gemini prompt to choose from
    const catalogSummary = products.map((p) => ({
      id: p.id,
      title: p.title,
      brand: p.brand,
      category: p.category,
      price: p.price,
      rating: p.rating,
      tags: p.tags,
    }));

    const systemPrompt = `You are the AI shopping assistant for "Decide Faster Amazon".
Your task is to analyze the user's shopping query, understand constraints (budget, use case, preferred specs), and select EXACTLY 3 products strictly from the provided catalog.

Special Rule for Gifting: If the user is asking for gifts (especially 'gift for mom' or 'gift for parents'), select thoughtful lifestyle, wellness, or home items (such as soothing percussion massagers for back/joint relief, inspiring hardcover books like Ikigai, insulated flasks for tea/water, or gentle skincare). NEVER suggest inappropriate items like doorway pull-up bars, whey protein powder, heavy dumbbells, or gaming mice for a mother's gift.

Respond ONLY with valid JSON matching this schema:
{
  "picks": [
    {
      "productId": "string (MUST MATCH an existing id from the catalog)",
      "rank": 1,
      "label": "Best overall",
      "reason": "One clear sentence explaining why this product satisfies their specific budget/use case."
    },
    {
      "productId": "string",
      "rank": 2,
      "label": "Best value",
      "reason": "One clear sentence focusing on price-to-performance value."
    },
    {
      "productId": "string",
      "rank": 3,
      "label": "Best premium/alt",
      "reason": "One clear sentence explaining this alternative."
    }
  ],
  "interpretedAs": {
    "budget": number or null,
    "useCase": "string describing the inferred intent/use case",
    "category": "string inferred category or null"
  }
}

Catalog:
${JSON.stringify(catalogSummary)}`;

    // Call Gemini API with 6 second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    try {
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: systemPrompt },
                  { text: `User Query: "${query}"` },
                ],
              },
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              temperature: 0.2,
            },
          }),
          signal: controller.signal,
        }
      );

      clearTimeout(timeoutId);

      if (!geminiRes.ok) {
        throw new Error(`Gemini API returned status ${geminiRes.status}`);
      }

      const geminiData = await geminiRes.json();
      const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) throw new Error('Empty Gemini response');

      const parsed = JSON.parse(rawText);

      // Validate picks
      if (!Array.isArray(parsed.picks) || parsed.picks.length !== 3) {
        throw new Error('Picks count is not 3');
      }

      const validPicks: AssistPick[] = [];
      const validProductIds = new Set(products.map((p) => p.id));

      for (let i = 0; i < parsed.picks.length; i++) {
        const item = parsed.picks[i];
        if (!validProductIds.has(item.productId)) {
          throw new Error(`Invalid productId: ${item.productId}`);
        }
        validPicks.push({
          productId: item.productId,
          rank: (i + 1) as 1 | 2 | 3,
          label: item.label || (i === 0 ? 'Best overall' : i === 1 ? 'Best value' : 'Best premium/alt'),
          reason: item.reason || 'Recommended based on your requirements.',
        });
      }

      const responsePayload: AssistResponse = {
        picks: validPicks,
        interpretedAs: {
          budget: parsed.interpretedAs?.budget || undefined,
          useCase: parsed.interpretedAs?.useCase || undefined,
          category: parsed.interpretedAs?.category || undefined,
        },
        source: 'ai',
      };

      return NextResponse.json(responsePayload);
    } catch (aiErr) {
      console.warn('AI call failed or timed out, falling back to deterministic ranker:', aiErr);
      const fallbackResult = deterministicRanker(query);
      return NextResponse.json(fallbackResult);
    }
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json(
      { error: 'Internal server error processing assist request' },
      { status: 500 }
    );
  }
}
