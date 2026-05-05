"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import FlowShell from "../components/FlowShell";
import { loadSession, updateStoredSession } from "@/lib/underPressureEngine";

const lifeStages = [
  "University student",
  "Early-career professional",
  "Working professional",
  "Founder / builder",
  "Between things",
  "Other",
];

const pressureDomains = [
  "School / academic performance",
  "Career / work",
  "Money / financial stability",
  "Family expectations",
  "Social comparison",
  "Relationships",
  "Health / energy",
  "Future uncertainty",
];

const guidanceStyles = [
  "Direct and practical",
  "Calm and grounding",
  "Reflective and deep",
  "Balanced",
];

export default function ContextPage() {
  const [name, setName] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  const [pressureDomain, setPressureDomain] = useState("");
  const [guidanceStyle, setGuidanceStyle] = useState("");

  useEffect(() => {
    const session = loadSession();

    setName(session.name || "");
    setLifeStage(session.lifeStage || "");
    setPressureDomain(session.pressureDomain || "");
    setGuidanceStyle(session.guidanceStyle || "");
  }, []);

  const canContinue = Boolean(lifeStage && pressureDomain && guidanceStyle);

  function saveContext() {
    updateStoredSession({
      name: name.trim(),
      lifeStage,
      pressureDomain,
      guidanceStyle,
    });
  }

  return (
    <FlowShell
      eyebrow="Context"
      title="Give the reflection enough context to speak to your actual life."
      description="This is not a profile or diagnosis. It is lightweight context so the prompts feel more relevant and less generic."
      step={2}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            What should we call you?
          </label>

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
            A name is optional, but it can make the reflection feel more human.
          </h2>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="mt-5 w-full rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] px-4 py-4 text-sm text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />
        </section>

        <OptionSection
          title="Current life stage / role"
          description="The same pressure can feel different depending on where you are in life."
          options={lifeStages}
          selected={lifeStage}
          onSelect={setLifeStage}
        />

        <OptionSection
          title="Main pressure domain"
          description="Choose the area that feels most active right now. You can still write about anything later."
          options={pressureDomains}
          selected={pressureDomain}
          onSelect={setPressureDomain}
        />

        <OptionSection
          title="Preferred guidance style"
          description="This changes the tone of the reflection, not the safety boundaries."
          options={guidanceStyles}
          selected={guidanceStyle}
          onSelect={setGuidanceStyle}
        />

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Why this matters
          </p>

          <p className="mt-3 text-sm leading-7 text-[#555]">
            Context keeps the tool from giving generic advice. It helps later
            prompts speak to the kind of pressure you are actually carrying:
            academic, career, family, financial, social, relational, health, or
            future uncertainty.
          </p>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          {canContinue ? (
            <Link
              href="/check-in"
              onClick={saveContext}
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
              Choose context to continue
            </button>
          )}

          <Link
            href="/scope"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back
          </Link>
        </div>
      </div>
    </FlowShell>
  );
}

function OptionSection({
  title,
  description,
  options,
  selected,
  onSelect,
}: {
  title: string;
  description: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
        {title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-[#555]">{description}</p>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition ${
                isSelected
                  ? "border-[#1f1f1f] bg-[#1f1f1f] text-white"
                  : "border-[#1f1f1f]/10 bg-[#f6f1e8] text-[#1f1f1f] hover:bg-white"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </section>
  );
}