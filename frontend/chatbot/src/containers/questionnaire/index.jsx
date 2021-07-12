import React from 'react';
import {QuestionNumber, UrlPath} from '../../config/config';
import history from '../../common/history';
import {connect} from 'react-redux';
import Question from '../../components/question/index';
import ProgressBar from '../../components/progressBar/index';
import { Pagination, message, Spin, Alert} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './index.css';

class QuestionnairePage extends React.Component {
    constructor(props) {
        super(props);

        // Below are test data 
        this.testQuestionList = new Array(15).fill({
                qid: 1,
                question: "Do you like Green?",
                formArray: [1,2,3,4,5,6,7],
                minText: "don't like",
                maxText: "like",
                type: "likert"
        })
       
        this.state = {
            statusArray: null,
            lastFocusIdx: null,
            lastFocusTIdx: null,
            isNext: false,
            clickByProgress: -1,
            currentPage: 1,
            maxPage: 1,
            isSubmit: false
        }

        // Ref variable of questionnaire
        this.postList = new Array(QuestionNumber).fill(null);
        this.allStatusArray = new Array(this.testQuestionList.length).fill(0);
        this.allAnsArray = new Array(this.testQuestionList.length).fill(null);
        this.allIsNext = new Array(1).fill(false);

        // User info 
        this.userId = props.uid;

        // TODO: Get questionnarie name 
        this.questionnaireName = 'testName'
    }

    getCurrentList(currentPage=this.state.currentPage) {
        const startNumber = (currentPage - 1) * QuestionNumber;
        const endNumber = startNumber + QuestionNumber;
        const curQuesList = this.testQuestionList.slice(startNumber, endNumber);
        const curStatList = this.allStatusArray.slice(startNumber, endNumber);
        const curAnsList = this.allAnsArray.slice(startNumber, endNumber);

        return {curQuesList, curAnsList, curStatList};
    }

    componentDidMount() {
        // Retrieve Questionnaire
        fetch(`${UrlPath.question + this.questionnaireName}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if(response.status === 200) {
                return response.json();
            }else{
                return Promise.reject();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(`Recieve questionnaire error ${error}`);
        })

        // Initial the status array 
        // const initStatusArray = new Array(QuestionNumber).fill(0);
        let {curStatList} = this.getCurrentList();
        curStatList[0] = 2;
        this.setState({
            statusArray: curStatList,
            lastFocusIdx: 0,
            lastFocusTIdx: 0
        });
    }

    statusChange(lidx, tid) {
         // Change status array
         let {statusArray, lastFocusIdx, lastFocusTIdx, isNext, currentPage} = this.state;
         tid = tid - 1;
         isNext = true;
         let startNumber = (currentPage - 1) * QuestionNumber; 

         // To see if change the focus status 
         if(lidx >= this.state.lastFocusIdx) {
             if(lidx === statusArray.length - 1) {
                 // Active next page progress
             }else{
                (statusArray[lidx + 1] === 2) || (this.allStatusArray[tid + 1] = 2);
                (statusArray[lidx + 1] === 2) || (statusArray[lidx + 1] = 2);
             }
             statusArray[lastFocusIdx] = 0;
             this.allStatusArray[lastFocusTIdx] = 0;
             lastFocusIdx = lidx + 1;
             lastFocusTIdx = tid + 1;
         }
 
         // Set current lidx to done
         (statusArray[lidx] === 1) || (this.allStatusArray[tid] = 1);
         (statusArray[lidx] === 1) || (statusArray[lidx] = 1);
         
         // To see if any question is missing & is able to go next
         for(let i = 0; i < lidx; i++) {
            (statusArray[i] === 0) && (this.allStatusArray[startNumber + i] = 3);
            (statusArray[i] === 0) && (statusArray[i] = 3);
            (statusArray[i] === 1) || (isNext = false);
         }

         for(let i = lidx, len = statusArray.length; i < len; i++) {
            (statusArray[i] === 1) || (isNext = false);
         }

         console.log(statusArray);
         console.log(lidx);
         // Update
         this.allIsNext[currentPage] = isNext;
         this.setState({
            statusArray: statusArray,
            lastFocusIdx: lastFocusIdx,
            lastFocusTIdx: lastFocusTIdx,
            isNext: isNext
         })
    }


    // The main control of question click callback 
    testCallBack(qid, value, lidx, tid, selectedIdx) {
        console.log(`lidx is ${lidx}`);
        // Save to answer list 
        this.allAnsArray[tid-1] = selectedIdx;

        // Change status 
        this.statusChange(lidx, tid);

        // Add answer to post list
        this.postList[lidx] = {
            qid: qid,
            value: value,
            selectedIdx: selectedIdx
        }
        console.log(this.postList)
    }

    progressCallBack(lidx) {
        console.log('progress click', lidx);
        this.setState({clickByProgress: lidx});
        setTimeout(() => {
            this.setState({clickByProgress: -1});
        }, 500)
    }

    pageChangeHandle(page) {
        let {isNext, currentPage, lastFocusIdx, lastFocusTIdx, maxPage, isSubmit} = this.state;
        let isNewPage = false;
        console.log(isSubmit);
        if(isSubmit) {return;}

        // Check if qualified to go next 
        if(!isNext && page > currentPage) {
            message.error('Please fill all the questions!')
            return;
        }

        // Set new current page 
        if(page === currentPage) {
            // Select current page
            return;
        }else if (page > maxPage) {
            // Select new page
            currentPage = currentPage + 1;
            maxPage += 1;
            this.allIsNext.push(false);
            isNewPage = true;
            lastFocusIdx = 0;
            lastFocusTIdx = (currentPage-1) * QuestionNumber;
        }else{
            // Select before page
            currentPage = page;
        }

        // If new page set first element to focus
        let statusArray = this.getCurrentList(currentPage).curStatList;
        isNewPage && (statusArray[0] = 2); 
        isNewPage && (this.allStatusArray[(currentPage-1) * QuestionNumber] = 2);
        
       
        if(isNewPage) {
            // Show Loading and upload
            this.setState({
                isSubmit: true
            }, () => {
                const postData = {
                    uid: this.userId,
                    payload: this.postList
                }
                fetch(UrlPath.question, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postData)
                })
                .then((response) => {
                    if(response.status === 200) {
                        return response.json();
                    }else{
                        return Promise.reject();
                    }
                })
                .then((data) => {
                    console.log(`Success ${data}`);
                    // Post success then close loading and change state
                    this.postList = new Array(QuestionNumber).fill(null);
                    setTimeout(() => {
                        this.setState({
                            currentPage: currentPage,
                            statusArray: statusArray,
                            isNext: this.allIsNext[currentPage],
                            lastFocusIdx: lastFocusIdx,
                            lastFocusTIdx: lastFocusTIdx,
                            isSubmit: false,
                            maxPage: maxPage
                        });
                    }, 500)
                })
                .catch((error) => {
                    console.log(error);
                    // Alert Error 
                    message.error('Submit fail. Please try again!')
                    this.setState({
                        isSubmit: false
                    });
                })
            })
        }else{
            // Not show loading when change to previous page 
            this.setState({
                currentPage: currentPage,
                statusArray: statusArray,
                isNext: this.allIsNext[currentPage],
                lastFocusIdx: lastFocusIdx,
                lastFocusTIdx: lastFocusTIdx,
                isSubmit: false,
                maxPage: maxPage
            })
        }
    }

    nextPartHandle() {
        // TODO: Push History to next part
    }



    render() {
        const {curQuesList, curAnsList} = this.getCurrentList();
        const startNumber = (this.state.currentPage - 1) * QuestionNumber;
        const isFinal = (startNumber + curQuesList.length) === this.testQuestionList.length;
        const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
        return(
            <div>
                <div className="questionnaire-container">
                    <div className="questionnaire-title">
                        Questionnaire
                    </div>
                    {curQuesList.map((item, index) => {
                        return (
                                <Question
                                    id={item.qid}
                                    tid={startNumber + index + 1}
                                    lidx={index}
                                    type={item.type}
                                    question={item.question}
                                    formArray={item.formArray}
                                    minText={item.minText}
                                    maxText={item.maxText}
                                    callBack={this.testCallBack.bind(this)}
                                    key={startNumber + index + 1}
                                    isClickedByProgress={index === this.state.clickByProgress}
                                    selectedIdx={curAnsList[index]}
                                    isFixed={this.state.currentPage !== this.state.maxPage}
                                >
                                </Question>
                        )
                    })}
                    <div className="questionnaire-page">
                        <Pagination 
                            defaultCurrent={1} 
                            current={this.state.currentPage}
                            pageSize={QuestionNumber}
                            total={this.testQuestionList.length} 
                            onChange={this.pageChangeHandle.bind(this)}
                        />
                    </div>
                </div>
                <div className="progress-container">
                    <ProgressBar 
                        isFinal={isFinal}
                        startTid={startNumber + 1}
                        statusArray={this.state.statusArray}
                        isNext={this.state.isNext}
                        progressCallBack={this.progressCallBack.bind(this)}
                    >
                    </ProgressBar>
                    <div 
                        className="progress-submit"
                        style={{display: (this.state.isNext && isFinal) ? 'block' : 'none'}}
                        onClick={this.nextPartHandle.bind(this)}
                    >
                        Next
                    </div>
                </div>
                <div className="questionnaire-loading" style={{display: this.state.isSubmit ? 'block' : 'none'}}>
                        <Spin indicator={loadingIcon} spinning={true} delay={600} size="large">
                        <Alert
                            message="Submitting"
                            description="Please wait a second"
                            type="info"
                        />
                        </Spin>
                </div>
                <div className="questionnaire-loading-block" style={{display: this.state.isSubmit ? 'block' : 'none'}}>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (curState) => {
    return {
        uid: curState.infoReducer.userInfo.id,
    }
};

export default connect(mapStateToProps)(QuestionnairePage);