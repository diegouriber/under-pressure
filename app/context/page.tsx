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

const genders = [
  "Male",
  "Female",
  "Non-binary",
  "Prefer not to say",
  "Other",
];

export default function ContextPage() {
  const [name, setName] = useState("");
  const [lifeStage, setLifeStage] = useState("");
  const [pressureDomain, setPressureDomain] = useState("");
  const [guidanceStyle, setGuidanceStyle] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const session = loadSession();

    setName(session.name || "");
    setLifeStage(session.lifeStage || "");
    setPressureDomain(session.pressureDomain || "");
    setGuidanceStyle(session.guidanceStyle || "");
    setGender(session.gender || "");
  }, []);

  function saveContext() {
    updateStoredSession({
      name: name.trim(),
      lifeStage,
      pressureDomain,
      guidanceStyle,
      gender,
    });
  }

  return (
    <FlowShell
      eyebrow="Context"
      title="Give this reflection a little context."
      description="This helps the guidance respond to your actual pressure, not a generic version of it. Keep it light. The goal is relevance, not a full profile."
      step={2}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
          <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            What should we call you?
          </label>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            A name makes the reflection feel more personal.
          </p>

          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="mt-5 w-full rounded-2xl border border-[#1f1f1f]/10 bg-[#fdfaf4] px-4 py-4 text-sm text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
          />
        </section>

        <OptionSection
          title="Current life stage / role"
          description="Pressure feels different depending on where you are standing."
          options={lifeStages}
          selected={lifeStage}
          onSelect={setLifeStage}
        />

        <OptionSection
          title="Main pressure domain"
          description="Choose the area that feels most active right now."
          options={pressureDomains}
          selected={pressureDomain}
          onSelect={setPressureDomain}
        />

        <OptionSection
          title="Preferred guidance style"
          description="This shapes the tone of the reflection."
          options={guidanceStyles}
          selected={guidanceStyle}
          onSelect={setGuidanceStyle}
        />

        <OptionSection
          title="Optional identity context"
          description="Skip this if it does not feel relevant."
          options={genders}
          selected={gender}
          onSelect={setGender}
        />

        <div className="rounded-3xl bg-[#f6f1e8] p-6">
          <h2 className="font-semibold text-[#1f1f1f]">Why this matters</h2>

          <p className="mt-3 text-sm leading-6 text-[#555]">
            The same pressure can feel different for a student, a founder, a
            worker, or someone between things. This context helps the reflection
            stay practical, grounded, and specific.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/check-in"
            onClick={saveContext}
            className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Continue
          </Link>

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
    <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-[#555]">{description}</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
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