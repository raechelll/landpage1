"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Eye, LoaderCircle, Send } from "lucide-react";
import { Translate } from "@/components/SitePreferences";
import { CONTACT_EMAIL } from "@/lib/contact";
import styles from "@/app/contact/contact.module.css";

type Status = "idle" | "sending" | "sent" | "preview" | "invalid" | "unavailable" | "failed";
const messages: Partial<Record<Status, string>> = {
  sent: "Pesan Anda sudah diteruskan ke tim BukaNota. Kami akan membalas melalui email.",
  preview: "Pratinjau demo siap. Pesan ini belum dikirim.",
  invalid: "Periksa nama, alamat email, dan pesan Anda, lalu coba lagi.",
  unavailable: "Pengiriman email belum tersedia. Silakan hubungi kami melalui alamat email di halaman ini.",
  failed: "Pesan belum terkirim. Silakan coba lagi; isian Anda tetap tersimpan di formulir.",
};

export default function ContactForm({ demoMode }: { demoMode: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [preview, setPreview] = useState<{ name: string; email: string; business: string; message: string } | null>(null);
  const inFlight = useRef(false);
  const feedback = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (status !== "idle" && status !== "sending") feedback.current?.focus();
  }, [status]);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inFlight.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (name.length < 2 || message.length < 10) { setStatus("invalid"); return; }
    if (demoMode) {
      setPreview({ name, email, business: String(data.get("business") ?? "").trim(), message });
      setStatus("preview");
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (response.ok && result.ok === true && typeof result.id === "string") {
        setStatus("sent");
        form.reset();
      } else {
        setStatus(response.status === 400 ? "invalid" : response.status === 503 ? "unavailable" : "failed");
      }
    } catch {
      setStatus("failed");
    } finally {
      inFlight.current = false;
    }
  };

  return <Translate><form className={styles.form} action="/api/contact" method="post" onSubmit={submit} aria-busy={status === "sending"}>
    {demoMode ? <p className={styles.demo}>Mode demo. Pesan tidak dikirim.</p> : null}
    <label className={styles.field} htmlFor="contact-name">Nama lengkap<input id="contact-name" name="name" autoComplete="name" minLength={2} maxLength={100} required placeholder="Nama Anda" /></label>
    <label className={styles.field} htmlFor="contact-email">Alamat email<input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required placeholder="nama@perusahaan.com" /></label>
    <label className={styles.field} htmlFor="contact-business">Nama usaha (opsional)<input id="contact-business" name="business" autoComplete="organization" maxLength={150} placeholder="Nama usaha Anda" /></label>
    <label className={styles.field} htmlFor="contact-message">Pesan<textarea id="contact-message" name="message" rows={5} minLength={10} maxLength={5000} required placeholder="Ceritakan kebutuhan atau pertanyaan Anda…" /></label>
    <div className={styles.honeypot} aria-hidden="true"><label htmlFor="contact-website">Website<input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <button className={styles.submit} type="submit" disabled={status === "sending"}>
      {demoMode ? <Eye size={18} aria-hidden="true" /> : status === "sending" ? <LoaderCircle className={styles.spinner} size={18} aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
      {demoMode ? "Pratinjau pesan" : status === "sending" ? "Mengirim pesan…" : "Kirim pesan"}
    </button>
    {messages[status] ? <p ref={feedback} className={styles.status} role={status === "sent" || status === "preview" ? "status" : "alert"} tabIndex={-1}>{messages[status]}</p> : null}
    {demoMode && preview ? <section className={styles.preview} data-email-preview aria-labelledby="preview-heading">
      <h3 id="preview-heading">Pratinjau pesan</h3>
      <dl><div><dt>Kepada</dt><dd>{CONTACT_EMAIL}</dd></div><div><dt>Dari</dt><dd translate="no">{preview.name} ({preview.email})</dd></div><div><dt>Usaha</dt><dd translate="no">{preview.business || "—"}</dd></div></dl>
      <p translate="no">{preview.message}</p>
    </section> : null}
  </form></Translate>;
}
