"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";

type Status = { state: "idle" | "loading" | "success" | "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterStrip() {
  const { newsletter } = siteConfig;
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setStatus({ state: "error", message: "Please enter a valid email address." });
      return;
    }
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), company }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !data.ok) throw new Error(data.message ?? "Something went wrong.");
      setStatus({ state: "success", message: data.message ?? "Thanks — you're on the list." });
      setEmail("");
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  };

  return (
    <section aria-labelledby="newsletter-title" className="border-b border-line bg-mist-2">
      <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:py-9">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white text-teal ring-1 ring-line">
            <Mail className="size-5" strokeWidth={1.7} aria-hidden="true" />
          </span>
          <div>
            <h2 id="newsletter-title" className="text-lg font-bold sm:text-xl">
              {newsletter.heading}
            </h2>
            <p className="mt-1 text-[15px] text-body">{newsletter.copy}</p>
          </div>
        </div>

        <form onSubmit={submit} noValidate className="w-full lg:max-w-[480px]">
          <div className="flex flex-col gap-2.5 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status.state === "error") setStatus({ state: "idle" });
              }}
              placeholder="Your email address"
              aria-invalid={status.state === "error"}
              aria-describedby="newsletter-status"
              className="h-12 w-full flex-1 rounded-xl border border-line-strong bg-white px-4 text-[15px] text-ink placeholder:text-subtle focus:border-teal focus:outline-none focus:ring-4 focus:ring-cyan/15 aria-[invalid=true]:border-red-500"
            />
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <button
              type="submit"
              disabled={status.state === "loading"}
              className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-navy px-6 font-display text-sm font-semibold text-white transition-colors hover:bg-ink disabled:opacity-70"
            >
              {status.state === "loading" ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              ) : (
                <>
                  {newsletter.buttonLabel}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
          <p
            id="newsletter-status"
            role="status"
            className={cn(
              "mt-2 flex items-center gap-1.5 text-[13px]",
              status.state === "error" && "text-red-600",
              status.state === "success" && "text-emerald-700",
              (status.state === "idle" || status.state === "loading") && "text-subtle",
            )}
          >
            {status.state === "success" && <CheckCircle2 className="size-4" aria-hidden="true" />}
            {status.message ?? "No spam. Unsubscribe at any time."}
          </p>
        </form>
      </Container>
    </section>
  );
}
