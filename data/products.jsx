export const products = [
  {
    id: 1,
    name: "Premium Wireless Earbuds",
    price: 129.99,
    description: "High-quality wireless earbuds with noise cancellation, water resistance, and 24-hour battery life.",
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    brand: "SoundCore",
    rating: 4.8,
    stock: 25,
    featured: true,
    colors: ["Black", "White", "Blue"],
    discount: 0,
    tags: ["wireless", "audio", "gadgets"]
  },
  {
    id: 2,
    name: "Smartwatch Pro",
    price: 199.99,
    description: "Advanced smartwatch with health tracking, GPS, and a vibrant OLED display. Compatible with iOS and Android.",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    brand: "TechFit",
    rating: 4.5,
    stock: 18,
    featured: true,
    colors: ["Black", "Silver"],
    discount: 10,
    tags: ["wearable", "fitness", "smartwatch"]
  },
  {
    id: 3,
    name: "Designer Leather Handbag",
    price: 159.99,
    description: "Elegant genuine leather handbag with multiple compartments and adjustable strap. Perfect for any occasion.",
    image: "https://images.pexels.com/photos/5096183/pexels-photo-5096183.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Fashion",
    brand: "LuxStyle",
    rating: 4.7,
    stock: 12,
    featured: false,
    colors: ["Brown", "Black", "Tan"],
    discount: 0,
    tags: ["accessories", "fashion", "leather"]
  },
  {
    id: 4,
    name: "Ultra HD Smart TV - 55\"",
    price: 699.99,
    description: "4K Ultra HD Smart TV with HDR, built-in streaming apps, and voice control. Immerse yourself in stunning clarity.",
    image: "https://images.pexels.com/photos/5552789/pexels-photo-5552789.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    brand: "VisionTech",
    rating: 4.6,
    stock: 8,
    featured: true,
    colors: ["Black"],
    discount: 15,
    tags: ["television", "entertainment", "smart home"]
  },
  {
    id: 5,
    name: "Professional DSLR Camera",
    price: 899.99,
    description: "High-performance DSLR camera with 24.2MP sensor, 4K video recording, and extensive lens compatibility.",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    brand: "PhotoMaster",
    rating: 4.9,
    stock: 5,
    featured: false,
    colors: ["Black"],
    discount: 0,
    tags: ["photography", "camera", "professional"]
  },
  {
    id: 6,
    name: "Premium Coffee Maker",
    price: 149.99,
    description: "Programmable coffee maker with built-in grinder, multiple brewing options, and thermal carafe to keep coffee hot for hours.",
    image: "https://images.pexels.com/photos/6148051/pexels-photo-6148051.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Home",
    brand: "BrewPerfect",
    rating: 4.7,
    stock: 15,
    featured: false,
    colors: ["Silver", "Black"],
    discount: 5,
    tags: ["kitchen", "appliances", "coffee"]
  },
  {
    id: 7,
    name: "Running Shoes",
    price: 129.99,
    description: "Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole. Perfect for daily runs.",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Sports",
    brand: "SpeedRunner",
    rating: 4.6,
    stock: 22,
    featured: true,
    colors: ["Blue/Black", "Red/White", "Gray/Yellow"],
    discount: 0,
    tags: ["shoes", "running", "athletic", "fitness"]
  },
  {
    id: 8,
    name: "Wireless Gaming Headset",
    price: 179.99,
    description: "Premium gaming headset with 7.1 surround sound, noise-canceling microphone, and long-lasting battery life. Compatible with PC, PlayStation, and Xbox.",
    image: "https://images.pexels.com/photos/3060902/pexels-photo-3060902.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Gaming",
    brand: "GameAudio",
    rating: 4.8,
    stock: 10,
    featured: true,
    colors: ["Black/Red", "White/Blue"],
    discount: 0,
    tags: ["gaming", "audio", "accessories"]
  },
  {
    id: 9,
    name: "Bamboo Cutting Board Set",
    price: 39.99,
    description: "Set of 3 bamboo cutting boards in different sizes. Sustainable, durable, and knife-friendly with non-slip edges and juice grooves.",
    image: "https://images.pexels.com/photos/5765853/pexels-photo-5765853.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Home",
    brand: "EcoKitchen",
    rating: 4.5,
    stock: 30,
    featured: false,
    colors: ["Natural"],
    discount: 0,
    tags: ["kitchen", "eco-friendly", "housewares"]
  },
  {
    id: 10,
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "Adjustable ergonomic office chair with lumbar support, breathable mesh back, and padded armrests. Designed for all-day comfort.",
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Furniture",
    brand: "ComfortWork",
    rating: 4.7,
    stock: 7,
    featured: false,
    colors: ["Black", "Gray"],
    discount: 10,
    tags: ["furniture", "office", "ergonomic"]
  },
  {
    id: 11,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Waterproof portable speaker with 20-hour battery life, powerful bass, and built-in microphone for calls. Perfect for outdoor adventures.",
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Electronics",
    brand: "SoundWave",
    rating: 4.4,
    stock: 20,
    featured: true,
    colors: ["Black", "Blue", "Red"],
    discount: 0,
    tags: ["audio", "portable", "bluetooth", "speakers"]
  },
  {
    id: 12,
    name: "Ceramic Dinner Set",
    price: 89.99,
    description: "16-piece ceramic dinner set including plates, bowls, and mugs. Elegant design, dishwasher and microwave safe.",
    image: "https://images.pexels.com/photos/6207365/pexels-photo-6207365.jpeg?auto=compress&cs=tinysrgb&w=600",
    category: "Home",
    brand: "HomeEssentials",
    rating: 4.6,
    stock: 15,
    featured: false,
    colors: ["White", "Gray", "Blue"],
    discount: 5,
    tags: ["kitchen", "dining", "tableware"]
  }
];

export const categories = [
  "All",
  "Electronics",
  "Fashion",
  "Home",
  "Sports",
  "Gaming",
  "Furniture"
];

export const priceBrackets = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "Over $500", min: 500, max: Infinity }
];

export const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Most Popular", value: "popular" },
  { label: "Top Rated", value: "rating" }
];