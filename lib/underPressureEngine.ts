export type Mood =
  | "Anxious"
  | "Overwhelmed"
  | "Tense / restless"
  | "Numb / disconnected"
  | "Tired / depleted"
  | "Frustrated"
  | "Okay, but pressured"
  | "Numb"
  | "Tired"
  | "Restless"
  | "";

export type PressureCategory =
  | "Practical stressor"
  | "Future uncertainty"
  | "Family / expectation pressure"
  | "Social comparison"
  | "Perfectionistic standards"
  | "Validation seeking"
  | "Self-worth threat"
  | "Emotional overload"
  | "Depletion signs"
  | "Unclear or mixed pressure";

export type ControlMap = {
  control: string;
  influence: string;
  preparation: string;
  release: string;
};

export type UnderPressureSession = {
  name: string;
  mood: Mood;
  intensity: string;
  pressureText: string;
  attachmentText: string;
  controlMap: ControlMap;
  wiseEffortAction: string;
  releaseStatement: string;

  lifeStage: string;
  pressureDomain: string;
  guidanceStyle: string;
  gender: string;

  createdAt?: string;
  updatedAt?: string;
};

export type PressureAnalysis = {
  categories: PressureCategory[];
  dominantPattern: string;
  practicalLayer: string;
  innerEffect: string;
  outcomeDependentInsight: string;
  controlPrompt: string;
  groundingStatement: string;
  severeDistressFlag: boolean;

  // Legacy aliases so older pages do not break while we update the app in batches.
  materialReality: string;
  attachmentInsight: string;
};

const STORAGE_KEY = "under-pressure-session-v2";

const LEGACY_STORAGE_KEYS = [
  "under-pressure-session",
  "under-pressure-session-v1",
  "under-pressure-session-v2",
];

export function getEmptySession(): UnderPressureSession {
  return {
    name: "",
    mood: "",
    intensity: "",
    pressureText: "",
    attachmentText: "",
    controlMap: {
      control: "",
      influence: "",
      preparation: "",
      release: "",
    },
    wiseEffortAction: "",
    releaseStatement: "",

    lifeStage: "",
    pressureDomain: "",
    guidanceStyle: "",
    gender: "",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function saveSession(session: UnderPressureSession) {
  if (typeof window === "undefined") return;

  const nextSession: UnderPressureSession = {
    ...session,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSession));
}

export function loadSession(): UnderPressureSession {
  if (typeof window === "undefined") return getEmptySession();

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return getEmptySession();

  try {
    const parsed = JSON.parse(raw) as Partial<UnderPressureSession>;
    const empty = getEmptySession();

    return {
      ...empty,
      ...parsed,
      name: parsed.name || "",
      mood: parsed.mood || "",
      intensity: parsed.intensity || "",
      pressureText: parsed.pressureText || "",
      attachmentText: parsed.attachmentText || "",
      wiseEffortAction: parsed.wiseEffortAction || "",
      releaseStatement: parsed.releaseStatement || "",
      lifeStage: parsed.lifeStage || "",
      pressureDomain: parsed.pressureDomain || "",
      guidanceStyle: parsed.guidanceStyle || "",
      gender: parsed.gender || "",
      controlMap: {
        ...empty.controlMap,
        ...(parsed.controlMap || {}),
      },
      createdAt: parsed.createdAt || empty.createdAt,
      updatedAt: parsed.updatedAt || empty.updatedAt,
    };
  } catch {
    return getEmptySession();
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;

  LEGACY_STORAGE_KEYS.forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

export function updateStoredSession(
  updates: Partial<UnderPressureSession>
): UnderPressureSession {
  const current = loadSession();

  const next: UnderPressureSession = {
    ...current,
    ...updates,
    controlMap: {
      ...current.controlMap,
      ...(updates.controlMap || {}),
    },
    updatedAt: new Date().toISOString(),
  };

  saveSession(next);
  return next;
}

export function getMissingReflectionSteps(session: UnderPressureSession) {
  const missing: string[] = [];

  if (!session.mood || !session.intensity) {
    missing.push("Emotional check-in");
  }

  if (session.pressureText.trim().length < 20) {
    missing.push("Name the pressure");
  }

  if (session.attachmentText.trim().length < 15) {
    missing.push("Outcome-dependent thinking");
  }

  if (session.controlMap.control.trim().length < 5) {
    missing.push("What you can directly control");
  }

  if (session.controlMap.release.trim().length < 5) {
    missing.push("What is not fully controllable");
  }

  return missing;
}

export function hasMinimumReflection(session: UnderPressureSession) {
  return getMissingReflectionSteps(session).length === 0;
}

function includesAny(text: string, words: string[]) {
  const normalized = text.toLowerCase();
  return words.some((word) => normalized.includes(word));
}

function addCategory(
  categories: PressureCategory[],
  category: PressureCategory
) {
  if (!categories.includes(category)) {
    categories.push(category);
  }
}

export function analyzePressure(session: UnderPressureSession): PressureAnalysis {
  const combined =
    `${session.pressureText} ${session.attachmentText} ${session.pressureDomain} ${session.mood}`.toLowerCase();

  const categories: PressureCategory[] = [];

  if (
    includesAny(combined, [
      "money",
      "rent",
      "salary",
      "job",
      "work",
      "internship",
      "career",
      "housing",
      "debt",
      "financial",
      "income",
      "bills",
      "grades",
      "school",
      "university",
      "exam",
      "academic",
      "performance",
      "health",
      "energy",
      "relationship",
      "deadline",
      "responsibility",
    ])
  ) {
    addCategory(categories, "Practical stressor");
  }

  if (
    includesAny(combined, [
      "future",
      "uncertain",
      "uncertainty",
      "what if",
      "later",
      "behind",
      "stability",
      "secure",
      "security",
      "falling",
      "timeline",
      "tomorrow",
      "next",
      "guarantee",
    ])
  ) {
    addCategory(categories, "Future uncertainty");
  }

  if (
    includesAny(combined, [
      "family",
      "parents",
      "mother",
      "father",
      "disappoint",
      "expectations",
      "proud",
      "pressure from home",
      "back home",
      "approval from family",
    ])
  ) {
    addCategory(categories, "Family / expectation pressure");
  }

  if (
    includesAny(combined, [
      "everyone",
      "others",
      "friends",
      "peers",
      "linkedin",
      "instagram",
      "compare",
      "comparison",
      "people my age",
      "classmates",
      "social comparison",
      "behind others",
    ])
  ) {
    addCategory(categories, "Social comparison");
  }

  if (
    includesAny(combined, [
      "perfect",
      "failure",
      "mistake",
      "not enough",
      "best",
      "top",
      "perform",
      "performance",
      "flawless",
      "everything right",
      "high standards",
    ])
  ) {
    addCategory(categories, "Perfectionistic standards");
  }

  if (
    includesAny(combined, [
      "approval",
      "respect",
      "status",
      "image",
      "seen",
      "recognized",
      "chosen",
      "validated",
      "validation",
      "admired",
      "impress",
      "prove to them",
    ])
  ) {
    addCategory(categories, "Validation seeking");
  }

  if (
    includesAny(combined, [
      "worth",
      "identity",
      "loser",
      "failure",
      "who i am",
      "something wrong with me",
      "prove",
      "means about me",
      "good enough",
      "not capable",
      "verdict",
      "behind in life",
    ])
  ) {
    addCategory(categories, "Self-worth threat");
  }

  if (
    includesAny(combined, [
      "overwhelmed",
      "spiral",
      "spiraling",
      "panic",
      "anxious",
      "numb",
      "heavy",
      "cannot think",
      "too much",
      "restless",
      "tense",
      "frustrated",
    ])
  ) {
    addCategory(categories, "Emotional overload");
  }

  if (
    includesAny(combined, [
      "burned out",
      "burnout",
      "exhausted",
      "tired",
      "drained",
      "empty",
      "no energy",
      "depleted",
      "can't keep going",
      "cant keep going",
    ])
  ) {
    addCategory(categories, "Depletion signs");
  }

  const severeDistressFlag = includesAny(combined, [
    "suicide",
    "kill myself",
    "end my life",
    "hurt myself",
    "self harm",
    "self-harm",
    "i don't want to live",
    "dont want to live",
    "can't go on",
    "cant go on",
  ]);

  if (categories.length === 0) {
    categories.push("Unclear or mixed pressure");
  }

  const practicalLayer = buildPracticalLayer(categories, session);
  const outcomeDependentInsight = buildOutcomeDependentInsight(
    categories,
    session
  );

  return {
    categories,
    dominantPattern: buildDominantPattern(categories, session),
    practicalLayer,
    innerEffect: buildInnerEffect(categories, session),
    outcomeDependentInsight,
    controlPrompt: buildControlPrompt(categories, session),
    groundingStatement: buildGroundingStatement(categories, session),
    severeDistressFlag,

    materialReality: practicalLayer,
    attachmentInsight: outcomeDependentInsight,
  };
}

function buildDominantPattern(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  const name = session.name ? `${session.name}, ` : "";
  const lifeStage = session.lifeStage
    ? `as someone in the ${session.lifeStage.toLowerCase()} stage, `
    : "";

  if (
    categories.includes("Practical stressor") &&
    categories.includes("Self-worth threat")
  ) {
    return `${name}${lifeStage}the pressure seems to have two layers: a real practical demand, and a deeper fear about what the outcome might say about you. The situation may need action, but the emotional weight seems to come from treating the result like a verdict.`;
  }

  if (
    categories.includes("Social comparison") &&
    categories.includes("Future uncertainty")
  ) {
    return `${name}${lifeStage}the pressure seems connected to comparison and uncertainty. Other people’s timelines may be making your own path feel delayed, even if your next step still has room to unfold.`;
  }

  if (
    categories.includes("Family / expectation pressure") &&
    categories.includes("Validation seeking")
  ) {
    return `${name}${lifeStage}the pressure seems tied to being seen as successful, capable, or acceptable by people whose opinion matters to you. The external expectation may have become an internal demand.`;
  }

  if (categories.includes("Depletion signs")) {
    return `${name}${lifeStage}the pressure may not only be about motivation. There are signs of depletion, which means the next step should include recovery and pacing, not just more effort.`;
  }

  if (session.intensity === "5") {
    return `${name}the pressure feels very heavy right now. Before solving the whole situation, the first task is to make the pressure more specific and separate what is happening from what it seems to mean.`;
  }

  return `${name}${lifeStage}the pressure appears to be layered. One part may be practical, one part emotional, and one part connected to the meaning you are attaching to the outcome.`;
}

function buildPracticalLayer(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  const domain = session.pressureDomain
    ? `Your selected pressure domain is ${session.pressureDomain.toLowerCase()}. `
    : "";

  if (categories.includes("Practical stressor")) {
    return `${domain}There is a practical layer here: school, work, money, health, relationships, deadlines, or responsibility may require real action. The goal is not to ignore that reality. The goal is to face it clearly without turning it into a full verdict on your future or worth.`;
  }

  if (categories.includes("Future uncertainty")) {
    return `${domain}The practical issue may not be immediate collapse, but uncertainty about what could happen later. That uncertainty deserves preparation, but it does not need to be treated as proof that the worst outcome is already happening.`;
  }

  return `${domain}The practical layer is not fully clear yet. That does not make the pressure fake. It means the first task is to separate facts from fears.`;
}

function buildInnerEffect(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (categories.includes("Self-worth threat")) {
    return "The pressure seems to be entering the inner self as a verdict. If this does not work out, it may feel like it means something painful about your capability, future, or value. That is where pressure becomes heavier than the original problem.";
  }

  if (categories.includes("Social comparison")) {
    return "The pressure seems to be entering through comparison. Other people’s timelines may be making your own life feel delayed, even if their path is not the correct measure of yours.";
  }

  if (categories.includes("Perfectionistic standards")) {
    return "The pressure seems to be entering as a demand for a flawless result. Instead of asking what is good enough for the next step, the mind may be demanding proof that nothing can go wrong.";
  }

  if (session.mood === "Numb / disconnected" || session.mood === "Numb") {
    return "The pressure may have become so constant that your system is protecting itself by going distant or numb. That does not mean you do not care. It can mean you have been carrying too much without enough space to process it.";
  }

  if (session.guidanceStyle === "Calm and grounding") {
    return "The pressure seems to be making uncertainty feel bigger than the present moment. The task is to return to what is real, name what can be acted on, and stop treating every unknown as an emergency.";
  }

  return "The pressure seems to be affecting your inner state by making uncertainty feel personal. The situation is not only asking for action; it is asking for emotional separation from the meaning attached to it.";
}

function buildOutcomeDependentInsight(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (!session.attachmentText.trim()) {
    return "The outcome-dependent layer is not named yet. The next question is: what result do you feel needs to happen before you are allowed to feel okay?";
  }

  if (categories.includes("Validation seeking")) {
    return "You may not only want the outcome itself. You may want the recognition, respect, or approval that you believe the outcome would give you.";
  }

  if (categories.includes("Future uncertainty")) {
    return "The attachment may be to certainty itself: the need to know that things will work out before you allow yourself to breathe.";
  }

  if (categories.includes("Family / expectation pressure")) {
    return "The outcome may feel tied to being acceptable in the eyes of family or people whose opinion carries emotional weight.";
  }

  if (categories.includes("Self-worth threat")) {
    return "The outcome seems emotionally loaded because it may feel connected to self-worth. The result can matter without becoming the only proof that you are capable, valuable, or on track.";
  }

  if (session.guidanceStyle === "Direct and practical") {
    return "The practical point is this: the result matters, but your emotional state cannot be completely outsourced to whether the result happens exactly the way you want.";
  }

  if (session.guidanceStyle === "Reflective and deep") {
    return "The attachment is probably not just to the result itself. It may be attached to a deeper need for proof, safety, belonging, recognition, or permission to feel enough.";
  }

  return "The attachment is probably not only to the result. It is to what the result represents: security, proof, belonging, status, relief, or permission to feel okay.";
}

function buildControlPrompt(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (categories.includes("Practical stressor")) {
    return "Start with the practical layer. What is one concrete action that improves your position, even if it does not guarantee the final outcome?";
  }

  if (categories.includes("Social comparison")) {
    return "Separate your path from other people’s timelines. What action belongs to your life, not to the race you are imagining?";
  }

  if (categories.includes("Depletion signs")) {
    return "Include recovery as a responsible action. What would help you regain enough energy to act wisely?";
  }

  if (session.guidanceStyle === "Direct and practical") {
    return "Name the next move. One action you control, one thing you can influence, one thing to prepare for, and one thing to stop trying to fully control.";
  }

  return "Name one action within your control, one thing you can influence, one thing to prepare for, and one thing that is not fully controllable.";
}

function buildGroundingStatement(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (categories.includes("Self-worth threat")) {
    return "This outcome can matter without becoming the full verdict on who I am.";
  }

  if (categories.includes("Social comparison")) {
    return "Other people’s timelines are information, not instructions for my life.";
  }

  if (categories.includes("Practical stressor")) {
    return "I can take the practical reality seriously without surrendering my whole emotional state to an uncertain outcome.";
  }

  if (session.mood === "Overwhelmed") {
    return "I do not need to solve the whole future right now. I only need to name the next honest step.";
  }

  if (session.guidanceStyle === "Calm and grounding") {
    return "I can slow down, return to what is real, and take the next step without turning pressure into self-punishment.";
  }

  return "I can move with direction without turning uncertainty into self-punishment.";
}