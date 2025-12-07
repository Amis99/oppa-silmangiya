const fs = require('fs');

const content = `import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { ArticleContent, ErrorCandidate } from '../../types';
import { colors } from '../../utils/theme';

interface Props {
  content: ArticleContent;
  errorCandidates: ErrorCandidate[];
  activeErrorId: string;
  selectedCandidateId: string | null;
  isCorrect: boolean | null;
  onSelectCandidate: (candidateId: string) => void;
  onWrongSelection?: () => void;
  disabled?: boolean;
}

// 텍스트를 단어 단위로 분리
function splitIntoWords(text: string): string[] {
  const result: string[] = [];
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/\\s/.test(char)) {
      if (current) {
        result.push(current);
        current = '';
      }
      result.push(char);
    } else {
      current += char;
    }
  }
  if (current) {
    result.push(current);
  }
  return result;
}

export default function ArticleMode({
  content,
  errorCandidates,
  activeErrorId,
  selectedCandidateId,
  isCorrect,
  onSelectCandidate,
  onWrongSelection,
  disabled = false,
}: Props) {
  const activeCandidate = errorCandidates.find(c => c.id === activeErrorId);
  const [clickedText, setClickedText] = React.useState<string | null>(null);

  const handleTextClick = (text: string, isAnswer: boolean) => {
    if (disabled) return;

    if (isAnswer) {
      setClickedText(text);
      onSelectCandidate(activeErrorId);
    } else {
      setClickedText(text);
      if (onWrongSelection) {
        onWrongSelection();
      }
    }
  };

  const renderParagraph = (paragraph: string, paragraphIndex: number) => {
    if (!activeCandidate) {
      return <Text style={styles.paragraphText}>{paragraph}</Text>;
    }

    const correctText = activeCandidate.correctText;
    const wrongText = activeCandidate.wrongText;
    const parts: React.ReactNode[] = [];
    let keyIndex = 0;

    const errorIndex = paragraph.indexOf(correctText);
    const isErrorInThisParagraph = errorIndex !== -1 && activeCandidate.id.startsWith(\`p\${paragraphIndex}_\`);

    if (isErrorInThisParagraph) {
      // 오류 앞 텍스트
      if (errorIndex > 0) {
        const beforeText = paragraph.substring(0, errorIndex);
        const words = splitIntoWords(beforeText);
        words.forEach((word) => {
          if (/\\s/.test(word)) {
            parts.push(<Text key={\`s-\${keyIndex++}\`} style={styles.paragraphText}>{word}</Text>);
          } else {
            const isClicked = clickedText === word && isCorrect === false;
            parts.push(
              <Pressable key={\`w-\${keyIndex++}\`} onPress={() => handleTextClick(word, false)} disabled={disabled}>
                <Text style={[styles.clickableText, isClicked && styles.wrongHighlight]}>{word}</Text>
              </Pressable>
            );
          }
        });
      }

      // 오류 텍스트 (wrongText로 표시)
      const isAnswerClicked = selectedCandidateId === activeErrorId;
      parts.push(
        <Pressable key={\`e-\${keyIndex++}\`} onPress={() => handleTextClick(wrongText, true)} disabled={disabled}>
          <Text style={[styles.clickableText, isAnswerClicked && (isCorrect ? styles.correctHighlight : styles.wrongHighlight)]}>
            {wrongText}
          </Text>
        </Pressable>
      );

      // 오류 뒤 텍스트
      const afterText = paragraph.substring(errorIndex + correctText.length);
      if (afterText.length > 0) {
        const words = splitIntoWords(afterText);
        words.forEach((word) => {
          if (/\\s/.test(word)) {
            parts.push(<Text key={\`s-\${keyIndex++}\`} style={styles.paragraphText}>{word}</Text>);
          } else {
            const isClicked = clickedText === word && isCorrect === false;
            parts.push(
              <Pressable key={\`w-\${keyIndex++}\`} onPress={() => handleTextClick(word, false)} disabled={disabled}>
                <Text style={[styles.clickableText, isClicked && styles.wrongHighlight]}>{word}</Text>
              </Pressable>
            );
          }
        });
      }

      return <Text style={styles.paragraphWrapper}>{parts}</Text>;
    } else {
      // 오류가 없는 문단
      const words = splitIntoWords(paragraph);
      words.forEach((word) => {
        if (/\\s/.test(word)) {
          parts.push(<Text key={\`s-\${keyIndex++}\`} style={styles.paragraphText}>{word}</Text>);
        } else {
          const isClicked = clickedText === word && isCorrect === false;
          parts.push(
            <Pressable key={\`w-\${keyIndex++}\`} onPress={() => handleTextClick(word, false)} disabled={disabled}>
              <Text style={[styles.clickableText, isClicked && styles.wrongHighlight]}>{word}</Text>
            </Pressable>
          );
        }
      });
      return <Text style={styles.paragraphWrapper}>{parts}</Text>;
    }
  };

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
          {content.paragraphs.map((paragraph, index) => (
            <View key={index} style={styles.paragraph}>
              {renderParagraph(paragraph, index)}
            </View>
          ))}
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
  paragraph: { marginBottom: 16 },
  paragraphWrapper: { fontSize: 16, color: colors.text, lineHeight: 26 },
  paragraphText: { fontSize: 16, color: colors.text, lineHeight: 26 },
  clickableText: { fontSize: 16, color: colors.text, lineHeight: 26 },
  correctHighlight: { backgroundColor: colors.success + '40', borderRadius: 4 },
  wrongHighlight: { backgroundColor: colors.error + '40', borderRadius: 4 },
});
`;

fs.writeFileSync('./src/components/modes/ArticleMode.tsx', content, 'utf8');
console.log('ArticleMode.tsx updated successfully');
