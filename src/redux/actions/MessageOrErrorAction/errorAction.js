import { ActionTypes } from "./../actionTypes";

export const clearErrorMsg = () => {
    return {
        type: ActionTypes.CLEAR_ERROR_MSG,
        payload: ''
    }
}

export const singleError = (errorMsg) => {
    return {
        type: ActionTypes.SINGLE_ERROR,
        payload: errorMsg
    }
}