const fs = require('fs');

// Read the current file
let content = fs.readFileSync('./src/screens/GameScreen.tsx', 'utf8');

// Fix handleWrongSelection to check game status properly
const oldHandleWrongSelection = `  // 오답 선택 핸들러 (정답이 아닌 곳 클릭 시)
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

const newHandleWrongSelection = `  // 오답 선택 핸들러 (정답이 아닌 곳 클릭 시)
  const handleWrongSelection = useCallback(() => {
    const gameState = useGameStore.getState();
    // 이미 게임이 종료되었거나 설명 모달이 표시 중이면 무시
    if (gameState.status !== 'playing' || gameState.showExplanation) return;

    const currentLives = gameState.lives;
    const newLives = currentLives - 1;

    // 햅틱 피드백
    if (hapticEnabled) {
      Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // 라이프가 0이면 게임 오버
    if (newLives <= 0) {
      useGameStore.setState({ lives: 0 });
      endGame(false, 'no_lives');
    } else {
      useGameStore.setState({ lives: newLives });
    }
  }, [hapticEnabled, endGame]);`;

content = content.replace(oldHandleWrongSelection, newHandleWrongSelection);

fs.writeFileSync('./src/screens/GameScreen.tsx', content, 'utf8');
console.log('GameScreen.tsx handleWrongSelection fixed');
