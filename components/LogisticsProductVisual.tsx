import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import "./logistics-product.css";

export default function LogisticsProductVisual() {
  return (
    <figure className="logistics-product-visual">
      <div className="logistics-visual-title">
        <span>Persediaan, terlihat jelas.</span>
        <span>BukaNota Logistik</span>
      </div>
      <a className="logistics-visual-screen" href="/images/product/stok.jpg" target="_blank" rel="noopener noreferrer" aria-label="Perbesar tampilan asli detail persediaan BukaNota">
        <Image src="/images/product/stok.jpg" alt="Tampilan asli detail persediaan BukaNota dengan daftar barang, gudang, dan catatan stok" width={2560} height={1256} preload sizes="(max-width:700px) 94vw, (max-width:1100px) 54vw, 720px" />
      </a>
      <ol className="logistics-visual-flow" aria-label="Cakupan pengelolaan barang">
        <li>Penerimaan <ArrowRight size={13} aria-hidden="true" /></li>
        <li>Persediaan <ArrowRight size={13} aria-hidden="true" /></li>
        <li>Perpindahan</li>
      </ol>
      <figcaption>Tampilan asli modul persediaan <a href="/images/product/stok.jpg" target="_blank" rel="noopener noreferrer">Perbesar <ArrowUpRight size={13} aria-hidden="true" /></a></figcaption>
    </figure>
  );
}
