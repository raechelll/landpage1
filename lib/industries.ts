export type IndustrySolution = {
  slug: "restoran-kedai" | "retail" | "gym";
  name: string;
  title: string;
  description: string;
  headline: string;
  image: string;
  imageAlt: string;
  capabilities: readonly { title: string; description: string }[];
  relatedLabel: string;
  relatedHref: string;
};

// Product scope follows the official BukaNota feature/pricing pages and the
// product owner's supplied brief. These photos illustrate business settings;
// they are not customer endorsements or screenshots of the application.
export const INDUSTRY_SOLUTIONS: readonly IndustrySolution[] = [
  {
    slug: "restoran-kedai",
    name: "Restoran & Kedai Kopi",
    title: "BukaNota untuk Restoran & Kedai Kopi — POS dan Operasional",
    description:
      "Kelola kasir, pesanan, meja, reservasi, pembayaran, dan persediaan bahan baku restoran atau kedai kopi dengan BukaNota.",
    headline: "Dari pesanan pertama sampai kedai tutup.",
    image: "/images/hero-cafe.webp",
    imageAlt: "Ruang kedai kopi dengan meja dan area pelayanan",
    capabilities: [
      {
        title: "Pesanan & pelayanan",
        description:
          "Kelola transaksi kasir, meja, dan reservasi dalam kegiatan harian.",
      },
      {
        title: "Pembayaran & pelanggan",
        description:
          "Terima pembayaran, pisah atau gabung tagihan, dan kelola promo.",
      },
      {
        title: "Persediaan & bahan baku",
        description:
          "Catat stok, lakukan opname, dan kelola kebutuhan bahan sesuai menu.",
      },
    ],
    relatedLabel: "Kenali produk Retail & FnB",
    relatedHref: "/produk/retail-fnb",
  },
  {
    slug: "retail",
    name: "Retail & Perdagangan",
    title: "BukaNota untuk Retail & Perdagangan — Penjualan dan Stok",
    description:
      "Kelola penjualan, pembelian, pemasok, persediaan, dan keuangan usaha retail dalam ekosistem BukaNota.",
    headline: "Penjualan dan stok, terhubung dengan keuangan.",
    image: "/images/retail.jpg",
    imageAlt: "Rak dan barang dagangan di sebuah toko retail",
    capabilities: [
      {
        title: "Penjualan & pembayaran",
        description: "Catat transaksi penjualan serta pembayaran pelanggan.",
      },
      {
        title: "Pembelian & pemasok",
        description:
          "Kelola pembelian, data pemasok, dan kebutuhan barang usaha.",
      },
      {
        title: "Stok & keuangan",
        description:
          "Pantau persediaan, kas, dan laporan keuangan untuk memahami kondisi usaha.",
      },
    ],
    relatedLabel: "Kenali produk Retail & FnB",
    relatedHref: "/produk/retail-fnb",
  },
  {
    slug: "gym",
    name: "Gym & Membership",
    title: "BukaNota untuk Gym — Membership dan Kunjungan",
    description:
      "Kelola membership gym, referral, trial pass, locker, dan catatan kunjungan anggota dengan BukaNota.",
    headline: "Keanggotaan terkelola. Kunjungan tercatat.",
    image: "/images/gym.jpg",
    imageAlt: "Area latihan gym dengan peralatan kebugaran",
    capabilities: [
      {
        title: "Membership & kunjungan",
        description: "Kelola keanggotaan dan pencatatan kunjungan anggota gym.",
      },
      {
        title: "Referral & trial pass",
        description:
          "Kelola referral serta kesempatan mencoba untuk calon anggota.",
      },
      {
        title: "Locker & operasional",
        description:
          "Atur pencatatan locker sebagai bagian dari layanan kepada anggota.",
      },
    ],
    relatedLabel: "Jelajahi fitur BukaNota",
    relatedHref: "/#fitur-tim",
  },
];

export function getIndustryBySlug(slug: string) {
  return INDUSTRY_SOLUTIONS.find((industry) => industry.slug === slug);
}

export function industryHref(industry: Pick<IndustrySolution, "slug">) {
  return `/solusi/${industry.slug}`;
}
