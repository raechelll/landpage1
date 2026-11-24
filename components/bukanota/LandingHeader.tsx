"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { CONTACT_PATH } from "@/lib/contact";
import styles from "./Landing.module.css";

const links = [
  ["Tentang", "#tentang"],
  ["Produk", "#produk"],
  ["Fitur", "#fitur"],
  ["Solusi usaha", "#solusi"],
  ["FAQ", "#faq"],
] as const;

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className={styles.header} ref={root}>
      <div className={`${styles.container} ${styles.headerInner}`}>
        <a href="#beranda" className={styles.brand} aria-label="Buka Nota, beranda" onClick={() => setOpen(false)}>
          <Image src="/bukanota-brand.png" alt="Buka Nota" width={162} height={36} preload />
        </a>
        <nav id="landing-navigation" aria-label="Navigasi utama" className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`}>
          {links.map(([name, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{name}</a>
          ))}
          <a className={styles.mobileContact} href={CONTACT_PATH} onClick={() => setOpen(false)}>Hubungi kami</a>
        </nav>
        <a className={`${styles.button} ${styles.headerContact}`} href={CONTACT_PATH}>Hubungi kami</a>
        <button ref={toggle} type="button" className={styles.menuToggle} aria-label={open ? "Tutup menu" : "Buka menu"} aria-expanded={open} aria-controls="landing-navigation" onClick={() => setOpen(!open)}>
          {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}
