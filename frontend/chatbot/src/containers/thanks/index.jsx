import React from 'react';
import './index.css';


export default class Thankspage extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="thanks-container">
                <h1 className="thanks-title">Thanks again for your participations!</h1>
                {/* <p className="thanks-instr">Here's a secret code to prove you have finished the survey. <br/>Please copy this code and input it as feedback, thanks!</p>
                <p className="thanks-code" id="code">Hs$rh%dj</p> */}
                <div className="thanks-icon"></div>
            </div>
        )
    }
}