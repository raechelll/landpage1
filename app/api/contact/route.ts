import { CONTACT_EMAIL } from "@/lib/contact";

export const runtime = "nodejs";
const emailPattern = /^[^\s<>@]+@[^\s<>@]+\.[^\s<>@]+$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== request.headers.get("host")) return Response.json({ error: "forbidden" }, { status: 403 });
    } catch { return Response.json({ error: "forbidden" }, { status: 403 }); }
  }
  if (!request.headers.get("content-type")?.includes("application/json")) return Response.json({ error: "invalid" }, { status: 400 });
  if (Number(request.headers.get("content-length")) > 30000) return Response.json({ error: "invalid" }, { status: 413 });

  let data: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 30000) return Response.json({ error: "invalid" }, { status: 413 });
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("invalid");
    data = parsed as Record<string, unknown>;
  } catch { return Response.json({ error: "invalid" }, { status: 400 }); }

  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const business = typeof data.business === "string" ? data.business.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (data.website || name.length < 2 || name.length > 100 || !emailPattern.test(email) || email.length > 254 || business.length > 150 || message.length < 10 || message.length > 5000) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !from) return Response.json({ error: "unavailable" }, { status: 503 });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: email,
        subject: "BukaNota — Pesan dari halaman kontak",
        text: `Nama: ${name}\nEmail: ${email}\nUsaha: ${business || "—"}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return Response.json({ error: "failed" }, { status: 502 });
    const result = await response.json();
    if (typeof result.id !== "string" || !result.id) return Response.json({ error: "failed" }, { status: 502 });
    return Response.json({ ok: true, id: result.id });
  } catch { return Response.json({ error: "failed" }, { status: 502 }); }
}
