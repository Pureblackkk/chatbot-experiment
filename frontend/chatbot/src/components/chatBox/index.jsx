import React from 'react';
import {connect} from 'react-redux';
import "./index.css";



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


    render() {
        return (
            <div className="chat-box">
                {this.props.messageList.map((item, index) => {
                    return (
                    <div key={index} className={item.type}>
                        <div className={item.type+'-pic'}>
                        </div>
                        <div className={"chat-" + item.type + "-message"}>
                            {item.message}
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
        messageList: state.messageReducer.messageList
    }
}

export default connect(mapStateToProps)(ChatBox);