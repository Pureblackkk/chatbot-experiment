import React from 'react';
import history from '../../common/history';
import {connect} from 'react-redux';
import Actions from '../../store/actions';

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
        ['hhahaha', 'pupup', 'lalalal'],
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
            isNext: false
        }
    }

    test = () => {
        console.log('Push test info');
        this.props.addUserInfo(testInfoForamt)
        console.log(this.props.info);
        history.push('/task/1')
    }

    render() {
        return(
            <div>
                <h1>Here's the Intropage part</h1>
                <p>I agree to take part in the experiment and I give my consent for the collection of the data</p>
                <button onClick = {this.test}>
                    Test
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