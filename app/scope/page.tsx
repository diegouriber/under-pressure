export default function ScopePage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Before we begin
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            This is reflection, not therapy.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#4a4a4a]">
            Under Pressure is a guided wellbeing experience. It helps you name
            what is weighing on you, understand what part of the pressure is
            practical, and notice where your peace may be tied too strongly to
            uncertain outcomes.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <h2 className="font-semibold">What this tool can do</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                It can help you slow down, organize your thoughts, identify
                pressure patterns, and leave with one grounded next step.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <h2 className="font-semibold">What this tool cannot do</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                It does not diagnose, treat, or replace professional mental
                health support. It is not crisis support.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6">
            <h2 className="font-semibold">If you are in immediate danger</h2>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Please contact emergency services, a trusted person, or a
              professional support service now. You do not need to process
              severe distress alone.
            </p>
          </div>

          <p className="mt-8 text-base leading-7 text-[#4a4a4a]">
            The goal is not to make you stop caring about your future. The goal
            is to help you act responsibly without letting uncertainty become
            the full owner of your peace.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/name"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              I understand, continue
            </a>

            <a
              href="/"
              className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-[#f6f1e8]"
            >
              Back
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}