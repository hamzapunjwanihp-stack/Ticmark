"use client";

import { useId, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { controlClasses, FieldError, FieldLabel, SelectField } from "@/components/ui/field";
import { areaOptions } from "@/lib/filter-options";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const INTEREST_OPTIONS = [
  ...categories.map((c) => ({ value: c.name, label: c.name })),
  { value: "Investment guidance", label: "Investment guidance" },
  { value: "Something else", label: "Something else" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()-]{6,19}$/;

interface Values {
  name: string;
  phone: string;
  email: string;
  interestedIn: string;
  preferredArea: string;
  message: string;
}

type Errors = Partial<Record<keyof Values, string>>;

function validate(v: Values): Errors {
  const errors: Errors = {};
  if (v.name.trim().length < 2) errors.name = "Please enter your full name.";
  if (!PHONE_RE.test(v.phone.trim())) errors.phone = "Please enter a valid phone number, e.g. +92 300 1234567.";
  if (v.email.trim() && !EMAIL_RE.test(v.email.trim())) errors.email = "Please enter a valid email address.";
  return errors;
}

interface ContactFormProps {
  /** "full" = contact page (all fields); "compact" = detail-page inquiry. */
  variant?: "full" | "compact";
  /** Pre-filled subject, e.g. the project or listing name. */
  subject?: string;
  defaultMessage?: string;
  defaultArea?: string;
  submitLabel?: string;
  className?: string;
}

export function ContactForm({
  variant = "full",
  subject,
  defaultMessage = "",
  defaultArea = "",
  submitLabel = "Send Inquiry",
  className,
}: ContactFormProps) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    email: "",
    interestedIn: "",
    preferredArea: defaultArea,
    message: defaultMessage,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<{ state: "idle" | "loading" | "success" | "error"; message?: string }>({ state: "idle" });

  const set = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstInvalid = (Object.keys(found) as Array<keyof Values>)[0];
    if (firstInvalid) {
      document.getElementById(id(firstInvalid))?.focus();
      return;
    }
    setStatus({ state: "loading" });
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, subject, company, page: window.location.pathname }),
      });
      const data = (await res.json()) as { ok: boolean; message?: string; errors?: Errors };
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }
      setStatus({ state: "success", message: data.message });
      setValues((v) => ({ ...v, name: "", phone: "", email: "", message: defaultMessage }));
    } catch (err) {
      setStatus({ state: "error", message: err instanceof Error ? err.message : "Something went wrong. Please try again." });
    }
  };

  if (status.state === "success") {
    return (
      <div className={cn("rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center", className)} role="status">
        <CheckCircle2 className="mx-auto size-10 text-emerald-600" aria-hidden="true" />
        <p className="mt-4 font-display text-lg font-bold text-ink">Inquiry sent</p>
        <p className="mt-2 text-sm leading-relaxed text-body">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-5 font-display text-sm font-semibold text-teal-ink underline underline-offset-4"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const errorProps = (key: keyof Values) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? id(`${key}-error`) : undefined,
  });

  return (
    <form onSubmit={submit} noValidate className={cn("space-y-4", className)}>
      <div className={cn("grid gap-4", variant === "full" && "sm:grid-cols-2")}>
        <div className={variant === "full" ? "sm:col-span-2" : undefined}>
          <FieldLabel htmlFor={id("name")}>Full Name</FieldLabel>
          <input
            id={id("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={set("name")}
            className={controlClasses}
            placeholder="Your full name"
            required
            {...errorProps("name")}
          />
          <FieldError id={id("name-error")} message={errors.name} />
        </div>
        <div>
          <FieldLabel htmlFor={id("phone")}>Phone</FieldLabel>
          <input
            id={id("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            className={controlClasses}
            placeholder="+92 3XX XXXXXXX"
            required
            {...errorProps("phone")}
          />
          <FieldError id={id("phone-error")} message={errors.phone} />
        </div>
        <div>
          <FieldLabel htmlFor={id("email")} optional>
            Email
          </FieldLabel>
          <input
            id={id("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={set("email")}
            className={controlClasses}
            placeholder="you@example.com"
            {...errorProps("email")}
          />
          <FieldError id={id("email-error")} message={errors.email} />
        </div>
        {variant === "full" && (
          <>
            <SelectField
              id={id("interestedIn")}
              name="interestedIn"
              label="Interested In"
              value={values.interestedIn}
              onChange={set("interestedIn")}
              options={INTEREST_OPTIONS}
              placeholder="Select an option"
            />
            <SelectField
              id={id("preferredArea")}
              name="preferredArea"
              label="Preferred Area"
              value={values.preferredArea}
              onChange={set("preferredArea")}
              options={areaOptions.map((a) => ({ value: a.label, label: a.label }))}
              placeholder="Any area"
            />
          </>
        )}
      </div>
      <div>
        <FieldLabel htmlFor={id("message")} optional>
          Message
        </FieldLabel>
        <textarea
          id={id("message")}
          name="message"
          rows={variant === "full" ? 5 : 4}
          value={values.message}
          onChange={set("message")}
          className={cn(controlClasses, "h-auto resize-y py-3 leading-relaxed")}
          placeholder="Tell us what you're looking for — budget, timeline, unit size…"
        />
      </div>
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

      {status.state === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {status.message}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status.state === "loading"}>
        {status.state === "loading" ? (
          <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
        ) : (
          <>
            {submitLabel}
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>
      <p className="text-center text-xs leading-relaxed text-subtle">
        By submitting, you agree to be contacted by Ticmark Properties about your inquiry. See our{" "}
        <a href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
