import React, { useState } from 'react';
import './index.css';
export default function Question(props) {
    const {type} = props;
    const [likertSelectedIdx, setLikertSelectedIdx] = useState(-1);
    if(type === 'likert') {
        const {id, question, formArray, minText, maxText, callBack} = props;
        const clickHandle = (qid, value, lidx) => {
            setLikertSelectedIdx(lidx); // Change color 
            callBack(qid, value); // Call questionnaire callback 
        }
        const fontColor = (idx) => {
            if(idx === likertSelectedIdx) {return 'teal';}
            return '';
        }
        return(
            <div>
                <div className="likert-head">
                    <span className="likert-id">{id}</span>
                    <span className="likert-ask">{question}</span>
                </div>
                <div className="likert-form">
                    <div className="likert-form-mintext">{minText}</div>
                    <div className="likert-form-select">
                        <ul className="likert-form-ul">
                            {formArray.map((item, index) => {
                                return(
                                    <li onClick={() => {clickHandle(id, item, index)}}
                                        style={{color: fontColor(index)}}
                                    >
                                        {item}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="likert-form-maxtext">{maxText}</div>
                </div>
            </div>
        )
    }else{
        return <div></div>
    }
}