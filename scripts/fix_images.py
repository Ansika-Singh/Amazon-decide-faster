"""
Fix audio/earbud product images with verified, category-accurate Unsplash URLs.
Also corrects any other obviously wrong category images.
"""

import re

FILE = "src/data/products.ts"

# line number (1-indexed) -> correct Unsplash URL for that exact product
# All chosen to visually match the actual product type
FIXES = {
    # --- EARBUDS (TWS) ---
    # boAt Airdopes 141 ANC - TWS earbuds in case
    15: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
    # Boult Audio Z40 Pro TWS - earbuds close-up
    430: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
    # Realme Techlife Buds T100 - small in-ear TWS earbuds (NOT over-ear)
    845: "https://images.unsplash.com/photo-1572636963535-5bde4e3c9f94?w=800&auto=format&fit=crop&q=80",
    # Noise Buds VS104 - white TWS earbuds
    1673: "https://images.unsplash.com/photo-1598986646512-9330bcc4c0dc?w=800&auto=format&fit=crop&q=80",
    # OnePlus Nord Buds 2r - TWS earbuds on surface
    2087: "https://images.unsplash.com/photo-1649834742869-e6c7c6d12f39?w=800&auto=format&fit=crop&q=80",
    # Sony WI-C100 neckband - neckband earphones
    2502: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    # PTron Bassbuds Duo - budget earbuds
    2916: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&auto=format&fit=crop&q=80",

    # --- TP-Link Deco X20 WiFi Router / Mesh --- 
    # (fix: was reusing earbuds photo)
    4989: "https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=800&auto=format&fit=crop&q=80",
}

with open(FILE, "r", encoding="utf-8") as f:
    lines = f.readlines()

changed = 0
for lineno, url in FIXES.items():
    idx = lineno - 1
    if idx < len(lines):
        original = lines[idx].strip()
        # Replace if it's an image URL line (starts with quote, contains unsplash or is empty)
        if re.match(r'^\s*"https?://', lines[idx]) or re.match(r'^\s*""\s*[\r\n]*$', lines[idx]):
            indent = len(lines[idx]) - len(lines[idx].lstrip())
            lines[idx] = ' ' * indent + f'"{url}"\n'
            changed += 1
            print(f"  OK Line {lineno}: {url[33:70]}...")
        else:
            print(f"  SKIP Line {lineno}: {original!r}")

with open(FILE, "w", encoding="utf-8") as f:
    f.writelines(lines)

print(f"\nDone. Fixed {changed} image URLs.")
