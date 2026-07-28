import { createFileRoute } from "@tanstack/react-router";
import { ProductMatrix } from "@/components/mal1688/ProductMatrix";

export const Route = createFileRoute("/mal1688/solutions")({
  head: () => ({
    meta: [
      { title: "四重高效配方 - MitoActiveLife 活「粒」生活" },
      { name: "description", content: "MAL 活粒鈣三層錠劑結構與四大高端鈣源的多層釋放工藝解密。" },
    ],
  }),
  component: ProductMatrix,
});
