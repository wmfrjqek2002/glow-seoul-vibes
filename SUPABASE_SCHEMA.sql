-- Supabase 데이터베이스 스키마
-- Supabase Dashboard의 SQL Editor에서 실행하세요

-- 1. 보도(Press) 테이블
CREATE TABLE IF NOT EXISTS press (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  publisher TEXT,
  date TEXT,
  image TEXT,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 미디어(Media) 테이블
CREATE TABLE IF NOT EXISTS media (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  channel TEXT,
  thumbnail TEXT,
  link TEXT,
  type TEXT NOT NULL CHECK (type IN ('long-form', 'shorts')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 방명록(Guestbook) 테이블
CREATE TABLE IF NOT EXISTS guestbook (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  password TEXT, -- 삭제 시 사용 (선택사항)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. 관리자(Admin) 테이블 (선택사항 - Supabase Auth 사용 시 불필요)
CREATE TABLE IF NOT EXISTS admin_users (
  id BIGSERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 인덱스 추가 (성능 향상)
CREATE INDEX IF NOT EXISTS idx_press_created_at ON press(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON guestbook(created_at DESC);

-- Row Level Security (RLS) 정책 설정
-- 보도, 미디어, 방명록은 모든 사용자가 읽기 가능
ALTER TABLE press ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- 읽기 정책 (모든 사용자)
CREATE POLICY "Anyone can read press" ON press FOR SELECT USING (true);
CREATE POLICY "Anyone can read media" ON media FOR SELECT USING (true);
CREATE POLICY "Anyone can read guestbook" ON guestbook FOR SELECT USING (true);

-- 쓰기 정책 (인증된 사용자만 - Supabase Auth 사용 시)
-- 또는 서비스 키를 사용하여 관리자 페이지에서 직접 쓰기
-- CREATE POLICY "Authenticated users can insert press" ON press FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can update press" ON press FOR UPDATE USING (auth.role() = 'authenticated');
-- CREATE POLICY "Authenticated users can delete press" ON press FOR DELETE USING (auth.role() = 'authenticated');

-- 방명록은 누구나 작성 가능
CREATE POLICY "Anyone can insert guestbook" ON guestbook FOR INSERT WITH CHECK (true);

-- 관리자만 삭제 가능 (서비스 키 사용 또는 인증된 사용자)
-- CREATE POLICY "Authenticated users can delete guestbook" ON guestbook FOR DELETE USING (auth.role() = 'authenticated');

-- 참고: 관리자 페이지에서 직접 쓰기/삭제하려면 Supabase 서비스 키(service_role)를 사용하거나
-- Supabase Auth를 설정하여 인증된 사용자만 쓰기/삭제할 수 있도록 해야 합니다.
