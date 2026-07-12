/* ---------- Data & helpers ---------- */
const CATEGORY_STYLES = {
  Pendidikan: { light: "bg-rose-100 text-rose-600", dark: "bg-rose-500/15 text-rose-300" },
  Organisasi: { light: "bg-indigo-100 text-indigo-600", dark: "bg-indigo-500/15 text-indigo-300" },
  Pribadi: { light: "bg-amber-100 text-amber-600", dark: "bg-amber-500/15 text-amber-300" },
};
const PRIORITY_LABEL = { rendah: "Rendah", sedang: "Sedang", tinggi: "Tinggi" };
const PRIORITY_COLOR = { rendah: "text-emerald-500", sedang: "text-amber-500", tinggi: "text-rose-500" };
const PRIORITY_DOT = { rendah: "bg-emerald-500", sedang: "bg-amber-500", tinggi: "bg-rose-500" };

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

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
}
function monthLabel(y, m) {
  return new Date(y, m, 1).toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

