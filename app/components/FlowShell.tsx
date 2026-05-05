import Link from "next/link";
import JourneyMap from "./JourneyMap";

type FlowShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  step?: number;
  totalSteps?: number;
  children: React.ReactNode;
};

export default function FlowShell({
  eyebrow,
  title,
  description,
  step,
  totalSteps = 8,
  children,
}: FlowShellProps) {
  const showProgress = Boolean(step && totalSteps);
  const progress =
    step && totalSteps ? Math.min(100, Math.round((step / totalSteps) * 100)) : 0;

  return (
    <main className="min-h-screen bg-[#fdfaf4] text-[#1f1f1f]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
        <header className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f1f1f] text-lg font-semibold text-white shadow-sm transition group-hover:scale-105">
              UP
            </div>

            <div>
              <p className="text-sm font-semibold leading-none text-[#1f1f1f]">
                Under Pressure
              </p>
              <p className="mt-1 text-xs text-[#777]">
                Evidence-informed reflection
              </p>
            </div>
          </Link>

          {showProgress && (
            <div className="hidden min-w-[180px] sm:block">
              <div className="flex items-center justify-between text-xs font-medium text-[#777]">
                <span>
                  Step {step} of {totalSteps}
                </span>
                <span>{progress}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#efe7d8]">
                <div
                  className="h-full rounded-full bg-[#1f1f1f] transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </header>

        <section className="grid flex-1 gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <aside className="lg:sticky lg:top-8">
            <div className="overflow-hidden rounded-[2rem] border border-[#1f1f1f]/10 bg-white shadow-sm">
              <div className="relative min-h-[360px] bg-[#1f1f1f] p-7 text-white">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />
                <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-[#c9a66b]/20" />

                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                    {eyebrow}
                  </p>

                  <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
                    {title}
                  </h1>

                  <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                    {description}
                  </p>
                </div>

                {showProgress && (
                  <div className="relative z-10 mt-8">
                    <JourneyMap currentStep={step} totalSteps={totalSteps} />
                  </div>
                )}
              </div>

              {showProgress && (
                <div className="border-t border-[#1f1f1f]/10 bg-[#f6f1e8] p-5 sm:hidden">
                  <div className="flex items-center justify-between text-xs font-medium text-[#777]">
                    <span>
                      Step {step} of {totalSteps}
                    </span>
                    <span>{progress}%</span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5dccb]">
                    <div
                      className="h-full rounded-full bg-[#1f1f1f] transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </aside>

          <section className="pb-12">{children}</section>
        </section>
      </div>
    </main>
  );
}