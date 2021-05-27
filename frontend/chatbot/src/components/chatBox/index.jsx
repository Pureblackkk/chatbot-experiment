import React from 'react';
import store from '../../store/index';
import "./index.css";



export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
        this.showList = [];
        this.messagesEndRef = React.createRef()
        // Bind function 
        this.unsubscribe = store.subscribe(this.storeChange); // Subscribe listener
    }

    storeChange = () => {
        this.setState(store.getState());
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
        const {messageList} = this.state
        console.log(messageList)
        return (
            <div className="chat-box">
                {this.state.messageList.map((item, index) => {
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
    
    componentWillUnmount() {
        this.unsubscribe();
    }
}