import { createFileRoute } from "@tanstack/react-router";
import { StorySection } from "@/components/mal1688/StorySection";

export const Route = createFileRoute("/mal1688/story")({
  head: () => ({
    meta: [
      { title: "暖心守護故事 - MitoActiveLife 活「粒」生活" },
      {
        name: "description",
        content: "MAL 活粒鈣品牌故事：從家庭日常出發，打造好吃好吸收的複合鈣配方。",
      },
    ],
  }),
  component: StorySection,
});
