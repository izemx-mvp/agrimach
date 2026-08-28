import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { clients, formatMAD, invoices, machines, orders, prospects, quotes } from "@/lib/data";

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Rechercher un client, une machine, un devis..." />
      <CommandList>
        <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
        <CommandGroup heading="Machines">
          {machines.slice(0, 6).map((m) => (
            <CommandItem key={m.id} value={`${m.name} ${m.category}`} onSelect={() => go("/admin/catalogue")}>
              <span>{m.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{formatMAD(m.price)}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Clients">
          {clients.slice(0, 5).map((c) => (
            <CommandItem key={c.id} value={`${c.name} ${c.company}`} onSelect={() => go("/admin/clients")}>
              <span>{c.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{c.company}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Prospects">
          {prospects.slice(0, 5).map((p) => (
            <CommandItem key={p.id} value={`${p.name} ${p.company}`} onSelect={() => go("/admin/prospects")}>
              <span>{p.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">Score {p.score}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Devis">
          {quotes.slice(0, 4).map((q) => (
            <CommandItem key={q.id} value={q.id} onSelect={() => go("/admin/devis")}>
              <span>{q.id}</span>
              <span className="ml-auto text-xs text-muted-foreground">{q.clientName}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Commandes & factures">
          {orders.slice(0, 3).map((o) => (
            <CommandItem key={o.id} value={o.id} onSelect={() => go("/admin/commandes")}>
              <span>{o.id}</span>
              <span className="ml-auto text-xs text-muted-foreground">{formatMAD(o.total)}</span>
            </CommandItem>
          ))}
          {invoices.slice(0, 3).map((f) => (
            <CommandItem key={f.id} value={f.id} onSelect={() => go("/admin/factures")}>
              <span>{f.id}</span>
              <span className="ml-auto text-xs text-muted-foreground">{f.clientName}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
