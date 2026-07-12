/* ---------- App ---------- */
const STORAGE_KEY = "todo-app-data-v1";
const SETTINGS_KEY = "todo-app-settings-v1";

function loadTasks() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Gagal memuat data tersimpan:", e);
  }
  return initialTasks;
}

function loadSettings() {
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Gagal memuat pengaturan tersimpan:", e);
  }
  return {};
}

