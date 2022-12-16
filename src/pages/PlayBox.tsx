import { Component } from "react";
import { Btn, MainBtn, StateInfo } from "../components";
import {MdReplayCircleFilled} from "react-icons/md"
import XOPlayerService from "../logic/XOPlayerService";
import XOAiPlayer from "../logic/XOAiPlayer";


export default class PlayBox extends Component<PlayBoxProbs, PlayBoxState> {
  private playService: XOPlayerService;
  constructor(props:PlayBoxProbs ) {
    super(props)
      this.state = {
        currPlayer: props.player1,
        gameState: [["", "", ""], ["", "", ""], ["", "", ""]],
        XWonsNumbers: 0,
        OWonsNumbers: 0,
        tiesNumber: 0,
        WonMessage: "",
        showWinMessage: false,
    }
    this.playService = new XOPlayerService(props.player1, props.player2, props.isAi);
  }

  swapPlayer(): Player{
    return this.state.currPlayer.name == this.props.player1.name ? this.props.player2: this.props.player1
  }

  handelBoxBtns(rowindex: number, index: number): void{
    if(this.state.currPlayer.isCPU || this.state.gameState[rowindex][index] != "") return;
    this.setState(prev=>{
      prev.gameState[rowindex][index] = this.state.currPlayer.name;
      return{
        gameState: prev.gameState,
        currPlayer: this.swapPlayer()
      }
    });
  }

  componentDidUpdate(_prevProbs: PlayBoxProbs, prevState: PlayBoxState): void {
    if(this.checkWinner()){
      return;
    }
    if(!prevState.currPlayer.isCPU){
      setTimeout(this.computerPlayer.bind(this), 1000);
    }
    
  }

  checkWinner(): boolean{
    const player: Player = this.playService.checkWins(this.state.gameState)
    if(player.name == "null"){
      return false;
    }
    this.resetBox();
    this.increaseWinsNumbers(player);
    this.showWinMessage(player);
    return true;
  }

  

  showWinMessage(player: Player){
    this.setState({
      showWinMessage: true,
      WonMessage: `${player.name != 'draw' ? player.name + '\'s is Won' : 'DRAW'}`
    });
  }

  increaseWinsNumbers(player: Player){
    if(player.name == 'null') return;
    let wonNumsKeys:StateWonsNumbers = {
      x:  "XWonsNumbers",
      o:  "OWonsNumbers",
      draw: "tiesNumber",
      null: "tiesNumber",
    }
    //@ts-ignore
    this.setState({[wonNumsKeys[player.name]]:  this.state[wonNumsKeys[player.name]] + 1})
  }

  resetBox(){
    this.setState({
        currPlayer: this.props.player1,
        gameState: [["", "", ""], ["", "", ""], ["", "", ""]],
    });
  }

  computerPlayer(){
    if(!this.state.currPlayer.isCPU) return;
    const newState = this.playService.computerPlayer(this.state.gameState);
    this.setState(()=>{
      return{
        gameState: newState,
        currPlayer: this.swapPlayer()
      }
    })
  }


  playAgain(){
    this.setState({
      showWinMessage: false,
      WonMessage: '',
    });
  }

  reStart(){
    this.props.onRestart();
  }


  render(): JSX.Element {
    return (
      <>
        {
          this.state.showWinMessage &&
          <div className="flex flex-col gap-5 items-center justify-center overlay absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-60 uppercase">
            <h2 className="text-2xl text-slate-200">{this.state.WonMessage}</h2>
            <div className="btns w-full flex flex-col justify-center gap-2 items-center">
              <Btn onClick={this.playAgain.bind(this)} className="text-xl p-3 rounded w-1/2 o-bg text-slate-900 hover:shadow-2xl hover:shadow-sky-900">
                  Play Again
              </Btn>
              <Btn onClick={this.reStart.bind(this)} className="text-xl p-3 rounded w-1/2 x-bg text-slate-900
                hover:shadow-2xl hover:shadow-sky-900">
                  Restart
              </Btn>
            </div>
          </div>
        }
        <div className="container grid gap-3 content-center h-screen justify-center">
        <header className="flex gap-3 justify-between mb-3 items-center w-full">
          <h4 className="text-2xl font-bold">
            <span className="x-color">X</span><span className="o-color">O</span>
          </h4>
          <div className="flex items-center justify-center p-3 rounded-lg text-sm  text-slate-400 font-bold bg-slate-900 select-none">
            <span className='text-lg pr-2'> {this.state.currPlayer.name} </span> TURN </div>
          <Btn onClick={this.reStart.bind(this)} className="text-xl p-3 rounded bg-slate-400 text-slate-900">
            <MdReplayCircleFilled />
          </Btn>
        </header>
        <main className="grid grid-cols-3 grid-rows-3 gap-3 w-full justify-items-center">
          {this.state.gameState.map((rows, rowIndex)=>{
            return rows.map((value, index)=>{
              return (
                <MainBtn 
                onClick={this.handelBoxBtns.bind(this, rowIndex, index)}  
                key={ Date.now() *  ((rowIndex +1 ) * (index +1))} 
                className={`${this.state.gameState[rowIndex][index] == "x" ? 'x-color' : 'o-color'}`}>
                  {value}
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
      </>
    );
  }

}