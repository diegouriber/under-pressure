import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fdfaf4] text-[#1f1f1f]">
      <section className="mx-auto grid min-h-screen w-full max-w-7xl gap-10 px-5 py-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10">
        <div className="order-2 pb-12 lg:order-1 lg:pb-0">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#1f1f1f]/10 bg-white px-4 py-2 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-[#1f1f1f]" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Evidence-informed reflection tool
            </span>
          </div>

          <h1 className="max-w-4xl text-6xl font-semibold leading-[0.95] tracking-[-0.065em] text-[#1f1f1f] sm:text-7xl lg:text-8xl">
            Pressure is real. It does not have to own you.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[#555]">
            Under Pressure helps you name what is weighing on you, notice what
            the situation has started to mean, separate what is controllable
            from what is not fully controllable, and leave with one grounded
            next step.
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
              title="Notice the meaning"
              text="See what the outcome has started to represent emotionally."
            />

            <ValueCard
              number="03"
              title="Leave with direction"
              text="Choose one grounded next step inside your actual control."
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
                    text="Grades, money, career, family, relationships, comparison, uncertainty."
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
                    label="Meaning layer"
                    text="The outcome starts feeling like proof of worth, safety, success, belonging, or direction."
                  />

                  <Connector />

                  <FlowNode
                    label="Grounded next step"
                    text="Act where action helps. Prepare where preparation helps. Stop trying to fully control what is not fully controllable."
                  />
                </div>
              </div>

              <div className="relative z-10 mt-5 rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
                  Boundaries
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <MiniCard title="Not therapy" text="A guided reflection tool." />
                  <MiniCard title="Not diagnosis" text="Pressure patterns, not clinical labels." />
                  <MiniCard
                    title="Not crisis support"
                    text="Immediate danger needs human help."
                  />
                  <MiniCard
                    title="Practical ending"
                    text="Ends with one grounded next step."
                  />
                </div>
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
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              How it works
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[#1f1f1f] md:text-5xl">
              The tool turns vague pressure into a clearer map.
            </h2>

            <p className="mt-5 text-base leading-8 text-[#555]">
              This is not random journaling. Each step has a job: name the
              context, identify the emotional state, describe the pressure,
              notice patterns, explore what the outcome means, separate control,
              and choose one grounded action.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            <StepCard
              number="01"
              title="Context"
              text="The app asks for lightweight context so the reflection can respond to your situation instead of speaking in generic advice."
            />

            <StepCard
              number="02"
              title="Pressure"
              text="You describe what is happening and what you fear it means. This separates facts from interpretation."
            />

            <StepCard
              number="03"
              title="Meaning"
              text="The tool helps you notice when an uncertain result starts feeling like proof of your worth, safety, belonging, or direction."
            />

            <StepCard
              number="04"
              title="Action"
              text="You map direct control, partial influence, preparation, and what is not fully controllable, then leave with one grounded next step."
            />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_0.85fr]">
            <section className="rounded-[2rem] bg-[#f6f1e8] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                The causal chain
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
                Pressure usually gets heavier when the situation and the meaning
                collapse into one.
              </h3>

              <div className="mt-6 grid gap-3 md:grid-cols-5 md:items-center">
                <ChainItem title="Situation" text="What is happening." />
                <ChainArrow />
                <ChainItem title="Meaning" text="What it seems to prove." />
                <ChainArrow />
                <ChainItem title="Next step" text="What is actually yours." />
              </div>
            </section>

            <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Safety boundary
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
                Reflection, not treatment.
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#555]">
                Under Pressure does not diagnose, provide therapy, assess risk,
                or replace professional support. If you are in immediate danger,
                contact emergency services, a trusted person, or professional
                support now.
              </p>
            </section>
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

function StepCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-[#f6f1e8] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {number}
      </p>

      <h3 className="mt-4 text-lg font-semibold text-[#1f1f1f]">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#555]">{text}</p>
    </div>
  );
}

function ChainItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <h4 className="font-semibold text-[#1f1f1f]">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-[#555]">{text}</p>
    </div>
  );
}

function ChainArrow() {
  return (
    <div className="hidden text-center text-2xl font-semibold text-[#7a5c3a] md:block">
      →
    </div>
  );
}