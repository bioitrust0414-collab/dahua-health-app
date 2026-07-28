import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ensureLiffLogin,
  getLiffIdToken,
  isLiffConfigured,
} from "@/lib/liffClient";
import { setStoredProfileId } from "@/lib/memberSession";

// 還沒有 LIFF ID（等大華官方帳號那邊協調好 LINE Developers 權限、建好 LIFF app
// 之後才會有）時，先用固定的測試 profile id 示範「會員資料 + 報告查詢」怎麼串起來。
// 一旦 VITE_LIFF_ID 設定了，畫面會自動改用真實的 LINE 登入使用者。
const DEMO_PROFILE_ID = "30a85010-9893-4811-8bfc-f7e5d48a3401";

interface ProfileRow {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  birthday: string | null;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  address: string | null;
}

interface ReportRow {
  id: string;
  lis_report_id: string;
  report_date: string;
  summary_json: {
    package?: string;
    height_cm?: number;
    weight_kg?: number;
    bmi?: number;
    items?: Record<string, string>;
  } | null;
}

const getMemberData = createServerFn({ method: "GET" })
  .validator((profileId: unknown) => {
    if (typeof profileId !== "string" || profileId.length === 0) {
      throw new Error("profileId is required");
    }
    return profileId;
  })
  .handler(async ({ data: profileId }) => {
    const { restGetOne, restGetList } = await import("@/lib/supabaseAdmin");

    const [profile, reports] = await Promise.all([
      restGetOne<ProfileRow>("profiles", `id=eq.${profileId}`),
      restGetList<ReportRow>("reports", `profile_id=eq.${profileId}&order=report_date.desc`),
    ]);

    if (!profile) throw new Error(`Profile ${profileId} not found`);

    return { profile, reports };
  });

// 把 LINE ID token 換成 profileId：伺服器端會呼叫 LINE 驗證這個 token 是真的、
// 沒有過期、發給我們自己的 channel，而不是相信前端隨便傳一個 LINE user id 上來。
const verifyLineLogin = createServerFn({ method: "POST" })
  .validator((idToken: unknown) => {
    if (typeof idToken !== "string" || idToken.length === 0) {
      throw new Error("idToken is required");
    }
    return idToken;
  })
  .handler(async ({ data: idToken }) => {
    const { upsertProfileForLineUser } = await import("@/lib/lineAuth.server");
    return upsertProfileForLineUser(idToken);
  });

export const Route = createFileRoute("/member")({
  validateSearch: (search: Record<string, unknown>) => ({
    profileId: typeof search.profileId === "string" ? search.profileId : undefined,
  }),
  loaderDeps: ({ search }) => ({ profileId: search.profileId }),
  loader: ({ deps }) => getMemberData({ data: deps.profileId ?? DEMO_PROFILE_ID }),
  component: MemberPage,
});

const genderLabel: Record<string, string> = {
  male: "男",
  female: "女",
  other: "其他",
  prefer_not_to_say: "不願透露",
};

function useLineProfileId(
  webProfileId: string | undefined,
): { profileId: string; source: "demo" | "line" | "line_web"; error: string | null } {
  const [state, setState] = useState<{
    profileId: string;
    source: "demo" | "line" | "line_web";
    error: string | null;
  }>(
    webProfileId
      ? { profileId: webProfileId, source: "line_web", error: null }
      : { profileId: DEMO_PROFILE_ID, source: "demo", error: null },
  );

  useEffect(() => {
    if (webProfileId) {
      // Real profile handed to us by the web LINE Login redirect — remember it
      // so a future visit (e.g. clicking the LINE icon again) skips straight
      // to the member area instead of the add-friend flow.
      setStoredProfileId(webProfileId);
      return;
    }
    if (!isLiffConfigured()) return; // stay on the demo profile

    let cancelled = false;
    (async () => {
      try {
        await ensureLiffLogin();
        const idToken = getLiffIdToken();
        const { profileId } = await verifyLineLogin({ data: idToken });
        if (!cancelled) {
          setStoredProfileId(profileId);
          setState({ profileId, source: "line", error: null });
        }
      } catch (error) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            error: error instanceof Error ? error.message : "LINE login failed",
          }));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [webProfileId]);

  return state;
}

function MemberPage() {
  const demoData = Route.useLoaderData();
  const { profileId: webProfileId } = Route.useSearch();
  const { profileId, source, error: liffError } = useLineProfileId(webProfileId);

  // Once LIFF or the web login hands us a real profileId, refetch with the
  // real data instead of the SSR-loaded demo data.
  const { data } = useQuery({
    queryKey: ["member-data", profileId],
    queryFn: () => getMemberData({ data: profileId }),
    enabled: source !== "demo",
    initialData: source === "demo" ? demoData : undefined,
  });

  const { profile, reports } = data ?? demoData;

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">會員資料 + 報告查詢</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {source === "line" && "已透過 LINE 登入（LIFF）。"}
          {source === "line_web" && "已透過 LINE 登入（網頁）。"}
          {source === "demo" && "Demo 頁面（尚未設定 LIFF，顯示固定測試帳號）。"}
        </p>
        {liffError && (
          <p className="mt-1 text-sm text-destructive">LINE 登入失敗：{liffError}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>會員資料</CardTitle>
          <CardDescription>{profile.email}</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 text-sm">
          <Field label="姓名" value={profile.full_name} />
          <Field label="電話" value={profile.phone} />
          <Field label="生日" value={profile.birthday} />
          <Field
            label="性別"
            value={profile.gender ? genderLabel[profile.gender] : null}
          />
          <Field label="地址" value={profile.address} className="col-span-2" />
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-foreground">檢驗報告</h2>
        <div className="space-y-4">
          {reports.length === 0 && (
            <p className="text-sm text-muted-foreground">目前沒有報告資料。</p>
          )}
          {reports.map((report: ReportRow) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {report.summary_json?.package ?? report.lis_report_id}
                  </CardTitle>
                  <Badge variant="secondary">{report.report_date}</Badge>
                </div>
                <CardDescription>{report.lis_report_id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-3 flex gap-4 text-sm">
                  {report.summary_json?.height_cm && (
                    <span>身高 {report.summary_json.height_cm} cm</span>
                  )}
                  {report.summary_json?.weight_kg && (
                    <span>體重 {report.summary_json.weight_kg} kg</span>
                  )}
                  {report.summary_json?.bmi && <span>BMI {report.summary_json.bmi}</span>}
                </div>
                <Separator className="mb-3" />
                <ul className="space-y-1 text-sm">
                  {report.summary_json?.items &&
                    Object.entries(report.summary_json.items as Record<string, string>).map(
                      ([key, value]) => (
                        <li key={key} className="flex justify-between">
                          <span className="text-muted-foreground">{key}</span>
                          <span>{value}</span>
                        </li>
                      ),
                    )}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  className,
}: {
  label: string;
  value?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div>{value ?? "—"}</div>
    </div>
  );
}
