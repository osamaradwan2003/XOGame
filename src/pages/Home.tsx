import { Component } from "react";
import { Btn, MainBtn, StateInfo } from "../components";
import {MdReplayCircleFilled} from "react-icons/md"

interface PlayerProbs{
  currPlayer: CurrPlayer
}

type CurrPlayer = {
    name: string,
    isCPU: boolean
};

interface PlayBoxState{
  currPlayer: CurrPlayer
  players?:CurrPlayer[]
  gameState: string[][],        
  XWonsNumbers: number,
  YWonsNumbers: number,
  tiesNumber: number,
  isCPU?: boolean
}

export default class Player extends Component<PlayerProbs, PlayBoxState> {

  constructor(props:PlayerProbs ) {
    super(props)
      this.state = {
        currPlayer: props.currPlayer,
        gameState: [["", "", ""], ["", "", ""], ["", "", ""]],
        XWonsNumbers: 0,
        YWonsNumbers: 0,
        tiesNumber: 0
    }
    this.handelPlayesButton = this.handelPlayesButton.bind(this)
  }

  handelPlayesButton(rowindex: number, index: number): void{
    if(this.state.gameState[rowindex][index]) return;
    this.setState((state: PlayBoxState) => {
      state.gameState[rowindex][index] = this.state.currPlayer.name;
      return {
        gameState: [...state.gameState],
        currPlayer :  {name: state.currPlayer.name.toLocaleLowerCase() == "x" ? "o" : "x", isCPU: false}
      };
    });
  }

  render(): JSX.Element {
    return (
      <div className="container grid gap-3 content-center h-screen justify-center">
        <header className="flex gap-3 justify-between mb-3 items-center w-full">
          <h4 className="text-2xl font-bold">
            <span className="x-color">X</span><span className="o-color">O</span>
          </h4>
          <div  className="flex items-center justify-center p-3 rounded-lg text-sm  text-slate-400 font-bold bg-slate-900 select-none">
            <span className='text-lg pr-2'> {this.state.currPlayer.name} </span> TURN </div>
          <Btn className="text-xl p-3 rounded bg-slate-400 text-slate-900">
            <MdReplayCircleFilled />
          </Btn>
        </header>
        <main className="grid grid-cols-3 grid-rows-3 gap-3 w-full justify-items-center">
          {this.state.gameState.map((rows, rowIndex)=>{
            return rows.map((_, index)=>{
              return (
                <MainBtn 
                onClick={this.handelPlayesButton.bind(this, rowIndex, index)}  
                key={Math.ceil(Math.random() * 100) * ((rowIndex +1 ) * (index +1))} 
                className='w-full h-full'>
                  {this.state.gameState[rowIndex][index]}
                </MainBtn>
              )
            })
          })}
        </main>
        <footer className="grid grid-cols-3 gap-3 mt-2">
          <StateInfo className="x-bg" title={`X`} content={this.state.XWonsNumbers} />
          <StateInfo className="bg-slate-500" title={"TIES"} content={this.state.tiesNumber} />
          <StateInfo className="o-bg" title={"O"} content={this.state.YWonsNumbers} />
        </footer>
      </div>
    );
  }

}