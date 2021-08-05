import { cartDB, firebaseAll, foodDB } from "../../../firebase";
import { ActionTypes } from "../actionTypes";
import { fetchSpecificFoodToDisplayInCart } from "../FoodAction/foodAction";
import { singleInfo } from "../MessageOrErrorAction/infoAction";

export const addToCartAction = (foodDetails) => {
    return async (dispatch) => {
        const getData = await dispatch(checkIfFoodIdIsOnTheCartAlready(foodDetails.food_id))
        
        if (getData.length === 1) {
            // update qty and total price
            cartDB.doc(getData[0].docIdToUpdate).update({
                "quantity": getData[0].quantity + 1,
                "totalPrice": parseFloat(getData[0].totalPrice) + parseFloat(getData[0].initialPrice),
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
                    initialPrice: parseFloat(foodDetails.initial_price),
                    totalPrice: parseFloat(foodDetails.initial_price)
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
                    "initialPrice": doc.data().initialPrice,
                    "totalPrice": doc.data().totalPrice,
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
            const fetchAllFoodsInCart = querySnapshot.docs.map(async doc => {
                const foodInfo = await dispatch(fetchSpecificFoodToDisplayInCart(doc.data().foodId))
                    return { "docId": doc.id, "foodInfo": foodInfo, ...doc.data() }
            })
            Promise.all(fetchAllFoodsInCart).then(value => {
                dispatch(getTotalPriceToPay(value))
                return dispatch({ type: ActionTypes.FETCH_CART_LIST, payload: value })
            }) 
        })
    }
}

export const getTotalPriceToPay = (arrayOfPrice) => {
    return (dispatch) => {
        let allTotalPrice = []
        arrayOfPrice.forEach(element => {
            allTotalPrice.push(element.totalPrice)
        });
        return dispatch({ type: ActionTypes.FETCH_SUB_TOTAL, payload: allTotalPrice.reduce((a, b) => a + b, 0) })
    }
}

export const updateQtyOfFoodItem = (cartInfoToUpdate) => {
    return (dispatch) => {
            return cartDB.doc(cartInfoToUpdate.docId).update({
                quantity: parseInt(cartInfoToUpdate.quantity),
                totalPrice: parseInt(cartInfoToUpdate.quantity)  * cartInfoToUpdate.initialPrice
            }).then(() => {
                console.log("Quantity Updated")
            }).catch(err => {
                console.log(err)
            })
    }
}

export const passTotalPriceToPay = (initialPrice, courierPrice) => {
    return {
        type: ActionTypes.FETCH_TOTAL_PRICE,
        payload: (initialPrice + courierPrice)
    }
}

export const removeItemInCart = (cartId) => {
    return (dispatch) => {

    }
}