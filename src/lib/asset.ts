export const getAssetPath = (path: string) => {
  const isProd = process.env.NODE_ENV === "production";
  const basePath = isProd ? "/bangbulb-web" : "";
  // If path doesn't start with a slash, add one
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
