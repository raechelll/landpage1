export type LandingModuleId =
  | "penjualan"
  | "pembelian"
  | "stok"
  | "produksi"
  | "keuangan"
  | "pos"
  | "tim"
  | "kontrol";
export type LandingScreen = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  ratio: string;
  crop?: boolean;
};
export type LandingModule = {
  id: LandingModuleId;
  name: string;
  title: string;
  benefit: string;
  features: string[];
  flow: string[];
  href: string;
  action: string;
  screen?: LandingScreen;
};

// Public landing content: supplied product brief, plus genuine official assets.
// No sales-document, purchasing or finance screenshot is available in this project.
export const LANDING_MODULES: LandingModule[] = [
  {
    id: "penjualan",
    name: "Penjualan",
    title: "Dari penawaran hingga pelunasan.",
    benefit:
      "Ikuti dokumen dan transaksi penjualan pelanggan dalam satu rangkaian kerja.",
    features: [
      "Penawaran & sales order",
      "Pengiriman pesanan",
      "Faktur penjualan",
      "Retur & nota kredit",
      "Uang muka & pelunasan",
    ],
    flow: ["Penawaran", "Faktur", "Pelunasan"],
    href: "/fitur/penjualan",
    action: "Jelajahi penjualan",
    screen: {
      src: "/images/product/promosi.jpg",
      width: 1600,
      height: 2217,
      alt: "Tampilan asli pengaturan promosi penjualan BukaNota",
      caption: "Pengaturan promo penjualan",
      ratio: "1.7",
      crop: true,
    },
  },
  {
    id: "pembelian",
    name: "Pembelian",
    title: "Pengadaan lebih mudah dikendalikan.",
    benefit:
      "Siapkan kebutuhan barang dan ikuti pembelian dari pemasok hingga penerimaan.",
    features: [
      "Permintaan pembelian",
      "Purchase order",
      "Penerimaan barang",
      "Faktur & retur pembelian",
      "Uang muka pembelian",
    ],
    flow: ["Pesanan", "Penerimaan", "Faktur"],
    href: "/fitur/pembelian",
    action: "Jelajahi pembelian",
  },
  {
    id: "stok",
    name: "Inventory",
    title: "Ketahui pergerakan persediaan.",
    benefit:
      "Kenali barang yang tersedia, berpindah, dan perlu dicocokkan dengan stok fisik.",
    features: [
      "Mutasi masuk & keluar",
      "Transfer stok",
      "Stok opname",
      "Assembly",
      "Stok detail",
    ],
    flow: ["Barang masuk", "Persediaan", "Barang keluar"],
    href: "/fitur/stok",
    action: "Kenali pengelolaan persediaan",
    screen: {
      src: "/images/product/stok.jpg",
      width: 2560,
      height: 1256,
      alt: "Tampilan asli daftar persediaan dan stok BukaNota",
      caption: "Detail persediaan BukaNota",
      ratio: "2560 / 1256",
    },
  },
  {
    id: "produksi",
    name: "Produksi",
    title: "Dari bahan baku menjadi barang jadi.",
    benefit:
      "Susun formula, catat bahan yang digunakan, lalu terima hasil produksi.",
    features: [
      "Formula & kebutuhan bahan",
      "Surat perintah kerja",
      "Pemakaian bahan baku",
      "Penerimaan barang jadi",
      "Perakitan",
    ],
    flow: ["Bahan baku", "Produksi", "Barang jadi"],
    href: "/fitur/produksi",
    action: "Jelajahi produksi",
    screen: {
      src: "/images/product/produksi.jpg",
      width: 2560,
      height: 1240,
      alt: "Tampilan asli transaksi produksi BukaNota",
      caption: "Transaksi produksi BukaNota",
      ratio: "2560 / 1240",
    },
  },
  {
    id: "keuangan",
    name: "Keuangan",
    title: "Keuangan yang lebih terstruktur.",
    benefit:
      "Rapikan pencatatan untuk memahami arus dana dan posisi keuangan usaha.",
    features: [
      "Chart of accounts & jurnal",
      "Kas & bank",
      "Rekonsiliasi",
      "Transaksi aset",
      "Tutup buku & laporan",
    ],
    flow: ["Kas & bank", "Akuntansi", "Laporan"],
    href: "/fitur/keuangan",
    action: "Jelajahi keuangan",
  },
  {
    id: "pos",
    name: "POS & restoran",
    title: "Dari pesan sampai bayar. Lebih lancar.",
    benefit:
      "Catat pesanan, pisah atau gabung tagihan, dan terima berbagai cara bayar. Kasir lebih siap melayani.",
    features: [
      "Meja & reservasi",
      "Pesanan & printer dapur",
      "Pembayaran & split bill",
      "Promo & voucher",
      "Membership & salesman",
    ],
    flow: ["Pesanan", "Kasir", "Pembayaran"],
    href: "/fitur/pos",
    action: "Jelajahi POS & restoran",
    screen: {
      src: "/images/product/kasir.jpg",
      width: 2560,
      height: 1451,
      alt: "Tampilan asli kasir BukaNota dengan menu dan pesanan pelanggan",
      caption: "Kasir BukaNota",
      ratio: "2560 / 1451",
    },
  },
  {
    id: "tim",
    name: "Tim & proyek",
    title: "Pekerjaan tim punya konteks yang jelas.",
    benefit:
      "Kelola administrasi karyawan dan aktivitas proyek sesuai kebutuhan perusahaan.",
    features: [
      "Karyawan & jabatan",
      "Shift & hari kerja",
      "Struktur gaji & adjustment",
      "Material & biaya proyek",
      "Invoice & pelunasan proyek",
    ],
    flow: ["Karyawan", "Aktivitas proyek", "Administrasi"],
    href: "/fitur/tim",
    action: "Kenali pengelolaan tim",
  },
  {
    id: "kontrol",
    name: "Kontrol",
    title: "Tetapkan peran dan aturan kerja.",
    benefit:
      "Sesuaikan data acuan, akses pengguna, dan pengaturan operasional bisnis.",
    features: [
      "Data master & perusahaan",
      "Pengguna & grup akses",
      "Approval",
      "Penomoran & jam operasional",
      "Report template & designer",
    ],
    flow: ["Data master", "Hak akses", "Pengaturan"],
    href: "/fitur/kontrol",
    action: "Kenali pengelolaan perusahaan",
  },
];

export const LANDING_CATEGORIES = [
  {
    id: "keuangan" as const,
    name: "Keuangan & akuntansi",
    highlights: "Jurnal · Kas & bank · Aset",
    icon: "finance",
  },
  {
    id: "penjualan" as const,
    name: "Penjualan & pengadaan",
    highlights: "Pesanan · Faktur · Pemasok",
    icon: "sales",
  },
  {
    id: "stok" as const,
    name: "Inventory & produksi",
    highlights: "Stok · Bahan baku · Produksi",
    icon: "inventory",
  },
  {
    id: "pos" as const,
    name: "POS & restoran",
    highlights: "Meja · Pembayaran · Promo",
    icon: "pos",
  },
  {
    id: "tim" as const,
    name: "Tim & operasional",
    highlights: "Karyawan · Proyek · Member",
    icon: "people",
  },
  {
    id: "kontrol" as const,
    name: "Kontrol & pelaporan",
    highlights: "Akses · Approval · Laporan",
    icon: "control",
  },
];
