# 👟 Style 18 Hide — Le Jao

Premium handcrafted leather footwear e-commerce website with admin dashboard.

## 🚀 Quick Start

### Setup

1. **Open index.html** in your browser to view the site
   - All data is stored in browser's `localStorage` (persists across sessions)
   - No backend server required — fully client-side

2. **Logo Setup** (Optional)
   - The site includes a fallback SVG logo (`logo.svg`)
   - To use your PNG logo: place `logo.png` in the project root
   - The site will auto-detect and use it

### 📱 Pages

| Page | URL | Purpose |
|------|-----|---------|
| **Home** | `/index.html` | Browse shoes, redeem codes, view store status |
| **Sign Up** | `/signup.html` | Create new account |
| **Log In** | `/login.html` | Login with existing email |
| **Admin** | `/admin.html` | Manage shop, users, inventory, codes |

---

## 🔐 Admin Access

**URL:** `http://localhost/.../admin.html`

**Default Credentials:**
- **Username:** `admin`
- **Password:** `style18admin`

### Admin Features

✅ **Dashboard Overview**
- Total registered users
- Total shoes listed
- Available inventory count
- Banned accounts count
- Store open/closed status

✅ **Shoe Management**
- Add new shoes with name, description, price, image
- Edit shoe details
- Toggle availability (Available / Out of Stock)
- Delete shoes

✅ **User Management**
- View all registered users
- Ban/unban accounts
- Send direct messages to users

✅ **Shop Settings**
- Update store address
- Set opening hours
- Open/close store (affects home page banner)

✅ **Redeem Codes**
- Issue discount codes (e.g., "STYLE10" = 10% off)
- View all active codes
- Delete codes

✅ **Messaging**
- Send messages to users
- Users see unread message badge in navbar
- Messages persist until read

---

## 👤 User Accounts

### Sign Up
- Create account with email, password, name
- Email must be unique
- Password must be 6+ characters

### Log In
- Log in with registered email & password
- Session persists during browser session
- Auto-logout on browser close

### User Features
- Browse and view shoe details
- Apply redeem codes for discounts
- Receive messages from admin
- View store location & hours
- Account status shown in navbar (logged in user name)

### Banned Users
- Admin can ban accounts from user management
- Banned users see full-screen ban notice on next login
- Cannot browse or perform actions

---

## 💰 Redeem Codes

**Default Codes (pre-loaded):**
- `STYLE10` → 10% Off
- `HIDE20` → 20% Off
- `LAUNCH50` → 50% Off (Launch Special)
- `VIP15` → 15% VIP Discount

**How to Use:**
1. User enters code in navbar redeem box
2. Discount badge appears
3. (In a real store, discount would apply at checkout)

**Admin Controls:**
- Create new codes with custom discount % and label
- View all active codes
- Delete codes anytime

---

## 👟 Pre-loaded Shoes

All shoes come with default prices (changeable by admin):

1. **Premium Black Leather Slip-On** — Rs. 4,500
2. **Classic Comfort Dress Shoe** — Rs. 5,200
3. **Premium Brown Leather Slip-On** — Rs. 4,800
4. **Men's Black Leather Horsebit Tassel Loafer 🎱** — Rs. 6,500
5. **SPECIAL: Crocodile-Embossed Leather Loafers** — Rs. 8,500

Each shoe has:
- Auto-generated placeholder image
- Name & description
- Price
- Availability status (toggled by admin)

---

## 📊 Data Storage

All data saved in **browser localStorage** under keys:
- `sh18_shoes` — Shoe inventory
- `sh18_users` — User accounts
- `sh18_shop` — Store info (address, hours, open status)
- `sh18_codes` — Redeem codes
- `sh18_msgs` — Admin messages
- `sh18_admin` — Admin session (sessionStorage)
- `sh18_session` — User session (sessionStorage)

**Clear Data:** Open DevTools → Application → localStorage → clear all items

---

## 🎨 Features

✨ **Home Page**
- Hero section with CTA buttons
- Premium shoe collection grid
- Shoe detail modal (click any shoe)
- Shop status banner (open/closed)
- Store location with map
- Redeem code input (top right)
- Responsive design (mobile-friendly)

✨ **Authentication**
- Signup with validation
- Login with session management
- Password confirmation
- Email uniqueness check

✨ **Admin Dashboard**
- Dark theme with gold accents
- Sidebar navigation
- Data-driven stats cards
- Responsive tables with actions
- Modal forms for adding/editing
- Form validation & error messages
- Success notifications

---

## 🛠️ File Structure

```
style18hide/
├── index.html              # Home page
├── signup.html             # Sign up form
├── login.html              # Login form
├── admin.html              # Admin dashboard (gated)
├── app.js                  # Home page logic
├── admin.js                # Admin logic
├── data.js                 # Shared data store & storage helpers
├── style.css               # All styles (responsive)
├── logo.svg                # Fallback logo (SVG)
├── images/
│   ├── shoe1.jpg          # Shoe placeholder images (auto-generated)
│   ├── shoe2.jpg
│   ├── shoe3.jpg
│   ├── shoe4.jpg
│   ├── shoe5.jpg
│   └── placeholder.png
├── make-images.js         # Script to generate placeholder images
├── generate-placeholders.html  # Browser-based placeholder generator
└── README.md              # This file
```

---

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔧 Customization

### Change Shop Details
1. Go to Admin → Shop Settings
2. Update address, hours, open status
3. Click Save

### Add New Shoe
1. Admin → Shoes tab
2. Fill form (name, description, price, image URL)
3. Click "Add Shoe"

### Issue Redeem Code
1. Admin → Redeem Codes tab
2. Enter code, discount %, and label
3. Click "Issue Code"

### Ban User
1. Admin → Users tab
2. Click "Ban" on the user row
3. User blocked on next login

### Message User
1. Admin → Users tab
2. Click "📨 Message" on user row
3. Type message and send
4. User sees 📬 badge on navbar

---

## 💡 Tips

- **Test as User:** Logout & browse as guest to see public view
- **Test as Admin:** Login to admin with default credentials
- **Data Persists:** Refresh page — all data remains
- **Try Codes:** Enter "STYLE10" in redeem box to test
- **Mobile:** Resize browser to test responsive layout

---

## 📝 Notes

- All passwords stored client-side (for demo only — use proper auth in production)
- No real payment processing
- Google Maps embed uses placeholder coordinates
- Images are auto-generated SVG placeholders (replace with real images)

---

## ✅ What's Included

✅ Full e-commerce frontend  
✅ User authentication system  
✅ Admin dashboard with full CRUD  
✅ Inventory management  
✅ User management & banning  
✅ Messaging system  
✅ Discount code system  
✅ Responsive design  
✅ Dark theme with gold accents  
✅ Mobile-friendly  

---

**Made with ❤️ for Style 18 Hide — Le Jao ®**

*Last updated: August 17, 2026*
