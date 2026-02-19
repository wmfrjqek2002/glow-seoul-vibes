-- RLS 쓰기 정책 추가
-- Supabase Dashboard > SQL Editor에서 이 파일 내용을 실행하세요.
-- 관리자 페이지(anon 키)에서 보도/미디어 추가·삭제가 가능해집니다.

-- press: INSERT, UPDATE, DELETE 허용
CREATE POLICY "Allow insert press" ON press FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update press" ON press FOR UPDATE USING (true);
CREATE POLICY "Allow delete press" ON press FOR DELETE USING (true);

-- media: INSERT, UPDATE, DELETE 허용
CREATE POLICY "Allow insert media" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update media" ON media FOR UPDATE USING (true);
CREATE POLICY "Allow delete media" ON media FOR DELETE USING (true);

-- guestbook: DELETE 허용 (이미 INSERT는 있음)
CREATE POLICY "Allow delete guestbook" ON guestbook FOR DELETE USING (true);
