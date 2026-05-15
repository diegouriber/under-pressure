"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import FlowShell from "../components/FlowShell";
import {
  analyzePressure,
  clearSession,
  getGroundedNextStep,
  getMissingReflectionSteps,
  getNotFullyControllableText,
  getOutcomeDependentText,
  loadSession,
  saveSession,
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

export default function FinalPage() {
  const [hasLoadedSession, setHasLoadedSession] = useState(false);
  const [session, setSession] = useState<UnderPressureSession | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedSession = loadSession();
    setSession(savedSession);
    setHasLoadedSession(true);
  }, []);

  const hasStartedReflection = session ? sessionHasMeaningfulData(session) : false;

  const analysis = useMemo(() => {
    if (!session || !hasStartedReflection) return null;
    return analyzePressure(session);
  }, [session, hasStartedReflection]);

  if (!hasLoadedSession) {
    return (
      <main className="min-h-screen bg-[#fdfaf4] px-6 py-10 text-[#1f1f1f]">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-[#555]">Loading reflection...</p>
        </div>
      </main>
    );
  }

  if (!session || !hasStartedReflection) {
    return (
      <main className="min-h-screen bg-[#fdfaf4] px-6 py-10 text-[#1f1f1f]">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center">
          <section className="w-full rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              No reflection found
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f] md:text-5xl">
              It looks like you have not started a reflection yet.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#555] md:text-base">
              The final page is built from your saved responses in this browser
              session. Start from the beginning so Under Pressure can help you
              name the pressure, notice what the outcome represents, separate
              what is controllable from what is not fully controllable, and
              leave with one grounded next step.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/scope"
                className="rounded-full bg-[#1f1f1f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Start reflection
              </Link>

              <Link
                href="/"
                className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
              >
                Back to home
              </Link>
            </div>

            <p className="mt-6 text-xs leading-6 text-[#777]">
              Note: your responses are saved only in this browser session. This
              tool is for evidence-informed reflection, not therapy, diagnosis,
              or crisis support.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (!analysis) {
    return (
      <main className="min-h-screen bg-[#fdfaf4] px-6 py-10 text-[#1f1f1f]">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <p className="text-sm text-[#555]">Loading reflection...</p>
        </div>
      </main>
    );
  }

  const missingSteps = getMissingReflectionSteps(session);
  const hasMissingSteps = missingSteps.length > 0;

  const groundedNextStep = getGroundedNextStep(session);
  const notFullyControllableText = getNotFullyControllableText(session);
  const outcomeDependentText = getOutcomeDependentText(session);

  const domain = detectPersonalizationDomain(session);
  const finalCopy = getFinalCopy(domain);

  const artifact = buildReflectionArtifact({
    session,
    analysis,
    groundedNextStep,
    notFullyControllableText,
    outcomeDependentText,
  });

  function updateGroundedNextStep(value: string) {
    if (!session) return;

    const nextSession: UnderPressureSession = {
      ...session,
      groundedNextStep: value,
      wiseEffortAction: value,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  function updateNotFullyControllableStatement(value: string) {
    if (!session) return;

    const nextSession: UnderPressureSession = {
      ...session,
      notFullyControllableStatement: value,
      releaseStatement: value,
    };

    setSession(nextSession);
    saveSession(nextSession);
  }

  async function copyArtifact() {
    try {
      await navigator.clipboard.writeText(artifact);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  function startNewReflection() {
    clearSession();
    window.location.assign("/");
  }

  const title = session.name
    ? `${session.name}, the pressure has more shape now.`
    : "The pressure has more shape now.";

  return (
    <FlowShell
      eyebrow="Grounded next step"
      title={title}
      description="This is the landing point of the reflection. You do not need to solve your whole life right now. The goal is to leave with one honest next move and a clearer boundary around what is not fully controllable."
      step={8}
      totalSteps={8}
    >
      <div className="space-y-8">
        <section className="rounded-[2rem] bg-[#1f1f1f] p-6 text-white shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/45">
            Grounding statement
          </p>

          <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.2] tracking-[-0.04em] md:text-4xl">
            {analysis.groundingStatement}
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            This is not meant to erase the pressure. It is meant to give your
            mind one sentence to return to when the pressure starts becoming
            bigger than the present moment.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          <LandingCard
            label="What became clearer"
            title={finalCopy.clearerTitle}
            text={finalCopy.clearerText}
          />

          <LandingCard
            label="What is yours"
            title={finalCopy.yoursTitle}
            text={finalCopy.yoursText}
          />

          <LandingCard
            label="What is not yours"
            title={finalCopy.notYoursTitle}
            text={finalCopy.notYoursText}
          />
        </section>

        {hasMissingSteps && (
          <section className="rounded-3xl border border-[#c28a2e]/20 bg-[#fff8ec] p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9a6420]">
              Gentle check
            </p>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
              A few parts could still make this reflection stronger.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#555]">
              You can still finish, but the final artifact will be clearer if
              these parts are completed:
            </p>

            <ul className="mt-4 space-y-2 text-sm leading-6 text-[#555]">
              {missingSteps.map((step) => (
                <li key={step}>- {step}</li>
              ))}
            </ul>
          </section>
        )}

        <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
            Before you write
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
            A useful reflection should end with a next move.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-[#555]">
            The next move should be concrete enough that you would know whether
            you did it. Try to include what you will do, when you will do it,
            what might pull you off course, and how you will return to the task
            in front of you.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <MiniPrompt title="Action" text="What is one concrete thing?" />
            <MiniPrompt title="Time" text="When will you do it?" />
            <MiniPrompt title="Obstacle" text="What might get in the way?" />
            <MiniPrompt title="Return" text="What will you come back to?" />
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Grounded next step
            </label>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
              What is one honest action you can take next?
            </h2>

            <textarea
              rows={8}
              value={groundedNextStep}
              onChange={(event) => updateGroundedNextStep(event.target.value)}
              placeholder={finalCopy.nextStepPlaceholder}
              className="mt-6 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </div>

          <div className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
            <label className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
              Not fully controllable
            </label>

            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#1f1f1f]">
              What can you stop trying to fully control?
            </h2>

            <textarea
              rows={8}
              value={notFullyControllableText}
              onChange={(event) =>
                updateNotFullyControllableStatement(event.target.value)
              }
              placeholder={finalCopy.notFullyControllablePlaceholder}
              className="mt-6 w-full resize-none rounded-3xl border border-[#1f1f1f]/10 bg-[#fdfaf4] p-5 text-base leading-7 text-[#1f1f1f] outline-none transition placeholder:text-[#9a8f80] focus:border-[#7a5c3a]"
            />
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                Reflection artifact
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#1f1f1f]">
                Your pressure map
              </h2>
            </div>

            <button
              type="button"
              onClick={copyArtifact}
              className="rounded-full bg-[#1f1f1f] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {copied ? "Copied" : "Copy reflection"}
            </button>
          </div>

          <pre className="mt-6 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-3xl bg-[#fdfaf4] p-5 text-sm leading-7 text-[#444]">
            {artifact}
          </pre>
        </section>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/control-map"
            className="rounded-full border border-[#1f1f1f]/20 px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#f6f1e8]"
          >
            Back to control map
          </Link>

          <button
            type="button"
            onClick={startNewReflection}
            className="rounded-full bg-[#f6f1e8] px-7 py-4 text-center text-sm font-semibold text-[#1f1f1f] transition hover:bg-[#efe4d4]"
          >
            Start a new reflection
          </button>
        </div>
      </div>
    </FlowShell>
  );
}

function LandingCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-3xl border border-[#1f1f1f]/10 bg-white p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
        {label}
      </p>

      <h2 className="mt-4 text-xl font-semibold text-[#1f1f1f]">{title}</h2>

      <p className="mt-3 text-sm leading-7 text-[#555]">{text}</p>
    </section>
  );
}

function MiniPrompt({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl bg-[#fdfaf4] p-4">
      <p className="text-sm font-semibold text-[#1f1f1f]">{title}</p>
      <p className="mt-2 text-xs leading-5 text-[#666]">{text}</p>
    </div>
  );
}

function sessionHasMeaningfulData(session: UnderPressureSession) {
  return Boolean(
    session.name.trim() ||
      session.lifeStage.trim() ||
      session.pressureDomain.trim() ||
      session.guidanceStyle.trim() ||
      session.mood.trim() ||
      session.intensity.trim() ||
      session.pressureText.trim() ||
      getOutcomeDependentText(session).trim() ||
      session.controlMap.control.trim() ||
      session.controlMap.influence.trim() ||
      session.controlMap.preparation.trim() ||
      getNotFullyControllableText(session).trim() ||
      getGroundedNextStep(session).trim()
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

function getFinalCopy(domain: PersonalizationDomain) {
  if (domain === "relationship") {
    return {
      clearerTitle: "The pressure is about care and reciprocity.",
      clearerText:
        "This is not only about whether the relationship lasts. It may also be about whether you feel loved, valued, chosen, and met with similar effort.",
      yoursTitle: "Your honesty belongs to you.",
      yoursText:
        "You can express what you feel, ask for clarity, name what you need, and notice whether the relationship feels mutual over time.",
      notYoursTitle: "Their feelings are not fully yours.",
      notYoursText:
        "You cannot fully control whether the other person feels the same way, shows love the way you hope, or has the capacity to reciprocate.",
      nextStepPlaceholder:
        "Example: This week, I will tell him honestly how I have been feeling instead of waiting to see if he notices. I will choose a calm moment to explain what I need. If I start overthinking his response, I will return to what I can control: my honesty, clarity, and self-respect.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control whether he feels the same way, whether he shows love in the way I hope, or whether he can give the reciprocity I want. I can care about him without making his response the only measure of my value.",
    };
  }

  if (domain === "family") {
    return {
      clearerTitle: "The pressure is tied to expectations.",
      clearerText:
        "Some of this is practical, and some of it may be connected to being seen as successful, capable, or worthy by people whose opinion matters.",
      yoursTitle: "Your effort belongs to you.",
      yoursText:
        "You can organize your week, act honestly, ask for help, and communicate your reality without proving your whole future at once.",
      notYoursTitle: "Their image is not fully yours.",
      notYoursText:
        "You cannot fully control other people's expectations, pride, disappointment, or interpretation of your path.",
      nextStepPlaceholder:
        "Example: This week, I will choose one concrete academic or work priority and do it well instead of trying to prove my entire future at once. I will work on it on Tuesday afternoon. If I start worrying about what people back home think, I will return to the task in front of me.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control whether people see my path exactly the way I want them to. I can care about my family and my future without treating their expectations as the only measure of my worth.",
    };
  }

  if (domain === "academic") {
    return {
      clearerTitle: "The pressure is tied to performance.",
      clearerText:
        "The academic task matters, but the result may have started to feel like proof of your capability, intelligence, or future.",
      yoursTitle: "Your preparation belongs to you.",
      yoursText:
        "You can choose the next study block, ask for help, review weak points, and protect the basics that help you think clearly.",
      notYoursTitle: "The exact result is not fully yours.",
      notYoursText:
        "You cannot fully control the grade, the questions, the curve, the evaluator, or whether one result defines your entire future.",
      nextStepPlaceholder:
        "Example: This week, I will choose one concrete study priority and complete one focused block instead of trying to solve the whole semester at once. If I start spiraling about the grade, I will return to the next topic in front of me.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control the exact grade, the exam questions, or whether one result proves everything about my future. I can take preparation seriously without turning one outcome into a verdict.",
    };
  }

  if (domain === "career") {
    return {
      clearerTitle: "The pressure is tied to direction.",
      clearerText:
        "The opportunity matters, but it may also represent progress, status, security, or proof that you are not falling behind.",
      yoursTitle: "Your professional actions belong to you.",
      yoursText:
        "You can prepare, apply, follow up, improve your materials, ask for feedback, and keep moving without making one response the verdict.",
      notYoursTitle: "The decision is not fully yours.",
      notYoursText:
        "You cannot fully control hiring decisions, timing, competition, market conditions, or whether one person chooses you.",
      nextStepPlaceholder:
        "Example: This week, I will improve one application or prepare for one interview instead of trying to prove my entire career direction at once. If I start spiraling about rejection, I will return to the next professional action I can take.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control whether they choose me, how many people apply, or whether this one opportunity defines my direction. I can act seriously without outsourcing my worth to one decision.",
    };
  }

  if (domain === "money") {
    return {
      clearerTitle: "The pressure is tied to stability.",
      clearerText:
        "The financial reality matters, and it may also be connected to safety, independence, responsibility, or fear about the future.",
      yoursTitle: "Your next practical step belongs to you.",
      yoursText:
        "You can look at the numbers, prioritize what matters first, ask for information, reduce avoidable costs, and make a realistic plan.",
      notYoursTitle: "Uncertainty is not fully yours.",
      notYoursText:
        "You cannot fully control prices, timing, emergencies, other people's decisions, or whether financial uncertainty disappears immediately.",
      nextStepPlaceholder:
        "Example: This week, I will write down the actual numbers and choose the first payment, expense, or conversation I need to handle. If I start panicking about the whole future, I will return to the next practical step.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control unexpected costs, timing, or whether stability arrives immediately. I can still take the next responsible step without treating uncertainty as personal failure.",
    };
  }

  if (domain === "comparison") {
    return {
      clearerTitle: "The pressure is tied to comparison.",
      clearerText:
        "The situation may feel heavier because other people's timelines are making your own path feel late, unclear, or not enough.",
      yoursTitle: "Your path belongs to you.",
      yoursText:
        "You can choose the next honest action, reduce comparison triggers, build evidence, and define progress by your actual situation.",
      notYoursTitle: "Other timelines are not yours.",
      notYoursText:
        "You cannot fully control other people's pace, advantages, posts, recognition, or how polished their lives look from outside.",
      nextStepPlaceholder:
        "Example: This week, I will choose one action that belongs to my actual path instead of reacting to someone else's timeline. If comparison gets loud, I will return to what I can do today.",
      notFullyControllablePlaceholder:
        "Example: I cannot fully control other people's timelines, advantages, or recognition. Their progress can be information without becoming instructions for my life.",
    };
  }

  return {
    clearerTitle: "The pressure has layers.",
    clearerText:
      "Some of this is practical. Some of it is emotional. Some of it is connected to what the outcome has started to represent.",
    yoursTitle: "Your next move can be smaller.",
    yoursText:
      "You do not need to prove your whole future. You need one action that belongs to this week, this situation, and your actual control.",
    notYoursTitle: "Not everything is fully controllable.",
    notYoursText:
      "You can act responsibly without trying to control every interpretation, outcome, timeline, or image other people hold of you.",
    nextStepPlaceholder:
      "Example: This week, I will choose one concrete next action and do it honestly instead of trying to prove everything at once. If I start spiraling about the outcome, I will return to the task in front of me.",
    notFullyControllablePlaceholder:
      "Example: I cannot fully control the final outcome, other people's reactions, or whether this situation proves everything I fear it might prove. I can act responsibly without making uncertainty the measure of my worth.",
  };
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function buildReflectionArtifact({
  session,
  analysis,
  groundedNextStep,
  notFullyControllableText,
  outcomeDependentText,
}: {
  session: UnderPressureSession;
  analysis: ReturnType<typeof analyzePressure>;
  groundedNextStep: string;
  notFullyControllableText: string;
  outcomeDependentText: string;
}) {
  const contextLines = [
    session.name ? `Name: ${session.name}` : "",
    session.lifeStage ? `Life stage: ${session.lifeStage}` : "",
    session.pressureDomain ? `Pressure domain: ${session.pressureDomain}` : "",
    session.guidanceStyle ? `Guidance style: ${session.guidanceStyle}` : "",
  ].filter(Boolean);

  const emotionalState =
    session.mood || session.intensity
      ? `${session.mood || "Not named"}${
          session.intensity ? ` · Intensity ${session.intensity}` : ""
        }`
      : "Not completed";

  return `Context:
${contextLines.length ? contextLines.join("\n") : "Not completed"}

Current emotional state:
${emotionalState}

What was weighing on me:
${session.pressureText || "Not completed"}

Detected pressure patterns:
${analysis.categories.join(", ")}

Pressure pattern summary:
${analysis.dominantPattern}

Outcome-dependent thinking:
${outcomeDependentText || "Not completed"}

Direct control:
${session.controlMap.control || "Not completed"}

Partial influence:
${session.controlMap.influence || "Not completed"}

Preparation:
${session.controlMap.preparation || "Not completed"}

Not fully controllable:
${session.controlMap.notFullyControllable || "Not completed"}

Grounded next step:
${groundedNextStep || "Not completed"}

What I am not fully controlling:
${notFullyControllableText || "Not completed"}

Grounding:
${analysis.groundingStatement}`;
}