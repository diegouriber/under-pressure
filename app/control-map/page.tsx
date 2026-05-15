"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
  getOutcomeDependentText,
  loadSession,
  saveSession,
  type ControlMap,
  type UnderPressureSession,
} from "@/lib/underPressureEngine";

type PersonalizationDomain =
  | "relationship"
  | "academic"
  | "career"
  | "money"
  | "family"
  | "comparison"
  | "general";

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

  const domain = detectPersonalizationDomain(session);
  const copy = getControlMapCopy(domain, session, analysis.controlPrompt);

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

          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
            {copy.bridgeTitle}
          </h2>

          <p className="mt-4 text-base leading-8 text-[#444]">
            {copy.bridgeText}
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-2">
          <MapField
            label="Direct control"
            title="What can you directly do?"
            description={copy.controlDescription}
            value={session.controlMap.control}
            placeholder={copy.controlPlaceholder}
            onChange={(value) => updateControlMap("control", value)}
          />

          <MapField
            label="Partial influence"
            title="What can you influence, but not guarantee?"
            description={copy.influenceDescription}
            value={session.controlMap.influence}
            placeholder={copy.influencePlaceholder}
            onChange={(value) => updateControlMap("influence", value)}
          />

          <MapField
            label="Preparation"
            title="What can you prepare for?"
            description={copy.preparationDescription}
            value={session.controlMap.preparation}
            placeholder={copy.preparationPlaceholder}
            onChange={(value) => updateControlMap("preparation", value)}
          />

          <MapField
            label="Not fully controllable"
            title="What can you stop trying to fully control?"
            description={copy.notFullyControllableDescription}
            value={session.controlMap.notFullyControllable}
            placeholder={copy.notFullyControllablePlaceholder}
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
              Add direct control and what is not fully controllable
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
        rows={8}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-5 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-sm leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
      />
    </section>
  );
}

function detectPersonalizationDomain(
  session: UnderPressureSession
): PersonalizationDomain {
  const combined = `
    ${session.pressureDomain}
    ${session.pressureText}
    ${getOutcomeDependentText(session)}
  `.toLowerCase();

  if (
    includesAny(combined, [
      "relationship",
      "boyfriend",
      "girlfriend",
      "partner",
      "dating",
      "love",
      "loved",
      "reciprocate",
      "reciprocity",
      "affection",
      "break up",
      "last long",
      "text me",
      "attention",
      "valued",
      "chosen",
    ])
  ) {
    return "relationship";
  }

  if (
    includesAny(combined, [
      "school",
      "academic",
      "exam",
      "grade",
      "university",
      "study",
      "studying",
      "assignment",
      "class",
    ])
  ) {
    return "academic";
  }

  if (
    includesAny(combined, [
      "career",
      "work",
      "job",
      "internship",
      "interview",
      "promotion",
      "boss",
      "salary",
    ])
  ) {
    return "career";
  }

  if (
    includesAny(combined, [
      "money",
      "financial",
      "rent",
      "debt",
      "income",
      "bills",
      "stability",
      "savings",
    ])
  ) {
    return "money";
  }

  if (
    includesAny(combined, [
      "family",
      "parents",
      "mother",
      "father",
      "proud",
      "disappoint",
      "expectations",
      "back home",
    ])
  ) {
    return "family";
  }

  if (
    includesAny(combined, [
      "compare",
      "comparison",
      "others",
      "peers",
      "friends",
      "timeline",
      "behind",
      "linkedin",
      "instagram",
    ])
  ) {
    return "comparison";
  }

  return "general";
}

function getControlMapCopy(
  domain: PersonalizationDomain,
  session: UnderPressureSession,
  fallbackControlPrompt: string
) {
  const outcomeText = getOutcomeDependentText(session).trim();

  if (domain === "relationship") {
    return {
      bridgeTitle: outcomeText
        ? "You named that this relationship is tied to feeling valued."
        : "This pressure seems tied to emotional reciprocity.",
      bridgeText:
        "Now separate what belongs to your side of the relationship from what cannot be forced. You can be honest, clear, and caring without being able to fully control another person's feelings, effort, or response.",
      controlDescription:
        "What is in your hands: honesty, communication, boundaries, how you express your needs, and whether you stay present instead of only guessing.",
      controlPlaceholder:
        "Example: I can control whether I tell him honestly how I have been feeling, whether I ask for clarity instead of silently testing him, and whether I express what I need without attacking him.",
      influenceDescription:
        "What you can shape, but not guarantee: the quality of the conversation, the conditions for closeness, and whether you show up clearly.",
      influencePlaceholder:
        "Example: I can influence the relationship by communicating calmly, listening to his side, creating space for an honest conversation, and noticing whether our effort feels mutual over time.",
      preparationDescription:
        "What you can prepare before reacting: your own needs, what you want to say, what patterns you have noticed, and what support you may need.",
      preparationPlaceholder:
        "Example: I can prepare by writing down what I actually need, choosing a good moment to talk, and thinking about what I would do if the conversation confirms that we want different things.",
      notFullyControllableDescription:
        "What is not fully yours: his feelings, his capacity to reciprocate, his timing, his honesty, and whether he responds exactly the way you hope.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control whether he feels the same way, whether he shows love in the way I hope, or whether he is able to give the reciprocity I want.",
    };
  }

  if (domain === "family") {
    return {
      bridgeTitle: "You named pressure around expectations and being seen well.",
      bridgeText:
        "Now separate what belongs to your effort and communication from what belongs to other people's interpretations, hopes, or expectations.",
      controlDescription:
        "What is in your hands: effort, honesty, planning, asking for help, and communicating your reality.",
      controlPlaceholder:
        "Example: I can control my effort, how I organize my week, how honestly I study or work, and whether I ask for help when I need it.",
      influenceDescription:
        "What you can shape, but not guarantee: performance, trust, communication, and how clearly others understand your situation.",
      influencePlaceholder:
        "Example: I can influence my performance by preparing well, communicating clearly, and staying consistent instead of trying to prove everything at once.",
      preparationDescription:
        "What you can prepare for: uncertainty, hard conversations, alternative plans, and moments when expectations feel heavy.",
      preparationPlaceholder:
        "Example: I can prepare for uncertainty by having a realistic plan, keeping my options open, and accepting that progress may not look perfect from the outside.",
      notFullyControllableDescription:
        "What is not fully yours: other people's expectations, pride, disappointment, interpretations, or image of your path.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control the image people have of me back home, how they interpret my path, or whether every outcome matches their expectations.",
    };
  }

  if (domain === "academic") {
    return {
      bridgeTitle: "You named academic pressure and what performance may seem to prove.",
      bridgeText:
        "Now separate the study actions you can take from the final grade, outcome, or judgment you cannot fully control.",
      controlDescription:
        "What is in your hands: study blocks, asking for help, sleep, preparation, focus, and starting the next task.",
      controlPlaceholder:
        "Example: I can control whether I study for two focused blocks, review the hardest material first, ask one question, and sleep enough before the exam.",
      influenceDescription:
        "What you can shape, but not guarantee: your performance, confidence, preparation quality, and how ready you feel.",
      influencePlaceholder:
        "Example: I can influence my performance by preparing consistently, practicing under exam conditions, and not waiting until panic forces me to act.",
      preparationDescription:
        "What you can prepare for: difficult questions, deadlines, feedback, backup plans, and what you will do if the result is not perfect.",
      preparationPlaceholder:
        "Example: I can prepare by making a realistic study plan, identifying weak topics, and deciding what support I will seek if I struggle.",
      notFullyControllableDescription:
        "What is not fully yours: the exact grade, exam difficulty, evaluator reaction, curve, timing, or whether everything goes perfectly.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control the exact grade, the questions I get, or whether one result proves my whole future.",
    };
  }

  if (domain === "career") {
    return {
      bridgeTitle: "You named career pressure and what the opportunity may represent.",
      bridgeText:
        "Now separate what you can do professionally from the decisions, timing, and approval you cannot fully control.",
      controlDescription:
        "What is in your hands: applications, preparation, follow-ups, portfolio work, networking, honesty, and consistency.",
      controlPlaceholder:
        "Example: I can control whether I improve my resume, send the application, prepare for the interview, and follow up professionally.",
      influenceDescription:
        "What you can shape, but not guarantee: how strong your application is, how clearly you communicate, and how prepared you appear.",
      influencePlaceholder:
        "Example: I can influence the outcome by preparing well, showing my work clearly, and applying consistently without treating one response as the verdict.",
      preparationDescription:
        "What you can prepare for: rejection, waiting, alternative roles, interviews, and future opportunities.",
      preparationPlaceholder:
        "Example: I can prepare by keeping other options open, practicing interview answers, and deciding what I will improve if this opportunity does not work out.",
      notFullyControllableDescription:
        "What is not fully yours: hiring decisions, timing, competition, market conditions, and whether one person chooses you.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control whether they choose me, how many people apply, or whether this one opportunity defines my direction.",
    };
  }

  if (domain === "money") {
    return {
      bridgeTitle: "You named financial pressure and the need for stability.",
      bridgeText:
        "Now separate practical money actions from uncertainty, timing, and external conditions you cannot fully control.",
      controlDescription:
        "What is in your hands: budgeting, tracking, asking for information, reducing avoidable costs, and making a plan.",
      controlPlaceholder:
        "Example: I can control whether I list my expenses, identify what must be paid first, reduce one avoidable cost, and ask for help or information early.",
      influenceDescription:
        "What you can shape, but not guarantee: income options, payment conversations, savings pace, and financial stability over time.",
      influencePlaceholder:
        "Example: I can influence my situation by applying for work, communicating early, and making decisions based on the numbers instead of panic.",
      preparationDescription:
        "What you can prepare for: due dates, backup options, emergency funds, payment plans, and difficult conversations.",
      preparationPlaceholder:
        "Example: I can prepare by writing down due dates, creating a backup plan, and deciding what I will do if money is tighter than expected.",
      notFullyControllableDescription:
        "What is not fully yours: prices, timing, other people's decisions, emergencies, markets, or unexpected expenses.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control unexpected costs, the timing of income, or whether financial uncertainty disappears immediately.",
    };
  }

  if (domain === "comparison") {
    return {
      bridgeTitle: "You named pressure around comparison and timelines.",
      bridgeText:
        "Now separate what belongs to your actual path from the race your mind may be creating with other people.",
      controlDescription:
        "What is in your hands: your next action, where you place attention, what you consume, and what standard you choose.",
      controlPlaceholder:
        "Example: I can control whether I take one useful step today, limit comparison triggers, and define progress by my actual situation.",
      influenceDescription:
        "What you can shape, but not guarantee: your growth, visibility, opportunities, and confidence over time.",
      influencePlaceholder:
        "Example: I can influence my progress by acting consistently, asking for feedback, and building evidence instead of only watching other people.",
      preparationDescription:
        "What you can prepare for: slower seasons, uncertainty, changing plans, and moments when comparison gets loud.",
      preparationPlaceholder:
        "Example: I can prepare by writing down my own timeline, choosing realistic milestones, and planning what I will do when comparison spikes.",
      notFullyControllableDescription:
        "What is not fully yours: other people's timelines, advantages, posts, recognition, or pace.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control other people's timelines, how polished their lives look, or whether my path moves at the same speed.",
    };
  }

  return {
    bridgeTitle: "The previous step named what this outcome may represent.",
    bridgeText: fallbackControlPrompt,
    controlDescription:
      "Actions, choices, routines, messages, preparation, effort, honesty, boundaries, or asking for help.",
    controlPlaceholder:
      "Example: I can control the next honest action I take, how clearly I communicate, what I prepare, and whether I ask for help when I need it.",
    influenceDescription:
      "Things you can improve your chances around, but cannot fully force into a specific result.",
    influencePlaceholder:
      "Example: I can influence the situation by preparing well, communicating clearly, and acting consistently instead of trying to force certainty.",
    preparationDescription:
      "Plans, alternatives, resources, conversations, support, study blocks, or backup options.",
    preparationPlaceholder:
      "Example: I can prepare for uncertainty by making a realistic plan, keeping options open, and deciding what I will do if the outcome is not perfect.",
    notFullyControllableDescription:
      "Other people's opinions, final outcomes, timelines, interpretations, approval, luck, or whether everything looks perfect from outside.",
    notFullyControllablePlaceholder:
      "Example: I cannot fully control the final outcome, other people's reactions, or whether this situation proves everything I fear it might prove.",
  };
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}