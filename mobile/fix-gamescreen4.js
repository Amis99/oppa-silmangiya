const fs = require('fs');

// Read the current file
let content = fs.readFileSync('./src/screens/GameScreen.tsx', 'utf8');

// Fix handleWrongSelection to also check showResult
const oldHandleWrongSelection = `  // 오답 선택 핸들러 (정답이 아닌 곳 클릭 시)
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

    // 라이프가 0이면 게임 오버
    if (newLives <= 0) {
      useGameStore.setState({ lives: 0 });
      endGame(false, 'no_lives');
    } else {
      useGameStore.setState({ lives: newLives });
    }
  }, [hapticEnabled, endGame, showResult]);`;

content = content.replace(oldHandleWrongSelection, newHandleWrongSelection);

// Also fix handleSelectCandidate to check showResult
const oldHandleSelectCandidate = `  // 후보 선택 핸들러
  const handleSelectCandidate = useCallback(
    (candidateId: string) => {
      if (status !== 'playing' || showExplanation) return;`;

const newHandleSelectCandidate = `  // 후보 선택 핸들러
  const handleSelectCandidate = useCallback(
    (candidateId: string) => {
      if (status !== 'playing' || showExplanation || showResult) return;`;

content = content.replace(oldHandleSelectCandidate, newHandleSelectCandidate);

// Update dependency array for handleSelectCandidate
const oldDeps = `    [status, showExplanation, selectCandidate, hapticEnabled]
  );

  // 오답 선택 핸들러`;

const newDeps = `    [status, showExplanation, showResult, selectCandidate, hapticEnabled]
  );

  // 오답 선택 핸들러`;

content = content.replace(oldDeps, newDeps);

fs.writeFileSync('./src/screens/GameScreen.tsx', content, 'utf8');
console.log('GameScreen.tsx fixed with showResult checks');
