"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowDownLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Coffee,
  CreditCard,
  Heart,
  Package,
  ReceiptText,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import "./feature-illustration.css";

function CashierStory() {
  return (
    <div
      className="feature-story feature-story-cashier"
      role="img"
      aria-label="Pesanan masuk, pembayaran, lalu transaksi tercatat. Tiga langkah dalam satu alur."
    >
      <div className="feature-story-kicker">DARI PESANAN, JADI CATATAN.</div>
      <div className="feature-story-flow">
        <span className="feature-story-flow-line" aria-hidden="true">
          <span />
        </span>
        <div className="feature-story-step feature-story-step-first">
          <span className="feature-story-step-icon">
            <ShoppingBag size={21} strokeWidth={1.6} />
          </span>
          <div>
            <small>MULAI DARI SINI</small>
            <strong>Pesanan masuk.</strong>
          </div>
          <span className="feature-story-step-number">01</span>
        </div>
        <div className="feature-story-step feature-story-step-second">
          <span className="feature-story-step-icon">
            <CreditCard size={21} strokeWidth={1.6} />
          </span>
          <div>
            <small>LANJUTKAN DENGAN</small>
            <strong>Pembayaran.</strong>
          </div>
          <span className="feature-story-step-number">02</span>
        </div>
        <div className="feature-story-step feature-story-step-third">
          <span className="feature-story-step-icon">
            <Check size={23} strokeWidth={1.9} />
          </span>
          <div>
            <small>DAN SEMUANYA</small>
            <strong>Tercatat rapi.</strong>
          </div>
          <span className="feature-story-step-number">03</span>
        </div>
      </div>
      <span className="feature-story-side-note">
        Satu alur.
        <br />
        Lebih teratur.
      </span>
    </div>
  );
}

function StockStory() {
  return (
    <div
      className="feature-story feature-story-stock"
      role="img"
      aria-label="Bahan baku, barang jual, dan persediaan. Semua punya tempat dalam pencatatan stok."
    >
      <div className="feature-story-kicker">KENALI ISI PERSEDIAAN.</div>
      <h4>
        Semua punya
        <br />
        <span>tempatnya.</span>
      </h4>
      <span className="feature-story-stock-spark" aria-hidden="true">
        <Sparkles size={24} strokeWidth={1.3} />
      </span>
      <div className="feature-story-shelf">
        <div className="feature-story-box feature-story-box-one">
          <span className="feature-story-box-tape" />
          <Coffee size={27} strokeWidth={1.4} />
          <span>
            Bahan
            <br />
            baku
          </span>
        </div>
        <div className="feature-story-box feature-story-box-two">
          <span className="feature-story-box-tape" />
          <ShoppingBag size={28} strokeWidth={1.4} />
          <span>
            Barang
            <br />
            jual
          </span>
        </div>
        <div className="feature-story-box feature-story-box-three">
          <span className="feature-story-box-tape" />
          <Package size={27} strokeWidth={1.4} />
          <span>Persediaan</span>
        </div>
      </div>
      <div className="feature-story-shelf-baseline">
        <span />
        <small>TERTATA, LEBIH MUDAH DIPANTAU.</small>
        <ArrowRight size={17} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function FinanceStory() {
  return (
    <div
      className="feature-story feature-story-finance"
      role="img"
      aria-label="Catat pemasukan dan pengeluaran agar kondisi keuangan lebih jelas."
    >
      <div className="feature-story-kicker">PAHAMI ARAH UANG USAHA.</div>
      <div className="feature-story-money-routes">
        <div className="feature-story-money-route feature-story-money-in">
          <span>
            <ArrowDownLeft size={19} strokeWidth={1.6} /> Pemasukan
          </span>
          <i />
          <b>
            <ArrowRight size={21} strokeWidth={1.5} />
          </b>
        </div>
        <div className="feature-story-money-route feature-story-money-out">
          <span>
            <ArrowUpRight size={19} strokeWidth={1.6} /> Pengeluaran
          </span>
          <i />
          <b>
            <ArrowRight size={21} strokeWidth={1.5} />
          </b>
        </div>
        <span className="feature-story-ledger">
          <ReceiptText size={37} strokeWidth={1.25} />
          <span>Tercatat.</span>
        </span>
      </div>
      <h4>
        Keuangan
        <br />
        <span>lebih jelas.</span>
      </h4>
      <span className="feature-story-finance-underline" aria-hidden="true" />
      <span className="feature-story-finance-caption">
        Catatan rapi. Langkah lebih pasti.
      </span>
    </div>
  );
}

function CustomerStory() {
  return (
    <div
      className="feature-story feature-story-customer"
      role="img"
      aria-label="Bangun loyalitas pelanggan. Datang, senang, lalu kembali."
    >
      <div className="feature-story-kicker">HUBUNGAN YANG TERUS TUMBUH.</div>
      <div className="feature-story-customer-type">
        <span>Datang.</span>
        <span>Senang.</span>
        <strong>Kembali.</strong>
      </div>
      <div className="feature-story-stamps" aria-hidden="true">
        <span className="feature-story-stamp feature-story-stamp-one">
          <Coffee size={24} strokeWidth={1.5} />
        </span>
        <span className="feature-story-stamp feature-story-stamp-two">
          <Heart size={24} strokeWidth={1.5} />
        </span>
        <span className="feature-story-stamp feature-story-stamp-three">
          <Sparkles size={24} strokeWidth={1.5} />
        </span>
      </div>
      <span className="feature-story-customer-note">
        Setiap kunjungan
        <br />
        <strong>punya arti.</strong>
        <ArrowDown size={21} strokeWidth={1.3} />
      </span>
      <div className="feature-story-customer-loop" aria-hidden="true">
        <span />
        <ArrowUpRight size={20} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default function FeatureIllustration({ type }: { type: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);

  const story =
    type === "kasir" ? (
      <CashierStory />
    ) : type === "stok" ? (
      <StockStory />
    ) : type === "keuangan" ? (
      <FinanceStory />
    ) : (
      <CustomerStory />
    );
  return (
    <div
      className="feature-animation"
      ref={root}
      data-animation-state={inView ? "playing" : "paused"}
    >
      {story}
    </div>
  );
}
