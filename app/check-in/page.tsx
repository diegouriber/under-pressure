"use client";

import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  loadSession,
  saveSession,
  type Mood,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

const moods: Mood[] = [
  "Overwhelmed",
  "Anxious",
  "Numb",
  "Tired",
  "Restless",
  "Okay, but pressured",
];

const levels = ["1", "2", "3", "4", "5"];

export default function CheckInPage() {
  const [session, setSession] = useState<UnderPressureSession | null>(null);

  useEffect(() => {
    const existingSession = loadSession();
    setSession(existingSession);
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

  function updateSession(updates: Partial<UnderPressureSession>) {
    if (!session) return;

    const nextSession = {
      ...session,
      ...updates,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const canContinue = Boolean(session.mood && session.intensity);

  return (
    <FlowShell
      step={2}
      eyebrow="Emotional check-in"
      title="Before naming the pressure, notice where you are."
      description="This is not about judging your emotional state. It is about slowing down enough to see it clearly."
    >
      <div className="mt-10">
        <h2 className="text-xl font-semibold">How are you feeling right now?</h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {moods.map((mood) => {
            const selected = session.mood === mood;

            return (
              <button
                key={mood}
                type="button"
                onClick={() => updateSession({ mood })}
                className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition ${
                  selected
                    ? "border-[#1f1f1f] bg-[#1f1f1f] text-white"
                    : "border-[#1f1f1f]/10 bg-[#f6f1e8] text-[#1f1f1f] hover:bg-white"
                }`}
              >
                {mood}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold">
          How intense does the pressure feel?
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {levels.map((level) => {
            const selected = session.intensity === level;

            return (
              <button
                key={level}
                type="button"
                onClick={() => updateSession({ intensity: level })}
                className={`rounded-2xl border px-5 py-4 text-center text-sm font-semibold transition ${
                  selected
                    ? "border-[#1f1f1f] bg-[#1f1f1f] text-white"
                    : "border-[#1f1f1f]/10 bg-[#f6f1e8] text-[#1f1f1f] hover:bg-white"
                }`}
              >
                {level}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex justify-between text-xs text-[#666]">
          <span>Manageable</span>
          <span>Very heavy</span>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6">
        <h2 className="font-semibold">Your current state</h2>

        <p className="mt-3 text-sm leading-6 text-[#555]">
          Right now, you feel{" "}
          <span className="font-semibold text-[#1f1f1f]">
            {session.mood || "not selected yet"}
          </span>
          , with pressure intensity{" "}
          <span className="font-semibold text-[#1f1f1f]">
            {session.intensity || "not selected yet"}
          </span>
          .
        </p>

        <p className="mt-3 text-sm leading-6 text-[#555]">
          This does not define you. It only gives us the starting point for the
          reflection.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {canContinue ? (
          <a
            href="/pressure"
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Continue
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-full bg-[#1f1f1f]/30 px-7 py-4 text-center text-sm font-semibold text-white"
          >
            Select mood and intensity to continue
          </button>
        )}

        <a
          href="/scope"
          className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold transition hover:bg-[#f6f1e8]"
        >
          Back
        </a>
      </div>
    </FlowShell>
  );
}