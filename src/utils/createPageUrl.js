// src/utils/createPageUrl.js
export function createPageUrl(path) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, ''); // شِل أي سلاش زائد من آخر الـ base
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
