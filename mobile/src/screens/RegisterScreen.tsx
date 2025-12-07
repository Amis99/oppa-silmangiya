import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { Text, TextInput, ActivityIndicator, Checkbox } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList, Region, SupportedLanguage } from '../types';
import { colors } from '../utils/theme';
import { useAuthStore } from '../stores/authStore';
import { useUserStore } from '../stores/userStore';

const oppaCharacter = require('../../assets/images/oppa-character.jpg');

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const regions: { code: Region; nameKey: string }[] = [
  { code: 'korea', nameKey: 'region.korea' },
  { code: 'asia', nameKey: 'region.asia' },
  { code: 'europe', nameKey: 'region.europe' },
  { code: 'north_america', nameKey: 'region.north_america' },
  { code: 'south_america', nameKey: 'region.south_america' },
  { code: 'middle_east_africa', nameKey: 'region.middle_east_africa' },
  { code: 'oceania', nameKey: 'region.oceania' },
];

export default function RegisterScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { register, isLoading, error, clearError } = useAuthStore();
  const { language } = useUserStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<Region>('korea');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [showRegionPicker, setShowRegionPicker] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateInputs = (): boolean => {
    if (!email.trim()) {
      setLocalError(t('auth.emailRequired'));
      return false;
    }
    if (!password) {
      setLocalError(t('auth.passwordRequired'));
      return false;
    }
    if (password.length < 6) {
      setLocalError(t('auth.passwordMinLength'));
      return false;
    }
    if (password !== confirmPassword) {
      setLocalError(t('auth.passwordMismatch'));
      return false;
    }
    if (!nickname.trim()) {
      setLocalError(t('auth.nicknameRequired'));
      return false;
    }
    if (nickname.trim().length < 2) {
      setLocalError(t('auth.nicknameMinLength'));
      return false;
    }
    if (!agreedToTerms || !agreedToPrivacy) {
      setLocalError(t('auth.agreeToTerms') + ' / ' + t('auth.agreeToPrivacy'));
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    clearError();
    setLocalError(null);

    if (!validateInputs()) return;

    try {
      await register(
        email.trim(),
        password,
        nickname.trim(),
        selectedRegion,
        (language as SupportedLanguage) || 'ko'
      );
      navigation.replace('Home');
    } catch (err) {
      // Error is handled by the store
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
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-left" size={24} color={colors.text} />
            </TouchableOpacity>
            <Image source={oppaCharacter} style={styles.logo} resizeMode="contain" />
            <Text style={styles.title}>{t('auth.register')}</Text>
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

            <TextInput
              mode="outlined"
              label={t('auth.confirmPassword')}
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setLocalError(null);
              }}
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              left={<TextInput.Icon icon="lock-check" color={colors.textSecondary} />}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  color={colors.textSecondary}
                />
              }
            />

            <TextInput
              mode="outlined"
              label={t('auth.nickname')}
              value={nickname}
              onChangeText={(text) => {
                setNickname(text);
                setLocalError(null);
              }}
              style={styles.input}
              outlineColor={colors.border}
              activeOutlineColor={colors.primary}
              left={<TextInput.Icon icon="account" color={colors.textSecondary} />}
            />

            {/* Region Picker */}
            <TouchableOpacity
              style={styles.regionPicker}
              onPress={() => setShowRegionPicker(!showRegionPicker)}
            >
              <Icon name="earth" size={24} color={colors.textSecondary} />
              <Text style={styles.regionPickerText}>
                {t(regions.find((r) => r.code === selectedRegion)?.nameKey || '')}
              </Text>
              <Icon
                name={showRegionPicker ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>

            {showRegionPicker && (
              <View style={styles.regionList}>
                {regions.map((region) => (
                  <TouchableOpacity
                    key={region.code}
                    style={[
                      styles.regionItem,
                      selectedRegion === region.code && styles.regionItemSelected,
                    ]}
                    onPress={() => {
                      setSelectedRegion(region.code);
                      setShowRegionPicker(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.regionItemText,
                        selectedRegion === region.code && styles.regionItemTextSelected,
                      ]}
                    >
                      {t(region.nameKey)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Terms Agreement */}
            <View style={styles.agreementContainer}>
              <TouchableOpacity
                style={styles.agreementRow}
                onPress={() => setAgreedToTerms(!agreedToTerms)}
              >
                <Checkbox
                  status={agreedToTerms ? 'checked' : 'unchecked'}
                  onPress={() => setAgreedToTerms(!agreedToTerms)}
                  color={colors.primary}
                />
                <Text style={styles.agreementText}>{t('auth.agreeToTerms')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
                  <Icon name="open-in-new" size={16} color={colors.primary} />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.agreementRow}
                onPress={() => setAgreedToPrivacy(!agreedToPrivacy)}
              >
                <Checkbox
                  status={agreedToPrivacy ? 'checked' : 'unchecked'}
                  onPress={() => setAgreedToPrivacy(!agreedToPrivacy)}
                  color={colors.primary}
                />
                <Text style={styles.agreementText}>{t('auth.agreeToPrivacy')}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}>
                  <Icon name="open-in-new" size={16} color={colors.primary} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.registerButtonText}>{t('auth.register')}</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t('auth.hasAccount')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.footerLink}>{t('auth.login')}</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    padding: 8,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
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
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  regionPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  regionPickerText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.text,
  },
  regionList: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  regionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  regionItemSelected: {
    backgroundColor: colors.primaryLight + '30',
  },
  regionItemText: {
    fontSize: 16,
    color: colors.text,
  },
  regionItemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  agreementContainer: {
    marginVertical: 16,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  agreementText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  registerButton: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
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
