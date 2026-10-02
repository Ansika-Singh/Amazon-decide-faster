"""
Extract all product slugs, titles, categories, and image URLs from products.ts
to audit image accuracy.
"""
import re

FILE = "src/data/products.ts"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Find each product block
products = re.findall(
    r'"slug":\s*"([^"]+)".*?"title":\s*"([^"]+)".*?"brand":\s*"([^"]+)".*?"category":\s*"([^"]+)".*?"images":\s*\[(.*?)\]',
    content, re.DOTALL
)

print(f"{'#':<3} {'SLUG':<55} {'IMAGE URL (truncated)'}")
print("-" * 120)
for i, (slug, title, brand, cat, imgs) in enumerate(products, 1):
    urls = re.findall(r'"(https?://[^"]+)"', imgs)
    url_short = urls[0][33:85] if urls else "EMPTY"
    print(f"{i:<3} {slug[:54]:<55} {url_short}")
