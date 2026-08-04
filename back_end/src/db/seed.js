import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

const productsList = [
  { name: "Rice (1 kg)", price: 45, category: "Grains & Flours" },
  { name: "Wheat (1 kg)", price: 32, category: "Grains & Flours" },
  { name: "Atta (1 kg)", price: 38, category: "Grains & Flours" },
  { name: "Maida (1 kg)", price: 50, category: "Grains & Flours" },
  { name: "Suji/Rava (1 kg)", price: 55, category: "Grains & Flours" },
  { name: "Poha (1 kg)", price: 60, category: "Grains & Flours" },
  { name: "Besan (1 kg)", price: 90, category: "Grains & Flours" },
  { name: "Chana Dal (1 kg)", price: 90, category: "Dals & Pulses" },
  { name: "Toor Dal (1 kg)", price: 125, category: "Dals & Pulses" },
  { name: "Moong Dal (1 kg)", price: 115, category: "Dals & Pulses" },
  { name: "Masoor Dal (1 kg)", price: 95, category: "Dals & Pulses" },
  { name: "Urad Dal (1 kg)", price: 125, category: "Dals & Pulses" },
  { name: "Rajma (1 kg)", price: 140, category: "Dals & Pulses" },
  { name: "Kabuli Chana (1 kg)", price: 140, category: "Dals & Pulses" },
  { name: "Sugar (1 kg)", price: 50, category: "Spices & Pantry" },
  { name: "Jaggery (1 kg)", price: 65, category: "Spices & Pantry" },
  { name: "Salt (1 kg)", price: 25, category: "Spices & Pantry" },
  { name: "Tea Powder (250 g)", price: 140, category: "Beverages" },
  { name: "Coffee Powder (100 g)", price: 120, category: "Beverages" },
  { name: "Turmeric Powder (200 g)", price: 55, category: "Spices & Pantry" },
  { name: "Red Chilli Powder (200 g)", price: 80, category: "Spices & Pantry" },
  { name: "Coriander Powder (200 g)", price: 60, category: "Spices & Pantry" },
  { name: "Cumin Seeds (100 g)", price: 45, category: "Spices & Pantry" },
  { name: "Black Pepper (100 g)", price: 85, category: "Spices & Pantry" },
  { name: "Garam Masala (100 g)", price: 70, category: "Spices & Pantry" },
  { name: "Mustard Seeds (100 g)", price: 20, category: "Spices & Pantry" },
  { name: "Asafoetida (50 g)", price: 55, category: "Spices & Pantry" },
  { name: "Cooking Oil (1 litre)", price: 160, category: "Oils & Ghee" },
  { name: "Mustard Oil (1 litre)", price: 190, category: "Oils & Ghee" },
  { name: "Sunflower Oil (1 litre)", price: 180, category: "Oils & Ghee" },
  { name: "Ghee (500 ml)", price: 340, category: "Oils & Ghee" },
  { name: "Butter (100 g)", price: 65, category: "Dairy & Bread" },
  { name: "Milk (1 litre)", price: 65, category: "Dairy & Bread" },
  { name: "Curd (400 g)", price: 45, category: "Dairy & Bread" },
  { name: "Paneer (200 g)", price: 95, category: "Dairy & Bread" },
  { name: "Cheese Slices (200 g)", price: 140, category: "Dairy & Bread" },
  { name: "Eggs (12 pcs)", price: 90, category: "Dairy & Bread" },
  { name: "Bread (400 g)", price: 45, category: "Dairy & Bread" },
  { name: "Biscuits (200 g)", price: 40, category: "Snacks" },
  { name: "Noodles (280 g)", price: 65, category: "Snacks" },
  { name: "Pasta (500 g)", price: 110, category: "Snacks" },
  { name: "Cornflakes (500 g)", price: 210, category: "Snacks" },
  { name: "Oats (1 kg)", price: 190, category: "Snacks" },
  { name: "Peanut Butter (340 g)", price: 190, category: "Spices & Pantry" },
  { name: "Jam (500 g)", price: 140, category: "Spices & Pantry" },
  { name: "Tomato Ketchup (500 g)", price: 110, category: "Spices & Pantry" },
  { name: "Honey (500 g)", price: 250, category: "Spices & Pantry" },
  { name: "Potato (1 kg)", price: 30, category: "Fruits & Vegetables" },
  { name: "Onion (1 kg)", price: 35, category: "Fruits & Vegetables" },
  { name: "Tomato (1 kg)", price: 40, category: "Fruits & Vegetables" },
  { name: "Garlic (250 g)", price: 45, category: "Fruits & Vegetables" },
  { name: "Ginger (250 g)", price: 40, category: "Fruits & Vegetables" },
  { name: "Green Chillies (100 g)", price: 15, category: "Fruits & Vegetables" },
  { name: "Lemon (1 dozen)", price: 70, category: "Fruits & Vegetables" },
  { name: "Banana (1 dozen)", price: 65, category: "Fruits & Vegetables" },
  { name: "Apple (1 kg)", price: 220, category: "Fruits & Vegetables" },
  { name: "Orange (1 kg)", price: 140, category: "Fruits & Vegetables" },
  { name: "Pomegranate (1 kg)", price: 190, category: "Fruits & Vegetables" },
  { name: "Coconut (1 pc)", price: 50, category: "Fruits & Vegetables" },
  { name: "Soap (125 g)", price: 45, category: "Personal Care" },
  { name: "Bath Soap (Pack of 4)", price: 180, category: "Personal Care" },
  { name: "Shampoo (180 ml)", price: 170, category: "Personal Care" },
  { name: "Hair Oil (200 ml)", price: 130, category: "Personal Care" },
  { name: "Toothpaste (200 g)", price: 120, category: "Personal Care" },
  { name: "Toothbrush", price: 40, category: "Personal Care" },
  { name: "Face Wash (100 g)", price: 160, category: "Personal Care" },
  { name: "Hand Wash (250 ml)", price: 110, category: "Personal Care" },
  { name: "Detergent Powder (1 kg)", price: 135, category: "Household" },
  { name: "Dishwash Liquid (500 ml)", price: 110, category: "Household" },
  { name: "Floor Cleaner (500 ml)", price: 115, category: "Household" },
  { name: "Toilet Cleaner (500 ml)", price: 110, category: "Household" },
  { name: "Tissue Paper Roll", price: 40, category: "Household" },
  { name: "Garbage Bags (30 pcs)", price: 90, category: "Household" },
  { name: "Matchbox", price: 5, category: "Household" },
  { name: "Candles (Pack)", price: 35, category: "Household" },
  { name: "Mosquito Coil (10 pcs)", price: 50, category: "Household" },
  { name: "Mosquito Liquid Refill", price: 90, category: "Household" },
  { name: "Aluminium Foil Roll", price: 95, category: "Household" },
  { name: "Cling Wrap Roll", price: 85, category: "Household" },
  { name: "Paper Napkins (100 pcs)", price: 65, category: "Household" },
  { name: "Mineral Water (1 litre)", price: 20, category: "Beverages" },
  { name: "Soft Drink (750 ml)", price: 45, category: "Beverages" },
  { name: "Fruit Juice (1 litre)", price: 130, category: "Beverages" },
  { name: "Energy Drink (250 ml)", price: 125, category: "Beverages" },
  { name: "Dry Fruits Mix (250 g)", price: 300, category: "Snacks" },
  { name: "Cashews (250 g)", price: 280, category: "Snacks" },
  { name: "Almonds (250 g)", price: 260, category: "Snacks" },
  { name: "Raisins (250 g)", price: 110, category: "Snacks" },
  { name: "Dates (500 g)", price: 180, category: "Snacks" },
  { name: "Popcorn Kernels (500 g)", price: 90, category: "Snacks" },
  { name: "Chips (Large Pack)", price: 50, category: "Snacks" },
  { name: "Chocolates (100 g)", price: 100, category: "Snacks" },
  { name: "Ice Cream (500 ml)", price: 180, category: "Dairy & Bread" },
  { name: "Pickle (500 g)", price: 120, category: "Spices & Pantry" },
  { name: "Papad (200 g)", price: 75, category: "Snacks" },
  { name: "Baking Powder (100 g)", price: 40, category: "Spices & Pantry" },
  { name: "Vinegar (500 ml)", price: 65, category: "Spices & Pantry" },
  { name: "Soy Sauce (200 ml)", price: 80, category: "Spices & Pantry" },
  { name: "Green Tea (25 Bags)", price: 175, category: "Beverages" },
  { name: "Instant Coffee (100 g)", price: 180, category: "Beverages" }
];

export async function seedDatabase() {
  try {
    // 1. Seed Products if empty
    const productCount = await Product.countDocuments({});
    if (productCount === 0) {
      console.log("Seeding products...");
      const finalProducts = productsList.map((prod) => ({
        ...prod,
        description: `Premium quality ${prod.name} sourced from top wholesalers.`,
        stock: 100,
        imageUrl: "" // empty by default
      }));
      await Product.insertMany(finalProducts);
      console.log("Products seeded successfully!");
    } else {
      console.log("Products already exist in database.");
    }

    // 2. Seed Default Admin if not exists
    const adminUser = await User.findOne({ role: "admin" });
    if (!adminUser) {
      console.log("Seeding default admin user...");
      await User.create({
        name: "Store Admin",
        email: "admin@kirana.com",
        password: "admin123", // Will be hashed by userSchema pre-save hook
        phone_no: 9999999999,
        role: "admin"
      });
      console.log("Default admin user seeded successfully! (admin@kirana.com / admin123)");
    } else {
      console.log("Admin user already exists.");
    }
  } catch (error) {
    console.error("Database seeding error:", error);
  }
}
