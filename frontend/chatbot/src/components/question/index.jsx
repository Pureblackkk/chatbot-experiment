import React, { useEffect, useState } from 'react';
import './index.css';
export default function Question(props) {
    const {isClickedByProgress, selectedIdx, isFixed} = props;
    const {id, tid, lidx, question, formArray, minText, maxText, callBack} = props;

    const [currentSelectedIdx, setCurrentSelectedIdx] = useState(-1);

    const getClassByProgress = () => {
        if(isClickedByProgress) { return "question-clicked-progress"; }
        return "";
    }

    const clickHandle = (qid, value, index) => {
        if(isFixed) {return;}
        setCurrentSelectedIdx(index); // Change color 
        callBack(qid, value, lidx, tid, index); // Call questionnaire callback 
    }

    const fontColor = (index) => {
        if(index === currentSelectedIdx) { return 'teal'; }
        return '';
    }

    useEffect(() => {
        if(selectedIdx !== null) {
            setCurrentSelectedIdx(selectedIdx);
        }
    }, [])

    return(
        <div className={getClassByProgress()}>
            <div className="likert-head">
                <span className="likert-id">{tid}</span>
                <span className="likert-ask">{question}</span>
            </div>
            <div className="likert-form">
                <div className="likert-form-mintext">{minText}</div>
                <div className="likert-form-select">
                    <ul className="likert-form-ul" style={{cursor: isFixed ? 'not-allowed' : 'pointer'}}>
                        {formArray.map((item, index) => {
                            return(
                                <li onClick={() => {clickHandle(id, item, index)}}
                                    style={{color: fontColor(index)}}
                                    key={index}
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
}