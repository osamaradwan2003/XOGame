type PlayerNames = "x" | "o" | "draw" | "null";
interface Player {
  name: PlayerNames;
  isCPU: boolean;
  isPlayer: boolean;
  isFirst: boolean;
}

type PlayBoxProbs = {
  player1: Player;
  player2: Player;
  onRestart: CallableFunction;
  isAi?: boolean;
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

type StepScore = {
  x: number;
  o: number;
  draw: number;
  null: number;
};
