import type { Metadata } from "next";
import { connection } from "next/server";
import Link from "next/link";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import { Translate } from "@/components/SitePreferences";
import ContactForm from "@/components/bukanota/ContactForm";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/contact";
import { COMPANY_NAME } from "@/lib/product-content";
import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "BukaNota",
  description: "Contact the BukaNota team. Tell us about your business and find the features that fit your needs.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  await connection();
  const demoMode = !process.env.RESEND_API_KEY?.trim() || !process.env.CONTACT_FROM_EMAIL?.trim();
  return <Translate>
    <a href="#contact-main" className="skip-link">Lewati ke konten</a>
    <Header />
    <main id="contact-main" className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <Link href="/" className={styles.back}><ArrowLeft size={17} aria-hidden="true" />Kembali ke beranda</Link>
          <h1>Mari mulai<br />percakapan.</h1>
          <p>Ceritakan kebutuhan usaha Anda. Tim BukaNota siap membantu menemukan fitur yang sesuai.</p>
          <div className={styles.contacts}>
            <a href={`mailto:${CONTACT_EMAIL}`}><Mail size={20} aria-hidden="true" /><span><small>Email</small>{CONTACT_EMAIL}</span></a>
            <a href={`tel:${CONTACT_PHONE}`}><Phone size={20} aria-hidden="true" /><span><small>Telepon</small>{CONTACT_PHONE}</span></a>
          </div>
          <span className={styles.company}>{COMPANY_NAME}</span>
        </div>
        <div className={styles.formPanel}>
          <h2>Kirim pesan</h2>
          <p>Balasan akan dikirim ke alamat email yang Anda isi.</p>
          <ContactForm demoMode={demoMode} />
        </div>
      </div>
    </main>
    <footer className={styles.footer}><span>© {new Date().getFullYear()} BukaNota</span><Link href="/#fitur">Jelajahi fitur</Link></footer>
  </Translate>;
}
