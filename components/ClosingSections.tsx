import "./closing.css";
import AnimatedFAQ from "./AnimatedFAQ";
import ClosingCTA from "./ClosingCTA";
import CorporateFooter from "./CorporateFooter";

const questions = [
  {
    question: "Apa itu BukaNota? Apakah hanya aplikasi kasir?",
    answer:
      "BukaNota adalah platform ERP untuk menghubungkan penjualan, pembelian, persediaan, produksi, keuangan, dan administrasi tim. POS merupakan salah satu modulnya.",
  },
  {
    question: "Untuk usaha apa dan bisa digunakan di banyak outlet?",
    answer:
      "BukaNota mendukung restoran, kedai kopi, retail, katering, salon, gym, dan bisnis berbasis proyek. Fitur multi-outlet membantu pengelolaan beberapa lokasi usaha.",
  },
  {
    question: "Bagaimana akses dan pekerjaan tim diatur?",
    answer:
      "Pengguna dan grup akses membagi kewenangan sesuai peran. Approval, pengaturan perusahaan, serta administrasi karyawan membantu menata pekerjaan tim.",
  },
  {
    question: "Bagaimana cara mulai menggunakan BukaNota?",
    answer:
      "Jelajahi modul yang sesuai kebutuhan usaha, lihat pilihan paket resmi, atau hubungi tim BukaNota untuk membahas alur bisnis Anda.",
  },
];

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function ClosingSections() {
  return (
    <>
      <section className="closing-faq" id="faq" aria-labelledby="faq-heading">
        <div className="container closing-faq-layout">
          <div className="closing-faq-intro">
            <h2 id="faq-heading">
              Pertanyaan yang
              <br />
              sering diajukan.
            </h2>
            <p>Jawaban singkat sebelum Anda mulai.</p>
            <a
              className="closing-text-link"
              href="https://bukanota.com/contact"
            >
              Ada pertanyaan lain? <ArrowIcon />
            </a>
          </div>
          <AnimatedFAQ questions={questions} />
        </div>
      </section>

      <ClosingCTA />

      <CorporateFooter />
    </>
  );
}
