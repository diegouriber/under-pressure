export default function CheckInPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Step 1 · Emotional Check-In
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Before naming the pressure, notice where you are.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4a4a4a]">
            This is not about judging your emotional state. It is about slowing
            down enough to see it clearly.
          </p>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              How are you feeling right now?
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {[
                "Overwhelmed",
                "Anxious",
                "Numb",
                "Tired",
                "Restless",
                "Okay, but pressured",
              ].map((mood) => (
                <button
                  key={mood}
                  className="rounded-2xl border border-[#1f1f1f]/10 bg-[#f6f1e8] px-5 py-4 text-left text-sm font-medium transition hover:bg-white"
                >
                  {mood}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-semibold">
              How intense does the pressure feel?
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-5">
              {["1", "2", "3", "4", "5"].map((level) => (
                <button
                  key={level}
                  className="rounded-2xl border border-[#1f1f1f]/10 bg-[#f6f1e8] px-5 py-4 text-center text-sm font-semibold transition hover:bg-white"
                >
                  {level}
                </button>
              ))}
            </div>

            <div className="mt-3 flex justify-between text-xs text-[#666]">
              <span>Manageable</span>
              <span>Very heavy</span>
            </div>
          </div>

          <div className="mt-10 rounded-3xl bg-[#f6f1e8] p-6">
            <p className="text-sm leading-6 text-[#555]">
              Take one slow breath before continuing. You do not need to solve
              everything right now. For now, the task is only to name what is
              present.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/pressure"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue
            </a>

            <a
              href="/scope"
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