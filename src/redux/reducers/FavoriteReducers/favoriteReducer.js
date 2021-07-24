import { ActionTypes } from "../../actions/actionTypes";

const initialState = {
    alreadyFavorite: false
}

const favoriteReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.IS_FOOD_ALREADY_FAVORITE: 
            return {
                ...state,
                alreadyFavorite: action.payload
            }
        default:
            return state

    }
}

export default favoriteReducer