# BukaNota ERP — public website

Next.js App Router, bahasa Indonesia, putih/navy/biru, font lokal Manrope dan DM Sans. Perubahan hanya mencakup public website; tanpa akses database/API/dashboard internal.

## Menjalankan

```sh
npm install
npm run dev
```

Produksi lokal: `npm run build` lalu `npm start` pada http://localhost:3000.

## Pengembangan dengan Docker

Jalankan Docker Desktop dengan Linux containers/WSL 2, lalu dari direktori project:

```sh
docker compose up --build -d
```

Buka http://localhost:3317. Source project dihubungkan ke container; dependency Linux dan cache Next.js disimpan dalam named volume terpisah. Lihat log dengan `docker compose logs -f web`, hentikan layanan dengan `docker compose stop`, dan jalankan kembali dengan `docker compose up -d`.

Pada Windows, bind mount dari drive `C:` dapat menunda atau tidak meneruskan perubahan file ke Fast Refresh. Untuk development harian, simpan project di filesystem Linux WSL atau evaluasi Docker Desktop synchronized file shares. Polling tidak diaktifkan karena dapat menambah penggunaan CPU/I/O dan latensi.

## Halaman dan navigasi

- Beranda: hero, diagram ERP, delapan tab fitur, enam kelompok modul, solusi industri, POS, keuangan, operasional, kontrol perusahaan, empat FAQ, dan CTA/footer.
- `/fitur/{penjualan,pembelian,stok,produksi,keuangan,pos,tim,kontrol}`: delapan detail modul statis. Tombol kembali menuju `/#fitur-{id}`; kemampuan nyata, alur singkat, serta screenshot asli atau diagram berlabel ilustrasi.
- `/produk/{retail-fnb,logistik,akuntansi,absensi}` dan tiga `/solusi/*` tetap tersedia. Logistik memakai screenshot detail stok asli dan lima kemampuan spesifik. Tombol Jelajahi pengelolaan menuju `#capabilities`, paket menuju halaman harga resmi, dan Kembali ke produk menuju `/#produk`.
- Baris Pilihan produk di bawah kategori dihapus. Menu produk tersedia di header. Simulasi dan seluruh tautannya tidak dimuat; implementasi lama tersimpan sebagai berkas tidak terpakai.

## Animasi

Header putih solid. Sorotan ERP bergerak setiap 1,65 detik; garis berhenti di luar tepi ikon dan hanya terisi pada jalur yang sudah dilewati. Mobile memakai alur vertikal.

Tab fitur berganti setiap 3,8 detik; industri setiap 3,2 detik. Strip tab bergeser horizontal, tanpa menggeser halaman vertikal. Tidak ada tombol jeda di antarmuka. Gerakan tetap berjalan saat hover. Fokus keyboard, tab browser tersembunyi, area di luar viewport, dan prefers-reduced-motion juga menghentikan pergantian. Setelah pilihan manual, interval dimulai ulang. Section menggunakan entrance fade/16px selama 550ms sekali saat terlihat.

## Sumber dan batas konten

Konten memakai brief pengguna dan sumber resmi bukanota.com. Katalog yang dikonfirmasi pengguna mencakup ERP, POS, inventory/produksi, finance, HR, proyek, membership, approval dan Report Designer. Tidak ada klaim GPS/tracking, pembayaran produksi, atau pencatatan otomatis yang ditambahkan.

Screenshot di `public/images/product/` merupakan aset aplikasi resmi: kasir, stok, promo, produksi, BOM, opname, pemilihan perusahaan dan pembayaran. Screenshot promo dijelaskan sebagai pengaturan promo; pemilihan perusahaan tidak disebut laporan. Modul tanpa screenshot memakai ilustrasi alur berlabel. Foto usaha adalah ilustrasi konteks, bukan bukti pelanggan.

Nama perusahaan PT Meta Digital Informasi mengikuti sumber resmi. Tidak ada angka adopsi, logo klien, testimoni, alamat, nomor WhatsApp atau integrasi merek yang direka. Tautan kontak/harga mengarah ke halaman resmi; tujuan Masuk mengikuti URL lama `pos.bukanota.com/login` yang dapat dialihkan oleh situs resmi.

## SEO

Halaman dirender sebagai HTML statis dengan judul, description, canonical, Open Graph/Twitter, favicon dan preview 1200x630. Domain mengikuti NEXT_PUBLIC_SITE_URL atau environment Vercel; lokal memakai localhost. Lihat `.env.example` lalu rebuild bila domain berubah.

## Validasi revisi

Build dan TypeScript lulus. Browser diperiksa pada lebar 320, 390, 768, 1159 dan 1440 px: geometri garis, delapan tautan detail, empat FAQ, tanpa kontrol jeda atau overflow. Autoplay fitur/industri berjalan tanpa memindahkan scroll vertikal. Delapan halaman modul diperiksa beserta navigasi kembali; tujuh route produk/solusi lama tetap merespons 200. Tidak ditemukan error browser/resource pada pemeriksaan revisi. Tidak ada skor Lighthouse yang diklaim.


Alur ERP adalah visual otomatis, bukan tombol: klik tidak memilih proses. Titik bergerak dan halo proses aktif memperjelas pergerakan tanpa kontrol tambahan. Tab fitur tetap dapat dipilih manual; transisi geser/fade 420ms dan garis progres 3,8 detik memperlihatkan pergantian. Baris cakupan Penjualan/Persediaan/Keuangan di CTA dihapus.


## Showcase keuangan

Section #keuangan menggunakan headline “Dari transaksi ke laporan keuangan yang lebih jelas.” Tiga blok kemampuan menjelaskan arus dana, pembukuan, dan laporan. Visual empat tahap menghubungkan transaksi operasional, pembukuan, struktur laba rugi/neraca, dan informasi bisnis. Karena screenshot finance asli belum tersedia, visual diberi label ilustrasi alur; tanpa nilai transaksi atau angka laporan rekaan. Reveal singkat memakai GSAP, cleanup dan reduced-motion; blok memiliki hover ringan tanpa menyerupai tombol. Pengujian pada enam lebar 320–1440px memverifikasi urutan baru, tiga kemampuan, empat tahap, SSR tanpa JavaScript, navigasi detail/kembali, dan tidak ada overflow atau error resource.


## Mega menu Produk

Empat tile desktop 2x2, satu kolom pada mobile: ikon Lucide konsisten, satu kalimat deskripsi, tiga highlight dan arrow. Tile/link penuh memiliki hover/focus dengan perubahan background, border, shadow dan arrow. Footer Lihat semua produk menuju #produk. Keyboard mendukung Tab, panah, Home/End, serta Escape bertingkat dengan pengembalian fokus. Klik di luar menutup menu. Menu dapat digulir pada viewport pendek dan mendukung reduced motion. Pemeriksaan mencakup delapan lebar 320–1440px, empat tujuan produk, footer, keyboard, hover serta tiga viewport pendek. Kontras teks pendukung diperkuat untuk keterbacaan.
