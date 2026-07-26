"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { site, academicPrograms, madsPrograms } from "@/content/site";

/**
 * Demo-booking enquiry form.
 *
 * This is a static export with no server of its own, so submissions go
 * directly from the browser to FormSubmit (https://formsubmit.co) — a
 * third-party relay that forwards the data to SSC's own inbox by email. It
 * needs no account, password or API key, which matters here: nobody building
 * this site can create an account on SSC's behalf, so any service requiring
 * one would have been a dead end.
 *
 * IMPORTANT — one-time activation, confirmed by an actual test submission
 * against the real endpoint while building this: FormSubmit always answers
 * HTTP 200, but the *first* submission it ever receives for
 * sscdelhi17@gmail.com is NOT delivered — it comes back
 * `{"success":"false","message":"This form needs Activation..."}` and instead
 * sends a one-time "Activate Form" email to that inbox. Until someone clicks
 * that link, every submission (including the first real visitor's) hits the
 * error/fallback state below, not success. See docs/07-lead-form.md — the
 * test above already triggered that activation email once.
 *
 * Validation is client-side only (no server to double-check on). A honeypot
 * field (`_honey`) catches unsophisticated bots; nothing here stops a
 * determined spammer. See docs/07-lead-form.md for what's really enforced
 * server-side in the R1 build vs. what's a placeholder here.
 */

type Status = "idle" | "submitting" | "success" | "error";

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${site.email}`;

export function EnquiryForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData): Record<string, string> {
    const next: Record<string, string> = {};
    const student = String(data.get("student") ?? "").trim();
    const parent = String(data.get("parent") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const consent = data.get("consent");

    if (!student) next.student = "Enter the student's name.";
    if (!parent) next.parent = "Enter a parent or guardian's name.";
    if (!phone) {
      next.phone = "Enter a phone number.";
    } else if (!/^(\+?91)?[6-9]\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      next.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!consent) next.consent = "Please confirm you're the parent or guardian and consent to being contacted.";

    return next;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;

    const data = new FormData(formRef.current);

    // Honeypot: a real visitor never fills a field that isn't visible.
    if (String(data.get("_honey") ?? "").length > 0) {
      setStatus("success");
      return;
    }

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstInvalid = formRef.current.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New demo booking enquiry — Study Skills Center site",
          _template: "table",
          _captcha: "false",
          student: data.get("student"),
          parent: data.get("parent"),
          phone: data.get("phone"),
          classOrAge: data.get("class"),
          programme: data.get("programme"),
          message: data.get("message"),
          consent: "Yes — parent/guardian consented to being contacted",
        }),
      });

      // FormSubmit always answers HTTP 200, even when it did NOT deliver the
      // message — most importantly the first-ever submission to a new address,
      // which it holds pending a one-time activation click (confirmed by an
      // actual test submission against the real endpoint while building this).
      // Checking res.ok alone would show every visitor "success" regardless of
      // whether SSC ever receives it, so the JSON body's own `success` field is
      // the real signal.
      const body: unknown = await res.json().catch(() => null);
      const delivered =
        res.ok &&
        typeof body === "object" &&
        body !== null &&
        "success" in body &&
        String((body as { success: unknown }).success) === "true";

      if (!delivered) throw new Error("FormSubmit did not confirm delivery");

      setStatus("success");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    }
  }

  if (status === "error") {
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="font-semibold text-navy-900">That didn&apos;t go through.</p>
        <p className="mt-2 text-sm text-grey-600">
          Something went wrong submitting the form — nothing was sent. Please call or WhatsApp
          us directly instead, and we&apos;ll take it from there.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`tel:${site.primaryPhone}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-blue-600 px-6 text-sm font-semibold text-white"
          >
            Call {site.primaryPhone}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-grey-200 px-6 text-sm font-semibold text-navy-900"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      {errorCount > 0 && (
        <div
          role="alert"
          aria-live="assertive"
          className="sm:col-span-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorCount === 1 ? "One thing needs fixing:" : `${errorCount} things need fixing:`}
          <ul className="mt-1 list-disc pl-5">
            {Object.values(errors).map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Honeypot — hidden from sighted and assistive-tech users alike, but present in the DOM for bots that fill every field. */}
      <input
        type="text"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <label className="block sm:col-span-1">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Student&apos;s name</span>
        <input
          type="text"
          name="student"
          autoComplete="name"
          aria-invalid={Boolean(errors.student)}
          aria-describedby={errors.student ? "err-student" : undefined}
          className={`min-h-[44px] w-full rounded-lg border px-3 ${errors.student ? "border-red-400" : "border-grey-200"}`}
        />
        {errors.student && (
          <span id="err-student" className="mt-1 block text-xs text-red-700">
            {errors.student}
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Parent&apos;s name</span>
        <input
          type="text"
          name="parent"
          aria-invalid={Boolean(errors.parent)}
          aria-describedby={errors.parent ? "err-parent" : undefined}
          className={`min-h-[44px] w-full rounded-lg border px-3 ${errors.parent ? "border-red-400" : "border-grey-200"}`}
        />
        {errors.parent && (
          <span id="err-parent" className="mt-1 block text-xs text-red-700">
            {errors.parent}
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Phone number</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="98765 43210"
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "err-phone" : undefined}
          className={`min-h-[44px] w-full rounded-lg border px-3 ${errors.phone ? "border-red-400" : "border-grey-200"}`}
        />
        {errors.phone && (
          <span id="err-phone" className="mt-1 block text-xs text-red-700">
            {errors.phone}
          </span>
        )}
      </label>

      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Class / age</span>
        <input type="text" name="class" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3" />
      </label>

      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Programme of interest</span>
        <select name="programme" defaultValue="" className="min-h-[44px] w-full rounded-lg border border-grey-200 px-3">
          <option value="" disabled>
            Select a programme
          </option>
          <optgroup label="Academics">
            {academicPrograms.map((p) => (
              <option key={p.slug}>{p.title}</option>
            ))}
          </optgroup>
          <optgroup label="MADS — Creative">
            {madsPrograms.map((m) => (
              <option key={m.slug}>{m.title}</option>
            ))}
          </optgroup>
          <optgroup label="Competitive exams">
            <option>Grades Career Institute — JEE / NEET / Olympiad</option>
          </optgroup>
        </select>
      </label>

      <label className="block sm:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-navy-900">Anything we should know?</span>
        <textarea name="message" rows={3} className="w-full rounded-lg border border-grey-200 p-3" />
      </label>

      <label className="flex items-start gap-3 sm:col-span-2">
        <input
          type="checkbox"
          name="consent"
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? "err-consent" : undefined}
          className="mt-1 h-5 w-5 shrink-0"
        />
        <span className="text-sm text-grey-600">
          I am the parent or guardian and I consent to Study Skills Center contacting me about
          this enquiry. <span className="text-grey-400">(Final wording pending legal review.)</span>
        </span>
      </label>
      {errors.consent && (
        <span id="err-consent" className="-mt-2 block text-xs text-red-700 sm:col-span-2">
          {errors.consent}
        </span>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request a free demo"}
        </button>
      </div>
    </form>
  );
}
