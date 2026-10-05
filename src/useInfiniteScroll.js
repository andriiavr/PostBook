import { useEffect, useRef } from "react";

export function useInfiniteScroll(onReach, enabled, postsLength) {
  const sentinelRef = useRef(null);
  const callbackRef = useRef(onReach);

  useEffect(() => {
    callbackRef.current = onReach;
  });

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) callbackRef.current();
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, postsLength]);

  return sentinelRef;
}
