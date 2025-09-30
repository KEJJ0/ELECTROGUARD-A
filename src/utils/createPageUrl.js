export function createPageUrl(path) {
  const base = import.meta.env.BASE_URL || '/';
  return (base.endsWith('/') ? base.slice(0, -1) : base) + (path.startsWith('/') ? path : `/${path}`);
}
