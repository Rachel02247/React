import { Hidden } from "@mui/material";
import { typingType } from "./types";
import useTypingEffect from "./useTypingEffect";
import { bottom, hide } from "@popperjs/core";

const UsingTypingEffect=()=>{
    var typing: typingType = {text: "welcome to our website:)", speed: 200, delay: 0};
    
    const [text, isFinished] = useTypingEffect(typing);
    const style ={
        left: '45%', 
        bottom: '3%',
        position: 'Hidden' 
    }
    return (<>
    <h2 style={{ color: '#F2E5C9' }}>{text}</h2>
    </>)
}
export default UsingTypingEffect