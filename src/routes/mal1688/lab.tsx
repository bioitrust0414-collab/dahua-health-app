import { createFileRoute } from "@tanstack/react-router";
import { LabSimulator } from "@/components/mal1688/LabSimulator";

export const Route = createFileRoute("/mal1688/lab")({
  head: () => ({
    meta: [
      { title: "成長灌溉實驗室 - MitoActiveLife 活「粒」生活" },
      {
        name: "description",
        content: "即時調節 MAL 活粒鈣核心技術因子，體驗吸收率與骨骼支持率的動態模擬。",
      },
    ],
  }),
  component: LabSimulator,
});
