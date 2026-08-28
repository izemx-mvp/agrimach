import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-glow",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 17.5h16" strokeLinecap="round" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17" cy="17.5" r="3.5" />
        <path d="M6 15V9.5A1.5 1.5 0 0 1 7.5 8H12l2 4h3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.5 5.5 12 3l2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function BrandLockup({
  className,
  subtitle = "Agricultural Machinery Trading",
  compact = false,
}: {
  className?: string;
  subtitle?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <BrandMark />
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight">AGRIMACH</span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {subtitle}
          </span>
        </span>
      )}
    </span>
  );
}
