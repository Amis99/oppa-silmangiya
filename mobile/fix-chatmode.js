const fs = require('fs');

const content = `import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import { Text, Avatar } from 'react-native-paper';
import { ChatContent, ErrorCandidate } from '../../types';
import { colors } from '../../utils/theme';

interface Props {
  content: ChatContent;
  errorCandidates: ErrorCandidate[];
  activeErrorId: string;
  selectedCandidateId: string | null;
  isCorrect: boolean | null;
  onSelectCandidate: (candidateId: string) => void;
  onWrongSelection?: () => void;
  disabled?: boolean;
}

// 텍스트를 단어 단위로 분리
function splitIntoWords(text: string): { word: string; isSpace: boolean }[] {
  const result: { word: string; isSpace: boolean }[] = [];
  let current = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/\\s/.test(char)) {
      if (current) {
        result.push({ word: current, isSpace: false });
        current = '';
      }
      result.push({ word: char, isSpace: true });
    } else {
      current += char;
    }
  }
  if (current) {
    result.push({ word: current, isSpace: false });
  }
  return result;
}

export default function ChatMode({
  content,
  errorCandidates,
  activeErrorId,
  selectedCandidateId,
  isCorrect,
  onSelectCandidate,
  onWrongSelection,
  disabled = false,
}: Props) {
  const [clickedWord, setClickedWord] = React.useState<string | null>(null);

  // 활성화된 오류 후보 찾기
  const activeCandidate = errorCandidates.find(c => c.id === activeErrorId);

  // 메시지에 연결된 오류 후보 찾기
  const getCandidateForMessage = (messageId: string): ErrorCandidate | undefined => {
    return errorCandidates.find((c) => c.id === messageId);
  };

  // 클릭 핸들러
  const handleWordClick = (word: string, isAnswerMessage: boolean, messageId: string) => {
    if (disabled) return;

    // 정답 메시지인 경우
    if (isAnswerMessage && messageId === activeErrorId) {
      setClickedWord(word);
      onSelectCandidate(activeErrorId);
    } else {
      // 오답
      setClickedWord(word);
      if (onWrongSelection) {
        onWrongSelection();
      }
    }
  };

  // 메시지 텍스트 렌더링
  const renderMessageText = (messageId: string, text: string, isLeft: boolean) => {
    const isAnswerMessage = messageId === activeErrorId;
    const candidate = getCandidateForMessage(messageId);

    // 정답 메시지인 경우 wrongText로 표시
    const displayText = isAnswerMessage && candidate ? candidate.wrongText : text;

    const words = splitIntoWords(displayText);
    let keyIndex = 0;

    return words.map((item) => {
      if (item.isSpace) {
        return <Text key={\`s-\${keyIndex++}\`} style={isLeft ? styles.leftText : styles.rightText}>{item.word}</Text>;
      }

      const isClicked = clickedWord === item.word && isCorrect === false;
      const isAnswerClicked = selectedCandidateId === activeErrorId && isAnswerMessage;

      let highlightStyle = null;
      if (isAnswerClicked && isAnswerMessage) {
        highlightStyle = isCorrect ? styles.wordCorrectHighlight : styles.wordWrongHighlight;
      } else if (isClicked) {
        highlightStyle = styles.wordWrongHighlight;
      }

      return (
        <Text
          key={\`w-\${keyIndex++}\`}
          style={[isLeft ? styles.leftText : styles.rightText, highlightStyle]}
          onPress={() => handleWordClick(item.word, isAnswerMessage, messageId)}
        >
          {item.word}
        </Text>
      );
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {content.messages.map((message) => {
        const isLeft = message.sender === 'left';
        const isAnswerMessage = message.id === activeErrorId;
        const isAnswerClicked = selectedCandidateId === activeErrorId && isAnswerMessage;

        // 버블 하이라이트 (정답 버블만)
        let bubbleHighlight = null;
        if (isAnswerClicked) {
          bubbleHighlight = isCorrect ? styles.correctHighlight : styles.wrongHighlight;
        }

        return (
          <View
            key={message.id}
            style={[styles.messageRow, isLeft ? styles.leftRow : styles.rightRow]}
          >
            {isLeft && (
              <Avatar.Text
                size={36}
                label={message.name?.[0] || '?'}
                style={styles.avatar}
              />
            )}
            <View style={styles.messageContent}>
              {isLeft && message.name && (
                <Text style={styles.senderName}>{message.name}</Text>
              )}
              <View
                style={[
                  styles.bubble,
                  isLeft ? styles.leftBubble : styles.rightBubble,
                  bubbleHighlight,
                ]}
              >
                <Text style={styles.messageTextWrapper}>
                  {renderMessageText(message.id, message.text, isLeft)}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },
  contentContainer: {
    padding: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  leftRow: {
    justifyContent: 'flex-start',
  },
  rightRow: {
    justifyContent: 'flex-end',
  },
  avatar: {
    marginRight: 8,
    backgroundColor: colors.secondary,
  },
  messageContent: {
    maxWidth: '75%',
  },
  senderName: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
    marginLeft: 4,
  },
  bubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  leftBubble: {
    backgroundColor: colors.chat.leftBubble,
    borderTopLeftRadius: 4,
  },
  rightBubble: {
    backgroundColor: colors.chat.rightBubble,
    borderTopRightRadius: 4,
  },
  messageTextWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  leftText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  rightText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
  },
  wordCorrectHighlight: {
    backgroundColor: colors.success + '40',
    borderRadius: 2,
  },
  wordWrongHighlight: {
    backgroundColor: colors.error + '40',
    borderRadius: 2,
  },
  correctHighlight: {
    borderWidth: 2,
    borderColor: colors.success,
  },
  wrongHighlight: {
    borderWidth: 2,
    borderColor: colors.error,
  },
});
`;

fs.writeFileSync('./src/components/modes/ChatMode.tsx', content, 'utf8');
console.log('ChatMode.tsx updated successfully');
