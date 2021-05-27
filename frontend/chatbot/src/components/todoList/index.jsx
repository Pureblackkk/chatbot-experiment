import React from 'react';
import './index.css';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.checkDic = {}
    }

    checkValue = (e) => {
        let val = e.target.value;
        if(val in this.checkDic) {
            delete this.checkDic[val]
        }else{
            this.checkDic[val] = true;
        }
        this.props.recieveCount(Object.keys(this.checkDic).length);
    }

    render() {
        return (
            <div class="chat-todoList">
                <h1 class="chat-title">Task List</h1>
                <div class="chat-tasks">
                    {this.props.taskList.map((item, index) => {
                        let id = "item" + index
                        return (
                            <React.Fragment>
                                <input id={id} value={index.toString()} onClick={e => this.checkValue(e)} type="checkbox"/>
                                <label for={id}>{item}</label>
                            </React.Fragment>  
                        )
                    })}
                    <h2 class="done">Done</h2>
                    <h2 class="pending">Pending</h2>
                </div>
            </div>
        )
    }
}