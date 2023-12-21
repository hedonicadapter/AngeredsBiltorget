export const mediaQuery = (query: string) => {
  var res = window.matchMedia(query);

  if (res.matches) return true;
  return false;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const interpolate = (start: number, end: number, progress: number) => {
  return start + (end - start) * progress;
};

export const reverseInterpolateClamped = (
  min: number,
  max: number,
  value: number
) => {
  return Math.min(1, Math.max(0, (value - min) / (max - min)));
};

export const clearTimeouts = (timeouts?: NodeJS.Timeout[]) => {
  if (timeouts) timeouts.forEach((timeout) => clearTimeout(timeout));
};
