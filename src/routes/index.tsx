import { createFileRoute } from "@tanstack/react-router";

const LINE_LOGIN_CHANNEL_ID = "2010849391"; // not secret — same as embedded in the LIFF ID

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
  const redirectUri = encodeURIComponent(
    `${typeof window !== "undefined" ? window.location.origin : "https://dahua-health-app.vercel.app"}/auth/line/callback`,
  );
  const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${LINE_LOGIN_CHANNEL_ID}&redirect_uri=${redirectUri}&state=web&scope=profile%20openid`;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold text-foreground">Health App</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          UI base carried over from dhl1688-vercel. Pages to be built.
        </p>
      </div>
      <a
        href={lineLoginUrl}
        className="inline-flex items-center justify-center rounded-md bg-[#06C755] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#05b34c]"
      >
        使用 LINE 登入 / 加入會員
      </a>
    </div>
  );
}
