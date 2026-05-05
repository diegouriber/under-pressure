"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  loadSession,
  saveSession,
  type ControlMap,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function ControlMapPage() {
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

  function updateControlMap(field: keyof ControlMap, value: string) {
    if (!session) return;

    const nextSession = {
      ...session,
      controlMap: {
        ...session.controlMap,
        [field]: value,
      },
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const canContinue = Boolean(
    session.controlMap.control.trim().length >= 5 &&
      session.controlMap.release.trim().length >= 5
  );

  const title = session.name
    ? `${session.name}, separate effort from fixation.`
    : "Separate effort from fixation.";

  const prompts = buildControlPrompts(session);

  return (
    <FlowShell
      eyebrow="Control map"
      title={title}
      description="Pressure becomes clearer when you stop treating everything as equally controllable. Some things require action. Some require preparation. Some require acceptance."
      step={7}
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
                  Control map
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <MapQuadrant label="Control" active />
                  <MapQuadrant label="Influence" active />
                  <MapQuadrant label="Preparation" />
                  <MapQuadrant label="Release" />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                Wise effort principle
              </p>

              <h2 className="mt-4 text-2xl font-semibold leading-10 tracking-[-0.03em]">
                Act where you have responsibility. Release where you do not have
                control.
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/70">
                This is not passivity. It is focused effort without emotional
                self-destruction.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <ControlTextArea
            icon="▣"
            label="Control"
            title="What can you directly do?"
            helper="Your behavior, preparation, effort, schedule, honesty, and next action."
            value={session.controlMap.control}
            placeholder={prompts.control}
            onChange={(value) => updateControlMap("control", value)}
          />

          <ControlTextArea
            icon="↔"
            label="Influence"
            title="What can you improve but not guarantee?"
            helper="Performance, relationships, opportunities, communication, and reputation."
            value={session.controlMap.influence}
            placeholder={prompts.influence}
            onChange={(value) => updateControlMap("influence", value)}
          />

          <ControlTextArea
            icon="◇"
            label="Preparation"
            title="What can you prepare for?"
            helper="Plans, backup options, conversations, skills, savings, or study systems."
            value={session.controlMap.preparation}
            placeholder={prompts.preparation}
            onChange={(value) => updateControlMap("preparation", value)}
          />

          <ControlTextArea
            icon="↓"
            label="Release"
            title="What is outside your control?"
            helper="Other people’s reactions, final decisions, timing, luck, comparison, and the past."
            value={session.controlMap.release}
            placeholder={prompts.release}
            onChange={(value) => updateControlMap("release", value)}
          />
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1f1f1f] text-xl text-white">
              →
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Under Pressure principle
              </p>

              <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
                Wise effort means acting where you have responsibility without
                demanding that life guarantees the result. You are allowed to
                care. You are not required to collapse if the outcome remains
                uncertain.
              </p>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/final"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Finish with direction
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-[#1f1f1f]/40 px-7 py-4 text-center text-sm font-semibold text-white"
            >
              Complete control and release to continue
            </button>
          )}

          <Link
            href="/attachment"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}

function MapQuadrant({
  label,
  active = false,
}: {
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-[#e7c987]/40 bg-[#e7c987]/15"
          : "border-white/10 bg-white/[0.06]"
      }`}
    >
      <div
        className={`mb-3 h-3 w-3 rounded-full ${
          active ? "bg-[#e7c987]" : "bg-white/25"
        }`}
      />

      <p className="text-sm font-medium text-white/80">{label}</p>
    </div>
  );
}

function ControlTextArea({
  icon,
  label,
  title,
  helper,
  value,
  placeholder,
  onChange,
}: {
  icon: string;
  label: string;
  title: string;
  helper: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl text-[#1f1f1f]">
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            {label}
          </p>

          <h2 className="mt-2 text-xl font-semibold text-[#1f1f1f]">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#666]">{helper}</p>
        </div>
      </div>

      <textarea
        rows={6}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
      />
    </div>
  );
}

function buildControlPrompts(session: UnderPressureSession) {
  const domain = session.pressureDomain;

  if (domain === "Family expectations") {
    return {
      control:
        "Example: I can control my effort, honesty, consistency, and how I communicate what I am realistically carrying.",
      influence:
        "Example: I can influence how my family understands my path by communicating clearly, but I cannot fully control their expectations.",
      preparation:
        "Example: I can prepare for difficult conversations, uncertainty, and the possibility that my path may not look perfect from the outside.",
      release:
        "Example: I need to release the idea that I must constantly live up to the perfect image people have of me.",
    };
  }

  if (domain === "School / academic performance") {
    return {
      control:
        "Example: I can control my study blocks, my revision plan, my sleep, and whether I ask questions early.",
      influence:
        "Example: I can influence my performance through preparation, but I cannot guarantee the exact grade.",
      preparation:
        "Example: I can prepare for exams, feedback, deadlines, and backup plans if one result is not ideal.",
      release:
        "Example: I need to release the idea that one grade decides my intelligence, future, or worth.",
    };
  }

  if (domain === "Career / work") {
    return {
      control:
        "Example: I can control applications, preparation, follow-ups, skill-building, and how I show up at work.",
      influence:
        "Example: I can influence interviews, performance, reputation, and opportunities, but I cannot guarantee every decision.",
      preparation:
        "Example: I can prepare a stronger CV, backup options, conversations, and a realistic plan for uncertainty.",
      release:
        "Example: I need to release the idea that one rejection or delay defines my career path.",
    };
  }

  if (domain === "Money / financial stability") {
    return {
      control:
        "Example: I can control my spending plan, savings target, income search, and how directly I face the numbers.",
      influence:
        "Example: I can influence my financial stability through planning and action, but I cannot control every external cost or opportunity.",
      preparation:
        "Example: I can prepare a budget, emergency plan, backup income option, or conversation about support.",
      release:
        "Example: I need to release the idea that financial uncertainty means I am failing as a person.",
    };
  }

  if (domain === "Social comparison") {
    return {
      control:
        "Example: I can control how much I expose myself to comparison and what actions I take on my own path.",
      influence:
        "Example: I can influence my progress by staying consistent, but I cannot control other people’s timelines.",
      preparation:
        "Example: I can prepare my next step without needing it to look impressive to others.",
      release:
        "Example: I need to release the idea that other people’s speed is the correct measure of my life.",
    };
  }

  return {
    control:
      "Example: My effort, my schedule, my next honest action, my communication, my preparation.",
    influence:
      "Example: Performance, relationships, reputation, opportunities, confidence, how clearly I show up.",
    preparation:
      "Example: A backup plan, a second application, a conversation, a savings target, a study plan.",
    release:
      "Example: Other people’s timelines, the final decision, the economy, luck, timing, comparison.",
  };
}