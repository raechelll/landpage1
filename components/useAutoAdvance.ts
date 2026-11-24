"use client";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

/** Run only in view, while idle, and when motion is allowed. */
export function useAutoAdvance(
  root: RefObject<HTMLElement | null>,
  onAdvance: () => void,
  interval: number,
  resetKey?: number,
  options: { pauseOnHover?: boolean } = {},
) {
  const pauseOnHover = options.pauseOnHover ?? true;
  const callback = useRef(onAdvance);
  const [enabled, setEnabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => { callback.current = onAdvance; }, [onAdvance]);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduced(motion.matches);
    const updateVisibility = () => setHidden(document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.15);
    }, { threshold: [0, 0.15] });
    updateMotion(); updateVisibility(); observer.observe(element);
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [root]);
  const running = enabled && visible && !reduced && !hidden && !(pauseOnHover && hovered) && !focused;
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => callback.current(), interval);
    return () => clearInterval(timer);
  }, [running, interval, resetKey]);
  const pause = useCallback(() => setEnabled(false), []);
  const toggle = useCallback(() => setEnabled(value => !value), []);
  return {
    enabled, running, reduced, pause, toggle,
    interaction: {
      onPointerEnter: (event: React.PointerEvent<HTMLElement>) => {
        if (event.pointerType === "mouse") setHovered(true);
      },
      onPointerLeave: () => setHovered(false),
      onFocusCapture: (event: React.FocusEvent<HTMLElement>) => {
        setFocused(event.target.matches(":focus-visible"));
      },
      onBlurCapture: (event: React.FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      },
    },
  };
}
