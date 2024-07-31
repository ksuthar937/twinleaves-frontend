export const updateProductImageUrl = (url) => {
  return url
    ? url.split("?")[0] + "?alt=media"
    : "https://via.placeholder.com/50";
};
