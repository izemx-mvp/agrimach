import { createFileRoute, Outlet } from "@tanstack/react-router";
import { ClientShell } from "@/components/ClientShell";

export const Route = createFileRoute("/client")({
  component: ClientLayout,
});

function ClientLayout() {
  return (
    <ClientShell>
      <Outlet />
    </ClientShell>
  );
}
