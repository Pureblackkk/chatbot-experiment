import React from 'react';
import './index.css';
export default function ProgressBar(props) {
    const {statusArray} = props;
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
    return(
        <ul>
            {statusArray.map((val, index) => {
                return(
                    <li className={getClassName(val)}>status</li>
                )
            })}
        </ul>
    )
}