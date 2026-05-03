export default function ControlMapPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Step 5 · Control Map
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Separate effort from fixation.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
            Pressure becomes clearer when you stop treating everything as equally
            controllable. Some things require action. Some require preparation.
            Some require acceptance.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Control
              </p>
              <h2 className="mt-3 text-xl font-semibold">
                What can you directly do?
              </h2>
              <textarea
                rows={5}
                placeholder="Example: Apply to three roles, email one mentor, study for two hours, make a basic budget..."
                className="mt-4 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
              />
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Influence
              </p>
              <h2 className="mt-3 text-xl font-semibold">
                What can you improve but not guarantee?
              </h2>
              <textarea
                rows={5}
                placeholder="Example: Interview performance, relationships, reputation, opportunities, confidence..."
                className="mt-4 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
              />
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Preparation
              </p>
              <h2 className="mt-3 text-xl font-semibold">
                What can you prepare for?
              </h2>
              <textarea
                rows={5}
                placeholder="Example: A backup plan, a second application, a conversation with family, a savings target..."
                className="mt-4 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
              />
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Release
              </p>
              <h2 className="mt-3 text-xl font-semibold">
                What is outside your control?
              </h2>
              <textarea
                rows={5}
                placeholder="Example: Other people’s timelines, the final decision, the economy, luck, timing, comparison..."
                className="mt-4 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
              />
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Under Pressure principle
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              Wise effort means acting where you have responsibility without
              demanding that life guarantees the result. You are allowed to care.
              You are not required to collapse if the outcome remains uncertain.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/final"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Finish with direction
            </a>

            <a
              href="/attachment"
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