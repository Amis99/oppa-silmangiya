import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../types';
import { colors } from '../utils/theme';
import { useAuthStore } from '../stores/authStore';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'>;
};

const FIRST_LAUNCH_KEY = '@first_launch';

export default function SplashScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { initialize, isAuthenticated, isGuest } = useAuthStore();

  // 애니메이션 값
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // 로고 애니메이션
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // 초기 화면 결정
    const checkFirstLaunch = async () => {
      try {
        // Auth 상태 초기화
        await initialize();

        const hasLaunched = await AsyncStorage.getItem(FIRST_LAUNCH_KEY);

        // 2초 후 다음 화면으로 이동
        setTimeout(() => {
          if (hasLaunched === null) {
            // 첫 실행 - 언어 선택 화면으로
            navigation.replace('LanguageSelect');
          } else if (isAuthenticated || isGuest) {
            // 로그인 또는 게스트 상태 - 홈 화면으로
            navigation.replace('Home');
          } else {
            // 로그인 필요 - 로그인 화면으로
            navigation.replace('Login');
          }
        }, 2000);
      } catch (error) {
        console.error('Error checking first launch:', error);
        navigation.replace('LanguageSelect');
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.logo}>{t('app.name')}</Text>
        <Text style={styles.tagline}>{t('app.tagline')}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});
