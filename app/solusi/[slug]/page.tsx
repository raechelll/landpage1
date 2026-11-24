import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import CorporateFooter from "@/components/CorporateFooter";
import FloatingContact from "@/components/FloatingContact";
import {
  getIndustryBySlug,
  INDUSTRY_SOLUTIONS,
  industryHref,
} from "@/lib/industries";
import { siteUrl } from "@/lib/site";
import "../industry-pages.css";

type IndustryPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_SOLUTIONS.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  const url = new URL(industryHref(industry), siteUrl);
  const image = {
    url: new URL("/opengraph-image", siteUrl).href,
    width: 1200,
    height: 630,
    alt: "BukaNota — Sistem manajemen bisnis untuk operasional dan keuangan",
  };

  return {
    title: industry.title,
    description: industry.description,
    alternates: { canonical: url },
    openGraph: {
      title: industry.title,
      description: industry.description,
      url,
      siteName: "BukaNota",
      locale: "id_ID",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.title,
      description: industry.description,
      images: [image],
    },
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return (
    <>
      <a href="#industry-main" className="skip-link">
        Lewati ke konten
      </a>
      <Header />
      <main className="industry-detail" id="industry-main">
        <div className="container">
          <nav
            className="industry-detail-breadcrumb"
            aria-label="Jejak navigasi"
          >
            <ol>
              <li>
                <Link href="/">Beranda</Link>
                <ChevronRight size={12} aria-hidden="true" />
              </li>
              <li>
                <Link href="/#solusi">Solusi bisnis</Link>
                <ChevronRight size={12} aria-hidden="true" />
              </li>
              <li aria-current="page">{industry.name}</li>
            </ol>
          </nav>

          <section
            className="industry-detail-hero"
            aria-labelledby="industry-detail-heading"
          >
            <div className="industry-detail-copy">
              <p className="industry-detail-name">{industry.name}</p>
              <h1 id="industry-detail-heading">{industry.headline}</h1>
              <p className="industry-detail-intro">{industry.description}</p>
              <div className="industry-detail-actions">
                <a
                  className="button button-primary"
                  href="/contact"
                >
                  Diskusikan kebutuhan{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
                <Link className="industry-detail-link" href="/#fitur">
                  Jelajahi fitur BukaNota
                </Link>
              </div>
            </div>
            <figure className="industry-detail-photo">
              <Image
                src={industry.image}
                alt={industry.imageAlt}
                fill
                priority
                sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1200px) 46vw, 580px"
              />
              <figcaption>
                Ilustrasi {industry.name.toLocaleLowerCase("id-ID")}
              </figcaption>
            </figure>
          </section>

          <section
            className="industry-detail-capabilities"
            aria-labelledby="industry-capabilities-heading"
          >
            <div className="industry-detail-section-heading">
              <h2 id="industry-capabilities-heading">
                Untuk pekerjaan sehari-hari.
              </h2>
              <p>
                Kenali bagian operasional yang dapat Anda kelola dengan
                BukaNota.
              </p>
            </div>
            <div className="industry-detail-usecases">
              {industry.capabilities.map((capability) => (
                <article key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className="industry-detail-next"
            aria-labelledby="industry-next-heading"
          >
            <div>
              <h2 id="industry-next-heading">
                Mulai dari cara kerja usaha Anda.
              </h2>
              <p>
                Ceritakan kebutuhan dan alur operasional Anda. Tim BukaNota
                membantu Anda mengenali fitur yang sesuai.
              </p>
            </div>
            <div className="industry-detail-next-links">
              <Link href={industry.relatedHref}>
                {industry.relatedLabel}
                <ChevronRight size={17} aria-hidden="true" />
              </Link>
              <a href="/contact">
                Hubungi tim BukaNota
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </section>
          <nav
            className="industry-detail-other"
            aria-label="Solusi bisnis lainnya"
          >
            {INDUSTRY_SOLUTIONS.filter(
              (item) => item.slug !== industry.slug,
            ).map((item) => (
              <Link href={industryHref(item)} key={item.slug}>
                {item.name} <ChevronRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </div>
      </main>
      <CorporateFooter />
      <FloatingContact />
    </>
  );
}
