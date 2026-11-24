"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ShoppingCart,
  Package,
  Factory,
  ReceiptText,
  Wallet,
  BookOpen,
  ChartNoAxesCombined,
} from "lucide-react";
import "./erp-integration.css";
import { useAutoAdvance } from "./useAutoAdvance";
gsap.registerPlugin(useGSAP, ScrollTrigger);
const nodes = [
  {
    id: "purchasing",
    name: "Pembelian",
    hint: "Pesanan pemasok",
    Icon: ShoppingCart,
    detail: "Catat pesanan dan penerimaan barang dari pemasok.",
  },
  {
    id: "inventory",
    name: "Persediaan",
    hint: "Barang & bahan",
    Icon: Package,
    detail: "Pantau barang, bahan baku, mutasi, dan hasil stok opname.",
  },
  {
    id: "production",
    name: "Produksi",
    hint: "Bahan menjadi produk",
    Icon: Factory,
    detail: "Kelola kebutuhan bahan serta pencatatan hasil produksi.",
  },
  {
    id: "sales",
    name: "Penjualan / POS",
    hint: "Pesanan pelanggan",
    Icon: ReceiptText,
    detail: "Catat penjualan, pesanan pelanggan, dan pembayaran.",
  },
  {
    id: "cash",
    name: "Kas & bank",
    hint: "Penerimaan & pembayaran",
    Icon: Wallet,
    detail: "Catat penerimaan dan pembayaran melalui kas serta bank usaha.",
  },
  {
    id: "accounting",
    name: "Akuntansi",
    hint: "Jurnal & buku besar",
    Icon: BookOpen,
    detail: "Susun pencatatan transaksi sebagai dasar pembukuan bisnis.",
  },
  {
    id: "reporting",
    name: "Laporan",
    hint: "Laba rugi & neraca",
    Icon: ChartNoAxesCombined,
    detail: "Baca kondisi bisnis melalui laporan keuangan yang tersedia.",
  },
];
function Connector({ twoWay = false }: { twoWay?: boolean }) {
  return (
    <span className="erp-network-link" data-two-way={twoWay} aria-hidden="true">
      <span className="erp-network-signal" />
      <span className="erp-travel-dot" />
    </span>
  );
}
export default function ERPIntegration() {
  const root = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState("purchasing");
  const activeIndex = nodes.findIndex(n => n.id === selected);
  const active = nodes[activeIndex];
  const autoplay = useAutoAdvance(root, () => {
    setSelected(current => nodes[(nodes.findIndex(n => n.id === current) + 1) % nodes.length].id);
  }, 1650, activeIndex, { pauseOnHover: false });
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            once: true,
          },
        });
        tl.from(".erp-network-node", {
          opacity: 0,
          y: 6,
          duration: 0.45,
          stagger: 0.055,
        }).from(
          ".erp-network-link",
          {
            opacity: 0,
            duration: 0.45,
            stagger: 0.035,
          },
          "-=0.2",
        );
      });
      return () => media.revert();
    },
    { scope: root },
  );
  const lane = (items: typeof nodes, finance = false) => (
    <ol className={`erp-network-lane${finance ? " erp-network-finance" : ""}`}>
      {items.map((node, index) => (
        <li key={node.id} data-current={selected === node.id} data-complete={nodes.indexOf(node) < activeIndex}>
          <div
            className="erp-network-node"
            data-active={selected === node.id}
          >
            <span className="erp-network-icon">
              <node.Icon size={23} strokeWidth={1.5} aria-hidden="true" />
            </span>
            <strong>{node.name}</strong>
            <small>{node.hint}</small>
          </div>
          {index < items.length - 1 && (
            <Connector twoWay={!finance && index === 1} />
          )}
        </li>
      ))}
    </ol>
  );
  return (
    <section
      id="ekosistem"
      className="erp-integration"
      ref={root}
      data-cycling={autoplay.running}
      data-cycle-start={activeIndex === 0}
      aria-labelledby="erp-integration-heading"
    >
      <div className="container">
        <div className="erp-network-intro">
          <h2 id="erp-integration-heading">
            Satu alur bisnis.
            <br />
            Semua saling terhubung.
          </h2>
          <p>Dari barang masuk hingga laporan keuangan.</p>
        </div>
        <div className="erp-network" aria-label="Hubungan modul ERP BukaNota">
          {lane(nodes.slice(0, 4))}
          <div className="erp-network-bridge">
            <span>Pencatatan transaksi</span>
          </div>
          {lane(nodes.slice(4), true)}
        </div>
        <div className="erp-network-footer">
          <p className="erp-network-detail" key={selected} aria-live={autoplay.enabled ? "off" : "polite"}>
            <strong>{active.name}.</strong> {active.detail}
          </p>
        </div>
      </div>
    </section>
  );
}
