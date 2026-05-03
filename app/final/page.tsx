export default function FinalPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Final Step · Wise Effort Plan
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Leave with direction, not fixation.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
            You do not need to solve your whole future today. The goal is to
            leave with one responsible action and one thing you are willing to
            stop carrying as if it were fully yours to control.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Wise effort action
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Choose one grounded action for this week.
              </h2>

              <textarea
                rows={6}
                placeholder="Example: I will apply to two roles, ask one person for advice, make a clear budget, study for one focused block, or have one honest conversation."
                className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
              />
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Release statement
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Name what you cannot keep treating as fully controllable.
              </h2>

              <textarea
                rows={6}
                placeholder="Example: I release the idea that this one result decides my worth, my future, or whether I am falling behind in life."
                className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
              />
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Grounding statement
            </p>

            <p className="mt-4 text-2xl font-semibold leading-10 text-[#2f2f2f]">
              I can care deeply about my future without turning uncertainty into
              a verdict on my life.
            </p>

            <p className="mt-5 text-base leading-7 text-[#555]">
              Material reality matters. Effort matters. Preparation matters. But
              not every outcome is fully yours to command. The work is to act
              with direction while refusing to let uncertainty become
              self-destruction.
            </p>
          </div>

          <div className="mt-10 rounded-3xl bg-[#f6f1e8] p-6">
            <h2 className="text-xl font-semibold">Before you leave</h2>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Take one slow breath. Notice that the pressure may still exist,
              but it is no longer completely undefined. You have named it,
              separated it, and chosen one direction.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Return home
            </a>

            <a
              href="/control-map"
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