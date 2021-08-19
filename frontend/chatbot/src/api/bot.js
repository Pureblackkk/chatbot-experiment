import { TypeRatio, FailReply } from '../config/config';
import { botPostMes } from '../store/message/action';

class BotAPI {
    constructor(tryTimes, setTryTimes, conActions, state, task, internetMode=false) {
        this.messageList = [];
        this.microList = [];
        this.typingRatio = TypeRatio;

        // Try times
        this.tryTimes = tryTimes;
        this.setTryTimes = setTryTimes;
        
        // Conversation actions 
        this.conActions = conActions;

        // Status variable
        this.state = state;
        this.task = task;
        this.userId = 'user1';

        // Is internet mode on
        this.internetMode = internetMode;
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

    cleanTryTime() {
        this.tryTimes = 0;
    }

    setState(stateId) {
        this.state = stateId;
    }

    // TODO: Make it in configurations
    _calculateTypingTime(words) {
        const wordsLen = words.split(' ').length;
        if(wordsLen < 10) {
            return 0.02 * wordsLen**2 * 1000;
        }else{
            return 0.2 * wordsLen * 1000;
        }
    }

    _botResFromApi(question, resolve, testReply) {
        fetch(`https://ai-chatbot.p.rapidapi.com/chat/free?message=${question}&uid=${this.userId}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "2efe2fb242msh52df0e2c03bddd4p10ec60jsnba248e186f25",
                    "x-rapidapi-host": "ai-chatbot.p.rapidapi.com"
            }
        })
        .then(response => {
            if(response.status === 200) {
                return response.json();
            }else{
                return Promise.reject();
            }
        }).then((data) => {
            testReply.ans = data.chatbot.response;
            resolve();
        })
        .catch(err => {
            testReply.ans = 'Network trouble, please try again!';
            resolve();
        });

    }

    _detection(message, keyList) {
        if(this.state === keyList.length) {this.state -= 1;}
        for(let item of keyList[this.state]) {
            if(message.toLowerCase().search(item) !== -1) {return true}
        }
        return false;
    }

    // TODO: Not use this.task as the indentifier since it may not follow the order
    _certainStateCheck(message) {
        const status = this.task + '-' + this.state;
        switch(status) {
            case '1-5':
                this.conActions.setConIncome(message);
                return;
            case '1-9':
                this.conActions.setConRiskLevel(message);
                return;
            default:
                return;
        }
    }

    _botMicroPost(botPostMes, resolve, waitTime, setTyping) {
        if(this.microList.length === 0 ) {
            resolve();
            return;
        }
        new Promise((res, rej) => {
            if(waitTime === null) {
                botPostMes(this.microList[0]);
                this.microList.shift();
                res();
            }else{
                setTyping(true);
                let tempMsg = this.microList[0]
                setTimeout(() => {
                    botPostMes(this.microList[0]);
                    this.microList.shift();
                    setTyping(false);
                    res();
                }, this._calculateTypingTime(tempMsg))
            }
        }
        ).then(() => {this._botMicroPost(botPostMes, resolve, waitTime, setTyping);})
    }

    _botPost(message, botPostMes, resolve, waitTime=null, setTyping=null) {
        if(Array.isArray(message)) {
            this.microList = [...this.microList, ...message];
        }else{
            this.microList.push(message);
        }
        this._botMicroPost(botPostMes, resolve, waitTime, setTyping);
    }

    _process() {
        if(this.messageList.length === 0) {return;}
        const {message, botPostMes, taskChange, storeObj, setTyping} = this.messageList[0];
        const {ansList, keyList, wait} = storeObj;
        const isFixAns = this._detection(message, keyList);
        let testReply = {};
        new Promise((res, rej) => {
            if(isFixAns) {
                testReply.ans = ansList[this.state] ? ansList[this.state] : ansList[this.state-1];
                this._certainStateCheck(message);  // See if hint certain task and its state
                res();
            }else{
                this.setTryTimes(++this.tryTimes);
                if(this.internetMode) {
                    // Request for reply from open source API
                    this._botResFromApi(message, res, testReply);
                }else{
                    testReply.ans = FailReply;
                    res();
                }
            }
        })
        .then(() => {
            testReply = testReply.ans;
            let waitTime = wait ? testReply.length * 1000 / this.typingRatio : null; // Setting the wait time
            new Promise((res, rej) => {
                this._botPost(testReply, botPostMes, res, waitTime, setTyping);
            }).then(() => {
                    isFixAns && this.state !== ansList.length && taskChange(this.state + 1) && this.setTryTimes(0) && this.cleanTryTime()
                    this.removeMessage();
                    this._process();
                }
            )
        }
        )
    }
    
    sendMessage(message, botPostMes, taskChange, storeObj, setTyping) {
        let args = {
            'message': message,
            'botPostMes': botPostMes,
            'taskChange': taskChange,
            'storeObj': storeObj,
            'setTyping': setTyping,
        }
        if(this.messageList.length === 0) {
            this.messageList.push(args);
            this._process();
        }else{
            this.messageList.push(args);
        }
    }
}

export default BotAPI;