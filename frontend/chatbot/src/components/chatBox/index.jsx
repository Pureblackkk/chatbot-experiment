import React from 'react';
import {connect} from 'react-redux';
import "./index.css";
import AnsConvert from '../../api/ans';



class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.showList = [];
        this.messagesEndRef = React.createRef()
    }

    scrollBottom = () => {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    componentDidMount() {
        this.scrollBottom();
    }

    componentDidUpdate() {
        this.scrollBottom();
    }

    convertAns(ans) {
        const evnObj = {
            name: this.props.name,
            income: this.props.conIncome,
            riskLevel: this.props.conRiskLevel
        }
        return AnsConvert(ans, evnObj);
    }

    render() {
        const {name, avator} = this.props.antroLevel;
        const username = this.props.username;
        return (
            <div className="chat-box">
                <div style={{clear: 'both'}}>
                        <div key={0} className='bot'>
                            {/* <div className={"chat-bot-name"}>
                                {name}
                            </div>
                            <div className={'bot-pic-'+avator}>
                            </div> */}
                            <div className={"chat-bot-message"}>
                                {this.props.ans[this.props.taskId][0]}
                            </div>
                        </div>
                </div>    
                {this.props.messageList.map((item, index) => {
                    return (
                    <div style={{clear: 'both'}}>
                        <div key={index+1} className={item.type}>
                            {/* <div className={"chat-" + item.type + "-name"}>
                                {item.type === 'user' ? username : name}
                            </div> */}
                            {/* <div className={item.type+'-pic-'+avator}>
                            </div> */}
                            <div className={"chat-" + item.type + "-message"}>
                                {this.convertAns(item.message)}
                            </div>
                        </div>
                    </div>          
                    )
                })}
                <div ref={this.messagesEndRef}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        name: state.infoReducer.userInfo.name,
        ans: state.infoReducer.userInfo.ans,
        messageList: state.messageReducer.messageList,
        conIncome: state.conversationReducer.income,
        conRiskLevel: state.conversationReducer.riskLevel
    }
}

export default connect(mapStateToProps)(ChatBox);