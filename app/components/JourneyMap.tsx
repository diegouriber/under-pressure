type JourneyMapProps = {
  currentStep?: number;
  totalSteps?: number;
};

const journeySteps = [
  {
    number: 1,
    label: "Scope",
    description: "Set boundaries",
  },
  {
    number: 2,
    label: "Context",
    description: "Make it relevant",
  },
  {
    number: 3,
    label: "Check-in",
    description: "Name the state",
  },
  {
    number: 4,
    label: "Pressure",
    description: "Facts and fear",
  },
  {
    number: 5,
    label: "Pattern",
    description: "Notice themes",
  },
  {
    number: 6,
    label: "Outcome meaning",
    description: "What it represents",
  },
  {
    number: 7,
    label: "Control map",
    description: "Sort the pressure",
  },
  {
    number: 8,
    label: "Action",
    description: "Choose next step",
  },
];

export default function JourneyMap({
  currentStep = 1,
  totalSteps = 8,
}: JourneyMapProps) {
  const safeStep = Math.min(Math.max(currentStep, 1), totalSteps);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Journey map
          </p>

          <p className="mt-1 text-sm text-white/70">
            Step {safeStep} of {totalSteps}
          </p>
        </div>

        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/70">
          {Math.round((safeStep / totalSteps) * 100)}%
        </div>
      </div>

      <div className="space-y-3">
        {journeySteps.map((step) => {
          const isComplete = step.number < safeStep;
          const isCurrent = step.number === safeStep;

          return (
            <div key={step.number} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                    isCurrent
                      ? "bg-[#e7c987] text-[#1f1f1f]"
                      : isComplete
                      ? "bg-white text-[#1f1f1f]"
                      : "bg-white/15 text-white/45"
                  }`}
                >
                  {isComplete ? "✓" : step.number}
                </div>

                {step.number !== journeySteps.length && (
                  <div
                    className={`mt-2 h-5 w-px ${
                      isComplete ? "bg-white/55" : "bg-white/15"
                    }`}
                  />
                )}
              </div>

              <div className="min-w-0 pb-1">
                <p
                  className={`text-sm font-semibold ${
                    isCurrent
                      ? "text-white"
                      : isComplete
                      ? "text-white/80"
                      : "text-white/40"
                  }`}
                >
                  {step.label}
                </p>

                <p
                  className={`mt-1 text-xs leading-5 ${
                    isCurrent
                      ? "text-white/65"
                      : isComplete
                      ? "text-white/45"
                      : "text-white/30"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}