export const USER_MESSAGE = 'userMessage';
export const BOT_MESSAGE = 'botMessage';
export const TASK_STATE = 'taskState';
export const CLEAN_MESSAGE = 'cleanMessage';


export const userPostMes = (messgae) => ({
    type: USER_MESSAGE,
    message: messgae
})

export const botPostMes = (message) => ({
    type: BOT_MESSAGE,
    message: message
})

export const taskChange = (stateId) => ({
    type: TASK_STATE,
    state: stateId
})

export const cleanMessage = () => ({
    type: CLEAN_MESSAGE
})