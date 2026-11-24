import Image from "next/image";
import { Translate } from "@/components/SitePreferences";
import styles from "./DeviceShowcase.module.css";

export default function DeviceShowcase() {
  return <Translate><section className={styles.section} id="perangkat" aria-label="Ilustrasi perangkat BukaNota">
    <div className={styles.container}>
      <div className={styles.stage} data-scroll-reveal>
        <figure className={styles.laptop} data-scroll-item>
          <div className={styles.laptopLid}>
            <span className={styles.camera} aria-hidden="true" />
            <div className={styles.laptopScreen}>
              <Image src="/images/bukanota/dashboard.webp" alt="Dashboard BukaNota dalam ilustrasi laptop" fill sizes="(max-width:700px) 45vw, 65vw" />
            </div>
          </div>
          <div className={styles.laptopBase} aria-hidden="true"><span /></div>
          <figcaption className={styles.srOnly}>Laptop</figcaption>
        </figure>

        <figure className={styles.tablet} data-scroll-item>
          <div className={styles.tabletBody}>
            <span className={styles.tabletCamera} aria-hidden="true" />
            <div className={styles.tabletScreen}>
              <Image src="/images/product/kasir.jpg" alt="Tampilan pesanan BukaNota dalam ilustrasi tablet" fill unoptimized sizes="(max-width:700px) 45vw, 30vw" />
            </div>
          </div>
          <figcaption className={styles.srOnly}>Tablet</figcaption>
        </figure>

        <figure className={styles.phone} data-scroll-item>
          <div className={styles.phoneBody}>
            <div className={styles.phoneScreen} aria-hidden="true">
              <span className={styles.phoneSpeaker} />
              <div className={styles.mobileBrand}><Image src="/bukanota-brand.png" alt="" width={80} height={18} /></div>
              <div className={styles.mobileContent}>
                <span className={styles.mobileGreeting}>Ringkasan usaha</span>
                <div className={styles.mobileMetric}><span>Penjualan</span><strong>Rp 2.450.000</strong><span className={styles.mobileTrend}>+12%</span></div>
                <div className={styles.mobileChart}>{[28, 47, 37, 65, 53, 82, 71, 100].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
                <div className={styles.mobileRow}><span>Transaksi</span><b>24</b></div>
                <div className={styles.mobileRow}><span>Produk</span><b>128</b></div>
                <div className={styles.mobileRow}><span>Stok tersedia</span><span className={styles.mobileStatus} /></div>
              </div>
              <span className={styles.phoneHome} />
            </div>
          </div>
          <figcaption className={styles.srOnly}>HP</figcaption>
        </figure>

        <figure className={styles.pos} data-scroll-item>
          <div className={styles.posHead}>
            <span className={styles.posLight} aria-hidden="true" />
            <div className={styles.posScreen}>
              <Image src="/images/product/kasir.jpg" alt="Tampilan kasir BukaNota pada ilustrasi perangkat POS" fill unoptimized sizes="(max-width:700px) 45vw, 30vw" />
            </div>
          </div>
          <div className={styles.posStand} aria-hidden="true" />
          <div className={styles.posBase} aria-hidden="true" />
          <figcaption className={styles.srOnly}>POS</figcaption>
        </figure>
      </div>

    </div>
  </section></Translate>;
}
