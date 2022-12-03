class XOPlayerService {
  private players: Player[];
  constructor(players: Player[]) {
    this.players = players;
  }

  checkWins(gameState: string[][]): Player {
    // check rows
    for (let i = 0; i < gameState.length; i++) {
      const row = gameState[i];
      if (row.every((cell) => cell == this.players[0].name)) {
        return this.players[0];
      } else if (row.every((cell) => cell == this.players[1].name)) {
        return this.players[1];
      }
    }

    // check cols
    for (let index = 0; index < 3; index++) {
      let columns = gameState.map((cell) => cell[index]);
      if (columns.every((cell) => cell == this.players[0].name)) {
        return this.players[0];
      } else if (columns.every((cell) => cell == this.players[1].name)) {
        return this.players[1];
      }
    }

    // check digonal
    const diagonal1 = [gameState[0][0], gameState[1][1], gameState[2][2]];
    const diagonal2 = [gameState[0][2], gameState[1][1], gameState[2][0]];

    if (
      diagonal1.every((cell) => cell == this.players[0].name) ||
      diagonal2.every((cell) => cell == this.players[0].name)
    ) {
      return this.players[0];
    }

    if (
      diagonal1.every((cell) => cell == this.players[1].name) ||
      diagonal2.every((cell) => cell == this.players[1].name)
    ) {
      return this.players[1];
    }

    if (gameState.flat().every((cell) => cell != "")) {
      return { name: "draw", isCPU: false, isPlayer: false, isFrist: false };
    }

    return { name: "null", isCPU: false, isPlayer: false, isFrist: false };
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

  cpuPlayer(gameState: string[][], player: Player): string[][] {
    const [rowIndex, index] = this.getRandomCell(gameState);
    gameState[rowIndex][index] = player.name;
    return gameState;
  }
}

export default XOPlayerService;
