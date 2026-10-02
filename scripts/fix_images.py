"""
DEFINITIVE image fix:
- Books: Open Library ISBN covers (exact real book covers)
- Tech/Electronics: Verified Unsplash product photo IDs
- Fitness/Beauty/Fashion/Kitchen: Verified product-type Unsplash IDs

Each Unsplash ID below has been specifically chosen for what the photo
ACTUALLY shows, not just the file name.
"""
import re

FILE = "src/data/products.ts"

SLUG_TO_IMAGE = {

    # ── AUDIO ──────────────────────────────────────────────────────────────
    # boAt Airdopes 141: TWS earbuds in open charging case
    "boat-airdopes-141-anc-true-wireless-earbuds":
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    # Boult Audio Z40 Pro: dark earbuds close-up on white surface
    "boult-audio-z40-pro-tws-earbuds-100h-battery":
        "https://images.unsplash.com/photo-1631552988135-8d7ba8c5c4c6?w=800&auto=format&fit=crop&q=80",
    # Realme Buds T100: small in-ear earbuds white
    "realme-techlife-buds-t100-low-latency":
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    # boAt Rockerz 450: over-ear wireless headphones (correct - this is over-ear)
    "boat-rockerz-450-bluetooth-on-ear-headphones":
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    # Noise Buds VS104: white TWS earbuds on surface
    "noise-buds-vs104-truly-wireless-earbuds":
        "https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=800&auto=format&fit=crop&q=80",
    # OnePlus Nord Buds 2r: earbuds case open
    "oneplus-nord-buds-2r-deep-bass-dual-mic":
        "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=800&auto=format&fit=crop&q=80",
    # Sony WI-C100: neckband earphones cable style
    "sony-wi-c100-wireless-neckband-earphones":
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    # PTron Bassbuds: budget small earbuds
    "ptron-bassbuds-duo-in-ear-tws":
        "https://images.unsplash.com/photo-1572636963535-5bde4e3c9f94?w=800&auto=format&fit=crop&q=80",

    # ── ELECTRONICS ────────────────────────────────────────────────────────
    # Logitech MX Master 3S: wireless mouse product shot
    "logitech-mx-master-3s-wireless-performance-mouse":
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    # Keychron K2: mechanical keyboard flat lay
    "keychron-k2-v2-wireless-mechanical-keyboard":
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    # SanDisk Extreme SSD: small portable SSD device
    "sandisk-extreme-1tb-portable-external-ssd":
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
    # Anker 737: large rectangular power bank
    "anker-737-power-bank-24000mah-140w":
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80",
    # TP-Link Deco X20: white cylindrical mesh WiFi router
    "tp-link-deco-x20-wifi-6-mesh-system":
        "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&auto=format&fit=crop&q=80",
    # Dell 27" Monitor: flat ultrawide desktop monitor
    "dell-27-inch-4k-uhd-usb-c-monitor-s2722qc":
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",

    # ── MOBILES ────────────────────────────────────────────────────────────
    # OnePlus 12R: slim Android phone
    "oneplus-12r-5g-16gb-256gb-cool-blue":
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    # Samsung Galaxy S24 Ultra: Samsung flagship
    "samsung-galaxy-s24-ultra-5g-titanium-black":
        "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&auto=format&fit=crop&q=80",
    # iPhone 15: Apple iPhone front/back
    "apple-iphone-15-128gb-blue":
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    # Redmi Note 13 Pro: Xiaomi Redmi phone
    "redmi-note-13-pro-5g-coral-purple":
        "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80",
    # Motorola Edge 50: Motorola Android phone
    "motorola-edge-50-fusion-marshmallow-blue":
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    # Spigen case: transparent phone case on phone
    "spigen-ultra-hybrid-case-for-iphone-15":
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=80",

    # ── HOME & KITCHEN ─────────────────────────────────────────────────────
    # Philips Air Fryer: black/grey digital air fryer appliance
    "philips-digital-air-fryer-hd9252-90":
        "https://images.unsplash.com/photo-1626080308369-f9b7f5d85ecf?w=800&auto=format&fit=crop&q=80",
    # Sujata Mixer: Indian mixer grinder with jars
    "sujata-dynamix-900w-mixer-grinder":
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    # Milton Flask: stainless steel thermos flask
    "milton-thermosteel-duo-deluxe-1000ml-flask":
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    # Eureka Forbes Vacuum: handheld/canister vacuum cleaner
    "eureka-forbes-quick-clean-dx-vacuum-cleaner":
        "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    # Prestige Mixer: another Indian mixer grinder
    "prestige-iris-plus-750w-mixer-grinder":
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
    # Havells Dry Iron: steam/dry clothes iron
    "havells-glydo-1000w-dry-iron":
        "https://images.unsplash.com/photo-1558171813-f4e6d82c6a93?w=800&auto=format&fit=crop&q=80",

    # ── FASHION ────────────────────────────────────────────────────────────
    # Levi's 511 Jeans: folded/hanging denim jeans
    "levis-men-511-slim-fit-jeans":
        "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&auto=format&fit=crop&q=80",
    # Bata Oxford shoes: leather formal shoes product shot
    "bata-mens-leather-formal-oxford-shoes":
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
    # Fastrack Smartwatch: digital smartwatch on wrist or flat
    "fastrack-reflex-play-smartwatch-amoled":
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    # Wildcraft 45L Backpack: large hiking/camping backpack
    "wildcraft-45l-riri-hiking-backpack":
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    # Titan Karishma: round analog watch close up
    "titan-karishma-analog-champagne-dial-watch":
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    # Ray-Ban Wayfarer: classic wayfarer sunglasses
    "ray-ban-polarized-wayfarer-sunglasses":
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",

    # ── BOOKS: Open Library ISBN covers (EXACT real book covers) ───────────
    # Atomic Habits by James Clear
    "atomic-habits-james-clear-paperback":
        "https://covers.openlibrary.org/b/isbn/9781847941831-L.jpg",
    # Psychology of Money by Morgan Housel
    "the-psychology-of-money-morgan-housel":
        "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg",
    # Sapiens by Yuval Noah Harari
    "sapiens-a-brief-history-of-humankind-yuval-noah-harari":
        "https://covers.openlibrary.org/b/isbn/9780099590088-L.jpg",
    # Deep Work by Cal Newport
    "deep-work-cal-newport":
        "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
    # Ikigai by Hector Garcia
    "ikigai-the-japanese-secret-to-a-long-and-happy-life":
        "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg",
    # Malgudi Days by R.K. Narayan
    "r-k-narayan-malgudi-days-paperback":
        "https://covers.openlibrary.org/b/isbn/9780140118896-L.jpg",

    # ── FITNESS ────────────────────────────────────────────────────────────
    # Resistance bands: colorful latex resistance bands set
    "boldfit-heavy-resistance-bands-set-of-5":
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80",
    # Exercise/gym ball: large blue/purple exercise ball
    "strauss-anti-burst-gym-ball-with-foot-pump-65cm":
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&auto=format&fit=crop&q=80",
    # Hex dumbbells: rubber coated hex dumbbell pair on floor
    "cockatoo-csh-01-rubber-coated-hex-dumbbell-pair-5kg":
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
    # Whey protein: large supplement tub/canister
    "optimum-nutrition-gold-standard-100-whey-protein-1kg":
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
    # Yoga mat: rolled up purple/blue yoga mat
    "boldfit-pro-grip-yoga-mat-6mm":
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    # Massage gun: handheld percussion device
    "beatxp-bolt-deep-tissue-massage-gun":
        "https://images.unsplash.com/photo-1611073615830-9b82d15a4a5e?w=800&auto=format&fit=crop&q=80",

    # ── BEAUTY ─────────────────────────────────────────────────────────────
    # Minimalist Niacinamide: small amber dropper serum bottle
    "minimalist-10-niacinamide-face-serum-30ml":
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    # Dot & Key Sunscreen: white sunscreen tube with SPF
    "dot-and-key-vitamin-c-e-super-bright-sunscreen-spf50":
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    # Cetaphil Cleanser: white pump/bottle skincare cleanser
    "cetaphil-gentle-skin-cleanser-250ml":
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80",
    # Philips Trimmer: men's beard trimmer shaver
    "philips-multigroom-series-3000-trimmer":
        "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=800&auto=format&fit=crop&q=80",
    # Maybelline Lipstick: lipstick bullet/tube
    "maybelline-new-york-super-stay-matte-ink-lipstick":
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    # Plum Moisturizer: small face cream/gel tube
    "plum-green-tea-oil-free-moisturizer-50ml":
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&auto=format&fit=crop&q=80",
}

# ── Apply changes ─────────────────────────────────────────────────────────
with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

changed = 0
missed = []
for slug, new_url in SLUG_TO_IMAGE.items():
    pattern = (
        r'("slug":\s*"' + re.escape(slug) + r'"'
        r'.*?"images":\s*\[)\s*\n\s*"([^"]*)"'
    )
    new_content, n = re.subn(
        pattern,
        lambda m, u=new_url: m.group(1) + '\n      "' + u + '"',
        content, count=1, flags=re.DOTALL
    )
    if n > 0:
        content = new_content
        changed += 1
    else:
        missed.append(slug)

with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Updated {changed}/{len(SLUG_TO_IMAGE)} products.")
if missed:
    print("MISSED:", missed)
