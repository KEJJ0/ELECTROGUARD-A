// src/utils/index.js
export const createPageUrl = (name = "") => {
  const slug = String(name).trim().toLowerCase();
  if (!slug || slug === "dashboard") return "/";
  return `/${slug}`;
};
