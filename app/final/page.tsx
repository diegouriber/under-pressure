"use client";

import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
  clearSession,
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

  if (!session) return null;

  const analysis = analyzePressure(session);

  const updateSession = (updates: Partial<UnderPressureSession>) => {
    const next = { ...session, ...updates };
    setSession(next);
    saveSession(next);
  };

  const finalReflection = buildFinalReflection(session, analysis.groundingStatement);

  const copyReflection = async () => {
    await navigator.clipboard.writeText(finalReflection);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const reset = () => {
    clearSession();
    window.location.href = "/";
  };

  return (
    <FlowShell
      step={7}
      eyebrow="Wise effort plan"
      title="Leave with direction, not fixation."
      description="You do not need to solve your whole future today. The goal is to leave with one responsible action and one thing you are willing to stop carrying as if it were fully yours to control."
    >
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Wise effort action
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            Choose one grounded action for this week.
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
            Name what you cannot keep treating as fully controllable.
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
          Your grounding statement
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

      <div className="mt-10 rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
          Reflection summary
        </p>

        <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#fdfaf4] p-5 text-sm leading-7 text-[#444]">
          {finalReflection}
        </pre>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          type="button"
          onClick={copyReflection}
          className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          {copied ? "Copied" : "Copy my reflection"}
        </button>

        <button
          type="button"
          onClick={reset}
          className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-[#f6f1e8]"
        >
          Start new reflection
        </button>

        <a
          href="/control-map"
          className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-[#f6f1e8]"
        >
          Back
        </a>
      </div>
    </FlowShell>
  );
}

function buildFinalReflection(
  session: UnderPressureSession,
  groundingStatement: string
) {
  return `UNDER PRESSURE REFLECTION

Current emotional state:
${session.mood || "Not selected"} · Intensity ${session.intensity || "Not selected"}

What was weighing on me:
${session.pressureText || "Not written"}

Outcome I felt attached to:
${session.attachmentText || "Not written"}

What I can control:
${session.controlMap.control || "Not written"}

What I can influence:
${session.controlMap.influence || "Not written"}

What I can prepare for:
${session.controlMap.preparation || "Not written"}

What I need to release:
${session.controlMap.release || "Not written"}

Wise effort action:
${session.wiseEffortAction || "Not written"}

Release statement:
${session.releaseStatement || "Not written"}

Grounding:
${groundingStatement}`;
}