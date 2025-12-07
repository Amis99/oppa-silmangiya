const fs = require('fs');

// Read the current file
let content = fs.readFileSync('./src/screens/GameScreen.tsx', 'utf8');

// Replace handleWrongSelection to directly set showResult when game over
const oldHandleWrongSelection = `  // 오답 선택 핸들러 (정답이 아닌 곳 클릭 시)
  const handleWrongSelection = useCallback(() => {
    const gameState = useGameStore.getState();
    // 이미 게임이 종료되었거나 설명 모달이 표시 중이거나 결과 화면이면 무시
    if (gameState.status !== 'playing' || gameState.showExplanation || showResult) return;

    const currentLives = gameState.lives;

    // 이미 라이프가 0이면 무시
    if (currentLives <= 0) return;

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
  }, [hapticEnabled, endGame, showResult]);`;

const newHandleWrongSelection = `  // 오답 선택 핸들러 (정답이 아닌 곳 클릭 시)
  const handleWrongSelection = useCallback(() => {
    const gameState = useGameStore.getState();
    // 이미 게임이 종료되었거나 설명 모달이 표시 중이거나 결과 화면이면 무시
    if (gameState.status !== 'playing' || gameState.showExplanation || showResult) return;

    const currentLives = gameState.lives;

    // 이미 라이프가 0이면 무시
    if (currentLives <= 0) return;

    const newLives = currentLives - 1;

    // 햅틱 피드백
    if (hapticEnabled) {
      Platform.OS !== 'web' && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }

    // 라이프 업데이트
    useGameStore.setState({ lives: newLives });

    // 라이프가 0이면 게임 오버 - 바로 결과 화면 표시
    if (newLives <= 0) {
      console.log('Game over - no lives');
      useGameStore.setState({
        status: 'failed',
        failureReason: 'no_lives'
      });
      // 직접 결과 화면 표시
      const result = getResult();
      setGameResult(result);
      setShowResult(true);
    }
  }, [hapticEnabled, showResult, getResult]);`;

content = content.replace(oldHandleWrongSelection, newHandleWrongSelection);

fs.writeFileSync('./src/screens/GameScreen.tsx', content, 'utf8');
console.log('GameScreen.tsx handleWrongSelection fixed to directly show result');
