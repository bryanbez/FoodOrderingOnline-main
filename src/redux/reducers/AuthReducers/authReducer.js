import { ActionTypes } from "../../actions/actionTypes";

const initialState = {
    display_name: '',
    role: '',
    user_email: '',
}


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.LOG_IN_USER: 
            if (action.payload === null) {
                return {
                    ...state,
                    display_name: '',
                    user_email: ''
                }
            }
            else {
                return {
                    ...state,
                    display_name: action.payload.displayName,
                    user_email: action.payload.email,
                }
            }
            
        default:
            return state
    }
}

export default authReducer