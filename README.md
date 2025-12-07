# 오빠 실망이야

한국어 맞춤법/문법 학습 모바일 게임

## 프로젝트 구조

```
오빠-실망이야/
├── mobile/          # React Native 모바일 앱
├── admin/           # Next.js 관리자 대시보드
└── firebase/        # Firebase 설정 (추후)
```

## 모바일 앱 (mobile/)

### 기술 스택
- React Native + Expo
- TypeScript
- Zustand (상태관리)
- React Navigation
- React Native Paper
- i18next (다국어)
- Firebase

### 실행 방법

```bash
cd mobile

# 의존성 설치
npm install

# 개발 서버 실행
npm start

# Android 실행
npm run android

# iOS 실행
npm run ios
```

### 주요 화면
- **SplashScreen**: 앱 로딩 화면
- **LanguageSelectScreen**: 첫 실행 시 언어 선택
- **HomeScreen**: 메인 화면 (게임 시작, 랭킹, 설정)
- **GameScreen**: 게임 플레이 화면
- **ResultScreen**: 결과 화면
- **RankingScreen**: 랭킹 조회
- **SettingsScreen**: 설정

### 게임 모드
1. **카톡 대화형 (chat)**: 카카오톡 스타일 대화에서 오류 찾기
2. **잡지/기사형 (article)**: 기사 형태의 글에서 오류 찾기
3. **비문학형 (text)**: 수능 스타일 지문에서 오류 찾기

---

## 관리자 대시보드 (admin/)

### 기술 스택
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase

### 실행 방법

```bash
cd admin

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### 주요 기능
- **대시보드**: 통계 및 최근 활동 확인
- **스테이지 관리**: 문제(스테이지) CRUD
- **유저 관리**: 유저 목록 조회 및 관리
- **설정**: 게임 기본 설정

### 스테이지 추가 방법
1. 관리자 페이지에서 "새 스테이지" 클릭
2. 기본 정보 입력 (레벨, 모드, 제한시간)
3. 모드에 맞는 콘텐츠 입력
4. 오류 후보 추가 (최소 2개)
5. 저장

---

## Firebase 설정

### 환경 변수 (mobile/.env)
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### Firestore 컬렉션
- `stages`: 스테이지(문제) 데이터
- `users`: 유저 데이터
- `rankings`: 랭킹 데이터

---

## 다국어 지원

현재 지원 언어:
- 한국어 (ko)
- English (en)
- 日本語 (ja)
- 简体中文 (zh-CN)
- العربية (ar)

언어 파일 위치: `mobile/src/i18n/locales/`

---

## 라이선스

Private - All Rights Reserved
