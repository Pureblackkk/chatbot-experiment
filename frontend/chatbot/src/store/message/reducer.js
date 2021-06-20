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
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList.push({
            type: 'user',
            message: action.message,
        })
        return newState
    }else if (action.type === BOT_MESSAGE) { // For bot send message 
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList.push({
            type: 'bot',
            message: action.message
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

