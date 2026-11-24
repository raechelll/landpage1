import gsap from "gsap";

/** Replay each entrance after the section has left the viewport in either direction. */
export function revealOnScroll(
  trigger: HTMLElement,
  targets: HTMLElement | HTMLElement[],
  { distance = 28, duration = .75, stagger = .09, start = "clamp(top 90%)" } = {},
) {
  return gsap.fromTo(targets, { opacity: 0, y: distance }, {
    opacity: 1,
    y: 0,
    duration,
    stagger,
    ease: "power3.out",
    scrollTrigger: {
      trigger,
      start,
      end: "bottom top",
      toggleActions: "restart reset restart reset",
    },
  });
}
