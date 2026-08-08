const { createClient } = require("@supabase/supabase-js");
const LIS_ENDPOINT = process.env.LIS_ENDPOINT || "http://localhost:4001/lis/verify-patient";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { phone, dob, profileId } = req.body;
    if (!phone || !dob || !profileId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const lisRes = await fetch(LIS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, dob }),
    });
    const result = await lisRes.json();
    if (!result.found) return res.status(404).json({ success: false, message: "查無資料" });

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    await supabase.from("patient_mappings").upsert({
      profile_id: profileId,
      phone,
      birthday: dob,
      patient_id: result.patientId,
      lis_source: result.source || "mock-lis",
      updated_at: new Date().toISOString(),
    }, { onConflict: "profile_id" });

    res.json({ success: true, patientId: result.patientId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
