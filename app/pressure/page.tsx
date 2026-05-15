"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  loadSession,
  saveSession,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function PressurePage() {
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

  function updatePressureText(pressureText: string) {
    if (!session) return;

    const nextSession = {
      ...session,
      pressureText,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const canContinue = session.pressureText.trim().length >= 20;

  const title = session.name
    ? `${session.name}, name the pressure clearly.`
    : "Name the pressure clearly.";

  const contextLine = buildContextLine(session);
  const prompt = buildPressurePrompt(session);
  const placeholder = buildPlaceholder(session);

  return (
    <FlowShell
      eyebrow="Name the pressure"
      title={title}
      description="This step separates the situation from the meaning attached to it. Start with what is happening, then name what you fear it means."
      step={4}
      totalSteps={8}
    >
      <div className="space-y-8">
        {contextLine && (
          <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Your context
            </p>

            <p className="mt-3 text-sm leading-7 text-[#555]">
              {contextLine}
            </p>
          </section>
        )}

        <section className="rounded-[2rem] bg-[#1f1f1f] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
            Reflection prompt
          </p>

          <h2 className="mt-4 text-2xl font-semibold leading-10 tracking-[-0.03em]">
            {prompt}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            The goal is not to write perfectly. The goal is to make the pressure
            specific enough to examine.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this step matters
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
            Pressure gets clearer when facts and fears are separated.
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            Stress is shaped not only by what happens, but also by how we
            interpret what happens and whether we believe we can respond. This
            step helps separate the situation from the meaning attached to it
            before the reflection becomes too vague.
          </p>
        </section>

        <section>
          <div className="mb-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Before writing
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
              Separate the facts from the fear.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <GuideCard
              icon="□"
              title="Write the facts"
              text="What is actually happening? Focus on the situation, deadline, responsibility, conversation, decision, or uncertainty."
            />

            <GuideCard
              icon="○"
              title="Write the fear"
              text="What are you afraid this situation means about your future, capability, stability, relationships, or self-worth?"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div>
            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Your reflection
            </label>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
              Put the pressure into words.
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#666]">
              Start with the facts. Then write the fear underneath them.
            </p>
          </div>

          <textarea
            rows={9}
            value={session.pressureText}
            onChange={(event) => updatePressureText(event.target.value)}
            placeholder={placeholder}
            className="mt-6 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />

          <p className="mt-3 text-xs leading-5 text-[#777]">
            Write at least a few sentences. The summary works better when the
            pressure has enough detail.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/summary"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Generate pressure summary
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-[#1f1f1f]/40 px-7 py-4 text-center text-sm font-semibold text-white"
            >
              Write a little more to continue
            </button>
          )}

          <Link
            href="/check-in"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}

function GuideCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl text-[#1f1f1f]">
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-3 text-sm leading-7 text-[#555]">{text}</p>
    </section>
  );
}

function buildContextLine(session: UnderPressureSession) {
  const parts = [];

  if (session.lifeStage) {
    parts.push(`life stage: ${session.lifeStage}`);
  }

  if (session.pressureDomain) {
    parts.push(`main pressure domain: ${session.pressureDomain}`);
  }

  if (session.guidanceStyle) {
    parts.push(`guidance style: ${session.guidanceStyle}`);
  }

  if (parts.length === 0) return "";

  return `For this reflection, we are reading your pressure through this context — ${parts.join(
    " · "
  )}.`;
}

function buildPressurePrompt(session: UnderPressureSession) {
  const domain = session.pressureDomain;

  if (domain === "School / academic performance") {
    return "What academic pressure is most active, and what are you afraid it says about you?";
  }

  if (domain === "Career / work") {
    return "What career or work pressure is most active, and what are you afraid it means?";
  }

  if (domain === "Money / financial stability") {
    return "What financial pressure feels real, and what fear is attached to it?";
  }

  if (domain === "Family expectations") {
    return "What expectation from family or home feels heavy, and what are you afraid it would mean to disappoint it?";
  }

  if (domain === "Social comparison") {
    return "Where are you comparing your timeline to someone else’s, and what fear does that create?";
  }

  if (domain === "Relationships") {
    return "What relationship pressure is affecting you, and what are you afraid it means?";
  }

  if (domain === "Health / energy") {
    return "What pressure is showing up through your body, energy, or routine?";
  }

  if (domain === "Future uncertainty") {
    return "What unknown future outcome is your mind trying to solve too early?";
  }

  return "What pressure has been weighing on you, and what are you afraid it means?";
}

function buildPlaceholder(session: UnderPressureSession) {
  const domain = session.pressureDomain;

  if (domain === "School / academic performance") {
    return "Example: The fact is that I have exams and grades that matter. The fear is that if I do not perform well, it means I am not capable or that my future is at risk.";
  }

  if (domain === "Career / work") {
    return "Example: The fact is that I am uncertain about my career progress. The fear is that every delay or rejection means I am falling behind or not good enough.";
  }

  if (domain === "Money / financial stability") {
    return "Example: The fact is that money feels tight or uncertain. The fear is that this means I am unsafe, unstable, or failing to build the life I need.";
  }

  if (domain === "Family expectations") {
    return "Example: The fact is that my family expects a lot from me. The fear is that if I struggle or fail, it will mean I disappointed them or was never as capable as they believed.";
  }

  if (domain === "Social comparison") {
    return "Example: The fact is that I see other people moving faster. The fear is that their progress means I am behind, late, or less successful.";
  }

  if (domain === "Relationships") {
    return "Example: The fact is that this relationship feels uncertain or unbalanced. The fear is that if the other person does not show the same effort, it means I am not valued, not chosen, or more invested than they are.";
  }

  return "Example: The fact is that I am facing a real pressure. The fear is that if this does not work out, it means something painful about my future, capability, or worth.";
}