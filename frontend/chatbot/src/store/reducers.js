import {infoReducer} from './userinfo/reducer';
import {messageReducer} from './message/reducer';
import {combineReducers} from 'redux';

const appReducer = combineReducers ({
    messageReducer,
    infoReducer
})

export default appReducer;