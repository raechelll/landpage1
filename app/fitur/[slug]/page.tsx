import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import CorporateFooter from "@/components/CorporateFooter";
import FloatingContact from "@/components/FloatingContact";
import { LANDING_MODULES, type LandingModuleId } from "@/lib/landing-modules";
import { siteUrl } from "@/lib/site";
import "../feature-pages.css";

type FeaturePageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return LANDING_MODULES.map(module => ({ slug: module.id }));
}
function findModule(slug: string) {
  return LANDING_MODULES.find(module => module.id === slug);
}
export async function generateMetadata({ params }: FeaturePageProps): Promise<Metadata> {
  const { slug } = await params;
  const module = findModule(slug);
  if (!module) notFound();
  const title = `${module.name} BukaNota — ${module.title.replace(/\.$/, "")}`;
  const url = new URL(`/fitur/${module.id}`, siteUrl);
  return {
    title,
    description: module.benefit,
    alternates: { canonical: url },
    openGraph: {
      title, description: module.benefit, url, siteName: "BukaNota", locale: "id_ID", type: "website",
      images: [{ url: new URL("/opengraph-image", siteUrl).href, width: 1200, height: 630, alt: "BukaNota ERP dan manajemen bisnis" }],
    },
    twitter: { card: "summary_large_image", title, description: module.benefit, images: [new URL("/opengraph-image", siteUrl).href] },
  };
}

const context: Record<LandingModuleId, { details: string[]; example: string }> = {
  penjualan: {
    details: [
      "Siapkan penawaran dan catat pesanan yang disepakati bersama pelanggan.",
      "Catat pengiriman barang berdasarkan pesanan pelanggan.",
      "Kelola dokumen penagihan untuk transaksi penjualan.",
      "Catat pengembalian barang dan penyesuaian tagihan melalui nota kredit.",
      "Catat pembayaran awal dan pelunasan untuk menata piutang pelanggan.",
    ],
    example: "Saat pelanggan memesan, mulai dari penawaran, lanjutkan pencatatan pesanan dan pengiriman, kemudian kelola faktur serta pelunasannya.",
  },
  pembelian: {
    details: [
      "Catat kebutuhan barang atau bahan yang perlu dipenuhi perusahaan.",
      "Susun pesanan pembelian untuk pemasok sesuai kebutuhan usaha.",
      "Catat barang yang diterima dari pemasok sebelum melanjutkan dokumen pembelian.",
      "Kelola tagihan pemasok serta catatan pengembalian pembelian.",
      "Catat pembayaran awal sebagai bagian dari transaksi pembelian.",
    ],
    example: "Ketika barang perlu ditambah, catat kebutuhannya, buat pesanan ke pemasok, lalu lanjutkan pencatatan penerimaan dan faktur pembelian.",
  },
  stok: {
    details: [
      "Catat penerimaan dan pengeluaran barang untuk membaca pergerakan persediaan.",
      "Kelola catatan perpindahan stok antar lokasi atau gudang.",
      "Cocokkan catatan persediaan dengan hasil pemeriksaan fisik barang.",
      "Catat perakitan barang sebagai bagian dari pengelolaan persediaan.",
      "Lihat rincian barang dan stok untuk membantu pekerjaan operasional.",
    ],
    example: "Saat mengisi stok sebuah lokasi, periksa persediaan, catat perpindahan barang, dan cocokkan jumlah fisik melalui stok opname.",
  },
  produksi: {
    details: [
      "Susun formula dan kebutuhan bahan sebagai acuan produksi.",
      "Catat pekerjaan produksi yang akan dijalankan melalui surat perintah kerja.",
      "Catat penggunaan bahan baku dalam pekerjaan produksi.",
      "Terima hasil produksi sebagai barang jadi dalam pencatatan persediaan.",
      "Kelola pencatatan komponen yang dirakit menjadi barang.",
    ],
    example: "Mulai dari formula produk, siapkan kebutuhan bahan, catat pemakaiannya, kemudian lanjutkan penerimaan barang jadi.",
  },
  keuangan: {
    details: [
      "Tata daftar akun dan catat transaksi pada jurnal pembukuan usaha.",
      "Kelola penerimaan, pengeluaran, serta perpindahan dana melalui kas dan bank.",
      "Cocokkan catatan keuangan melalui proses rekonsiliasi.",
      "Catat pembelian dan penjualan aset sebagai bagian dari pembukuan.",
      "Kelola proses tutup buku dan baca laporan seperti laba rugi serta neraca.",
    ],
    example: "Catat penerimaan dan pembayaran, cocokkan catatan melalui rekonsiliasi, lalu gunakan pembukuan sebagai dasar membaca kondisi keuangan.",
  },
  pos: {
    details: [
      "Atur meja serta pencatatan reservasi untuk pelayanan restoran.",
      "Catat pesanan dan teruskan kebutuhan cetak ke area dapur atau bar.",
      "Terima beberapa metode pembayaran serta pisah atau gabungkan tagihan pelanggan.",
      "Kelola diskon, promo barang, dan voucher sesuai pengaturan usaha.",
      "Kelola program member dan pengaturan salesman yang mendukung penjualan.",
    ],
    example: "Catat pesanan pelanggan, kelola pelayanan meja dan kebutuhan dapur, lalu selesaikan tagihan melalui pilihan pembayaran yang tersedia.",
  },
  tim: {
    details: [
      "Tata data karyawan dan jabatan sebagai acuan administrasi perusahaan.",
      "Kelola shift, hari kerja, dan jadwal pendukung pencatatan kehadiran.",
      "Atur komponen struktur gaji dan catatan penyesuaian administrasinya.",
      "Catat kebutuhan material serta biaya dalam pekerjaan berbasis proyek.",
      "Kelola dokumen tagihan dan pencatatan pembayaran pekerjaan proyek.",
    ],
    example: "Siapkan data tim dan jadwal kerjanya. Untuk pekerjaan proyek, catat kebutuhan material, biaya, tagihan, serta pelunasan dalam konteks proyek terkait.",
  },
  kontrol: {
    details: [
      "Tata data acuan dan informasi perusahaan yang digunakan dalam operasional.",
      "Kelompokkan pengguna dan tentukan akses sesuai peran kerja.",
      "Atur persetujuan yang mendukung alur kerja perusahaan.",
      "Sesuaikan penomoran transaksi dan jam operasional usaha.",
      "Kelola template laporan dan Report Designer sesuai kebutuhan penyajian informasi.",
    ],
    example: "Mulai dari data perusahaan, tentukan pengguna dan grup akses, lalu sesuaikan persetujuan serta pengaturan operasional dengan cara kerja tim.",
  },
};

export default async function FeaturePage({ params }: FeaturePageProps) {
  const { slug } = await params;
  const module = findModule(slug);
  if (!module) notFound();
  const copy = context[module.id];
  const back = `/#fitur-${module.id}`;
  return <>
    <a href="#module-main" className="skip-link">Lewati ke konten</a>
    <Header />
    <main className="module-page" id="module-main">
      <div className="container">
        <nav className="module-navigation" aria-label="Navigasi modul">
          <Link className="module-back" href={back}><ArrowLeft size={17} aria-hidden="true" />Kembali ke fitur</Link>
          <span>BukaNota / {module.name}</span>
        </nav>
        <section className="module-hero" aria-labelledby="module-title">
          <div><p className="module-name">{module.name}</p><h1 id="module-title">{module.title}</h1></div>
          <div className="module-summary"><p>{module.benefit}</p><a href="#kemampuan" className="module-text-link">Kenali pengelolaannya<ArrowRight size={17} aria-hidden="true" /></a></div>
        </section>
        {module.screen ? <figure className="module-screen">
          <a href={module.screen.src} target="_blank" rel="noopener noreferrer" className={`module-screen-frame${module.screen.crop ? " module-screen-crop" : ""}`} aria-label={`Perbesar ${module.screen.caption}`}>
            <Image src={module.screen.src} alt={module.screen.alt} width={2560} height={module.id === "pos" ? 1451 : module.id === "produksi" ? 1240 : module.id === "penjualan" ? 3547 : 1256} sizes="(max-width:740px) 94vw,1200px" preload />
          </a>
          <figcaption><span>{module.screen.caption}{module.screen.crop ? " — cuplikan tampilan asli" : " — tampilan asli aplikasi"}</span><a href={module.screen.src} target="_blank" rel="noopener noreferrer">Perbesar<ArrowUpRight size={14} aria-hidden="true" /></a></figcaption>
        </figure> : <figure className="module-flow-figure">
          <ol className="module-flow">{module.flow.map((step, i) => <li key={step}><span>{step}</span>{i < module.flow.length - 1 && <ArrowRight size={22} aria-hidden="true" />}</li>)}</ol>
          <figcaption>Ilustrasi alur pengelolaan {module.name.toLowerCase()}</figcaption>
        </figure>}
      </div>
      <section className="module-capabilities" id="kemampuan" aria-labelledby="module-capabilities-title">
        <div className="container module-capabilities-layout">
          <h2 id="module-capabilities-title">Yang bisa<br />Anda kelola.</h2>
          <dl>{module.features.map((feature, i) => <div key={feature}><dt>{feature}</dt><dd>{copy.details[i]}</dd></div>)}</dl>
        </div>
      </section>
      <section className="module-example" aria-labelledby="module-example-title">
        <div className="container module-example-layout">
          <div><h2 id="module-example-title">Dalam kegiatan<br />sehari-hari.</h2><p>{copy.example}</p></div>
          {module.screen ? <ol className="module-usage-flow">{module.flow.map((step, i) => <li key={step}><span>{i + 1}</span>{step}</li>)}</ol> : <Link className="module-text-link" href="/#ekosistem">Lihat hubungan antarmodul<ArrowRight size={17} aria-hidden="true" /></Link>}
        </div>
      </section>
      <div className="container module-endbar">
        <Link className="module-back" href={back}><ArrowLeft size={17} aria-hidden="true" />Kembali ke fitur</Link>
        <a href="/contact" className="button button-primary">Diskusikan kebutuhan<ArrowUpRight size={16} aria-hidden="true" /></a>
      </div>
    </main>
    <CorporateFooter />
    <FloatingContact />
  </>;
}
