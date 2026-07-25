// test/run-simulation.js
// 啟動 mock LIS，跑三種情境：核對成功／查無資料／連續失敗觸發鎖定
// 注意：這三個 UUID 對應 Supabase 裡預先建立好的測試 profiles（見下方「模擬測試」說明）
// 真實情境下 userId 應該來自已登入使用者的 auth session，不會是寫死的值
const mockLisApp = require('../mock-lis/server.cjs');
const { verifyAndLinkPatient } = require('../services/mappingService.cjs');

const PORT = 4001;
const server = mockLisApp.listen(PORT, async () => {
  console.log(`[simulation] mock LIS 啟動於 :${PORT}\n`);

  console.log('=== 情境 1：手機＋生日核對成功 ===');
  const r1 = await verifyAndLinkPatient('30a85010-9893-4811-8bfc-f7e5d48a3401', '0912345678', '1990-05-20');
  console.log(JSON.stringify(r1, null, 2), '\n');

  console.log('=== 情境 2：查無此人 ===');
  const r2 = await verifyAndLinkPatient('2dae0a79-3b18-46af-b457-7de145879859', '0999999999', '2000-01-01');
  console.log(JSON.stringify(r2, null, 2), '\n');

  console.log('=== 情境 3：連續輸錯生日 5 次，第 6 次應被鎖定 ===');
  for (let i = 1; i <= 6; i++) {
    const r = await verifyAndLinkPatient('62a3988e-382b-44f4-a852-1e23039d7af2', '0922333444', '1985-11-03'); // 故意打錯生日
    console.log(`第 ${i} 次嘗試 → matched=${r.success}, message="${r.message}", httpStatus=${r.httpStatus}`);
  }

  server.close(() => console.log('\n[simulation] 完成，mock LIS 已關閉'));
});
