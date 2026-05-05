import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfaf4] text-[#1f1f1f]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div className="order-2 pb-12 lg:order-1 lg:pb-0">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1f1f1f]/10 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#1f1f1f]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Reflective wellbeing tool
            </span>
          </div>

          <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.065em] text-[#1f1f1f] sm:text-7xl lg:text-8xl">
            Pressure is real. It does not have to own you.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#555]">
            Under Pressure helps you understand how external pressure becomes
            inner pressure, where you may be attaching your peace to uncertain
            outcomes, and what wise effort can look like right now.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/scope"
              className="rounded-full bg-[#1f1f1f] px-8 py-4 text-center text-sm font-semibold text-white shadow-sm transition hover:scale-[1.01] hover:opacity-90"
            >
              Start reflection
            </Link>

            <a
              href="#how-it-works"
              className="rounded-full border border-[#1f1f1f]/20 bg-white px-8 py-4 text-center text-sm font-semibold text-[#1f1f1f] shadow-sm transition hover:bg-[#f6f1e8]"
            >
              See how it works
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ValueCard
              number="01"
              title="Name the pressure"
              text="Separate the real situation from the emotional story around it."
            />

            <ValueCard
              number="02"
              title="Find the attachment"
              text="Notice what outcome you feel you need before you can feel okay."
            />

            <ValueCard
              number="03"
              title="Leave with direction"
              text="Choose effort where you have control and release what is not yours."
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-xl">
            <div className="absolute -left-6 top-12 h-32 w-32 rounded-full bg-[#d9bc83]/40 blur-2xl" />
            <div className="absolute -right-6 bottom-16 h-40 w-40 rounded-full bg-[#1f1f1f]/10 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1f1f1f] p-6 text-white shadow-2xl">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10" />
              <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#c9a66b]/20" />

              <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                  Pressure map
                </p>

                <div className="mt-6 space-y-4">
                  <FlowNode
                    label="External pressure"
                    text="Grades, money, career, family, comparison, uncertainty."
                    active
                  />

                  <Connector />

                  <FlowNode
                    label="Inner pressure"
                    text="The situation starts feeling personal, urgent, or total."
                    active
                  />

                  <Connector />

                  <FlowNode
                    label="Outcome attachment"
                    text="Peace becomes tied to one result you cannot fully control."
                  />

                  <Connector />

                  <FlowNode
                    label="Wise effort"
                    text="Act clearly. Prepare honestly. Release what is not yours."
                  />
                </div>
              </div>

              <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
                <MiniCard title="Not therapy" text="A guided reflection tool." />
                <MiniCard title="Not diagnosis" text="Pattern-based prompts." />
                <MiniCard
                  title="Grounded"
                  text="Material reality still matters."
                />
                <MiniCard
                  title="Practical"
                  text="Ends with one next action."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10"
      >
        <div className="rounded-[2.5rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            How it works
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            <StepCard
              title="Context"
              text="Give the reflection a little context so the guidance is not generic."
            />

            <StepCard
              title="Pressure"
              text="Name what is actually weighing on you and what it seems to mean."
            />

            <StepCard
              title="Attachment"
              text="Identify the outcome your peace may be depending on too strongly."
            />

            <StepCard
              title="Direction"
              text="Separate control, influence, preparation, and release."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {number}
      </p>

      <h2 className="mt-4 font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-2 text-sm leading-6 text-[#666]">{text}</p>
    </div>
  );
}

function FlowNode({
  label,
  text,
  active = false,
}: {
  label: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 ${
        active
          ? "border-[#e7c987]/40 bg-[#e7c987]/15"
          : "border-white/10 bg-white/[0.05]"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`h-3 w-3 rounded-full ${
            active ? "bg-[#e7c987]" : "bg-white/30"
          }`}
        />

        <h3 className="font-semibold text-white">{label}</h3>
      </div>

      <p className="mt-3 text-sm leading-6 text-white/65">{text}</p>
    </div>
  );
}

function Connector() {
  return (
    <div className="ml-7 h-6 w-px bg-gradient-to-b from-white/30 to-transparent" />
  );
}

function MiniCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-white/55">{text}</p>
    </div>
  );
}

function StepCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-[#f6f1e8] p-6">
      <h3 className="text-lg font-semibold text-[#1f1f1f]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#555]">{text}</p>
    </div>
  );
}