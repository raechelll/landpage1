"use client";

import { useEffect, useReducer, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Download,
  Minus,
  Package,
  Plus,
  ReceiptText,
  RotateCcw,
  Search,
  ShoppingBag,
  Wallet,
} from "lucide-react";
import {
  changeCart,
  completeSale,
  createDemoState,
  DEMO_PRODUCTS,
  formatRupiah,
  getAvailableStock,
  getCartTotals,
  type DemoSale,
  type DemoState,
} from "@/lib/simulation";
import "./business-simulation.css";

type Tab = "pos" | "stok" | "laporan";
type Workspace = {
  data: DemoState;
  receipt: DemoSale | null;
  error: string | null;
  announcement: string;
};
type Action =
  | { type: "cart"; id: string; delta: number }
  | { type: "checkout"; payment: DemoSale["payment"]; paid: number }
  | { type: "new-order" }
  | { type: "clear-error" }
  | { type: "reset" };

function initialWorkspace(): Workspace {
  return {
    data: createDemoState(),
    receipt: null,
    error: null,
    announcement: "Pilih menu untuk memulai pesanan.",
  };
}

function workspaceReducer(state: Workspace, action: Action): Workspace {
  switch (action.type) {
    case "cart": {
      const data = changeCart(state.data, action.id, action.delta);
      const name = DEMO_PRODUCTS.find(
        (product) => product.id === action.id,
      )?.name;
      return {
        ...state,
        data,
        receipt: null,
        error: null,
        announcement: `${name}: ${data.cart[action.id] || 0} di pesanan.`,
      };
    }
    case "checkout": {
      const result = completeSale(state.data, action.payment, action.paid);
      if (result.error) return { ...state, error: result.error };
      return {
        data: result.state,
        receipt: result.sale,
        error: null,
        announcement: `Transaksi ${result.sale?.id} selesai. Stok dan laporan sudah diperbarui.`,
      };
    }
    case "new-order":
      return {
        ...state,
        receipt: null,
        error: null,
        announcement: "Pilih menu untuk transaksi berikutnya.",
      };
    case "clear-error":
      return state.error ? { ...state, error: null } : state;
    case "reset":
      return {
        ...initialWorkspace(),
        announcement: "Simulasi diulang. Stok dan laporan kembali ke awal.",
      };
  }
}

const tabs = [
  { id: "pos" as const, label: "POS / Kasir", Icon: ReceiptText },
  { id: "stok" as const, label: "Stok", Icon: Package },
  { id: "laporan" as const, label: "Laporan", Icon: Wallet },
];
const categories = ["Semua", "Minuman", "Makanan"] as const;

function downloadReceipt(sale: DemoSale) {
  const lines = [
    "SIMULASI BUKANOTA - DATA CONTOH",
    "Kedai BukaNota",
    `Nota ${sale.id}`,
    "",
    ...sale.items.map(
      (item) =>
        `${item.quantity} x ${item.name} @ ${formatRupiah(item.price)} = ${formatRupiah(item.quantity * item.price)}`,
    ),
    "",
    `Total: ${formatRupiah(sale.total)}`,
    `Metode: ${sale.payment}`,
    `Dibayar: ${formatRupiah(sale.paid)}`,
    `Kembalian: ${formatRupiah(sale.change)}`,
    "",
    "Semua transaksi pada nota ini hanya untuk simulasi.",
  ];
  const url = URL.createObjectURL(
    new Blob([lines.join("\n")], { type: "text/plain;charset=utf-8" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `bukanota-${sale.id}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function BusinessSimulation() {
  const [workspace, dispatch] = useReducer(
    workspaceReducer,
    undefined,
    initialWorkspace,
  );
  const [tab, setTabState] = useState<Tab>("pos");
  const setTab = (next: Tab) => {
    setTabState(next);
    if (window.location.hash.startsWith("#simulasi"))
      window.history.replaceState(
        null,
        "",
        next === "pos" ? "#simulasi" : `#simulasi-${next}`,
      );
  };
  const [category, setCategory] =
    useState<(typeof categories)[number]>("Semua");
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState<DemoSale["payment"]>("Tunai");
  const [cash, setCash] = useState("");
  const receiptHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const selectFromHash = () => {
      const target = window.location.hash;
      if (target === "#simulasi-laporan") setTabState("laporan");
      else if (target === "#simulasi-stok") setTabState("stok");
      else if (target === "#simulasi") setTabState("pos");
    };
    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);
  const { data, receipt, error, announcement } = workspace;
  const totals = getCartTotals(data);
  const cartProducts = DEMO_PRODUCTS.filter(
    (product) => data.cart[product.id] > 0,
  );
  const filtered = DEMO_PRODUCTS.filter(
    (product) =>
      (category === "Semua" || product.category === category) &&
      product.name
        .toLocaleLowerCase("id-ID")
        .includes(query.trim().toLocaleLowerCase("id-ID")),
  );
  const revenue = data.sales.reduce((sum, sale) => sum + sale.total, 0);
  const costs = data.sales.reduce((sum, sale) => sum + sale.cost, 0);
  const paid = payment === "Non-tunai" ? totals.total : Number(cash);

  useEffect(() => {
    if (!receipt || !receiptHeading.current) return;
    receiptHeading.current?.focus({ preventScroll: true });
    receiptHeading.current?.scrollIntoView({
      block: "nearest",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, [receipt]);

  const reset = () => {
    dispatch({ type: "reset" });
    setTab("pos");
    setQuery("");
    setCategory("Semua");
    setCash("");
    setPayment("Tunai");
  };

  return (
    <section
      className="simulation-section"
      id="simulasi"
      aria-labelledby="simulation-heading"
    >
      <span className="tour-anchor" id="simulasi-laporan" aria-hidden="true" />
      <span className="tour-anchor" id="simulasi-stok" aria-hidden="true" />
      <div className="container">
        <div className="simulation-heading">
          <div>
            <span className="section-label">
              <span /> Simulasi interaktif
            </span>
            <h2 id="simulation-heading">
              Coba kasirnya.
              <br />
              Lihat alurnya bekerja.
            </h2>
          </div>
          <p>
            Pilih menu, selesaikan transaksi,
            <br className="desktop-break" /> lalu cek perubahan stok dan
            laporan.
          </p>
        </div>

        <div className="simulation-workspace">
          <div className="simulation-toolbar">
            <div className="simulation-business">
              <span className="simulation-business-mark" aria-hidden="true">
                BN
              </span>
              <div className="simulation-business-text">
                <strong>Kedai BukaNota</strong>
                <span>Simulasi interaktif · data contoh</span>
              </div>
            </div>
            <button type="button" className="simulation-reset" onClick={reset}>
              <RotateCcw size={15} aria-hidden="true" />
              <span>Ulangi simulasi</span>
            </button>
          </div>
          <div
            className="simulation-nav"
            role="tablist"
            aria-label="Bagian simulasi BukaNota"
            onKeyDown={(event) => {
              if (
                !["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)
              )
                return;
              event.preventDefault();
              const index = tabs.findIndex((item) => item.id === tab);
              const next =
                event.key === "Home"
                  ? 0
                  : event.key === "End"
                    ? tabs.length - 1
                    : (index +
                        (event.key === "ArrowRight" ? 1 : -1) +
                        tabs.length) %
                      tabs.length;
              setTab(tabs[next].id);
              document
                .getElementById(`simulation-tab-${tabs[next].id}`)
                ?.focus();
            }}
          >
            {tabs.map(({ id, label, Icon }) => (
              <button
                type="button"
                role="tab"
                id={`simulation-tab-${id}`}
                aria-selected={tab === id}
                aria-controls="simulation-panel"
                tabIndex={tab === id ? 0 : -1}
                key={id}
                onClick={() => setTab(id)}
              >
                <Icon size={17} aria-hidden="true" />
                {label}
                {id === "pos" && totals.quantity > 0 && (
                  <span className="simulation-tab-count">
                    {totals.quantity}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p
            className="simulation-sr-only"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {announcement}
          </p>
          <div
            className="simulation-panel"
            role="tabpanel"
            id="simulation-panel"
            aria-labelledby={`simulation-tab-${tab}`}
            tabIndex={0}
          >
            {tab === "pos" && (
              <div className="simulation-pos">
                <div className="simulation-catalogue">
                  <div className="simulation-catalogue-heading">
                    <h3>Menu jualan</h3>
                    <span>{DEMO_PRODUCTS.length} menu contoh</span>
                  </div>
                  <label className="simulation-search">
                    <Search size={17} aria-hidden="true" />
                    <span className="simulation-sr-only">
                      Cari menu simulasi
                    </span>
                    <input
                      type="search"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Cari menu..."
                    />
                  </label>
                  <div
                    className="simulation-categories"
                    role="group"
                    aria-label="Kategori menu"
                  >
                    {categories.map((item) => (
                      <button
                        type="button"
                        key={item}
                        aria-pressed={category === item}
                        onClick={() => setCategory(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="simulation-menu-grid">
                    {filtered.map((product) => {
                      const available = getAvailableStock(data, product.id);
                      const inCart = data.cart[product.id] || 0;
                      return (
                        <button
                          type="button"
                          className="simulation-menu-item"
                          key={product.id}
                          data-product={product.id}
                          disabled={inCart >= available}
                          aria-label={`Tambah ${product.name} ke pesanan`}
                          onClick={() =>
                            dispatch({ type: "cart", id: product.id, delta: 1 })
                          }
                        >
                          <span
                            className="simulation-item-swatch"
                            style={{ backgroundColor: product.swatch }}
                            aria-hidden="true"
                          >
                            <i
                              className={
                                product.category === "Minuman"
                                  ? "simulation-cup"
                                  : "simulation-plate"
                              }
                            />
                          </span>
                          <span className="simulation-item-name">
                            {product.name}
                          </span>
                          <span className="simulation-item-price">
                            {formatRupiah(product.price)}
                          </span>
                          <span className="simulation-item-stock">
                            {available === 0
                              ? "Stok habis"
                              : inCart >= available
                                ? "Semua di pesanan"
                                : `Stok ${available}`}
                          </span>
                          <span
                            className="simulation-item-add"
                            aria-hidden="true"
                          >
                            <Plus size={14} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {filtered.length === 0 && (
                    <p className="simulation-empty-results">
                      Menu belum ditemukan. Coba kata kunci lain atau pilih
                      kategori Semua.
                    </p>
                  )}
                </div>

                <aside
                  className="simulation-order"
                  aria-label={
                    receipt ? "Nota transaksi simulasi" : "Pesanan simulasi"
                  }
                >
                  {receipt ? (
                    <div className="simulation-receipt" key={receipt.id}>
                      <span
                        className="simulation-receipt-check"
                        aria-hidden="true"
                      >
                        <Check size={25} />
                      </span>
                      <h3 ref={receiptHeading} tabIndex={-1}>
                        Transaksi selesai.
                      </h3>
                      <p>Stok dan laporan ikut tercatat.</p>
                      <span className="simulation-receipt-number">
                        Nota {receipt.id} · {receipt.payment}
                      </span>
                      <ul className="simulation-receipt-lines">
                        {receipt.items.map((item) => (
                          <li key={item.id}>
                            <span>
                              {item.quantity} × {item.name}
                            </span>
                            <strong>
                              {formatRupiah(item.quantity * item.price)}
                            </strong>
                          </li>
                        ))}
                      </ul>
                      <dl className="simulation-receipt-totals">
                        <div>
                          <dt>Total</dt>
                          <dd>{formatRupiah(receipt.total)}</dd>
                        </div>
                        <div>
                          <dt>Dibayar</dt>
                          <dd>{formatRupiah(receipt.paid)}</dd>
                        </div>
                        <div>
                          <dt>Kembalian</dt>
                          <dd>{formatRupiah(receipt.change)}</dd>
                        </div>
                      </dl>
                      <div className="simulation-receipt-actions">
                        <button
                          type="button"
                          className="simulation-checkout"
                          onClick={() => setTab("stok")}
                        >
                          Lihat perubahan stok <ArrowRight size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => downloadReceipt(receipt)}
                        >
                          <Download size={14} />
                          Unduh nota contoh
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            dispatch({ type: "new-order" });
                            setCash("");
                          }}
                        >
                          Transaksi baru <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="simulation-order-heading">
                        <h3>Pesanan</h3>
                        <span>{totals.quantity} item</span>
                      </div>
                      {cartProducts.length === 0 ? (
                        <div className="simulation-empty-cart">
                          <ShoppingBag
                            size={29}
                            strokeWidth={1.4}
                            aria-hidden="true"
                          />
                          <p>Pesanan pertama Anda.</p>
                          <small>Pilih menu untuk mulai mencoba.</small>
                        </div>
                      ) : (
                        <ul className="simulation-cart-lines">
                          {cartProducts.map((product) => (
                            <li key={product.id}>
                              <div>
                                <strong>{product.name}</strong>
                                <span>
                                  {formatRupiah(product.price)} / item
                                </span>
                              </div>
                              <div className="simulation-quantity">
                                <button
                                  type="button"
                                  aria-label={`Kurangi ${product.name}`}
                                  onClick={() =>
                                    dispatch({
                                      type: "cart",
                                      id: product.id,
                                      delta: -1,
                                    })
                                  }
                                >
                                  <Minus size={13} />
                                </button>
                                <span key={data.cart[product.id]}>
                                  {data.cart[product.id]}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Tambah jumlah ${product.name}`}
                                  disabled={
                                    data.cart[product.id] >=
                                    getAvailableStock(data, product.id)
                                  }
                                  onClick={() =>
                                    dispatch({
                                      type: "cart",
                                      id: product.id,
                                      delta: 1,
                                    })
                                  }
                                >
                                  <Plus size={13} />
                                </button>
                              </div>
                              <strong className="simulation-line-total">
                                {formatRupiah(
                                  product.price * data.cart[product.id],
                                )}
                              </strong>
                            </li>
                          ))}
                        </ul>
                      )}
                      <dl className="simulation-order-summary">
                        <div className="simulation-grand-total">
                          <dt>Total pesanan</dt>
                          <dd>{formatRupiah(totals.total)}</dd>
                        </div>
                      </dl>
                      <div className="simulation-payment">
                        <span id="simulation-payment-label">
                          Metode pembayaran
                        </span>
                        <div
                          className="simulation-payment-method"
                          role="group"
                          aria-labelledby="simulation-payment-label"
                        >
                          {(["Tunai", "Non-tunai"] as const).map((method) => (
                            <button
                              type="button"
                              key={method}
                              aria-pressed={payment === method}
                              onClick={() => {
                                setPayment(method);
                                dispatch({ type: "clear-error" });
                              }}
                            >
                              {method}
                            </button>
                          ))}
                        </div>
                      </div>
                      {payment === "Tunai" && (
                        <div className="simulation-cash">
                          <div>
                            <label htmlFor="simulation-cash">
                              Uang diterima (Rp)
                            </label>
                            <button
                              type="button"
                              disabled={totals.quantity === 0}
                              onClick={() => {
                                setCash(String(totals.total));
                                dispatch({ type: "clear-error" });
                              }}
                            >
                              Uang pas
                            </button>
                          </div>
                          <input
                            id="simulation-cash"
                            type="text"
                            inputMode="numeric"
                            maxLength={12}
                            autoComplete="off"
                            value={cash}
                            onChange={(event) => {
                              setCash(
                                event.target.value.replace(/[^0-9]/g, ""),
                              );
                              dispatch({ type: "clear-error" });
                            }}
                            placeholder="Contoh: 50000"
                            aria-describedby={
                              error ? "simulation-payment-error" : undefined
                            }
                            aria-invalid={!!error}
                          />
                          <div className="simulation-change">
                            <span>Kembalian</span>
                            <strong>
                              {formatRupiah(Math.max(0, paid - totals.total))}
                            </strong>
                          </div>
                        </div>
                      )}
                      {error && (
                        <p
                          className="simulation-error"
                          id="simulation-payment-error"
                          role="alert"
                        >
                          {error}
                        </p>
                      )}
                      <button
                        type="button"
                        className="simulation-checkout"
                        disabled={totals.quantity === 0}
                        onClick={() =>
                          dispatch({ type: "checkout", payment, paid })
                        }
                      >
                        Selesaikan transaksi <ArrowRight size={16} />
                      </button>
                      <p className="simulation-checkout-note">
                        Semua transaksi hanya untuk simulasi.
                      </p>
                    </>
                  )}
                </aside>
              </div>
            )}

            {tab === "stok" && (
              <div className="simulation-stock">
                <div className="simulation-stock-header">
                  <div>
                    <h3>Persediaan menu</h3>
                    <p>Stok berkurang setelah transaksi selesai.</p>
                  </div>
                  <button type="button" onClick={() => setTab("laporan")}>
                    Lihat laporan <ArrowRight size={15} />
                  </button>
                </div>
                <div
                  className="simulation-table-scroll"
                  role="region"
                  aria-label="Tabel persediaan menu"
                  tabIndex={0}
                >
                  <table className="simulation-stock-list">
                    <caption className="simulation-sr-only">
                      Perubahan stok dari transaksi simulasi
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Menu</th>
                        <th scope="col">Stok awal</th>
                        <th scope="col">Terjual</th>
                        <th scope="col">Sisa stok</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DEMO_PRODUCTS.map((product) => {
                        const stock = getAvailableStock(data, product.id);
                        return (
                          <tr key={product.id}>
                            <th scope="row">
                              {product.name}
                              <span className="simulation-stock-status">
                                {stock === 0 ? "Stok habis" : "Tersedia"}
                              </span>
                            </th>
                            <td>{product.initialStock}</td>
                            <td>{product.initialStock - stock}</td>
                            <td>
                              <strong>{stock}</strong>
                              <span
                                className="simulation-stock-progress"
                                aria-hidden="true"
                              >
                                <span
                                  style={{
                                    width: `${(stock / product.initialStock) * 100}%`,
                                  }}
                                />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "laporan" && (
              <div className="simulation-report">
                <div className="simulation-stock-header">
                  <div>
                    <h3>Ringkasan penjualan</h3>
                    <p>Hasil dari transaksi yang Anda coba.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch({ type: "new-order" });
                      setCash("");
                      setTab("pos");
                    }}
                  >
                    Kembali ke POS <ArrowRight size={15} />
                  </button>
                </div>
                <div className="simulation-report-summary">
                  <div>
                    <span>Total penjualan</span>
                    <strong>{formatRupiah(revenue)}</strong>
                  </div>
                  <div>
                    <span>Transaksi selesai</span>
                    <strong>
                      {data.sales.length}
                      <small> transaksi</small>
                    </strong>
                  </div>
                  <div>
                    <span>Laba kotor contoh</span>
                    <strong>{formatRupiah(revenue - costs)}</strong>
                  </div>
                </div>
                {data.sales.length === 0 ? (
                  <div className="simulation-report-empty">
                    <ReceiptText
                      size={29}
                      strokeWidth={1.4}
                      aria-hidden="true"
                    />
                    <h4>Catatan pertama dimulai dari kasir.</h4>
                    <p>
                      Selesaikan transaksi POS untuk melihat laporan di sini.
                    </p>
                    <button type="button" onClick={() => setTab("pos")}>
                      Coba satu transaksi <ArrowRight size={15} />
                    </button>
                  </div>
                ) : (
                  <div
                    className="simulation-table-scroll"
                    role="region"
                    aria-label="Tabel riwayat transaksi"
                    tabIndex={0}
                  >
                    <table className="simulation-sales-list">
                      <caption className="simulation-sr-only">
                        Riwayat transaksi simulasi
                      </caption>
                      <thead>
                        <tr>
                          <th scope="col">Nota</th>
                          <th scope="col">Item</th>
                          <th scope="col">Pembayaran</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[...data.sales].reverse().map((sale) => (
                          <tr key={sale.id}>
                            <th scope="row">{sale.id}</th>
                            <td>
                              {sale.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0,
                              )}
                            </td>
                            <td>{sale.payment}</td>
                            <td>{formatRupiah(sale.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                <p className="simulation-report-explanation">
                  Laba kotor contoh dihitung dari penjualan dikurangi harga
                  pokok menu contoh.
                </p>
              </div>
            )}
          </div>
          <div className="simulation-footnote">
            <span>
              Data contoh untuk mengenali alur POS, stok, dan laporan.
            </span>
            <a href="/produk/retail-fnb">
              Kenali Retail & FnB <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
