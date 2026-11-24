import "./product-module-visual.css";

function RetailDiagram() {
  return (
    <>
      <div className="product-module-orders">
        {[0, 1, 2].map((row) => (
          <span className="product-module-order" key={row}>
            <i />
            <b />
          </span>
        ))}
      </div>
      <div className="product-module-handoff">
        <i />
        <i />
        <i />
        <b />
      </div>
      <div className="product-module-records">
        <span />
        <span />
        <span />
        <i />
      </div>
      <span className="product-module-caption product-module-caption-left">
        Transaksi
      </span>
      <span className="product-module-caption product-module-caption-right">
        Tercatat
      </span>
    </>
  );
}

function LogisticsDiagram() {
  return (
    <>
      <div className="product-module-route-line">
        <i />
        <i />
        <i />
      </div>
      <div className="product-module-route-node product-module-route-start">
        <i />
        <i />
      </div>
      <div className="product-module-route-node product-module-route-middle">
        <i />
      </div>
      <div className="product-module-route-node product-module-route-end">
        <i />
        <i />
      </div>
      <span className="product-module-route-traveler" />
      <span className="product-module-caption product-module-caption-left">
        Pesanan
      </span>
      <span className="product-module-caption product-module-caption-right">
        Pengiriman
      </span>
    </>
  );
}

function AccountingDiagram() {
  return (
    <>
      <div className="product-module-ledger">
        <div>
          <span>Masuk</span>
          <i />
          <i />
          <i />
        </div>
        <div>
          <span>Keluar</span>
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="product-module-ledger-rule">
        <i />
        <span>Catatan keuangan</span>
        <i />
      </div>
    </>
  );
}

function AttendanceDiagram() {
  return (
    <>
      <div className="product-module-attendance">
        {[0, 1, 2].map((row) => (
          <div className="product-module-attendance-row" key={row}>
            <span className="product-module-team-line">
              <i />
            </span>
            {[0, 1, 2, 3, 4].map((column) => (
              <span
                className={`product-module-attendance-cell ${(row + column) % 4 === 0 ? "product-module-cell-muted" : ""}`}
                key={column}
              >
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="product-module-caption product-module-caption-left">
        Tim
      </span>
      <span className="product-module-caption product-module-caption-right">
        Kehadiran
      </span>
    </>
  );
}

export default function ProductModuleVisual({ type }: { type: string }) {
  const diagram =
    type === "retail" ? (
      <RetailDiagram />
    ) : type === "logistik" ? (
      <LogisticsDiagram />
    ) : type === "akuntansi" ? (
      <AccountingDiagram />
    ) : (
      <AttendanceDiagram />
    );

  return (
    <div
      className={`product-module-visual product-module-${type}`}
      aria-hidden="true"
    >
      {diagram}
    </div>
  );
}
