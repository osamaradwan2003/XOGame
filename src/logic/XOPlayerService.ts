class XOPlayerService {
  private players: Player[];
  constructor(players: Player[]) {
    this.players = players;
  }

  checkWins(state: string[][]): Player {
    // check rows
    state.map((row) => {
      if (row.every((cell) => cell == this.players[0].name)) {
        return this.players[0];
      } else if (row.every((cell) => cell == this.players[1].name)) {
        return this.players[1];
      }
    });

    // check cols
    for (let index = 0; index < 3; index++) {
      let columns = state.map((cell) => cell[index]);
      if (columns.every((cell) => cell == this.players[0].name)) {
        return this.players[0];
      } else if (columns.every((cell) => cell == this.players[1].name)) {
        return this.players[1];
      }
    }

    // check digonal
    const diagonal1 = [state[0][0], state[1][1], state[2][2]];
    const diagonal2 = [state[0][2], state[1][1], state[2][0]];

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

    if (state.flat().every((cell) => cell != "")) {
      return { name: "draw", isCPU: false, isPlayer: false, isFrist: false };
    }

    return { name: "null", isCPU: false, isPlayer: false, isFrist: false };
  }

  getRandomCell(state: string[][]): number[] {
    const emptyCells: number[][] = [];
    // get empty cells
    state.map((row, rowIndex: number) => {
      row.map((cell, cellIndex: number) => {
        if (cell == "") {
          emptyCells.push([rowIndex, cellIndex]);
        }
      });
    });

    const randomIndex = Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
  }

  cpuPlayer(state: string[][], player: Player): string[][] {
    const [rowIndex, index] = this.getRandomCell(state);

    state[rowIndex][index] = player.name;
    return state;
  }
}

export default XOPlayerService;
