import { Box } from "../components";
import {Switch} from "../components";




const ChosePlayer: React.FC<{}> = ()=>{
  const showValue = (e:any, i:number, v: [])=>{
    console.log(e,i,v)
  }
  return (
    <Box title="PICK PLAYER 1'S MARK" hint="REMEMBER: X GOES FIRST">
        <Switch 
          values={["x", "o"]} 
          defaultValue='x'
          OnSwitch={showValue}
        />
    </Box>
  );
}

export default ChosePlayer;
