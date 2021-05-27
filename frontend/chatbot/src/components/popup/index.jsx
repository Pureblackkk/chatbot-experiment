import React from 'react';
import './index.css';

export default function Popup(props) {
    return (
        <div className="chat-popup" style={{backgroundColor: props.color}}>
            <span>{props.instr}</span>
            <div className="dp-icon" style={{'::before': {color: props.color}}}></div>
        </div>
    )
}
