import {useState} from "react";
type SwichProps = {
  values: any[],
  OnSwitch?: CallableFunction,
  defaultValue?: any,
}

const Switch: React.FC<SwichProps> = ({values, OnSwitch, defaultValue})=>{

  let [slectedValue, setSelectValue] = useState(defaultValue ?? values[0]);
  

  const handelClick =  (elem: any, index: number)=>{
    if(elem == slectedValue) return;
    if(values.indexOf(elem) == -1) return;
    setSelectValue(()=>{
      return values[index]
    })
    if(OnSwitch){
      OnSwitch(elem, index, values);
    }
  }


  return (
    <div className="flex w-full bg-slate-900 p-1 text-slate-300 rounded my-2">
      {
        values.map((elem: any, index:number)=>{
            return (
              <div
                onClick = {()=>{handelClick(elem, index)}}
                key={Math.random() * 1000}
                className={`flex justify-center items-center w-[50%] rounded text-lg font-bold cursor-pointer  ${slectedValue == elem ? 'bg-slate-200 text-slate-900' : ''} `} >
                {elem}
              </div>
            )
        })
      }
    </div>
  );

}

export default Switch;

function handelClick(elem: any): import("react").MouseEventHandler<HTMLDivElement> | undefined {
  throw new Error("Function not implemented.");
}
