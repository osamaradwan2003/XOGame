type Player = {
  name: string;
  isCPU: boolean;
  isPlayer: boolean;
  isFrist: boolean;
};

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
  winMessage: string;
  showWinMessage: boolean;
};
