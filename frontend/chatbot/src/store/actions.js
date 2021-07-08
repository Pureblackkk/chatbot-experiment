import {addUserInfo, changeName} from './userinfo/action'
import {userPostMes, botPostMes, taskChange, cleanMessage, setTryTimes, setIntro} from './message/action'
import {setConIncome, setConRiskLevel} from './conversation/action'

export default {
    addUserInfo,
    userPostMes,
    botPostMes,
    taskChange,
    cleanMessage,
    setTryTimes,
    setIntro,
    changeName,
    setConIncome,
    setConRiskLevel
}