import React from 'react';
import './index.css';

export default function Popup(props) {
    return (
        <div className="chat-popup-wrap" style={{backgroundColor: props.color}}>
            <span className="chat-popup" style={{backgroundColor: props.color}}>{props.instr}</span>
            <span className="dp-icon" style={{'::before': {color: props.color}}}></span>
        </div>
    )
}
