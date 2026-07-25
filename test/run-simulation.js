// test/run-simulation.js
// 啟動 mock LIS，跑三種情境：核對成功／查無資料／連續失敗觸發鎖定
const mockLisApp = require('../mock-lis/server');
const { verifyAndLinkPatient } = require('../services/mappingService');

const PORT = 4001;
const server = mockLisApp.listen(PORT, async () => {
  console.log(`[simulation] mock LIS 啟動於 :${PORT}\n`);

  console.log('=== 情境 1：手機＋生日核對成功 ===');
  const r1 = await verifyAndLinkPatient('user-uuid-001', '0912345678', '1990-05-20');
  console.log(JSON.stringify(r1, null, 2), '\n');

  console.log('=== 情境 2：查無此人 ===');
  const r2 = await verifyAndLinkPatient('user-uuid-002', '0999999999', '2000-01-01');
  console.log(JSON.stringify(r2, null, 2), '\n');

  console.log('=== 情境 3：連續輸錯生日 5 次，第 6 次應被鎖定 ===');
  for (let i = 1; i <= 6; i++) {
    const r = await verifyAndLinkPatient('user-uuid-003', '0922333444', '1985-11-03'); // 故意打錯生日
    console.log(`第 ${i} 次嘗試 → matched=${r.success}, message="${r.message}", httpStatus=${r.httpStatus}`);
  }

  server.close(() => console.log('\n[simulation] 完成，mock LIS 已關閉'));
});
