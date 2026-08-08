export const getAssetPath = (path: string) => {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/bangbulb-web" : "";
  // Yol slash ile başlamıyorsa başına ekle
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
