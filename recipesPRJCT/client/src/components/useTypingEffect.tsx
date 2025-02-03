import { useEffect, useState } from "react"
import { typingType } from "./types"

const useTypingEffect = (typing: typingType) => {
    const [text, SetText] = useState('');
    const [isFinished, SetIsFinished] = useState(false);

    var current = 0;
    var prev = '';

    useEffect(() => {
        const timeOut = setTimeout(() => {
            const interval = setInterval(() => {
                SetText(prev + typing.text[current]);
                prev += typing.text[current++];
                if (current >= typing.text.length) {
                    clearInterval(interval);
                    SetIsFinished(true);
                }
            }, typing.speed)
        }, typing.delay);
        return () => clearTimeout(timeOut)
    }, [])
    return [text, isFinished]
}
export default useTypingEffect;
