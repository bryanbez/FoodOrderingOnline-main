import { ActionTypes } from "../../actions/actionTypes";

const initialState = {

    profileInfo: []
}

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_PROFILE: 
            return {
                ...state,
                profileInfo: action.payload
            }
        default:
            return state
    }
}

export default profileReducer