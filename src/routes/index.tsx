import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Health App" },
      {
        name: "description",
        content: "Health App",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground">Health App</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          UI base carried over from dhl1688-vercel. Pages to be built.
        </p>
      </div>
    </div>
  );
}
