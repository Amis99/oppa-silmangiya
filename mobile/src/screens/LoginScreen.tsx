import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';

import { RootStackParamList, Region, SupportedLanguage } from '../types';
import { colors } from '../utils/theme';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';
import { generateNonce, sha256 } from '../services/authService';
import {
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_IOS_CLIENT_ID,
  GOOGLE_ANDROID_CLIENT_ID,
} from '../config/auth.config';

// Web browser 세션 완료 처리
WebBrowser.maybeCompleteAuthSession();

const oppaCharacter = require('../../assets/images/oppa-character.jpg');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
};

export default function LoginScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { login, loginWithGoogle, loginWithApple, startAsGuest, isLoading, error, clearError } = useAuthStore();
  const { language, region } = useUserStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);

  // Google 로그인 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  });

  // Apple 로그인 가능 여부 확인
  useEffect(() => {
    const checkAppleAvailability = async () => {
      const available = await AppleAuthentication.isAvailableAsync();
      setIsAppleAvailable(available);
    };
    checkAppleAvailability();
  }, []);

  // Google 로그인 응답 처리
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      if (id_token) {
        handleGoogleLogin(id_token);
      }
    }
  }, [response]);

  const validateInputs = (): boolean => {
    if (!email.trim()) {
      setLocalError(t('auth.emailRequired'));
      return false;
    }
    if (!password) {
      setLocalError(t('auth.passwordRequired'));
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    clearError();
    setLocalError(null);

    if (!validateInputs()) return;

    try {
      await login(email.trim(), password);
      navigation.replace('Home');
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleGuestPlay = () => {
    startAsGuest(language || 'ko', (region as Region) || 'korea');
    navigation.replace('Home');
  };

  // Google 로그인 처리
  const handleGoogleLogin = async (idToken: string) => {
    try {
      await loginWithGoogle(
        idToken,
        (region as Region) || 'korea',
        (language as SupportedLanguage) || 'ko'
      );
      navigation.replace('Home');
    } catch (err) {
      // Error is handled by the store
    }
  };

  // Google 로그인 버튼 클릭
  const handleGooglePress = async () => {
    clearError();
    setLocalError(null);

    if (request) {
      await promptAsync();
    } else {
      Alert.alert('Error', 'Google 로그인을 사용할 수 없습니다.');
    }
  };

  // Apple 로그인 처리
  const handleAppleLogin = async () => {
    clearError();
    setLocalError(null);

    try {
      // Nonce 생성
      const nonce = await generateNonce();
      const hashedNonce = await sha256(nonce);

      // Apple 로그인 요청
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        nonce: hashedNonce,
      });

      if (credential.identityToken) {
        await loginWithApple(
          credential.identityToken,
          nonce,
          (region as Region) || 'korea',
          (language as SupportedLanguage) || 'ko',
          credential.fullName
        );
        navigation.replace('Home');
      }
    } catch (err: any) {
      if (err.code !== 'ERR_REQUEST_CANCELED') {
        setLocalError('Apple 로그인 중 오류가 발생했습니다.');
      }
    }
  };

  const displayError = localError || error;

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Image source={oppaCharacter} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>{t('app.name')}</Text>
            <Text style={styles.subtitle}>{t('auth.login')}</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {displayError && (
              <View style={styles.errorContainer}>
                <Icon name="alert-circle" size={20} color={colors.error} />
                <Text style={styles.errorText}>{displayError}</Text>
              </View>
            )}

            <TextInput
              mode="outlined"
              label={t('auth.email')}
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setLocalError(null);
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              left={<TextInput.Icon icon="email" color={colors.textSecondary} />}
            />

            <TextInput
              mode="outlined"
              label={t('auth.password')}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setLocalError(null);
              }}
              secureTextEntry={!showPassword}
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              left={<TextInput.Icon icon="lock" color={colors.textSecondary} />}
              right={
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowPassword(!showPassword)}
                  color={colors.textSecondary}
                />
              }
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPasswordText}>{t('auth.forgotPassword')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>{t('auth.login')}</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('auth.orContinueWith')}</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity
              style={[styles.socialButton, !request && styles.buttonDisabled]}
              onPress={handleGooglePress}
              disabled={isLoading || !request}
              activeOpacity={0.8}
            >
              <Icon name="google" size={24} color="#DB4437" />
              <Text style={styles.socialButtonText}>{t('auth.googleLogin')}</Text>
            </TouchableOpacity>

            {(Platform.OS === 'ios' && isAppleAvailable) && (
              <TouchableOpacity
                style={[styles.socialButton, styles.appleButton]}
                onPress={handleAppleLogin}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <Icon name="apple" size={24} color="#FFFFFF" />
                <Text style={[styles.socialButtonText, styles.appleButtonText]}>
                  {t('auth.appleLogin')}
                </Text>
              </TouchableOpacity>
            )}

            {/* Guest Play */}
            <TouchableOpacity
              style={styles.guestButton}
              onPress={handleGuestPlay}
              activeOpacity={0.8}
            >
              <Icon name="account-off" size={20} color={colors.primary} />
              <Text style={styles.guestButtonText}>{t('auth.guestPlay')}</Text>
            </TouchableOpacity>

            <Text style={styles.guestWarning}>{t('auth.guestWarning')}</Text>

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <Text style={styles.footerText}>{t('auth.noAccount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>{t('auth.register')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.errorLight + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: colors.error,
    marginLeft: 8,
    flex: 1,
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    marginHorizontal: 16,
    color: colors.textSecondary,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 25,
    paddingVertical: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  socialButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  appleButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  appleButtonText: {
    color: '#FFFFFF',
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    marginTop: 8,
  },
  guestButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  guestWarning: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
  },
  registerLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
