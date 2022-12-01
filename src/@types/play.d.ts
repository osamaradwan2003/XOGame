type Player = {
  name: string;
  isCPU: boolean = false;
  isPlayer: boolean = false;
  isFrist: boolean = false;
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
  isCPU?: boolean;
};
