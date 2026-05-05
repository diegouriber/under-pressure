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

        <section className="overflow-hidden rounded-[2rem] bg-[#1f1f1f] text-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[280px] bg-[#151515] p-6 md:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
              <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-[#c9a66b]/20" />

              <div className="relative z-10">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                  Final artifact
                </p>

                <div className="mt-8 space-y-4">
                  <FinalNode number="1" label="Grounding" active />
                  <FinalNode number="2" label="Wise effort" active />
                  <FinalNode number="3" label="Release" active />
                  <FinalNode number="4" label="Direction" />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
                Your grounding statement
              </p>

              <h2 className="mt-4 text-3xl font-semibold leading-10 tracking-[-0.04em]">
                {analysis.groundingStatement}
              </h2>

              <p className="mt-6 text-sm leading-7 text-white/70">
                Material reality matters. Effort matters. Preparation matters.
                But not every outcome is fully yours to command.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl text-[#1f1f1f]">
              ▣
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Wise effort action
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
              What is one grounded action you can take this week?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#666]">
              Choose an action that improves your position without demanding
              certainty from the outcome.
            </p>

            <textarea
              rows={6}
              value={session.wiseEffortAction}
              onChange={(event) =>
                updateSession({ wiseEffortAction: event.target.value })
              }
              placeholder={buildWiseEffortPlaceholder(session)}
              className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </div>

          <div className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f1e8] text-xl text-[#1f1f1f]">
              ↓
            </div>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Release statement
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
              What can you stop treating as fully yours to control?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#666]">
              This is the emotional weight you are practicing not carrying as a
              verdict on yourself.
            </p>

            <textarea
              rows={6}
              value={session.releaseStatement}
              onChange={(event) =>
                updateSession({ releaseStatement: event.target.value })
              }
              placeholder={buildReleasePlaceholder(session)}
              className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Final direction
              </p>

              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-10 tracking-[-0.04em] text-[#1f1f1f]">
                Care about the outcome. Do not let it become the full measure of
                your life.
              </h2>
            </div>

            <div className="rounded-3xl bg-[#f6f1e8] p-5 md:max-w-xs">
              <p className="text-sm leading-7 text-[#555]">
                The goal is not to stop caring. The goal is to act with
                direction while refusing to let uncertainty own your peace,
                worth, or identity.
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-[2rem] border border-[#1f1f1f]/10 bg-white shadow-sm">
          <div className="border-b border-[#1f1f1f]/10 bg-[#f6f1e8] p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                  Reflection artifact
                </p>

                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
                  Your pressure map summary
                </h2>
              </div>

              <button
                type="button"
                onClick={copyReflection}
                className="rounded-full bg-[#1f1f1f] px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                {copied ? "Copied reflection" : "Copy reflection"}
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid gap-4">
              <ArtifactCard
                title="Context"
                content={buildContextSummary(session)}
                alwaysShow
              />

              <ArtifactCard
                title="Current emotional state"
                content={`${session.mood || "Not selected"} · Intensity ${
                  session.intensity || "not selected"
                }`}
                alwaysShow
              />

              <ArtifactCard
                title="Detected pressure pattern"
                content={analysis.dominantPattern}
                alwaysShow
                featured
              />

              <ArtifactCard
                title="What was weighing on me"
                content={session.pressureText}
              />

              <ArtifactCard
                title="Outcome I felt attached to"
                content={session.attachmentText}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <ArtifactCard
                  title="What I can control"
                  content={session.controlMap.control}
                />

                <ArtifactCard
                  title="What I can influence"
                  content={session.controlMap.influence}
                />

                <ArtifactCard
                  title="What I can prepare for"
                  content={session.controlMap.preparation}
                />

                <ArtifactCard
                  title="What I need to release"
                  content={session.controlMap.release}
                />
              </div>

              <ArtifactCard
                title="Wise effort action"
                content={session.wiseEffortAction}
              />

              <ArtifactCard
                title="Release statement"
                content={session.releaseStatement}
              />

              <ArtifactCard
                title="Grounding"
                content={analysis.groundingStatement}
                alwaysShow
                featured
              />
            </div>
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

function FinalNode({
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

function ArtifactCard({
  title,
  content,
  alwaysShow = false,
  featured = false,
}: {
  title: string;
  content?: string;
  alwaysShow?: boolean;
  featured?: boolean;
}) {
  const cleanContent = content?.trim();

  if (!alwaysShow && !cleanContent) return null;

  return (
    <div
      className={`rounded-3xl border p-6 ${
        featured
          ? "border-[#1f1f1f]/10 bg-[#1f1f1f] text-white"
          : "border-[#1f1f1f]/10 bg-[#fdfaf4] text-[#1f1f1f]"
      }`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          featured ? "text-white/45" : "text-[#7a5c3a]"
        }`}
      >
        {title}
      </p>

      <p
        className={`mt-3 whitespace-pre-wrap text-sm leading-7 ${
          featured ? "text-white/75" : "text-[#444]"
        }`}
      >
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