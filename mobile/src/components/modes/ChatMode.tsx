import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { ChatContent, StageError } from '../../types';
import { colors } from '../../utils/theme';
import { stageImages } from '../../data/stages';

// Character images
const teacherCharacter = require('../../../assets/images/teacher-character.png');
const oppaCharacter = require('../../../assets/images/oppa-character.png');

interface Props {
  content: ChatContent;
  error: StageError;
  isCorrect: boolean | null;
  onCorrect: () => void;
  onWrong: () => void;
  disabled?: boolean;
}

// Split text into word-level clickable segments
// 2어절 이상 오류의 경우 각 단어를 개별적으로 오류로 표시
function splitTextIntoWords(text: string, wrongText: string, isErrorMessage: boolean): { word: string; isError: boolean; id: string }[] {
  // 오류 텍스트에 포함된 단어들 (공백으로 분리)
  const errorWords = wrongText.split(/\s+/).filter(w => w.length > 0);

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
    } else if (isErrorMessage) {
      // 오류 메시지인 경우: 오류 텍스트의 각 단어가 포함되어 있는지 확인
      let isPartOfError = false;

      // 전체 오류 텍스트가 이 단어에 포함되어 있는지 확인
      if (part.includes(wrongText)) {
        const errorIndex = part.indexOf(wrongText);
        if (errorIndex > 0) {
          result.push({ word: part.substring(0, errorIndex), isError: false, id: `pre-${currentIndex}` });
        }
        result.push({ word: wrongText, isError: true, id: `error-${currentIndex}` });
        if (errorIndex + wrongText.length < part.length) {
          result.push({ word: part.substring(errorIndex + wrongText.length), isError: false, id: `post-${currentIndex}` });
        }
        currentIndex++;
        continue;
      }

      // 오류 텍스트의 각 개별 단어와 매칭 확인
      for (const errorWord of errorWords) {
        if (part.includes(errorWord)) {
          isPartOfError = true;
          break;
        }
      }

      if (isPartOfError) {
        // 이 단어가 오류의 일부인 경우
        result.push({ word: part, isError: true, id: `error-${currentIndex}` });
      } else {
        result.push({ word: part, isError: false, id: `word-${currentIndex}` });
      }
    } else {
      result.push({ word: part, isError: false, id: `word-${currentIndex}` });
    }

    currentIndex++;
  }

  return result;
}

export default function ChatMode({
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

  const renderMessageText = (messageId: string, text: string, isLeft: boolean) => {
    const isErrorMessage = messageId === error.location;
    const words = splitTextIntoWords(text, error.wrongText, isErrorMessage);

    return words.map((item) => {
      const isSpace = item.id.startsWith('space-');

      // Spaces are just rendered without click handling
      if (isSpace) {
        return (
          <Text key={item.id} style={isLeft ? styles.leftText : styles.rightText}>
            {item.word}
          </Text>
        );
      }

      // 정답 클릭 시에만 오류 단어 하이라이트
      let highlightStyle = null;
      if (item.isError && answeredCorrectly && isCorrect) {
        highlightStyle = styles.wordCorrectHighlight;
      }

      const textStyle = [isLeft ? styles.leftText : styles.rightText, highlightStyle];

      return (
        <Text
          key={item.id}
          style={textStyle}
          onPress={() => handleWordClick(item.id, item.isError)}
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
        const hasImage = !!message.image;

        return (
          <View
            key={message.id}
            style={[styles.messageRow, isLeft ? styles.leftRow : styles.rightRow]}
          >
            {isLeft && (
              <Image
                source={teacherCharacter}
                style={styles.avatar}
                resizeMode="cover"
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
                  hasImage && styles.imageBubble,
                ]}
              >
                {hasImage && message.image && stageImages[message.image] ? (
                  <Image
                    source={stageImages[message.image]}
                    style={styles.messageImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.messageTextWrapper}>
                    {renderMessageText(message.id, message.text, isLeft)}
                  </Text>
                )}
              </View>
            </View>
            {!isLeft && (
              <Image
                source={oppaCharacter}
                style={styles.avatarRight}
                resizeMode="cover"
              />
            )}
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
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 8,
    backgroundColor: colors.primaryLight,
  },
  avatarRight: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 8,
    backgroundColor: colors.secondaryLight,
  },
  messageContent: {
    maxWidth: '70%',
    flex: 1,
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
    fontSize: 18,
    lineHeight: 26,
    color: colors.text,
  },
  rightText: {
    fontSize: 18,
    lineHeight: 26,
    color: colors.text,
  },
  wordCorrectHighlight: {
    backgroundColor: colors.success + '60',
    borderRadius: 4,
  },
  wordWrongHighlight: {
    backgroundColor: colors.error + '60',
    borderRadius: 4,
  },
  imageBubble: {
    padding: 4,
    backgroundColor: 'transparent',
  },
  messageImage: {
    width: 180,
    height: 180,
    borderRadius: 12,
  },
});
