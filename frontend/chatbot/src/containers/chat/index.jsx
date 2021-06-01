import React from 'react';
import Footer from '../../components/footer/index';
import Header from '../../components/header/index';
import ChatBox from '../../components/chatBox/index';
import NextBtn from '../../components/nextButton/index';
import Popup from '../../components/popup/index'
import history from '../../common/history';
import Actions from '../../store/actions';
import {connect} from 'react-redux';
import "./index.css";

class Chatpage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isNext: false,
            isTyping: false
        }
        this.taskId = parseInt(this.props.taskId) - 1;
        this.taskList = this.props.info.instruction[this.taskId];
        this.inroduction = this.props.info.inroduction[this.taskId];
        this.color = this.props.info.color[this.taskId];
        this.antroLevel = this.props.info.antroLevel[this.taskId];
        this.useranme = this.props.info.name;
        this.botname = this.antroLevel.name;
    }

    // Listener function
    recieveCount = (num) => {
        const currentTaskLen = this.taskList.length;
        if(num === currentTaskLen && !this.state.isNext) {
            this.setState({isNext: true});
        }else if(num !== currentTaskLen && this.state.isNext){
            this.setState({isNext: false});
        }
    }

    typingCallBack = (status) => {
        // Set is typing callback
        this.setState({isTyping: status});
    }

    nextCallBack = () => {
        // TODO: Send this term conversation to the backend

        // Direct to the next path
        let path = this.nextPath();
        history.push(path);
    }

    nextPath = () => {
        if(this.taskId === this.props.info.instruction.length - 1) {return 'todo'} // Todo
        let id = this.taskId + 2
        return id.toString();
    }

    componentDidUpdate() {
        this.recieveCount(this.props.stateId);
    }

    render() {
        const stateId = this.props.stateId === this.taskList.length ? this.props.stateId - 1 : this.props.stateId;
        const {isTyping} = this.state;
        return (
            <div className='page-chat'>
                <div className='chat-container'>
                    <Header name= {isTyping ? 'Typing' : this.botname}/>
                    <ChatBox username={this.useranme} antroLevel={this.antroLevel} />
                    <Footer taskId={this.taskId} wait={this.antroLevel.wait} typingCallBack = {this.typingCallBack}/>
                </div>
                <div className='popup-container'>
                    <Popup instr={this.taskList[stateId]} key={stateId}
                    color={this.color}></Popup>
                    <NextBtn isShow={this.state.isNext} clickCallback={this.nextCallBack} color={this.color}/> 
                </div>
            </div>
        )
    }

    componentWillUnmount() {
        // TODO: Send the message to backend (except the personal information)

        // Clean the messgeList
        this.props.cleanMessage();
        // Set stateId to 0 again 
        this.props.taskChange(0);
    }
}

const mapStateToProps = (curState) => {
    console.log(curState);
    return {
        stateId: curState.messageReducer.state,
        messageList: curState.messageReducer.messageList,
        info: curState.infoReducer.userInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userPostMes: (...args) => dispatch(Actions.userPostMes(...args)),
        botPostMes: (...args) => dispatch(Actions.botPostMes(...args)),
        taskChange: (...args) => dispatch(Actions.taskChange(...args)),
        cleanMessage: (...args) => dispatch(Actions.cleanMessage(...args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatpage);
