import { ActionTypes } from "../actionTypes";
import { userFavoriteFoodDB } from '../../../firebase'

export const addToFavorites = (foodAndUserId) => {
    return (dispatch) => {
        
        userFavoriteFoodDB.add({
            food_id: foodAndUserId.foodId,
            user_id: foodAndUserId.userId
        }).then(res => {
            console.log("Added to Favorites")
        }).catch(err => {
            console.log("There was an error adding food to favorites" + err)
        })
    }
}

export const fetchFavoriteFoods = () => {
    return (dispatch) => {

    }
}

export const fetchSpecificFavoriteFood = (foodId) => {
    return (dispatch) => {
        userFavoriteFoodDB.where("food_id", "==", foodId).get().then(docRef => {
            if (docRef.docs.length === 1) {
                dispatch({ type: ActionTypes.IS_FOOD_ALREADY_FAVORITE, payload: true })
            }
            else {
                dispatch({ type: ActionTypes.IS_FOOD_ALREADY_FAVORITE, payload: false })
            }
        })
    }
}

export const isFoodAlreadyFavorite = (foodAndUserId) => {
    return (dispatch) => {

    }
}

export const removeFavoriteFood = (favoriteId) => {
    return (dispatch) => {

    }
}