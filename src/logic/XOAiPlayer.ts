export default class XOAiPlayer {
  private aiPlayer: Player;
  private userPlayer: Player;
  private terminateFunction: CallableFunction;

  constructor(
    aiPlayer: Player,
    userPlayer: Player,
    terminateFunction: CallableFunction
  ) {
    this.aiPlayer = aiPlayer;
    this.userPlayer = userPlayer;
    this.terminateFunction = terminateFunction;
  }

  minMax(gameState: string[][], deps: number, isMaximizing: boolean = false) {
    const result = this.terminateFunction(gameState);
    let bestScore = {};
    if (result == 0 || deps == 1) {
      return [result, bestScore];
    }
    if (isMaximizing) {
      let finalScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameState[i][j] != "") continue;
          gameState[i][j] = this.userPlayer.name;
          let score = this.minMax(gameState, deps - 1, false)[0];
          gameState[i][j] = "";
          finalScore = Math.max(finalScore, score);
        }
      }

      return [finalScore, bestScore];
    } else {
      let finalScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameState[i][j] != "") continue;
          gameState[i][j] = this.aiPlayer.name;
          let score = this.minMax(gameState, deps - 1, true)[0];
          gameState[i][j] = "";
          if (finalScore > score) {
            finalScore = score;
            bestScore = { i, j };
          }
        }
      }
      return [finalScore, bestScore];
    }
  }
}
