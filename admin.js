// =============================================
//  STYLE 18 HIDE — Admin Panel Logic
// =============================================

let msgTargetEmail = "";

// ---- Auth ----
function adminLogin(e) {
  e.preventDefault();
  const u = document.getElementById("aUser").value.trim();
  const p = document.getElementById("aPass").value;
  const err = document.getElementById("adminLoginErr");

  if (u === ADMIN_CREDS.username && p === ADMIN_CREDS.password) {
    sessionStorage.setItem("sh18_admin", "1");
    document.getElementById("adminGate").style.display = "none";
    document.getElementById("adminDash").style.display = "flex";
    initAdmin();
  } else {
    err.textContent = "❌ Invalid credentials.";
    err.classList.remove("hidden");
  }
}

function adminLogout() {
  sessionStorage.removeItem("sh18_admin");
  window.location.href = "index.html";
}

// Auto-show dash if already authenticated this session
window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("sh18_admin") === "1") {
    document.getElementById("adminGate").style.display = "none";
    document.getElementById("adminDash").style.display = "flex";
    initAdmin();
  }
});

function initAdmin() {
  renderOverview();
  renderShoesTable();
  renderUsersTable();
  loadShopForm();
  renderCodesTable();
  setupDragDrop();
}

// ---- Tab switching ----
function switchTab(name, el) {
  document.querySelectorAll(".admin-tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".sidebar-link").forEach(l => l.classList.remove("active"));
  document.getElementById("tab-" + name).classList.add("active");
  if (el) el.classList.add("active");
  // refresh content
  if (name === "overview") renderOverview();
  if (name === "shoes")    renderShoesTable();
  if (name === "users")    renderUsersTable();
  if (name === "shop")     loadShopForm();
  if (name === "codes")    renderCodesTable();
}

// ---- Overview ----
function renderOverview() {
  const users  = loadUsers();
  const shoes  = loadShoes();
  const avail  = shoes.filter(s => s.available).length;
  const banned = users.filter(u => u.banned).length;
  const shop   = loadShop();

  document.getElementById("statUsers").textContent  = users.length;
  document.getElementById("statShoes").textContent  = shoes.length;
  document.getElementById("statAvail").textContent  = avail;
  document.getElementById("statBanned").textContent = banned;
  document.getElementById("overviewStoreStatus").textContent =
    shop.open ? "🟢 Store is OPEN" : "🔴 Store is CLOSED";
}

// ---- Shoes ----
function renderShoesTable() {
  const shoes = loadShoes();
  const tbody = document.getElementById("shoesTbody");
  tbody.innerHTML = shoes.map(s => `
    <tr>
      <td><img src="${s.img}" onerror="this.src='images/placeholder.png'" style="width:60px;height:50px;object-fit:cover;border-radius:6px"/></td>
      <td>${s.name}</td>
      <td>Rs. ${Number(s.price).toLocaleString()}</td>
      <td>
        <span class="pill ${s.available ? 'pill-green' : 'pill-red'}">
          ${s.available ? "Available" : "Out of Stock"}
        </span>
      </td>
      <td class="action-btns">
        <button class="btn-sm btn-blue" onclick="openEditShoe(${s.id})">✏️ Edit</button>
        <button class="btn-sm ${s.available ? 'btn-orange' : 'btn-green'}" onclick="toggleAvail(${s.id})">
          ${s.available ? "Mark Unavailable" : "Mark Available"}
        </button>
        <button class="btn-sm btn-red" onclick="deleteShoe(${s.id})">🗑 Delete</button>
      </td>
    </tr>
  `).join("");
}

function addShoe() {
  const name  = document.getElementById("newShoeName").value.trim();
  const desc  = document.getElementById("newShoeDesc").value.trim();
  const price = parseFloat(document.getElementById("newShoePrice").value);
  const img   = document.getElementById("newShoeImg").value.trim() || "images/placeholder.png";

  if (!name || isNaN(price)) { alert("Please enter shoe name and price."); return; }

  const shoes = loadShoes();
  const newId = shoes.length ? Math.max(...shoes.map(s => s.id)) + 1 : 1;
  shoes.push({ id: newId, name, desc, price, available: true, img });
  saveShoes(shoes);
  renderShoesTable();
  renderOverview();

  // Clear form
  document.getElementById("newShoeName").value = "";
  document.getElementById("newShoeDesc").value = "";
  document.getElementById("newShoePrice").value = "";
  document.getElementById("newShoeImg").value = "";
}

function toggleAvail(id) {
  const shoes = loadShoes();
  const s = shoes.find(x => x.id === id);
  if (s) { s.available = !s.available; saveShoes(shoes); renderShoesTable(); renderOverview(); }
}

function deleteShoe(id) {
  if (!confirm("Delete this shoe?")) return;
  saveShoes(loadShoes().filter(s => s.id !== id));
  renderShoesTable();
  renderOverview();
}

function openEditShoe(id) {
  const shoes = loadShoes();
  const s = shoes.find(x => x.id === id);
  if (!s) return;
  document.getElementById("editShoeId").value    = id;
  document.getElementById("editShoeName").value  = s.name;
  document.getElementById("editShoeDesc").value  = s.desc;
  document.getElementById("editShoePrice").value = s.price;
  document.getElementById("editShoeImg").value   = s.img;
  document.getElementById("editShoeAvail").value = s.available ? "true" : "false";
  document.getElementById("editShoeModal").classList.add("active");
}

function saveEditShoe() {
  const id    = parseInt(document.getElementById("editShoeId").value);
  const shoes = loadShoes();
  const s     = shoes.find(x => x.id === id);
  if (!s) return;
  s.name      = document.getElementById("editShoeName").value.trim();
  s.desc      = document.getElementById("editShoeDesc").value.trim();
  s.price     = parseFloat(document.getElementById("editShoePrice").value);
  s.img       = document.getElementById("editShoeImg").value.trim();
  s.available = document.getElementById("editShoeAvail").value === "true";
  saveShoes(shoes);
  document.getElementById("editShoeModal").classList.remove("active");
  renderShoesTable();
}

// ---- Users ----
function renderUsersTable() {
  const users = loadUsers();
  const tbody = document.getElementById("usersTbody");
  if (users.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;opacity:.5">No registered users yet.</td></tr>`;
    return;
  }
  tbody.innerHTML = users.map((u, i) => `
    <tr>
      <td>${i + 1}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.joined || "—"}</td>
      <td>
        <span class="pill ${u.banned ? 'pill-red' : 'pill-green'}">
          ${u.banned ? "Banned" : "Active"}
        </span>
      </td>
      <td class="action-btns">
        <button class="btn-sm btn-blue" onclick="openMsgModal('${u.email}', '${escHtml(u.name)}')">📨 Message</button>
        <button class="btn-sm ${u.banned ? 'btn-green' : 'btn-red'}" onclick="toggleBan('${u.email}')">
          ${u.banned ? "Unban" : "Ban"}
        </button>
      </td>
    </tr>
  `).join("");
}

function toggleBan(email) {
  const users = loadUsers();
  const u = users.find(x => x.email === email);
  if (u) { u.banned = !u.banned; saveUsers(users); renderUsersTable(); renderOverview(); }
}

function escHtml(s) { return s.replace(/'/g, "\\'"); }

// ---- Messaging ----
function openMsgModal(email, name) {
  msgTargetEmail = email;
  document.getElementById("msgToLabel").textContent = "To: " + name + " <" + email + ">";
  document.getElementById("msgBody").value = "";
  document.getElementById("msgSent").classList.add("hidden");
  document.getElementById("msgModal").classList.add("active");
}

function sendMsg() {
  const body = document.getElementById("msgBody").value.trim();
  if (!body) return;
  const msgs = loadMessages();
  msgs.push({
    id: Date.now(),
    to: msgTargetEmail,
    from: "Style 18 Hide Admin",
    body,
    date: new Date().toLocaleString(),
    read: false
  });
  saveMessages(msgs);
  document.getElementById("msgSent").classList.remove("hidden");
  document.getElementById("msgBody").value = "";
}

// ---- Shop Settings ----
function loadShopForm() {
  const shop = loadShop();
  document.getElementById("shopAddr").value  = shop.address;
  document.getElementById("shopHours").value = shop.hours;
  document.getElementById("shopStatus").value = shop.open ? "open" : "closed";
}

function saveShopSettings() {
  const shop = loadShop();
  shop.address = document.getElementById("shopAddr").value.trim();
  shop.hours   = document.getElementById("shopHours").value.trim();
  shop.open    = document.getElementById("shopStatus").value === "open";
  saveShop(shop);
  document.getElementById("shopSaveMsg").classList.remove("hidden");
  setTimeout(() => document.getElementById("shopSaveMsg").classList.add("hidden"), 2500);
  renderOverview();
}

// ---- Redeem Codes ----
function renderCodesTable() {
  const codes = loadCodes();
  const tbody = document.getElementById("codesTbody");
  tbody.innerHTML = codes.map((c, i) => `
    <tr>
      <td><code style="background:#1a1a1a;padding:.2rem .5rem;border-radius:4px">${c.code}</code></td>
      <td>${c.discount}%</td>
      <td>${c.label}</td>
      <td><button class="btn-sm btn-red" onclick="deleteCode(${i})">Delete</button></td>
    </tr>
  `).join("");
  if (!codes.length) tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;opacity:.5">No codes.</td></tr>`;
}

function addCode() {
  const code     = document.getElementById("newCode").value.trim().toUpperCase();
  const discount = parseInt(document.getElementById("newDiscount").value);
  const label    = document.getElementById("newCodeLabel").value.trim();

  if (!code || isNaN(discount) || !label) { alert("Fill all fields."); return; }

  const codes = loadCodes();
  if (codes.find(c => c.code === code)) { alert("Code already exists."); return; }
  codes.push({ code, discount, label });
  saveCodes(codes);
  renderCodesTable();

  document.getElementById("newCode").value = "";
  document.getElementById("newDiscount").value = "";
  document.getElementById("newCodeLabel").value = "";
}

function deleteCode(idx) {
  if (!confirm("Delete this code?")) return;
  const codes = loadCodes();
  codes.splice(idx, 1);
  saveCodes(codes);
  renderCodesTable();
}

// ---- Drag & Drop Image Upload ----
function setupDragDrop() {
  setupDropZone("dropZone", "newShoeImgFile", "newShoeImg", "imgPreviewText");
  setupDropZone("editDropZone", "editShoeImgFile", "editShoeImg", "editImgPreviewText");
}

function setupDropZone(zoneId, fileInputId, textInputId, previewId) {
  const zone = document.getElementById(zoneId);
  const fileInput = document.getElementById(fileInputId);
  const textInput = document.getElementById(textInputId);
  const preview = document.getElementById(previewId);

  if (!zone) return;

  // Click to select
  zone.addEventListener("click", () => fileInput.click());

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      handleFileUpload(e.target.files[0], textInput, preview, zone);
    }
  });

  // Drag over
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("active");
  });

  // Drag leave
  zone.addEventListener("dragleave", () => {
    zone.classList.remove("active");
  });

  // Drop
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.classList.remove("active");
    if (e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], textInput, preview, zone);
    }
  });
}

function handleFileUpload(file, textInput, preview, zone) {
  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    textInput.value = dataUrl;
    preview.textContent = "✅ Image loaded: " + file.name;
    preview.style.color = "var(--green)";
  };
  reader.readAsDataURL(file);
}

