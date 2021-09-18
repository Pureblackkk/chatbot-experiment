import "./index.css";

export default function Header(props) {
    let myName = props.name ? props.name : 'Robot';
    return (
        <div className='chat-header'>
            <span>{props.isName ? myName : ''}</span>
            {myName === 'Typing' && (<span className='chat-typing'>
                . . . . . .
            </span>)}
        </div>
    )
}