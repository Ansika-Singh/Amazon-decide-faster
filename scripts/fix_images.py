"""
Fix empty image strings in products.ts with real, product-matched Unsplash URLs.
Line numbers are 1-indexed and map directly to each product's empty images array.
"""

import re

FILE = "src/data/products.ts"

# Line number -> replacement URL (product-matched Unsplash photos)
# Format: w=800&auto=format&fit=crop&q=80
REPLACEMENTS = {
    # boAt Airdopes 141 ANC earbuds
    15: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    # Boult Audio Z40 Pro TWS earbuds
    430: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    # Realme Techlife Buds T100 earbuds
    845: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&auto=format&fit=crop&q=80",
    # boAt Rockerz 450 on-ear headphones
    1259: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    # Noise Buds VS104 earbuds
    1673: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    # OnePlus Nord Buds 2r earbuds
    2087: "https://images.unsplash.com/photo-1649834742869-e6c7c6d12f39?w=800&auto=format&fit=crop&q=80",
    # Sony WI-C100 neckband earphones
    2502: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    # PTron Bassbuds Duo earbuds
    2916: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&auto=format&fit=crop&q=80",
    # Anker 737 Power Bank
    4576: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80",
    # TP-Link Deco X20 WiFi 6 Mesh
    4989: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    # OnePlus 12R 5G smartphone
    5818: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    # Samsung Galaxy S24 Ultra
    6231: "https://images.unsplash.com/photo-1610945264803-c22b62d2a7b3?w=800&auto=format&fit=crop&q=80",
    # Apple iPhone 15 128GB Blue
    6644: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
    # Redmi Note 13 Pro 5G
    7057: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop&q=80",
    # Motorola Edge 50 Fusion
    7470: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    # Spigen Ultra Hybrid Case iPhone 15
    7883: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&auto=format&fit=crop&q=80",
    # Philips Digital Air Fryer HD9252
    8295: "https://images.unsplash.com/photo-1626080308369-f9b7f5d85ecf?w=800&auto=format&fit=crop&q=80",
    # Sujata Dynamix 900W Mixer Grinder
    8708: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80",
    # Milton Thermosteel Flask
    9536: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80",
    # Prestige Iris Plus Mixer Grinder
    9948: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop&q=80",
    # Havells Glydo 1000W Dry Iron
    10360: "https://images.unsplash.com/photo-1558171813-f4e6d82c6a93?w=800&auto=format&fit=crop&q=80",
    # BeatXP Bolt Massage Gun
    17804: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80",
    # Cetaphil Gentle Skin Cleanser
    19047: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&auto=format&fit=crop&q=80",
    # Philips Multigroom Series 3000 Trimmer
    19459: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?w=800&auto=format&fit=crop&q=80",
    # Plum Green Tea Oil-Free Moisturizer
    20286: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
}

with open(FILE, "r", encoding="utf-8") as f:
    lines = f.readlines()

changed = 0
for lineno, url in REPLACEMENTS.items():
    idx = lineno - 1  # 0-indexed
    if idx < len(lines):
        original = lines[idx]
        # Only replace if it's actually an empty string line
        if re.match(r'^\s*""\s*[\r\n]*$', original):
            # Preserve indentation
            indent = len(original) - len(original.lstrip())
            lines[idx] = ' ' * indent + f'"{url}"\n'
            changed += 1
            print(f"  Line {lineno}: replaced with {url[:60]}...")
        else:
            print(f"  SKIP Line {lineno}: not empty string — content: {original.strip()!r}")

with open(FILE, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"\nDone. Replaced {changed} empty image URLs.")
