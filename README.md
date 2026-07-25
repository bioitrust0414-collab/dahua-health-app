# dahua-health-app

健康管理與諮詢 App(開發中)

## 前端

UI/技術骨架沿用自 `dhl1688-vercel`(TanStack Start + React 19 + Tailwind v4 + shadcn/Radix UI)。

沿用:
- 完整 `src/components/ui`(shadcn 元件庫)
- Router/server 設定(`router.tsx`、`server.ts`、`start.ts`、`__root.tsx`)
- 建置/lint/format 設定(Vite、ESLint、Prettier、Tailwind、tsconfig、vercel.json)
- 共用 lib/hooks(`utils.ts`、error capture/reporting、`use-mobile`)

未沿用(屬於既有站點的品牌內容,非通用基底):
- `dahua`、`mal1688`、`heychew1688` 的頁面元件與路由
- 品牌專屬樣式(`dahua.css`、`mal1688.css`)與圖片素材

## 後端 / 資料串接

- ✅ Mock LIS 模擬伺服器（`mock-lis/server.js`）：模擬診所 LIS 系統的手機＋生日核對，含防暴力破解鎖定機制
- ✅ 中台驗證 API（`api/verify-patient.js`）：呼叫 LIS，未來正式環境會指向診所內網或加密通道
- ✅ 勾稽邏輯（`services/mappingService.js`）：已改為真實 `@supabase/supabase-js` 寫入（`lib/supabaseClient.js`，用 service role key，繞過 RLS 代表使用者寫入）
- ✅ 前端 Supabase client（`src/lib/supabaseClient.ts`）：用 anon/publishable key，RLS 限制只能讀寫自己的資料
- ✅ 模擬測試（`test/run-simulation.js`）：驗證成功／查無資料／鎖定三種情境，`node test/run-simulation.js` 可直接跑
- ⏳ 尚未串接：真實 LIS 系統（尚無 API 或需向廠商確認）、簡訊 OTP 模組、UI 畫面

## 資料庫

Supabase 專案 `dahua-lab`（project ref `bpwtllljnwlgdhfepwtr`，ap-southeast-1，2026-07-25 新建）已套用：
- `profiles`(id/email，auth.users 新註冊會自動建檔的 trigger)
- `patient_mappings`、`reports`、`daily_logs`、`reminders`（皆已開 RLS，只能讀寫自己的資料）

> 注意：這是全新的空專案，跟先前規劃文件中提到、已有 bookings/orders 等資料的舊 `dahua-lab`（Tokyo region）不是同一個。確認為刻意選擇後才建立。

## 環境變數

複製 `.env.example` 為 `.env`，`SUPABASE_SERVICE_ROLE_KEY` 需自行從 Supabase 後台 Settings > API 取得（不可提交進 repo）。

## 執行模擬測試

```bash
npm install
node test/run-simulation.js
```

## 下一步

定義 Phase 1 頁面結構(健康數據追蹤、電商、會員/衛教內容),再逐步接上 Supabase 與上述後端骨架。
