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
            console.log(data);
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

    render() {
        return(
            <div className="welcome-container">
                <div className="welcome-icon">
                </div>
                <h1 className="welcome-title">Hi, welcome to our experiment!</h1>
                <div className="welcome-content">
                    <p>In this experiment, we will study the impact of anthropomorphization on risk perception. 
                        You will need to provide your personal information and cooperate with us. 
                        We guarantee that the collected data will only be used for scientific research!
                        Please read the following notes and choose whether to participate in the experiment. 
                    </p>
                </div>
                <div className="welcome-check">
                    <Checkbox onChange={this.checkOnChange} style={{color: this.state.isWarn ? 'red' : 'black', fontSize: '20px'}}>I agree to take part in the experiment and I give my consent for the collection of the data</Checkbox>
                </div>
                <button className="welcome-button" onClick = {this.startExp}>
                    Start
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