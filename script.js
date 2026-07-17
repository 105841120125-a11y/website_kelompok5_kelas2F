/* ---------- KONSTANTA DATA & HELPERS ---------- */
const STORAGE_KEY = "todo-app-data-v1";
const SETTINGS_KEY = "todo-app-settings-v1";

const CATEGORY_STYLES = {
  Pendidikan: { light: "bg-rose-100 text-rose-600", dark: "bg-rose-500/15 text-rose-300" },
  Organisasi: { light: "bg-indigo-100 text-indigo-600", dark: "bg-indigo-500/15 text-indigo-300" },
  Pribadi: { light: "bg-amber-100 text-amber-600", dark: "bg-amber-500/15 text-amber-300" },
};
const PRIORITY_LABEL = { rendah: "Rendah", sedang: "Sedang", tinggi: "Tinggi" };
const PRIORITY_COLOR = { rendah: "text-emerald-500", sedang: "text-amber-500", tinggi: "text-rose-500" };
const PRIORITY_DOT = { rendah: "bg-emerald-500", sedang: "bg-amber-500", tinggi: "bg-rose-500" };
const categories = ["Pendidikan", "Organisasi", "Pribadi"];

const initialTasks = [
  { id: 1, title: "Mengerjakan laporan praktikum", category: "Pendidikan", date: "2026-07-10", done: false, priority: "tinggi", note: "Bab 1-3 harus selesai hari ini." },
  { id: 2, title: "Belajar untuk ujian", category: "Pendidikan", date: "2026-07-08", done: true, priority: "sedang", note: "" },
  { id: 3, title: "Mengumpulkan tugas pemrograman", category: "Pendidikan", date: "2026-07-11", done: false, priority: "tinggi", note: "" },
  { id: 4, title: "Membuat presentasi kelompok", category: "Organisasi", date: "2026-07-07", done: true, priority: "sedang", note: "" },
  { id: 5, title: "Belanja kebutuhan rumah", category: "Pribadi", date: "2026-07-12", done: false, priority: "rendah", note: "" },
  { id: 6, title: "Olahraga pagi", category: "Pribadi", date: "2026-07-09", done: false, priority: "rendah", note: "" },
  { id: 7, title: "Membaca buku 30 menit", category: "Pribadi", date: "2026-07-06", done: true, priority: "rendah", note: "" },
  { id: 8, title: "Menyiapkan materi seminar", category: "Organisasi", date: "2026-07-15", done: false, priority: "tinggi", note: "" },
];

/* SVG Path Icons Map */
const SVG_PATHS = {
  clipboard: '<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/><path d="M9 10h6M9 14h6"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V20a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1V9.5"/>',
  list: '<path d="M8 6h13M8 12h13M8 18h13"/><circle cx="3.5" cy="6" r="1"/><circle cx="3.5" cy="12" r="1"/><circle cx="3.5" cy="18" r="1"/>',
  flag: '<path d="M5 3v18"/><path d="M5 4h11l-2 4 2 4H5"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.9 2.9l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.6V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.6 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.9-2.9l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.6-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.6-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.9-2.9l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.6V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.6 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.9 2.9l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.6 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.6 1z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  more: '<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  "chevron-left": '<path d="M15 18l-6-6 6-6"/>',
  "chevron-right": '<path d="M9 18l6-6-6-6"/>',
  "check-circle": '<circle cx="12" cy="12" r="9"/><path d="M8 12l3 3 5-6"/>',
  circle: '<circle cx="12" cy="12" r="9"/>',
  pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6"/><path d="M10 11v6M14 11v6"/>',
  grad: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  "file-text": '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h8"/>',
  bell: '<path d="M6 8a6 6 0 0112 0c0 4 1.5 5 1.5 6h-15S6 12 6 8z"/><path d="M10 20a2 2 0 004 0"/>'
};

function getIconSvg(name, size = 20, className = "", strokeWidth = 2) {
  const path = SVG_PATHS[name] || '';
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}">${path}</svg>`;
}

function formatDate(iso) {
  if (!iso) return "-";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
function monthLabel(y, m) {
  return new Date(y, m, 1).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

/* ---------- MANAJEMEN STATE GLOBAL ---------- */
let state = {
  dark: false,
  tasks: [],
  filter: "Semua",
  category: "Semua Kategori",
  nav: "Dashboard",
  editingId: null,
  detailId: null,
  menuOpenId: null,
  calDate: new Date(2026, 6, 1),
  userName: "Khalifah",
  notifOn: true,
  showNotif: false,
  accent: "indigo",
  toastTimer: null
};

const accentMap = {
  indigo: { btn: "bg-indigo-500 hover:bg-indigo-600", ring: "focus:ring-indigo-400", text: "text-indigo-500", chip: "bg-indigo-500" },
  emerald: { btn: "bg-emerald-500 hover:bg-emerald-600", ring: "focus:ring-emerald-400", text: "text-emerald-500", chip: "bg-emerald-500" },
  rose: { btn: "bg-rose-500 hover:bg-rose-600", ring: "focus:ring-rose-400", text: "text-rose-500", chip: "bg-rose-500" },
  amber: { btn: "bg-amber-500 hover:bg-amber-600", ring: "focus:ring-amber-400", text: "text-amber-500", chip: "bg-amber-500" },
};

const navItems = [
  { label: "Dashboard", icon: "home" }, { label: "Tugas Saya", icon: "list" },
  { label: "Prioritas", icon: "flag" }, { label: "Kalender", icon: "calendar" },
  { label: "Pengaturan", icon: "settings" },
];

function initLoadData() {
  try {
    const rawTasks = localStorage.getItem(STORAGE_KEY);
    state.tasks = rawTasks ? JSON.parse(rawTasks) : initialTasks;
  } catch (e) { state.tasks = initialTasks; }

  try {
    const rawSettings = localStorage.getItem(SETTINGS_KEY);
    if (rawSettings) {
      const parsed = JSON.parse(rawSettings);
      state.dark = parsed.dark ?? false;
      state.filter = parsed.filter ?? "Semua";
      state.category = parsed.category ?? "Semua Kategori";
      
      // Kunci awal selalu mendarat di Dashboard ketika pertama kali load
      state.nav = "Dashboard"; 
      
      state.userName = parsed.userName ?? "Khalifah";
      state.notifOn = parsed.notifOn ?? true;
      state.accent = parsed.accent ?? "indigo";
    }
  } catch (e) {}
}

function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({
    dark: state.dark, filter: state.filter, category: state.category,
    nav: state.nav, userName: state.userName, notifOn: state.notifOn, accent: state.accent
  }));
}

function getThemeStyles() {
  return state.dark ? {
    appBg: "bg-slate-950", sidebarBg: "bg-[#141225]", cardBg: "bg-slate-900",
    cardBorder: "border-slate-800", text: "text-slate-100", subtext: "text-slate-400",
    rowHover: "hover:bg-slate-800/60", inputBg: "bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500",
    pillBg: "bg-slate-800 text-slate-300", divider: "divide-slate-800",
  } : {
    appBg: "bg-slate-50", sidebarBg: "bg-[#1e1b3a]", cardBg: "bg-white",
    cardBorder: "border-slate-100", text: "text-slate-800", subtext: "text-slate-500",
    rowHover: "hover:bg-slate-50", inputBg: "bg-white border-slate-200 text-slate-700 placeholder-slate-400",
    pillBg: "bg-slate-100 text-slate-600", divider: "divide-slate-100",
  };
}

function showToast(msg) {
  const toastEl = document.getElementById("toast");
  toastEl.innerText = msg;
  toastEl.classList.remove("hidden");
  
  const A = accentMap[state.accent];
  toastEl.className = `fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 ${A.chip} text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg z-50 pop-in`;

  clearTimeout(state.toastTimer);
  state.toastTimer = setTimeout(() => { toastEl.classList.add("hidden"); }, 1800);
}

function getTodayTasks() {
  const d = new Date();
  const todayStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  return state.tasks.filter(x => x.date === todayStr && !x.done).sort((a,b) => a.priority === "tinggi" ? -1 : 1);
}

function toggleDone(id) {
  state.tasks = state.tasks.map(x => x.id === id ? { ...x, done: !x.done } : x);
  saveToLocalStorage();
  renderApp();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter(x => x.id !== id);
  state.menuOpenId = null;
  if (state.detailId === id) state.detailId = null;
  saveToLocalStorage();
  showToast("Tugas dihapus");
  renderApp();
  closeDetailModal();
}

function openAddModal() {
  state.editingId = null;
  document.getElementById("modal-task-title").innerText = "Tambah Tugas";
  document.getElementById("form-title").value = "";
  document.getElementById("form-category").value = categories[0];
  document.getElementById("form-date").value = "";
  document.querySelector('input[name="priority"][value="sedang"]').checked = true;
  document.getElementById("form-note").value = "";
  
  document.getElementById("modal-task").classList.remove("hidden");
}

function openEditModal(task) {
  state.editingId = task.id;
  state.menuOpenId = null;
  document.getElementById("modal-task-title").innerText = "Edit Tugas";
  document.getElementById("form-title").value = task.title;
  document.getElementById("form-category").value = task.category;
  document.getElementById("form-date").value = task.date;
  document.querySelector(`input[name="priority"][value="${task.priority}"]`).checked = true;
  document.getElementById("form-note").value = task.note;
  
  document.getElementById("modal-task").classList.remove("hidden");
  closeDetailModal();
}

function closeDetailModal() {
  state.detailId = null;
  document.getElementById("modal-detail").classList.add("hidden");
}

function openDetailModal(id) {
  state.detailId = id;
  const task = state.tasks.find(x => x.id === id);
  if(!task) return;

  const t = getThemeStyles();
  const A = accentMap[state.accent];
  
  document.getElementById("modal-detail-card").className = `${t.cardBg} ${t.text} w-full max-w-md rounded-2xl p-6 border ${t.cardBorder} scale-in shadow-2xl`;
  document.getElementById("detail-title").innerText = task.title;
  
  const styleBadge = (CATEGORY_STYLES[task.category] && CATEGORY_STYLES[task.category][state.dark ? "dark" : "light"]) || t.pillBg;
  const catBadge = document.getElementById("detail-category-badge");
  catBadge.innerText = task.category;
  catBadge.className = `mt-2 text-xs font-semibold px-3 py-1 rounded-full ${styleBadge}`;
  
  document.getElementById("detail-date").innerText = formatDate(task.date);
  
  const prioEl = document.getElementById("detail-priority");
  prioEl.innerText = PRIORITY_LABEL[task.priority];
  prioEl.className = `text-sm font-medium ${PRIORITY_COLOR[task.priority]}`;

  const noteBox = document.getElementById("detail-note-container");
  if(task.note) {
    noteBox.classList.remove("hidden");
    document.getElementById("detail-note").innerText = task.note;
  } else {
    noteBox.classList.add("hidden");
  }

  const editBtn = document.getElementById("btn-edit-detail");
  editBtn.className = `flex-1 flex items-center justify-center gap-2 ${A.btn} text-white text-sm font-semibold py-2.5 rounded-xl transition`;
  editBtn.innerHTML = `${getIconSvg("pencil", 15)} Edit`;
  editBtn.onclick = () => openEditModal(task);

  const delBtn = document.getElementById("btn-delete-detail");
  delBtn.onclick = () => deleteTask(task.id);

  const doneToggleBtn = document.getElementById("btn-toggle-done-detail");
  doneToggleBtn.innerHTML = `${getIconSvg("check-circle", 16)} ${task.done ? "Tandai Belum Selesai" : "Tandai Selesai"}`;
  doneToggleBtn.onclick = () => { toggleDone(task.id); openDetailModal(task.id); };

  document.getElementById("modal-detail").classList.remove("hidden");
}

/* ---------- COMPONENT VIEW ENGINE RENDERING ---------- */

function injectHeaderRight() {
  const t = getThemeStyles();
  const A = accentMap[state.accent];
  const todayTasks = getTodayTasks();

  return `
    <div class="flex items-center gap-3 relative">
      <div class="relative">
        <button id="btn-bell-notif" aria-label="Notifikasi" class="w-10 h-10 rounded-full flex items-center justify-center border ${t.cardBorder} ${t.cardBg} hover:opacity-80 relative">
          ${getIconSvg("bell", 17, state.notifOn ? A.text : t.subtext)}
          ${state.notifOn && todayTasks.length > 0 ? `
            <span class="absolute top-1.5 right-2 min-w-[15px] h-[15px] px-[3px] rounded-full ${A.chip} text-white text-[9px] font-bold flex items-center justify-center">${todayTasks.length}</span>
          ` : ''}
        </button>
        
        <!-- PERBAIKAN DROPDOWN MOBILE: Lebar pas di tengah layar HP, merapat kanan di desktop -->
        <div id="notif-dropdown" class="${state.showNotif ? '' : 'hidden'} absolute -right-12 md:right-0 top-12 w-[calc(100vw-2rem)] sm:w-80 ${t.cardBg} border ${t.cardBorder} rounded-2xl shadow-lg z-50 fade-in overflow-hidden">
          <div class="px-4 py-3 border-b ${t.cardBorder} flex items-center justify-between">
            <p class="font-bold text-sm">Notifikasi Hari Ini</p>
            <button id="btn-close-dropdown" class="${t.subtext}">${getIconSvg("x", 16)}</button>
          </div>
          <div class="max-h-80 overflow-y-auto">
            ${todayTasks.length === 0 ? `
              <div class="flex flex-col items-center text-center px-4 py-8">
                <div class="mb-2 ${t.subtext}">${getIconSvg("calendar", 26)}</div>
                <p class="text-sm font-semibold">Jadwal Anda kosong hari ini</p>
                <p class="text-xs mt-1 ${t.subtext}">Tidak ada tugas yang perlu diselesaikan hari ini.</p>
              </div>
            ` : todayTasks.map(tk => `
              <button onclick="event.stopPropagation(); state.showNotif=false; document.getElementById('notif-dropdown').classList.add('hidden'); openDetailModal(${tk.id})" class="w-full text-left px-4 py-3 flex items-start gap-3 border-b ${t.cardBorder} ${t.rowHover}">
                <span class="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_DOT[tk.priority]}"></span>
                <div class="min-w-0">
                  <p class="text-sm font-medium truncate">${tk.title}</p>
                  <p class="text-xs mt-0.5 ${t.subtext}">${tk.category} • Prioritas ${PRIORITY_LABEL[tk.priority]}</p>
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
      
      <button id="btn-toggle-dark" aria-label="Ganti mode" class="w-10 h-10 rounded-full flex items-center justify-center border ${t.cardBorder} ${t.cardBg} hover:opacity-80">
        ${state.dark ? getIconSvg("moon", 18, "text-indigo-300") : getIconSvg("sun", 18, "text-amber-500")}
      </button>
      <button onclick="state.nav='Pengaturan'; renderApp();" class="w-10 h-10 rounded-full ${A.chip} flex items-center justify-center text-white">
        ${getIconSvg("user", 18)}
      </button>
    </div>
  `;
}

function renderTaskListCard(items, title) {
  const t = getThemeStyles();
  const A = accentMap[state.accent];
  
  return `
    <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 md:p-6 shadow-sm card-hover w-full">
      <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h2 class="text-lg font-bold">${title}</h2>
        <button onclick="openAddModal()" class="flex items-center gap-2 ${A.btn} text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition">
          ${getIconSvg("plus", 16)} Tambah Tugas
        </button>
      </div>
      <div class="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div class="flex items-center gap-1 rounded-xl p-1 ${t.pillBg} overflow-x-auto max-w-full">
          ${["Semua", "Belum Selesai", "Selesai"].map(f => `
            <button onclick="state.filter='${f}'; renderApp();" class="whitespace-nowrap px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${state.filter === f ? `${A.chip} text-white shadow` : `${t.subtext} hover:opacity-80`}">
              ${f}
            </button>
          `).join('')}
        </div>
        <select onchange="state.category=this.value; renderApp();" class="text-sm rounded-xl px-3 py-2 border ${t.inputBg} outline-none cursor-pointer bg-transparent">
          <option ${state.category === "Semua Kategori" ? "selected" : ""}>Semua Kategori</option>
          ${categories.map(c => `<option ${state.category === c ? "selected" : ""}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="divide-y ${t.divider} w-full">
        ${items.length === 0 ? `<p class="text-sm py-8 text-center ${t.subtext}">Tidak ada tugas di sini.</p>` : ''}
        ${items.map(task => {
          const catStyle = (CATEGORY_STYLES[task.category] && CATEGORY_STYLES[task.category][state.dark ? "dark" : "light"]) || "";
          return `
            <div class="task-row flex items-center gap-3 sm:gap-4 py-3.5 px-2 rounded-xl ${t.rowHover} relative w-full">
              <button onclick="toggleDone(${task.id})" class="shrink-0">
                ${task.done ? getIconSvg("check-circle", 22, "text-emerald-500") : getIconSvg("circle", 22, t.subtext)}
              </button>
              <button onclick="openDetailModal(${task.id})" class="flex-1 text-left text-sm font-medium truncate ${task.done ? `line-through-custom ${t.subtext}` : t.text}">
                ${task.title}
              </button>
              <span class="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full ${catStyle}">${task.category}</span>
              <span class="hidden sm:block text-xs w-24 text-right ${t.subtext}">${formatDate(task.date)}</span>
              <div class="relative shrink-0">
                <button onclick="event.stopPropagation(); state.menuOpenId = (state.menuOpenId === ${task.id} ? null : ${task.id}); renderApp();" class="p-1.5 rounded-lg ${t.subtext} hover:opacity-70">
                  ${getIconSvg("more", 18)}
                </button>
                ${state.menuOpenId === task.id ? `
                  <div class="absolute right-0 mt-1 w-36 rounded-xl border ${t.cardBorder} ${t.cardBg} shadow-lg z-10 overflow-hidden pop-in">
                    <button onclick="openEditModal(${JSON.stringify(task).replace(/"/g, '&quot;')})" class="flex items-center gap-2 w-full px-3 py-2.5 text-sm ${t.rowHover}">${getIconSvg("pencil", 14)} Edit</button>
                    <button onclick="deleteTask(${task.id})" class="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10">${getIconSvg("trash", 14)} Hapus</button>
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderDashboard() {
  const t = getThemeStyles();
  const total = state.tasks.length;
  const selesai = state.tasks.filter(x => x.done).length;
  const belum = total - selesai;
  const prioritas = state.tasks.filter(x => x.priority === "tinggi" && !x.done).length;

  const filtered = state.tasks
    .filter(x => state.filter === "Belum Selesai" ? !x.done : state.filter === "Selesai" ? x.done : true)
    .filter(x => state.category === "Semua Kategori" ? true : x.category === state.category);

  return `
    <div class="fade-in w-full">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 class="text-2xl font-bold flex items-center gap-2">Halo, ${state.userName || "Teman"}! <span>👋</span></h1>
          <p class="text-sm mt-1 ${t.subtext}">Selamat datang kembali! Semangat menyelesaikan tugas hari ini.</p>
        </div>
        ${injectHeaderRight()}
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 w-full">
        <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-4 flex items-center gap-3 shadow-sm card-hover">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center ${state.dark ? "bg-indigo-500/10" : "bg-indigo-50"}">${getIconSvg("clipboard", 20, "text-indigo-500")}</div>
          <div><p class="text-xl font-bold leading-none">${total}</p><p class="text-xs mt-1 ${t.subtext}">Total Tugas</p></div>
        </div>
        <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-4 flex items-center gap-3 shadow-sm card-hover">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center ${state.dark ? "bg-emerald-500/10" : "bg-emerald-50"}">${getIconSvg("check-circle", 20, "text-emerald-500")}</div>
          <div><p class="text-xl font-bold leading-none">${selesai}</p><p class="text-xs mt-1 ${t.subtext}">Selesai</p></div>
        </div>
        <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-4 flex items-center gap-3 shadow-sm card-hover">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center ${state.dark ? "bg-amber-500/10" : "bg-amber-50"}">${getIconSvg("calendar", 20, "text-amber-500")}</div>
          <div><p class="text-xl font-bold leading-none">${belum}</p><p class="text-xs mt-1 ${t.subtext}">Belum Selesai</p></div>
        </div>
        <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-4 flex items-center gap-3 shadow-sm card-hover">
          <div class="w-11 h-11 rounded-xl flex items-center justify-center ${state.dark ? "bg-rose-500/10" : "bg-rose-50"}">${getIconSvg("flag", 20, "text-rose-500")}</div>
          <div><p class="text-xl font-bold leading-none">${prioritas}</p><p class="text-xs mt-1 ${t.subtext}">Prioritas</p></div>
        </div>
      </div>
      ${renderTaskListCard(filtered, "Daftar Tugas")}
    </div>
  `;
}

function renderTugasSaya() {
  const t = getThemeStyles();
  const total = state.tasks.length;
  const belum = state.tasks.filter(x => !x.done).length;
  
  const filtered = state.tasks
    .filter(x => state.filter === "Belum Selesai" ? !x.done : state.filter === "Selesai" ? x.done : true)
    .filter(x => state.category === "Semua Kategori" ? true : x.category === state.category);

  return `
    <div class="fade-in w-full">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h1 class="text-2xl font-bold">Tugas Saya</h1><p class="text-sm mt-1 ${t.subtext}">${belum} tugas belum selesai dari total ${total} tugas.</p></div>
        ${injectHeaderRight()}
      </div>
      ${renderTaskListCard(filtered, "Semua Tugas")}
    </div>
  `;
}

function renderPrioritas() {
  const t = getThemeStyles();
  const priorityTasks = state.tasks.filter(x => x.priority === "tinggi").sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1));

  return `
    <div class="fade-in w-full">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h1 class="text-2xl font-bold">Prioritas</h1><p class="text-sm mt-1 ${t.subtext}">Tugas dengan prioritas tinggi yang perlu perhatian lebih.</p></div>
        ${injectHeaderRight()}
      </div>
      <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 md:p-6 shadow-sm card-hover w-full">
        <div class="divide-y ${t.divider} w-full">
          ${priorityTasks.length === 0 ? `<p class="text-sm py-8 text-center ${t.subtext}">Tidak ada tugas prioritas tinggi.</p>` : ''}
          ${priorityTasks.map(task => {
            const catStyle = (CATEGORY_STYLES[task.category] && CATEGORY_STYLES[task.category][state.dark ? "dark" : "light"]) || "";
            return `
              <div class="task-row flex items-center gap-3 sm:gap-4 py-3.5 px-2 rounded-xl ${t.rowHover} w-full">
                <span class="w-2.5 h-2.5 rounded-full ${PRIORITY_DOT[task.priority]} shrink-0"></span>
                <button onclick="toggleDone(${task.id})" class="shrink-0">
                  ${task.done ? getIconSvg("check-circle", 22, "text-emerald-500") : getIconSvg("circle", 22, t.subtext)}
                </button>
                <button onclick="openDetailModal(${task.id})" class="flex-1 text-left text-sm font-medium truncate ${task.done ? `line-through-custom ${t.subtext}` : t.text}">
                  ${task.title}
                </button>
                <span class="hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full ${catStyle}">${task.category}</span>
                <span class="hidden sm:block text-xs w-24 text-right ${t.subtext}">${formatDate(task.date)}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderKalender() {
  const t = getThemeStyles();
  const y = state.calDate.getFullYear(), m = state.calDate.getMonth();
  const firstDay = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const tasksByDay = {};
  state.tasks.forEach(tk => {
    if (!tk.date) return;
    const d = new Date(tk.date + "T00:00:00");
    if (d.getFullYear() === y && d.getMonth() === m) {
      tasksByDay[d.getDate()] = (tasksByDay[d.getDate()] || []).concat(tk);
    }
  });

  const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  return `
    <div class="fade-in w-full">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h1 class="text-2xl font-bold">Kalender</h1><p class="text-sm mt-1 ${t.subtext}">Lihat tugas kamu berdasarkan tanggal.</p></div>
        ${injectHeaderRight()}
      </div>
      <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-4 md:p-6 shadow-sm card-hover w-full overflow-x-auto">
        <div class="min-w-[600px] w-full">
          <div class="flex items-center justify-between mb-5">
            <button id="btn-cal-prev" class="p-2 rounded-lg ${t.pillBg}">${getIconSvg("chevron-left", 16)}</button>
            <h3 class="font-bold capitalize">${monthLabel(y, m)}</h3>
            <button id="btn-cal-next" class="p-2 rounded-lg ${t.pillBg}">${getIconSvg("chevron-right", 16)}</button>
          </div>
          <div class="grid grid-cols-7 gap-1.5 mb-2">
            ${weekdays.map(w => `<div class="text-center text-xs font-semibold py-1 ${t.subtext}">${w}</div>`).join('')}
          </div>
          <div class="grid grid-cols-7 gap-1.5">
            ${cells.map((d, i) => {
              const dayTasks = d ? tasksByDay[d] : null;
              return `
                <div class="min-h-[80px] rounded-xl p-1.5 border ${t.cardBorder} ${d ? t.rowHover : ""} ${d ? "" : "opacity-0"}">
                  ${d ? `<div class="text-xs font-semibold mb-1">${d}</div>` : ''}
                  ${dayTasks ? dayTasks.slice(0, 2).map(tk => `
                    <div onclick="openDetailModal(${tk.id})" class="text-[10px] truncate px-1.5 py-0.5 rounded mb-0.5 cursor-pointer ${(CATEGORY_STYLES[tk.category] && CATEGORY_STYLES[tk.category][state.dark ? "dark" : "light"]) || t.pillBg} ${tk.done ? "line-through opacity-60" : ""}">
                      ${tk.title}
                    </div>
                  `).join('') : ''}
                  ${dayTasks && dayTasks.length > 2 ? `<div class="text-[10px] ${t.subtext}">+${dayTasks.length - 2} lagi</div>` : ''}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderPengaturan() {
  const t = getThemeStyles();
  const A = accentMap[state.accent];

  return `
    <div class="fade-in w-full">
      <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div><h1 class="text-2xl font-bold">Pengaturan</h1><p class="text-sm mt-1 ${t.subtext}">Sesuaikan tampilan dan preferensi aplikasi kamu.</p></div>
        ${injectHeaderRight()}
      </div>
      
      <!-- Grid System Diperlebar Penuh -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <div class="space-y-6">
          <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-6 shadow-sm card-hover">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2">${getIconSvg("user", 18, A.text)} Profil Pengguna</h3>
            <label class="text-xs font-semibold mb-1.5 block ${t.subtext}">Nama Tampilan</label>
            <input type="text" id="input-username" value="${state.userName}" class="w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none focus:ring-2 ${A.ring}"/>
          </div>

          <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-6 shadow-sm card-hover">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2">${getIconSvg("sun", 18, A.text)} Kustomisasi Tampilan</h3>
            <div class="flex items-center justify-between mb-5">
              <div><p class="text-sm font-medium">Mode Gelap</p><p class="text-xs ${t.subtext}">Ubah tampilan aplikasi menjadi gelap</p></div>
              <button id="switch-dark" class="w-12 h-7 rounded-full flex items-center px-1 transition ${state.dark ? A.chip : "bg-slate-300"}">
                <span class="w-5 h-5 rounded-full bg-white shadow transition-transform ${state.dark ? "translate-x-5" : "translate-x-0"}"></span>
              </button>
            </div>
            <div>
              <p class="text-sm font-medium mb-3">Warna Aksen Aplikasi</p>
              <div class="flex gap-3">
                ${Object.keys(accentMap).map(c => `
                  <button onclick="state.accent='${c}'; saveToLocalStorage(); renderApp();" class="w-9 h-9 rounded-full ${accentMap[c].chip} transition transform hover:scale-110 ${state.accent === c ? "ring-4 ring-offset-2 " + (state.dark ? "ring-offset-slate-900 ring-slate-400" : "ring-offset-white ring-slate-500") : ""}"></button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-6 shadow-sm card-hover">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2">${getIconSvg("bell", 18, A.text)} Preferensi Sistem</h3>
            <div class="flex items-center justify-between">
              <div><p class="text-sm font-medium">Pengingat Tugas Harian</p><p class="text-xs ${t.subtext}">Terima pemberitahuan untuk tugas yang jatuh tempo hari ini</p></div>
              <button id="switch-notif" class="w-12 h-7 rounded-full flex items-center px-1 transition ${state.notifOn ? A.chip : "bg-slate-300"}">
                <span class="w-5 h-5 rounded-full bg-white shadow transition-transform ${state.notifOn ? "translate-x-5" : "translate-x-0"}"></span>
              </button>
            </div>
          </div>

          <div class="${t.cardBg} border ${t.cardBorder} rounded-2xl p-6 shadow-sm card-hover">
            <h3 class="font-bold text-base mb-4 flex items-center gap-2 text-rose-500">${getIconSvg("trash", 18)} Zona Bahaya (Data)</h3>
            <p class="text-xs ${t.subtext} mb-4">Aksi pembersihan di bawah ini bersifat permanen pada penyimpanan lokal browser Anda.</p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button id="btn-clear-completed" class="flex-1 flex items-center justify-center gap-2 ${t.pillBg} text-sm font-semibold py-3 rounded-xl hover:bg-opacity-80">
                Bersihkan Tugas Selesai
              </button>
              <button id="btn-reset-all" class="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold py-3 rounded-xl">
                Reset Semua Data Dummy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/* ---------- MAIN APPLICATION ENGINE RENDER LOOP ---------- */
function renderApp() {
  const t = getThemeStyles();
  const A = accentMap[state.accent];

  if (state.dark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  document.body.className = `min-h-screen w-full ${t.appBg} ${t.text} transition-colors duration-300 overflow-x-hidden`;
  
  const sidebar = document.getElementById("sidebar");
  sidebar.className = `${t.sidebarBg} text-white w-72 shrink-0 flex-col p-6 hidden md:flex transition-colors duration-300 border-r ${state.dark ? 'border-slate-800' : 'border-slate-100'}`;
  
  const sideAccentLine = document.getElementById("sidebar-accent-line");
  sideAccentLine.className = `w-8 h-0.5 mt-3 rounded-full ${A.chip}`;

  /* Render Sidebar Desktop Nav Items */
  const navContainer = document.getElementById("nav-container");
  navContainer.innerHTML = navItems.map(item => {
    const active = state.nav === item.label;
    return `
      <button onclick="state.nav='${item.label}'; state.menuOpenId=null; renderApp();" class="nav-btn flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${active ? `${A.chip} text-white shadow-lg shadow-indigo-900/30 pl-5` : "text-indigo-200/70 hover:bg-white/5 hover:text-white"}">
        ${getIconSvg(item.icon, 18)} ${item.label}
      </button>
    `;
  }).join('');

  /* Render Mobile Bottom Navigation */
  const mNavItems = [
    { label: "Beranda", icon: "home", target: "Dashboard" },
    { label: "Tugas", icon: "list", target: "Tugas Saya" },
    { label: "Kalender", icon: "calendar", target: "Kalender" },
    { label: "Pengaturan", icon: "settings", target: "Pengaturan" }
  ];
  const mobNav = document.getElementById("mobile-nav");
  mobNav.className = `md:hidden fixed bottom-0 left-0 right-0 ${t.cardBg} border-t ${t.cardBorder} flex justify-around py-2.5 z-30 transition-colors duration-300 shadow-[0_-4px_12px_rgba(0,0,0,0.04)]`;
  mobNav.innerHTML = mNavItems.map(item => {
    const active = state.nav === item.target;
    return `
      <button onclick="state.nav='${item.target}'; renderApp();" class="flex flex-col items-center gap-1 text-xs ${active ? A.text : t.subtext}">
        ${getIconSvg(item.icon, 18)} ${item.label}
      </button>
    `;
  }).join('');

  /* ROUTING RENDER VIEW */
  const viewRoot = document.getElementById("view-root");
  if (state.nav === "Dashboard") viewRoot.innerHTML = renderDashboard();
  else if (state.nav === "Tugas Saya") viewRoot.innerHTML = renderTugasSaya();
  else if (state.nav === "Prioritas") viewRoot.innerHTML = renderPrioritas();
  else if (state.nav === "Kalender") viewRoot.innerHTML = renderKalender();
  else if (state.nav === "Pengaturan") viewRoot.innerHTML = renderPengaturan();

  /* UPDATE MODAL TEMA TAMPILAN */
  document.getElementById("modal-task-card").className = `${t.cardBg} ${t.text} w-full max-w-md rounded-2xl p-6 border ${t.cardBorder} max-h-[90vh] overflow-y-auto scale-in shadow-2xl`;
  const taskSubmitBtn = document.getElementById("btn-submit-task");
  taskSubmitBtn.className = `w-full ${A.btn} text-white font-semibold py-3 rounded-xl transition`;
  taskSubmitBtn.innerText = state.editingId ? "Perbarui Tugas" : "Simpan Tugas";

  const inputs = document.querySelectorAll('#form-task input[type="text"], #form-task select, #form-task input[type="date"], #form-task textarea, #input-username');
  inputs.forEach(el => { el.className = `w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none focus:ring-2 ${A.ring} bg-transparent`; });

  attachDynamicListeners();
}

/* ---------- ATTACH EVENT LISTENERS SECARA DINAMIS ---------- */
function attachDynamicListeners() {
  const bell = document.getElementById("btn-bell-notif");
  const notifDropdown = document.getElementById("notif-dropdown");
  
  // Kontrol dropdown via manipulasi class DOM langsung (Bebas Kedip / Tanpa Re-render)
  if(bell && notifDropdown) {
    bell.onclick = (e) => { 
      e.stopPropagation(); 
      state.showNotif = !state.showNotif; 
      if (state.showNotif) {
        notifDropdown.classList.remove("hidden");
      } else {
        notifDropdown.classList.add("hidden");
      }
    };
  }
  
  const closeDropdown = document.getElementById("btn-close-dropdown");
  if(closeDropdown && notifDropdown) {
    closeDropdown.onclick = (e) => { 
      e.stopPropagation();
      state.showNotif = false; 
      notifDropdown.classList.add("hidden");
    };
  }

  const toggleDark = document.getElementById("btn-toggle-dark");
  if(toggleDark) { toggleDark.onclick = () => { state.dark = !state.dark; saveToLocalStorage(); renderApp(); }; }

  const calPrev = document.getElementById("btn-cal-prev");
  if(calPrev) { calPrev.onclick = () => { state.calDate = new Date(state.calDate.getFullYear(), state.calDate.getMonth() - 1, 1); renderApp(); }; }
  
  const calNext = document.getElementById("btn-cal-next");
  if(calNext) { calNext.onclick = () => { state.calDate = new Date(state.calDate.getFullYear(), state.calDate.getMonth() + 1, 1); renderApp(); }; }

  const inputUser = document.getElementById("input-username");
  if(inputUser) { inputUser.oninput = (e) => { state.userName = e.target.value; saveToLocalStorage(); }; }
  
  const switchDark = document.getElementById("switch-dark");
  if(switchDark) { switchDark.onclick = () => { state.dark = !state.dark; saveToLocalStorage(); renderApp(); }; }
  
  const switchNotif = document.getElementById("switch-notif");
  if(switchNotif) { switchNotif.onclick = () => { state.notifOn = !state.notifOn; saveToLocalStorage(); renderApp(); }; }
  
  const clearCompBtn = document.getElementById("btn-clear-completed");
  if(clearCompBtn) { clearCompBtn.onclick = () => { state.tasks = state.tasks.filter(x => !x.done); saveToLocalStorage(); showToast("Tugas selesai dibersihkan"); renderApp(); }; }
  
  const resetAllBtn = document.getElementById("btn-reset-all");
  if(resetAllBtn) { resetAllBtn.onclick = () => { state.tasks = initialTasks; saveToLocalStorage(); showToast("Data direset"); renderApp(); }; }
}

/* ---------- FORM & STATIC EVENT HANDLERS ---------- */
document.getElementById("btn-close-modal").onclick = () => { document.getElementById("modal-task").classList.add("hidden"); };
document.getElementById("btn-back-modal").onclick = () => { document.getElementById("modal-task").classList.add("hidden"); };
document.getElementById("btn-close-detail").onclick = closeDetailModal;
document.getElementById("btn-back-detail").onclick = closeDetailModal;

document.getElementById("form-task").onsubmit = (e) => {
  e.preventDefault();
  const title = document.getElementById("form-title").value.trim();
  const category = document.getElementById("form-category").value;
  const date = document.getElementById("form-date").value;
  const priority = document.querySelector('input[name="priority"]:checked').value;
  const note = document.getElementById("form-note").value.trim();

  if(!title) return;

  if (state.editingId) {
    state.tasks = state.tasks.map(x => x.id === state.editingId ? { ...x, title, category, date, priority, note } : x);
    showToast("Tugas diperbarui");
  } else {
    state.tasks.unshift({ id: Date.now(), done: false, title, category, date, priority, note });
    showToast("Tugas ditambahkan");
  }

  saveToLocalStorage();
  document.getElementById("modal-task").classList.add("hidden");
  renderApp();
};

window.onclick = () => {
  const notifDropdown = document.getElementById("notif-dropdown");
  if(state.showNotif && notifDropdown) { 
    state.showNotif = false; 
    notifDropdown.classList.add("hidden"); 
  }
  if(state.menuOpenId !== null) { state.menuOpenId = null; renderApp(); }
};

/* ---------- INITIAL LOADING TRIGGER ---------- */
function initApp() {
  initLoadData();
  
  const formCat = document.getElementById("form-category");
  formCat.innerHTML = `<option value="">Pilih kategori</option>` + categories.map(c => `<option value="${c}">${c}</option>`).join('');

  document.querySelectorAll(".structure-icon").forEach(el => {
    const iconName = el.getAttribute("data-icon");
    const size = parseInt(el.getAttribute("data-size")) || 20;
    const isAppend = el.getAttribute("data-append") === "true";
    if(isAppend) el.innerHTML = getIconSvg(iconName, size) + el.innerHTML;
    else el.innerHTML = getIconSvg(iconName, size);
  });

  renderApp();
}

initApp();