-- db/schema.sql
-- 沿用現有 Supabase 專案 dahua-lab（Tokyo region, project ID nalokjulouwilmfsxifg）
-- 已有 profiles / bookings / orders / contacts / mal_orders，這裡只新增 4 張表
-- 用 profiles(id) 取代原提案中的 users 表，避免重複建立會員表

CREATE TABLE public.patient_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lis_patient_id VARCHAR(50) NOT NULL,
    is_verified BOOLEAN DEFAULT false,
    linked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, lis_patient_id)
);

CREATE TABLE public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lis_report_id VARCHAR(50) NOT NULL,
    report_date DATE NOT NULL,
    pdf_path TEXT,
    summary_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.daily_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    log_date DATE NOT NULL,
    water_ml INT DEFAULT 0,
    sleep_hours NUMERIC(3,1),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE public.reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(30) NOT NULL, -- 'FOLLOW_UP' | 'HABIT' | 'BOOKING'
    title VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    trigger_time TIMESTAMP WITH TIME ZONE NOT NULL,
    is_sent BOOLEAN DEFAULT false,
    disclaimer_text TEXT NOT NULL
);

-- RLS：確保會員只能讀到自己的報告
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles can only view their own reports"
ON public.reports
FOR SELECT
USING (auth.uid() = profile_id);

ALTER TABLE public.patient_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles can only view their own mapping"
ON public.patient_mappings
FOR SELECT
USING (auth.uid() = profile_id);
