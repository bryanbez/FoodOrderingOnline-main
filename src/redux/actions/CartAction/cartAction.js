import { cartDB, firebaseAll } from "../../../firebase";
import { ActionTypes } from "../actionTypes";
import { singleInfo } from "../MessageOrErrorAction/infoAction";

export const addToCartAction = (foodDetails) => {
    return async (dispatch) => {
        const getData = await dispatch(checkIfFoodIdIsOnTheCartAlready(foodDetails.food_id))
        
        if (getData.length === 1) {
            // update qty
            cartDB.doc(getData[0].docIdToUpdate).update({
                "quantity": getData[0].quantity + 1
            }).then(() => {
                dispatch(singleInfo("Quantity Count Updated"))
            }).catch(err => {
                console.log(err)
            })
        }
        else {
            // add item
            return cartDB.add({
                    user_id: foodDetails.user_id,
                    date: firebaseAll.firestore.Timestamp.fromDate(new Date()),
                    foodId: foodDetails.food_id,
                    quantity: 1,
                    totalPrice: foodDetails.initial_price
                }).then(() => {
                    dispatch(singleInfo("Added To Cart Successfully"))
                    dispatch(fetchAllCartInfo(foodDetails.user_id))
                }).catch(err => {
                    console.log(err)
                })
        }
      
    }
}

export const checkIfFoodIdIsOnTheCartAlready = (foodId) => {
    return (dispatch) => {
        return cartDB.where('foodId', '==', foodId).get().then(querySnapshot => {
            return querySnapshot.docs.map(doc => {
                return {
                    "quantity": doc.data().quantity,
                    "size": querySnapshot.size,
                    "docIdToUpdate": doc.id
                }
            })
        })
    }
}

export const fetchAllCartInfo = (userID) => {
    return (dispatch) => {
        cartDB.where('user_id', '==', userID).get().then(querySnapshot => {
            const fetchAllFoodsInCart = querySnapshot.docs.map(doc => {
                return { "docId": doc.id, ...doc.data() }
            })
            Promise.all(fetchAllFoodsInCart).then(value => {
                return dispatch({ type: ActionTypes.FETCH_CART_LIST, payload: value })
            }) 
        })
    }
}

export const editQuantityInCart = (cartId) => {
    return (dispatch) => {

    }
}

export const removeItemInCart = (cartId) => {
    return (dispatch) => {

    }
}