// Alt yolun tek kaynağı next.config.ts'tir; çözülen değer
// NEXT_PUBLIC_BASE_PATH olarak buraya enjekte edilir.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const getAssetPath = (path: string) => {
  // Yol slash ile başlamıyorsa başına ekle
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
