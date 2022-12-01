import PlayBox from "./PlayBox" ;
import ChosePlayer from "./ChosePlayer"
import { useState } from "react";



const Index: React.FC<{}> = ()=>{
  let [slectPlayer, setSelectPlayer] = useState(0),
    [currPlayer, setCurrPlayer] = useState({name: "", isCPU: false, isPlayer: false, isFrist: false}),
    [players, setPlayers] = useState([{name: "", isCPU: false, isPlayer: false, isFrist: false}]);

  const chosePlayer = (players: Player[])=>{
    setPlayers(()=>players);
    for(let player of players){
      if(player.isFrist){
        setCurrPlayer(()=>player);
        break;
      }
    }
    setSelectPlayer(()=>1);
  }

  return (
    <>
      {
        slectPlayer === 0
          ?
            <ChosePlayer onChose={chosePlayer}></ChosePlayer>
          :
          <PlayBox currPlayer={currPlayer} players={players} />
      }
    </>
  );
}

export default Index

export {
  PlayBox as Player,
  ChosePlayer
}