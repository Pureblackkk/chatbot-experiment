import {USER_INFO} from './action';
const defaultState = {
    userInfo: null
}

// Reducer to store whole task flow information
const infoReducer = (state=defaultState, action) => {
    if(action.type === USER_INFO){
        let newState = {};
        newState.userInfo = action.info;
        return newState
    }
    return state;
}

export {infoReducer};

