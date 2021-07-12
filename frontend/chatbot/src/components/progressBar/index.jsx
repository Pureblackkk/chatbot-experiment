import React from 'react';
import './index.css';
export default function ProgressBar(props) {
    const {isFinal, statusArray, isNext, progressCallBack, startTid} = props;
    const getClassName = (status) => {
        switch(status) {
            case 0:
                return "progress-li-undone";
            case 1:
                return "progress-li-done";
            case 2:
                return "progress-li-focus";
            case 3:
                return "progress-li-error";
            default:
                return "";
        }
    }

    const clickHandle = (lidx) => {
        progressCallBack(lidx);
    }


    return(
        <ul className="progress-ul">
            {statusArray && statusArray.map((val, index) => {
                return(
                    <li 
                        key={index} 
                        className={getClassName(val)}
                        onClick={() => {clickHandle(index)}}
                    > 
                        {` ${index+startTid}`}
                    </li>
                )
            })}
            <div className={isNext ? "progress-li-next-success" : "progress-li-next-fail"}>{isFinal ? ' Done' : ' Next'}</div>
        </ul>
    )
}