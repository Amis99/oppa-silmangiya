# 오빠 실망이야 - 앱 배포 TODO

## 1. 필수 작업 (배포 전 반드시 필요)

### 앱 아이콘 & 스플래시 스크린
- [ ] 앱 아이콘 이미지 (1024x1024 PNG)
- [ ] 스플래시 스크린 이미지 (1284x2778 PNG 권장)
- [ ] app.json에 icon, splash.image 경로 추가

### 스토어 등록 정보
- [ ] 앱 스크린샷 (최소 2장, 권장 5~8장)
- [ ] 앱 설명 텍스트 (한국어/영어)
- [ ] 개인정보처리방침 URL
- [ ] 앱 카테고리 선택 (교육/퀴즈 게임)

---

## 2. 선택 작업 (나중에 추가 가능)

### 백엔드/서버 연동
- [ ] Firebase 설정 (`google-services.json` 실제 파일 필요)
- [ ] 사용자 인증 (Google/Apple 로그인)
- [ ] 랭킹 서버 연동 (현재 로컬 데이터만)
- [ ] 스테이지 데이터 서버 관리

### 추가 기능
- [ ] 광고 (AdMob 등)
- [ ] 인앱 결제
- [ ] 푸시 알림

---

## 3. 빌드 & 배포 명령어

```bash
# EAS 빌드 설정 (처음 한 번)
npx eas-cli login
npx eas build:configure

# Android APK/AAB 빌드
npx eas build --platform android

# iOS 빌드 (Mac 필요 또는 EAS 클라우드)
npx eas build --platform ios

# 스토어 제출
npx eas submit --platform android
npx eas submit --platform ios
```

---

## 4. 현재 완료된 것

- [x] 게임 로직 (20개 스테이지, 3개 variant)
- [x] UI/UX (홈, 게임, 결과, 랭킹, 설정)
- [x] 다국어 지원 (한국어/영어/일본어)
- [x] 로컬 데이터 저장 (레벨, 점수 유지)
- [x] 채팅 모드 게임플레이
- [x] 이미지 포함 메시지 지원
- [x] 정답 힌트 제거된 자연스러운 대화

---

## 5. 스토어 제출 체크리스트

### Google Play Store
- [ ] Google Play Console 개발자 계정 ($25 일회성)
- [ ] AAB 파일 업로드
- [ ] 스토어 등록정보 작성
- [ ] 콘텐츠 등급 설문 완료
- [ ] 개인정보처리방침 URL 등록

### Apple App Store
- [ ] Apple Developer Program 가입 ($99/년)
- [ ] App Store Connect에서 앱 생성
- [ ] IPA 파일 업로드
- [ ] 앱 심사 제출

---

*마지막 업데이트: 2025-12-06*
