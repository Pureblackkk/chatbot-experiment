class BotAPI {
    constructor() {
        this.messageList = [];
        this.typingRatio = 6;
    }

    addMessage(message) {
        this.messageList.push(message);
    }

    removeMessage() {
        return this.messageList.shift()
    }

    getMessages() {
        return this.messageList;
    }    

    _detection(message, state, keyList) {
        if(state === keyList.length) {state -= 1;}
        for(let item of keyList[state]) {
            if(message.search(item) !== -1) {return true}
        }
        return false;
    }

    _botPost(message, botPostMes, resolve, waitTime=null, setTyping=null) {
        if(waitTime === null) {
            botPostMes(message);
            resolve();
        }else{
            setTyping(true);
            setTimeout(() => {
                botPostMes(message);
                setTyping(false);
                resolve();
            }, waitTime)
        }
    }

    _process() {
        if(this.messageList.length === 0) {return;}
        const {message, botPostMes, taskChange, state, storeObj, setTyping} = this.messageList[0];
        const {ansList, keyList, wait} = storeObj;
        const isFixAns = this._detection(message, state, keyList);
        let testReply;
        if(isFixAns) {
            testReply = ansList[state] ? ansList[state] : ansList[state-1];
        }else{
            //TODO: Request for reply
            testReply = 'Bot: This is a Random Answer';
        }
        let waitTime = wait ? testReply.length * 1000 / this.typingRatio : null; // Setting the wait time
        new Promise((res, rej) => {
            this._botPost(testReply, botPostMes, res, waitTime, setTyping)
        }).then(() => {
                isFixAns && state !== ansList.length && taskChange(state + 1);
                this.removeMessage();
                this._process();
            }
        )
    }
    
    sendMessage(message, botPostMes, taskChange, state, storeObj, setTyping) {
        let args = {
            'message': message,
            'botPostMes': botPostMes,
            'taskChange': taskChange,
            'state': state,
            'storeObj': storeObj,
            'setTyping': setTyping
        }
        if(this.messageList.length === 0) {
            this.messageList.push(args);
            this._process();
        }else{
            this.messageList.push(args);
        }
    }
}

export default new BotAPI();