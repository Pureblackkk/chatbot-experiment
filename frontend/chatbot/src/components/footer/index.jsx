import React from 'react';
import {userPostMes, botPostMes, taskChange} from '../../store/action';
import store from '../../store/index';
import {botAPI} from '../..//api/bot';
import "./index.css";

export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            chatHeight: 20
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
        store.dispatch(userPostMes(sendMessage));
        this.setState({input: '', chatHeight: this.fixHeight});
        this.lastScrollHeight = this.fixScrollHeight;

        //TODO: Call API and send callback function
        botAPI(sendMessage, store.dispatch, botPostMes, taskChange, this.props.taskId);
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