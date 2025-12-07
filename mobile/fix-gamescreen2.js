const fs = require('fs');

// Read the current file
let content = fs.readFileSync('./src/screens/GameScreen.tsx', 'utf8');

// Add handleWrongSelection handler after handleSelectCandidate
const handleSelectCandidateEnd = `    [status, showExplanation, selectCandidate, hapticEnabled]
  );`;

const handleWrongSelection = `    [status, showExplanation, selectCandidate, hapticEnabled]
  );

  // 오답 선택 핸들러 (정답이 아닌 곳 클릭 시)
  const handleWrongSelection = useCallback(() => {
    if (status !== 'playing' || showExplanation) return;

    const { lives: currentLives } = useGameStore.getState();
    const newLives = currentLives - 1;

    useGameStore.setState({ lives: newLives });

    // 햅틱 피드백
    if (hapticEnabled) {
      Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // 라이프가 0이면 게임 오버
    if (newLives <= 0) {
      endGame(false, 'no_lives');
    }
  }, [status, showExplanation, hapticEnabled, endGame]);`;

content = content.replace(handleSelectCandidateEnd, handleWrongSelection);

// Update commonProps to include onWrongSelection
const oldCommonProps = `    const commonProps = {
      errorCandidates: currentStage.errorCandidates,
      activeErrorId,
      selectedCandidateId,
      isCorrect,
      onSelectCandidate: handleSelectCandidate,
      disabled: showExplanation || status !== 'playing',
    };`;

const newCommonProps = `    const commonProps = {
      errorCandidates: currentStage.errorCandidates,
      activeErrorId,
      selectedCandidateId,
      isCorrect,
      onSelectCandidate: handleSelectCandidate,
      onWrongSelection: handleWrongSelection,
      disabled: showExplanation || status !== 'playing',
    };`;

content = content.replace(oldCommonProps, newCommonProps);

fs.writeFileSync('./src/screens/GameScreen.tsx', content, 'utf8');
console.log('GameScreen.tsx updated successfully');
