import { NextResponse } from "next/server";
import { clean, EMAIL_RE, forwardToWebhook } from "@/lib/forward";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (clean(body.company)) return NextResponse.json({ ok: true, message: "Thanks — you're on the list." });

  const email = clean(body.email, 160);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 422 });
  }

  const result = await forwardToWebhook(process.env.NEWSLETTER_WEBHOOK_URL, {
    type: "newsletter",
    email,
    receivedAt: new Date().toISOString(),
  });

  if (result === "failed") {
    return NextResponse.json({ ok: false, message: "We couldn't subscribe you right now. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    message:
      result === "delivered"
        ? "Thanks — you're on the list for project updates."
        : "Thanks — you're on the list. (Demo mode: set NEWSLETTER_WEBHOOK_URL to store sign-ups.)",
  });
}
