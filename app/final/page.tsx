"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
  clearSession,
  hasMinimumReflection,
  loadSession,
  saveSession,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function FinalPage() {
  const [session, setSession] = useState<UnderPressureSession | null>(null);
  const [copied, setCopied] = useState(false);

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
  const completeEnough = hasMinimumReflection(session);
  const finalReflection = buildFinalReflection(
    session,
    analysis.groundingStatement
  );

  function updateSession(updates: Partial<UnderPressureSession>) {
    if (!session) return;

    const nextSession = {
      ...session,
      ...updates,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  async function copyReflection() {
    await navigator.clipboard.writeText(finalReflection);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function resetReflection() {
    clearSession();
    window.location.href = "/";
  }

  const title = session.name
    ? `${session.name}, leave with direction.`
    : "Leave with direction.";

  return (
    <FlowShell
      eyebrow="Final wise effort plan"
      title={title}
      description="This is the final step: one grounded action, one release statement, and a reflection summary you can copy or keep."
      step={8}
      totalSteps={8}
    >
      <div className="space-y-8">
        {!completeEnough && (
          <section className="rounded-3xl border border-[#b54747]/20 bg-[#fff6f4] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b54747]">
              ⚠️ Incomplete reflection
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
              Some reflection steps are incomplete.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#555]">
              The final summary works best after completing the pressure,
              attachment, control, and release sections. You can still finish
              here, but some parts may be missing.
            </p>
          </section>
        )}

        <section className="rounded-3xl bg-[#1f1f1f] p-6 text-white md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            Your grounding statement
          </p>

          <h2 className="mt-4 text-2xl font-semibold leading-10">
            {analysis.groundingStatement}
          </h2>

          <p className="mt-5 text-sm leading-7 text-white/70">
            Material reality matters. Effort matters. Preparation matters. But
            not every outcome is fully yours to command.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-2">
          <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Wise effort action
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
              What is one grounded action you can take this week?
            </h2>

            <textarea
              rows={6}
              value={session.wiseEffortAction}
              onChange={(event) =>
                updateSession({ wiseEffortAction: event.target.value })
              }
              placeholder={buildWiseEffortPlaceholder(session)}
              className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </section>

          <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Release statement
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
              What can you stop treating as fully yours to control?
            </h2>

            <textarea
              rows={6}
              value={session.releaseStatement}
              onChange={(event) =>
                updateSession({ releaseStatement: event.target.value })
              }
              placeholder={buildReleasePlaceholder(session)}
              className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </section>
        </div>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Final direction
          </p>

          <p className="mt-4 text-lg leading-8 text-[#3f3f3f]">
            The goal is not to stop caring. The goal is to act with direction
            while refusing to let uncertain outcomes become the full measure of
            your peace, worth, or identity.
          </p>
        </section>

        <section>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Reflection summary
          </p>

          <div className="grid gap-4">
            <SummaryCard
              title="Context"
              content={buildContextSummary(session)}
              alwaysShow
            />

            <SummaryCard
              title="Current emotional state"
              content={`${session.mood || "Not selected"} · Intensity ${
                session.intensity || "not selected"
              }`}
              alwaysShow
            />

            <SummaryCard
              title="Pressure pattern"
              content={analysis.dominantPattern}
              alwaysShow
            />

            <SummaryCard
              title="What was weighing on me"
              content={session.pressureText}
            />

            <SummaryCard
              title="Outcome I felt attached to"
              content={session.attachmentText}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <SummaryCard
                title="What I can control"
                content={session.controlMap.control}
              />

              <SummaryCard
                title="What I can influence"
                content={session.controlMap.influence}
              />

              <SummaryCard
                title="What I can prepare for"
                content={session.controlMap.preparation}
              />

              <SummaryCard
                title="What I need to release"
                content={session.controlMap.release}
              />
            </div>

            <SummaryCard
              title="Wise effort action"
              content={session.wiseEffortAction}
            />

            <SummaryCard
              title="Release statement"
              content={session.releaseStatement}
            />
          </div>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={copyReflection}
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            {copied ? "Copied reflection" : "Copy reflection"}
          </button>

          <Link
            href="/control-map"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back to control map
          </Link>

          <button
            type="button"
            onClick={resetReflection}
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Start new reflection
          </button>
        </div>
      </div>
    </FlowShell>
  );
}

function SummaryCard({
  title,
  content,
  alwaysShow = false,
}: {
  title: string;
  content?: string;
  alwaysShow?: boolean;
}) {
  const cleanContent = content?.trim();

  if (!alwaysShow && !cleanContent) return null;

  return (
    <div className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {title}
      </p>

      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#444]">
        {cleanContent || "This part has not been completed yet."}
      </p>
    </div>
  );
}

function buildContextSummary(session: UnderPressureSession) {
  const parts = [];

  if (session.name) parts.push(`Name: ${session.name}`);
  if (session.lifeStage) parts.push(`Life stage: ${session.lifeStage}`);
  if (session.pressureDomain) {
    parts.push(`Pressure domain: ${session.pressureDomain}`);
  }
  if (session.guidanceStyle) {
    parts.push(`Guidance style: ${session.guidanceStyle}`);
  }

  if (parts.length === 0) return "No context selected.";

  return parts.join("\n");
}

function buildWiseEffortPlaceholder(session: UnderPressureSession) {
  if (session.pressureDomain === "Family expectations") {
    return "Example: I will choose one concrete priority this week and do it well instead of trying to prove my entire future at once.";
  }

  if (session.pressureDomain === "School / academic performance") {
    return "Example: I will complete two focused study blocks, review the hardest topic first, and ask for help where I am stuck.";
  }

  if (session.pressureDomain === "Career / work") {
    return "Example: I will improve my CV, apply to two roles, and ask one person for advice without treating the result as a verdict on my future.";
  }

  if (session.pressureDomain === "Money / financial stability") {
    return "Example: I will review my numbers, make one realistic weekly budget, and identify one action that improves my financial position.";
  }

  return "Example: I will take one concrete action this week that improves my position without demanding certainty from the outcome.";
}

function buildReleasePlaceholder(session: UnderPressureSession) {
  if (session.pressureDomain === "Family expectations") {
    return "Example: I release the need to perform perfectly for the image people have of me. Their expectations can matter without becoming the only measure of my worth.";
  }

  if (session.pressureDomain === "School / academic performance") {
    return "Example: I release the idea that one grade decides my intelligence, future, or worth.";
  }

  if (session.pressureDomain === "Career / work") {
    return "Example: I release the idea that one rejection, delay, or opportunity decides whether my career will work out.";
  }

  if (session.pressureDomain === "Money / financial stability") {
    return "Example: I release the idea that financial uncertainty means I am unsafe, incapable, or failing as a person.";
  }

  return "Example: I release the idea that this one outcome decides my worth, my future, or whether I am falling behind in life.";
}

function buildFinalReflection(
  session: UnderPressureSession,
  groundingStatement: string
) {
  const sections = [
    ["Context", buildContextSummary(session)],
    [
      "Current emotional state",
      `${session.mood || "Not selected"} · Intensity ${
        session.intensity || "not selected"
      }`,
    ],
    ["What was weighing on me", session.pressureText],
    ["Outcome I felt attached to", session.attachmentText],
    ["What I can control", session.controlMap.control],
    ["What I can influence", session.controlMap.influence],
    ["What I can prepare for", session.controlMap.preparation],
    ["What I need to release", session.controlMap.release],
    ["Wise effort action", session.wiseEffortAction],
    ["Release statement", session.releaseStatement],
    ["Grounding", groundingStatement],
  ];

  return sections
    .filter(([, value]) => value && value.trim().length > 0)
    .map(([label, value]) => `${label}:\n${value}`)
    .join("\n\n");
}