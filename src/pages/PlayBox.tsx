import { Component } from "react";
import { Btn, MainBtn, StateInfo } from "../components";
import {MdReplayCircleFilled} from "react-icons/md"
import XOPlayerService from "../logic/XOPlayerService";


export default class PlayBox extends Component<PlayBoxProbs, PlayBoxState> {
  private playService: XOPlayerService;
  constructor(props:PlayBoxProbs ) {
    super(props)
      this.state = {
        currPlayer: props.currPlayer,
        gameState: [["", "", ""], ["", "", ""], ["", "", ""]],
        XWonsNumbers: 0,
        OWonsNumbers: 0,
        tiesNumber: 0,
        winMessage: "",
        showWinMessage: false,
    }
    this.playService = new XOPlayerService(props.players);
  }

  handelBoxBtns(rowindex: number, index: number): void{
    if(this.state.currPlayer.isCPU || this.state.gameState[rowindex][index] != "") return;
    this.setState(prev=>{
      prev.gameState[rowindex][index] = this.state.currPlayer.name;
      return{
        gameState: prev.gameState,
        currPlayer: this.props.players.filter(p=> p.name !== this.state.currPlayer.name)[0],
      }
    });
  }

  componentDidUpdate(): void {
    console.log(this.playService.checkWins(this.state.gameState));
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
                onClick={this.handelBoxBtns.bind(this, rowIndex, index)}  
                key={ Date.now() *  ((rowIndex +1 ) * (index +1))} 
                className={`${this.state.gameState[rowIndex][index] == "x" ? 'x-color' : 'o-color'}`}>
                  {this.state.gameState[rowIndex][index]}
                </MainBtn>
              )
            })
          })}
        </main>
        <footer className="grid grid-cols-3 gap-3 mt-2">
          <StateInfo className="x-bg" title={`X`} content={this.state.XWonsNumbers} />
          <StateInfo className="bg-slate-500" title={"TIES"} content={this.state.tiesNumber} />
          <StateInfo className="o-bg" title={"O"} content={this.state.OWonsNumbers} />
        </footer>
      </div>
    );
  }

}