import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Inbox, TrendingDown, TrendingUp } from "lucide-react";

/* ---------- Compteur animé ---------- */
export function AnimatedNumber({
  value,
  format,
  duration = 1100,
}: {
  value: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, duration]);

  return <>{format ? format(display) : new Intl.NumberFormat("fr-FR").format(Math.round(display))}</>;
}

/* ---------- KPI ---------- */
export function KpiCard({
  label,
  value,
  format,
  delta,
  icon,
  hint,
  index = 0,
}: {
  label: string;
  value: number;
  format?: (n: number) => string;
  delta?: number;
  icon: ReactNode;
  hint?: string;
  index?: number;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated animate-rise-in"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </span>
      </div>
      <p className="mt-4 font-display text-3xl font-bold tabular-nums">
        <AnimatedNumber value={value} format={format} />
      </p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
              positive ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
            )}
          >
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {positive ? "+" : ""}
            {delta.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export function Panel({
  title,
  description,
  action,
  children,
  className,
  padded = true,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={cn("rounded-xl border border-border bg-card shadow-soft", className)}>
      {(title || action) && (
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            {title && <h2 className="font-display text-base font-semibold">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={padded ? "p-5" : undefined}>{children}</div>
    </section>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 animate-rise-in">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight md:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ---------- Statuts ---------- */
const STATUS_TONE: Record<string, string> = {
  Disponible: "bg-success/12 text-success border-success/25",
  Payé: "bg-success/12 text-success border-success/25",
  Payée: "bg-success/12 text-success border-success/25",
  Accepté: "bg-success/12 text-success border-success/25",
  Gagné: "bg-success/12 text-success border-success/25",
  Terminée: "bg-success/12 text-success border-success/25",
  Livrée: "bg-success/12 text-success border-success/25",
  Réservée: "bg-warning/15 text-warning border-warning/30",
  "En attente": "bg-warning/15 text-warning border-warning/30",
  "Paiement en attente": "bg-warning/15 text-warning border-warning/30",
  "En retard": "bg-destructive/12 text-destructive border-destructive/25",
  Indisponible: "bg-destructive/12 text-destructive border-destructive/25",
  Échoué: "bg-destructive/12 text-destructive border-destructive/25",
  Refusé: "bg-destructive/12 text-destructive border-destructive/25",
  Perdu: "bg-destructive/12 text-destructive border-destructive/25",
  Annulée: "bg-destructive/12 text-destructive border-destructive/25",
  Prochainement: "bg-info/12 text-info border-info/25",
  Initié: "bg-info/12 text-info border-info/25",
  "En cours": "bg-info/12 text-info border-info/25",
  "En préparation": "bg-info/12 text-info border-info/25",
  Confirmée: "bg-info/12 text-info border-info/25",
  Émise: "bg-info/12 text-info border-info/25",
  Chaud: "bg-destructive/12 text-destructive border-destructive/25",
  Tiède: "bg-warning/15 text-warning border-warning/30",
  Froid: "bg-info/12 text-info border-info/25",
};

export function StatusPill({ status, className }: { status: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STATUS_TONE[status] ?? "bg-muted text-muted-foreground border-border",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function ScoreRing({ score, size = 64 }: { score: number; size?: number }) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const tone = score >= 75 ? "text-destructive" : score >= 50 ? "text-warning" : "text-info";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="5" className="stroke-muted" fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          className={cn("stroke-current transition-[stroke-dashoffset] duration-1000", tone)}
          style={{ strokeDasharray: c, strokeDashoffset: c - (c * score) / 100 }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold tabular-nums">
        {score}
      </span>
    </div>
  );
}

/* ---------- États ---------- */
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface/60 px-6 py-14 text-center">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Inbox className="h-6 w-6" />
      </span>
      <h3 className="font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && (
        <Button className="mt-5" onClick={onAction} variant="secondary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: rows }, (_, i) => (
        <Skeleton key={i} className="h-11 w-full" />
      ))}
    </div>
  );
}

export function FilterChips({
  chips,
  onClear,
}: {
  chips: { key: string; label: string; onRemove: () => void }[];
  onClear: () => void;
}) {
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <Badge
          key={c.key}
          variant="secondary"
          className="gap-1.5 rounded-full border border-border bg-accent/60 py-1 pl-3 pr-1.5 text-xs font-medium"
        >
          {c.label}
          <button
            onClick={c.onRemove}
            aria-label={`Retirer le filtre ${c.label}`}
            className="flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            ×
          </button>
        </Badge>
      ))}
      <button
        onClick={onClear}
        className="text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
      >
        Réinitialiser
      </button>
    </div>
  );
}
