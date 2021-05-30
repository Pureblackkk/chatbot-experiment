// Detection if a message is in fixed or not 
function detection(message, state, keyList) {
    if(state === keyList.length) {state -= 1;}
    for(let item of keyList[state]) {
        if(message.search(item) !== -1) {return true}
    }
    return false;
}


export const botAPI = function (message, botPostMes, taskChange, state, storeObj) {
    const {ansList, keyList} = storeObj;
    console.log(keyList);
    let isFixAns = detection(message, state, keyList);
    let testReply
    if(isFixAns) { // Contains keys return fixed answers
        testReply = ansList[state];
        let send  = new Promise((res, rej) => {
            botPostMes(testReply);
            res();
        }).then(() => {
                state !== ansList.length && send.then(() => {taskChange(state + 1)});
            }
        )
    }else{ // Return API answers 
        //TODO: Request for reply
        testReply = 'Bot: This is a Random Answer';
        //Apply callback function
        botPostMes(testReply);
    }
}