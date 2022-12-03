type PlayerNames = "x" | "o" | "draw" | "null";
interface Player {
  name: PlayerNames;
  isCPU: boolean;
  isPlayer: boolean;
  isFrist: boolean;
}

type PlayBoxProbs = {
  currPlayer: Player;
  players: Player[];
};
type PlayBoxState = {
  currPlayer: Player;
  gameState: string[][];
  XWonsNumbers: number;
  OWonsNumbers: number;
  tiesNumber: number;
  WonMessage: string;
  showWinMessage: boolean;
};

type StateWonsNumbers = {
  x: "XWonsNumbers";
  o: "OWonsNumbers";
  draw: "tiesNumber";
  null: "tiesNumber";
};
