import {USER_INFO} from './action';
const defaultState = {
    userInfo: null
}

// Reducer to store whole task flow information
const infoReducer = (state=defaultState, action) => {
    if(action.type === USER_INFO){
        state.userInfo = action.info // Need to pay attention
    }
    return state;
}

export {infoReducer};

