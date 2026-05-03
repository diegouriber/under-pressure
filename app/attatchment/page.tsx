export default function AttachmentPage() {
  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-16">
        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            Step 4 · Outcome Attachment Audit
          </p>

          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            What outcome do you feel you need in order to feel okay?
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
            This step is not asking you to stop wanting things. It is asking you
            to notice whether your peace has become too dependent on a result
            you cannot fully control.
          </p>

          <div className="mt-10">
            <label
              htmlFor="attachment"
              className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]"
            >
              The outcome I feel attached to
            </label>

            <textarea
              id="attachment"
              rows={8}
              placeholder="Example: I feel like I need to get this internship, job, grade, salary, relationship, approval, or life milestone. If it does not happen, I feel like I will be behind or that something is wrong with me..."
              className="mt-4 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <h2 className="text-xl font-semibold">
                What would this outcome prove?
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                Would it prove that you are capable, secure, respected, chosen,
                successful, or finally on track?
              </p>
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-6">
              <h2 className="text-xl font-semibold">
                What would failure seem to mean?
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#555]">
                Would it feel like delay, embarrassment, rejection, instability,
                disappointing others, or being left behind?
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Reflection cue
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              Often, we are not only attached to the outcome itself. We are
              attached to what the outcome would seem to confirm about us.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
              Under Pressure does not ask you to abandon ambition. It asks you
              to keep ambition from becoming self-punishment.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="/control-map"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Build my control map
            </a>

            <a
              href="/summary"
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