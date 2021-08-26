import { checkoutDB, foodDB, foodImageStorage } from '../../../firebase'
import { ActionTypes } from './../actionTypes'

export const fetchCheckoutList = () => {
    return (dispatch) => {
        checkoutDB.onSnapshot(snapshot => {
           snapshot.docs.map((doc) => {
                const promise = doc.data().foodItems.map(async (item) => { 
                    const foodInfo = await dispatch(fetchFoodInfoInCheckout(item.foodId))
                    return {
                        foodInfo,
                        ...item
                    }
                })
                return Promise.all(promise).then(value => {
                    dispatch({ type: ActionTypes.FETCH_CHECKOUT_INFO, payload: value })
                })
           })
        })
    }
}


export const fetchSpecificCheckoutList = () => {
     return (dispatch) => {
        
    }

}

export const addCheckoutInfo = (checkoutsInfo) => {

    return (dispatch) => {
        try {
            checkoutsInfo.foodItems.forEach(element => { // remove the foodInfo because there was a food id
               delete element.foodInfo
            });

            checkoutDB.add(checkoutsInfo).then(() => {
                console.log("Checkout Saved")
            })
        }
        catch(err)  {
            console.log("Error saving checkout info")
        }
    }

}

export const fetchFoodInfoInCheckout = (docId) => {
    return async (dispatch) => {
        return await foodDB.doc(docId).get().then(docRef => {
            return foodImageStorage.child(docRef.data().foodImage).getDownloadURL()
                .then(url => {
                    return {
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
    }
}
