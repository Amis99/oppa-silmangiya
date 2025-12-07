const fs = require('fs');

// Read the current file
let content = fs.readFileSync('./src/screens/GameScreen.tsx', 'utf8');

// Add debug log to useEffect for game end detection
const oldUseEffect = `  // 게임 종료 감지 - 결과 화면 표시
  useEffect(() => {
    if ((status === 'success' || status === 'failed') && !showResult) {
      const result = getResult();
      setGameResult(result);
      setShowResult(true);
    }
  }, [status, showResult, getResult]);`;

const newUseEffect = `  // 게임 종료 감지 - 결과 화면 표시
  useEffect(() => {
    console.log('Game end effect - status:', status, 'showResult:', showResult);
    if ((status === 'success' || status === 'failed') && !showResult) {
      console.log('Setting showResult to true');
      const result = getResult();
      console.log('Game result:', result);
      setGameResult(result);
      setShowResult(true);
    }
  }, [status, showResult, getResult]);`;

content = content.replace(oldUseEffect, newUseEffect);

fs.writeFileSync('./src/screens/GameScreen.tsx', content, 'utf8');
console.log('GameScreen.tsx debug logs added');
