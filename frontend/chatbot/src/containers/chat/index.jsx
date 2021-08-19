import React from 'react';
import Footer from '../../components/footer/index';
import Header from '../../components/header/index';
import ChatBox from '../../components/chatBox/index';
import NextBtn from '../../components/nextButton/index';
import SkipBtn from '../../components/skipButton/index';
import Popup from '../../components/popup/index';
import Intro from '../../components/intro';
import history from '../../common/history';
import Actions from '../../store/actions';
import {SkipMax, InternetMode, UrlPath} from '../../config/config';
import {connect} from 'react-redux';
import BotAPI from '../../api/bot';
import "./index.css";

class Chatpage extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
            isNext: false,
            isTyping: false,
        }
        this.taskId = parseInt(this.props.taskId) - 1;
        this.taskList = this.props.info.instruction[this.taskId].slice(1);
        // this.inroduction = this.props.info.inroduction[this.taskId];
        this.color = this.props.info.color[this.taskId];
        this.stateId = this.props.stateId;
        this.antroLevel = this.props.info.antroLevel[this.taskId];
        this.useranme = this.props.info.name;
        this.botname = this.antroLevel.name;

        let conActions = {
            'setConIncome': this.props.setConIncome,
            'setConRiskLevel': this.props.setConRiskLevel
        }
        this.BotAPI = new BotAPI(this.props.tryTimes, this.props.setTryTimes, conActions,
            this.stateId, this.taskId + 1, InternetMode); // Initial a Bot API
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
        // Send this term conversation to the backend
        const postData = {
            uid: this.props.info.id,
            dialog: this.props.messageList.reduce((pre, cur) => {
                pre = `${pre}${cur.type}: ${cur.message}| `;
                return pre;
            }, ''),
            scenario: this.taskId + 1, // TODO: Need to pay attention
        }

        fetch(UrlPath.dialog, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        }).then((response) => {
            if(response.status === 200) {
                return response.json();
            }else{
                return Promise.reject();
            }
        })
        .then((data) => {
            console.log(data);
        })
        .catch((e) => {
            console.log(e);
        })

        // Direct to the next path
        let path = this.nextPath();
        history.push(path);
    }

    skipCallBack = () => {
        // Change the state manually 
        this.props.setTryTimes(0);
        this.BotAPI.cleanTryTime();
        this.props.taskChange(this.props.stateId + 1);
    }

    introCallBack = () => {
        this.setState({isIntro: true})
    }

    nextPath = () => {
        // return `/rate/${this.taskId + 1}`
        return `/rate_temp/${this.taskId + 1}`
    }

    componentDidUpdate() {
        //Send the newest id to Bot object
        this.BotAPI.setState(this.props.stateId);
        this.recieveCount(this.props.stateId);
    }

    render() {
        const stateId = this.props.stateId === this.taskList.length ? this.props.stateId - 1 : this.props.stateId;
        const {isTyping} = this.state;
        return (
            <div className='page-chat'>
                <div className='chat-container'>
                    <Header name= {isTyping ? 'Typing' : this.botname}/>
                    <ChatBox key={this.taskId} username={this.useranme} antroLevel={this.antroLevel} taskId={this.taskId}/>
                    <Footer taskId={this.taskId} wait={this.antroLevel.wait} 
                    typingCallBack={this.typingCallBack} BotAPI={this.BotAPI}/>
                </div>

                {/* <Intro style={{display: (this.props.intro) ? 'block' : 'none'}} 
                intro={this.inroduction} callback={this.props.setIntro} isIntro={this.props.intro}/> */}
                <div className='chat-rightpanel'>
                    {/* <div style={{display: (!this.props.intro) ? 'block' : 'none'}} className='intro-container'>
                        {this.inroduction}
                    </div> */}
                    <div className='popup-container'>
                        <Popup instr={this.taskList[stateId]} key={stateId} color={this.color}></Popup>
                        <NextBtn isShow={this.state.isNext} clickCallback={this.nextCallBack} color={this.color}/> 
                        <SkipBtn isShow={this.props.tryTimes >= SkipMax} clickCallback={this.skipCallBack} color={this.color}/>
                    </div>
                </div>
            </div>
        )
    }

    componentWillUnmount() {   
        // Clean the messgeList
        this.props.cleanMessage();
        // Set stateId to 0 again 
        this.props.taskChange(0);
        // Reset introduction (note that it depends on the real application)
        this.props.setIntro();
        // Set tryTimes to 0
        this.props.setTryTimes(0);
    }
}

const mapStateToProps = (curState) => {
    return {
        stateId: curState.messageReducer.state,
        intro: curState.messageReducer.intro,
        tryTimes: curState.messageReducer.tryTimes,
        messageList: curState.messageReducer.messageList,
        info: curState.infoReducer.userInfo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        userPostMes: (...args) => dispatch(Actions.userPostMes(...args)),
        botPostMes: (...args) => dispatch(Actions.botPostMes(...args)),
        taskChange: (...args) => dispatch(Actions.taskChange(...args)),
        cleanMessage: (...args) => dispatch(Actions.cleanMessage(...args)),
        setTryTimes: (...args) => dispatch(Actions.setTryTimes(...args)),
        setIntro: (...args) => dispatch(Actions.setIntro(...args)),
        setConIncome: (...args) => dispatch(Actions.setConIncome(...args)),
        setConRiskLevel: (...args) => dispatch(Actions.setConRiskLevel(...args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatpage);
