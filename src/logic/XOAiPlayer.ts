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

  minimax(board: string[][], depth: number, isMax: boolean) {
    let score = this.terminateFunction(board),
      bestMove = {};
    // console.log(score);
    if (score === 100) return [score, bestMove];
    if (score === -100) return [score, bestMove];
    if (score === 50) return [0, bestMove];

    if (isMax) {
      let best = -1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = this.userPlayer.name;
            best = Math.max(best, this.minimax(board, depth + 1, !isMax)[0]);
            board[i][j] = "";
          }
        }
      }
      return [best, bestMove];
    } else {
      let best = 1000;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == "") {
            board[i][j] = this.aiPlayer.name;
            let score = this.minimax(board, depth + 1, !isMax)[0];
            board[i][j] = "";
            if (best > score) {
              best = score;
              bestMove = { i, j };
            }
          }
        }
      }
      return [best, bestMove];
    }
  }
}
