export const loadJSON = (k, fallback) => {
  try { const s = localStorage.getItem(k); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
};
export const saveJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
