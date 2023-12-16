export const mediaQuery = (query) => {
  var res = window.matchMedia(query);

  if (res.matches) return true;
  return false;
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const interpolate = (start, end, progress) => {
  return start + (end - start) * progress;
};

export const reverseInterpolateClamped = (min, max, value) => {
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
};
