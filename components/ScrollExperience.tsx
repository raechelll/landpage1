"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ScrollExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          gsap.to(".reading-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.1,
            },
          });
          // Replay the gentle reveal when a section re-enters from either direction.
          const sections = root.current?.querySelectorAll<HTMLElement>(
            "#ekosistem .erp-network-intro, #fitur > .container, #solusi > .container, #kontrol > .container, #faq > .container, .corporate-footer > .container",
          );
          sections?.forEach((section) => {
            gsap.from(section, {
              opacity: 0,
              y: 16,
              duration: 0.55,
              ease: "power2.out",
              clearProps: "opacity,transform",
              scrollTrigger: {
                trigger: section,
                start: "top 92%",
                end: "bottom top",
                toggleActions: "restart none restart none",
              },
            });
          });
          let timeout: ReturnType<typeof setTimeout>;
          let refreshPending = false;
          const refreshWhenIdle = () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              if (!refreshPending) return;
              refreshPending = false;
              ScrollTrigger.refresh();
            }, 250);
          };
          const onScroll = () => {
            if (refreshPending) refreshWhenIdle();
          };
          const observer = new ResizeObserver(() => {
            refreshPending = true;
            refreshWhenIdle();
          });
          if (root.current) observer.observe(root.current);
          window.addEventListener("scroll", onScroll, { passive: true });
          return () => {
            observer.disconnect();
            clearTimeout(timeout);
            window.removeEventListener("scroll", onScroll);
          };
        },
        root,
      );
      return () => media.revert();
    },
    { scope: root },
  );
  return (
    <div className="page-motion" ref={root}>
      <div className="reading-progress" aria-hidden="true" />
      {children}
    </div>
  );
}
