import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Switch, TextInput, Divider, Portal, Modal, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootStackParamList, SupportedLanguage, Region } from '../types';
import { colors } from '../utils/theme';
import { changeLanguage } from '../i18n';
import { useSettingsStore } from '../stores/settingsStore';
import { useUserStore } from '../stores/userStore';
import { useAuthStore } from '../stores/authStore';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const languages: { code: SupportedLanguage; name: string }[] = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'ar', name: 'العربية' },
];

const regions: { code: Region; name: string }[] = [
  { code: 'korea', name: 'region.korea' },
  { code: 'asia', name: 'region.asia' },
  { code: 'europe', name: 'region.europe' },
  { code: 'north_america', name: 'region.north_america' },
  { code: 'south_america', name: 'region.south_america' },
  { code: 'middle_east_africa', name: 'region.middle_east_africa' },
  { code: 'oceania', name: 'region.oceania' },
];

export default function SettingsScreen({ navigation }: Props) {
  const { t, i18n } = useTranslation();
  const { soundEnabled, hapticEnabled, notificationsEnabled, setSoundEnabled, setHapticEnabled, setNotificationsEnabled } = useSettingsStore();
  const { nickname, region, setNickname, setRegion } = useUserStore();
  const { isAuthenticated, isGuest, logout, deleteAccount, isLoading, user } = useAuthStore();

  // authStore의 user 닉네임을 우선 사용
  const displayNickname = user?.nickname || nickname;

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [regionModalVisible, setRegionModalVisible] = useState(false);
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [tempNickname, setTempNickname] = useState(displayNickname);
  const [deletePassword, setDeletePassword] = useState('');

  const { setLanguage } = useUserStore();

  const handleLanguageChange = async (code: SupportedLanguage) => {
    await changeLanguage(code);
    setLanguage(code);
    setLanguageModalVisible(false);
  };

  const handleRegionChange = (code: Region) => {
    setRegion(code);
    setRegionModalVisible(false);
  };

  const { updateProfile } = useAuthStore();

  const handleNicknameSave = async () => {
    if (tempNickname.trim().length >= 2) {
      const newNickname = tempNickname.trim();
      setNickname(newNickname);
      // authStore도 동기화
      await updateProfile({ nickname: newNickname });
      setNicknameModalVisible(false);
    } else {
      Alert.alert('Error', 'Nickname must be at least 2 characters');
    }
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === i18n.language);
    return lang?.name || 'English';
  };

  const handleLogout = async () => {
    Alert.alert(
      t('auth.logout'),
      '',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.confirm'),
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      Alert.alert('Error', t('auth.passwordRequired'));
      return;
    }

    try {
      await deleteAccount(deletePassword);
      setDeleteAccountModalVisible(false);
      Alert.alert(t('auth.accountDeleted'));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* 계정 섹션 */}
        <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingItem} onPress={() => {
            setTempNickname(displayNickname);
            setNicknameModalVisible(true);
          }}>
            <View style={styles.settingLeft}>
              <Icon name="account" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.nickname')}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{displayNickname || 'Player'}</Text>
              <Icon name="chevron-right" size={20} color={colors.textLight} />
            </View>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity style={styles.settingItem} onPress={() => setRegionModalVisible(true)}>
            <View style={styles.settingLeft}>
              <Icon name="earth" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.region')}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{t(`region.${region}`)}</Text>
              <Icon name="chevron-right" size={20} color={colors.textLight} />
            </View>
          </TouchableOpacity>
        </View>

        {/* 앱 설정 섹션 */}
        <Text style={styles.sectionTitle}>{t('settings.title')}</Text>
        <View style={styles.section}>
          <TouchableOpacity style={styles.settingItem} onPress={() => setLanguageModalVisible(true)}>
            <View style={styles.settingLeft}>
              <Icon name="translate" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.language')}</Text>
            </View>
            <View style={styles.settingRight}>
              <Text style={styles.settingValue}>{getCurrentLanguageName()}</Text>
              <Icon name="chevron-right" size={20} color={colors.textLight} />
            </View>
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="volume-high" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.sound')}</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              color={colors.primary}
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="vibrate" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.haptic')}</Text>
            </View>
            <Switch
              value={hapticEnabled}
              onValueChange={setHapticEnabled}
              color={colors.primary}
            />
          </View>

          <Divider style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="bell" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.notifications')}</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              color={colors.primary}
            />
          </View>
        </View>

        {/* 정보 섹션 */}
        <Text style={styles.sectionTitle}>{t('settings.about')}</Text>
        <View style={styles.section}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Icon name="information" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.version')}</Text>
            </View>
            <Text style={styles.settingValue}>1.0.0</Text>
          </View>

          <Divider style={styles.divider} />

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('PrivacyPolicy')}
          >
            <View style={styles.settingLeft}>
              <Icon name="shield-lock" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.privacy')}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>

          <Divider style={styles.divider} />

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate('TermsOfService')}
          >
            <View style={styles.settingLeft}>
              <Icon name="file-document" size={22} color={colors.textSecondary} />
              <Text style={styles.settingLabel}>{t('settings.terms')}</Text>
            </View>
            <Icon name="chevron-right" size={20} color={colors.textLight} />
          </TouchableOpacity>
        </View>

        {/* 로그인 상태에 따른 계정 관리 섹션 */}
        {(isAuthenticated || isGuest) && (
          <>
            <Text style={styles.sectionTitle}>{t('settings.account')}</Text>
            <View style={styles.section}>
              {isAuthenticated && (
                <>
                  <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
                    <View style={styles.settingLeft}>
                      <Icon name="logout" size={22} color={colors.textSecondary} />
                      <Text style={styles.settingLabel}>{t('auth.logout')}</Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={colors.textLight} />
                  </TouchableOpacity>

                  <Divider style={styles.divider} />

                  <TouchableOpacity
                    style={styles.settingItem}
                    onPress={() => {
                      Alert.alert(
                        t('auth.deleteAccount'),
                        t('auth.deleteAccountConfirm'),
                        [
                          { text: t('common.cancel'), style: 'cancel' },
                          {
                            text: t('common.confirm'),
                            style: 'destructive',
                            onPress: () => setDeleteAccountModalVisible(true),
                          },
                        ]
                      );
                    }}
                  >
                    <View style={styles.settingLeft}>
                      <Icon name="account-remove" size={22} color={colors.error} />
                      <Text style={[styles.settingLabel, { color: colors.error }]}>
                        {t('auth.deleteAccount')}
                      </Text>
                    </View>
                    <Icon name="chevron-right" size={20} color={colors.textLight} />
                  </TouchableOpacity>
                </>
              )}

              {isGuest && (
                <TouchableOpacity
                  style={styles.settingItem}
                  onPress={() => {
                    logout();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
                  }}
                >
                  <View style={styles.settingLeft}>
                    <Icon name="login" size={22} color={colors.primary} />
                    <Text style={[styles.settingLabel, { color: colors.primary }]}>
                      {t('auth.login')} / {t('auth.register')}
                    </Text>
                  </View>
                  <Icon name="chevron-right" size={20} color={colors.textLight} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* 언어 선택 모달 */}
      <Portal>
        <Modal
          visible={languageModalVisible}
          onDismiss={() => setLanguageModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>{t('language.select')}</Text>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.modalItem,
                i18n.language === lang.code && styles.modalItemSelected,
              ]}
              onPress={() => handleLanguageChange(lang.code)}
            >
              <Text
                style={[
                  styles.modalItemText,
                  i18n.language === lang.code && styles.modalItemTextSelected,
                ]}
              >
                {lang.name}
              </Text>
              {i18n.language === lang.code && (
                <Icon name="check" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Modal>

        {/* 지역 선택 모달 */}
        <Modal
          visible={regionModalVisible}
          onDismiss={() => setRegionModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>{t('settings.region')}</Text>
          {regions.map((r) => (
            <TouchableOpacity
              key={r.code}
              style={[
                styles.modalItem,
                region === r.code && styles.modalItemSelected,
              ]}
              onPress={() => handleRegionChange(r.code)}
            >
              <Text
                style={[
                  styles.modalItemText,
                  region === r.code && styles.modalItemTextSelected,
                ]}
              >
                {t(r.name)}
              </Text>
              {region === r.code && (
                <Icon name="check" size={20} color={colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </Modal>

        {/* 닉네임 입력 모달 */}
        <Modal
          visible={nicknameModalVisible}
          onDismiss={() => setNicknameModalVisible(false)}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>{t('settings.nickname')}</Text>
          <TextInput
            mode="outlined"
            value={tempNickname}
            onChangeText={setTempNickname}
            maxLength={20}
            style={styles.nicknameInput}
            outlineColor={colors.border}
            activeOutlineColor={colors.primary}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleNicknameSave}>
            <Text style={styles.saveButtonText}>{t('common.save')}</Text>
          </TouchableOpacity>
        </Modal>

        {/* 계정 삭제 모달 */}
        <Modal
          visible={deleteAccountModalVisible}
          onDismiss={() => {
            setDeleteAccountModalVisible(false);
            setDeletePassword('');
          }}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>{t('auth.deleteAccount')}</Text>
          <Text style={styles.deleteWarning}>{t('auth.deleteAccountPassword')}</Text>
          <TextInput
            mode="outlined"
            label={t('auth.password')}
            value={deletePassword}
            onChangeText={setDeletePassword}
            secureTextEntry
            style={styles.nicknameInput}
            outlineColor={colors.border}
            activeOutlineColor={colors.error}
          />
          <TouchableOpacity
            style={[styles.saveButton, styles.deleteButton]}
            onPress={handleDeleteAccount}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>{t('auth.deleteAccount')}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              setDeleteAccountModalVisible(false);
              setDeletePassword('');
            }}
          >
            <Text style={styles.cancelButtonText}>{t('common.cancel')}</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 24,
    marginBottom: 12,
    paddingLeft: 4,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: colors.textSecondary,
    marginRight: 4,
  },
  divider: {
    marginLeft: 50,
  },
  modal: {
    backgroundColor: colors.surface,
    margin: 20,
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  modalItemSelected: {
    backgroundColor: colors.primaryLight + '30',
  },
  modalItemText: {
    fontSize: 16,
    color: colors.text,
  },
  modalItemTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  nicknameInput: {
    marginBottom: 16,
    backgroundColor: colors.surface,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteWarning: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: colors.error,
  },
  cancelButton: {
    marginTop: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
});
