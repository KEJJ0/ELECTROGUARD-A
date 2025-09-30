export function createPageUrl(path) {
  
  const p = String(path).trim().replace(/^\/*/, '').toLowerCase();
  return `/${p}`; 
}
