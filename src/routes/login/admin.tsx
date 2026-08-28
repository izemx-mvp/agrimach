import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "@/components/LoginScreen";

export const Route = createFileRoute("/login/admin")({
  head: () => ({
    meta: [
      { title: "Connexion espace commercial — AGRIMACH" },
      {
        name: "description",
        content:
          "Connexion sécurisée à l'espace commercial AGRIMACH : CRM, catalogue, devis, commandes et analytics.",
      },
      { property: "og:title", content: "Connexion espace commercial — AGRIMACH" },
      {
        property: "og:description",
        content: "Pilotez toute votre activité commerciale depuis une seule plateforme.",
      },
    ],
  }),
  component: () => <LoginScreen space="admin" />,
});
