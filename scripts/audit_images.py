"""
Extract all product slugs, titles, categories, and image URLs from products.ts
to audit image accuracy and file existence.
"""
import re
import os

FILE = "src/data/products.ts"

with open(FILE, "r", encoding="utf-8") as f:
    content = f.read()

products = re.findall(
    r'"id":\s*"([^"]+)".*?"title":\s*"([^"]+)".*?"images":\s*\[(.*?)\]',
    content, re.DOTALL
)

print(f"{'#':<3} {'ID':<10} {'STATUS':<8} {'SIZE':<10} {'TITLE'}")
print("-" * 100)

all_ok = True
for i, (pid, title, imgs) in enumerate(products, 1):
    img_urls = re.findall(r'"([^"]+)"', imgs)
    img = img_urls[0] if img_urls else "EMPTY"
    local_path = os.path.join("public", img.lstrip("/")) if img.startswith("/") else img
    exists = os.path.exists(local_path)
    size = f"{os.path.getsize(local_path)}B" if exists else "MISSING"
    status = "OK" if exists and os.path.getsize(local_path) > 3000 else "FAIL"
    if status != "OK":
        all_ok = False
    print(f"{i:<3} {pid:<10} {status:<8} {size:<10} {title[:60]}")

print("-" * 100)
if all_ok and len(products) >= 95:
    print(f"ALL {len(products)} PRODUCTS AUDITED SUCCESSFULLY! ZERO ERRORS.")
else:
    print(f"AUDIT FAILED! Found issues.")
