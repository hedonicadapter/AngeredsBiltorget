export const whileInView = (
  element: HTMLElement | null,
  inViewCallback: (entry?: IntersectionObserverEntry) => any,
  notInViewCallback: (entry?: IntersectionObserverEntry) => any
) => {
  if (!element) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      entry.isIntersecting ? inViewCallback(entry) : notInViewCallback(entry);
    });
  });

  observer.observe(element);
};
