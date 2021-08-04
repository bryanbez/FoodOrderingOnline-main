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

export const singleMessageCustomizedColor = (infoMsg, color) => {
    return {
        type: ActionTypes.SINGLE_INFO_WITH_CUSTOMIZED_COLOR,
        payload: {
            "message": infoMsg,
            "color": color

         }
    }
}