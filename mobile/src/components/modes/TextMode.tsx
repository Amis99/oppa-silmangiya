import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { TextContent, StageError } from '../../types';
import { colors } from '../../utils/theme';

interface Props {
  content: TextContent;
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

export default function TextMode({
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
      <Surface style={styles.textCard}>
        {content.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{content.title}</Text>
            <View style={styles.titleUnderline} />
          </View>
        )}
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
  container: { flex: 1, backgroundColor: colors.text_mode.background },
  textCard: {
    margin: 16, borderRadius: 16, padding: 20, backgroundColor: '#FFFFFF',
    elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 8,
  },
  titleContainer: { marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: colors.text_mode.title, textAlign: 'center', marginBottom: 8 },
  titleUnderline: { height: 2, backgroundColor: colors.text_mode.title, width: 60, alignSelf: 'center', borderRadius: 1 },
  body: {},
  textWrapper: { fontSize: 16, color: colors.text, lineHeight: 28 },
  textContent: { fontSize: 16, color: colors.text, lineHeight: 28 },
  correctHighlight: { backgroundColor: colors.success + '40', borderRadius: 4 },
  wrongHighlight: { backgroundColor: colors.error + '40', borderRadius: 4 },
});
