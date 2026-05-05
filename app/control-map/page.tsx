"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
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

  const analysis = useMemo(() => {
    if (!session) return null;
    return analyzePressure(session);
  }, [session]);

  if (!session || !analysis) {
    return (
      <main className="min-h-screen bg-[#fdfaf4] px-6 py-10 text-[#1f1f1f]">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-[#555]">Loading reflection...</p>
        </div>
      </main>
    );
  }

  const canContinue =
    session.controlMap.control.trim().length >= 5 &&
    session.controlMap.notFullyControllable.trim().length >= 5;

  function updateControlMap(field: keyof ControlMap, value: string) {
    if (!session) return;

    const nextControlMap: ControlMap = {
      ...session.controlMap,
      [field]: value,
    };

    if (field === "notFullyControllable") {
      nextControlMap.release = value;
    }

    if (field === "release") {
      nextControlMap.notFullyControllable = value;
    }

    const nextSession: UnderPressureSession = {
      ...session,
      controlMap: nextControlMap,
      notFullyControllableStatement:
        field === "notFullyControllable" || field === "release"
          ? value
          : session.notFullyControllableStatement,
      releaseStatement:
        field === "notFullyControllable" || field === "release"
          ? value
          : session.releaseStatement,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  return (
    <FlowShell
      eyebrow="Control map"
      title="Separate what is yours from what is not fully yours."
      description="This step turns pressure into structure. Not everything is controllable, but not everything is helpless either."
      step={7}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-[#1f1f1f] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
            Reflection frame
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.2] tracking-[-0.04em] md:text-4xl">
            The goal is not to control everything. The goal is to respond where
            response is possible.
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            Pressure becomes heavier when everything feels equally urgent,
            equally personal, and equally controllable. This map separates the
            pressure into four different kinds of responsibility.
          </p>
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            What the previous step noticed
          </p>

          <p className="mt-4 text-base leading-8 text-[#444]">
            {analysis.controlPrompt}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <MapField
            label="Direct control"
            title="What can you directly do?"
            description="Actions, choices, routines, messages, preparation, effort, honesty, boundaries, or asking for help."
            value={session.controlMap.control}
            placeholder="Example: I can control my effort, how I organize my week, how honestly I study and work, and whether I ask for help when I need it."
            onChange={(value) => updateControlMap("control", value)}
          />

          <MapField
            label="Partial influence"
            title="What can you influence, but not guarantee?"
            description="Things you can improve your chances around, but cannot fully force into a specific result."
            value={session.controlMap.influence}
            placeholder="Example: I can influence my performance by preparing well, communicating clearly, and staying consistent instead of trying to prove everything at once."
            onChange={(value) => updateControlMap("influence", value)}
          />

          <MapField
            label="Preparation"
            title="What can you prepare for?"
            description="Plans, alternatives, resources, conversations, financial buffers, study blocks, or backup options."
            value={session.controlMap.preparation}
            placeholder="Example: I can prepare for uncertainty by having a realistic plan, keeping my options open, saving money where I can, and accepting that progress may not look perfect from the outside."
            onChange={(value) => updateControlMap("preparation", value)}
          />

          <MapField
            label="Not fully controllable"
            title="What can you stop trying to fully control?"
            description="Other people’s opinions, final outcomes, timelines, interpretations, approval, luck, or whether everything looks perfect from outside."
            value={session.controlMap.notFullyControllable}
            placeholder="Example: I cannot fully control the image people have of me back home, how they interpret my path, or whether every outcome matches their expectations."
            onChange={(value) =>
              updateControlMap("notFullyControllable", value)
            }
          />
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this step matters
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            This map helps prevent two common traps: trying to control
            everything, or deciding nothing can be done. The middle ground is
            clearer: act where action helps, prepare where preparation helps,
            influence what you can, and stop treating the uncontrollable as a
            personal failure.
          </p>
        </section>

        <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Next reflection
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
            Turn the map into one grounded next step.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#555]">
            The final page will help you choose one concrete action and one
            thing you are no longer trying to fully control.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/final"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue to grounded next step
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-[#1f1f1f]/40 px-7 py-4 text-center text-sm font-semibold text-white"
            >
              Complete direct control and not fully controllable
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

function MapField({
  label,
  title,
  description,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  title: string;
  description: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {label}
      </p>

      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#666]">{description}</p>

      <textarea
        rows={7}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-5 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-sm leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
      />
    </section>
  );
}