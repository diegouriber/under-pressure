export default function SummaryPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Step 3 · Pressure Pattern Summary
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Your pressure may not be one thing. It may be a pattern.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
            Based on what you shared, this reflection points toward three layers:
            practical pressure, future uncertainty, and the fear that an outcome
            will define your worth.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Layer 1
              </p>
              <h2 className="mt-3 text-xl font-semibold">Material reality</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                Some of the pressure is practical. It may involve money, grades,
                work, housing, family expectations, or future stability. This
                part deserves clear action, not avoidance.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Layer 2
              </p>
              <h2 className="mt-3 text-xl font-semibold">Future uncertainty</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                Some of the pressure comes from trying to mentally solve a life
                that has not happened yet. The uncertainty feels like danger,
                even when the present moment is still survivable.
              </p>
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Layer 3
              </p>
              <h2 className="mt-3 text-xl font-semibold">Identity pressure</h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                The heaviest part may be what the outcome seems to prove: that
                you are capable, respected, on track, or not falling behind.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Reflective interpretation
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              Your pressure seems to come from more than the situation itself.
              Part of it is real and deserves planning. Part of it is projection.
              Part of it is comparison. And part of it is the fear that if this
              outcome does not go your way, it says something final about you.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              The next step is not to stop caring. The next step is to separate
              what requires effort from what requires release.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/attachment"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Explore the attachment
            </a>

            <a
              href="/pressure"
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