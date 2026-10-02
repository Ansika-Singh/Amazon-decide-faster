#!/usr/bin/env python3
"""
Generates rich, realistic seed data for 48 products across 8 categories
including 90-day price history, honest review summaries, and tags.
"""

import json
import random
from datetime import datetime, timedelta

CATEGORIES = [
    "Audio",
    "Electronics",
    "Mobiles",
    "Home & Kitchen",
    "Fashion",
    "Books",
    "Fitness",
    "Beauty"
]

def generate_price_history(current_price, days=90):
    points = []
    today = datetime(2026, 10, 2)
    # Start price slightly higher or variable
    base = current_price * random.uniform(0.95, 1.25)
    
    # We want a 90 day history where current_price is the price on day 90 (today)
    history = [current_price]
    prev = current_price
    for _ in range(days - 1):
        # 10% chance of a discount event/spike
        roll = random.random()
        if roll < 0.15:
            change = random.uniform(-0.15, 0.20)
        else:
            change = random.uniform(-0.04, 0.04)
        prev = round(prev * (1 + change))
        # Keep within reasonable bounds (70% to 150% of current price)
        prev = max(int(current_price * 0.75), min(int(current_price * 1.4), prev))
        history.append(prev)
    
    history.reverse()
    for i in range(days):
        dt = today - timedelta(days=(days - 1 - i))
        points.append({
            "date": dt.strftime("%Y-%m-%d"),
            "price": history[i]
        })
    return points

# 8 categories x 6 items = 48 items
# 8 items specially crafted for "budget earbuds / headphones under ₹2000"
PRODUCTS_RAW = [
    # --- AUDIO (Include budget earbuds/headphones under 2000) ---
    {
        "id": "aud-01",
        "slug": "boat-airdopes-141-anc-true-wireless-earbuds",
        "title": "boAt Airdopes 141 ANC True Wireless Earbuds with 42H Playtime",
        "brand": "boAt",
        "category": "Audio",
        "price": 1499,
        "mrp": 4490,
        "rating": 4.1,
        "reviewCount": 18450,
        "images": [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1598331668826-20cecc596b86?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Active Noise Cancellation up to 32dB for disturbance-free listening",
            "Up to 42 hours of total playback with ASAP Charge (10 mins = 150 mins)",
            "Beast Mode with low latency (50ms) for sync and gaming",
            "ENx Technology with quad mics for crystal clear voice calls",
            "IPX5 water and sweat resistance for intense gym sessions"
        ],
        "description": "The boAt Airdopes 141 ANC offers punchy bass and active noise cancellation at an accessible price point. Built with IPX5 sweat resistance, it is ideal for morning runs, workouts, and daily commutes.",
        "stock": 42,
        "deliveryDays": 2,
        "tags": ["audio", "earbuds", "budget", "gym", "workout", "wireless", "bluetooth", "under 2000", "anc"],
        "reviewSummary": {
            "pros": ["Powerful bass response", "Solid battery life with fast charging", "Effective passive and active noise cancellation for the price"],
            "cons": ["Case finish catches micro-scratches easily", "Microphone performance softens in windy outdoor conditions", "Treble can feel slightly warm for classical genres"],
            "verdict": "Unbeatable value for gym-goers and bass enthusiasts wanting ANC under ₹1,500.",
            "sentiment": {"positive": 82, "neutral": 11, "negative": 7}
        }
    },
    {
        "id": "aud-02",
        "slug": "boult-audio-z40-pro-tws-earbuds-100h-battery",
        "title": "Boult Audio Z40 Pro TWS Earbuds with 100H Playtime & Quad Mic ENC",
        "brand": "Boult",
        "category": "Audio",
        "price": 1299,
        "mrp": 5499,
        "rating": 4.2,
        "reviewCount": 9420,
        "images": [
            "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Massive 100 hours total playtime with digital battery indicator case",
            "Quad Mic Environmental Noise Cancellation for clear outdoor calling",
            "BoomX Tech with rich 10mm drivers delivering rich sub-bass",
            "Combat Gaming Mode with 45ms ultra-low latency",
            "IPX5 water resistant rubberized acoustic chamber"
        ],
        "description": "Boult Z40 Pro is a marathon performer with 100 hours of battery backup. Its secure ergonomic stem grip stays locked during heavy gym sets, sprints, and long travel.",
        "stock": 28,
        "deliveryDays": 1,
        "tags": ["audio", "earbuds", "budget", "gym", "fitness", "wireless", "under 2000", "battery", "tws"],
        "reviewSummary": {
            "pros": ["Battery lasts weeks on regular usage", "Digital percentage display on case", "Snug in-ear grip during heavy workout movements"],
            "cons": ["Case is slightly bulkier than minimalist rivals", "Touch controls take brief muscle memory to master", "App lacks customizable EQ bands"],
            "verdict": "The endurance king for fitness junkies who hate charging their earbuds every couple of days.",
            "sentiment": {"positive": 85, "neutral": 9, "negative": 6}
        }
    },
    {
        "id": "aud-03",
        "slug": "realme-techlife-buds-t100-low-latency",
        "title": "realme Buds T100 True Wireless Earbuds with AI ENC for Calls",
        "brand": "realme",
        "category": "Audio",
        "price": 1499,
        "mrp": 2999,
        "rating": 4.3,
        "reviewCount": 24100,
        "images": [
            "https://images.unsplash.com/photo-1631867675167-90a456a90863?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "10mm Dynamic Bass Driver with titanium-plated composite diaphragm",
            "AI Environmental Noise Cancellation algorithm for voice clarity",
            "Up to 28 hours combined playtime with 10 min fast charging for 120 mins",
            "88ms super low latency via realme Link companion app support",
            "IPX5 water resistant lightweight build (only 4g per earbud)"
        ],
        "description": "The realme Buds T100 delivers clean, balanced sound tuning backed by realme Link app customization. Compact, lightweight, and engineered for reliable daily audio.",
        "stock": 35,
        "deliveryDays": 2,
        "tags": ["audio", "earbuds", "budget", "gym", "wireless", "tws", "under 2000", "realme"],
        "reviewSummary": {
            "pros": ["Balanced sound with clear vocal clarity", "Reliable companion app with equalizer presets", "Featherlight fit that causes zero ear fatigue"],
            "cons": ["No active noise cancellation", "Bass is clean but not thunderous for extreme bass heads", "Glossy inner lid shows dust over time"],
            "verdict": "Best overall sound balance and brand reliability under ₹1,500.",
            "sentiment": {"positive": 88, "neutral": 8, "negative": 4}
        }
    },
    {
        "id": "aud-04",
        "slug": "boat-rockerz-450-bluetooth-on-ear-headphones",
        "title": "boAt Rockerz 450 Bluetooth On-Ear Headphones with 40mm Drivers",
        "brand": "boAt",
        "category": "Audio",
        "price": 1399,
        "mrp": 3990,
        "rating": 4.1,
        "reviewCount": 31200,
        "images": [
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "40mm dynamic drivers for signature immersive HD boAt sound",
            "Up to 15 hours of continuous playback on a single charge",
            "Plush padded ear cushions with ergonomic adaptive headband",
            "Dual modes: seamless wireless Bluetooth v5.0 or 3.5mm AUX playback",
            "Integrated easy-access control buttons with built-in voice mic"
        ],
        "description": "For those who prefer on-ear comfort over in-ear buds, the Rockerz 450 delivers deep bass and comfortable listening sessions. Foldable earcups make it travel-ready.",
        "stock": 19,
        "deliveryDays": 3,
        "tags": ["audio", "headphones", "budget", "over-ear", "wireless", "under 2000", "bluetooth", "gym"],
        "reviewSummary": {
            "pros": ["Warm and energetic soundstage", "Comfortable memory foam ear cups", "Dual connectivity allows wired listening if battery dies"],
            "cons": ["Can feel snug on wider head profiles", "Plastic hinge requires moderate care when folding", "Charges via micro-USB instead of Type-C"],
            "verdict": "Dependable, bass-heavy on-ear headphones for study sessions and everyday workouts.",
            "sentiment": {"positive": 79, "neutral": 13, "negative": 8}
        }
    },
    {
        "id": "aud-05",
        "slug": "noise-buds-vs104-truly-wireless-earbuds",
        "title": "Noise Buds VS104 Truly Wireless Earbuds with 45H Playtime & Instacharge",
        "brand": "Noise",
        "category": "Audio",
        "price": 999,
        "mrp": 3499,
        "rating": 4.0,
        "reviewCount": 11800,
        "images": [
            "https://images.unsplash.com/photo-1590658006821-04f4008d5717?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "13mm speaker driver tuned for clean vocals and thumping bass",
            "Instacharge: 10 minutes of charge delivers 200 minutes of tunes",
            "45 hours of aggregate playtime for unbroken week-long usage",
            "Hyper Sync technology for instant pairing upon opening the lid",
            "IPX5 sweat resistance rated for gym workouts and humidity"
        ],
        "description": "At under ₹1,000, Noise Buds VS104 punches well above its weight class with 13mm drivers and Hyper Sync instant pairing.",
        "stock": 50,
        "deliveryDays": 1,
        "tags": ["audio", "earbuds", "budget", "gym", "under 2000", "under 1000", "tws", "wireless"],
        "reviewSummary": {
            "pros": ["Remarkable sound quality at under ₹1,000", "Instant pairing without hesitation", "Strong battery longevity"],
            "cons": ["Case plastic is slightly lightweight", "Microphone captures some ambient background clatter", "Ear tips might need sizing swaps for small ears"],
            "verdict": "The best sub-₹1,000 wireless earbuds for tight budgets.",
            "sentiment": {"positive": 80, "neutral": 12, "negative": 8}
        }
    },
    {
        "id": "aud-06",
        "slug": "oneplus-nord-buds-2r-deep-bass-dual-mic",
        "title": "OnePlus Nord Buds 2r TWS Earbuds with 12.4mm Drivers & 38H Playtime",
        "brand": "OnePlus",
        "category": "Audio",
        "price": 1799,
        "mrp": 2299,
        "rating": 4.4,
        "reviewCount": 16500,
        "images": [
            "https://images.unsplash.com/photo-1627989580309-bfaf3e58af6f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1592921870789-04563d55041c?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Extra-large 12.4mm Titanium-coated drivers for deep, punchy acoustics",
            "Sound Master Equalizer with 3 tailored audio profiles (Balanced, Bold, Bass)",
            "Dual Mic AI Noise Cancellation filters out wind during calls and runs",
            "IP55 water and dust resistance built for heavy gym sweating and rain",
            "Seamless Fast Pair with OnePlus and Android smartphones"
        ],
        "description": "OnePlus Nord Buds 2r brings flagship-grade acoustic tuning to an entry price. Featuring heavy-duty 12.4mm drivers and IP55 durability, it stays locked in your ears through tough workout sessions.",
        "stock": 22,
        "deliveryDays": 1,
        "tags": ["audio", "earbuds", "budget", "gym", "workout", "under 2000", "oneplus", "premium-budget", "tws"],
        "reviewSummary": {
            "pros": ["Superb 12.4mm driver audio definition", "IP55 rating handles sweat and drizzle with ease", "Fast pairing and premium build quality"],
            "cons": ["No active noise cancellation (ANC)", "Charging case lacks wireless charging", "Volume steps could be slightly more granular"],
            "verdict": "The undisputed #1 best overall earbuds under ₹2,000 for music purity and gym durability.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },
    {
        "id": "aud-07",
        "slug": "sony-wi-c100-wireless-neckband-earphones",
        "title": "Sony WI-C100 Wireless In-Ear Bluetooth Neckband Earphones with DSEE",
        "brand": "Sony",
        "category": "Audio",
        "price": 1699,
        "mrp": 2790,
        "rating": 4.2,
        "reviewCount": 14200,
        "images": [
            "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Sony DSEE (Digital Sound Enhancement Engine) restores high-frequency details",
            "Massive 25 hours battery life with 10-minute quick charge for 60 mins playback",
            "IPX4 splash and sweat resistance for running and cardio",
            "Customizable sound tuning via Sony Headphones Connect App EQ",
            "Tangle-free flexible neckband design that stays secure around your collar"
        ],
        "description": "Sony WI-C100 combines legendary Sony acoustic engineering with practical neckband security. You will never worry about an earbud slipping out while sprinting or lifting.",
        "stock": 18,
        "deliveryDays": 2,
        "tags": ["audio", "neckband", "earphones", "gym", "running", "budget", "under 2000", "sony"],
        "reviewSummary": {
            "pros": ["Audiophile-grade tuning and Sony App EQ support", "Zero risk of dropping earbuds on gym floors", "Reliable 25-hour battery run time"],
            "cons": ["Neckband wire length is fixed", "Call microphone is decent but sensitive to rustling clothes", "No magnetic earbud lock"],
            "verdict": "The best choice for runners and fitness athletes who want Sony sound with zero drop risk.",
            "sentiment": {"positive": 86, "neutral": 9, "negative": 5}
        }
    },
    {
        "id": "aud-08",
        "slug": "ptron-bassbuds-duo-in-ear-tws",
        "title": "pTron Bassbuds Duo In-Ear Wireless TWS Earbuds with Type-C Fast Charging",
        "brand": "pTron",
        "category": "Audio",
        "price": 799,
        "mrp": 2599,
        "rating": 3.9,
        "reviewCount": 38900,
        "images": [
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "13mm dynamic drivers producing punchy stereo audio",
            "32 hours total playback with charging case",
            "Touch controls for call answering, track skip, and voice assistant",
            "IPX4 water and sweat resistance",
            "Compact pocket-friendly case with Type-C port"
        ],
        "description": "The ultrabudget champion. pTron Bassbuds Duo provides snappy connectivity, strong volume levels, and a comfortable in-ear seal for under ₹800.",
        "stock": 65,
        "deliveryDays": 2,
        "tags": ["audio", "earbuds", "budget", "under 2000", "under 1000", "gym", "wireless", "ptron"],
        "reviewSummary": {
            "pros": ["Extremely low price tag", "Loud sound output with punchy beats", "Pocketable lightweight case"],
            "cons": ["Microphone is tinny for business calls", "Plastic feels basic", "High volume can introduce slight distortion"],
            "verdict": "A dirt-cheap backup pair for gym bags or casual video watching.",
            "sentiment": {"positive": 74, "neutral": 15, "negative": 11}
        }
    },

    # --- ELECTRONICS ---
    {
        "id": "elec-01",
        "slug": "logitech-mx-master-3s-wireless-performance-mouse",
        "title": "Logitech MX Master 3S Wireless Performance Mouse with Quiet Clicks",
        "brand": "Logitech",
        "category": "Electronics",
        "price": 8995,
        "mrp": 10995,
        "rating": 4.7,
        "reviewCount": 8420,
        "images": [
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "8K DPI any-surface laser sensor tracks accurately even on glass",
            "MagSpeed electromagnetic scrolling scrolls 1,000 lines per second",
            "Quiet Click switches provide 90% noise reduction with satisfying tactile response",
            "Easy-Switch connects up to 3 computers across Windows and macOS",
            "USB-C rechargeable with up to 70 days battery on full charge"
        ],
        "description": "The gold standard ergonomic productivity mouse. Crafted for developers, designers, and power users who spend all day at their workstation.",
        "stock": 14,
        "deliveryDays": 2,
        "tags": ["electronics", "mouse", "ergonomic", "productivity", "coding", "work", "logitech", "bluetooth"],
        "reviewSummary": {
            "pros": ["MagSpeed wheel feels magical", "Thumb wheel and gesture button accelerate multitasking", "Incredible 70-day battery life"],
            "cons": ["Heavy for fast-paced gaming", "Rubber coating requires gentle cleaning over years", "Premium price point"],
            "verdict": "The undisputed #1 productivity tool for software engineers and creators.",
            "sentiment": {"positive": 95, "neutral": 3, "negative": 2}
        }
    },
    {
        "id": "elec-02",
        "slug": "keychron-k2-v2-wireless-mechanical-keyboard",
        "title": "Keychron K2 V2 Wireless Mechanical Keyboard with Gateron Brown Switches",
        "brand": "Keychron",
        "category": "Electronics",
        "price": 7499,
        "mrp": 9999,
        "rating": 4.6,
        "reviewCount": 3120,
        "images": [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "75% compact 84-key layout retaining dedicated function and arrow keys",
            "Gateron G Pro Brown switches delivering satisfying tactile feedback",
            "Connects up to 3 devices via Bluetooth 5.1 or wired Type-C",
            "Massive 4000mAh battery lasts up to 240 hours without backlight",
            "Dedicated Mac and Windows layout switches with included extra keycaps"
        ],
        "description": "A favorite among software engineers, the Keychron K2 V2 blends compact desk footprint with mechanical typing precision and cross-platform versatility.",
        "stock": 11,
        "deliveryDays": 3,
        "tags": ["electronics", "keyboard", "mechanical", "coding", "work", "gaming", "type-c"],
        "reviewSummary": {
            "pros": ["Superb tactile typing feel with Gateron Browns", "Seamless switching between Mac and Windows", "Rock solid aluminum frame options"],
            "cons": ["Relatively tall profile benefits from a wrist rest", "RGB lighting draws down battery faster", "Keycaps are ABS rather than PBT"],
            "verdict": "The benchmark mechanical keyboard for programmers and tech enthusiasts.",
            "sentiment": {"positive": 92, "neutral": 5, "negative": 3}
        }
    },
    {
        "id": "elec-03",
        "slug": "sandisk-extreme-1tb-portable-external-ssd",
        "title": "SanDisk 1TB Extreme Portable External SSD up to 1050MB/s USB-C",
        "brand": "SanDisk",
        "category": "Electronics",
        "price": 8499,
        "mrp": 15999,
        "rating": 4.5,
        "reviewCount": 11200,
        "images": [
            "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Fast NVMe solid-state performance with up to 1050MB/s read and 1000MB/s write",
            "2-meter drop protection and IP55 water and dust resistance",
            "Carabiner loop securely fastens the drive to your belt loop or backpack",
            "Hardware encryption: 256-bit AES password protection",
            "Universal USB-C compatibility with laptops, phones, and consoles"
        ],
        "description": "Blazing fast rugged portable storage. Transfer 4K footage, large code repositories, or backup entire operating systems in minutes.",
        "stock": 25,
        "deliveryDays": 1,
        "tags": ["electronics", "ssd", "storage", "portable", "sandisk", "backup", "fast"],
        "reviewSummary": {
            "pros": ["Sustained transfer speeds over 900MB/s", "Tough rubberized body survives travel drops", "Compact palm-sized footprint"],
            "cons": ["Gets warm to the touch during sustained 100GB+ writes", "Short included USB-C cable", "Software utility optional and basic"],
            "verdict": "Reliable high-speed storage for videographers, devs, and frequent travelers.",
            "sentiment": {"positive": 89, "neutral": 7, "negative": 4}
        }
    },
    {
        "id": "elec-04",
        "slug": "anker-737-power-bank-24000mah-140w",
        "title": "Anker 737 Power Bank (PowerCore 24K) 140W Fast Charging 3-Port",
        "brand": "Anker",
        "category": "Electronics",
        "price": 9999,
        "mrp": 14999,
        "rating": 4.6,
        "reviewCount": 4200,
        "images": [
            ""
],
        "bullets": [
            "Ultra-powerful 140W two-way fast charging for laptops, tablets, and phones",
            "Smart digital display shows output power, input power, and estimated recharge time",
            "Colossal 24,000mAh capacity juices a 16-inch MacBook Pro up to 50% in 40 mins",
            "Power Delivery 3.1 and bi-directional charging protocol",
            "ActiveShield 2.0 temperature monitoring safeguards battery health"
        ],
        "description": "The ultimate power brick. Keep your MacBook Pro, iPhone, and accessories charged at full speed anywhere on earth without needing an AC wall outlet.",
        "stock": 16,
        "deliveryDays": 2,
        "tags": ["electronics", "charger", "powerbank", "anker", "laptop", "fast charging", "travel"],
        "reviewSummary": {
            "pros": ["Charges full-sized MacBooks and gaming handhelds with ease", "Smart OLED screen shows live wattage stats", "Recharges itself from empty in under an hour"],
            "cons": ["Heavy at 630g — not a pocket item", "High upfront investment", "Smooth finish scuffs if tossed with keys"],
            "verdict": "The undisputed heavy-hitter for remote workers and travelers requiring serious wattage.",
            "sentiment": {"positive": 93, "neutral": 4, "negative": 3}
        }
    },
    {
        "id": "elec-05",
        "slug": "tp-link-deco-x20-wifi-6-mesh-system",
        "title": "TP-Link Deco X20 AX1800 Whole Home Mesh Wi-Fi 6 System (2-Pack)",
        "brand": "TP-Link",
        "category": "Electronics",
        "price": 7999,
        "mrp": 12999,
        "rating": 4.4,
        "reviewCount": 5100,
        "images": [
            ""
],
        "bullets": [
            "Wi-Fi 6 speeds up to 1800 Mbps (1201 Mbps on 5 GHz + 574 Mbps on 2.4 GHz)",
            "Covers homes up to 4,000 sq ft with strong, unified seamless roaming",
            "Connects up to 150 smart devices with OFDMA and MU-MIMO technology",
            "TP-Link HomeShield provides network security and parental controls",
            "Deco app guides setup in under 5 minutes"
        ],
        "description": "Eliminate dead Wi-Fi zones in multi-room flats and duplex homes. Walk between rooms on video calls without a single dropped packet.",
        "stock": 9,
        "deliveryDays": 3,
        "tags": ["electronics", "wifi", "router", "mesh", "networking", "home", "tplink"],
        "reviewSummary": {
            "pros": ["Zero dead zones across multi-floor houses", "Setup takes 5 minutes on the mobile app", "Rock solid roaming on Zoom and Teams calls"],
            "cons": ["Only 2 Gigabit Ethernet ports per unit", "Advanced security features require subscription", "Wall mount brackets not included in box"],
            "verdict": "The smoothest whole-home Wi-Fi upgrade for remote working families.",
            "sentiment": {"positive": 88, "neutral": 8, "negative": 4}
        }
    },
    {
        "id": "elec-06",
        "slug": "dell-27-inch-4k-uhd-usb-c-monitor-s2722qc",
        "title": "Dell 27-Inch 4K UHD IPS Monitor (S2722QC) with 65W USB-C Power Delivery",
        "brand": "Dell",
        "category": "Electronics",
        "price": 28990,
        "mrp": 38990,
        "rating": 4.5,
        "reviewCount": 3890,
        "images": [
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1551645120-d70bfe84c826?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1547119957-637f8679db1e?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Crisp 4K UHD (3840 x 2160) resolution on a 27-inch anti-glare IPS display",
            "Single USB-C cable transmits 4K video, audio, data, and charges laptop up to 65W",
            "Integrated dual 3W stereo speakers and height-adjustable pivot stand",
            "99% sRGB color gamut coverage with AMD FreeSync support",
            "Picture-by-Picture (PBP) and Picture-in-Picture (PIP) for multi-device workflows"
        ],
        "description": "Transform your desk into an uncluttered, single-cable productivity powerhouse. Crystal-clear text rendering and accurate colors for editing and software development.",
        "stock": 8,
        "deliveryDays": 4,
        "tags": ["electronics", "monitor", "4k", "display", "dell", "usb-c", "coding", "design"],
        "reviewSummary": {
            "pros": ["Razor sharp text scaling on both Mac and Windows", "One USB-C cable charges laptop and outputs 4K display", "Sturdy stand with tilt, swivel, and height adjustments"],
            "cons": ["Built-in speakers are thin for bass-heavy audio", "60Hz refresh rate (not designed for esports gaming)", "No HDR1000 brightness tier"],
            "verdict": "The best value 4K USB-C work monitor on the market for modern laptops.",
            "sentiment": {"positive": 90, "neutral": 6, "negative": 4}
        }
    },

    # --- MOBILES ---
    {
        "id": "mob-01",
        "slug": "oneplus-12r-5g-16gb-256gb-cool-blue",
        "title": "OnePlus 12R 5G (Cool Blue, 16GB RAM, 256GB Storage)",
        "brand": "OnePlus",
        "category": "Mobiles",
        "price": 42999,
        "mrp": 45999,
        "rating": 4.5,
        "reviewCount": 12890,
        "images": [
            "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Snapdragon 8 Gen 2 Mobile Platform with Dual Cryo-velocity VC cooling",
            "1.5K 120Hz ProXDR Display with 4th Gen LTPO technology and Gorilla Glass Victus 2",
            "Massive 5500mAh battery with 100W SUPERVOOC charging (1-100% in 26 mins)",
            "50MP Sony IMX890 flagship main camera with Optical Image Stabilization",
            "OxygenOS 14 based on Android 14 with guaranteed 3 years of OS upgrades"
        ],
        "description": "The flagship killer re-imagined. Packing high-tier Snapdragon silicone, stellar thermal management, and an endurance battery that easily lasts 1.5 days of intensive use.",
        "stock": 17,
        "deliveryDays": 1,
        "tags": ["mobiles", "smartphone", "oneplus", "5g", "android", "gaming", "fast charging"],
        "reviewSummary": {
            "pros": ["Sensational battery longevity and 26-minute full recharge", "Buttery smooth 120Hz LTPO display", "Class-leading gaming performance without overheating"],
            "cons": ["Secondary 8MP ultrawide and 2MP macro cameras are modest", "No wireless charging", "No official IP68 rating (IP64 splash proof only)"],
            "verdict": "The performance and battery benchmark in the ₹40,000 smartphone category.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },
    {
        "id": "mob-02",
        "slug": "samsung-galaxy-s24-ultra-5g-titanium-black",
        "title": "Samsung Galaxy S24 Ultra 5G (Titanium Black, 12GB RAM, 256GB)",
        "brand": "Samsung",
        "category": "Mobiles",
        "price": 121999,
        "mrp": 134999,
        "rating": 4.6,
        "reviewCount": 7820,
        "images": [
            "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Titanium exterior frame with Corning Gorilla Armor anti-reflective glass",
            "Snapdragon 8 Gen 3 for Galaxy with Ray Tracing capabilities",
            "200MP Quad Telephoto Camera System with 5x optical zoom and 100x Space Zoom",
            "Built-in S Pen stylus for sketching, note-taking, and remote shutter",
            "Galaxy AI features: Live Translate, Circle to Search, and Photo Assist"
        ],
        "description": "The definitive Android powerhouse. Anti-reflective titanium display, versatile camera suite, integrated S-Pen, and 7 years of promised OS updates.",
        "stock": 10,
        "deliveryDays": 2,
        "tags": ["mobiles", "smartphone", "samsung", "flagship", "5g", "camera", "ai"],
        "reviewSummary": {
            "pros": ["Anti-reflective glass dramatically reduces glare in direct sun", "Unmatched camera zoom and video stabilization", "Full 7 years of software and security updates"],
            "cons": ["Substantial in weight and boxy corners in small pockets", "45W charging is conservative compared to Chinese flagships", "Steep initial price tag"],
            "verdict": "The most versatile and durable ultra-flagship smartphone money can buy.",
            "sentiment": {"positive": 93, "neutral": 4, "negative": 3}
        }
    },
    {
        "id": "mob-03",
        "slug": "apple-iphone-15-128gb-blue",
        "title": "Apple iPhone 15 (128 GB) - Blue with Dynamic Island & 48MP Camera",
        "brand": "Apple",
        "category": "Mobiles",
        "price": 69999,
        "mrp": 79900,
        "rating": 4.6,
        "reviewCount": 19400,
        "images": [
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Dynamic Island bubbles up alerts and Live Activities seamlessly",
            "All-new 48MP Main camera with 2x optical-quality Telephoto sensor zoom",
            "Durable color-infused frosted glass back with aerospace-grade aluminum edges",
            "USB-C universal charging port for cables you already own",
            "A16 Bionic chip delivers all-day battery efficiency and fluid gaming"
        ],
        "description": "The refined everyday iPhone. Features the Dynamic Island, a 48MP camera upgrade, and universal USB-C convenience wrapped in a lightweight, frosted glass aesthetic.",
        "stock": 21,
        "deliveryDays": 1,
        "tags": ["mobiles", "smartphone", "apple", "iphone", "ios", "camera", "usb-c"],
        "reviewSummary": {
            "pros": ["48MP camera takes breathtaking natural portraits", "USB-C simplifies charging across modern gadgets", "Lightweight hand feel and gorgeous matte back"],
            "cons": ["Display is locked at 60Hz instead of 120Hz ProMotion", "Base storage starts at 128GB", "Slow 20W wired charging speed"],
            "verdict": "The best default iPhone choice for 95% of users transitioning to USB-C.",
            "sentiment": {"positive": 90, "neutral": 6, "negative": 4}
        }
    },
    {
        "id": "mob-04",
        "slug": "redmi-note-13-pro-5g-coral-purple",
        "title": "Redmi Note 13 Pro 5G (Coral Purple, 8GB RAM, 128GB Storage)",
        "brand": "Xiaomi",
        "category": "Mobiles",
        "price": 21999,
        "mrp": 28999,
        "rating": 4.2,
        "reviewCount": 16400,
        "images": [
            "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "200MP ultra-clear camera with OIS and 4x in-sensor lossless zoom",
            "1.5K AMOLED 120Hz curved display with ultra-thin bezels",
            "Snapdragon 7s Gen 2 4nm 5G chipset for snappy daily performance",
            "5100mAh battery with 67W Turbo Charge in the box",
            "In-display fingerprint sensor with heart rate monitoring"
        ],
        "description": "Redmi Note 13 Pro sets a high bar for mid-rangers with its vivid 1.5K screen, 200MP OIS sensor, and fast 67W charging.",
        "stock": 30,
        "deliveryDays": 2,
        "tags": ["mobiles", "smartphone", "budget", "5g", "xiaomi", "redmi", "camera"],
        "reviewSummary": {
            "pros": ["1.5K AMOLED screen looks like a ₹50,000 phone", "Primary 200MP camera captures sharp daytime detail", "67W charger included in the box"],
            "cons": ["MIUI pre-installs bloatware apps you will want to disable", "Secondary cameras are mediocre", "Battery drain slightly higher on high brightness"],
            "verdict": "A visual treat in the ₹20k-₹25k segment with flagship-grade screen and main shooter.",
            "sentiment": {"positive": 84, "neutral": 10, "negative": 6}
        }
    },
    {
        "id": "mob-05",
        "slug": "motorola-edge-50-fusion-marshmallow-blue",
        "title": "Motorola Edge 50 Fusion (Marshmallow Blue, 8GB RAM, 128GB Storage)",
        "brand": "Motorola",
        "category": "Mobiles",
        "price": 22999,
        "mrp": 25999,
        "rating": 4.4,
        "reviewCount": 9800,
        "images": [
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1525598912003-663126343e1f?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "IP68 underwater protection — survive submersion in 1.5m of fresh water for 30 mins",
            "144Hz 3D Curved pOLED display with Gorilla Glass 5",
            "Sony LYTIA 700C 50MP sensor with All-Pixel Focus and OIS",
            "Clean near-stock Android 14 experience with Hello UI and Moto Gestures",
            "68W TurboPower charging with 5000mAh battery"
        ],
        "description": "Clean software meets certified IP68 water resistance. The Edge 50 Fusion boasts vegan leather back finishes and a fluid 144Hz curved screen.",
        "stock": 24,
        "deliveryDays": 2,
        "tags": ["mobiles", "smartphone", "motorola", "clean android", "ip68", "waterproof", "5g"],
        "reviewSummary": {
            "pros": ["True IP68 water protection at ₹22,999", "Zero bloatware software experience", "Premium vegan leather finish in hand"],
            "cons": ["Curved glass edges may attract accidental palm touches", "Low light video stabilization can show minor judder", "Haptics are adequate rather than punchy"],
            "verdict": "The cleanest, most durable mid-range smartphone for people tired of ads and bloatware.",
            "sentiment": {"positive": 90, "neutral": 7, "negative": 3}
        }
    },
    {
        "id": "mob-06",
        "slug": "spigen-ultra-hybrid-case-for-iphone-15",
        "title": "Spigen Ultra Hybrid Back Cover Case for iPhone 15 with Air Cushion",
        "brand": "Spigen",
        "category": "Mobiles",
        "price": 1499,
        "mrp": 2499,
        "rating": 4.5,
        "reviewCount": 18200,
        "images": [
            "https://images.unsplash.com/photo-1601593346740-925612772716?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Hybrid technology made of a TPU bumper with a durable PC crystal-clear back",
            "Air Cushion Technology for shock absorption at all corners",
            "Raised bezels lift screen and camera lens off flat surfaces",
            "Anti-yellowing resin maintains transparent clarity longer",
            "Tactile button cutouts provide crisp click feel and wireless charging support"
        ],
        "description": "Protect your phone without hiding its original color. Engineered with military-grade corner drop absorption and precise port cutouts.",
        "stock": 45,
        "deliveryDays": 1,
        "tags": ["mobiles", "accessories", "case", "iphone", "spigen", "protective"],
        "reviewSummary": {
            "pros": ["Snug precision fit that never loosens", "Genuinely protects against concrete drops", "Maintains original phone appearance"],
            "cons": ["TPU edges will eventually show amber warmth after 12 months", "Attracts dust specks inside during installation", "Adds slight thickness"],
            "verdict": "The default protective case recommendation for good reason.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },

    # --- HOME & KITCHEN ---
    {
        "id": "hom-01",
        "slug": "philips-digital-air-fryer-hd9252-90",
        "title": "Philips Digital Air Fryer HD9252/90 with Rapid Air Tech (4.1L)",
        "brand": "Philips",
        "category": "Home & Kitchen",
        "price": 6999,
        "mrp": 11995,
        "rating": 4.5,
        "reviewCount": 21300,
        "images": [
            ""
],
        "bullets": [
            "Patented Rapid Air Technology with starfish bottom design cooks evenly with 90% less oil",
            "Touch screen with 7 pre-set cooking programs (Fries, Chicken, Fish, Baking, Samosas)",
            "Keep warm function maintains food temperature for up to 30 minutes",
            "QuickClean non-stick basket is dishwasher safe for effortless cleaning",
            "NutriU app integration features over 500 healthy Indian and global recipes"
        ],
        "description": "Enjoy crispy pakoras, samosas, roasted veggies, and tandoori paneer with up to 90% less oil. Philips starfish airflow ensures evenly crisped edges without constant manual turning.",
        "stock": 16,
        "deliveryDays": 2,
        "tags": ["home & kitchen", "kitchen", "air fryer", "cooking", "healthy", "philips", "appliances"],
        "reviewSummary": {
            "pros": ["Crisps Indian snacks without oily heaviness", "Intuitive digital presets work out of the box", "Easy to scrub non-stick basket"],
            "cons": ["4.1L capacity fits meals for 2-3 people (larger families need 6L)", "Initial heating cycle emits minor plastic aroma", "Takes counter footprint"],
            "verdict": "The most reliable, evenly-cooking air fryer for health-conscious Indian kitchens.",
            "sentiment": {"positive": 92, "neutral": 5, "negative": 3}
        }
    },
    {
        "id": "hom-02",
        "slug": "sujata-dynamix-900w-mixer-grinder",
        "title": "Sujata Dynamix 900-Watt Mixer Grinder with 3 Stainless Steel Jars",
        "brand": "Sujata",
        "category": "Home & Kitchen",
        "price": 6290,
        "mrp": 7890,
        "rating": 4.6,
        "reviewCount": 14900,
        "images": [
            ""
],
        "bullets": [
            "Heavy-duty 900-Watt motor with double ball bearings for continuous heavy grinding",
            "90 minutes continuous run-time rating — handles stubborn idli batter and turmeric root",
            "3 robust stainless steel jars for wet grinding, dry grinding, and chutney paste",
            "High-grade stainless steel blades retain sharpness over years of tough usage",
            "Vibration-free heavy base with rotary 3-speed control and pulse mode"
        ],
        "description": "The commercial-grade workhorse of Indian homes. Grinds raw haldi root, garam masalas, and thick dosa batter without tripping or slowing down.",
        "stock": 12,
        "deliveryDays": 3,
        "tags": ["home & kitchen", "kitchen", "mixer grinder", "sujata", "grinding", "heavy duty", "appliances"],
        "reviewSummary": {
            "pros": ["Industrial-strength 900W motor never overheats", "Smooth batter consistency for idli, dosa, and tough pastes", "Lasts for 10+ years in daily use"],
            "cons": ["Motor is loud when grinding hard spices", "Utilitarian retro design aesthetics", "Jars are heavy to wash"],
            "verdict": "The undisputed king of motor power and longevity for authentic Indian cooking.",
            "sentiment": {"positive": 93, "neutral": 4, "negative": 3}
        }
    },
    {
        "id": "hom-03",
        "slug": "milton-thermosteel-duo-deluxe-1000ml-flask",
        "title": "Milton Thermosteel Duo Deluxe 1000ml Insulated Water Bottle",
        "brand": "Milton",
        "category": "Home & Kitchen",
        "price": 999,
        "mrp": 1290,
        "rating": 4.4,
        "reviewCount": 42100,
        "images": [
            "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Double-walled vacuum insulation keeps liquids hot or cold for 24 hours",
            "100% rust-proof 304 food-grade stainless steel interior and exterior",
            "Leak-proof screw top cap doubles as an insulated drinking cup",
            "Includes tailored fabric carry jacket with adjustable shoulder strap",
            "BPA-free and sweat-free condensation design"
        ],
        "description": "An Indian household classic. Keeps chai piping hot or lemon water freezing cold through 24-hour train journeys, commutes, and office days.",
        "stock": 48,
        "deliveryDays": 1,
        "tags": ["home & kitchen", "flask", "water bottle", "milton", "insulated", "travel", "gym"],
        "reviewSummary": {
            "pros": ["Genuine 24-hour temperature retention", "Lid cup is super convenient for tea/coffee", "Sturdy stainless steel survives accidental drops"],
            "cons": ["1L bottle is relatively tall for small backpacks", "Fabric pouch zipper wears out after a year", "Hand wash only recommended"],
            "verdict": "The most reliable everyday vacuum flask in India.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },
    {
        "id": "hom-04",
        "slug": "eureka-forbes-quick-clean-dx-vacuum-cleaner",
        "title": "Eureka Forbes Quick Clean DX 1200W Dry Vacuum Cleaner with Dust Bag Indicator",
        "brand": "Eureka Forbes",
        "category": "Home & Kitchen",
        "price": 3799,
        "mrp": 4999,
        "rating": 4.1,
        "reviewCount": 18200,
        "images": [
            ""
],
        "bullets": [
            "High suction 1200W motor clears deep embedded dust from sofas and carpets",
            "Dust bag full indicator prevents motor strain and suction drops",
            "Includes 6 versatile cleaning accessories for corners, tiles, and upholstery",
            "Foot-operated power switch and auto cord winder for easy storage",
            "Swivel wheels enable effortless 360-degree mobility across rooms"
        ],
        "description": "Keep sofas, rugs, curtains, and car interiors spotless with 1200 watts of cyclonic suction. Compact canister format with built-in cord retract.",
        "stock": 15,
        "deliveryDays": 2,
        "tags": ["home & kitchen", "vacuum cleaner", "cleaning", "home", "appliances", "eureka forbes"],
        "reviewSummary": {
            "pros": ["Strong suction lifts deep dust from upholstery and mattresses", "Wide variety of crevice and brush attachments", "Automatic cord winder is effortless"],
            "cons": ["Motor generates loud operational hum", "Uses replaceable dust bags rather than bagless cyclonic cup", "Hose is stiff in cold weather"],
            "verdict": "Dependable budget vacuum cleaner for deep seasonal and festive cleaning.",
            "sentiment": {"positive": 81, "neutral": 11, "negative": 8}
        }
    },
    {
        "id": "hom-05",
        "slug": "prestige-iris-plus-750w-mixer-grinder",
        "title": "Prestige Iris Plus 750 Watt Mixer Grinder with 4 Jars (Black)",
        "brand": "Prestige",
        "category": "Home & Kitchen",
        "price": 2899,
        "mrp": 6295,
        "rating": 4.0,
        "reviewCount": 34100,
        "images": [
            ""
],
        "bullets": [
            "750W copper motor with overload protection switch",
            "Includes 3 stainless steel jars + 1 transparent polycarbonate juicer jar with sieve",
            "Ergonomic handle grip design with sturdy locking lid mechanism",
            "Multi-function blade system handles purees, masalas, shakes, and batters",
            "Sleek gloss black body finish that elevates kitchen countertop looks"
        ],
        "description": "Value-packed kitchen essential. Offers 4 versatile jars including a dedicated juicing jar with filter for fresh morning juices and smoothies.",
        "stock": 35,
        "deliveryDays": 1,
        "tags": ["home & kitchen", "kitchen", "mixer grinder", "prestige", "budget", "juicer"],
        "reviewSummary": {
            "pros": ["Transparent juicer jar is great for citrus and fruit shakes", "Budget-friendly price for a 750W motor", "Modern black aesthetic looks clean on counters"],
            "cons": ["Jar lock requires firm two-handed twist initially", "Can smell like motor insulation in the first two runs", "Not meant for grinding dry rock haldi"],
            "verdict": "Great all-round mixer grinder for nuclear families and bachelors.",
            "sentiment": {"positive": 78, "neutral": 13, "negative": 9}
        }
    },
    {
        "id": "hom-06",
        "slug": "havells-glydo-1000w-dry-iron",
        "title": "Havells Glydo 1000W Dry Iron with American Heritage Non-Stick Coating",
        "brand": "Havells",
        "category": "Home & Kitchen",
        "price": 949,
        "mrp": 1495,
        "rating": 4.3,
        "reviewCount": 12400,
        "images": [
            ""
],
        "bullets": [
            "American Heritage non-stick golden soleplate glides effortlessly over fabrics",
            "1000W element heats up rapidly for quick morning clothes pressing",
            "360-degree swivel cord prevents cord tangling during ironing",
            "Thermostatic dial with clear fabric indicators (Cotton, Silk, Wool, Linen)",
            "Aerodynamic sleek body with comfortable ergonomic palm grip"
        ],
        "description": "Crisp shirts and kurtas in minutes. High-heat non-stick soleplate glides over delicate cottons and silks without sticking or snagging.",
        "stock": 40,
        "deliveryDays": 2,
        "tags": ["home & kitchen", "iron", "dry iron", "havells", "clothing care", "budget", "under 1000"],
        "reviewSummary": {
            "pros": ["Heats up in under 30 seconds", "Non-stick base prevents scorches on synthetics", "Lightweight and easy on wrists"],
            "cons": ["Dry iron only — no steam burst function", "Cord length is average (1.5 meters)", "Dial numbers are subtle"],
            "verdict": "Inexpensive, quick-heating everyday iron for hassle-free daily office wear.",
            "sentiment": {"positive": 88, "neutral": 8, "negative": 4}
        }
    },

    # --- FASHION ---
    {
        "id": "fas-01",
        "slug": "levis-men-511-slim-fit-jeans",
        "title": "Levi's Men's 511 Slim Fit Stretch Denim Jeans (Dark Indigo)",
        "brand": "Levi's",
        "category": "Fashion",
        "price": 2499,
        "mrp": 4599,
        "rating": 4.3,
        "reviewCount": 14200,
        "images": [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Iconic 511 slim silhouette cut close through the thigh with a narrow leg opening",
            "Cotton-elastane stretch blend ensures flexible comfort when sitting or walking",
            "Classic 5-pocket styling with signature arcuate stitching on rear pockets",
            "Zip fly with sturdy metal shank button closure",
            "Pre-shrunk dark wash pairs seamlessly with blazers or casual t-shirts"
        ],
        "description": "A modern classic. Not too tight, not too loose. The Levi's 511 combines stretch comfort with authentic denim durability for smart-casual wardrobes.",
        "stock": 25,
        "deliveryDays": 2,
        "tags": ["fashion", "clothing", "jeans", "denim", "levis", "menswear", "casual"],
        "reviewSummary": {
            "pros": ["Flattering slim taper that fits most body frames", "Enough stretch to stay comfortable on long flights", "Deep indigo wash holds up after washes"],
            "cons": ["Sizing runs slightly snug on athletic thighs", "Initial wash bleeds excess dye (wash inside out)", "Length might require slight hemming for shorter heights"],
            "verdict": "The timeless slim jean that transitions effortlessly from office Fridays to weekend outings.",
            "sentiment": {"positive": 87, "neutral": 8, "negative": 5}
        }
    },
    {
        "id": "fas-02",
        "slug": "bata-mens-leather-formal-oxford-shoes",
        "title": "Bata Men's Genuine Leather Formal Lace-Up Oxford Shoes (Tan)",
        "brand": "Bata",
        "category": "Fashion",
        "price": 1999,
        "mrp": 3299,
        "rating": 4.1,
        "reviewCount": 8900,
        "images": [
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Supple genuine leather upper with refined burnished toe cap detailing",
            "Cushioned memory foam insole relieves heel pressure during long meetings",
            "Slip-resistant TPR outsole provides stable traction on marble and tile floors",
            "Breathable inner lining minimizes foot odor on humid workdays",
            "Classic 5-eyelet lace-up structure for formal suits and trousers"
        ],
        "description": "Distinguished craftsmanship tailored for the Indian corporate professional. Premium tan leather burnishing that pairs brilliantly with navy and grey formal trousers.",
        "stock": 18,
        "deliveryDays": 3,
        "tags": ["fashion", "shoes", "formal", "leather", "bata", "menswear", "office"],
        "reviewSummary": {
            "pros": ["High-end burnished tan aesthetics at an affordable price", "Comfortable footbed cushioning", "Grippy sole doesn't slip on slick office tiles"],
            "cons": ["Leather needs 2-3 days of wear to break in comfortably", "Requires occasional tan shoe cream to maintain shine", "Fits narrower at the toe cap"],
            "verdict": "Top value formal leather shoe for interviews, offices, and weddings.",
            "sentiment": {"positive": 84, "neutral": 10, "negative": 6}
        }
    },
    {
        "id": "fas-03",
        "slug": "fastrack-reflex-play-smartwatch-amoled",
        "title": "Fastrack Reflex Play 1.3-inch AMOLED Smartwatch with BT Calling",
        "brand": "Fastrack",
        "category": "Fashion",
        "price": 1999,
        "mrp": 7995,
        "rating": 4.1,
        "reviewCount": 11300,
        "images": [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1510017803434-a899398421b3?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Vibrant 1.3-inch AMOLED display with Always-On-Display (AOD) support",
            "SingleSync Bluetooth calling with built-in mic, dial pad, and speaker",
            "Complete health suite: 24x7 Heart Rate, SpO2 blood oxygen, and Sleep Tracker",
            "100+ Sports Modes with IP68 water and dust resistance",
            "Up to 7 days battery life on regular use (2 days with heavy BT calling)"
        ],
        "description": "Style meets smarts on your wrist. Vivid circular AMOLED screen, crisp Bluetooth wrist calling, and all the daily wellness tracking you need.",
        "stock": 31,
        "deliveryDays": 1,
        "tags": ["fashion", "smartwatch", "watch", "fastrack", "fitness", "bluetooth", "under 2000"],
        "reviewSummary": {
            "pros": ["Rich AMOLED black levels and vibrant watch faces", "Bluetooth calling audio is surprisingly clear indoors", "Sleek circular dial complements casual and athletic outfits"],
            "cons": ["Companion app syncs slightly slower on iOS", "AOD mode reduces battery life to ~48 hours", "Step counter is mildly generous on bumpy bike rides"],
            "verdict": "A stylish, punchy AMOLED smartwatch from a trusted youth brand under ₹2,000.",
            "sentiment": {"positive": 83, "neutral": 10, "negative": 7}
        }
    },
    {
        "id": "fas-04",
        "slug": "wildcraft-45l-riri-hiking-backpack",
        "title": "Wildcraft 45L Cargo Riri Outdoor Hiking Backpack (Olive Green)",
        "brand": "Wildcraft",
        "category": "Fashion",
        "price": 2199,
        "mrp": 3999,
        "rating": 4.4,
        "reviewCount": 9700,
        "images": [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1546938576-6e6a64f317cc?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Heavy-duty water-resistant nylon ripstop fabric with reinforced stress points",
            "Ergonomic padded back system with airflow ventilation channel",
            "Sternum chest strap and padded waist belt distribute heavy loads evenly",
            "Top-loading main compartment with quick-access hood pocket and side mesh bottle holders",
            "Integrated trekking pole loops and side compression straps"
        ],
        "description": "Ready for Himalayan treks or weekend road trips. Built with tear-resistant fabric and ergonomic weight distribution straps that protect your shoulders on long trails.",
        "stock": 20,
        "deliveryDays": 2,
        "tags": ["fashion", "backpack", "travel", "wildcraft", "hiking", "outdoor", "fitness"],
        "reviewSummary": {
            "pros": ["Exceptional stitching and tear resistance", "Shoulder padding prevents soreness with 12kg loads", "Water-resistant fabric handles drizzle easily"],
            "cons": ["Rain cover is sold separately", "No dedicated padded laptop sleeve (designed primarily for trekking gear)", "Zippers are stiff when brand new"],
            "verdict": "The rugged 45L travel workhorse for weekend trekkers and campers.",
            "sentiment": {"positive": 89, "neutral": 7, "negative": 4}
        }
    },
    {
        "id": "fas-05",
        "slug": "titan-karishma-analog-champagne-dial-watch",
        "title": "Titan Karishma Analog Champagne Dial Men's Watch (Gold & Silver Strap)",
        "brand": "Titan",
        "category": "Fashion",
        "price": 2795,
        "mrp": 3495,
        "rating": 4.5,
        "reviewCount": 26800,
        "images": [
            "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Elegant champagne gold dial with classic Roman numeral markers",
            "Two-tone stainless steel bracelet (silver and gold) with fold-over clasp",
            "High-precision Japanese quartz movement for reliable timekeeping",
            "Water resistance up to 30 meters (3 ATM) for rain and splash safety",
            "Integrated date window at the 3 o'clock position"
        ],
        "description": "Timeless Indian formal elegance. The Titan Karishma is an enduring gift for festivals, weddings, and milestones, combining heritage craftsmanship with subtle luxury.",
        "stock": 22,
        "deliveryDays": 1,
        "tags": ["fashion", "watch", "analog", "titan", "menswear", "gift", "classic"],
        "reviewSummary": {
            "pros": ["Understated aristocratic look that matches ethnic and formal wear", "Proven Titan movement accuracy and 2-year warranty", "Solid metallic link weight without feeling heavy"],
            "cons": ["Mineral glass can scratch if bumped against stone", "Link adjustments require a watch repair toolkit", "No illumination for reading time in pitch dark"],
            "verdict": "The quintessential traditional gift watch that never goes out of style.",
            "sentiment": {"positive": 92, "neutral": 5, "negative": 3}
        }
    },
    {
        "id": "fas-06",
        "slug": "ray-ban-polarized-wayfarer-sunglasses",
        "title": "Ray-Ban Polarized Classic Wayfarer Sunglasses (Matte Black Frame)",
        "brand": "Ray-Ban",
        "category": "Fashion",
        "price": 7590,
        "mrp": 9590,
        "rating": 4.5,
        "reviewCount": 4900,
        "images": [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "100% UV400 protection with polarized green classic G-15 lenses",
            "Eliminates blinding reflective glare while driving, fishing, or walking outdoors",
            "Durable propionate frame material engineered for lightweight, all-day comfort",
            "Signature silver arrow rivets and metal Ray-Ban temple logos",
            "Includes protective leather case and microfiber cleaning cloth"
        ],
        "description": "The most recognizable sunglasses silhouette in history. Polarized lenses eliminate intense Indian summer glare during highway drives and coastal vacations.",
        "stock": 14,
        "deliveryDays": 2,
        "tags": ["fashion", "sunglasses", "ray-ban", "polarized", "eyewear", "summer"],
        "reviewSummary": {
            "pros": ["Exceptional optical clarity and glare elimination", "Flattering silhouette on round and oval face shapes", "Solid hinge construction survives years of use"],
            "cons": ["Polarized lenses make some car HUD displays harder to read", "Matte finish shows finger oil smudges", "Premium pricing tier"],
            "verdict": "The quintessential investment pair of sunglasses for driving and holidays.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },

    # --- BOOKS ---
    {
        "id": "bok-01",
        "slug": "atomic-habits-james-clear-paperback",
        "title": "Atomic Habits: An Easy & Proven Way to Build Good Habits by James Clear",
        "brand": "Penguin Random House",
        "category": "Books",
        "price": 499,
        "mrp": 799,
        "rating": 4.7,
        "reviewCount": 89400,
        "images": [
            "/products/bok-01.jpg"
],
        "bullets": [
            "Over 15 million copies sold globally; #1 New York Times Bestseller",
            "Actionable 4-step framework: Make it Obvious, Attractive, Easy, and Satisfying",
            "Explains the science of neurobiology and habit loops in clear, accessible prose",
            "Real-world case studies spanning Olympic athletes, artists, and business CEOs",
            "Includes habit tracker templates and practical implementation guides"
        ],
        "description": "The definitive modern manual on behavioral change. Learn how microscopic 1% daily changes compound into monumental transformations in health, productivity, and wealth.",
        "stock": 60,
        "deliveryDays": 1,
        "tags": ["books", "self-help", "productivity", "psychology", "bestseller", "habits"],
        "reviewSummary": {
            "pros": ["Pragmatic framework with zero pseudo-science fluff", "Compelling writing style that keeps you hooked from page one", "Changes how you organize your desk and daily routines"],
            "cons": ["Some concepts reinforce classic habit literature (Charles Duhigg)", "Paper quality on budget paperback printings is moderate", "Requires personal discipline to apply"],
            "verdict": "Required reading for anyone striving to conquer procrastination and upgrade daily discipline.",
            "sentiment": {"positive": 96, "neutral": 3, "negative": 1}
        }
    },
    {
        "id": "bok-02",
        "slug": "the-psychology-of-money-morgan-housel",
        "title": "The Psychology of Money: Timeless Lessons on Wealth, Greed & Happiness",
        "brand": "Jaico Publishing House",
        "category": "Books",
        "price": 349,
        "mrp": 499,
        "rating": 4.6,
        "reviewCount": 68200,
        "images": [
            "/products/bok-02.jpg"
],
        "bullets": [
            "19 short stories exploring the strange ways people think about money",
            "Teaches why financial success is about behavior and ego rather than spreadsheet math",
            "Explains the immense hidden power of compounding, frugality, and peace of mind",
            "Translated into over 50 languages with multi-million copies sold worldwide",
            "Crisp 250-page reading format with memorable analogies"
        ],
        "description": "Investing and wealth isn't about intelligence; it is about how you behave. Morgan Housel shares 19 invaluable insights into greed, risk, patience, and true financial freedom.",
        "stock": 55,
        "deliveryDays": 1,
        "tags": ["books", "finance", "investing", "wealth", "psychology", "bestseller"],
        "reviewSummary": {
            "pros": ["Simplifies investing psychology without technical jargon", "Engaging storytelling makes it easy to read in one weekend", "Resets your mindset around savings and ego spending"],
            "cons": ["Focuses on long-term philosophy rather than specific stock picking tactics", "Some concepts are repeated across chapters", "Few charts/tables"],
            "verdict": "The best beginner personal finance book in the world.",
            "sentiment": {"positive": 95, "neutral": 3, "negative": 2}
        }
    },
    {
        "id": "bok-03",
        "slug": "sapiens-a-brief-history-of-humankind-yuval-noah-harari",
        "title": "Sapiens: A Brief History of Humankind by Yuval Noah Harari",
        "brand": "Vintage",
        "category": "Books",
        "price": 499,
        "mrp": 699,
        "rating": 4.6,
        "reviewCount": 42500,
        "images": [
            "/products/bok-03.jpg"
],
        "bullets": [
            "Explores how an insignificant ape became the master of planet Earth",
            "Covers the Cognitive, Agricultural, and Scientific Revolutions in riveting detail",
            "Reveals how shared fictions (money, religion, corporations) unite millions of strangers",
            "Praised by Bill Gates, Barack Obama, and leading world historians",
            "Over 400 pages of mind-bending anthropological perspective"
        ],
        "description": "One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one: Homo sapiens. How did we conquer the world?",
        "stock": 35,
        "deliveryDays": 2,
        "tags": ["books", "history", "anthropology", "science", "philosophy", "bestseller"],
        "reviewSummary": {
            "pros": ["Profound paradigm shift in how you view human society and money", "Sparkling storytelling that bridges biology and history", "Unputdownable narrative arc"],
            "cons": ["Sweeping generalizations that some historians debate", "Heavy reading pace for non-fiction beginners", "Book binding is thick"],
            "verdict": "A modern masterpiece of non-fiction that permanently reframes human history.",
            "sentiment": {"positive": 93, "neutral": 5, "negative": 2}
        }
    },
    {
        "id": "bok-04",
        "slug": "deep-work-cal-newport",
        "title": "Deep Work: Rules for Focused Success in a Distracted World by Cal Newport",
        "brand": "Grand Central Publishing",
        "category": "Books",
        "price": 399,
        "mrp": 599,
        "rating": 4.5,
        "reviewCount": 23400,
        "images": [
            "/products/bok-04.jpg"
],
        "bullets": [
            "Identifies deep, distraction-free concentration as a superpower in the modern economy",
            "Provides a 4-rule strategy to eliminate digital noise and shallow busywork",
            "Teaches programmers, writers, and knowledge workers how to produce high-value output",
            "Covers time-blocking rituals, attention residue, and digital minimalism tactics",
            "Essential handbook for remote developers and creators"
        ],
        "description": "In an age of endless notifications, shallow multitasking is killing our ability to produce meaningful work. Computer science professor Cal Newport outlines practical rules to master intense focus.",
        "stock": 28,
        "deliveryDays": 1,
        "tags": ["books", "productivity", "focus", "coding", "career", "work"],
        "reviewSummary": {
            "pros": ["Immediately actionable time-blocking principles", "Exposes the toxic illusion of shallow multitasking", "Inspiring case studies of prolific historical thinkers"],
            "cons": ["Can feel rigorous if your job requires instant Slack responses", "Academic tone in initial chapters", "Not everyone can isolate themselves completely"],
            "verdict": "The ultimate antidote to modern digital distraction for knowledge workers.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },
    {
        "id": "bok-05",
        "slug": "ikigai-the-japanese-secret-to-a-long-and-happy-life",
        "title": "Ikigai: The Japanese Secret to a Long and Happy Life (Hardcover)",
        "brand": "Penguin Life",
        "category": "Books",
        "price": 389,
        "mrp": 599,
        "rating": 4.5,
        "reviewCount": 58900,
        "images": [
            "/products/bok-05.jpg"
],
        "bullets": [
            "Uncovers the lifestyle habits of the world's longest-living centenarians in Okinawa",
            "Explains the intersection of Passion, Mission, Vocation, and Profession",
            "Gentle guide to anti-aging nutrition, moderate daily movement, and community bonds",
            "Beautiful pastel hardcover edition with silver foil embossing",
            "Calming, therapeutic reading experience"
        ],
        "description": "Find your reason for being. Unearth the wisdom of the world's highest concentration of centenarians and cultivate a purposeful, stress-resilient lifestyle.",
        "stock": 44,
        "deliveryDays": 1,
        "tags": ["books", "wellness", "philosophy", "lifestyle", "hardcover", "bestseller"],
        "reviewSummary": {
            "pros": ["Warm, peaceful writing that calms anxiety", "Aesthetic hardcover makes a wonderful thoughtful gift", "Simple reminders about slow living and wholesome diets"],
            "cons": ["Light on deep scientific clinical data", "Quick read (under 2 hours)", "Some concepts feel repetitive if you've studied Blue Zones"],
            "verdict": "A soothing, heart-warming book that encourages intentional, joyful living.",
            "sentiment": {"positive": 90, "neutral": 7, "negative": 3}
        }
    },
    {
        "id": "bok-06",
        "slug": "r-k-narayan-malgudi-days-paperback",
        "title": "Malgudi Days by R.K. Narayan (Classic Edition)",
        "brand": "Indian Thought Publications",
        "category": "Books",
        "price": 220,
        "mrp": 295,
        "rating": 4.6,
        "reviewCount": 18200,
        "images": [
            "/products/bok-06.jpg"
],
        "bullets": [
            "32 timeless short stories set in the enchanting fictional South Indian town of Malgudi",
            "Includes classic tales of Swami and his friends, astrologers, postmen, and snake charmers",
            "Illustrated with evocative sketch art by the legendary R.K. Laxman",
            "Gentle humor and acute observation of human nature in mid-century India",
            "Celebrated Indian English literary heritage"
        ],
        "description": "Relive the timeless charm, innocence, and warmth of Indian village life. Packed with R.K. Narayan's gentle wit and R.K. Laxman's unforgettable illustrations.",
        "stock": 30,
        "deliveryDays": 2,
        "tags": ["books", "fiction", "indian literature", "classic", "stories", "nostalgia"],
        "reviewSummary": {
            "pros": ["Pure nostalgic storytelling that evokes childhood warmth", "Illustrations by R.K. Laxman add immense charm", "Easy, relaxing bedtime reading for all ages"],
            "cons": ["Vintage pacing from an earlier era", "Paperback print font is slightly compact", "Not a suspense thriller"],
            "verdict": "An immortal literary treasure that belongs in every Indian home library.",
            "sentiment": {"positive": 95, "neutral": 4, "negative": 1}
        }
    },

    # --- FITNESS ---
    {
        "id": "fit-01",
        "slug": "boldfit-heavy-resistance-bands-set-of-5",
        "title": "Boldfit Heavy Resistance Loop Bands Set for Gym & Home Workout (Set of 5)",
        "brand": "Boldfit",
        "category": "Fitness",
        "price": 499,
        "mrp": 999,
        "rating": 4.3,
        "reviewCount": 24900,
        "images": [
            "/products/fit-01.jpg"
],
        "bullets": [
            "5 color-coded resistance levels: X-Light (5 lbs) to X-Heavy (30 lbs)",
            "100% natural eco-friendly Malaysian latex with snap-resistant elasticity",
            "Ideal for glute activation, squats, shoulder rehab, pull-up assist, and yoga stretches",
            "Includes compact drawstring carry pouch for workouts while traveling",
            "Non-slip skin-friendly texture that won't pinch skin"
        ],
        "description": "Turn any hotel room or living room into a functional gym. 5 varying resistance bands allow graduated overload for legs, glutes, arms, and back warmups.",
        "stock": 50,
        "deliveryDays": 1,
        "tags": ["fitness", "gym", "workout", "resistance bands", "home gym", "boldfit", "budget", "under 1000"],
        "reviewSummary": {
            "pros": ["Great progressive tension steps from light to extra-heavy", "Takes up zero luggage space when traveling", "Durable latex doesn't snap under max stretch"],
            "cons": ["Mild latex scent on day one (airs out quickly)", "Can roll up on loose cotton trackpants during deep squats", "Requires talcum powder storage in humid monsoon"],
            "verdict": "The best value sub-₹500 home workout accessory for warmups and lower body toning.",
            "sentiment": {"positive": 88, "neutral": 8, "negative": 4}
        }
    },
    {
        "id": "fit-02",
        "slug": "strauss-anti-burst-gym-ball-with-foot-pump-65cm",
        "title": "Strauss Anti-Burst Exercise Gym Swiss Ball with Quick Foot Pump (65 cm)",
        "brand": "Strauss",
        "category": "Fitness",
        "price": 899,
        "mrp": 1699,
        "rating": 4.2,
        "reviewCount": 11800,
        "images": [
            "/products/fit-02.jpg"
],
        "bullets": [
            "Heavy-duty honeycomb anti-burst PVC rated up to 200kg weight capacity",
            "Non-slip ribbed matte texture provides secure grip during planks and sit-ups",
            "Improves core strength, balance, posture alignment, and lumbar rehabilitation",
            "Includes high-volume foot pump and spare inflation valve plugs",
            "Also functions as an active ergonomic desk chair to reduce lower back slouching"
        ],
        "description": "Strengthen your core and relieve desk-induced back strain. The thick honeycomb PVC deflates slowly and safely even if punctured by a sharp object.",
        "stock": 25,
        "deliveryDays": 2,
        "tags": ["fitness", "gym", "swiss ball", "yoga", "core", "rehab", "home gym", "under 1000"],
        "reviewSummary": {
            "pros": ["Superb anti-burst thick rubber shell", "Doubles as an active posture-correcting chair for desk work", "Included foot pump makes initial inflation quick"],
            "cons": ["Takes up physical floor space in small bedrooms", "Needs top-up air every 4-6 weeks", "65cm fits 5'4\" to 5'10\" best (taller people need 75cm)"],
            "verdict": "A versatile core builder and spine-friendly desk seating alternative.",
            "sentiment": {"positive": 85, "neutral": 9, "negative": 6}
        }
    },
    {
        "id": "fit-03",
        "slug": "cockatoo-csh-01-rubber-coated-hex-dumbbell-pair-5kg",
        "title": "Cockatoo CSH-01 Rubber Coated Solid Cast Iron Hex Dumbbell Pair (5kg x 2)",
        "brand": "Cockatoo",
        "category": "Fitness",
        "price": 1899,
        "mrp": 3200,
        "rating": 4.5,
        "reviewCount": 8900,
        "images": [
            "/products/fit-03.jpg"
],
        "bullets": [
            "High-grade solid cast iron core encased in heavy-duty natural rubber coating",
            "Hexagonal anti-roll design prevents dumbbells from rolling across tiles during sets",
            "Ergonomic knurled chrome-plated steel handle provides maximum grip security",
            "Protects tiled home floors and reduces drop noise during intense training",
            "Perfect for curls, shoulder presses, lunges, and functional HIIT circuits"
        ],
        "description": "Commercial gym quality for your living room. The thick rubber hex coating protects tiles from chipping while the knurled chrome grip keeps hands locked during sweat-drenched sets.",
        "stock": 19,
        "deliveryDays": 3,
        "tags": ["fitness", "gym", "dumbbells", "weights", "strength", "home gym", "workout", "under 2000"],
        "reviewSummary": {
            "pros": ["True commercial gym feel and balance", "Hexagonal ends stay put without rolling into walls", "Rubber encasing prevents chipped floor tiles"],
            "cons": ["Rubber requires a quick wipe down on delivery", "Heavy shipping packaging", "Fixed weight means you will need heavier pairs as you progress"],
            "verdict": "The best quality entry dumbbells for building home strength.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },
    {
        "id": "fit-04",
        "slug": "optimum-nutrition-gold-standard-100-whey-protein-1kg",
        "title": "Optimum Nutrition (ON) Gold Standard 100% Whey Protein Powder (1kg, Double Rich Chocolate)",
        "brand": "Optimum Nutrition",
        "category": "Fitness",
        "price": 3299,
        "mrp": 4299,
        "rating": 4.5,
        "reviewCount": 48200,
        "images": [
            "/products/fit-04.jpg"
],
        "bullets": [
            "24g of blended protein per scoop (Whey Protein Isolate as primary ingredient)",
            "5.5g of naturally occurring BCAAs and 4g of Glutamine per serving for rapid muscle recovery",
            "Informed-Choice certified and banned substance tested for athletic safety",
            "Mixes instantly with a spoon or shaker bottle with zero clumping",
            "Authentic product with TruSeal scratch verification code on tub lid"
        ],
        "description": "The world's most awarded whey protein. Formulated with ultra-filtered whey isolate for fast absorption, minimal sugar, and a smooth Double Rich Chocolate taste.",
        "stock": 35,
        "deliveryDays": 1,
        "tags": ["fitness", "nutrition", "whey protein", "supplements", "muscle", "gym", "on"],
        "reviewSummary": {
            "pros": ["Exceptional blendability with cold water or milk", "Authentic rich cocoa flavor that isn't sickly sweet", "Zero digestive bloating or heaviness"],
            "cons": ["Pricier per scoop than domestic entry brands", "Scoop often buries itself during transit", "Counterfeits exist on unverified marketplaces (ensure TruSeal scan)"],
            "verdict": "The gold standard whey protein for pure recovery and digestion.",
            "sentiment": {"positive": 92, "neutral": 5, "negative": 3}
        }
    },
    {
        "id": "fit-05",
        "slug": "boldfit-pro-grip-yoga-mat-6mm",
        "title": "Boldfit Pro Grip TPE Yoga Mat with Alignment Marks (6mm Thick, Teal)",
        "brand": "Boldfit",
        "category": "Fitness",
        "price": 999,
        "mrp": 1999,
        "rating": 4.4,
        "reviewCount": 16700,
        "images": [
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "High-density 6mm eco-friendly TPE foam cushions knees, elbows, and hips on hard floors",
            "Laser-engraved body alignment lines help guide proper hand and foot positioning",
            "Dual-sided non-slip texture keeps mat glued to marble tiles during downward dogs",
            "Sweat-resistant closed-cell surface wipes clean with a damp cloth",
            "Includes lightweight carry strap for traveling to yoga studios"
        ],
        "description": "Protect your joints during morning surya namaskars and Pilates. TPE dual-side traction prevents sweaty palms from sliding out of alignment.",
        "stock": 40,
        "deliveryDays": 1,
        "tags": ["fitness", "yoga", "mat", "exercise", "boldfit", "home gym", "under 1000"],
        "reviewSummary": {
            "pros": ["6mm thickness is the sweet spot for joint cushion without balance wobbling", "Alignment lines are super useful for home practitioners", "Odorless eco-TPE material"],
            "cons": ["Can retain indentations if heavy metal weights are dropped on it", "Light colors show dusty footprint marks over time", "Rolls tightly initially"],
            "verdict": "The top-rated yoga mat for home workouts and mobility drills.",
            "sentiment": {"positive": 89, "neutral": 8, "negative": 3}
        }
    },
    {
        "id": "fit-06",
        "slug": "beatxp-bolt-deep-tissue-massage-gun",
        "title": "beatXP Bolt Deep Tissue Percussion Massage Gun with 4 Pro Heads",
        "brand": "beatXP",
        "category": "Fitness",
        "price": 1499,
        "mrp": 3999,
        "rating": 4.2,
        "reviewCount": 13400,
        "images": [
            ""
],
        "bullets": [
            "Powerful high-torque brushless motor delivers deep percussion up to 3200 RPM",
            "6 adjustable speed gears to tailor relief from gentle warmup to deep muscle knots",
            "Includes 4 interchangeable massage heads (Round, Bullet, Flat, Fork)",
            "QuietWave acoustic damping keeps motor noise under 45dB",
            "Type-C fast charging with 4000mAh lithium battery lasting up to 5 hours"
        ],
        "description": "Relieve post-workout soreness and tight neck muscles. Percussion therapy increases blood flow to sore muscle fibers, breaking up stubborn knots in minutes.",
        "stock": 26,
        "deliveryDays": 2,
        "tags": ["fitness", "recovery", "massage gun", "gym", "wellness", "pain relief", "under 2000"],
        "reviewSummary": {
            "pros": ["Deep percussive punch relaxes tight calf and trap knots", "USB-C charging uses common phone adapters", "Compact ergonomic T-shape grip"],
            "cons": ["Stalls if pressed with excessive body weight", "Plastic case lacks luxury feel", "Battery drains faster on gear 6"],
            "verdict": "Invaluable post-workout recovery gadget for runners and gym lifters under ₹1,500.",
            "sentiment": {"positive": 86, "neutral": 9, "negative": 5}
        }
    },

    # --- BEAUTY ---
    {
        "id": "bt-01",
        "slug": "minimalist-10-niacinamide-face-serum-30ml",
        "title": "Minimalist 10% Niacinamide Face Serum with Zinc for Blemishes & Oil Control (30ml)",
        "brand": "Minimalist",
        "category": "Beauty",
        "price": 569,
        "mrp": 599,
        "rating": 4.4,
        "reviewCount": 38400,
        "images": [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Pure 10% Niacinamide (Vitamin B3) clinically proven to fade acne spots and scars",
            "Infused with 1% Zinc PCA to balance excess sebum and reduce pore inflammation",
            "Formulated with soothing Aloe Vera water base instead of plain water",
            "Fragrance-free, essential oil-free, non-comedogenic, and hypoallergenic",
            "Lightweight watery consistency absorbs completely in seconds without stickiness"
        ],
        "description": "An Indian skincare revolution. Clean, science-backed active formulation that tackles acne marks, enlarged pores, and midday T-zone oiliness with zero fragrance.",
        "stock": 55,
        "deliveryDays": 1,
        "tags": ["beauty", "skincare", "serum", "niacinamide", "minimalist", "acne", "oil control"],
        "reviewSummary": {
            "pros": ["Noticeably balances oily T-zones within 10 days", "Lightens dark acne post-blemish spots", "Absorbs without leaving a greasy sheen"],
            "cons": ["High 10% active strength can cause brief purging for sensitive newcomers", "Glass dropper bottle requires careful bathroom handling", "Takes 4-6 weeks for deep pigmentation"],
            "verdict": "The undisputed #1 science-backed serum in India for oily and acne-prone skin.",
            "sentiment": {"positive": 91, "neutral": 6, "negative": 3}
        }
    },
    {
        "id": "bt-02",
        "slug": "dot-and-key-vitamin-c-e-super-bright-sunscreen-spf50",
        "title": "Dot & Key Vitamin C + E Super Bright Sunscreen SPF 50+ PA++++ (50g)",
        "brand": "Dot & Key",
        "category": "Beauty",
        "price": 425,
        "mrp": 495,
        "rating": 4.5,
        "reviewCount": 29100,
        "images": [
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Broad spectrum SPF 50+ and maximum PA++++ protection against UVA, UVB & Blue Light",
            "Water-light fluid texture with ZERO white cast on brown skin tones",
            "Enriched with Sicilian Blood Orange Vitamin C to boost natural glow",
            "Infused with Vitamin E to strengthen skin barrier and combat photoaging",
            "Non-sticky, quick-absorbing, and sits seamlessly under makeup"
        ],
        "description": "Say goodbye to chalky, greasy sunscreens. Dot & Key's water-fluid sunscreen sinks right in without a hint of white cast while protecting against harsh tropical sun rays.",
        "stock": 48,
        "deliveryDays": 1,
        "tags": ["beauty", "sunscreen", "skincare", "spf50", "dot & key", "vitamin c", "glow"],
        "reviewSummary": {
            "pros": ["Absolutely zero white cast on deeper Indian skin tones", "Water-light texture feels like a hydrating gel", "Doesn't sting eyes or cause sweat breakout"],
            "cons": ["50g tube runs out in 3-4 weeks with daily reapplication", "Slight citrus aroma from natural extracts", "Needs reapplication after heavy outdoor sweating"],
            "verdict": "The best everyday invisible sunscreen for Indian weather and skin tones.",
            "sentiment": {"positive": 93, "neutral": 5, "negative": 2}
        }
    },
    {
        "id": "bt-03",
        "slug": "cetaphil-gentle-skin-cleanser-250ml",
        "title": "Cetaphil Gentle Skin Cleanser for Dry to Normal Sensitive Skin (250ml)",
        "brand": "Cetaphil",
        "category": "Beauty",
        "price": 549,
        "mrp": 635,
        "rating": 4.6,
        "reviewCount": 54200,
        "images": [
            ""
],
        "bullets": [
            "Dermatologist-recommended non-foaming formula cleanses without stripping natural moisture",
            "Enriched with Niacinamide, Vitamin B5 (Panthenol), and hydrating Glycerin",
            "Defends against 5 signs of skin sensitivity (Dryness, Irritation, Roughness, Tightness, Weakened Barrier)",
            "Soap-free, fragrance-free, paraben-free, and hypoallergenic",
            "Can be used with or without water for gentle cleansing"
        ],
        "description": "The gold standard dermatologist face wash. Gently washes away surface dirt, SPF, and impurities while preserving your skin's protective lipid barrier.",
        "stock": 60,
        "deliveryDays": 1,
        "tags": ["beauty", "cleanser", "face wash", "cetaphil", "sensitive skin", "skincare"],
        "reviewSummary": {
            "pros": ["Never leaves skin feeling tight or dry after washing", "Gentle enough for inflamed eczema or active acne", "Fragrance-free formula suited for all ages"],
            "cons": ["Does not foam (requires adjusting expectations)", "Heavy waterproof mascara requires an oil cleanser first", "Pump lock mechanism can be finicky during travel"],
            "verdict": "The universally safe, barrier-protecting daily cleanser recommended by skin specialists.",
            "sentiment": {"positive": 95, "neutral": 3, "negative": 2}
        }
    },
    {
        "id": "bt-04",
        "slug": "philips-multigroom-series-3000-trimmer",
        "title": "Philips Multi Grooming Kit Series 3000 (9-in-1 Face, Hair & Body Trimmer)",
        "brand": "Philips",
        "category": "Beauty",
        "price": 1799,
        "mrp": 2395,
        "rating": 4.4,
        "reviewCount": 38100,
        "images": [
            ""
],
        "bullets": [
            "Self-sharpening stainless steel blades remain as sharp as day one without blade oiling",
            "9 versatile styling tools for beard grooming, hair clipping, nose, and ear trimming",
            "Up to 60 minutes of cordless run time on a single charge",
            "Rinseable attachments for hygienic and quick cleanup under running tap water",
            "Sturdy impact-resistant storage pouch included"
        ],
        "description": "Complete head-to-toe grooming. Self-sharpening steel blades craft precise beard lines, clean necklines, and comfortably trim unwanted nose hair.",
        "stock": 35,
        "deliveryDays": 1,
        "tags": ["beauty", "grooming", "trimmer", "philips", "shaving", "menswear", "under 2000"],
        "reviewSummary": {
            "pros": ["Self-sharpening blades never snag or tug coarse beard hair", "9 attachments cover beard, nose hair, and body grooming", "Washable heads make cleanup effortless"],
            "cons": ["16-hour charge time for 60-minute runtime (NiMH battery)", "No battery percentage indicator light", "Body groomer guard takes practice"],
            "verdict": "The most durable and versatile grooming kit under ₹2,000.",
            "sentiment": {"positive": 89, "neutral": 7, "negative": 4}
        }
    },
    {
        "id": "bt-05",
        "slug": "maybelline-new-york-super-stay-matte-ink-lipstick",
        "title": "Maybelline New York Super Stay Matte Ink Liquid Lipstick (16H Wear, Ruler)",
        "brand": "Maybelline",
        "category": "Beauty",
        "price": 549,
        "mrp": 699,
        "rating": 4.4,
        "reviewCount": 46200,
        "images": [
            "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800&auto=format&fit=crop&q=80"
],
        "bullets": [
            "Up to 16 hours of transfer-proof, smudge-resistant saturated matte color",
            "Unique arrow applicator tip allows precision line definition in a single swipe",
            "Waterproof formula withstands meals, coffee, and daily commuting",
            "Intense pigment payoff designed to complement rich Indian skin undertones",
            "Non-drying liquid ink formula locks on without feathering"
        ],
        "description": "Put it on at 8 AM, forget about touch-ups until bedtime. High-impact matte color that refuses to smudge or transfer onto cups and masks.",
        "stock": 42,
        "deliveryDays": 1,
        "tags": ["beauty", "makeup", "lipstick", "maybelline", "cosmetics", "matte"],
        "reviewSummary": {
            "pros": ["Incredible 16-hour transfer-proof staying power through meals", "Vibrant pigmentation with full opacity in one glide", "Precise arrow wand makes application easy"],
            "cons": ["Takes 3-5 minutes to dry down from tacky to matte", "Requires an oil-based makeup remover to take off at night", "Can feel slightly drying without pre-lip balm"],
            "verdict": "The undisputed transfer-proof liquid lipstick benchmark.",
            "sentiment": {"positive": 90, "neutral": 6, "negative": 4}
        }
    },
    {
        "id": "bt-06",
        "slug": "plum-green-tea-oil-free-moisturizer-50ml",
        "title": "Plum Green Tea Oil-Free Moisturizer with Niacinamide & Hyaluronic Acid (50ml)",
        "brand": "Plum",
        "category": "Beauty",
        "price": 399,
        "mrp": 470,
        "rating": 4.3,
        "reviewCount": 21800,
        "images": [
            ""
],
        "bullets": [
            "100% oil-free, non-comedogenic lightweight daily gel-cream hydration",
            "Organic green tea extracts combat active acne and calm redness",
            "Niacinamide fades acne marks while Hyaluronic Acid plumps moisture reservoirs",
            "100% vegan, cruelty-free, paraben-free, and phthalate-free",
            "Matte non-greasy finish ideal for Indian summers and humidity"
        ],
        "description": "Weightless daily hydration tailored for breakout-prone skin. Green tea polyphenols fight acne bacteria while hyaluronic acid locks in hydration without greasiness.",
        "stock": 38,
        "deliveryDays": 2,
        "tags": ["beauty", "moisturizer", "skincare", "acne", "plum", "vegan", "oil-free"],
        "reviewSummary": {
            "pros": ["Never leaves face feeling sticky or oily in humidity", "Soothes irritated red acne patches", "Works great as a pre-makeup primer base"],
            "cons": ["Not deeply moisturizing enough for severe winter dryness", "Tub jar packaging requires fingers or a spatula", "Mild herbal scent"],
            "verdict": "The go-to oil-free moisturizer for clear, matte skin in humid Indian weather.",
            "sentiment": {"positive": 88, "neutral": 8, "negative": 4}
        }
    }
]

def main():
    final_products = []
    for item in PRODUCTS_RAW:
        # Generate 90-day price history
        item["priceHistory"] = generate_price_history(item["price"])
        final_products.append(item)

    print(f"Generated {len(final_products)} products.")

    # Write src/data/products.ts
    ts_code = "import { Product } from '@/types';\n\nexport const products: Product[] = " + json.dumps(final_products, indent=2) + ";\n"
    with open("src/data/products.ts", "w", encoding="utf-8") as f:
        f.write(ts_code)

    # Write src/data/categories.ts
    categories_data = [
        {
            "name": "Audio",
            "slug": "audio",
            "description": "Wireless earbuds, ANC headphones, and soundbars tuned for clarity.",
            "icon": "Headphones",
            "itemCount": len([p for p in final_products if p["category"] == "Audio"])
        },
        {
            "name": "Electronics",
            "slug": "electronics",
            "description": "High-performance productivity gear, mechanical keyboards, SSDs, and 4K displays.",
            "icon": "Laptop",
            "itemCount": len([p for p in final_products if p["category"] == "Electronics"])
        },
        {
            "name": "Mobiles",
            "slug": "mobiles",
            "description": "5G smartphones, flagship cameras, and ultra-protective armor cases.",
            "icon": "Smartphone",
            "itemCount": len([p for p in final_products if p["category"] == "Mobiles"])
        },
        {
            "name": "Home & Kitchen",
            "slug": "home-kitchen",
            "description": "Rapid air fryers, 900W mixer grinders, and insulated flasks.",
            "icon": "Home",
            "itemCount": len([p for p in final_products if p["category"] == "Home & Kitchen"])
        },
        {
            "name": "Fashion",
            "slug": "fashion",
            "description": "Timeless denim, polarized eyewear, formal leather, and outdoor backpacks.",
            "icon": "Shirt",
            "itemCount": len([p for p in final_products if p["category"] == "Fashion"])
        },
        {
            "name": "Books",
            "slug": "books",
            "description": "Transformative non-fiction, habits, investing psychology, and classic literature.",
            "icon": "BookOpen",
            "itemCount": len([p for p in final_products if p["category"] == "Books"])
        },
        {
            "name": "Fitness",
            "slug": "fitness",
            "description": "Home gym dumbbells, resistance loops, whey protein, and recovery massage guns.",
            "icon": "Dumbbell",
            "itemCount": len([p for p in final_products if p["category"] == "Fitness"])
        },
        {
            "name": "Beauty",
            "slug": "beauty",
            "description": "Clean active serums, invisible SPF 50 sunscreens, and precision groomers.",
            "icon": "Sparkles",
            "itemCount": len([p for p in final_products if p["category"] == "Beauty"])
        }
    ]

    cat_ts = "import { Category } from '@/types';\n\nexport interface CategoryMeta {\n  name: Category;\n  slug: string;\n  description: string;\n  icon: string;\n  itemCount: number;\n}\n\nexport const categories: CategoryMeta[] = " + json.dumps(categories_data, indent=2) + ";\n"
    with open("src/data/categories.ts", "w", encoding="utf-8") as f:
        f.write(cat_ts)

    print("Successfully wrote src/data/products.ts and src/data/categories.ts")

if __name__ == "__main__":
    main()
