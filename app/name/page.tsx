"use client";

import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  loadSession,
  saveSession,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function NamePage() {
  const [session, setSession] = useState<UnderPressureSession | null>(null);

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

  function updateName(name: string) {
    if (!session) return;

    const nextSession = {
      ...session,
      name,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  const cleanName = session.name.trim();
  const canContinue = cleanName.length >= 2;

  return (
    <FlowShell
      step={1}
      eyebrow="Personalize the reflection"
      title="What should we call you during this reflection?"
      description="This helps the experience feel less like a form and more like a guided conversation with yourself."
    >
      <div className="mt-10">
        <label
          htmlFor="name"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]"
        >
          Your name
        </label>

        <input
          id="name"
          type="text"
          value={session.name}
          onChange={(event) => updateName(event.target.value)}
          placeholder="Example: Diego"
          className="mt-4 w-full rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
        />
      </div>

      <div className="mt-8 rounded-3xl border border-[#1f1f1f]/10 bg-white p-6">
        <h2 className="font-semibold">
          {cleanName ? `Good. We’ll call you ${cleanName}.` : "Why we ask"}
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#555]">
          Under Pressure is not trying to diagnose you or tell you who you are.
          The name simply makes the guidance feel more direct and personal as we
          move through the reflection.
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        {canContinue ? (
          <a
            href="/check-in"
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
            Enter your name to continue
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