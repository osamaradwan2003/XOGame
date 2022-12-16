import { Box, Btn } from "../components";
import {Switch} from "../components";
import {useState, useEffect} from "react";


type ChosePlayerProbs = {
  onChose: Function
}


const ChosePlayer: React.FC<ChosePlayerProbs> = ({onChose})=>{
  let players: Player[];
  const setValue = (player:string, index:number, players_arr: [])=>{
    players = players_arr.map(player_name => {
      return {
        name: player_name,
        isCPU: false,
        isPlayer: player == player_name,
        isFirst: player == player_name
      }
    });
  }

  

  const PlayWithCpu = ()=>{
    players = players.map(player =>{
      return { 
        name: player.name,
        isCPU: !player.isPlayer,
        isPlayer: player.isPlayer,
        isFirst: player.isFirst
      }
    });
    onChose(players)
  }

  const PlayWithPlayer = ()=>{
    players = players.map(player =>{
      return { 
        name: player.name,
        isCPU: false,
        isPlayer: true,
        isFirst: player.isFirst
      }
    });
    onChose(players)
  }

  const PlayWithAI = ()=>{
    players = players.map(player =>{
      return { 
        name: player.name,
        isCPU: !player.isPlayer,
        isPlayer: player.isPlayer,
        isFirst: player.isFirst
      }
    });
    onChose(players, true)
  }

  return (
    <div className="h-full flex justify-center flex-col items-center gap-3">
      <div className="title text-3xl font-bold">
        <span className="x-color">X</span>
        <span className="o-color">O</span>
      </div>
      <Box className="w-1/3 p-5" title="PICK PLAYER 1'S MARK" hint="">
        <Switch 
          values={["x", "o"]} 
          defaultValue='x'
          OnSwitch={setValue}
          onRender = {setValue}
          className="w-full"
        />
      </Box>
      <div className="btn-group w-1/3 gap-3 flex flex-col">
        <Btn onClick={PlayWithCpu} className="text-xl p-3 rounded o-bg text-slate-900 w-full uppercase">
            New Game VS (CPU)
        </Btn>
        <Btn onClick={PlayWithAI}  className="text-xl p-3 rounded bg-slate-200 text-slate-900 w-full uppercase">
            New Game VS AI
        </Btn>
        <Btn onClick={PlayWithPlayer}  className="text-xl p-3 rounded x-bg text-slate-900 w-full uppercase">
            New Game VS PLAyer
        </Btn>

      </div>
    </div>
  );
}

export default ChosePlayer;
