import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// 目前還沒有 Supabase Auth 登入流程，先用固定的測試 profile id 示範
// 「會員資料 + 報告查詢」怎麼串起來。之後接上登入後，這裡要換成
// 從 session 拿 auth.uid()，而不是寫死的 id。
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

const getMemberData = createServerFn({ method: "GET" }).handler(async () => {
  const { getSupabaseAdmin } = await import("@/lib/supabaseAdmin");
  const supabase = getSupabaseAdmin();

  const [{ data: profile, error: profileError }, { data: reports, error: reportsError }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("*")
        .eq("id", DEMO_PROFILE_ID)
        .single()
        .overrideTypes<ProfileRow>(),
      supabase
        .from("reports")
        .select("*")
        .eq("profile_id", DEMO_PROFILE_ID)
        .order("report_date", { ascending: false })
        .overrideTypes<ReportRow[]>(),
    ]);

  if (profileError) throw new Error(profileError.message);
  if (reportsError) throw new Error(reportsError.message);

  return { profile: profile as ProfileRow, reports: (reports ?? []) as ReportRow[] };
});

export const Route = createFileRoute("/member")({
  loader: () => getMemberData(),
  component: MemberPage,
});

const genderLabel: Record<string, string> = {
  male: "男",
  female: "女",
  other: "其他",
  prefer_not_to_say: "不願透露",
};

function MemberPage() {
  const { profile, reports } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-bold text-foreground">會員資料 + 報告查詢</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Demo 頁面，資料透過 server function 讀取（尚未接登入，先用固定測試帳號）。
        </p>
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
          {reports.map((report) => (
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
