import { useEffect, useState } from 'react';

export const mediaQuery = (query: string) => {
  var res = window.matchMedia(query);

  if (res.matches) return true;
  return false;
};

// Stolen from https://usehooks-ts.com/react-hook/use-media-query
export function useMediaQuery(query: string): boolean {
  const getMatches = (query: string): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}

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

export const currencyFormatter = new Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK',
});

export const numberFormatter = (
  num: number,
  locale: string = 'sv-SE'
): string => num.toLocaleString(locale);

export const splitByCondition = (
  array: any[],
  conditionFn: (item: any) => boolean
) => {
  const pass: any[] = [];
  const fail: any[] = [];

  array.forEach((item) => {
    if (conditionFn(item)) pass.push(item);
    else fail.push(item);
  });

  return [pass, fail];
};
