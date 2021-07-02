import React from 'react';
import history from '../../common/history';
import {connect} from 'react-redux';
import Actions from '../../store/actions';
import { Checkbox, Button } from 'antd';
import FetchInfo from '../../api/info';
import './index.css';

class Intropage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAgree: false,
            isWarn: false
        }
    }

    startExp = () => {
        // Test if checked
        if(!this.state.isAgree) {
            this.setState({isWarn: true});
            return;
        }

        // Fetch scenario information
        const successCallback = (data) => {
            this.props.addUserInfo(JSON.parse(data));
            history.push('/demography');
        }

        const failCallback = () => {
            // TODO: Alert a fail notation
            console.log('failed');
        }
        FetchInfo({test: 'this is a test'}, successCallback, failCallback);
    }

    checkOnChange = (e) => {
        this.setState({isAgree: e.target.checked});
        if(e.target.checked) {
            this.setState({isWarn: false});
        }
    }
    
    cleanRecord = (e) => {
        localStorage.clear();
    }

    render() {
        return(
            <div className="welcome-container">
                <div className="welcome-icon">
                </div>
                <h1 className="welcome-title">Hi, welcome to our experiment!</h1>
                <div className="welcome-content">
                    <p>In this experiment, you will need to interact with a chatbot. 
                    Before and after the actual task, you will need to answer some questions.
                    Some of these questions, will ask you to provide some personal information such as age, gender, etc.
                    We do not ask you to provide your id or real name, so that your data will be anonymous.
                    Your data will be kept and stored in our database and use for scientific purpose only.
                    The might also be used for scientific publications.
                    Before proceeding to the experiment, you need to give your consent. 
                    </p>
                </div>
                <div className="welcome-check">
                    <Checkbox onChange={this.checkOnChange} style={{color: this.state.isWarn ? 'red' : 'black', fontSize: '3vmin'}}>I agree to take part in the experiment and I give my consent for the collection of the data</Checkbox>
                </div>
                <button className="welcome-button" onClick = {this.startExp}>
                    Start
                </button>
                <button className="welcome-clear" onClick = {this.cleanRecord}>
                    Clear Record
                </button>
            </div>
        )
    }
}

const mapStateToProps = (curState) => {
    return {
        info: curState.infoReducer.userInfo,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addUserInfo: (...args) => dispatch(Actions.addUserInfo(...args)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Intropage);