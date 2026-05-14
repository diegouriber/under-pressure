import Link from "next/link";
import FlowShell from "../components/FlowShell";

export default function ScopePage() {
  return (
    <FlowShell
      eyebrow="Before we begin"
      title="A short boundary before reflection."
      description="Under Pressure is an evidence-informed reflection tool. It can help you organize pressure and choose one grounded next step, but it is not therapy, diagnosis, or crisis support."
      step={1}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            What this reflection is for
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
            This is a guided thinking space, not a clinical service.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555] md:text-base">
            The goal is not to erase pressure or tell you what your life should
            mean. The goal is to help you name what is happening, notice what
            the outcome has started to represent, separate what is controllable
            from what is not fully controllable, and leave with one realistic
            next action.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl">
              ✓
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#1f1f1f]">
              What this tool can do
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#555]">
              <li>Help you name your current pressure state.</li>
              <li>Separate facts from fears and interpretations.</li>
              <li>Notice pressure patterns, not clinical labels.</li>
              <li>Map what is controllable and not fully controllable.</li>
              <li>End with one grounded next step.</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fff6f4] text-xl">
              !
            </div>

            <h2 className="mt-5 text-xl font-semibold text-[#1f1f1f]">
              What this tool cannot do
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-[#555]">
              <li>It cannot diagnose or treat mental health conditions.</li>
              <li>It cannot assess risk or replace professional care.</li>
              <li>It cannot provide crisis support.</li>
              <li>It cannot guarantee outcomes or solve the whole situation.</li>
            </ul>
          </section>
        </div>

        <section className="rounded-3xl border border-[#b54747]/20 bg-[#fff6f4] p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b54747]">
            Immediate danger
          </p>

          <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
            If you might hurt yourself or someone else
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            Please contact emergency services, a trusted person, or a
            professional support service now. Under Pressure is not designed to
            hold crisis situations.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Saved in this browser session
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            Your responses are saved locally in this browser session so you can
            move through the reflection without losing your previous answers.
            Do not enter anything you would not want saved on this device.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/context"
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            I’m ready to reflect
          </Link>

          <Link
            href="/"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}