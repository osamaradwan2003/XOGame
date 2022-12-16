import XOAiPlayer from "./XOAiPlayer";

class XOPlayerService {
  private player1: Player;
  private player2: Player;
  private isAi: boolean;
  private AiPlayer: XOAiPlayer;
  private stepScore;
  // player2 always is aiPlayer or computerPlayer
  constructor(player1: Player, player2: Player, isAi = false) {
    this.isAi = isAi;
    this.player1 = player1;
    this.player2 = player2;
    this.AiPlayer = new XOAiPlayer(
      player2,
      player1,
      this.getStepScore.bind(this)
    );
    this.stepScore = {
      x: 100,
      draw: 0,
      o: -100,
      null: 50,
    };
  }

  getStepScore(gameState: string[][]) {
    const player: Player = this.checkWins(gameState);
    return this.stepScore[player.name];
  }

  checkWins(gameState: string[][]): Player {
    // check rows
    for (let i = 0; i < gameState.length; i++) {
      const row = gameState[i];
      if (row.every((cell) => cell == this.player1.name)) {
        return this.player1;
      } else if (row.every((cell) => cell == this.player2.name)) {
        return this.player2;
      }
    }

    // check cols
    for (let index = 0; index < 3; index++) {
      let columns = gameState.map((cell) => cell[index]);
      if (columns.every((cell) => cell == this.player1.name)) {
        return this.player1;
      } else if (columns.every((cell) => cell == this.player2.name)) {
        return this.player2;
      }
    }

    // check digonal
    const diagonal1 = [gameState[0][0], gameState[1][1], gameState[2][2]];
    const diagonal2 = [gameState[0][2], gameState[1][1], gameState[2][0]];

    if (
      diagonal1.every((cell) => cell == this.player1.name) ||
      diagonal2.every((cell) => cell == this.player1.name)
    ) {
      return this.player1;
    }

    if (
      diagonal1.every((cell) => cell == this.player2.name) ||
      diagonal2.every((cell) => cell == this.player2.name)
    ) {
      return this.player2;
    }

    if (gameState.flat().every((cell) => cell != "")) {
      return { name: "draw", isCPU: false, isPlayer: false, isFirst: false };
    }

    return { name: "null", isCPU: false, isPlayer: false, isFirst: false };
  }

  getRandomCell(gameState: string[][]): number[] {
    const emptyCells: number[][] = [];
    // get empty cells
    gameState.map((row, rowIndex: number) => {
      row.map((cell, cellIndex: number) => {
        if (cell == "") {
          emptyCells.push([rowIndex, cellIndex]);
        }
      });
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }

  cpuPlayer(gameState: string[][]): string[][] {
    const [rowIndex, index] = this.getRandomCell(gameState);
    console.log(rowIndex, index);
    const gameStateCopy = JSON.parse(JSON.stringify(gameState));
    gameStateCopy[rowIndex][index] = this.player2.name;
    console.table(gameStateCopy);
    return gameStateCopy;
  }

  aiPlayer(gameState: string[][]) {
    const gameStateCopy = JSON.parse(JSON.stringify(gameState));
    const score = this.AiPlayer.minMax(gameStateCopy, 2, false);
    const bestMove = score[1];
    console.log(bestMove);
    gameStateCopy[bestMove.i][bestMove.j] = this.player2.name;
    console.table(gameStateCopy);
    return gameStateCopy;
  }

  computerPlayer(gameState: string[][]) {
    if (this.isAi) return this.aiPlayer(gameState);
    return this.cpuPlayer(gameState);
  }
}

export default XOPlayerService;
