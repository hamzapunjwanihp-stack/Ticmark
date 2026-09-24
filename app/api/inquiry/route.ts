import { NextResponse } from "next/server";
import { clean, EMAIL_RE, forwardToWebhook, PHONE_RE } from "@/lib/forward";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (clean(body.company)) return NextResponse.json({ ok: true, message: "Thank you." });

  const inquiry = {
    name: clean(body.name, 120),
    phone: clean(body.phone, 30),
    email: clean(body.email, 160),
    interestedIn: clean(body.interestedIn, 120),
    preferredArea: clean(body.preferredArea, 120),
    message: clean(body.message, 3000),
    subject: clean(body.subject, 200),
    page: clean(body.page, 300),
  };

  const errors: Record<string, string> = {};
  if (inquiry.name.length < 2) errors.name = "Please enter your full name.";
  if (!PHONE_RE.test(inquiry.phone)) errors.phone = "Please enter a valid phone number.";
  if (inquiry.email && !EMAIL_RE.test(inquiry.email)) errors.email = "Please enter a valid email address.";
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const result = await forwardToWebhook(process.env.INQUIRY_WEBHOOK_URL, {
    type: "inquiry",
    receivedAt: new Date().toISOString(),
    ...inquiry,
  });

  if (result === "failed") {
    return NextResponse.json(
      { ok: false, message: "We couldn't send your inquiry right now. Please call or WhatsApp us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    delivered: result === "delivered",
    message:
      result === "delivered"
        ? "Thank you — your inquiry has been sent. Our team will be in touch shortly."
        : "Thank you — your inquiry was received. (Demo mode: set INQUIRY_WEBHOOK_URL to deliver inquiries.)",
  });
}
