"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
  loadSession,
  type PressureCategory,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function SummaryPage() {
  const [session, setSession] = useState<UnderPressureSession | null>(null);

  useEffect(() => {
    setSession(loadSession());
  }, []);

  if (!session) {
    return (
      <main className="min-h-screen bg-[#fdfaf4] px-6 py-10 text-[#1f1f1f]">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-[#555]">Loading reflection...</p>
        </div>
      </main>
    );
  }

  const analysis = analyzePressure(session);

  const title = session.name
    ? `${session.name}, your pressure may not be one thing.`
    : "Your pressure may not be one thing.";

  const contextSummary = buildContextSummary(session);
  const personalizedMeaning = buildPersonalizedMeaning(session);

  return (
    <FlowShell
      eyebrow="Pressure pattern summary"
      title={title}
      description="This is a structured reflection based on what you wrote, your emotional check-in, and the context you gave. These are reflection patterns, not diagnoses."
      step={5}
      totalSteps={8}
    >
      <div className="space-y-8">
        {analysis.severeDistressFlag && (
          <section className="rounded-3xl border border-[#b54747]/20 bg-[#fff6f4] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b54747]">
              ⚠️ Immediate support
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
              This sounds heavier than a reflection tool should hold alone.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#555]">
              If you might hurt yourself or feel in immediate danger, contact
              emergency services, a crisis line, or a trusted person now. This
              app can support reflection, but it is not crisis care.
            </p>
          </section>
        )}

        {contextSummary && (
          <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl">
                ◌
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                  Context used
                </p>

                <p className="mt-3 text-sm leading-7 text-[#555]">
                  {contextSummary}
                </p>
              </div>
            </div>
          </section>
        )}

        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Detected reflection patterns
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
                What the app noticed
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#666]">
              These are not clinical labels. They are clues for understanding
              what kind of pressure may be active.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {analysis.categories.map((category) => (
              <PressurePatternCard key={category} category={category} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Three layers
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
              Separate the pressure into parts.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <LayerCard
              label="Layer 1"
              icon="▣"
              title="Practical layer"
              content={analysis.practicalLayer}
            />

            <LayerCard
              label="Layer 2"
              icon="◍"
              title="Inner effect"
              content={analysis.innerEffect}
            />

            <LayerCard
              label="Layer 3"
              icon="◇"
              title="Outcome-dependent thinking"
              content={analysis.outcomeDependentInsight}
            />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1f1f1f] text-xl text-white">
              →
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                What this means for this pressure
              </p>

              <p className="mt-4 text-base leading-8 text-[#444]">
                {personalizedMeaning}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this step matters
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            Stress is not only shaped by what happens, but also by how we
            interpret what happens and whether we believe we can respond. This
            page organizes the pressure into possible patterns so the next step
            can focus on what the outcome has started to mean.
          </p>
        </section>

        <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Next reflection
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
            What result has become emotionally loaded?
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#555]">
            The next step is to notice whether a specific outcome has started
            acting like proof of your worth, safety, success, or direction.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/attachment"
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore outcome-dependent thinking
          </a>

          <Link
            href="/pressure"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}

function PressurePatternCard({ category }: { category: PressureCategory }) {
  const meta = getPressureCategoryMeta(category);

  return (
    <div className="rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1f1f1f] text-lg text-white">
          {meta.icon}
        </div>

        <div>
          <h3 className="font-semibold text-[#1f1f1f]">{category}</h3>

          <p className="mt-2 text-sm leading-6 text-[#666]">
            {meta.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function LayerCard({
  label,
  icon,
  title,
  content,
}: {
  label: string;
  icon: string;
  title: string;
  content: string;
}) {
  return (
    <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl text-[#1f1f1f]">
        {icon}
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {label}
      </p>

      <h2 className="mt-3 text-xl font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-4 text-sm leading-7 text-[#555]">{content}</p>
    </section>
  );
}

function buildContextSummary(session: UnderPressureSession) {
  const parts = [];

  if (session.lifeStage) {
    parts.push(session.lifeStage.toLowerCase());
  }

  if (session.pressureDomain) {
    parts.push(session.pressureDomain.toLowerCase());
  }

  if (session.guidanceStyle) {
    parts.push(`${session.guidanceStyle.toLowerCase()} guidance`);
  }

  if (parts.length === 0) return "";

  return `This summary is being shaped by your context: ${parts.join(
    " · "
  )}.`;
}

function buildPersonalizedMeaning(session: UnderPressureSession) {
  const domain = session.pressureDomain;
  const style = session.guidanceStyle;

  if (style === "Direct and practical") {
    return "The point is not to overanalyze the pressure. The point is to separate what needs action from what needs to stop controlling your emotional state.";
  }

  if (style === "Calm and grounding") {
    return "The point is not to force instant clarity. The point is to slow the pressure down enough to see what is real, what is interpretation, and what next step is actually available.";
  }

  if (style === "Reflective and deep") {
    return "The point is not only to solve the surface problem. The deeper question is what this pressure has started to represent: proof, safety, belonging, success, approval, or identity.";
  }

  if (domain === "School / academic performance") {
    return "This may involve real academic responsibilities, but the grade or performance outcome should not become the full measure of your intelligence, future, or worth.";
  }

  if (domain === "Career / work") {
    return "This may involve real career action, but career uncertainty should not become a verdict on whether your life is moving correctly.";
  }

  if (domain === "Money / financial stability") {
    return "This may involve real financial planning, but financial pressure becomes heavier when every unknown starts feeling like proof that you are unsafe or failing.";
  }

  if (domain === "Family expectations") {
    return "This may involve real family expectations, but another person’s approval cannot become the only place where your emotional stability is allowed to exist.";
  }

  if (domain === "Social comparison") {
    return "This may involve real ambition, but comparison becomes dangerous when other people’s timelines start replacing your own judgment.";
  }

  return "The point is not to stop caring. The point is to care with more separation: act where action helps, prepare where preparation helps, and stop trying to fully control what is not fully controllable.";
}

function getPressureCategoryMeta(category: PressureCategory) {
  if (category === "Practical stressor") {
    return {
      icon: "▣",
      description:
        "There may be a real external issue here: school, work, money, health, relationships, deadlines, or responsibility.",
    };
  }

  if (category === "Future uncertainty") {
    return {
      icon: "⌁",
      description:
        "The pressure is partly coming from trying to solve an unknown future before it has arrived.",
    };
  }

  if (category === "Family / expectation pressure") {
    return {
      icon: "⌂",
      description:
        "The pressure may be connected to approval, pride, duty, or fear of disappointing people close to you.",
    };
  }

  if (category === "Social comparison") {
    return {
      icon: "↔",
      description:
        "Other people’s timelines may be making your own path feel delayed or insufficient.",
    };
  }

  if (category === "Perfectionistic standards") {
    return {
      icon: "◎",
      description:
        "The mind may be demanding a flawless result instead of a responsible next step.",
    };
  }

  if (category === "Validation seeking") {
    return {
      icon: "★",
      description:
        "The outcome may feel tied to being respected, chosen, admired, or recognized.",
    };
  }

  if (category === "Self-worth threat") {
    return {
      icon: "◍",
      description:
        "The situation may be starting to feel like a verdict on your capability, value, or identity.",
    };
  }

  if (category === "Emotional overload") {
    return {
      icon: "!",
      description:
        "The pressure may be too mixed together right now, making it hard to think clearly.",
    };
  }

  if (category === "Depletion signs") {
    return {
      icon: "↓",
      description:
        "The pressure may include tiredness, low energy, or the need for recovery before more effort.",
    };
  }

  return {
    icon: "?",
    description:
      "The pressure is not fully clear yet. The next step is to keep separating facts, fears, and meaning.",
  };
}