const fs = require('fs');

const content = `import React from 'react';
import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { TextContent, ErrorCandidate } from '../../types';
import { colors } from '../../utils/theme';

interface Props {
  content: TextContent;
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

export default function TextMode({
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
      <Surface style={styles.textCard}>
        {content.title && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{content.title}</Text>
            <View style={styles.titleUnderline} />
          </View>
        )}
        <View style={styles.body}>
          {content.paragraphs.map((paragraph, index) => (
            <View key={index} style={styles.paragraph}>
              <Text style={styles.paragraphNumber}>{index + 1}</Text>
              <View style={styles.paragraphContent}>
                {renderParagraph(paragraph, index)}
              </View>
            </View>
          ))}
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
  paragraph: { flexDirection: 'row', marginBottom: 16 },
  paragraphNumber: { fontSize: 14, fontWeight: '600', color: colors.textSecondary, width: 24, textAlign: 'center', marginTop: 2 },
  paragraphContent: { flex: 1 },
  paragraphWrapper: { fontSize: 16, color: colors.text, lineHeight: 28 },
  paragraphText: { fontSize: 16, color: colors.text, lineHeight: 28 },
  clickableText: { fontSize: 16, color: colors.text, lineHeight: 28 },
  correctHighlight: { backgroundColor: colors.success + '40', borderRadius: 4 },
  wrongHighlight: { backgroundColor: colors.error + '40', borderRadius: 4 },
});
`;

fs.writeFileSync('./src/components/modes/TextMode.tsx', content, 'utf8');
console.log('TextMode.tsx updated successfully');
