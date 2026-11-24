import { Translate } from "@/components/SitePreferences";
import Image from "next/image";
import "./business-ribbon.css";

const businesses = [
  { name: "Restoran", image: "/images/hero-cafe.webp", alt: "Interior restoran dengan area makan dan kasir" },
  { name: "Usaha minuman", image: "/images/minuman.jpeg", alt: "Pilihan minuman untuk usaha kuliner" },
  { name: "Katering", image: "/images/katering.webp", alt: "Hidangan katering siap disajikan" },
  { name: "Salon & barbershop", image: "/images/salon.webp", alt: "Interior salon dan barbershop" },
  { name: "Retail & perdagangan", image: "/images/retail.jpg", alt: "Rak barang dagangan di toko retail" },
  { name: "Kedai kopi", image: "/images/kedai-kopi.webp", alt: "Kopi dengan latte art di meja kedai" },
  { name: "Gym & membership", image: "/images/gym.jpg", alt: "Area gym dengan perlengkapan kebugaran" },
];
const anchors = ["restoran", "kopi", "retail", "katering", "salon", "gym", "proyek", "multioutlet"];

export default function BusinessSolutions() {
  return <Translate><section id="solusi" className="business-ribbon" aria-labelledby="business-solutions-heading">
    {anchors.map(anchor => <span key={anchor} id={`solusi-${anchor}`} className="tour-anchor" aria-hidden="true" />)}
    <div className="container business-ribbon-layout" data-scroll-reveal>
      <h2 id="business-solutions-heading" data-scroll-item>Untuk berbagai<br />jenis usaha.</h2>
      <div className="business-ribbon-window" data-scroll-item tabIndex={0} role="region" aria-label="Jenis usaha BukaNota. Fokus keyboard di sini untuk menjeda gerakan.">
        <div className="business-ribbon-track">
          {[0, 1].map(copy => <div className="business-ribbon-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>
            {businesses.map(business => <figure className="business-ribbon-item" key={business.name}>
              <div className="business-ribbon-photo"><Image src={business.image} alt={copy === 0 ? business.alt : ""} fill sizes="(max-width:700px) 155px,190px" /></div>
              <figcaption>{business.name}</figcaption>
            </figure>)}
          </div>)}
        </div>
      </div>
    </div>
  </section></Translate>;
}
