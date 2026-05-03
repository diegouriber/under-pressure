import type { ReactNode } from "react";

type FlowShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  step: number;
  totalSteps?: number;
  children: ReactNode;
};

export default function FlowShell({
  eyebrow,
  title,
  description,
  step,
  totalSteps = 7,
  children,
}: FlowShellProps) {
  const progress = Math.round((step / totalSteps) * 100);

  return (
    <main className="min-h-screen bg-[#f6f1e8] text-[#1f1f1f]">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="mb-6">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-[#1f1f1f] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-[#7a5c3a]">
            Step {step} of {totalSteps}
          </p>
        </div>

        <div className="rounded-[2rem] bg-white/75 p-8 shadow-sm md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#7a5c3a]">
            {eyebrow}
          </p>

          <h1 className="max-w-5xl text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#4a4a4a]">
            {description}
          </p>

          {children}
        </div>
      </section>
    </main>
  );
}