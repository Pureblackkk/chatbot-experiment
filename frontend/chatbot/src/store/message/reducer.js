import {USER_MESSAGE, BOT_MESSAGE, TASK_STATE, CLEAN_MESSAGE, SET_TRYTIMES, SET_INRO} from './action'

// Set default state
const defaultState = {
    messageList: [],
    state: 0,
    tryTimes: 0,
    intro: true
}

// Reducer to record user's information
const messageReducer =  (state=defaultState, action) => {
    if(action.type === USER_MESSAGE) { // For user send message 
        // Report user enter time 
        window.conversationTimerInstance.setTypeEnd();
        const conversationDuration = window.conversationTimerInstance.getReportTime();
        window.conversationTimerInstance.setTypeStart();

        // Generate new message
        console.log('This is duration:', conversationDuration);
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList.push({
            type: 'user',
            message: action.message,
            duration: conversationDuration,
        })
        return newState
    }else if (action.type === BOT_MESSAGE) { // For bot send message 
        // Mark bot enter time
        window.conversationTimerInstance.setTypeStart();

        // Generate new message
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList.push({
            type: 'bot',
            message: action.message,
        })
        return newState
    }else if (action.type === TASK_STATE) { // For adding the status number 
        let newState = JSON.parse(JSON.stringify(state));
        newState.state = action.state;
        return newState
    }else if (action.type === CLEAN_MESSAGE) { // For clean all the message
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList = [];
        return newState;
    }else if (action.type === SET_TRYTIMES) { // For set try times
        let newState = JSON.parse(JSON.stringify(state));
        newState.tryTimes = action.tryTimes
        return newState;
    }else if (action.type === SET_INRO) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.intro = !state.intro;
        return newState;
    }
    return state
}

export {messageReducer};

