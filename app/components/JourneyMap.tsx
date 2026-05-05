"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const journeySteps = [
  {
    label: "Scope",
    href: "/scope",
    description: "Set boundaries",
  },
  {
    label: "Context",
    href: "/context",
    description: "Name the situation",
  },
  {
    label: "Check-in",
    href: "/check-in",
    description: "Name the state",
  },
  {
    label: "Pressure",
    href: "/pressure",
    description: "Facts and fear",
  },
  {
    label: "Pattern",
    href: "/summary",
    description: "Notice themes",
  },
  {
    label: "Outcome meaning",
    href: "/attachment",
    description: "What it represents",
  },
  {
    label: "Control map",
    href: "/control-map",
    description: "Sort the pressure",
  },
  {
    label: "Action",
    href: "/final",
    description: "Choose next step",
  },
];

export default function JourneyMap() {
  const pathname = usePathname();
  const activeIndex = journeySteps.findIndex((step) => step.href === pathname);
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const progress = Math.round(((safeActiveIndex + 1) / journeySteps.length) * 100);

  return (
    <aside className="rounded-[2rem] border border-[#1f1f1f]/10 bg-white p-5 text-[#1f1f1f] shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5c3a]">
            Journey map
          </p>

          <p className="mt-2 text-sm font-semibold text-[#1f1f1f]">
            Step {safeActiveIndex + 1} of {journeySteps.length}
          </p>
        </div>

        <p className="text-xs font-semibold text-[#7a5c3a]">{progress}%</p>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#efe4d4]">
        <div
          className="h-full rounded-full bg-[#1f1f1f] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav className="mt-6 space-y-2">
        {journeySteps.map((step, index) => {
          const isActive = index === safeActiveIndex;
          const isComplete = index < safeActiveIndex;

          return (
            <Link
              key={step.href}
              href={step.href}
              className={`grid grid-cols-[auto_1fr] gap-3 rounded-2xl p-3 transition ${
                isActive
                  ? "bg-[#f6f1e8]"
                  : isComplete
                  ? "bg-white hover:bg-[#f6f1e8]"
                  : "bg-white hover:bg-[#f6f1e8]"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                  isActive
                    ? "bg-[#e7c873] text-[#1f1f1f]"
                    : isComplete
                    ? "bg-[#1f1f1f] text-white"
                    : "bg-[#f6f1e8] text-[#7a5c3a]"
                }`}
              >
                {isComplete ? "✓" : index + 1}
              </div>

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isActive ? "text-[#1f1f1f]" : "text-[#3f3f3f]"
                  }`}
                >
                  {step.label}
                </p>

                <p className="mt-1 text-xs leading-5 text-[#777]">
                  {step.description}
                </p>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl bg-[#fdfaf4] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
          Reminder
        </p>

        <p className="mt-2 text-sm leading-6 text-[#555]">
          Reflection, not therapy. The goal is clarity, not perfection.
        </p>
      </div>
    </aside>
  );
}