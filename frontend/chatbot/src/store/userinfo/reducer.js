import {USER_INFO, CHANGE_NAME} from './action';

const defaultState = {
    userInfo: null
}

// Reducer to store whole task flow information
const infoReducer = (state=defaultState, action) => {
    if(action.type === USER_INFO){
        let newState = {};
        newState.userInfo = action.info;
        return newState
    }else if(action.type === CHANGE_NAME) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.userInfo.name = action.name;
        return newState;
    }
    return state;
}

export {infoReducer};

