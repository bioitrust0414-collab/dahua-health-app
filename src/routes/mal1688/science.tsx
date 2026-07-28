import { createFileRoute } from "@tanstack/react-router";
import { SciencePillars } from "@/components/mal1688/SciencePillars";

export const Route = createFileRoute("/mal1688/science")({
  head: () => ({
    meta: [
      { title: "黃金協同技術 - MitoActiveLife 活「粒」生活" },
      {
        name: "description",
        content: "MAL 活粒鈣三大高吸收技術支柱：代謝協同、四重複合鈣、D3×K2 導航。",
      },
    ],
  }),
  component: SciencePillars,
});
