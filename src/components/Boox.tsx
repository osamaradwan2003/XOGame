
type BoxProps = {
  children: React.ReactNode,
  title?: string,
  hint?: string,
}

const Box:React.FC<BoxProps> = ({children, title, hint})=>{
  return (
    <div>Boox</div>
  )
}


export default Box