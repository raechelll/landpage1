// Product information and contact details from the supplied Buka Nota export.
// The company name follows the user's current product brief.
export const COMPANY_NAME = "PT Mega Homan Indonesia";

export const FEATURE_CATEGORIES = [
  "Semua fitur",
  "Transaksi",
  "Stok & operasional",
  "Keuangan",
  "Tim & pelanggan",
] as const;

export type FeatureCategory = (typeof FEATURE_CATEGORIES)[number];

export const FEATURES = [
  {
    id: "laporan",
    name: "Laporan",
    category: "Keuangan",
    description: "Modul Laporan menyajikan ringkasan penjualan, pembelian, persediaan, dan keuangan dalam periode yang Anda pilih. Gunakan catatan ini untuk meninjau aktivitas usaha dan membantu pengambilan keputusan.",
    details: ["Penjualan & pembelian: rangkum aktivitas transaksi.", "Persediaan: tinjau catatan stok dan pergerakannya.", "Laba rugi & neraca: baca kondisi keuangan.", "Periode laporan: lihat catatan sesuai tanggal."],
  },
  {
    id: "penjualan",
    name: "Penjualan",
    category: "Transaksi",
    description: "Modul Penjualan membantu mengelola transaksi pelanggan dari penawaran dan pesanan hingga pengiriman, faktur, serta pembayaran. Status pesanan dan dokumen tagihan lebih mudah ditelusuri sampai pelunasan.",
    details: ["Penawaran hingga pengiriman: ikuti pesanan pelanggan.", "Faktur & tukar faktur: telusuri dokumen tagihan.", "Retur, nota kredit & debit: sesuaikan tagihan.", "Uang muka & pelunasan: pantau pembayaran."],
  },
  {
    id: "pembelian",
    name: "Pembelian",
    category: "Transaksi",
    description: "Modul Pembelian membantu mencatat pengadaan barang atau bahan dari pemasok. Telusuri permintaan, pesanan, penerimaan barang, dan tagihan agar kebutuhan usaha serta pembayaran pembelian lebih teratur.",
    details: ["Permintaan & pesanan: siapkan kebutuhan pembelian.", "Penerimaan: catat barang yang dikirim pemasok.", "Faktur & retur: kelola tagihan dan pengembalian.", "Uang muka & pembayaran: ikuti pelunasan pembelian."],
  },
  {
    id: "stok",
    name: "Persediaan",
    category: "Stok & operasional",
    description: "Modul Persediaan mencatat barang masuk, barang keluar, dan perpindahan stok antar lokasi. Tinjau ketersediaan barang serta cocokkan catatan dengan jumlah fisik melalui stok opname.",
    details: ["Detail stok: lihat barang yang tersedia per lokasi.", "Mutasi: telusuri barang masuk dan keluar.", "Transfer: catat perpindahan antar gudang atau outlet.", "Stok opname: cocokkan catatan dengan jumlah fisik."],
  },
  {
    id: "pos",
    name: "Kasir & resto",
    category: "Transaksi",
    description: "Modul Kasir & Resto membantu pelayanan pelanggan dari pencatatan pesanan hingga pembayaran. Kelola meja, pesanan dapur, tagihan, dan promo untuk mendukung kegiatan kasir toko maupun restoran.",
    details: ["Pesanan & meja: atur layanan pelanggan restoran.", "Dapur: kelola pesanan yang perlu disiapkan.", "Tagihan: pisahkan atau gabungkan pembayaran.", "Pembayaran & promo: catat transaksi di kasir."],
  },
  {
    id: "produksi",
    name: "Produksi",
    category: "Stok & operasional",
    description: "Modul Produksi membantu mencatat pengolahan bahan baku menjadi barang jadi. Susun formula dan perintah kerja, lalu rekam bahan yang digunakan serta hasil produksi yang diterima.",
    details: ["Formula: tentukan komponen dan kebutuhan bahan.", "Perintah kerja: catat pekerjaan produksi.", "Pemakaian bahan: rekam bahan yang digunakan.", "Hasil produksi: catat barang jadi dan perakitan."],
  },
  {
    id: "kas-bank",
    name: "Kas & bank",
    category: "Keuangan",
    description: "Modul Kas & Bank membantu menata uang masuk, uang keluar, dan perpindahan dana usaha. Setiap penerimaan serta pembayaran tercatat agar arus kas lebih mudah ditelusuri dan dicocokkan dengan mutasi bank.",
    details: ["Penerimaan: catat uang yang masuk ke usaha.", "Pengeluaran: rekam pembayaran dan biaya usaha.", "Transfer: catat perpindahan antar kas atau rekening.", "Rekonsiliasi: cocokkan pembukuan dengan mutasi bank."],
  },
  {
    id: "keuangan",
    name: "Akuntansi",
    category: "Keuangan",
    description: "Modul Akuntansi mengelompokkan transaksi ke dalam akun, jurnal, dan buku besar. Pembukuan yang teratur membantu Anda menelusuri pencatatan dan menyiapkan dasar laporan keuangan usaha.",
    details: ["Daftar akun: kelompokkan pencatatan keuangan.", "Jurnal: catat transaksi dan penyesuaiannya.", "Buku besar: telusuri transaksi pada setiap akun.", "Tutup buku: rapikan pencatatan akhir periode."],
  },
  {
    id: "aset",
    name: "Aset usaha",
    category: "Keuangan",
    description: "Modul Aset Usaha membantu mencatat aset tetap seperti peralatan dan kendaraan. Simpan rincian perolehan, transaksi aset, serta penyusutannya agar nilai aset dapat ditinjau dalam pembukuan.",
    details: ["Data aset: simpan rincian aset milik usaha.", "Transaksi aset: catat perolehan dan perubahan aset.", "Penyusutan: catat penurunan nilai aset per periode."],
  },
  {
    id: "data",
    name: "Nota & data usaha",
    category: "Transaksi",
    description: "Modul Nota & Data Usaha menata dokumen transaksi dan data acuan untuk kegiatan operasional. Kelola informasi produk, harga, pelanggan, pemasok, serta lokasi agar pencatatan lebih konsisten dan mudah ditemukan.",
    details: ["Nota: simpan informasi transaksi agar mudah dicari.", "Produk & harga: siapkan daftar barang dan jasa.", "Pelanggan & pemasok: kelola informasi kontak usaha.", "Lokasi & gudang: atur data tempat penyimpanan."],
  },
  {
    id: "project",
    name: "Proyek",
    category: "Stok & operasional",
    description: "Modul Proyek mengelompokkan pekerjaan, pemakaian material, biaya, dan tagihan berdasarkan proyek. Rincian aktivitas serta pembayaran lebih mudah ditinjau untuk setiap pekerjaan yang sedang dijalankan.",
    details: ["Data proyek: simpan rincian dan aktivitas pekerjaan.", "Material & biaya: catat kebutuhan setiap proyek.", "Tagihan & pelunasan: ikuti pembayaran pekerjaan."],
  },
  {
    id: "member",
    name: "Member & loyalitas",
    category: "Tim & pelanggan",
    description: "Modul Member & Loyalitas membantu mengelola data keanggotaan dan program poin pelanggan. Tinjau riwayat transaksi anggota untuk mendukung pelayanan serta pencatatan program loyalitas usaha.",
    details: ["Data member: simpan informasi anggota.", "Transaksi member: telusuri pembelian anggota.", "Poin pelanggan: kelola program loyalitas usaha."],
  },
  {
    id: "gym",
    name: "Gym",
    category: "Tim & pelanggan",
    description: "Modul Gym membantu mencatat layanan, penjualan paket, dan transaksi anggota dalam kegiatan harian. Hubungkan pencatatan layanan dengan data member agar aktivitas usaha gym lebih teratur.",
    details: ["Layanan gym: catat layanan yang disediakan.", "Paket & produk: kelola pencatatan penjualannya.", "Member: hubungkan layanan dengan data anggota.", "Aktivitas gym: tinjau transaksi dan kegiatan usaha."],
  },
  {
    id: "tim",
    name: "Absensi",
    category: "Tim & pelanggan",
    description: "Modul Absensi menyimpan catatan kehadiran karyawan atau member. Tinjau riwayat hadir sebagai bahan administrasi agar pencatatan aktivitas tim dan anggota lebih mudah diikuti.",
    details: ["Kehadiran: rekam siapa yang hadir.", "Riwayat hadir: tinjau catatan kehadiran sebelumnya.", "Administrasi: gunakan catatan untuk kebutuhan tim."],
  },
  {
    id: "kontrol",
    name: "Hak akses & pengaturan",
    category: "Tim & pelanggan",
    description: "Modul Hak Akses & Pengaturan membantu membagi akses menu sesuai peran pengguna. Atur akun tim, persetujuan pekerjaan, dan data usaha agar operasional mengikuti tanggung jawab masing-masing.",
    details: ["Pengguna: kelola akun anggota tim.", "Hak akses: batasi menu sesuai tanggung jawab.", "Persetujuan: atur alur approval pekerjaan.", "Pengaturan usaha: sesuaikan data dan aturan operasional."],
  },
] as const;

export const FAQS = [
  {
    question: "Apa itu Buka Nota?",
    answer: "BukaNota adalah produk dari PT Mega Homan Indonesia yang bertujuan membantu pelaku usaha mengelola operasional bisnis dengan lebih mudah dan teratur. Fitur-fiturnya mencakup pencatatan penjualan dan pembelian, pengelolaan nota dan persediaan, serta pemantauan keuangan. BukaNota juga menyediakan POS untuk restoran yang membantu mencatat pesanan, mengelola meja, dan memproses pembayaran di kasir dalam satu sistem.",
  },
  {
    question: "Apa bedanya Buka Nota dan Buka Nota POS?",
    answer: "Buka Nota membantu pengelolaan usaha secara menyeluruh, seperti nota, pembelian, stok, dan pembukuan. Buka Nota POS berfokus pada pelayanan di kasir: mencatat pesanan, menerima pembayaran, dan memantau penjualan harian. Tim kami dapat membantu memilih penggunaan yang sesuai dengan usaha Anda.",
  },
  {
    question: "Buka Nota cocok untuk usaha apa saja?",
    answer: "Buka Nota dapat digunakan untuk retail, restoran dan kafe, bisnis jasa, gym, serta usaha dengan kebutuhan pengadaan dan pergudangan. Pilih fitur berdasarkan alur kerja usaha Anda.",
  },
  {
    question: "Apakah semua fitur harus digunakan sekaligus?",
    answer: "Mulai dari kebutuhan utama usaha Anda, misalnya kasir, pencatatan penjualan, atau persediaan. Cakupan fitur dan paket yang sesuai dapat didiskusikan dengan tim Buka Nota sebelum mulai menggunakan aplikasi.",
  },
  {
    question: "Bagaimana cara mulai menggunakan Buka Nota?",
    answer: "Hubungi tim Buka Nota melalui formulir email di halaman kontak. Ceritakan jenis usaha, jumlah lokasi, dan alur kerja yang ingin dirapikan agar tim dapat membantu menjelaskan produk, fitur, serta pilihan paket yang sesuai.",
  },
] as const;
