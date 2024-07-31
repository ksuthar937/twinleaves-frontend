export const updateProductImageUrl = (url) => {
  return url ? url.split("?")[0] + "?alt=media" : "";
};
