/**
 * 소셜 로그인 설정
 *
 * 환경 변수에서 OAuth 클라이언트 ID를 가져옵니다.
 * .env 파일에 설정값을 추가하세요. (.env.example 참고)
 *
 * 설정 방법은 FIREBASE_SETUP_GUIDE.md 참고
 */

// Google OAuth Client IDs (환경 변수에서 로드)
export const GOOGLE_WEB_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '';

export const GOOGLE_IOS_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || '';

export const GOOGLE_ANDROID_CLIENT_ID =
  process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || '';

// Expo Go에서 테스트할 때 사용 (웹 클라이언트 ID 사용)
export const EXPO_CLIENT_ID = GOOGLE_WEB_CLIENT_ID;
