import { Category } from '@/types';

export interface CategoryMeta {
  name: Category;
  slug: string;
  description: string;
  icon: string;
  itemCount: number;
}

export const categories: CategoryMeta[] = [
  {
    "name": "Audio",
    "slug": "audio",
    "description": "Wireless earbuds, ANC headphones, and soundbars tuned for clarity.",
    "icon": "Headphones",
    "itemCount": 8
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "description": "High-performance productivity gear, mechanical keyboards, SSDs, and 4K displays.",
    "icon": "Laptop",
    "itemCount": 6
  },
  {
    "name": "Mobiles",
    "slug": "mobiles",
    "description": "5G smartphones, flagship cameras, and ultra-protective armor cases.",
    "icon": "Smartphone",
    "itemCount": 6
  },
  {
    "name": "Home & Kitchen",
    "slug": "home-kitchen",
    "description": "Rapid air fryers, 900W mixer grinders, and insulated flasks.",
    "icon": "Home",
    "itemCount": 6
  },
  {
    "name": "Fashion",
    "slug": "fashion",
    "description": "Timeless denim, polarized eyewear, formal leather, and outdoor backpacks.",
    "icon": "Shirt",
    "itemCount": 6
  },
  {
    "name": "Books",
    "slug": "books",
    "description": "Transformative non-fiction, habits, investing psychology, and classic literature.",
    "icon": "BookOpen",
    "itemCount": 6
  },
  {
    "name": "Fitness",
    "slug": "fitness",
    "description": "Home gym dumbbells, resistance loops, whey protein, and recovery massage guns.",
    "icon": "Dumbbell",
    "itemCount": 6
  },
  {
    "name": "Beauty",
    "slug": "beauty",
    "description": "Clean active serums, invisible SPF 50 sunscreens, and precision groomers.",
    "icon": "Sparkles",
    "itemCount": 6
  }
];
