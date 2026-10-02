"""
Comprehensive image fix: replace every inaccurate/empty product image
with a verified, product-matched Unsplash URL.

Approach: we find each product by its slug, then replace the first image URL
in its images array with the correct one. This is slug-based so line numbers
don't matter.
"""
import re

FILE = "src/data/products.ts"

# slug -> correct Unsplash URL
# Each URL chosen to visually match the exact product type
SLUG_TO_IMAGE = {
    # ── AUDIO ──────────────────────────────────────────────────────────────
    # boAt Airdopes 141 ANC - TWS earbuds in case
    "boat-airdopes-141-anc-true-wireless-earbuds":
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    # Boult Audio Z40 Pro - earbuds top-down
    "boult-audio-z40-pro-tws-earbuds-100h-battery":
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    # Realme Buds T100 - small in-ear TWS earbuds
    "realme-techlife-buds-t100-low-latency":
        "https://images.unsplash.com/photo-1572636963535-5bde4e3c9f94?w=800&auto=format&fit=crop&q=80",
    # boAt Rockerz 450 - ON-EAR headphones (this one is correct: headphones)
    "boat-rockerz-450-bluetooth-on-ear-headphones":
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    # Noise Buds VS104 - white TWS earbuds
    "noise-buds-vs104-truly-wireless-earbuds":
        "https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=800&auto=format&fit=crop&q=80",
    # OnePlus Nord Buds 2r - earbuds
    "oneplus-nord-buds-2r-deep-bass-dual-mic":
        "https://images.unsplash.com/photo-1643394174693-55ada21e7344?w=800&auto=format&fit=crop&q=80",
    # Sony WI-C100 - neckband / in-ear earphones cable
    "sony-wi-c100-wireless-neckband-earphones":
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    # PTron Bassbuds Duo - tiny budget earbuds
    "ptron-bassbuds-duo-in-ear-tws":
        "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&auto=format&fit=crop&q=80",

    # ── ELECTRONICS ────────────────────────────────────────────────────────
    # Logitech MX Master 3S - wireless mouse
    "logitech-mx-master-3s-wireless-performance-mouse":
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
    # Keychron K2 V2 - mechanical keyboard
    "keychron-k2-v2-wireless-mechanical-keyboard":
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    # SanDisk Extreme 1TB SSD - portable SSD
    "sandisk-extreme-1tb-portable-external-ssd":
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
    # Anker 737 Power Bank - large power bank
    "anker-737-power-bank-24000mah-140w":
        "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80",
    # TP-Link Deco X20 - wifi mesh router device
    "tp-link-deco-x20-wifi-6-mesh-system":
        "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&auto=format&fit=crop&q=80",
    # Dell 27" 4K monitor
    "dell-27-inch-4k-uhd-usb-c-monitor-s2722qc":
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",

    # ── MOBILES ────────────────────────────────────────────────────────────
    # OnePlus 12R 5G - Android phone
    "oneplus-12r-5g-16gb-256gb-cool-blue":
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    # Samsung Galaxy S24 Ultra - Samsung phone
    "samsung-galaxy-s24-ultra-5g-titanium-black":
        "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&auto=format&fit=crop&q=80",
    # Apple iPhone 15 Blue
    "apple-iphone-15-128gb-blue":
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    # Redmi Note 13 Pro
    "redmi-note-13-pro-5g-coral-purple":
        "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop&q=80",
    # Motorola Edge 50 Fusion
    "motorola-edge-50-fusion-marshmallow-blue":
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    # Spigen case for iPhone 15 - phone case/cover
    "spigen-ultra-hybrid-case-for-iphone-15":
        "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=80",

    # ── HOME & KITCHEN ─────────────────────────────────────────────────────
    # Philips Air Fryer - digital air fryer
    "philips-digital-air-fryer-hd9252-90":
        "https://images.unsplash.com/photo-1626080308369-f9b7f5d85ecf?w=800&auto=format&fit=crop&q=80",
    # Sujata Mixer Grinder - mixer grinder Indian kitchen
    "sujata-dynamix-900w-mixer-grinder":
        "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    # Milton Thermosteel Flask - thermos flask
    "milton-thermosteel-duo-deluxe-1000ml-flask":
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
    # Eureka Forbes Vacuum Cleaner - vacuum cleaner
    "eureka-forbes-quick-clean-dx-vacuum-cleaner":
        "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80",
    # Prestige Mixer Grinder
    "prestige-iris-plus-750w-mixer-grinder":
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
    # Havells Dry Iron - clothes iron
    "havells-glydo-1000w-dry-iron":
        "https://images.unsplash.com/photo-1558171813-f4e6d82c6a93?w=800&auto=format&fit=crop&q=80",

    # ── FASHION ────────────────────────────────────────────────────────────
    # Levi's 511 Slim Jeans
    "levis-men-511-slim-fit-jeans":
        "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=800&auto=format&fit=crop&q=80",
    # Bata Oxford shoes - formal leather shoes
    "bata-mens-leather-formal-oxford-shoes":
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
    # Fastrack Reflex Play Smartwatch
    "fastrack-reflex-play-smartwatch-amoled":
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    # Wildcraft Backpack - hiking backpack
    "wildcraft-45l-riri-hiking-backpack":
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
    # Titan Karishma Watch - analog watch
    "titan-karishma-analog-champagne-dial-watch":
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
    # Ray-Ban Wayfarer Sunglasses
    "ray-ban-polarized-wayfarer-sunglasses":
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",

    # ── BOOKS ──────────────────────────────────────────────────────────────
    # Atomic Habits - orange/red book cover
    "atomic-habits-james-clear-paperback":
        "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    # Psychology of Money - book
    "the-psychology-of-money-morgan-housel":
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
    # Sapiens - book on history
    "sapiens-a-brief-history-of-humankind-yuval-noah-harari":
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    # Deep Work - Cal Newport book
    "deep-work-cal-newport":
        "https://images.unsplash.com/photo-1550399105-c4db5fb85c18?w=800&auto=format&fit=crop&q=80",
    # Ikigai - Japanese philosophy book
    "ikigai-the-japanese-secret-to-a-long-and-happy-life":
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80",
    # Malgudi Days - R.K. Narayan
    "r-k-narayan-malgudi-days-paperback":
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80",

    # ── FITNESS ────────────────────────────────────────────────────────────
    # Resistance bands set - colorful resistance bands
    "boldfit-heavy-resistance-bands-set-of-5":
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80",
    # Gym ball / exercise ball - large inflated exercise ball
    "strauss-anti-burst-gym-ball-with-foot-pump-65cm":
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
    # Hex Dumbbells pair - rubber coated dumbbells
    "cockatoo-csh-01-rubber-coated-hex-dumbbell-pair-5kg":
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&auto=format&fit=crop&q=80",
    # Whey protein powder tub
    "optimum-nutrition-gold-standard-100-whey-protein-1kg":
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&auto=format&fit=crop&q=80",
    # Yoga mat - rolled/flat yoga mat
    "boldfit-pro-grip-yoga-mat-6mm":
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
    # Massage gun - handheld percussion massage gun
    "beatxp-bolt-deep-tissue-massage-gun":
        "https://images.unsplash.com/photo-1638107664896-fc7c1c2c2ac9?w=800&auto=format&fit=crop&q=80",

    # ── BEAUTY ─────────────────────────────────────────────────────────────
    # Minimalist Niacinamide Serum - face serum dropper bottle
    "minimalist-10-niacinamide-face-serum-30ml":
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
    # Dot & Key Vitamin C Sunscreen - sunscreen tube
    "dot-and-key-vitamin-c-e-super-bright-sunscreen-spf50":
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
    # Cetaphil Gentle Cleanser - white pump bottle cleanser
    "cetaphil-gentle-skin-cleanser-250ml":
        "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80",
    # Philips Multigroom Trimmer - men's beard trimmer
    "philips-multigroom-series-3000-trimmer":
        "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=800&auto=format&fit=crop&q=80",
    # Maybelline Matte Ink Lipstick - lipstick
    "maybelline-new-york-super-stay-matte-ink-lipstick":
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
    # Plum Green Tea Moisturizer - small face moisturizer jar/tube
    "plum-green-tea-oil-free-moisturizer-50ml":
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=800&auto=format&fit=crop&q=80",
}

# ────────────────────────────────────────────────────────────────────────────
with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

changed = 0
for slug, new_url in SLUG_TO_IMAGE.items():
    # Find the product block for this slug, then its images array first URL
    # Pattern: find the slug, then the FIRST image url (or empty string) in the next images block
    pattern = (
        r'("slug":\s*"' + re.escape(slug) + r'"'
        r'.*?"images":\s*\[)\s*\n\s*"([^"]*)"'
    )
    replacement = lambda m, u=new_url: m.group(1) + '\n      "' + u + '"'
    new_content, n = re.subn(pattern, replacement, content, count=1, flags=re.DOTALL)
    if n > 0:
        content = new_content
        changed += 1
        print(f"  OK [{slug[:50]}]")
    else:
        print(f"  MISS [{slug[:50]}] - pattern not found")

with open(FILE, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. Updated {changed}/{len(SLUG_TO_IMAGE)} products.")
