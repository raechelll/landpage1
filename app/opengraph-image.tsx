import { ImageResponse } from "next/og";

export const alt = "BukaNota — Checkout and business management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "85px",
          background: "#f3f7fc",
          color: "#18252f",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontWeight: 700,
            color: "#125da7",
            fontSize: 34,
            marginBottom: 45,
          }}
        >
          BukaNota
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 67,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          One application.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 67,
            fontWeight: 700,
            letterSpacing: -4,
          }}
        >
          A more organized business.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 25,
            marginTop: 32,
            color: "#64717e",
          }}
        >
          Transactions, inventory, checkout, and business finances
        </div>
        <div style={{ display: "flex", fontSize: 20, marginTop: 25, color: "#64717e" }}>
          A product of PT Mega Homan Indonesia
        </div>
      </div>
    ),
    size,
  );
}
