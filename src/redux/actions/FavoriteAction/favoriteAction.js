import { ActionTypes } from "../actionTypes";
import { userFavoriteFoodDB, foodDB, foodImageStorage } from '../../../firebase'

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

export const fetchFavoriteFoods = (userId) => {
    return async (dispatch) => {
        await userFavoriteFoodDB.where("user_id", "==", userId).onSnapshot(snapshot => {
            const fetchFavoriteFoodList = snapshot.docs.map(async doc => {
                    return await foodDB.doc(doc.data().food_id).get().then(docRef => {
                        return foodImageStorage.child(docRef.data().foodImage).getDownloadURL().then(url => {
                            return {
                                'foodId': docRef.id,
                                'foodSKU': docRef.data().foodSKU,
                                'foodCategory': docRef.data().foodCategory,
                                'foodImage': url,
                                'foodName': docRef.data().foodName,
                                'foodPrice': docRef.data().foodPrice,
                                'foodDescription': docRef.data().foodDescription,
                                'isAvailable': docRef.data().isAvailable
                                }   
                        })
                    })
            })
            Promise.all(fetchFavoriteFoodList).then(value => {
                return dispatch({ type: ActionTypes.FETCH_ALL_FAVORITE_FOODS, payload: value })
            })
        })
    }
}
//({ id: doc.id, ...doc.data() })
//return dispatch({ type: ActionTypes.FETCH_ALL_FAVORITE_FOODS, payload: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) })

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