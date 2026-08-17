// =============================================
// STYLE 18 HIDE — Central Data Store
// =============================================
// ---------- SHOES ----------
const DEFAULT_SHOES = [
 {
 id: 1,
 name: "Premium Black Leather Slip-On",
 desc: "Premium black Leather Upper · Elastic sides for easy slip-ons · Durable leather outsole for long-lasting wear · Comfortable insoles for all-day support.",
 price: 4500,
 available: true,
 img: "shoe1.jpg"
 },
 {
 id: 2,
 name: "Classic Comfort Dress Shoe",
 desc: "Durable leather outsole for long-lasting wear · Comfortable insoles for all-day support · Crafted with precision for the modern gentleman.",
 price: 5200,
 available: true,
 img: "shoe1.jpg"
 },
 {
 id: 3,
 name: "Premium Brown Leather Slip-On",
 desc: "Premium Brown Leather Upper · Elastic sides for easy slip-ons · Durable leather outsole for long-lasting wear · Comfortable insoles for all-day support.",
 price: 4800,
 available: true,
 img: "shoe1.jpg"
 },
 {
 id: 4,
 name: "Men's Black Leather Horsebit Tassel Loafer 🎱",
 desc: "Men's black leather horsebit tassel loafers — a statement of elegance and refined taste.",
 price: 6500,
 available: true,
 img: "shoe1.jpg"
 },
 {
 id: 5,
 name: "SPECIAL: Crocodile-Embossed Leather Loafers",
 desc: "SPECIAL — Crocodile-embossed leather loafers are here. Exotic texture, premium build, limited availability.",
 price: 8500,
 available: true,
 img: "shoe1.jpg"
 }
];
// ---------- SHOP META ----------
const DEFAULT_SHOP = {
 address: "Chamra Mandi Hide Market, Akbar Road #18, Lahore",
 hours: "Mon–Sat: 10:00 AM – 9:00 PM | Sun: 12:00 PM – 6:00 PM",
 open: true
};
// ---------- ADMIN CREDENTIALS ----------
const ADMIN_CREDS = { username: "admin", password: "style18admin" };
// ---------- REDEEM CODES ----------
const DEFAULT_CODES = [
 { code: "STYLE10", discount: 10, label: "10% Off" },
 { code: "HIDE20", discount: 20, label: "20% Off" },
 { code: "LAUNCH50",discount: 50, label: "50% Off — Launch Special" },
 { code: "VIP15", discount: 15, label: "15% VIP Discount" }
];
// ============================================================
// Storage helpers — seeds defaults on first load
// ============================================================
function loadShoes() {
 const s = localStorage.getItem("sh18_shoes");
 if (!s) { saveShoes(DEFAULT_SHOES); return DEFAULT_SHOES; }
 return JSON.parse(s);
}
function saveShoes(arr) { localStorage.setItem("sh18_shoes", JSON.stringify(arr)); }
function loadShop() {
 const s = localStorage.getItem("sh18_shop");
 if (!s) { saveShop(DEFAULT_SHOP); return Object.assign({}, DEFAULT_SHOP); }
 return JSON.parse(s);
}
function saveShop(obj) { localStorage.setItem("sh18_shop", JSON.stringify(obj)); }
function loadUsers() {
 const s = localStorage.getItem("sh18_users");
 return s ? JSON.parse(s) : [];
}
function saveUsers(arr) { localStorage.setItem("sh18_users", JSON.stringify(arr)); }
function loadCodes() {
 const s = localStorage.getItem("sh18_codes");
 if (!s) { saveCodes(DEFAULT_CODES); return [...DEFAULT_CODES]; }
 return JSON.parse(s);
}
function saveCodes(arr) { localStorage.setItem("sh18_codes", JSON.stringify(arr)); }
function loadMessages() {
 const s = localStorage.getItem("sh18_msgs");
 return s ? JSON.parse(s) : [];
}
function saveMessages(arr) { localStorage.setItem("sh18_msgs", JSON.stringify(arr)); }
function currentUser() {
 const s = sessionStorage.getItem("sh18_session");
 return s ? JSON.parse(s) : null;
}
function setSession(user) { sessionStorage.setItem("sh18_session", JSON.stringify(user)); }
function clearSession() { sessionStorage.removeItem("sh18_session"); }
