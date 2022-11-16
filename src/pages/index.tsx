import Player from "./Player" ;
import ChosePlayer from "./ChosePlayer"
import { useState } from "react";



const Index: React.FC<{}> = ()=>{
  let [slectPlayer, setSelectPlayer] = useState(0)
  return (
    <>
      {
        slectPlayer === 0
          ?
            <ChosePlayer></ChosePlayer>
          :
          <Player currPlayer={{name: "X", isCPU: false}}/>
      }
    </>
  );
}

export default Index

export {
  Player,
  ChosePlayer
}