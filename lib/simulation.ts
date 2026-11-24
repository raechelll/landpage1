export type DemoProduct = {
  id: string;
  name: string;
  category: "Minuman" | "Makanan";
  price: number;
  cost: number;
  initialStock: number;
  swatch: string;
};

export const DEMO_PRODUCTS: readonly DemoProduct[] = [
  {
    id: "kopi-susu",
    name: "Kopi susu",
    category: "Minuman",
    price: 25000,
    cost: 10000,
    initialStock: 12,
    swatch: "#e8d9c8",
  },
  {
    id: "americano",
    name: "Americano",
    category: "Minuman",
    price: 22000,
    cost: 8000,
    initialStock: 10,
    swatch: "#d4c4b5",
  },
  {
    id: "teh-lemon",
    name: "Teh lemon",
    category: "Minuman",
    price: 18000,
    cost: 6000,
    initialStock: 8,
    swatch: "#ece5c6",
  },
  {
    id: "nasi-ayam",
    name: "Nasi ayam",
    category: "Makanan",
    price: 35000,
    cost: 18000,
    initialStock: 6,
    swatch: "#e9d9c4",
  },
  {
    id: "roti-panggang",
    name: "Roti panggang",
    category: "Makanan",
    price: 20000,
    cost: 9000,
    initialStock: 8,
    swatch: "#ebd9bc",
  },
  {
    id: "kentang-goreng",
    name: "Kentang goreng",
    category: "Makanan",
    price: 22000,
    cost: 10000,
    initialStock: 5,
    swatch: "#eee2c4",
  },
];

export type CartRecord = Record<string, number>;

export type DemoSale = {
  id: string;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    cost: number;
  }[];
  payment: "Tunai" | "Non-tunai";
  subtotal: number;
  total: number;
  cost: number;
  paid: number;
  change: number;
};

export type DemoState = {
  cart: CartRecord;
  sales: DemoSale[];
};

export function createDemoState(): DemoState {
  return { cart: {}, sales: [] };
}

function findProduct(id: string): DemoProduct | undefined {
  return DEMO_PRODUCTS.find((product) => product.id === id);
}

export function getAvailableStock(state: DemoState, id: string): number {
  const product = findProduct(id);
  if (!product) return 0;

  const sold = state.sales.reduce(
    (saleQuantity, sale) =>
      saleQuantity +
      sale.items.reduce(
        (itemQuantity, item) =>
          itemQuantity + (item.id === id ? item.quantity : 0),
        0,
      ),
    0,
  );
  return Math.max(0, product.initialStock - sold);
}

export function getCartTotals(state: DemoState): {
  quantity: number;
  subtotal: number;
  total: number;
  cost: number;
} {
  const totals = { quantity: 0, subtotal: 0, total: 0, cost: 0 };
  for (const [id, quantity] of Object.entries(state.cart)) {
    const product = findProduct(id);
    if (!product || !Number.isSafeInteger(quantity) || quantity <= 0) continue;
    totals.quantity += quantity;
    totals.subtotal += product.price * quantity;
    totals.cost += product.cost * quantity;
  }
  totals.total = totals.subtotal;
  return totals;
}

export function changeCart(
  state: DemoState,
  id: string,
  delta: number,
): DemoState {
  if (!findProduct(id) || !Number.isSafeInteger(delta) || delta === 0)
    return state;

  const current = Object.hasOwn(state.cart, id) ? state.cart[id] : 0;
  const quantity = Math.min(
    getAvailableStock(state, id),
    Math.max(0, current + delta),
  );
  if (quantity === current) return state;

  const cart = { ...state.cart };
  if (quantity > 0) cart[id] = quantity;
  else delete cart[id];
  return { ...state, cart };
}

export function completeSale(
  state: DemoState,
  payment: DemoSale["payment"],
  paid: number,
): { state: DemoState; sale: DemoSale | null; error: string | null } {
  const fail = (error: string) => ({ state, sale: null, error });
  const cartEntries = Object.entries(state.cart);
  if (cartEntries.length === 0)
    return fail("Tambahkan produk ke pesanan terlebih dahulu.");

  const items: DemoSale["items"] = [];
  for (const [id, quantity] of cartEntries) {
    const product = findProduct(id);
    if (!product || !Number.isSafeInteger(quantity) || quantity <= 0) {
      return fail("Pesanan tidak valid. Silakan pilih ulang produknya.");
    }
    if (quantity > getAvailableStock(state, id)) {
      return fail(`Stok ${product.name} tidak mencukupi.`);
    }
    items.push({
      id,
      name: product.name,
      quantity,
      price: product.price,
      cost: product.cost,
    });
  }

  if (payment !== "Tunai" && payment !== "Non-tunai") {
    return fail("Pilih metode pembayaran terlebih dahulu.");
  }
  if (!Number.isSafeInteger(paid) || paid < 0) {
    return fail("Masukkan nominal pembayaran dalam rupiah yang valid.");
  }

  const { subtotal, total, cost } = getCartTotals(state);
  if (payment === "Tunai" && paid < total) {
    return fail("Uang diterima belum mencukupi total pesanan.");
  }
  if (payment === "Non-tunai" && paid !== total) {
    return fail("Nominal pembayaran non-tunai harus sesuai total pesanan.");
  }

  const sale: DemoSale = {
    id: `SIM-${String(state.sales.length + 1).padStart(3, "0")}`,
    items,
    payment,
    subtotal,
    total,
    cost,
    paid,
    change: payment === "Tunai" ? paid - total : 0,
  };
  return {
    state: { cart: {}, sales: [...state.sales, sale] },
    sale,
    error: null,
  };
}

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(amount: number): string {
  return rupiahFormatter.format(amount);
}
