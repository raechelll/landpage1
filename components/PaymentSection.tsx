import "./payment-section.css";

// Capabilities documented at https://bukanota.com/; no provider integration is implied.
const capabilities = [
  {
    title: "Beberapa cara, satu transaksi.",
    text: "Gunakan beberapa tipe pembayaran dalam transaksi yang sama.",
  },
  {
    title: "Tagihan bisa menyesuaikan.",
    text: "Pisahkan atau gabungkan tagihan sesuai kebutuhan pelanggan.",
  },
  {
    title: "Poin member ikut berarti.",
    text: "Pelanggan dapat menggunakan poin loyalitas untuk membayar.",
  },
];

export default function PaymentSection() {
  return (
    <section
      className="payment-section"
      id="pembayaran"
      aria-labelledby="payment-heading"
    >
      <div className="container payment-layout">
        <div className="payment-intro">
          <span className="payment-eyebrow">Pembayaran & tagihan</span>
          <h2 id="payment-heading">
            Pembayaran mengikuti cara pelanggan Anda.
          </h2>
          <div className="payment-note-composition" aria-hidden="true">
            <div className="payment-note payment-note-back">
              <span />
              <span />
              <span />
            </div>
            <div className="payment-note payment-note-front">
              <span className="payment-note-heading">Satu transaksi.</span>
              <span className="payment-note-row">
                <i />
                <b />
              </span>
              <span className="payment-note-row">
                <i />
                <b />
              </span>
              <span className="payment-note-row">
                <i />
                <b />
              </span>
              <span className="payment-note-total">Beberapa cara.</span>
            </div>
            <span className="payment-note-connector" />
            <span className="payment-note-seal">
              <i />
              <span>
                Tercatat
                <br />
                lebih rapi.
              </span>
            </span>
          </div>
        </div>
        <ul className="payment-capabilities">
          {capabilities.map(({ title, text }) => (
            <li key={title}>
              <span className="payment-capability-mark" aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
