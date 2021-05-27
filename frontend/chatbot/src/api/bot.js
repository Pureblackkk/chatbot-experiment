import store from '../store/index';
import {keyList, AnsList} from '../common/task';

// Detection if a message is in fixed or not 
function detection(message, task, state) {
    if(state === keyList[task].length) {state -= 1;}
    for(let item of keyList[task][state]) {
        if(message.search(item) !== -1) {return true}
    }
    return false;
}


export const botAPI = function (message, dispatch, action, hitKeyAction, task) {
    const stateCurr = store.getState()
    const {state} = stateCurr;
    let isFixAns = detection(message, task, state);
    let testReply
    if(isFixAns) {
        testReply = 'Bot: This is a Fixed Answer';
        let send  = new Promise((res, rej) => {
            dispatch(action(testReply));
            res();
        })
        state !== AnsList[task].length && send.then(() => {dispatch(hitKeyAction(state + 1))});
    }else{
        //TODO: Request for reply
        testReply = 'Bot: This is a Random Answer';
        //Apply callback function
        dispatch(action(testReply));
    }
}