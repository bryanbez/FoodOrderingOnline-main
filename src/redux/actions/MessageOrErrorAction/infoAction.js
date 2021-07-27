import { ActionTypes } from "./../actionTypes";

export const clearInfoMsg = () => {
    return {
        type: ActionTypes.CLEAR_INFO_MSG,
        payload: ''
    }
}

export const singleInfo = (infoMsg) => {
    return {
        type: ActionTypes.SINGLE_INFO,
        payload: infoMsg
    }
}