# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 가입하고 새 프로젝트를 생성하세요.
2. 프로젝트 설정에서 **API Settings**로 이동하여 다음 정보를 확인하세요:
   - Project URL
   - anon/public key

## 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

예시:
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 3. 데이터베이스 스키마 생성

1. Supabase Dashboard에서 **SQL Editor**로 이동하세요.
2. `SUPABASE_SCHEMA.sql` 파일의 내용을 복사하여 SQL Editor에 붙여넣고 실행하세요.

이 스크립트는 다음 테이블을 생성합니다:
- `press` - 보도 자료
- `media` - 미디어 (long-form, shorts)
- `guestbook` - 방명록

## 4. Row Level Security (RLS) 설정

기본적으로 모든 사용자가 읽을 수 있도록 설정되어 있습니다. 관리자 페이지에서 쓰기/삭제를 하려면:

### 옵션 1: 서비스 키 사용 (권장 - 개발 환경)
- Supabase Dashboard > Settings > API에서 **service_role key**를 복사
- 관리자 페이지에서만 사용 (절대 클라이언트에 노출하지 마세요!)

### 옵션 2: Supabase Auth 사용 (프로덕션)
- Supabase Auth를 설정하고 인증된 사용자만 쓰기/삭제 가능하도록 RLS 정책 수정
- `SUPABASE_SCHEMA.sql`의 주석 처리된 정책을 활성화

## 5. 초기 데이터 입력 (선택사항)

기존 localStorage 데이터를 Supabase로 마이그레이션하려면:

1. Supabase Dashboard > Table Editor에서 각 테이블에 데이터를 직접 입력하거나
2. SQL Editor에서 INSERT 문을 사용하여 데이터를 추가하세요.

## 6. 테스트

1. 개발 서버를 재시작하세요: `npm run dev`
2. `/manager` 페이지에서 로그인하여 데이터 추가/삭제가 정상 작동하는지 확인하세요.
3. `/press`, `/media`, `/guestbook` 페이지에서 데이터가 표시되는지 확인하세요.

## 문제 해결

### "Supabase 환경 변수가 설정되지 않았습니다" 경고
- `.env` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수 이름이 정확한지 확인 (`VITE_` 접두사 필수)
- 개발 서버를 재시작

### RLS 정책 오류
- Supabase Dashboard > Authentication > Policies에서 정책 확인
- 필요시 `SUPABASE_SCHEMA.sql`의 정책을 수정하여 재실행

### 데이터가 표시되지 않음
- Supabase Dashboard > Table Editor에서 데이터가 있는지 확인
- 브라우저 콘솔에서 에러 메시지 확인
- 네트워크 탭에서 API 요청이 성공했는지 확인
