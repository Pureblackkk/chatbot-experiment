import {infoReducer} from './userinfo/reducer';
import {messageReducer} from './message/reducer';
import {conversationReducer} from './conversation/reducer';
import {combineReducers} from 'redux';

const appReducer = combineReducers ({
    messageReducer,
    infoReducer,
    conversationReducer
})

export default appReducer;