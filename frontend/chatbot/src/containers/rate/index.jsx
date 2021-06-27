import React from 'react';
import {connect} from 'react-redux';
import { Rate, message} from 'antd';
import history from '../../common/history';
import './index.css';

class Ratepage extends React.Component {
    constructor(props) {
        super(props);
        this.taskId = parseInt(this.props.taskId) - 1;
        this.isChange = false;
    }

    clickHandle = () => {
        if(this.isChange) {
            // TODO: active upload action
            let path = this.nextPath();
            history.push(path);
        }else{
            message.warn('Please at least change the rate once!')
        }
     
    }

    nextPath = () => {
        if(this.taskId === this.props.instruction.length - 1) {return '/thanks'} // Todo
        let id = this.taskId + 2
        return '/task/' + id.toString();
    }

    changeHandle = (value) => {
        this.isChange || (this.isChange=true);
        console.log(value);
    }

    render() {
        return (
            <div className="rate-button-wrap">
                <div className="rate-wrap">
                    <div className="rate-content">
                        {this.props.postQ[this.taskId]}
                    </div>    
                    <div className="rate-rate" >
                        <div className="rate-sad">
                            <span>Totally Unwilling</span>
                        </div>
                        <Rate 
                            style={{
                                fontSize: '60px',
                                color: 'teal',
                            }}
                            defaultValue={1} 
                            character={({ index }) => index + 1} 
                            onChange={this.changeHandle}
                        />
                        <div className="rate-smile">
                            <span>Totally Willing</span>
                        </div>
                    </div>
                </div>
                <div>
                    <button className="rate-button" onClick={this.clickHandle}>Next</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (curState) => {
    console.log(curState);
    return {
        instruction: curState.infoReducer.userInfo.instruction,
        postQ: curState.infoReducer.userInfo.postQuestion,
    }
};


export default connect(mapStateToProps)(Ratepage);
