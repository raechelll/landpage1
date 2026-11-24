import { Translate } from "@/components/SitePreferences";
import styles from "./BusinessProblems.module.css";

export default function BusinessProblems() {
  return <Translate><div className={styles.help} data-scroll-reveal>
    <h2 id="about-title" data-scroll-item>Butuh solusi?</h2>
    <p data-scroll-item>BukaNota adalah aplikasi manajemen usaha dari PT Mega Homan Indonesia. Kelola penjualan, pembelian, persediaan, kasir, dan keuangan untuk membantu operasional usaha lebih tertata dalam satu sistem.</p>
  </div></Translate>;
}
