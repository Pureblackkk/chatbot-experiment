import React from 'react';
import history from '../../common/history';
import { connect } from 'react-redux';
import Actions from '../../store/actions';
import { Checkbox, Button } from 'antd';
import FetchInfo from '../../api/info';
import { IsPlainTextMode } from '../../config/config';
import Warning from '../../components/warning/index';
import { 
    introductionTitle,
    introductionContent,
    introductionCheck,
    warningContent,
} from './text-config.js';
import './index.css';

class Intropage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isAgree: false,
            isWarn: false,
            isknowWarning: false,
        }
        this.isAgreeWarning = false;
    }

    startExp = () => {
        // Test if checked
        if(!this.state.isAgree) {
            this.setState({isWarn: true});
            return;
        } 

        if (!!this.props.info) {
            history.push('/demography');
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

    warningCallback = () => {
        this.setState({ isknowWarning: true });
    }

    render() {
        return(
            <div className="welcome-container">
                {!this.state.isknowWarning && <Warning warningContent = { warningContent } callback = {this.warningCallback}/>}
                <div className="welcome-icon">
                </div>
                <h1 className="welcome-title">{ introductionTitle }</h1>
                <div className="welcome-content">
                    <p>{ introductionContent }</p>
                </div>
                <div className="welcome-check">
                    <Checkbox onChange={this.checkOnChange} style={{color: this.state.isWarn ? 'red' : 'black', fontSize: '3vmin'}}>{introductionCheck}</Checkbox>
                </div>
                <button className="welcome-button" onClick = {this.startExp}>
                    Start
                </button>
                {
                    IsPlainTextMode && 
                    <button className="welcome-clear" onClick = {this.cleanRecord}>
                    Clear Record
                    </button>
                }
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