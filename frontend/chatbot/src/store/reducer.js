import {USER_MESSAGE, BOT_MESSAGE, TASK_STATE} from './action'

// Set default state
const defaultState = {
    messageList: [],
    task: 0,
    state: 0
}

export default (state=defaultState, action) => {
    if(action.type === USER_MESSAGE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList.push({
            type: 'user',
            message: action.message,
        })
        return newState
    }else if (action.type === BOT_MESSAGE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.messageList.push({
            type: 'bot',
            message: action.message
        })
        return newState
    }else if (action.type === TASK_STATE) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.state = action.state;
        return newState
    }
    return state
}

