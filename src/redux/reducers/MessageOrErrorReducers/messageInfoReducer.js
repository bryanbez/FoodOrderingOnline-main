import { ActionTypes } from "../../actions/actionTypes";

const initialState = {
    message: ''
}

const messageInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.SINGLE_INFO: 
            return  {
                ...state,
                message: action.payload
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