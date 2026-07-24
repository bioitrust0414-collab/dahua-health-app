// services/mappingService.js
// 對應提案中的 mappingService.ts，先用純 JS + 模擬的 Supabase 寫入（console.log 代替真實 insert）
// 待資料庫落地方式（新建 vs 沿用 dahua-lab 專案）確認後，把 saveMapping() 換成真的 supabase.from('patient_mappings').insert(...)

const { verifyPatient } = require('../api/verify-patient');

async function saveMapping(userId, lisPatientId) {
  // TODO: 換成真的 Supabase client
  console.log(`[mappingService] 模擬寫入 patient_mappings: user_id=${userId}, lis_patient_id=${lisPatientId}, is_verified=true`);
  return { user_id: userId, lis_patient_id: lisPatientId, is_verified: true };
}

async function verifyAndLinkPatient(userId, phone, dob) {
  const result = await verifyPatient(phone, dob);

  if (result.matched && result.lisPatientId) {
    const mapping = await saveMapping(userId, result.lisPatientId);
    return { success: true, lisPatientId: result.lisPatientId, mapping };
  }

  return {
    success: false,
    message: result.message,
    attemptsRemaining: result.attemptsRemaining,
    httpStatus: result.httpStatus,
  };
}

module.exports = { verifyAndLinkPatient };
