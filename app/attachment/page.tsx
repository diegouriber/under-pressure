"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  loadSession,
  saveSession,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function AttachmentPage() {
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

  function updateAttachmentText(attachmentText: string) {
    if (!session) return;

    const nextSession = {
      ...session,
      attachmentText,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const canContinue = session.attachmentText.trim().length >= 15;

  const title = session.name
    ? `${session.name}, what result has become emotionally loaded?`
    : "What result has become emotionally loaded?";

  const prompt = buildAttachmentPrompt(session);
  const placeholder = buildAttachmentPlaceholder(session);

  return (
    <FlowShell
      eyebrow="Outcome-dependent thinking"
      title={title}
      description="This step looks at when a result becomes tied to self-worth, safety, approval, or identity. The goal is not to stop caring. The goal is to notice what the outcome has started to represent."
      step={6}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2rem] bg-[#1f1f1f] text-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[260px] bg-[#151515] p-6 md:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#c9a66b]/20" />

              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                  Outcome meaning map
                </p>

                <div className="mt-8 space-y-4">
                  <AttachmentNode number="1" label="Success meaning" active />
                  <AttachmentNode number="2" label="Failure meaning" active />
                  <AttachmentNode number="3" label="Loaded outcome" />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                Reflection prompt
              </p>

              <h2 className="mt-4 text-2xl font-semibold leading-10 tracking-[-0.03em]">
                {prompt}
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70">
                Sometimes the outcome is not the only thing we want. We want
                what the outcome would seem to prove.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <InsightCard
            icon="▣"
            title="What would success prove?"
            text="Would it prove that you are capable, secure, respected, chosen, successful, mature, or finally on track?"
          />

          <InsightCard
            icon="◍"
            title="What would failure seem to mean?"
            text="Would it feel like delay, embarrassment, rejection, instability, disappointing others, or being left behind?"
          />
        </section>

        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Outcome-dependent thinking
              </label>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
                Name the result and what it represents.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-6 text-[#666]">
              Write the outcome, then write what success or failure would seem
              to prove.
            </p>
          </div>

          <textarea
            rows={9}
            value={session.attachmentText}
            onChange={(event) => updateAttachmentText(event.target.value)}
            placeholder={placeholder}
            className="mt-6 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <CueChip text="What do I need to happen?" />
            <CueChip text="What would it prove?" />
            <CueChip text="What would failure mean?" />
          </div>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this step matters
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            This step looks for outcome-dependent thinking: moments where a
            result starts acting like proof of your worth, safety, success, or
            direction. Naming that link helps you notice the thought without
            automatically treating it as fact.
          </p>
        </section>

        <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Keep the distinction clear
          </p>

          <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
            The app is not asking you to stop wanting the result. It is asking
            you to notice when the result starts deciding too much about your
            emotional state or self-worth.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/control-map"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Build my control map
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

function AttachmentNode({
  number,
  label,
  active,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
          active ? "bg-[#e7c987] text-[#1f1f1f]" : "bg-white/15 text-white"
        }`}
      >
        {number}
      </div>

      <p className="text-sm font-medium text-white/80">{label}</p>
    </div>
  );
}

function CueChip({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-[#f6f1e8] px-4 py-2 text-xs font-semibold text-[#7a5c3a]">
      {text}
    </span>
  );
}

function InsightCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl text-[#1f1f1f]">
        {icon}
      </div>

      <h2 className="mt-5 text-xl font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-3 text-sm leading-7 text-[#555]">{text}</p>
    </div>
  );
}

function buildAttachmentPrompt(session: UnderPressureSession) {
  const domain = session.pressureDomain;

  if (domain === "School / academic performance") {
    return "What grade, result, acceptance, or academic proof has started to feel like a verdict?";
  }

  if (domain === "Career / work") {
    return "What career result feels like it would prove you are finally on track?";
  }

  if (domain === "Money / financial stability") {
    return "What financial outcome feels necessary before you can feel safe?";
  }

  if (domain === "Family expectations") {
    return "What result would make you feel like you have not disappointed the people who expect a lot from you?";
  }

  if (domain === "Social comparison") {
    return "What result would make you feel like you are no longer behind other people?";
  }

  if (domain === "Relationships") {
    return "What relationship outcome feels like it would prove you are wanted, chosen, or secure?";
  }

  if (domain === "Health / energy") {
    return "What change in your body, energy, or routine feels necessary before you can feel okay?";
  }

  if (domain === "Future uncertainty") {
    return "What future outcome are you trying to guarantee before you allow yourself to breathe?";
  }

  return "What outcome feels like it needs to happen before you can feel okay?";
}

function buildAttachmentPlaceholder(session: UnderPressureSession) {
  const domain = session.pressureDomain;

  if (domain === "Family expectations") {
    return "Example: I feel attached to being seen as successful and making my family proud. If I perform well, it would prove that their expectations were right. If I struggle, I fear it will seem like I disappointed everyone who believed in me.";
  }

  if (domain === "School / academic performance") {
    return "Example: I feel attached to getting excellent grades because it would prove I am capable and on track. If I do not perform well, I fear it will mean I am falling behind or not good enough.";
  }

  if (domain === "Career / work") {
    return "Example: I feel attached to getting a strong job or career result because it would prove I am moving forward. If it does not happen, I fear it means I am behind or not as capable as I thought.";
  }

  if (domain === "Money / financial stability") {
    return "Example: I feel attached to reaching financial stability because it would make me feel safe. If I do not get there soon, I fear it means I am unstable, irresponsible, or at risk.";
  }

  if (domain === "Social comparison") {
    return "Example: I feel attached to catching up with people around me. If I do not reach a certain level soon, I fear it means I am behind in life.";
  }

  return "Example: I feel attached to this outcome because it would prove that I am capable, secure, respected, or on track. If it does not happen, I fear it will mean something painful about me or my future.";
}