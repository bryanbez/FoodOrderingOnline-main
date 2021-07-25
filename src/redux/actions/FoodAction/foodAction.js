import { foodDB, foodImageStorage } from '../../../firebase'
import { ActionTypes } from '../actionTypes'

export const addFoodForm = (foodInfo) => {
    return {
        type: ActionTypes.ADD_FOOD,
        payload: foodInfo
    }
}

export const readFoodInfo = (sortBy = 'all') => {
    
    return (dispatch) => {
        if (sortBy !== 'all') {
          
            foodDB.where("foodCategory", "==", sortBy).get().then(querySnapshot => {
                const fetchFoodWithSort = querySnapshot.docs.map(async doc => {
                     return await foodImageStorage.child(doc.data().foodImage).getDownloadURL().then(url => {
                        return {
                            id: doc.id,
                            foodSKU: doc.data().foodSKU,
                            foodImage: url,
                            foodImageName: doc.data().foodImage,
                            foodName: doc.data().foodName,
                            foodPrice: doc.data().foodPrice,
                            foodDescription: doc.data().foodDescription,
                            foodCategory: doc.data().foodCategory,
                            isAvailable: doc.data().isAvailable,
                            isArchived: doc.data().isArchived
                        }
                    })
                })     
                Promise.all(fetchFoodWithSort).then(value => {
                    dispatch({ type: ActionTypes.READ_FOOD, payload: { "foodList": value, "sortBy": sortBy } }) 
                });
            })

        }
        else {
            foodDB.onSnapshot(snapshot => {
               const fetchAllFood = snapshot.docs.map(async doc => {
                  return await foodImageStorage.child(doc.data().foodImage).getDownloadURL().then(url => {
                        return ({
                            id: doc.id,
                            foodSKU: doc.data().foodSKU,
                            foodImage: url,
                            foodImageName: doc.data().foodImage,
                            foodName: doc.data().foodName,
                            foodPrice: doc.data().foodPrice,
                            foodDescription: doc.data().foodDescription,
                            foodCategory: doc.data().foodCategory,
                            isAvailable: doc.data().isAvailable,
                            isArchived: doc.data().isArchived
                        })

                    })
                })  
                Promise.all(fetchAllFood).then(value => {
                     dispatch({ type: ActionTypes.READ_FOOD, payload: { "foodList": value, "sortBy": sortBy } }) 
                });
              
            })
            
        }
        
    }
}

export const fetchSpecificFood = (docId) => {
    return async (dispatch) => {
        await foodDB.doc(docId).get().then(docRef => {
            foodImageStorage.child(docRef.data().foodImage).getDownloadURL()
                .then(url => {
                    dispatch({ type: ActionTypes.READ_SPECIFIC_FOOD_INFO, payload: {
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
    }
}

export const fetchSpecificFoodBySKU = (sku) => {
    return async (dispatch) => {
        await foodDB.where("foodSKU", "==", sku).get().then(doc => {
            doc.forEach((docRef) => {
                 foodImageStorage.child(docRef.data().foodImage).getDownloadURL()
                .then(url => {
                    dispatch({ type: ActionTypes.READ_SPECIFIC_FOOD_INFO, payload: {
                            'id': docRef.id,
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
            });
           
        })
    }
}

export const updateFoodForm = (foodInfo) => {
    return {
        type: ActionTypes.UPDATE_FOOD_INFO,
        payload: foodInfo
    }
}

export const restoreFood = (docId) => {
    return (dispatch) => {
        if (docId === null) {
            dispatch({ type: ActionTypes.ARCHIVE_FOOD_MESSAGE, payload: null})
        }
        else {
            foodDB.doc(docId).set({
                isArchived: false
            }, { merge: true }).then(() => {
                dispatch({ type: ActionTypes.ARCHIVE_FOOD_MESSAGE, payload: "Food Restored"})
            })
        }
      
    }
}

export const archiveFood = (docId) => {
    return (dispatch) => {
        foodDB.doc(docId).set({
            isArchived: true
        }, { merge: true }).then(() => {
            dispatch({ type: ActionTypes.ARCHIVE_FOOD_MESSAGE, payload: "Food Archived"})
        })
    }
  

}

export const clearSpecificFoodInfo = () => {
    return {
        type: ActionTypes.RESET_SPECIFIC_FOOD_INFO
    }
}



