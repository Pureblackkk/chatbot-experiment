import React from 'react';

export default class Intropage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isNext: false
        }
    }

    render() {
        return(
            <div>
                <h1>Here's the Intropage part</h1>
                <p>I agree to take part in the experiment and I give my consent for the collection of the data</p>
            </div>
        )
    }
}