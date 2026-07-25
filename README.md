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
- ✅ 勾稽邏輯（`services/mappingService.js`）：目前 Supabase 寫入為模擬（console.log），待資料庫串接後替換
- ✅ 模擬測試（`test/run-simulation.js`）：驗證成功／查無資料／鎖定三種情境，`node test/run-simulation.js` 可直接跑
- ⏳ 尚未串接：真實 Supabase client、真實 LIS 系統（尚無 API 或需向廠商確認）、簡訊 OTP 模組

## 資料庫

`db/schema.sql` 沿用現有 Supabase 專案 `dahua-lab`（Tokyo region），新增 4 張表：
`patient_mappings`、`reports`、`daily_logs`、`reminders`，並以 `profiles(id)` 取代原提案的獨立 `users` 表。

## 執行模擬測試

```bash
npm install
node test/run-simulation.js
```

## 下一步

定義 Phase 1 頁面結構(健康數據追蹤、電商、會員/衛教內容),再逐步接上 Supabase 與上述後端骨架。
