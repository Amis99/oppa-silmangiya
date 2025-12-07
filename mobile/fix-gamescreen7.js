const fs = require('fs');

// Read the current file
let content = fs.readFileSync('./src/screens/GameScreen.tsx', 'utf8');

// Add debug log before ResultScreen render condition
const oldResultCondition = `  // 결과 화면 표시
  if (showResult && gameResult && currentStage) {
    return (
      <ResultScreen`;

const newResultCondition = `  // 결과 화면 표시
  console.log('Render check - showResult:', showResult, 'gameResult:', !!gameResult, 'currentStage:', !!currentStage);
  if (showResult && gameResult) {
    console.log('Rendering ResultScreen');
    return (
      <ResultScreen`;

content = content.replace(oldResultCondition, newResultCondition);

// Also add log in handleWrongSelection to show the result
const oldGameOver = `      // 직접 결과 화면 표시
      const result = getResult();
      setGameResult(result);
      setShowResult(true);`;

const newGameOver = `      // 직접 결과 화면 표시
      const result = getResult();
      console.log('Setting game result:', result);
      setGameResult(result);
      setShowResult(true);`;

content = content.replace(oldGameOver, newGameOver);

fs.writeFileSync('./src/screens/GameScreen.tsx', content, 'utf8');
console.log('GameScreen.tsx debug logs added for result rendering');
