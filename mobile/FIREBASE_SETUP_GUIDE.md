# Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com) 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름: `oppa-silmangiya` 입력
4. Google Analytics 설정 (선택사항)
5. 프로젝트 생성 완료

## 2. Firebase 앱 등록

### 웹 앱 등록 (필수)
1. 프로젝트 설정 > 일반 > "앱 추가" > 웹 (</>) 선택
2. 앱 닉네임: `oppa-silmangiya-web`
3. Firebase SDK 설정 복사:
   ```javascript
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     storageBucket: "...",
     messagingSenderId: "...",
     appId: "..."
   };
   ```

### iOS 앱 등록
1. 프로젝트 설정 > 일반 > "앱 추가" > iOS 선택
2. 번들 ID: `com.oppasilmangiya.app`
3. `GoogleService-Info.plist` 다운로드

### Android 앱 등록
1. 프로젝트 설정 > 일반 > "앱 추가" > Android 선택
2. 패키지 이름: `com.oppasilmangiya.app`
3. SHA-1 인증서 지문 추가:
   ```bash
   # 개발용 (Windows)
   keytool -list -v -keystore "%USERPROFILE%\.android\debug.keystore" -alias androiddebugkey -storepass android -keypass android

   # 또는 Expo에서
   eas credentials
   ```
4. `google-services.json` 다운로드 후 `mobile/` 폴더에 저장

## 3. Authentication 설정

### 이메일/비밀번호 로그인
1. Authentication > Sign-in method
2. "이메일/비밀번호" 활성화

### Google 로그인
1. Authentication > Sign-in method > Google
2. "사용 설정" 활성화
3. 프로젝트 지원 이메일 설정

### Apple 로그인 (iOS)
1. Authentication > Sign-in method > Apple
2. "사용 설정" 활성화
3. Apple Developer 설정 필요:
   - Apple Developer Console > Certificates, Identifiers & Profiles
   - Identifiers > App IDs > `com.oppasilmangiya.app` > Sign In with Apple 활성화
   - Service IDs 생성

## 4. Google Cloud Console 설정 (OAuth)

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. Firebase 프로젝트 선택
3. API 및 서비스 > 사용자 인증 정보

### OAuth 2.0 클라이언트 ID 생성

#### 웹 클라이언트
1. "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"
2. 애플리케이션 유형: "웹 애플리케이션"
3. 승인된 리디렉션 URI 추가:
   - `https://auth.expo.io/@your-expo-username/oppa-silmangiya`

#### iOS 클라이언트
1. "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"
2. 애플리케이션 유형: "iOS"
3. 번들 ID: `com.oppasilmangiya.app`

#### Android 클라이언트
1. "사용자 인증 정보 만들기" > "OAuth 클라이언트 ID"
2. 애플리케이션 유형: "Android"
3. 패키지 이름: `com.oppasilmangiya.app`
4. SHA-1 인증서 지문 입력

## 5. Firestore 데이터베이스 설정

1. Firestore Database > "데이터베이스 만들기"
2. 프로덕션 모드 선택
3. 위치: `asia-northeast3` (서울)
4. 보안 규칙 설정:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 사용자 프로필
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // 스테이지 데이터 (관리자만 쓰기)
    match /stages/{stageId} {
      allow read: if true;
      allow write: if false; // 관리자 콘솔에서만 관리
    }

    // 랭킹 데이터
    match /rankings/{rankingId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 6. 환경 변수 설정

`.env` 파일 생성 (`.env.example` 참고):

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
```

## 7. 코드에 환경 변수 적용

`src/config/auth.config.ts` 수정:

```typescript
export const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '';
export const GOOGLE_IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';
export const GOOGLE_ANDROID_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '';
```

## 8. 테스트

```bash
# Expo Go로 테스트 (개발)
npx expo start

# 프로덕션 빌드 테스트
eas build --platform ios --profile preview
eas build --platform android --profile preview
```

## 문제 해결

### Google 로그인이 안 될 때
1. OAuth 클라이언트 ID가 올바른지 확인
2. 승인된 리디렉션 URI가 정확한지 확인
3. SHA-1 지문이 등록되었는지 확인 (Android)

### Apple 로그인이 안 될 때
1. Apple Developer에서 Sign In with Apple 활성화 확인
2. Service ID가 Firebase에 올바르게 설정되었는지 확인
3. iOS 실제 기기에서만 동작 (시뮬레이터 X)

### Firestore 권한 오류
1. 보안 규칙 확인
2. 인증 상태 확인
