"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BookOpen, ChartNoAxesCombined, Wallet } from "lucide-react";
import styles from "./FinanceShowcase.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const capabilities = [
  { name: "Arus Dana", detail: "Kas masuk, kas keluar, transfer, dan rekonsiliasi.", Icon: Wallet },
  { name: "Pembukuan", detail: "Jurnal, daftar akun, kurs, aset, dan proses tutup buku.", Icon: BookOpen },
  { name: "Laporan Keuangan", detail: "Informasi laba rugi, neraca, dan kondisi keuangan bisnis.", Icon: ChartNoAxesCombined },
];

export default function FinanceShowcase() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const heading = root.current?.querySelector("[data-finance-heading]");
      const features = root.current?.querySelectorAll("[data-finance-feature]");
      if (heading) gsap.from(heading, {
        opacity: 0, duration: 0.65, ease: "power2.out", clearProps: "opacity",
        scrollTrigger: { trigger: heading, start: "top 88%", end: "bottom top", toggleActions: "restart none restart none" },
      });
      features?.forEach((feature, index) => gsap.from(feature, {
        opacity: 0, y: 6, duration: 0.45, delay: index * 0.08,
        ease: "power2.out", clearProps: "opacity,transform",
        scrollTrigger: { trigger: feature, start: "top 92%", end: "bottom top", toggleActions: "restart none restart none" },
      }));
    });
    return () => media.revert();
  }, { scope: root });

  return <section id="keuangan" className={`ops-finance ${styles.section}`} ref={root} aria-labelledby="ops-finance-heading">
    <div className={`container ${styles.layout}`}>
      <div className={styles.introduction} data-finance-heading>
        <span className={styles.subject}>Keuangan &amp; Akuntansi</span>
        <h2 id="ops-finance-heading">Dari transaksi ke laporan keuangan yang lebih jelas.</h2>
        <p className={styles.description}>BukaNota membantu mengelola pencatatan transaksi, pembukuan, kas dan bank, serta aset perusahaan dalam satu sistem yang terstruktur.</p>
      </div>
      <dl className={styles.capabilities}>
        {capabilities.map(({ name, detail, Icon }) => <div className={styles.capability} key={name} data-finance-feature>
          <dt><Icon size={22} strokeWidth={1.7} aria-hidden="true" />{name}</dt>
          <dd>{detail}</dd>
        </div>)}
      </dl>
    </div>
  </section>;
}
