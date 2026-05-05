"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  loadSession,
  saveSession,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

type SessionWithOutcome = UnderPressureSession & {
  outcomeText?: string;
};

export default function AttachmentPage() {
  const [session, setSession] = useState<SessionWithOutcome | null>(null);

  useEffect(() => {
    setSession(loadSession() as SessionWithOutcome);
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

  const outcomeText = session.outcomeText ?? "";
  const canContinue = outcomeText.trim().length >= 20;

  function updateOutcomeText(nextText: string) {
    if (!session) return;

    const nextSession: SessionWithOutcome = {
      ...session,
      outcomeText: nextText,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const title = session.name
    ? `${session.name}, what has this outcome started to mean?`
    : "What has this outcome started to mean?";

  const prompt = buildOutcomePrompt(session);
  const placeholder = buildPlaceholder(session);

  return (
    <FlowShell
      eyebrow="Outcome-dependent thinking"
      title={title}
      description="This step explores whether a specific result has started to feel like proof of your worth, safety, success, direction, or identity."
      step={6}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-[#1f1f1f] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
            Reflection prompt
          </p>

          <h2 className="mt-4 text-2xl font-semibold leading-10 tracking-[-0.03em]">
            {prompt}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            The goal is not to stop caring about the outcome. The goal is to
            notice when the outcome starts carrying more emotional meaning than
            it should.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <GuideCard
            label="Question 1"
            title="What result feels loaded?"
            text="Name the specific outcome that feels emotionally heavy: a grade, job, response, approval, deadline, performance, or future result."
          />

          <GuideCard
            label="Question 2"
            title="What would success prove?"
            text="Notice what you hope the outcome would prove about you: that you are capable, respected, safe, on track, or worthy."
          />

          <GuideCard
            label="Question 3"
            title="What would failure seem to mean?"
            text="Notice the painful story attached to not getting the result: disappointing others, falling behind, losing identity, or not being enough."
          />
        </section>

        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Your reflection
              </label>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
                Write what the outcome has started to represent.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#666]">
              Focus on meaning, not just the result itself.
            </p>
          </div>

          <textarea
            rows={9}
            value={outcomeText}
            onChange={(event) => updateOutcomeText(event.target.value)}
            placeholder={placeholder}
            className="mt-6 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />

          <p className="mt-3 text-xs leading-5 text-[#777]">
            Write at least a few sentences. The control map works better when
            the emotional meaning of the outcome is clear.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this step matters
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            Pressure becomes heavier when a result starts feeling like a verdict
            on your worth, future, or identity. Naming that link creates
            distance. You can still care about the outcome without letting it
            become the only measure of who you are.
          </p>
        </section>

        <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Next reflection
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
            Separate what you can control from what you cannot fully control.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#555]">
            Once the emotional meaning is clearer, the next step is to map the
            pressure into direct control, partial influence, preparation, and
            what is not fully controllable.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/control-map"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue to control map
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
            href="/summary"
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
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {label}
      </p>

      <h2 className="mt-4 text-xl font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-3 text-sm leading-7 text-[#555]">{text}</p>
    </section>
  );
}

function buildOutcomePrompt(session: SessionWithOutcome) {
  const domain = session.pressureDomain;

  if (domain === "School / academic performance") {
    return "What academic result feels emotionally loaded, and what would it seem to prove about your capability, future, or worth?";
  }

  if (domain === "Career / work") {
    return "What career or work outcome feels emotionally loaded, and what would it seem to prove about your direction or value?";
  }

  if (domain === "Money / financial stability") {
    return "What financial outcome feels emotionally loaded, and what would it seem to prove about your safety, stability, or future?";
  }

  if (domain === "Family expectations") {
    return "What outcome feels connected to making your family proud, and what would it seem to mean if you struggled or fell short?";
  }

  if (domain === "Social comparison") {
    return "What result feels connected to keeping up with others, and what would it seem to mean if your timeline looked different?";
  }

  return "What outcome feels emotionally loaded, and what would it seem to prove about you if it went well or badly?";
}

function buildPlaceholder(session: SessionWithOutcome) {
  const domain = session.pressureDomain;

  if (domain === "Family expectations") {
    return "Example: The outcome that feels emotionally loaded is being seen as successful and making my family proud. If I perform well, it would prove that this opportunity was worth it and that everyone was right to believe in me. If I fail or struggle, I fear it will seem like I wasted the chance I was given.";
  }

  if (domain === "School / academic performance") {
    return "Example: The outcome that feels emotionally loaded is my grade or academic performance. If I do well, it would prove that I am capable and on track. If I do badly, I fear it will mean I am not as smart or prepared as I should be.";
  }

  if (domain === "Career / work") {
    return "Example: The outcome that feels emotionally loaded is getting the right job, internship, promotion, or opportunity. If it works out, it would prove that I am moving forward. If it does not, I fear it means I am falling behind.";
  }

  return "Example: The outcome that feels emotionally loaded is this specific result. If it goes well, it would seem to prove something important about me. If it goes badly, I fear it would mean something painful about my future, capability, or worth.";
}