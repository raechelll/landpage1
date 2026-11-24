"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/scroll-motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 741px)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = context.conditions.desktop;

      // Animate stable wrappers, leaving tab transitions and marquees independent.
      element.querySelectorAll<HTMLElement>("[data-scroll-reveal]").forEach((group) => {
        const items = Array.from(group.querySelectorAll<HTMLElement>(":scope > [data-scroll-item]"));
        const targets = items.length ? items : [group];
        revealOnScroll(group, targets, {
          distance: desktop ? 36 : 22,
          duration: desktop ? .8 : .65,
          stagger: items.length ? .11 : 0,
        });
      });

      element.querySelectorAll<HTMLElement>("[data-scroll-photo]").forEach((photo) => {
        const section = photo.closest("section");
        if (!section) return;
        gsap.fromTo(photo, { yPercent: -3, scale: 1.1 }, {
          yPercent: 3,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: section.id === "beranda" ? "top top" : "clamp(top bottom)",
            end: "clamp(bottom top)",
            scrub: desktop ? .8 : .45,
            id: "landing-photo",
          },
        });
      });
    });

    // Language changes, FAQ expansion, and loaded fonts can move section boundaries.
    let frame = 0;
    let anchorFrame = 0;
    let disposed = false;
    let interacted = false;
    const initialHash = location.hash;
    const onInteraction = () => { interacted = true; };
    const refresh = () => {
      if (disposed || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        ScrollTrigger.refresh(true);
      });
    };
    const observer = new ResizeObserver(refresh);
    element.querySelectorAll("section, footer").forEach((section) => observer.observe(section));
    element.addEventListener("load", refresh, true);

    // Native smooth anchor scrolling can be interrupted by ScrollTrigger's initial
    // measurements. Settle the initial link after layout is ready, unless the user
    // has already taken control of scrolling or navigation.
    const onReady = () => {
      void document.fonts.ready.then(() => {
        if (disposed) return;
        refresh();
        if (!initialHash) return;
        anchorFrame = requestAnimationFrame(() => {
          if (disposed || interacted || location.hash !== initialHash) return;
          let id: string;
          try { id = decodeURIComponent(initialHash.slice(1)); } catch { return; }
          const target = document.getElementById(id);
          if (target && element.contains(target)) target.scrollIntoView({ behavior: "instant", block: "start" });
        });
      });
    };
    const interactionEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    interactionEvents.forEach((event) => window.addEventListener(event, onInteraction, { passive: true }));
    if (document.readyState === "complete") onReady();
    else window.addEventListener("load", onReady, { once: true });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      observer.disconnect();
      element.removeEventListener("load", refresh, true);
      window.removeEventListener("load", onReady);
      interactionEvents.forEach((event) => window.removeEventListener(event, onInteraction));
      media.revert();
    };
  }, { scope: root });

  return <div ref={root} data-scroll-experience>{children}</div>;
}
