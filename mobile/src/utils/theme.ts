import { MD3LightTheme, configureFonts } from 'react-native-paper';

// 앱 색상 테마
export const colors = {
  primary: '#FF6B9D', // 메인 핑크
  primaryLight: '#FF8FB5',
  primaryDark: '#E5557F',
  secondary: '#6B9DFF', // 보조 블루
  secondaryLight: '#8FB5FF',
  secondaryDark: '#557FE5',
  success: '#4CAF50', // 정답 초록
  successLight: '#81C784',
  error: '#F44336', // 오답 빨강
  errorLight: '#E57373',
  warning: '#FF9800',
  background: '#FAFAFA',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#BDBDBD',
  border: '#E0E0E0',
  divider: '#EEEEEE',
  // 게임 모드 색상
  chat: {
    leftBubble: '#F5F5F5',
    rightBubble: '#FFE8EF',
    highlight: '#FFEB3B',
  },
  article: {
    background: '#FFF8E1',
    title: '#5D4037',
    highlight: '#FFEB3B',
  },
  text_mode: {
    background: '#E3F2FD',
    title: '#1565C0',
    highlight: '#FFEB3B',
  },
};

// React Native Paper 테마
export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    primaryContainer: colors.primaryLight,
    secondary: colors.secondary,
    secondaryContainer: colors.secondaryLight,
    error: colors.error,
    background: colors.background,
    surface: colors.surface,
    onSurface: colors.text,
    outline: colors.border,
  },
  roundness: 12,
};

// 공통 스타일
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: colors.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
  },
  body: {
    fontSize: 16,
    color: colors.text,
  },
  caption: {
    fontSize: 14,
    color: colors.textSecondary,
  },
};

export default theme;
