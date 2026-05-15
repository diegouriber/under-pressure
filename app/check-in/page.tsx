"use client";

import Link from "next/link";
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

const levels = [
  {
    value: "1",
    label: "Light",
  },
  {
    value: "2",
    label: "Noticeable",
  },
  {
    value: "3",
    label: "Moderate",
  },
  {
    value: "4",
    label: "Heavy",
  },
  {
    value: "5",
    label: "Very heavy",
  },
];

export default function CheckInPage() {
  const [session, setSession] = useState<UnderPressureSession | null>(null);

  useEffect(() => {
    const existingSession = loadSession();
    setSession(existingSession);
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

  const selectedLevel = levels.find(
    (level) => level.value === session.intensity
  );

  const title = session.name
    ? `${session.name}, before naming the pressure, notice where you are.`
    : "Before naming the pressure, notice where you are.";

  return (
    <FlowShell
      eyebrow="Emotional check-in"
      title={title}
      description="Do not judge the feeling. Just name the starting point. Pressure becomes easier to work with when it is specific."
      step={3}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            How are you feeling right now?
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
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
        </section>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            How intense does the pressure feel?
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-5">
            {levels.map((level) => {
              const selected = session.intensity === level.value;

              return (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => updateSession({ intensity: level.value })}
                  className={`rounded-2xl border px-3 py-4 text-center transition ${
                    selected
                      ? "border-[#1f1f1f] bg-[#1f1f1f] text-white"
                      : "border-[#1f1f1f]/10 bg-[#f6f1e8] text-[#1f1f1f] hover:bg-white"
                  }`}
                >
                  <span className="block text-base font-semibold">
                    {level.value}
                  </span>

                  <span
                    className={`mt-1 block text-xs leading-5 ${
                      selected ? "text-white/75" : "text-[#666]"
                    }`}
                  >
                    {level.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl bg-[#f6f1e8] p-6">
          <h2 className="font-semibold text-[#1f1f1f]">Your current state</h2>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            Right now, you feel{" "}
            <span className="font-semibold text-[#1f1f1f]">
              {session.mood || "not selected yet"}
            </span>
            , with pressure intensity{" "}
            <span className="font-semibold text-[#1f1f1f]">
              {selectedLevel
                ? `${selectedLevel.value} — ${selectedLevel.label}`
                : "not selected yet"}
            </span>
            .
          </p>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            {session.name
              ? `${session.name}, this does not define you. It only gives us the starting point for the reflection.`
              : "This does not define you. It only gives us the starting point for the reflection."}
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/pressure"
              className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Continue
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-[#1f1f1f]/40 px-7 py-4 text-center text-sm font-semibold text-white"
            >
              Select mood and intensity to continue
            </button>
          )}

          <Link
            href="/context"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}