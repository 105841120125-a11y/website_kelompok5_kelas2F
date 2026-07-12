const { useState, useMemo, useEffect } = React;

function TodoApp() {
  const saved = loadSettings();
  const [dark, setDark] = useState(saved.dark ?? false);
  const [tasks, setTasks] = useState(loadTasks);
  const [filter, setFilter] = useState(saved.filter ?? "Semua");
  const [category, setCategory] = useState(saved.category ?? "Semua Kategori");
  const [nav, setNav] = useState(saved.nav ?? "Dashboard");
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [detailId, setDetailId] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [form, setForm] = useState({ title: "", category: "", date: "", priority: "sedang", note: "" });
  const [calDate, setCalDate] = useState(() => new Date(2026, 6, 1));
  const [userName, setUserName] = useState(saved.userName ?? "Khalifah");
  const [notifOn, setNotifOn] = useState(saved.notifOn ?? true);
  const [showNotif, setShowNotif] = useState(false);
  const [accent, setAccent] = useState(saved.accent ?? "indigo");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error("Gagal menyimpan data:", e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({ dark, filter, category, nav, userName, notifOn, accent }));
    } catch (e) {
      console.error("Gagal menyimpan pengaturan:", e);
    }
  }, [dark, filter, category, nav, userName, notifOn, accent]);

  function showToast(msg) {
    setToast(msg);
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => setToast(null), 1800);
  }

  const t = dark ? {
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

  const total = tasks.length;
  const selesai = tasks.filter((x) => x.done).length;
  const belum = total - selesai;
  const prioritas = tasks.filter((x) => x.priority === "tinggi" && !x.done).length;
  const categories = ["Pendidikan", "Organisasi", "Pribadi"];

  const filtered = useMemo(() => tasks
    .filter((x) => filter === "Belum Selesai" ? !x.done : filter === "Selesai" ? x.done : true)
    .filter((x) => category === "Semua Kategori" ? true : x.category === category),
    [tasks, filter, category]);

  const priorityTasks = useMemo(() =>
    tasks.filter((x) => x.priority === "tinggi").sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1)),
    [tasks]);

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);
  const todayTasks = useMemo(() =>
    tasks.filter((x) => x.date === todayStr && !x.done).sort((a, b) => (a.priority === "tinggi" ? -1 : 1)),
    [tasks, todayStr]);

  function toggleDone(id) {
    setTasks((prev) => prev.map((x) => x.id === id ? { ...x, done: !x.done } : x));
  }
  function deleteTask(id) {
    setTasks((prev) => prev.filter((x) => x.id !== id));
    setMenuOpenId(null);
    if (detailId === id) setDetailId(null);
    showToast("Tugas dihapus");
  }
  function openAdd() { setForm({ title: "", category: "", date: "", priority: "sedang", note: "" }); setEditingId(null); setShowAdd(true); }
  function openEdit(task) { setForm({ title: task.title, category: task.category, date: task.date, priority: task.priority, note: task.note }); setEditingId(task.id); setShowAdd(true); setMenuOpenId(null); }
  function saveTask() {
    if (!form.title.trim()) return;
    if (editingId) {
      setTasks((prev) => prev.map((x) => x.id === editingId ? { ...x, ...form } : x));
      showToast("Tugas diperbarui");
    } else {
      setTasks((prev) => [{ id: Date.now(), done: false, ...form }, ...prev]);
      showToast("Tugas ditambahkan");
    }
    setShowAdd(false); setEditingId(null);
  }
  function clearCompleted() {
    setTasks((prev) => prev.filter((x) => !x.done));
    showToast("Tugas selesai dibersihkan");
  }
  function resetAll() {
    setTasks(initialTasks);
    showToast("Data direset");
  }

  const detailTask = tasks.find((x) => x.id === detailId);
  const navItems = [
    { label: "Dashboard", icon: IHome }, { label: "Tugas Saya", icon: IList },
    { label: "Prioritas", icon: IFlag }, { label: "Kalender", icon: ICalendar },
    { label: "Pengaturan", icon: ISettings },
  ];

  const accentMap = {
    indigo: { btn: "bg-indigo-500 hover:bg-indigo-600", ring: "focus:ring-indigo-400", text: "text-indigo-500", chip: "bg-indigo-500" },
    emerald: { btn: "bg-emerald-500 hover:bg-emerald-600", ring: "focus:ring-emerald-400", text: "text-emerald-500", chip: "bg-emerald-500" },
    rose: { btn: "bg-rose-500 hover:bg-rose-600", ring: "focus:ring-rose-400", text: "text-rose-500", chip: "bg-rose-500" },
    amber: { btn: "bg-amber-500 hover:bg-amber-600", ring: "focus:ring-amber-400", text: "text-amber-500", chip: "bg-amber-500" },
  };
  const A = accentMap[accent];

  function TaskListCard({ items, title }) {
    return (
      <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 md:p-6 shadow-sm card-hover`}>
        <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={openAdd} className={`flex items-center gap-2 ${A.btn} text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition`}>
            <IPlus size={16}/> Tambah Tugas
          </button>
        </div>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className={`flex items-center gap-1 rounded-xl p-1 ${t.pillBg}`}>
            {["Semua", "Belum Selesai", "Selesai"].map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition ${filter === f ? `${A.chip} text-white shadow` : `${t.subtext} hover:opacity-80`}`}>
                {f}
              </button>
            ))}
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className={`text-sm rounded-xl px-3 py-2 border ${t.inputBg} outline-none cursor-pointer`}>
            <option>Semua Kategori</option>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className={`divide-y ${t.divider}`}>
          {items.length === 0 && <p className={`text-sm py-8 text-center ${t.subtext}`}>Tidak ada tugas di sini.</p>}
          {items.map((task) => {
            const style = (CATEGORY_STYLES[task.category] && CATEGORY_STYLES[task.category][dark ? "dark" : "light"]) || "";
            return (
              <div key={task.id} className={`task-row flex items-center gap-4 py-3.5 px-2 rounded-xl ${t.rowHover} relative`}>
                <button onClick={() => toggleDone(task.id)} className="shrink-0">
                  {task.done ? <ICheckCircle size={22} className="text-emerald-500"/> : <ICircle size={22} className={t.subtext}/>}
                </button>
                <button onClick={() => setDetailId(task.id)} className={`flex-1 text-left text-sm font-medium truncate ${task.done ? `line-through ${t.subtext}` : t.text}`}>
                  {task.title}
                </button>
                <span className={`hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full ${style}`}>{task.category}</span>
                <span className={`hidden sm:block text-xs w-24 text-right ${t.subtext}`}>{formatDate(task.date)}</span>
                <div className="relative">
                  <button onClick={() => setMenuOpenId(menuOpenId === task.id ? null : task.id)} className={`p-1.5 rounded-lg ${t.subtext} hover:opacity-70`}>
                    <IMore size={18}/>
                  </button>
                  {menuOpenId === task.id && (
                    <div className={`absolute right-0 mt-1 w-36 rounded-xl border ${t.cardBorder} ${t.cardBg} shadow-lg z-10 overflow-hidden pop-in`}>
                      <button onClick={() => openEdit(task)} className={`flex items-center gap-2 w-full px-3 py-2.5 text-sm ${t.rowHover}`}><IPencil size={14}/> Edit</button>
                      <button onClick={() => deleteTask(task.id)} className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-rose-500 hover:bg-rose-500/10"><ITrash size={14}/> Hapus</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function DashboardView() {
    return (
      <div className="fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">Halo, {userName || "Teman"}! <span>👋</span></h1>
            <p className={`text-sm mt-1 ${t.subtext}`}>Selamat datang kembali! Semangat menyelesaikan tugas hari ini.</p>
          </div>
          {HeaderRight()}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard t={t} icon={<IClipboard size={20} className="text-indigo-500"/>} bg={dark ? "bg-indigo-500/10" : "bg-indigo-50"} value={total} label="Total Tugas"/>
          <StatCard t={t} icon={<ICheckCircle size={20} className="text-emerald-500"/>} bg={dark ? "bg-emerald-500/10" : "bg-emerald-50"} value={selesai} label="Selesai"/>
          <StatCard t={t} icon={<ICalendar size={20} className="text-amber-500"/>} bg={dark ? "bg-amber-500/10" : "bg-amber-50"} value={belum} label="Belum Selesai"/>
          <StatCard t={t} icon={<IFlag size={20} className="text-rose-500"/>} bg={dark ? "bg-rose-500/10" : "bg-rose-50"} value={prioritas} label="Prioritas"/>
        </div>
        {TaskListCard({ items: filtered, title: "Daftar Tugas" })}
      </div>
    );
  }

  function TugasSayaView() {
    return (
      <div className="fade-in">
        {PageHeader({ title: "Tugas Saya", subtitle: `${belum} tugas belum selesai dari total ${total} tugas.` })}
        {TaskListCard({ items: filtered, title: "Semua Tugas" })}
      </div>
    );
  }

  function PrioritasView() {
    return (
      <div className="fade-in">
        {PageHeader({ title: "Prioritas", subtitle: "Tugas dengan prioritas tinggi yang perlu perhatian lebih." })}
        <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 md:p-6 shadow-sm card-hover`}>
          <div className={`divide-y ${t.divider}`}>
            {priorityTasks.length === 0 && <p className={`text-sm py-8 text-center ${t.subtext}`}>Tidak ada tugas prioritas tinggi.</p>}
            {priorityTasks.map((task) => {
              const style = (CATEGORY_STYLES[task.category] && CATEGORY_STYLES[task.category][dark ? "dark" : "light"]) || "";
              return (
                <div key={task.id} className={`task-row flex items-center gap-4 py-3.5 px-2 rounded-xl ${t.rowHover}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${PRIORITY_DOT[task.priority]} shrink-0`}/>
                  <button onClick={() => toggleDone(task.id)} className="shrink-0">
                    {task.done ? <ICheckCircle size={22} className="text-emerald-500"/> : <ICircle size={22} className={t.subtext}/>}
                  </button>
                  <button onClick={() => setDetailId(task.id)} className={`flex-1 text-left text-sm font-medium truncate ${task.done ? `line-through ${t.subtext}` : t.text}`}>
                    {task.title}
                  </button>
                  <span className={`hidden sm:inline-block text-xs font-semibold px-3 py-1 rounded-full ${style}`}>{task.category}</span>
                  <span className={`hidden sm:block text-xs w-24 text-right ${t.subtext}`}>{formatDate(task.date)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function KalenderView() {
    const y = calDate.getFullYear(), m = calDate.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    const tasksByDay = {};
    tasks.forEach((tk) => {
      if (!tk.date) return;
      const d = new Date(tk.date + "T00:00:00");
      if (d.getFullYear() === y && d.getMonth() === m) {
        tasksByDay[d.getDate()] = (tasksByDay[d.getDate()] || []).concat(tk);
      }
    });
    const weekdays = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    return (
      <div className="fade-in">
        {PageHeader({ title: "Kalender", subtitle: "Lihat tugas kamu berdasarkan tanggal." })}
        <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 md:p-6 shadow-sm card-hover`}>
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => setCalDate(new Date(y, m - 1, 1))} className={`p-2 rounded-lg ${t.pillBg}`}><IChevronLeft size={16}/></button>
            <h3 className="font-bold capitalize">{monthLabel(y, m)}</h3>
            <button onClick={() => setCalDate(new Date(y, m + 1, 1))} className={`p-2 rounded-lg ${t.pillBg}`}><IChevronRight size={16}/></button>
          </div>
          <div className="grid grid-cols-7 gap-1.5 mb-2">
            {weekdays.map((w) => <div key={w} className={`text-center text-xs font-semibold py-1 ${t.subtext}`}>{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {cells.map((d, i) => {
              const dayTasks = d ? tasksByDay[d] : null;
              return (
                <div key={i} className={`min-h-[64px] rounded-xl p-1.5 border ${t.cardBorder} ${d ? t.rowHover : ""} ${d ? "" : "opacity-0"}`}>
                  {d && <div className="text-xs font-semibold mb-1">{d}</div>}
                  {dayTasks && dayTasks.slice(0, 2).map((tk) => (
                    <div key={tk.id} onClick={() => setDetailId(tk.id)}
                      className={`text-[10px] truncate px-1.5 py-0.5 rounded mb-0.5 cursor-pointer ${(CATEGORY_STYLES[tk.category] && CATEGORY_STYLES[tk.category][dark ? "dark" : "light"]) || t.pillBg} ${tk.done ? "line-through opacity-60" : ""}`}>
                      {tk.title}
                    </div>
                  ))}
                  {dayTasks && dayTasks.length > 2 && <div className={`text-[10px] ${t.subtext}`}>+{dayTasks.length - 2} lagi</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  function PengaturanView() {
    return (
      <div className="fade-in max-w-xl">
        {PageHeader({ title: "Pengaturan", subtitle: "Sesuaikan tampilan dan preferensi aplikasi kamu." })}
        <div className="space-y-4">
          <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 shadow-sm card-hover`}>
            <h3 className="font-bold mb-4">Profil</h3>
            <label className={`text-xs font-semibold mb-1.5 block ${t.subtext}`}>Nama Tampilan</label>
            <input value={userName} onChange={(e) => setUserName(e.target.value)}
              className={`w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none focus:ring-2 ${A.ring}`}/>
          </div>

          <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 shadow-sm card-hover`}>
            <h3 className="font-bold mb-4">Tampilan</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm font-medium">Mode Gelap</p>
                <p className={`text-xs ${t.subtext}`}>Ubah tampilan aplikasi menjadi gelap</p>
              </div>
              <button onClick={() => setDark((d) => !d)}
                className={`w-12 h-7 rounded-full flex items-center px-1 transition ${dark ? A.chip : "bg-slate-300"}`}>
                <span className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${dark ? "translate-x-5" : "translate-x-0"}`}/>
              </button>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Warna Aksen</p>
              <div className="flex gap-2">
                {Object.keys(accentMap).map((c) => (
                  <button key={c} onClick={() => setAccent(c)}
                    className={`w-8 h-8 rounded-full ${accentMap[c].chip} ${accent === c ? "ring-2 ring-offset-2 " + (dark ? "ring-offset-slate-900" : "ring-offset-white") + " ring-slate-400" : ""}`}/>
                ))}
              </div>
            </div>
          </div>

          <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 shadow-sm card-hover`}>
            <h3 className="font-bold mb-4">Notifikasi</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Pengingat Tugas</p>
                <p className={`text-xs ${t.subtext}`}>Terima notifikasi untuk tugas mendatang</p>
              </div>
              <button onClick={() => setNotifOn((v) => !v)}
                className={`w-12 h-7 rounded-full flex items-center px-1 transition ${notifOn ? A.chip : "bg-slate-300"}`}>
                <span className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${notifOn ? "translate-x-5" : "translate-x-0"}`}/>
              </button>
            </div>
          </div>

          <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-5 shadow-sm card-hover`}>
            <h3 className="font-bold mb-4">Data</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={clearCompleted} className={`flex-1 flex items-center justify-center gap-2 ${t.pillBg} text-sm font-semibold py-2.5 rounded-xl`}>
                <ITrash2Big size={15}/> Bersihkan Tugas Selesai
              </button>
              <button onClick={resetAll} className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold py-2.5 rounded-xl">
                Reset Semua Data
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function PageHeader({ title, subtitle }) {
    return (
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className={`text-sm mt-1 ${t.subtext}`}>{subtitle}</p>
        </div>
        {HeaderRight()}
      </div>
    );
  }

  function HeaderRight() {
    return (
      <div className="flex items-center gap-3 relative">
        <div className="relative">
          <button onClick={() => setShowNotif((v) => !v)} aria-label="Notifikasi"
            className={`w-10 h-10 rounded-full flex items-center justify-center border ${t.cardBorder} ${t.cardBg} hover:opacity-80 relative`}>
            <IBell size={17} className={notifOn ? A.text : t.subtext}/>
            {notifOn && todayTasks.length > 0 && (
              <span className={`absolute top-1.5 right-2 min-w-[15px] h-[15px] px-[3px] rounded-full ${A.chip} text-white text-[9px] font-bold flex items-center justify-center`}>
                {todayTasks.length}
              </span>
            )}
          </button>
          {showNotif && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotif(false)}/>
              <div className={`absolute right-0 top-12 w-72 sm:w-80 ${t.cardBg} border ${t.cardBorder} rounded-2xl shadow-lg z-50 fade-in overflow-hidden`}>
                <div className={`px-4 py-3 border-b ${t.cardBorder} flex items-center justify-between`}>
                  <p className="font-bold text-sm">Notifikasi Hari Ini</p>
                  <button onClick={() => setShowNotif(false)} className={t.subtext}><IX size={16}/></button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-inherit">
                  {todayTasks.length === 0 ? (
                    <div className="flex flex-col items-center text-center px-4 py-8">
                      <ICalendar size={26} className={`mb-2 ${t.subtext}`}/>
                      <p className="text-sm font-semibold">Jadwal Anda kosong hari ini</p>
                      <p className={`text-xs mt-1 ${t.subtext}`}>Tidak ada tugas yang perlu diselesaikan hari ini.</p>
                    </div>
                  ) : (
                    todayTasks.map((tk) => (
                      <button key={tk.id} onClick={() => { setDetailId(tk.id); setShowNotif(false); }}
                        className={`w-full text-left px-4 py-3 flex items-start gap-3 ${t.rowHover}`}>
                        <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${PRIORITY_DOT[tk.priority]}`}/>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{tk.title}</p>
                          <p className={`text-xs mt-0.5 ${t.subtext}`}>{tk.category} • Prioritas {PRIORITY_LABEL[tk.priority]}</p>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        <button onClick={() => setDark((d) => !d)} aria-label="Ganti mode terang/gelap"
          className={`w-10 h-10 rounded-full flex items-center justify-center border ${t.cardBorder} ${t.cardBg} hover:opacity-80`}>
          {dark ? <IMoon size={18} className="text-indigo-300"/> : <ISun size={18} className="text-amber-500"/>}
        </button>
        <button onClick={() => setNav("Pengaturan")} className={`w-10 h-10 rounded-full ${A.chip} flex items-center justify-center text-white`}>
          <IUser size={18}/>
        </button>
      </div>
    );
  }

  const views = {
    "Dashboard": DashboardView(),
    "Tugas Saya": TugasSayaView(),
    "Prioritas": PrioritasView(),
    "Kalender": KalenderView(),
    "Pengaturan": PengaturanView(),
  };

  return (
    <div className={`min-h-screen w-full ${t.appBg} ${t.text} transition-colors duration-300`}>
      <div className="flex max-w-7xl mx-auto min-h-screen">
        <aside className={`${t.sidebarBg} text-white w-72 shrink-0 flex-col p-6 hidden md:flex`}>
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center`}><IClipboard size={22}/></div>
            <span className="text-lg font-bold tracking-tight">To-Do List</span>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const IconC = item.icon; const active = nav === item.label;
              return (
                <button key={item.label} onClick={() => { setNav(item.label); setMenuOpenId(null); }}
                  className={`nav-btn flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${active ? `${A.chip} text-white shadow-lg shadow-indigo-900/30 pl-5` : "text-indigo-200/70 hover:bg-white/5 hover:text-white"}`}>
                  <IconC size={18}/>{item.label}
                </button>
              );
            })}
          </nav>
          <div className="mt-auto pt-10">
            <div className="rounded-2xl bg-white/5 p-5 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-400/20 flex items-center justify-center mb-3">
                <ICheckCircle size={34} className="text-indigo-300"/>
              </div>
              <p className="text-sm text-indigo-100/80 italic leading-relaxed">"Selesaikan hari ini, untuk masa depan yang lebih baik."</p>
              <div className={`w-8 h-0.5 ${A.chip} mt-3 rounded-full`}/>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-5 md:p-8 pb-24 md:pb-8">
          {views[nav]}
        </main>
      </div>

      {showAdd && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 fade-in">
          <div className={`${t.cardBg} ${t.text} w-full max-w-md rounded-2xl p-6 border ${t.cardBorder} max-h-[90vh] overflow-y-auto scale-in`}>
            <div className="flex items-center gap-3 mb-5">
              <button onClick={() => setShowAdd(false)} className={t.subtext}><IChevronLeft size={20}/></button>
              <h3 className="text-lg font-bold">{editingId ? "Edit Tugas" : "Tambah Tugas"}</h3>
              <button onClick={() => setShowAdd(false)} className={`ml-auto ${t.subtext}`}><IX size={20}/></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${t.subtext}`}>Judul Tugas</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Contoh: Belajar JavaScript" className={`w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none focus:ring-2 ${A.ring}`}/>
              </div>
              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${t.subtext}`}>Kategori</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none`}>
                  <option value="">Pilih kategori</option>
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${t.subtext}`}>Tanggal</label>
                <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none`}/>
              </div>
              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${t.subtext}`}>Prioritas</label>
                <div className="flex gap-4 text-sm">
                  {["rendah", "sedang", "tinggi"].map((p) => (
                    <label key={p} className="flex items-center gap-1.5 cursor-pointer">
                      <input type="radio" checked={form.priority === p} onChange={() => setForm({ ...form, priority: p })} className="accent-indigo-500"/>
                      {PRIORITY_LABEL[p]}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className={`text-xs font-semibold mb-1.5 block ${t.subtext}`}>Catatan (opsional)</label>
                <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Tulis catatan..." rows={3} className={`w-full rounded-xl px-3.5 py-2.5 text-sm border ${t.inputBg} outline-none resize-none`}/>
              </div>
              <button onClick={saveTask} className={`w-full ${A.btn} text-white font-semibold py-3 rounded-xl`}>Simpan Tugas</button>
            </div>
          </div>
        </div>
      )}

      {detailTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-40 fade-in">
          <div className={`${t.cardBg} ${t.text} w-full max-w-md rounded-2xl p-6 border ${t.cardBorder} scale-in`}>
            <div className="flex items-center gap-3 mb-5">
              <button onClick={() => setDetailId(null)} className={t.subtext}><IChevronLeft size={20}/></button>
              <h3 className="text-lg font-bold">Detail Tugas</h3>
              <button onClick={() => setDetailId(null)} className={`ml-auto ${t.subtext}`}><IX size={20}/></button>
            </div>
            <div className="flex flex-col items-center text-center mb-5">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${(CATEGORY_STYLES[detailTask.category] && CATEGORY_STYLES[detailTask.category][dark ? "dark" : "light"]) || t.pillBg}`}>
                <IGrad size={26}/>
              </div>
              <h4 className="font-bold text-lg">{detailTask.title}</h4>
              <span className={`mt-2 text-xs font-semibold px-3 py-1 rounded-full ${(CATEGORY_STYLES[detailTask.category] && CATEGORY_STYLES[detailTask.category][dark ? "dark" : "light"]) || t.pillBg}`}>
                {detailTask.category}
              </span>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <ICalendar size={18} className={`mt-0.5 ${t.subtext}`}/>
                <div><p className={`text-xs ${t.subtext}`}>Tanggal</p><p className="text-sm font-medium">{formatDate(detailTask.date) || "-"}</p></div>
              </div>
              <div className="flex items-start gap-3">
                <IFlag size={18} className={`mt-0.5 ${t.subtext}`}/>
                <div><p className={`text-xs ${t.subtext}`}>Prioritas</p><p className={`text-sm font-medium ${PRIORITY_COLOR[detailTask.priority]}`}>{PRIORITY_LABEL[detailTask.priority]}</p></div>
              </div>
              {detailTask.note && (
                <div className="flex items-start gap-3">
                  <IFileText size={18} className={`mt-0.5 ${t.subtext}`}/>
                  <div><p className={`text-xs ${t.subtext}`}>Catatan</p><p className="text-sm font-medium">{detailTask.note}</p></div>
                </div>
              )}
            </div>
            <div className="flex gap-3 mb-4">
              <button onClick={() => openEdit(detailTask)} className={`flex-1 flex items-center justify-center gap-2 ${A.btn} text-white text-sm font-semibold py-2.5 rounded-xl`}><IPencil size={15}/> Edit</button>
              <button onClick={() => deleteTask(detailTask.id)} className="flex-1 flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold py-2.5 rounded-xl"><ITrash size={15}/> Hapus</button>
            </div>
            <button onClick={() => toggleDone(detailTask.id)} className="w-full flex items-center justify-center gap-2 text-emerald-500 font-semibold text-sm py-2">
              <ICheckCircle size={16}/>{detailTask.done ? "Tandai Belum Selesai" : "Tandai Selesai"}
            </button>
          </div>
        </div>
      )}

      {toast && (
        <div className={`fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 ${A.chip} text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg z-50 pop-in`}>
          {toast}
        </div>
      )}

      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${t.cardBg} border-t ${t.cardBorder} flex justify-around py-2.5 z-30`}>
        {[{ label: "Beranda", icon: IHome, target: "Dashboard" }, { label: "Tugas", icon: IList, target: "Tugas Saya" }, { label: "Kalender", icon: ICalendar, target: "Kalender" }, { label: "Pengaturan", icon: ISettings, target: "Pengaturan" }].map((item) => {
          const IconC = item.icon;
          const active = nav === item.target;
          return (
            <button key={item.label} onClick={() => setNav(item.target)} className={`flex flex-col items-center gap-1 text-xs ${active ? A.text : t.subtext}`}>
              <IconC size={18}/>{item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ t, icon, bg, value, label }) {
  return (
    <div className={`${t.cardBg} border ${t.cardBorder} rounded-2xl p-4 flex items-center gap-3 shadow-sm card-hover`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bg}`}>{icon}</div>
      <div><p className="text-xl font-bold leading-none">{value}</p><p className={`text-xs mt-1 ${t.subtext}`}>{label}</p></div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TodoApp />);
