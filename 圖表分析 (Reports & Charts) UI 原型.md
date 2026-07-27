# 圖表分析 (Reports & Charts) UI 原型

**對應資料庫表**: `reports`

## 頁面佈局與組件

### 1. 報告列表與篩選頁面
- **頂部篩選器**: 
    - 日期範圍選擇器 (`shadcn/ui` `Calendar` 或 `DateRangePicker`)，用於篩選報告日期。
    - 報告類型篩選 (`shadcn/ui` `Select` 或 `DropdownMenu`)，可根據 `summary_json.package` 進行篩選。
- **報告列表**: 
    - 使用 `shadcn/ui` `Card` 或 `Table` 組件展示每份報告的簡要信息，如 `report_date`、`lis_report_id`、`summary_json.package`。
    - 點擊報告條目可進入報告詳情頁。
- **數據概覽**: 顯示選定時間範圍內報告的總數、平均 BMI 等關鍵指標。

### 2. 報告詳情與圖表展示頁面
- **報告基本信息**: 顯示 `report_date`、`lis_report_id`、`pdf_path`（可點擊下載/預覽）。
- **關鍵指標趨勢圖**: 
    - 使用 `recharts` 庫，根據 `summary_json` 中的 `height_cm`、`weight_kg`、`bmi` 繪製時間趨勢圖。
    - 允許用戶選擇不同的指標進行疊加或單獨顯示。
- **詳細檢驗項目列表**: 
    - 顯示 `summary_json.items` 中的所有檢驗項目及其數值。
    - 可考慮將異常值標記出來。
- **報告下載/分享按鈕**: (`shadcn/ui` `Button` 組件)。

## 交互流程
1. 用戶進入圖表分析頁面，預設顯示所有報告的列表。
2. 用戶可通過日期範圍或報告類型篩選器，縮小報告範圍。
3. 點擊某份報告，進入報告詳情頁。
4. 在詳情頁中，可查看報告詳細信息，並通過圖表直觀了解關鍵健康指標的變化趨勢。
5. 可下載原始 PDF 報告。

## 建議使用的 shadcn/ui 組件與圖表庫
- `Card`：用於報告列表條目和數據概覽。
- `Table`：用於詳細檢驗項目列表。
- `Calendar` 或 `DateRangePicker`：用於日期篩選。
- `Select` 或 `DropdownMenu`：用於報告類型篩選。
- `Button`：用於操作按鈕。
- `recharts`：用於繪製折線圖、柱狀圖等趨勢圖。
