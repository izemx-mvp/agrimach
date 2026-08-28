import { useMemo } from "react";

/** Fond ambiant premium : gradient agricole, grille technique, particules lentes. */
export function AmbientBackground({ variant = "hero" }: { variant?: "hero" | "surface" }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        left: (i * 41) % 100,
        size: 2 + ((i * 7) % 5),
        delay: (i * 1.37) % 14,
        duration: 16 + ((i * 3) % 12),
        opacity: 0.15 + ((i % 5) * 0.09),
      })),
    [],
  );

  if (variant === "surface") {
    return (
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-70" />
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-primary/8 blur-3xl animate-float-slow" />
        <div className="absolute -right-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-primary-glow/8 blur-3xl animate-float-slow [animation-delay:-6s]" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px] animate-float-slow" />
      <div className="absolute -left-40 bottom-[-14rem] h-[34rem] w-[34rem] rounded-full bg-primary-glow/20 blur-[130px] animate-float-slow [animation-delay:-7s]" />
      <div className="absolute -right-24 top-1/3 h-[24rem] w-[24rem] rounded-full bg-earth/15 blur-[120px] animate-float-slow [animation-delay:-3s]" />
      <svg
        className="absolute inset-x-0 bottom-0 h-40 w-full text-primary/20"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <path
          d="M0 120 C 240 60, 420 160, 720 100 S 1200 40, 1440 110 L1440 160 L0 160 Z"
          fill="currentColor"
          opacity="0.35"
        />
        <path
          d="M0 140 C 300 90, 500 170, 780 130 S 1180 90, 1440 140 L1440 160 L0 160 Z"
          fill="currentColor"
          opacity="0.25"
        />
      </svg>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-primary-glow animate-drift"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
