import { Translate } from "@/components/SitePreferences";
import Image from "next/image";
import { Mail } from "lucide-react";
import Link from "next/link";
import { COMPANY_NAME } from "@/lib/product-content";
import { CONTACT_PATH, CONTACT_PHONE, CONTACT_EMAIL } from "@/lib/contact";
import Header from "../Header";
import StoryHero from "../StoryHero";
import BusinessSolutions from "../BusinessSolutions";
import FeatureCatalog from "./FeatureCatalog";
import BusinessProblems from "./BusinessProblems";
import ClosingPanel from "./ClosingPanel";
import ScrollExperience from "./ScrollExperience";
import FaqAccordion from "./FaqAccordion";
import DeviceShowcase from "./DeviceShowcase";
import styles from "./Landing.module.css";

const partners = [
  ["kopak-jaya-logo.svg", "Kopak Jaya Seafood"],
  ["noodslab-logo.svg", "Noods Lab Ramen"],
  ["rindu-sendja-logo.svg", "Rindu Sendja Bread & Cafe"],
  ["grind-now-logo.svg", "Grind Now Coffee Bar"],
  ["supermart-batam-logo.svg", "Supermart Batam"],
  ["muscle-lab-logo.svg", "Muscle Lab Fitness"],
] as const;

export default function ProductLanding() {
  return (
    <ScrollExperience><Translate>
      <a href="#main" className="skip-link">Lewati ke konten</a>
      <Header />
      <main id="main">
        <StoryHero />
        <BusinessSolutions />

        <div className={styles.page}>
        <section className={`${styles.section} ${styles.aboutSection}`} id="tentang" aria-labelledby="about-title">
          <div className={styles.container}>
            <BusinessProblems />
          </div>
        </section>

        <DeviceShowcase />

        <section className={`${styles.section} ${styles.featuresSection}`} id="fitur" aria-label="Fitur Buka Nota">
          <div className={styles.container}>
            <FeatureCatalog />
          </div>
        </section>

        <section className={styles.partners} id="mitra" aria-labelledby="partners-title">
          <div className={styles.container} data-scroll-reveal><h2 className={styles.partnersTitle} id="partners-title">Mitra Kami</h2></div>
          <div className={`${styles.container} ${styles.partnerWindow}`} data-scroll-reveal tabIndex={0} role="region" aria-label="Logo mitra Buka Nota. Fokus keyboard di sini untuk menjeda gerakan.">
            <div className={styles.partnerTrack}>
              {[0, 1].map((copy) => (
                <ul className={styles.partnerGroup} key={copy} aria-hidden={copy === 1 ? true : undefined}>
                  {partners.map(([file, name]) => <li key={file}><Image src={`/images/bukanota/partners/${file}`} alt={copy === 0 ? name : ""} width={168} height={72} /></li>)}
                </ul>
              ))}
            </div>
          </div>
        </section>

        </div>

        <div className={styles.page}>
        <section className={styles.section} id="faq" aria-labelledby="faq-title">
          <div className={`${styles.container} ${styles.faqGrid}`}>
            <div className={styles.faqIntro} data-scroll-reveal><span className={styles.sectionLabel} data-scroll-item>Pertanyaan umum</span><h2 id="faq-title" data-scroll-item>Masih ingin<br />tahu lebih banyak?</h2><Link data-scroll-item href={CONTACT_PATH} className={styles.inlineContact}><Mail size={19} aria-hidden="true" />Tanya tim Buka Nota</Link></div>
            <FaqAccordion />
          </div>
        </section>

        </div>
        <ClosingPanel />
      </main>

      <div className={styles.page}>
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerTop}`} data-scroll-reveal>
          <div className={styles.footerIdentity} data-scroll-item><a href="#beranda" data-brand aria-label="Buka Nota, kembali ke beranda"><Image src="/bukanota-brand.png" alt="Buka Nota" width={162} height={36} /></a><p>Catat transaksi. Simpan nota.<br />Pantau usaha dalam satu sistem.</p><span>Produk dari {COMPANY_NAME}</span></div>
          <nav aria-label="Jelajahi Buka Nota" data-scroll-item><h2>Jelajahi</h2><a href="#tentang">Tentang Buka Nota</a><a href="#fitur">Semua fitur</a><a href="#solusi">Solusi usaha</a></nav>
          <nav aria-label="Bantuan Buka Nota" data-scroll-item><h2>Mari terhubung</h2><a href="#faq">Pertanyaan umum</a><a href={`tel:${CONTACT_PHONE}`}>Telepon: {CONTACT_PHONE}</a><Link href={CONTACT_PATH}>{CONTACT_EMAIL}</Link><p>Diskusikan produk, fitur, dan<br />kebutuhan usaha Anda bersama tim kami.</p></nav>
        </div>
        <div className={`${styles.container} ${styles.footerBottom}`}><small>© {new Date().getFullYear()} Buka Nota. Semua hak dilindungi.</small><span>{COMPANY_NAME}</span></div>
      </footer>
      <Link className={styles.floatingContact} href={CONTACT_PATH} aria-label="Hubungi BukaNota melalui email"><Mail size={24} aria-hidden="true" /></Link>
      </div>
    </Translate></ScrollExperience>
  );
}
