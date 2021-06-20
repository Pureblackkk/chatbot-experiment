import React from 'react';
import history from '../../common/history';
import {connect} from 'react-redux';
import Actions from '../../store/actions';
import { Checkbox, Button } from 'antd';
import FetchInfo from '../../api/info';
import './index.css';

const testInfoForamt = {
    id: 1,
    name: 'black',
    inroduction: [
        'intro1', 'intro2', 'intro3'
    ],
    instruction: [
        ['instruction1-1', 'instrucntion1-2', 'instruction1-3'],
        ['instruction2-1', 'instrucntion2-2', 'instruction2-3'],
        ['instruction3-1', 'instrucntion3-2', 'instruction3-3'],
    ],
    key: [
        [['aaa', 'key'], ['bbb', 'a', 'key'], ['ccc', 'key', 'cc', 'ddd']],
        [['aaa', 'key'], ['bbb', 'a', 'key'], ['ccc', 'key', 'cc', 'ddd']],
        [['aaa', 'key'], ['bbb', 'a', 'key'], ['ccc', 'key', 'cc', 'ddd']]
    ],
    ans: [
        [['hi', 'hhahaha'], 'pupup', ['bye', 'thank you']],
        ['asdasd', 'qgfdhgdf', 'dsagfh'],
        ['asfgvc', 'asfasf', 'ffsdfsdf']
    ],
    antroLevel: [
        {
            name: 'bot',
            avator: 0, // 0 For robot, 1 for human
            wait: true
        },
        {
            name: 'Bruce',
            avator: 1,
            wait: false
        },
        {   
            name: 'bot',
            avator: 0,
            wait: true
        }
    ],
    color: [
            'teal',
            'tomato',
            'skyblue',
            'green'      
    ]
}


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
        }

        const failCallback = () => {
            // TODO: Alert a fail notation
            console.log('failed');
        }

        // FetchInfo({test: 'this is a test'}, successCallback, failCallback);

        this.props.addUserInfo(testInfoForamt);
        history.push('/task/1');
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
                <div className="welcome-check" style={{color: this.state.isWarn ? 'red' : 'black'}}>
                    <Checkbox onChange={this.checkOnChange}>I agree to take part in the experiment and I give my consent for the collection of the data</Checkbox>
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