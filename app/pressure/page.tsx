export default function PressurePage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Step 2 · Name the Pressure
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            What has been weighing on you most recently?
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a]">
            Try to write honestly, not perfectly. You can talk about money,
            school, work, family, comparison, the future, or a pressure you do
            not fully understand yet.
          </p>

          <div className="mt-10">
            <label
              htmlFor="pressure"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]"
            >
              Your reflection
            </label>

            <textarea
              id="pressure"
              rows={10}
              placeholder="Example: I feel like everyone around me is moving faster than me. I know I am not in immediate danger, but I keep worrying that if I do not get the right internship or job, I will fall behind and disappoint my family..."
              className="mt-4 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <h2 className="font-semibold">Write the facts</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                What is actually happening in your life right now?
              </p>
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <h2 className="font-semibold">Write the fear</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                What are you afraid this situation might mean about your future
                or yourself?
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6">
            <h2 className="font-semibold">Reflection cue</h2>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Pressure often becomes heavier when facts, fears, comparison, and
              identity all collapse into one feeling. This step begins separating
              them.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/summary"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Generate pressure summary
            </a>

            <a
              href="/check-in"
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