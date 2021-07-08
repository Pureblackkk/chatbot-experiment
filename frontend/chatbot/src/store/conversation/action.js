export const COVERSATION_INCOME = 'conversationIncome';
export const COVERSATION_RISKLEVEL= 'conversationRiskLevel';

export const setConIncome = (income) => ({
    type: COVERSATION_INCOME,
    income: income
})

export const setConRiskLevel = (level) => ({
    type: COVERSATION_RISKLEVEL,
    level: level
})