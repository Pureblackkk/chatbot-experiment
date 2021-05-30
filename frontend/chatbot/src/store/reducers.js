import {infoReducer} from './userinfo/reducer';
import {messageReducer} from './message/reducer';
import {combineReducers} from 'redux';

export default appReducer = combineReducers ({
    messageReducer,
    infoReducer
})