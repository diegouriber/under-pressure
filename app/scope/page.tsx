import Link from "next/link";
import FlowShell from "../components/FlowShell";

export default function ScopePage() {
  return (
    <FlowShell
      eyebrow="Before we begin"
      title="This is reflection, not therapy."
      description="Under Pressure is a psychoeducational reflection tool. It helps you organize pressure, but it does not diagnose, treat, or replace professional support."
      step={1}
      totalSteps={8}
    >
      <div className="space-y-8">
        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl bg-[#f6f1e8] p-6">
            <h2 className="font-semibold text-[#1f1f1f]">
              What this tool can do
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#555]">
              It can help you name your current state, separate facts from
              fears, identify pressure patterns, map what is controllable, and
              leave with one grounded next step.
            </p>
          </section>

          <section className="rounded-3xl bg-[#f6f1e8] p-6">
            <h2 className="font-semibold text-[#1f1f1f]">
              What this tool cannot do
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#555]">
              It cannot diagnose, treat, assess risk, or replace therapy,
              counseling, medical care, or crisis support.
            </p>
          </section>
        </div>

        <section className="rounded-3xl border border-[#b54747]/20 bg-[#fff6f4] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b54747]">
            ⚠️ Immediate danger
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
            If you are in immediate danger
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            Please contact emergency services, a trusted person, or a
            professional support service now. This app is not designed to hold
            crisis situations.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#1f1f1f]">
            The purpose of this reflection
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            The goal is not to stop caring about outcomes. The goal is to
            understand the pressure more clearly, notice where interpretation or
            self-worth may be intensifying it, and choose one realistic next
            step.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this boundary matters
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            This app is evidence-informed, not evidence-proven. It combines
            structured reflection, emotional labeling, stress appraisal,
            control mapping, and action planning into a self-guided journey. It
            is a thinking tool, not a clinical service.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/context"
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            I understand, continue
          </Link>

          <Link
            href="/"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}