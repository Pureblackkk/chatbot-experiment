import React from 'react';
import history from '../../common/history';
import {connect} from 'react-redux';
import Question from '../../components/question/index';
import ProgressBar from '../../components/progressBar/index';
import './index.css';

class QuestionnairePage extends React.Component {
    constructor(props) {
        super(props);
        
        // Below are test data 
        this.testQuestionList = [
            {
                question: "Do you like Green?",
                formArray: [1,2,3,4,5],
                minText: "don't like",
                maxText: "like",
                type: "likert"
            },
            {
                question: "Do you like Yellow?",
                formArray: [1,2,3,4,5],
                minText: "don't like",
                maxText: "like",
                type: "likert"
            },
            {
                question: "Do you like Red?",
                formArray: [1,2,3,4,5],
                minText: "don't like",
                maxText: "like",
                type: "likert"
            },
            {
                question: "Do you like Blue?",
                formArray: [1,2,3,4,5],
                minText: "don't like",
                maxText: "like",
                type: "likert"
            }
        ]

        this.testStatusArray = new Array(this.testQuestionList.length).fill(0);
    }

    

    testCallBack(qid, value) {
        console.log(`Select question ${qid}`);
        console.log(`Select value ${value}`);
    }

    render() {
        return(
            <div>
                <div className="questionnaire-container">
                    {this.testQuestionList.map((item, index) => {
                        return (
                                <Question
                                    id={index + 1}
                                    type={item.type}
                                    question={item.question}
                                    formArray={item.formArray}
                                    minText={item.minText}
                                    maxText={item.maxText}
                                    callBack={this.testCallBack.bind(this)}
                                >
                                </Question>
                        )
                    })}
                </div>
                <div className="progress-container">
                    <ProgressBar statusArray={this.testStatusArray}>
                    </ProgressBar>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (curState) => {
    return {
        info: curState.infoReducer.userInfo,
    }
};

export default connect(mapStateToProps)(QuestionnairePage);