export type ProductId = "retail" | "logistik" | "akuntansi" | "absensi";
export type ProductColor = "blue" | "orange" | "purple" | "green";

export type ProductCapability = {
  title: string;
  description: string;
};

export type Product = {
  id: ProductId;
  slug: string;
  name: string;
  description: string;
  menuDescription: string;
  color: ProductColor;
  headline: string;
  intro: string;
  diagramCaption: string;
  capabilities: readonly ProductCapability[];
  questions: readonly string[];
  sourceUrl: string;
  sourceLabel: string;
};

// POS and finance capabilities are supported by the official feature and
// pricing pages. Logistics and attendance stay within the supplied product
// brief; public materials do not establish GPS, payroll, or tracking features.
export const PRODUCTS: readonly Product[] = [
  {
    id: "retail",
    slug: "retail-fnb",
    name: "Retail & FnB",
    description:
      "Kasir, pesanan, dan persediaan untuk toko, kedai, dan restoran.",
    menuDescription: "Kasir, pesanan, dan stok",
    color: "blue",
    headline: "Kasir dan pesanan, lebih teratur.",
    intro:
      "BukaNota membantu toko, kedai, dan restoran mengelola penjualan, persediaan, serta hubungan dengan pelanggan.",
    diagramCaption: "Dari pesanan menjadi catatan transaksi.",
    capabilities: [
      {
        title: "Kasir & pembayaran",
        description: "Catat penjualan dengan beberapa metode pembayaran.",
      },
      {
        title: "Pesanan & tagihan",
        description: "Kelola pesanan dapur serta pisah atau gabung tagihan.",
      },
      {
        title: "Barang & bahan baku",
        description:
          "Pantau persediaan, lakukan opname, dan catat kebutuhan bahan.",
      },
      {
        title: "Promo & pelanggan",
        description: "Kelola diskon, keanggotaan, dan poin pelanggan.",
      },
    ],
    questions: [
      "Bagaimana alur pesanan dan pembayaran di usaha Anda?",
      "Barang atau bahan baku apa yang perlu dicatat?",
      "Berapa outlet dan anggota tim yang menggunakan aplikasi?",
    ],
    sourceUrl: "https://bukanota.com/",
    sourceLabel: "Lihat informasi fitur resmi",
  },
  {
    id: "logistik",
    slug: "logistik",
    name: "Logistik",
    description: "Kelola penerimaan barang, persediaan, transfer antar lokasi, dan stok opname.",
    menuDescription: "Persediaan dan pergerakan barang",
    color: "orange",
    headline: "Dari barang masuk, hingga stok berpindah.",
    intro: "Kelola pengadaan dan pergerakan barang dengan catatan yang terhubung. Ketahui persediaan per lokasi dan cocokkan dengan kondisi fisik.",
    diagramCaption: "Tampilan asli persediaan BukaNota.",
    capabilities: [
      { title: "Pembelian & penerimaan", description: "Catat pesanan ke pemasok dan barang yang diterima untuk kebutuhan persediaan usaha." },
      { title: "Detail persediaan", description: "Lihat catatan stok barang dan bahan baku berdasarkan lokasi penyimpanannya." },
      { title: "Transfer antar lokasi", description: "Catat perpindahan barang dari lokasi asal ke lokasi tujuan, termasuk antar gudang atau outlet." },
      { title: "Mutasi barang", description: "Telusuri pencatatan barang masuk dan keluar agar perubahan persediaan dapat dipahami." },
      { title: "Stok opname", description: "Hitung persediaan fisik lalu cocokkan dengan stok yang tercatat dalam sistem." },
    ],
    questions: [
      "Barang atau bahan apa yang perlu Anda pantau?",
      "Berapa lokasi penyimpanan atau outlet yang digunakan?",
      "Bagaimana alur penerimaan, perpindahan, dan penghitungan stok saat ini?",
    ],
    sourceUrl: "https://bukanota.com/contact",
    sourceLabel: "Diskusikan kebutuhan logistik",
  },
  {
    id: "akuntansi",
    slug: "akuntansi",
    name: "Akuntansi",
    description: "Kelola kas, utang piutang, dan laporan keuangan bisnis.",
    menuDescription: "Kas dan laporan keuangan",
    color: "purple",
    headline: "Keuangan bisnis, lebih mudah dipantau.",
    intro:
      "Rapikan pembukuan usaha, dari transaksi kas dan bank hingga laporan keuangan. BukaNota membantu Anda membaca kondisi bisnis melalui catatan yang teratur.",
    diagramCaption: "Pemasukan dan pengeluaran menjadi catatan keuangan.",
    capabilities: [
      {
        title: "Kas & bank",
        description: "Rapikan transaksi kas dan rekening bank.",
      },
      {
        title: "Utang & piutang",
        description: "Pantau kewajiban, tagihan, dan pencatatan pelunasannya.",
      },
      {
        title: "Jurnal & buku besar",
        description: "Susun pencatatan transaksi untuk pembukuan usaha.",
      },
      {
        title: "Biaya & aset",
        description: "Catat biaya, aset tetap, serta penyusutannya.",
      },
      {
        title: "Laporan keuangan",
        description: "Baca laporan laba rugi dan neraca bisnis.",
      },
    ],
    questions: [
      "Apa saja kas dan rekening yang perlu dicatat?",
      "Laporan keuangan apa yang Anda perlukan?",
      "Bagaimana alur utang dan piutang usaha Anda?",
    ],
    sourceUrl: "https://bukanota.com/harga",
    sourceLabel: "Lihat cakupan fitur keuangan",
  },
  {
    id: "absensi",
    slug: "absensi",
    name: "Absensi",
    description: "Catat kehadiran dan rapikan administrasi tim.",
    menuDescription: "Kehadiran dan administrasi tim",
    color: "green",
    headline: "Kehadiran tercatat. Administrasi lebih rapi.",
    intro:
      "Bantu pencatatan kehadiran tim sebagai bagian dari operasional usaha. Temukan solusi absensi yang sesuai dengan cara kerja bisnis Anda.",
    diagramCaption: "Catatan kehadiran sebagai bagian dari administrasi tim.",
    capabilities: [
      {
        title: "Pencatatan kehadiran",
        description:
          "Rapikan catatan hadir sebagai bagian dari administrasi tim.",
      },
    ],
    questions: [
      "Bagaimana tim mencatat kehadiran saat ini?",
      "Informasi kehadiran apa yang dibutuhkan usaha Anda?",
      "Bagaimana administrasi tim dikelola sehari-hari?",
    ],
    sourceUrl: "https://bukanota.com/contact",
    sourceLabel: "Diskusikan kebutuhan absensi",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function productHref(product: Pick<Product, "slug">): string {
  return `/produk/${product.slug}`;
}
