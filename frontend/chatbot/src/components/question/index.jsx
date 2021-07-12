import React, { useEffect, useState } from 'react';
import './index.css';
export default function Question(props) {
    const {type, isClickedByProgress, selectedIdx, isFixed} = props;
    const [likertSelectedIdx, setLikertSelectedIdx] = useState(-1);

    const getClassByProgress = () => {
        if(isClickedByProgress) {return "question-clicked-progress";}
        return "";
    }

    useEffect(() => {
        if(selectedIdx !== null) {
            setLikertSelectedIdx(selectedIdx);
        }
    }, [])

    if(type === 'likert') {
        const {id, tid, lidx, question, formArray, minText, maxText, callBack} = props;

        const clickHandle = (qid, value, index) => {
            if(isFixed) {return;}
            setLikertSelectedIdx(index); // Change color 
            callBack(qid, value, lidx, tid, index); // Call questionnaire callback 
        }

        const fontColor = (index) => {
            // if(selectedIdx !==null && selectedIdx === index) {return 'teal';}
            if(index === likertSelectedIdx) {return 'teal';}
            return '';
        }

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
    }else{
        return <div></div>
    }
}