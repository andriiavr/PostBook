import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll(onReach, enabled, postsLength) {
  const sentinelRef = useRef(null);
  const callbackRef = useRef(onReach);
  const busyRef = useRef(false);
  const failedRef = useRef(false);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    callbackRef.current = onReach;
  });

  
  useEffect(() => {
    failedRef.current = false;
  }, [postsLength]);

  
  useEffect(() => {
    const handleOnline = () => {
      failedRef.current = false;
      setRetryTick((t) => t + 1);
    };
    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !enabled) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;
        if (busyRef.current || failedRef.current) return;

        busyRef.current = true;
        try {
          await callbackRef.current();
        } catch {
          failedRef.current = true;
        } finally {
          busyRef.current = false;
        }
      },
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, postsLength, retryTick]);

  return sentinelRef;
}