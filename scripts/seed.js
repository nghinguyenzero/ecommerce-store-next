const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

// Load .env.local manually
const fs = require("fs");
const envPath = path.resolve(__dirname, "../.env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
envContent.split("\n").forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith("#")) {
    const [key, ...rest] = trimmed.split("=");
    process.env[key.trim()] = rest.join("=").trim();
  }
});

const MONGODB_URI = process.env.MONGODB_URI;

// --- Schemas (inline to avoid ESM import issues) ---

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
const Product =
  mongoose.models.Products || mongoose.model("Products", ProductSchema);

// --- Seed Data ---

const users = [
  {
    name: "Admin User",
    email: "admin@test.com",
    password: "admin123",
    role: "admin",
  },
  {
    name: "Customer User",
    email: "customer@test.com",
    password: "customer123",
    role: "customer",
  },
];

const products = [
  {
    name: "Classic White T-Shirt",
    description:
      "A timeless white t-shirt made from 100% organic cotton. Perfect for everyday wear.",
    price: 25,
    category: "men",
    sizes: ["s", "m", "l"],
    deliveryInfo: "Free shipping on orders over $50",
    onSale: "yes",
    priceDrop: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
  },
  {
    name: "Slim Fit Jeans",
    description:
      "Modern slim fit jeans with stretch comfort. Available in classic indigo wash.",
    price: 59,
    category: "men",
    sizes: ["m", "l"],
    deliveryInfo: "Delivery in 3-5 business days",
    onSale: "no",
    priceDrop: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=600",
  },
  {
    name: "Men Casual Hoodie",
    description:
      "Warm and comfortable hoodie for chilly days. Soft fleece interior lining.",
    price: 45,
    category: "men",
    sizes: ["s", "m", "l"],
    deliveryInfo: "Free shipping on orders over $50",
    onSale: "yes",
    priceDrop: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600",
  },
  {
    name: "Floral Summer Dress",
    description:
      "Beautiful floral print dress perfect for summer outings. Lightweight and breezy.",
    price: 65,
    category: "women",
    sizes: ["s", "m"],
    deliveryInfo: "Free shipping on orders over $50",
    onSale: "yes",
    priceDrop: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
  },
  {
    name: "Women Leather Jacket",
    description:
      "Premium faux leather jacket with a modern cut. Ideal for layering in cooler weather.",
    price: 120,
    category: "women",
    sizes: ["s", "m", "l"],
    deliveryInfo: "Delivery in 3-5 business days",
    onSale: "no",
    priceDrop: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  },
  {
    name: "Casual Blouse",
    description:
      "Elegant casual blouse that transitions perfectly from work to evening wear.",
    price: 38,
    category: "women",
    sizes: ["s", "m", "l"],
    deliveryInfo: "Free shipping on orders over $50",
    onSale: "yes",
    priceDrop: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600",
  },
  {
    name: "Kids Dinosaur T-Shirt",
    description:
      "Fun and colorful dinosaur print t-shirt kids will love. Made from soft, durable cotton.",
    price: 18,
    category: "kids",
    sizes: ["s", "m"],
    deliveryInfo: "Free shipping on orders over $30",
    onSale: "yes",
    priceDrop: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600",
  },
  {
    name: "Kids Denim Overalls",
    description:
      "Adorable denim overalls for active kids. Reinforced knees for extra durability.",
    price: 35,
    category: "kids",
    sizes: ["s", "m", "l"],
    deliveryInfo: "Delivery in 3-5 business days",
    onSale: "no",
    priceDrop: 0,
    imageUrl:
      "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600",
  },
  {
    name: "Kids Rainbow Hoodie",
    description:
      "Bright rainbow-colored hoodie that kids absolutely adore. Warm and machine washable.",
    price: 28,
    category: "kids",
    sizes: ["s", "m"],
    deliveryInfo: "Free shipping on orders over $30",
    onSale: "yes",
    priceDrop: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600",
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected!\n");

  // Clear existing data
  await User.deleteMany({});
  await Product.deleteMany({});
  console.log("Cleared existing users and products.\n");

  // Create users
  for (const u of users) {
    const hashedPassword = await bcrypt.hash(u.password, 12);
    await User.create({ ...u, password: hashedPassword });
    console.log(`Created user: ${u.email} (${u.role}) - password: ${u.password}`);
  }

  // Create products
  for (const p of products) {
    await Product.create(p);
    console.log(`Created product: ${p.name} ($${p.price}) [${p.category}]`);
  }

  console.log("\n--- Seed complete! ---");
  console.log("Test accounts:");
  console.log("  Admin:    admin@test.com / admin123");
  console.log("  Customer: customer@test.com / customer123");
  console.log(`Products created: ${products.length}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});
