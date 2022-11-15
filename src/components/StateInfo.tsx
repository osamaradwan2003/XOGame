
interface StateProps{
  title: string,
  content: number,
  className?:string
}

const StateInfo : React.FC<StateProps> = (props) =>{

  return (
    <div  className={
      `w-[7rem] pt-2 pb-1 rounded-lg flex flex-col items-center justify-center text-slate-900 font-bold select-none ${props?.className ?? ''}`
    }>
        <span className='text-sm'> {props.title } </span>
        <span className="text-xl">{props.content}</span>
    </div>
  )

};

export default StateInfo;

