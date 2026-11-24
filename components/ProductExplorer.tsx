"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Check } from "lucide-react";
import { LANDING_MODULES } from "@/lib/landing-modules";
import { PRODUCTS } from "@/lib/products";
import styles from "./ProductExplorer.module.css";
import { useAutoAdvance } from "./useAutoAdvance";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRODUCT_SUMMARIES: Record<string, { description: string; features: string[] }> = {
  retail: { description: "Kasir, pesanan, pelanggan, dan operasional restoran.", features: ["Kasir & Pembayaran", "Pesanan & Tagihan", "Barang & Bahan Baku", "Promo & Membership"] },
  logistik: { description: "Pengadaan, persediaan, dan pergerakan barang.", features: ["Pembelian & Penerimaan", "Mutasi Barang", "Transfer Stok", "Stok Opname"] },
  akuntansi: { description: "Pembukuan, kas dan bank, aset, serta laporan.", features: ["Jurnal & Akun", "Kas & Bank", "Aset", "Proses Tutup Buku"] },
  absensi: { description: "Pengelolaan karyawan dan administrasi kerja.", features: ["Data Karyawan", "Shift & Hari Kerja", "Struktur Gaji", "Dashboard Karyawan"] },
};

export default function ProductExplorer() {
  const catalog = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const heading = catalog.current?.querySelector("[data-product-heading]");
      if (heading) gsap.from(heading, {
        opacity: 0, y: 12, duration: 0.55, ease: "power2.out", clearProps: "opacity,transform",
        scrollTrigger: { trigger: heading, start: "top 90%", end: "bottom top", toggleActions: "restart none restart none" },
      });
      catalog.current?.querySelectorAll<HTMLElement>("[data-product-row]").forEach((row) => {
        const intro = row.querySelector("[data-product-intro]");
        const features = row.querySelectorAll("li");
        const checks = row.querySelectorAll<SVGPathElement>("li svg path");
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: { trigger: row, start: "top 88%", end: "bottom 8%", toggleActions: "restart none restart none" },
        });
        if (intro) timeline.from(intro, { opacity: 0, x: -24, duration: 0.6, clearProps: "opacity,transform" }, 0);
        timeline.from(features, { opacity: 0, x: 18, duration: 0.45, stagger: 0.12, clearProps: "opacity,transform" }, 0.15);
        checks.forEach((check, index) => {
          const length = check.getTotalLength();
          timeline.fromTo(check, { strokeDasharray: length, strokeDashoffset: length }, {
            strokeDashoffset: 0, duration: 0.35, ease: "power1.inOut", clearProps: "strokeDasharray,strokeDashoffset",
          }, 0.3 + index * 0.12);
        });
      });
    });
    return () => media.revert();
  }, { scope: catalog });
  const [index, setIndex] = useState(2);
  useEffect(() => {
    const sync = () => {
      if (!location.hash.startsWith("#fitur-")) return;
      const match = LANDING_MODULES.findIndex(
        (m) => m.id === location.hash.slice(7),
      );
      if (match >= 0) setIndex(match);
    };
    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);
  const select = (next: number) => {
    setIndex(next);
    if (location.hash.startsWith("#fitur-"))
      history.replaceState(null, "", `#fitur-${LANDING_MODULES[next].id}`);
  };
  return (
    <>
      <FeatureShowcase index={index} onSelect={select} onAdvance={setIndex} />
      <section
        className={styles.categories}
        id="produk"
        ref={catalog}
        aria-labelledby="tour-categories-heading"
      >
        <div className="container">
          <div className={styles.categoryHeading} data-product-heading>
            <h2 id="tour-categories-heading">Produk untuk kebutuhan bisnis Anda.</h2>
            <p>Kenali produk dan kemampuannya langsung di sini.</p>
          </div>
          <div className={styles.productGrid}>
            {PRODUCTS.map((product) => <article className={styles.productOverview} id={`produk-${product.id}`} key={product.id} data-product-row>
              <div className={styles.productIntro} data-product-intro>
                <h3>{product.name}</h3>
                <p>{PRODUCT_SUMMARIES[product.id].description}</p>
              </div>
              <ul className={styles.productFeatures} aria-label={`Fitur ${product.name}`}>
                {PRODUCT_SUMMARIES[product.id].features.map((feature) => <li key={feature}>
                  <Check size={17} strokeWidth={2} aria-hidden="true" /><span>{feature}</span>
                </li>)}
              </ul>
            </article>)}
          </div>
        </div>
      </section>
    </>
  );
}
export function FeatureShowcase({
  index,
  onSelect,
  onAdvance,
}: {
  index: number;
  onSelect: (index: number) => void;
  onAdvance: (index: number) => void;
}) {
  const active = LANDING_MODULES[index];
  const root = useRef<HTMLElement>(null);
  const autoplay = useAutoAdvance(root, () => onAdvance((index + 1) % LANDING_MODULES.length), 3800, index, { pauseOnHover: false });
  const selectManually = (next: number) => onSelect(next);
  const tabs = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const list = tabs.current,
      pill = indicator.current;
    if (!list || !pill) return;
    const position = () => {
      const button = list.querySelector<HTMLButtonElement>(
        '[aria-selected="true"]',
      );
      if (button) {
        pill.style.width = `${button.offsetWidth}px`;
        pill.style.transform = `translateX(${button.offsetLeft}px)`;
        // Move only the tab strip, never the document's vertical position.
        const left = Math.max(0, button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2);
        list.scrollTo({ left, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
      }
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(list);
    for (const button of list.querySelectorAll("button"))
      observer.observe(button);
    const frame = requestAnimationFrame(() => {
      pill.dataset.ready = "true";
    });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [index]);
  return (
    <section
      className={styles.explorer}
      ref={root}
      {...autoplay.interaction}
      data-cycling={autoplay.running}
      id="fitur"
      aria-labelledby="tour-feature-heading"
    >
      {LANDING_MODULES.map((m) => (
        <span
          className="tour-anchor"
          id={`fitur-${m.id}`}
          key={m.id}
          aria-hidden="true"
        />
      ))}
      <div className="container">
        <div className={styles.explorerHeading}>
          <h2 id="tour-feature-heading">Lihat apa yang bisa Anda kerjakan.</h2>
        </div>
        <div
          className={styles.tabs}
          ref={tabs}
          role="tablist"
          aria-label="Modul BukaNota"
          onKeyDown={(e) => {
            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key))
              return;
            e.preventDefault();
            const next =
              e.key === "Home"
                ? 0
                : e.key === "End"
                  ? LANDING_MODULES.length - 1
                  : (index +
                      (e.key === "ArrowRight" ? 1 : -1) +
                      LANDING_MODULES.length) %
                    LANDING_MODULES.length;
            selectManually(next);
            document
              .getElementById(`feature-tab-${LANDING_MODULES[next].id}`)
              ?.focus();
          }}
        >
          <span
            className={styles.indicator}
            ref={indicator}
            aria-hidden="true"
          >
            <span className={styles.progress} key={`${active.id}-${autoplay.running}`} />
          </span>
          {LANDING_MODULES.map((m, i) => (
            <button
              key={m.id}
              id={`feature-tab-${m.id}`}
              type="button"
              role="tab"
              aria-controls="feature-panel"
              aria-selected={index === i}
              tabIndex={index === i ? 0 : -1}
              onClick={() => selectManually(i)}
            >
              {m.name}
            </button>
          ))}
        </div>
        <div
          className={styles.panel}
          id="feature-panel"
          role="tabpanel"
          aria-labelledby={`feature-tab-${active.id}`}
          tabIndex={0}
        >
          <div className={styles.copyStack}>
            {LANDING_MODULES.map((module, moduleIndex) => (
              <div className={`${styles.copy} ${moduleIndex !== index ? styles.inactiveCopy : ""}`}
                key={module.id} aria-hidden={moduleIndex !== index} inert={moduleIndex !== index}>
                <h3>{module.id === "pos" ? <>Dari pesan sampai bayar.<br />Lebih lancar.</> : module.title}</h3>
                <p>{module.benefit}</p>
                <ul>{(module.id === "pos" ? ["Multi payment", "Split & join bill", "Captain order"] : module.features).map((feature) => <li key={feature}>{feature}</li>)}</ul>
              </div>
            ))}
          </div>
          <div
            className={styles.visual}
            data-feature-visual
            key={`visual-${active.id}`}
          >
            {active.screen ? (
              <figure className={styles.screenshot}>
                <a
                  className={`${styles.imageFrame}${active.screen.crop ? ` ${styles.cropped}` : ""}`}
                  href={active.screen.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Perbesar ${active.screen.caption}`}
                >
                  <Image
                    src={active.screen.src}
                    alt={active.screen.alt}
                    fill
                    sizes="(max-width:740px) 94vw,(max-width:1100px) 55vw,700px"
                  />
                </a>
                <figcaption>
                  <span>{active.screen.caption}</span>
                  <a
                    href={active.screen.src}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Perbesar
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </figcaption>
              </figure>
            ) : (
              <figure
                className={styles.moduleDiagram}
                aria-label={`Diagram alur ${active.name}`}
              >
                <span>{active.name}</span>
                <ol>
                  {active.flow.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ol>
                <figcaption>Ilustrasi alur modul</figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
