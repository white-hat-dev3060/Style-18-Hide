# 🚀 Deployment Guide — Style 18 Hide

How to publish your website online.

---

## 📍 Where to Deploy

### 1. **GitHub Pages** (Free, Popular)

**Steps:**
1. Create GitHub account at github.com
2. Create new repository: `style18hide` (public)
3. Upload all files to repo
4. Settings → Pages → Select main branch
5. Your site: `yourusername.github.io/style18hide`

**Advantages:** Free, easy, automatic updates

### 2. **Netlify** (Free, Easiest)

**Steps:**
1. Go to netlify.com
2. Click "Drop files here to deploy"
3. Drag & drop the `style18hide` folder
4. ✅ Instant deployment!
5. Get random URL or custom domain

**Advantages:** No account needed, instant, free SSL

### 3. **Vercel** (Free, Fast)

**Steps:**
1. Go to vercel.com
2. Click "Deploy"
3. Select GitHub repo or upload files
4. ✅ Automatic deployment
5. Get custom domain

**Advantages:** Fast CDN, auto-scaling, free SSL

### 4. **Shared Hosting** (Paid)

**Steps:**
1. Buy hosting plan
2. FTP/cPanel upload all files
3. Navigate to folder in browser
4. ✅ Live!

**Popular hosts:** Namecheap, GoDaddy, Hostinger, Bluehost

### 5. **AWS / Google Cloud** (Paid, Advanced)

Uses S3 (AWS) or Cloud Storage (Google)

**Advantages:** Scalable, professional, CDN included

---

## 🎯 Pre-Deployment Checklist

Before uploading, verify:

- [ ] Logo.png in place (or using SVG fallback)
- [ ] All images in `images/` folder
- [ ] Admin credentials updated (if needed)
- [ ] Store address & hours set
- [ ] All shoes have descriptions & prices
- [ ] Test locally first (open index.html)
- [ ] Tested on mobile
- [ ] Tested in multiple browsers
- [ ] No console errors (F12 to check)

---

## 📝 Pre-Deployment Updates

### Update Admin Credentials

**File:** `data.js` (Line 24)

```javascript
const ADMIN_CREDS = { 
  username: "admin", 
  password: "style18admin"  // ← Change this!
};
```

Change to your preferred password.

### Update Store Info

**File:** `data.js` (Lines 17-21)

```javascript
const DEFAULT_SHOP = {
  address: "Shop #18, Gulshan-e-Iqbal, Karachi, Pakistan",  // ← Update
  hours: "Mon–Sat: 10:00 AM – 9:00 PM  |  Sun: 12:00 PM – 6:00 PM",  // ← Update
  open: true
};
```

Update to your actual store details.

### Add Your Logo

**File:** Root folder

Place `logo.png` (400x100px recommended) in project root.

If not added, SVG `logo.svg` is used.

---

## 🌐 Custom Domain Setup

### Using Your Own Domain

**1. Buy domain** (GoDaddy, Namecheap, etc.)

**2. For GitHub Pages:**
- Settings → Pages → Custom domain
- Enter `yourdomain.com`
- Add DNS records pointing to GitHub

**3. For Netlify:**
- Domain settings → Add custom domain
- Update DNS records with Netlify nameservers

**4. For Vercel:**
- Settings → Domains → Add domain
- Configure DNS

---

## 🔒 Security Checklist

Before going live, verify:

- [ ] Admin password is strong (not "style18admin")
- [ ] No hardcoded secrets in code
- [ ] HTTPS enabled (free with most hosts)
- [ ] Remove test data before final launch
- [ ] Backup all files before deployment
- [ ] Test banned user functionality
- [ ] Test messaging system

---

## 📊 Post-Deployment

### Verify Live Site

1. Visit your live URL
2. Open DevTools (F12)
3. Check console for errors
4. Test core functions:
   - [ ] Signup works
   - [ ] Login works
   - [ ] Shoes display
   - [ ] Admin accessible
   - [ ] Redeem codes work
   - [ ] Messages work
   - [ ] Mobile responsive

### Monitor Performance

- Check load time
- Monitor error logs
- Test on different devices
- Get user feedback

---

## 🔄 Deployment Options Comparison

| Platform | Cost | Setup Time | SSL | Custom Domain | CDN |
|----------|------|-----------|-----|---------------|-----|
| **GitHub Pages** | Free | 5 min | ✅ | ✅ | ✅ |
| **Netlify** | Free | 1 min | ✅ | ✅ | ✅ |
| **Vercel** | Free | 3 min | ✅ | ✅ | ✅ |
| **Shared Hosting** | $3-10/mo | 10 min | ✅ | ✅ | ❌ |
| **AWS S3** | Pay per use | 20 min | ✅ | ✅ | ✅ |

**Recommendation:** Use **Netlify** for fastest, easiest deployment.

---

## 📈 Traffic & Analytics

### Add Google Analytics

**File:** `index.html` (in `<head>`)

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your Google Analytics ID from analytics.google.com.

---

## 🐛 Troubleshooting

### Site shows 404 error

- **GitHub Pages:** Ensure repo is public
- **Netlify:** Ensure index.html is in root folder
- **Vercel:** Check build settings

### Assets not loading

- Ensure all files uploaded
- Check file paths are correct
- Verify `images/` folder exists

### Admin login not working

- Verify `data.js` credentials are correct
- Check browser cache (Ctrl+Shift+Delete)
- Test in private/incognito window

### Data not persisting

- Check if localStorage enabled in browser
- Ensure not in private/incognito mode
- Verify storage quota not exceeded

---

## 📱 Mobile App Distribution

### For App Stores

This is a web app. To convert to mobile app:

**Option 1: Progressive Web App (PWA)**
- Add `manifest.json`
- Add service worker
- Install as app from browser

**Option 2: Wrapper Apps**
- Use Cordova, PhoneGap, or Capacitor
- Wrap web app in native shell
- Publish to Apple App Store & Google Play

**Option 3: Web Wrapper**
- Use services like PWABuilder
- Generate app packages automatically

---

## 🌍 Global Deployment

### Using CDN (Faster Worldwide)

Services like Cloudflare CDN:

1. Sign up at cloudflare.com
2. Add your domain
3. Update nameservers
4. Enable caching
5. ✅ Global distribution

**Benefits:** Faster load times worldwide, DDoS protection, automatic HTTPS

---

## 💰 Cost Breakdown

| Item | Cost | Notes |
|------|------|-------|
| Domain | $10/year | namecheap.com |
| Hosting | Free | Netlify, Vercel, or GitHub |
| SSL | Free | Included with most hosts |
| CDN | Free/Optional | Cloudflare adds ~$20/month |
| Email | Free/Optional | Use Gmail or add mailbox |
| **Total** | **$10/year** | Everything included except fancy CDN |

---

## 🚀 Quick Deploy Commands

### GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/username/style18hide.git
git push -u origin main
```

Then enable Pages in GitHub Settings.

### Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### Vercel CLI

```bash
npm i -g vercel
vercel
```

---

## 📞 Support Resources

- **GitHub Pages:** pages.github.com
- **Netlify:** netlify.com/docs
- **Vercel:** vercel.com/docs
- **DNS Help:** mxroute.com/dns-setup

---

## ✅ Launch Checklist

- [ ] Choose hosting platform
- [ ] Update admin credentials (data.js)
- [ ] Update store info (data.js)
- [ ] Add logo.png (optional, SVG fallback)
- [ ] Test locally (open index.html)
- [ ] Upload all files
- [ ] Verify live site
- [ ] Test all features
- [ ] Configure custom domain (optional)
- [ ] Set up analytics (optional)
- [ ] Announce launch!

---

## 🎉 You're Live!

Your Style 18 Hide store is now on the internet for everyone to see!

**Share your URL with:**
- Friends & family
- Social media
- Email marketing
- Business partners

---

**Happy Deploying!** 🚀

*Questions? Check platform-specific documentation or contact support.*
