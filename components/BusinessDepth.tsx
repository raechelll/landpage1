import Image from "next/image";
import "./business-depth.css";

const managementCapabilities = [
  {
    title: "Pengguna & grup akses",
    description: "Kelompokkan pengguna dan tentukan akses sesuai peran tim.",
  },
  {
    title: "Approval proses",
    description: "Atur persetujuan dalam alur kerja bisnis.",
  },
  {
    title: "Multi-outlet & back-office",
    description: "Kelola berbagai lokasi usaha melalui satu platform.",
  },
  {
    title: "Pengaturan perusahaan",
    description:
      "Perusahaan, penomoran transaksi, jam operasional, dan notifikasi.",
  },
  {
    title: "Report Designer",
    description: "Report template dan Report Designer sesuai kebutuhan bisnis.",
  },
];

export default function BusinessDepth() {
  return (
    <>
      <section
        className="depth-control"
        id="kontrol"
        aria-labelledby="depth-control-heading"
      >
        <div className="container">
          <div className="depth-control-heading">
            <h2 id="depth-control-heading">
              Tumbuh dengan kontrol
              <br /> yang tetap terjaga.
            </h2>

          </div>
          <div className="depth-control-layout">
            <figure className="depth-outlet-map">
              <a
                className="depth-company-shot"
                href="/images/product/outlet.jpg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Perbesar screenshot pemilihan perusahaan BukaNota"
              >
                <Image
                  src="/images/product/outlet.jpg"
                  alt="Screenshot asli halaman pemilihan perusahaan di BukaNota"
                  width={1919}
                  height={971}
                  sizes="(max-width: 700px) 94vw, 550px"
                />
              </a>
              <figcaption>
                Tampilan asli pemilihan perusahaan BukaNota
              </figcaption>
            </figure>
            <dl className="depth-control-capabilities">
              {managementCapabilities.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="depth-company-credit">
            BukaNota dikembangkan oleh{" "}
            <strong>PT Mega Homan Indonesia.</strong>
          </p>
        </div>
      </section>
    </>
  );
}
