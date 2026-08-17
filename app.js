// =============================================
//  STYLE 18 HIDE — Home Page Logic
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  renderShoes();
  renderShopStatus();
  renderNavUser();
});

// ---- Navbar user state ----
function renderNavUser() {
  const user = currentUser();
  const actions = document.querySelector(".nav-actions");
  if (!actions) return;

  // Find / replace login+signup buttons
  const loginBtn = actions.querySelector('a[href="login.html"]');
  const signupBtn = actions.querySelector('a[href="signup.html"]');

  if (user) {
    if (loginBtn) loginBtn.remove();
    if (signupBtn) {
      signupBtn.textContent = "Log Out";
      signupBtn.href = "#";
      signupBtn.onclick = (e) => { e.preventDefault(); clearSession(); location.reload(); };
    }

    // Show inbox badge if has messages
    const msgs = loadMessages().filter(m => m.to === user.email && !m.read);
    if (msgs.length > 0) {
      const badge = document.createElement("span");
      badge.className = "inbox-badge";
      badge.innerHTML = `📬 ${msgs.length} msg`;
      badge.onclick = showInbox;
      badge.style.cursor = "pointer";
      actions.insertBefore(badge, signupBtn);
    }

    // Check if banned
    const users = loadUsers();
    const u = users.find(u => u.email === user.email);
    if (u && u.banned) {
      showBannedScreen();
    }
  }
}

// ---- Banned user screen ----
function showBannedScreen() {
  document.body.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a0a;color:#fff;flex-direction:column;gap:1rem;">
      <h1 style="color:#e74c3c;">🚫 Account Banned</h1>
      <p style="opacity:.7;">Your account has been banned by the administrator.</p>
      <button onclick="logoutAndRedirect()" style="padding:.7rem 2rem;background:#c0392b;color:#fff;border:none;border-radius:8px;cursor:pointer;">Sign Out</button>
    </div>`;
}

function logoutAndRedirect() {
  clearSession();
  window.location.href = "index.html";
}

// ---- Render shoe cards ----
function renderShoes() {
  const grid = document.getElementById("shoesGrid");
  if (!grid) return;
  const shoes = loadShoes();
  const discount = getAppliedDiscount();
  
  grid.innerHTML = shoes.map(s => {
    const discountedPrice = discount ? Math.floor(s.price * (100 - discount.discount) / 100) : s.price;
    const savings = s.price - discountedPrice;
    
    return `
    <div class="shoe-card" onclick="openModal(${s.id})">
      <div class="shoe-img-wrap">
        <img src="${s.img}" alt="${s.name}" onerror="this.src='images/placeholder.png'"/>
        <span class="availability-tag ${s.available ? 'avail' : 'unavail'}">
          ${s.available ? "✅ Available" : "❌ Out of Stock"}
        </span>
        ${discount ? `<span class="discount-tag">-${discount.discount}%</span>` : ''}
      </div>
      <div class="shoe-info">
        <h3>${s.name}</h3>
        <div style="display:flex;gap:0.5rem;align-items:center">
          <p class="shoe-price">Rs. ${Number(discountedPrice).toLocaleString()}</p>
          ${savings > 0 ? `<p style="font-size:0.8rem;opacity:0.6;text-decoration:line-through">Rs. ${Number(s.price).toLocaleString()}</p>` : ''}
        </div>
        ${savings > 0 ? `<p style="font-size:0.75rem;color:#27ae60;font-weight:600">Save Rs. ${Number(savings).toLocaleString()}</p>` : ''}
      </div>
    </div>
  `}.join(""));
}

// Get applied discount code
function getAppliedDiscount() {
  const s = sessionStorage.getItem("sh18_discount");
  return s ? JSON.parse(s) : null;
}

// ---- Modal ----
function openModal(id) {
  const shoes = loadShoes();
  const s = shoes.find(x => x.id === id);
  if (!s) return;
  
  const discount = getAppliedDiscount();
  const discountedPrice = discount ? Math.floor(s.price * (100 - discount.discount) / 100) : s.price;
  const savings = s.price - discountedPrice;
  
  document.getElementById("modalImg").src = s.img;
  document.getElementById("modalImg").onerror = function(){ this.src="images/placeholder.png"; };
  document.getElementById("modalName").textContent = s.name;
  
  let priceText = "Rs. " + Number(discountedPrice).toLocaleString();
  if (savings > 0) {
    priceText += ` (Save Rs. ${Number(savings).toLocaleString()})`;
  }
  document.getElementById("modalPrice").textContent = priceText;
  
  if (savings > 0) {
    document.getElementById("modalPrice").style.color = "#2ecc71";
  } else {
    document.getElementById("modalPrice").style.color = "var(--gold)";
  }
  
  document.getElementById("modalStatus").textContent = s.available ? "✅ Available" : "❌ Out of Stock";
  document.getElementById("modalStatus").className = "modal-status " + (s.available ? "avail" : "unavail");
  document.getElementById("modalDesc").textContent = s.desc;
  document.getElementById("shoeModal").classList.add("active");
}
function closeModal() {
  document.getElementById("shoeModal").classList.remove("active");
}
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ---- Shop Status ----
function renderShopStatus() {
  const shop = loadShop();
  const bar = document.getElementById("shopStatusBar");
  const content = document.getElementById("shopStatusContent");
  const dot = document.getElementById("storeStatusDot");
  const label = document.getElementById("storeStatusLabel");

  if (bar) {
    const statusText = shop.open
      ? "🟢 Store is OPEN — Come visit us!"
      : "🔴 Store is currently CLOSED — See you soon!";
    
    if (content) {
      content.textContent = statusText;
    } else {
      bar.textContent = statusText;
    }
    bar.className = "shop-status-bar " + (shop.open ? "open" : "closed");
  }
  if (dot) dot.className = "dot " + (shop.open ? "dot-open" : "dot-closed");
  if (label) label.textContent = shop.open ? "Open Now" : "Closed";

  const hrs  = document.getElementById("storeHours");
  if (hrs)  hrs.textContent  = shop.hours;
  
  // Update countdown
  updateStoreCountdown();
}

// ---- Store Countdown Timer ----
function updateStoreCountdown() {
  const countdownEl = document.getElementById("storeCountdown");
  if (!countdownEl) return;

  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const hours = now.getHours();
  const minutes = now.getMinutes();

  let closeTime = null;
  let isClosed = false;

  // Mon-Sat: 10am-9pm, Sun: 12pm-6pm
  if (day === 0) { // Sunday
    if (hours < 12 || (hours >= 18)) {
      isClosed = true;
      closeTime = "Opens tomorrow at 10:00 AM";
    } else {
      closeTime = new Date(now);
      closeTime.setHours(18, 0, 0);
    }
  } else if (day >= 1 && day <= 6) { // Mon-Sat
    if (hours < 10 || (hours >= 21)) {
      isClosed = true;
      closeTime = "Opens tomorrow at 10:00 AM";
    } else {
      closeTime = new Date(now);
      closeTime.setHours(21, 0, 0);
    }
  }

  if (isClosed) {
    countdownEl.textContent = closeTime;
    countdownEl.style.color = "#e74c3c";
  } else {
    const timeDiff = closeTime - now;
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minsLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    countdownEl.textContent = `⏰ Closes in ${hoursLeft}h ${minsLeft}m`;
    countdownEl.style.color = "#f39c12";
  }
}

// Update countdown every minute
setInterval(updateStoreCountdown, 60000);

// ---- Redeem Code ----
function applyRedeem() {
  const input = document.getElementById("redeemInput").value.trim().toUpperCase();
  const badge = document.getElementById("discountBadge");
  const codes = loadCodes();
  const match = codes.find(c => c.code === input);
  if (match) {
    badge.textContent = "🎉 " + match.label + " applied!";
    badge.classList.remove("hidden");
    badge.classList.add("show");
    sessionStorage.setItem("sh18_discount", JSON.stringify(match));
    renderShoes(); // Update prices with discount
  } else {
    badge.textContent = "❌ Invalid code";
    badge.classList.remove("hidden");
    badge.classList.add("show");
    badge.style.background = "#c0392b";
    setTimeout(() => { badge.classList.add("hidden"); badge.style.background = ""; }, 3000);
  }
}

// Enter key on redeem
document.addEventListener("DOMContentLoaded", () => {
  const ri = document.getElementById("redeemInput");
  if (ri) ri.addEventListener("keydown", e => { if (e.key === "Enter") applyRedeem(); });
  // Prevent default form submission on modals
  document.addEventListener("click", e => {
    if (e.target.classList.contains("modal-overlay")) e.currentTarget.classList.remove("active");
  });
});

// ---- Inbox (messages from admin) ----
function showInbox() {
  const user = currentUser();
  if (!user) return;
  const msgs = loadMessages().filter(m => m.to === user.email);
  const allMsgs = loadMessages();
  // Mark as read
  allMsgs.forEach(m => { if (m.to === user.email) m.read = true; });
  saveMessages(allMsgs);

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay active";
  overlay.innerHTML = `
    <div class="modal-box" style="max-width:500px">
      <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      <h3 style="margin-bottom:1rem">📬 Messages from Admin</h3>
      ${msgs.length === 0 ? "<p style='opacity:.6'>No messages yet.</p>" :
        msgs.map(m => `<div class="inbox-msg"><b>${m.from || "Admin"}</b><p>${m.body}</p><small>${m.date}</small></div>`).join("")}
    </div>`;
  document.body.appendChild(overlay);
}
