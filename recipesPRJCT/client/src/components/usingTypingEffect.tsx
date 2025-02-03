import { typingType } from "./types";
import useTypingEffect from "./useTypingEffect";

const UsingTypingEffect=()=>{
    var typing: typingType = {text: "welcome to our website:)", speed: 200, delay: 0};
    
    const [text, ] = useTypingEffect(typing);
  
    return (<>
    <h2 style={{ color: '#F2E5C9' }}>{text}</h2>
    </>)
}
export default UsingTypingEffect