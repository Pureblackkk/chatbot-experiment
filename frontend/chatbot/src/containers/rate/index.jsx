import React from 'react';
import {connect} from 'react-redux';
import { Rate, message} from 'antd';
import history from '../../common/history';
import './index.css';

class Ratepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNumber: null
        }
        this.taskId = parseInt(this.props.taskId) - 1;
        this.isChange = false;
        this.rating = [1, 2, 3, 4, 5];
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
        return '/introduction/' + id.toString();
    }

    changeHandle = (value) => {
        this.isChange || (this.isChange=true);
        console.log(value);
    }

    colorstyleSet = (isEqual) => {
        if(isEqual) {
            return {color: 'teal'}
        }else{
            return {}
        }
    }

    rateClick = (idx) => {
        this.isChange = true;
        this.setState({
            selectedNumber: idx
        })
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
                        {/* <Rate 
                            style={{
                                fontSize: '60px',
                                color: 'teal',
                            }}
                            defaultValue={1} 
                            character={({ index }) => index + 1} 
                            onChange={this.changeHandle}
                        /> */}
                        <div className="rate-select-wrap">
                            <ul className="rate-select-list">
                                {this.rating.map((val, idx) => {
                                    return(
                                        <li key={idx} 
                                            style={this.colorstyleSet(idx === this.state.selectedNumber)}
                                            onClick={() => {this.rateClick(idx)}}
                                        >
                                            {val}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
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
