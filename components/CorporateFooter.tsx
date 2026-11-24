import Image from "next/image";
import "./corporate-footer.css";
const products = [
  ["ERP", "/#ekosistem"],
  ["POS & Restaurant", "/#fitur-pos"],
  ["Accounting", "/#fitur-keuangan"],
  ["Inventory", "/#fitur-stok"],
  ["Production", "/#fitur-produksi"],
  ["Project", "/#fitur-tim"],
  ["HR & Workforce", "/#fitur-tim"],
];
const solutions = [
  ["Restoran", "/#solusi-restoran"],
  ["Retail", "/#solusi-retail"],
  ["Kedai kopi", "/#solusi-kopi"],
  ["Gym", "/#solusi-gym"],
  ["Katering", "/#solusi-katering"],
  ["Bisnis proyek", "/#solusi-proyek"],
];
export default function CorporateFooter() {
  return (
    <footer className="corporate-footer" aria-label="Informasi BukaNota">
      <div className="container">
        <div className="corporate-footer-main">
          <div className="corporate-footer-identity">
            <a
              className="corporate-footer-brand"
              href="/#beranda"
              aria-label="BukaNota, kembali ke beranda"
            >
              <Image
                src="/bukanota-brand.png"
                alt="BukaNota"
                width={152}
        height={34}
              />
            </a>
            <p>
              ERP untuk operasional, persediaan, keuangan, dan pengelolaan
              perusahaan.
            </p>
            <span className="corporate-footer-company">
              PT Mega Homan Indonesia
            </span>
          </div>
          <nav className="corporate-footer-nav" aria-label="Produk">
            <h2>Produk</h2>
            {products.map(([name, href]) => (
              <a href={href} key={name}>
                {name}
              </a>
            ))}
          </nav>
          <nav className="corporate-footer-nav" aria-label="Solusi bisnis">
            <h2>Solusi bisnis</h2>
            {solutions.map(([name, href]) => (
              <a href={href} key={name}>
                {name}
              </a>
            ))}
          </nav>
          <nav
            className="corporate-footer-nav corporate-footer-contact"
            aria-label="Perusahaan dan resources"
          >
            <h2>Perusahaan & bantuan</h2>
            <a href="https://bukanota.com/">Tentang BukaNota</a>
            <a href="/contact">Hubungi sales</a>
            <a href="/contact">Bantuan penggunaan</a>
            <a href="/#faq">Pertanyaan umum</a>
            <a href="https://bukanota.com/harga">Harga & paket</a>
          </nav>
        </div>
        <div className="corporate-footer-bottom">
          <small>
            © {new Date().getFullYear()} BukaNota. Semua hak dilindungi.
          </small>
          <nav aria-label="Legal">
            <a href="https://bukanota.com/syarat-ketentuan">
              Syarat & ketentuan
            </a>
            <a href="https://bukanota.com/">bukanota.com</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
