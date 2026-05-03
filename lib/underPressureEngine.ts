export type Mood =
  | "Overwhelmed"
  | "Anxious"
  | "Numb"
  | "Tired"
  | "Restless"
  | "Okay, but pressured"
  | "";

export type PressureCategory =
  | "Material reality"
  | "Future uncertainty"
  | "Family expectations"
  | "Social comparison"
  | "Perfectionism"
  | "External validation"
  | "Identity pressure"
  | "Emotional overload"
  | "Burnout signs"
  | "Unclear pressure";

export type ControlMap = {
  control: string;
  influence: string;
  preparation: string;
  release: string;
};

export type UnderPressureSession = {
  mood: Mood;
  intensity: string;
  pressureText: string;
  attachmentText: string;
  controlMap: ControlMap;
  wiseEffortAction: string;
  releaseStatement: string;
  createdAt?: string;
};

export type PressureAnalysis = {
  categories: PressureCategory[];
  dominantPattern: string;
  materialReality: string;
  innerEffect: string;
  attachmentInsight: string;
  controlPrompt: string;
  groundingStatement: string;
  severeDistressFlag: boolean;
};

const STORAGE_KEY = "under-pressure-session-v1";

export function getEmptySession(): UnderPressureSession {
  return {
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
    createdAt: new Date().toISOString(),
  };
}

export function saveSession(session: UnderPressureSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

export function loadSession(): UnderPressureSession {
  if (typeof window === "undefined") return getEmptySession();

  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return getEmptySession();

  try {
    const parsed = JSON.parse(raw) as UnderPressureSession;

    return {
      ...getEmptySession(),
      ...parsed,
      controlMap: {
        ...getEmptySession().controlMap,
        ...(parsed.controlMap || {}),
      },
    };
  } catch {
    return getEmptySession();
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

function includesAny(text: string, words: string[]) {
  const normalized = text.toLowerCase();
  return words.some((word) => normalized.includes(word));
}

export function analyzePressure(session: UnderPressureSession): PressureAnalysis {
  const combined = `${session.pressureText} ${session.attachmentText}`.toLowerCase();

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
    ])
  ) {
    categories.push("Material reality");
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
    ])
  ) {
    categories.push("Future uncertainty");
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
    ])
  ) {
    categories.push("Family expectations");
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
    ])
  ) {
    categories.push("Social comparison");
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
    ])
  ) {
    categories.push("Perfectionism");
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
    ])
  ) {
    categories.push("External validation");
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
    ])
  ) {
    categories.push("Identity pressure");
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
    ])
  ) {
    categories.push("Emotional overload");
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
      "can't keep going",
    ])
  ) {
    categories.push("Burnout signs");
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
    categories.push("Unclear pressure");
  }

  return {
    categories,
    dominantPattern: buildDominantPattern(categories, session),
    materialReality: buildMaterialReality(categories),
    innerEffect: buildInnerEffect(categories, session),
    attachmentInsight: buildAttachmentInsight(categories, session),
    controlPrompt: buildControlPrompt(categories),
    groundingStatement: buildGroundingStatement(categories, session),
    severeDistressFlag,
  };
}

function buildDominantPattern(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (
    categories.includes("Material reality") &&
    categories.includes("Identity pressure")
  ) {
    return "Your pressure seems to be moving from a real external concern into a question of personal worth. The situation may need action, but the emotional weight is coming from what the outcome appears to say about you.";
  }

  if (
    categories.includes("Social comparison") &&
    categories.includes("Future uncertainty")
  ) {
    return "Your pressure seems connected to comparison and future uncertainty. It may feel like other people are moving faster, and that their movement proves something about your own timeline.";
  }

  if (
    categories.includes("Family expectations") &&
    categories.includes("External validation")
  ) {
    return "Your pressure seems tied to being seen as successful or acceptable by others. The external expectation may have become an internal demand.";
  }

  if (categories.includes("Burnout signs")) {
    return "Your pressure may not only be psychological. There are signs of depletion. The next step should include recovery, not just more effort.";
  }

  if (session.intensity === "5") {
    return "The pressure feels very intense right now. Before solving anything, the first task is to slow the spiral and make the pressure more specific.";
  }

  return "Your pressure appears to be layered. One part may be practical, one part emotional, and one part connected to what you fear the situation means about your future or identity.";
}

function buildMaterialReality(categories: PressureCategory[]) {
  if (categories.includes("Material reality")) {
    return "There is a practical layer here. Money, work, housing, grades, or career stability may require planning. Under Pressure does not ask you to ignore this. It asks you to face it clearly without letting it become the whole measure of your life.";
  }

  if (categories.includes("Future uncertainty")) {
    return "The material issue may not be immediate collapse, but uncertainty about what could happen later. That uncertainty deserves preparation, but it does not need to be treated as proof that the worst outcome is already happening.";
  }

  return "The practical layer is not fully clear yet. That does not make the pressure fake. It means the first task is to separate facts from fears.";
}

function buildInnerEffect(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (categories.includes("Identity pressure")) {
    return "The outside pressure seems to be entering the inner self as a verdict: if this does not work out, it may feel like something is wrong with you. That is where the pressure becomes dangerous.";
  }

  if (categories.includes("Social comparison")) {
    return "The outside pressure seems to be entering through comparison. Other people’s timelines may be making your own life feel delayed, even if your path still has room to unfold.";
  }

  if (categories.includes("Perfectionism")) {
    return "The outside pressure seems to be entering as perfectionism. Instead of asking what is good enough for the next step, the mind may be demanding a flawless performance.";
  }

  if (session.mood === "Numb") {
    return "The pressure may have become so constant that your system is protecting itself by going numb. Numbness is not laziness. It can be a sign that too much has been carried without enough processing.";
  }

  return "The outside pressure seems to be affecting your inner self by making uncertainty feel personal. The situation is not only asking for action; it is asking for emotional separation.";
}

function buildAttachmentInsight(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (!session.attachmentText.trim()) {
    return "The attachment is not named yet. The next question is: what outcome do you feel must happen before you are allowed to feel okay?";
  }

  if (categories.includes("External validation")) {
    return "You may not only want the outcome. You may want the recognition, respect, or validation that you believe the outcome would give you.";
  }

  if (categories.includes("Future uncertainty")) {
    return "The attachment may be to certainty itself: the need to know that things will work out before you allow yourself to breathe.";
  }

  if (categories.includes("Family expectations")) {
    return "The attachment may involve being acceptable in the eyes of family or people whose opinion carries emotional weight.";
  }

  return "The attachment is probably not just to the result. It is to what the result represents: security, proof, belonging, status, relief, or permission to feel okay.";
}

function buildControlPrompt(categories: PressureCategory[]) {
  if (categories.includes("Material reality")) {
    return "Start with the practical layer. What is one concrete action that improves your position, even if it does not guarantee the final outcome?";
  }

  if (categories.includes("Social comparison")) {
    return "Separate your path from other people’s timelines. What action belongs to your life, not to the race you are imagining?";
  }

  if (categories.includes("Burnout signs")) {
    return "Include recovery as a responsible action. What would help you regain enough energy to act wisely?";
  }

  return "Name one action within your control, one thing you can influence, one thing to prepare for, and one thing to release.";
}

function buildGroundingStatement(
  categories: PressureCategory[],
  session: UnderPressureSession
) {
  if (categories.includes("Identity pressure")) {
    return "This outcome can matter without becoming the full verdict on who I am.";
  }

  if (categories.includes("Social comparison")) {
    return "Other people’s timelines are information, not instructions for my life.";
  }

  if (categories.includes("Material reality")) {
    return "I can take material reality seriously without surrendering my peace completely to uncertain outcomes.";
  }

  if (session.mood === "Overwhelmed") {
    return "I do not need to solve the whole future right now. I only need to name the next honest step.";
  }

  return "I can move with direction without turning uncertainty into self-punishment.";
}