import { ActionTypes } from "../actionTypes";
import { userFavoriteFoodDB } from '../../../firebase'

export const addToFavorites = (foodAndUserId) => {
    return (dispatch) => {
        userFavoriteFoodDB.add({
            food_id: foodAndUserId.food_id,
            user_id: foodAndUserId.user_id
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
        
    }
}

export const isFoodAlreadyFavorite = (foodId) => {
    return async(dispatch) => {
        await userFavoriteFoodDB.where("food_id", "==", foodId).get().then(docRef => {
            if (docRef.docs.length === 1) {
                dispatch({ type: ActionTypes.IS_FOOD_ALREADY_FAVORITE, payload: true })
            }
            else {
                dispatch({ type: ActionTypes.IS_FOOD_ALREADY_FAVORITE, payload: false })
            }
        })
    }
}

export const removeFavoriteFood = (foodId) => {
    return async(dispatch) => {
        await userFavoriteFoodDB.where("food_id", "==", foodId.foodId).get().then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                doc.ref.delete()
                
            })
        }).then(() => {
            dispatch({ type: ActionTypes.IS_FOOD_ALREADY_FAVORITE, payload: false })
        }).catch(err => {
            console.log("There was an error removing food in favorites")
        })
    }
}