import { ActionTypes } from "../../actions/actionTypes"

const initialState = {
    errorMessageInfo: ''
}

const errorReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_ERROR: 
            return {
                ...state,
                errorMessageInfo: action.payload
            }
        case ActionTypes.CLEAR_ERROR_MSG: 
            return {
                ...state,
                errorMessageInfo: ''
            }
        case ActionTypes.SINGLE_ERROR: 
            return {
                ...state,
                errorMessageInfo: action.payload
            }
        default: 
            return state
    }
}


export default errorReducer

