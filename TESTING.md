# 🧪 Testing Guide — Style 18 Hide

Quick walkthrough to test all features.

---

## 👤 Test User Registration & Login

### Sign Up (New User)
1. Open `index.html`
2. Click **Sign Up** button
3. Fill form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "test123"
   - Confirm: "test123"
4. Click **Create Account**
5. ✅ Redirects to home, logged in as "Test User"

### Log Out
1. Click **Log Out** button (top right)
2. Redirects to home, page reloads
3. ✅ Now shows "Log In" and "Sign Up" buttons

### Log In (Existing User)
1. Click **Log In**
2. Email: "test@example.com"
3. Password: "test123"
4. ✅ Logged back in

---

## 👟 Test Shoe Browsing

### View Shoes
1. Home page displays 5 pre-loaded shoes
2. Click any shoe card
3. ✅ Modal opens showing shoe details, image, price, availability

### Check Availability
1. Admin toggles availability → shoe shows ❌ Out of Stock
2. Customer modal shows red status
3. ✅ Status syncs across pages

---

## 💰 Test Redeem Code

### Apply Valid Code
1. Logged in as any user
2. Top right: enter **"STYLE10"** in redeem box
3. Click **Apply**
4. ✅ Green badge appears: "🎉 10% Off applied!"

### Try Invalid Code
1. Enter "BADCODE"
2. Click **Apply**
3. ✅ Red badge shows: "❌ Invalid code"

### Try as Guest (Not Logged In)
1. Log out first
2. Enter code in navbar
3. ✅ Still works (codes apply regardless of login)

---

## 🏪 Test Store Status

### Home Page Banner
1. Home page top banner shows "🟢 Store is OPEN"
2. Location section shows "Open Now" with green dot
3. ✅ Green pulse animation on dot

### Admin Changes Status
1. Login to admin (see below)
2. Go to **Shop Settings**
3. Select **🔴 Closed**
4. Click **Save Settings**
5. ✅ Go back to home — banner now shows "🔴 Store is CLOSED"

---

## 🔐 Test Admin Panel

### Admin Login
1. Open `/admin.html`
2. Username: **admin**
3. Password: **style18admin**
4. Click **Access Admin Panel**
5. ✅ Login gate disappears, dashboard visible

### Overview Tab (Default)
- Shows 4 stat cards
- Lists registered users count
- Lists shoes count
- Shows available inventory
- Shows banned accounts count

---

## 👞 Test Shoe Management

### Add Shoe
1. Admin → **Shoes** tab
2. Form: Fill fields
   - Name: "New Loafer Premium"
   - Description: "Extra comfort design"
   - Price: "7500"
   - Image: "images/shoe6.jpg"
3. Click **Add Shoe**
4. ✅ Table updates with new shoe (6 total now)
5. ✅ Overview stat updates to 6

### Edit Shoe
1. Click **✏️ Edit** on any shoe
2. Change price to "5000"
3. Click **Save Changes**
4. ✅ Table updates instantly
5. ✅ Home page shows new price

### Toggle Availability
1. Click **Mark Unavailable** on a shoe
2. ✅ Status pill turns red: "Out of Stock"
3. Click **Mark Available**
4. ✅ Status pill turns green: "Available"

### Delete Shoe
1. Click **🗑 Delete** on a shoe
2. Confirm deletion
3. ✅ Shoe removed from table
4. ✅ Home page refreshes automatically

---

## 👥 Test User Management

### View Users
1. Admin → **Users** tab
2. Table shows all registered users with:
   - Name, Email, Join date
   - Active/Banned status
   - Message & Ban buttons

### Ban User
1. Find a user row
2. Click **Ban** button
3. ✅ Status pill turns red: "Banned"
4. Test banned user:
   - Logout current user
   - Login as banned user (same email/password)
   - ✅ Full-screen ban notice appears
5. Unban: Click **Ban** again (toggles)
6. ✅ User can login again

### Message User
1. Click **📨 Message** on a user
2. Modal appears: "To: [Name] <email>"
3. Type message: "Welcome to Style 18 Hide!"
4. Click **Send**
5. ✅ Success message: "✅ Message sent!"

### View Message as User
1. Login as that user
2. ✅ Navbar shows **📬 1 msg** badge
3. Click badge
4. ✅ Modal shows message from admin

---

## 🎟️ Test Redeem Codes

### Default Codes
Admin → **Redeem Codes** tab shows 4 pre-loaded:
- STYLE10 → 10% Off
- HIDE20 → 20% Off
- LAUNCH50 → 50% Off (Launch Special)
- VIP15 → 15% VIP Discount

### Issue New Code
1. Fill form:
   - Code: "SUMMER25"
   - Discount: "25"
   - Label: "25% Off Summer Sale"
2. Click **Issue Code**
3. ✅ Table adds new code
4. Test it: Go home, enter "SUMMER25" in redeem box
5. ✅ Badge shows: "🎉 25% Off Summer Sale applied!"

### Delete Code
1. Click **Delete** on a code row
2. Confirm
3. ✅ Code removed
4. Try using deleted code on home
5. ✅ Now shows invalid

---

## 🏪 Test Shop Settings

### Update Address
1. Admin → **Shop Settings**
2. Address field: "Sheikh Zaid Road, Dubai, UAE"
3. Hours: "Mon–Sun: 11am–11pm"
4. Status: "🟢 Open"
5. Click **Save Settings**
6. ✅ Success message: "✅ Saved!"
7. Go to home → Location section
8. ✅ New address displayed

### Change Store Status
1. Admin → Shop Settings
2. Select **🔴 Closed**
3. Save
4. ✅ Home page banner: "🔴 Store is currently CLOSED"
5. Location section: "Closed" status

---

## 📱 Test Responsive Design

### Desktop
1. View all pages at full width
2. ✅ All sections properly spaced

### Tablet (768px)
1. Resize browser to 768px width
2. ✅ Shoes grid adjusts to 2-3 columns
3. ✅ Navbar wraps gracefully
4. ✅ Admin sidebar wraps to horizontal

### Mobile (375px)
1. Resize to 375px width
2. ✅ Hero text readable
3. ✅ Shoes grid: 1 column
4. ✅ Buttons stack
5. ✅ Modal centered
6. ✅ Admin sidebar becomes horizontal bar

---

## 🔄 Test Data Persistence

### After Refresh
1. Add a shoe as admin
2. Refresh page (F5)
3. ✅ Shoe still there

### After Logout/Login
1. Login as user
2. Logout
3. Login again with same email
4. ✅ Session restores

### After Closing Browser
1. Browser tabs close completely
2. Reopen `index.html`
3. ✅ All shoes, users, settings still exist
4. ✅ Session cleared (must login again)

### Clear Data
1. Open DevTools (F12)
2. Application tab → localStorage
3. Delete all `sh18_*` keys
4. Refresh page
5. ✅ Resets to defaults

---

## ✨ Visual Quality Tests

✅ **Hero Section**
- Logo displays clearly
- Text centered and readable
- Buttons have proper contrast
- Background gradient smooth

✅ **Shoe Cards**
- Images load/show placeholder
- Hover effect lifts card
- Availability tag positioned correctly
- Price displays in gold

✅ **Admin Dashboard**
- Dark theme with gold accents
- Sidebar navigation clear
- Tables scrollable on small screens
- Modals centered and accessible
- Form inputs styled consistently

✅ **Color Scheme**
- Gold (#c9a84c) is primary
- Dark backgrounds (#0a0a0a)
- Text readable on all backgrounds
- Status indicators clear (green/red)

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Logo not showing | Check `logo.png` exists or use fallback `logo.svg` |
| Shoe images blank | Click shoe → shows placeholder if path invalid |
| Admin can't login | Credentials: admin / style18admin |
| Messages not showing | Logout → login as recipient to see badge |
| Data lost | Check if localStorage was cleared |
| Banned user can't access site | Is feature working: redirects to ban screen ✅ |

---

## ✅ Checklist

- [ ] Signup/Login works
- [ ] Can browse shoes
- [ ] Modal shows shoe details
- [ ] Redeem codes apply
- [ ] Admin login works
- [ ] Can add/edit/delete shoes
- [ ] Can ban/message users
- [ ] Can manage shop settings
- [ ] Can issue/delete codes
- [ ] Store status syncs
- [ ] Messages persist
- [ ] Data persists after refresh
- [ ] Mobile layout responsive
- [ ] Admin sidebar navigates
- [ ] All buttons functional

---

**Happy Testing! 🎉**
