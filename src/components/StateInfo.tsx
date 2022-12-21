
interface StateProps{
  title: string,
  content: number,
  className?:string
}

const StateInfo : React.FC<StateProps> = (props) =>{

  return (
    <div  className={
      `sm:w-[7rem] w-full pt-2 pb-1 rounded-lg flex flex-col items-center justify-center text-slate-900 font-bold select-none ${props?.className ?? ''}`
    }>
        <span className='text-sm'> {props.title } </span>
        <span className="text-xl">{props.content}</span>
    </div>
  )

};

export default StateInfo;

