import React from 'react';
import {connect} from 'react-redux';
import history from '../../common/history';
import './index.css';

class BeforeExpPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            leave: false
        }
        this.taskId = parseInt(this.props.taskId) - 1;
        this.inroduction = this.props.info.inroduction[this.taskId];
    }

    clickHandle = () => {
        history.push(`/task/${this.taskId+1}`);
    }

    render() {
        return (
            <div className={`beforexp-wrap ${this.state.leave ? 'leave': ''}`}>
                <div className="beforexp-content">
                    <h1 className="beforexp-title">Introduction of Experiment</h1>
                    <div className="beforexp-intro">
                        {this.inroduction}
                    </div>
                    <div className="beforexp-note">
                        In next page, you will see a chatbot on the left and instructions on the right.
                        <br/>
                        Please follow the instructions to interact with chatbot.
                    </div>
                </div>
                <div>
                    <button className="beforexp-button" onClick={this.clickHandle}>Understand</button>
                </div>
            </div>

        )
    }

    componentWillUnmount() {
        this.setState({leave: true});
    }
}


const mapStateToProps = (curState) => {
    console.log(curState);
    return {
        info: curState.infoReducer.userInfo
    }
};

export default connect(mapStateToProps)(BeforeExpPage);