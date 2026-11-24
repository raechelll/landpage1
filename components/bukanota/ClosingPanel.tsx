"use client";

import { Translate } from "@/components/SitePreferences";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/scroll-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { CONTACT_PATH } from "@/lib/contact";
import styles from "./ClosingPanel.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ClosingPanel() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const section = root.current;
      if (!section) return;
      gsap.fromTo("[data-closing-photo]", { scale: 1.07 }, {
        scale: 1, duration: 1.4, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 85%", end: "bottom top", toggleActions: "restart reset restart reset" },
      });
      const copy = section.querySelector<HTMLElement>("[data-closing-copy]");
      if (copy) revealOnScroll(copy, Array.from(copy.children) as HTMLElement[], { distance: 26, duration: .75, stagger: .12 });
    });
    return () => media.revert();
  }, { scope: root });

  return <Translate><section className={styles.section} id="hubungi" ref={root} aria-labelledby="contact-title">
    <div className={styles.background} data-closing-photo><Image data-scroll-photo src="/images/bukanota/pemilik-usaha.webp" alt="" fill sizes="100vw" /></div>
    <div className={styles.shade} aria-hidden="true" />
    <div className={styles.container}>
      <div className={styles.copy} data-closing-copy>
        <span className={styles.label}>Mulai bersama Buka Nota</span>
        <h2 id="contact-title">Waktunya usaha<br />lebih tertata.</h2>
        <p>Catat transaksi, pantau persediaan, dan pahami keuangan usaha. Ceritakan kebutuhan Anda, kami bantu temukan langkah awalnya.</p>
        <div className={styles.actions}>
          <Link className={styles.primary} href={CONTACT_PATH}><Mail size={21} aria-hidden="true" />Hubungi tim Buka Nota</Link>
          <a className={styles.secondary} href="#fitur">Jelajahi fitur</a>
        </div>
      </div>
    </div>
  </section></Translate>;
}
