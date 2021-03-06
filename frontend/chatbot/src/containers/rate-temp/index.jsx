import React from 'react';
import {connect} from 'react-redux';
import { message } from 'antd';
import history from '../../common/history';
import {UrlPath} from '../../config/config';
import './index.css';

class Ratepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedNumber: null
        }
        this.taskId = parseInt(this.props.taskId) - 1;
        this.isChange = false;
        this.rating = [1, 2, 3, 4, 5, 6, 7];
    }

    clickHandle = () => {
        if(this.isChange) {
            // Upload information to backend
            this.upload();
            let path = this.nextPath();
            history.push(path);
        }else{
            message.warn('Please at least change the rate once!')
        }
    }

    upload = () => {
        const postData = {
            scenario: this.taskId + 1, // TODO: Need to pay attention
            willing: this.state.selectedNumber + 1
        }
        fetch(`${UrlPath.dialog}${this.props.uid}/`, {
            method: 'PUT',
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
        })
        .catch((e) => {
            console.log(e);
        })
    }

    nextPath = () => {
        if(this.taskId === this.props.instruction.length - 1) {return '/thanks'} // Todo
        let id = this.taskId + 2
        return '/introduction/' + id.toString();
    }

    changeHandle = (value) => {
        this.isChange || (this.isChange=true);
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
                        Please rate your impression of the speaker
                    </div>    
                    <div className="rate-rate" >
                        <div className="rate-sad">
                            <span>Talk in a mechanical manner</span>
                        </div>
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
                            <span>Talk in a humanlike manner</span>
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
    return {
        instruction: curState.infoReducer.userInfo.instruction,
        uid: curState.infoReducer.userInfo.id,
        postQ: curState.infoReducer.userInfo.postQuestion,
    }
};


export default connect(mapStateToProps)(Ratepage);
