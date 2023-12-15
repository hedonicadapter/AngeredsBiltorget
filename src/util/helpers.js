export const mediaQuery = (query) => {
  var res = window.matchMedia(query);

  if (res.matches) return true;
  return false;
};
