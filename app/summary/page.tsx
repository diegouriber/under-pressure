"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
  loadSession,
  type PressureCategory,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

export default function SummaryPage() {
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

  const analysis = analyzePressure(session);

  const title = session.name
    ? `${session.name}, your pressure may not be one thing.`
    : "Your pressure may not be one thing.";

  return (
    <FlowShell
      eyebrow="Pressure pattern summary"
      title={title}
      description="This is not a diagnosis. It is a structured reflection based on what you wrote, your emotional check-in, and the context you gave."
      step={5}
      totalSteps={8}
    >
      <div className="space-y-8">
        {analysis.severeDistressFlag && (
          <section className="rounded-3xl border border-[#b54747]/20 bg-[#fff6f4] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#b54747]">
              ⚠️ Immediate support
            </p>

            <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
              This sounds heavier than a reflection tool should hold alone.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#555]">
              If you might hurt yourself or feel in immediate danger, contact
              emergency services, a crisis line, or a trusted person now. This
              app can support reflection, but it is not crisis care.
            </p>
          </section>
        )}

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Detected pressure patterns
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {analysis.categories.map((category) => (
              <PressureChip key={category} category={category} />
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-[#f6f1e8] p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Reflective interpretation
          </p>

          <h2 className="mt-3 text-2xl font-semibold leading-9 text-[#1f1f1f]">
            {analysis.dominantPattern}
          </h2>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          <LayerCard
            label="Layer 1"
            title="Material reality"
            content={analysis.materialReality}
          />

          <LayerCard
            label="Layer 2"
            title="Inner effect"
            content={analysis.innerEffect}
          />

          <LayerCard
            label="Layer 3"
            title="Outcome attachment"
            content={analysis.attachmentInsight}
          />
        </div>

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            What this means
          </p>

          <p className="mt-4 text-base leading-8 text-[#444]">
            The point is not to stop caring. The point is to care with more
            separation. One part of the pressure may require effort. Another
            part may require preparation. Another part may need to be released
            because it is asking you to control what no person can fully
            control.
          </p>
        </section>

        <section className="rounded-3xl bg-[#1f1f1f] p-6 text-white md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/55">
            Next reflection
          </p>

          <h2 className="mt-3 text-2xl font-semibold">
            What outcome are you attached to?
          </h2>

          <p className="mt-3 text-sm leading-7 text-white/70">
            The next step is to name the result you feel you need before you are
            allowed to feel okay. This is where pressure usually becomes
            personal.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/attachment"
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore the attachment
          </Link>

          <Link
            href="/pressure"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}

function PressureChip({ category }: { category: PressureCategory }) {
  return (
    <span className="rounded-full border border-[#1f1f1f]/10 bg-[#f6f1e8] px-4 py-2 text-sm font-medium text-[#1f1f1f]">
      {category}
    </span>
  );
}

function LayerCard({
  label,
  title,
  content,
}: {
  label: string;
  title: string;
  content: string;
}) {
  return (
    <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {label}
      </p>

      <h2 className="mt-3 text-xl font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-4 text-sm leading-7 text-[#555]">{content}</p>
    </section>
  );
}