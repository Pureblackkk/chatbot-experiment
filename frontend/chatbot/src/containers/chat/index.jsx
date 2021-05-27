import React from 'react';
import { withRouter } from "react-router-dom";
import Footer from '../../components/footer/index';
import Header from '../../components/header/index';
import ChatBox from '../../components/chatBox/index';
import NextBtn from '../../components/nextButton/index';
import Popup from '../../components/popup/index'
import {taskList, colorList} from '../../common/task.js';
import store from '../../store/index';
import {taskChange} from '../../store/action';
import history from '../../common/history'
import "./index.css";

class Chatpage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isNext: false,
            stateId: store.getState().state
        }
        this.taskId = parseInt(this.props.match.params.taskId) - 1;
        this.unsubscribe = store.subscribe(this.storeChange); // Subscribe if state change
    }

    // Listener part
    // Listen todo-list click
    recieveCount = (num) => {
        if(num === this.currentTask.length && !this.state.isNext) {
            this.setState({isNext: true});
        }else if(num !== this.currentTask.length && this.state.isNext){
            this.setState({isNext: false});
        }
    }

    // Listen storeChange
    storeChange = () => {
        const curState = store.getState();
        if(curState.state !== this.state.stateId) {
            if(curState.state === taskList[this.taskId].length) {
                this.setState({isNext: true});
                return;
            }
            this.setState({stateId: curState.state});
        }
    }


    nextCallBack = () => {
        // TODO: Send this term conversation to the backend

        // Direct to the next path
        let path = this.nextPath();
        history.push(path);
    }

    nextPath = () => {
        if(this.taskId === taskList.length - 1) {return 'todo'} // Todo
        let id = this.taskId + 2
        return id.toString();
    }

    render() {
        console.log(this.state.stateId)
        return (
            <div className='page-chat'>
                <div className='chat-container'>
                    <Header name="Bot"/>
                    <ChatBox/>
                    <Footer taskId={this.taskId}/>
                </div>
                <div className='popup-container'>
                    <Popup instr={taskList[this.taskId][this.state.stateId]} key={this.state.stateId}
                    color={colorList[this.taskId]}></Popup>
                    <NextBtn isShow={this.state.isNext} clickCallback={this.nextCallBack} color={colorList[this.taskId]}/> 
                </div>
            </div>
        )
    }
}

export default withRouter(Chatpage);
