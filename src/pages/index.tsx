import PlayBox from "./PlayBox" ;
import ChosePlayer from "./ChosePlayer"
import { useState } from "react";



const Index: React.FC<{}> = ()=>{
  const defaultPlayer: Player = {name: "x", isCPU: false, isPlayer: false, isFirst: false}
  let [selectPlayer, setSelectPlayer] = useState(0),
    [player1, setPlayer1] = useState(defaultPlayer),
    [player2, setPlayer2] = useState(defaultPlayer),
    [isAi, setAi] = useState(false)
    
  const chosePlayer = (players: Player[], isAi = false)=>{
    for(let player of players){
      if(player.isFirst){
        setPlayer1(()=>player);
      }else{
        setPlayer2(player)
      }
    }
    setSelectPlayer(()=>1);
    setAi(() => isAi)
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
          <PlayBox isAi ={isAi} onRestart={restart} player1={player1} player2={player2} />
      }
    </>
  );
}

export default Index

export {
  PlayBox as Player,
  ChosePlayer
}