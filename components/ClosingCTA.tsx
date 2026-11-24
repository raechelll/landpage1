"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import styles from "./ClosingCTA.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ClosingCTA() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        defaults: { ease: "power3.out", clearProps: "opacity,transform" },
        scrollTrigger: { trigger: root.current, start: "top 85%", end: "bottom top", toggleActions: "restart none restart none" },
      })
        .from("[data-closing-title]", { opacity: 0, y: 18, duration: 0.65 }, 0)
        .from("[data-closing-description]", { opacity: 0, y: 12, duration: 0.55 }, 0.15)
        .from("[data-closing-actions] > a", { opacity: 0, y: 10, duration: 0.5, stagger: 0.1 }, 0.3);
    });
    return () => media.revert();
  }, { scope: root });
  return (
    <section ref={root} className={`closing-cta-section ${styles.section}`} aria-labelledby="closing-heading">
      <div className={`container ${styles.content}`}>
        <h2 id="closing-heading" data-closing-title>Siap merapikan usaha Anda?</h2>
        <p data-closing-description>Mulai dengan BukaNota, atau diskusikan kebutuhan usaha Anda bersama tim kami.</p>
        <div className={styles.actions} data-closing-actions>
          <a className={styles.primary} href="https://bukanota.com/harga">Coba sekarang<ArrowRight size={17} aria-hidden="true" /></a>
          <a className={styles.secondary} href="https://bukanota.com/contact">Hubungi kami<ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
