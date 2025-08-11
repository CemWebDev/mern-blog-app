import { useEffect, useRef } from 'react';

export const useInfinity = (
  onHit,
  {
    enabled = true,
    isFetching = false,
    rootMargin = '300px 0px',
    threshold = 0,
  } = {}
) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || isFetching) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onHit();
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, isFetching, rootMargin, threshold, onHit]); 

  return ref;
};
