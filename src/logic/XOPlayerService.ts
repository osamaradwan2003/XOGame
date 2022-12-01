import { Player } from "../pages";

class XOPlayerService {
  private state: string[][];
  private players: Player[];
  constructor(state: string[][], players: Player[]) {
    this.state = state;
    this.players = players;
  }

  checkWins(): Player {
    // check rows
    this.state.map((row) => {
      if (row.every((cell) => cell == this.players[0].name)) {
        return this.players[0];
      }
    });

    return { name: "null" };
  }
}

export default XOPlayerService;
