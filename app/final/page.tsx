"use client";

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
      <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
        <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center px-6 py-16">
          <p>Loading reflection...</p>
        </section>
      </main>
    );
  }

  const analysis = analyzePressure(session);
  const completeEnough = hasMinimumReflection(session);

  function updateSession(updates: Partial<UnderPressureSession>) {
    if (!session) return;

    const nextSession = {
      ...session,
      ...updates,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const finalReflection = buildFinalReflection(
    session,
    analysis.groundingStatement
  );

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

  return (
    <FlowShell
      step={7}
      eyebrow="Wise effort plan"
      title="Leave with direction, not fixation."
      description="This is the closing point of the reflection: one responsible action, one thing to release, and one grounding statement to carry forward."
    >
      {!completeEnough && (
        <div className="mt-10 rounded-3xl border border-[#d6a33a]/30 bg-[#fff7df] p-6">
          <div className="flex gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h2 className="font-semibold">Some reflection steps are incomplete.</h2>
              <p className="mt-2 text-sm leading-6 text-[#66552b]">
                The final summary works best after completing the pressure,
                attachment, control, and release sections. You can still finish
                here, but some parts may be missing.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Wise effort action
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            What is one grounded action you can take this week?
          </h2>

          <textarea
            rows={6}
            value={session.wiseEffortAction}
            onChange={(event) =>
              updateSession({ wiseEffortAction: event.target.value })
            }
            placeholder="Example: I will apply to two roles, ask one person for advice, make a clear budget, study for one focused block, or have one honest conversation."
            className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />
        </div>

        <div className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Release statement
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            What can you stop treating as fully yours to control?
          </h2>

          <textarea
            rows={6}
            value={session.releaseStatement}
            onChange={(event) =>
              updateSession({ releaseStatement: event.target.value })
            }
            placeholder="Example: I release the idea that this one result decides my worth, my future, or whether I am falling behind in life."
            className="mt-5 w-full resize-none rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-4 text-sm leading-6 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
          Grounding statement
        </p>

        <p className="mt-4 text-2xl font-semibold leading-10 text-[#2f2f2f]">
          {analysis.groundingStatement}
        </p>

        <p className="mt-5 text-base leading-7 text-[#555]">
          Material reality matters. Effort matters. Preparation matters. But not
          every outcome is fully yours to command. The work is to act with
          direction while refusing to let uncertainty become self-destruction.
        </p>
      </div>

      <div className="mt-10">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
          Reflection summary
        </p>

        <div className="grid gap-4">
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
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={copyReflection}
          className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied reflection" : "Copy reflection"}
        </button>

        <a
          href="/control-map"
          className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-[#f6f1e8]"
        >
          Back to control map
        </a>

        <button
          type="button"
          onClick={resetReflection}
          className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-[#f6f1e8]"
        >
          Start new reflection
        </button>
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

function buildFinalReflection(
  session: UnderPressureSession,
  groundingStatement: string
) {
  const sections = [
    ["Current emotional state", `${session.mood || "Not selected"} · Intensity ${session.intensity || "not selected"}`],
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