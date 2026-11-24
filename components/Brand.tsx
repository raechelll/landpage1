import { Translate } from "@/components/SitePreferences";
import Image from "next/image";

export default function Brand({ href = "/#beranda" }: { href?: string }) {
  return (
    <Translate><a href={href} className="brand" data-brand aria-label="BukaNota, kembali ke beranda">
      <Image
        src="/bukanota-brand.png"
        alt="BukaNota"
        width={152}
        height={34}
        priority
      />
    </a></Translate>
  );
}
