import React from 'react';
import Actions from '../../store/actions';
import {connect} from 'react-redux';
import "./index.css";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            chatHeight: 20,
            tryTimes: this.props.tryTimes
        };
        this.fixHeight = 20; 
        this.fixScrollHeight = null;
        this.lastScrollHeight = null;
        this.postMessage = this.postMessage.bind(this);
    }

    handleInput = (event) => {
        // Set Height according to the scrollHeight
        let currentHeight = event.target.scrollHeight;
        if(this.fixScrollHeight === null) {
            this.fixScrollHeight = currentHeight;
        }
        if(this.lastScrollHeight === null) {
            this.lastScrollHeight = this.fixScrollHeight;
        }
        let diff = (currentHeight - this.lastScrollHeight) / this.fixScrollHeight;
        let finalHeight = this.state.chatHeight + diff * this.fixHeight;
        if(diff && finalHeight >= this.fixHeight) {
            this.setState({
                chatHeight: finalHeight
            })
        }
        this.setState({
            input: event.target.value,
        })
        // Update
        this.lastScrollHeight = currentHeight;
    }

    enterMessage = (event) => {
        if(event.keyCode === 13){
            event.preventDefault();
            this.postMessage();
        }
    }

    postMessage() {
        let sendMessage = this.state.input;
        if(sendMessage.trim() === '') {sendMessage='\u00A0'}
        this.props.userPostMes(sendMessage);
        this.setState({input: '', chatHeight: this.fixHeight});
        this.lastScrollHeight = this.fixScrollHeight;
        this.callBot(sendMessage);
    }

    callBot(sendMessage) {
        //Call Chat API and send dispatch function
        const storeObj = {
            ansList: this.props.ansList[this.props.taskId],
            keyList: this.props.keyList[this.props.taskId],
            wait: this.props.wait
        }
        // Create Bot instance 
        this.props.BotAPI.sendMessage(sendMessage, this.props.botPostMes, this.props.taskChange, 
        storeObj, this.props.typingCallBack);
    }
     
    render() {
        const {chatHeight} = this.state;
        return (
            <div className='chat-footer'>
                <textarea className='chat-input' placeholder='Please input'
                value={this.state.input} onChange={this.handleInput} onKeyDown={this.enterMessage}
                style={{height: chatHeight + 'px'}}
                >
                </textarea>
                <button className='chat-button' onClick={this.postMessage}>Enter</button>
            </div>
        )
    }
}

const mapStateToProps = (curState) => {
    return {
        stateId: curState.messageReducer.state,
        tryTimes: curState.messageReducer.tryTimes,
        ansList: curState.infoReducer.userInfo.ans,
        keyList: curState.infoReducer.userInfo.key
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userPostMes: (...args) => dispatch(Actions.userPostMes(...args)),
        botPostMes: (...args) => dispatch(Actions.botPostMes(...args)),
        taskChange: (...args) => dispatch(Actions.taskChange(...args)),
        setTryTimes: (...args) => dispatch(Actions.setTryTimes(...args))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Footer);
