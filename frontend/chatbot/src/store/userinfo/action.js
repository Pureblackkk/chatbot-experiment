export const USER_INFO = 'userInformation';
export const CHANGE_NAME = 'changeName';

export const addUserInfo = (info) => ({
    type: USER_INFO,
    info: info
})

export const changeName = (name) => ({
    type: CHANGE_NAME,
    name: name
})
