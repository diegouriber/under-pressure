export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Under Pressure
          </p>

          <h1 className="text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            A reflective AI experience for high-pressure living in Hong Kong.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a]">
            Under Pressure helps students and young adults name what is weighing
            on them, separate real pressure from mental fixation, and leave with
            one grounded next step.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/scope"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start reflection
            </a>

            <a
              href="#how-it-works"
              className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-white"
            >
              How it works
            </a>
          </div>
        </div>

        <div id="how-it-works" className="mt-20 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/70 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">1. Name the pressure</h2>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Write what has been weighing on you recently. The tool helps you
              identify the pressure pattern.
            </p>
          </div>

          <div className="rounded-3xl bg-white/70 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">2. See the attachment</h2>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Explore what outcome you feel you need in order to feel okay,
              secure, or successful.
            </p>
          </div>

          <div className="rounded-3xl bg-white/70 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">3. Leave with direction</h2>
            <p className="mt-3 text-sm leading-6 text-[#555]">
              Get one wise-effort action and one release statement to help you
              move forward without spiraling.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}