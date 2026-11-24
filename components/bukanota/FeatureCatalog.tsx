"use client";

import { Translate } from "@/components/SitePreferences";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealOnScroll } from "@/lib/scroll-motion";
import { Check, X } from "lucide-react";
import { FEATURES } from "@/lib/product-content";
import { LANDING_MODULES, type LandingScreen } from "@/lib/landing-modules";
import { useAutoAdvance } from "../useAutoAdvance";
import styles from "./FeatureTabs.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const reportScreen: LandingScreen = {
  src: "/images/bukanota/dashboard.webp",
  width: 1400,
  height: 788,
  alt: "Dashboard BukaNota dengan catatan penjualan dan ringkasan usaha",
  caption: "Dashboard BukaNota: catatan penjualan dan ringkasan usaha",
  ratio: "1400 / 788",
};

type FeaturePhoto = LandingScreen & { photo: true };
const photo = (src: string, width: number, height: number, alt: string, caption: string): FeaturePhoto => ({
  src, width, height, alt, caption, ratio: "16 / 10", photo: true,
});
const featurePhotos: Record<string, FeaturePhoto> = {
  pembelian: photo("/images/retail.jpg", 1024, 1024, "Rak barang toko untuk ilustrasi pengadaan dan pembelian", "Ilustrasi pengadaan barang usaha"),
  "kas-bank": photo("/images/bukanota/profesi-akuntansi.webp", 1024, 683, "Pencatatan tagihan dan keuangan di meja kerja", "Ilustrasi pencatatan kas dan bank"),
  keuangan: photo("/images/bukanota/profil-akuntan-buka-nota.png", 1448, 1086, "Akuntan memeriksa nota dan pembukuan dengan laptop", "Ilustrasi pembukuan usaha"),
  aset: photo("/images/restaurant.webp", 1200, 800, "Peralatan dan perlengkapan pada tempat usaha restoran", "Ilustrasi aset dan perlengkapan usaha"),
  data: photo("/images/bukanota/profil-pemilik-buka-nota.png", 1448, 1086, "Pemilik usaha memeriksa nota dan data di laptop", "Ilustrasi pengelolaan nota dan data usaha"),
  project: photo("/images/bukanota/solusi-jasa.png", 1672, 941, "Pengelolaan pekerjaan dan informasi proyek melalui laptop", "Ilustrasi pengelolaan proyek"),
  member: photo("/images/bukanota/solusi-gym.png", 1672, 941, "Petugas melayani anggota dan memeriksa data keanggotaan", "Ilustrasi layanan dan keanggotaan pelanggan"),
  gym: photo("/images/gym.jpg", 900, 600, "Area gym dengan perlengkapan latihan", "Ilustrasi operasional gym"),
  tim: photo("/images/bukanota/pemilik-usaha.webp", 1536, 1024, "Aktivitas administrasi dan pengelolaan tim di tempat usaha", "Ilustrasi administrasi kehadiran"),
  kontrol: photo("/images/bukanota/ekosistem.webp", 1200, 900, "Perangkat kerja untuk mengelola aplikasi usaha", "Ilustrasi pengaturan dan akses usaha"),
};

const extraPresentations: Record<string, { title: string; flow: string[] }> = {
  "kas-bank": { title: "Arus kas usaha, lebih mudah ditelusuri.", flow: ["Penerimaan dana", "Pengeluaran usaha", "Rekonsiliasi"] },
  laporan: { title: "Baca kondisi usaha dari catatan yang jelas.", flow: ["Catatan transaksi", "Periode laporan", "Ringkasan usaha"] },
  aset: { title: "Aset usaha tercatat dan terpantau.", flow: ["Data aset", "Transaksi aset", "Penyusutan"] },
  data: { title: "Nota dan data penting, mudah ditemukan.", flow: ["Catat transaksi", "Simpan nota", "Temukan kembali"] },
  project: { title: "Pekerjaan dan biaya proyek lebih teratur.", flow: ["Pekerjaan", "Material & biaya", "Tagihan proyek"] },
  member: { title: "Kenali pelanggan dan kelola keanggotaannya.", flow: ["Data pelanggan", "Keanggotaan", "Poin pelanggan"] },
  gym: { title: "Operasional gym, dari member sampai transaksi.", flow: ["Member", "Layanan gym", "Transaksi"] },
  tim: { title: "Kehadiran tercatat. Administrasi lebih rapi.", flow: ["Kehadiran", "Pencatatan", "Administrasi"] },
};

export default function FeatureCatalog() {
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const resumeAutoplay = useRef(false);
  const [preview, setPreview] = useState<LandingScreen | null>(null);
  const [index, setIndex] = useState(0);
  const active = FEATURES[index];
  const autoplay = useAutoAdvance(
    root,
    () => setIndex((current) => (current + 1) % FEATURES.length),
    4500,
    index,
    { pauseOnHover: false },
  );

  const openPreview = (screen: LandingScreen) => {
    resumeAutoplay.current = autoplay.enabled;
    autoplay.pause();
    setPreview(screen);
  };
  const closePreview = () => {
    setPreview(null);
    if (resumeAutoplay.current) {
      resumeAutoplay.current = false;
      autoplay.toggle();
    }
  };

  useEffect(() => {
    if (preview && !dialog.current?.open) dialog.current?.showModal();
  }, [preview]);

  const select = (next: number) => {
    setIndex(next);
    if (location.hash.startsWith("#fitur-")) {
      history.replaceState(null, "", `#fitur-${FEATURES[next].id}`);
    }
  };

  useEffect(() => {
    const sync = (hash: string) => {
      const productFeatures: Record<string, string> = {
        "#produk-retail": "pos", "#produk-logistik": "stok", "#produk-akuntansi": "keuangan", "#produk-absensi": "tim",
      };
      const id = productFeatures[hash] ?? (hash.startsWith("#fitur-") ? hash.slice(7) : "");
      const next = FEATURES.findIndex((feature) => feature.id === id);
      if (next >= 0) setIndex(next);
    };
    const onHashChange = () => sync(location.hash);
    const onLink = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>("a");
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.origin === location.origin && url.pathname === location.pathname) sync(url.hash);
    };
    onHashChange();
    addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onLink);
    return () => {
      removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onLink);
    };
  }, []);

  useLayoutEffect(() => {
    const list = tabs.current;
    const pill = indicator.current;
    if (!list || !pill) return;
    const position = () => {
      const button = list.querySelector<HTMLButtonElement>('[aria-selected="true"]');
      if (!button) return;
      pill.style.width = `${button.offsetWidth}px`;
      pill.style.transform = `translateX(${button.offsetLeft}px)`;
      list.scrollTo({
        left: Math.max(0, button.offsetLeft - (list.clientWidth - button.offsetWidth) / 2),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    };
    position();
    const observer = new ResizeObserver(position);
    observer.observe(list);
    list.querySelectorAll("button").forEach((button) => observer.observe(button));
    const frame = requestAnimationFrame(() => { pill.dataset.ready = "true"; });
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [index]);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const panel = root.current?.querySelector<HTMLElement>('[data-active="true"]');
      const copy = panel?.querySelector<HTMLElement>("[data-feature-copy]");
      const visual = panel?.querySelector<HTMLElement>("[data-feature-visual]");
      if (copy) {
        const text = Array.from(copy.querySelectorAll<HTMLElement>("h3, p, [data-feature-highlights], li"));
        revealOnScroll(copy, text, { distance: 20, duration: .55, stagger: .07 });
      }
      if (visual) {
        const figure = visual.querySelector<HTMLElement>("figure");
        if (figure) revealOnScroll(visual, figure, { distance: 24, duration: .7 });
      }
    });
    return () => media.revert();
  }, { scope: root, dependencies: [index], revertOnUpdate: true });

  return (
    <Translate><div className={styles.catalog} ref={root} {...autoplay.interaction} data-cycling={autoplay.running}>
      {FEATURES.map((feature) => <span id={`fitur-${feature.id}`} className={styles.anchor} key={feature.id} aria-hidden="true" />)}
      <span id="produk-logistik" className={styles.anchor} aria-hidden="true" />
      <span id="produk-absensi" className={styles.anchor} aria-hidden="true" />
      <span id="produk-retail" className={styles.anchor} aria-hidden="true" />
      <span id="produk-akuntansi" className={styles.anchor} aria-hidden="true" />
      <span id="produk" className={styles.anchor} aria-hidden="true" />
      <span id="ekosistem" className={styles.anchor} aria-hidden="true" />
      <div className={styles.tabs} data-scroll-reveal ref={tabs} role="tablist" aria-label="Fitur Buka Nota" onKeyDown={(event) => {
        if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? FEATURES.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + FEATURES.length) % FEATURES.length;
        select(next);
        document.getElementById(`feature-tab-${FEATURES[next].id}`)?.focus({ preventScroll: true });
      }}>
        <span className={styles.indicator} ref={indicator} aria-hidden="true" />
        {FEATURES.map((feature, featureIndex) => <button key={feature.id} id={`feature-tab-${feature.id}`} type="button" role="tab" aria-controls="feature-panel" aria-selected={featureIndex === index} tabIndex={featureIndex === index ? 0 : -1} onClick={() => select(featureIndex)}>{feature.name}{featureIndex === index ? <span className={styles.progress} key={`${active.id}-${autoplay.running}`} aria-hidden="true" /> : null}</button>)}
      </div>
      <div id="feature-panel" className={styles.panelStack} role="tabpanel" aria-labelledby={`feature-tab-${active.id}`} tabIndex={0}>
        {FEATURES.map((feature, featureIndex) => {
          const module = LANDING_MODULES.find((item) => item.id === feature.id);
          const screen: LandingScreen | FeaturePhoto = (feature.id === "laporan" ? reportScreen : module?.screen) ?? featurePhotos[feature.id];
          const presentation = extraPresentations[feature.id] ?? module;
          return <div className={styles.panel} key={feature.id} data-feature-id={feature.id} data-active={index === featureIndex} aria-hidden={index !== featureIndex} inert={index !== featureIndex}>
            <div className={styles.copy} data-feature-copy>
              <h3>{presentation?.title ?? feature.name}</h3>
              <p>{feature.description}</p>
              <span className={styles.highlightsLabel} data-feature-highlights>Fitur utama</span>
              <ul>{feature.details.map((detail) => <li key={detail}><Check size={17} aria-hidden="true" /><span>{detail}</span></li>)}</ul>
            </div>
            <div className={styles.visual} data-feature-visual>
              <figure className={styles.screenshot}>
                <button type="button" className={`${styles.imageFrame} ${screen.crop ? styles.cropped : ""} ${"photo" in screen ? styles.photo : ""}`} style={{ aspectRatio: screen.ratio }} onClick={() => openPreview(screen)} aria-label={`Perbesar ${screen.caption}`}>
                  <Image src={screen.src} alt={screen.alt} fill unoptimized={!("photo" in screen)} loading={index === featureIndex ? "eager" : "lazy"} sizes="(max-width:740px) 92vw, 54vw" />
                </button>
              </figure>
            </div>
          </div>;
        })}
      </div>
      <dialog className={styles.previewDialog} ref={dialog} onClose={closePreview} aria-labelledby="image-preview-title" onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        {preview ? <>
          <div className={styles.previewHeader}><div><strong id="image-preview-title">{preview.caption}</strong><span>Geser gambar untuk melihat detail.</span></div><button type="button" aria-label="Tutup pratinjau gambar" onClick={() => dialog.current?.close()}><X size={22} aria-hidden="true" /></button></div>
          <div className={styles.previewScroll}><Image src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} unoptimized /></div>
        </> : null}
      </dialog>
    </div></Translate>
  );
}
