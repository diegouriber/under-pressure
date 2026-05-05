import Link from "next/link";
import FlowShell from "../components/FlowShell";

export default function ScopePage() {
  return (
    <FlowShell
      eyebrow="Before we begin"
      title="This is reflection, not therapy."
      description="Under Pressure is a guided wellbeing experience. It helps you name what is weighing on you, understand what part of the pressure is practical, and notice where your peace may be tied too strongly to uncertain outcomes."
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
              It can help you slow down, organize your thoughts, identify
              pressure patterns, and leave with one grounded next step.
            </p>
          </section>

          <section className="rounded-3xl bg-[#f6f1e8] p-6">
            <h2 className="font-semibold text-[#1f1f1f]">
              What this tool cannot do
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#555]">
              It does not diagnose, treat, or replace professional mental health
              support. It is not crisis support.
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
            professional support service now. You do not need to process severe
            distress alone.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#1f1f1f]">
            The purpose of this reflection
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            The goal is not to make you stop caring about your future. The goal
            is to help you act responsibly without letting uncertainty become
            the full owner of your peace.
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