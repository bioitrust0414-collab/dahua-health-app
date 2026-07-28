import { createFileRoute } from "@tanstack/react-router";
import { PricingSection } from "@/components/mal1688/PricingSection";

export const Route = createFileRoute("/mal1688/pricing")({
  head: () => ({
    meta: [
      { title: "線上特惠訂購 - MitoActiveLife 活「粒」生活" },
      {
        name: "description",
        content: "MAL 活粒鈣三組補鈣計畫：15天體驗組、30天滿分成長組、60天跨世代穩固組。",
      },
    ],
  }),
  component: PricingSection,
});
