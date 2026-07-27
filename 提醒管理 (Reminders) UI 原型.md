# 提醒管理 (Reminders) UI 原型

**對應資料庫表**: `reminders`

## 頁面佈局與組件

### 1. 提醒列表頁面
- **頂部篩選器**: 
    - 提醒類型篩選 (`shadcn/ui` `Select` 或 `DropdownMenu`)，可根據 `type` 進行篩選（例如：`FOLLOW_UP`, `HABIT`, `BOOKING`）。
    - 狀態篩選（已發送/未發送）。
- **提醒列表**: 
    - 使用 `shadcn/ui` `Card` 或 `Table` 組件展示每個提醒的簡要信息，如 `title`、`trigger_time`、`type`、`is_sent`。
    - 點擊提醒條目可進入編輯模式或查看詳情。
- **新增提醒按鈕**: 浮動在頁面右下角，點擊後彈出新增/編輯提醒表單。

### 2. 新增/編輯提醒表單 (彈窗或新頁面)
- **提醒標題**: 文本輸入框 (`shadcn/ui` `Input` 組件)。
- **提醒內容**: 多行文本輸入 (`shadcn/ui` `Textarea` 組件)。
- **提醒類型**: 下拉選擇框 (`shadcn/ui` `Select` 組件)。
- **觸發時間**: 日期時間選擇器 (`shadcn/ui` `Calendar` + 時間選擇組件)。
- **免責聲明**: 多行文本輸入 (`shadcn/ui` `Textarea` 組件)。
- **保存/取消按鈕**: (`shadcn/ui` `Button` 組件)。

## 交互流程
1. 用戶進入提醒管理頁面，預設顯示所有提醒的列表。
2. 用戶可通過篩選器查看特定類型或狀態的提醒。
3. 點擊「新增提醒」按鈕，彈出表單，填寫提醒標題、內容、類型、觸發時間和免責聲明。
4. 點擊「保存」提交數據至 `reminders` 表。
5. 點擊現有提醒條目，彈出編輯表單，修改後保存。

## 建議使用的 shadcn/ui 組件
- `Card`：用於提醒列表條目。
- `Table`：用於提醒列表展示。
- `Select` 或 `DropdownMenu`：用於提醒類型篩選。
- `Input`：用於提醒標題。
- `Textarea`：用於提醒內容和免責聲明。
- `Calendar`：用於日期選擇。
- `Button`：用於操作按鈕。
- `Dialog` 或 `Sheet`：用於新增/編輯提醒表單彈窗。
