"use client";

import { Translate, DisplayControls } from "@/components/SitePreferences";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Brand from "./Brand";
import { CONTACT_PATH } from "@/lib/contact";
import "./corporate-header.css";


export default function Header() {
  const pathname = usePathname();
  const home = (section: string) => `${pathname === "/" ? "" : "/"}#${section}`;
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overFinance, setOverFinance] = useState(false);
  const [overHero, setOverHero] = useState(pathname === "/");
  const mobileButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const finance = document.getElementById("keuangan");
    const hero = document.getElementById("beranda");
    let frame = 0;
    const syncScroll = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      const boundary = header.current?.getBoundingClientRect().bottom ?? 0;
      const section = finance?.getBoundingClientRect();
      setOverFinance(!!section && section.top <= boundary && section.bottom > boundary);
      const heroBounds = hero?.getBoundingClientRect();
      setOverHero(!!heroBounds && heroBounds.top <= boundary && heroBounds.bottom > boundary);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(syncScroll);
    };
    syncScroll();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    if (finance) observer.observe(finance);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setMobile(false);
    };
    const closeEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (mobile) {
        event.preventDefault();
        setMobile(false);
        mobileButton.current?.focus();
      }
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, [mobile]);

  useEffect(() => {
    const media = matchMedia("(max-width: 700px)");
    const reset = () => setMobile(false);
    media.addEventListener("change", reset);
    return () => media.removeEventListener("change", reset);
  }, []);

  return (
    <Translate><header
      ref={header}
      className={`site-header${scrolled ? " is-scrolled" : ""}${mobile ? " has-open-menu" : ""}${overFinance ? " is-over-finance" : ""}${overHero ? " is-over-hero" : ""}`}
    >
      <div className="container header-inner">
        <Brand />
        <nav
          id="primary-navigation"
          aria-label="Navigasi utama"
          className={mobile ? "navigation is-open" : "navigation"}
        >
          <a
            className="nav-link"
            href={home("solusi")}
            onClick={() => setMobile(false)}
          >
            Solusi bisnis
          </a>
          <a
            className="nav-link"
            href={home("fitur")}
            onClick={() => setMobile(false)}
          >
            Fitur
          </a>
          <a
            className="nav-link"
            href={home("faq")}
            onClick={() => setMobile(false)}
          >
            FAQ
          </a>
          <a
            className="nav-link"
            href={CONTACT_PATH}
            onClick={() => setMobile(false)}
          >
            Hubungi kami
          </a>
        </nav>
        <div className="header-actions">
          <DisplayControls />
          <a
            className="button button-primary button-small"
            href="https://bukanota.com/harga"
            target="_blank"
            rel="noopener noreferrer"
          >
            Coba sekarang <ArrowUpRight size={16} />
          </a>
        </div>
        <button
          ref={mobileButton}
          type="button"
          className="mobile-menu-button"
          onClick={() => {
            setMobile(!mobile);
          }}
          aria-label={mobile ? "Tutup menu" : "Buka menu"}
          aria-expanded={mobile}
          aria-controls="primary-navigation"
        >
          {mobile ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header></Translate>
  );
}
