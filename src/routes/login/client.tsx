import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/LoginScreen";

export const Route = createFileRoute("/login/client")({
  head: () => ({
    meta: [
      { title: "Connexion espace client — AGRIMACH" },
      {
        name: "description",
        content:
          "Accédez à votre espace client AGRIMACH : catalogue de machines, demandes, devis, commandes, paiements et factures.",
      },
      { property: "og:title", content: "Connexion espace client — AGRIMACH" },
      {
        property: "og:description",
        content: "Vos machines, vos devis et vos commandes réunis au même endroit.",
      },
    ],
  }),
  component: () => <LoginScreen space="client" />,
});
