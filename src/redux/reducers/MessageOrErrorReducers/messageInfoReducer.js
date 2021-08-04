import { ActionTypes } from "../../actions/actionTypes";

const initialState = {
    message: '',
    color: "info"
}

const messageInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SINGLE_INFO: 
            return  {
                ...state,
                message: action.payload
            }
        case ActionTypes.SINGLE_INFO_WITH_CUSTOMIZED_COLOR: {
            return {
                ...state,
                message: action.payload.message,
                color: action.payload.color
            }
        }
        case ActionTypes.CLEAR_INFO_MSG: 
            return {
                ...state,
                message: ''
            }
        default:
            return state
    }
}

export default messageInfoReducer