"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { site, academicPrograms, madsPrograms } from "@/content/site";
import { supabase, type LeadInsert } from "@/lib/supabase";

/**
 * Demo-booking enquiry form.
 *
 * The durable record is a row in Supabase (`public.leads` — project
 * study-skills-center, ap-south-1). That table has Row Level Security: the
 * public key used here can INSERT and nothing else — no policy grants
 * select/update/delete to `anon`, so a submitted lead can be read only from
 * the Supabase dashboard or a service-role key, never through the public API.
 * Column checks (`student_name_not_blank`, `phone_not_blank`,
 * `consent_must_be_given`, …) enforce the same rules server-side that this
 * component enforces client-side — something a plain static site couldn't do
 * on its own, since it has no server. This is what actually makes "the lead
 * is never lost" true, and it's why the Supabase insert is what determines
 * success below, not FormSubmit.
 *
 * FormSubmit (https://formsubmit.co) is still fired alongside it, best-effort,
 * as an immediate email nudge to sscdelhi17@gmail.com so staff don't have to
 * poll a dashboard. It needs no account or API key on its own, which is why it
 * was the first thing wired up — but it turned out to have a real gap: the
 * *first* submission it ever receives for a new address isn't delivered at
 * all, it just triggers a one-time "Activate Form" email instead (confirmed
 * against the live endpoint — see docs/07-lead-form.md). That gap no longer
 * matters for whether a lead is lost, because Supabase already has it
 * regardless of whether FormSubmit's email arrives.
 *
 * Honeypot field (`_honey`) catches unsophisticated bots before either call
 * fires; nothing here stops a determined one.
 *
 * DO NOT chain `.select()` onto the `.insert()` call below. Postgres RLS
 * treats `INSERT ... RETURNING` as also requiring a SELECT policy on the
 * table, and this table deliberately has none for `anon` — that's what makes
 * "leads can be written but never read back through the public API" true.
 * `.select()` would silently reintroduce the exact RLS failure documented and
 * fixed in docs/07-lead-form.md §2. If a future feature genuinely needs the
 * inserted row back (e.g. a reference number), the fix is a SECURITY DEFINER
 * Postgres function called via RPC, not a broader grant on this table.
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

    const studentName = String(data.get("student") ?? "").trim();
    const parentName = String(data.get("parent") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const classOrAge = String(data.get("class") ?? "").trim() || null;
    const programme = String(data.get("programme") ?? "").trim() || null;
    const message = String(data.get("message") ?? "").trim() || null;

    // The database insert is the one that decides success/failure — see the
    // file-level comment for why. FormSubmit runs alongside it but never
    // blocks or overrides that outcome.
    const notifyEmail = fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: "New demo booking enquiry — Study Skills Center site",
        _template: "table",
        _captcha: "false",
        student: studentName,
        parent: parentName,
        phone,
        classOrAge,
        programme,
        message,
        consent: "Yes — parent/guardian consented to being contacted",
      }),
    }).catch(() => null); // best-effort notification; a failure here is never fatal

    try {
      const lead: LeadInsert = {
        student_name: studentName,
        parent_name: parentName,
        phone,
        class_or_age: classOrAge,
        programme,
        message,
        consent: true,
        source: "admissions_form",
      };
      const { error } = await supabase.from("leads").insert(lead);

      if (error) throw error;

      setStatus("success");
      router.push("/thank-you");
    } catch {
      setStatus("error");
    } finally {
      void notifyEmail;
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
