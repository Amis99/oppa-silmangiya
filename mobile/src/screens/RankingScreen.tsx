import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text, Surface, SegmentedButtons } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TFunction } from 'i18next';

import { RootStackParamList, RankingEntry, RankingFilter } from '../types';
import { colors } from '../utils/theme';
import { useUserStore } from '../stores/userStore';
import { getGlobalRanking, getRegionalRanking, getCountryRanking } from '../services/ranking';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Ranking'>;
};

const MAX_RANKINGS = 100;

const countryFlags: Record<string, string> = {
  KR: '🇰🇷',
  JP: '🇯🇵',
  US: '🇺🇸',
  CN: '🇨🇳',
  DE: '🇩🇪',
  AU: '🇦🇺',
};

// 상대 시간 포맷팅 (다국어 지원)
function formatRelativeTime(date: Date, t: TFunction): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return t('ranking.justNow');
  if (diffMins < 60) return t('ranking.minutesAgo', { count: diffMins });
  if (diffHours < 24) return t('ranking.hoursAgo', { count: diffHours });
  if (diffDays < 7) return t('ranking.daysAgo', { count: diffDays });
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export default function RankingScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const { id: currentUserId, nickname: userNickname, highScore, region: userRegion, country: userCountry, currentLevel } = useUserStore();

  const [filter, setFilter] = useState<RankingFilter>('global');
  const [rankings, setRankings] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Firebase에서 랭킹 데이터 가져오기
  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      try {
        let fetchedRankings: RankingEntry[] = [];

        switch (filter) {
          case 'global':
            fetchedRankings = await getGlobalRanking(MAX_RANKINGS);
            break;
          case 'regional':
            fetchedRankings = await getRegionalRanking(userRegion, MAX_RANKINGS);
            break;
          case 'country':
            fetchedRankings = await getCountryRanking(userCountry, MAX_RANKINGS);
            break;
        }

        setRankings(fetchedRankings);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
        setRankings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [filter, userRegion, userCountry]);

  // 내 순위 찾기
  const myBestRank = useMemo(() => {
    if (highScore <= 0) return 0;
    const myRankIndex = rankings.findIndex(
      entry => entry.nickname === userNickname
    );
    return myRankIndex >= 0 ? myRankIndex + 1 : 0;
  }, [rankings, userNickname, highScore]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: 'medal', color: '#FFD700' };
    if (rank === 2) return { icon: 'medal', color: '#C0C0C0' };
    if (rank === 3) return { icon: 'medal', color: '#CD7F32' };
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('ranking.title')}</Text>
        <View style={styles.placeholder} />
      </View>

      {/* 필터 */}
      <View style={styles.filterContainer}>
        <SegmentedButtons
          value={filter}
          onValueChange={(value) => setFilter(value as RankingFilter)}
          buttons={[
            { value: 'global', label: t('ranking.global') },
            { value: 'regional', label: t('ranking.regional') },
            { value: 'country', label: t('ranking.country') },
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      {/* 내 최고 기록 */}
      <Surface style={styles.myRankCard}>
        <View style={styles.myRankLeft}>
          <Text style={styles.myRankLabel}>{t('ranking.myBest')}</Text>
          <Text style={styles.myRankValue}>
            {myBestRank > 0 ? `#${myBestRank}` : '-'}
          </Text>
        </View>
        <View style={styles.myRankRight}>
          <Text style={styles.myNickname}>{userNickname || 'Player'}</Text>
          <Text style={styles.myScore}>
            {t('ranking.highScoreLabel')}: {highScore.toLocaleString()} pts
          </Text>
        </View>
      </Surface>

      {/* 랭킹 목록 */}
      <ScrollView style={styles.rankingList}>
        {loading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.emptyText}>{t('common.loading')}</Text>
          </View>
        ) : rankings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="trophy-outline" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyText}>{t('ranking.noData')}</Text>
          </View>
        ) : (
          rankings.map((entry, index) => {
            const badge = getRankBadge(index + 1);
            const isMyRecord = entry.nickname === userNickname;

            return (
              <View
                key={entry.id}
                style={[
                  styles.rankingItem,
                  isMyRecord && styles.myRankingItem
                ]}
              >
                <View style={styles.rankContainer}>
                  {badge ? (
                    <Icon name={badge.icon} size={24} color={badge.color} />
                  ) : (
                    <Text style={styles.rankNumber}>{index + 1}</Text>
                  )}
                </View>

                <View style={styles.playerInfo}>
                  <View style={styles.playerNameRow}>
                    <Text style={styles.countryFlag}>
                      {countryFlags[entry.country] || '🌍'}
                    </Text>
                    <Text style={[
                      styles.playerNickname,
                      isMyRecord && styles.myNicknameHighlight
                    ]}>
                      {entry.nickname}
                    </Text>
                    {isMyRecord && (
                      <View style={styles.myBadge}>
                        <Text style={styles.myBadgeText}>ME</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.playerSubInfo}>
                    <Text style={styles.playerLevel}>{t('ranking.levelReached', { level: entry.finalLevel })}</Text>
                    <Text style={styles.playedAt}>{formatRelativeTime(entry.playedAt, t)}</Text>
                  </View>
                </View>

                <Text style={styles.playerScore}>{entry.totalScore.toLocaleString()}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
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
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  segmentedButtons: {
    backgroundColor: colors.surface,
  },
  myRankCard: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.primaryLight + '30',
    elevation: 2,
  },
  myRankLeft: {
    marginRight: 16,
  },
  myRankLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  myRankValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  myRankRight: {
    flex: 1,
    justifyContent: 'center',
  },
  myNickname: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  myScore: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rankingList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  myRankingItem: {
    backgroundColor: colors.primaryLight + '40',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  rankContainer: {
    width: 36,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryFlag: {
    fontSize: 16,
    marginRight: 6,
  },
  playerNickname: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  myNicknameHighlight: {
    color: colors.primary,
  },
  myBadge: {
    backgroundColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  myBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playerSubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  playerLevel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  playedAt: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 8,
  },
  playerScore: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
});
