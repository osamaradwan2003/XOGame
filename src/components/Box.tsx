import {useState} from "react"

type BoxProps = {
  children: React.ReactNode,
  title?: string,
  hint?: string,
  className? : string,
}

const Box:React.FC<BoxProps> = ({children, title, hint, className})=>{
  return (
    <div className=
    {`box 
    ${className || ''}`}>
      <h3 className="text-md text-center text-slate-300 font-bold "> {title} </h3>
      {children}
      <div className="hint text-sm text-center text-slate-600" >{hint}</div>
    </div>
  )
}


export default Box