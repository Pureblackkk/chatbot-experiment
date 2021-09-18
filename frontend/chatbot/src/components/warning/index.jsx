import React from 'react';
import './index.css';

export default function Warning(props) {
    const handleConfirm = () => props.callback();

    return (
        <div className="warn-stage">
            <div className="warn-background"></div>
            <div className="warn-wrap">
                <div className="warn-logo"></div>
                <div className="warn-content"> {props.warningContent} </div>
                <button className="warn-confirm-button" onClick={handleConfirm}> Understood </button>
            </div> 
        </div>
    )
} 