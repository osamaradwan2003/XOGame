import PlayBox from "./PlayBox" ;
import ChosePlayer from "./ChosePlayer"
import { useState } from "react";



const Index: React.FC<{}> = ()=>{
  let [selectPlayer, setSelectPlayer] = useState(0),
    [currPlayer, setCurrPlayer] = useState({name: "x", isCPU: false, isPlayer: false, isFirst: false}),
    [players, setPlayers] = useState([{name: "x", isCPU: false, isPlayer: false, isFirst: false}]);

  const chosePlayer = (players: Player[])=>{
    setPlayers(()=>players);
    for(let player of players){
      if(player.isFirst){
        setCurrPlayer(()=>player);
        break;
      }
    }
    setSelectPlayer(()=>1);
  }

  const restart = ()=>{
    setSelectPlayer(()=> 0);
  }

  return (
    <>
      {
        selectPlayer === 0
          ?
            <ChosePlayer onChose={chosePlayer}></ChosePlayer>
          :
          //@disable next line error message
          <PlayBox onRestart={restart} currPlayer={currPlayer} players={players} />
      }
    </>
  );
}

export default Index

export {
  PlayBox as Player,
  ChosePlayer
}