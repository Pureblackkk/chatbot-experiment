import {useState} from 'react';
import './index.css';
export default function Intro(props) {
    const [isIntro, setIntro] = useState(true);
    const [isWrap, setWrap] = useState(true);
    const hanleClick = () => {
        setIntro(false);
        setTimeout(() => {
            setWrap(false);
            props.callback();
        }, 590)
    }
    return(
        <div className='intro-wrap' style={{display: props.isIntro ? 'block' : 'none'}}>
            {
                isIntro ? 
                (
                    <div className='intro-pop-in'>
                    <p>{props.intro}</p>
                    <button onClick={hanleClick}>Confirm</button>
                    </div>
                ) :
                (
                    <div className='intro-pop-out'>
                    <p>{props.intro}</p>
                    <button onClick={hanleClick}>Confirm</button>
                    </div>
                )
            }
        </div>
    )
}