"use client";

import Link from "next/link";
import JourneyMap from "./JourneyMap";

type FlowShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
  children: React.ReactNode;
};

export default function FlowShell({
  eyebrow,
  title,
  description,
  step,
  totalSteps,
  children,
}: FlowShellProps) {
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <main className="min-h-screen bg-[#fdfaf4] px-5 py-6 text-[#1f1f1f] md:px-8 md:py-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[320px_1fr]">
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <JourneyMap />
          </div>
        </div>

        <section className="min-w-0">
          <div className="rounded-[2.5rem] border border-[#1f1f1f]/10 bg-white p-6 shadow-sm md:p-10">
            <div className="flex flex-col gap-5 border-b border-[#1f1f1f]/10 pb-8 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <Link
                  href="/"
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a5c3a] transition hover:text-[#1f1f1f]"
                >
                  Under Pressure
                </Link>

                <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-[#7a5c3a]">
                  {eyebrow}
                </p>

                <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.06em] text-[#1f1f1f] md:text-6xl">
                  {title}
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-8 text-[#555]">
                  {description}
                </p>
              </div>

              <div className="rounded-3xl bg-[#f6f1e8] p-5 md:w-52">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5c3a]">
                  Step {step} of {totalSteps}
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e5d8c6]">
                  <div
                    className="h-full rounded-full bg-[#1f1f1f] transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="mt-3 text-xs leading-5 text-[#666]">
                  {progress}% through the reflection.
                </p>
              </div>
            </div>

            <div className="mt-8 lg:hidden">
              <JourneyMap />
            </div>

            <div className="mt-8">{children}</div>
          </div>
        </section>
      </div>
    </main>
  );
}