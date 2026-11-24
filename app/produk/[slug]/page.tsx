import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import CorporateFooter from "@/components/CorporateFooter";
import FloatingContact from "@/components/FloatingContact";
import LogisticsProductVisual from "@/components/LogisticsProductVisual";
import ProductModuleVisual from "@/components/ProductModuleVisual";
import { getProductBySlug, PRODUCTS, productHref } from "@/lib/products";
import { siteUrl } from "@/lib/site";
import "../product-pages.css";

type ProductPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const title = `${product.name} BukaNota — ${product.headline.replace(/\.$/, "")}`;
  const url = new URL(productHref(product), siteUrl);
  const image = {
    url: new URL("/opengraph-image", siteUrl).href,
    width: 1200,
    height: 630,
    alt: "BukaNota — Sistem manajemen bisnis untuk operasional dan keuangan",
  };
  return {
    title,
    description: product.description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: product.description,
      url,
      siteName: "BukaNota",
      locale: "id_ID",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: product.description,
      images: [image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = PRODUCTS.filter((item) => item.id !== product.id);

  return (
    <>
      <a href="#product-main" className="skip-link">
        Lewati ke konten
      </a>
      <Header />
      <main
        className={`product-detail-page product-detail-page-${product.id}`}
        id="product-main"
      >
        <div className="pd-shell">
          <nav className="pd-breadcrumbs" aria-label="Jejak navigasi">
            <ol>
              <li>
                <Link href="/">Beranda</Link>
                <ChevronRight size={12} aria-hidden="true" />
              </li>
              <li>
                <Link href="/#produk">Produk</Link>
                <ChevronRight size={12} aria-hidden="true" />
              </li>
              <li>
                <span aria-current="page">{product.name}</span>
              </li>
            </ol>
          </nav>
          {product.id !== "akuntansi" && <Link href="/#produk" className="pd-back-link"><ArrowLeft size={15} aria-hidden="true" /> Kembali ke produk</Link>}
          <section className="pd-hero" aria-labelledby="product-heading">
            <div className="pd-hero-copy">
              <span className="pd-product-name">{product.name}</span>
              <h1 id="product-heading">{product.headline}</h1>
              <p>{product.intro}</p>
              <div className="pd-actions">
                <a
                  className="button button-primary"
                  href={product.id === "logistik" ? "#capabilities" : "/contact"}
                >
                  {product.id === "logistik" ? "Jelajahi pengelolaan" : "Diskusikan kebutuhan"} <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a
                  className="pd-text-link"
                  href="https://bukanota.com/harga"
                >
                  Lihat pilihan paket <ArrowRight size={16} />
                </a>
                {product.id === "retail" && (
                  <Link className="pd-text-link" href="/#fitur-pos">
                    Jelajahi fitur POS <ArrowRight size={16} />
                  </Link>
                )}
              </div>
            </div>
            {product.id === "akuntansi" ? null : product.id === "logistik" ? <LogisticsProductVisual /> : <figure className="pd-hero-visual">
              <div className="pd-visual-heading">
                <span>BukaNota</span>
                <span>{product.name}</span>
              </div>
              <div className="pd-module-canvas">
                <ProductModuleVisual type={product.id} />
              </div>
              <figcaption>{product.diagramCaption}</figcaption>
            </figure>}
          </section>
        </div>

        <section
          className="pd-capabilities"
          id="capabilities"
          aria-labelledby="capabilities-heading"
        >
          <div className="pd-shell pd-content-grid">
            <div className="pd-section-intro">
              <h2 id="capabilities-heading">
                Yang dapat
                <br /> Anda kelola.
              </h2>
              <p>{product.description}</p>
              <a
                className="pd-text-link"
                href={product.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.sourceLabel}
                <ArrowUpRight size={15} />
              </a>
            </div>
            <ul className="pd-capability-list">
              {product.capabilities.map((capability) => (
                <li key={capability.title}>
                  <span className="pd-capability-mark" aria-hidden="true" />
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="pd-preparation"
          aria-labelledby="preparation-heading"
        >
          <div className="pd-shell pd-content-grid">
            <div className="pd-section-intro">
              <h2 id="preparation-heading">
                Mulai dari kebutuhan
                <br /> usaha Anda.
              </h2>
              <p>
                Ceritakan alur kerja sehari-hari untuk membantu tim BukaNota
                mengenali kebutuhan bisnis Anda.
              </p>
            </div>
            <div className="pd-preparation-body">
              <p>Beberapa hal yang bisa Anda siapkan sebelum berdiskusi:</p>
              <ul>
                {product.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
              <a
                className="pd-text-link"
                href="/contact"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hubungi tim BukaNota <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="pd-related" aria-labelledby="related-heading">
          <div className="pd-shell">
            <div className="pd-related-heading">
              <h2 id="related-heading">
                Kenali produk
                <br /> BukaNota lainnya.
              </h2>
              <Link className="pd-text-link" href="/#produk">
                Lihat semua produk <ArrowRight size={16} />
              </Link>
            </div>
            <div className="pd-related-grid">
              {related.map((item) => (
                <Link
                  className="pd-related-product"
                  href={productHref(item)}
                  key={item.id}
                >
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <CorporateFooter />
      <FloatingContact />
    </>
  );
}
