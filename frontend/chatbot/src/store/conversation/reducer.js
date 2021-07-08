import {COVERSATION_INCOME, COVERSATION_RISKLEVEL} from './action';

const defaultState = {
    income: null,
    riskLevel: null
}

const conversationReducer = (state=defaultState, action) => {
    if(action.type === COVERSATION_INCOME) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.income = action.income;
        return newState;
    }else if(action.type === COVERSATION_RISKLEVEL) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.riskLevel = action.level;
        return newState;
    }
    return state;
}

export {conversationReducer};