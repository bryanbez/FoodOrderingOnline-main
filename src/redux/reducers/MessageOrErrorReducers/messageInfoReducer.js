import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    message: ''
}

const messageInfoReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.MESSAGE_INFO: 
            return  {
                ...state,
                message: action.payload
            }
        default:
            return state
    }
}

export default messageInfoReducer