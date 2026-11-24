"use client";

import { Translate } from "@/components/SitePreferences";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/scroll-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import "./hero-workspace.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
export default function StoryHero() {
  const root = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const section = root.current;
      if (!section) return;
      const text = Array.from(section.querySelectorAll<HTMLElement>(".workspace-hero-copy > *"));
      revealOnScroll(section, text, { distance: 20, duration: .7, stagger: .12, start: "top 99%" });
    });
    return () => media.revert();
  }, { scope: root });
  return <Translate><section className="workspace-hero" id="beranda" ref={root} aria-labelledby="workspace-hero-heading">
    <Image className="workspace-hero-background" data-scroll-photo src="/images/hero-cafe.webp" alt="" fill preload sizes="100vw" />
    <div className="workspace-hero-shade" aria-hidden="true" />
    <div className="container workspace-hero-grid">
      <div className="workspace-hero-copy">
        <h1 id="workspace-hero-heading">Kasir praktis.<br />Usaha terkendali.</h1>
        <p className="workspace-hero-description">BukaNota menghubungkan kasir, stok, dan laporan usaha. Biar operasional lebih rapi, Anda bisa fokus ke pelanggan.</p>
        <div className="workspace-hero-actions">
          <a className="button button-primary" href="https://bukanota.com/harga" target="_blank" rel="noopener noreferrer">Coba demo BukaNota<ArrowUpRight size={18} aria-hidden="true" /></a>
          <a className="workspace-feature-link" href="#produk">Kenali produknya<ArrowDown size={19} aria-hidden="true" /></a>
        </div>
      </div>
    </div>
  </section></Translate>;
}
