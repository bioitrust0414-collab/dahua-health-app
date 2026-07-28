import { createFileRoute } from "@tanstack/react-router";
import { AcademySection } from "@/components/mal1688/AcademySection";

export const Route = createFileRoute("/mal1688/academy")({
  head: () => ({
    meta: [
      { title: "內部教育訓練沙盒 - MitoActiveLife 活「粒」生活" },
      {
        name: "description",
        content: "MAL 活粒鈣經銷夥伴合規教育訓練指南：核心理念、分齡保養、常見問題拆招。",
      },
    ],
  }),
  component: AcademySection,
});
