import { IsPlainTextMode } from '../../config/config';
import "./index.css";

export default function Header(props) {
    let myName = props.name ? props.name : 'Robot';
    return (
        <div className='chat-header'>
            <span>{IsPlainTextMode ? myName : ''}</span>
            {myName === 'Typing' && (<span className='chat-typing'>
                . . . . . .
            </span>)}
        </div>
    )
}