import "./index.css";
export default function Header(props) {
    let myName = props.name ? props.name : 'Robot';
    return (
        <div className='chat-header'>
            <span>{myName}</span>
        </div>
    )
}