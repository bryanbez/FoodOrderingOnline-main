import { ActionTypes } from "../../actions/actionTypes";

const initialState = {
    alreadyFavorite: false,
    favoriteFoodList: []
}

const favoriteReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.IS_FOOD_ALREADY_FAVORITE: 
            return {
                ...state,
                alreadyFavorite: action.payload
            }
        case ActionTypes.FETCH_ALL_FAVORITE_FOODS: 
            return {
                ...state,
                favoriteFoodList: action.payload
            }
        default:
            return state

    }
}

export default favoriteReducer