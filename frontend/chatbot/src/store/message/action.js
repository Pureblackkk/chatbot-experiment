export const USER_MESSAGE = 'userMessage';
export const BOT_MESSAGE = 'botMessage';
export const TASK_STATE = 'taskState';
export const CLEAN_MESSAGE = 'cleanMessage';
export const SET_TRYTIMES = 'setTryTimes';
export const SET_INRO = 'setIntro'

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

export const setTryTimes = (times) => ({
    type: SET_TRYTIMES,
    tryTimes: times
})

export const setIntro = () => ({
    type: SET_INRO
})