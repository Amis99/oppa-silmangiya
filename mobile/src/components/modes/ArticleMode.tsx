import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { ArticleContent, StageError } from '../../types';
import { colors } from '../../utils/theme';

interface Props {
  content: ArticleContent;
  error: StageError;
  isCorrect: boolean | null;
  onCorrect: () => void;
  onWrong: () => void;
  disabled?: boolean;
}

// Split text into word-level clickable segments
function splitTextIntoWords(text: string, wrongText: string): { word: string; isError: boolean; id: string }[] {
  // Split by spaces while preserving spaces
  const parts = text.split(/(\s+)/);
  const result: { word: string; isError: boolean; id: string }[] = [];

  let currentIndex = 0;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.length === 0) continue;

    const isSpace = /^\s+$/.test(part);

    if (isSpace) {
      result.push({ word: part, isError: false, id: `space-${currentIndex}` });
    } else if (part.includes(wrongText)) {
      // This word contains the error - split it further if needed
      const errorIndex = part.indexOf(wrongText);

      if (errorIndex > 0) {
        result.push({ word: part.substring(0, errorIndex), isError: false, id: `pre-${currentIndex}` });
      }

      result.push({ word: wrongText, isError: true, id: `error-${currentIndex}` });

      if (errorIndex + wrongText.length < part.length) {
        result.push({ word: part.substring(errorIndex + wrongText.length), isError: false, id: `post-${currentIndex}` });
      }
    } else {
      result.push({ word: part, isError: false, id: `word-${currentIndex}` });
    }

    currentIndex++;
  }

  return result;
}

export default function ArticleMode({
  content,
  error,
  isCorrect,
  onCorrect,
  onWrong,
  disabled = false,
}: Props) {
  const [answeredCorrectly, setAnsweredCorrectly] = React.useState(false);

  const handleWordClick = (wordId: string, isErrorWord: boolean) => {
    if (disabled) return;

    // Spaces are not clickable
    if (wordId.startsWith('space-')) return;

    if (isErrorWord) {
      setAnsweredCorrectly(true);
      onCorrect();
    } else {
      // 오답 시에는 하이라이트 없이 바로 onWrong 호출
      onWrong();
    }
  };

  const words = splitTextIntoWords(content.text, error.wrongText);

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.articleCard}>
        <View style={styles.header}>
          {content.source && <Text style={styles.source}>{content.source}</Text>}
        </View>
        <Text style={styles.title}>{content.title}</Text>
        {content.subtitle && <Text style={styles.subtitle}>{content.subtitle}</Text>}
        {content.author && <Text style={styles.author}>{content.author}</Text>}
        <View style={styles.divider} />
        <View style={styles.body}>
          <Text style={styles.textWrapper}>
            {words.map((item) => {
              const isSpace = item.id.startsWith('space-');

              // Spaces are just rendered without click handling
              if (isSpace) {
                return (
                  <Text key={item.id} style={styles.textContent}>
                    {item.word}
                  </Text>
                );
              }

              // 정답 클릭 시에만 오류 단어 하이라이트
              let highlightStyle = null;
              if (item.isError && answeredCorrectly && isCorrect) {
                highlightStyle = styles.correctHighlight;
              }

              return (
                <Text
                  key={item.id}
                  style={[styles.textContent, highlightStyle]}
                  onPress={() => handleWordClick(item.id, item.isError)}
                >
                  {item.word}
                </Text>
              );
            })}
          </Text>
        </View>
      </Surface>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.article.background },
  articleCard: {
    margin: 16, borderRadius: 16, padding: 20, backgroundColor: '#FFFFFF',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  source: { fontSize: 12, color: colors.primary, fontWeight: '600', textTransform: 'uppercase' },
  title: { fontSize: 22, fontWeight: 'bold', color: colors.article.title, lineHeight: 30, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textSecondary, lineHeight: 24, marginBottom: 8 },
  author: { fontSize: 13, color: colors.textSecondary, marginBottom: 16 },
  divider: { height: 1, backgroundColor: colors.divider, marginBottom: 16 },
  body: {},
  textWrapper: { fontSize: 16, color: colors.text, lineHeight: 26 },
  textContent: { fontSize: 16, color: colors.text, lineHeight: 26 },
  correctHighlight: { backgroundColor: colors.success + '60', borderRadius: 4 },
  wrongHighlight: { backgroundColor: colors.error + '60', borderRadius: 4 },
});
