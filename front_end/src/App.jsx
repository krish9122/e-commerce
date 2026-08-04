import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ShoppingBag, 
  ShoppingCart, 
  User as UserIcon, 
  LogOut, 
  Search, 
  TrendingUp, 
  Users, 
  Package, 
  DollarSign, 
  Edit3, 
  FileText,
  MapPin, 
  Plus, 
  Minus, 
  Trash2, 
  Moon, 
  Sun, 
  Star 
} from "lucide-react";

// Configure Axios Defaults
axios.defaults.baseURL = "http://localhost:7000";
axios.defaults.withCredentials = true;

const CATEGORIES = [
  "All",
  "Grains & Flours",
  "Dals & Pulses",
  "Spices & Pantry",
  "Oils & Ghee",
  "Dairy & Bread",
  "Beverages",
  "Snacks",
  "Personal Care",
  "Household"
];

const NAVBAR_GROUPS = {
  "Groceries": ["Grains & Flours", "Dals & Pulses", "Spices & Pantry", "Beverages", "Snacks"],
  "Home Goods": ["Oils & Ghee", "Dairy & Bread"],
  "Tools & Garden": ["Household"],
  "Personal Care": ["Personal Care"]
};

const CATEGORY_IMAGES = {
  "Grains & Flours": "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=600&q=80",
  "Dals & Pulses": "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&w=600&q=80",
  "Spices & Pantry": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
  "Beverages": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
  "Oils & Ghee": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
  "Dairy & Bread": "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80",
  "Snacks": "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&w=600&q=80",
  "Fruits & Vegetables": "https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&w=600&q=80",
  "Personal Care": "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80",
  "Household": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=600&q=80",
  "Default": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
};

const getProductImage = (name, category) => {
  const n = name.toLowerCase();
  if (n.includes("rice")) return "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=650&q=80";
  if (n.includes("wheat") || n.includes("atta") || n.includes("maida")) return "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?auto=format&fit=crop&w=650&q=80";
  if (n.includes("tea")) return "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=650&q=80";
  if (n.includes("coffee")) return "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=650&q=80";
  if (n.includes("dal") || n.includes("chana") || n.includes("rajma")) return "https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&w=650&q=80";
  if (n.includes("oil")) return "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=650&q=80";
  if (n.includes("milk")) return "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=650&q=80";
  if (n.includes("bread")) return "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=650&q=80";
  if (n.includes("butter") || n.includes("ghee")) return "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=650&q=80";
  if (n.includes("egg")) return "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=650&q=80";
  if (n.includes("banana")) return "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=650&q=80";
  if (n.includes("apple")) return "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=650&q=80";
  if (n.includes("potato")) return "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=650&q=80";
  if (n.includes("onion")) return "https://images.unsplash.com/photo-1508747703725-719ae257c29a?auto=format&fit=crop&w=650&q=80";
  if (n.includes("tomato")) return "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=650&q=80";
  if (n.includes("orange") || n.includes("lemon")) return "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=650&q=80";
  if (n.includes("soap")) return "https://images.unsplash.com/photo-1607006342456-ba275cd3a7e6?auto=format&fit=crop&w=650&q=80";
  if (n.includes("shampoo")) return "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=650&q=80";
  if (n.includes("water") || n.includes("drink") || n.includes("juice")) return "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?auto=format&fit=crop&w=650&q=80";
  if (n.includes("chocolate")) return "https://images.unsplash.com/photo-1548907040-4d42b52145ca?auto=format&fit=crop&w=650&q=80";
  if (n.includes("honey")) return "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=650&q=80";
  if (n.includes("cheese") || n.includes("paneer")) return "https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&w=650&q=80";
  
  return CATEGORY_IMAGES[category] || CATEGORY_IMAGES["Default"];
};

const getProductTag = (prod) => {
  const n = prod.name.toLowerCase();
  if (prod.category === "Grains & Flours" || prod.category === "Dals & Pulses") return "LOCAL FARM";
  if (n.includes("bread") || n.includes("biscuit")) return "BAKED DAILY";
  if (n.includes("oil") || n.includes("honey") || n.includes("ghee")) return "SALE";
  if (prod.category === "Beverages" || prod.category === "Snacks") return "BEST SELLER";
  if (prod.category === "Personal Care") return "NATURAL";
  return "WHOLESALE";
};

function App() {
  const [activeTab, setActiveTab] = useState("shop"); // 'shop', 'orders', 'admin'
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [authError, setAuthError] = useState("");
  
  // User Authentication
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authForm, setAuthForm] = useState({
    name: "", email: "", phone_no: "", password: "", role: "user"
  });

  // Shop Listings
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Cart
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: "", street: "", city: "", state: "", postalCode: ""
  });

  // User Orders
  const [myOrders, setMyOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Admin Dashboard
  const [adminOrders, setAdminOrders] = useState([]);
  const [adminAnalytics, setAdminAnalytics] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  // Dark Mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Persist storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeTab === "orders" && user) {
      fetchMyOrders();
    } else if (activeTab === "admin" && user?.role === "admin") {
      fetchAdminData();
    }
  }, [activeTab, user]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const response = await axios.get("/api/v1/products");
      setProducts(response.data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchMyOrders = async () => {
    setLoadingOrders(true);
    try {
      const response = await axios.get("/api/v1/orders/myorder");
      setMyOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching my orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchAdminData = async () => {
    setLoadingAdmin(true);
    try {
      const ordersRes = await axios.get("/api/v1/orders");
      const analyticsRes = await axios.get("/api/v1/analytics");
      setAdminOrders(ordersRes.data.data || []);
      setAdminAnalytics(analyticsRes.data.data || null);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoadingAdmin(false);
    }
  };

  // Login/Register
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    try {
      if (authMode === "login") {
        const payload = { password: authForm.password };
        if (authForm.email.includes("@")) {
          payload.email = authForm.email;
        } else {
          payload.phone_no = Number(authForm.email);
        }
        const res = await axios.post("/api/v1/users/loginUser", payload);
        setUser(res.data.data.user);
        setShowAuthModal(false);
        setAuthForm({ name: "", email: "", phone_no: "", password: "", role: "user" });
      } else {
        const payload = {
          name: authForm.name,
          email: authForm.email,
          phone_no: Number(authForm.phone_no),
          password: authForm.password,
          role: authForm.role
        };
        await axios.post("/api/v1/users/register");
        const loginPayload = { email: authForm.email, password: authForm.password };
        const loginRes = await axios.post("/api/v1/users/loginUser", loginPayload);
        setUser(loginRes.data.data.user);
        setShowAuthModal(false);
        setAuthForm({ name: "", email: "", phone_no: "", password: "", role: "user" });
      }
    } catch (error) {
      setAuthError(error.response?.data?.message || "Auth failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logoutUser");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setMyOrders([]);
      setAdminOrders([]);
      setAdminAnalytics(null);
      setActiveTab("shop");
    }
  };

  // Cart operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product._id === product._id);
      if (existing) {
        return prevCart.map((item) =>
          item.product._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { product, qty: 1 }];
    });
  };

  const updateCartQty = (productId, newQty) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((item) => item.product._id !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product._id === productId ? { ...item, qty: newQty } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.qty, 0);
  };

  // Checkout
  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setShowAuthModal(true);
      setAuthMode("login");
      return;
    }
    if (cart.length === 0) return;
    try {
      const productsPayload = cart.map((item) => ({
        productId: item.product._id,
        qty: item.qty,
        price: item.product.price.toString()
      }));
      const payload = {
        products: productsPayload,
        totalAmount: getCartTotal(),
        address: checkoutForm
      };
      await axios.post("/api/v1/orders", payload);
      alert("Order placed successfully! Receipt generated.");
      setCart([]);
      setIsCartOpen(false);
      setCheckoutForm({ fullName: "", street: "", city: "", state: "", postalCode: "" });
      setActiveTab("orders");
    } catch (error) {
      alert("Order confirmation failed.");
    }
  };

  // Admin price change
  const handlePriceUpdate = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    try {
      const response = await axios.put(`/api/v1/products/${editingProduct._id}`, {
        price: Number(newPrice)
      });
      alert("Price updated successfully!");
      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? response.data.data : p))
      );
      setEditingProduct(null);
      setNewPrice("");
      fetchAdminData();
    } catch (error) {
      alert("Failed to update price.");
    }
  };

  const handleOrderStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/v1/orders/${orderId}/status`, { status: newStatus });
      alert(`Order marked as ${newStatus}`);
      fetchAdminData();
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  // Filters
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategory === "All" || prod.category === selectedCategory;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleNavbarGroupClick = (groupName) => {
    const allowedCategories = NAVBAR_GROUPS[groupName];
    if (allowedCategories && allowedCategories.length > 0) {
      setSelectedCategory(allowedCategories[0]);
    }
    const el = document.getElementById("products-catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      {/* HEADER / NAVIGATION CLONE */}
      <header className="header-glass">
        <div className="container header-container">
          
          {/* Logo */}
          <div className="logo-wrapper" onClick={() => { setActiveTab("shop"); setSelectedCategory("All"); }}>
            <span className="brand-title">Cornerstone</span>
            <span className="brand-subtitle">GENERAL STORE</span>
          </div>

          {/* Center Navbar Links */}
          <nav className="nav-menu">
            {Object.keys(NAVBAR_GROUPS).map((group) => (
              <button 
                key={group} 
                onClick={() => handleNavbarGroupClick(group)} 
                className="nav-link"
              >
                {group}
              </button>
            ))}
          </nav>

          {/* Search Input Bar */}
          {activeTab === "shop" && (
            <div className="search-wrapper">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {/* Actions & Cart */}
          <div className="header-actions">
            
            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2.5 rounded border border-[#e2dfd3] hover:bg-gray-150 transition-colors"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-white" /> : <Moon className="w-3.5 h-3.5 text-black" />}
            </button>

            {/* Special Administrative Tabs */}
            {user && (
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "orders" ? "bg-[#2d4a22] text-white" : "text-[#2d4a22] hover:bg-[#2d4a22]/5"
                }`}
              >
                Receipts
              </button>
            )}

            {user?.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-3 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "admin" ? "bg-[#2d4a22] text-white" : "text-[#2d4a22] hover:bg-[#2d4a22]/5"
                }`}
              >
                Admin Panel
              </button>
            )}

            {/* Green Cart button from screenshot */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-primary"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})</span>
            </button>

            {/* Sign in / Sign out */}
            {user ? (
              <div className="header-actions pl-2 border-l border-gray-250">
                <button
                  onClick={handleLogout}
                  className="p-2 rounded border border-[#e2dfd3] hover:bg-red-50 text-gray-500 hover:text-red-500 transition-all"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
                className="btn-secondary"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION CLONE */}
      {activeTab === "shop" && (
        <section className="hero-section">
          {/* Overlay Background */}
          <div className="hero-bg-overlay">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" 
              alt="Cornerstone Background" 
              className="hero-bg-img"
            />
            <div className="hero-gradient"></div>
          </div>

          <div className="container hero-grid">
            {/* Left Content */}
            <div className="hero-text-block">
              <span className="hero-tagline">
                EST. 1987 - SERVING OUR COMMUNITY
              </span>
              <h1 className="hero-title">
                Everything you need,<br />right here.
              </h1>
              <p className="hero-description">
                Quality groceries, household essentials, tools, and personal care — sourced with care from local and trusted suppliers.
              </p>
              <div className="hero-buttons">
                <button 
                  onClick={() => {
                    const el = document.getElementById("products-catalog-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-accent"
                >
                  Shop Now
                </button>
                <button 
                  onClick={() => {
                    const el = document.getElementById("shop-by-category-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-secondary text-white"
                >
                  Browse Categories
                </button>
              </div>
            </div>

            {/* Right floating stats overlay */}
            <div className="hero-stats-panel">
              <div className="stat-item stat-item-bordered-b">
                <span className="stat-number">100+</span>
                <span className="stat-label">Seeded Products</span>
              </div>
              <div className="stat-item stat-item-bordered-b stat-item-bordered-l">
                <span className="stat-number">38</span>
                <span className="stat-label">Local Suppliers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">12k</span>
                <span className="stat-label">Happy Retailers</span>
              </div>
              <div className="stat-item stat-item-bordered-l">
                <span className="stat-number">37</span>
                <span className="stat-label">Years Active</span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* MAIN BODY CONTAINER */}
      <main className="flex-1 container py-12">
        
        {/* SHOP CATALOG TAB */}
        {activeTab === "shop" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
            {/* SECTION 2: SHOP BY CATEGORY */}
            <section id="shop-by-category-section" className="category-section scroll-mt-20">
              <div className="section-header">
                <h2 className="section-title">Shop by Category</h2>
                <span className="section-subtitle-tag">10 Categories</span>
              </div>

              <div className="category-grid">
                {/* 1. Groceries */}
                <div 
                  onClick={() => setSelectedCategory("Grains & Flours")}
                  className="category-card"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1610348725531-843dff163e2c?auto=format&fit=crop&w=500&q=80" 
                    className="category-card-img" 
                    alt="Groceries" 
                  />
                  <div className="category-card-overlay">
                    <h3 className="category-card-title">Groceries</h3>
                    <span className="category-card-link">Explore Catalog →</span>
                  </div>
                </div>

                {/* 2. Home Goods */}
                <div 
                  onClick={() => setSelectedCategory("Oils & Ghee")}
                  className="category-card"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80" 
                    className="category-card-img" 
                    alt="Home Goods" 
                  />
                  <div className="category-card-overlay">
                    <h3 className="category-card-title">Home Goods</h3>
                    <span className="category-card-link">Explore Catalog →</span>
                  </div>
                </div>

                {/* 3. Tools & Garden */}
                <div 
                  onClick={() => setSelectedCategory("Household")}
                  className="category-card"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=500&q=80" 
                    className="category-card-img" 
                    alt="Tools & Garden" 
                  />
                  <div className="category-card-overlay">
                    <h3 className="category-card-title">Tools & Garden</h3>
                    <span className="category-card-link">Explore Catalog →</span>
                  </div>
                </div>

                {/* 4. Personal Care */}
                <div 
                  onClick={() => setSelectedCategory("Personal Care")}
                  className="category-card"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80" 
                    className="category-card-img" 
                    alt="Personal Care" 
                  />
                  <div className="category-card-overlay">
                    <h3 className="category-card-title">Personal Care</h3>
                    <span className="category-card-link">Explore Catalog →</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: ALL PRODUCTS CATALOG */}
            <section id="products-catalog-section" className="catalog-section scroll-mt-20">
              <div className="section-header" style={{ flexDirection: "column", alignItems: "flex-start", gap: "12px" }}>
                <h2 className="section-title">All Products</h2>
                
                {/* Horizontal Category Filters */}
                <div className="filters-scroll">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`filter-pill ${selectedCategory === cat ? "filter-pill-active" : ""}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {loadingProducts ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#2d4a22] animate-spin"></div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-lg">
                  <span className="block text-gray-400 text-sm font-semibold uppercase">No products listed</span>
                </div>
              ) : (
                <div className="grid-products">
                  {filteredProducts.map((prod) => {
                    const imgUrl = getProductImage(prod.name, prod.category);
                    const tag = getProductTag(prod);
                    const isSale = tag === "SALE";
                    return (
                      <div key={prod._id} className="product-card">
                        
                        {/* Tag overlay */}
                        <span className={`badge-tag ${isSale ? 'badge-tag-orange' : 'badge-tag-green'}`}>
                          {tag}
                        </span>

                        {/* Product info */}
                        <div>
                          <div className="product-image-wrapper">
                            <img 
                              src={imgUrl} 
                              alt={prod.name} 
                              className="product-image"
                            />
                          </div>

                          <h3 className="product-title">
                            {prod.name}
                          </h3>
                          
                          <span className="product-category-sub">{prod.category}</span>
                          
                          {/* Rating Star stars mock */}
                          <div className="stars-rating">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="star-icon" />
                            ))}
                          </div>
                        </div>

                        {/* Bottom checkout action */}
                        <div className="product-card-footer">
                          <span className="product-price">
                            ₹{prod.price}
                          </span>
                          <button
                            onClick={() => addToCart(prod)}
                            className="btn-add"
                          >
                            + Add
                          </button>
                        </div>

                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* SECTION 4: TESTIMONIALS MOCK */}
            <section className="testimonials-section">
              <div className="text-center">
                <h2 className="section-title">What our neighbours say</h2>
              </div>
              <div className="testimonials-grid">
                
                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
                    </div>
                    <p className="testimonial-quote">
                      "I've been shopping at Cornerstone for over twenty years. The quality is always consistent and the staff genuinely know their products."
                    </p>
                  </div>
                  <div className="testimonial-profile">
                    <div className="profile-avatar">M</div>
                    <div>
                      <span className="profile-name">Margaret O.</span>
                      <span className="profile-role">Regular since 2003</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
                    </div>
                    <p className="testimonial-quote">
                      "Ordered online for the first time last week. Delivery was fast and the sourdough was still warm when it arrived. Already placed a second order."
                    </p>
                  </div>
                  <div className="testimonial-profile">
                    <div className="profile-avatar">D</div>
                    <div>
                      <span className="profile-name">Daniel K.</span>
                      <span className="profile-role">First-time customer</span>
                    </div>
                  </div>
                </div>

                <div className="testimonial-card">
                  <div>
                    <div className="testimonial-stars">
                      {[...Array(5)].map((_, i) => <Star key={i} className="star-icon" />)}
                    </div>
                    <p className="testimonial-quote">
                      "The honey and olive oil here are exceptional. Prices are fair and the website makes it easy to restock quickly."
                    </p>
                  </div>
                  <div className="testimonial-profile">
                    <div className="profile-avatar">P</div>
                    <div>
                      <span className="profile-name">Priya S.</span>
                      <span className="profile-role">Weekly shopper</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>
          </div>
        )}

        {/* MY INVOICES / RECEIPTS TAB */}
        {activeTab === "orders" && (
          <div className="animate-fade-in max-w-2xl mx-auto flex flex-col gap-6">
            <div className="pb-2 border-b border-[#e2dfd3]">
              <h2 className="text-2xl font-serif font-bold text-[#1c2a1c]">My Purchase Invoices</h2>
              <p className="text-xs text-gray-500">Track and view receipts for all of your wholesale orders.</p>
            </div>

            {loadingOrders ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 rounded-full border-2 border-gray-250 border-t-[#2d4a22] animate-spin"></div>
              </div>
            ) : myOrders.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-lg">
                <FileText className="w-10 h-10 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <p className="text-gray-500 text-sm font-medium">You haven't placed any orders yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {myOrders.map((ord) => (
                  <div key={ord._id} className="product-card">
                    <div className="product-card-footer" style={{ borderTop: "none", borderBottom: "1px solid #e2dfd3", paddingBottom: "12px", paddingTop: "0" }}>
                      <div>
                        <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Receipt ID</span>
                        <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: "600" }}>{ord._id}</span>
                      </div>
                      <div>
                        <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Date</span>
                        <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>{new Date(ord.createdAt).toLocaleDateString("en-IN")}</span>
                      </div>
                      <span className={`badge badge-${ord.status}`}>{ord.status}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "10px 0" }}>
                      {ord.products?.map((item) => (
                        <div key={item._id || item.productId?._id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                          <span>
                            🌾 {item.productId?.name} <strong>x{item.qty}</strong>
                          </span>
                          <span style={{ fontWeight: "700" }}>
                            ₹{Number(item.price || 0) * item.qty}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="product-card-footer" style={{ borderTop: "1px solid #e2dfd3", paddingTop: "12px" }}>
                      <div>
                        <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af", marginBottom: "4px" }}>Delivered To</span>
                        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          <strong>{ord.address?.fullName}</strong><br />
                          {ord.address?.street}, {ord.address?.city}, {ord.address?.state} - {ord.address?.postalCode}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Grand Total</span>
                        <span style={{ fontSize: "1.25rem", fontWeight: "900", color: "#2d4a22" }}>₹{ord.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ADMIN PORTAL TAB */}
        {activeTab === "admin" && user?.role === "admin" && (
          <div className="animate-fade-in flex flex-col gap-8">
            <div className="pb-2 border-b border-[#e2dfd3]">
              <h2 className="text-2xl font-serif font-bold text-[#1c2a1c]">Admin Console</h2>
              <p className="text-xs text-gray-500">Adjust products rates index, verify receipts, and manage pending statuses.</p>
            </div>

            {/* Metrics */}
            {adminAnalytics && (
              <div className="admin-metrics-grid">
                <div className="product-card" style={{ flexDirection: "row", alignItems: "center", padding: "20px" }}>
                  <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#2d4a22", color: "white", display: "flex" }}>
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div style={{ marginLeft: "12px" }}>
                    <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Gross Sales</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "900", color: "#2d4a22" }}>₹{adminAnalytics.totalRevenue}</span>
                  </div>
                </div>

                <div className="product-card" style={{ flexDirection: "row", alignItems: "center", padding: "20px" }}>
                  <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#2d4a22", color: "white", display: "flex" }}>
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div style={{ marginLeft: "12px" }}>
                    <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Transactions</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "900", color: "#2d4a22" }}>{adminAnalytics.totalOrders}</span>
                  </div>
                </div>

                <div className="product-card" style={{ flexDirection: "row", alignItems: "center", padding: "20px" }}>
                  <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#2d4a22", color: "white", display: "flex" }}>
                    <Users className="w-4 h-4" />
                  </div>
                  <div style={{ marginLeft: "12px" }}>
                    <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Registered Users</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "900", color: "#2d4a22" }}>{adminAnalytics.totalUsers}</span>
                  </div>
                </div>

                <div className="product-card" style={{ flexDirection: "row", alignItems: "center", padding: "20px" }}>
                  <div style={{ padding: "10px", borderRadius: "4px", backgroundColor: "#2d4a22", color: "white", display: "flex" }}>
                    <Package className="w-4 h-4" />
                  </div>
                  <div style={{ marginLeft: "12px" }}>
                    <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Catalog Items</span>
                    <span style={{ fontSize: "1.25rem", fontWeight: "900", color: "#2d4a22" }}>{adminAnalytics.totalProducts}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="admin-grid-layout">
              {/* Receipts Validation */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="section-header">
                  <h3 className="section-title" style={{ fontSize: "1.25rem", color: "#2d4a22", display: "flex", alignItems: "center", gap: "8px" }}>
                    <FileText className="w-4 h-4" />
                    Customer Purchase Receipts
                  </h3>
                  <button onClick={fetchAdminData} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "10px", fontWeight: "700", textTransform: "uppercase" }}>
                    Sync
                  </button>
                </div>

                {loadingAdmin ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-250 border-t-[#2d4a22] animate-spin"></div>
                  </div>
                ) : adminOrders.length === 0 ? (
                  <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-gray-250 dark:border-zinc-800 rounded-lg">
                    <p className="text-xs text-gray-400">No receipts found.</p>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {adminOrders.map((ord) => (
                      <div key={ord._id} className="product-card" style={{ gap: "12px" }}>
                        {/* Order info */}
                        <div className="product-card-footer" style={{ borderTop: "none", borderBottom: "1px solid #e2dfd3", paddingBottom: "12px", paddingTop: "0" }}>
                          <div>
                            <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Invoice ID</span>
                            <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: "600" }}>{ord._id}</span>
                          </div>
                          <div>
                            <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Buyer</span>
                            <span style={{ fontSize: "0.75rem", fontWeight: "600" }}>{ord.user?.name || "Walk-in"} ({ord.user?.phone_no || ord.address?.fullName})</span>
                          </div>
                          <div>
                            <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Grand Total</span>
                            <span style={{ fontSize: "0.75rem", fontWeight: "700" }}>₹{ord.totalAmount}</span>
                          </div>
                          <span className={`badge badge-${ord.status}`}>{ord.status}</span>
                        </div>

                        {/* Order Items */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {ord.products?.map((item) => (
                            <div key={item._id || item.productId?._id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                              <span style={{ color: "#6b7280" }}>
                                🌾 {item.productId?.name || "Unknown"} <strong>x{item.qty}</strong>
                              </span>
                              <span style={{ fontWeight: "700" }}>₹{Number(item.price || 0) * item.qty}</span>
                            </div>
                          ))}
                        </div>

                        {/* Shipping Address */}
                        <div style={{ backgroundColor: "#f7f5f0", padding: "10px", borderRadius: "4px", fontSize: "0.75rem", border: "1px solid #e2dfd3" }}>
                          <strong>Delivery Address:</strong> {ord.address?.street}, {ord.address?.city}, {ord.address?.state} - {ord.address?.postalCode}
                        </div>

                        {/* Status actions */}
                        <div className="product-card-footer" style={{ borderTop: "1px solid #e2dfd3", paddingTop: "12px" }}>
                          <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Set Status:</span>
                          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                            {["pending", "processing", "shipped", "delivered", "rejected"].map((st) => (
                              <button
                                key={st}
                                onClick={() => handleOrderStatusUpdate(ord._id, st)}
                                className={`filter-pill ${ord.status === st ? "filter-pill-active" : ""}`}
                                style={{ padding: "4px 8px", fontSize: "9px", borderRadius: "4px" }}
                              >
                                {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Managers */}
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div className="section-header">
                  <h3 className="section-title" style={{ fontSize: "1.25rem", color: "#2d4a22", display: "flex", alignItems: "center", gap: "8px" }}>
                    <Edit3 className="w-4 h-4" />
                    Price Index Manager
                  </h3>
                </div>

                <div className="product-card" style={{ maxHeight: "600px", overflowY: "auto", padding: "16px", gap: "12px" }}>
                  {products.map((p) => {
                    const img = getProductImage(p.name, p.category);
                    return (
                      <div key={p._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f2eedf", paddingBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "0", flex: "1" }}>
                          <img src={img} style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover" }} alt={p.name} />
                          <div style={{ minWidth: "0", flex: "1" }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: "700", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{p.name}</span>
                            <span style={{ fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>{p.category}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ fontSize: "0.75rem", fontWeight: "750" }}>₹{p.price}</span>
                          <button
                            onClick={() => { setEditingProduct(p); setNewPrice(p.price.toString()); }}
                            className="btn-add"
                            style={{ padding: "4px 8px", fontSize: "10px" }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER CLONE */}
      <footer className="footer-beige">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div>
              <span className="font-serif text-2xl font-black text-[#2d4a22]">Cornerstone</span>
              <span className="brand-subtitle block">GENERAL STORE</span>
            </div>
            <p className="footer-description">
              A family-run neighbourhood shop serving the community since 1987. Everything from fresh produce to tools, sourced with honesty.
            </p>
            <div className="footer-socials">
              <span className="cursor-pointer hover:underline">FACEBOOK</span>
              <span className="cursor-pointer hover:underline">INSTAGRAM</span>
              <span className="cursor-pointer hover:underline">PINTEREST</span>
            </div>
          </div>
          <div></div>
          <div className="footer-col">
            <span className="footer-col-title">Shop</span>
            <ul className="footer-links-list">
              <li onClick={() => { setActiveTab("shop"); setSelectedCategory("All"); }} className="footer-link-item">All Products</li>
              <li onClick={() => setSelectedCategory("Grains & Flours")} className="footer-link-item">Groceries</li>
              <li onClick={() => setSelectedCategory("Dairy & Bread")} className="footer-link-item">Dairy & Bread</li>
              <li onClick={() => setSelectedCategory("Household")} className="footer-link-item">Tools & Garden</li>
            </ul>
          </div>
          <div className="footer-col">
            <span className="footer-col-title">Info</span>
            <ul className="footer-links-list">
              <li className="footer-link-item">About Us</li>
              <li className="footer-link-item">Delivery Info</li>
              <li className="footer-link-item">Returns Policy</li>
              <li className="footer-link-item">Contact Us</li>
              <li className="footer-link-item">FAQ</li>
            </ul>
          </div>
        </div>
      </footer>

      {/* CART SIDE DRAWER */}
      {isCartOpen && (
        <div className="drawer-overlay">
          <div className="drawer-panel animate-slide-in-right">
            {/* Header */}
            <div className="drawer-header">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <ShoppingCart className="w-4 h-4 text-[#2d4a22]" />
                <h3 className="font-serif font-bold text-[#1c2a1c]">Wholesale Cart</h3>
              </div>
              <button onClick={() => setIsCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "700" }}>✕</button>
            </div>

            {/* Cart Items */}
            <div className="drawer-body">
              {cart.length === 0 ? (
                <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#9ca3af" }}>
                  <ShoppingCart className="w-10 h-10 mb-4" />
                  <p className="font-serif font-bold text-xs uppercase">Your cart is empty.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {cart.map((item) => (
                      <div key={item.product._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", backgroundColor: "#f7f5f0", borderRadius: "4px", border: "1px solid #e2dfd3" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: "0", flex: "1" }}>
                          <img src={getProductImage(item.product.name, item.product.category)} style={{ width: "32px", height: "32px", borderRadius: "4px", objectFit: "cover" }} />
                          <div style={{ minWidth: "0", flex: "1" }}>
                            <span style={{ fontSize: "0.75rem", fontWeight: "700", display: "block", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{item.product.name}</span>
                            <span style={{ fontSize: "8px", color: "#9ca3af", fontWeight: "700" }}>₹{item.product.price}</span>
                          </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #e2dfd3", borderRadius: "4px", backgroundColor: "white" }}>
                            <button
                              onClick={() => updateCartQty(item.product._id, item.qty - 1)}
                              style={{ padding: "2px 6px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span style={{ px: "8px", fontSize: "0.75rem", fontWeight: "700" }}>{item.qty}</span>
                            <button
                              onClick={() => updateCartQty(item.product._id, item.qty + 1)}
                              style={{ padding: "2px 6px", background: "none", border: "none", cursor: "pointer" }}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product._id)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}
                          >
                            <Trash2 className="w-4 h-4 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #e2dfd3", display: "flex", flexDirection: "column", gap: "12px" }}>
                    <h4 className="font-serif font-bold text-xs flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      Invoice Recipient Address
                    </h4>
                    <form onSubmit={handleCheckoutSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      <input
                        type="text"
                        placeholder="Recipient Name"
                        className="input-field"
                        required
                        value={checkoutForm.fullName}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, fullName: e.target.value })}
                      />
                      <input
                        type="text"
                        placeholder="Street Address"
                        className="input-field"
                        required
                        value={checkoutForm.street}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, street: e.target.value })}
                      />
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <input
                          type="text"
                          placeholder="City"
                          className="input-field"
                          required
                          value={checkoutForm.city}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        />
                        <input
                          type="text"
                          placeholder="State"
                          className="input-field"
                          required
                          value={checkoutForm.state}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, state: e.target.value })}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Postal ZIP Code"
                        className="input-field"
                        required
                        value={checkoutForm.postalCode}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })}
                      />

                      {!user && (
                        <div style={{ padding: "10px", backgroundColor: "#f7f5f0", border: "1px solid #e2dfd3", borderRadius: "4px", fontSize: "0.65rem", fontWeight: "700", textTransform: "uppercase", color: "#6b7280" }}>
                          Sign In Required to confirm order.
                        </div>
                      )}

                      <button
                        type="submit"
                        className="btn-accent"
                        style={{ backgroundColor: "#b86814", borderColor: "#b86814", color: "white", padding: "12px", width: "100%", justifyContent: "center", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700", marginTop: "8px" }}
                      >
                        Confirm Purchase & Generate Receipt
                      </button>
                    </form>
                  </div>
                </>
              )}
            </div>

            {/* Total Footer */}
            {cart.length > 0 && (
              <div className="drawer-footer">
                <div>
                  <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Cart Total</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: "900", color: "#2d4a22" }}>₹{getCartTotal()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3 className="modal-header-title">
                {authMode === "login" ? "Store Sign In" : "Register Store Account"}
              </h3>
              <button onClick={() => setShowAuthModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "white", fontWeight: "700" }}>✕</button>
            </div>

            <div style={{ padding: "24px" }}>
              {authError && (
                <div style={{ padding: "10px", backgroundColor: "#fee2e2", border: "1px solid #fca5a5", color: "#dc2626", borderRadius: "4px", fontSize: "0.75rem", fontWeight: "600", marginBottom: "16px" }}>
                  {authError}
                </div>
              )}

              <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {authMode === "register" && (
                  <>
                    <input
                      type="text"
                      placeholder="Wholesale Store / Owner Full Name"
                      className="input-field"
                      required
                      value={authForm.name}
                      onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                    />
                    <input
                      type="number"
                      placeholder="Store Mobile Number"
                      className="input-field"
                      required
                      maxLength={10}
                      value={authForm.phone_no}
                      onChange={(e) => setAuthForm({ ...authForm, phone_no: e.target.value })}
                    />
                  </>
                )}

                <input
                  type="text"
                  placeholder={authMode === "login" ? "Email Address or Mobile Number" : "Email Address"}
                  className="input-field"
                  required
                  value={authForm.email}
                  onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  required
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                />

                {authMode === "register" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <span style={{ fontSize: "9px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Account Role:</span>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      <button
                        type="button"
                        onClick={() => setAuthForm({ ...authForm, role: "user" })}
                        style={{ padding: "8px", fontSize: "0.75rem", fontWeight: "700", border: "1px solid #e2dfd3", borderRadius: "4px", cursor: "pointer", textTransform: "uppercase", backgroundColor: authForm.role === "user" ? "#2d4a22" : "transparent", color: authForm.role === "user" ? "white" : "#4b5563" }}
                      >
                        Buyer
                      </button>
                      <button
                        type="button"
                        onClick={() => setAuthForm({ ...authForm, role: "admin" })}
                        style={{ padding: "8px", fontSize: "0.75rem", fontWeight: "700", border: "1px solid #e2dfd3", borderRadius: "4px", cursor: "pointer", textTransform: "uppercase", backgroundColor: authForm.role === "admin" ? "#2d4a22" : "transparent", color: authForm.role === "admin" ? "white" : "#4b5563" }}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn-accent"
                  style={{ backgroundColor: "#b86814", borderColor: "#b86814", color: "white", padding: "12px", width: "100%", justifyContent: "center", fontSize: "0.75rem", textTransform: "uppercase", fontWeight: "700", marginTop: "8px" }}
                >
                  {authMode === "login" ? "Access Store" : "Register Account"}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "24px", fontSize: "0.75rem", color: "#6b7280" }}>
                {authMode === "login" ? (
                  <>
                    First time buying here?{" "}
                    <button 
                      onClick={() => setAuthMode("register")}
                      style={{ background: "none", border: "none", color: "#2d4a22", fontWeight: "800", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Register Now
                    </button>
                  </>
                ) : (
                  <>
                    Already registered?{" "}
                    <button 
                      onClick={() => setAuthMode("login")}
                      style={{ background: "none", border: "none", color: "#2d4a22", fontWeight: "800", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Sign In
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT PRICE MODAL (ADMIN ONLY) */}
      {editingProduct && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in" style={{ maxWidth: "380px" }}>
            <div className="drawer-header" style={{ padding: "16px" }}>
              <h3 className="font-serif font-bold text-sm text-[#1c2a1c]">Modify Wholesale Index Rate</h3>
              <button onClick={() => setEditingProduct(null)} style={{ background: "none", border: "none", cursor: "pointer", fontWeight: "700" }}>✕</button>
            </div>

            <form onSubmit={handlePriceUpdate} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af" }}>Wholesale Item</span>
                <span className="font-serif" style={{ fontSize: "0.875rem", fontWeight: "700" }}>{editingProduct.name}</span>
                <span style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af", marginTop: "2px" }}>Index: {editingProduct.category}</span>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "8px", fontWeight: "700", textTransform: "uppercase", color: "#9ca3af", marginBottom: "6px" }}>Adjust Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="Enter adjusted price..."
                  className="input-field"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end", marginTop: "8px" }}>
                <button type="button" onClick={() => setEditingProduct(null)} className="btn-secondary" style={{ padding: "6px 12px", fontSize: "11px" }}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ backgroundColor: "#2d4a22", color: "white", padding: "6px 12px", fontSize: "11px" }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
